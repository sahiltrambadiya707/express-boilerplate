const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('@utils/pick');
const ApiError = require('@utils/ApiError');

const validate = (schema) => (req, _, next) => {
  const locale = req.headers.locale ? req.headers.locale : 'en';
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const messageInLocale = require(`@public/locales/${locale}/backendMessages.json`);

  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({
      errors: { label: 'key', wrap: { label: false } },
      stripUnknown: false,
      abortEarly: false,
    })
    .messages(messageInLocale.JOI_VALIDATION)
    .validate(object);

  if (error) {
    const { details } = error;

    const errorData = {};

    /**
     * Create Object of Errors
     *
     * e.g. { email: "email is required" }
     */
    // eslint-disable-next-line array-callback-return
    details.map((item) => {
      errorData[item.context.key] = item.message;
    });

    return next(new ApiError(httpStatus.BAD_REQUEST, 'validation_error', errorData, 'VALIDATION'));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
