const httpStatus = require("http-status");
const catchAsync = require("@utils/catchAsync");
const { auth0Service } = require("@services/index");
const { createResponseObject } = require("@utils/utils");

const login = catchAsync(async (req, res) => {
  const loginDoc = await auth0Service.login(req, res);

  return loginDoc;
});

const logout = catchAsync(async (req, res) => {
  const logoutDoc = await auth0Service.logout(req, res);

  return logoutDoc;
});

const retrieveAuth0UserData = catchAsync(async (req, res) => {
  const userDataDoc = await auth0Service.retrieveAuth0UserData({
    auth0Id: req.user.auth0Id,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: "the_user_auth0_data_retrieval_was_successful",
    payload: { result: userDataDoc },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const getLoginPageUrl = catchAsync(async (req, res) => auth0Service.getLoginPageUrl(req, res));

const nativeTokenExchange = catchAsync(async (req, res) => auth0Service.nativeTokenExchange(req, res));

module.exports = {
  login,
  logout,
  retrieveAuth0UserData,
  getLoginPageUrl,
  nativeTokenExchange,
};
