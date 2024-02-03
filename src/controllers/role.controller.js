const httpStatus = require("http-status");
const catchAsync = require("@utils/catchAsync");
const { roleService } = require("@services/index");
const { createResponseObject } = require("@utils/utils");

const getRoles = catchAsync(async (req, res) => {
  const roles = await roleService.getRoles({ user: req.user, query: req.query });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: "roles_were_successfully_retrieved",
    payload: { return: roles },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const addRole = catchAsync(async (req, res) => {
  const roleDoc = await roleService.addRole({ body: req.body });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: "the_role_has_been_created_successfully",
    payload: { result: roleDoc },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const updateRole = catchAsync(async (req, res) => {
  const roleDoc = await roleService.updateRole({ roleId: req.params.id, body: req.body });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: "the_role_has_been_successfully_modified",
    payload: { result: roleDoc },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const deleteRole = catchAsync(async (req, res) => {
  const roleDoc = await roleService.deleteRole({ roleId: req.params.id });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: "the_role_was_successfully_deleted",
    payload: {
      result: roleDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const getRole = catchAsync(async (req, res) => {
  const roleDoc = await roleService.getRoleDetails({ user: req.user, roleId: req.params.id });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: "role_data_were_successfully_retrieved",
    payload: { result: roleDoc },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

module.exports = {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
  getRole,
};
