class ForbiddenError extends Error {
  code = 403;
  name = 'ForbiddenError';
  type = 'system';

  constructor(message = 'Forbidden Error') {
    super(message)
  }

  serialize() {
    return [
      {message: this.message}
    ]
  }
}

module.exports = ForbiddenError

