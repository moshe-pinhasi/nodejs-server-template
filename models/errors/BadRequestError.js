function BadRequestError (message = "Bad Request Error"){
  this.message = message
}

BadRequestError.prototype.code = 400;
BadRequestError.prototype.name = 'BadRequestError';
BadRequestError.prototype.type = 'system';
BadRequestError.prototype.serialize = function () {
  return [{message: this.message}]
};

module.exports = BadRequestError