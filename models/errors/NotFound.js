function NotFound (message = 'Not Found'){
  this.message = message
}

NotFound.prototype.code = 404;
NotFound.prototype.name = 'NotFound';
NotFound.prototype.type = 'system';
NotFound.prototype.serialize = function () {
  return [{message: this.message}]
};

module.exports = NotFound

