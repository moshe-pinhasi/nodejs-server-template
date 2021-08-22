const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const { printf } = format;
const cls = require('cls-hooked');
const config = require('../config');

const logsdir = './logs';
if (!fs.existsSync(logsdir)) {
    fs.mkdirSync(logsdir);
}

//define the time format
const timeFormatFn = () => {
    let now = new Date();
    return now.toUTCString();
};

const jsonFormat = printf((info) => {
    const clsNamespace = cls.getNamespace('app')
    const traceId = clsNamespace.get('traceId')
    info.traceId = traceId
    info.env = config.env.name
    return JSON.stringify(info)
})

const stringFormat = printf((info) => {
    const clsNamespace = cls.getNamespace('app')
    const traceId = clsNamespace.get('traceId')
    const { level, message} = info
    return `[TraceId: ${traceId}] [${timeFormatFn()}] ${level.toUpperCase()} - ${message}`
})

const logger = createLogger({
    level: 'info',
    format: stringFormat,
    defaultMeta: {
        service: 'prerender-app',
        label: 'backend' // change it to the service name
    },
    transports: [
        new transports.File({ filename: 'logs/log.log' }),
        new transports.Console({
            level: 'debug',
        }),
    ]
})

module.exports = {
    debug: (message) => {
        logger.log('debug', message, true);
    },

    info: (message) => {
        logger.log('info', message, true);
    },

    warn: (message) => {
        logger.log('warn', message, true);
    },

    error: (message) => {
        logger.log('error', message, true);
    }
}
