/**
 * Log incoming requests
 */
const flatten = require('flat');
const { v4: uuidv4 } = require('uuid');
const { isEmpty } = require('lodash');

const logger = require('@config/logger');
const utils = require('@utils/utils');

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (req, res, next) => {
  if (req.originalUrl === '/') {
    res.status(200).send('OK');
    return;
  }

  req.requestId = uuidv4(); // assign a short id to the request so that can be correlated with the response

  let messageToLog = `REQ [${req.requestId}] [${req.method}] ${req.originalUrl}`;
  if (req.user) {
    messageToLog += `\nfrom: ${req.user._id} (type: ${req.user.type})`;
  }

  if (!isEmpty(req.body)) {
    let body = { ...req.body };
    body = flatten(body); // flattening the body for logging
    messageToLog += `\nbody: ${JSON.stringify(body, null, 4)}`;
  }

  if (!isEmpty(req.headers)) {
    let headers = { ...req.headers };
    delete headers.authorization;
    headers = utils.sortByKeys(headers);
    messageToLog += `\nheaders: ${JSON.stringify(headers)}`;
  }

  if (/about(\??(.*)$|$)/i.test(req.originalUrl)) {
    logger.info(messageToLog);
    next();
  }
  logger.info(messageToLog);

  next();
};
