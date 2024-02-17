const Joi = require('joi');
const { objectId } = require('./custom.validation');

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const retrieveUser = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  updateUser,
  retrieveUser,
};
