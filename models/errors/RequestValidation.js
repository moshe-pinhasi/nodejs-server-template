function RequestValidation (errors = []){
  this.errors = errors
}

RequestValidation.prototype.code = 400;
RequestValidation.prototype.name = 'RequestValidation';
RequestValidation.prototype.type = 'system';
RequestValidation.prototype.serialize = function () {
  return this.errors.map(err => {
    return { message: err.message, field: err.param };
  });

};

module.exports = RequestValidation