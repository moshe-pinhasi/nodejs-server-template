function Forbidden (message = 'Forbidden'){
  this.message = message
}

Forbidden.prototype.code = 403;
Forbidden.prototype.name = 'Forbidden';
Forbidden.prototype.type = 'system';
Forbidden.prototype.serialize = function () {
  return [{message: this.message}]
};

module.exports = Forbidden

