function BadRequest (message = "Bad Request"){
  this.message = message
}

BadRequest.prototype.code = 400;
BadRequest.prototype.name = 'BadRequest';
BadRequest.prototype.type = 'system';
BadRequest.prototype.serialize = function () {
  return [{message: this.message}]
};

module.exports = BadRequest