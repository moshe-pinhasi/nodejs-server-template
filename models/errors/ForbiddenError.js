function ForbiddenError (message = 'Forbidden Error'){
  this.message = message
}

ForbiddenError.prototype.code = 403;
ForbiddenError.prototype.name = 'ForbiddenError';
ForbiddenError.prototype.type = 'system';
ForbiddenError.prototype.serialize = function () {
  return [{message: this.message}]
};

module.exports = ForbiddenError

