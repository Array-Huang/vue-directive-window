/*!
 * 
 * vue-directive-window
 * (c) 2019 Array-Huang
 * Released under the MIT License.
 * Github: https://github.com/Array-Huang/vue-directive-window
 * hash: a9c2ff57d4cb2c0a3768
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-directive-window"] = factory();
	else
		root["vue-directive-window"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "06db":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__("23c6");
var test = {};
test[__webpack_require__("2b4c")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__("2aba")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "0d12":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _error2 = __webpack_require__("d44f");

var _error3 = _interopRequireDefault(_error2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A property instance gets returned whenever you call `schema.path()`.
 * Properties are also created internally when an object is passed to the Schema constructor.
 *
 * @param {String} name - the name of the property
 * @param {Schema} schema - parent schema
 */

var Property = function () {
  function Property(name, schema) {
    _classCallCheck(this, Property);

    this.name = name;
    this.registry = {};
    this._schema = schema;
    this._type = null;
    this.messages = {};
  }

  /**
   * Registers messages.
   *
   * @example
   * prop.message('something is wrong')
   * prop.message({ required: 'thing is required.' })
   *
   * @param {Object|String} messages
   * @return {Property}
   */

  _createClass(Property, [{
    key: 'message',
    value: function message(messages) {
      if (typeof messages == 'string') {
        messages = { default: messages };
      }

      var entries = Object.entries(messages);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var val = _ref2[1];

          this.messages[key] = val;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }

    /**
     * Mount given `schema` on current path.
     *
     * @example
     * const user = new Schema({ email: String })
     * prop.schema(user)
     *
     * @param {Schema} schema - the schema to mount
     * @return {Property}
     */

  }, {
    key: 'schema',
    value: function schema(_schema) {
      this._schema.path(this.name, _schema);
      return this;
    }

    /**
     * Validate using named functions from the given object.
     * Error messages can be defined by providing an object with
     * named error messages/generators to `schema.message()`
     *
     * The message generator receives the value being validated,
     * the object it belongs to and any additional arguments.
     *
     * @example
     * const schema = new Schema()
     * const prop = schema.path('some.path')
     *
     * schema.message({
     *   binary: (path, ctx) => `${path} must be binary.`,
     *   bits: (path, ctx, bits) => `${path} must be ${bits}-bit`
     * })
     *
     * prop.use({
     *   binary: (val, ctx) => /^[01]+$/i.test(val),
     *   bits: [(val, ctx, bits) => val.length == bits, 32]
     * })
     *
     * @param {Object} fns - object with named validation functions to call
     * @return {Property}
     */

  }, {
    key: 'use',
    value: function use(fns) {
      var _this = this;

      Object.keys(fns).forEach(function (name) {
        var arr = fns[name];
        if (!Array.isArray(arr)) arr = [arr];
        var fn = arr.shift();
        _this._register(name, arr, fn);
      });

      return this;
    }

    /**
     * Registers a validator that checks for presence.
     *
     * @example
     * prop.required()
     *
     * @param {Boolean} [bool] - `true` if required, `false` otherwise
     * @return {Property}
     */

  }, {
    key: 'required',
    value: function required() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      return this._register('required', [bool]);
    }

    /**
     * Registers a validator that checks if a value is of a given `type`
     *
     * @example
     * prop.type(String)
     *
     * @example
     * prop.type('string')
     *
     * @param {String|Function} type - type to check for
     * @return {Property}
     */

  }, {
    key: 'type',
    value: function type(_type) {
      this._type = _type;
      return this._register('type', [_type]);
    }

    /**
     * Registers a validator that checks length.
     *
     * @example
     * prop.length({ min: 8, max: 255 })
     * prop.length(10)
     *
     * @param {Object|Number} rules - object with `.min` and `.max` properties or a number
     * @param {Number} rules.min - minimum length
     * @param {Number} rules.max - maximum length
     * @return {Property}
     */

  }, {
    key: 'length',
    value: function length(rules) {
      return this._register('length', [rules]);
    }

    /**
     * Registers a validator that checks size.
     *
     * @example
     * prop.size({ min: 8, max: 255 })
     * prop.size(10)
     *
     * @param {Object|Number} rules - object with `.min` and `.max` properties or a number
     * @param {Number} rules.min - minimum size
     * @param {Number} rules.max - maximum size
     * @return {Property}
     */

  }, {
    key: 'size',
    value: function size(rules) {
      return this._register('size', [rules]);
    }

    /**
     * Registers a validator for enums.
     *
     * @example
     * prop.enum(['cat', 'dog'])
     *
     * @param {Array} rules - allowed values
     * @return {Property}
     */

  }, {
    key: 'enum',
    value: function _enum(enums) {
      return this._register('enum', [enums]);
    }

    /**
     * Registers a validator that checks if a value matches given `regexp`.
     *
     * @example
     * prop.match(/some\sregular\sexpression/)
     *
     * @param {RegExp} regexp - regular expression to match
     * @return {Property}
     */

  }, {
    key: 'match',
    value: function match(regexp) {
      return this._register('match', [regexp]);
    }

    /**
     * Registers a validator that checks each value in an array against given `rules`.
     *
     * @example
     * prop.each({ type: String })
     * prop.each([{ type: Number }])
     * prop.each({ things: [{ type: String }]})
     * prop.each(schema)
     *
     * @param {Array|Object|Schema|Property} rules - rules to use
     * @return {Property}
     */

  }, {
    key: 'each',
    value: function each(rules) {
      this._schema.path(this.name + '.$', rules);
      return this;
    }

    /**
     * Registers paths for array elements on the parent schema, with given array of rules.
     *
     * @example
     * prop.elements([{ type: String }, { type: Number }])
     *
     * @param {Array} arr - array of rules to use
     * @return {Property}
     */

  }, {
    key: 'elements',
    value: function elements(arr) {
      var _this2 = this;

      arr.forEach(function (rules, i) {
        _this2._schema.path(_this2.name + '.' + i, rules);
      });
      return this;
    }

    /**
     * Proxy method for schema path. Makes chaining properties together easier.
     *
     * @example
     * schema
     *   .path('name').type(String).required()
     *   .path('email').type(String).required()
     *
     */

  }, {
    key: 'path',
    value: function path() {
      var _schema2;

      return (_schema2 = this._schema).path.apply(_schema2, arguments);
    }

    /**
     * Typecast given `value`
     *
     * @example
     * prop.type(String)
     * prop.typecast(123) // => '123'
     *
     * @param {Mixed} value - value to typecast
     * @return {Mixed}
     */

  }, {
    key: 'typecast',
    value: function typecast(value) {
      var schema = this._schema;
      var type = this._type;

      if (!type) return value;

      if (typeof type == 'function') {
        type = type.name;
      }

      var cast = schema.typecasters[type] || schema.typecasters[type.toLowerCase()];

      if (typeof cast != 'function') {
        throw new Error('Typecasting failed: No typecaster defined for ' + type + '.');
      }

      return cast(value);
    }

    /**
     * Validate given `value`
     *
     * @example
     * prop.type(Number)
     * assert(prop.validate(2) == null)
     * assert(prop.validate('hello world') instanceof Error)
     *
     * @param {Mixed} value - value to validate
     * @param {Object} ctx - the object containing the value
     * @param {String} [path] - path of the value being validated
     * @return {ValidationError}
     */

  }, {
    key: 'validate',
    value: function validate(value, ctx) {
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.name;

      var types = Object.keys(this.registry);
      var done = {};
      var err = void 0;

      // Required first
      err = this._run('required', value, ctx, path);
      if (err) return err;

      // No need to continue if value is null-ish
      if (value == null) return null;

      // Run type second
      err = this._run('type', value, ctx, path);
      if (err) return err;

      // Make sure required and run are not executed again
      done.required = true;
      done.type = true;

      // Run the rest
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = types[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var type = _step2.value;

          if (done[type]) continue;
          err = this._run(type, value, ctx, path);
          if (err) return err;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return null;
    }

    /**
     * Run validator of given `type`
     *
     * @param {String} type - type of validator
     * @param {Mixed} value - value to validate
     * @param {Object} ctx - the object containing the value
     * @param {String} path - path of the value being validated
     * @return {ValidationError}
     * @private
     */

  }, {
    key: '_run',
    value: function _run(type, value, ctx, path) {
      if (!this.registry[type]) return;
      var schema = this._schema;
      var _registry$type = this.registry[type],
          args = _registry$type.args,
          fn = _registry$type.fn;

      var validator = fn || schema.validators[type];
      var valid = validator.apply(undefined, [value, ctx].concat(_toConsumableArray(args), [path]));
      if (!valid) return this._error(type, ctx, args, path);
    }

    /**
     * Register validator
     *
     * @param {String} type - type of validator
     * @param {Array} args - argument to pass to validator
     * @param {Function} [fn] - custom validation function to call
     * @return {Property}
     * @private
     */

  }, {
    key: '_register',
    value: function _register(type, args, fn) {
      this.registry[type] = { args: args, fn: fn };
      return this;
    }

    /**
     * Create an error
     *
     * @param {String} type - type of validator
     * @param {Object} ctx - the object containing the value
     * @param {Array} args - arguments to pass
     * @param {String} path - path of the value being validated
     * @return {ValidationError}
     * @private
     */

  }, {
    key: '_error',
    value: function _error(type, ctx, args, path) {
      var schema = this._schema;

      var message = this.messages[type] || this.messages.default || schema.messages[type] || schema.messages.default;

      if (typeof message == 'function') {
        message = message.apply(undefined, [path, ctx].concat(_toConsumableArray(args)));
      }

      return new _error3.default(message, path);
    }
  }]);

  return Property;
}();

