function RequestValidationError (errors = []){
  this.errors = errors
}

RequestValidationError.prototype.code = 400;
RequestValidationError.prototype.name = 'RequestValidationError';
RequestValidationError.prototype.type = 'system';
RequestValidationError.prototype.serialize = function () {
  return this.errors.map(err => 
    ({ message: err.message, field: err.param }))
};

module.exports = RequestValidationError