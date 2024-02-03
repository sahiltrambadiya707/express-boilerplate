/**
 * Logger
 */
const cluster = require('cluster');
const moment = require('moment-timezone');
const os = require('os');
const { createLogger, format, transports } = require('winston');

const timezone = 'Asia/Kolkata';

const getHostAndProcessInfo = () => `[${os.hostname()} ${cluster.isWorker ? `WORKER #${cluster.worker.id}` : 'MASTER'}]`;

const logColors = {
  debug: 'white',
  data: 'grey',
  error: 'red',
  help: 'cyan',
  info: 'green',
  input: 'grey',
  prompt: 'grey',
  silly: 'magenta',
  warn: 'yellow',
  verbose: 'cyan',
};

const localFormat = format.combine(
  format.colorize({
    colors: logColors,
    message: true,
  }),
  format.timestamp(),
  format.prettyPrint(),
  format.printf(({ level, message }) => {
    const timestamp = moment().format('YYYY.MM.DD HH:mm:ss');
    return `[${timestamp}] ${level.toUpperCase().trim()} ${getHostAndProcessInfo()} ${message}`;
  }),
);

const formatRemote = format.combine(
  format.timestamp(),
  format.prettyPrint(),
  format.printf(({ level, message }) => {
    const timestamp = moment().format('YYYY.MM.DD HH:mm:ss');
    return `[${timestamp}] ${level.toUpperCase().padEnd(8)} ${getHostAndProcessInfo()} ${message}`;
  }),
);

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.printf(({ level, message }) => {
      const timestamp = moment().tz(timezone).format('DD.MM.YYYY HH:mm:ss');
      return `[${timestamp}] ${level.toUpperCase().padEnd(8)} ${getHostAndProcessInfo()} ${message}`;
    }),
  ),
  transports: [
    new transports.Console({
      format: global.env.NODE_ENV === 'development' ? localFormat : formatRemote,
      name: 'log-console',
      level: 'debug',
      handleExceptions: true,
    }),
  ],
  exceptionHandlers: [],
  exitOnError: false,
});

module.exports = logger;
