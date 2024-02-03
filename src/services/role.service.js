const { ObjectId } = require('mongoose').Types;
const ApiError = require('@utils/ApiError');
const httpStatus = require('http-status');

const getRoleByCode = async ({ code }) => {
  try {
    return await global.models[global.env.DOMAIN].ROLE.findOne({ code });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'there_was_an_issue_while_attempting_to_retrieve_the_role_using_the_code');
  }
};

/**
 * Create Role
 *
 * @param {Object} data
 * @returns {Object}
 */
const addRole = async ({ body }) => {
  const { name, permissions = [] } = body;

  const code = name.replace(/ /g, '');
  const roleByCode = await getRoleByCode({ code });

  if (roleByCode) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'please_choose_another_name_because_this_name_code_already_exists');
  }

  try {
    const roleDoc = await global.models[global.env.DOMAIN].ROLE.create({
      name,
      code,
    });

    const permissionsDocs = [];

    for (const element of permissions) {
      const permission = element;

      permissionsDocs.push({
        role: new ObjectId(roleDoc._id),
        module: new ObjectId(permission.module_id),
        can_read: permission.can_read,
        can_select: permission.can_select,
        can_add: permission.can_add,
        can_update: permission.can_update,
        can_delete: permission.can_delete,
      });
    }

    if (permissionsDocs.length > 0) {
      await global.models[global.env.DOMAIN].PERMISSION.insertMany(permissionsDocs);
    }

    return roleDoc;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'there_was_an_error_encountered_while_trying_to_create_the_role');
  }
};

const updateRole = async ({ params, body }) => {
  const { roleId } = params;
  const { name, permissions = [] } = body;

  const roleDoc = await global.models[global.env.DOMAIN].ROLE.findOne({ _id: new ObjectId(roleId) });

  if (!roleDoc) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'there_was_no_role_detected');
  }

  for (const element of permissions) {
    const permission = element;

    await global.models[global.env.DOMAIN].PERMISSION.updateOne(
      {
        role: new ObjectId(roleDoc._id),
        module: new ObjectId(permission.module_id),
      },
      {
        role: new ObjectId(roleDoc._id),
        module: new ObjectId(permission.module_id),
        can_read: permission.can_read,
        can_select: permission.can_select,
        can_add: permission.can_add,
        can_update: permission.can_update,
        can_delete: permission.can_delete,
      },
      {
        upsert: true,
      },
    );
  }

  roleDoc.name = name;

  await roleDoc.save();

  return roleDoc;
};

const getRoles = async ({ query }) => {
  const { filter, limit, page, descending, sortBy } = query;

  const options = {
    limit: limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10,
    page: page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1,
    get skip() {
      return (this.page - 1) * this.limit;
    },
    sortBy: sortBy && sortBy !== '' ? sortBy : 'createdAt',
    sortOrder: descending && descending === 'true' ? -1 : 1,
  };

  let filtersQuery = {
    code: { $ne: 'SuperAdmin' },
  };

  if (filter) {
    const search = filter;

    filtersQuery = Object.assign(filtersQuery, {
      $or: [{ name: { $regex: search, $options: 'i' } }],
    });
  }

  try {
    const list = await global.models[global.env.DOMAIN].ROLE.find(filtersQuery)
      .sort({ [options.sortBy]: options.sortOrder })
      .skip(options.skip)
      .limit(options.limit);
    const totalFound = await global.models[global.env.DOMAIN].ROLE.countDocuments(filtersQuery);

    return {
      result: list,
      meta: {
        totalFound,
        total_in_response: options.list,
        current_page: options.page,
        total_pages: Math.ceil(totalFound / options.limit),
      },
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'there_seems_to_be_an_issue_with_retrieving_the_roles');
  }
};

const deleteRole = async ({ params }) => {
  const { roleId } = params;
  try {
    await global.models[global.env.DOMAIN].ROLE.deleteOne({ _id: new ObjectId(roleId) });
    await global.models[global.env.DOMAIN].PERMISSION.deleteMany({ role: new ObjectId(roleId) });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'there_was_a_problem_encountered_when_attempting_to_remove_a_role');
  }
};

const getRoleDetails = async ({ params }) => {
  const { roleId } = params;
  const roleDoc = await global.models[global.env.DOMAIN].ROLE.findOne({
    _id: new ObjectId(roleId),
    code: { $ne: 'SuperAdmin' },
  });

  if (!roleDoc) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'there_was_no_role_detected');
  }

  try {
    const permissions = await global.models[global.env.DOMAIN].MODULE.aggregate([
      {
        $project: {
          _id: 1,
          is_for_admin: 1,
          name: 1,
        },
      },
      {
        $lookup: {
          from: global.collections.PERMISSION,
          let: {
            module_id: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$module', '$$module_id'],
                },
                role: new ObjectId(roleId),
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
          _id: 0,
          module_id: '$_id',
          module_name: '$name',
          can_add: {
            $ifNull: ['$permission.can_add', false],
          },
          can_read: {
            $ifNull: ['$permission.can_read', false],
          },
          can_select: {
            $ifNull: ['$permission.can_select', false],
          },
          can_update: {
            $ifNull: ['$permission.can_update', false],
          },
          can_delete: {
            $ifNull: ['$permission.can_delete', false],
          },
        },
      },
    ]);

    return {
      role: roleDoc,
      permissions,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'there_was_an_issue_encountered_while_retrieving_role_information');
  }
};

module.exports = {
  addRole,
  updateRole,
  getRoles,
  deleteRole,
  getRoleDetails,
  getRoleByCode,
};
