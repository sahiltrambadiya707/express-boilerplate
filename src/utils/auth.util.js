const httpStatus = require('http-status');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const axios = require('axios').default;
const crypto = require('crypto');
const { createResponseObject, als } = require('@utils/utils');
const ApiError = require('@utils/ApiError');

const generateToken = async ({
  userId,
  expires = '1d',
  secret = global.env.JWT.SECRET,
  aud = 'Boilerplate:RT',
  others = {},
}) => {
  const payload = {
    user: userId,
    iat: moment().unix(),
    exp: expires,
    aud,
    ...others,
  };
  return jwt.sign(payload, secret);
};

const expireTimeCreate = (time, unit) => {
  let expireTime = '0';
  switch (unit) {
    case 'seconds':
      expireTime = Number(time);
      break;
    case 'minutes':
      expireTime = Number(time) * 60;
      break;
    case 'hours':
      expireTime = `${time}h`;
      break;
    case 'days':
      expireTime = `${time}d`;
      break;
    default:
      break;
  }

  return expireTime;
};

const saveToken = async (data) => {
  const tokenDoc = await global.models[global.env.DOMAIN].TOKEN.create(data);
  return tokenDoc;
};

const checkTokenIsExpire = (ExpireTime) => Number(ExpireTime) < moment().unix();

const addSecondInCurrentTimeForExpireTime = (second) => moment().unix() + second;

const getAuth0AccessToken = async () => {
  const findToken = await global.models[global.env.DOMAIN].COMMON_TOKEN.findOne({ type: 'AUTH0_ACCESS_TOKEN' });

  const checkToken = checkTokenIsExpire(findToken?.expires);

  if (checkToken || !findToken) {
    const options = {
      method: 'POST',
      url: `${global.env.AUTH0.BASE_URL}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: global.env.AUTH0.CLIENT_ID,
        client_secret: global.env.AUTH0.CLIENT_SECRET,
        audience: global.env.AUTH0.AUDIENCE,
        grant_type: global.env.AUTH0.GRANT_TYPE,
      },
    };

    try {
      const response = await axios.request(options);
      const calculatedExpireTime = addSecondInCurrentTimeForExpireTime(response.data?.expires_in);
      findToken.token = response.data?.access_token;
      findToken.expires = calculatedExpireTime;
      await findToken.save();
      return {
        token: response.data?.access_token,
      };
    } catch (error) {
      throw new ApiError(JSON.stringify(error?.response?.data));
    }
  } else {
    return { token: findToken.token };
  }
};

const generatePKCE = () => {
  const codeVerifier = crypto.randomBytes(32).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const state = crypto.randomBytes(12).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return {
    codeVerifier,
    codeChallenge,
    state,
  };
};

const regularTokenAuth = ({ req, res, next, decodedToken, token }) => {
  global.models[global.env.DOMAIN].TOKEN.findOne({ auth0Id: decodedToken?.auth0Id, 'local.token': token })
    .populate({
      path: 'userId',
      select: 'rechten.role',
    })
    .then((user) => {
      als.run(user?.userId?._id, () => {
        req.user = {
          auth0Id: user.auth0Id,
          userId: user?.userId?._id,
          role: user?.userId?.rechten?.role,
        };
        if (req.route.path === '/logout') {
          req.user = {
            ...req.user,
            token,
          };
        }

        next();
      });
    })
    .catch(() => {
      const data4responseObject = {
        req,
        code: httpStatus.UNAUTHORIZED,
        message: 'Authorization required',
        payload: {},
        logPayload: false,
      };
      return res.status(httpStatus.UNAUTHORIZED).json(createResponseObject(data4responseObject));
    });
};

const generateSecurePassword = (options = {}) => {
  const defaultOptions = {
    length: 12,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: '!@#$%^&*()_+',
  };
  const opts = { ...defaultOptions, ...options };

  const charSets = [];
  if (opts.lowercase) charSets.push('abcdefghijklmnopqrstuvwxyz');
  if (opts.uppercase) charSets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (opts.numbers) charSets.push('0123456789');
  if (opts.symbols) charSets.push(opts.symbols);

  const allChars = charSets.join('');
  let password = '';
  for (let i = 0; i < opts.length; i++) {
    const randomIndex = crypto.getRandomValues(new Uint8Array(1))[0] % allChars.length;
    password += allChars[randomIndex];
  }
  return password;
};

module.exports = {
  saveToken,
  generateToken,
  expireTimeCreate,
  checkTokenIsExpire,
  getAuth0AccessToken,
  addSecondInCurrentTimeForExpireTime,
  generatePKCE,
  regularTokenAuth,
  generateSecurePassword,
};
