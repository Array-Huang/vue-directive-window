/*!
 * 
 * vue-directive-window
 * Vue.js directive that enhance your Modal Window, support drag, resize and maximize.
 * 
 * @version v0.7.5
 * @homepage https://github.com/Array-Huang/vue-directive-window
 * @repository git+https://github.com/Array-Huang/vue-directive-window.git
 * 
 * (c) 2019 Array-Huang
 * Released under the MIT License.
 * hash: 9a4d4a3d44b63541ec9c
 * 
 */
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

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
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

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


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

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
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

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


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

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
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

/***/ "8086":
/***/ (function(module, exports) {

/*!
 * micro-schema-validator
 * Damn simple javascript object schema validator
 * 
 * @version v0.1.2
 * @author Array Huang <hyw125@gmail.com>
 * @homepage https://github.com/Array-Huang/micro-schema-validator#readme
 * @repository git+https://github.com/Array-Huang/micro-schema-validator.git
 */
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src */ "./src/index.js").default;

/***/ }),

/***/ "./src/error.class.js":
/*!****************************!*\
  !*** ./src/error.class.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ValidatorError; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidatorError = function ValidatorError(_ref) {
  var columnName = _ref.columnName,
      columnVal = _ref.columnVal,
      ruleName = _ref.ruleName,
      ruleVal = _ref.ruleVal,
      msg = _ref.msg;

  _classCallCheck(this, ValidatorError);

  this.columnName = columnName;
  this.columnVal = columnVal;
  this.ruleName = ruleName;
  this.ruleVal = ruleVal;
  this.msg = msg;
};



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validators */ "./src/validators.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var MicroSchemaValidator =
/*#__PURE__*/
function () {
  function MicroSchemaValidator(schema) {
    _classCallCheck(this, MicroSchemaValidator);

    this._library_name = 'micro-schema-validator';

    if (!schema) {
      console.warn("Schema can't be empty.");
    }

    this.schema = schema;
    this.errors = [];
  }

  _createClass(MicroSchemaValidator, [{
    key: "validate",
    value: function validate(target) {
      if (!target) {
        console.warn("Validate target can't be empty.");
      }

      for (var columnName in this.schema) {
        if (!Object.prototype.hasOwnProperty.call(this.schema, columnName)) {
          continue;
        }

        var rules = this.schema[columnName];

        for (var ruleName in rules) {
          if (!Object.prototype.hasOwnProperty.call(rules, ruleName)) {
            continue;
          }

          var columnVal = target[columnName];
          var ruleVal = rules[ruleName];

          if (ruleName !== 'required' && (typeof columnVal === 'undefined' || Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isNull"])(columnVal))) {
            continue;
          }

          _validators__WEBPACK_IMPORTED_MODULE_0__["default"].check(this.errors, {
            columnName: columnName,
            columnVal: columnVal,
            ruleName: ruleName,
            ruleVal: ruleVal
          });
        }
      }

      return {
        status: this.errors.length === 0,
        errors: this.errors
      };
    }
  }, {
    key: "_getName",
    value: function _getName() {
      return this._library_name;
    }
  }]);

  return MicroSchemaValidator;
}();

/* harmony default export */ __webpack_exports__["default"] = (MicroSchemaValidator);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isNull */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return isNull; });
function isNull(val) {
  return !val && typeof val !== 'undefined' && val !== 0;
}

/***/ }),

