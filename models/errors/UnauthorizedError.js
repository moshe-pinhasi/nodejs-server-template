function UnauthorizedError (message = "Unauthorized Error"){
  this.message = message
}

UnauthorizedError.prototype.code = 401;
UnauthorizedError.prototype.name = 'UnauthorizedError';
UnauthorizedError.prototype.type = 'system';
UnauthorizedError.prototype.serialize = function () {
  return [{message: this.message}]
};

module.exports = UnauthorizedError
