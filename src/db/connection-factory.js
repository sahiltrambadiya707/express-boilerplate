const { isEmpty } = require('lodash');
const ApiError = require('@utils/ApiError');
const logger = require('@config/logger');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

/* ConnectionFactory */
module.exports = function (config) {
  this.connections = {};

  this.getConnection = async (domain, db) => {
    let domainName = domain;
    if (
      isEmpty(domainName) ||
      isEmpty(config.MONGODB[domainName]) ||
      typeof config.MONGODB[domainName] === 'undefined' ||
      isEmpty(db) ||
      typeof db === 'undefined' ||
      isEmpty(db.NAME)
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Domain/DB cannot be empty!');
    }

    domainName = domainName.trim().toUpperCase();
    const connectionName = `${domainName}#${db.NAME.trim().toUpperCase()}`;

    // Check if we already created a connection - if yes, return that, else, create a new connection, store and return.
    if (this.connections[connectionName]) {
      logger.info(`Connection to database (domain: ${domainName}, db: ${db.NAME}) successful!`);
      return this.connections[connectionName];
    }
    const connection = mongoose.createConnection(`${config.MONGODB[domainName].URI}/${db.NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.on('connected', () =>
      logger.info(`Connection to database (domain: ${domainName}, db: ${db.NAME}) successful!`),
    );
    connection.on('error', (error) =>
      logger.error(
        `Connection to database (domain: ${domainName}, db: ${db.NAME}) failed! Error: ${error.message}\n${error.stack}`,
      ),
    );
    connection.on('disconnected', () =>
      logger.info(`Connection to database (domain: ${domainName}, db: ${db.NAME}) terminated!`),
    );

    /* If the Node process ends, close the Mongoose connection */
    process.on('SIGINT', () => {
      connection.close(() => {
        logger.error(`Connection to database (domain: ${domainName}, db: ${db.NAME}) terminated on SIGINT!`);
        process.exit(0);
      });
    });

    this.connections[connectionName] = connection;
    logger.info(`Connection to database (domain: ${domainName}, db: ${db.NAME}) successful!`);

    return this.connections[connectionName];
  };
};
