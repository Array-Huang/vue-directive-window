module.exports =
/******/ (function(modules) { // webpackBootstrap
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

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


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

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


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

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

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
  return computedStyle.getPropertyValue(prop);
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


  if (!_isDirectionResizable(type)) {
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

  if (_isOnOtherHandler(event.target, this) || type === 'middle' || !_isDirectionResizable(type)) {
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
  });
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
  customMaximizeHandler: null // 自定义的最大化handler，可接受选择器形式的参数，或是Element；为空则不开启最大化的功能

});
// CONCATENATED MODULE: ./src/libs/event-binding.js




 // import { validate } from './validate';



function _prepareParams(customParams) {
  // validate(customParams);
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

/* 供vue-directive-window */

function install(Vue) {
  Vue.directive('window', {
    bind: function bind(el, binding) {
      var customParams = binding.value; // 从指令绑定值取来参数

      eventBinding(el, customParams);
    }
  });
}
/* 供EnhancedWindow */


function enhanceWindow(el, customParams) {
  eventBinding(el, customParams);
}
/* harmony default export */ var main = ({
  install: install,
  enhanceWindow: enhanceWindow
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport enhanceWindow */__webpack_require__.d(__webpack_exports__, "enhanceWindow", function() { return enhanceWindow; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (main);



/***/ })

/******/ })["default"];
//# sourceMappingURL=VueDirectiveWindow.common.js.map