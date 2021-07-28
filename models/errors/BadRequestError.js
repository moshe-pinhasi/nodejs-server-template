class BadRequestError extends Error {
  code = 400;
  name = 'BadRequestError';
  type = 'system';

  constructor(message = 'Bad Request Error') {
    super(message)
  }

  serialize() {
    return {message: this.message}
  }
}

module.exports = BadRequestError