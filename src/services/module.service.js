const httpStatus = require('http-status');
const ApiError = require('@utils/ApiError');
const { ObjectId } = require('mongoose').Types;
const { retrievedRestrictedFields } = require('./fieldRestriction.service');

const getAccessibleMenus = async ({ user }) => {
  const permissionDocs = await global.models[global.env.DOMAIN].PERMISSION.find(
    {
      role: new ObjectId(user.role),
      $or: [{ can_read: true }, { can_select: true }],
      deleted: {
        $ne: true,
      },
    },
    { module: 1 },
  );

  const accessibleModulesIds = permissionDocs.map((p) => p.module);

  try {
    const accessibleModules = await global.models[global.env.DOMAIN].MODULE.aggregate([
      {
        $match: {
          parentId: null,
          _id: {
            $in: accessibleModulesIds,
          },
        },
      },
      {
        $lookup: {
          from: global.collections.PERMISSION,
          let: {
            moduleId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$moduleId', '$module'],
                },
                role: new ObjectId(user.role),
                deleted: {
                  $ne: true,
                },
              },
            },
            {
              $project: {
                _id: 0,
                deleted: 0,
                module: 0,
                createdAt: 0,
                updatedAt: 0,
                role: 0,
                __v: 0,
              },
            },
          ],
          as: 'permission',
        },
      },
      {
        $unwind: {
          path: '$permission',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          code: 1,
          routes: 1,
          permission: 1,
        },
      },
    ]);
    return accessibleModules;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'while_attempting_to_retrieve_the_roles_an_issue_occurred');
  }
};

/**
 * Get List of Modules
 */
const getModules = async ({ user }) => {
  const { moduleRF } = await retrievedRestrictedFields({
    role: user.role,
    schema_name: [global.collections.MODULE],
  });

  try {
    return global.models[global.env.DOMAIN].MODULE.find({}, { ...moduleRF });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'while_attempting_to_retrieve_the_modules_an_issue_occurred');
  }
};

module.exports = {
  getAccessibleMenus,
  getModules,
};
