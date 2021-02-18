function NotFoundError (message = 'Not Found Error'){
  this.message = message
}

NotFoundError.prototype.code = 404;
NotFoundError.prototype.name = 'NotFoundError';
NotFoundError.prototype.type = 'system';
NotFoundError.prototype.serialize = function () {
  return [{message: this.message}]
};

module.exports = NotFoundError

