const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

const activate = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const resend = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

const forgot = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const passwordReset = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  register,
  activate,
  resend,
  login,
  forgot,
  passwordReset,
};
