const httpStatus = require('http-status');
const catchAsync = require('@utils/catchAsync');
const { traditionalAuthService } = require('@services/index');
const { createResponseObject } = require('@utils/utils');

const register = catchAsync(async (req, res) => {
  const userDoc = await traditionalAuthService.register({
    body: req.body,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: 'a_verification_mail_has_been_sent_successfully',
    payload: { result: userDoc },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const activate = catchAsync(async (req, res) => {
  const userDoc = await traditionalAuthService.activate({
    query: req.query,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: 'the_account_has_been_verified_successfully',
    payload: {
      result: userDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const resend = catchAsync(async (req, res) => {
  const userDoc = await traditionalAuthService.resend({
    body: req.body,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: 'a_password_reset_mail_has_been_sent_successfully',
    payload: {
      result: userDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const login = catchAsync(async (req, res) => {
  const userDoc = await traditionalAuthService.login({
    body: req.body,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: 'login_successful',
    payload: {
      result: userDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const forgot = catchAsync(async (req, res) => {
  const userDoc = await traditionalAuthService.forgot({
    body: req.body,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: 'a_password_reset_mail_has_been_sent_successfully',
    payload: {
      result: userDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const passwordReset = catchAsync(async (req, res) => {
  const userDoc = await traditionalAuthService.passwordReset({
    query: req.query,
    body: req.body,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: 'your_password_has_been_updated',
    payload: {
      result: userDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

module.exports = {
  register,
  activate,
  resend,
  login,
  forgot,
  passwordReset,
};