/***/ "./src/validators.js":
/*!***************************!*\
  !*** ./src/validators.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _error_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error.class */ "./src/error.class.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = ({
  originInfo: null,
  buildError: function buildError(msg) {
    return new _error_class__WEBPACK_IMPORTED_MODULE_0__["default"](_objectSpread({}, this.originInfo, {
      msg: msg
    }));
  },
  check: function check(errorsContainer, _ref) {
    var columnName = _ref.columnName,
        columnVal = _ref.columnVal,
        ruleName = _ref.ruleName,
        ruleVal = _ref.ruleVal;
    var checkMethodName = "".concat(ruleName, "Check");

    if (!this[checkMethodName] && typeof this[checkMethodName] !== 'function') {
      console.warn("Unexpected rule found: ".concat(ruleName));
      return;
    }

    this.originInfo = {
      columnName: columnName,
      columnVal: columnVal,
      ruleName: ruleName,
      ruleVal: ruleVal
    };
    var checkResult = this[checkMethodName]({
      columnName: columnName,
      columnVal: columnVal,
      ruleName: ruleName,
      ruleVal: ruleVal
    });

    if (checkResult instanceof _error_class__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      errorsContainer.push(checkResult);
    }
  },
  requiredCheck: function requiredCheck(_ref2) {
    var columnName = _ref2.columnName,
        columnVal = _ref2.columnVal,
        ruleVal = _ref2.ruleVal;

    if (!!ruleVal && (typeof columnVal === 'undefined' || Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isNull"])(columnVal))) {
      return this.buildError("RequiredCheck: ".concat(columnName, " is required"));
    }

    return true;
  },
  typeCheck: function typeCheck(_ref3) {
    var columnName = _ref3.columnName,
        columnVal = _ref3.columnVal,
        ruleVal = _ref3.ruleVal;
    var availableTypes = ruleVal.split('|');

    if (availableTypes.length === 0) {
      console.warn('TypeCheck: Type requirement should not be empty');
    }

    var columnValType = _typeof(columnVal);

    if (availableTypes.every(function (availableType) {
      if (availableType === 'array') {
        return !Array.isArray(columnVal);
      }

      return columnValType !== availableType;
    })) {
      return this.buildError("TypeCheck: ".concat(columnName, " need to be ").concat(ruleVal, ", but now is ").concat(columnValType));
    }
  },
  sizeCheck: function sizeCheck(_ref4) {
    var columnName = _ref4.columnName,
        columnVal = _ref4.columnVal,
        ruleVal = _ref4.ruleVal;

    function _stringAndArraySizeCheck() {
      var length = columnVal.length;

      if (typeof ruleVal.min === 'number' && ruleVal.min > 0 && length < ruleVal.min) {
        return false;
      }

      if (typeof ruleVal.max === 'number' && ruleVal.max > 0 && length > ruleVal.max) {
        return false;
      }

      return true;
    }

    function _numberSizeCheck() {
      if (typeof ruleVal.min === 'number' && ruleVal.min > 0 && columnVal < ruleVal.min) {
        return false;
      }

      if (typeof ruleVal.max === 'number' && ruleVal.max > 0 && columnVal > ruleVal.max) {
        return false;
      }

      return true;
    }

    var checkResult;

    if (typeof columnVal === 'string' || Array.isArray(columnVal)) {
      checkResult = _stringAndArraySizeCheck();
    } else if (typeof columnVal === 'number') {
      checkResult = _numberSizeCheck();
    } else {
      console.warn("SizeCheck: ".concat(columnName, " need to be a string, a number, or an array"));
      return;
    }

    if (!checkResult) {
      return this.buildError('SizeCheck failed');
    }
  }
});

/***/ })

/******/ });
//# sourceMappingURL=micro-schema-validator.js.map

/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.10' };
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

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


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

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


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
  BORDER_SCOPE: 10,
  // resize区域的宽度
  AVAILABLE_CLICK_MAX_MOVE_DISTANCE: 4,
  // 在move中，超出这个距离的话将把click事件吞掉
  AVAILABLE_CLICK_MAX_RESIZE_DISTANCE: 4 // 在resize中，超出这个距离的话将把click事件吞掉

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
/* 计算两点间距离 */