exports.default = Property;
module.exports = exports.default;

/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "212e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _componentType = __webpack_require__("b3b1");

var _componentType2 = _interopRequireDefault(_componentType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default validators.
 *
 * @private
 */

var Validators = {
  /**
   * Validates presence.
   *
   * @param {Mixed} value - the value being validated
   * @param {Object} ctx - the object being validated
   * @param {Bolean} required
   * @return {Boolean}
   */

  required: function required(value, ctx, _required) {
    if (_required === false) return true;
    return value != null && value !== '';
  },


  /**
   * Validates type.
   *
   * @param {Mixed} value - the value being validated
   * @param {Object} ctx - the object being validated
   * @param {String|Function} name name of the type or a constructor
   * @return {Boolean}
   */

  type: function type(value, ctx, name) {
    if (typeof name == 'function') {
      return value.constructor === name;
    }

    return (0, _componentType2.default)(value) === name;
  },


  /**
   * Validates length.
   *
   * @param {String} value the string being validated
   * @param {Object} ctx the object being validated
   * @param {Object|Number} rules object with .min and/or .max props or a number
   * @param {Number} [rules.min] - minimum length
   * @param {Number} [rules.max] - maximum length
   * @return {Boolean}
   */

  length: function length(value, ctx, len) {
    if (typeof len == 'number') {
      return value.length === len;
    }
    var min = len.min,
        max = len.max;

    if (min && value.length < min) return false;
    if (max && value.length > max) return false;
    return true;
  },


  /**
   * Validates size.
   *
   * @param {Number} value the number being validated
   * @param {Object} ctx the object being validated
   * @param {Object|Number} size object with .min and/or .max props or a number
   * @param {String|Number} [size.min] - minimum size
   * @param {String|Number} [size.max] - maximum size
   * @return {Boolean}
   */

  size: function size(value, ctx, _size) {
    if (typeof _size == 'number') {
      return value === _size;
    }
    var min = _size.min,
        max = _size.max;

    if (parseInt(min) != null && value < min) return false;
    if (parseInt(max) != null && value > max) return false;
    return true;
  },


  /**
   * Validates enums.
   *
   * @param {String} value the string being validated
   * @param {Object} ctx the object being validated
   * @param {Array} enums array with allowed values
   * @return {Boolean}
   */

  enum: function _enum(value, ctx, enums) {
    return enums.includes(value);
  },


  /**
   * Validates against given `regexp`.
   *
   * @param {String} value the string beign validated
   * @param {Object} ctx the object being validated
   * @param {RegExp} regexp the regexp to validate against
   * @return {Boolean}
   */

  match: function match(value, ctx, regexp) {
    return regexp.test(value);
  }
};

exports.default = Validators;
module.exports = exports.default;

/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "3045":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Default error messages.
 *
 * @private
 */

var Messages = {
  // Type message
  type: function type(prop, ctx, _type) {
    if (typeof _type == 'function') {
      _type = _type.name;
    }

    return prop + ' must be of type ' + _type + '.';
  },


  // Required message
  required: function required(prop) {
    return prop + ' is required.';
  },


  // Match message
  match: function match(prop, ctx, regexp) {
    return prop + ' must match ' + regexp + '.';
  },


  // Length message
  length: function length(prop, ctx, len) {
    if (typeof len == 'number') {
      return prop + ' must have a length of ' + len + '.';
    }

    var min = len.min,
        max = len.max;


    if (min && max) {
      return prop + ' must have a length between ' + min + ' and ' + max + '.';
    }
    if (max) {
      return prop + ' must have a maximum length of ' + max + '.';
    }
    if (min) {
      return prop + ' must have a minimum length of ' + min + '.';
    }
  },


  // Size message
  size: function size(prop, ctx, _size) {
    if (typeof _size == 'number') {
      return prop + ' must have a size of ' + _size + '.';
    }

    var min = _size.min,
        max = _size.max;


    if (min && max) {
      return prop + ' must be between ' + min + ' and ' + max + '.';
    }
    if (max) {
      return prop + ' must be less than ' + max + '.';
    }
    if (min) {
      return prop + ' must be greater than ' + min + '.';
    }
  },


  // Enum message
  enum: function _enum(prop, ctx, enums) {
    var copy = enums.slice();
    var last = copy.pop();
    return prop + ' must be either ' + copy.join(', ') + ' or ' + last + '.';
  },


  // Default message
  default: function _default(prop) {
    return 'Validation failed for ' + prop + '.';
  }
};

exports.default = Messages;
module.exports = exports.default;

/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "37c8":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("2b4c");


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a72":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var LIBRARY = __webpack_require__("2d00");
var wksExt = __webpack_require__("37c8");
var defineProperty = __webpack_require__("86cc").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4504":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var toObject = __webpack_require__("4bf8");
var aFunction = __webpack_require__("d8e8");
var $defineProperty = __webpack_require__("86cc");

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__("9e1e") && $export($export.P + __webpack_require__("c5b4"), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "504c":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var toIObject = __webpack_require__("6821");
var isEnum = __webpack_require__("52a7").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),

/***/ "522b":
/***/ (function(module, exports) {

module.exports = typecast;

/**
 * Cast given `val` to `type`
 *
 * @param {Mixed} val
 * @param {String} type
 * @api public
 */

function typecast (val, type) {
  var fn = typecast[type];
  if (typeof fn != 'function') throw new Error('cannot cast to ' + type);
  return fn(val);
}

/**
 * Cast `val` to `String`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.string = function (val) {
  return val.toString();
};

/**
 * Cast `val` to `Number`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.number = function (val) {
  var num = parseFloat(val);
  return isNaN(num)
    ? null
    : num;
};

/**
 * Cast `val` to a`Date`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.date = function (val) {
  var date = new Date(val);
  return isNaN(date.valueOf())
    ? null
    : date;
};

/**
 * Cast `val` to `Array`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.array = function (val) {
  if (val instanceof Array) return val;
  var arr = val.toString().split(',');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }
  return arr;
};

/**
 * Cast `val` to `Boolean`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.boolean = function (val) {
  return !! val && val !== 'false';
};

/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5d8f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _componentType = __webpack_require__("b3b1");

var _componentType2 = _interopRequireDefault(_componentType);

var _eivindfjeldstadDot = __webpack_require__("b258");

var _eivindfjeldstadDot2 = _interopRequireDefault(_eivindfjeldstadDot);

var _typecast = __webpack_require__("522b");

var _typecast2 = _interopRequireDefault(_typecast);

var _property = __webpack_require__("0d12");

var _property2 = _interopRequireDefault(_property);

var _messages = __webpack_require__("3045");

var _messages2 = _interopRequireDefault(_messages);

var _validators = __webpack_require__("212e");

var _validators2 = _interopRequireDefault(_validators);

var _error = __webpack_require__("d44f");

var _error2 = _interopRequireDefault(_error);

var _utils = __webpack_require__("71fe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Schema defines the structure that objects should be validated against.
 *
 * @example
 * const post = new Schema({
 *   title: {
 *     type: String,
 *     required: true,
 *     length: { min: 1, max: 255 }
 *   },
 *   content: {
 *     type: String,
 *     required: true
 *   },
 *   published: {
 *     type: Date,
 *     required: true
 *   },
 *   keywords: [{ type: String }]
 * })
 *
 * @example
 * const author = new Schema({
 *   name: {
 *     type: String,
 *     required: true
 *   },
 *   email: {
 *     type: String,
 *     required: true
 *   },
 *   posts: [post]
 * })
 *
 * @param {Object} [obj] - schema definition
 * @param {Object} [opts] - options
 * @param {Boolean} [opts.typecast=false] - typecast values before validation
 * @param {Boolean} [opts.strip=true] - strip properties not defined in the schema
 */

var Schema = function () {
  function Schema() {
    var _this = this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Schema);

    this.opts = opts;
    this.hooks = [];
    this.props = {};
    this.messages = Object.assign({}, _messages2.default);
    this.validators = Object.assign({}, _validators2.default);
    this.typecasters = Object.assign({}, _typecast2.default);
    Object.keys(obj).forEach(function (k) {
      return _this.path(k, obj[k]);
    });
  }

  /**
   * Create or update `path` with given `rules`.
   *
   * @example
   * const schema = new Schema()
   * schema.path('name.first', { type: String })
   * schema.path('name.last').type(String).required()
   *
   * @param {String} path - full path using dot-notation
   * @param {Object|Array|String|Schema|Property} [rules] - rules to apply
   * @return {Property}
   */

  _createClass(Schema, [{
    key: 'path',
    value: function path(_path, rules) {
      var _this2 = this;

      var parts = _path.split('.');
      var suffix = parts.pop();
      var prefix = parts.join('.');

      // Make sure full path is created
      if (prefix) {
        this.path(prefix);
      }

      // Array index placeholder
      if (suffix === '$') {
        this.path(prefix).type(Array);
      }

      // Nested schema
      if (rules instanceof Schema) {
        rules.hook(function (k, v) {
          return _this2.path((0, _utils.join)(k, _path), v);
        });
        return this.path(_path, rules.props);
      }

      // Return early when given a `Property`
      if (rules instanceof _property2.default) {
        this.props[_path] = rules;
        // Notify parents if mounted
        this.propagate(_path, rules);
        return rules;
      }

      var prop = this.props[_path] || new _property2.default(_path, this);

      this.props[_path] = prop;
      // Notify parents if mounted
      this.propagate(_path, prop);

      // No rules?
      if (!rules) return prop;

      // type shorthand
      // `{ name: String }`
      if (typeof rules == 'string' || typeof rules == 'function') {
        prop.type(rules);
        return prop;
      }

      // Allow arrays to be passed implicitly:
      // `{ keywords: [String] }`
      // `{ keyVal: [[String, Number]] }`
      if (Array.isArray(rules)) {
        prop.type(Array);

        if (rules.length == 1) {
          prop.each(rules[0]);
        } else {
          prop.elements(rules);
        }

        return prop;
      }

      var nested = false;

      // Check for nested objects
      for (var key in rules) {
        if (!rules.hasOwnProperty(key)) continue;
        if (typeof prop[key] == 'function') continue;
        nested = true;
        break;
      }

      Object.keys(rules).forEach(function (key) {
        var rule = rules[key];

        if (nested) {
          return _this2.path((0, _utils.join)(key, _path), rule);
        }

        prop[key](rule);
      });

      return prop;
    }

    /**
     * Typecast given `obj`.
     *
     * @param {Object} obj - the object to typecast
     * @return {Schema}
     * @private
     */

  }, {
    key: 'typecast',
    value: function typecast(obj) {
      var _loop = function _loop(path, prop) {
        (0, _utils.walk)(path, obj, function (key, value) {
          if (value == null) return;
          var cast = prop.typecast(value);
          if (cast === value) return;
          _eivindfjeldstadDot2.default.set(obj, key, cast);
        });
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(this.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var path = _ref2[0];
          var prop = _ref2[1];

          _loop(path, prop);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }

    /**
     * Strip all keys not defined in the schema
     *
     * @param {Object} obj - the object to strip
     * @param {String} [prefix]
     * @return {Schema}
     * @private
     */

  }, {
    key: 'strip',
    value: function strip(obj, prefix) {
      var _this3 = this;

      var type = (0, _componentType2.default)(obj);

      if (type === 'array') {
        obj.forEach(function (v, i) {
          return _this3.strip(v, (0, _utils.join)('$', prefix));
        });
        return this;
      }

      if (type !== 'object') {
        return this;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref3 = _step2.value;

          var _ref4 = _slicedToArray(_ref3, 2);

          var key = _ref4[0];
          var val = _ref4[1];

          var path = (0, _utils.join)(key, prefix);

          if (!this.props[path]) {
            delete obj[key];
            continue;
          }

          this.strip(val, path);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }

    /**
     * Validate given `obj`.
     *
     * @example
     * const schema = new Schema({ name: { required: true }})
     * const errors = schema.validate({})
     * assert(errors.length == 1)
     * assert(errors[0].message == 'name is required')
     * assert(errors[0].path == 'name')
     *
     * @param {Object} obj - the object to validate
     * @param {Object} [opts] - options, see [Schema](#schema-1)
     * @return {Array}
     */

  }, {
    key: 'validate',
    value: function validate(obj) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      opts = Object.assign(this.opts, opts);

      var errors = [];

      if (opts.typecast) {
        this.typecast(obj);
      }

      if (opts.strip !== false) {
        this.strip(obj);
      }

      var _loop2 = function _loop2(path, prop) {
        (0, _utils.walk)(path, obj, function (key, value) {
          var err = prop.validate(value, obj, key);
          if (err) errors.push(err);
        });
      };

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.entries(this.props)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref5 = _step3.value;

          var _ref6 = _slicedToArray(_ref5, 2);

          var path = _ref6[0];
          var prop = _ref6[1];

          _loop2(path, prop);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return errors;
    }

    /**
     * Assert that given `obj` is valid.
     *
     * @example
     * const schema = new Schema({ name: String })
     * schema.assert({ name: 1 }) // Throws an error
     *
     * @param {Object} obj
     * @param {Object} [opts]
     */

  }, {
    key: 'assert',
    value: function assert(obj, opts) {
      var _validate = this.validate(obj, opts),
          _validate2 = _slicedToArray(_validate, 1),
          err = _validate2[0];

      if (err) throw err;
    }

    /**
     * Override default error messages.
     *
     * @example
     * const hex = (val) => /^0x[0-9a-f]+$/.test(val)
     * schema.path('some.path').use({ hex })
     * schema.message('hex', path => `${path} must be hexadecimal`)
     *
     * @example
     * schema.message({ hex: path => `${path} must be hexadecimal` })
     *
     * @param {String|Object} name - name of the validator or an object with name-message pairs
     * @param {String|Function} [message] - the message or message generator to use
     * @return {Schema}
     */

  }, {
    key: 'message',
    value: function message(name, _message) {
      (0, _utils.assign)(name, _message, this.messages);
      return this;
    }

    /**
     * Override default validators.
     *
     * @example
     * schema.validator('required', val => val != null)
     *
     * @example
     * schema.validator({ required: val => val != null })
     *
     * @param {String|Object} name - name of the validator or an object with name-function pairs
     * @param {Function} [fn] - the function to use
     * @return {Schema}
     */

  }, {
    key: 'validator',
    value: function validator(name, fn) {
      (0, _utils.assign)(name, fn, this.validators);
      return this;
    }

    /**
     * Override default typecasters.
     *
     * @example
     * schema.typecaster('SomeClass', val => new SomeClass(val))
     *
     * @example
     * schema.typecaster({ SomeClass: val => new SomeClass(val) })
     *
     * @param {String|Object} name - name of the validator or an object with name-function pairs
     * @param {Function} [fn] - the function to use
     * @return {Schema}
     */

  }, {
    key: 'typecaster',
    value: function typecaster(name, fn) {
      (0, _utils.assign)(name, fn, this.typecasters);
      return this;
    }

    /**
     * Accepts a function that is called whenever new props are added.
     *
     * @param {Function} fn - the function to call
     * @return {Schema}
     * @private
     */

  }, {
    key: 'hook',
    value: function hook(fn) {
      this.hooks.push(fn);
      return this;
    }

    /**
     * Notify all subscribers that a property has been added.
     *
     * @param {String} path - the path of the property
     * @param {Property} prop - the new property
     * @return {Schema}
     * @private
     */

  }, {
    key: 'propagate',
    value: function propagate(path, prop) {
      this.hooks.forEach(function (fn) {
        return fn(path, prop);
      });
      return this;
    }
  }]);

  return Schema;
}();

// Export ValidationError


exports.default = Schema;
Schema.ValidationError = _error2.default;
module.exports = exports.default;

/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "64d5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var toObject = __webpack_require__("4bf8");
var toPrimitive = __webpack_require__("6a99");
var getPrototypeOf = __webpack_require__("38fd");
var getOwnPropertyDescriptor = __webpack_require__("11e9").f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__("9e1e") && $export($export.P + __webpack_require__("c5b4"), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),

/***/ "67ab":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("ca5a")('meta');
var isObject = __webpack_require__("d3f4");
var has = __webpack_require__("69a8");
var setDesc = __webpack_require__("86cc").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("79e5")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b42":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("8e6e");
__webpack_require__("8615");
__webpack_require__("ffc1");
__webpack_require__("4504");
__webpack_require__("fee7");
__webpack_require__("b9a1");
__webpack_require__("64d5");
module.exports = __webpack_require__("8378").Object;


/***/ }),

/***/ "71fe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assign = assign;
exports.walk = walk;
exports.join = join;

var _eivindfjeldstadDot = __webpack_require__("b258");

var _eivindfjeldstadDot2 = _interopRequireDefault(_eivindfjeldstadDot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Assign given key and value (or object) to given object
 *
 * @private
 */

function assign(key, val, obj) {
  if (typeof key == 'string') {
    obj[key] = val;
    return;
  }

  Object.keys(key).forEach(function (k) {
    return obj[k] = key[k];
  });
}

/**
 * Walk path
 *
 * @private
 */

function walk(path, obj, callback) {
  var parts = path.split(/\.\$(?=\.|$)/);
  var first = parts.shift();
  var arr = _eivindfjeldstadDot2.default.get(obj, first);

  if (!parts.length) {
    return callback(first, arr);
  }

  if (!Array.isArray(arr)) {
    return;
  }

  for (var i = 0; i < arr.length; i++) {
    var current = join(i, first);
    var next = current + parts.join('.$');
    walk(next, obj, callback);
  }
}

/**
 * Join `path` with `prefix`
 *
 * @private
 */

function join(path, prefix) {
  return prefix ? prefix + '.' + path : path;
}

/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7bbc":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("6821");
var gOPN = __webpack_require__("9093").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "8615":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__("5ca1");
var $values = __webpack_require__("504c")(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8a81":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var DESCRIPTORS = __webpack_require__("9e1e");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var META = __webpack_require__("67ab").KEY;
var $fails = __webpack_require__("79e5");
var shared = __webpack_require__("5537");
var setToStringTag = __webpack_require__("7f20");
var uid = __webpack_require__("ca5a");
var wks = __webpack_require__("2b4c");
var wksExt = __webpack_require__("37c8");
var wksDefine = __webpack_require__("3a72");
var enumKeys = __webpack_require__("d4c0");
var isArray = __webpack_require__("1169");
var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var toObject = __webpack_require__("4bf8");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var createDesc = __webpack_require__("4630");
var _create = __webpack_require__("2aeb");
var gOPNExt = __webpack_require__("7bbc");
var $GOPD = __webpack_require__("11e9");
var $GOPS = __webpack_require__("2621");
var $DP = __webpack_require__("86cc");
var $keys = __webpack_require__("0d58");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("9093").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("52a7").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("2d00")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("32e9")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8e6e":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("5ca1");
var ownKeys = __webpack_require__("990b");
var toIObject = __webpack_require__("6821");
var gOPD = __webpack_require__("11e9");
var createProperty = __webpack_require__("f1ae");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "990b":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("9093");
var gOPS = __webpack_require__("2621");
var anObject = __webpack_require__("cb7c");
var Reflect = __webpack_require__("7726").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b258":
/***/ (function(module, exports) {

/**
 * Set given `path`
 *
 * @param {Object} obj
 * @param {String} path
 * @param {Mixed} val
 * @api public
 */

exports.set = function (obj, path, val) {
  var segs = path.split('.');
  var attr = segs.pop();
  
  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    obj[seg] = obj[seg] || {};
    obj = obj[seg];
  }
  
  obj[attr] = val;
};

/**
 * Get given `path`
 *
 * @param {Object} obj
 * @param {String} path
 * @return {Mixed}
 * @api public
 */

exports.get = function (obj, path) {
  var segs = path.split('.');
  var attr = segs.pop();
  
  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];
    if (!obj[seg]) return;
    obj = obj[seg];
  }
  
  return obj[attr];
};

/***/ }),

/***/ "b3b1":
/***/ (function(module, exports) {

/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  if (isBuffer(val)) return 'buffer';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val);

  return typeof val;
};

// code borrowed from https://github.com/feross/is-buffer/blob/master/index.js
function isBuffer(obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}


/***/ }),

