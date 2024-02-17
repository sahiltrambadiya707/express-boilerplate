const httpStatus = require('http-status');
const catchAsync = require('@utils/catchAsync');
const { fieldRestrictionService } = require('@services/index');
const { createResponseObject } = require('@utils/utils');

const retrieveFieldRestrictionsByRole = catchAsync(async (req, res) => {
  const fieldRestrictionDoc = await fieldRestrictionService.retrieveFieldRestrictionsByRole({
    user: req.user,
    params: req.params,
    query: req.query,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: 'field_restriction_retrieval_successful',
    payload: {
      result: {
        status: httpStatus['200_NAME'],
      },
      ...fieldRestrictionDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const retrieveFieldRestrictionById = catchAsync(async (req, res) => {
  const fieldRestrictionDoc = await fieldRestrictionService.retrieveFieldRestrictionById({
    user: req.user,
    params: req.params,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: 'field_restring_details_retrieve_successful',
    payload: {
      result: {
        status: httpStatus['200_NAME'],
      },
      data: fieldRestrictionDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

const updateFieldRestriction = catchAsync(async (req, res) => {
  const fieldRestrictionDoc = await fieldRestrictionService.updateFieldRestriction({
    user: req.user,
    params: req.params,
    body: req.body,
  });

  const data4responseObject = {
    req,
    code: httpStatus.OK,
    message: 'field_restriction_has_been_updated',
    payload: {
      result: {
        status: httpStatus['200_NAME'],
      },
      data: fieldRestrictionDoc,
    },
  };

  res.status(httpStatus.OK).send(createResponseObject(data4responseObject));
});

module.exports = {
  retrieveFieldRestrictionsByRole,
  retrieveFieldRestrictionById,
  updateFieldRestriction,
};
