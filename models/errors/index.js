// ERROR_CODES = [:missing, :missing_field, :invalid, :already_exists, :duplicate, :too_long, :unexpected, :unauthorized]
const BadRequestError = require('./BadRequestError')
const NotFoundError = require('./NotFoundError')
const ForbiddenError = require('./ForbiddenError')
const UnauthorizedError = require('./UnauthorizedError')
const InternalError = require('./InternalError')
const RequestValidationError = require('./RequestValidationError')

// global.BadRequestError = BadRequestError
// global.NotFoundError = NotFoundError
// global.ForbiddenError = ForbiddenError
// global.UnauthorizedError = UnauthorizedError
// global.InternalError = InternalError
// global.RequestValidationError = RequestValidationError

module.exports = {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  InternalError,
  RequestValidationError,
}