class RequestValidationError extends Error {
  code = 404;
  name = 'RequestValidationError';
  type = 'system';

  constructor(errors = []) {
    super('Invalid request parameters')
    this.errors = errors
  }

  serialize() {
    return this.errors.map(err => 
      ({ message: err.message, field: err.param }))
  }
}

module.exports = RequestValidationError