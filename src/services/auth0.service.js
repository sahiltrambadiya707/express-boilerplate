const axios = require('axios').default;
const jwt = require('jsonwebtoken');
const ApiError = require('@utils/ApiError');
const httpStatus = require('http-status');
const { decrypt } = require('@utils/crypto');
const { createResponseObject } = require('@utils/utils');
const { generateToken, saveToken, addSecondInCurrentTimeForExpireTime, generatePKCE } = require('@utils/auth.util');
const moment = require('moment');
const { getRoleByCode } = require('./role.service');

const getLoginPageUrl = async (req, res) => {
  const { codeVerifier, codeChallenge, state } = generatePKCE();

  req.session.verifier = codeVerifier;
  req.session.state = state;
  try {
    const generateLoginPageUrl = `${global.env.AUTH0.BASE_URL}/authorize?response_type=code&client_id=${global.env.AUTH0.CLIENT_ID}&redirect_uri=${global.env.AUTH0.REDIRECT_URL}&scope=offline_access%20openid%20email&audience=${global.env.AUTH0.AUDIENCE}&state=${state}&prompt=login&screen_hint=login&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    return res.status(httpStatus.OK).send(generateLoginPageUrl);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
  }
};

const authCodeExchangeWithToken = async (code, session) => {
  const options = {
    method: 'POST',
    url: `${global.env.AUTH0.BASE_URL}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: global.env.AUTH0.CLIENT_ID,
      client_secret: global.env.AUTH0.CLIENT_SECRET,
      code_verifier: session.verifier,
      code,
      redirect_uri: global.env.AUTH0.REDIRECT_URL,
    }),
  };

  try {
    const response = await axios.request(options);
    session.destroy();
    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'error 1');
  }
};

const decodeIdToken = async (idToken) => {
  const idTokenInfo = jwt.decode(idToken);

  if (!idTokenInfo.email) {
    const error = {
      error: 'Email not found',
    };
    throw new ApiError(httpStatus.BAD_REQUEST, 'error 2', JSON.stringify(error));
  }

  return idTokenInfo;
};

const createUserWithAuth0Info = async (auth0Id) => {
  try {
    const roleDetails = await getRoleByCode({ code: 'user' });

    let auth0UserInfo = await global.models[global.env.DOMAIN].AUTH0.findOne({ user_id: auth0Id });
    auth0UserInfo = auth0UserInfo.toJSON();

    const addUserBasicData = await global.models[global.env.DOMAIN].USER.findOneAndUpdate(
      { auth0Id },
      {
        $setOnInsert: {
          email: auth0UserInfo.email,
          first_name: auth0UserInfo.nickname,
          role: roleDetails._id,
        },
      },
      { upsert: true, new: true },
    );

    return {
      userId: addUserBasicData._id,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'error 6', JSON.stringify(error?.response?.data));
  }
};

const revokeRefreshToken = async (token) => {
  const options = {
    method: 'POST',
    url: `${global.env.AUTH0.BASE_URL}/oauth/revoke`,
    headers: { 'content-type': 'application/json' },
    data: {
      client_id: global.env.AUTH0.CLIENT_ID,
      client_secret: global.env.AUTH0.CLIENT_SECRET,
      token,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'error 5', JSON.stringify(error?.response?.data));
  }
};

const saveTokenInDatabase = async ({ decodeAuth0IdToken, auth0TokenInfo }) => {
  const auth0Id = decodeAuth0IdToken.sub;
  const tokenDoc = await global.models[global.env.DOMAIN].TOKEN.findOne({ auth0Id });

  const { userId } = await createUserWithAuth0Info(auth0Id);

  if (tokenDoc) {
    if (tokenDoc?.auth0?.token) {
      await revokeRefreshToken(tokenDoc.auth0.token);
    }
  }

  const calculatedExpireTime = await addSecondInCurrentTimeForExpireTime(86400);
  const localToken = await generateToken(userId, auth0Id, calculatedExpireTime);

  const reqData = {
    userId,
    auth0Id,
    auth0: {
      token: auth0TokenInfo.refresh_token,
      expires: calculatedExpireTime,
      blacklisted: false,
    },
    local: {
      token: localToken,
      expires: calculatedExpireTime,
      blacklisted: false,
    },
  };

  try {
    if (!tokenDoc) {
      await saveToken({ ...reqData, local: [reqData.local] });
    } else {
      await global.models[global.env.DOMAIN].TOKEN.updateOne(
        { auth0Id },
        {
          $push: {
            local: reqData.local,
          },
          $set: {
            auth0: {
              token: auth0TokenInfo.refresh_token,
              expires: calculatedExpireTime,
              blacklisted: false,
            },
          },
        },
      );
    }
    return { refreshToken: localToken };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'error 7', JSON.stringify(error?.response?.data));
  }
};

