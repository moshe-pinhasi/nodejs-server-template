class UnauthorizedError extends Error {
  code = 401;
  name = 'UnauthorizedError';
  type = 'system';

  constructor(message = 'Unauthorized Error') {
    super(message)
  }

  serialize() {
    return [
      {message: this.message}
    ]
  }
}

module.exports = UnauthorizedError
