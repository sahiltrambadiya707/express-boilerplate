const httpStatus = require('http-status');
const ApiError = require('@utils/ApiError');
const { toDotNotation } = require('../utils/utils');

const updateUser = async ({ params, body }) => {
  const { id } = params;
  const reqData = toDotNotation({ ...body });
  try {
    return await global.models[global.env.DOMAIN].USER.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...reqData },
      },
    );
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '');
  }
};

const retrieveUser = async ({ params }) => {
  const { id } = params;
  try {
    return await global.models[global.env.DOMAIN].USER.findOne({ _id: id });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '');
  }
};

module.exports = {
  updateUser,
  retrieveUser,
};
