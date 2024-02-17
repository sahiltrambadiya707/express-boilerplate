const httpStatus = require('http-status');
const ApiError = require('@utils/ApiError');
const { toDotNotation, separateTrueFalseFromObject } = require('@utils/utils');

const retrieveFieldRestrictionsByRole = async ({ query, params }) => {
  const { role } = params;
  const { limit, page, descending, sortBy } = query;

  const options = {
    limit: limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10,
    page: page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1,
    get skip() {
      return (this.page - 1) * this.limit;
    },
    sortBy: sortBy && sortBy !== '' ? sortBy : 'createdAt',
    sortOrder: descending && descending === 'true' ? -1 : 1,
  };

  try {
    const list = await global.models[global.env.DOMAIN].FIELD_RESTRICT_SCHEMA.find({ role })
      .sort({ [options.sortBy]: options.sortOrder })
      .skip(options.skip)
      .limit(options.limit);
    const totalFound = await global.models[global.env.DOMAIN].FIELD_RESTRICT_SCHEMA.countDocuments({ role });

    return {
      return: list,
      meta: {
        totalFound,
        total_in_response: options.limit,
        current_page: options.page,
        total_pages: Math.ceil(totalFound / options.limit),
      },
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
  }
};

const retrieveFieldRestrictionById = async ({ params }) => {
  const { id } = params;
  try {
    return await global.models[global.env.DOMAIN].FIELD_RESTRICT_SCHEMA.findOne({ _id: id });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
  }
};

const updateFieldRestriction = async ({ body, params }) => {
  const { id } = params;
  try {
    const { trueObj: separatedTrue, falseObj: separatedFalse } = separateTrueFalseFromObject(body);

    const reqObject = toDotNotation({ ...body });
    return await global.models[global.env.DOMAIN].FIELD_RESTRICT_SCHEMA.updateOne(
      { _id: id },
      {
        $set: { schema: reqObject, include_fields: separatedTrue, exclude_fields: separatedFalse },
      },
    );
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'an_unexpected_error_occurred');
  }
};

const retrievedRestrictedFields = async ({ role = '', schemaName = [] }) => {
  let returnObject = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const schema of schemaName) {
    // eslint-disable-next-line no-await-in-loop
    let data = await global.models[global.env.DOMAIN].FIELD_RESTRICT_SCHEMA.findOne({
      role,
      schemaName: schema,
    }).select('include_fields');
    data = data?.toJSON();
    returnObject = {
      ...returnObject,
      [`${schema}RF`]: data?.include_fields,
    };
  }

  return returnObject;
};

module.exports = {
  retrieveFieldRestrictionsByRole,
  retrieveFieldRestrictionById,
  updateFieldRestriction,
  retrievedRestrictedFields,
};
