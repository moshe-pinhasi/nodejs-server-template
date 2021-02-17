const fs = require('fs')
const { createLogger, format, transports } = require('winston')
const { printf } = format
const cls = require('cls-hooked')
const config = require('../config')

const logsdir = './logs';
if (!fs.existsSync(logsdir)) {
    fs.mkdirSync(logsdir);
}

//define the time format
const timeFormatFn = () => {
    let now = new Date();
    return now.toUTCString();
};

const addTraceId = printf((info) => {
    const clsNamespace = cls.getNamespace('app')
    const traceID = clsNamespace.get('traceID')
    if (traceID) {
        info.traceID = traceID
    }

    info.level = info.level.toUpperCase()
    info.timestamp = timeFormatFn()
    return JSON.stringify(info)
})

const simpleFormat = printf(
    ({ level, message, timestamp, traceID = 'N/A' }) => 
        `[Trace-Id: ${traceID}] [${timestamp}] ${level.toUpperCase()} - ${message}`
)

const logger = createLogger({
    level: 'info',
    format: addTraceId,
    defaultMeta: { service: 'nodejs-api-service', label: config.env.name }, // change it to the service name
    transports: [
        new transports.File({ filename: 'logs/log.log' })
    ]
})


if (config.env.isDev) {
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

    error: (message, meta) => {
        logger.log("error", message, meta)
    }
}