/***/ "b9a1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var toObject = __webpack_require__("4bf8");
var toPrimitive = __webpack_require__("6a99");
var getPrototypeOf = __webpack_require__("38fd");
var getOwnPropertyDescriptor = __webpack_require__("11e9").f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__("9e1e") && $export($export.P + __webpack_require__("c5b4"), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "bea1":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("8a81");
__webpack_require__("06db");
module.exports = __webpack_require__("8378").Symbol;


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5b4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__("2d00") || !__webpack_require__("79e5")(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__("7726")[K];
});


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d44f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Custom errors.
 *
 * @private
 */

var ValidationError = function (_Error) {
  _inherits(ValidationError, _Error);

  function ValidationError(message, path) {
    _classCallCheck(this, ValidationError);

    var _this = _possibleConstructorReturn(this, (ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).call(this, message));

    Object.defineProperty(_this, 'path', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: path
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, ValidationError);
    }
    return _this;
  }

  return ValidationError;
}(Error);

exports.default = ValidationError;
module.exports = exports.default;

/***/ }),

/***/ "d4c0":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/es7/object.js
var object = __webpack_require__("6b42");

// EXTERNAL MODULE: ./node_modules/core-js/es6/symbol.js
var symbol = __webpack_require__("bea1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// CONCATENATED MODULE: ./src/config/constant.js
/* harmony default export */ var constant = ({
  BORDER_SCOPE: 10
});
// CONCATENATED MODULE: ./src/libs/common.js


/* 判断当前应该采用mouse相关事件还是touch相关事件 */

var isTouchEvent = 'ontouchstart' in window;
var common_startEvent = isTouchEvent ? 'touchstart' : 'mousedown';
var common_moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
var common_endEvent = isTouchEvent ? 'touchend' : 'mouseup';

function _refillPx(target) {
  if (typeof target === 'number') {
    return target + 'px';
  }

  return target;
}
/**
 * 判断当前用户是否使用IE浏览器访问
 *
 * @returns {Boolean}
 */


function isIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) return true;else return false;
}
/**
 * 从Event对象中获取当前鼠标/手指的位置
 *
 * @param {Event} event
 * @returns {Object}
 */


