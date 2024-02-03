const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { createResponseObject } = require('@utils/utils');
const { regularTokenAuth } = require('@utils/auth.util');

// eslint-disable-next-line consistent-return
const auth = () => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

  if (token) {
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, global.env.JWT.SECRET);
    } catch (error) {
      const data4responseObject = {
        req,
        code: httpStatus.UNAUTHORIZED,
        message: 'authorization_required',
        payload: {},
      };
      return res.status(httpStatus.UNAUTHORIZED).json(createResponseObject(data4responseObject));
    }

    if (decodedToken?.aud === 'Boilerplate:RT') {
      regularTokenAuth({ req, res, next, decodedToken, token });
    } else {
      const data4responseObject = {
        req,
        code: httpStatus.UNAUTHORIZED,
        message: 'authorization_required',
        payload: {},
      };
      return res.status(httpStatus.UNAUTHORIZED).json(createResponseObject(data4responseObject));
    }
  } else {
    const data4responseObject = {
      req,
      code: httpStatus.UNAUTHORIZED,
      message: 'authorization_required',
      payload: {},
    };
    return res.status(httpStatus.UNAUTHORIZED).json(createResponseObject(data4responseObject));
  }
};

module.exports = auth;
