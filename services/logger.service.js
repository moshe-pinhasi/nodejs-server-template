const fs = require('fs')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, prettyPrint, printf } = format

const LogzioWinstonTransport = require('winston-logzio');
const logzioWinstonTransport = new LogzioWinstonTransport({
  level: 'debug',
  name: 'api-server_winston_logzio',
  token: 'wfhCIwrtYiIHLKYZnWDxuJswOENHIpZJ',
  host: 'listener.logz.io',
});

const logsdir = './logs';
if (!fs.existsSync(logsdir)) {
  fs.mkdirSync(logsdir);
}

//define the time format
const timeFormatFn = () => (new Date()).toUTCString();

const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: 'nodejs' }),
    timestamp({
      format: timeFormatFn
    }),
    prettyPrint()
  ),

  defaultMeta: { service: 'nodejs-api-service' },
  transports: [
    logzioWinstonTransport,
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ]
})

if (process.env.NODE_ENV !== 'production') {

  const simpleFormat = printf(({ level, message, label, service, timestamp }) =>
    `[${timestamp}] [${service}] ${level.toUpperCase()} - ${message}`)
  
  logger.add(new transports.Console({
    format: simpleFormat,
    level: 'debug',
  }))
}

module.exports = {
  debug: (message, meta = "") => {
    logger.log("debug", message, meta)
  },

  info: (message, meta) => {
    logger.log("info", message, meta)
  },

  warn: (message, meta) => {
    logger.log("warn", message, meta)
  },

  error:(message, meta) => {
    logger.log("error", message, meta)
  }
}