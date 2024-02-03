const mongoose = require('mongoose');
const httpStatus = require('http-status');
const logger = require('@config/logger');
const ApiError = require('@utils/ApiError');
const { createResponseObject } = require('@utils/utils');

const errorConverter = (err, _, __, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, '', error?.errorType || '', false, err.stack);
  }

  next(error);
};

const errorHandler = (err, req, res, _) => {
  let { statusCode, message } = err;
  const { errorDescription = '', errorType = '' } = err;
  if (global.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  if (global.env.NODE_ENV === 'development') {
    logger.error(err);
  }

  logger.error(`${req.originalUrl} - Error caught by error-handler (router.js): ${err.message}\n${err.stack}`);

  const data4responseObject = {
    req,
    code: statusCode,
    message,
    type: errorType,
    payload: {
      error: errorDescription,
    },
  };

  res.status(statusCode).send(createResponseObject(data4responseObject));
};

module.exports = {
  errorConverter,
  errorHandler,
};
