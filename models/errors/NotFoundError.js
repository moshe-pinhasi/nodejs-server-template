class NotFoundError extends Error {
  code = 404;
  name = 'NotFoundError';
  type = 'system';

  constructor(message = 'Not Found Error') {
    super(message)
  }

  serialize() {
    return [
      {message: this.message}
    ]
  }
}

module.exports = NotFoundError

