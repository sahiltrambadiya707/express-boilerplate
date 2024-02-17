const os = require('os');
const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const initDataBase = require('./db/database');
const initMiddleware = require('./middlewares/middleware');
const initRouter = require('./routes/v1/index');
const logger = require('./config/logger');
const initChat = require('./socket/chat');

global.models = {};
global.collections = {};
global.redisClient = {};

const runServer = async () => {
  const app = express();

  let options = {};
  if (process.env.NODE_ENV !== 'development') {
    options = {
      key: fs.readFileSync(path.join('ssl', 'private.key')),
      cert: fs.readFileSync(path.join('ssl', 'your_domain_name.crt')),
      ca: [fs.readFileSync(path.join('ssl', 'CA_root.crt')), fs.readFileSync(path.join('ssl', 'ca_bundle_certificate.crt'))],
    };
  }

  /* Logger */

  logger.info('Logger Initialized!');

  // Init Database connection
  await initDataBase(logger, app);

  logger.info(`
    APP_ENVIRONMENT: ${global.env.APP_ENVIRONMENT}
    APP_NAME: ${global.env.APP_NAME}
    APP_PORT: ${global.env.PORT}
    APP_RELEASE: ${global.env.APP_RELEASE}
    APP_VERSION: ${global.env.APP_VERSION}`);

  // connectRedisClient();
  initMiddleware(app, logger);
  initRouter(app, logger);

  const server = process.env.NODE_ENV !== 'development' ? https.createServer(options, app) : http.createServer(app);

  server.listen(global.env.PORT, () => {
    logger.info(`${global.env.APP_RELEASE} server STARTED on port: ${global.env.PORT}\n`);
  });
  initChat(server);

  server.timeout = 120000;

  process.on('warning', (warning) => {
    logger.warn(warning.name);
    logger.warn(warning.message);
    logger.warn(warning.stack);
  });

  // process.setMaxListeners(30); // or set to Infinity
  process.on('SIGINT', () => {
    server.close(() => {
      const convertToMB = (data) => Math.round((data / 1024 / 1024) * 100) / 100;
      const formatMemoryUsage = (data) => `${convertToMB(data)} MB`;
      const memoryData = process.memoryUsage();
      const memoryUsage = {
        rss: `Total memory allocated: ${formatMemoryUsage(memoryData.rss)}, `,
        heapTotal: `Total heap size: ${formatMemoryUsage(memoryData.heapTotal)}, `,
        heapUsed: `Actual memory used during the execution: ${formatMemoryUsage(memoryData.heapUsed)}, `,
        external: `V8 external memory: ${formatMemoryUsage(memoryData.external)}`,
      };
      const usageInPercent = Number((convertToMB(memoryData.heapUsed) * 100) / convertToMB(memoryData.heapTotal)).toFixed(2);
      const usageText = `${memoryUsage.rss}\n${memoryUsage.heapTotal}\n${memoryUsage.heapUsed}\n${memoryUsage.external}\nHeap usage is: ${usageInPercent}%`;
      const msg = `\`${global.env.APP_ENVIRONMENT}\` \`${
        global.env.APP_RELEASE
      }\` \`${os.hostname()}\` server *STOPPED* on *SIGINT*\`\`\`${usageText}\`\`\``;
      logger.error(msg.replace(/\//g, '').replace(/`/g, ''));
    });
  });
  process.on('SIGTERM', () => {
    server.close(() => {
      const convertToMb = (data) => Math.round((data / 1024 / 1024) * 100) / 100;
      const formatMemoryUsage = (data) => `${convertToMb(data)} MB`;
      const memoryData = process.memoryUsage();
      const memoryUsage = {
        rss: `Total memory allocated: ${formatMemoryUsage(memoryData.rss)}, `,
        heapTotal: `Total heap size: ${formatMemoryUsage(memoryData.heapTotal)}, `,
        heapUsed: `Actual memory used during the execution: ${formatMemoryUsage(memoryData.heapUsed)}, `,
        external: `V8 external memory: ${formatMemoryUsage(memoryData.external)}`,
      };
      const usageInPercent = Number((convertToMb(memoryData.heapUsed) * 100) / convertToMb(memoryData.heapTotal)).toFixed(2);
      const usageText = `${memoryUsage.rss}\n${memoryUsage.heapTotal}\n${memoryUsage.heapUsed}\n${memoryUsage.external}\nHeap usage is: ${usageInPercent}%`;
      const msg = `\`${global.env.APP_ENVIRONMENT}\` \`${
        global.env.APP_RELEASE
      }\` \`${os.hostname()}\` server *STOPPED* on *SIGINT*\`\`\`${usageText}\`\`\``;
      logger.error(msg.replace(/\//g, '').replace(/`/g, ''));
    });
  });
};

module.exports = runServer;
