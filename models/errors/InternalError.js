class InternalError extends Error {
  code = 500;
  name = 'InternalError';
  type = 'system';

  constructor(message = 'Internal Error') {
    super(message)
  }

  serialize() {
    return {message: this.message}
  }
}

module.exports = InternalError

