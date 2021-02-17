const BadRequest = require('./BadRequest')
const NotFound = require('./NotFound')
const Forbidden = require('./Forbidden')
const UnauthorizedError = require('./UnauthorizedError')
const InternalError = require('./InternalError')
const RequestValidation = require('./RequestValidation')

global.BadRequest = BadRequest
global.NotFound = NotFound
global.Forbidden = Forbidden
global.UnauthorizedError = UnauthorizedError
global.InternalError = InternalError
global.RequestValidation = RequestValidation

module.exports = {
  BadRequest,
  NotFound,
  UnauthorizedError,
  InternalError,
  RequestValidation,
}