const login = async (req, res) => {
  if (!req.query.code) {
    return res.redirect(
      httpStatus.MOVED_PERMANENTLY,
      `${global.env.USER_PANEL_URL}/error?message=authorization_code not found`,
    );
  }

  if (req.query.state !== req.session.state) {
    return res.redirect(httpStatus.MOVED_PERMANENTLY, `${global.env.USER_PANEL_URL}/error?message=state not found`);
  }

  try {
    const auth0TokenInfo = await authCodeExchangeWithToken(req.query.code, req.session);

    const decodeAuth0IdToken = await decodeIdToken(auth0TokenInfo?.id_token);

    const { refreshToken } = await saveTokenInDatabase({ decodeAuth0IdToken, auth0TokenInfo });

    res.cookie('token', refreshToken, {
      httpOnly: false,
      maxAge: 31557600 * 1000,
      secure: true,
    });
    res.cookie('isAuthenticated', true, {
      maxAge: 31557600 * 1000,
    });

    const redirectPath = '/';

    return res.redirect(301, global.env.USER_PANEL_URL + redirectPath);
  } catch (error) {
    return res.redirect(
      httpStatus.MOVED_PERMANENTLY,
      `${global.env.USER_PANEL_URL}/error?message=Sorry! Something went wrong with the request. Please try again later.`,
    );
  }
};

const logout = async (req, res) => {
  try {
    const tokenDoc = await global.models[global.env.DOMAIN].TOKEN.findOneAndUpdate(
      { auth0Id: req.user.auth0Id },
      {
        $pull: {
          local: { $or: [{ token: req.user.token }, { expires: { $lt: moment().unix() } }] },
        },
      },
    );
    await revokeRefreshToken(tokenDoc.auth0.token);
    /**
     *  await axios.get(`${global.env.AUTH0.BASE_URL}/v2/logout?client_id=${global.env.AUTH0.CLIENT_ID}`);
     */

    res.clearCookie('token');
    res.clearCookie('isAuthenticated');
    res.cookie('isAuthenticated', false);

    return res.status(200).send('logout_successfully');
  } catch (error) {
    return res.status(400).send('error');
  }
};

const retrieveAuth0UserData = async ({ auth0Id }) => {
  try {
    const auth0UserDoc = await global.models[global.env.DOMAIN].AUTH0.findOne(
      { user_id: auth0Id },
      {
        email: 1,
        nickname: 1,
        picture: 1,
      },
    );
    return auth0UserDoc;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
  }
};

const nativeTokenExchange = async (req, res) => {
  const decodedData = decrypt(req.body.token);
  const calculatedExpireTime = await addSecondInCurrentTimeForExpireTime(120);

  if (decodedData.expiryTime < calculatedExpireTime) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'we_apologize_for_the_inconvenience_the_request_cannot_be_processed_as_it_has_expired',
    );
  }

  try {
    const decodeAuth0IdToken = await decodeIdToken(decodedData?.idToken);

    const { refreshToken } = await saveTokenInDatabase({
      decodeAuth0IdToken,
      auth0TokenInfo: {
        refresh_token: decodedData?.refreshToken,
      },
    });

    const data4responseObject = {
      req,
      code: httpStatus.OK,
      message: 'the_token_and_other_specific_details_have_been_successfully_retrieved',
      payload: {
        result: {
          token: refreshToken,
        },
      },
    };

    return res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'an_unexpected_error_occurred');
  }
};

module.exports = {
  login,
  logout,
  retrieveAuth0UserData,
  getLoginPageUrl,
  nativeTokenExchange,
};