function getClientPosition(event) {
  var clientX = isTouchEvent ? event.targetTouches[0].clientX : event.clientX;
  var clientY = isTouchEvent ? event.targetTouches[0].clientY : event.clientY;
  return {
    x: clientX,
    y: clientY
  };
}
/**
 * 获取当前的位置偏移值(left、top)
 *
 * @export
 * @param {Node} node
 * @returns {Object}
 */

function getPositionOffset(node) {
  var styleLeft = parseInt(getStyle(node, 'left'));
  var styleTop = parseInt(getStyle(node, 'top'));
  return {
    x: styleLeft ? styleLeft : 0,
    y: styleTop ? styleTop : 0
  };
}
function setPositionOffset(node, left, top, right, bottom) {
  if (!!left || left === 0) {
    node.style.left = _refillPx(left);
  }

  if (!!top || top === 0) {
    node.style.top = _refillPx(top);
  }

  if (!!right || right === 0) {
    node.style.right = _refillPx(right);
  }

  if (!!bottom || bottom === 0) {
    node.style.bottom = _refillPx(bottom);
  }
}
/**
 * 获取node的宽高
 *
 * @export
 * @param {Node} node
 */

function getSize(node) {
  var computedStyle = window.getComputedStyle(node);
  return {
    width: computedStyle.getPropertyValue('width'),
    height: computedStyle.getPropertyValue('height')
  };
}
function setSize(node, width, height) {
  node.style.width = _refillPx(width);
  node.style.height = _refillPx(height);
}
/**
 * 判断鼠标是否已出浏览器窗口
 * @param {Event} event
 * @return {Boolean}
 */

