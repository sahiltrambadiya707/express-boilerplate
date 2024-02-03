/**
 * Log incoming requests
 */
const os = require("os");
const shortid = require("shortid");
const logger = require("@config/logger");

const errorLog = async (req, message) => {
  req.requestId = shortid.generate(); // assign a short id to the request so that can be correlated with the response

  /* log the request in database */
  const networkInterfaces = os.networkInterfaces();
  const entry = {
    description: "Error request logged",
    message,
    request: {
      id: req.requestId,
      body: req.body,
      headers: req.headers,
      ip: req.ip,
      method: req.method,
      path: req.originalUrl,
      protocol: req.protocol,
      userAgent: req.get("user-agent"),
    },
    server: {
      hostname: os.hostname(),
      networkInterfaces,
    },
    time: Date.now(),
  };

  try {
    await global.models[global.env.DOMAIN].LOG(entry).save({ checkKeys: false });
  } catch (error) {
    if (error) {
      logger.error(`Error encountered while trying to log the incoming request:\n${  error}`);
    }
  }
  /**
   * errorLog(req, JSON.stringify(data4responseObject));
   */
};

module.exports = { errorLog };
