const httpStatus = require("http-status");
const catchAsync = require("@utils/catchAsync");
const { moduleService } = require("@services/index");
const { createResponseObject } = require("@utils/utils");

const getAccessibleMenus = catchAsync(async (req, res) => {
  const modules = await moduleService.getAccessibleMenus({ user: req.user });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: "the_modules_that_were_needed_have_been_retrieved_successfully",
    payload: { result: modules },
    logPayload: false,
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const getModules = catchAsync(async (req, res) => {
  const modules = await moduleService.getModules({ user: req.user });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: "the_modules_were_retrieved_successfully",
    payload: { result: modules },
    logPayload: false,
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

module.exports = {
  getAccessibleMenus,
  getModules,
};