function isOutOfBrowser(event) {
  if (event.clientX > window.innerWidth || event.clientX < 0 || event.clientY < 0 || event.clientY > window.innerHeight) {
    return true;
  }

  return false;
}
/**
 * 判断目标Element是否在拖拽移动的handler上
 *
 * @export
 * @param {Node} targetEl
 * @param {String} customMoveHandler
 * @returns
 */

function isInMoveHandler(targetEl, _ref) {
  var customMoveHandler = _ref.customMoveHandler;

  if (!customMoveHandler) {
    return false;
  }

  var handler = document.querySelector(customMoveHandler);

  if (!handler) {
    return false;
  }

  return handler.contains(targetEl);
}
/**
 * 判断目标Element是否在最大化的handler上
 *
 * @export
 * @param {Node} targetEl
 * @param {String} customMoveHandler
 * @returns
 */

function isInMaximizeHandler(targetEl, _ref2) {
  var customMaximizeHandler = _ref2.customMaximizeHandler;

  if (!customMaximizeHandler) {
    return false;
  }

  var handler = document.querySelector(customMaximizeHandler);

  if (!handler) {
    return false;
  }

  return handler.contains(targetEl);
}
function getStyle(el, prop) {
  var computedStyle = window.getComputedStyle(el);
  var styleValue = computedStyle.getPropertyValue(prop);
  /* 
    需要对IE下的`getComputedStyle()`进行兼容，目前已知在css里设置`right: 0`的时候，
    再用`getComputedStyle()`取left属性的时候只取到`auto` 
  */

  if (isIE()) {
    if (prop === 'left' && styleValue === 'auto') {
      var elWidth = computedStyle.getPropertyValue('width');
      var elRight = computedStyle.getPropertyValue('right');
      console.log('left:', window.innerWidth - parseFloat(elWidth) + 'px');
      return window.innerWidth - parseFloat(elWidth) - parseFloat(elRight) + 'px';
    }

    if (prop === 'top' && styleValue === 'auto') {
      var elHeight = computedStyle.getPropertyValue('height');
      var elBottom = computedStyle.getPropertyValue('bottom');
      console.log('top:', window.innerHeight - parseFloat(elHeight) + 'px');
      return window.innerHeight - parseFloat(elHeight) - parseFloat(elBottom) + 'px';
    }
  }

  return styleValue;
}
function judgeResizeType(cursorPoint, target) {
  var borderScope = constant.BORDER_SCOPE;
  var x = cursorPoint.x;
  var y = cursorPoint.y;
  var offsetTop = target.offsetTop;
  var offsetLeft = target.offsetLeft;
  var offsetWidth = target.offsetWidth;
  var offsetHeight = target.offsetHeight; // console.log(
  //   `x:${x};y:${y};offsetTop:${offsetTop}；offsetLeft:${offsetLeft}；offsetWidth:${offsetWidth}；offsetHeight:${offsetHeight}；`
  // );

  if (Math.abs(offsetLeft - x) <= borderScope) {
    if (Math.abs(offsetTop - y) <= borderScope) {
      return 'left-top';
    } else if (Math.abs(offsetTop + offsetHeight - y) <= borderScope) {
      return 'left-bottom';
    } else {
      return 'left';
    }
  }

  if (Math.abs(offsetLeft + offsetWidth - x) <= borderScope) {
    if (Math.abs(offsetTop - y) <= borderScope) {
      return 'right-top';
    } else if (Math.abs(offsetTop + offsetHeight - y) <= borderScope) {
      return 'right-bottom';
    } else {
      return 'right';
    }
  }

  if (Math.abs(offsetTop - y) <= borderScope) {
    return 'top';
  } else if (Math.abs(offsetTop + offsetHeight - y) <= borderScope) {
    return 'bottom';
  }

  return 'middle';
}

