const winston = require('winston')
const expressWinston = require('express-winston')
const cls = require('cls-hooked');

const { printf } = winston.format;

const jsonFormat = printf((info) => {
  const clsNamespace = cls.getNamespace('app')
  const traceId = clsNamespace.get('traceId')
  info.traceId = traceId
  info.service = 'prerender-app'
  info.label = 'backend'
  info.env = process.env.NODE_ENV
  
  return info
})

const stringFormat = printf((info) => {
  const clsNamespace = cls.getNamespace('app')
  const traceId = clsNamespace.get('traceId')
  info.traceId = traceId
  return JSON.stringify(info)
})

// read more about the full properties here https://www.npmjs.com/package/express-winston
const logger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'logs/log.log', format: stringFormat }),
    new winston.transports.Console({format: stringFormat}),
  ],
  format: jsonFormat,
  meta: true, // (default to true)
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: false,
})

// req.body is by default not included because it will often contain things that shouldn't 
// be logged like passwords, so be sure you want to do it before you do.
expressWinston.requestWhitelist.push('body');

module.exports = logger