const { ObjectId } = require('mongodb');
const { encrypt, decrypt } = require('@utils/crypto');
const { generateToken, saveToken, addSecondInCurrentTimeForExpireTime } = require('@utils/auth.util');
const ApiError = require('@utils/ApiError');
const httpStatus = require('http-status');
const { sendEmail } = require('@utils/nodemailer');
const { default: jwtDecode } = require('jwt-decode');

const register = async ({ body }) => {
  const { email, password } = body;

  const checkUser = await global.models[global.env.DOMAIN].USER.findOne({ email });

  if (checkUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'the_user_already_exits');
  }

  const userId = new ObjectId();
  const data = {
    _id: userId,
    email,
    password: encrypt(password),
  };

  try {
    const userData = await global.models[global.env.DOMAIN].USER.create(data);
    const token = generateToken({ userId });
    const calculatedExpireTime = await addSecondInCurrentTimeForExpireTime(86400);

    const tokenData = {
      userId,
      local: {
        token,
        expires: calculatedExpireTime,
        blacklisted: false,
      },
    };
    await saveToken(tokenData);

    const mail = {
      to: email,
      subject: 'Account activation link',
      html: `  <h1 style="color:#fff; background-color:green; text-align:center;">User Verification</h1>
                  <h1>Please click the link to activate your account</h1>
                 <a href="${global.env.USER_PANEL_URL}/user/activate/?token=${token}">${global.env.USER_PANEL_URL}/user/activate/?token=${token}</a>
              `,
    };

    await sendEmail(mail);

    return userData;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
  }
};

const activate = async ({ query }) => {
  const { token } = query;

  if (token) {
    let decodedToken;
    try {
      decodedToken = jwtDecode.verify(token, global.env.JWT.SECRET);
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
    }

    try {
      const user = await global.models[global.env.DOMAIN].USER.findById(decodedToken.user);

      if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'we_were_unable_to_find_a_user_for_this_token');
      }

      if (user.is_verified) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'this_user_has_already_been_verified');
      }

      user.is_verified = true;
      user.expires = null;

      await user.save();
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
    }
  }
};

const resend = async ({ body }) => {
  const { email } = body;
  try {
    const user = await global.models[global.env.DOMAIN].USER.findOne({ email });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'we_were_unable_to_find_a_user_for_this_token');
    }

    if (user.is_verified) throw new ApiError(httpStatus.BAD_REQUEST, 'this_user_has_already_been_verified');

    const token = generateToken(user._id);

    const mail = {
      to: email,
      subject: 'Account activation link',
      html: `  <h1 style="color:#fff; background-color:green; text-align:center;">User Verification</h1>
                <h1>Please click the link to activate your account</h1>
               <a href="${global.env.USER_PANEL_URL}/user/activate/${token}">${global.env.USER_PANEL_URL}/user/activate/${token}</a>
            `,
    };

    await sendEmail(mail);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
  }
};

const login = async ({ body }) => {
  const { email, password } = body;
  try {
    const findUser = await global.models[global.env.DOMAIN].USER.findOne({
      email,
    });

    if (!findUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'incorrect_credentials');
    }

    const passwordMatch = await decrypt(findUser.password);

    if (passwordMatch !== password) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'incorrect_credentials');
    }

    const token = generateToken(findUser._id);

    if (!token) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'incorrect_credentials');
    }

    return token;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
  }
};

const forgot = async ({ body }) => {
  const { email } = body;

  try {
    const user = await global.models[global.env.DOMAIN].USER.findOne({ email });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'the_email_is_not_associated_with_any_account');
    }

    const token = generateToken({ userId: user._id, expires: '1h' });

    user.reset_password_token = token;
    user.reset_password_expires = Date.now() + 3600000;

    const saveUser = await user.save();

    const mail = {
      to: email,
      subject: 'Password reset link',
      html: `  <h5 style="color:#fff; background-color:green; text-align:center;">Password reset</h5>
                <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process. \n\n If you did not request this, please ignore this phone and your password will remain unchanged.\n</p>
               <a href="${global.env.USER_PANEL_URL}/user/newpassword/${saveUser.reset_password_token}">${global.env.USER_PANEL_URL}/user/newpassword/${saveUser.reset_password_token}</a>
            `,
    };

    await sendEmail(mail);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
  }
};

const passwordReset = async ({ body, query }) => {
  const { password } = body;
  const { token } = query;

  try {
    const user = await global.models[global.env.DOMAIN].USER.findOne({
      reset_password_token: token,
      reset_password_expires: { $gt: Date.now() },
    });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'password_reset_token_is_invalid_or_has_expired');
    } else {
      user.password = encrypt(password);
      user.reset_password_token = undefined;
      user.reset_password_expires = undefined;

      await user.save();
    }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
  }
};

module.exports = {
  register,
  activate,
  resend,
  login,
  forgot,
  passwordReset,
};