function _iframeWalk(window, func) {
  var iframeEls = window.querySelectorAll('iframe');

  if (!!iframeEls && iframeEls.length > 0) {
    Array.prototype.forEach.call(iframeEls, function (iframe) {
      func(iframe);
    });
  }
}

function ignoreIframe(window) {
  _iframeWalk(window, function (iframe) {
    iframe.style['pointer-events'] = 'none';
  });
}
function recoverIframe(window) {
  _iframeWalk(window, function (iframe) {
    iframe.style['pointer-events'] = 'auto';
  });
}
// CONCATENATED MODULE: ./src/libs/resize.js


function _isOnOtherHandler(el, _ref) {
  var moveHandler = _ref.moveHandler,
      maximizeHandler = _ref.maximizeHandler;
  return el === moveHandler || el === maximizeHandler;
}

function _setCursor(window, el, positionType) {
  var cursor;

  switch (positionType) {
    case 'top':
    case 'bottom':
      cursor = 'n-resize';
      break;

    case 'left':
    case 'right':
      cursor = 'e-resize';
      break;

    case 'left-top':
      cursor = 'nw-resize';
      break;

    case 'left-bottom':
      cursor = 'sw-resize';
      break;

    case 'right-top':
      cursor = 'ne-resize';
      break;

    case 'right-bottom':
      cursor = 'se-resize';
      break;
  }

  window.style.cursor = cursor;
}

function _resetCursor(window) {
  if (getStyle(window, 'cursor').indexOf('resize') > -1) {
    window.style.cursor = '';
  }
}

function _isDirectionResizable(direction) {
  var resizableParams = this.params.resizable;
  if (resizableParams === true) return true;

  if (Array.isArray(resizableParams) && resizableParams.indexOf(direction) > -1) {
    return true;
  }

  return false;
}

function _calWidthAndOffset(_ref2) {
  var type = _ref2.type,
      originSize = _ref2.originSize,
      originOffset = _ref2.originOffset,
      nowPosition = _ref2.nowPosition,
      startPoint = _ref2.startPoint,
      minWidth = _ref2.minWidth,
      maxWidth = _ref2.maxWidth,
      minHeight = _ref2.minHeight,
      maxHeight = _ref2.maxHeight;

  /* 获取最小/最大宽度限制下的实际宽度 */
  function _getLimitWidth(_ref3) {
    var minWidth = _ref3.minWidth,
        maxWidth = _ref3.maxWidth,
        currentWidth = _ref3.currentWidth;

    /* 最小宽度限制 */
    if (!!minWidth && currentWidth < minWidth) {
      currentWidth = minWidth;
    } else if (currentWidth < 0) {
      currentWidth = 0;
    }
    /* 最大宽度限制 */


    if (!!maxWidth && currentWidth > maxWidth) {
      currentWidth = maxWidth;
    }

    return currentWidth;
  }
  /* 获取最小/最大高度限制下的实际高度 */


  function _getLimitHeight(_ref4) {
    var minHeight = _ref4.minHeight,
        maxHeight = _ref4.maxHeight,
        currentHeight = _ref4.currentHeight;

    /* 最小宽度限制 */
    if (!!minHeight && currentHeight < minHeight) {
      currentHeight = minHeight;
    } else if (currentHeight < 0) {
      currentHeight = 0;
    }
    /* 最大宽度限制 */


    if (!!maxHeight && currentHeight > maxHeight) {
      currentHeight = maxHeight;
    }

    return currentHeight;
  }

  var optionWidth = nowPosition.x - startPoint.x + originSize.width;
  var optionHeight = nowPosition.y - startPoint.y + originSize.height;
  var calWidth = originSize.width;
  var calHeight = originSize.height;
  var calTop = originOffset.y;
  var calLeft = originOffset.x;
  /* 左边的拖拽调整大小 */

  if (type.indexOf('left') > -1) {
    calWidth = startPoint.x - nowPosition.x + originSize.width; // 根据拖拽移动的水平位移决定宽度

    calWidth = _getLimitWidth({
      minWidth: minWidth,
      maxWidth: maxWidth,
      currentWidth: calWidth
    }); // 根据最大/最小宽度限制来决定最终的宽度

    calLeft = originOffset.x - (calWidth - originSize.width); // 根据宽度的变化量来决定窗口的left属性
  }
  /* 上边的拖拽调整大小 */


  if (type.indexOf('top') > -1) {
    calHeight = startPoint.y - nowPosition.y + originSize.height; // 根据拖拽移动的垂直位移决定高度
    // 根据最大/最小高度限制来决定最终的高度

    calHeight = _getLimitHeight({
      minHeight: minHeight,
      maxHeight: maxHeight,
      currentHeight: calHeight
    });
    calTop = originOffset.y - (calHeight - originSize.height); // 根据高度的变化量来决定窗口的top属性
  }
  /* 右边的拖拽调整大小 */


  if (type.indexOf('right') > -1) {
    calWidth = _getLimitWidth({
      minWidth: minWidth,
      maxWidth: maxWidth,
      currentWidth: optionWidth
    });
  }
  /* 下边的拖拽调整大小 */


  if (type.indexOf('bottom') > -1) {
    calHeight = _getLimitHeight({
      minHeight: minHeight,
      maxHeight: maxHeight,
      currentHeight: optionHeight
    });
  }

  return {
    calWidth: calWidth,
    calHeight: calHeight,
    calTop: calTop,
    calLeft: calLeft
  };
}
/**
 * 为了拖拽调整大小，绑定事件；
 * 与拖拽移动不一样的是，由于鼠标在移动过程中会超出window的范围，因此moveEvent需要绑定在document上
 *
 * @param {Event} event
 * @returns
 */


