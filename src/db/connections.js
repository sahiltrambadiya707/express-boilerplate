/**
 * MongoDB / Mongoose
 */
const mongoose = require('mongoose');
const logger = require('@config/logger');
const TOKEN = require('@models/token.model');
const LOG = require('@models/log.model');
const AUTH0 = require('@models/auth0.model');
const MODULE = require('@models/module.model');
const PERMISSION = require('@models/permission.model');
const ROLE = require('@models/role.model');
const USER = require('@models/user.model');
const DOCUMENT = require('@models/document.model');
const CONVERSATION = require('@models/conversation.model');
const MESSAGES = require('@models/messages.model');
const FIELD_RESTRICT_SCHEMA = require('@models/fieldRestrictSchema.model');
const config = require('./database-config');
const ConnectionFactory = require('./connection-factory');

module.exports = async () => {
  mongoose.pluralize(null); // So that mongoose doesn't try to pluralize the schema and map accordingly.
  let models;

  try {
    const connectionFactory = new ConnectionFactory(config);
    // Domain Connections

    const connectionInDbName = await connectionFactory.getConnection(
      global.env.DOMAIN,
      config.MONGODB[global.env.DOMAIN].DATABASE[global.env.DATABASE_NAME],
    );

    const mongooseConnections = {
      [global.env.DOMAIN]: {
        [global.env.DATABASE_NAME]: connectionInDbName,
      },
    };

    const DB_COLLECTION = config.MONGODB[global.env.DOMAIN].DATABASE[global.env.DATABASE_NAME].COLLECTION;

    global.collections = DB_COLLECTION;
    /* All the (mongoose) models to be defined here */
    models = {
      [global.env.DOMAIN]: {
        TOKEN: TOKEN(mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME], DB_COLLECTION.TOKEN),
        LOG: LOG(mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME], DB_COLLECTION.LOG),
        AUTH0: AUTH0(mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME], DB_COLLECTION.AUTH0),
        MODULE: MODULE(mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME], DB_COLLECTION.MODULE),
        PERMISSION: PERMISSION(mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME], DB_COLLECTION.PERMISSION),
        ROLE: ROLE(mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME], DB_COLLECTION.ROLE),
        USER: USER(mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME], DB_COLLECTION.USER),
        DOCUMENT: DOCUMENT(mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME], DB_COLLECTION.DOCUMENT),
        CONVERSATION: CONVERSATION(
          mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME],
          DB_COLLECTION.CONVERSATION,
        ),
        MESSAGES: MESSAGES(mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME], DB_COLLECTION.MESSAGES),
        FIELD_RESTRICT_SCHEMA: FIELD_RESTRICT_SCHEMA(
          mongooseConnections[global.env.DOMAIN][global.env.DATABASE_NAME],
          DB_COLLECTION.FIELD_RESTRICT_SCHEMA,
        ),
      },
    };

    return models;
  } catch (error) {
    logger.error(`Error encountered while trying to create database connections and models:\n${error.stack}`);
    return null;
  }
};
