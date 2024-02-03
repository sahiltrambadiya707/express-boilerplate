const nodemailer = require("nodemailer");

const logger = require("@config/logger");

const transport = nodemailer.createTransport(global.env.EMAIL.SMTP);

transport
  .verify()
  .then(() => logger.info("Connected to email server"))
  .catch(() => logger.warn("Unable to connect to email server. Make sure you have configured the SMTP options in .env"));

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: global.env.EMAIL.FROM, to, subject, text };
  await transport.sendMail(msg);
};

module.exports = {
  transport,
  sendEmail,
};