function handleStartEventForResize(startEvent) {
  function _handleMoveEventForResize(moveEvent) {
    /* 判断鼠标是否已出浏览器窗口，是的话就限制拖拽，避免整个window出浏览器窗口 */
    if (isOutOfBrowser(moveEvent)) {
      return false;
    }

    var nowPosition = getClientPosition(moveEvent); // 获取鼠标/手指的位置

    var _calWidthAndOffset2 = _calWidthAndOffset({
      type: type,
      originSize: originSize,
      originOffset: originOffset,
      nowPosition: nowPosition,
      startPoint: startPoint,
      minWidth: params.minWidth,
      maxWidth: params.maxWidth,
      minHeight: params.minHeight,
      maxHeight: params.maxHeight
    }),
        calWidth = _calWidthAndOffset2.calWidth,
        calHeight = _calWidthAndOffset2.calHeight,
        calTop = _calWidthAndOffset2.calTop,
        calLeft = _calWidthAndOffset2.calLeft;

    setSize(target, calWidth, calHeight);
    setPositionOffset(target, calLeft, calTop);
    moveEvent.stopPropagation();
  }

  function _handleEndEventForResize(endEvent) {
    document.removeEventListener(common_moveEvent, _handleMoveEventForResize, false); // 拖拽结束，清除移动的事件回调

    endEvent.preventDefault();
    endEvent.stopPropagation();
  }

  var eventEl = startEvent.target;
  var params = this.params;
  var target = this.window;
  var startPoint = getClientPosition(startEvent); // 本次拖拽的起点位置

  var type = judgeResizeType(startPoint, target); // 获取本次点击位于窗口的哪个区域

  /* 点击位置位于窗口中央，不做任何处理 */

  if (type === 'middle') {
    return;
  }
  /* 该方向上的resize是否启用 */


  if (!_isDirectionResizable.call(this, type)) {
    return;
  }

  if (isInMoveHandler(eventEl, params)) {
    /* 判断是否点击在拖拽移动的handler上，是的话就不做处理 */
    return;
  }
  /* 判断是否点击在最大化的handler上，是的话就不做处理 */


  if (isInMaximizeHandler(eventEl, params)) {
    return;
  }

  var originSize = getSize(target);
  originSize = {
    width: parseInt(originSize.width),
    height: parseInt(originSize.height)
  };
  var originOffset = getPositionOffset(target);
  document.addEventListener(common_moveEvent, _handleMoveEventForResize, false); // 应在拖拽开始后才绑定移动的事件回调

  document.addEventListener(common_endEvent, _handleEndEventForResize); // 绑定endEvent

  startEvent.preventDefault();
  startEvent.stopPropagation();
}
function cursorChange(event) {
  var target = this.window;
  var currentPoint = getClientPosition(event); // 本次拖拽的起点位置

  var type = judgeResizeType(currentPoint, target); // 获取本次点击位于窗口的哪个区域

  /* 点击位置位于窗口中央，重置cursor */

  if (_isOnOtherHandler(event.target, this) || type === 'middle' || !_isDirectionResizable.call(this, type)) {
    _resetCursor(this.window);
  } else {
    _setCursor(this.window, event.target, type);
  }
}
// CONCATENATED MODULE: ./src/libs/move.js

function handleStartEventForMove(event) {
  function _handleEndEventForMove(event) {
    document.removeEventListener(common_moveEvent, _handleMoveEventForMove, false); // 拖拽结束，清除移动的事件回调

    /* 恢复cursor */

    handler.style.cursor = 'auto';
    event.preventDefault();
  }

  function _handleMoveEventForMove(event) {
    /* 判断鼠标是否已出浏览器窗口，是的话就限制移动，避免整个window出浏览器窗口 */
    if (isOutOfBrowser(event)) {
      return false;
    }

    var position = getClientPosition(event); // 获取鼠标/手指的位置

    /* 计算位置偏移值 */

    var positionOffset = {
      x: position.x - startPoint.x + originPositionOffset.x,
      y: position.y - startPoint.y + originPositionOffset.y
    };
    window.style.top = positionOffset.y + 'px'; // 设置纵坐标，即top

    window.style.left = positionOffset.x + 'px'; // 设置横坐标，left

    window.style.bottom = 'auto'; // 必须设置为auto，否则就会把高度撑起来

    window.style.right = 'auto'; // 必须设置为auto，否则就会把宽度撑起来
  }

  var handler = event.currentTarget; // event.currentTarget是绑定事件的element

  var window = this.window;
  var startPoint = getClientPosition(event); // 记录本次拖拽的起点位置

  /* 当窗口本体作为MoveHandler时，需要判断拖拽的位置是否与resize重复 */

  if (this.isMoveHandlerEqualWindow && judgeResizeType(startPoint, window) !== 'middle') {
    return;
  }

  document.addEventListener(common_moveEvent, _handleMoveEventForMove, false); // 应在拖拽开始后才绑定移动的事件回调

  document.addEventListener(common_endEvent, _handleEndEventForMove);
  var originPositionOffset = getPositionOffset(window); // 获取当前的位置偏移值

  /* 调整cursor */

  handler.style.cursor = 'all-scroll';
  event.preventDefault();
}
// CONCATENATED MODULE: ./src/libs/maximize.js

/**
 * 添加窗口最大化的事件
 *
 * @export
 * @param {Element} handler
 */

