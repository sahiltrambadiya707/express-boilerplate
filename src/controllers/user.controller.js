const httpStatus = require('http-status');
const catchAsync = require('@utils/catchAsync');
const { userService } = require('@services/index');
const { createResponseObject } = require('@utils/utils');

const updateUser = catchAsync(async (req, res) => {
  const userDoc = await userService.updateUser({
    user: req.user,
    params: req.params,
    body: req.body,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: '',
    payload: {
      result: userDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const retrieveUser = catchAsync(async (req, res) => {
  const userDoc = await userService.retrieveUser({
    user: req.user,
    params: req.params,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: '',
    payload: {
      result: userDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

module.exports = {
  updateUser,
  retrieveUser,
};
