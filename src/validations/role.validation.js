const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.array()
      .items(
        Joi.object().keys({
          module_name: Joi.string(),
          module_id: Joi.string().custom(objectId).required(),
          can_read: Joi.boolean().default(false),
          can_select: Joi.boolean().default(false),
          can_add: Joi.boolean().default(false),
          can_update: Joi.boolean().default(false),
          can_delete: Joi.boolean().default(false),
        })
      )
      .default([]),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.array()
      .items(
        Joi.object().keys({
          module_id: Joi.string().custom(objectId).required(),
          module_name: Joi.string().optional(),
          can_read: Joi.boolean().default(false),
          can_select: Joi.boolean().default(false),
          can_add: Joi.boolean().default(false),
          can_update: Joi.boolean().default(false),
          can_delete: Joi.boolean().default(false),
        })
      )
      .default([]),
  }),
};

const deleteRole = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const getRole = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  addRole,
  updateRole,
  deleteRole,
  getRole,
};