function addMaximizeEvent(handler) {
  var target = this.window;
  var params = this.params;
  var positionOffset; // 记录最大化前的位置偏移(top/left)

  var size; // 记录最大化前的大小(width/height)

  var position; // 记录最大化前的position值

  var isMaximize = false; // 记录当前是否为最大化的状态，方便判定切换状态

  /* 设置位置偏移值 */

  function _setPositionOffset(left, top, right, bottom) {
    if (typeof left === 'number') {
      target.style.left = left + 'px';
    }

    if (typeof top === 'number') {
      target.style.top = top + 'px';
    }

    if (typeof right === 'number') {
      target.style.right = right + 'px';
    }

    if (typeof bottom === 'number') {
      target.style.bottom = bottom + 'px';
    }
  }
  /* 设置大小 */


  function _setSize(width, height) {
    target.style.width = width;
    target.style.height = height;
  }
  /* 最大化窗口，其原理是取浏览器窗口的宽高来设置在窗口上 */


  function _setTargetMaximize() {
    _setPositionOffset(0, 0, 0, 0);

    _setSize('auto', 'auto');
  }
  /* 在最大化的handler绑定click事件回调 */


  handler.addEventListener('click', function () {
    if (!isMaximize) {
      positionOffset = getPositionOffset(target); // 记录最大化前的位置偏移

      size = getSize(target); // 记录最大化前的窗口大小

      _setTargetMaximize(); // 最大化窗口


      isMaximize = true;
    } else {
      // 如果当前是最大化状态...
      target.style.position = position;

      _setPositionOffset(positionOffset.x, positionOffset.y);

      _setSize(size.width, size.height);

      window.removeEventListener('resize', _setTargetMaximize);
      isMaximize = false;
    }

    if (!!params.maximizeCallback && typeof params.maximizeCallback === 'function') {
      params.maximizeCallback(isMaximize);
    }
  });
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/validate/build/schema.js
var build_schema = __webpack_require__("5d8f");
var schema_default = /*#__PURE__*/__webpack_require__.n(build_schema);

// CONCATENATED MODULE: ./src/libs/validate.js



var RULES = {
  minWidth: {
    type: Number,
    size: {
      min: 1
    }
  },
  maxWidth: {
    type: Number
  },
  minHeight: {
    type: Number,
    size: {
      min: 1
    }
  },
  maxHeight: {
    type: Number
  },
  resizeHandlerClassName: {
    type: String
  },
  customMoveHandler: {
    type: String
  },
  customMaximizeHandler: {
    type: String
  },
  movable: {
    type: Boolean,
    required: false
  },
  resizable: {
    required: false
  },
  maximizeCallback: {
    type: Function
  }
};
function validate(customParams) {
  var schema = new schema_default.a(RULES);
  var errors = schema.validate(customParams);

  if (errors.length === 0) {
    return true;
  } else {
    console.warn('There are some mistakes in your params to vue-directive-window, please fix them. Otherwise, it will act not like what you expected.');
    errors.forEach(function (error) {
      delete customParams[error.path];
      console.warn(error.message);
    });
  }
}
// CONCATENATED MODULE: ./src/config/default-params.js
/* harmony default export */ var default_params = ({
  minWidth: 100,
  // resize最小宽度
  maxWidth: null,
  // resize最大宽度
  minHeight: 100,
  // resize最小高度
  maxHeight: null,
  // resize最大高度
  movable: true,
  // 是否开启拖拽移动功能，默认开启
  resizable: true,
  // 是否开启resize功能，true表示开启，false表示关闭；另外还可接受数组类型参数，指定在哪些方向上开启resize，包括：left-top/left-bottom/left/right-top/right-bottom/right/top/bottom
  customMoveHandler: null,
  // 自定义的拖拽移动handler，可接受选择器形式的参数，或是Element；为空则以窗口自身为handler
  customMaximizeHandler: null,
  // 自定义的最大化handler，可接受选择器形式的参数，或是Element；为空则不开启最大化的功能
  maximizeCallback: null // 最大化后的回调函数

});
// CONCATENATED MODULE: ./src/libs/event-binding.js








function _prepareParams(customParams) {
  validate(customParams);
  return Object.assign({}, default_params, customParams);
}

function getMoveHandler(finalParams, el) {
  var customMoveHandler = finalParams.customMoveHandler;

  if (customMoveHandler) {
    if (typeof customMoveHandler === 'string') {
      return el.querySelector(customMoveHandler);
    } else {
      return customMoveHandler;
    }
  } else {
    return el;
  }
}

function getMaximizeHandler(finalParams, el) {
  var customMaximizeHandler = finalParams.customMaximizeHandler;

  if (customMaximizeHandler) {
    if (typeof customMaximizeHandler === 'string') {
      return el.querySelector(customMaximizeHandler);
    } else {
      return customMaximizeHandler;
    }
  }

  return null;
}

function isMoveHandlerEqualWindow(window, moveHandler) {
  return window === moveHandler;
}

function eventBinding(el, customParams) {
  var finalParams = _prepareParams(customParams);

  var moveHandler = getMoveHandler(finalParams, el);
  var maximizeHandler = getMaximizeHandler(finalParams, el);
  var instance = {
    window: el,
    params: finalParams,
    moveHandler: moveHandler,
    maximizeHandler: maximizeHandler,
    isMoveHandlerEqualWindow: isMoveHandlerEqualWindow(el, moveHandler)
  };
  /* 一些杂项的处理 */

  el.addEventListener(common_startEvent, function () {
    ignoreIframe(el); // 由于iframe会把moveEvent吃掉，因此需要忽略掉iframe;

    el.addEventListener(common_endEvent, function () {
      recoverIframe(el); // 恢复iframe的功能
    }, {
      once: true
    });
  });
  /* 拖拽移动相关 */

  if (finalParams.movable) {
    moveHandler.addEventListener(common_startEvent, handleStartEventForMove.bind(instance));
  }
  /* resize相关 */


  if (finalParams.resizable) {
    el.addEventListener(common_startEvent, handleStartEventForResize.bind(instance));
    el.addEventListener(common_moveEvent, cursorChange.bind(instance));
  }
  /* 最大化相关 */


  if (maximizeHandler) {
    addMaximizeEvent.call(instance, maximizeHandler);
  }
}
// CONCATENATED MODULE: ./src/main.js



/* vue-directive-window，提供Vue.use方式安装，安装后将可使用v-title这一自定义指令 */

function install(Vue) {
  Vue.directive('window', {
    bind: function bind(el, binding) {
      var customParams = binding.value; // 从指令绑定值取来参数

      eventBinding(el, customParams);
    }
  });
}
/* EnhancedWindow，提供普通函数的方式来调用  */


function enhanceWindow(el, customParams) {
  eventBinding(el, customParams);
}

/* harmony default export */ var main = ({
  install: install,
  enhanceWindow: enhanceWindow
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (main);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "fee7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var toObject = __webpack_require__("4bf8");
var aFunction = __webpack_require__("d8e8");
var $defineProperty = __webpack_require__("86cc");

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__("9e1e") && $export($export.P + __webpack_require__("c5b4"), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),

/***/ "ffc1":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__("5ca1");
var $entries = __webpack_require__("504c")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue-directive-window.umd.js.map