function calDistance(_ref3) {
  var x1 = _ref3.x1,
      y1 = _ref3.y1,
      x2 = _ref3.x2,
      y2 = _ref3.y2;
  var result = Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5); // console.log({ x1, y1, x2, y2 }, result);

  return result;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

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
    /* 设置resizing状态，主要用于吞掉click事件 */

    if (calDistance({
      x1: nowPosition.x,
      y1: nowPosition.y,
      x2: startPoint.x,
      y2: startPoint.y
    }) > constant.AVAILABLE_CLICK_MAX_RESIZE_DISTANCE && target.className.indexOf('resizing') === -1) {
      target.className += ' resizing';
    }
  }

  function _handleEndEventForResize(endEvent) {
    document.removeEventListener(common_moveEvent, _handleMoveEventForResize, false); // 拖拽结束，清除移动的事件回调

    endEvent.preventDefault();
    endEvent.stopPropagation();
    /* 撤销moving状态，但由于此状态值主要用于吞掉click事件，因此使用setTimeout延长moving状态至click事件结束 */

    setTimeout(function () {
      target.className = target.className.replace(/ ?resizing/, '');
    }, 0);
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



/**
 * 计算拖拽移动过程中窗口的位置，在移动过程中每一小段就会触发本方法
 *
 * @param {Object} touchStartPoint 鼠标/手势起始点
 * @param {Object} touchEndPoint 鼠标/手势当前点
 * @param {Object} windowOriginPosition 窗口在拖拽移动前的位置
 * @param {Object} movable 用户传入的拖拽移动开关/类型
 */

function _calWindowCurrentPosition(touchStartPoint, touchEndPoint, windowOriginPosition, movableParam) {
  var supposePosition = {
    x: touchEndPoint.x - touchStartPoint.x + windowOriginPosition.x,
    y: touchEndPoint.y - touchStartPoint.y + windowOriginPosition.y
  };

  switch (movableParam) {
    case 'horizontal':
      return {
        x: supposePosition.x,
        y: windowOriginPosition.y
      };

    case 'vertical':
      return {
        x: windowOriginPosition.x,
        y: supposePosition.y
      };

    case true:
    default:
      return supposePosition;
  }
}

function handleStartEventForMove(event) {
  function _handleEndEventForMove(event) {
    /* 提供拖拽移动结束的钩子 */
    moveEndCallback();
    nowInMoving = false;
    document.removeEventListener(common_moveEvent, _handleMoveEventForMove, false); // 拖拽结束，清除移动的事件回调

    event.preventDefault();
    /* 撤销moving状态，但由于此状态值主要用于吞掉click事件，因此使用setTimeout延长moving状态至click事件结束 */

    setTimeout(function () {
      window.className = window.className.replace(/ ?moving/, '');
    }, 0);
  }

  function _handleMoveEventForMove(event) {
    /* 判断鼠标是否已出浏览器窗口，是的话就限制移动，避免整个window出浏览器窗口 */
    if (isOutOfBrowser(event)) {
      return false;
    }

    var position = getClientPosition(event); // 获取鼠标/手指的位置

    /* 计算位置偏移值 */

    var positionOffset = _calWindowCurrentPosition(startPoint, position, originPositionOffset, movableParam);

    window.style.top = positionOffset.y + 'px'; // 设置纵坐标，即top

    window.style.left = positionOffset.x + 'px'; // 设置横坐标，left

    window.style.bottom = 'auto'; // 必须设置为auto，否则就会把高度撑起来

    window.style.right = 'auto'; // 必须设置为auto，否则就会把宽度撑起来

    /* 设置moving状态，主要用于吞掉click事件 */

    if (calDistance({
      x1: position.x,
      y1: position.y,
      x2: startPoint.x,
      y2: startPoint.y
    }) > constant.AVAILABLE_CLICK_MAX_MOVE_DISTANCE && window.className.indexOf('moving') === -1) {
      window.className += ' moving';
      /* 提供拖拽移动相关的钩子 */

      if (!nowInMoving) {
        moveStartCallback();
        nowInMoving = true; // 保证在一次完整的拖拽移动过程中只触发一次moveStartCallback
      }

      movingCallback();
    }
  }

  var window = this.window;
  var startPoint = getClientPosition(event); // 记录本次拖拽的起点位置

  var movableParam = this.params.movable;
  var moveStartCallback = this.params.moveStartCallback;
  var movingCallback = this.params.movingCallback;
  var moveEndCallback = this.params.moveEndCallback;
  var nowInMoving = false;
  /* 当窗口本体作为MoveHandler且启用resize特性时，需要判断拖拽的位置是否与resize重复 */

  if (this.params.resizable && this.isMoveHandlerEqualWindow && judgeResizeType(startPoint, window) !== 'middle') {
    return;
  }
  /* 固定窗口宽高 */


  var size = getSize(window);
  size = {
    width: parseInt(size.width),
    height: parseInt(size.height)
  };
  setSize(window, size.width, size.height);
  document.addEventListener(common_moveEvent, _handleMoveEventForMove, false); // 应在拖拽开始后才绑定移动的事件回调

  document.addEventListener(common_endEvent, _handleEndEventForMove);
  var originPositionOffset = getPositionOffset(window); // 获取当前的位置偏移值

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


  handler.addEventListener('click', function (event) {
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

    event.stopPropagation();
  });
}
// EXTERNAL MODULE: ./node_modules/micro-schema-validator/lib/micro-schema-validator.js
var micro_schema_validator = __webpack_require__("8086");
var micro_schema_validator_default = /*#__PURE__*/__webpack_require__.n(micro_schema_validator);

// CONCATENATED MODULE: ./src/libs/validate.js


var RULES = {
  windowSelector: {
    type: 'string',
    required: false
  },
  minWidth: {
    type: 'number',
    size: {
      min: 1
    }
  },
  maxWidth: {
    type: 'number'
  },
  minHeight: {
    type: 'number',
    size: {
      min: 1
    }
  },
  maxHeight: {
    type: 'number'
  },
  resizeHandlerClassName: {
    type: 'string'
  },
  customMoveHandler: {
    type: 'string'
  },
  customMaximizeHandler: {
    type: 'string'
  },
  movable: {
    type: 'boolean|string',
    required: false
  },
  resizable: {
    type: 'boolean|string',
    required: false
  },
  maximizeCallback: {
    type: 'function'
  },
  moveStartCallback: {
    type: 'function',
    required: false
  },
  movingCallback: {
    type: 'function',
    required: false
  },
  moveEndCallback: {
    type: 'function',
    required: false
  }
};
function validate() {
  var customParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var schema = new micro_schema_validator_default.a(RULES);
  var validateResult = schema.validate(customParams);

  if (validateResult.status) {
    return;
  } else {
    console.warn('There are some mistakes in your params to vue-directive-window, please fix them. Otherwise, it will act not like what you expected.');

    if (Array.isArray(validateResult.errors)) {
      validateResult.errors.forEach(function (error) {
        console.warn(error.msg);
        /* 参数有误则立刻抛出异常 */

        throw 'Params validation failed, so vue-directive-window stopped.';
      });
    }
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
  maximizeCallback: function maximizeCallback() {},
  // 最大化后的回调函数
  moveStartCallback: function moveStartCallback() {},
  // 拖拽移动开始的回调函数
  movingCallback: function movingCallback() {},
  // 拖拽移动过程中的回调函数，在每次拖拽过程中会被执行多次
  moveEndCallback: function moveEndCallback() {} // 拖拽移动结束的回调函数

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
  /* 传入参数校验，参数有误则立刻停止执行 */
  try {
    var finalParams = _prepareParams(customParams);
  } catch (exception) {
    console.warn(exception);
    return;
  }

  el = finalParams.windowSelector ? el.querySelector(finalParams.windowSelector) : el;
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
    /* 当处在moving状态的时候，吞掉click事件 */

    moveHandler.addEventListener('click', function (event) {
      if (moveHandler.className.indexOf('moving') > -1) {
        event.stopImmediatePropagation();
      }
    });
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
  /* 当处在resizing/moving状态的时候，吞掉click事件 */


  el.addEventListener('click', function (event) {
    if (el.className.indexOf('moving') > -1 || el.className.indexOf('resizing') > -1) {
      event.stopImmediatePropagation();
    }
  });
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
//# sourceMappingURL=vue-directive-window.common.js.map