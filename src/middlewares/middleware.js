const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multipartFormParser = require('express-fileupload');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { localePath } = require('@config/path');
const logIncomingRequest = require('@middlewares/log-incoming-request');

module.exports = (app, logger) => {
  /* All middleware */
  const corsOpts = {
    origin: global.env.CORS_ORIGIN,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  };
  app.use(cors(corsOpts));
  app.use(cookieParser());

  app.use(express.json({ limit: '10mb' })); // support parsing of application/json type post data
  app.use(express.urlencoded({ extended: true })); // support parsing of application/x-www-form-urlencoded post data
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  // sanitize request data
  app.use(mongoSanitize());

  // gzip compression
  app.use(compression());

  logger.info(`Path to locale path: ${localePath}`);
  app.use(
    '/locales',
    express.static(localePath, {
      maxAge: 24 * 60 * 60 * 10000,
      //  maxAge: 7 * 24 * 60 * 60 * 1000
    }),
  );

  // file size limit in bytes
  const maxFileSizeLimit = 20000000; // 20 mb

  // parse multipart form
  app.use(
    multipartFormParser({
      limits: {
        fieldSize: maxFileSizeLimit,
      },
      parseNested: true,
      defParamCharset: 'utf8',
    }),
  );

  // Configure the session store in your Express application.
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: `${global.env.MONGOOSE.URL}/${global.env.MONGOOSE.DATABASE_NAME}`,
        autoRemove: 'interval',
        autoRemoveInterval: 60,
        ttl: 600,
      }),
      secret: global.env.JWT.SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 600000 },
    }),
  );

  app.use(logIncomingRequest);
};
