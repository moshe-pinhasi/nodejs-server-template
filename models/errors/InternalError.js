function InternalError (message = 'Internal Error'){
  this.message = message
}

InternalError.prototype.code = 500;
InternalError.prototype.name = 'InternalError';
InternalError.prototype.type = 'system';
InternalError.prototype.serialize = function () {
  return [{message: this.message}]
};

module.exports = InternalError

