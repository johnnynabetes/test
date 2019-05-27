const INTERNAL_ERROR = 500;

/**
 * Constructor of the class
 * @param {object} validation: validation
 */
function $$validation() {
  this.title = "System message";
  this.success = [];
  this.error = [];
  this.warning = [];
  this._validations = [];
  this.$$CODE = arguments.length ? "HANDLED_EXCEPTION" : 'UNHANDLED_EXCEPTION';
  if (arguments.length) {
    $$validation.prototype.add.apply(this, Array.prototype.slice.call(arguments));
  }
}

/**
 * Add new validation to the colecction
 * @param {object} validation: validation
 * @returns {$$validation} this
 */
$$validation.prototype.add = function () {
  let validation = arguments[0];
  if (validation.$$CODE) {
    this.error = this.error.concat(validation.error);
    this.warning = this.warning.concat(validation.warning);
    this.success = this.success.concat(validation.success);
    this._validations = this._validations.concat(validation._validations);
  } else {
    if (validation.message) {
      validation = {
        type: 'error',
        body: 'Something unexpected happened',
        error: validation.message
      }
    }
    validation = validation.type ? validation : { body: validation, type: 'error' };
    this._validations.push(validation);
    this[validation.type].push(validation.body);
  }

  return this;
};

/**
 * Check if the handler have error or warnings and throw the object
 */
$$validation.prototype.validate = function (res) {
  if (this.error.length || this.warning) {
    if (res) return res.status(INTERNAL_ERROR).send(this);
    this.throw();
  }
};

/**
 * Check if the handler have errors or warnings
 */
$$validation.prototype.isValid = function () {
  return !this.error.length && !this.warning;
};

/**
 * Add and throw a new exception
 * @param {object} error: error
 */
$$validation.prototype.addAndThrow = function () {
  const error = arguments[0];
  arguments[0] = error.type ? error : { body: error, type: 'error' };
  $$validation.prototype.add.apply(
    this,
    Array.prototype.slice.call(arguments)
  );
  this.throw();
};

/**
 * Clean the exceptions
 */
$$validation.prototype.clean = function () {
  this.success = [];
  this.error = [];
  this.warning = [];
  this._validations = [];
};

/**
 * throw the current handler
 */
$$validation.prototype.throw = function () {
  throw this;
};

/**
 * Add and throw
 * @param {object} parametros del error
 */
$$validation.addAndThrow = function () {
  $$validation.prototype.addAndThrow.apply(new $$validation(), arguments);
};

module.exports = $$validation;
