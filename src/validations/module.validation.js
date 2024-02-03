const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getStaffModule = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  getStaffModule,
};
