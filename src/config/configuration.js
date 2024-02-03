const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

const environmentArg = process.argv[2];
const environment = environmentArg || "development";

dotenv.config({ path: path.join(`.env.${environment}`) });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(4000),
    APP_NAME: Joi.string(),
    APP_RELEASE: Joi.string(),
    APP_VERSION: Joi.string(),
    APP_ENVIRONMENT: Joi.string(),
    NODE_ENV: Joi.string().valid("production", "development").required(),
    HOST: Joi.string().required(),
    DOMAIN: Joi.string().uppercase().required(),
    CORS_ORIGIN: Joi.string(),

    USER_PANEL_URL: Joi.string().required().description("Provide the URL for the user panel."),

    JWT_SECRET: Joi.string().required().description("Set a secure secret key for generating JSON Web Tokens (JWTs)."),

    MONGODB_CONNECTION_URI: Joi.string().required().description("Provide MongoDB connection uri"),
    DATABASE_NAME: Joi.string().required().description("Provide Database Name"),

    AUTH0_DOMAIN: Joi.string().required().description("Provide auth0 domain"),
    AUTH0_AUDIENCE: Joi.string().required().description("Provide audience domain"),
    AUTH0_CLIENT_ID: Joi.string().required().description("Provide auth0 client id"),
    AUTH0_CLIENT_SECRET: Joi.string().required().description("Provide auth0 client secret"),
    AUTH0_BASE_URL: Joi.string().required().description("Provide auth0 base url"),
    AUTH0_REDIRECT_URL: Joi.string().required().description("Provide auth0 redirect url"),
    AUTH0_CONNECTION_ID: Joi.string().required().description("Provide auth0 connection id"),
    AUTH0_GRANT_TYPE: Joi.string().required().description("Provide auth0 grant type"),
    AUTH0_RESULT_LINK: Joi.string().required().description("Provide auth0 result link"),
    AUTH0_TTL_SEC: Joi.string().required().description("Provide auth0 ttl sec"),
    AUTH0_LOGIN_SUCCESS_REDIRECT_URL: Joi.string().required().description("Provide auth0 login success redirect url"),
    AUTH0_CALLBACK_URL: Joi.string().required().description("Provide auth0 callback url"),
    AZURE_HOSTING_URL: Joi.string().required().description("Provide auth0 hosting url"),
    AUTH0_CONNECTION_NAME: Joi.string().required().description("Provide auth0 connection name"),

    SMTP_HOST: Joi.string().required().description("Provide smtp host"),
    SMTP_PORT: Joi.string().required().description("Provide smtp port"),
    SMTP_USERNAME: Joi.string().required().description("Provide smtp username"),
    SMTP_PASSWORD: Joi.string().required().description("Provide smtp password"),
    EMAIL_FROM: Joi.string().required().description("Provide email from"),

    S3_ACCESS_KEY_ID: Joi.string().required().description("Provide s3 access key id"),
    S3_SECRET_ACCESS_KEY: Joi.string().required().description("Provide s3 secret access key"),
    S3_REGION: Joi.string().required().description("Provide s3 region"),
    S3_BUCKET_NAME: Joi.string().required().description("Provide s3 bucket name"),

    STORAGE_TYPE: Joi.string().required().description("Provide storage type"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  // global.env = {
  PORT: envVars.PORT,
  APP_NAME: envVars.APP_NAME,
  APP_RELEASE: envVars.APP_RELEASE,
  APP_VERSION: envVars.APP_VERSION,
  APP_ENVIRONMENT: envVars.APP_ENVIRONMENT,
  NODE_ENV: envVars.NODE_ENV,
  HOST: envVars.HOST,
  DOMAIN: envVars.DOMAIN,
  CORS_ORIGIN: envVars.CORS_ORIGIN.split(","),

  USER_PANEL_URL: envVars.USER_PANEL_URL,

  JWT: {
    SECRET: envVars.JWT_SECRET,
  },

  MONGOOSE: {
    URL: envVars.MONGODB_CONNECTION_URI,
    DATABASE_NAME: envVars.DATABASE_NAME,
  },

  AUTH0: {
    DOMAIN: envVars.AUTH0_DOMAIN,
    AUDIENCE: envVars.AUTH0_AUDIENCE,
    CLIENT_ID: envVars.AUTH0_CLIENT_ID,
    CLIENT_SECRET: envVars.AUTH0_CLIENT_SECRET,
    BASE_URL: envVars.AUTH0_BASE_URL,
    REDIRECT_URL: envVars.AUTH0_REDIRECT_URL,
    CONNECTION_ID: envVars.AUTH0_CONNECTION_ID,
    GRANT_TYPE: envVars.GRANT_TYPE,
    RESULT_LINK: envVars.RESULT_LINK,
    TTL_SEC: envVars.TTL_SEC,
    LOGIN_SUCCESS_REDIRECT_URL: envVars.LOGIN_SUCCESS_REDIRECT_URL,
    CALLBACK_URL: envVars.AUTH0_CALLBACK_URL,
    AZURE_HOSTING_URL: envVars.AZURE_HOSTING_URL,
    CONNECTION_NAME: envVars.AUTH0_CONNECTION_NAME,
  },

  EMAIL: {
    SMTP: {
      HOST: envVars.SMTP_HOST,
      PORT: envVars.SMTP_PORT,
      AUTH: {
        USER: envVars.SMTP_USERNAME,
        PASS: envVars.SMTP_PASSWORD,
      },
    },
    FROM: envVars.EMAIL_FROM,
  },

  AWS: {
    S3_ACCESS_KEY_ID: envVars.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: envVars.S3_SECRET_ACCESS_KEY,
    S3_REGION: envVars.S3_REGION,
    S3_BUCKET_NAME: envVars.S3_BUCKET_NAME,
  },

  STORAGE_TYPE: envVars.STORAGE_TYPE,
  // };
};
