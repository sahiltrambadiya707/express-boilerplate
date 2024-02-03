/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const httpStatus = require('http-status');
const ApiError = require('@utils/ApiError');
const { ObjectId } = require('mongoose').Types;

/**
 * Available permissions
 * can_add
 * can_read
 * can_read
 * can_select
 * can_update
 */

module.exports = (modulePermissions) => (req, _, next) => {
  const { user } = req;

  function checkPermissions(element) {
    return new Promise((resolve, reject) => {
      const modulePermission = element;

      global.models[global.env.DOMAIN].PERMISSION.aggregate([
        {
          $match: {
            role: new ObjectId(user.role),
          },
        },
        {
          $lookup: {
            from: global.collections.MODULE,
            localField: 'module',
            foreignField: '_id',
            as: 'module',
          },
        },
        {
          $unwind: {
            path: '$module',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            'module.code': modulePermission.module,
            [modulePermission.permission]: true,
          },
        },
      ])
        .then((permissionDoc) => {
          if (permissionDoc.length > 0) {
            resolve(true); // Permission granted
          } else {
            resolve(false); // Permission denied
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function checkNestedConditions(conditions, operator) {
    if (operator === 'and') {
      for (const condition of conditions) {
        const permissionGranted = await checkPermissions(condition);
        if (!permissionGranted) {
          return false;
        }
      }
      return true;
    }
    if (operator === 'or') {
      for (const condition of conditions) {
        const permissionGranted = await checkPermissions(condition);
        if (permissionGranted) {
          return true;
        }
      }
      return false;
    }
    throw new Error('Invalid operator');
  }

  async function checkNext() {
    for (const permissionSet of modulePermissions) {
      let { conditions = [] } = permissionSet;
      const { operator = 'or' } = permissionSet;

      if (conditions?.length <= 0) {
        conditions = [{ ...permissionSet }];
      }

      const permissionGranted = await checkNestedConditions(conditions, operator);

      if (permissionGranted) {
        return next();
      }
    }

    next(new ApiError(httpStatus.FORBIDDEN, 'permission_denied'));
  }

  checkNext().catch(() => {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'internal_server_error'));
  });
};

/**
 *
 * Permission check with multiple modules with conditions
 *
 * checkPermission([
 *   {
 *     operator: "and", // or "or"
 *     conditions: [
 *       { module: systemModules.COMPANY, permission: "can_select" },
 *       { module: systemModules.PUBLIC_COMPANY_MODULE, permission: "can_select" },
 *       {
 *         operator: "or",
 *         conditions: [
 *           { module: systemModules.MODULE_A, permission: "read" },
 *           { module: systemModules.MODULE_B, permission: "write" },
 *         ],
 *       },
 *     ],
 *   },
 *    This is work like a "or" operator if any one is true then is works
 *   {
 *     operator: "or", // or "or"
 *     conditions: [
 *       { module: systemModules.COMPANY, permission: "can_select" },
 *       {
 *         operator: "or",
 *         conditions: [
 *           { module: systemModules.MODULE_A, permission: "read" },
 *           { module: systemModules.MODULE_B, permission: "write" },
 *         ],
 *       },
 *     ],
 *   },
 * ]);
 */
