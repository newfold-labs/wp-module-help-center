/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@algolia/events/events.js":
/*!************************************************!*\
  !*** ./node_modules/@algolia/events/events.js ***!
  \************************************************/
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
// EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ "./src/icons/close.svg":
/*!*****************************!*\
  !*** ./src/icons/close.svg ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactComponent": () => (/* binding */ SvgClose),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _g, _defs;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgClose = function SvgClose(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    clipPath: "url(#close_svg__a)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    clipPath: "url(#close_svg__b)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "m12 13.06 3.712 3.713 1.06-1.06L13.06 12l3.713-3.712-1.061-1.06-3.713 3.711-3.712-3.712-1.06 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061Z",
    fill: "#1E1E1E"
  })))), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "close_svg__a"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    width: 24,
    height: 24,
    rx: 2,
    fill: "#fff"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "close_svg__b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    width: 24,
    height: 24,
    rx: 2,
    fill: "#fff"
  })))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzYwNF8zMDE3KSI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMV82MDRfMzAxNykiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjk5OTUgMTMuMDYwN0wxNS43MTE4IDE2Ljc3M0wxNi43NzI1IDE1LjcxMjNMMTMuMDYwMiAxMkwxNi43NzI1IDguMjg3NzJMMTUuNzExOSA3LjIyNzA2TDExLjk5OTUgMTAuOTM5NEw4LjI4NzIyIDcuMjI3MDVMNy4yMjY1NiA4LjI4NzcxTDEwLjkzODkgMTJMNy4yMjY1NyAxNS43MTIzTDguMjg3MjMgMTYuNzczTDExLjk5OTUgMTMuMDYwN1oiIGZpbGw9IiMxRTFFMUUiLz4KPC9nPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzYwNF8zMDE3Ij4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPGNsaXBQYXRoIGlkPSJjbGlwMV82MDRfMzAxNyI+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./src/icons/go.svg":
/*!**************************!*\
  !*** ./src/icons/go.svg ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactComponent": () => (/* binding */ SvgGo),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgGo = function SvgGo(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    height: 12,
    width: 12,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "-13.63 -13.63 254.36 254.36",
    xmlSpace: "preserve",
    fill: "#1D1D1F",
    stroke: "#394150"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    style: {
      fill: "#010002"
    },
    d: "m152.835 39.285-5.902 5.898 64.18 64.19H0v8.35h211.124l-64.191 64.179 5.902 5.909 74.261-74.261z"
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEycHgiIHdpZHRoPSIxMnB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iLTEzLjYzIC0xMy42MyAyNTQuMzYgMjU0LjM2IgogICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgZmlsbD0iIzFEMUQxRiIgc3Ryb2tlPSIjMzk0MTUwIj48ZyBpZD0iU1ZHUmVwb19iZ0NhcnJpZXIiIHN0cm9rZS13aWR0aD0iMCI+PC9nPjxnIGlkPSJTVkdSZXBvX3RyYWNlckNhcnJpZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9nPjxnIGlkPSJTVkdSZXBvX2ljb25DYXJyaWVyIj4gPGc+IDxnPiA8cG9seWdvbiBzdHlsZT0iZmlsbDojMDEwMDAyOyIgcG9pbnRzPSIxNTIuODM1LDM5LjI4NSAxNDYuOTMzLDQ1LjE4MyAyMTEuMTEzLDEwOS4zNzMgMCwxMDkuMzczIDAsMTE3LjcyMyAyMTEuMTI0LDExNy43MjMgMTQ2LjkzMywxODEuOTAyIDE1Mi44MzUsMTg3LjgxMSAyMjcuMDk2LDExMy41NSAiPjwvcG9seWdvbj4gPC9nPiA8L2c+IDwvZz48L3N2Zz4=");

/***/ }),

/***/ "./src/icons/help.svg":
/*!****************************!*\
  !*** ./src/icons/help.svg ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactComponent": () => (/* binding */ SvgHelp),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgHelp = function SvgHelp(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 36,
    height: 37,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M18 .902c-9.941 0-18 8.059-18 18s8.059 18 18 18h15.366A2.634 2.634 0 0 0 36 34.268V18.902c0-9.941-8.059-18-18-18Zm-.913 17.877c-.336.588-.504 1.286-.504 2.092v.832h3.326v-.404c0-.587.101-1.075.303-1.461.218-.387.613-.849 1.184-1.386.723-.689 1.269-1.344 1.638-1.966.37-.621.555-1.369.555-2.243 0-.89-.236-1.696-.706-2.419-.454-.739-1.092-1.319-1.915-1.739-.823-.42-1.764-.63-2.823-.63-1.41 0-2.587.395-3.528 1.185-.924.773-1.545 1.697-1.864 2.772l2.898 1.21a3.278 3.278 0 0 1 .907-1.462c.437-.403.991-.605 1.663-.605.638 0 1.15.185 1.537.555.387.352.58.79.58 1.31 0 .437-.118.823-.353 1.16-.218.335-.58.73-1.084 1.184-.856.756-1.461 1.428-1.814 2.015Zm-.428 8.644c.436.42.957.63 1.562.63.605 0 1.117-.21 1.537-.63.42-.437.63-.957.63-1.562 0-.605-.21-1.117-.63-1.538-.42-.42-.932-.63-1.537-.63-.605 0-1.126.21-1.562.63-.42.42-.63.933-.63 1.538 0 .604.21 1.125.63 1.562Z",
    fill: "#196BDE"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzciIHZpZXdCb3g9IjAgMCAzNiAzNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIgogICAgICAgIGQ9Ik0xOCAwLjkwMTg1NUM4LjA1ODg4IDAuOTAxODU1IDAgOC45NjA3MyAwIDE4LjkwMTlDMCAyOC44NDMgOC4wNTg4OCAzNi45MDE5IDE4IDM2LjkwMTlIMzMuMzY1OUMzNC44MjA3IDM2LjkwMTkgMzYgMzUuNzIyNSAzNiAzNC4yNjc3VjE4LjkwMTlDMzYgOC45NjA3MyAyNy45NDExIDAuOTAxODU1IDE4IDAuOTAxODU1Wk0xNy4wODcgMTguNzc5NUMxNi43NTEgMTkuMzY3NSAxNi41ODMgMjAuMDY0NyAxNi41ODMgMjAuODcxMVYyMS43MDI3SDE5LjkwOTRWMjEuMjk5NUMxOS45MDk0IDIwLjcxMTUgMjAuMDEwMiAyMC4yMjQzIDIwLjIxMTggMTkuODM3OUMyMC40MzAyIDE5LjQ1MTUgMjAuODI1IDE4Ljk4OTUgMjEuMzk2MiAxOC40NTE5QzIyLjExODYgMTcuNzYzMSAyMi42NjQ2IDE3LjEwNzkgMjMuMDM0MiAxNi40ODYzQzIzLjQwMzggMTUuODY0NyAyMy41ODg2IDE1LjExNzEgMjMuNTg4NiAxNC4yNDM1QzIzLjU4ODYgMTMuMzUzMSAyMy4zNTM0IDEyLjU0NjcgMjIuODgzIDExLjgyNDNDMjIuNDI5NCAxMS4wODUxIDIxLjc5MSAxMC41MDU1IDIwLjk2NzggMTAuMDg1NUMyMC4xNDQ2IDkuNjY1NDggMTkuMjAzOCA5LjQ1NTQ4IDE4LjE0NTQgOS40NTU0OEMxNi43MzQyIDkuNDU1NDggMTUuNTU4MiA5Ljg1MDI4IDE0LjYxNzQgMTAuNjM5OUMxMy42OTM0IDExLjQxMjcgMTMuMDcxOCAxMi4zMzY3IDEyLjc1MjYgMTMuNDExOUwxNS42NTA2IDE0LjYyMTVDMTUuODM1NCAxNC4wMzM1IDE2LjEzNzggMTMuNTQ2MyAxNi41NTc4IDEzLjE1OTlDMTYuOTk0NiAxMi43NTY3IDE3LjU0OSAxMi41NTUxIDE4LjIyMSAxMi41NTUxQzE4Ljg1OTQgMTIuNTU1MSAxOS4zNzE4IDEyLjczOTkgMTkuNzU4MiAxMy4xMDk1QzIwLjE0NDYgMTMuNDYyMyAyMC4zMzc4IDEzLjg5OTEgMjAuMzM3OCAxNC40MTk5QzIwLjMzNzggMTQuODU2NyAyMC4yMjAyIDE1LjI0MzEgMTkuOTg1IDE1LjU3OTFDMTkuNzY2NiAxNS45MTUxIDE5LjQwNTQgMTYuMzA5OSAxOC45MDE0IDE2Ljc2MzVDMTguMDQ0NiAxNy41MTk1IDE3LjQzOTggMTguMTkxNSAxNy4wODcgMTguNzc5NVpNMTYuNjU4NiAyNy40MjMxQzE3LjA5NTQgMjcuODQzMSAxNy42MTYyIDI4LjA1MzEgMTguMjIxIDI4LjA1MzFDMTguODI1OCAyOC4wNTMxIDE5LjMzODIgMjcuODQzMSAxOS43NTgyIDI3LjQyMzFDMjAuMTc4MiAyNi45ODYzIDIwLjM4ODIgMjYuNDY1NSAyMC4zODgyIDI1Ljg2MDdDMjAuMzg4MiAyNS4yNTU5IDIwLjE3ODIgMjQuNzQzNSAxOS43NTgyIDI0LjMyMzVDMTkuMzM4MiAyMy45MDM1IDE4LjgyNTggMjMuNjkzNSAxOC4yMjEgMjMuNjkzNUMxNy42MTYyIDIzLjY5MzUgMTcuMDk1NCAyMy45MDM1IDE2LjY1ODYgMjQuMzIzNUMxNi4yMzg2IDI0Ljc0MzUgMTYuMDI4NiAyNS4yNTU5IDE2LjAyODYgMjUuODYwN0MxNi4wMjg2IDI2LjQ2NTUgMTYuMjM4NiAyNi45ODYzIDE2LjY1ODYgMjcuNDIzMVoiCiAgICAgICAgZmlsbD0iIzE5NkJERSIgLz4KPC9zdmc+");

/***/ }),

/***/ "./src/icons/loader.svg":
/*!******************************!*\
  !*** ./src/icons/loader.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactComponent": () => (/* binding */ SvgLoader),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _rect, _rect2, _rect3, _rect4, _path, _defs;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgLoader = function SvgLoader(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 248,
    height: 72,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _rect || (_rect = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    width: 89,
    height: 14,
    rx: 7,
    fill: "url(#loader_svg__a)"
  })), _rect2 || (_rect2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    y: 22,
    width: 233,
    height: 10,
    rx: 5,
    fill: "url(#loader_svg__b)"
  })), _rect3 || (_rect3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    y: 38,
    width: 248,
    height: 10,
    rx: 5,
    fill: "url(#loader_svg__c)"
  })), _rect4 || (_rect4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    y: 54,
    width: 140,
    height: 10,
    rx: 5,
    fill: "url(#loader_svg__d)"
  })), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#EEE",
    d: "M0 71.5h248"
  })), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "loader_svg__a",
    x1: 89,
    y1: 7,
    x2: 0,
    y2: 7,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#D9D9D9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#D9D9D9",
    stopOpacity: 0.3
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "loader_svg__b",
    x1: 0,
    y1: 27,
    x2: 233,
    y2: 27,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#D9D9D9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#D9D9D9",
    stopOpacity: 0.3
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "loader_svg__c",
    x1: 0,
    y1: 43,
    x2: 266.243,
    y2: 43,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#D9D9D9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 0.516,
    stopColor: "#D9D9D9",
    stopOpacity: 0.2
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#D9D9D9",
    stopOpacity: 0.8
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "loader_svg__d",
    x1: 138.754,
    y1: 59,
    x2: 1.495,
    y2: 59,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#D9D9D9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#D9D9D9",
    stopOpacity: 0.3
  })))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQ4IiBoZWlnaHQ9IjcyIiB2aWV3Qm94PSIwIDAgMjQ4IDcyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iODkiIGhlaWdodD0iMTQiIHJ4PSI3IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfNjA0XzMwNDMpIi8+CjxyZWN0IHk9IjIyIiB3aWR0aD0iMjMzIiBoZWlnaHQ9IjEwIiByeD0iNSIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzYwNF8zMDQzKSIvPgo8cmVjdCB5PSIzOCIgd2lkdGg9IjI0OCIgaGVpZ2h0PSIxMCIgcng9IjUiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl82MDRfMzA0MykiLz4KPHJlY3QgeT0iNTQiIHdpZHRoPSIxNDAiIGhlaWdodD0iMTAiIHJ4PSI1IiBmaWxsPSJ1cmwoI3BhaW50M19saW5lYXJfNjA0XzMwNDMpIi8+CjxsaW5lIHkxPSI3MS41IiB4Mj0iMjQ4IiB5Mj0iNzEuNSIgc3Ryb2tlPSIjRUVFRUVFIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNjA0XzMwNDMiIHgxPSI4OSIgeTE9IjcuMDAwMDEiIHgyPSIyLjQ2OTQ5ZS0wNyIgeTI9IjcuMDAwMDEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0Q5RDlEOSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNEOUQ5RDkiIHN0b3Atb3BhY2l0eT0iMC4zIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl82MDRfMzA0MyIgeDE9IjEuNDM3NjJlLTA2IiB5MT0iMjYuOTk5OSIgeDI9IjIzMyIgeTI9IjI2Ljk5OTkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0Q5RDlEOSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNEOUQ5RDkiIHN0b3Atb3BhY2l0eT0iMC4zIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhcl82MDRfMzA0MyIgeDE9Ii0xLjU3NTU4ZS0wNiIgeTE9IjQyLjk5OTkiIHgyPSIyNjYuMjQzIiB5Mj0iNDIuOTk5OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRDlEOUQ5Ii8+CjxzdG9wIG9mZnNldD0iMC41MTU2MjUiIHN0b3AtY29sb3I9IiNEOUQ5RDkiIHN0b3Atb3BhY2l0eT0iMC4yIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0Q5RDlEOSIgc3RvcC1vcGFjaXR5PSIwLjgiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDNfbGluZWFyXzYwNF8zMDQzIiB4MT0iMTM4Ljc1NCIgeTE9IjU5IiB4Mj0iMS40OTQ2NiIgeTI9IjU5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNEOUQ5RDkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRDlEOUQ5IiBzdG9wLW9wYWNpdHk9IjAuMyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==");

/***/ }),

/***/ "./src/icons/no-result.svg":
/*!*********************************!*\
  !*** ./src/icons/no-result.svg ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactComponent": () => (/* binding */ SvgNoResult),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _defs;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgNoResult = function SvgNoResult(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 302,
    height: 186,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#no-result_svg__a)",
    d: "M0 0h302v186H0z"
  })), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pattern", {
    id: "no-result_svg__a",
    patternContentUnits: "objectBoundingBox",
    width: 1,
    height: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", {
    xlinkHref: "#no-result_svg__b",
    transform: "matrix(.0009 0 0 .00145 0 0)"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("image", {
    id: "no-result_svg__b",
    width: 1121,
    height: 690,
    xlinkHref: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABGEAAAKyCAYAAAB16sOJAAAACXBIWXMAAAsTAAALEwEAmpwYAABFUGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczppbGx1c3RyYXRvcj0iaHR0cDovL25zLmFkb2JlLmNvbS9pbGx1c3RyYXRvci8xLjAvIiB4bWxuczp4bXBUUGc9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC90L3BnLyIgeG1sbnM6c3REaW09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9EaW1lbnNpb25zIyIgeG1sbnM6c3RGbnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9Gb250IyIgeG1sbnM6eG1wRz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL2cvIiB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMTEtMTRUMTY6MTY6MTItMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTExLTE0VDE2OjE2OjEyLTA3OjAwIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wMi0yMlQxMzoxMDowMi0wNzowMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBJbGx1c3RyYXRvciAyNS4yIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmNiMDdhMjNiLWJhNjgtNGQzMi1hN2RmLTMwYjRkYTk3YTE2MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NjViZDYxOC1kMzU3LTRjMDMtODI0MS1jMDA2YjI0OWM1YzciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0idXVpZDo1RDIwODkyNDkzQkZEQjExOTE0QTg1OTBEMzE1MDhDOCIgeG1wTU06UmVuZGl0aW9uQ2xhc3M9InByb29mOnBkZiIgaWxsdXN0cmF0b3I6U3RhcnR1cFByb2ZpbGU9IlByaW50IiBpbGx1c3RyYXRvcjpDcmVhdG9yU3ViVG9vbD0iQUlSb2JpbiIgaWxsdXN0cmF0b3I6VHlwZT0iRG9jdW1lbnQiIHhtcFRQZzpIYXNWaXNpYmxlT3ZlcnByaW50PSJGYWxzZSIgeG1wVFBnOkhhc1Zpc2libGVUcmFuc3BhcmVuY3k9IlRydWUiIHhtcFRQZzpOUGFnZXM9IjEiIHBkZjpQcm9kdWNlcj0iQWRvYmUgUERGIGxpYnJhcnkgMTUuMDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8ZGM6dGl0bGU+IDxyZGY6QWx0PiA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPn5haS1hMzliYTc1MC04NzBjLTQ3NTgtYWZjNC02NzM5ZmJlNWNjMjJfPC9yZGY6bGk+IDwvcmRmOkFsdD4gPC9kYzp0aXRsZT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InV1aWQ6NWVmYTMxODktY2NmNS1mMzRhLWI5ZGUtMjU5YmY4ODYxNDUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU2NWJkNjE4LWQzNTctNGMwMy04MjQxLWMwMDZiMjQ5YzVjNyIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjVEMjA4OTI0OTNCRkRCMTE5MTRBODU5MEQzMTUwOEM4IiBzdFJlZjpyZW5kaXRpb25DbGFzcz0icHJvb2Y6cGRmIi8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA1YjRlZDM3LThkMzItNGM0Ni05N2YwLTdiNjFlMzZhZmQ1MyIgc3RFdnQ6d2hlbj0iMjAxOC0xMC0zMFQxNjoyMzoyMi0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgSWxsdXN0cmF0b3IgQ0MgMjIuMSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTY1YmQ2MTgtZDM1Ny00YzAzLTgyNDEtYzAwNmIyNDljNWM3IiBzdEV2dDp3aGVuPSIyMDIwLTA5LTE0VDE2OjIxOjQyLTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBJbGx1c3RyYXRvciAyNC4zIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vcGRmIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjNzg0MDY0NC1iZTAwLTQ0NGItYTdmZC1iYjUxMmQ4NTBlMTAiIHN0RXZ0OndoZW49IjIwMjItMTEtMTRUMTY6MTI6MjEtMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYjA3YTIzYi1iYTY4LTRkMzItYTdkZi0zMGI0ZGE5N2ExNjMiIHN0RXZ0OndoZW49IjIwMjItMTEtMTRUMTY6MTY6MTItMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wVFBnOk1heFBhZ2VTaXplIHN0RGltOnc9IjEyMjQuMDAwMDAwIiBzdERpbTpoPSI4OTcuNDg2NTY0IiBzdERpbTp1bml0PSJQb2ludHMiLz4gPHhtcFRQZzpGb250cz4gPHJkZjpCYWc+IDxyZGY6bGkgc3RGbnQ6Zm9udE5hbWU9Ik15cmlhZFByby1SZWd1bGFyIiBzdEZudDpmb250RmFtaWx5PSJNeXJpYWQgUHJvIiBzdEZudDpmb250RmFjZT0iUmVndWxhciIgc3RGbnQ6Zm9udFR5cGU9Ik9wZW4gVHlwZSIgc3RGbnQ6dmVyc2lvblN0cmluZz0iVmVyc2lvbiAyLjExNTtQUyAyLjAwMDtob3Rjb252IDEuMC44MTttYWtlb3RmLmxpYjIuNS42MzQwNiIgc3RGbnQ6Y29tcG9zaXRlPSJGYWxzZSIgc3RGbnQ6Zm9udEZpbGVOYW1lPSIuNjg1MS5vdGYiLz4gPHJkZjpsaSBzdEZudDpmb250TmFtZT0iT3BlblNhbnMtQm9sZCIgc3RGbnQ6Zm9udEZhbWlseT0iT3BlbiBTYW5zIiBzdEZudDpmb250RmFjZT0iQm9sZCIgc3RGbnQ6Zm9udFR5cGU9Ik9wZW4gVHlwZSIgc3RGbnQ6dmVyc2lvblN0cmluZz0iVmVyc2lvbiAxLjEwIiBzdEZudDpjb21wb3NpdGU9IkZhbHNlIiBzdEZudDpmb250RmlsZU5hbWU9Ik9wZW5TYW5zLUJvbGQudHRmIi8+IDwvcmRmOkJhZz4gPC94bXBUUGc6Rm9udHM+IDx4bXBUUGc6UGxhdGVOYW1lcz4gPHJkZjpTZXE+IDxyZGY6bGk+Q3lhbjwvcmRmOmxpPiA8cmRmOmxpPk1hZ2VudGE8L3JkZjpsaT4gPHJkZjpsaT5ZZWxsb3c8L3JkZjpsaT4gPHJkZjpsaT5CbGFjazwvcmRmOmxpPiA8L3JkZjpTZXE+IDwveG1wVFBnOlBsYXRlTmFtZXM+IDx4bXBUUGc6U3dhdGNoR3JvdXBzPiA8cmRmOlNlcT4gPHJkZjpsaT4gPHJkZjpEZXNjcmlwdGlvbiB4bXBHOmdyb3VwTmFtZT0iRGVmYXVsdCBTd2F0Y2ggR3JvdXAiIHhtcEc6Z3JvdXBUeXBlPSIwIj4gPHhtcEc6Q29sb3JhbnRzPiA8cmRmOlNlcT4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IldoaXRlIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyNTUiIHhtcEc6Ymx1ZT0iMjU1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJCbGFjayIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM1IiB4bXBHOmdyZWVuPSIzMSIgeG1wRzpibHVlPSIzMiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQ01ZSyBSZWQiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMzYiIHhtcEc6Z3JlZW49IjI4IiB4bXBHOmJsdWU9IjM2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDTVlLIFllbGxvdyIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI1NSIgeG1wRzpncmVlbj0iMjQxIiB4bXBHOmJsdWU9IjAiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsgR3JlZW4iIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNjUiIHhtcEc6Ymx1ZT0iODEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsgQ3lhbiIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjAiIHhtcEc6Z3JlZW49IjE3MyIgeG1wRzpibHVlPSIyMzgiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsgQmx1ZSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjQ2IiB4bXBHOmdyZWVuPSI0OSIgeG1wRzpibHVlPSIxNDUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsgTWFnZW50YSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzNSIgeG1wRzpncmVlbj0iMCIgeG1wRzpibHVlPSIxMzkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTUgTT0xMDAgWT05MCBLPTEwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTkwIiB4bXBHOmdyZWVuPSIzMCIgeG1wRzpibHVlPSI0NSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09OTAgWT04NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMzgiIHhtcEc6Z3JlZW49IjY0IiB4bXBHOmJsdWU9IjU0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT04MCBZPTk1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI0MCIgeG1wRzpncmVlbj0iOTAiIHhtcEc6Ymx1ZT0iNDAiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MCBNPTUwIFk9MTAwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI0NiIgeG1wRzpncmVlbj0iMTQ2IiB4bXBHOmJsdWU9IjMwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0zNSBZPTg1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI1MCIgeG1wRzpncmVlbj0iMTc1IiB4bXBHOmJsdWU9IjY0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTUgTT0wIFk9OTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjQ5IiB4bXBHOmdyZWVuPSIyMzYiIHhtcEc6Ymx1ZT0iNDkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MjAgTT0wIFk9MTAwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIxNCIgeG1wRzpncmVlbj0iMjIyIiB4bXBHOmJsdWU9IjM1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTUwIE09MCBZPTEwMCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxMzkiIHhtcEc6Z3JlZW49IjE5NyIgeG1wRzpibHVlPSI2MyIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz03NSBNPTAgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iNTUiIHhtcEc6Z3JlZW49IjE3OSIgeG1wRzpibHVlPSI3NCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz04NSBNPTEwIFk9MTAwIEs9MTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNDciIHhtcEc6Ymx1ZT0iNjkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9OTAgTT0zMCBZPTk1IEs9MzAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxMDQiIHhtcEc6Ymx1ZT0iNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NzUgTT0wIFk9NzUgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iNDEiIHhtcEc6Z3JlZW49IjE4MCIgeG1wRzpibHVlPSIxMTUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODAgTT0xMCBZPTQ1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjAiIHhtcEc6Z3JlZW49IjE2NiIgeG1wRzpibHVlPSIxNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NzAgTT0xNSBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMzgiIHhtcEc6Z3JlZW49IjE2OSIgeG1wRzpibHVlPSIyMjQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODUgTT01MCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjciIHhtcEc6Z3JlZW49IjExNyIgeG1wRzpibHVlPSIxODciLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09OTUgWT01IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjQzIiB4bXBHOmdyZWVuPSI1NiIgeG1wRzpibHVlPSIxNDMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09MTAwIFk9MjUgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM4IiB4bXBHOmdyZWVuPSIzNCIgeG1wRzpibHVlPSI5NyIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz03NSBNPTEwMCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTAxIiB4bXBHOmdyZWVuPSI0NSIgeG1wRzpibHVlPSIxNDQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NTAgTT0xMDAgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE0NCIgeG1wRzpncmVlbj0iMzkiIHhtcEc6Ymx1ZT0iMTQyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTM1IE09MTAwIFk9MzUgSz0xMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE1OCIgeG1wRzpncmVlbj0iMzEiIHhtcEc6Ymx1ZT0iOTkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAgTT0xMDAgWT01MCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMTciIHhtcEc6Z3JlZW49IjI4IiB4bXBHOmJsdWU9IjkyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT05NSBZPTIwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzNiIgeG1wRzpncmVlbj0iNDEiIHhtcEc6Ymx1ZT0iMTIzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTI1IE09MjUgWT00MCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxOTMiIHhtcEc6Z3JlZW49IjE4MCIgeG1wRzpibHVlPSIxNTQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NDAgTT00NSBZPTUwIEs9NSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE1NCIgeG1wRzpncmVlbj0iMTMyIiB4bXBHOmJsdWU9IjEyMSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTUwIFk9NjAgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjExMyIgeG1wRzpncmVlbj0iMTAxIiB4bXBHOmJsdWU9Ijg4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTU1IE09NjAgWT02NSBLPTQwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iOTAiIHhtcEc6Z3JlZW49Ijc0IiB4bXBHOmJsdWU9IjY2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTI1IE09NDAgWT02NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxOTUiIHhtcEc6Z3JlZW49IjE1MyIgeG1wRzpibHVlPSIxMDciLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MzAgTT01MCBZPTc1IEs9MTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxNjgiIHhtcEc6Z3JlZW49IjEyNCIgeG1wRzpibHVlPSI3OSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0zNSBNPTYwIFk9ODAgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEzOCIgeG1wRzpncmVlbj0iOTMiIHhtcEc6Ymx1ZT0iNTkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NDAgTT02NSBZPTkwIEs9MzUiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxMTciIHhtcEc6Z3JlZW49Ijc2IiB4bXBHOmJsdWU9IjQwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTQwIE09NzAgWT0xMDAgSz01MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9Ijk2IiB4bXBHOmdyZWVuPSI1NiIgeG1wRzpibHVlPSIxOSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTcwIFk9ODAgSz03MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjU5IiB4bXBHOmdyZWVuPSIzNSIgeG1wRzpibHVlPSIyMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz03MyBNPTQwIFk9MCBLPTAiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjcwIiB4bXBHOmdyZWVuPSIxMzQiIHhtcEc6Ymx1ZT0iMTk4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTYwIEc9ODEgQj0xMzMiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjYwIiB4bXBHOmdyZWVuPSI4MSIgeG1wRzpibHVlPSIxMzMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MTI2IEc9MTY3IEI9MjIzIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIxMjYiIHhtcEc6Z3JlZW49IjE2NSIgeG1wRzpibHVlPSIyMTUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MTY1IEc9MjAzIEI9MjM5IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIxNjYiIHhtcEc6Z3JlZW49IjIwMiIgeG1wRzpibHVlPSIyMzUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjA5IEc9MjI1IEI9MjQyIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyMDgiIHhtcEc6Z3JlZW49IjIyNSIgeG1wRzpibHVlPSIyNDEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjQ1IEc9MjQ3IEI9MjQ5IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNDQiIHhtcEc6Z3JlZW49IjI0NiIgeG1wRzpibHVlPSIyNDgiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjQ3IEc9MTY2IEI9MTA2IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNDciIHhtcEc6Z3JlZW49IjE2NiIgeG1wRzpibHVlPSIxMDYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjUgRz0yOCBCPTYwIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNCIgeG1wRzpncmVlbj0iMjciIHhtcEc6Ymx1ZT0iNTkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9NzQgRz0xMDEgQj0xNjMiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9Ijc0IiB4bXBHOmdyZWVuPSIxMDEiIHhtcEc6Ymx1ZT0iMTYzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTkzIEc9MTI1IEI9MTkwIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI5MyIgeG1wRzpncmVlbj0iMTI1IiB4bXBHOmJsdWU9IjE5MCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yNTUgRz0yMDUgQj0zMyIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyMDUiIHhtcEc6Ymx1ZT0iMzIiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjA5IEc9MjExIEI9MjEyIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyMDkiIHhtcEc6Z3JlZW49IjIxMSIgeG1wRzpibHVlPSIyMTEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9Ikdsb2JhbCBDb2xvciIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iMjUxIiB4bXBHOmdyZWVuPSIyMDgiIHhtcEc6Ymx1ZT0iMjQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MCBHPTc2IEI9MTE3IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSI3NiIgeG1wRzpibHVlPSIxMTciLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MTA0IEc9MjA0IEI9MjI5IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIxMDUiIHhtcEc6Z3JlZW49IjIwMyIgeG1wRzpibHVlPSIyMjgiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjUyIEc9MTc4IEI9MzEiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjI1MSIgeG1wRzpncmVlbj0iMTc4IiB4bXBHOmJsdWU9IjI4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJQQU5UT05FIDI4MiBDIiB4bXBHOnR5cGU9IlNQT1QiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJMQUIiIHhtcEc6TD0iMTAuOTgwMzkyIiB4bXBHOkE9IjIiIHhtcEc6Qj0iLTI2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJibHVzaCBjb3B5IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNDIiIHhtcEc6Z3JlZW49IjE1NiIgeG1wRzpibHVlPSIxNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MTA1IEc9MjA5IEI9NTIiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjEwNSIgeG1wRzpncmVlbj0iMjA5IiB4bXBHOmJsdWU9IjUyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTUgRz0xNjAgQj02OSIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iNSIgeG1wRzpncmVlbj0iMTYwIiB4bXBHOmJsdWU9IjY4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTU1IEc9MTg4IEI9MTU1IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI1NCIgeG1wRzpncmVlbj0iMTg4IiB4bXBHOmJsdWU9IjE1NCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj00MSBHPTQxIEI9MTA1IGNvcHkiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjQwIiB4bXBHOmdyZWVuPSI0MCIgeG1wRzpibHVlPSIxMDUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9NSBHPTE5NyBCPTIxOSIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iNSIgeG1wRzpncmVlbj0iMTk2IiB4bXBHOmJsdWU9IjIxOSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yNTUgRz03MyBCPTk5IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNTUiIHhtcEc6Z3JlZW49IjczIiB4bXBHOmJsdWU9Ijk4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTI1NSBHPTIwMyBCPTEzOCIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyMDIiIHhtcEc6Ymx1ZT0iMTM3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTYxIEc9MTA2IEI9MjA0IDQiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjYxIiB4bXBHOmdyZWVuPSIxMDUiIHhtcEc6Ymx1ZT0iMjA0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJza2luIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNDQiIHhtcEc6Z3JlZW49IjIwNyIgeG1wRzpibHVlPSIxOTEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9NDEgRz00MSBCPTEwNSIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iNDAiIHhtcEc6Z3JlZW49IjQwIiB4bXBHOmJsdWU9IjEwNSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yMTQgRz0xODQgQj0xNDEiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjIxNCIgeG1wRzpncmVlbj0iMTg0IiB4bXBHOmJsdWU9IjE0MCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yNDAgRz0xOTUgQj0xNjgiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjIzOSIgeG1wRzpncmVlbj0iMTk0IiB4bXBHOmJsdWU9IjE2NyIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj02MSBHPTEwNiBCPTIwNCIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iNjEiIHhtcEc6Z3JlZW49IjEwNSIgeG1wRzpibHVlPSIyMDQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9ImJsdXNoIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNDIiIHhtcEc6Z3JlZW49IjE1NiIgeG1wRzpibHVlPSIxNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MyBHPTIyNCBCPTE5NyIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iMyIgeG1wRzpncmVlbj0iMjIzIiB4bXBHOmJsdWU9IjE5NiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj01IEc9MTkzIEI9MjE0IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI0IiB4bXBHOmdyZWVuPSIxOTIiIHhtcEc6Ymx1ZT0iMjE0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTcwIEc9MTcyIEI9MTk1IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI3MCIgeG1wRzpncmVlbj0iMTcyIiB4bXBHOmJsdWU9IjE5NSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yMyBHPTIzIEI9NTEiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjIyIiB4bXBHOmdyZWVuPSIyMiIgeG1wRzpibHVlPSI1MSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj02MSBHPTEwNiBCPTIwNCAyIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI3MSIgeG1wRzpncmVlbj0iMTA1IiB4bXBHOmJsdWU9IjE3OCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj02MSBHPTEwNiBCPTIwNCAzIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI3MSIgeG1wRzpncmVlbj0iMTA1IiB4bXBHOmJsdWU9IjE3OCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj00MSBHPTQxIEI9MTA1IGNvcHkgMiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iNDEiIHhtcEc6Z3JlZW49IjQyIiB4bXBHOmJsdWU9IjEwNCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yNTAgRz0xNzYgQj0yOSIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iMjUwIiB4bXBHOmdyZWVuPSIxNzYiIHhtcEc6Ymx1ZT0iMjkiLz4gPC9yZGY6U2VxPiA8L3htcEc6Q29sb3JhbnRzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6bGk+IDxyZGY6bGk+IDxyZGY6RGVzY3JpcHRpb24geG1wRzpncm91cE5hbWU9IkdyYXlzIiB4bXBHOmdyb3VwVHlwZT0iMSI+IDx4bXBHOkNvbG9yYW50cz4gPHJkZjpTZXE+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTEwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM1IiB4bXBHOmdyZWVuPSIzMSIgeG1wRzpibHVlPSIzMiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz05MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjY0IiB4bXBHOmdyZWVuPSI2NCIgeG1wRzpibHVlPSI2NSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz04MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9Ijg4IiB4bXBHOmdyZWVuPSI4OSIgeG1wRzpibHVlPSI5MSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz03MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEwOSIgeG1wRzpncmVlbj0iMTEwIiB4bXBHOmJsdWU9IjExMiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz02MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEyOCIgeG1wRzpncmVlbj0iMTI5IiB4bXBHOmJsdWU9IjEzMiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz01MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE0NiIgeG1wRzpncmVlbj0iMTQ4IiB4bXBHOmJsdWU9IjE1MSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz00MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE2NiIgeG1wRzpncmVlbj0iMTY4IiB4bXBHOmJsdWU9IjE3MSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz0zMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE4NyIgeG1wRzpncmVlbj0iMTg5IiB4bXBHOmJsdWU9IjE5MSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz0yMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIwOCIgeG1wRzpncmVlbj0iMjEwIiB4bXBHOmJsdWU9IjIxMSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz0xMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzMCIgeG1wRzpncmVlbj0iMjMxIiB4bXBHOmJsdWU9IjIzMiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz01IiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjQxIiB4bXBHOmdyZWVuPSIyNDEiIHhtcEc6Ymx1ZT0iMjQyIi8+IDwvcmRmOlNlcT4gPC94bXBHOkNvbG9yYW50cz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOmxpPiA8cmRmOmxpPiA8cmRmOkRlc2NyaXB0aW9uIHhtcEc6Z3JvdXBOYW1lPSJCcmlnaHRzIiB4bXBHOmdyb3VwVHlwZT0iMSI+IDx4bXBHOkNvbG9yYW50cz4gPHJkZjpTZXE+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0xMDAgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjM2IiB4bXBHOmdyZWVuPSIyOCIgeG1wRzpibHVlPSIzNiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09NzUgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjQxIiB4bXBHOmdyZWVuPSIxMDEiIHhtcEc6Ymx1ZT0iMzQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MCBNPTEwIFk9OTUgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyMjEiIHhtcEc6Ymx1ZT0iMjEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODUgTT0xMCBZPTEwMCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNjEiIHhtcEc6Ymx1ZT0iNzUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09OTAgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM0IiB4bXBHOmdyZWVuPSI2MyIgeG1wRzpibHVlPSIxNTMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NjAgTT05MCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTI3IiB4bXBHOmdyZWVuPSI2MyIgeG1wRzpibHVlPSIxNTEiLz4gPC9yZGY6U2VxPiA8L3htcEc6Q29sb3JhbnRzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6bGk+IDwvcmRmOlNlcT4gPC94bXBUUGc6U3dhdGNoR3JvdXBzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PreSaiQAAOf3SURBVHja7N15fBt5Yffx72gk2ZLvK3Yc584m2fvCC3jZZYFtuMJVeDi6fTjbR5RCoS0FalooFLKwQEtLaTEtBQotx5ajkHKYLLvL7mYPsffmvh3Zjo848W3LOp4/Rt44iQ9JHkkj6fPelzaJLY1mfvMbzcxXv8OIx+MCAAAAAABAZrkoAgAAAAAAgMwjhAEAAAAAAMgCQhgAAAAAAIAsIIQBAAAAAADIAkIYAAAAAACALCCEAQAAAAAAyAJCGAAAAAAAgCwghAEAAAAAAMgCQhgAAAAAAIAsIIQBAAAAAADIAkIYAAAAAACALCCEAQAAAAAAyAJCGAAAAAAAgCwghAEAAAAAAMgCQhgAAAAAAIAsIIQBAAAAAADIAkIYAAAAAACALDAoAgAAAKDwBIKhayX9jqQrJdVLikgakrRX0qOS7utobZmmpAAgewhhAAAAgAISCIZeJekTkq5d4qljkn4h6RuSft7R2hKj9AAgswhhAAAAgAIQCIYqJf2bpP+TxssPS/qCpH/vaG0JU5oAkBmEMAAAAIADBYKhGyVNdLS2PJ7Ec1sk7ZK0ZZlve0TSn3W0tvyEPQAA9iOEAQAAABwkEAx5JX1H0u/O/qijteWrizy/RdJ9ktbZuBr/I+kPO1pbBtgjAGAfZkcCAAAAnOVbOhfASNIXAsFQ3XxPDARDtbLGdVln8zq8RtLTgWDoFnYHANiHEAYAAABwiEAw9E5Jb7zgx+WSfn+e55ZK+qmkyzO0Oo2SdgWCoXezZwDAHoQwAAAAgAMEgqEGSZ9f4NfbL3iuIWtWo7YMr5Yp6V8CwdDH2UMAsHyEMAAAAIAz/LWkmgV+d3MgGPLN+ffnJb0pi+v2N4Fg6BPsIgBYHkIYAAAAIMcCwdAaSYt1+/FKujLx3E9I+rMcrObHAsHQe9lbAJA+QhgAAAAg9z4iybPEc14aCIbulPSxHK7nPwSCoZewuwAgPUxRDQAAAORQIBhqknRMUmmerHK/pGs7Wlt62HsAkBpawgAAAAC59UfKnwBGklZI+s/E4MAAgBQQwgAAAAA5EgiGrlFuxndZrlskvYs9CACpIb0GAAAAsigQDG2U9E5Jb5G0Po835YykrR2tLf3sVQBIjpsiAAAAADIvEAy1SPqcrKmlC+HL0BpJ7ZI+wN4FgOTQEgYAAADIsEAw9FJJd0qqKLBNC0u6pKO1pYu9DABLY0wYAAAAIIMCwdAGST9U4QUwkuSV9EH2MgAkhxAGAAAAyKw/kOQv4O17eyAYKmc3A8DSCGEAAACAzGou8O2rkDXIMABgCYQwAAAAQGYdKYJtfDO7GQCWRggDAAAAZNZ/SooX+DbeHAiGatnVALA4QhgAAAAggzpaW45K+laBb6Zb0i3sbQBYHCEMAAAAkHl/Jqm3wLexjd0MAIsjhAEAAAAyrKO15bSk7ZImCngzr2FPA8DiCGEAAACALOhobXlM0kcKeBPXsZcBYHGEMAAAAED2rCngbatn9wLA4ghhAAAAgOx5NUUAAMWLEAYAAADIgkAwtFHS5gLexGn2MgAszk0RAAAAAFnxogLfvkOZfoPWW7ebktZLukzSVknrXC5Xo9s0KyUZsXh8MBKJ9Ei6V9L/BnftjFDtADgJIQwAAACQHbcU+Pb9zO4Ftt66vVHSjZKe7/V4XhSJRK6MxeNeSaqprpppaV7pWlFfb5aWligej2t0dEy9/f2RI8dOfMDjdne33rr9LcFdO++n6gFwCkIYIEcCwZAhySPJTByLpqwugrN/znJJis35d0xSdM6fkcSfMx2tLXFKFgAAx7qpgLdtSNLXlruQ1lu3lyTK6aVer/dV4XB4iyStXtUcvfaqy80rtm7RpvXrtH7tapX5/Z6F7nF6+/p1x5e+surBR357T+ut218e3LXzV1Q/AE5gUARA5iUCF5+kUkkliT89GXirGVn9sadmHx2tLTH2AAAAOb8WWCfpWDqv9ZmGJqOO/p6lX9LLE1Nwp6z11u3lkl7qcbvfGIvHt0ejUX/TiobIjc9tdT/3+mt03VVXqLKiIuXlxuJxtf/tZ+K/efCRsUgkcklw186+VJcR/vHq+mGz/sY7q/684UnfLdWJa62HOlpbHqZWA0gHIQxyeTFy4cDQ8UJqyREIhrySyiWVyQpdcnW8TUqakDTe0doyRc0DACAn1wX/V9J/pPo6lyF99uomHRgJa/fghPaOOO5U/oCk2zpaW06k8qJE8PIar8dzWyQavTUej3su3bwp9uKb2lwvekGbVq9qtmXlxicm9Lq3/mF0ZHTsXx/u/MkfLfbc8I9XG5I2SLpK0rWStp5yr9v01brPbRhwt1Rd8PRHJP1BR2vL09RuAKkghEEmLzZMWa0+SiR5ZbX8cCceC83MFde5LjYzOteyY7qjtSWcB9vslVQpqUKZaemyXBFJo5JGOlpbmMEAAIDsXSP8vaQPpPq6TeVefXBrw7P/PhOO6rdDk3rk9LhOTuZuzNnIxHjc7fO/X4bxzx2tLdFUXvu8l77mU5I+GIvFvNddfWX8JTfd6Hrhjc9TQ11teisTjyg++KBG+x7Rb11X6yFdoYmooYYSU9fX+HTs3l/py//69XAsFlsR3LVzWJLCP15dJStsuVLS1XP+Xpa49uw5XHLt2X+s//K18YVvmcYlvbqjteXX1HAAySKEgZ0XF4Ykf+Lk5ZcVvNgpKqtVx7isVh0RB213haRqWS1e8sW0pGFZgQxdlgAAyOz1wj2SXpjq67Y3V2h7c+W8vzsTjurJs1N68syEDo5OK5qFS3t/NKwjnTvV//BvFJ2e2hzctTOlGZFab93udrvdI9u3vcQXeNttqqutSfHq5bTiI/sVH9mn+PBexUcPSPGYBsxmfa70w5owyi56SZM7qsnvflBvXPf0D69aOe6RFbisXeRd9o67qjztK392SWzB7w2fNSaptaO1ZT+1HEAyGJgXdlxU+GW1/iiXlj5TLYOZeI/yxPtOSRrJVYiQ6E5VIyt8MfNw15VIWiGpPhAMDUs645RgCwCAAnTNfD/0ugy9rqVSN9T65XYZeurslO48eVYjM9alzdbKhb/fqfGaumVFmW5ZUaZIPK7j4zM6NDqto6NTOjo6rfG4PaFMgyumK+vK1FpfrnVlXr31G4fVOz01u02pTku9MRKJ+F77ipcuHsDEIoqPHkwELnutP4f3SdMD5z3NKN+oIc9q/a3vb7RQYHIqYqr6de1aNfDu31V0fKn1e0bSpf9c9/cDseQua8slfTcQDLV2tLbMUM0BLIUQBssJICoTIUSuut2UJh4NgWBoJBEihLO07TWJh6sAduezYVIgGDorwhgAAOy+dlgvqeqiC3HD0Ac212tD+bnGw621Pq0r8+gz+wY0HY1rXVlyl1luw9Cmcq82lXulldYgtuORmHqnIuqbimhoOqIzM1GNzMQ0GY1pMhrXVCSmuOJyu1wqNQ35TJcqPC7VeEzVl7i1yudWi98jn3n+5c6WTRt14PBRyWpRcmeKxVEnSTXV54ojPtUnjexTfHjfudBl9IgUX/xyxKi+UrHxk/r7yn/UUoHJWbNBX627Qx8ceKc88UUvFxtCns1PdnkvvS6Fbbpa0nsk/QO1HcCSn9cUAVK8iDBktfyolXNafxiJC5uqQDA0Kul0JsKYxLZXJS4ezALcvYbOhTFDkoaY8hoAAFtcPt8PX72q8rwA5tkUoMStN62u0r0D43Ib6bdmKXO7zgUzNlrT8uyguRtSfe1rrzhdMRM15Dv6OUUOn1R8ZJ8UPpP6SnhrFR/eqweq36ozhjWWTPPMEUUNUyWxSfV51mra8J/3kh7PRv284l169ci/LLTU/ZK2/rjqfem0aPmLQDD0Zb7IArAUQhikEkJUSGpweL2pkFSRaNFxOtWB4hbZdp+kRtk/zo0TGbKCpqpAMDTQ0doySu0HAGBZLgorarymXtJYtuALbqjzazTizCHbVq1sWnC7FpKYeehv4gq1G5LU/z0t55ueWOlKxWMz+m/fO579WVyG+tzrJEne+JRWzhxVr+f8Vfx1+Vt00/gPVROdd7bqsbhcwwdLrmtJp1gkvUbSD6juABbjogiQRADhCQRDLZJWKn+Cu2pJ6xLB0XK23RUIhholrVZxBDBzuSWtDARDzYFgiMAWAID0rbvwBy9sKJO5RCuXq6udOd7/nBBmUwov+6Skjxk2XEvGJUXOHNARY7OihidxUxPTKc/6Z58TNkrV69mglZFj5702anh0d/lbFlp0S5977dF4GrdI8WhMY6GB91LVASRzkwUsFkJUyhq8NR8DOzMRIpRL6k+1VUxiwOEmjhOVS/IHgqE+WsUAAJCWi1qMXFvjW/JFtV5nXoI0rnh2yuz61lu3e4K7ds5IUutLtpdLqk88ahOPuuetHa2Xjrbb9f79ExVq9I/qybJzk03VRbo14F593vNKY+M641px0esf8b9Mrx3+R7l0XkujGUlNx7xXdKW6PmM9gzr91BHJZdwUCIZczDoJYDGEMFgogDBkdb+pLIDNqZDkCwRDPR2tLVNJbv/sxQMsLlmBVpmsQIuLCwAAkrdu7j9qvKYaS5e+DHcZzlj5YydOau+Bgxo6c1ZnR0Y1PDKqOX2Jnml9yfZKWV2Z5x1F+Jrmsadk4xd6I9MerfAbesT/imd/5o9d/D1RVXRQfZ7zZ6KOx+PqPjqqp3zX6xoF5/5qQFJzn2dt0i2fwyMTGnzqsCb6nx3TxhzrHniOpEeo8gAWQgiD+QIIj6RmWVMYF1JdXx0Ihvo7WluGF9l2U1a3Kz81YV6VkkoTgVaY4gAAICkNc//R4vPkxUofPHJUn/niP+uZfQcWe9rmxX5pSGNvvGbwSjvXy6WoonJryjg3pk7cOD/jmW88mMn+Mxp46rDCIxO678rn6Rr/eSHMsKTmQbOlbKn3j81ENLTvhIaPdCseP39km5nRyTYRwgBY4sYUmBtClMgaWKwQ64YhqTEQDHk6WlsGi2zb7eSVtCYQDPV2tLaMUxwAACypZu4/6kucf6lx+Ohx/eH7P6zJqallLaelevpwiTt2jZ3rVuqOaMZ1/ng500bpnAu+uEZd5xo0z0xM6fRTRzTWc+7y79Doygu/clu6lW9cGjlxSqf3HFV0ev4JlKIzM1dQ3ZEvLgwR8+KGzjDyvtwZmBdzQwi/rAFoCz2EqA0EQ00XbHtZkWy7nZ8dqwLBUDVFAQDAotdXJZLOGwCmzO3sm4hoNKq//NvPLDuAkaTnrB6bsXv9yr1RzVwwX0J0Tk+olplDGjOrFY/GNLTvuLp+FTwvgJGkM1MXjcnjlaTS+Ni8LX2nhkYUuucx9T92YMEAxrqrFddGABbFDSdmLxD8slqBGEWyyZWJcW9OyRozpolakJYVgWDIPV/LIgAAIOmCVjCS5HU5+3vQXfferxMnu21Z1vraKdu7t09HXSpT5LyfRYxzIcywWaux7gENPn1UkYn5g6SJqYv2QakklcfOnpewRKfDOv3MMY2cOJXcyhkG91cAFsWHBIoxgJlVIetbjxJqwbLUBoIhs6O1pY+iAABA897czxWOObsLwK/uuc+2Za2sDJfZvX6xWFxzRwaWJHfcyk78Z09o39NnNTlwdvFlXLwLmiSpZeZQWJLisbiGj3RraP9xxWZSmmBzhioPYDGEMEUu0US2WcUXwMwigLFHVWJKxl6KAgCAxY1HnD3J4IFDR2xb1uSMy/ZQYmwqrvqKyfN+ZoQnNLj3cGKw3KWXEY9e9CSPpImVM0fNib4zGnzqsMKjEymvm8ttnqCGA1j0c4IiKF6BYMgtqwUM9QB2qAgEQ40UAwAAi+ubijh6/QZOD9m2rNFp0/YQZmI6Jnd8RmY8Yg2We7xXj/76lM4eTi6AkSSXOe+PjwwOaWPPA0+lFcBIkrvU+zQ1HMCinz8UQXFKjIfSLFpDwV5VgWConmIAAGBhoUln91hx2ThmzZHB0inb18+wWhI19AV18p7H1P/YQYXDqbUuKiud9/nhS8uOV7tcRlr9xUyvR/7G2p9QwwEs+hlGERStFZqnjzJgg9pAMFRFMQAAIEm6qEnFyExU3Q4OYlbU19m2rH39ftu7vLdUW2O0dD0zoOkzo+ldrJROzvfjTV7XTHxLbX9aTYFKaiqGvvbCjWeo8gAWQwhThALBUIUkbpKR0eu3xIDPAAAUu3lvyh85PenYFb508ybblnVowLfG7vWr9sd1etyl51U9lfYyrqqYd9ybKklPvXPFD73pLLOkuvwXVHcASyGEKTKJcWBWUBLIMENScyAY8lAUAIBi1tHaMiNp/MKf3z84rqmoM2dJetFNbbYtKxIzVjwWKu+2ex27zxh6Zd3utK9SXlJ270K/rbui4ljFmprxkVQW6faVxMuaav+CGg9gKYQwxWeFJJNiQJY+X5oT4w8BAFDMTl/4g/FITD8IDc/75FzPYP2Sm2/UutUtti3vnx5o7rN7Hbc2G6r3Duv6hq6UX9vQ4NY6LTgDVIukx/9m7T+7XWbyY8NUrF6x85svu7yHqg4gmZskFIlAMFQmqZySQBaViJZXAAAcn++H9w2Mq/PU2Hk/m4nF9ZOekZyurGma+tRf/YXK/Pb0LD7Q77t27yl/r53r6HVFZNZcoUDzj5TqOMKvX3nfUk+5cmXJ6YH3rP/pqWSW52uoHqva1PJmqjmAZDAzTpFItEZooCSQA1WBYGiio7VllKIAABSpo5Junu8XPwwN6/Ezk7qyulTT0biCQxMyDUOvXVWZ0xXevHGD/u0f79AXvvxV/fbxRcde2StpQNKgpCFZrX6GEo+B2X973bFLJP3AzvuP+PAeralp0JvXP67/OnJtUq9ZscLUa0r/J5l7pLpX1t1/diRa3vOt4y9qji8w93VJdXm4euOqm75204YJqjmAZNBNoEgkZqtppCSQI1FJJzpaWyJz6qQpq2ucIatVnpF4xBOPqKSYpGhHa0ucIgQA5PF12EclfSrZ55uGoS9d1yyXQ67UzwwPa2DQ6lFVVVmprlC3/vhDfyVJJ4O7diY98G74x6v/r6Svy86u8SV1iken1X7kj/XEqZpFn+ouccf/5orvfe96d3BU0uzgu26d31K8Uud6C7glTT05dsnln+9+R9XgWZdv9kkuj6ny5oY95atXvOJbr7yyi1qOfLRQuOjoAMPI/wiDljDFceI3JNVSEsghU9KqQDAUkeRJPIwU6nBE0oyksKRpSVOSpglnAAB54plUnhyNx9UzOaMWvzPGt6+pqlJN1bmJNZ94es/sX4+nshzva09+K/zj1Qcl/ZWkl0jyLXvlpk/LVdqoT13ydX3K9ft6qGf+XtBmiUcl5ca7n/+GH3411bcI/1irvrWl/QW/Cd+8+b+n3uA+41550tdQ9b/f+J1Le6naAFJFCFMcKhM3vUAulSQe6X5WuS+4WIsHgqEpSROSxjtaW6YoYgCAQz2S6gv2jUxnLYSZisYVjcfPm63JaxryGIZKzYu/M+npe3ac3eOpvpf3tScflvQqSQr/eHWVrC9lTEkVkvTl3Ss3P9JV9Yu3v+X1xu+88AVSLCxFZ0/xccVn5vRujk5IMauRrTc6qU+sPqF79h7R90LX6/hQiWKxuHzlPjXVl2r/L7871fnD//hqOuXjfe3Jbknfk/5T1gMA0kcIU8ACwZBPUr3s+JYBcB4jUbd9kuoCwdCMpFFJIx2tLWGKBwDgFB2tLb2BYCgka+adpDwwOK5bm8rTHjtgJhbX6XBUp6cjGgpHNRSOanQmprMzUY1FYhqZiWoyGtdkNLboclyGVO52qaHErcZSt9aXeXW0/8zsr48sp1y8rz05d3qoxAxSJ48/d9urv3nHN+79v89/8e+bFVVlF538F/OSK6wmNvG4NNtr4TP/8GXtmxp7hpoIwAkIYQpQIBjyyBqEl5mQUEw8srrd1QaCoUlJZxkMGADgIPdLSnoGnVNTEf3y1Khe1lSx4HNical/OqK+qdnHjPqno+qbimhkJmrLSsfi0shMTCMzYR0ZC2v34IR043Ztatig0489OKBdO20vqFgs9pHxiYk3fe3b3/F94N1/kNYy5g4bsffAoWg4HH6QKgjACQhhCkhi7JcaSXVi0GUUN58kXyAYqpf1zdoo48cAAHLs50ohhJGkH4dGdGY6qufX+1XicmkwHFHvZETdkzPqmZxR72REkRwNrFm5+TKVrmjaoi983PZlB3ft7Gu9dfvHvvujn97xule+3Fi7elXay4pEIjp87IRL0hNUQQBOQAhTIALBUImkJqU/5gZQiDyJ46IuEAwNdLS2jFEkAIAc+Zms2f9S+qLs3oFx3Tsw7sgN8lbVnM3g4v/RbZrv/fyXO9Z86TOfTPvLxcPHTigSiRiSfksVBOAELoog/wWCoRpJa0QAAyzEI6k5EAy1JLrrAQCQVR2tLYOSdhfURhlGxrr9BnftDIdnZgIPP/q4cddvHkh7OQcOH5HL5ZqRtJdaCMAJCGHyWCAYcgWCoWZZ47/Q/QjFxkh8hpnzPGZnU7rw5xWSNgSCIaZsBwDkwjcLbHuGM7nw4K6dvzRN84df+PJXoxMTk2ktY9/BQ/J43HuCu3ZGqH4AnIDuSHkq8W3+KkleSgMFxpDVcsWj8wOV2VDFpeWHjmsT01v3SZqWFJnzmEk8wh2tLVywAQDs9D1J/6DCmblyONNvEI1G3zd09uwr/+3b3zH/5P+9M+XXP/bUnsj0dPgeqh4ApyCEyUOBYKhUVgBjUhrIc6asbnQlOhe8ZKu7UKmk1ZIGJE0ucKzFJIUTj6nEY5pBfgEA6ehobRkJBEPflfSOAtmkoSy8R1UsFivZtGF9yi+cng7rxMmQW1KQ2gfAKQhh8kwgGCqT1Cy6HyE/eWWFHyWJP3MdJLokNSYuIkcW+H1p4lGZ+Fk8EAxNywpkJiRNdrS2RNm1AIAkfU7S2wvkWu5EFt7j9xvq6yIve8ktKd+3lJR45fF4ouFwuJxqB8ApGBMmjwSCoXIRwCC/mJLKZY1btCZRf2sllclZLblqZU3tngxDVihTndiejYFgaE0gGGoIBEN+djkAYDEdrS37JP1PAWxKXFJXpt+kpMT75hff1OZ2Geld/jY3NcYkbaTmAXAKWsLkiUQLmJUigEF+fK74ZYUv+TRmUYWsYHowcWGZitnWMjWBYCgqaVzSmKRxui4t+7PPLauL2tyBlmcHZJYu/jIhNufPmKTonMeMpEhHa0uMkgWQYx9TPP5aGXl9WXe0o7VlOpNv0Hrr9obp6fCG5153bdrLWNvS7OkKdW+iygFw0s0SnH8T4hctYOBspqzWLfkWvFyoLHFT36/Ug5i5ZVGZeMQCwdCYpJGO1pYJqsmin3NenRsfaPbvngy9V1TnxvqZTjymCMwAZMtjf/nu4TW/+/uqb31BPm/GU1l4jxsk6fKtm9NeQHNTk7wez1ZqHQCnIITJjxsTAhg4kSFrdofyxJ+FUkd9srpP9duwLJcSgUwgGIrIGndmuKO1ZYbPtlCprBZTPmV/fCAz8b6+C9ZpWtYgzROSJmgxAyCDXt/b+RPVX/0cyVualTdc4/dopc+jvqmIhsJRTUZjmolZ2bPPdKnGa6rZ59bWihJNx+K68+SSEx89noXVfk59bW2kproq7XuW5qZGRaLRFqocAKcghHH2TYopaxYkxu6Bk5iyuu5UqHBn6PJLqpfVNcnOz9taSbWJ1jFni6l1TCAYculcaym/Q+vObEuc6sQ6T8nqVjbW0doS5tAHYKPfnRkb0ZaRbh2oz85wJc+p9WtbU3Lj0/ZNRZIJYe7L9Dq7XK7LN65fu6zzRdOKBkUikcrWW7eXBXftHKfqAcg1Qhhna1b2pusFluKRVJW4kS6GllnlssYQGc7QsssDwVBY0hlZ3ZUKritMIBgyEvWlMk/rzexYP/WJVjKjiX0V4eMAQLpab93eIKlNkt549Wb9z7hHT52dyvj7TkWTb9xXX2LK0KL9cqclPZTxGxW3+4p1a1qWde5oXNEw+9c1kvZRAwHkGiGMc29e6nVBU3kgR7yyWgYU48w/NZIisgbazVTZNkqqCwRDQ7K6KuV9GJPoRlklK3wplNZSs61k6gPB0ISscG6McWQApOHlklyb1q/TqpVNelskph37+nV6OprRN+2ZTL4nrGkY8pkuTSwc3Nzf0dqS8eQoEomsX72qeVnLWNm4Yvava0UIA8ABCGGceQPjl9VtAcilYg5f5qqXNYBrJsdxcUtaIaur0hlZXZXy7uY+8dlVI6vVSyHzJx6RxP4aZvwYACl4qSQ9/4brJUllbpf+cEOtvnBg8NkxWjJhz8i0hmeiqvIkl41PLt5y5r8zXUitt26vi8VipS0rVy5rOVWVFfJ6vbFwOLyGqgfACQhhzt08uGSNveKSnm2BGZMUy+bFdWI9mtgjyPHnQjHcSCfLkDVQb6/SnzEplbJvkFQdCIZOd7S2jOTJ52e5pDpZLUWK7VhpkNWS6aykMx2tLVEOGQCLBAsuzYYwz7nu2Z+vK/Pqnetr9NUjQxk70czE4vrGsTN67yV1MpeYGnsoHF1sPSLKQggjqUWSGlfUL3tBK+rroqGeXgbnBeCYC8iiEgiG3Do3K4ZnzsNY5DVxWd+Czz4mJU1maFyABhGOITdcOteFhNm4zueVFUwNZen9PJKaAsFQjaQBpw7gGwiGymS1FCrh2FGtrPDsrKQhWsYAWMBVkupKSry6+orLzvvFtTU+vXlttb5z4mzG3nzfyLT+8eBpvWN9jaq9C7eIefj0oqedn3e0tgxmoaysEKZh+SFM44oGM9TT20z1A+AERXGzn2giXyGr+Xg6A90aiZswb+Lf1YnlzsiaynTUjpukxJStVVRL5EBFImRgJq6FVSaO96ksvmeJpJZAMDQqK4xxxICwgWCoRFZg7KdanGc2jKkKBEODHa0twxQJgAvcLElXXXapPO6LL8Nf2GA1Qs1kEHNgdFp//Uyfbqz367l1fq0r8573zcuTZ6f0897RxRbxpSyV1erSkpJoeVnZsscWa6irdXm93vVUPwBOULAhTKLFS3XixilT2zk7W0xVIBiKSBqRNZZDujdKK6iSyDKPaMmQijpJPcp8t6QLVUgqS9zYn83Vxie6S9YnPluxMFNSYyAYqpbU39HaMkmRAMUtEAzVdbS2nFYihLn+6isXfO4LG8pkGtJ/Hj+b0a5J9/SP657+cflNlxpL3SoxDQ1ORzU4vehlbLCjteVXWSq2htqa6qhsGOB9RX29DEOrqYkAnKDgQphE+FKn7HepcMv6BrQmEAyNSDqdShgTCIYqZU2FCmSDoUSAKLoepcKT+GzJRQsHl6QVic+Kvo7Wluksf7aWywqK6S6ZvBJJqwPB0LCslkx0UQKKTOKz80uS3vz/Hu76k8c/+p4XStJ1i4QwkvSC+jJVuk197eiQpmOZzf0nojEdGw8n+/SPZrH4mmqrq21pobuivlaxaKyRGgnACQqm60EgGHIlpnVen+Mby9mb2/WBYKgh8c3xUutuyAqOgGzwSmqW1ZqBACZ11crttMulktYkxovJxmerGQiGmhN1hgAmPVWS1iXG0AFQJALB0CpJuyW9XVKp4XJ9teWVb6j3er26bPOmJV9/VXWpPnxpgxpKHPPR+8MstoKRy+Va0bii3paNr6ut1UwkUtl663Za/gLIuYIIYRIXtutktURxyk2lIWuMjWQuvCuU3lg1QDo3gyupb8s+tqscsA4NgWBodSAYyti+THx2rZVUzm5fNrekVYFgaEUieAdQwALBUIukeyWd1+RlxQtu1RXv+hO5PMl9dDf7PProZSt0Q13Oh+AakPTubL6hx+Nurq6y53Q7Z3DfldROALmW1yFMIBgyAsHQCkmr5NxvaGcvvBsXaRVTS1VEhpmypj6vEa1f7FCh3LaGmeWTtDbRRcnuz9YGh3+25qtqWS2ZvBQFUJgCwVCVpF9I2jjvE9Zs0pcOntZkNLkeiqWmoXeur9EfbqxVpScnl+4RSW/qaG0ZyOpNiuGqr6yw5zuAmupnw5wmaiiAXMvbECbx7e8a5c8AkVWyxgbwXLAdfp2bdQnI1I36KjHmkJ2c0Bpm7ud4UyLoXXbAlhhXq0VWYIfMKJEVxNDCCCgwic/QH0m6fLHnHRid1hcODGp4Jpr0sq+v8enjlzfqxSvKZRpZ+z4lJuntHa0td2e7LGPxWFV5mT29OOtqnz2lNVBLAeRaXn7DmZjKeZWc8U10OhfePXNmy6imGiKDqqljGVMh6WziAtUJqiSVBoKh3o7WlnA6CwgEQz5ZTbVp/ZJ5LknNgWBoqKO1ZZDiAFL+vDISx5FLVjA++5jvC8Z44hGb82eso7UlEyPe/r2kFyXzxNDEjD67b0B/srleTaXJfeyWuV1645oq3bKiTD/qHtHjZzI6+dq0pLd2tLZ8Pxf7OBqNVVSU2xPClJaUyOvxxMIzM7SEAZBzeXehnRijoFn526XClNQSCIZ6JU1KYqBGZKqe1ctqBYPMMBLH76iD1mk26O3taG0ZT/GztVJSo+iulm21ia5JvRm6IQTyXiAYKpHVmrNEVuthrx3XsIFgKCopPOcxJWkq3WMxEAy9S9J7U3nNUDiqz+0f0B9tqtOm8uQbRq8odSuwsVahiRl19o3pt0MTsnkSpQOSfr+jteW3udrvkUjEb1cII0k11VXRvoFBWsIAyLm8CmESTbdXFsBNgiErSBrnhgcZ4EncTNOaIfMqNH8IY+rcN7Sz38rG5jyiGVwnl6xxqAY6WlvOJPnZWidmaMulclndVbs7WluiFAeKXSJ08c95ZOpayZT1ZcXcLyzigWBoWtJE4jGZTCgTCIZukPTP6azEeCSmLx4Y1NvW16i1NrXvTlr8Hr1zfY1et6pSuwcntPv0uE5PL+tj5Kykz0j6xzmttrOu9dbt1ZJkV3ckSaqtqTH6BgZXcIQByLW8uUlLtIAphABmLlrBwG4+SStEuJct3sQNglvWN7SexGOp8o9Lmkk8phKPGZvXrSHRwqJ/sRuIQDDUJKmSXZlzs1OPhzpaW2YojqIPIYzEZ8ns54o7ERjMBrxzP2PmhruRxCMsKdzR2hLJo232yQq2y3N8fWokjsdSWRMnxALB0JikMUnj832eBoKhGknf0zLG+IvE4/ra0SF1T1bo1c2VcqV4Fq/xmnplc4Ve0VyhkxMzevLspI6OhXV8fCaZAYAnJf1a0g8lfbejtWXCAVWiWrI3hKmrrXa7DIPuSAByLi9CmMQYMPncBQnIhnJZrRk4TrIrnW/VDJ1rUj97hRmR1TpuPHEDZYcqSZ7EOFSxeW7ymhI3PXAGj6wWMaF0x/VBfkocj7OtPnyywhc7BtqOyAp5JxMBQthh220mPqeqEvXfiVyygupKSdFAMDQqabijtWV6zr77pqR1drzZL3pH1TU+o3duqFG5O/X5MwxJa/werfFbxRmXdCYc1ac7vqk9Xd0qbWzubLrlZT+XNCxr2unDkg47MLCrlmwOYWpq5PZ4mKIaQM45PoRJjDK/ihtLYMmLlWqKIe8/j2dvRqYSF8h2NAX361xXl8icm4Zm0RrPqfVgNoiZpjgKV+I4LJcVhJZl6DrHnXiPclmt42ZkdaEczWX9SnQ3qklsez5d35mz59tAMDQp6YykgKRX2fkme0em9Ld7+vWuDTXaXFGyrGUZksriUT38i/9VOByWpI//z1/8wUN5UNZVkmTzmDCS1aoeAHJ+sef0C5Rm5d8sSEA21ScusFE4ZpvCT0s6reW3jCmZvbGX1eJmlaxwBs690WshiClMgWDIk7iRr9L8M/lkkkdWF5vaQDA0JWv8j9FsDQqdaNlcp8IIgH2SniNr/BTbDc9E9fcHBnVrU7le3Vwpjyv9rOqRx5+YDWC6JT2cJ+VbLUnlZfadqiorKiQr/AOAnHJ6S5j6xI0IgPk1iNYMhaxEVhA9Kusb1+VMh+2RtEZWoMOsWc43G8ScpGtSYUiM0VQn53QBLJXVJbE+EAydkXQ2U2FMInhqUGF9YeCXNR11xq6l45J+dWpMzwxP6ba1NSnNnjTXAw8HZ//6v8FdO/NlFrYqwzDiXq/XtpZSleXlikQidMEFkHMup65YYoA20mpgfoassUgIYIpDhawm1N5lLmd2JhDkh9kgxkNR5K9AMGQGgqFGWWOGOPEG0C0rIFkfCIYqbN52IxAM1Se2vdBabH5M0tpsvFHvZESf3z+g/zh+RiMzqc989GDwsdm/7syj8vWWlpTYOltcRUWZYrFYSeut270CgBxyZAiT6IbUyO4B5jUbwNCdpLh4ZAUxdD0rLm5ZU47TLTcPBYKhKknrlRjfIg/q2spAMLQ60Wpnudteltj2WhXeuH7bJb0u22+6e3BCf/10n3b2jGo6llyDllBPr3r7+iVr9qy786iMy71ej62tdirLnz191vLpBCCXnNoSplrL/8YXKFQNojVDsTJkddOspiiKildSc+ILCuSBQDDkDgRDq2V9oeTKs9X3SVobCIZq09x2V6LlzyrlySycKVot6RO5evPpWFw7e0b0kSdP6X+6RzQys3gv1UeffHr2r48Ed+0cy6d66PXaeytQWflsQy9a2gPIKcedHAPBkEtWn2kAF6sXLWBghTCGrHFiUBx8ssbv6KUonC0QDJUn9pUrjzfDkDVWjF/SqWSnL04MvLtSzp1u2o7r5i/IAS0SJ6Mx/bx3VL88Naorq0r13Dq/tlSUqOyCaa0ff+qZ2b/ek2dlXVLm99vbEqaCEAaAc04mTlOT5xcuQCaPDbqiYNZs9waCmOJREQiGpjtaW4YoCmdKjH9SSF0d/JLWBIKhno7Wlqkltr1G1hcFhdxi6/2SrnbSCsXi0pNnp/Tk2Smrr3KpW2vLvLq0skTXVvv09L4Ds0/dnW/nuNISr63dMCvOdUcihAGQU44KYRJNravZLcBFKpUfYwogyxepsvr5j1AURaM+EAxNdbS2TFAUjrt+KdQxm9yyprg/1dHaMrrAtjcmzlOFrE3SHzp5BeOS+qYi6puK6JHTE/pv86xGaxql7h5JeijPytvrK/XZ+qWs31cql8sVj8VihDAAcsppLU4qZc0GAWDOdYMYRA4Lq5U11SyKx8pAMOSmGJwh0Y16tQq7paKRqHc1F2y7mdj2Qg9g6iV9TnnWymc8GteG2wJa89rfO3Pd7V/Jt1aTZX5fqZGBhUZESxgAOebEEAbAOV5ZA/ECi2kQAXYxMWW1ukCOzQkhiiUIbQgEQ3WJbfdIWlME225K+qKsICYv1T/35hpJP0iM2ZMXDMMod3vsz5pLS0slqYxPLwC55JgQJvGtHjO+AOdf+DWqsPvXw766Uk8xFBXf7M0wcnbd4pLUIqmkyDa9LjH70RoV7gC8c/2FpNYC2I7XSPpZYrBlx/O43f7yMvuzkvIyv7jfAJBrTmoJU8HuAJ4128ee1g1I+qZcfLtXbOry6ZvtQpIYB6UYA5hZVUVyfnqNpHcU0Pa8SNJPA8GQ1+krGovHK03T/tsUX2mpS4yxByDHnBTCkEoDc26uZHVFAlJRK2aXKzaNiUAA2bVSjMVU6K6U9LcFuF0vlvQfTv/ccLlcLn+p/bcGpSUlLllj7QFA7j7jHLQuhDCApUJMRY30mKJVYbEpEQN3Z1UgGGrgM7rg1Uv6JxVuS6c3SbrDyStoGJkJSirKywzuOQDkmiNCmESzSLpdANxQYfkqxThCxaY2MUgqMn+9UiFmVil0HklfktRU4Nv5wUAw9B6nrlw8Fvd6vfY3CC4tKZHX4+E6C0gwDCPvHoXAKS1hSjgEAJmyZrnhBhrLrUd8S19k11CSVlAMmZUIuhopiYL3MUnXFcm2fjEQDL3AkR9qLsNV4rU/Wy4pKZFoMQogx5wSwvANHmCNA+OmGGADQpjiUxYIhhiYObOaxJhLhe4tkt5YRNvrkXRnIBhy3JT38Vg8I59nfp9PhsvgsxJAThHCAM65aWagONilRAR6xaiBIsiMQDBULcaRKHTXSfqrItzuJkk/cGCXRtPns/+Q8/lKJWYSBJBjTglhuFlAMXPLagUD2IlQr/h4A8FQJcVgr0Aw5JY1UCsKV52kLxbx9ejzJX3SSStkuAwzE1NUu01T8Vic7kgAcsrFegDzn/8TF2OlslqpVMoajLFO1rfNK2SNDbBynkdj4jn1sgbZrUoswyer1deF9Z1xYJAJTJ9bnOqZstr+MuU6paCZkr4gxvv5cCAYutUpKxOJRMsyMQBnaUmJZBgczwByyimJPx+GyBVDkjfx8CQe2ZitKyopIikmBqZGZhDCFO95vVLSMEWxfIFgqCRRnihc75XVEoTrIek/AsHQ1R2tLQNOWKHyMvt7Dbk9bhkGX3wByP3FmlM++IFsMBM3p6Wywg9PjuqfKaZlR2a5EnUsSlEUnRoRwtiFrqKF7bmS3k0xPGulpH+V9Npcr0g8Hs/YGDWGDK6/AOT8Ip31QKErTdyUNEtaLav7T4WsFi8EgOAzHoWGsWFsEAiGvGKmsUJWI+nzfE5e5DWBYOjtuV6JWCzmzdSyI9EoY6YByCmntISJsStgM5+sgUn9osUJipcpaYZiKEpNgWCoQtLpjtaWKYojeYkxdaoTN+koTIakz8ga3w0X+2IgGNrV0doSyuVK+DMxO1IpPXUB5J5T0n9CGNjBnbhoXi1rgL0KEcCAz3gUrzJJawLB0KrE2CZYQqIF0XpZLSaZubFwvUnSLRTDgqok/XuuB/k2XRmYHcnNYQ3AGTetThBnV2AZ/LIGTuTrDeB8dLeDZIUxZYFgaETSYEdrS4QiOV8ipGrkPFIUWiR9hGJY0u9IeqekrxXgtvEFHYCccsq3pFwQIp2by0pJq2Q1J+bCGZj/OAFmVUpaHwiGapnG2hIIhoxAMFQvaS3nkaK57r1DVpdlLO3vAsHQ6my/aeut2zPaci8SidAyEEDOT0ZOwJgFSOWmslLWN1m1smY3AgAk/xlaL2ltIBgq6sEpEwPvrkmcS1AcbpN0PcWQtEpJ/xYIhuqzHNxmLCTzlZK/AMg9Qhjk043D3PCFpqTA0ujqiYV4JbUEgqHGQDBUdGMHJcZ+WSOJO7Li0STpTymGlG2T9GZJ67Id3JaU2D9BkttkTBgAueeUT6JxST3sDizAL+ub24ik0xQHkLRpigBLqJLkDwRDpzpaWyaLYYMDwVCDmPmoGP21rPGRkLqPSdotyRMIhs7IGlsq4yG/x0NjZwCFyREhTGKQwDF2By64UPbKGu/FLyuAYewgAMjAvY6k1YFgaEjWlNYF2YIq0Z2imRvxonSLpFsphrQ1SHq/pE/LCjB9gWCot6O1Je9asodnaHwPIPeYvhSOvFAOBEO1sgZK9FMiAJAVtbK6KBVce/1AMGRKWi0CmGLklvSXFMOy/b6kyxN/L5W0JoPdkzLW5Xw6HGZPAsg5Qhg47UK5VFY//XoxswsAZJtP1qC9BRNWJEKlFjH7UbG6TdI6isGWe4ZPzrl3MCWtCgRDVRl4r4pMbojb7Z5gdwLI9Qcq4JQL5VpZ31QyUCIA5M7szVXej5sypwUM55XiVCnpvRSDba6Q9KY5/zYkNQaCoTqKBgCSRwgDJ1wkewLB0GrR+gUAnKQhEAytzPLUtHaeW1yyWsAwumfxepusIAb2+TNZA3rPVRcIhuopGgBIDiEMcn2RXCZr7BcfpQEAjlMha5wYM59WOhEcrRItYIpZjaR3UAy2q5QVxFyo1u4gxuO2f3iq8fEJuVyuSXYjgFwihEEuL5LrEhfJ1EMAcC6frNmT8qlFSaMI94vdO8RAzJnyRkmXzfPzWju7MZaW2p+hxuIxGQazbQLILW5+kXWBYMgVCIZWSaIPMQDkB6+s2VAc37IkMb4YXVCKm0/SWyiGjN4/fEzzdyFvCARDFU5d8cnJKRkyaAkDIOcfokA2L47dYppQAMhHpqwWMY6dZSgQDPlkjS+G4vZ6EcRl2rWSXrPA75qc+jkRjUZlGAbzVAPIKUIYZPPiuETW9NP00QeA/L1uaAkEQ34HnmNMSc3sIuqorAF5kXl/Ial8np8bkpqdOJbU1PS04vH4OLsOQK5PVEA2Lo79slrAuCkNAMj7a4dViVYnTtIoq7UOitvzZH3hg8yrl/THC/zOLWml01Z4YnJKccXH2HUAcokbYmRcIBgqT5yImX4aAPKXKWtsGE/isSIQDPVLmkl8vpuSYolHXFI08btw4s+pjtaWjAyIGQiGKjX/N/IoPq+nCLLqbZK+L+nYPL/zB4Kh2o7WliGnrOz4xITisfgwuw1ALhHCIKMSg7M1iQAGAPKNIalUkl9WN1LvPM9ZK6lXVsgiLdHCNhAMzUialDQhaayjtSVmw3nGlNTA7oKscWC2UQxZZUr6qKQ/WOD3dYFgaLyjtWXaCSs7MTGp8MzMaXYbgFwihEHGJAKYlZQEAOSVEkkVsgZQXypAd8kK2nulpKZ9nW1FUykpHgiGxiUNd7S2LGeMhjrRDQmWbZo/LERm3STpZkm/med3hqyugl1OWNGRsbGoJFrCAMgpxoRBRgSCobLEhTkAID/4ZQ1su1JW155kWzCaiZusVK8pjMT7rAoEQ+sCwVBlIBhKqdVkIBjySqpm1yHhZRRBzvylFg5DSwPBUJUTVnJ0dCwqaYTdBSCXCGFgu8Rgjc2iCxIA5IOSxGf2CqXfisCTeH26n/teWcH9usQ4YsmqY/choULWoLzIjQ2Sblvk9/WBYCjn9x3jExOSNMruApBLhDCwVWIa6lUigAEApzNlzW6yUvZ04SjV8kMRj6ypbVsCwZAnifNNBbsRCbck6g9y531auGWaKakm1ys4dHbYlDTArgKQS4QwsE0gGHLLCmCoVwDgbLMtFu2eUahc1ngvy+WX1SpmsS4MNexGzHEjRZBzlZLev9gxmxhIOymxWMzWlQvPzCgcDpuS+tlVAHKJm2XYItGPf5UY7BkAnK5G1hguZgaXX2LDcgxJjYFgaOWF3RgSoT+tYDDX8ykCR3iTpEsWue9IOjwdn5i0dcWGh58dCobZkQDkFCEM7LLSpotuAEDmzvmNkjI9QKYha3wYu0KeCkmrE8HLrCrR7RXnrBOTATiFKWuQ3oVUpToAt12Gzj47KRIhDICcX5AByxIIhupkf5N2AIC9N0ZNsrohZev96m1cXomkNYlxYCR7ujyhcNxAETjKjZJevMhnQ05asZ0dfjaEoTsSgJwihMGyBIIhv5idAgCcbDaA8Wb5fX2yNyxxy2oRUysGYMX5rqIIHOcvFzlOl2qNN5OJFeofPC2XyzUT3LVzmN0DIJcYvwNpSzQNX0lJAIBjzQYwuQotaiRN2nhT5ZK9LWxQGAhhnGeNpLdL+td5fudLzH5myJpVrURWSGxKcp/d83j10W932L5C/QOD8njcvewaALlGCIPlWKnMDewIAFie2TFgctlqxJDUIKmnQMrTSDwubEkckxSf8yeyxydpE8XgSH8k6UeSBuf53TotMK6T4TIz0lK/f/C0DBkhdguAXCOEQVoS48D4KAkAcKwGZb8L0ny8sroljTi8vFyJdfUkHu45D0PJDwQ8G8ZEZbUAiiT+nH3EqJq22iS+EHKqMkl/duCJfZ9/6Ff3fzgWjVbf9MoXfXjTlVvOKgcDa/f29cfD4fARdguAXCOEQcoSAyPWUhIA4Fg1clZQbne3JDt4dK4rRInsazFkJEIBU/OHYDOSphOPCVlhDdJHKxgHOzMw9Lv3/+zuWyIzkTpJuv/n935y05Vb/iQX63Kqrz8Si8e72SsAco2BeZGSxLSCjWJqUABwKp8yPw11qgzlPrw3EmVTL6lF0ipZA8uXK7tdtjyJ96yTtHrOepRSddOykSJwpqH+0/rJN35gzAYwkjQ9OfXSu37wi2tysT69/f0uScfZMwByjRAGqarhQhEAHMuU1Q3JiXyS/Dl43xJZwctqWV8ilMtZLYE9sqbsbUqsY52c0Y0sX2ygCJxneOisfvrNH2pqYvKi33UdPvEH2V6fwaEhTU+HTUmH2DsAco0QBkkLBENeMR01ADhZjcPP7bXKTktKl6xxaFbJGkS+PE+ueUxZgUxz4lEhWp4uZS1F4CwTYxP62bf/Z94ARpLCU9O37v7lb5ZswRSN2tdTryv07NjghDAAco4QBqlo4GIQAByrVFbY4GRuWeFIppiygp7ViT89ebw/Z7/4WC2pmmu2BTVTBM4Rng7rZ9/+sUbODC/2NOPgk/vfv9SyJienbFuvk909crlcM5KYHQlAznFCR1ICwVCZrFHuAQDOlC8Dpldn4PpjNnxpkRXyFNIXBq5EmRHGXKxSuenihnlEZiL62bf/R6f7Bpd87vTk1Et//l8/acvWup04GZK3tLTnutu/UsGeAuCEEzuwqMRgvA2UBAA4lk/5M46IIftawxiyBiEuxPBlvm2tnrOtsMbRgQNMjI3rp9/8gfpCvUm/pvvYyfaJsfGsTC9+rCsUjxquQ5KaAsEQxw+AnCKEQTKqxCCBAOBk1Xl4XlnuzZdf1pgvNSqurrIuWa1+msVA+Ss59HOv90S3ftDxHfV396X0umgkeskvvvPTV1304XDpVSN2r+P+Q4ejhrd0X+KfTYkW3gCQsxM5sKBEK5haSgIAHKsk8cgny2kNMzsD1Ao5a5ajbPPKaglSV8TXc9Uc/rkTj8f123se1k+/+UNNjE2ktYyh/tPvyvR6Do+M6vTQGbe3unbfnB+vTEw4AQBZRwiDZC5w3BQDADhWvo5xUJnGdUiZrNYvfIt9/v5fpeJsFcOMjTkyNjyqn3zjB3r03ocVj8fTXk40Et1837/8y2vn/V0sZsu6Hjxy1PrA2bR13wX3QCsDwRD3QgCyjg8eLCjRCqaGkgAAxzKUvwOTGkp+NieXpHpZLWC4drmYKatVTLF1zapm12ffsf1HdOdX/kununpsWd5wT/dn9/ztn3/32He/ds3cn09MTtqy/AOHj8rtdk80vfgVF65wiRjzEEAOcCGDxVSJVjAA4GSleX4uT6ZLkkfW2B/l7O6kzttNWv54O/miml2ePfF4XA/96n51fu9/FZ6atm25nqZNalq56uozTwa/t+f2D3/uzFO/rTJNc8au5R84dFimt2TfQsdMIBhihi0AWUUIg8XQCgYAnM2X5+vv1uItefyyBqD1sKuTVpIos5Ii2FZaMWRJZCaiX3znp3py92O2Lvd1z79CT/3zB3XnV77g+lT7X8hn6JXdP/zWL2KxmG0tun775NPRuLckuMhTViRafwNAVhDCYF6JUeO56AUAZyuEcUAqF/n5ChVX9xq7zHZPKvSxc1awqzMvPB3Wzv/4kboOHbfvBsQwdPvbXq4f/OXvq8Jn5YXbXnSzvv+1fzavueLSmng8bktL7N6+fp0eOmOWNjT9dpGnecW07wCyiBAGC6EVDAA4m5G4ech3pbq4+0y9mJnPjvrRUOA3l03s5syKx+Pq/P7/qi/Ua9sy6yvL1Pm3f6CPvOEWGcb5GWt1VaX+/lMfN2563g0aH59Y9ns9/vQeGYYRX/GCWx9f4qm1tIYBkC2M94GLJKbso38sADhbIU2vWi5peE5wwDnIPrWyQq4zBbZdpbLCOmTQk7sfU/fRk7Yt7/pNLfph+//VmobqBZ/jcbv1mY//pQ4cPrLs93vi6T3ylpYertx82dgST/XImmlshL0OINMIYTAfmmQCgPMV0uCr5YmbnxXK/3FunKhKVuvn0/m+Id/7p2/9wdTk1JYVqxp7b97+YpVVMl5zJh14fK9ty3rHtlb9y7tfqxLP0rcfHrdbV2zdsuz3fOjRxyMxT8mDKVz/EsIAyDhCmDyVaDLpTlyEm4mLqwubUcYSf0YTj0hHa0ssyZMQAIBzeLbMzoDkZbdmTEXiOmEwXzfgl9/73xvOnj7zF5LUdei4/vOLX9f6rRt17c2tqm9ijF67RWYiOnt6+Q2o3G5T//Ke1+kPfqc1q+t//GRIp/r63ZVbrrg3yZf4A8GQu6O1JcLeB8AFXBFLhC0lsprdliQuUL1K8xvQQDAUlzQjKSxpOvHnVEdry0zi937qBQDkhUIbPJ0AJvPKJcWVpy1ieo6H3jH33/F4XEf3HdbRfYe1futG3XBrm6rrnDuk3dTEpEr9+dPQa2x4dNnLaKqv1v/+1Vt13cZVWV//+x58RKZpTre84g2PpPCyChVe1z0ADsPNtgMFgqESWTMa+GU1y7ZzoLDZgRy9iYux2feMSJqkTgBA3mAQSaSjQlZL2by60Tyy52BVeGr6hQv9/tj+Izp+4Kguvf4KXf/CG+Qvd9bEUMcPHFU8Htf6rRvzpszD09PLev0Lr75EP/zw76m2IjdDPP3mwYdjZqnv/tIVTeEUXuYTIQyADOOG2yESwUulrGDEk6O6UMGeAIC8wQyHSFeVrG7KeTP+xdMPPXGTlmgFHI/Htfe3T+vgk/t1xQ1X6fIbrlJ5ZW4ubaLRqE519arr0HGdPHxcZwaG9Oq3vz6vKklkJr1eOYZh6KNveok+8Xu3ymXkJiseGR3VU3v2Gb7m1btSfCljUgHIyo03ciTR1ahCUrWs7kYAACR9r0MRYBlqZXVPnsyHlR0eGn5B8uHBjJ544FE9ufsxNa1p1ppL1mn1xjWqbay/aEpku0QiEQ109+nUyV6d6upRz/HQRSFGlYO7Stmlvqpc3/2Lt+glV2/K6Xp03n2fJMVX3PiSu1N8qcm4MAAyjRAmBwLBkEtW8FKjwprdAgCQPbSEwXKtkNQjK4xxtPB0+PpUXxOPx9V7olu9J7r18K4HVFJaoqY1zapralBD8wpV19eosqZKLpcrpWWOj4zpzMCQzgwMaaj/tIb6T+v0qQHFYgvPfeDxeuQvL+yZ13/n2kv0rT97sxqrcz9j1U9+8auYt6z8wdprn5tO1yK3JEIYABlDCJNFiZYv1bK+fSJ8AQAsR4wiwDIZsoKYXifXp4NP7a+JRaNrlruc6alpnTh4TCcOHjtXAIYhX5lfZZXlKvWVylPildvjViwafbYlSzQS1cTYuCbGJjQ1Mal4PJ7ye1fWVhdsJfJ63Lrj7S/Xn7zqxoy1NErFsRMntf/QYVfZmvU/4P4IgBPxIZMlgWCoXFKDCm82CwBAbsQpAtjAI6leUr9TV/DonkNbMnYQxeOJgGU8o9tQnYddkeKxpT9irl6/Ut/6szfrynVNjlnvnZ275Ha7R9e+/m2/SnMRfFEKIKMIYTIsEAy5ZX3LVE5pAADsvEeiCGATv6zJARw5UO/ImZGN+V7AVbVVebfOiwVTHrepj735Jfrw62+Rx+2czGJ6Oqwf/6wzapRVfD/FWZHmYrwtABlFCJNBgWCoUlYAQ799AIDd6I4EO9XIGqTXcePDzITDK/O9cL3Rqbxb5/GRsXl//pzNa/T1P3m9rljb5Lh1/vldd2tsfNxYeeurvr2MxRDCAMgoQpgMSAy82yimfAYAZA4DR8JOhqxu0z0OXLG8r+srNqzPu3WeGJ8479+lfp9+/3Uv0lffdLMjxn65UDQa1df/6/tRb3nFr5pe/IqeZR4LAJAxtNCwWSAY8kpaIwIYAEBmEcLAbl5Z3ZIc5YrnXfMdl2l253PB1rU05906G4kswjAMXXHD1Xrz+96qt7zoekcGMJL087vu0an+AbPqyud8aZmLoqsngIyiJYyNAsFQmaSVItwCAGTejKRpigE280k6LQeFfFc979rj3hLvy4K/uu8jU5NTt8Xy7DKrzOeRt8SbdxVh1YbVmgnP6MrnXaOahlqrcridWfbT02F95evfjnr8ZT9redUbn7bhsxUAMoYQxiaBYKhKVhckAACyISxramHAblMdrS1Oq1snW2/d/t6IYd52y2t/T/cf7lPwUCgvCrOxOT8vD9dcsk5rLll33s98pjNDmP/64Y81ODQUi8Vi7+tobTnJIQzAyWixYYNAMFQrAhgAAFAYKgLBUKkD16vMHY/qthsv1SN/9z6d+Pe/1Jf/6LV6fduVqq8sc2xhbrj2CmpUBoV6evW1b303FovFdgR37TxBiQBwOlrCLFMgGKqXVEtJAACAAtIgyWktCjyS5PdZ+dCahmq95xXP13te8XzF43HtC/UreDCkRw6e1KNHuvXUsV5NhnPbs8R0GVq9aV3BVIpY3FnDpcRiMX3y8/8Qk3RM0u0ctgDyASHMMhDAAACAAuULBEP+jtaWCaetmGmaF/3MMAxdtrpRl61u1Ntecv2zgcHxvjN66niv9nb16VDPaR3uHdShnkH1nR3LyrpeetXmvBwPZiHTUWeFMN/4zp166pm98Vg8/qbgrp2MkQUgLxDCpCnRBYkABgAAFKp6SV1OW6lwkq1bXIahDU212tBUq9c+7/Lzfjc2FVbXwBl19Z9V18BZnRwcVt/ZUfUOjarv7KhOnRnV0NikxqfCKa+fYRhqriqVMdwXff72W81CqhARB7WEeeDhoDq++Z/xeDz+weCunY9yuALIF4QwaUgMwltPSQAAgAJWGgiGSjtaW6Ycsj7jkjQdDi97QeWl3mdbziwmEo1paGxCY5NhjUxMaWJ6RuFIVLF4XCMTVrH4Szzyut2q9JdoRVW5mmoq9Kcf/Zv4obr6sMs0fYVUIcYjMUesx94Dh9T+qTuipml+58Ff/PiLHKoA8gkhTIoS01AzCC8AACgGNXLOLFwzkhSJRLN3oWy6tKKqXCuqUnvdk3v2xRt+5zW+QqsM49HchzAHjxzV+z7ysWg0Frs7Eom8i0MUQL5hdqQUBIIhr6SVlAQAACgSFYFgyClf2k1K0tTUlKML7FT/gKamply+lasKrjLkuiXMQ799TH/4gQ9Hp8Ph+8Lh8GuCu3aGOUQB5BtCmCQFgiGXpGbKDAAAFJlKJ6zE7MCrkWjU0YV17IQ1jE7pisL73q5vZDwn7xuNRvXVb/6n3t/+N/GZSOTb4XD4pcFdOyc4NAHkI7ojJW+FJC/FAAAAikyVpCFHXLi63ePDIyNlTi6sY10heX2+GXdZhafQKsLTR7v0iV/+t95525u0ujk7IdPjTz+jO/7xK9FjXSej8Xj8jx/8xY//jUMSQD4jhElCIBiqlEO+BQIAAMgyj1MG6HWb5pmzw84OYfr6B1RSVROWVHAhTOmKpuFfffU3kz/71a+bXnxTW/wNr36lcd1VV8gwDFvfZyYS0f0PPaLv/PAnsSee3uPyejz3xGKx/xfctfMohyOAfEcIs4REP+gVlAQAAChiFZJyHsIYhnF66Oxwi5MLqn9wUGZVTbwQK4HLW1JetvWqFWeefvSN9z34yIfv+s0DVzStaIi87CW3uG+58fnaunmTXGkGMrF4XHv2HdBdv7lfOzt/HR0ZHXV5PZ57JX3ygZ//6B4OQQCFghBmaSvEODAAAKC4lUsayPVKRCKR3uHh4audXFDdvX0RT32Lr0Drgbn+9/6wtrP1E9+W9O3WW7df3z8w+PZv3/mjN3/jO3fWl5eVRa658jLzsi2bjTWrmrWmpVlNK1aovMwvt/vcbcfk1JT6BgbV09unI8eOa+/BQwo+/lRkZHTU7fV4esMzM1+X9K8P/PxHxzn0ABQaQphFJKajLqckAABAkfMEgqGSjtaW6VyuxEwk0n1meCQmB39BNnh6KO7dcEUhX2M3SzolScFdOx+V9Gjrrdv/RNI1Y+Pjv/Ng8LGbHnnsyetnZmaa4vH4s81iTNOMm6YZC4fD5nkVy+0+YxjG4+GZmbsl/fyBn//oUQ43AIWMEGYBgWDIkNRASQAAAEiS/JKmc7wOp3pP9UXk4MkShkdHzZVlBf0dXtOFPwju2hmX9HjicYcktd663Stpo6RVksqj0WhVNBo1JE1IGpfUI6lr9y9+fJpDC0AxIYRZWLWYDQkAAGCWX9KZHK/Dib7B0469fp2eDmtmZsblKS/o+RySGpMnuGtnWNK+xAMAkMBYJ/NItIKpoSQAAACe5YRxTk6Ew2HX2eERRxbQ2RFrvdxF1hIGAJA8Qpj5VYtWQgAAAOddNwaCoVy3Ej4uSb19fY4soKEzVkMht7+skOtBM4cCACzjZEoRnI9WMAAAAAsqzfH7d0nSqf4BRxbO8MioJMldVlHIdaCFwwAA0kcIc7Fy0QoGAABgPiW5fPPgrp1THrf7dHevM1vCnB0ekeFyxU2fv5DrAN2RAGAZCGEuVkURAAAAzKsk1ytguFwHj3eddGThnD5zRiU+f7jA68BKDgMASB8hzByBYMgja+R/AAAAXCznM0eGw+GnT5wMxZxYOGfOjshTXhEp8DpAt30AWAZCmPNVUgQAAAALcifGz8ulA0dPnHRkCHP6zBmZZRXxAq8DvkAwVMKhAADpIYQ5XzlFAAAA4Ojrx4OjY2Pu0bExxxVM76m+mFlT7ymCOlDLYQAA+XkSdYxEVyRSfQAAgMWZOX7/vZJ0vCvkuILp7j0VLalrKIbrSbokAUCaCGHOKaMIAAAAHH/9eNzlcoUPHzvuqEKJRCIaOD3k9lYXRSMRZkgCgDw9iToJA/ICAAA4/PoxuGtnzOvxHDxy7ISjCuVkd69isZhR2lgUkwc1chgAQB6eRB3GRxEAAAA4//oxPDPz6KGjxx01AO7xk9a02aX1RZFPNHMYAECenkSdIBAMeZX7/s0AAAD5INezIykWiz1x6OgxR82QdPR4l3yVVVMub1EMMUhLGABIEyGMhQF5AQAA8sfTY+Pj5sDpIces0PGTIZXUN0aKpPxXUwUBID2EMBZCGAAAgOQYDliHpyXpiIMG5z1y7ETEu3J1sYwxuJbDAADSQwhj8VIEAAAAScl5CBPctbPf43afPeyQwXlj8bhOhLpdpY0ri+XamhAGANJECGPxUAQAAABJccSAuC7T9YxTpqnu6T2lmZkZl2/FymKpAysTYyoCAFI9f1EEkghhAAAAkuWIEGZ6OvzowcNHHTEGy+x02aVNq4qlDhhiXBgASAshDOUAAACQj546fjLkisVyP0nS4WPH5ausmjJLSoup/LdSBQEgdUUfPgSCIYNqAAAAkLS4Q9bj6Ugk4urq7sn5ihw5fkIljSujRVYPNnEoAEDqaAHijBH+AQAA8kXMIeuxT5KOnejK+YocOHx0pqR5rb/I6gEhDACkgRCGEAYAACAVjmgJE9y1c8zr9fbkeoakmUhEoZ5et69pVbFdU9IdCQDSQAgDAACAVDim2000Gn3iyLHjOQ2Fjp3oUjweN3zFMyjvrMs4FAAgdYQwtIQBAABIhVO6IykajT556MixmVyuw6Ejx2S4XPHShqZiqwfNgWComsMBAFJDCOOcweUAAADygZMGoN3T3XvKMxPJ3UzVh44dV1ldw6RhmsVYFy7ncACA1BDCAAAAIFmRjtYWJ32BtScWjxsnukI5W4GDh4/GvCtXF+s1NSEMAKSIEIaWMAAAAMkKO2x99hqGETtyPHeD8x44fDTma1lbWqT14RoOCQBIDSEMIQwAAECyHBXCBHftDHs8nq6jx3MzTfXg0JBGx8bc/pUtxVofruOQAIDUuIu9ABJNag9SFQAAAPJPNBp9/PCx42uVg8kWDh89LknyNRVtCHNlIBgyO1pbotREAEgOLWEAAACQt6LR6NOHjx3Pyci8B48cVUlZWdhdXlGsxe+XtJlaCADJI4QBAABAPjvY1z/gjuRghqRDR47J19g8U+Tl30oVBIDkEcIAAAAgn+2PxeNGqPdU1t/4wOGjkZJV63xFXv7PpwoCQPIIYQAAAJDPDknSiZPdWX3T8MyMToS6TV/z6mK/niaEAYAUEMIAAAAgbwV37RzxuN1DJ7t7svq+x06cVDweN3zFOzPSrCsDwVA5NREAkkMIAwAAgPy+oDVdB4+fPJnV9zx09JhcphkrbWjifkK6gVoIAMl/aAIAAAB5a3o6/HTXye5YNt/z4OGjKqtfMWW4uJwWXZIAIGmcNQAAAJDvDhzrOpnVEObQseMxz8rVXEtbbqQIACA5nDgAAACQ7w4Oj4y6x8bHs/aGh44ci/maV5dS9JKk5waCIYNiAIClEcIAAAAg3x2QpK5QdgbnPTM8rJHRUbevsZmSt9RK2kIxAMDSCGEAAACQ744ZhhE9fjKUlTc7cuyEJMnXtIqSP+clFAEALI0QBgAAAHktuGvnjNfr6cnWNNWHjx2Xp6Q04qmspvDPeRFFAABLI4QBAABA3otFY3tOZLEljG9F4xSlfp4XB4Ih7i0AYAl8UAIAACDvzUQie493hSLZeK9DR49Fvc1rSij189RIuoZiAIDFEcIAAACgEOzv6u7J+LVtPB7X0eNdhq+pxUORX+TFFAEALI4QBgAAAIXgYDgcdvUNDGb0TU71D2hqetrFoLzzupUiAIDFEcIAAACgEByUpK5Qd0bf5NDRY5IkXxPTU8/jpkAw5KUYAGBhhDAAAADIe8FdO3tN05zMdAhz5PgJ+Soqp81SP4V+Mb+k51IMALAwQhgAAAAUBI/bfawrlNlpqo8eO6GShqYZSntBL6MIAGBhhDAAAAAoCOGZmT1d3T3xTL7HwaPHIiWr1tIMZmGvpAgAYGGEMAAAACgIsVhs37ETXZEMLl9doR6ztKmZa+iFXR0IhlooBgCYn5siAAAAQIE4fKp/wB2NRmWapu0L7znVp2g0apTWN1HSi3ulpI5C38htO3aXSlohqUxSiSSvpLCkSUnDkvo629viVAcAcxHCAAAAoFAcjMViRm9fv1qaV9q+8ONdIUlSaUMjJb24V6hAQphtO3Y3SLpU0lZJWyRtlrRRUrOkqiVePrNtx+6QpCckPSrpXkkPdra3RakiQPEihAEAAEChOChJJ06GMhLCdHX3yOvzh02fn2mYF3drIBgq7WhtmcqXFd62Y3eTpMskXSErdLlU0uWS6pexWI+k9YnH6xI/G9y2Y/edkr7U2d62j6oCFB9CGAAAABSE4K6dZ57/steOnuzprcjE8k+cDMlX3xCW1e0EC/NLeqGkXzptxbbt2L1S0pWyApfL5/xZlaVVqJf0R5L+aNuO3T+W9MHO9rYjVBmgeBDCAAAAoGCYputQV6j7ukws+1jXyZi7YaWHUk7KK5XDEGbbjt2Vslq1XCErdJl91DqojF4r6RXbduxul/R3jB8DFAdCGAAAABSMmfDMnhMnu6+VZNi97ONdoVjZjbeWUMpJeY2kP8n0m2zbsdsta7yWq3V+6LI2T8rJK+nzkp63bcfu2zrb28JUHaCwEcIAAACgYMTi8YPHT4YissbjsM3U9LTODg+7a2sbKOTkrAkEQ9d3tLY8atcCt+3YXSXpGlmBy9WJv18ua2aifPcGSSXbdux+A0EMUNgIYQAAAFBIDgyeHvKEZ2bk9diXw/T09kmSSmrrKOHkvU7WrEAp27Zj93qdC1xm/1xX4OX1KlmzSr2DqgMULkIYAAAAFJLD8Xhcoe5ebVi3xraF9pyyQhgvLWFS8QZJf7XYE7bt2G1I2iTp+sTjOknXSqop0jJ7+7Ydu3/T2d72daoPUJgIYQAAAFBIDkpSV3e3rSFMd+8peUtLZ8ySUgbmTd6WQDC0taO1Zb8kbdux25S0WVbQcr2k58hq5VJBUZ3nC9t27P5pZ3vbIEUBFB5CGAAAABSM4K6d4ze+4ndPn+zutbXfUM+pPpVU14Zl81gzhW7y9NQntu3Y3S3pubICFz+lsqQaSR+X9D6KAig8LooAAAAAhcQwdOhEKGTrMntOnZK7tsGgdFNjelxvlPSnktpEAJOKd23bsZsBiIACRAgDAACAgjI9HX6m62R3zM5ldnX3zHjrG32Ubmq8lV65S2l8nwafpHdRDEDhIYQBAABAoTlw/GQoaucCB0+fMTxV1bSESUNZIw1g0vQmigAoPIQwAAAAKDSHzg6PeCYmJm1Z2EwkotGxMbenvIqSTQMhTNquS0zVDaCAEMIAAACg0BySpK7uHlsWdnrojCTJW11DyaahpMorj48uSWm6iSIACgshDAAAAArNYcMw4l2hblsWNnh6SJLkqaAlTLpoDZO2GykCoLAQwgAAAKCgBHftDHs8nl67W8IQwqSvbGUZhZCezRQBUFgIYQAAAFB44vH9J0P2hDBnR0bk9niihpsuNenylnvkKfNQEKljMGigwBDCAAAAoOCEZ2b2HOvqitixrOGREXn8FSalujzlTXRJAgBCGAAAABSiQ13dPba0IhgeGZXbT3ea5WJcGAAghAEAAEBhOjAxMWmeHR5Z9oKGR0fl8hHCLJenzCNvhZeCAFDUCGEAAABQiA5J0gkbZkgaHiGEsUtFSzmFAKCoEcIAAACgEHW5DCNixzTVI6Njcvl8lKgNypv8MkzGmgVQvAhhAAAAUHCCu3ZGPV5PV6i7d9nLGh2fkNvHeCa23Hy4XYwNA6C4PwcpAgAAABSiSCS65/jJ0LKXMzY2LpOWMLappEsSgCJGCAMAAICCFI1GDxw/eXJmucsZn5iQWUoIY5eSqhJ5yz0UBICiRAgDAACAQrU/1N1rxuPxZS1kYmJCZkkppWkjBugFUKwIYQAAAFCoDs9EIq7+wdNpL2B6OqxoNEpLGJuVryxjgN4kqyBFABQWQhgAAAAUqgOStJwZksbGx62LZkIYe29CGKA3WZMUAVBgn38UAQAAAApRcNfOU6ZpTp44uZwQZkKS5GZgXtsxQC+AYkQIAwAAgILlcbuPngilP0PSbEsYuiPZr6SqRJ4yBugFUFwIYQAAAFCwwuHwE8e7lh/CuEoIYTKhYlUZhQCgqBDCAAAAoGDFpINHT6QfwoyOWSGM28f4JZlQvrJMhsEAvQCKByEMAAAACvdit6TixODpQU1Ph9N6/cjomDwlpRJBQUaYXlO+eqb/BlBE5yWKAAAAAAV7seurPRaPx9XVnd7gvKNjY/L46DKTSeUrKd9FnKUIgAI7L1EEAAAAKFT+TS/qkwx1hXrSev3o2DiD8mZ6HzX45HJzWwKgOPBpBwAAgIJlVqyMlZRX63jXybRePzwyItPPVMqZZLgM+RsIugAUB0IYAAAAFLISw1eXdkuYoTNnZfjpLpNpdEkCUCwIYQAAAFDIxuKlNTpyoiutFw8OnZW7opJSzLDS2hK6JAEoCnzSAQAAoJCdNf116gqlNzDvmeFheQhhMs4wDJXWllAQAAoeIQwAAAXuqe6z5p6+UZOSQJEaM/11mpqa0sDpoZRfPHTmrNxljAmTDf56xoWZxxRFABQWQhgAAApcJBL5I0l/Q0mgGHW2t0Vc/tppSeo6GUrptWPj4wqHp+WprKYgs4AQZl6EMECBIYQBAKCABY/0lcfj8d+V9NE9faPbKBEU5QVvScWI6SnR8RRDmL6BQUmSt7qWQswCs8SUu9TthFXpZW8AyNg5iSIAAKBwxaUPukyzSpIh6dt7+kabKRUUoX5veZ1OnExtXJhT/QOSCGGyqaTSm8u3H5L0QUmXSIqyNwBkAiEMAAAF6pEjfSslfdBtmqsSP2qQ9B3Gh0ER6omV1KbeEqZ/QJ6SUpmldJPJFrcvJy1hpiTdIWljZ3vbFzrb28YlhdgbADLyOUcRAABQsD4hyXCZrsY5P7tZ0qclfYTiQRHpc/lqdfTEvpRe1NvXr5IqWsFkk8ttZPst75T0F53tbScu+HmXpLXsEQC2f85RBAAAFJ5HjvRdJumdhmEcm+fXH97TN/pySglFpMflr9XA4KCi0eR7mZw42S13bQOll0WRqaz1AnpK0os629veOE8AI0mHHVIkcWoFUFgIYQAAKEyflWSapjmxwO+/tadvtIViQpHoM/21isfjGhw6k/SLjpw4qdImhlHKluhMTON9E5l+myFJ75F0XWd72z2LPO8ZhxTLMDUDKCyEMAAAFJhHjvTdImm7JJlus3qBp9VJ+u6evlEPJYYicNJVWiVJ6k/MeLSUSCSi7p5elTY0UnpZcnr/kGKRWKYWH5X0T5Iu6Wxv+5fO9ralmtzsY48AyATGhAEAoIA8cqTPkPT5xD/jpunasMjTb5R0u6zZQIBCdtTw+OQyTZ3qH9CVl21d8gWh3lOKxaIqbaQlTDacPTai8VMZawWzW9J7OtvbnkzhNYQwADKCljAAABSWt0i6XpIMwzhuGMZSMyH9+Z6+0VdRbChwRyXJU1KuoTNnk3rBiS5rchxawmTe2aPDOnP4bCYWPSDpXZJekGIAo872tuOSzrB3ANiNEAYAgALxyJE+r6yZj6yTvMs1mORLv7mnb3QNJYhC1dnedkbSGZenRCNjY0m9ZnxiQqbbI5e3hALMkHg0roFnTuvMEduHPYlJ+mdJWzrb2/69s70t3cFtH2UvAbAb3ZEAACgc75O0bvYfpttM9u6xRtL39/SN3nx5Y0WYYkSBOmqY3uvHJ5Lr8tLc1KhoZEbTg30qqac1jN2mh6c18MxpzUxE7F70Q7K6Hj1uw7IekXQrewuAnWgJAwBAAXjkSF+NpI/O/ZlpmutTWMRzJd1BSaKAHYmbXo2Njyf15Csu3aKa6moN7L6HkrNRNBzV4N4h9QT77A5gTsvqetRmUwAjOaMlzCS1BigshDAAABSAuPTRuNWiZdagy2VUpLiY9+/pG30dpYkCdSBuuDU+ntw9rdvt1tve/AYNPnyvJntPUnrLFJuJ6ezRYYUe6NVo95gUt3Xx/yZp8zK7Hs1ntwOKbpraAxQWQhgAAPLcw0f61snqiqR44mG4XOneNf77nr7R9ZQqCtCemFmiqenk72nf9Nrt2rxpo45/+6uKTtEgIR2RqYiGDp3Vyfu6debIsN1TUD8l6cbO9rY/7GxvG7J73Tvb205JOsJeBGAnQhgAAPLfpyV55/7ANF3p3ulUyxofhtFIUWieMVxuJTsmjHUcmfrMX39YZnhSJ77zb4pHI5RikiZPT6n/yUGF7u/R8PERxaK2Nn0Zk/RBSdd3trdlurXKfexNAHYihAEAII89fKTvOZJ+78Kfu93upmUs9jmSvkDposAclOGOjU+k1qKlualRf/+pj2ni+CF13flNKR6nJBcQHpvRmcNWq5dTj/VrvH8iE8X1A0mXdba3faGzvS0bqdj97FkAdiKEAQAgn8X1uXl+Om2arlXLXPIf7+kbfQMFjELR2d42Y7jMgbHxiZRfe/Xll+qzH/uIzj7zmLru/KbisRgFmhAem9HZo8PqfrBX3Q/26uyxEUWmopl4q2OSXtnZ3vaGzva2bA7Scy97GYCdCGEAAMhTDx/u2y7plmcHgkl842wYxlGb3uJre/pGN1LSKJwrXzM0dOZMWi+98bmt+uzH/1JnngrqxPe/XrRBTCwS08TApE7vP6OT9/eo+8FenTkyrPDYTKbeMixph6TLO9vbfpbt7e1sbzssKZTLIufABQqLmyIAACD/PHy4zy3psxf9Ii6ZpmvUpreplPTfe/pGn395Y8UUpY68Z7gOTE9PXz89HVZJiTfll9/8/Ofqsx//S334E7erS9KaN75Dhquwv9OMx6Xp4WlNnp7S1NCUpoens9kj69eS/rizvW1/jovhLklvy9F7j3DgAoWFEAYAgPz0DkmXzXtyd7urbHyfayR9UdK7KXLkvVg0KOn3BoeGtGplesMmzQ1iYtG41vyft8v0Fs4ldWwmpqnhaU2fndbU2WlNj4QVj2Z9HJxTkv60s73tuw4plnuUuxAGQIEhhAEAIM88fLivXNInF/q96XZtsPktA3v6Ru+5vLHiu5Q+8lo89r+S/v5418m0Qxjp/CDmwFemVX7Va+T2e+Txu+X2ueUuNRN/Wn83XIYjiyMWiSk8OqPpkbDCo2FNj4Q1Mz6Ty1WKSvonSR/rbG9zUguQuzh4ANjFoAgAAMgvDx/u+5ikT8x7YjfUVVbuX5OBtx2TdP3ljRUH2QPIZze++i2Rt71+u/mHb/29ZS/r3t0P60N/82mVrrtRpetvXvB5pteUWWrKnfjT9JpylyT+7jFlel0yvaYMMzOX5vG4FJmYUXhsRjPjMwqPzig8FtbMhKOm3H5I0rs729uedGK92bZj92FJuRgj6x2d7W3f4MgFCgctYQAAyCMPH+5rkvShhX7vcrn6JGUihCmX9IM9faM3XN5YMcmeQL4y/CtCDwQfW2tHCPPCtufq/YF36Ytf+TeZVavlqV0/7/Oi4aii4ajCS62by7ACG69LLrdLLk/i4U48TEOG2yXDZVh/Nw0ZxrngJhaNKTYTUywSU2QyopmJiGbGZxSZjCru3Km1T0v6iKSvdba3OXn+77uVmxAGQIEhhAEAIL/8jaSyhX5puk1vBt/7CklfkvQH7AbkK1fV6l/v3X/PO06c7Nba1auWvby3/O6rdd9Dj2hv1wMLhjDJisfiikxFFCmOYbDjkr4m6SOd7W2n82B97+KzD4At5yGKAACA/PDQ4VNb44r/QVwLf1nsdptrM7wa79rTN/r77A3kq5KW1v8sqajTv37rv2xZnmEYeslNNyo80kvhpvBxJumGzva2P8yTAEayBufNhQmqC1BYCGEAAMgfd0gyJSk+5785zrhcruosrMdX9vSNXsbuQD4yTM/DnvUvinXe/Rvd9Zv7l728sfFx/cf3fyhv7ToKd2l9kt4uqa2zve23+bTine1tpyTtycFbh6k2QGEhhAEAIA88dPjUzZJeNd/vZsMYw2WcyNLqlEm6c0/faBl7Bvmms71tzFO/+THf2ufqr3Z8Xp13/ybtZY2Nj+sDH/2kTg+Py3vJyyjchUUkfUHS5s72tm86fOyXxdzDrgSwXIwJAwCAwz10+JSRuIFZlGma2Zzq5DJJX5b1rTaQbx4o3fiS50gu/dWOz+nX9+3WO297ozZvTH5298eeekaf/Pw/amBoRL6r3yJXSQWlOr9OSe/vbG/bXwDbcpekP2aXAlgOQhgAAJzvTZKes9STPB5zRZbX6217+kbvubyx4hvsIuSZByS9v3Tji+SuXa/dT92lX9/3fl2ycYNecMNzdMVlW7RudYsaG+rl9VpjXcdiMYV6evXQo4/rV/fcpyef2avSuvXyX/96uUorKdGL7ZP0oc72tp0FtE33yhpQ2GD3AkgXHyAAADjYQ4dPeSXtl7TUtCvhiooybw5WcULS8y5vrHiavYV8sW3H7pWSeub+LHLmuMJ9e6WRE5oeO/Pszz1er9ymW1NTk4rH43K5THnrNsjdfL08dRsozIv1S/q4pH/rbG+LFGDdeVzSNVl8y9d1trf9mGoFFA5awgAA4Gzv1dIBjAzDOCZpSw7Wzy9rfJjnXN5YMcbuQj7obG/r3bZj91FJz6Yo7pp1cteskyT5IlOKTpxRfHpU8ciU4rGo/KZHLn+tzLIGGaaHQrzYpKxuk5/tbG8r5M+C+5TdECZK1QIKCyEMAAAO9dDhU9WS/iqZ55qmaziHq7pF0lckMXU18u1met6mLIa7VO7KlZJWUkpLm5H075L+trO9rbsYPpolvS+L7zdKFQMKCyEMAADO9VeSapI6obvduR4V9LbE+DD/xm5DnrhH0tsohrRNSPq6pDs629u6imi7H2LXA1gOpqgGAMCJV/mHT62V1RUpKW636YTBKb60p2/0GvYe8sQuiiAtByX9uaTVne1t7y2yAEad7W1HZY17AwBpIYQBAMCZPi2pJMnnhgzDKHHAOpfKGh+GuXqRDzfTIUmHKImkRCTdKelWSVs729v+rrO9baiIy4PWMADSRnckAACcdnV/+NT1kn4v2eebpuuUpBaHrP4mSf8q6c3sSeSBX0u6hGJYUJekr0r6Wmd72ymK49zHtKRXUwwA0kEIAwCAw8SlOyQZmv3fUidzt9t02Ca8KTE+zFfYm3C4XZICFMN5piT9SNJ/SOrsbG+LUSQXeZAiAJAuQhgAAJx0ZX/41CslvXj23/E5v1sokHG7zTUO3JR/2NM3Gry8seJR9ioc7J7EYWZQFBqQ1C7pzs72tmGKY1G/lRRTdoZ2GKe4gcLCmDAAADjEg4dPmZI+u9Dv43Mec4y4XK46B26OV9L39/SNVrFn4VSd7W2Dkp6kJCRJ7+xsb/s3Apik6s2YpKez9HYzlDhQWAhhAABwjndIujyZJ86GMYbLOO7g7dkg6WvsVjjcLygCDUv6JcWQErokAUgLIQwAAE64mj98qkzSJ1N9nWma0w7ftNfv6Rt9H3sYDvZzikA/7Wxvo8VFah6mCACkgxAGAAAniOvPJK1M9WUet7s+D7buC3v6Rm9gJ8OhdstqCVLMvk81SBktYQCkhRAGAIBcX8kfOtUo6cMLDfqyiKhpmuvyYBM9kr63p2+0hr0Np+lsb4vImiWpWI1I6qQmpOygpKEsvA9j9AAFhhAGAIDc+xtJZef9JIlAxjCMI4aRN7O6rJP073v6RpmFBk5UzOPC/LyzvW2aKpCazva2uKRHsvBWcUobKCyEMAAA5NCDh05tlfSHS16CzxPImKYr374hfa2kP2Wvw4GKOYS5k92f/kc4RQAgVYQwAADk1mckmUk/e04g4zbd/jzc3s/u7Rt9PrsdTtLZ3hZS9qYcdpIJST+jBqTtIYoAQKoIYQAAyJEHD526SdJr0n29x2NuyKftNayHW9L39vaN1lID4DDPFOE27+psb5tk16ftYWW+u9A4xQwUFkIYAAByYPehU0Zc+nxq4/Ce55RhGL582NZE+DLXaknf3Mv4MHCW7iLc5p3s9vR1trcNS9qf4bdh6nCgwBDCAACQG/9H0rPTNqc6MZJpuhx/wzhP+DLXdkkfohrAQQaKcJvpirR8uykCAKkghAEAINtX7IdOeSXdvtDvkwlk3G7Tka1IDC0Zvsz16b19oy+gRsAheotse5/obG/rZrcv2yMUAYBUEMIAAJB975GU1HguCwUybre7xUkblELwMvdFpgx9d2//aD1VAg7QX2Tbu4tdbotMhzBTFDFQWAhhAADIot2HTlVL+ut0XjsnkBk3TdcKJ2xPmuHL3BetkvStvf2MD4Oc6ymy7e1kl9viGWUwKOlsbyOEAQoMIQwAANnVLmlZMwO5XMbRXG+EDeHLXC+T9FGqBnKsmFrCTEu6n12+fJ3tbRFJj1MSAJK+jqMIAADIjt2HTq2V9L7lLsc0zZx8M5rieC8pvsj4xL7+sRdSS5BDA5JiRbKtDzM1ta1+SxEASBYhDAAA2fMpSaXLXYjHbdZkc6VtbvVy0ZOs/+SS9J19/WMrqCbIhc72tpiKZ4YkWsHY6+EMLTdK0QKFhxAGAIAs2H3o1HWSbrNhUTG329yQjXXOfPhy0VNXSvr2vv4xkxqDHDlVJNt5H7vaVo9maLljFC1QeAhhAADIjs8pjUzjQoZhHDcMI2Pn77S6HElJhy/G/OHLXL+jNAcuBmxQDCFMTNJudrWtDkgaoRgAJIMQBgCADNt96NTLJb3YjmWZput0JtZxWcFLCuFLkv56X//YS6g5yIG+ItjG/Z3tbQQGNupsb4uLcWEAJIkQBgCADHrgUK9L0h12Lc/jNkvtXL8sjfeSzvXJf+7rH2uiBiHLiqElzKPs5owIZmCZ4xQrUHgIYQAAyKx3xBW/Ii7rv+Vyu922jAeTg/FeUtUo6b8YHwZZVgwtYWixkT/lOkOxAoWHEAYAgAx54FCvX9In5/4sPue/NAy6XEZZuuuT4SmmkxnvJVUvkvQJahKyqLcItvExdnNGPEIRAEgGIQwAAJnzZ5KaF/plqoGM6XJ1pbMSmWv1Yj0xzS5HyWrf3z+2jaqELOkvgm18ht1sv872tq4M1B/G7gEKECEMAAAZ8MCh3hWSPpzs85MJZNxuM6XmMw4d7yXVVTEkfXt//1gztQpZUOgtYfo629vOspszxu4uSTGKFCg8hDAAAGTGxyWVp/PChQIZt8dcmczrczzF9LIs0PupQdJ39/ePualWyLBCbwmzl12cUXZ3SYpTpEDhIYQBAMBmDxzq3SIpYM8V+LP/TblNc8HWINka7yVTkliNmyR9itqFTOpsbxtUYQ+Guo+9nFF2t4QZpkiBwkMIAwCA/T4jydZZfVyGcWS+nxdIl6NkfXh//9jLqV7IsIEC3raj7N6MYnBeAEtf01EEAADY54GDvS9QXK+1e7mm2xyf++88mGJ6ydVIc/nf2j8w1kJNQwb1FPC2dbF7M6ezvW3A5jKOZHylt3/I1PYPXa7tH7pF2z/UyF4EMo++1QAA2OSBg72GpM9LOr8nvw1phtftrk57UUnPcpRZhj0vrpP0/f0DYy/c2lA+Q61DBhRySxhCmMx7QtIam5Y1lpE13P4hQ9Ktkm6T9DpJlc++3/YPNWnnHePsRiBzCGEAALDPGyQ996KfLj+QiXvc5oaUx3tJ8ol5Er7M9XxJt0v6IFUOGXCygLftBLs34w47ds22f6hc0lslvU/S1nmeUS6pXhIhDJBBhDAAANjggYO93kQwsLg0AhnDME4YhrEuuScn/6Q8DF/m+vMDA2P3bmko/ym1DzbrLtDtCkvqY/dm3EEblzVhy1K2f6hO0ntlhS91izxzRoXdHQ9wBEIYAADs8W5JG1N6RZKBjOlyDUhat+iyHBK+GBlewAW//uaBgbFrtzSU8+0+7FSoIUxPZ3sbUx5nnp0hzPJapGz/UL2sFoPvlVSWxCt2aecddPMEMowQBgCAZbr/YG91XPrYAkFBchYJZDwed8mCryus8V5SfUqNpDsPDIy9YEtDeZiaCJuE2C4sg53dkdILYbZ/qFrSR5R8+DLr6+w+IPMIYQAAWL6PaE4T7wu/ak45oLggkPG4zbXpLbBgw5e5WiXdIekDVEPYpFAHryWEyV45T0kqtWFZZ1N6thW+fCDxqErxvfZJ+gG7D8g8pqgGAGAZ7j/Yu1rS+xd7TnzOI2VxDZkul3UxndIU00bGux0ZGXpxGlNYv//AwNjrqI2w8Sa6EDEzUhYkunzZ1RomuTFhtn+oXNs/9DFJxyV9XKkHMJL0Z9p5R4w9CGQeIQwAAMvzaaXwjWeqgYzpcnWlFr5kbsyXNMKR+ReQ3q+X8u8HBsY2UB1hw030qKSRAtw0WsJkj10hzOJTVG//kE/bP/QRWeHLJ5Re+CJJX9fOO36x6AadnvQcPj1psGuB5aM7EgAAabr/YO81kn4/3dcnMy6v22NGFl9KUXQ5Ska1pDsPDIy3bWkom6Z2Ypl6JFUW2DYRwmSPXSHM6Xl/uv1DPkkBSR+W1LTM99gv6U/m3YjTkxslvVzSNkkrJd0oa5YtAMtACAMAQPo+b1eGsFAg4/W4G+d/BeHLPEu7TtIXZA1GCSxHl6StBbZNhDDZc8ym5ZwfwtgbvkhWS5vXa+cdY5J0eHCyTNKLJL1M0ssU18Y5H9Q3b6rzEcAANiCEAQAgDfcf7H2ZpJdkYtlzApmw222uPvfPzE8xvezlGxlcdhJLNKQ/Pjgwfs/mhrL/ppZiGQoxsDjObs0au8bfGZAkbf9QjaR3yxpwd4VNy45Jesvhb3zCLX3ig7JavLxAkveiE5Khf91U57uP3QrYgxAGAIAU3X+w1yVrRp6MMgzjqKSttHpZeokXLP9rBwfGn9zcUHaI2oo0HS+w7RnpbG8bYLfmV/3Zd/TJOm3/0D9JertSm2p6QVVlPt14+Ua96+Vtj1y1flVHXGpe4vO5T3F9mF0K2IcQBgCA1L1d0pWZfhOP2xzJdPySh12Okll+paQ7Dw6MP29zQ9kU1RVpOFZg23OUXZpVJ+xYSKjvxF3LXYbpcumK9c26+cpNuvnKS3TVhlVyGYYkPW/2OfHFP6s/sKned4ZdCtiHEAYAgBTcf7DXJ+lvs/FeXo87YwOD5nP4kuSyr5b0RVlN+IFUHS+w7TnMLs2ezva20W07dp+RVJPuMqbDU4rH05sxekV1hV5wxSbdfOUmveCKjaoq8y35mgWCmF9sqvd9lz0K2IsQBgCAFMSlPzOk5my8l8fjtnXKZSPDC8hyl6NkBBLjw3ATgVQdL7DtIYTJTR1KO4SZnB5P/lzhNvWcS9bopis36aYrL9HW1Y3pnt/mfs5OSvojdiNgP0IYAACSdN/B3gZJH05maunlMgzjpMswVtuyrAy/2IHhy1z/enBg/InNDWX7qcFIQY+kGUmeAtkeQpjs65J0bbovnpyaWPT3qxtqdPNVl+jmKzfq+ZdukK/Ea8tKzwliPrap3nec3QjYjxAGAIDkfVxSxYUXrDaFBecxTVefpGWFMAU63kuqiy2XdOfBwfEbNteXTVKFkYzO9rbYth27uyRtLJBNIoTJvuPLefHoxMh5//aVePW8S9fppis26earNmnNitoMfRZLcelxw+rOCSADCGEAAEjCfQd7N0sKLHHhattFsdftTvscXQTjvaS62CskfUnSH1CTkeJNNCEM0rWsaapHxs5qy+pGveCKjXrhVZfo+kvWyOM2Fzz3GEsNr5u8mKTApnpfhF0IZAYhDAAAybk9lfPmcgMZr8e9JpXnF+F4LymtqCG969Dg+D2X1Jd9m6qMJB0vkO0Y7mxv62Z3Or/++EtMbV1Voa0t5frYG9+qFdUVSb/WxiDmS5fU+4LsPiBzCGEAAFjCfQd7b5T0u+m+Po1AZtg0XbXJPJEuR4sv5IJfdRwaHH/8kvqyPdRqJOFIgWzHU+zKnFhymmqXYWhNg0+Xra7UpasrtK6hTMYyPhRtCGJOSvprdh2QWYQwAAAs4r6DvYakz9m1vGQCGdPlOiHpqsWWQ/iixVq9LMQv6fuHBsdvuKS+bJzajSUcLJDt2MuuzIl5Q5gqv0dbWyp02epKbW2pUFmJaeubLjOIee8l9b5Rdh2QWYQwAAAs7vWSnp+JBS8UyHjc5vRCr8lk+FIAXY6ScZmkL0t6O1UbSyiUcVQIYXKgs71tcNuO3eOmyyjb2FSmS1us1i6ran0XnQcyMLBuOkHMDy+p9/2EPQdkHiEMAAALuO9gr1fWWDAZNzeQ8XjdK+b+jvFeFl9QGst/W2J8mG9Qy7GIQglhnmFXZteBgYkNkl5+oHs0ur6xTF63a9EP/7iR8yBmVNL72HNAdrgoAgAAFhSQtCnL7xnxmO61Slw6p31hbiy9gGUtP4k3tGX5i2zHMpf/L4cGx6+kimMhne1t45JCBbApjIGUYQcGJsoODExsPzAw8aUDAxOHZY0n9E9bVlVULhrAzIqfH8TbJT7n/0v4yCX1vh72JJAdtIQBAGAe9x3orVJcH89AM5FFGYZx1GVoc/oLsOUpy3rDHI33kqpSSXceGhx/ziX1ZWPUeCzgsKSWPF7/ns72tj52o/32D0xcZUjbJL1c0gskeZe1wNy1iHlI0lfYo0D2EMIAADC/j0iqW/Zc0ynyuM2zab2QLkfp2JK4+fh9qjsWcEjSLXm8/o+yC+2xf2CiRtLvSHqZpJdKarZ9PJfsBzERSf/vknpfjD0MZA8hDAAAF/jNgZ6WuOIfMC68YM1CIFPicZcn/eSst3q5eIlZnmI6E1tz2+HB8d9sqi/7KjUf89175/n6/5ZdmOaOH5gwJT1HVujyMkk3aJ6hHPI8iPn8JfW+p9nbQHYRwgAAcLFPSSqNz0ldFg1kbEwLvG73hmSSAxuekoLsdjmyf/2XXP4/Hh4cf2RTfdkTVH1cIN9nFqIlTAr2D0w0y+pi9DJZrV5qk3ldngYxRyV9kr0OZB8hDAAAc/zmQM/Vkt568cXrIoHM7NXtMhMEw1CPy2U0J5scpPmUVNYoM8vObpejZJZfIunOw4Pj122qLxvlKMAc+T6z0OPswoXtH5jwyhrP5aWygper0l1WHgYxgUvqfZPUAiD7mB0JAIDzfW6pa+n4nP8WvMqdfaTAdJm9C6YHScxyZP9MR0m9fbqLtX/5qb3thTZJ+leqP+bqbG8LSRrO09U/2dnexow3F9g3MLFh38DEH+8bmPiJpCFJd0n6kJYRwMz96LdV5mZN+vYl9b5d1AYgN2gJAwBAwm8O9GyT1QQ9hYtZ+1rIeD2mkexzk3xKigpuvJdUvenw4Ph9m+rLvszRgDmeltVaIt88yK6T9g1MlEl6kazWLi+XtHHux3NmWprYu0CbW8QMSfozagaQO4QwAABI+s2BHpesVjDLuFZeXiBT4nGvYbyXjL1tsv7u8ODEQ5vq/YylgVl7lJ8hzAPFusP29Y9fJcNIavroIgxiPri53j/AYQ3kDiEMAACWt8qG5ujnrplTDmTG3G6zPsMBw4JLK+DxXlJdilfS9w+fnrhuU51/mMMCyt9xYR4qlh20r3/8oumjFY9LRnKfDEUUxNwj6Rsc0kBuEcIAAIrebw70+GTNiJQRyQQyLpfrmKQrMxMuLLxEwhdjvr9ukPQ1SW/g6ICkM3m4zuOSHivUHbK3f9xlSK1aYvpogpjzTEsKbK73xzmkgdwihAEAQPpTSauy8UYLBTJejzllb7iw+NKKcLyXhZcw/2DBrz9yeuIDG+v8X+TwKHqePFzn+zvb2yKFtBP29o+vlNXK5aWStsWl2qQ+BwhiZu3YXO8/yOEM5B4hDACgqP3mQE+DpA/n4r3nBjIlXnedPeHCAkHDwnmDHYu1d/kZXfbC4cs8y7/jyOmJ3Rvr/I9wpCDP3JPvG7C3f9wr6Uad62J09cWfoUl+LhDE7JP0GQ4LwBkIYQAAxe5jkipzvA4xr9tcZ+8U04uGC3Ys1v7lK1PLN1L551weSd87cnriuo11/jMcKkXLzMN1vicfC3pv//gGneti9CJJ5Uu9hiAmKf9vc70/zKEMOAMhDNL2nq/86ooDJ/oP3nX7bXyoA8hL9x7ouSQuvdvI8XoYhnHUMIxNNiwp2XBhOYu1f/nK1PKX7HKUjHWS/v3I6Ynf3VjHWApF6vo8W99RSb/NhxXd2z/ul/RiSbMzGaX1OUgQs6h/3Vzvv5/DGHAOQhik7ZK1K7bfdN2mTz//6t2nnjrYvXt8MvyopKckPXXX7beFKCEAeeB2Se54FoOF+Xjc5jJaWTDey6JLMGxZ9msl/bmkz3PIFKWX5dn63uXk8WD29I9fKemlhlWuN2mR6aNTQRAzrz5JH+IQBpzFoAiwHP+8a89/Xbu15S0zkaj2Hj2lx/af1NHQacXj8bOSnkw8npYVzjxz1+23TVBqAJzg3gM9bZIecMJJssJf+rS/1Hvlck/hmQxf8miK6XkXaMPyI5Ju3ljnf5Cjp3hs27H7Rkn51orgPZ3tbf/ilJXZY00ffausli7bNGcQ9Ex8riS9TMOwf5m5vAmbP4h5y+Z6/3c5kgFnIYTBsn39voOPbV3feO3sv4fHJvX4/pAePxDS6bPjc58al3RYidYyiceTko7fdfttNPEGkFX3Huh5QFKbE06Y9dXl46bLVZbOmtDlKO3xXtJxUtI1G+v8QxxBxWHbjt3fkPS2PFvtjZ3tbUdz9eZ7+sddsqaPfqms1i7P1XzTR2fwM4YgRpL08831/ldwFAPOQwiDZfv0j4LeTasbTq5pqllx4e9O9A7p8f0hPX24R9PhBVvGjslqLTO31cxTd91+2wilCyAT7j3Q83pJ/+2Qk2dfY21lY6rvSpcjW8Z7Scf/SnoV48MUvm07dq+R9eVRPk1RfaSzvW1Ttt90zwXTR0uqzfUNSZEHMROSLt9c7z/OkQw4DyEMbPGZ/3m08fKNTcfqq8t98/1+nu5KySz2hKxg5imdC2kO33X7bVFKHEC67j3Q45G0R9IlTjiZuk3zsbqqsuuSXTLhS0a7HCX7zn+5oc7PdK8FbtuO3f8i6d15ttpf6mxv+5NMv8meJKaPdsJNSREHMX+xpd7PGFaAQxHCwDZ3/OSx5113acsDZb4S12LPGx6b1BMHuvX4/pMaPL+7UjImJe3VuVYzT8pqNXOaPQAgGfce6HmvpC855cRaVup9tNxfev1iS6HL0QVLMXK+/lFJt2yoY8aRQrVtx+4tkp5R/k1i0dbZ3paRcYue6Tt/+mjDWHr6aCfcmBRhEPO4pBu2NPgjHMmAMxHCwFaf3/n4W2+4Yu03PW4zqed3nTqjx/ef1NOHejQVXta5okfnxpmZDWf233X7bTPsFQCz7j3QUynpiKR6p5xkayvLTnncZtN8ryB8yVmXo2SW3y3pmg11/kGOrMKzbcfun0ranmerfbizvc22Fn7P9C09fbRhOPFzYxnLzP8gJibpeVsa/EGOYsC5CGFgu3/85VOfa7187QdTeU0kGtPeo716bF9IR0KDyXZXWsqMpH06fyDgp+66/bZe9hJQnO490PNpSe0OOuFONNZW+hnvZZElZDl8SXHZv5T0ig11/hhHV+HYtmP3ayT9OA9X/X2d7W3/tJwFPNNnTR+tFKaPJohx1Lb/w5YG/wc4igFnI4RBRnTcve+XV13SvC2d146MT1mzK6XXXSkZg7ogmJG0567bb5tizwGF694DPS2SDkkqdcrJ13S59tRXV1xu60k5R+FLAXY5StZfb6jzf4ojrDBs27G7Qla355Y8W/XTktZ0trdNpPKiZ/oWnj46peOHIMYJ235S0uVbGvyjHMmAsxHCIGO+9eDhQ5tWNyxrhH4buystJZq4OZudNvtpWa1mTrAngcJw74Ger0t6u5PWqdTrCdaU+1szeUZnvJeMr39M0os31Pnv5SjLf9t27O6Q9P/ycNU/3NnedsdST3q6z5o+2khy+uiUjiWCmFxv+2u2NPh/wlEMOB8hDDLm0z8Klm9d1xhqbqiqWu6yMtRdKRnDmjMAcOLvT991+21j7GEgf9x7oOcqSU847bxXU+4/VOr1LG8MB8Z7ccIFUK+s8WH6Odry17Ydu18u6Wd5uOohSZs729sm5/vl031jF0wfbdRmLDggiMnVtv9wS4P/9RzFQH4ghEFG3f7j315y9eZVe2oq/R67ljnbXemJAyENnMlJFhKXdEznWs3Mdmk6etfttzEuAOBA9xzo+aWkbQ476cWbaipjhmGYKb+S8V6cddFjLfguQ3rp+lp/lCMu/2zbsbs+cS5fmYer/47O9rZvzP7j6b6xJKaPNjIXHBDEZHs9RyVt3dLg7+FIBvIDIQwy7o6fPvay1svW/Ky0xGN7fQv1ndVj+0/qqUM9mprO+URI45L26PxWM0/edfttZ6kFQO7cs7/nVkm/ynY3l6Wv641jTTWV6+06azPeSw7Kxrho+Z9YX+v/G466/LJtx25D0v/KGhcl3+yW9IIvvOuq9ZozfbSUzPTRBDEFEsT88ZYG/z9zJAP5gxAGWfH3P3/yT1svX/t3piszVS4SjWnf0VN6bP9JHTk5qFj2uisl46QuHgj44F233xahZgCZdc/+Hpekx3ThN8EOCGS8bnewrrIsufFgCqHLUQ7KPYvhy6yYpG3ra/13cfTlj207dv+5pM/n0zp73S5d0lwee93zm79XU+5t1TzTR6dSmQli7N2gLK7ng5JesKWBGdqAfEIIg6z5p1898/XrL1399ky/z+j4lB4/0K3H95/MVXelZEzLmj77SZ0/EDDjCQA2umd/z1slfXMZOUHGVPpLnyorLbkqnbM0XY5ycHFjJL3sPknXrK/1n+IIdL5tO3bfKOkeSW6nr+vKmlJtaanQ1pYKbWgqk31fbBHE5GkQE5F03ZYG/9McyUB+IYRBVv37bw48dOmGpudm6/0c1l0pGX26uNXM3rtuvy1M7QFSc8/+Hp+kg0plqtksBjINVRWjbtNVkcqZOZ/DlwJs9bKY30h6MePDONu2HbubZLWUc+Q4ML4SU5uby7W1pVKbW8pVNWd4PSNDFZ0gxt4NyvB63r6lwd/OkQzkH0IYZNWnfxR0b1hVf2Jdc21zNt/X4d2Vllx9Sft1bpam2VYzIWoUsLB79vd8RNLtdp0hbT5hnl5ZW1WXzBswxXSOLmSM5SzfkKRPr6/1/RVHojNt27HbK2mXpJscc1FuSKvr/dqyqkJbV1doTYN/0ft9gpgcLjP3QcwRSVduafBPcjQD+YcQBln36R8F66/YuPLEitoKfy7ef3R8Sk8c6NbjB0LqHxrN56Ic0sXTZz9z1+23TVDLUOzu2d9TL+mwpKpMnC2Xe/J0m67HG6oqrl1sYYz3kqMLmOWHL7Pikl62vtbXyRHpPNt27P6apHfmej0q/R5tWVWuLasqtHlVhfwlZkqVnCAmh8vMbRDzO1sb/Ls4koH8RAiDnPjsTx699rqtq4Pl511tZL/ih/rP6rF9IT11qFuT+dFdaSmxxI3n3FYzT0o6ftftt8WpeSgW9+zv+UdJ78vGmTOdE2lZacmjlWWl1+fixMx4Lwsv1LB/rQYkXbu+1tfNUekc23bs/lNJf5eL9zZdhtY3lmlLS4W2rKpQc23psis8QUwOl5mbIOZbWxv8b+VIBvIXIQxy5nM7H3/LDZev/S+vx8x5pY9GY9p3rE+P7T+pQ10D+dZdKRmjSnRj0rlWM0/ddfttI9REFJp79vdskrRXkifbHyrJnlTrKstCXo+7JZsnZMZ7WXjBRmbX6gFDumVdrY8Z8Rxg247dL5e0U5IrW+9ZV+F9NnTZuLJcpR6X7VWNICaHy8xuEDMkaevWBv8ARzOQvwhhkFP/8IunPtV6+ZqPGobhmEo/OjmtJ/aH9Nj+vO+ulIzjungg4MN33X4bg0kib92zv+e/Jb3eCWfVBT5vppvqqkoMMd5Lzi5SshO+zH3mZ9fV+j7C0Zlb23bsvlTSQ5IqM/k+HrdLm1aWW92MWipUX1my/LpNEJOTzwsHBjHv2Nrg/wZHM5DfCGGQc1/59d6fXr151XZHVPgLntCd6K705MGC6a6UjElJe3QulHlS0tN33X7baWornO6e/T3Pl7TbiWfY2X+6XMa+pprKS519ci/cLkfpL99Y7rNesa7W93OO0tzYtmN3g6wAZkMmlt9UU6otqyq0paVC6xvL5DYN++s5QUxOPjscFMTcLeklWxv8dC8H8hwhDBzhmw8c2rt57Yrc35QscJEejca199gpPbavYLsrJaNb57o0zY43s/+u22+boQbDKe7Z33O/pBudfLb1eT2P1Fb4b3DmST134YszW70k/8oknnVa0nXran1dHKnZtW3Hbr+kuyQ9z65l+kpMXbKyXFtbKrS5peK86aMzWu8JYnLyWeKAIGZa0lVbG/wHOaKB/EcIA0f49I+C/i1rV5xctaK6NmeVfcF7j/P/NToxrScOhPTY/pPqOz1a7LtuRtbYG+fN0nTX7bf1UquRbXfv7/5dST+wjlrnnt5qKvwH/CWeLc46kdPlKN21SnH5D0m6eV2tj/A6S7bt2G1K+pGkVy03LGip92vrKit0WbvE9NEZPQYIYnLyuZLjIOZjWxv8f8sRDRQGQhg4xu0//u3aqy5ZdbC2yu/NekVf9MvfhV/d3T+sx/af1JMHuzUxFWYnnjOg81vNPCVp71233zZF0SAT7t7f7ZbVjW7zxUews051K+sqZ1yGsexBgwlfFl+ww8KXub6wrtb3QY7a7Ni2Y/e/SHp3Oq+t8Lm1OTGg7tzpow0nHA8EMTn5jMlRELNP0jVbG/xcaAIFghAGjnLHTx974XMuXXO3r9RjZLWSJ9kKZqGXRaMx7Tvep0f3ndTBrn7FYnTXnUdU0kFd3GrmBEWD5bp7f/cfS/qnpQ/13J72DMM40VxXuTa3J26mmE53rWxc91evq/X9lCM3s7bt2N0u6dPJPt90GVrXWPbs2C4rF5k+miAmE5+P+fF5k4Mg5gVbG/wPcEQDhYMQBo7zd//7xHtuuGLtl03TlZ0KnmYAs9Azxiam9fiBkB6lu1KyhnXxDE3P3HX7bWMUDZJx9/7uCklHJDWk9vmQ/VOg12P+tqGq/Dm5OWEz3ku6a5aB9T8j6fp1tb5jHMGZsW3H7rdJ+sZSz6ut8D4bumxaWS5vCtNHE8RkYPsJYi701a0N/gBHNFBYCGHgSF/qfPpfnnPZmndnvILbHMBcqLt/WI/SXSkdcUlHda7VzOxAwEfvuv22GMWDue7e3/0pSR9d3mdFdk6HlWWlT1b4Sq7O7kmaLkfprlWGyydoGHrB2hofJwebbduxe7ukH0q6qNufNX10mTavqtCWlvILpo82HFHHCWLy47MoC0FMn6StWxv8ZzmqgcJCCAPH+rd7999/+caVN2asci96M2LYeuDE5nRXOkB3peUYlxXGzI4385Skp+66/TYuUIrU3fu7V0k6JMln34kxc6fGxpqKs27TVZ35k7ORyj/z5+KiAMKXC+7H/mFtje8DHMn22bZj902Sfjn3M6GpplSbV5Vb00evmDN9tGHP3ieIyfhx4tjPpQwHMW/e2uD/Hkc1UHgIYeBYn/5R0LWuue74hlV1qzNSsZc5DkzK65L4y9jEtJ442K1H951U7+AIO9oeXUqMMaNzrWYO3nX7bRGKprDdvb/7a5LembmTpK2nybOr6quqM3tSZryXdNcq42Wz8Bv87toa3484mpdv247dV0v6jc9rVm5qtkKXzavKL5o+2lhyxxPEpPqmBDH2bpAh/Xxrg/8VHNVAYSKEgaN9+kfB2ss3rDzRWFdRbmvFznA3pIueu8CLegaG9ei+k3riYLfGJ2mRbrNpWbPlXDgQcD9FUxju3t99ZWLfZuVcttxAxm26nmysqbg6Mydjuhylu2Y5DF9mDUu6fm2N7whHdXoe7x11PXls+LWnR6b/Y+PK8rI1SUwfTRBj/1oSxNi2QROSLru0wc/EBUCBIoSB433mfx694rqtLY9XlJW6banUaU5Hnc4BYyT5wmgspv3H+q3uSif6FY0x7EkGndLFrWb23nX7baRgeebu/d0/l/Sy3Jw8Uz99lpV6f1td7nuOvSdgwpd018oB4ctcj0lqW1vjm+bITs7jvaNNkl4q6WXxuF5qGKpZVm0hiLFlLQlibNmgD17a4P8CRzlQuAhhkBc+t/Px195w+Zofej1uY9kVOkfdkJJd9tjktB4/QHelLItI2q/zZ2h6+q7bbwtRNM509/7uWyX9yhkn0uQ+Heqryk6UeNxrGe9l8QVnMnxxWPByoS+vrfG9l6N7fo/1jnoNqU1W8PoySVfbXp8JYmxZS4KYZW3Q45JuuLTBT3dqoIARwiBvfPEXT/71DZev/aSxwIkrF9NRL/lcY3kHYs/AsH5Ld6VcGtL5wcyTslrNTFA0uXP3/m6XpEclXeO8k+qCB/3Mqroqz/JuJBjvJd21cnj4Mtf/WVvj+2+OcstjvaMblGjtIunFksozfuNMEGPLWhLEpLVBMUnPvbTB/1uOfqCwEcIgr/zzXXu+f+2Wlv+TVmXOdgBj4wVQNBbTProrOUVM0mFdHM6cuOv225j2Kgt+vb/7/0r6D6efxOYGMi6XcaC5tnLLsk/VtHpJac3yKHyZNSbpurU1vkPFeGw/1jv6/9u78/DI8oLe/59TW5ZK0nvS6UkvszLdk+7pZdI9wICCIMMwA+MV9cp4Fa9eehAdNhX1/sTnepFhE1EUaPiJwiiigOygyIyCOFt6emCYXmftJL0n6eyp9Zz7R1V1KtVVSS3nVJ1z6v16nnqynXzPkjrnfM8n36Vd0su0ELxc25AHZ4IYW7aSIKbiHfrzreva38ZdHvA/Qhh4zt/+11NPvGBz9/aK3sh1nI662m5I5VZoZuYzsysdPDqs0xcmeUO4x7QWxprJBTNP3n/vXfQps9EDx061STouaaOXbmhtkcija7va91Z9iyZ8kYfHe6l0L38k6eZNq9pizXBOHzoz3a9M6PJqSbdIanHFgzNBjC1bSRBT9g4NKzMY7wx3esD/CGHgOX/y5cHItZvWndrYs2pt2W9iF44DU/5ipSsyZ0andPDokA4dH6G7kns9r4UBgHOzND1z/713pTk0lXvg2Kl3SXqf125uqzvaj0ZbI1truFjVJ1xwuNAmHu+l0u0/sGlV291+PIcPnZleJemnlAldXiXpCtc+OBPE2LKVBDFl7dDrtq5r/xp3eaA5EMLAk+79ysErtl+z4ek1K6OtXpmOupbHiuWWNS1LR58/p4NHh3TsOborecC8pCe1uNXME/ffe9c4h6a0B46eWiPpGUkrKjk53XCj27C6Kx4MBFqqTSoY76Vxf986hy/57tq0qu1zXj9vHzszHZB0k6RbjUzocrOkgGcenAlibNlKgpglfWlrd/T13OWB5kEIA896/9cOvWhg28b/bG+NBKp7rvFWN6RyC5ubT+jQ8RG6K3nTKS2ePvsJScfvv/euJIdGeuDoqY9IemstJ2sjbnqGYYz0rVnRV+lFii5Hjf1bNjB8yZmVdNOmVW3HvHauPpY3fbSkV0pa46owotIyCWJs2UqCmKKmJG3d2h09zV0eaB6EMPC0P/3m47+2r3/L/x8KBip8vvFJALPMg9vp0SkdPEJ3JY9LSjqixQMBP3H/vXedbaaD8MDRU1dLOiopbOfJW4+bYCQUfKxnZeeeMi9OhC8N/Ju5IHgpXPpJSXs3rWqdd/P5+djp6YgKp482XB5GVFomQYwtW0kQc5m3bO2OfoyqDtBcCGHgeR/9zo8/MrBt05L/HfdrN6RyH95Mc6G70lG6K/nFBV0+Q9PR+++9y5eDeT5w9NQ/Sfo5J+9wTt0Qu9pbH1/R3rqLLke1XhEdPDbuC1/y/fWmVa2/7rZz8rHTl08fXcmOE8Q0eN8JYtzwd3pI0i1bu6NUyoAmQwgDX/jUvx/97vZrN/xUsXe216ajLruiUuV/z2fnE/rhiVMaPDqkU+fpruQzaUkntDAQcK7VzJCXd+qBo6f2SXq4nnc7O2+O61d2jYVDwTWlCna0ZYfDBRO+2HvNX8IbN61q/Uwjz8PHTpc3fXQlu0YQ0+B9J4hp5N8pJWn31u7oj6m6AM2HEAa+8N4vDwY2r1/99NUb117pp+moyy2s2u0+Mzalg0eGdej4iKbn4ryR/GtSC2PM5MabOXz/vXd5YirMB46e+k9lpq5tyJ2vxhvl9Ma1qzrpcmRzJOHChzWH93ROmW5Jh+t57h08vXj6aKPM6aMr2U2CmAbvO0FMo/5O927tjv4B1ROgORHCwDfe++XBjq1Xrj/Vu66rq/gb3NvTUS9VmFHjSW+alo6dPKfBI8M68vw5pdO0jG0ClqRndfn02c/df+9drnkDPHD01J2SvuyWu2Cl14lQMPBE7+oVO+oWLjhcMOO92LXtVT2wH5G0d+Oq1lmn9uHg6aki00cb9vyNCGLcu+8EMfXe/2ckbd/WHXX1WE8APFhfAxrh/V977LqdL7ji8IqOtlCzjwNT7bbMxRI6dJzuSk1sVgtdmXLhzI/vv/euiXpvyANHT4UkHZZ0nRvviOUsHm1tGVzd2T7AeC+Nq4h4sNXLUvebz2xc2fpGu7b94OmpgKQ9yoQuPy3phSo6fTRBTNEyCWJs2comDGJeua07+l2qG0DzIoSB73zw64du29e/+RstkZBR7lu92bohlbvsmbEpDR4d1qFjdFeChlQwQ5Okp+6/966UUyt84Oip35D0V164O5ZafN2KjufaIuErPXUDJ3yxefttCV/y/frGla1/Xe12Hzw9tV6ZwOXW7Mc11ewHQcxSKyCIqXSlTRTE3LetO/rLVCmA5kYIA1/6yLd/9Lv7+je/PxAw5NfpqA2HT3Yj75cysyud1+DRIR15ju5KuCSuTEuVRbM03X/vXaO1Fnz/0VOdkp6W1N3wm1X1gUx649qVAcOw91GALkf1f/Cq156WOdh7TNLejStbyxrQc/D0VFjSi42FAXV32rX3BDFLrYAgptKVNkEQMy7p+m3d0QtUH4DmRggD3/r4d5/8u91bN91l50ngp3Fgll2+RA1zLpbQ49nuSsPnJnijoZizurzVzJH7770rWW4B9x899X8l/X+uu3FVsPKAYTy1ce3Kaxuw6qoKdjJ8afIppm2/t0g6LummjStbiw6uPXh66kplApdXKTPGS4d9fweCmKJlEsTYspU+D2J+dVt39G+pIgAghIGv/c0PTgxuu3L9TXacAF6cjrqm/Sxjh8+OTevgkSEdPDZMdyUsJyXpmBZPn/2j+++963ThgvcfPbVBmVYwba6+iS2z8rZIeLB7RceAK2/UdDmyeftt73JUjr/fuLL1lyRp8PRUu6Sf1ELwcp2zfxOCmPJvlQQxla7Up0HMA5Jesa07alEdAEAIA19775cPRq7ZuHZoc+/qnlrf/M0yDkyZtcpFPzEtS8ey3ZUOP3tWKboroXzjygYyyg4E/Hu/9BNvCQSMN3rqhlZk5as72g93trXc4KqbM+GLzdvfkPBFkpQyLc0k01+Kpc0Vkl6iCqaPJohxsEyCGFu20mdBTFzSjm3d0RPc8gE0vM4K1MN7v3ywe8e1G55ft6qjreYgo8HjwFS67XZ2Qyq37PzZleiuhEqtWxnVr99xk2odRqXhNzdD6luzYi4YCLS7YrsZ78XmbXdsvJeSTEtKpE3F06YSpqW0ZbngHCGIKf/vSxBT6Up9FMT84bbu6Hu4wwNwTT0VqIcPfO3QwJ6tGx/uaG8JVPrG9/N01Jcta5RfQjllnx2b1iDdlVCBX/ip7br6ijW2ltmIG51h6OymdavWN3QbjVrLp9WLrQ/SVexH0rQUzwYvybRl+4EniHGwTIIYW7bSB0HMEUm7tnVHE9zhATSybgo0xJ9+84e/tK9/832RUNCxCnSzdUMqt+xcd6VH6a6EJWzpXaU3vPJGX9z0IqHgod7VXbsbsj10ObJ5++vX5ci0LMXTC8GLuVzuQhDjuusBQYz9W+nxIOaWbd3R/+IOD6AR9VHAFT76rz9+397+ze8yKj1Bmmg66uVKqHVb5uNJHTo+okePDmvo7EXelMhWiA396mt2a/3qTl/cAFdEWw+tjLbtrut66XLkij2tNHzJdDHKBC9J06p8qwhiXHcdIIixfys9GsQc2NYdvZs7PIB616UA1/nUfxz91o3XXvFquyvSfpyO2payl/jhufFpPXpkWAePDmtqNsabs4n1X9Wj196y1Tc3w/WrOs+1hEM9dbnh+iB8aaYuR2nLUjyVbe1imqpmaBeCGPdXhgli7N9KjwUx5yRdv607OsEdHkA961SAa/3dQ08fv25Td3lTeNINqbayy/ihZVk6fvK8Hj0yrB8/c4buSk0mFAzo7jv3qiva6pcb4+zm7lVRR2+0dDlyYPudCV8sLW7tkjItZ/aNIMZ1FWKCGPu30kNBzC9s647+E3d4AEXrvhwCNKPhsxN7oq0tw1d0r1hZv4pG8wQwlW5kwDC0dUuPtm7pudRd6ZEjdFdqFjddf4VrApjcQ3Mt7/1gIPCsIW13MlUgfLH3ulx1+SV+PWVaimWDl4RDobJVuHqr9j+cZcvffnEpVZe5xC9aDrxHHS+z6AoqX6sr9r2MX7B/OzMlOrL/lu3XpG8RwABoZD0LcK33feWxq3e94Iojq7raI5VUrmup6NMNqbJ9zHVXGqS7km+1tYT1Gz+zTy0Rb/xPoJxzoaM1Mri2KzrgxIoZ76Vxe7rU5dK0dGkw3Xi6+PTRRr32mRYxrqsY0yLG/q10cYuYOUnbbuiOnuQOD6BR9S3A1T709UOvHLhh87+2tYQXZxJMR11b2RX8sJyyLcvSMbor+dIrBq7WwNa+vPeDd25Lpba0s7Xl/Jqu9m47V8J4L3Ztu31djpKXWruYSqSthh5nghj3V44JYuzfSpcGMe+8oTv6Ye7uABpV7wI84SPf/tE9+/o3/3kwEGA6arvKLvOHlT48GcrOrnTilB49MqTnz4zzBvawlZ2t2v+6vQoEjCX+4t66mVqWtHHdCoUCgZoLo8uRvdfgqsvPfmJaC6FLPG2p2qFdCGLs3xiCmAbvO0FMzuOS9t7QHU1xhwfQyDoY4Akf+7cnPzWwbdOv21+ZcFcAc2n5endDsimAKXT+4oweOTKkwaNDmpyhu5LX3PnSbdq6ZV0N7wD3mZyJaedVvTXdkQlf7L3+Vlu+ZeQG1DVLTB9t1GEfaiyXIMZ1lWSCGPu30iVBjKlMAPMYd3cAja6LAZ7xN98//lD/Nb032/2owzgwqjmEWe4B3LIsHR+6oEeODOnHz5xRMpXmDe1yvWs79cbbdld543LvrWtsck43XXtFVScP4700bk9zv5HOtnaJFUwf7cSQ5QQx9m8MQUyD9725g5iP3NAdfTt3dwDlYHYkIOvs2PSL29siQ1ddseaKulUgDAfLlkvKdjiAyVSUDF2/uVvXb+5WLJHUoeOn9AjdlVztp/ZcXfX0GVbe/EVuC2Q621oqPnGcDF+YYnp5uZYusfzpo43C91yp0qufq8Vy6O/DrEkOH0+7y2TWJFu2ssGzJg1L+kPu7ADc8FwGeM69Xzm4dvs1vc/3rO6M1nbCNNd01PXuhrTk6vJ+4fzFGT1yeEiP0l3JVa7tW6PXv6zf9juSGwKZdV1RdbRGlj1Z6HJk1/ZXviEp07oUuiTSpixbrl+0iKm2FFrELLUCWsRUutIGtYh57Q3d0a9zdwfQ6Hs/4Fkf+NpjO/ds3XiwK9oarOWhgG5IqjFoqvyRulRFybIsHRu6oEcO012p0QKGoV9/7U1a09Xu6N2pEYHMfDypbRu7l9wfwhe7tr/8JRdPH20WnT66ktUQxNi/ZQQxS62AIKbSldY5iPnSDd3R13N3B+CG+z7gaR/+5g9/YV//5n+IhIMVzlrNdNTVPbzU/hBd7sNhLJHS48dH9PCRIT13mu5K9bbrug26dd+1db1T1SuQKToeDOO92Lzt5S2dyGvtkqx1SnuCGIe2lSCmaJkEMbZsZZ2CmClJ19/QHT3D3R2AG+75gOd99F+f+D/7+je/2zAMuiFVumyDuyGVu+0XJmb08OEhPXpkWBMz87zpHRYJBXX3z+xVdKnuOg7ftZwMZKZn49px5fpF28h4L3Zt/9JLp62F0CUzfbRl77EiiHFoWwliyr9NE8RUutI6BDG/cUN39OPc3QG45X4P+MIn//3Il3e/oO9O2276TEdt+2NytQFMPkvS8ZPn9ciRIf3oaborOeWlN27Ri3dsds1dzO5Apj0SUc+qKF2ObNv+0ktaWpg+OlZ0+mgHjhtBjEPbShBTtEyCGFu20sEg5iFJt9zQHTUFAC651wO+8XcPPn34+i3d22y52TMdte0PxoZh7zGMJVI6RHcl23W0RXT3nfsUDgVceUerNZBJpU1du2GNo49IzR6+XJo+OrV4+ui6VnoIYhzaVoKYomUSxNiylQ7sf8owtOuG7uiT3N0BVIMpqoFljJyf2BNti4xs7Fm5xs4aC9NR1/4g7MRDY2skpBdt36IXb99yqbvSI3RXqtlLdl6pUChwaSYaR96jVvUnQa3TXk/Pxh2bTtnR89nFXY4slZg+usa3iGFzAUxfzfTVjpXJ9NW2bKUD+/9BAhgAbn1WA3zjA199bOON1214as2KaEup04jpqGt/AKt3N6Ryl811V3r4yLCeePq0EnRXqsi6lVH9z9v3yCjxxO/4jagOLWQuTs1rz7UbbNuYZh3vJVnu9NGNrvzQIsahbaVFTPm3cFrEVLpSm8p9RlJ/f080xt0dgNvu74DvfOjrh16694ZN/97eGglUfGNnOmqbHnWre4i0L2gyMrMrnTilhw+f1LOnxhx7SPSTn3t5v66+Yo0jf6t63vWWepcalnTl+lU1r7jZuhzlpo+OVTN9dKMrQAQxDm0rQUzRMglibNlKG8p9ZX9P9Lvc2QG47Z4B+Naff/tHd+/r3/zxUDAgpqOu9mGksofbWh8k7QxgCl2YmNUjh0/q0SPDGp+e4wQpYvP6lfrFV97ozhuUjTMtbVq7QpnrQi2RhIO76qLwJVHQ2sXTlSCCGIe2lSCmaJkEMbZsZQ3l3tffE/1l7uwA3Hi/AHztY//25F/uvWHTW5iOupqHkOUeZcvcljp1Q1ruCTb3XUvSiaELevjwSf3wKbor5Xvjbbu1fk2n+29WNaxgejaunVf1VhlJOLhLLgleTMtSLJ0LXi6fPtrzFSGCGIe2lSCm/Ns6QUylK62i3DFJW/t7ohe4swNwfb0W8KNPf//493Zcs+GlTEdda9nuCWBK120rG8cklkjpEN2VJEk3XNmtO27Z6r0bV4UrGJuc097r+kSXo4zM9NFWRdNHe74yRBDj0LYSxBQtkyDGlq2ssNxf7e+J/i01YAB2YHYkoArnx6df9szI6LPX9K3d7IYHgoaNA+PCylo99nOpZVsjIb2of7Ne1L9ZFyZm9XCTdlcKBgN66a4rHSnbcvo9WuEsSx2tLWUt6OfwJZ1t7VLL9NGNxKxJzJrkqvfTcmUya5ItW1lBuQ9I+gy1XwANewYCkPG+rxxc2X9V71Dv2q7O5c4suiEVW9bZ6ajr0Q2p3LIvdVc6MqTHnzqlRNL/3ZX2bduol+25yl83tRKFr+2MakV7a8NutI0IXxamj7Zsmz7aF5UiWsQ4tK20iCn/Vk+LmEpXuky5cUk7+nuiJ6j5AvBEfRXwuw997dC23ddv/NGKjtZQqbOK6aiLF+D1cWCqLT+ezHRXeujwkJ4ZGfVld6XWlpDuvnOfWiONbWxZj0Amlkjpho09db+5NiJ4WZg+2nJ0+mjPV4wIYhzaVoKY8m/5BDGVrnSJcv+wvyf6Hmq8ADxTRwWawYe/8cM7bu7f/NWWSKjonZzpqC//Za9MR+3oMZQ0Ojmrhw8P6ZEjQxqb8k93pZfvuVp7t/U1xc1ubHJOe1+wsW431XqGL4unj7bqOn20598vBDEObStBTNEyCWJs2coi5R6RtKu/J5qgtgvAC/VSoKl89F+e+IMXbt/yJ0agtgoi01HX9tDpZABj6zEsYBnS08MX9NCTme5KcQ93V1rZ0ao3vW6vAgH33l7s3LLp2YR2Xt3rm/Bl8fTRzTysNEEMQYz7K9wEMfZvZUG5t/T3RP+LWi4AL9wTgKb0yQeO/MOerRv/u+2BwFLLMh21/ftZ5wCmcJXxZEqHjme6Kz3twe5Kr3vJVm3d0t00N8H2cFgb1nQ5t32Gs/u+ePpoU2Zz5y72V5IIYhzaVoKY8qsBBDGVrjRb7oH+nujdXAUBuLJ+AWDBfQ8+9cNtV66/kemoixfgt+mo7diWpR6yc92VHj7sje5KvWs69Su37W6aG2LaNHVd71oZNiclTgYvlqSkx6aP9nxFiSDGoW0liClaJkGMHVt5zpCu7++JTnAFBOAEpqgGbHTq/OTeaGtkZEvv6nWOhgdMR123/XT0GC6z8NoVUd3+oq16zYu26qnhC3r48JAOnTiteDLlyvf/y/dc7enzt8KZqTU9m7A1gHEqfMlNHx336PTRbnhfMH21vSti+moHy2T6aju28h4CGABOoiUMYLMPfu1Q745rep9dt6qj1bFAgOmo7d/PendDMqop21g0u9JTwxdc013pmr41ev3L+pvqRnlxal4D19U+ALHd4YslKZGdxSjuo+mjPV9hokWMQ9tKi5jyqwa0iCnDN7f3dNzOFQ+Aq+sUAC734W88fvPAtk3/FW2LBGwPD+iGVPsxLPMpuFHdkMo9imNTc3ro8Ek9fHhIo5OzDXu/BwxDv3bHTVqzor25bpqmdM2GNdWXZeMdOGVal2Yx8vP00Z6vNBHEOLStBDHlVxEIYpYwK+mG7T0dJ7naAXB1fQJAcR/51g9/9YXbt3w6HAra94DPdNTO7GcdpqOu5eHbKGMNJ0ZG9dCTJ3XoxKm6d1faeW2vbr35uqY7xzetWamWcNCx9/dSTCvX2qX5po/2fMWJIMahbSWIKVomQUwl3rm9p+PDXOUAuL4uAaC0j/3bkx++uX/z22t+aK+w5st01BUs75FuSOVKZLsrPVin7kqRUFD779yraFukqc7tmbm4dl21wZH3dinJS61dmD7a85UnghiHtpUgpmiZBDHlOCRp3/aeDncOugaAegSA8n36e8e+s/O6K15Z8wM+01Hbv58Nno7a7qNYuGSuu9JDDnZXuuXGLbplx+amO6/HJ+e17wV9tv+98+VPHx1n+mj/VaAIYhzaVoKY8qsNBDG5y62kvdt7Oh7jygbAE3UIAMv7/CPPPnPdpnVXVfXQXl5NSlWXXfPDQa3RAdNR23EUl6tfnxge1UOHM92VYgl7/tHX0RbR/jv3qlSXOz+Lx1Lq39Jjy985Jzd9dK61C9NHN0EliiDGoW0liClaJkFMKX+2vafjHVzRAHim/gBgee//ysGObVetH+lbt2JFxSeoC8aBqThs8Gg3JKeno3ayG1K5detEMq3HnzqlB588qePDo7JqGEvk1puv085re5vynF7T0a7VHW1Vv49zmD6aihRBjFPbShBTtEyCmELDkrZt7+mY4WoGwDN1BwDl+cDXHrv2pus3Hl7V2Rau6ORkOmr799Nn48BUWqfO/Whsak4PHx7Sg4dP6sJEZd2V1q5o16/dcZMMo/luI4lkWjds7K7qPcz00VSmar/uEsRUWwpBTJU3DTfve+1BzB3bezq+wVUMgKfqDQDK92fffPzWm/s3f6s1Ei4vB6EbUtXb4rfpqCvajioeGJ4aGdWDh4f02PGRsrorvf5l/bqmb01TnsfjU/Pad11f2X9Xpo+mQlVtAQQx9m8ZQUyVNw8373v1QcwXt/d0/BxXLwCeqzMAqMxH/+WJd75w++YPBQOBCsIJpqNunnFgKltDJQ8+5ZSaSKZ1aJnuSpt6VuoNP31j057D07Nx7bmm9MxITB9NpcrOAghi7N8ygpglb5Tu206bfqFgkSlJ12/v6TjDlQuA5+oLACr3yfsPf2Zg26ZfLnlSMh11TRcquiHZcwwzsytd3l3pjbft1vo1nU17/raFQ9q4dvHwTkwfDdsqVgQxDm0rQUzRMps3iHnz9p6OT3DFAuDJugKA6tz3g6ce6b96/d6iJyTTUdu/nz6fjtrOh4Niyz41MqqHDg9pOh7Xrfuua9rz1rQsXdeb6YbF9NFwrHJFEOPQthLElF/N8HUQ85CkW7b3dJhcrQA0QohDADTG6dHJF0fbwsNXblizvsKakb2VHZ9NR128EMPZY1j+Km05ik4GMKVc27dW1/atlWlJc/GEpuZjmk8km+qcDQaDsixpLJZi+mgsyar1vCtSQOkyq1+bJWeug5eVa8OK7NnWxaVUXeYSv+jEMXW8zKIrqHytrtj35X8hZUn/awcBDIAGoiUM0EB/8qVH1+25vu9kz+rONqajdnA/m3Q6avv301j0aTptano+pqn5uJLptO/Oz0AgoGAoqGAopGAw2JQzQaHBlSxaxDi0rbSIKVpmc7SIee+Ono7/zdUJgKfrBwBq86dfP7Rr77ZNg53tLUGmo3ZgP5mO2qb9NC77NH/5WCKpqfm4ZmJxmR4eiDYYCimUDV4CSwyeDdStokUQ49C2EsQULdPfQcwzkvp39HTEuDIB8HTdAEDt/uJbP3zDzTu2/H0kFLS9is101A4ew/JXactRdEUAk/2y1PKWZWkmltD0fExzHuiulGntshC8AK6sbBHEOLStBDFFy/RvEPOKHT0d93NFAuD5egEAe3zsOz9+7wu3b/59wwjYdsIyHbXDx7CGfVwou3HTUZe//OJWMOWWnXJhdyXDMC51MQoFQzIC3AbhkQoXQYxD20oQU7RM/wUx9+3o6fhlrkQAfFEnAGCfv/nesW/sekHfa2wJBGyrzBdblumoiy3cDOPAVHsMY8lMd6Xp+fp3VwoEg5daugSDQS408G6liyDGoW0liClapn+CmDEZun5HT8coVyEAvqgPALDX5x959uj1m7uvdyw8oBuSIxdH33dDMuwp27IszWRnV5qLO9NdKdPaZaGLEQPqwlcVL4IYh7aVIKZomf4IYt64Y33HZ7j6AHALOsADLjN09uKeaGtkZGPPylW2V16Yjtqhh345dhQbMR21k2UbhqHO1hZ1trYolTY1FYtrej6mRKq27krBYLaLUSikQJABdeFeTF/N9NWuej8tV6b3p69+QNJnufIAcBP+PQi40Ae/dujK3S+44tiaFdEI01FXuDzTUdu0n0bV+1jNtsSTKU3Ox8rursT00Wj6ChgtYhzaVlrEFC3Tmy1i4pK271jf8RRXHAC+qgMAcMafffPxl+27YfP90dbycximo2Y6anv20/5uSOUun+uuNFmkuxLTR4NKWC3XdYKYakshiKnyptT4ff/DHes73sOVBoDv7v8AnPOX//LEW160Y8tfBst84GQ6ansDgWWXbfLpqB053nnfSKVNjc3OK2GJ6aNBRcyW6ztBTLWlEMRUeXNq3L4fkbRzx/qOpADAZfhXIuBiv3nrjr8aPDL8yZoqNHUOYCpdgZvGgXF+OmpnataOpelGnceYKfiGaVkKhMNqiYQVkCWZplTnmZUAp1kOFGA5sDarXvtvueCYFinFcmBjLDe+n5Yr07JnrQ5vpyXpTQQwANyKljCAB9z3gxP/teOaDS+q6kRmOmr7t4XpqJ3ZlrxvpE1TF+MpmUV+nE6bmXFjDKPyNAzwa4WMFjEObSstYoqW6e4WMQd2rO+4m6sKALeiJQzgAWfGpl/y9MjoSMUVGBtawbihcr5k2Y2YjtrBaqbh4IH1SgBjWZYmCgKYfMFgQOFQUOFgQAEr20IG8DhaxNi/IlrEOFime1vEnLWk3+OKAsDNCGEAD/jd1+0xjw+d33lmdGq2lqdipqN2bJW2HEW/TUdddtkF35iIJVXuhNWXApmAoYBlEsjA0whi7F8RQYyDZboziHnrjes7JriaAHAzQhjAI/7gv+0dO/zc2RdNzcZSrnwIb0Q3pDqXrXqPA1O3/azvdNRLmYolVG0n/mAwqHAoqFAgIMOyGD8GnkQQY/+KCGIcLNNdQcw3b1zf8U9cRQC4HSEM4CHvvGP3E4eOj/xiPJmyvDwdtS0P+Das1MvTUdu3n0ZN67OzG9JsIqmYZc/+hoJBRYJBhQ1DhkmXJXgLQYz9KyKIcbBMdwQxs5LewtUDgBcQwgAe89bbdn7x4NHh/2OV+i+/y8eBcdN01E7up7w4HbUaNw5MLJnSXNr+RwXDMBQOBRUJhbKBDDMswRsIYuxfEUGMg2U2Poh5943rO05y5QDgBUwrAXjUp//j6Bdvun7jzy53Rjs9HXXdZ0PyzHTUNYQwhsPHsNhPjToHannfSKZNTSRSy1a+DRv/AqYspdNpWWKGJfi8osasSQ5tK7MmFS2zMbMmHZK078b1HSmuGACa4t4OoHE+/9AzP952ZU9/dZXtYssyHXWxhZmO2oFtyX7DtCxdLHMgXjtDmPwfmqaptGnKMgxui/BnZY0gxqFtJYgpWmZ9gxhT0t4b13c8xpUCgFfQHQnwsOHzE3tOnr04Wnklu/YKEtNR2xUVOHNgvRDAWJIm5pNKN7h3UCAQUCQUUkswqJAhGZYp5zpZAJWja5L9K6JrkoNl1rdr0p8TwADwGkIYwMN+53V7EieGLuy+MDkbr+1BmemoK1ilLUeR6ailyVhClbQdr0csEswLZIKy1BoKKEDjGLgAQYz9KyKIcbDM+gQxw5LezdUBgNcQwgAe987X7h5+4unTr5idT1Q9/QvTUddeONNRV/bL0/GE4i6fsCgUDMqypHAgoPZQUK2hAJ2V0FAEMfaviCDGwTKdD2J+48b1HTNcGQB4DSEM4ANvf82uHzx2bOTuVMqs+EGZ6aiLL8x01LVvYqnl5xIpzaW9dY6lLUuWJUWCmUCmJcjtE41BEGP/ighiHCzTuSDmCzeu7/gGVwQAXkQtEvCJ37x1x6cGjw1/lOmoa8d01A787bPfiKfSmkmZnj7X0pYlQ1JbMKAogQwagCDG/hURxDhYpv1BzKSkt3IlAOBVtKwGfOaz/3n8gV3XXfGyck5/pqOubR8XymY66nL2MWWaGo8tnoraqHAlhp1/FcO+Y21IChiGkqaphMmgvvBIJY5ZkxzaVmZNKv8aX9W/Pd584/qOT3AFAOBV/PsO8Jlz4zOvODF84Xm7K1uGS8aBcbRSWe8Apm7HsL7dkIqxLEsTBQGMm1g2/H7ashQwDLWFAoqGAgozoi9c/r6lRYxT20qLmKJl2tMi5kFL+iRnPwAvo4YI+NAHv/pY1/ar1w9fsW5FV6lT3y2zIblqOmqPzobkhemox+cTSlrLLN/AljBOHZdAttVRPG0pZdFCBi6tzNEixqFtpUVM+df6staakrRz5/qOw5z1ALyMljCAD/3O6/ZMHX3+/L6JmflUbdEB01GX3k+moy73QWgyVjyAkSS/xxKmlXmFA4ai4YDaQwEFDf7/AXvRIsb+FdEixsEyq28R834CGAB+QAgD+NTbb9917NDxU3fGEimrpodwpqOueVvUsP1s/HTUM/GkYibno5QJYyxJkaChaDio9lBQQfIYuOXBmSDGoW0liClaZuVBzNOS3sOZDsAPCGEAH3vrbTu/efDo8O+b2W4QTEddfGGmo659E4stP59MaTZNF5xiFgKZoDrCQbWHAtyQ0fgHZ4IYh7aVIKZomZUFMXfvXN8R4ywH4Af8Dw5oAn/970f+fu+2zW9ohnFgKt4Wv48Dk/2y3uPAJNNpXUykVc4wKEYFK/bamDCl9694CUHDUNoyFUuZIr5Cwyp3jBHj0LYyRkz5l8NF3/zszvUdv8KZDYD7NABP+fxDzzzWf9X63U6EE0xHXfuDgJ+mo06blsZjSZmVluHTEObS8mWOQpz7ScAwlDZNzafpz4UGVPAIYhzaVoKYomWWDmLGJF2/c33HKGc1AL+g9TPQJEbOT7zwuTPj5+wOJ5iOuvbi/TQdtWVJE/HyAxhn+KMNiWlZMgxD0VCmy1JLkFs26ngW0DXJoW2la1LRMkt3TXoHAQwAv6FGBzSJ337dnsTTw6M3nhufnnfyIbyqshsxHbV9W1/ekg0aB6be3ZAuxhJKuSQD8Ut3HkuZMWSCeYFMhEAG9TgHCGIc2laCmKJlXr6CByTrPs5kAH5DLQ5oIm+/Y9e5J54587LpubhZ8qGa6aiLbAvTUS9btiFNxZJKMJCJ4w/VpiWFDEMd4aA6w0FFAvQshoMPzgQxDm0rQUzRMhe+iEvav3N9J3cVAL5DCAM0mbffvuuRx46PvDGZStf01M501LXz0zgws4mk5kzqyvVkWplXOBBQZzjTQiZEIAMnHpwJYhzaVoKYomVmvvi/O9d3Ps3ZC8CPCGGAJvSbt+6479Gjwx9c9BzNdNQlymY66uXEkmnNpAhgGsm0MuPxtOQFMkECGdj54EwQ49C2EsQUKfOILH2AsxaAX1FDA5rYZ75//F/2vKDvVUxHXapspqNebvmUaWo8nlbhhMq1T+Fc6/aWEaG5fHak2s+xzAxLpmUplkorTU4GMWsSsya5/kHCMqRbdvZ2PsjZCoB7MQBf+uKjz53YuqX72no9tGe+yXTU9u1n47ohmbI0FksWfbgnhCmyfANCmHwBQzJNaT6VFpNeU/mzuwCCGPu3rEmDmAO7ejvv5iwF4Gd0RwKa3PNnx3cPn5+YcOzB0w0PEU0yHXW9/z7jsUTTtq7w4m6bViaMbA8H1RUJqT0UoBIg3r92FUDXJPu3rAm7Jp2V9C7OUAB+R/0LaHK//do9M0eeO3fT2ORc0s5ymY7awWNY+NM6jANTuPzFeEIpi8aUXmValgKGcSmQaQtRHWg2BDH2r4ggpmb37OrtnOTsBOB31LoA6B137H7mh0+dun0+nrTsemgvXgjTUTu2n3UsezqRVJz+LL5hWpaChqHOcFBdkaBaCWSaBkGM/SsiiKnaN3f1dn6BsxJAM6CmBUCSdM9tO78zeHT4HWnTrPkBv2mno26CcWDmkinNpklg/PpAblpS6FIgE1JLkGpCM/zd7S6AIMb+LfN5EDMr6Tc4GwE0C2pXAC55809v/8jg0eG/qaWMpp6O2o7tlnuno06k0ppOpb39wIiyj7NpSZFAQF2RkLoiIUUIZHz997a7AIIY+7fMx0HMu3f1dg5xJgJoFnToB3CZf3jw6Yd2XNN7s21hA9NR27SPjZuOOjMVdTJvVh3Dvr9Vhb9kVLCUU7MjVbWPZU7J4tTsSJWXfflZETAy4UwsbSpp0iKKSmEt7zlmTaq2FJ/NmnRI0t5dvZ1pzkAAzYJ/awG4zKnRyRc/c2rstJvGgXF+OmpnapqOJd1G/caBsSyrIIBBszKz/+JuDQa0IhJWZzikUID/5/gFLWLsXxEtYpaUlvQmAhgAzYYQBsBlfvu1e8ynhi/ceGZseq6ah3YnAwG7N4TpqJc3Hk+IGrIbnnDdxbQyO9QWDGpFJKTOcFABahW8TQliHNpWXwYxf7Grt/MxzjoAzYbqEoCi3vnaPaM/fubMi6dmY8s+f3t1OmpbAhifT0c9EU8oUa/woN4hhUtDES9mNaYlGYahjlBIK1vC6ggHqWB4GEGM/SsiiLnMkKR3c7YBaEbUkQCU9Lbbd/3w4LGR/5FIVtEOwgPTUYvpqJcseyae1LzZPEPhWuyQLeszLUsBw1BHJBPIRMNBBqBrxrcPQYxD2+qbIOYtu3o7ZzjTADQjQhgAS/rNV9/4D48cGXqPZVk1BwJMR13N8o2ZjjqWTGmGqahRI9OyFDQMdUVCWtkSUns4yEHxEIIY+1dEECNJ+sKu3s5vcIYBaFb8cwpAWT77/WNfven6ja8t6wJS725Ihnu6ITk9HXU9Qq9kOq3xRCozCGvJnlCGI+su5xcNO//KRn3eo8X3z7C3bJv3r7I5w0rNAFV6uUTa0nyK0YaaorLIrEkObasnZ02aNKStu3o7z3BmAeC+CgDL+MIjzx654cqerUtePBoxDgzTUdd+DLMf06alsXhCaevygghhbFiWEGbR8rlzdz5lKk7LK39XGAliHNpWzwUxb97d2/kJzigAzYzuSADKNnTu4u6TZy+Ol66puX8cGKajLr3dlqSL+QEMfMdtf1rLyrxagwGtbAlpRSSkSJCqiS/fO3RNcmhbPdU16UFJn+RsAtDsqOkAKNs7X7snduzk+d1jE7MJpwMB+xdmOurlXJxPKEkAg0Y95Gffe23BgFZlA5lwgAa7rvobOVAAQYz9W+bSICYl6U27eztp8gag6RHCAKjI2+/YffLxp06/ci6WWFyRYjpqm7a7MdNRT8USilskMK59eG0yuUm52kNBrWoJqysSVIgaiz/eywQxDm2r64OY9+/u7TzMGQQAhDAAqnDPa3Z+/9Gjw7+Vzo3hwHTUzu1nHcqeTSQ167upqIk9/MK0LAVkqCMU0uqWkLrCQdFAxuNnF0GMQ9vq2iDmaUnv4cwBgAxCGABVefOrdnzskaPDH7crPGA66oKf1mk66ngqremUf1uHE8X4i2lJAcNQVzik1S1hdYRDVGS8em4RxDi0ra4MYu7e3dsZ46wBAJueTQA0t8/911Pf33XdFS+xIxAod2Gmo7ZnW1KmqdFYcukKtWdnRyrzr1+n2ZEuLd/g2ZEqL9uoYf/sO37LzcYWMKR42tJcMkXw5rWKJLMmObStrpk16bO7ezt/hTMFABbwDyQANTkzNv2TJ4YvDNX1Qdah33DFODB1OoamZWk8nuSBFbZp5HvJtKRwwNDKlrBWt4YVDQX5g3jl706LGIe21RUtYkYlvZOzBAAWI4QBUJN3vna3eezk+Z2nLkzOVBMIVBQeMB217Nql8VhSKRIY+DAQMC0pEgxodUtYq1vCaiOQqctxt7sAghj7t6wBQcw7d/d2jnKGAMBihDAAavaunxm4+OSzZ184MTOfqiYQsH9hpqNeysVYQgmHZ0Ii3/HQA7CPj4slqTUY0OrWsFa1hNUapNrj2vchQYxD29qwIOZ+SfdxZgCAPfV3ACjqr/7lR3e+ePuV/9waCS17bak4bKh4rAl3zIbktnFgpuNJTafN8suockyYqveFMWGqL7vMHzg1Jkx152mt+1f5zGyGIVmWNJtKK5H276DUnq1YMkaMQ9ta1zFi4pL6d/d2Ps0ZAQCX419CAGzzlltv/MojR4bebdncyoLpqO0pez6ZWhTAoDa0QPHo3y37h4uGglrTGtbKSEjhANUh15wXtIhxaFvr2iLmjwlgAKAxdX4ATeoz3zv2j/u2bfp5Wy489Z4NyafTUSdSaY0lUyrMx2gJ4+TfuMiytISp7f1R5gqrKTtgSCnT0kwqrZRJxNbwCiYtYhzaVsdbxBw2pF27ezuTnAUAUN97D4Am94VHnv3R9qvW76jposN01LZsi2mauhBLyqymLGOpZe2bppoQxqHt8EkIU/p8tS+EyRcwpIRpaSaVkknjscZVMgliHNpWx4IYS9Ite3o7H+TdDwCl0f4WgCOGz00MPHdm/EK9HnCrezx3pibupumoZVkaixcPYLyKNgpwmmlJIcPQynBYa1vD6oqEqDA14lyla5JD2+pY16QDBDAAsDzqFAAc8Y7X7k4cH7qw6/zFmVg1v8901LYUr/FYgqmo/fuIyhbWwaVApiWsNa1hdYRDNCOu53uIIMahbbU9iDkr6fd4xwPA8ghhADjmbbfvOvXDp0//1Mx83GQ66oKf1mE66olYQnEbnyx4IAeBgtQSNLSmNdNCJhoKclDqce0giHFoWy07y/ytPb2dk7zbAWB5hDAAHHXPbTsfHDw6/L+SqXR5v+CicWAqVek4MPaVfbnZRFJzDC4KOPZQbUlqDQW0tjXTQqaNQMbZ0IAgxqFttSGIsfSNPb2dX+RdDgDlIYQB4Lg3v2rHpx85MvyRcpZ10zgwXp2OOp5MaTrFaKINfeKqcX3EZ957C7XnBTKtQapXjryvCWIc2taagphZSW/h3Q0A7ngOAIBFPveDE/+25wV9r1jqisR01LVtSyptaiyRkmlZ9pVd5TTVVXf7sm2GpDLfIYZTf/cSyzowQ5JTsyNVOj9S3WdHKrFSR/+ORvnLmZY0m0wrniYUtbXyyaxJDm1rVbMmvWPPhs4/410NAOXjXzUA6ubs+Myrjg2df7ZU3a/u3ZCcfjis9Qm/wl8xLUvjiWTZAQwuZ7FDdVuf39+llpWpZHWGQ1rXFtGqlrBCAapdtvztaRHj0LZW3CLmkKS/4B0NAM7V7wGgZh/+2qGOHVevP7Wxe2XXootRxYPxuqMbUkVtQQznwiBL0th8XEmr0uNY2UJ+bwlj79+/xLL1bAlT4/5V3BKmwhXY09rHnS1hSr0DDUNKmpZmkimlmnzcJlrE2L+iOraISUvau2dD5yFqNgBQGf4lA6Cu3vHa3TNHnj8/MD49l6zmocapirvTlW2np6OeqCKAcRPa7qBZWLkpryNhrWuLaEUkpECT/kuMFjH2r6iOLWL+ggAGAKpDCAOg7u55zc4Tjx0/ded8PGkxHXXt2zIVTyhGigF4jmVJ4UBAq1siWtcWUVc41HQVM4IYt5a5ZBAzJOkPOYMBoDqEMAAa4jdffeO3Hjk6/LtWBc3xmY76cnOJlGbTJDBo/MMkajvWliW1BANa0xrRutaIOsPBpukzThBj/0ocDmJ+Y8+GzlnOcABw4jkCABz2mf84et8L+zf/UnkXLPdMR132uAMOtoKJp9K6mEjVVNl2y5gwi5ZnTBh7t6OmGZIYE6aM1Tl23TIkWYY0l0prNpmmUlpFAZ4dI8ZwyTG9vJQv3LSh8+epvQBAo6/NAFCDLzz8zKM3XtM7YMPjdOmLm8+mo06ZpsZiSdkx8W31UzgTwlS1j4Qw9u5jiVTEsTCtQYOIG5JMSXPJtOZS/g1kCGLsX4mNQcykpOtv2tB5lpoLAFSP7kgAGm7kwuQtT58aO1vjo3T9HqIrTyts3RbTsnQxlrIlgPE3Ot7AX+9mQ1I0HFR3W0RrWyNqDQY4a8sogK5JtpXyewQwAFA7QhgADff2O3Ynjg9duPHs+PR88SU8Ng5MFautZNmLsYRSBAwNf1gCGvmeDhhSVySknraI1rSGFQkEOGeXKIAgpmYPStYBzj4AqB0hDABXePsdu8//6OkzL5maiy9q4MF01ItNxBJKkCrAO4/DqMNfKGgYWtkSUk97RKtbwgr7IJAhiLF/JTUUk5T0pps2dHFBAAAbEMIAcI3fum3nY4NHh/9HMjveAdNRLzYdT2repA4MHz84o6ZjbVlSKGBoVUumhcyqlpBCAYP3U1llEsQs4QM3beg6zFkHAPYghAHgKm9+1Y7PPXR46H2Zr5iOOmc+mdJM2lujwPBADjT2/AsHAlrdElZPW0QrW0IKGt7cD7t/mSCmIk9Jeg9nFADYh9mRALjS535w4psD12+8reoLmY+mo06m0xpLpGQ5VMt3anakSo+1/bMjLSxZyexBXpwdacnljVr/LpVtieHz2ZEqPc8NB8PkavcxljY1lfDWyFKGA7/MrEllecVNG7rup1YCAC65pwGAk75y8PljN2zpeUHFFzIfTUedNi2NxhKOzoRECOPke6TIsoQwNYcI5azQPSFM+WuoVwiTY0maT6c1k0h7IpAhiLF/JcsU85mbNnS9kdoIANiL7kgAXOu5M+M3DZ2buOj4Q1xVyzvfDcmyLI3HE0xFDcCxh/r2YFA9bS3qbosoGg66envpmmT/SpYoZlTSb3OWAID9CGEAuNbb79g98+RzZ/eMTs4mSj1AlPfN6h5OKvmpE2HQxXhCKQZWAeAwS5kWTx2hkNa3ZwKZ9lDQtdtq9y8TxBT1zps2dI1ydgCA/QhhALjaW2/f9dyhE6dum4sll69u+mg66slYQnHXN4EhIQLvNj8eZ8Mw1BUJqbe9RevaImoNBfzzXiCIKWdb75d0H2cDADj2+AAA7nfgO0/+1k/svPIvgoFA6YtXxX3+q1ne+XFgZhNJTaXql8BUPyZMRUer/O0w7DuWjAmjmseEqXRUGKfGhCl93jMmjN3XtWLLG5KSlqWpeEoJ0x0JMWPE2L8SQ4pL6r9pQ9fT1DwAwBm0hAHgCft/uv+jDx8e+lQ1Dyr2VZadHwcmlkppOsUoMM2D9h3wxrvBkhQyDK1uDau3vUVrWsMKBwLePV60iClV5h8TwACAs2gJA8BTvvDQMw/uunbDC8u9kjnyn+Lsl3a3mEimTY0nUjKt+j6KGRUuYFR/1MpbtqlawpQugZYwZS7vo5YwFbw9nLu+GZWXnUibmkymlDYbEyPRIsa2lRyWtGtgQ1eS2gYAOIeWMAA85dTo5C0nRkZH7H5AqbTGa/eDumlZuphI1j2AAYBatQQD6m6NqLe9RStbwgrU+V98tIixbfPeRAADAM4jhAHgKW+7Y7d5YvjCrtOjU7NLLeel6agtSeOxhNLkL41huXN9vB38+xbws7ZgQD1tLVrf3qIVkVDdmlwTxNS8kgMDG7oe5B0MAM4jhAHgOW+7Y/foj54586KJ2VjajvIaPR31RCyupNsHg+CJGK59f1q8P13IkNQeCmp9eyaQ6Qw7H8gQxFS9kjOSfo93LQDUByEMAE/6rdfsfOLgseFfjCdTVrHKv1NPFXaXPRVPKMY4vO56pmeH6rY+8ozmeF8bkjrCmUCmpy2iaDjozv1s3iDmnoENXZOcJQBQH4QwADzr7lft+MJDh4f+2Mr7T7iXpqOeSyY1Sx8kAI14Wm/Q+gKGoRXhkDZkA5n2UMBdu9B8QczXBzZ0fZETDQDqh9mRAHje3//n8X/et23Tz1R6UXNytpDllk2k0hpPpFzREsCocCGnZkdatLxh03aXOzdNDTMk1T4DlGFv2TbvX8WzI1W4Alv20TDse++Vs2zF+2fUth2GzedXGW8Qx2aXUvEZoFKmpalkSrGUfU0DmTVp2ZXMSto2sKFriJoEALis7g0Abvflweee3HHV+hvsufg5Ox112jQ1GkvKLb2QCGFECLNMyYQwy66u1nfg0tvheAhz+Ule7xAmXyJtaiqRVsKs/SpJELPkSt4+sKHrI9QgAMCFdW8AcLuPfP1QpP/KntNX9q5e08iHkeXKtixLo/MJpbx2IyCEsTdEaHAIU2ksQAiz7OpsO4KEMIvFs4FMsoZAhiDm8i/Sln78j+emb59LWynp0v8E0sp0YLIKvqfs18W+Z0kyDwz0MboZADT4eg8AdffRbz6+ceD6jU+tWxltsetBxO4H8rH5uBIuGwaGEEaEMLZFCIQwtR5BQphSPzI0n0prMplS2qz8IkoQs+iL9Im55M99/+L8YQdWdSmYyfvc0uKApzDsMZf7nJAHgJ+EOAQA/OLJ7nWn9NSpV/1E/5YHom2RQE0PIQ48jE/EEq4LYJSt4ZLIc6w51nC7tlBQbaGgLFmaS5maTiRV7tjmNb0fSvxy6TKrX5tT79v8cmdT1mcdCmCkhUk/bJ0Ca//gSG438gOawpdVyfcJdgA0CvUTAHW3f3DEyFbUcq/lvi7ne5euZ9umpn7h1u2b/zgUDFR40XOuG9JMPKnptHvre5W0FPFWS5jMkm5pCXNpeVrC2LuPJZqmONaiiZYw9m5HmS1hijEtS3OptKbKHOi82VvEWNLpb43O3nY2kZ6nNpI7JCVDncJXutTPCHQAuOEaD8DfoUlhEBIsEY4ESwQojrtpbubdL+/ffFc9HkCWK3s+mdJEMu3tm4HHQ5hKQwpCmGojBEKYWo+gF0OYmo91DSFMvrRlaS6Z1nRy6UCmmYOY0/HUm749Nvc9ajaOWDasKfjZos8JcoDmQQgDNEd4EiwSngSXCFaKBS2e85Op2Gf3XnfFvkofPux8eEumM1NRm5a7jxUhTH0e3ouHFG4PYaoIEQhhajt+NT/4V7O890OY/KVSlqWZZFozyZT9FWCPBjFx0/r2352dfhu1I1dbMqhZ6nuEOIB3EMIA7g5QgiUCk3JDlaY+xwOWGXhNWN/dtmndFZU8fdv18JE2LY3FE2WPWeDqmwEhjL376OMQptKQghCmjO0w5Px7xGchTL6kZWk6kdJcKm1fJdhjQYwlTT80Gbv16GxilBqWr6V1eViTXuLzXIBjcegAF9W7AVRn/+BIsYAkqOKhSbHPOT9tEI3HO1+3Jvq9jd0rovV88LAkjc7HlfJItcapEKbqhzNCGHu3gxDG3u0ghLF3OxwOYfIlTFNTyZRiKbP2irCHgpjxZPqPvnxh9vPUCrBEtaVYWFPslQtu0hw2oDHXdMDX8lqjFIYopb5HiOJCG2Zmr3nNleu+trqzLbhcsmDXA834fEJxyzv/WCKEqc/D+6XlHQhhlg4pav27EMIULuxod66qQopa97E5Qpj8hRJpUxOJlJK1DJrugSAmZVmP/93Z6V9MW6K1A+xWMqQp9iK4AWq9EwAekm2VEtTl4clyoQrniE9cMzX18tds2/ix1kjIKPXUbdfDzFQsoVnTW3VdQhiHwo9SyxLC2BsiuD6EqTFEIISREyFMbllLUjxtajKeVLKaa7e7g5jU4dnE6x6ejD1NTQAukQtlUkU+N/O/T2gDv+IBE55S0DKlWIhS6nuAdkxP73/Vjs3vCBiGYw8cs4mkplLeGxuPEMah8KPUsoQw9oYIhDA27KM7Qxhbjl+JhYota0maT6U1GU8pXUlrRpcGMTNp82P/eG7mz6kBwMOWCm3yP08xtg18U+8GnFIiUFnuxXsWNXlhbPbDL922+TVOPGzEUyldTKQ92d6bEMah8KPUsoQw9oYIhDA27KPbQxgbrzdldj81LUvzKVMTiaTKymNcFsSkLZ386ujMHReTZpy7P5pEfkuaJT8S2MDV9W6gXPsHRyoNVAIcNTTCK83kV3Zf07vVznFgUmlTY/GkvDo/ZPUhTEWPduVvByGMvdvhkxCmdEhBCFP7Pjo3Rtayy7o0hFn0ZGdZmk2lNRVPLR20uyiIGYqlfuXfxuce5q4PFD+ttTiYyX2ezP8eU3+jIfVuNK+CcVRCWhygFH5NKxV4RjidjtzRHvqPa/vWrLHjAdC0LI3GvDEVddU3AxeGMJU+1hLC1FK24djsQYQwtYUUhDBVbIdR23svZVmaSaY1kygRyLggiImZ1pf//uz073HHB2pmqSCYEWENnK53w1/yWquESnzM/5z3B3xr9dx89x1XrPxu7+rOllovmGPzCSUsb7dqJYRxKPwotWyZT6GEMGUuTwhjwz4SwlRTdsq0NJ1IaSaVLmtD6hHEWNLF712cv/WZ+eQEd3ugbgrDmqQWQptcUJPiMKG2Kz5cI9tipVSoUviRvzmQtXl6euft1234h872lmW7xpU6cS7GEoqZ3u9WbFS4QCXjwhDCFFmWEMbefSSEsWEfCWFqLTtpWppMpDSfC2QaFMSMJtPv+uqF2a9wlwdcx1JBMKOCwIagpjnwQO5ieeFK/itY8HmYvyNQva3T0z/z6v5N74uEghVfKKfjCc2k/TGuGyGMQ+FHqWUJYezdR0IYG/ax+UIY+/dxYYmEaWoinlTcNCssq7YgJmlZD332zPQbubsDnpYfzuRel8Iauj41Qb0b9svOChQq48XfB42WG0C52BhAIS0k+mbex9yUgcnsz11vz+zMu165Y8v/rORCOZ9MaSKZbp6bQb1DmDJ/0bYQpoYHs6r30YFxYQhhHCi7xIKEMDYeax+GMLnPLElxM62JeEqJgkDGgSAm/sRM/I6DU/GTVF8AX8vv8rQooJGUPDDQl+YQebzejcpkA5awFocphV8HOVKoQ3gSyb73ch8LX5G892ZEi1ta5UKVOUnz2VesyMs3F/mfSMb++oXX991SzkUykUprPJmS5aPJDWt7cCGEIYQpUrZh/7Fbeh8N58oub3W1vgNLbwchTBUxiP3nejUhTP4XlqT5VFoTiaRS2W6sdgYxUynzz754fuYTVIGAppcbnyb/lch9zvTcHql3Y8H+wZHCYCVc8DnTLsPOIKUl7xXJvlpKBCz5ny91bqckzeQFLHNaHLbM+ilcqcTtwfR3+7f0bFzqApk2TY3GvDsVtTMPLv4LYZx8AG1ICFPj/jkZwti2j4QwNe7j5W+QuoUwZe+jYd92OBI0GWXvn2lZmkulNZlIySyZ6Je/dWlLT33p/MydM2mT8SQALKewq9OlF2PSuKje3Uz2D44Uhir5n9NFCLXIhSntRcKV/I+5z2tpMRVTJmjJf81mP8Z8cjzzW/sUa3UWzDuHgwXndK5LVa7rVEJSKmKaxn/rinx8S8/K9mIXSMuyNDqfkB/vToQwhDCEMC4OYZb4dUIYb4Yw+UzL0mwqrclEskgLy7K20HpkKvYnh2cSx7IPVwktTKNbOEtL4RgTALDoeqLFLWcSuc8JaAhhaglZAireJYOQBdVqk9SafbXlfV340YlWUnFJk5Imsh9zL69cJHOtfVq1OIwq1cIn/+uljqepTOiUa9kT0+UtfoqGUetn5zbfvnnNt9atiIYKfzY2H1fCpw043RLClA4pCGEIYQhhCGG8E8JUcIov+nHasjSTTGkqkcobVG3pX55MmV/9UqYbUpsy/+jJ1UU6snXb5R62FnVVKPJ57hXPeyWp/gFNxywWzkhKMFgwIYz2D44E8x7WCh/gGI8FlYpkKzKd2Y/tkqJ5H+vVBS0uaSz7Gs+GLfMuPF6BvApgfmWwVYtbALXYcD7OS7ooaVqZVj65j3OqYVDgq6emX3L7tr5PtbeEL10jJ2MJzZn+7UJLCEMIQwjT7CHM5Sc5IUz9Q5h8KdPUVDKtmWSqZAGmdOH+8blXD8dS0yWKbsvWVTqzH7skrcrWZ2p9GItrcTgT00I359w/O5q2izPQZFJ54Uzu2pCg9YzPQpjsALiRgrAlQtCCGrRIWpF9rcxWVDqz32+UMUkjks5lwwa3CGePU5cWAqpoXtji5PE4q0wIdVEOhlA7ZqbfeOv2zb8fDAQ0FUto1vT3GGaEMGq6EKbSWIAQZtnV2XYECWFK/ciwb1s8EMLkS5imphNpzaYW5xnnE+l7vjE6+69VXPZDyoQxqyX1ZF9O/VMpqUwwk+sWnfunyYT800UaQHG5bv+EMzXcM+suG7YUjpuRC1uAWqyQ1C1pbfbV7qKL1TOSTmQrLG7QKmlD9nitUe3/QavUGUmHshW3url5fvZ9O7d03xkPBIxmGEa++tmDCGEIYYqUSwhT9REkhCn1I7eHMEtsrWHf8YubpibjqfR0Kv2D+85Mv8mmW0CLpG2SrqvzrScuaVTSBUmn6n2fB9DQ5538cCamJurW5JoQJq9lS2HgQtgCO62SdFU2UGh34fbFJT0gacpF23SjpBc0+HpxQtKPpPpOSvSzvV27Oi3rDQen5r8VkiIGrezqe6Mp5xeNQLwjEmpxdDv8cvM1avtlo5mPnRu222je42c4sfVGY46dlekqa1mWLEuyLFmyLJlW3s9My8osI1lmdjlJMi3LtCQrJaWnEunYRCp1YTRhnrbxUG+RtK/Bf+7Tkn6gGroUA/C0wvGn4n5sNRNqxErzWrcUjhHBoLhwSjRbsVjn8u0cl7sCGCnTxajR5+Z1kvoknVSmO9KYHO5j/tI10Su2dbb+lSGtmQsEnvun05Pf4jRy8/0aAHwtv6tQ7h8SuX9axqss01CmVXCPMgHMSpfUOQA0r1yvl8687CCtTEuZS+NPHRjo8/Tg4I4/WBUELrlXhPcX6uzlcn8Ak3NC0hNy10B2XcqEID3K9B8PNXh70soEVhe0MDPUtGz6z9nV0UjHf9+w4vNBw7g2V+F98OLc//7uhZlDnEoAgDopFrwUSijTeqQc7coELSuV6Vq81gV1cjN7H891R7rAnx1Amc8CuQHAY8oEM57pymR7CJOdmahwel5auKDRdqn+/ZxrEVNmXJhnlRnMzm3XjU5lgpkVyowP06GFgXkbJaVMK6JJZfqUT2lh8L+yA622YCB4z5VrDrQEjJcsutJbmvv2+am3HZqMneR0AgA4JKjMPxSMCu5d+a1oA1qYDSk3cH5uwoFGdvGPa2Fw3tw/TqayL2ZPAmCHhPKCmQMDfXG3bmjN4cj+wZGAMsl67kUrF7jVFmXGNlnpse0eU+a/XGeU+W+Rm/tJB7PXgfwgtrXE1/U0p0wgM1vkNZ9/TN9x1dp3d4QCdxW9spvWmc+dmnjb0HxygtMJAGCTgBaCl3L+k9tS5F47p0z40i7nZjkqJqnF/42ez/uYC17ms8sBQD2Z2evPnKT5AwN9rpmNraoQZv/gSGvehb5VtHSBt6yUtFELXWu89P6NKxPKjGY/Oj42ioMVzhYtTDGfGxcqUuKV+5kT3aDM7MV57vW9K160rbPll5daeDZtHv7kyfE/mE6ZTKsJAKilDm7k3YdywloIWfK78+e3MC82SHxStY0pl5upJJ4ta9F0sgWveN5HWrEA8ArXhDJlPXxmx3Vp10K3A2YIgV+ElekTvUqZQGaV3DlrUimWMq1jRiVdzH7u56a9hjJBTLjIK5T3MVLk+8Hs94PZ16JA5+ZV7df+9LqOXyrnunhqPvnYp4cvftrKTqenxaO4M6MDAKBQ7h8Kbbp8NtCWvJ9VUse2svf7VPZ1UZlWn7kQJZn9fv7Hwlfu+yZ/IgBN5tI/YiXN1nOw3yUfNvYPjrQo04+0UwQvaK6KUpcW+lF3Zl9R1beJb7UsZfpaTxS85vnTXiYsKfSTazuue8ma6N8YlhUt9xefnIrd/89np76vhWDIyF4nU3mv/HAmoYXQJpb9OQDAu4JaHKIUvvLD/9wYL7lKfm5at1wAkgtT0nmvZPaenirys5QuD/3TygxuS6ACAJVLKDtcwYGBPkfH5LwshMm2eulUpstGK38LYNH50qqFQWhzr3Zl/nvVrsbPGrSUpDLhTP7AtbnBa5u2wrZzRdua1/R0fjFoGBskSVZ5DVksST+eit37lbNT/7HMeyakTHgXzH4MZL+XX7GOU2kGAE9o1UILy0D2Gp4LUfI/WloISerZQnJGmdaxAIDqpZUJZGaUCWVsvY4vCmH2D450KTNlXZjjDlQlrEwgE1XpQWnb5K6wxtLi2YRyMwrNKNN6xrfhQHdLqOXXNq3+TDhg7Fp8RMoOYlL/MTb7O/85NnuEtz4ANDWj4GMj751nlWlxCQConZn3fDRnRyBjSNL+wZGwpPVq7PSyQDPJNWFu1UK/8NznpQapbUSXwFxfyfxwZjbva8+OPRM0DOMdV6/9UFswcPtlP7TKv7amLU1+5ezkWw9Px8/wtgaAphMouGe6QVKZWRUZowwA7JVWtjdBLVNgG/sHR9olbZA3xroAmlmub3luRqFyX2EHz+/cCOO56Z7zP5+Vi0Oae65ae8/KcPAtJReoIIiJmebJzwxPvONcPDXD2xQAfC+gzD8yLbm3tehFZbofAwCcEVNm3M3pSlvHGPsHR64Wg+4Cflc4o1Co4HuRgu/lzzCU/71KrxVxLQ5lckFN7pVoxMH4tc2r77iiNfyhZResIIiZSpmPHXh+7I/mTSvJ2w0AfCegTOhiyBvddC1lWsNwTwIAZ6WVnaX2wEBfWfcHY//gyJViDBgA5VdC88ObXFiTm/Y5972AFoKdgBaHOPkDGipbQZzTQquawpetswi9fsOKXds6Wz+b3b5lqrCVteQ+H099/RMnx/+StwkA+IIhd4zxUq2YMuPDAACcZyrTMmZ8uTDG2D84ElFmPBhmQgLQKLmm3blZhPI/z59tIllLRfila6JX/MTaji8a0uqyf6nCIObpucQnPjcy8WX+pADgSfkD7ObPcORVo8qM4QYAqI+0pHFlWsZYS91otH9wJCqpS5lZXRgfBoCvXBtt6fz5K1Z8PmgY11T8yxUGMQcn5v/oW+enH+aoA4AnBPLqxbnppf3ClHRKHh5IHwA8Ki7p3IGBvstmqzMKv7F/cMRQZpak9uzHFhHKAPCwtmAgeM9Vaz/ZEjBuqbqQCoIYU4p95/zM2x+dmHuWow8AruT1rkaVmFGmRQwAoL4sSaMHBvouFt6AlpXtslQ4Za6TM64AgG3ecfW6P+oIBd5Q2yW0sn+MJk1r9AunJ9/29FziAn8BAHCFXPBi5VWOm8U5ZcZeAwDU37Sks7nuSUYtJe0fHMkNxJk/20r+4Ju5wToBoCHevGXNL61rCf2hLYVVGMTMpc0Tfz108V0Xk+k5/hIA0BD5wYtXZjZyQkqZbkkWbwkAaIiZAwN9p3M3JkdluzflhzK5j4G8j4Ei3zP4OwGoxc9uWNG/rbP106qi1Z5laVbF+tBXGMSMJVP/+fHnxz9e4wNEYJl9MLS4aT0ANLtcXdJS8wYvhSaVmUYVANAY4wcG+kZdW2HPC28Kg5nAMp+X+plE9yn4S+GsDWaRr0stm17iZ8UqrEt9XenyhevXEhXkJQdIXG76N1y6nuZmnCqmWPCdu/7mP8yECn4eKCgj//dDBT/PD5EKr8m5381/5beiDBbZpmCR6zsABMq4rzR7veGMpASHAgAa5mRT/td0/+BI/gNA4QOBUeIVKHGTL/zvc/7DzFI/K1aWlihXSzwALade/yE3a/xdq8ryl5pCcqlyS/1euozlzCLLmDb83pLBCqEDUPK6ngtz8gOcXHAUzrtu5gc9RnaZ/I+BvDICeT/LD4xouQm4B8FLZRKSTnMYAKBhpqg4AgBQo/2DI7mgJhfm5LrfFna3XeqVv3zh73K/BhYE1JyD69plXNIUhwEAGiJFpQ4AAJfLtvQJaGEg/MLwptj3Cj/P/0g3LnhNfqvepVrAYnmWpBEVG/cMAFCXGxoAAGgi2XHXQloIdcJaHOgUfl34vdxH6hFwUv7gugQv9pqTdJ7DAAB1Z1J5AgAAVcmOsRbW4jAnlPe9Ut/PBTlAIcZ4qZ/zyoQxAID6mSeEAQAAdZdtjZMfykR0eXgTKfg6F+RQf/GXXFcjxnmpr7SkUyLsAoB6OkclBgAAeEp2jJyIpJbsx2De57nQJpL3NV2n3Cl/6nrGJ2mMKWUG6gUAOC8l6TkqJAAAwPf2D47kQplcMFP4eS68yYU51JGckT/OCy0w3OGMpDiHAQAcN3JgoG+OCgYAAECBbGubVi1ucdOSfYULvkd9amm5KaUDosWLGyWUCWLoBgYAzrlwYKDvoqg0AAAA1Gb/4EhIC4FN7lUY4OQ+bxYMsOst48p0TQIA2O9SACMRwgAAANTN/sGRXGua3Ks17/P81jZeZOR9ZEppb7GUGaQ3xaEAANuYks4dGOibLnazBAAAgAtkZ47KD2raCj7mwhs31OMCBQ/yBC/eNS/pHIcBAGwRl3TmwEBfovAHhDAAAAAelB1suFULrWnatNAVKhfUBB1YtZFXhyR48ZcLkmY5DABQNUvSmKSLBwb6rFI3UQAAAPhQdryadmUCmbbsqzXvFSmzqFzwYuVVMuE/pqQRMY4PAFRjWpnxX1LL3VABAADQhPYPjgS0EMzkQpqWgu9JmW5HPJg3hxlJoxwGAKjoujl2YKAvXs7ChDAAAAAoKjs+TasWWtO0a3FA08JR8qWzkmIcBgAoyVKm5cvFcsOXHEIYAAAAVCXbkqZdi0OaXFDTpsUD98I7kpJOi25nAFAoJWlS0uRy3Y5KIYQBAACAI7JTcncoE8i0F3wMcYRcbSL7AoBmZynT5WjqwEBfzYOXE8IAAACg7vYPjoQlRbXQeia/FU2YI+SKh47TyrSKAYBmNKdMl6PpAwN9to2LRggDAAAAV8kGNB3KhDLR7Kst+5H6a/3ElBkfBgCagSVpXpngZebAQF/aiZVwEwMAAIBn7B8cybWYiRa8IhwdR4xlH0gAwI9Skmazrzk7W7yUQggDAAAAz9s/OBJSpvVM7pULZ1o5OjUxJZ2SlOZQAPCJmLLBy4GBvrrPBEcIAwAAAN/KzuCUC2VyH3MtaagLl2dG0iiHAYBHxZTpZjQnab4erV2Wwo0HAAAATSnbtSm/1UwuoGFg4Mudyz7EAIDbuSp0KUQIAwAAAOTZPzgS0eXhTLN3bUop0y3J4h0CwEXSygQusdzLbaFLIUIYAAAAoAxFujblZmxqlxRsgkMwKeki7wQADWJJiisvdDkw0Jf02k4QwgAAAAA1yraeyR9vJjeLU5v8E9BYks5ISvAXB+AwU5nAJa5M4BKXlDgw0Of51niEMAAAAICD9g+OtGhxMJP/CnhsdxKSTvNXBWCjtBaClrik+IGBPt+GvYQwAAAAQIPsHxxpVSagye/a1CZ3t6AZlzTFXw9AhdLKBLkJZVu2KBO4pJvpIBDCAAAAAC6U7eKUC2Xyw5k2SS0NrMtbkkayD1QAUCjXlWhR4HJgoC/FoSGEAQAAADxp/+BIfjiTH9K0Soo4vPo5Sef5KwBNy5KU1ELQcunzZmvZUilCGAAAAMBn9g+OBLUQzLTkfd6a/brFhtWcVyaMAeBfybxXLnBJeHFWIrcghAEAAACaTHa67RYtBDO5j7mQplVSaJli0pJOKdP1AIA3mVoctOTClqSklB9mI3IbQhgAAAAAl9k/OBLS5SFNS8HHaUkXOVqAa+W6DaW0ELKklA1a6DpUf4QwAAAAAKqSbVETKvIKSgrnfc5zB+CMXEuWwpAl15KFwXBdhoshAAAAAEdlx6gpFdbkf+T5BFhgKhOo5L+S+Z8fGOijO6DHcJEDAAAA4Ar7B0cMLYQyhQFNsOBnQY4YPCytywOWRUELAYs/EcIAAAAA8JxsYJMfzAS0OKAp9r0ARw4Oym+5ktbioCWd/30GvG1ehDAAAAAAmkI2uCk3rMl/Ma5N8zGVCUxyH4t9vihcIVhBObiQAAAAAMAy8gKc/GAmUMb3AtnnLqPgazjHUiYkKedVNGAhUIFTOPkBAAAAoM6yM0sVBjNLfVTeR6Pg89xzXbDI94r9zlLPh9U8I1rZV6H0MsuaeR+tIl8XvswiXy96MY4K3O7/AZZUtFkU5LbHAAAAAElFTkSuQmCC"
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAyIiBoZWlnaHQ9IjE4NiIgdmlld0JveD0iMCAwIDMwMiAxODYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgo8cmVjdCB3aWR0aD0iMzAyIiBoZWlnaHQ9IjE4NiIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMzEzXzIwNDgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAwMDMwMjMzMikgc2NhbGUoMC4wMDA4OTI2IDAuMDAxNDQ5MjgpIi8+CjwvcGF0dGVybj4KPGltYWdlIGlkPSJpbWFnZTBfMzEzXzIwNDgiIHdpZHRoPSIxMTIxIiBoZWlnaHQ9IjY5MCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUJHRUFBQUt5Q0FZQUFBQjE2c09KQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQkZVR2xVV0hSWVRVdzZZMjl0TG1Ga2IySmxMbmh0Y0FBQUFBQUFQRDk0Y0dGamEyVjBJR0psWjJsdVBTTHZ1NzhpSUdsa1BTSlhOVTB3VFhCRFpXaHBTSHB5WlZONlRsUmplbXRqT1dRaVB6NGdQSGc2ZUcxd2JXVjBZU0I0Yld4dWN6cDRQU0poWkc5aVpUcHVjenB0WlhSaEx5SWdlRHA0YlhCMGF6MGlRV1J2WW1VZ1dFMVFJRU52Y21VZ055NHlMV013TURBZ056a3VNV0kyTldFM09XSTBMQ0F5TURJeUx6QTJMekV6TFRJeU9qQXhPakF4SUNBZ0lDQWdJQ0FpUGlBOGNtUm1PbEpFUmlCNGJXeHVjenB5WkdZOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2TURJdk1qSXRjbVJtTFhONWJuUmhlQzF1Y3lNaVBpQThjbVJtT2tSbGMyTnlhWEIwYVc5dUlISmtaanBoWW05MWREMGlJaUI0Yld4dWN6cGtZejBpYUhSMGNEb3ZMM0IxY213dWIzSm5MMlJqTDJWc1pXMWxiblJ6THpFdU1TOGlJSGh0Ykc1ek9uaHRjRDBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3THlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenB6ZEVWMmREMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMM05VZVhCbEwxSmxjMjkxY21ObFJYWmxiblFqSWlCNGJXeHVjenBwYkd4MWMzUnlZWFJ2Y2owaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOXBiR3gxYzNSeVlYUnZjaTh4TGpBdklpQjRiV3h1Y3pwNGJYQlVVR2M5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5MEwzQm5MeUlnZUcxc2JuTTZjM1JFYVcwOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOXpWSGx3WlM5RWFXMWxibk5wYjI1ekl5SWdlRzFzYm5NNmMzUkdiblE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5elZIbHdaUzlHYjI1MEl5SWdlRzFzYm5NNmVHMXdSejBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3TDJjdklpQjRiV3h1Y3pwd1pHWTlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2Y0dSbUx6RXVNeThpSUhodGJHNXpPbkJvYjNSdmMyaHZjRDBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5d2FHOTBiM05vYjNBdk1TNHdMeUlnWkdNNlptOXliV0YwUFNKcGJXRm5aUzl3Ym1jaUlIaHRjRHBOWlhSaFpHRjBZVVJoZEdVOUlqSXdNakl0TVRFdE1UUlVNVFk2TVRZNk1USXRNRGM2TURBaUlIaHRjRHBOYjJScFpubEVZWFJsUFNJeU1ESXlMVEV4TFRFMFZERTJPakUyT2pFeUxUQTNPakF3SWlCNGJYQTZRM0psWVhSbFJHRjBaVDBpTWpBeU1TMHdNaTB5TWxReE16b3hNRG93TWkwd056b3dNQ0lnZUcxd09rTnlaV0YwYjNKVWIyOXNQU0pCWkc5aVpTQkpiR3gxYzNSeVlYUnZjaUF5TlM0eUlDaE5ZV05wYm5SdmMyZ3BJaUI0YlhCTlRUcEpibk4wWVc1alpVbEVQU0o0YlhBdWFXbGtPbU5pTURkaE1qTmlMV0poTmpndE5HUXpNaTFoTjJSbUxUTXdZalJrWVRrM1lURTJNeUlnZUcxd1RVMDZSRzlqZFcxbGJuUkpSRDBpZUcxd0xtUnBaRG8xTmpWaVpEWXhPQzFrTXpVM0xUUmpNRE10T0RJME1TMWpNREEyWWpJME9XTTFZemNpSUhodGNFMU5Pazl5YVdkcGJtRnNSRzlqZFcxbGJuUkpSRDBpZFhWcFpEbzFSREl3T0RreU5Ea3pRa1pFUWpFeE9URTBRVGcxT1RCRU16RTFNRGhET0NJZ2VHMXdUVTA2VW1WdVpHbDBhVzl1UTJ4aGMzTTlJbkJ5YjI5bU9uQmtaaUlnYVd4c2RYTjBjbUYwYjNJNlUzUmhjblIxY0ZCeWIyWnBiR1U5SWxCeWFXNTBJaUJwYkd4MWMzUnlZWFJ2Y2pwRGNtVmhkRzl5VTNWaVZHOXZiRDBpUVVsU2IySnBiaUlnYVd4c2RYTjBjbUYwYjNJNlZIbHdaVDBpUkc5amRXMWxiblFpSUhodGNGUlFaenBJWVhOV2FYTnBZbXhsVDNabGNuQnlhVzUwUFNKR1lXeHpaU0lnZUcxd1ZGQm5Pa2hoYzFacGMybGliR1ZVY21GdWMzQmhjbVZ1WTNrOUlsUnlkV1VpSUhodGNGUlFaenBPVUdGblpYTTlJakVpSUhCa1pqcFFjbTlrZFdObGNqMGlRV1J2WW1VZ1VFUkdJR3hwWW5KaGNua2dNVFV1TURBaUlIQm9iM1J2YzJodmNEcERiMnh2Y2sxdlpHVTlJak1pUGlBOFpHTTZkR2wwYkdVK0lEeHlaR1k2UVd4MFBpQThjbVJtT214cElIaHRiRHBzWVc1blBTSjRMV1JsWm1GMWJIUWlQbjVoYVMxaE16bGlZVGMxTUMwNE56QmpMVFEzTlRndFlXWmpOQzAyTnpNNVptSmxOV05qTWpKZlBDOXlaR1k2YkdrK0lEd3ZjbVJtT2tGc2RENGdQQzlrWXpwMGFYUnNaVDRnUEhodGNFMU5Pa1JsY21sMlpXUkdjbTl0SUhOMFVtVm1PbWx1YzNSaGJtTmxTVVE5SW5WMWFXUTZOV1ZtWVRNeE9Ea3RZMk5tTlMxbU16UmhMV0k1WkdVdE1qVTVZbVk0T0RZeE5EVXpJaUJ6ZEZKbFpqcGtiMk4xYldWdWRFbEVQU0o0YlhBdVpHbGtPalUyTldKa05qRTRMV1F6TlRjdE5HTXdNeTA0TWpReExXTXdNRFppTWpRNVl6VmpOeUlnYzNSU1pXWTZiM0pwWjJsdVlXeEViMk4xYldWdWRFbEVQU0oxZFdsa09qVkVNakE0T1RJME9UTkNSa1JDTVRFNU1UUkJPRFU1TUVRek1UVXdPRU00SWlCemRGSmxaanB5Wlc1a2FYUnBiMjVEYkdGemN6MGljSEp2YjJZNmNHUm1JaTgrSUR4NGJYQk5UVHBJYVhOMGIzSjVQaUE4Y21SbU9sTmxjVDRnUEhKa1pqcHNhU0J6ZEVWMmREcGhZM1JwYjI0OUluTmhkbVZrSWlCemRFVjJkRHBwYm5OMFlXNWpaVWxFUFNKNGJYQXVhV2xrT2pBMVlqUmxaRE0zTFRoa016SXROR00wTmkwNU4yWXdMVGRpTmpGbE16WmhabVExTXlJZ2MzUkZkblE2ZDJobGJqMGlNakF4T0MweE1DMHpNRlF4TmpveU16b3lNaTB3Tmpvd01DSWdjM1JGZG5RNmMyOW1kSGRoY21WQloyVnVkRDBpUVdSdlltVWdTV3hzZFhOMGNtRjBiM0lnUTBNZ01qSXVNU0FvVFdGamFXNTBiM05vS1NJZ2MzUkZkblE2WTJoaGJtZGxaRDBpTHlJdlBpQThjbVJtT214cElITjBSWFowT21GamRHbHZiajBpYzJGMlpXUWlJSE4wUlhaME9tbHVjM1JoYm1ObFNVUTlJbmh0Y0M1cGFXUTZOVFkxWW1RMk1UZ3RaRE0xTnkwMFl6QXpMVGd5TkRFdFl6QXdObUl5TkRsak5XTTNJaUJ6ZEVWMmREcDNhR1Z1UFNJeU1ESXdMVEE1TFRFMFZERTJPakl4T2pReUxUQTJPakF3SWlCemRFVjJkRHB6YjJaMGQyRnlaVUZuWlc1MFBTSkJaRzlpWlNCSmJHeDFjM1J5WVhSdmNpQXlOQzR6SUNoTllXTnBiblJ2YzJncElpQnpkRVYyZERwamFHRnVaMlZrUFNJdklpOCtJRHh5WkdZNmJHa2djM1JGZG5RNllXTjBhVzl1UFNKamIyNTJaWEowWldRaUlITjBSWFowT25CaGNtRnRaWFJsY25NOUltWnliMjBnWVhCd2JHbGpZWFJwYjI0dmNHUm1JSFJ2SUdGd2NHeHBZMkYwYVc5dUwzWnVaQzVoWkc5aVpTNXdhRzkwYjNOb2IzQWlMejRnUEhKa1pqcHNhU0J6ZEVWMmREcGhZM1JwYjI0OUltUmxjbWwyWldRaUlITjBSWFowT25CaGNtRnRaWFJsY25NOUltTnZiblpsY25SbFpDQm1jbTl0SUdGd2NHeHBZMkYwYVc5dUwzWnVaQzVoWkc5aVpTNXdhRzkwYjNOb2IzQWdkRzhnYVcxaFoyVXZjRzVuSWk4K0lEeHlaR1k2YkdrZ2MzUkZkblE2WVdOMGFXOXVQU0p6WVhabFpDSWdjM1JGZG5RNmFXNXpkR0Z1WTJWSlJEMGllRzF3TG1scFpEcGpOemcwTURZME5DMWlaVEF3TFRRME5HSXRZVGRtWkMxaVlqVXhNbVE0TlRCbE1UQWlJSE4wUlhaME9uZG9aVzQ5SWpJd01qSXRNVEV0TVRSVU1UWTZNVEk2TWpFdE1EYzZNREFpSUhOMFJYWjBPbk52Wm5SM1lYSmxRV2RsYm5ROUlrRmtiMkpsSUZCb2IzUnZjMmh2Y0NBeU15NDFJQ2hOWVdOcGJuUnZjMmdwSWlCemRFVjJkRHBqYUdGdVoyVmtQU0l2SWk4K0lEeHlaR1k2YkdrZ2MzUkZkblE2WVdOMGFXOXVQU0p6WVhabFpDSWdjM1JGZG5RNmFXNXpkR0Z1WTJWSlJEMGllRzF3TG1scFpEcGpZakEzWVRJellpMWlZVFk0TFRSa016SXRZVGRrWmkwek1HSTBaR0U1TjJFeE5qTWlJSE4wUlhaME9uZG9aVzQ5SWpJd01qSXRNVEV0TVRSVU1UWTZNVFk2TVRJdE1EYzZNREFpSUhOMFJYWjBPbk52Wm5SM1lYSmxRV2RsYm5ROUlrRmtiMkpsSUZCb2IzUnZjMmh2Y0NBeU15NDFJQ2hOWVdOcGJuUnZjMmdwSWlCemRFVjJkRHBqYUdGdVoyVmtQU0l2SWk4K0lEd3ZjbVJtT2xObGNUNGdQQzk0YlhCTlRUcElhWE4wYjNKNVBpQThlRzF3VkZCbk9rMWhlRkJoWjJWVGFYcGxJSE4wUkdsdE9uYzlJakV5TWpRdU1EQXdNREF3SWlCemRFUnBiVHBvUFNJNE9UY3VORGcyTlRZMElpQnpkRVJwYlRwMWJtbDBQU0pRYjJsdWRITWlMejRnUEhodGNGUlFaenBHYjI1MGN6NGdQSEprWmpwQ1lXYytJRHh5WkdZNmJHa2djM1JHYm5RNlptOXVkRTVoYldVOUlrMTVjbWxoWkZCeWJ5MVNaV2QxYkdGeUlpQnpkRVp1ZERwbWIyNTBSbUZ0YVd4NVBTSk5lWEpwWVdRZ1VISnZJaUJ6ZEVadWREcG1iMjUwUm1GalpUMGlVbVZuZFd4aGNpSWdjM1JHYm5RNlptOXVkRlI1Y0dVOUlrOXdaVzRnVkhsd1pTSWdjM1JHYm5RNmRtVnljMmx2YmxOMGNtbHVaejBpVm1WeWMybHZiaUF5TGpFeE5UdFFVeUF5TGpBd01EdG9iM1JqYjI1MklERXVNQzQ0TVR0dFlXdGxiM1JtTG14cFlqSXVOUzQyTXpRd05pSWdjM1JHYm5RNlkyOXRjRzl6YVhSbFBTSkdZV3h6WlNJZ2MzUkdiblE2Wm05dWRFWnBiR1ZPWVcxbFBTSXVOamcxTVM1dmRHWWlMejRnUEhKa1pqcHNhU0J6ZEVadWREcG1iMjUwVG1GdFpUMGlUM0JsYmxOaGJuTXRRbTlzWkNJZ2MzUkdiblE2Wm05dWRFWmhiV2xzZVQwaVQzQmxiaUJUWVc1eklpQnpkRVp1ZERwbWIyNTBSbUZqWlQwaVFtOXNaQ0lnYzNSR2JuUTZabTl1ZEZSNWNHVTlJazl3Wlc0Z1ZIbHdaU0lnYzNSR2JuUTZkbVZ5YzJsdmJsTjBjbWx1WnowaVZtVnljMmx2YmlBeExqRXdJaUJ6ZEVadWREcGpiMjF3YjNOcGRHVTlJa1poYkhObElpQnpkRVp1ZERwbWIyNTBSbWxzWlU1aGJXVTlJazl3Wlc1VFlXNXpMVUp2YkdRdWRIUm1JaTgrSUR3dmNtUm1Pa0poWno0Z1BDOTRiWEJVVUdjNlJtOXVkSE0rSUR4NGJYQlVVR2M2VUd4aGRHVk9ZVzFsY3o0Z1BISmtaanBUWlhFK0lEeHlaR1k2YkdrK1EzbGhiand2Y21SbU9teHBQaUE4Y21SbU9teHBQazFoWjJWdWRHRThMM0prWmpwc2FUNGdQSEprWmpwc2FUNVpaV3hzYjNjOEwzSmtaanBzYVQ0Z1BISmtaanBzYVQ1Q2JHRmphend2Y21SbU9teHBQaUE4TDNKa1pqcFRaWEUrSUR3dmVHMXdWRkJuT2xCc1lYUmxUbUZ0WlhNK0lEeDRiWEJVVUdjNlUzZGhkR05vUjNKdmRYQnpQaUE4Y21SbU9sTmxjVDRnUEhKa1pqcHNhVDRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUI0YlhCSE9tZHliM1Z3VG1GdFpUMGlSR1ZtWVhWc2RDQlRkMkYwWTJnZ1IzSnZkWEFpSUhodGNFYzZaM0p2ZFhCVWVYQmxQU0l3SWo0Z1BIaHRjRWM2UTI5c2IzSmhiblJ6UGlBOGNtUm1PbE5sY1Q0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWxkb2FYUmxJaUI0YlhCSE9tMXZaR1U5SWxKSFFpSWdlRzF3UnpwMGVYQmxQU0pRVWs5RFJWTlRJaUI0YlhCSE9uSmxaRDBpTWpVMUlpQjRiWEJIT21keVpXVnVQU0l5TlRVaUlIaHRjRWM2WW14MVpUMGlNalUxSWk4K0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKQ2JHRmpheUlnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmRIbHdaVDBpVUZKUFEwVlRVeUlnZUcxd1J6cHlaV1E5SWpNMUlpQjRiWEJIT21keVpXVnVQU0l6TVNJZ2VHMXdSenBpYkhWbFBTSXpNaUl2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpUTAxWlN5QlNaV1FpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZjbVZrUFNJeU16WWlJSGh0Y0VjNlozSmxaVzQ5SWpJNElpQjRiWEJIT21Kc2RXVTlJak0ySWk4K0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKRFRWbExJRmxsYkd4dmR5SWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpweVpXUTlJakkxTlNJZ2VHMXdSenBuY21WbGJqMGlNalF4SWlCNGJYQkhPbUpzZFdVOUlqQWlMejRnUEhKa1pqcHNhU0I0YlhCSE9uTjNZWFJqYUU1aGJXVTlJa05OV1VzZ1IzSmxaVzRpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZjbVZrUFNJd0lpQjRiWEJIT21keVpXVnVQU0l4TmpVaUlIaHRjRWM2WW14MVpUMGlPREVpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWtOTldVc2dRM2xoYmlJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqQWlJSGh0Y0VjNlozSmxaVzQ5SWpFM015SWdlRzF3UnpwaWJIVmxQU0l5TXpnaUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlrTk5XVXNnUW14MVpTSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpweVpXUTlJalEySWlCNGJYQkhPbWR5WldWdVBTSTBPU0lnZUcxd1J6cGliSFZsUFNJeE5EVWlMejRnUEhKa1pqcHNhU0I0YlhCSE9uTjNZWFJqYUU1aGJXVTlJa05OV1VzZ1RXRm5aVzUwWVNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqSXpOU0lnZUcxd1J6cG5jbVZsYmowaU1DSWdlRzF3UnpwaWJIVmxQU0l4TXpraUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlrTTlNVFVnVFQweE1EQWdXVDA1TUNCTFBURXdJaUI0YlhCSE9tMXZaR1U5SWxKSFFpSWdlRzF3UnpwMGVYQmxQU0pRVWs5RFJWTlRJaUI0YlhCSE9uSmxaRDBpTVRrd0lpQjRiWEJIT21keVpXVnVQU0l6TUNJZ2VHMXdSenBpYkhWbFBTSTBOU0l2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpUXowd0lFMDlPVEFnV1QwNE5TQkxQVEFpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZjbVZrUFNJeU16Z2lJSGh0Y0VjNlozSmxaVzQ5SWpZMElpQjRiWEJIT21Kc2RXVTlJalUwSWk4K0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKRFBUQWdUVDA0TUNCWlBUazFJRXM5TUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqSTBNQ0lnZUcxd1J6cG5jbVZsYmowaU9UQWlJSGh0Y0VjNllteDFaVDBpTkRBaUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlrTTlNQ0JOUFRVd0lGazlNVEF3SUVzOU1DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpweVpXUTlJakkwTmlJZ2VHMXdSenBuY21WbGJqMGlNVFEySWlCNGJYQkhPbUpzZFdVOUlqTXdJaTgrSUR4eVpHWTZiR2tnZUcxd1J6cHpkMkYwWTJoT1lXMWxQU0pEUFRBZ1RUMHpOU0JaUFRnMUlFczlNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmRIbHdaVDBpVUZKUFEwVlRVeUlnZUcxd1J6cHlaV1E5SWpJMU1DSWdlRzF3UnpwbmNtVmxiajBpTVRjMUlpQjRiWEJIT21Kc2RXVTlJalkwSWk4K0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKRFBUVWdUVDB3SUZrOU9UQWdTejB3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cDBlWEJsUFNKUVVrOURSVk5USWlCNGJYQkhPbkpsWkQwaU1qUTVJaUI0YlhCSE9tZHlaV1Z1UFNJeU16WWlJSGh0Y0VjNllteDFaVDBpTkRraUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlrTTlNakFnVFQwd0lGazlNVEF3SUVzOU1DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpweVpXUTlJakl4TkNJZ2VHMXdSenBuY21WbGJqMGlNakl5SWlCNGJYQkhPbUpzZFdVOUlqTTFJaTgrSUR4eVpHWTZiR2tnZUcxd1J6cHpkMkYwWTJoT1lXMWxQU0pEUFRVd0lFMDlNQ0JaUFRFd01DQkxQVEFpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZjbVZrUFNJeE16a2lJSGh0Y0VjNlozSmxaVzQ5SWpFNU55SWdlRzF3UnpwaWJIVmxQU0kyTXlJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVF6MDNOU0JOUFRBZ1dUMHhNREFnU3owd0lpQjRiWEJIT20xdlpHVTlJbEpIUWlJZ2VHMXdSenAwZVhCbFBTSlFVazlEUlZOVElpQjRiWEJIT25KbFpEMGlOVFVpSUhodGNFYzZaM0psWlc0OUlqRTNPU0lnZUcxd1J6cGliSFZsUFNJM05DSXZQaUE4Y21SbU9teHBJSGh0Y0VjNmMzZGhkR05vVG1GdFpUMGlRejA0TlNCTlBURXdJRms5TVRBd0lFczlNVEFpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZjbVZrUFNJd0lpQjRiWEJIT21keVpXVnVQU0l4TkRjaUlIaHRjRWM2WW14MVpUMGlOamtpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWtNOU9UQWdUVDB6TUNCWlBUazFJRXM5TXpBaUlIaHRjRWM2Ylc5a1pUMGlVa2RDSWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2Y21Wa1BTSXdJaUI0YlhCSE9tZHlaV1Z1UFNJeE1EUWlJSGh0Y0VjNllteDFaVDBpTlRZaUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlrTTlOelVnVFQwd0lGazlOelVnU3owd0lpQjRiWEJIT20xdlpHVTlJbEpIUWlJZ2VHMXdSenAwZVhCbFBTSlFVazlEUlZOVElpQjRiWEJIT25KbFpEMGlOREVpSUhodGNFYzZaM0psWlc0OUlqRTRNQ0lnZUcxd1J6cGliSFZsUFNJeE1UVWlMejRnUEhKa1pqcHNhU0I0YlhCSE9uTjNZWFJqYUU1aGJXVTlJa005T0RBZ1RUMHhNQ0JaUFRRMUlFczlNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmRIbHdaVDBpVUZKUFEwVlRVeUlnZUcxd1J6cHlaV1E5SWpBaUlIaHRjRWM2WjNKbFpXNDlJakUyTmlJZ2VHMXdSenBpYkhWbFBTSXhOVFlpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWtNOU56QWdUVDB4TlNCWlBUQWdTejB3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cDBlWEJsUFNKUVVrOURSVk5USWlCNGJYQkhPbkpsWkQwaU16Z2lJSGh0Y0VjNlozSmxaVzQ5SWpFMk9TSWdlRzF3UnpwaWJIVmxQU0l5TWpRaUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlrTTlPRFVnVFQwMU1DQlpQVEFnU3owd0lpQjRiWEJIT20xdlpHVTlJbEpIUWlJZ2VHMXdSenAwZVhCbFBTSlFVazlEUlZOVElpQjRiWEJIT25KbFpEMGlNamNpSUhodGNFYzZaM0psWlc0OUlqRXhOeUlnZUcxd1J6cGliSFZsUFNJeE9EY2lMejRnUEhKa1pqcHNhU0I0YlhCSE9uTjNZWFJqYUU1aGJXVTlJa005TVRBd0lFMDlPVFVnV1QwMUlFczlNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmRIbHdaVDBpVUZKUFEwVlRVeUlnZUcxd1J6cHlaV1E5SWpReklpQjRiWEJIT21keVpXVnVQU0kxTmlJZ2VHMXdSenBpYkhWbFBTSXhORE1pTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWtNOU1UQXdJRTA5TVRBd0lGazlNalVnU3oweU5TSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpweVpXUTlJak00SWlCNGJYQkhPbWR5WldWdVBTSXpOQ0lnZUcxd1J6cGliSFZsUFNJNU55SXZQaUE4Y21SbU9teHBJSGh0Y0VjNmMzZGhkR05vVG1GdFpUMGlRejAzTlNCTlBURXdNQ0JaUFRBZ1N6MHdJaUI0YlhCSE9tMXZaR1U5SWxKSFFpSWdlRzF3UnpwMGVYQmxQU0pRVWs5RFJWTlRJaUI0YlhCSE9uSmxaRDBpTVRBeElpQjRiWEJIT21keVpXVnVQU0kwTlNJZ2VHMXdSenBpYkhWbFBTSXhORFFpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWtNOU5UQWdUVDB4TURBZ1dUMHdJRXM5TUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqRTBOQ0lnZUcxd1J6cG5jbVZsYmowaU16a2lJSGh0Y0VjNllteDFaVDBpTVRReUlpOCtJRHh5WkdZNmJHa2dlRzF3UnpwemQyRjBZMmhPWVcxbFBTSkRQVE0xSUUwOU1UQXdJRms5TXpVZ1N6MHhNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmRIbHdaVDBpVUZKUFEwVlRVeUlnZUcxd1J6cHlaV1E5SWpFMU9DSWdlRzF3UnpwbmNtVmxiajBpTXpFaUlIaHRjRWM2WW14MVpUMGlPVGtpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWtNOU1UQWdUVDB4TURBZ1dUMDFNQ0JMUFRBaUlIaHRjRWM2Ylc5a1pUMGlVa2RDSWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2Y21Wa1BTSXlNVGNpSUhodGNFYzZaM0psWlc0OUlqSTRJaUI0YlhCSE9tSnNkV1U5SWpreUlpOCtJRHh5WkdZNmJHa2dlRzF3UnpwemQyRjBZMmhPWVcxbFBTSkRQVEFnVFQwNU5TQlpQVEl3SUVzOU1DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpweVpXUTlJakl6TmlJZ2VHMXdSenBuY21WbGJqMGlOREVpSUhodGNFYzZZbXgxWlQwaU1USXpJaTgrSUR4eVpHWTZiR2tnZUcxd1J6cHpkMkYwWTJoT1lXMWxQU0pEUFRJMUlFMDlNalVnV1QwME1DQkxQVEFpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZjbVZrUFNJeE9UTWlJSGh0Y0VjNlozSmxaVzQ5SWpFNE1DSWdlRzF3UnpwaWJIVmxQU0l4TlRRaUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlrTTlOREFnVFQwME5TQlpQVFV3SUVzOU5TSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpweVpXUTlJakUxTkNJZ2VHMXdSenBuY21WbGJqMGlNVE15SWlCNGJYQkhPbUpzZFdVOUlqRXlNU0l2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpUXowMU1DQk5QVFV3SUZrOU5qQWdTejB5TlNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqRXhNeUlnZUcxd1J6cG5jbVZsYmowaU1UQXhJaUI0YlhCSE9tSnNkV1U5SWpnNElpOCtJRHh5WkdZNmJHa2dlRzF3UnpwemQyRjBZMmhPWVcxbFBTSkRQVFUxSUUwOU5qQWdXVDAyTlNCTFBUUXdJaUI0YlhCSE9tMXZaR1U5SWxKSFFpSWdlRzF3UnpwMGVYQmxQU0pRVWs5RFJWTlRJaUI0YlhCSE9uSmxaRDBpT1RBaUlIaHRjRWM2WjNKbFpXNDlJamMwSWlCNGJYQkhPbUpzZFdVOUlqWTJJaTgrSUR4eVpHWTZiR2tnZUcxd1J6cHpkMkYwWTJoT1lXMWxQU0pEUFRJMUlFMDlOREFnV1QwMk5TQkxQVEFpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZjbVZrUFNJeE9UVWlJSGh0Y0VjNlozSmxaVzQ5SWpFMU15SWdlRzF3UnpwaWJIVmxQU0l4TURjaUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlrTTlNekFnVFQwMU1DQlpQVGMxSUVzOU1UQWlJSGh0Y0VjNmJXOWtaVDBpVWtkQ0lpQjRiWEJIT25SNWNHVTlJbEJTVDBORlUxTWlJSGh0Y0VjNmNtVmtQU0l4TmpnaUlIaHRjRWM2WjNKbFpXNDlJakV5TkNJZ2VHMXdSenBpYkhWbFBTSTNPU0l2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpUXowek5TQk5QVFl3SUZrOU9EQWdTejB5TlNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqRXpPQ0lnZUcxd1J6cG5jbVZsYmowaU9UTWlJSGh0Y0VjNllteDFaVDBpTlRraUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlrTTlOREFnVFQwMk5TQlpQVGt3SUVzOU16VWlJSGh0Y0VjNmJXOWtaVDBpVWtkQ0lpQjRiWEJIT25SNWNHVTlJbEJTVDBORlUxTWlJSGh0Y0VjNmNtVmtQU0l4TVRjaUlIaHRjRWM2WjNKbFpXNDlJamMySWlCNGJYQkhPbUpzZFdVOUlqUXdJaTgrSUR4eVpHWTZiR2tnZUcxd1J6cHpkMkYwWTJoT1lXMWxQU0pEUFRRd0lFMDlOekFnV1QweE1EQWdTejAxTUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqazJJaUI0YlhCSE9tZHlaV1Z1UFNJMU5pSWdlRzF3UnpwaWJIVmxQU0l4T1NJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVF6MDFNQ0JOUFRjd0lGazlPREFnU3owM01DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpweVpXUTlJalU1SWlCNGJYQkhPbWR5WldWdVBTSXpOU0lnZUcxd1J6cGliSFZsUFNJeU1DSXZQaUE4Y21SbU9teHBJSGh0Y0VjNmMzZGhkR05vVG1GdFpUMGlRejAzTXlCTlBUUXdJRms5TUNCTFBUQWlJSGh0Y0VjNmRIbHdaVDBpVUZKUFEwVlRVeUlnZUcxd1J6cDBhVzUwUFNJeE1EQXVNREF3TURBd0lpQjRiWEJIT20xdlpHVTlJbEpIUWlJZ2VHMXdSenB5WldROUlqY3dJaUI0YlhCSE9tZHlaV1Z1UFNJeE16UWlJSGh0Y0VjNllteDFaVDBpTVRrNElpOCtJRHh5WkdZNmJHa2dlRzF3UnpwemQyRjBZMmhPWVcxbFBTSlNQVFl3SUVjOU9ERWdRajB4TXpNaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpwMGFXNTBQU0l4TURBdU1EQXdNREF3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cHlaV1E5SWpZd0lpQjRiWEJIT21keVpXVnVQU0k0TVNJZ2VHMXdSenBpYkhWbFBTSXhNek1pTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWxJOU1USTJJRWM5TVRZM0lFSTlNakl6SWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0l4TWpZaUlIaHRjRWM2WjNKbFpXNDlJakUyTlNJZ2VHMXdSenBpYkhWbFBTSXlNVFVpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWxJOU1UWTFJRWM5TWpBeklFSTlNak01SWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0l4TmpZaUlIaHRjRWM2WjNKbFpXNDlJakl3TWlJZ2VHMXdSenBpYkhWbFBTSXlNelVpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWxJOU1qQTVJRWM5TWpJMUlFSTlNalF5SWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0l5TURnaUlIaHRjRWM2WjNKbFpXNDlJakl5TlNJZ2VHMXdSenBpYkhWbFBTSXlOREVpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWxJOU1qUTFJRWM5TWpRM0lFSTlNalE1SWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0l5TkRRaUlIaHRjRWM2WjNKbFpXNDlJakkwTmlJZ2VHMXdSenBpYkhWbFBTSXlORGdpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWxJOU1qUTNJRWM5TVRZMklFSTlNVEEySWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0l5TkRjaUlIaHRjRWM2WjNKbFpXNDlJakUyTmlJZ2VHMXdSenBpYkhWbFBTSXhNRFlpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWxJOU1qVWdSejB5T0NCQ1BUWXdJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZkR2x1ZEQwaU1UQXdMakF3TURBd01DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2Y21Wa1BTSXlOQ0lnZUcxd1J6cG5jbVZsYmowaU1qY2lJSGh0Y0VjNllteDFaVDBpTlRraUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlsSTlOelFnUnoweE1ERWdRajB4TmpNaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpwMGFXNTBQU0l4TURBdU1EQXdNREF3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cHlaV1E5SWpjMElpQjRiWEJIT21keVpXVnVQU0l4TURFaUlIaHRjRWM2WW14MVpUMGlNVFl6SWk4K0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKU1BUa3pJRWM5TVRJMUlFSTlNVGt3SWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0k1TXlJZ2VHMXdSenBuY21WbGJqMGlNVEkxSWlCNGJYQkhPbUpzZFdVOUlqRTVNQ0l2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpVWoweU5UVWdSejB5TURVZ1FqMHpNeUlnZUcxd1J6cDBlWEJsUFNKUVVrOURSVk5USWlCNGJYQkhPblJwYm5ROUlqRXdNQzR3TURBd01EQWlJSGh0Y0VjNmJXOWtaVDBpVWtkQ0lpQjRiWEJIT25KbFpEMGlNalUxSWlCNGJYQkhPbWR5WldWdVBTSXlNRFVpSUhodGNFYzZZbXgxWlQwaU16SWlMejRnUEhKa1pqcHNhU0I0YlhCSE9uTjNZWFJqYUU1aGJXVTlJbEk5TWpBNUlFYzlNakV4SUVJOU1qRXlJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZkR2x1ZEQwaU1UQXdMakF3TURBd01DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2Y21Wa1BTSXlNRGtpSUhodGNFYzZaM0psWlc0OUlqSXhNU0lnZUcxd1J6cGliSFZsUFNJeU1URWlMejRnUEhKa1pqcHNhU0I0YlhCSE9uTjNZWFJqYUU1aGJXVTlJa2RzYjJKaGJDQkRiMnh2Y2lJZ2VHMXdSenAwZVhCbFBTSlFVazlEUlZOVElpQjRiWEJIT25ScGJuUTlJakV3TUM0d01EQXdNREFpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uSmxaRDBpTWpVeElpQjRiWEJIT21keVpXVnVQU0l5TURnaUlIaHRjRWM2WW14MVpUMGlNalFpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWxJOU1DQkhQVGMySUVJOU1URTNJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZkR2x1ZEQwaU1UQXdMakF3TURBd01DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2Y21Wa1BTSXdJaUI0YlhCSE9tZHlaV1Z1UFNJM05pSWdlRzF3UnpwaWJIVmxQU0l4TVRjaUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlsSTlNVEEwSUVjOU1qQTBJRUk5TWpJNUlpQjRiWEJIT25SNWNHVTlJbEJTVDBORlUxTWlJSGh0Y0VjNmRHbHVkRDBpTVRBd0xqQXdNREF3TUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZjbVZrUFNJeE1EVWlJSGh0Y0VjNlozSmxaVzQ5SWpJd015SWdlRzF3UnpwaWJIVmxQU0l5TWpnaUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlsSTlNalV5SUVjOU1UYzRJRUk5TXpFaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpwMGFXNTBQU0l4TURBdU1EQXdNREF3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cHlaV1E5SWpJMU1TSWdlRzF3UnpwbmNtVmxiajBpTVRjNElpQjRiWEJIT21Kc2RXVTlJakk0SWk4K0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKUVFVNVVUMDVGSURJNE1pQkRJaUI0YlhCSE9uUjVjR1U5SWxOUVQxUWlJSGh0Y0VjNmRHbHVkRDBpTVRBd0xqQXdNREF3TUNJZ2VHMXdSenB0YjJSbFBTSk1RVUlpSUhodGNFYzZURDBpTVRBdU9UZ3dNemt5SWlCNGJYQkhPa0U5SWpJaUlIaHRjRWM2UWowaUxUSTJJaTgrSUR4eVpHWTZiR2tnZUcxd1J6cHpkMkYwWTJoT1lXMWxQU0ppYkhWemFDQmpiM0I1SWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0l5TkRJaUlIaHRjRWM2WjNKbFpXNDlJakUxTmlJZ2VHMXdSenBpYkhWbFBTSXhOVFlpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWxJOU1UQTFJRWM5TWpBNUlFSTlOVElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenAwYVc1MFBTSXhNREF1TURBd01EQXdJaUI0YlhCSE9tMXZaR1U5SWxKSFFpSWdlRzF3UnpweVpXUTlJakV3TlNJZ2VHMXdSenBuY21WbGJqMGlNakE1SWlCNGJYQkhPbUpzZFdVOUlqVXlJaTgrSUR4eVpHWTZiR2tnZUcxd1J6cHpkMkYwWTJoT1lXMWxQU0pTUFRVZ1J6MHhOakFnUWowMk9TSWdlRzF3UnpwMGVYQmxQU0pRVWs5RFJWTlRJaUI0YlhCSE9uUnBiblE5SWpFd01DNHdNREF3TURBaUlIaHRjRWM2Ylc5a1pUMGlVa2RDSWlCNGJYQkhPbkpsWkQwaU5TSWdlRzF3UnpwbmNtVmxiajBpTVRZd0lpQjRiWEJIT21Kc2RXVTlJalk0SWk4K0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKU1BUVTFJRWM5TVRnNElFSTlNVFUxSWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0kxTkNJZ2VHMXdSenBuY21WbGJqMGlNVGc0SWlCNGJYQkhPbUpzZFdVOUlqRTFOQ0l2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpVWowME1TQkhQVFF4SUVJOU1UQTFJR052Y0hraUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpwMGFXNTBQU0l4TURBdU1EQXdNREF3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cHlaV1E5SWpRd0lpQjRiWEJIT21keVpXVnVQU0kwTUNJZ2VHMXdSenBpYkhWbFBTSXhNRFVpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWxJOU5TQkhQVEU1TnlCQ1BUSXhPU0lnZUcxd1J6cDBlWEJsUFNKUVVrOURSVk5USWlCNGJYQkhPblJwYm5ROUlqRXdNQzR3TURBd01EQWlJSGh0Y0VjNmJXOWtaVDBpVWtkQ0lpQjRiWEJIT25KbFpEMGlOU0lnZUcxd1J6cG5jbVZsYmowaU1UazJJaUI0YlhCSE9tSnNkV1U5SWpJeE9TSXZQaUE4Y21SbU9teHBJSGh0Y0VjNmMzZGhkR05vVG1GdFpUMGlVajB5TlRVZ1J6MDNNeUJDUFRrNUlpQjRiWEJIT25SNWNHVTlJbEJTVDBORlUxTWlJSGh0Y0VjNmRHbHVkRDBpTVRBd0xqQXdNREF3TUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZjbVZrUFNJeU5UVWlJSGh0Y0VjNlozSmxaVzQ5SWpjeklpQjRiWEJIT21Kc2RXVTlJams0SWk4K0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKU1BUSTFOU0JIUFRJd015QkNQVEV6T0NJZ2VHMXdSenAwZVhCbFBTSlFVazlEUlZOVElpQjRiWEJIT25ScGJuUTlJakV3TUM0d01EQXdNREFpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uSmxaRDBpTWpVMUlpQjRiWEJIT21keVpXVnVQU0l5TURJaUlIaHRjRWM2WW14MVpUMGlNVE0zSWk4K0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKU1BUWXhJRWM5TVRBMklFSTlNakEwSURRaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpwMGFXNTBQU0l4TURBdU1EQXdNREF3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cHlaV1E5SWpZeElpQjRiWEJIT21keVpXVnVQU0l4TURVaUlIaHRjRWM2WW14MVpUMGlNakEwSWk4K0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKemEybHVJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZkR2x1ZEQwaU1UQXdMakF3TURBd01DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2Y21Wa1BTSXlORFFpSUhodGNFYzZaM0psWlc0OUlqSXdOeUlnZUcxd1J6cGliSFZsUFNJeE9URWlMejRnUEhKa1pqcHNhU0I0YlhCSE9uTjNZWFJqYUU1aGJXVTlJbEk5TkRFZ1J6MDBNU0JDUFRFd05TSWdlRzF3UnpwMGVYQmxQU0pRVWs5RFJWTlRJaUI0YlhCSE9uUnBiblE5SWpFd01DNHdNREF3TURBaUlIaHRjRWM2Ylc5a1pUMGlVa2RDSWlCNGJYQkhPbkpsWkQwaU5EQWlJSGh0Y0VjNlozSmxaVzQ5SWpRd0lpQjRiWEJIT21Kc2RXVTlJakV3TlNJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVVqMHlNVFFnUnoweE9EUWdRajB4TkRFaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpwMGFXNTBQU0l4TURBdU1EQXdNREF3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cHlaV1E5SWpJeE5DSWdlRzF3UnpwbmNtVmxiajBpTVRnMElpQjRiWEJIT21Kc2RXVTlJakUwTUNJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVVqMHlOREFnUnoweE9UVWdRajB4TmpnaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpwMGFXNTBQU0l4TURBdU1EQXdNREF3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cHlaV1E5SWpJek9TSWdlRzF3UnpwbmNtVmxiajBpTVRrMElpQjRiWEJIT21Kc2RXVTlJakUyTnlJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVVqMDJNU0JIUFRFd05pQkNQVEl3TkNJZ2VHMXdSenAwZVhCbFBTSlFVazlEUlZOVElpQjRiWEJIT25ScGJuUTlJakV3TUM0d01EQXdNREFpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uSmxaRDBpTmpFaUlIaHRjRWM2WjNKbFpXNDlJakV3TlNJZ2VHMXdSenBpYkhWbFBTSXlNRFFpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SW1Kc2RYTm9JaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZkR2x1ZEQwaU1UQXdMakF3TURBd01DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2Y21Wa1BTSXlORElpSUhodGNFYzZaM0psWlc0OUlqRTFOaUlnZUcxd1J6cGliSFZsUFNJeE5UWWlMejRnUEhKa1pqcHNhU0I0YlhCSE9uTjNZWFJqYUU1aGJXVTlJbEk5TXlCSFBUSXlOQ0JDUFRFNU55SWdlRzF3UnpwMGVYQmxQU0pRVWs5RFJWTlRJaUI0YlhCSE9uUnBiblE5SWpFd01DNHdNREF3TURBaUlIaHRjRWM2Ylc5a1pUMGlVa2RDSWlCNGJYQkhPbkpsWkQwaU15SWdlRzF3UnpwbmNtVmxiajBpTWpJeklpQjRiWEJIT21Kc2RXVTlJakU1TmlJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVVqMDFJRWM5TVRreklFSTlNakUwSWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0kwSWlCNGJYQkhPbWR5WldWdVBTSXhPVElpSUhodGNFYzZZbXgxWlQwaU1qRTBJaTgrSUR4eVpHWTZiR2tnZUcxd1J6cHpkMkYwWTJoT1lXMWxQU0pTUFRjd0lFYzlNVGN5SUVJOU1UazFJaUI0YlhCSE9uUjVjR1U5SWxCU1QwTkZVMU1pSUhodGNFYzZkR2x1ZEQwaU1UQXdMakF3TURBd01DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2Y21Wa1BTSTNNQ0lnZUcxd1J6cG5jbVZsYmowaU1UY3lJaUI0YlhCSE9tSnNkV1U5SWpFNU5TSXZQaUE4Y21SbU9teHBJSGh0Y0VjNmMzZGhkR05vVG1GdFpUMGlVajB5TXlCSFBUSXpJRUk5TlRFaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpwMGFXNTBQU0l4TURBdU1EQXdNREF3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cHlaV1E5SWpJeUlpQjRiWEJIT21keVpXVnVQU0l5TWlJZ2VHMXdSenBpYkhWbFBTSTFNU0l2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpVWowMk1TQkhQVEV3TmlCQ1BUSXdOQ0F5SWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0kzTVNJZ2VHMXdSenBuY21WbGJqMGlNVEExSWlCNGJYQkhPbUpzZFdVOUlqRTNPQ0l2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpVWowMk1TQkhQVEV3TmlCQ1BUSXdOQ0F6SWlCNGJYQkhPblI1Y0dVOUlsQlNUME5GVTFNaUlIaHRjRWM2ZEdsdWREMGlNVEF3TGpBd01EQXdNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmNtVmtQU0kzTVNJZ2VHMXdSenBuY21WbGJqMGlNVEExSWlCNGJYQkhPbUpzZFdVOUlqRTNPQ0l2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpVWowME1TQkhQVFF4SUVJOU1UQTFJR052Y0hrZ01pSWdlRzF3UnpwMGVYQmxQU0pRVWs5RFJWTlRJaUI0YlhCSE9uUnBiblE5SWpFd01DNHdNREF3TURBaUlIaHRjRWM2Ylc5a1pUMGlVa2RDSWlCNGJYQkhPbkpsWkQwaU5ERWlJSGh0Y0VjNlozSmxaVzQ5SWpReUlpQjRiWEJIT21Kc2RXVTlJakV3TkNJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVVqMHlOVEFnUnoweE56WWdRajB5T1NJZ2VHMXdSenAwZVhCbFBTSlFVazlEUlZOVElpQjRiWEJIT25ScGJuUTlJakV3TUM0d01EQXdNREFpSUhodGNFYzZiVzlrWlQwaVVrZENJaUI0YlhCSE9uSmxaRDBpTWpVd0lpQjRiWEJIT21keVpXVnVQU0l4TnpZaUlIaHRjRWM2WW14MVpUMGlNamtpTHo0Z1BDOXlaR1k2VTJWeFBpQThMM2h0Y0VjNlEyOXNiM0poYm5SelBpQThMM0prWmpwRVpYTmpjbWx3ZEdsdmJqNGdQQzl5WkdZNmJHaytJRHh5WkdZNmJHaytJRHh5WkdZNlJHVnpZM0pwY0hScGIyNGdlRzF3UnpwbmNtOTFjRTVoYldVOUlrZHlZWGx6SWlCNGJYQkhPbWR5YjNWd1ZIbHdaVDBpTVNJK0lEeDRiWEJIT2tOdmJHOXlZVzUwY3o0Z1BISmtaanBUWlhFK0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKRFBUQWdUVDB3SUZrOU1DQkxQVEV3TUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqTTFJaUI0YlhCSE9tZHlaV1Z1UFNJek1TSWdlRzF3UnpwaWJIVmxQU0l6TWlJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVF6MHdJRTA5TUNCWlBUQWdTejA1TUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqWTBJaUI0YlhCSE9tZHlaV1Z1UFNJMk5DSWdlRzF3UnpwaWJIVmxQU0kyTlNJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVF6MHdJRTA5TUNCWlBUQWdTejA0TUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqZzRJaUI0YlhCSE9tZHlaV1Z1UFNJNE9TSWdlRzF3UnpwaWJIVmxQU0k1TVNJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVF6MHdJRTA5TUNCWlBUQWdTejAzTUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqRXdPU0lnZUcxd1J6cG5jbVZsYmowaU1URXdJaUI0YlhCSE9tSnNkV1U5SWpFeE1pSXZQaUE4Y21SbU9teHBJSGh0Y0VjNmMzZGhkR05vVG1GdFpUMGlRejB3SUUwOU1DQlpQVEFnU3owMk1DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpweVpXUTlJakV5T0NJZ2VHMXdSenBuY21WbGJqMGlNVEk1SWlCNGJYQkhPbUpzZFdVOUlqRXpNaUl2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpUXowd0lFMDlNQ0JaUFRBZ1N6MDFNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmRIbHdaVDBpVUZKUFEwVlRVeUlnZUcxd1J6cHlaV1E5SWpFME5pSWdlRzF3UnpwbmNtVmxiajBpTVRRNElpQjRiWEJIT21Kc2RXVTlJakUxTVNJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVF6MHdJRTA5TUNCWlBUQWdTejAwTUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqRTJOaUlnZUcxd1J6cG5jbVZsYmowaU1UWTRJaUI0YlhCSE9tSnNkV1U5SWpFM01TSXZQaUE4Y21SbU9teHBJSGh0Y0VjNmMzZGhkR05vVG1GdFpUMGlRejB3SUUwOU1DQlpQVEFnU3owek1DSWdlRzF3UnpwdGIyUmxQU0pTUjBJaUlIaHRjRWM2ZEhsd1pUMGlVRkpQUTBWVFV5SWdlRzF3UnpweVpXUTlJakU0TnlJZ2VHMXdSenBuY21WbGJqMGlNVGc1SWlCNGJYQkhPbUpzZFdVOUlqRTVNU0l2UGlBOGNtUm1PbXhwSUhodGNFYzZjM2RoZEdOb1RtRnRaVDBpUXowd0lFMDlNQ0JaUFRBZ1N6MHlNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmRIbHdaVDBpVUZKUFEwVlRVeUlnZUcxd1J6cHlaV1E5SWpJd09DSWdlRzF3UnpwbmNtVmxiajBpTWpFd0lpQjRiWEJIT21Kc2RXVTlJakl4TVNJdlBpQThjbVJtT214cElIaHRjRWM2YzNkaGRHTm9UbUZ0WlQwaVF6MHdJRTA5TUNCWlBUQWdTejB4TUNJZ2VHMXdSenB0YjJSbFBTSlNSMElpSUhodGNFYzZkSGx3WlQwaVVGSlBRMFZUVXlJZ2VHMXdSenB5WldROUlqSXpNQ0lnZUcxd1J6cG5jbVZsYmowaU1qTXhJaUI0YlhCSE9tSnNkV1U5SWpJek1pSXZQaUE4Y21SbU9teHBJSGh0Y0VjNmMzZGhkR05vVG1GdFpUMGlRejB3SUUwOU1DQlpQVEFnU3owMUlpQjRiWEJIT20xdlpHVTlJbEpIUWlJZ2VHMXdSenAwZVhCbFBTSlFVazlEUlZOVElpQjRiWEJIT25KbFpEMGlNalF4SWlCNGJYQkhPbWR5WldWdVBTSXlOREVpSUhodGNFYzZZbXgxWlQwaU1qUXlJaTgrSUR3dmNtUm1PbE5sY1Q0Z1BDOTRiWEJIT2tOdmJHOXlZVzUwY3o0Z1BDOXlaR1k2UkdWelkzSnBjSFJwYjI0K0lEd3ZjbVJtT214cFBpQThjbVJtT214cFBpQThjbVJtT2tSbGMyTnlhWEIwYVc5dUlIaHRjRWM2WjNKdmRYQk9ZVzFsUFNKQ2NtbG5hSFJ6SWlCNGJYQkhPbWR5YjNWd1ZIbHdaVDBpTVNJK0lEeDRiWEJIT2tOdmJHOXlZVzUwY3o0Z1BISmtaanBUWlhFK0lEeHlaR1k2YkdrZ2VHMXdSenB6ZDJGMFkyaE9ZVzFsUFNKRFBUQWdUVDB4TURBZ1dUMHhNREFnU3owd0lpQjRiWEJIT20xdlpHVTlJbEpIUWlJZ2VHMXdSenAwZVhCbFBTSlFVazlEUlZOVElpQjRiWEJIT25KbFpEMGlNak0ySWlCNGJYQkhPbWR5WldWdVBTSXlPQ0lnZUcxd1J6cGliSFZsUFNJek5pSXZQaUE4Y21SbU9teHBJSGh0Y0VjNmMzZGhkR05vVG1GdFpUMGlRejB3SUUwOU56VWdXVDB4TURBZ1N6MHdJaUI0YlhCSE9tMXZaR1U5SWxKSFFpSWdlRzF3UnpwMGVYQmxQU0pRVWs5RFJWTlRJaUI0YlhCSE9uSmxaRDBpTWpReElpQjRiWEJIT21keVpXVnVQU0l4TURFaUlIaHRjRWM2WW14MVpUMGlNelFpTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWtNOU1DQk5QVEV3SUZrOU9UVWdTejB3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cDBlWEJsUFNKUVVrOURSVk5USWlCNGJYQkhPbkpsWkQwaU1qVTFJaUI0YlhCSE9tZHlaV1Z1UFNJeU1qRWlJSGh0Y0VjNllteDFaVDBpTWpFaUx6NGdQSEprWmpwc2FTQjRiWEJIT25OM1lYUmphRTVoYldVOUlrTTlPRFVnVFQweE1DQlpQVEV3TUNCTFBUQWlJSGh0Y0VjNmJXOWtaVDBpVWtkQ0lpQjRiWEJIT25SNWNHVTlJbEJTVDBORlUxTWlJSGh0Y0VjNmNtVmtQU0l3SWlCNGJYQkhPbWR5WldWdVBTSXhOakVpSUhodGNFYzZZbXgxWlQwaU56VWlMejRnUEhKa1pqcHNhU0I0YlhCSE9uTjNZWFJqYUU1aGJXVTlJa005TVRBd0lFMDlPVEFnV1Qwd0lFczlNQ0lnZUcxd1J6cHRiMlJsUFNKU1IwSWlJSGh0Y0VjNmRIbHdaVDBpVUZKUFEwVlRVeUlnZUcxd1J6cHlaV1E5SWpNMElpQjRiWEJIT21keVpXVnVQU0kyTXlJZ2VHMXdSenBpYkhWbFBTSXhOVE1pTHo0Z1BISmtaanBzYVNCNGJYQkhPbk4zWVhSamFFNWhiV1U5SWtNOU5qQWdUVDA1TUNCWlBUQWdTejB3SWlCNGJYQkhPbTF2WkdVOUlsSkhRaUlnZUcxd1J6cDBlWEJsUFNKUVVrOURSVk5USWlCNGJYQkhPbkpsWkQwaU1USTNJaUI0YlhCSE9tZHlaV1Z1UFNJMk15SWdlRzF3UnpwaWJIVmxQU0l4TlRFaUx6NGdQQzl5WkdZNlUyVnhQaUE4TDNodGNFYzZRMjlzYjNKaGJuUnpQaUE4TDNKa1pqcEVaWE5qY21sd2RHbHZiajRnUEM5eVpHWTZiR2srSUR3dmNtUm1PbE5sY1Q0Z1BDOTRiWEJVVUdjNlUzZGhkR05vUjNKdmRYQnpQaUE4TDNKa1pqcEVaWE5qY21sd2RHbHZiajRnUEM5eVpHWTZVa1JHUGlBOEwzZzZlRzF3YldWMFlUNGdQRDk0Y0dGamEyVjBJR1Z1WkQwaWNpSS9QcmVTYWlRQUFPZjNTVVJCVkhqYTdOMTVmQnQ1WWZmeDcyZ2syWkx2SzNZYzU4NG0yZnZDQzNqWlpZRnR1TUpWZURpNmZUamJSNVJDb1MwRmFsb29GTEt3UUV0TGFURXRCUW90eDVhamtIS1lMTHZMN21ZUHNmZm12aDNaam84NDhXM0xPcDQvUnQ0NGlROUpIa2tqNmZQZWx6YUpMWTFtZnZNYnpjeFh2OE9JeCtNQ0FBQUFBQUJBWnJrb0FnQUFBQUFBZ013amhBRUFBQUFBQU1nQ1FoZ0FBQUFBQUlBc0lJUUJBQUFBQUFESUFrSVlBQUFBQUFDQUxDQ0VBUUFBQUFBQXlBSkNHQUFBQUFBQWdDd2doQUVBQUFBQUFNZ0NRaGdBQUFBQUFJQXNJSVFCQUFBQUFBRElBa0lZQUFBQUFBQ0FMQ0NFQVFBQUFBQUF5QUpDR0FBQUFBQUFnQ3dnaEFFQUFBQUFBTWdDUWhnQUFBQUFBSUFzSUlRQkFBQUFBQURJQWtJWUFBQUFBQUNBTERBb0FnQUFBS0R3QklLaGF5WDlqcVFySmRWTGlrZ2FrclJYMHFPUzd1dG9iWm1tcEFBZ2V3aGhBQUFBZ0FJU0NJWmVKZWtUa3E1ZDRxbGprbjRoNlJ1U2Z0N1IyaEtqOUFBZ3N3aGhBQUFBZ0FJUUNJWXFKZjJicFArVHhzc1BTL3FDcEgvdmFHMEpVNW9Ba0JtRU1BQUFBSUFEQllLaEd5Vk5kTFMyUEo3RWMxc2s3WkswWlpsdmUwVFNuM1cwdHZ5RVBRQUE5aU9FQVFBQUFCd2tFQXg1SlgxSDB1L08vcWlqdGVXcml6eS9SZEo5a3RiWnVCci9JK2tQTzFwYkJ0Z2pBR0FmWmtjQ0FBQUFuT1ZiT2hmQVNOSVhBc0ZRM1h4UERBUkR0YkxHZFZsbjh6cThSdExUZ1dEb0ZuWUhBTmlIRUFZQUFBQndpRUF3OUU1SmI3emd4K1dTZm4rZTU1WksrcW1reXpPME9vMlNkZ1dDb1hlelp3REFIb1F3QUFBQWdBTUVncUVHU1o5ZjROZmJMM2l1SVd0V283WU1yNVlwNlY4Q3dkREgyVU1Bc0h5RU1BQUFBSUF6L0xXa21nVitkM01nR1BMTitmZm5KYjBwaSt2Mk40Rmc2QlBzSWdCWUhrSVlBQUFBSU1jQ3dkQWFTWXQxKy9GS3VqTHgzRTlJK3JNY3JPYkhBc0hRZTlsYkFKQStRaGdBQUFBZzl6NGl5YlBFYzE0YUNJYnVsUFN4SEs3blB3U0NvWmV3dXdBZ1BVeFJEUUFBQU9SUUlCaHFrblJNVW1tZXJISy9wR3M3V2x0NjJIc0FrQnBhd2dBQUFBQzU5VWZLbndCR2tsWkkrcy9FNE1BQWdCUVF3Z0FBQUFBNUVnaUdybEZ1eG5kWnJsc2t2WXM5Q0FDcEliMEdBQUFBc2lnUURHMlU5RTVKYjVHMFBvODM1WXlrclIydExmM3NWUUJJanBzaUFBQUFBREl2RUF5MVNQcWNyS21sQytITDBCcEo3Wkkrd040RmdPVFFFZ1lBQUFESXNFQXc5RkpKZDBxcUtMQk5DMHU2cEtPMXBZdTlEQUJMWTB3WUFBQUFJSU1Dd2RBR1NUOVU0UVV3a3VTVjlFSDJNZ0FraHhBR0FBQUF5S3cva09RdjRPMTdleUFZS21jM0E4RFNDR0VBQUFDQXpHb3U4TzJya0RYSU1BQmdDWVF3QUFBQVFHWWRLWUp0ZkRPN0dRQ1dSZ2dEQUFBQVpOWi9Tb29YK0RiZUhBaUdhdG5WQUxBNFFoZ0FBQUFnZ3pwYVc0NUsrbGFCYjZaYjBpM3NiUUJZSENFTUFBQUFrSGwvSnFtM3dMZXhqZDBNQUlzamhBRUFBQUF5cktPMTViU2s3WkltQ25nenIyRlBBOERpQ0dFQUFBQ0FMT2hvYlhsTTBrY0tlQlBYc1pjQllIR0VNQUFBQUVEMnJDbmdiYXRuOXdMQTRnaGhBQUFBZ094NU5VVUFBTVdMRUFZQUFBRElna0F3dEZIUzVnTGV4R24yTWdBc3prMFJBQUFBQUZueG9nTGZ2a09aZm9QV1c3ZWJrdFpMdWt6U1ZrbnJYQzVYbzlzMEt5VVpzWGg4TUJLSjlFaTZWOUwvQm5mdGpGRHRBRGdKSVF3QUFBQ1FIYmNVK1BiOXpPNEZ0dDY2dlZIU2paS2U3L1Y0WGhTSlJLNk14ZU5lU2FxcHJwcHBhVjdwV2xGZmI1YVdsaWdlajJ0MGRFeTkvZjJSSThkT2ZNRGpkbmUzM3JyOUxjRmRPKytuNmdGd0NrSVlJRWNDd1pBaHlTUEpUQnlMcHF3dWdyTi96bkpKaXMzNWQweFNkTTZma2NTZk14MnRMWEZLRmdBQXg3cXBnTGR0U05MWGxydVExbHUzbHlUSzZhVmVyL2RWNFhCNGl5U3RYdFVjdmZhcXk4MHJ0bTdScHZYcnRIN3RhcFg1L1o2RjduRjYrL3AxeDVlK3N1ckJSMzU3VCt1dDIxOGUzTFh6VjFRL0FFNWdVQVJBNWlVQ0Y1K2tVa2tsaVQ4OUdYaXJHVm45c2FkbUh4MnRMVEgyQUFBQU9iOFdXQ2ZwV0RxdjlabUdKcU9PL3A2bFg5TExFMU53cDZ6MTF1M2xrbDdxY2J2ZkdJdkh0MGVqVVgvVGlvYklqYzl0ZFQvMyttdDAzVlZYcUxLaUl1WGx4dUp4dGYvdForSy9lZkNSc1Vna2NrbHcxODYrVkpjUi92SHErbUd6L3NZN3EvNjg0VW5mTGRXSmE2MkhPbHBiSHFaV0EwZ0hJUXh5ZVRGeTRjRFE4VUpxeVJFSWhyeVN5aVdWeVFwZGNuVzhUVXFha0RUZTBkb3lSYzBEQUNBbjF3WC9WOUovcFBvNmx5Rjk5dW9tSFJnSmEvZmdoUGFPT081VS9vQ2syenBhVzA2azhxSkU4UElhcjhkeld5UWF2VFVlajNzdTNid3A5dUtiMmx3dmVrR2JWcTlxdG1YbHhpY205THEzL21GMFpIVHNYeC91L01rZkxmYmM4STlYRzVJMlNMcEswcldTdHA1eXI5djAxYnJQYlJod3QxUmQ4UFJISlAxQlIydkwwOVJ1QUtrZ2hFRW1MelpNV2EwK1NpUjVaYlg4Y0NjZUM4M01GZGU1TGpZek90ZXlZN3FqdFNXY0I5dnNsVlFwcVVLWmFlbXlYQkZKbzVKR09scGJtTUVBQUlEc1hTUDh2YVFQcFBxNlRlVmVmWEJydzdQL1BoT082cmREazNyazlMaE9UdVp1ek5uSXhIamM3Zk8vWDRieHp4MnRMZEZVWHZ1OGw3N21VNUkrR0l2RnZOZGRmV1g4SlRmZDZIcmhqYzlUUTExdGVpc1RqeWcrK0tCRyt4N1JiMTFYNnlGZG9ZbW9vWVlTVTlmWCtIVHMzbC9weS8vNjlYQXNGbHNSM0xWeldKTENQMTVkSlN0c3VWTFMxWFArWHBhNDl1dzVYSEx0Mlgrcy8vSzE4WVZ2bWNZbHZicWp0ZVhYMUhBQXlTS0VnWjBYRjRZa2YrTGs1WmNWdk5ncEtxdFZ4N2lzVmgwUkIyMTNoYVJxV1MxZThzVzBwR0ZaZ1F4ZGxnQUF5T3oxd2oyU1hwanE2N1kzVjJoN2MrVzh2enNUanVySnMxTjY4c3lFRG81T0s1cUZTM3QvTkt3am5UdlYvL0J2RkoyZTJoemN0VE9sR1pGYWI5M3VkcnZkSTl1M3ZjUVhlTnR0cXF1dFNmSHE1YlRpSS9zVkg5bW4rUEJleFVjUFNQR1lCc3htZmE3MHc1b3d5aTU2U1pNN3FzbnZmbEJ2WFBmMEQ2OWFPZTZSRmJpc1hlUmQ5bzY3cWp6dEszOTJTV3pCN3cyZk5TYXB0YU8xWlQrMUhFQXlHSmdYZGx4VStHVzEvaWlYbGo1VExZT1plSS95eFB0T1NSckpWWWlRNkU1Vkl5dDhNZk53MTVWSVdpR3BQaEFNRFVzNjQ1UmdDd0NBQW5UTmZELzB1Z3k5cnFWU045VDY1WFlaZXVyc2xPNDhlVllqTTlhbHpkYktoYi9mcWZHYXVtVkZtVzVaVWFaSVBLN2o0ek02TkRxdG82TlRPam82cmZHNFBhRk1neXVtSyt2SzFGcGZyblZsWHIzMUc0ZlZPejAxdTAycFRrdTlNUktKK0Y3N2lwY3VIc0RFSW9xUEhrd0VMbnV0UDRmM1NkTUQ1ejNOS04rb0ljOXEvYTN2YjdSUVlISXFZcXI2ZGUxYU5mRHUzMVYwZktuMWUwYlNwZjljOS9jRHNlUXVhOHNsZlRjUURMVjJ0TGJNVU0wQkxJVVFCc3NKSUNvVElVU3V1dDJVSmg0TmdXQm9KQkVpaExPMDdUV0poNnNBZHVlellWSWdHRG9yd2hnQUFPeStkbGd2cWVxaUMzSEQwQWMyMTJ0RCtibkd3NjIxUHEwcjgrZ3ord1kwSFkxclhWbHlsMWx1dzlDbWNxODJsWHVsbGRZZ3R1T1JtSHFuSXVxYmltaG9PcUl6TTFHTnpNUTBHWTFwTWhyWFZDU211T0p5dTF3cU5RMzVUSmNxUEM3VmVFelZsN2kxeXVkV2k5OGpuM24rNWM2V1RSdDE0UEJSeVdwUmNtZUt4VkVuU1RYVjU0b2pQdFVuamV4VGZIamZ1ZEJsOUlnVVgveHl4S2krVXJIeGsvcjd5bi9VVW9ISldiTkJYNjI3UXg4Y2VLYzg4VVV2Rnh0Q25zMVBkbmt2dlM2RmJicGEwbnNrL1FPMUhjQ1NuOWNVQVZLOGlEQmt0ZnlvbFhOYWZ4aUpDNXVxUURBMEt1bDBKc0tZeExaWEpTNGV6QUxjdlliT2hURkRrb2FZOGhvQUFGdGNQdDhQWDcycThyd0E1dGtVb01TdE42MnUwcjBENDNJYjZiZG1LWE83emdVek5sclQ4dXlndVJ0U2ZlMXJyemhkTVJNMTVEdjZPVVVPbjFSOFpKOFVQcFA2U25ockZSL2Vxd2VxMzZvemhqV1dUUFBNRVVVTlV5V3hTZlY1MW1yYThKLzNraDdQUnYyODRsMTY5Y2kvTExUVS9aSzIvcmpxZmVtMGFQbUxRREQwWmI3SUFyQVVRaGlrRWtKVVNHcHdlTDJwa0ZTUmFORnhPdFdCNGhiWmRwK2tSdGsvem8wVEdiS0NwcXBBTURUUTBkb3lTdTBIQUdCWkxnb3JhcnltWHRKWXR1QUxicWp6YXpUaXpDSGJWcTFzV25DN0ZwS1llZWh2NGdxMUc1TFUvejB0NTV1ZVdPbEt4V016K20vZk81NzlXVnlHK3R6ckpFbmUrSlJXemh4VnIrZjhWZngxK1Z0MDAvZ1BWUk9kZDdicXNiaGN3d2RMcm10SnAxZ2t2VWJTRDZqdUFCYmpvZ2lRUkFEaENRUkRMWkpXS24rQ3UycEo2eExCMFhLMjNSVUloaG9sclZaeEJEQnp1U1d0REFSRHpZRmdpTUFXQUlEMHJidndCeTlzS0pPNVJDdVhxNnVkT2Q3L25CQm1Vd292KzZTa2p4azJYRXZHSlVYT0hOQVJZN09paGlkeFV4UFRLYy82WjU4VE5rclY2OW1nbFpGajU3MDJhbmgwZC9sYkZscDBTNTk3N2RGNEdyZEk4V2hNWTZHQjkxTFZBU1J6a3dVc0ZrSlV5aHE4TlI4RE96TVJJcFJMNmsrMVZVeGl3T0VtamhPVlMvSUhncUUrV3NVQUFKQ1dpMXFNWEZ2alcvSkZ0VjVuWG9JMHJuaDJ5dXo2MWx1M2U0SzdkczVJVXV0THRwZExxazg4YWhPUHV1ZXRIYTJYanJiYjlmNzlFeFZxOUkvcXliSnprMDNWUmJvMTRGNTkzdk5LWStNNjQxcHgwZXNmOGI5TXJ4MytSN2wwWGt1akdVbE54N3hYZEtXNlBtTTlnenI5MUJISlpkd1VDSVpjekRvSllER0VNRmdvZ0RCa2RiK3BMSUROcVpEa0N3UkRQUjJ0TFZOSmJ2L3N4UU1zTGxtQlZwbXNRSXVMQ3dBQWtyZHU3ajlxdktZYVM1ZStESGNaemxqNVl5ZE9hdStCZ3hvNmMxWm5SMFkxUERLcU9YMkpubWw5eWZaS1dWMlo1eDFGK0pybXNhZGs0eGQ2STlNZXJmQWJlc1QvaW1kLzVvOWQvRDFSVlhSUWZaN3paNktPeCtQcVBqcXFwM3pYNnhvRjUvNXFRRkp6bjJkdDBpMmZ3eU1UR256cXNDYjZueDNUeGh6ckhuaU9wRWVvOGdBV1FnaUQrUUlJajZSbVdWTVlGMUpkWHgwSWh2bzdXbHVHRjlsMlUxYTNLejgxWVY2Vmtrb1RnVmFZNGdBQUlDa05jLy9SNHZQa3hVb2ZQSEpVbi9uaVArdVpmUWNXZTlybXhYNXBTR052dkdid1Nqdlh5Nldvb25KcnlqZzNwazdjT0Qvam1XODhtTW4rTXhwNDZyRENJeE82NzhybjZSci9lU0hNc0tUbVFiT2xiS24zajgxRU5MVHZoSWFQZENzZVAzOWttNW5SeVRZUndnQlk0c1lVbUJ0Q2xNZ2FXS3dRNjRZaHFURVFESGs2V2xzR2kyemI3ZVNWdENZUURQVjJ0TGFNVXh3QUFDeXBadTQvNmt1Y2Y2bHgrT2h4L2VIN1A2ekpxYWxsTGFlbGV2cHdpVHQyalozclZ1cU9hTVoxL25nNTAwYnBuQXUrdUVaZDV4bzB6MHhNNmZSVFJ6VFdjKzd5NzlEb3lndS9jbHU2bFc5Y0dqbHhTcWYzSEZWMGV2NEpsS0l6TTFkUTNaRXZMZ3dSOCtLR3pqRHl2dHdabUJkelF3aS9yQUZvQ3oyRXFBMEVRMDBYYkh0WmtXeTduWjhkcXdMQlVEVkZBUURBb3RkWEpaTE9Hd0Ntek8zc200aG9OS3EvL052UExEdUFrYVRuckI2YnNYdjl5cjFSelZ3d1gwSjBUaytvbHBsREdqT3JGWS9HTkxUdnVMcCtGVHd2Z0pHa00xTVhqY25qbGFUUytOaThMWDJuaGtZVXV1Y3g5VDkyWU1FQXhycXJGZGRHQUJiRkRTZG1MeEQ4c2xxQkdFV3l5WldKY1c5T3lSb3pwb2xha0pZVmdXRElQVi9MSWdBQUlPbUNWakNTNUhVNSszdlFYZmZlcnhNbnUyMVoxdnJhS2R1N3QwOUhYU3BUNUx5ZlJZeHpJY3l3V2F1eDdnRU5QbjFVa1luNWc2U0pxWXYyUWFra2xjZk9ucGV3UktmRE92M01NWTJjT0pYY3loa0c5MWNBRnNXSEJJb3hnSmxWSWV0Ymp4SnF3YkxVQm9JaHM2TzFwWStpQUFCQTg5N2N6eFdPT2JzTHdLL3V1YysyWmEyc0RKZlp2WDZ4V0Z4elJ3YVdKSGZjeWs3OFowOW8zOU5uTlRsd2R2RmxYTHdMbWlTcFplWlFXSkxpc2JpR2ozUnJhUDl4eFdaU21tQnpoaW9QWURHRU1FVXUwVVMyV2NVWHdNd2lnTEZIVldKS3hsNktBZ0NBeFkxSG5EM0o0SUZEUjJ4YjF1U015L1pRWW13cXJ2cUt5Zk4rWm9Rbk5MajNjR0t3M0tXWEVZOWU5Q1NQcEltVk0wZk5pYjR6R256cXNNS2pFeW12bTh0dG5xQ0dBMWowYzRJaUtGNkJZTWd0cXdVTTlRQjJxQWdFUTQwVUF3QUFpK3ViaWpoNi9RWk9EOW0yck5GcDAvWVFabUk2Sm5kOFJtWThZZzJXZTd4WGovNzZsTTRlVGk2QWtTU1hPZStQand3T2FXUFBBMCtsRmNCSWtydlUrelExSE1DaW56OFVRWEZLaklmU0xGcER3VjVWZ1dDb25tSUFBR0Job1VsbjkxaHgyVGhtelpIQjBpbmIxOCt3V2hJMTlBVjE4cDdIMVAvWVFZWERxYlV1S2l1ZDkvbmhTOHVPVjd0Y1Jscjl4VXl2Ui83RzJwOVF3d0VzK2hsR0VSU3RGWnFuanpKZ2c5cEFNRlJGTVFBQUlFbTZxRW5GeUV4VTNRNE9ZbGJVMTltMnJIMzlmdHU3dkxkVVcyTzBkRDB6b09rem8rbGRySlJPenZmalRWN1hUSHhMYlg5YVRZRkthaXFHdnZiQ2pXZW84Z0FXUXdoVGhBTEJVSVVrYnBLUjBldTN4SURQQUFBVXUzbHZ5aDg1UGVuWUZiNTA4eWJibG5Wb3dMZkc3dldyOXNkMWV0eWw1MVU5bGZZeXJxcVlkOXliS2tsUHZYUEZENzNwTExPa3V2d1hWSGNBU3lHRUtUS0pjV0JXVUJMSU1FTlNjeUFZOGxBVUFJQmkxdEhhTWlOcC9NS2Yzejg0cnFtb00yZEpldEZOYmJZdEt4SXpWandXS3UrMmV4Mjd6eGg2WmQzdXRLOVNYbEoyNzBLL3JidWk0bGpGbXByeGtWUVc2ZmFWeE11YWF2K0NHZzlnS1lRd3hXZUZKSk5pUUpZK1g1b1Q0dzhCQUZETVRsLzRnL0ZJVEQ4SURjLzc1RnpQWVAyU20yL1V1dFV0dGkzdm54NW83ck43SGJjMkc2cjNEdXY2aHE2VVg5dlE0Tlk2TFRnRFZJdWt4LzltN1QrN1hXYnlZOE5VckY2eDg1c3Z1N3lIcWc0Z21ac2tGSWxBTUZRbXFaeVNRQmFWaUpaWEFBQWNuKytIOXcyTXEvUFUySGsvbTRuRjlaT2VrWnl1ckdtYSt0UmYvWVhLL1BiMExEN1E3N3QyN3lsL3I1M3I2SFZGWk5aY29VRHpqNVRxT01LdlgzbmZVays1Y21YSjZZSDNyUC9wcVdTVzUydW9IcXZhMVBKbXFqbUFaREF6VHBGSXRFWm9vQ1NRQTFXQllHaWlvN1ZsbEtJQUFCU3BvNUp1bnU4WFB3d042L0V6azdxeXVsVFQwYmlDUXhNeURVT3ZYVldaMHhYZXZIR0QvdTBmNzlBWHZ2eFYvZmJ4UmNkZTJTdHBRTktncENGWnJYNkdFbytCMlg5NzNiRkxKUDNBenZ1UCtQQWVyYWxwMEp2WFA2Ny9Pbkp0VXE5WnNjTFVhMHIvSjVsN3BMcFgxdDEvZGlSYTN2T3Q0eTlxamk4dzkzVkpkWG00ZXVPcW03NTIwNFlKcWptQVpOQk5vRWdrWnF0cHBDU1FJMUZKSnpwYVd5Sno2cVFwcTJ1Y0lhdFZucEY0eEJPUHFLU1lwR2hIYTB1Y0lnUUE1UEYxMkVjbGZTclo1NXVHb1M5ZDF5eVhRNjdVend3UGEyRFE2bEZWVlZtcHJsQzMvdmhEZnlWSko0TzdkaVk5OEc3NHg2di9yNlN2eTg2dThTVjFpa2VuMVg3a2ovWEVxWnBGbitvdWNjZi81b3J2ZmU5NmQzQlUwdXpndTI2ZDMxSzhVdWQ2QzdnbFRUMDVkc25sbis5K1I5WGdXWmR2OWtrdWo2bnk1b1k5NWF0WHZPSmJyN3l5aTFxT2ZMUlF1T2pvQU1QSS93aURsakRGY2VJM0pOVlNFc2doVTlLcVFEQVVrZVJKUEl3VTZuQkUwb3lrc0tScFNWT1NwZ2xuQUFCNTRwbFVuaHlOeDlVek9hTVd2elBHdDYrcHFsSk4xYm1KTlo5NGVzL3NYNCtuc2h6dmEwOStLL3pqMVFjbC9aV2tsMGp5TFh2bHBrL0xWZHFvVDEzeWRYM0s5ZnQ2cUdmK1h0Qm1pVWNsNWNhN24vK0dIMzQxMWJjSS8xaXJ2cldsL1FXL0NkKzgrYituM3VBKzQxNTUwdGRROWIvZitKMUxlNm5hQUZKRkNGTWNLaE0zdlVBdWxTUWU2WDVXdVMrNFdJc0hncUVwU1JPU3hqdGFXNllvWWdDQVF6MlM2Z3YyalV4bkxZU1ppc1lWamNmUG02M0pheHJ5R0laS3pZdS9NK25wZTNhYzNlT3B2cGYzdFNjZmx2UXFTUXIvZUhXVnJDOWxURWtWa3ZUbDNTczNQOUpWOVl1M3YrWDF4dSs4OEFWU0xDeEZaMC94Y2NWbjV2UnVqazVJTWF1UnJUYzZxVStzUHFGNzloN1I5MExYNi9oUWlXS3h1SHpsUGpYVmwyci9MNzg3MWZuRC8vaHFPdVhqZmUzSmJrbmZrLzVUMWdNQTBrY0lVOEFDd1pCUFVyM3MrSllCY0I0alViZDlrdW9Dd2RDTXBGRkpJeDJ0TFdHS0J3RGdGQjJ0TGIyQllDZ2thK2FkcER3d09LNWJtOHJUSGp0Z0poYlg2WEJVcDZjakdncEhOUlNPYW5RbXByTXpVWTFGWWhxWmlXb3lHdGRrTkxib2NseUdWTzUycWFIRXJjWlN0OWFYZVhXMC84enNyNDhzcDF5OHJ6MDVkM3FveEF4U0o0OC9kOXVydjNuSE4rNzl2ODkvOGUrYkZWVmxGNTM4Ri9PU0s2d21Odkc0Tk50cjRUUC84R1h0bXhwN2hwb0l3QWtJWVFwUUlCanl5QnFFbDVtUVVFdzhzcnJkMVFhQ29VbEpaeGtNR0FEZ0lQZExTbm9HblZOVEVmM3kxS2hlMWxTeDRITmljYWwvT3FLK3FkbkhqUHFubytxYmltaGtKbXJMU3NmaTBzaE1UQ016WVIwWkMydjM0SVIwNDNadGF0aWcwNDg5T0tCZE8yMHZxRmdzOXBIeGlZazNmZTNiMy9GOTROMS9rTll5NWc0YnNmZkFvV2c0SEg2UUtnakFDUWhoQ2toaTdKY2FTWFZpMEdVVU41OGtYeUFZcXBmMXpkb280OGNBQUhMczUwb2hoSkdrSDRkR2RHWTZxdWZYKzFYaWNta3dIRkh2WkVUZGt6UHFtWnhSNzJSRWtSd05yRm01K1RLVnJtamFvaTk4M1BabEIzZnQ3R3U5ZGZ2SHZ2dWpuOTd4dWxlKzNGaTdlbFhheTRwRUlqcDg3SVJMMGhOVVFRQk9RQWhUSUFMQlVJbWtKcVUvNWdaUWlEeUo0Nkl1RUF3TmRMUzJqRkVrQUlBYytabXMyZjlTK3FMczNvRngzVHN3N3NnTjhsYlZuTTNnNHYvUmJacnYvZnlYTzlaODZUT2ZUUHZMeGNQSFRpZ1NpUmlTZmtzVkJPQUVMb29nL3dXQ29ScEphMFFBQXl6RUk2azVFQXkxSkxyckFRQ1FWUjJ0TFlPU2RoZlVSaGxHeHJyOUJuZnRESWRuWmdJUFAvcTRjZGR2SGtoN09RY09INUhMNVpxUnRKZGFDTUFKQ0dIeVdDQVljZ1dDb1daWjQ3L1EvUWpGeGtoOGhwbnpQR1puVTdydzV4V1NOZ1NDSWFac0J3RGt3amNMYkh1R003bnc0SzZkdnpSTjg0ZGYrUEpYb3hNVGsya3RZOS9CUS9KNDNIdUN1M1pHcUg0QW5JRHVTSGtxOFczK0trbGVTZ01GeHBEVmNzV2o4d09WMlZERnBlV0hqbXNUMDF2M1NacVdGSm56bUVrOHdoMnRMVnl3QVFEczlEMUovNkRDbWJseU9OTnZFSTFHM3pkMDl1d3IvKzNiM3pILzVQKzlNK1hYUC9iVW5zajBkUGdlcWg0QXB5Q0V5VU9CWUtoVVZnQmpVaHJJYzZhc2JuUWxPaGU4Wkt1N1VLbWsxWklHSkUwdWNLekZKSVVUajZuRVk1cEJmZ0VBNmVob2JSa0pCRVBmbGZTT0F0bWtvU3k4UjFVc0Zpdlp0R0Y5eWkrY25nN3J4TW1RVzFLUTJnZkFLUWhoOGt3Z0dDcVQxQ3k2SHlFL2VXV0ZIeVdKUDNNZEpMb2tOU1l1SWtjVytIMXA0bEdaK0ZrOEVBeE55d3BrSmlSTmRyUzJSTm0xQUlBa2ZVN1Myd3ZrV3U1RUZ0N2o5eHZxNnlJdmU4a3RLZCszbEpSNDVmRjRvdUZ3dUp4cUI4QXBHQk1tandTQ29YSVJ3Q0MvbUpMS1pZMWJ0Q1pSZjJzbGxjbFpMYmxxWlUzdG5neERWaWhUbmRpZWpZRmdhRTBnR0dvSUJFTitkamtBWURFZHJTMzdKUDFQQVd4S1hGSlhwdCtrcE1UNzVoZmYxT1oyR2VsZC9qWTNOY1lrYmFUbUFYQUtXc0xraVVRTG1KVWlnRUYrZks3NFpZVXYrVFJtVVlXc1lIb3djV0daaXRuV01qV0JZQ2dxYVZ6U21LUnh1aTR0KzdQUExhdUwydHlCbG1jSFpKWXUvakloTnVmUG1LVG9uTWVNcEVoSGEwdU1rZ1dRWXg5VFBQNWFHWGw5V1hlMG83VmxPcE52MEhycjlvYnA2ZkNHNTE1M2JkckxXTnZTN09rS2RXK2l5Z0Z3MHMwU25IOFQ0aGN0WU9Cc3BxeldMZmtXdkZ5b0xIRlQzNi9VZzVpNVpWR1plTVFDd2RDWXBKR08xcFlKcXNtaW4zTmVuUnNmYVBidm5neTlWMVRueHZxWlRqeW1DTXdBWk10amYvbnU0VFcvKy91cWIzMUJQbS9HVTFsNGp4c2s2Zkt0bTlOZVFITlRrN3dlejFacUhRQ25JSVRKanhzVEFoZzRrU0ZyZG9meXhKK0ZVa2Q5c3JwUDlkdXdMSmNTZ1V3Z0dJcklHbmRtdUtPMVpZYlB0bENwckJaVFBtVi9mQ0F6OGI2K0M5WnBXdFlnelJPU0ptZ3hBeUNEWHQvYitSUFZYLzBjeVZ1YWxUZGM0L2RvcGMranZxbUloc0pSVFVaam1vbFoyYlBQZEtuR2E2clo1OWJXaWhKTngrSzY4K1NTRXg4OW5vWFZmazU5Ylcya3Byb3E3WHVXNXFaR1JhTFJGcW9jQUtjZ2hISDJUWW9wYXhZa3h1NkJrNWl5dXU1VXFIQm42UEpMcXBmVk5jbk96OXRhU2JXSjFqRm5pNmwxVENBWWN1bGNheW0vUSt2T2JFdWM2c1E2VDhucVZqYlcwZG9TNXRBSFlLUGZuUmtiMFphUmJoMm96ODV3SmMrcDlXdGJVM0xqMC9aTlJaSUpZZTdMOURxN1hLN0xONjVmdTZ6elJkT0tCa1Vpa2NyV1c3ZVhCWGZ0SEtmcUFjZzFRaGhuYTFiMnB1c0ZsdUtSVkpXNGtTNkdsbG5sc3NZUUdjN1Fzc3NEd1ZCWTBobFozWlVLcml0TUlCZ3lFdldsTWsvcnpleFlQL1dKVmpLamlYMFY0ZU1BUUxwYWI5M2VJS2xOa3Q1NDlXYjl6N2hIVDUyZHl2ajdUa1dUYjl4WFgyTEswS0w5Y3FjbFBaVHhHeFczKzRwMWExcVdkZTVvWE5Fdys5YzFrdlpSQXdIa0dpR01jMjllNm5WQlUza2dSN3l5V2dZVTQ4dy9OWklpc2diYXpWVFpOa3FxQ3dSRFE3SzZLdVY5R0pQb1Jsa2xLM3dwbE5aU3M2MWs2Z1BCMElTc2NHNk1jV1FBcE9IbGtseWIxcS9UcXBWTmVsc2twaDM3K25WNk9wclJOKzJaVEw0bnJHa1k4cGt1VFN3YzNOemYwZHFTOGVRb0VvbXNYNzJxZVZuTFdObTRZdmF2YTBVSUE4QUJDR0djZVFQamw5VnRBY2lsWWc1ZjVxcVhOWUJySnNkeGNVdGFJYXVyMGhsWlhaWHk3dVkrOGRsVkk2dlZTeUh6Sng2UnhQNGFadndZQUNsNHFTUTkvNGJySlVsbGJwZitjRU90dm5CZzhOa3hXakpoejhpMGhtZWlxdklrbDQxUEx0NXk1cjh6WFVpdHQyNnZpOFZpcFMwclZ5NXJPVldWRmZKNnZiRndPTHlHcWdmQUNRaGh6dDA4dUdTTnZlS1NubTJCR1pNVXkrYkZkV0k5bXRnanlQSG5RakhjU0NmTGtEVlFiNi9TbnpFcGxiSnZrRlFkQ0laT2Q3UzJqT1RKNTJlNXBEcFpMVVdLN1ZocGtOV1M2YXlrTXgydExWRU9HUUNMQkFzdXpZWXd6N251MlordksvUHFuZXRyOU5ValF4azcwY3pFNHZyR3NUTjY3eVYxTXBlWUduc29IRjFzUFNMS1FnZ2pxVVdTR2xmVUwzdEJLK3Jyb3FHZVhnYm5CZUNZQzhpaUVnaUczRG8zSzRabnpzTlk1RFZ4V2QrQ3p6NG1KVTFtYUZ5QUJoR09JVGRjT3RlRmhObTR6dWVWRlV3TlplbjlQSkthQXNGUWphUUJwdzdnR3dpR3ltUzFGQ3JoMkZHdHJQRHNyS1FoV3NZQVdNQlZrdXBLU3J5Nitvckx6dnZGdFRVK3ZYbHR0YjV6NG16RzNuemZ5TFQrOGVCcHZXTjlqYXE5QzdlSWVmajBvcWVkbjNlMHRneG1vYXlzRUtaaCtTRk00NG9HTTlUVDIwejFBK0FFUlhHem4yZ2lYeUdyK1hnNkE5MGFpWnN3YitMZjFZbmx6c2lheW5UVWpwdWt4SlN0VlZSTDVFQkZJbVJnSnE2RlZTYU85Nmtzdm1lSnBKWkFNRFFxSzR4eHhJQ3dnV0NvUkZaZzdLZGFuR2MyaktrS0JFT0RIYTB0d3hRSmdBdmNMRWxYWFhhcFBPNkxMOE5mMkdBMVFzMWtFSE5nZEZwLy9VeWZicXozNjdsMWZxMHI4NTczemN1VFo2ZjA4OTdSeFJieHBTeVYxZXJTa3BKb2VWblpzc2NXYTZpcmRYbTkzdlZVUHdCT1VMQWhUS0xGUzNYaXhpbFQyems3VzB4VklCaUtTQnFSTlpaRHVqZEtLNmlTeURLUGFNbVFpanBKUGNwOHQ2UUxWVWdxUzl6WW44M1Z4aWU2UzlZblBsdXhNRk5TWXlBWXFwYlUzOUhhTWttUkFNVXRFQXpWZGJTMm5GWWloTG4rNmlzWGZPNExHOHBrR3RKL0hqK2IwYTVKOS9TUDY1NytjZmxObHhwTDNTb3hEUTFPUnpVNHZlaGxiTENqdGVWWFdTcTJodHFhNnFoc0dPQjlSWDI5REVPcnFZa0FuS0RnUXBoRStGS243SGVwY012NkJyUW1FQXlOU0RxZFNoZ1RDSVlxWlUyRkNtU0RvVVNBS0xvZXBjS1QrR3pKUlFzSGw2UVZpYytLdm83V2x1a3NmN2FXeXdxSzZTNlp2QkpKcXdQQjBMQ3Nsa3gwVVFLS1RPS3o4MHVTM3Z6L0h1NzZrOGMvK3A0WFN0SjFpNFF3a3ZTQytqSlZ1azE5N2VpUXBtT1p6ZjBub2pFZEd3OG4rL1NQWnJING1tcXJxMjFwb2J1aXZsYXhhS3lSR2duQUNRcW02MEVnR0hJbHBuVmVuK01ieTltYjIvV0JZS2doOGMzeFV1dHV5QXFPZ0d6d1NtcVcxWnFCQUNaMTFjcnR0TXVsa3RZa3hvdkp4bWVyR1FpR21oTjFoZ0FtUFZXUzFpWEcwQUZRSkFMQjBDcEp1eVc5WFZLcDRYSjl0ZVdWYjZqM2VyMjZiUE9tSlY5L1ZYV3BQbnhwZ3hwS0hQUFIrOE1zdG9LUnkrVmEwYmlpM3BhTnI2dXQxVXdrVXRsNjYzWmEvZ0xJdVlJSVlSSVh0dXRrdFVSeHlrMmxJV3VNaldRdXZDdVUzbGcxUURvM2d5dXBiOHMrdHFzY3NBNE5nV0JvZFNBWXl0aStUSHgyclpWVXptNWZOcmVrVllGZ2FFVWllQWRRd0FMQlVJdWtleVdkMStSbHhRdHUxUlh2K2hPNVBNbDlkRGY3UFByb1pTdDBRMTNPaCtBYWtQVHViTDZoeCtOdXJxNnk1M1E3WjNEZmxkUk9BTG1XMXlGTUlCZ3lBc0hRQ2ttcjVOeHZhR2N2dkJzWGFSVlRTMVZFaHBteXBqNnZFYTFmN0ZDaDNMYUdtZVdUdERiUlJjbnV6OVlHaDMrMjVxdHFXUzJadkJRRlVKZ0N3VkNWcEY5STJqanZFOVpzMHBjT250WmtOTGtlaXFXbW9YZXVyOUVmYnF4VnBTY25sKzRSU1cvcWFHMFp5T3BOaXVHcXI2eXc1enVBbXVwbnc1d21haWlBWE12YkVDYng3ZThhNWM4QWtWV3l4Z2J3WExBZGZwMmJkUW5JMUkzNktqSG1rSjJjMEJwbTd1ZDRVeUxvWFhiQWxoaFhxMFZXWUlmTUtKRVZ4TkRDQ0Nnd2ljL1FIMG02ZkxIbkhSaWQxaGNPREdwNEpwcjBzcSt2OGVuamx6ZnF4U3ZLWlJwWit6NGxKdW50SGEwdGQyZTdMR1B4V0ZWNW1UMjlPT3RxbnoybE5WQkxBZVJhWG43RG1aaktlWldjOFUxME9oZmVQWE5teTZpbUdpS0RxcWxqR1ZNaDZXemlBdFVKcWlTVkJvS2gzbzdXbG5BNkN3Z0VRejVaVGJWcC9aSjVMa25OZ1dCb3FLTzFaWkRpQUZMK3ZESVN4NUZMVmpBKys1anZDOFo0NGhHYjgyZXNvN1VsRXlQZS9yMmtGeVh6eE5ERWpENjdiMEIvc3JsZVRhWEpmZXlXdVYxNjQ1b3EzYktpVEQvcUh0SGpaekk2K2RxMHBMZDJ0TFo4UHhmN09CcU5WVlNVMnhQQ2xKYVV5T3Z4eE1Jek03U0VBWkJ6ZVhlaG5SaWpvRm41MjZYQ2xOUVNDSVo2SlUxS1lxQkdaS3FlMWN0cUJZUE1NQkxINzZpRDFtazI2TzN0YUcwWlQvR3p0VkpTbytpdWxtMjFpYTVKdlJtNklRVHlYaUFZS3BIVm1yTkVWdXRocngzWHNJRmdLQ29wUE9jeEpXa3EzV014RUF5OVM5SjdVM25OVURpcXorMGYwQjl0cXRPbTh1UWJScThvZFN1d3NWYWhpUmwxOW8zcHQwTVRzbmtTcFFPU2ZyK2p0ZVczdWRydmtVakViMWNJSTBrMTFWWFJ2b0ZCV3NJQXlMbThDbUVTVGJkWEZzQk5naUVyU0JybmhnY1o0RW5jVE5PYUlmTXFOSDhJWStyY043U3ozOHJHNWp5aUdWd25sNnh4cUFZNldsdk9KUG5aV2lkbWFNdWxjbG5kVmJzN1dsdWlGQWVLWFNKMDhjOTVaT3BheVpUMVpjWGNMeXppZ1dCb1d0SkU0akdaVENnVENJWnVrUFRQNmF6RWVDU21MeDRZMU52VzE2aTFOclh2VGxyOEhyMXpmWTFldDZwU3V3Y250UHYwdUU1UEwrdGo1S3lrejBqNnh6bXR0ck91OWRidDFaSmtWM2NrU2FxdHFUSDZCZ1pYY0lRQnlMVzh1VWxMdElBcGhBQm1MbHJCd0c0K1NTdEV1SmN0M3NRTmdsdldON1NleEdPcDhvOUxta2s4cGhLUEdadlhyU0hSd3FKL3NSdUlRRERVSkttU1habHpzMU9QaHpwYVcyWW9qcUlQSVl6RVo4bnM1NG83RVJqTUJyeHpQMlBtaHJ1UnhDTXNLZHpSMmhMSm8yMzJ5UXEyeTNOOGZXb2tqc2RTV1JNbnhBTEIwSmlrTVVuajgzMmVCb0toR2tuZjB6TEcrSXZFNC9yYTBTRjFUMWJvMWMyVmNxVjRGcS94bW5wbGM0VmUwVnloa3hNemV2THNwSTZPaFhWOGZDYVpBWUFuSmYxYTBnOGxmYmVqdFdYQ0FWV2lXckkzaEttcnJYYTdESVB1U0FCeUxpOUNtTVFZTVBuY0JRbklobkpaclJrNFRySXJuVy9WREoxclVqOTdoUm1SMVRwdVBIRURaWWNxU1o3RU9GU3hlVzd5bWhJM1BYQUdqNndXTWFGMHgvVkJma29jajdPdFBueXl3aGM3QnRxT3lBcDVKeE1CUXRoaDIyMG1QcWVxRXZYZmlWeXlndXBLU2RGQU1EUXFhYmlqdFdWNnpyNzdwcVIxZHJ6WkwzcEgxVFUrbzNkdXFGRzVPL1g1TXd4SmEvd2VyZkZieFJtWGRDWWMxYWM3dnFrOVhkMHFiV3p1YkxybFpUK1hOQ3hyMnVuRGtnNDdNTENybG13T1lXcHE1UFo0bUtJYVFNNDVQb1JKakRLL2lodExZTW1MbFdxS0llOC9qMmR2UnFZU0Y4aDJOQVgzNjF4WGw4aWNtNFptMFJyUHFmVmdOb2lacGpnS1YrSTRMSmNWaEpabDZEckhuWGlQY2xtdDQyWmtkYUVjeldYOVNuUTNxa2xzZXo1ZDM1bXo1OXRBTURRcDZZeWtnS1JYMmZrbWUwZW05TGQ3K3ZXdURUWGFYRkd5ckdVWmtzcmlVVDM4aS85Vk9CeVdwSS8vejEvOHdVTjVVTlpWa21Uem1EQ1MxYW9lQUhKK3NlZjBDNVJtNWQ4c1NFQTIxU2N1c0ZFNFpwdkNUMHM2cmVXM2pDbVp2YkdYMWVKbWxheHdCczY5MFdzaGlDbE1nV0RJazdpUnI5TDhNL2xra2tkV0Y1dmFRREEwSld2OGo5RnNEUXFkYU5sY3A4SUlnSDJTbmlOci9CVGJEYzlFOWZjSEJuVnJVN2xlM1Z3cGp5djlyT3FSeDUrWURXQzZKVDJjSitWYkxVbmxaZmFkcWlvcktpUXIvQU9BbkhKNlM1ajZ4STBJZ1BrMWlOWU1oYXhFVmhBOUt1c2IxK1ZNaCsyUnRFWldvTU9zV2M0M0c4U2NwR3RTWVVpTTBWUW41M1FCTEpYVkpiRStFQXlka1hRMlUyRk1JbmhxVUdGOVllQ1hOUjExeHE2bDQ1SitkV3BNend4UDZiYTFOU25ObmpUWEF3OEhaLy82djhGZE8vTmxGcllxd3pEaVhxL1h0cFpTbGVYbGlrUWlkTUVGa0hNdXA2NVlZb0EyMG1wZ2ZvYXNzVWdJWUlwRGhhd20xTjVsTG1kMkpoRGtoOWtneGtOUjVLOUFNR1FHZ3FGR1dXT0dPUEVHMEMwcklGa2ZDSVlxYk41Mkl4QU0xU2UydmRCYWJINU0wdHBzdkZIdlpFU2YzeitnL3poK1JpTXpxYzk4OUdEd3NkbS83c3lqOHZXV2xwVFlPbHRjUlVXWllyRllTZXV0MjcwQ2dCeHlaQWlUNkliVXlPNEI1alVid05DZHBMaDRaQVV4ZEQwckxtNVpVNDdUTFRjUEJZS2hLa25ybFJqZklnL3Eyc3BBTUxRNjBXcG51ZHRlbHRqMldoWGV1SDdiSmIwdTIyKzZlM0JDZi8xMG4zYjJqR282bGx5RGxsQlByM3I3K2lWcjlxeTc4NmlNeTcxZWo2MnRkaXJMbnoxOTF2THBCQ0NYbk5vU3BsckwvOFlYS0ZRTm9qVkRzVEprZGRPc3BpaUtpbGRTYytJTEN1U0JRRERrRGdSRHEyVjlvZVRLczlYM1NWb2JDSVpxMDl4MlY2TGx6eXJseVN5Y0tWb3Q2Uk81ZXZQcFdGdzdlMGIwa1NkUDZYKzZSelF5czNndjFVZWZmSHIycjQ4RWQrMGN5NmQ2NlBYYWV5dFFXZmxzUXk5YTJnUElLY2VkSEFQQmtFdFduMmtBRjZzWExXQmdoVENHckhGaVVCeDhzc2J2NktVb25DMFFESlVuOXBVcmp6ZkRrRFZXakYvU3FXU25MMDRNdkx0U3pwMXUybzdyNWkvSUFTMFNKNk14L2J4M1ZMODhOYW9ycTByMTNEcS90bFNVcU95Q2FhMGZmK3FaMmIvZWsyZGxYVkxtOTl2YkVxYUNFQWFBYzA0bVRsT1Q1eGN1UUNhUERicWlZTlpzOXdhQ21PSlJFUWlHcGp0YVc0WW9DbWRLakg5U1NGMGQvSkxXQklLaG5vN1dscWtsdHIxRzFoY0ZoZHhpNi8yU3JuYlNDc1hpMHBObnAvVGsyU21ycjNLcFcydkx2THEwc2tUWFZ2djA5TDREczAvZG5XL251TklTcjYzZE1Ddk9kVWNpaEFHUVU0NEtZUkpOcmF2WkxjQkZLcFVmWXdvZ3l4ZXBzdnI1ajFBVVJhTStFQXhOZGJTMlRGQVVqcnQrS2RReG05eXlwcmcvMWRIYU1yckF0amNtemxPRnJFM1NIenA1QmVPUytxWWk2cHVLNkpIVEUvcHY4NnhHYXhxbDdoNUplaWpQeXR2cksvWForcVdzMzFjcWw4c1ZqOFZpaERBQWNzcHBMVTRxWmMwR0FXRE9kWU1ZUkE0THE1VTExU3lLeDhwQU1PU21HSndoMFkxNnRRcTdwYUtScUhjMUYyeTdtZGoyUWc5ZzZpVjlUbm5XeW1jOEd0ZUcyd0phODlyZk8zUGQ3Vi9KdDFhVFpYNWZxWkdCaFVaRVN4Z0FPZWJFRUFiQU9WNVpBL0VDaTJrUUFYWXhNV1cxdWtDT3pRa2hpaVVJYlFnRVEzV0piZmRJV2xNRTIyNUsrcUtzSUNZdjFULzM1aHBKUDBpTTJaTVhETU1vZDN2c3o1cExTMHNscVl4UEx3QzU1SmdRSnZHdEhqTytBT2RmK0RXcXNQdlh3NzY2VWs4eEZCWGY3TTB3Y25iZDRwTFVJcW1reURhOUxqSDcwUm9WN2dDOGMvMkZwTllDMkk3WFNQcFpZckJseC9PNDNmN3lNdnV6a3ZJeXY3amZBSkJyVG1vSlU4SHVBSjQxMjhlZTFnMUkrcVpjZkx0WGJPcnk2WnZ0UXBJWUI2VVlBNWhaVlVWeWZucU5wSGNVMFBhOFNOSlBBOEdRMStrckdvdkhLMDNUL3RzVVgybXBTNHl4QnlESG5CVENrRW9EYzI2dVpIVkZBbEpSSzJhWEt6YU5pVUFBMmJWU2pNVlU2SzZVOUxjRnVGMHZsdlFmVHYvY2NMbGNMbitwL2JjR3BTVWxMbGxqN1FGQTdqN2pITFF1aERDQXBVSk1SWTMwbUtKVlliRXBFUU4zWjFVZ0dHcmdNN3JnMVV2Nkp4VnVTNmMzU2JyRHlTdG9HSmtKU2lyS3l3enVPUURrbWlOQ21FU3pTTHBkQU54UVlma3F4VGhDeGFZMk1VZ3FNbis5VWlGbVZpbDBIa2xma3RSVTROdjV3VUF3OUI2bnJsdzhGdmQ2dmZZM0NDNHRLWkhYNCtFNkMwZ3dEQ1B2SG9YQUtTMWhTamdFQUpteVpybmhCaHJMclVkOFMxOWsxMUNTVmxBTW1aVUl1aG9waVlMM01VblhGY20yZmpFUURMM0FrUjlxTHNOVjRyVS9XeTRwS1pGb01Rb2d4NXdTd3ZBTkhtQ05BK09tR0dBRFFwamlVeFlJaGhpWU9iT2F4SmhMaGU0dGt0NVlSTnZya1hSbklCaHkzSlQzOFZnOEk1OW5mcDlQaHN2Z3N4SkFUaEhDQU02NWFXYWdPTmlsUkFSNnhhaUJJc2lNUURCVUxjYVJLSFRYU2Zxckl0enVKa2svY0dDWFJ0UG5zLytROC9sS0pXWVNCSkJqVGdsaHVGbEFNWFBMYWdVRDJJbFFyL2g0QThGUUpjVmdyMEF3NUpZMVVDc0tWNTJrTHhieDllanpKWDNTU1N0a3VBd3pFMU5VdTAxVDhWaWM3a2dBY3NyRmVnRHpuLzhURjJPbHNscXBWTW9hakxGTzFyZk5LMlNORGJCeW5rZGo0am4xc2diWnJVb3N3eWVyMWRlRjlaMXhZSkFKVEo5Ym5PcVpzdHIrTXVVNnBhQ1prcjRneHZ2NWNDQVl1dFVwS3hPSlJNc3lNUUJuYVVtSlpCZ2N6d0J5eWltSlB4K0d5QlZEa2pmeDhDUWUyWml0S3lvcElpa21CcVpHWmhEQ0ZPOTV2VkxTTUVXeGZJRmdxQ1JSbmloYzc1WFZFb1RySWVrL0FzSFExUjJ0TFFOT1dLSHlNdnQ3RGJrOWJoa0dYM3dCeVAzRm1sTSsrSUZzTUJNM3A2V3l3ZzlQanVxZkthWmxSMmE1RW5Vc1NsRVVuUm9Sd3RpRnJxS0Y3Ym1TM2sweFBHdWxwSCtWOU5wY3IwZzhIcy9ZR0RXR0RLNi9BT1Q4SXAzMVFLRXJUZHlVTkV0YUxhdjdUNFdzRmk4RWdPQXpIb1dHc1dGc0VBaUd2R0ttc1VKV0krbnpmRTVlNURXQllPanR1VjZKV0N6bXpkU3lJOUVvWTZZQnlDbW50SVNKc1N0Z001K3NnVW45b3NVSmlwY3BhWVppS0VwTmdXQ29RdExwanRhV0tZb2plWWt4ZGFvVE4ra29USWFrejhnYTN3MFgrMklnR05yVjBkb1N5dVZLK0RNeE8xSXBQWFVCNUo1VDBuOUNHTmpCbmJob1hpMXJnTDBLRWNDQXozZ1VyekpKYXdMQjBLckUyQ1pZUXFJRjBYcFpMU2FadWJGd3ZVblNMUlREZ3Fvay9YdXVCL2syWFJtWUhjbk5ZUTNBR1RldFRoQm5WMkFaL0xJR1R1VHJEZUI4ZExlRFpJVXhaWUZnYUVUU1lFZHJTNFFpT1Y4aXBHcmtQRklVV2lSOWhHSlkwdTlJZXFla3J4WGd0dkVGSFlDY2NzcTNwRndRSXAyYnkwcEpxMlExSitiQ0daai9PQUZtVlVwYUh3aUdhcG5HMmhJSWhveEFNRlF2YVMzbmthSzU3cjFEVnBkbExPM3ZBc0hRNm15L2FldXQyelBhY2k4U2lkQXlFRURPVDBaT3dKZ0ZTT1dtc2xMV04xbTFzbVkzQWdBay94bGFMMmx0SUJncTZzRXBFd1B2cmttY1MxQWNicE4wUGNXUXRFcEoveFlJaHVxekhOeG1MQ1R6bFpLL0FNZzlRaGprMDQzRDNQQ0ZwcVRBMHVqcWlZVjRKYlVFZ3FIR1FEQlVkR01ISmNaK1dTT0pPN0xpMFNUcFR5bUdsRzJUOUdaSjY3SWQzSmFVMkQ5Qmt0dGtUQmdBdWVlVVQ2SnhTVDNzRGl6QUwrdWIyNGlrMHhRSGtMUnBpZ0JMcUpMa0R3UkRwenBhV3lhTFlZTUR3VkNEbVBtb0dQMjFyUEdSa0xxUFNkb3R5Uk1JaHM3SUdsc3E0eUcveDBOalp3Q0Z5UkVoVEdLUXdERjJCeTY0VVBiS0d1L0ZMeXVBWWV3Z0FNakF2WTZrMVlGZ2FFaldsTllGMllJcTBaMmltUnZ4b25TTHBGc3BoclExU0hxL3BFL0xDakI5Z1dDb3Q2TzFKZTlhc29kbmFId1BJUGVZdmhTT3ZGQU9CRU8xc2daSzlGTWlBSkFWdGJLNktCVmNlLzFBTUdSS1dpMENtR0xrbHZTWEZNT3kvYjZreXhOL0w1VzBKb1Bka3pMVzVYdzZIR1pQQXNnNVFoZzQ3VUs1VkZZLy9Yb3hzd3NBWkp0UDFxQzlCUk5XSkVLbEZqSDdVYkc2VGRJNmlzR1dlNFpQenJsM01DV3RDZ1JEVlJsNHI0cE1ib2piN1o1Z2R3TEk5UWNxNEpRTDVWcFozMVF5VUNJQTVNN3N6VlhlajVzeXB3VU01NVhpVkNucHZSU0RiYTZROUtZNS96WWtOUWFDb1RxS0JnQ1NSd2dESjF3a2V3TEIwR3JSK2dVQW5LUWhFQXl0elBMVXRIYWVXMXl5V3NBd3VtZnhlcHVzSUFiMitUTlpBM3JQVlJjSWh1b3BHZ0JJRGlFTWNuMlJYQ1pyN0JjZnBRRUFqbE1oYTV3WU01OVdPaEVjclJJdFlJcFpqYVIzVUF5MnE1UVZ4RnlvMXU0Z3h1TzJmM2lxOGZFSnVWeXVTWFlqZ0Z3aWhFRXVMNUxyRWhmSjFFTUFjQzZmck5tVDhxbEZTYU1JOTR2ZE84UkF6Sm55UmttWHpmUHpXanU3TVphVzJwK2h4dUl4R1FhemJRTElMVzUra1hXQllNZ1ZDSVpXU2FJUE1RRGtCNitzMlZBYzM3SWtNYjRZWFZDS20wL1NXeWlHak40L2ZFenpkeUZ2Q0FSREZVNWQ4Y25KS1JreWFBa0RJT2Nmb2tBMkw0N2RZcHBRQU1oSHBxd1dNWTZkWlNnUURQbGtqUytHNHZaNkVjUmwycldTWHJQQTc1cWMramtSalVabEdBYnpWQVBJS1VJWVpQUGl1RVRXOU5QMDBRZUEvTDF1YUFrRVEzNEhubU5NU2Mzc0l1cW9yQUY1a1hsL0lhbDhucDhia3BxZE9KYlUxUFMwNHZINE9Mc09RSzVQVkVBMkxvNzlzbHJBdUNrTkFNajdhNGRWaVZZblR0SW9xN1VPaXR2elpIM2hnOHlybC9USEMvek9MV21sMDFaNFluSktjY1hIMkhVQWNva2JZbVJjSUJncVQ1eUltWDRhQVBLWEtXdHNHRS9pc1NJUURQVkxta2w4dnB1U1lvbEhYRkkwOGJ0dzRzK3BqdGFXakF5SUdRaUdLalgvTi9Jb1BxK25DTExxYlpLK0wrbllQTC96QjRLaDJvN1dsaUduck96NHhJVGlzZmd3dXcxQUxoSENJS01TZzdNMWlRQUdBUEtOSWFsVWtsOVdOMUx2UE05Wks2bFhWc2dpTGRIQ05oQU16VWlhbERRaGFheWp0U1ZtdzNuR2xOVEE3b0tzY1dDMlVReFpaVXI2cUtRL1dPRDNkWUZnYUx5anRXWGFDU3M3TVRHcDhNek1hWFliZ0Z3aWhFSEdKQUtZbFpRRUFPU1ZFa2tWc2daUVh5cEFkOGtLMm51bHBLWjluVzFGVXlrcEhnaUd4aVVOZDdTMkxHZU1oanJSRFFtV2Jaby9MRVJtM1NUcFprbS9tZWQzaHF5dWdsMU9XTkdSc2JHb0pGckNBTWdweG9SQlJnU0NvYkxFaFRrQUlELzRaUTFzdTFKVzE1NWtXekNhaVp1c1ZLOHBqTVQ3ckFvRVErc0N3VkJsSUJoS3FkVmtJQmp5U3FwbTF5SGhaUlJCenZ5bEZnNURTd1BCVUpVVFZuSjBkQ3dxYVlUZEJTQ1hDR0ZndThSZ2pjMmlDeElBNUlPU3hHZjJDcVhmaXNDVGVIMjZuL3RlV2NIOXVzUTRZc21xWS9jaG9VTFdvTHpJalEyU2Jsdms5L1dCWUNqbjl4M2pFeE9TTk1ydUFwQkxoREN3VldJYTZsVWlnQUVBcHpObHpXNnlVdlowNFNqVjhrTVJqNnlwYlZzQ3daQW5pZk5OQmJzUkNiY2s2Zzl5NTMxYXVHV2FLYWttMXlzNGRIYllsRFRBcmdLUVM0UXdzRTBnR0hMTENtQ29Wd0RnYkxNdEZ1MmVVYWhjMW5ndnkrV1gxU3Btc1M0TU5leEd6SEVqUlpCemxaTGV2OWd4bXhoSU95bXhXTXpXbFF2UHpDZ2NEcHVTK3RsVkFIS0ptMlhZSXRHUGY1VVk3QmtBbks1RzFoZ3VaZ2FYWDJMRGNneEpqWUZnYU9XRjNSZ1NvVCt0WUREWDh5a0NSM2lUcEVzV3VlOUlPandkbjVpMGRjV0doNThkQ29iWmtRRGtGQ0VNN0xMU3BvdHVBRURtenZtTmtqSTlRS1loYTN3WXUwS2VDa21yRThITHJDclI3UlhuckJPVEFUaUZLV3VRM29WVXBUb0F0MTJHemo0N0tSSWhESUNjWDVBQnl4SUlodXBrZjVOMkFJQzlOMFpOc3JvaFpldjk2bTFjWG9ta05ZbHhZQ1I3dWp5aGNOeEFFVGpLalpKZXZNaG5RMDVhc1owZGZqYUVvVHNTZ0p3aWhNR3lCSUlodjVpZEFnQ2NiRGFBOFdiNWZYMnlOeXh4eTJvUlV5c0dZTVg1cnFJSUhPY3ZGemxPbDJxTk41T0pGZW9mUEMyWHl6VVQzTFZ6bU4wRElKY1l2d05wU3pRTlgwbEpBSUJqelFZd3VRb3RhaVJOMm5oVDVaSzlMV3hRR0FoaG5HZU5wTGRMK3RkNWZ1ZEx6SDVteUpwVnJVUldTR3hLY3AvZDgzajEwVzkzMkw1Qy9RT0Q4bmpjdmV3YUFMbEdDSVBsV0tuTURld0lBRmllMlRGZ2N0bHF4SkRVSUttblFNclRTRHd1YkVrY2t4U2Y4eWV5eHlkcEU4WGdTSDhrNlVlU0J1ZjUzVG90TUs2VDRUSXowbEsvZi9DMERCa2hkZ3VBWENPRVFWb1M0OEQ0S0FrQWNLd0daYjhMMG55OHNyb2xqVGk4dkZ5SmRmVWtIdTQ1RDBQSkR3UThHOFpFWmJVQWlpVCtuSDNFcUpxMjJpUytFSEtxTWtsL2R1Q0pmWjkvNkZmM2Z6Z1dqVmJmOU1vWGZYalRsVnZPS2djRGEvZjI5Y2ZENGZBUmRndUFYQ09FUWNvU0F5UFdVaElBNEZnMWNsWlFibmUzSkR0NGRLNHJSSW5zYXpGa0pFSUJVL09IWURPU3BoT1BDVmxoRGRKSEt4Z0hPek13OUx2My8renVXeUl6a1RwSnV2L245MzV5MDVWYi9pUVg2M0txcno4U2k4ZTcyU3NBY28yQmVaR1N4TFNDaldKcVVBQndLcDh5UHcxMXFnemxQcnczRW1WVEw2bEYwaXBaQTh1WEs3dGR0anlKOTZ5VHRIck9lcFJTZGRPeWtTSndwcUgrMC9ySk4zNWd6QVl3a2pROU9mWFN1Mzd3aTJ0eXNUNjkvZjB1U2NmWk13QnlqUkFHcWFyaFFoRUFITXVVMVEzSmlYeVMvRGw0M3hKWndjdHFXVjhpbE10WkxZRTlzcWJzYlVxc1k1MmMwWTBzWDJ5Z0NKeG5lT2lzZnZyTkgycHFZdktpMzNVZFB2RUgyVjZmd2FFaFRVK0hUVW1IMkRzQWNvMFFCa2tMQkVOZU1SMDFBRGhaamNQUDdiWEtUa3RLbDZ4eGFGYkpHa1MrUEUrdWVVeFpnVXh6NGxFaFdwNHVaUzFGNEN3VFl4UDYyYmYvWjk0QVJwTENVOU8zN3Y3bGI1WnN3UlNOMnRkVHJ5djA3TmpnaERBQWNvNFFCcWxvNEdJUUFCeXJWRmJZNEdSdVdlRklwcGl5Z3A3VmlUODllYncvWjcvNFdDMnBtbXUyQlRWVEJNNFJuZzdyWjkvK3NVYk9EQy8yTk9QZ2svdmZ2OVN5SmllbmJGdXZrOTA5Y3JsY001S1lIUWxBem5GQ1IxSUN3VkNackZIdUFRRE9sQzhEcGxkbjRQcGpObnhwa1JYeUZOSVhCcTVFbVJIR1hLeFN1ZW5paG5sRVppTDYyYmYvUjZmN0JwZDg3dlRrMUV0Ly9sOC9hY3ZXdXAwNEdaSzN0TFRudXR1L1VzR2VBdUNFRXp1d3FNUmd2QTJVQkFBNGxrLzVNNDZJSWZ0YXd4aXlCaUV1eFBCbHZtMnRuck90c01iUmdRTk1qSTNycDkvOGdmcEN2VW0vcHZ2WXlmYUpzZkdzVEM5K3JDc1VqeHF1UTVLYUFzRVF4dytBbkNLRVFUS3F4Q0NCQU9CazFYbDRYbG51elpkZjFwZ3ZOU3F1cnJJdVdhMSttc1ZBK1NzNTlIT3Y5MFMzZnREeEhmVjM5NlgwdW1na2Vza3Z2dlBUVjEzMDRYRHBWU04ycitQK1E0ZWpocmQwWCtLZlRZa1czZ0NRc3hNNXNLQkVLNWhhU2dJQUhLc2s4Y2dueTJrTk16c0QxQW81YTVhamJQUEthZ2xTVjhUWGM5VWMvcmtUajhmMTIzc2UxaysvK1VOTmpFMmt0WXloL3RQdnl2UjZEbytNNnZUUUdiZTN1bmJmbkIrdlRFdzRBUUJaUndpRFpDNXczQlFEQURoV3ZvNXhVSm5HZFVpWnJOWXZmSXQ5L3Y1ZnBlSnNGY09NalRreU5qeXFuM3pqQjNyMDNvY1ZqOGZUWGs0MEV0MTgzNy84eTJ2bi9WMHNac3U2SGp4eTFQckEyYlIxM3dYM1FDc0R3UkQzUWdDeWpnOGVMQ2pSQ3FhR2tnQUF4ektVdndPVEdrcCtOaWVYcEhwWkxXQzRkcm1ZS2F0VlRMRjF6YXBtMTJmZnNmMUhkT2RYL2t1bnVucHNXZDV3VC9kbjkvenRuMy8zMkhlL2RzM2NuMDlNVHRxeS9BT0hqOHJ0ZGs4MHZmZ1ZGNjV3aVJqekVFQU9jQ0dEeFZTSlZqQUE0R1NsZVg0dVQ2Wkxra2ZXMkIvbDdPNmt6dHROV3Y1NE8vbWltbDJlUGZGNFhBLzk2bjUxZnU5L0ZaNmF0bTI1bnFaTmFscTU2dW96VHdhL3QrZjJEMy91ekZPL3JUSk5jOGF1NVI4NGRGaW10MlRmUXNkTUlCaGloaTBBV1VVSWc4WFFDZ1lBbk0yWDUrdnYxdUl0ZWZ5eUJxRDFzS3VUVnBJb3M1SWkyRlphTVdSSlpDYWlYM3pucDNweTkyTzJMdmQxejc5Q1QvM3pCM1huVjc3ZytsVDdYOGhuNkpYZFAveldMMkt4bUcwdHVuNzc1TlBSdUxja3VNaFRWaVJhZndOQVZoRENZRjZKVWVPNTZBVUFaeXVFY1VBcUYvbjVDaFZYOXhxN3pIWlBLdlN4YzFhd3F6TXZQQjNXenYvNGtib09IYmZ2QnNRd2RQdmJYcTRmL09YdnE4Sm41WVhiWG5TenZ2KzFmemF2dWVMU21uZzhia3RMN042K2ZwMGVPbU9XTmpUOWRwR25lY1cwN3dDeWlCQUdDNkVWREFBNG01RzRlY2gzcGJxNCsweTltSm5QanZyUlVPQTNsMDNzNXN5S3grUHEvUDcvcWkvVWE5c3k2eXZMMVBtM2Y2Q1B2T0VXR2NiNUdXdDFWYVgrL2xNZk4yNTYzZzBhSDU5WTluczkvdlFlR1lZUlgvR0NXeDlmNHFtMXRJWUJrQzJNOTRHTEpLYnNvMzhzQURoYklVMnZXaTVwZUU1d3dEbklQcld5UXE0ekJiWmRwYkxDT21UUWs3c2ZVL2ZSazdZdDcvcE5MZnBoKy8vVm1vYnFCWi9qY2J2MW1ZLy9wUTRjUHJMczkzdmk2VDN5bHBZZXJ0eDgyZGdTVC9YSW1tbHNoTDBPSU5NSVlUQWZtbVFDZ1BNVjB1Q3I1WW1ibnhYSy8zRnVuS2hLVnV2bjAvbStJZC83cDIvOXdkVGsxSllWcXhwN2I5NytZcFZWTWw1ekpoMTRmSzl0eTNySHRsYjl5N3RmcXhMUDByY2ZIcmRiVjJ6ZHN1ejNmT2pSeHlNeFQ4bURLVnovRXNJQXlEaENtRHlWYURMcFRseUVtNG1McXd1YlVjWVNmMFlUajBoSGEwc3N5Wk1RQUlCemVMYk16b0RrWmJkbVRFWGlPbUV3WHpmZ2w5LzczeHZPbmo3ekY1TFVkZWk0L3ZPTFg5ZjZyUnQxN2MydHFtOWlqRjY3UldZaU9udDYrUTJvM0c1VC8vS2UxK2tQZnFjMXErdC8vR1JJcC9yNjNaVmJycmczeVpmNEE4R1F1Nk8xSmNMZUI4QUZYQkZMaEMwbHNwcmRsaVF1VUwxSzh4dlFRREFVbHpRaktTeHBPdkhuVkVkcnkwemk5MzdxQlFEa2hVSWJQSjBBSnZQS0pjV1ZweTFpZW82SDNqSDMzL0Y0WEVmM0hkYlJmWWUxZnV0RzNYQnJtNnJybkR1azNkVEVwRXI5K2RQUWEyeDRkTm5MYUtxdjF2LysxVnQxM2NaVldWLy8reDU4UktacFRyZTg0ZzJQcFBDeUNoVmUxejBBRHNQTnRnTUZncUVTV1RNYStHVTF5N1p6b0xEWmdSeTlpWXV4MmZlTVNKcWtUZ0JBM21BUVNhU2pRbFpMMmJ5NjBUeXk1MkJWZUdyNmhRdjkvdGorSXpwKzRLZ3V2ZjRLWGYvQ0crUXZkOWJFVU1jUEhGVThIdGY2clJ2enBzekQwOVBMZXYwTHI3NUVQL3p3NzZtMklqZERQUDNtd1lkalpxbnYvdElWVGVFVVh1WVRJUXlBRE9PRzJ5RVN3VXVsckdERWs2TzZVTUdlQUlDOHdReUhTRmVWckc3S2VUUCt4ZE1QUFhHVGxtZ0ZISS9IdGZlM1QrdmdrL3QxeFExWDZmSWJybEo1Wlc0dWJhTFJxRTUxOWFycjBIR2RQSHhjWndhRzlPcTN2ejZ2S2tsa0pyMWVPWVpoNktOdmVvays4WHUzeW1Ya0ppc2VHUjNWVTN2MkdiN20xYnRTZkNsalVnSEl5bzAzY2lUUjFhaENVcldzN2tZQUFDUjlyME1SWUJscVpYVlBuc3lIbFIwZUduNUI4dUhCako1NDRGRTl1ZnN4TmExcDFwcEwxbW4xeGpXcWJheS9hRXBrdTBRaUVRMTA5K25VeVY2ZDZ1cFJ6L0hRUlNGR2xZTzdTdG1sdnFwYzMvMkx0K2dsVjIvSzZYcDAzbjJmSk1WWDNQaVN1MU44cWNtNE1BQXlqUkFtQndMQmtFdFc4Rktqd3ByZEFnQ1FQYlNFd1hLdGtOUWpLNHh4dFBCMCtQcFVYeE9QeDlWN29sdTlKN3IxOEs0SFZGSmFvcVkxemFwcmFsQkQ4d3BWMTllb3NxWktMcGNycFdXT2o0enB6TUNRemd3TWFhai90SWI2VCt2MHFRSEZZZ3ZQZmVEeGV1UXZMK3laMTMvbjJrdjByVDk3c3hxcmN6OWoxVTkrOGF1WXQ2ejh3ZHBybjV0TzF5SzNKRUlZQUJsRENKTkZpWll2MWJLK2ZTSjhBUUFzUjR3aXdESVpzb0tZWGlmWHA0TlA3YStKUmFOcmxydWM2YWxwblRoNFRDY09IanRYQUlZaFg1bGZaWlhsS3ZXVnlsUGlsZHZqVml3YWZiWWxTelFTMWNUWXVDYkdKalExTWFsNFBKN3llMWZXVmhkc0pmSjYzTHJqN1MvWG43enF4b3kxTkVyRnNSTW50Zi9RWVZmWm12VS80UDRJZ0JQeElaTWxnV0NvWEZLRENtODJDd0JBYnNRcEF0akFJNmxlVXI5VFYvRG9ua05iTW5ZUXhlT0pnR1U4bzl0UW5ZZGRrZUt4cFQ5aXJsNi9VdC82c3pmcnluVk5qbG52bloyNzVIYTdSOWUrL20yL1NuTVJmRkVLSUtNSVlUSXNFQXk1WlgzTFZFNXBBQURzdkVlaUNHQVR2NnpKQVJ3NVVPL0ltWkdOK1Y3QVZiVlZlYmZPaXdWVEhyZXBqNzM1SmZydzYyK1J4KzJjekdKNk9xd2YvNnd6YXBSVmZEL0ZXWkhtWXJ3dEFCbEZDSk5CZ1dDb1VsWUFRNzk5QUlEZDZJNEVPOVhJR3FUWGNlUER6SVRESy9POWNMM1JxYnhiNS9HUnNYbC8vcHpOYS9UMVAzbTlybGpiNUxoMS92bGRkMnRzZk54WWVldXJ2cjJNeFJEQ0FNZ29RcGdNU0F5ODJ5aW1mQVlBWkE0RFI4Sk9ocXh1MHowT1hMRzhyK3NyTnF6UHUzV2VHSjg0NzkrbGZwOSsvM1V2MGxmZmRMTWp4bjY1VURRYTFkZi82L3RSYjNuRnI1cGUvSXFlWlI0TEFKQXh0TkN3V1NBWThrcGFJd0lZQUVCbUVjTEFibDVaM1pJYzVZcm5YZk1kbDJsMjUzUEIxclUwNTkwNkc0a3N3akFNWFhIRDFYcnorOTZxdDd6b2VrY0dNSkwwODd2dTBhbitBYlBxeXVkOGFabUxvcXNuZ0l5aUpZeU5Bc0ZRbWFTVkl0d0NBR1RlaktScGlnRTI4MGs2TFFlRmZGYzk3OXJqM2hMdnk0Sy91dThqVTVOVHQ4WHk3REtyek9lUnQ4U2JkeFZoMVliVm1nblA2TXJuWGFPYWhscXJjcmlkV2ZiVDAyRjk1ZXZmam5yOFpUOXJlZFVibjdiaHN4VUFNb1lReGlhQllLaEtWaGNrQUFDeUlTeHJhbUhBYmxNZHJTMU9xMXNuVzIvZC90NklZZDUyeTJ0L1QvY2Y3bFB3VUNndkNyT3hPVDh2RDlkY3NrNXJMbGwzM3M5OHBqTkRtUC82NFk4MU9EUVVpOFZpNyt0b2JUbkpJUXpBeVdpeFlZTkFNRlFyQWhnQUFGQVlLZ0xCVUtrRDE2dk1IWS9xdGhzdjFTTi85ejZkK1BlLzFKZi82TFY2ZmR1VnFxOHNjMnhoYnJqMkNtcFVCb1Y2ZXZXMWIzMDNGb3ZGZGdSMzdUeEJpUUJ3T2xyQ0xGTWdHS3FYVkV0SkFBQ0FBdElneVdrdENqeVM1UGRaK2RDYWhtcTk1eFhQMTN0ZThYekY0M0h0Qy9VcmVEQ2tSdzZlMUtOSHV2WFVzVjVOaG5QYnM4UjBHVnE5YVYzQlZJcFkzRm5EcGNSaU1YM3k4LzhRazNSTTB1MGN0Z0R5QVNITU1oREFBQUNBQXVVTEJFUCtqdGFXQ2FldG1HbWFGLzNNTUF4ZHRycFJsNjF1MU50ZWN2MnpnY0h4dmpONjZuaXY5bmIxNlZEUGFSM3VIZFNobmtIMW5SM0x5cnBlZXRYbXZCd1BaaUhUVVdlRk1OLzR6cDE2NnBtOThWZzgvcWJncnAyTWtRVWdMeERDcENuUkJZa0FCZ0FBRktwNlNWMU9XNmx3a3ExYlhJYWhEVTIxMnRCVXE5Yys3L0x6ZmpjMkZWYlh3QmwxOVo5VjE4QlpuUndjVnQvWlVmVU9qYXJ2N0toT25SblYwTmlreHFmQ0thK2ZZUmhxcmlxVk1kd1hmZjcyVzgxQ3FoQVJCN1dFZWVEaG9EcSsrWi94ZUR6K3dlQ3VuWTl5dUFMSUY0UXdhVWdNd2x0UFNRQUFnQUpXR2dpR1NqdGFXNlljc2o3amtqUWREaTk3UWVXbDNtZGJ6aXdtRW8xcGFHeENZNU5oalV4TWFXSjZSdUZJVkxGNFhDTVRWckg0U3p6eXV0MnE5SmRvUlZXNW1tb3E5S2NmL1p2NG9icjZzTXMwZllWVUljWWpNVWVzeDk0RGg5VCtxVHVpcG1sKzU4RmYvUGlMSEtvQThna2hUSW9TMDFBekNDOEFBQ2dHTlhMT0xGd3praFNKUkxOM29XeTZ0S0txWEN1cVVudmRrM3YyeFJ0KzV6VytRcXNNNDlIY2h6QUhqeHpWK3o3eXNXZzBGcnM3RW9tOGkwTVVRTDVoZHFRVUJJSWhyNlNWbEFRQUFDZ1NGWUZneUNsZjJrMUswdFRVbEtNTDdGVC9nS2FtcGx5K2xhc0tyakxrdWlYTVE3OTlUSC80Z1E5SHA4UGgrOExoOEd1Q3UzYUdPVVFCNUJ0Q21DUUZnaUdYcEdiS0RBQUFGSmxLSjZ6RTdNQ3JrV2pVMFlWMTdJUTFqRTdwaXNMNzNxNXZaRHduN3h1TlJ2WFZiLzZuM3QvK04vR1pTT1RiNFhENHBjRmRPeWM0TkFIa0k3b2pKVytGSkMvRkFBQUFpa3lWcENGSFhMaTYzZVBESXlObFRpNnNZMTBoZVgyK0dYZFpoYWZRS3NMVFI3djBpVi8rdDk1NTI1dTB1ams3SWRQalR6K2pPLzd4SzlGalhTZWo4WGo4angvOHhZLy9qVU1TUUQ0amhFbENJQmlxbEVPK0JRSUFBTWd5ajFNRzZIV2I1cG16dzg0T1lmcjZCMVJTVlJPV1ZIQWhUT21LcHVGZmZmVTNrei83MWErYlhueFRXL3dOcjM2bGNkMVZWOGd3REZ2Zlp5WVMwZjBQUGFMdi9QQW5zU2VlM3VQeWVqejN4R0t4L3hmY3RmTW9oeU9BZkVjSXM0UkVQK2dWbEFRQUFDaGlGWkp5SHNJWWhuRjY2T3h3aTVNTHFuOXdVR1pWVGJ3UUs0SExXMUpldHZXcUZXZWVmdlNOOXozNHlJZnYrczBEVnpTdGFJaTg3Q1czdUcrNThmbmF1bm1UWEdrR01yRjRYSHYySGRCZHY3bGZPenQvSFIwWkhYVjVQWjU3SlgzeWdaLy82QjRPUVFDRmdoQm1hU3ZFT0RBQUFLQzRsVXNheVBWS1JDS1IzdUhoNGF1ZFhGRGR2WDBSVDMyTHIwRHJnYm4rOS82d3RyUDFFOStXOU8zV1c3ZGYzejh3K1BadjMvbWpOMy9qTzNmV2w1ZVZSYTY1OGpMenNpMmJqVFdybXJXbXBWbE5LMWFvdk13dnQvdmNiY2ZrMUpUNkJnYlYwOXVuSThlT2ErL0JRd28rL2xSa1pIVFU3ZlY0ZXNNek0xK1g5SzhQL1B4SHh6bjBBQlFhUXBoRkpLYWpMcWNrQUFCQWtmTUVncUdTanRhVzZWeXV4RXdrMG4xbWVDUW1CMzlCTm5oNktPN2RjRVVoWDJNM1N6b2xTY0ZkT3grVjlHanJyZHYvUk5JMVkrUGp2L05nOExHYkhubnN5ZXRuWm1hYTR2SDRzODFpVE5PTW02WVpDNGZENW5rVnkrMCtZeGpHNCtHWm1ic2wvZnlCbi8vb1VRNDNBSVdNRUdZQmdXRElrTlJBU1FBQUFFaVMvSkttYzd3T3AzcFA5VVhrNE1rU2hrZEh6WlZsQmYwZFh0T0ZQd2p1MmhtWDlIamljWWNrdGQ2NjNTdHBvNlJWa3NxajBXaFZOQm8xSkUxSUdwZlVJNmxyOXk5K2ZKcERDMEF4SVlSWldMV1lEUWtBQUdDV1g5S1pISy9EaWI3QjA0NjlmcDJlRG10bVpzYmxLUy9vK1J5U0dwTW51R3RuV05LK3hBTUFrTUJZSi9OSXRJS3BvU1FBQUFDZTVZUnhUazZFdzJIWDJlRVJSeGJRMlJGcnZkeEYxaElHQUpBOFFwajVWWXRXUWdBQUFPZGROd2FDb1Z5M0VqNHVTYjE5Zlk0c29LRXpWa01odDcrc2tPdEJNNGNDQUN6alpFb1JuSTlXTUFBQUFBc3F6Zkg3ZDBuU3FmNEJSeGJPOE1pb0pNbGRWbEhJZGFDRnd3QUEwa2NJYzdGeTBRb0dBQUJnUGlXNWZQUGdycDFUSHJmN2RIZXZNMXZDbkIwZWtlRnl4VTJmdjVEckFOMlJBR0FaQ0dFdVZrVVJBQUFBektzazF5dGd1RndIajNlZGRHVGhuRDV6UmlVK2Y3akE2OEJLRGdNQVNCOGh6QnlCWU1namErUi9BQUFBWEN6bk0wZUd3K0duVDV3TXhaeFlPR2ZPanNoVFhoRXA4RHBBdDMwQVdBWkNtUE5WVWdRQUFBQUxjaWZHejh1bEEwZFBuSFJrQ0hQNnpCbVpaUlh4QXE4RHZrQXdWTUtoQUFEcElZUTVYemxGQUFBQTRPanJ4NE9qWTJQdTBiRXh4eFZNNzZtK21GbFQ3eW1DT2xETFlRQUErWGtTZFl4RVZ5UlNmUUFBZ01XWk9YNy92WkowdkN2a3VJTHA3ajBWTGFscktJYnJTYm9rQVVDYUNHSE9LYU1JQUFBQUhILzllTnpsY29VUEh6dnVxRUtKUkNJYU9EM2s5bFlYUlNNUlprZ0NnRHc5aVRvSkEvSUNBQUE0L1BveHVHdG56T3Z4SER4eTdJU2pDdVZrZDY5aXNaaFIybGdVa3djMWNoZ0FRQjZlUkIzR1J4RUFBQUE0Ly9veFBEUHo2S0dqeHgwMUFPN3hrOWEwMmFYMVJaRlBOSE1ZQUVDZW5rU2RJQkFNZVpYNy9zMEFBQUQ1SU5lekl5a1dpejF4Nk9neFI4MlFkUFI0bDN5VlZWTXViMUVNTVVoTEdBQklFeUdNaFFGNUFRQUE4c2ZUWStQajVzRHBJY2VzMFBHVElaWFVOMGFLcFB4WFV3VUJJRDJFTUJaQ0dBQUFnT1FZRGxpSHB5WHBpSU1HNXoxeTdFVEV1M0oxc1l3eHVKYkRBQURTUXdoajhWSUVBQUFBU2NsNUNCUGN0YlBmNDNhZlBleVF3WGxqOGJoT2hMcGRwWTByaStYYW1oQUdBTkpFQ0dQeFVBUUFBQUJKY2NTQXVDN1Q5WXhUcHFudTZUMmxtWmtabDIvRnltS3BBeXNUWXlvQ0FGSTlmMUVFa2doaEFBQUFrdVdJRUdaNk92em93Y05ISFRFR3kreDAyYVZOcTRxbERoaGlYQmdBU0FzaERPVUFBQUNRajU0NmZqTGtpc1Z5UDBuUzRXUEg1YXVzbWpKTFNvdXAvTGRTQlFFZ2RVVWZQZ1NDSVlOcUFBQUFrTFM0UTliajZVZ2s0dXJxN3NuNWlodzVma0lsalN1alJWWVBObkVvQUVEcWFBSGlqQkgrQVFBQThrWE1JZXV4VDVLT25laksrWW9jT0h4MHBxUjVyYi9JNmdFaERBQ2tnUkNHRUFZQUFDQVZqbWdKRTl5MWM4enI5ZmJrZW9ha21VaEVvWjVldDY5cFZiRmRVOUlkQ1FEU1FBZ0RBQUNBVkRpbTIwMDBHbjNpeUxIak9RMkZqcDNvVWp3ZU4zekZNeWp2ck1zNEZBQWdkWVF3dElRQkFBQkloVk82SXlrYWpUNTU2TWl4bVZ5dXc2RWp4MlM0WFBIU2hxWmlxd2ZOZ1dDb21zTUJBRkpEQ09PY3dlVUFBQUR5Z1pNR29OM1QzWHZLTXhQSjNVelZoNDRkVjFsZHc2Umhtc1ZZRnk3bmNBQ0ExQkRDQUFBQUlGbVJqdFlXSjMyQnRTY1dqeHNudWtJNVc0R0RoNC9HdkN0WEYrczFOU0VNQUtTSUVJYVdNQUFBQU1rS08yeDk5aHFHRVR0eVBIZUQ4eDQ0ZkRUbWExbGJXcVQxNFJvT0NRQklEU0VNSVF3QUFFQ3lIQlhDQkhmdERIczhucTZqeDNNelRmWGcwSkJHeDhiYy9wVXR4Vm9mcnVPUUFJRFV1SXU5QUJKTmFnOVNGUUFBQVBKUE5CcDkvUEN4NDJ1Vmc4a1dEaDg5TGtueU5SVnRDSE5sSUJneU8xcGJvdFJFQUVnT0xXRUFBQUNRdDZMUjZOT0hqeDNQeWNpOEI0OGNWVWxaV2RoZFhsR3N4ZStYdEpsYUNBREpJNFFCQUFCQVBqdlkxei9nanVSZ2hxUkRSNDdKMTlnOFUrVGwzMG9WQklEa0VjSUFBQUFnbisyUHhlTkdxUGRVMXQvNHdPR2prWkpWNjN4Rlh2N1Bwd29DUVBJSVlRQUFBSkRQRGtuU2laUGRXWDNUOE15TVRvUzZUVi96Nm1LL25pYUVBWUFVRU1JQUFBQWdid1YzN1J6eHVOMURKN3Q3c3ZxK3gwNmNWRHdlTjN6Rk96UFNyQ3NEd1ZBNU5SRUFra01JQXdBQWdQeStvRFZkQjQrZlBKblY5engwOUpoY3Boa3JiV2ppZmtLNmdWb0lBTWwvYUFJQUFBQjVhM282L0hUWHllNVlOdC96NE9HaktxdGZNV1c0dUp3V1haSUFJR21jTlFBQUFKRHZEaHpyT3BuVkVPYlFzZU14ejhyVlhFdGJicVFJQUNBNW5EZ0FBQUNRN3c0T2o0eTZ4OGJIcy9hR2g0NGNpL21hVjVkUzlKS2s1d2FDSVlOaUFJQ2xFY0lBQUFBZzN4MlFwSzVRZGdiblBUTThySkhSVWJldnNabVN0OVJLMmtJeEFNRFNDR0VBQUFDUTc0NFpoaEU5ZmpLVWxUYzdjdXlFSk1uWHRJcVNQK2NsRkFFQUxJMFFCZ0FBQUhrdHVHdm5qTmZyNmNuV05OV0hqeDJYcDZRMDRxbXNwdkRQZVJGRkFBQkxJNFFCQUFCQTNvdEZZM3RPWkxFbGpHOUY0eFNsZnA0WEI0SWg3aTBBWUFsOFVBSUFBQ0R2elVRaWU0OTNoU0xaZUs5RFI0OUZ2YzFyU2lqMTg5Ukl1b1ppQUlERkVjSUFBQUNnRU96djZ1N0orTFZ0UEI3WDBlTmRocStweFVPUlgrVEZGQUVBTEk0UUJnQUFBSVhnWURnY2R2VU5ER2IwVFU3MUQyaHFldHJGb0x6enVwVWlBSURGRWNJQUFBQ2dFQnlVcEs1UWQwYmY1TkRSWTVJa1h4UFRVOC9qcGtBdzVLVVlBR0JoaERBQUFBREllOEZkTzN0TjA1ek1kQWh6NVBnSitTb3FwODFTUDRWK01iK2s1MUlNQUxBd1FoZ0FBQUFVQkkvYmZhd3JsTmxwcW84ZU82R1NocVlaU250Qkw2TUlBR0JoaERBQUFBQW9DT0dabVQxZDNUM3hUTDdId2FQSElpV3IxdElNWm1HdnBBZ0FZR0dFTUFBQUFDZ0lzVmhzMzdFVFhaRU1MbDlkb1I2enRLbVphK2lGWFIwSWhsb29CZ0NZbjVzaUFBQUFRSUU0ZktwL3dCMk5SbVdhcHUwTDd6blZwMmcwYXBUV04xSFNpM3VscEk1QzM4aHRPM2FYU2xvaHFVeFNpU1N2cExDa1NVbkRrdm82Mjl2aVZBY0FjeEhDQUFBQW9GQWNqTVZpUm05ZnYxcWFWOXErOE9OZElVbFNhVU1qSmIyNFY2aEFRcGh0TzNZM1NMcFUwbFpKV3lSdGxyUlJVck9rcWlWZVByTnR4KzZRcENja1BTcnBYa2tQZHJhM1Jha2lRUEVpaEFFQUFFQ2hPQ2hKSjA2R01oTENkSFgzeU92emgwMmZuMm1ZRjNkcklCZ3E3V2h0bWNxWEZkNjJZM2VUcE1za1hTRXJkTGxVMHVXUzZwZXhXSStrOVluSDZ4SS9HOXkyWS9lZGtyN1UyZDYyajZvQ0ZCOUNHQUFBQUJTRTRLNmRaNTcvc3RlT251enByY2pFOGsrY0RNbFgzeENXMWUwRUMvTkxlcUdrWHpwdHhiYnQyTDFTMHBXeUFwZkw1L3habGFWVnFKZjBSNUwrYU51TzNUK1c5TUhPOXJZalZCbWdlQkRDQUFBQW9HQ1lwdXRRVjZqN3Vrd3MrMWpYeVppN1lhV0hVazdLSzVYREVHYmJqdDJWc2xxMVhDRXJkSmw5MURxb2pGNHI2UlhiZHV4dWwvUjNqQjhERkFkQ0dBQUFBQlNNbWZETW5oTW51NitWWk5pOTdPTmRvVmpaamJlV1VNcEplWTJrUDhuMG0yemJzZHN0YTd5V3EzVis2TEkyVDhySksrbnprcDYzYmNmdTJ6cmIyOEpVSGFDd0VjSUFBQUNnWU1UaThZUEhUNFlpc3NianNNM1U5TFRPRGcrN2Eyc2JLT1RrckFrRVE5ZDN0TFk4YXRjQ3QrM1lYU1hwR2xtQnk5V0p2MTh1YTJhaWZQY0dTU1hiZHV4K0EwRU1VTmdJWVFBQUFGQklEZ3llSHZLRVoyYms5ZGlYdy9UMDlrbVNTbXJyS09Ia3ZVN1dyRUFwMjdaajkzcWRDMXhtLzF4WDRPWDFLbG16U3IyRHFnTVVMa0lZQUFBQUZKTEQ4WGhjb2U1ZWJWaTN4cmFGOXB5eVFoZ3ZMV0ZTOFFaSmY3WFlFN2J0MkcxSTJpVHArc1RqT2tuWFNxb3Awako3KzdZZHUzL1QyZDcyZGFvUFVKZ0lZUUFBQUZCSURrcFNWM2UzclNGTWQrOHBlVXRMWjh5U1VnYm1UZDZXUURDMHRhTzFaYjhrYmR1eDI1UzBXVmJRY3IyazU4aHE1VkpCVVozbkM5dDI3UDVwWjN2YklFVUJGQjVDR0FBQUFCU000SzZkNHplKzRuZFBuK3p1dGJYZlVNK3BQcFZVMTRabDgxZ3poVzd5OU5RbnR1M1kzUzNwdWJJQ0Z6K2xzcVFhU1IrWDlENktBaWc4TG9vQUFBQUFoY1F3ZE9oRUtHVHJNbnRPblpLN3RzR2dkRk5qZWx4dmxQU25rdHBFQUpPS2QyM2JzWnNCaUlBQ1JBZ0RBQUNBZ2pJOUhYNm02MlIzek01bGRuWDN6SGpyRzMyVWJtcThsVjY1UzJsOG53YWZwSGRSREVEaElZUUJBQUJBb1Rsdy9HUW9hdWNDQjArZk1UeFYxYlNFU1VOWkl3MWcwdlFtaWdBb1BJUXdBQUFBS0RTSHpnNlBlQ1ltSm0xWjJFd2tvdEd4TWJlbnZJcVNUUU1oVE5xdVMwelZEYUNBRU1JQUFBQ2cwQnlTcEs3dUhsc1dkbnJvakNUSlcxMUR5YWFocE1vcmo0OHVTV202aVNJQUNnc2hEQUFBQUFyTlljTXc0bDJoYmxzV05uaDZTSkxrcWFBbFRMcG9EWk8yR3lrQ29MQVF3Z0FBQUtDZ0JIZnRESHM4bmw2N1c4SVF3cVN2YkdVWmhaQ2V6UlFCVUZnSVlRQUFBRkI0NHZIOUowUDJoREJuUjBiazluaWlocHN1TmVueWxudmtLZk5RRUtsak1HaWd3QkRDQUFBQW9PQ0VaMmIySE92cWl0aXhyT0dSRVhuOEZTYWx1anpsVFhSSkFnQkNHQUFBQUJTaVExM2RQYmEwSWhnZUdaWGJUM2VhNVdKY0dBQWdoQUVBQUVCaE9qQXhNV21lSFI1WjlvS0dSMGZsOGhIQ0xKZW56Q052aFplQ0FGRFVDR0VBQUFCUWlBNUowZ2tiWmtnYUhpR0VzVXRGU3ptRkFLQ29FY0lBQUFDZ0VIVzVEQ05peHpUVkk2Tmpjdmw4bEtnTnlwdjhNa3pHbWdWUXZBaGhBQUFBVUhDQ3UzWkdQVjVQVjZpN2Q5bkxHaDJma052SGVDYTIzSHk0WFl3TkE2QzRQd2NwQWdBQUFCU2lTQ1M2NS9qSjBMS1hNelkyTHBPV01MYXBwRXNTZ0NKR0NBTUFBSUNDRkkxR0R4dy9lWEptdWNzWm41aVFXVW9JWTVlU3FoSjV5ejBVQklDaVJBZ0RBQUNBUXJVLzFOMXJ4dVB4WlMxa1ltSkNaa2twcFdrakJ1Z0ZVS3dJWVFBQUFGQ29EczlFSXE3K3dkTnBMMkI2T3F4b05FcExHSnVWcnl4amdONGtxeUJGQUJRV1FoZ0FBQUFVcWdPU3RKd1prc2JHeDYyTFprSVllMjlDR0tBM1daTVVBVkJnbjM4VUFRQUFBQXBSY05mT1U2WnBUcDQ0dVp3UVprS1M1R1pnWHRzeFFDK0FZa1FJQXdBQWdJTGxjYnVQbmdpbFAwUFNiRXNZdWlQWnI2U3FSSjR5QnVnRlVGd0lZUUFBQUZDd3d1SHdFOGU3bGgvQ3VFb0lZVEtoWWxVWmhRQ2dxQkRDQUFBQW9HREZwSU5IVDZRZndveU9XU0dNMjhmNEpabFF2ckpNaHNFQXZRQ0tCeUVNQUFBQUN2ZGl0NlRpeE9EcFFVMVBoOU42L2Nqb21Ed2xwUkpCUVVhWVhsTytlcWIvQmxCRTV5V0tBQUFBQUFWN3NldXJQUmFQeDlYVm5kN2d2S05qWS9MNDZES1RTZVVyS2Q5Rm5LVUlnQUk3TDFFRUFBQUFLRlQrVFMvcWt3eDFoWHJTZXYzbzJEaUQ4bVo2SHpYNDVISnpXd0tnT1BCcEJ3QUFnSUpsVnF5TWxaUlg2M2pYeWJSZVB6d3lJdFBQVk1xWlpMZ00rUnNJdWdBVUIwSVlBQUFBRkxJU3cxZVhka3VZb1ROblpmanBMcE5wZEVrQ1VDd0lZUUFBQUZESXh1S2xOVHB5b2l1dEZ3OE9uWlc3b3BKU3pMRFMyaEs2SkFFb0NuelNBUUFBb0pDZE5mMTE2Z3FsTnpEdm1lRmhlUWhoTXM0d0RKWFdsbEFRQUFvZUlRd0FBQVh1cWU2ejVwNitVWk9TUUpFYU0vMTFtcHFhMHNEcG9aUmZQSFRtck54bGpBbVREZjU2eG9XWnh4UkZBQlFXUWhnQUFBcGNKQkw1STBsL1EwbWdHSFcydDBWYy90cHBTZW82R1VycHRXUGo0d3FIcCtXcHJLWWdzNEFRWmw2RU1FQ0JJWVFCQUtDQUJZLzBsY2ZqOGQrVjlORTlmYVBiS0JFVTVRVnZTY1dJNlNuUjhSUkRtTDZCUVVtU3Q3cVdRc3dDczhTVXU5VHRoRlhwWlc4QXlOZzVpU0lBQUtCd3hhVVB1a3l6U3BJaDZkdDcra2FiS1JVVW9YNXZlWjFPbkV4dFhKaFQvUU9TQ0dHeXFhVFNtOHUzSDVMMFFVbVhTSXF5TndCa0FpRU1BQUFGNnBFamZTc2xmZEJ0bXFzU1AycVE5QjNHaDBFUjZvbVYxS2JlRXFaL1FKNlNVcG1sZEpQSkZyY3ZKeTFocGlUZElXbGpaM3ZiRnpyYjI4WWxoZGdiQURMeU9VY1JBQUJRc0Q0aHlYQ1pyc1k1UDd0WjBxY2xmWVRpUVJIcGMvbHFkZlRFdnBSZTFOdlhyNUlxV3NGa2s4dHRaUHN0NzVUMEY1M3RiU2N1K0htWHBMWHNFUUMyZjg1UkJBQUFGSjVIanZSZEp1bWRobUVjbStmWEg5N1ROL3B5U2dsRnBNZmxyOVhBNEtDaTBlUjdtWnc0MlMxM2JRT2xsMFdScWF6MUFucEswb3M2Mjl2ZU9FOEFJMG1ISFZJa2NXb0ZVRmdJWVFBQUtFeWZsV1NhcGpteHdPKy90YWR2dElWaVFwSG9NLzIxaXNmakdodzZrL1NManB3NHFkSW1obEhLbHVoTVRPTjlFNWwrbXlGSjc1RjBYV2Q3MnoyTFBPOFpoeFRMTURVREtDeUVNQUFBRkpoSGp2VGRJbW03SkpsdXMzcUJwOVZKK3U2ZXZsRVBKWVlpY05KVldpVko2ay9NZUxTVVNDU2k3cDVlbFRZMFVucFpjbnIva0dLUldLWVdINVgwVDVJdTZXeHYrNWZPOXJhbG10enNZNDhBeUFUR2hBRUFvSUE4Y3FUUGtQVDV4RC9qcHVuYXNNalRiNVIwdTZ6WlFJQkNkdFR3K09ReVRaM3FIOUNWbDIxZDhnV2gzbE9LeGFJcWJhUWxURGFjUFRhaThWTVphd1d6VzlKN090dmJua3poTllRd0FES0NsakFBQUJTV3QwaTZYcElNd3podUdNWlNNeUg5K1o2KzBWZFJiQ2h3UnlYSlUxS3VvVE5uazNyQmlTNXJjaHhhd21UZTJhUERPblA0YkNZV1BTRHBYWkpla0dJQW84NzJ0dU9TenJCM0FOaU5FQVlBZ0FMeHlKRStyNnlaajZ5VHZNczFtT1JMdjdtbmIzUU5KWWhDMWRuZWRrYlNHWmVuUkNOalkwbTlabnhpUXFiYkk1ZTNoQUxNa0hnMHJvRm5UdXZNRWR1SFBZbEorbWRKV3pyYjIvNjlzNzB0M2NGdEgyVXZBYkFiM1pFQUFDZ2M3NU8wYnZZZnB0dE05dTZ4UnRMMzkvU04zbng1WTBXWVlrU0JPbXFZM3V2SEo1THI4dExjMUtob1pFYlRnMzBxcWFjMWpOMm1oNmMxOE14cHpVeEU3RjcwUTdLNkhqMXV3N0lla1hRcmV3dUFuV2dKQXdCQUFYamtTRitOcEkvTy9abHBtdXRUV01SekpkMUJTYUtBSFltYlhvMk5qeWYxNUNzdTNhS2E2bW9ON0w2SGtyTlJOQnpWNE40aDlRVDc3QTVnVHN2cWV0Um1Vd0FqT2FNbHpDUzFCaWdzaERBQUFCU0F1UFRSdU5XaVpkYWd5MlZVcExpWTkrL3BHMzBkcFlrQ2RTQnV1RFUrbnR3OXJkdnQxdHZlL0FZTlBueXZKbnRQVW5yTEZKdUo2ZXpSWVlVZTZOVm85NWdVdDNYeC95WnA4eks3SHMxbnR3T0ticHJhQXhRV1FoZ0FBUExjdzBmNjFzbnFpcVI0NG1HNFhPbmVOZjc3bnI3UjlaUXFDdENlbUZtaXFlbms3Mm5mOU5ydDJyeHBvNDUvKzZ1S1R0RWdJUjJScVlpR0RwM1Z5ZnU2ZGViSXNOMVRVRDhsNmNiTzlyWS83R3h2RzdKNzNUdmIyMDVKT3NKZUJHQW5RaGdBQVBMZnB5VjU1LzdBTkYzcDN1bFV5eG9maHRGSVVXaWVNVnh1SlRzbWpIVWNtZnJNWDM5WVpuaFNKNzd6YjRwSEk1UmlraVpQVDZuL3lVR0Y3dS9SOFBFUnhhSzJObjBaay9SQlNkZDN0cmRsdXJYS2ZleE5BSFlpaEFFQUlJODlmS1R2T1pKKzc4S2Z1OTN1cG1VczlqbVN2a0Rwb3NBY2xPR09qVStrMXFLbHVhbFJmLytwajJuaStDRjEzZmxOS1I2bkpCY1FIcHZSbWNOV3E1ZFRqL1Zydkg4aUU4WDFBMG1YZGJhM2ZhR3p2UzBicWRqOTdGa0FkaUtFQVFBZ244WDF1WGwrT20yYXJsWExYUElmNytrYmZRTUZqRUxSMmQ0Mlk3ak1nYkh4aVpSZmUvWGxsK3F6SC91SXpqN3ptTHJ1L0tiaXNSZ0ZtaEFlbTlIWm84UHFmckJYM1EvMjZ1eXhFVVdtb3BsNHEyT1NYdG5aM3ZhR3p2YTJiQTdTY3k5N0dZQ2RDR0VBQU1oVER4L3UyeTdwbG1jSGdrbDg0MndZeGxHYjN1SnJlL3BHTjFMU0tKd3JYek0wZE9aTVdpKzk4Ym10K3V6SC8xSm5uZ3JxeFBlL1hyUkJUQ3dTMDhUQXBFN3ZQNk9UOS9lbys4RmVuVGt5clBEWVRLYmVNaXhwaDZUTE85dmJmcGJ0N2Uxc2J6c3NLWlRMSXVmQUJRcUxteUlBQUNEL1BIeTR6eTNwc3hmOUlpNlpwbXZVcHJlcGxQVGZlL3BHbjM5NVk4VVVwWTY4WjdnT1RFOVBYejg5SFZaSmlUZmxsOS84L09mcXN4Ly9TMzM0RTdlclM5S2FONzVEaHF1d3Y5T014NlhwNFdsTm5wN1MxTkNVcG9lbnM5a2o2OWVTL3JpenZXMS9qb3ZoTGtsdnk5RjdqM0RnQW9XRkVBWUFnUHowRGttWHpYdHlkN3VyYkh5ZmF5UjlVZEs3S1hMa3ZWZzBLT24zQm9lR3RHcGxlc01telExaVl0RzQxdnlmdDh2MEZzNGxkV3dtcHFuaGFVMmZuZGJVMldsTmo0UVZqMlo5SEp4VGt2NjBzNzN0dXc0cGxudVV1eEFHUUlFaGhBRUFJTTg4ZkxpdlhOSW5GL3E5NlhadHNQa3RBM3Y2UnUrNXZMSGl1NVErOGxvODlyK1MvdjU0MThtMFF4anAvQ0Rtd0ZlbVZYN1ZhK1QyZStUeHUrWDJ1ZVV1TlJOL1duODNYSVlqaXlNV2lTazhPcVBwa2JEQ28yRk5qNFExTXo2VHkxV0tTdm9uU1IvcmJHOXpVZ3VRdXpoNEFOakZvQWdBQU1ndkR4L3UrNWlrVDh4N1lqZlVWVmJ1WDVPQnR4MlRkUDNsalJVSDJRUElaemUrK2kyUnQ3MSt1L21IYi8yOVpTL3IzdDBQNjBOLzgybVZycnRScGV0dlh2QjVwdGVVV1dyS25malQ5SnB5bHlUKzdqRmxlbDB5dmFZTU16T1g1dkc0RkptWVVYaHNSalBqTXdxUHppZzhGdGJNaEtPbTNINUkwcnM3Mjl1ZWRHSzkyYlpqOTJGSnVSZ2o2eDJkN1czZjRNZ0ZDZ2N0WVFBQXlDTVBIKzVya3ZTaGhYN3Zjcm42SkdVaWhDbVg5SU05ZmFNM1hONVlNY21lUUw0eS9DdENEd1FmVzJ0SENQUEN0dWZxL1lGMzZZdGYrVGVaVmF2bHFWMC83L09pNGFpaTRhakNTNjJieTdBQ0c2OUxMcmRMTGsvaTRVNDhURU9HMnlYRFpWaC9OdzBaeHJuZ0poYU5LVFlUVXl3U1UyUXlvcG1KaUdiR1p4U1pqQ3J1M0ttMVQwdjZpS1N2ZGJhM09Ybis3N3VWbXhBR1FJRWhoQUVBSUwvOGphU3loWDVwdWsxdkJ0LzdDa2xma3ZRSDdBYmtLMWZWNmwvdjNYL1BPMDZjN05iYTFhdVd2YnkzL082cmRkOURqMmh2MXdNTGhqREppc2ZpaWt4RkZDbU9ZYkRqa3I0bTZTT2Q3VzJuODJCOTcrS3pENEF0NXlHS0FBQ0EvUERRNFZOYjQ0ci9RVndMZjFuc2RwdHJNN3dhNzlyVE4vcjc3QTNrcTVLVzF2OHNxYWpUdjM3cnYyeFpubUVZZXNsTk55bzgwa3ZocHZCeEp1bUd6dmEyUDh5VEFFYXlCdWZOaFFtcUMxQllDR0VBQU1nZmQwZ3lKU2srNTc4NXpyaGNydW9zck1kWDl2U05Yc2J1UUQ0eVRNL0RudlV2aW5YZS9SdmQ5WnY3bDcyOHNmRngvY2YzZnlodjdUb0tkMmw5a3Q0dXFhMnp2ZTIzK2JUaW5lMXRweVR0eWNGYmg2azJRR0VoaEFFQUlBODhkUGpVelpKZU5kL3Zac01ZdzJXY3lOTHFsRW02YzAvZmFCbDdCdm1tczcxdHpGTy8rVEhmMnVmcXIzWjhYcDEzL3lidFpZMk5qK3NESC8ya1RnK1B5M3ZKeXlqY2hVVWtmVUhTNXM3MnRtODZmT3lYeGR6RHJnU3dYSXdKQXdDQXd6MTArSlNSdUlGWmxHbWEyWnpxNURKSlg1YjFyVGFRYng0bzNmaVM1MGd1L2RXT3orblg5KzNXTzI5N296WnZUSDUyOThlZWVrYWYvUHcvYW1Cb1JMNnIzeUpYU1FXbE9yOU9TZS92YkcvYlh3RGJjcGVrUDJhWEFsZ09RaGdBQUp6dlRaS2VzOVNUUEI1elJaYlg2MjE3K2tidnVieXg0aHZzSXVTWkJ5Uzl2M1RqaStTdVhhL2RUOTJsWDkvM2ZsMnljWU5lY01OemRNVmxXN1J1ZFlzYUcrcmw5VnBqWGNkaU1ZVjZldlhRbzQvclYvZmNweWVmMmF2U3V2WHlYLzk2dVVvcktkR0w3WlAwb2M3MnRwMEZ0RTMzeWhwUTJHRDNBa2dYSHlBQUFEallRNGRQZVNYdGw3VFV0Q3ZoaW9veWJ3NVdjVUxTOHk1dnJIaWF2WVY4c1czSDdwV1NldWIrTEhMbXVNSjllNldSRTVvZU8vUHN6ejFlcjl5bVcxTlRrNHJINDNLNVRIbnJOc2pkZkwwOGRSc296SXYxUy9xNHBIL3JiRytMRkdEZGVWelNOVmw4eTlkMXRyZjltR29GRkE1YXdnQUE0R3p2MWRJQmpBekRPQ1pwU3c3V3p5OXJmSmpuWE41WU1jYnVRajdvYkcvcjNiWmo5MUZKejZZbzdwcDFjdGVza3lUNUlsT0tUcHhSZkhwVThjaVU0ckdvL0taSExuK3R6TElHR2FhSFFyellwS3h1azUvdGJHOHI1TStDKzVUZEVDWksxUUlLQ3lFTUFBQU85ZERoVTlXUy9pcVo1NXFtYXppSHE3cEYwbGNrTVhVMTh1MW1ldDZtTElhN1ZPN0tsWkpXVWtwTG01SDA3NUwrdHJPOXJic1lQcG9sdlMrTDd6ZEtGUU1LQ3lFTUFBRE85VmVTYXBJNm9idmR1UjRWOUxiRStERC94bTVEbnJoSDB0c29oclJOU1BxNnBEczYyOXU2aW1pN0gyTFhBMWdPcHFnR0FNQ0pWL21IVDYyVjFSVXBLVzYzNllUQktiNjBwMi8wR3ZZZThzUXVpaUF0QnlYOXVhVFZuZTF0N3kyeUFFYWQ3VzFIWlkxN0F3QnBJWVFCQU1DWlBpMnBKTW5uaGd6REtISEFPcGZLR2grR3VYcVJEemZUSVVtSEtJbWtSQ1RkS2VsV1NWczcyOXYrcnJPOWJhaUl5NFBXTUFEU1JuY2tBQUNjZG5WLytOVDFrbjR2MmVlYnB1dVVwQmFIclA0bVNmOHE2YzNzU2VTQlgwdTZoR0pZVUpla3IwcjZXbWQ3MnltSzQ5ekh0S1JYVXd3QTBrRUlBd0NBdzhTbE95UVptdjNmVWlkenQ5dDAyQ2E4S1RFK3pGZlltM0M0WFpJQ0ZNTjVwaVQ5U05KL1NPcnNiRytMVVNRWGVaQWlBSkF1UWhnQUFKeDBaWC80MUNzbHZYajIzL0U1djFzb2tIRzd6VFVPM0pSLzJOTTNHcnk4c2VKUjlpb2M3SjdFWVdaUUZCcVExQzdwenM3MnRtR0tZMUcvbFJSVGRvWjJHS2U0Z2NMQ21EQUFBRGpFZzRkUG1aSSt1OUR2NDNNZWM0eTRYSzQ2QjI2T1Y5TDM5L1NOVnJGbjRWU2Q3VzJEa3A2a0pDUko3K3hzYi9zM0FwaWs2czJZcEtlejlIWXpsRGhRV0FoaEFBQndqbmRJdWp5Wko4NkdNWWJMT083Zzdka2c2V3ZzVmpqY0x5Z0NEVXY2SmNXUUVyb2tBVWdMSVF3QUFFNjRtajk4cWt6U0oxTjluV21hMHc3ZnROZnY2UnQ5SDNzWUR2Wnppa0EvN1d4dm84VkZhaDZtQ0FDa2d4QUdBQUFuaU92UEpLMU05V1VldDdzK0Q3YnVDM3Y2Um05Z0o4T2hkc3RxQ1ZMTXZrODFTQmt0WVFDa2hSQUdBSUJjWDhrZk90VW82Y01MRGZxeWlLaHBtdXZ5WUJNOWtyNjNwMiswaHIwTnArbHNiNHZJbWlXcFdJMUk2cVFtcE95Z3BLRXN2QTlqOUFBRmhoQUdBSURjK3h0SlplZjlKSWxBeGpDTUk0YVJON082ckpQMDczdjZScG1GQms1VXpPUEMvTHl6dlcyYUtwQ2F6dmEydUtSSHN2QldjVW9iS0N5RU1BQUE1TkNEaDA1dGxmU0hTMTZDenhQSW1LWXIzNzRoZmEya1AyV3Z3NEdLT1lTNWs5MmYva2M0UlFBZ1ZZUXdBQURrMW1ja21Vay9lMDRnNHpiZC9qemMzcy91N1J0OVByc2RUdExaM2haUzlxWWNkcElKU1QrakJxVHRJWW9BUUtvSVlRQUF5SkVIRDUyNlNkSnIwbjI5eDJOdXlLZnROYXlIVzlMMzl2YU4xbElENEREUEZPRTI3K3BzYjV0azE2ZnRZV1crdTlBNHhRd1VGa0lZQUFCeVlQZWhVMFpjK254cTQvQ2U1NVJoR0w1ODJOWkUrRExYYWtuZjNNdjRNSENXN2lMYzVwM3M5dlIxdHJjTlM5cWY0YmRoNm5DZ3dCRENBQUNRRy85SDByUFROcWM2TVpKcHVoeC93emhQK0RMWGRra2ZvaHJBUVFhS2NKdnBpclI4dXlrQ0FLa2doQUVBSU50WDdJZE9lU1hkdnREdmt3bGszRzdUa2ExSURDMFp2c3oxNmIxOW95K2dSc0FoZW90c2U1L29iRy9yWnJjdjJ5TVVBWUJVRU1JQUFKQjk3NUdVMUhndUN3VXlicmU3eFVrYmxFTHdNdmRGcGd4OWQyLy9hRDFWQWc3UVgyVGJ1NHRkYm90TWh6QlRGREZRV0FoaEFBRElvdDJIVGxWTCt1dDBYanNua0JrM1RkY0tKMnhQbXVITDNCZXRrdlN0dmYyTUQ0T2M2eW15N2Uxa2w5dmlHV1V3S09sc2J5T0VBUW9NSVF3QUFOblZMbWxaTXdPNVhNYlJYRytFRGVITFhDK1Q5RkdxQm5Lc21GckNURXU2bjEyK2ZKM3RiUkZKajFNU0FKSytqcU1JQUFESWp0MkhUcTJWOUw3bExzYzB6Wng4TTVyaWVDOHB2c2o0eEw3K3NSZFNTNUJEQTVKaVJiS3REek0xdGExK1N4RUFTQlloREFBQTJmTXBTYVhMWFlqSGJkWmtjNlZ0YnZWeTBaT3MvK1NTOUoxOS9XTXJxQ2JJaGM3MnRwaUtaNFlrV3NIWTYrRU1MVGRLMFFLRmh4QUdBSUFzMkgzbzFIV1Nick5oVVRHMzI5eVFqWFhPZlBoeTBWTlhTdnIydnY0eGt4cURIRGxWSk50NUg3dmFWbzltYUxsakZDMVFlQWhoQUFESWpzOHBqVXpqUW9aaEhEY01JMlBuNzdTNkhFbEpoeS9HL09ITFhMK2pOQWN1Qm14UURDRk1UTkp1ZHJXdERrZ2FvUmdBSklNUUJnQ0FETnQ5Nk5UTEpiM1lqbVdacHV0MEp0WnhXY0ZMQ3VGTGt2NTZYLy9ZUzZnNXlJRytJdGpHL1ozdGJRUUdOdXBzYjR1TGNXRUFKSWtRQmdDQURIcmdVSzlMMGgxMkxjL2pOa3Z0WEw4c2pmZVN6dlhKZis3ckgydWlCaUhMaXFFbHpLUHM1b3dJWm1DWjR4UXJVSGdJWVFBQXlLeDN4QlcvSWk3cnYrVnl1OTIyakFlVGcvRmVVdFVvNmI4WUh3WlpWZ3d0WVdpeGtUL2xPa094QW9XSEVBWUFnQXg1NEZDdlg5SW41LzRzUHVlL05BeTZYRVpadXV1VDRTbW1reG52SlZVdmt2UUphaEt5cUxjSXR2RXhkbk5HUEVJUkFFZ0dJUXdBQUpuelo1S2FGL3BscW9HTTZYSjFwYk1TbVd2MVlqMHh6UzVIeVdyZjN6KzJqYXFFTE9rdmdtMThodDFzdjg3MnRxNE0xQi9HN2dFS0VDRU1BQUFaOE1DaDNoV1NQcHpzODVNSlpOeHVNNlhtTXc0ZDd5WFZWVEVrZlh0Ly8xZ3p0UXBaVU9ndFlmbzYyOXZPc3Bzenh1NHVTVEdLRkNnOGhEQUFBR1RHeHlXVnAvUENoUUladDhkY21jenJjenpGOUxJczBQdXBRZEozOS9lUHVhbFd5TEJDYndtemwxMmNVWFozU1lwVHBFRGhJWVFCQU1CbUR4enEzU0lwWU04VitMUC9UYmxOYzhIV0lOa2E3eVZUa2xpTm15UjlpdHFGVE9wc2J4dFVZUStHdW8rOW5GRjJ0NFFacGtpQndrTUlBd0NBL1Q0anlkWlpmVnlHY1dTK254ZElsNk5rZlhoLy85akxxVjdJc0lFQzNyYWo3TjZNWW5CZUFFdGYwMUVFQUFEWTU0R0R2UzlRWEsrMWU3bW0yeHlmKys4OG1HSjZ5ZFZJYy9uZjJqOHcxa0pOUXdiMUZQQzJkYkY3TTZlenZXM0E1aktPWkh5bHQzL0kxUFlQWGE3dEg3cEYyei9VeUY0RU1vKysxUUFBMk9TQmc3MkdwTTlMT3I4bnZ3MXBodGZ0cms1N1VVblBjcFJaaGowdnJwUDAvZjBEWXkvYzJsQStRNjFEQmhSeVN4aENtTXg3UXRJYW01WTFscEUxM1A0aFE5S3RrbTZUOURwSmxjKyszL1lQTldubkhlUHNSaUJ6Q0dFQUFMRFBHeVE5OTZLZkxqK1FpWHZjNW9hVXgzdEo4b2w1RXI3TTlYeEp0MHY2SUZVT0dYQ3lnTGZ0QkxzMzR3NDdkczIyZjZoYzBsc2x2VS9TMW5tZVVTNnBYaEloREpCQmhEQUFBTmpnZ1lPOTNrUXdzTGcwQWhuRE1FNFlockV1dVNjbi82UThERi9tK3ZNREEyUDNibWtvL3ltMUR6YnJMdER0Q2t2cVkvZG0zRUVibHpWaHkxSzJmNmhPMG50bGhTOTFpenh6Um9YZEhROXdCRUlZQUFEczhXNUpHMU42UlpLQmpPbHlEVWhhdCtpeUhCSytHQmxld0FXLy91YUJnYkZydHpTVTgrMCs3RlNvSVV4UFozc2JVeDVubnAwaHpQSmFwR3ovVUwyc0ZvUHZsVlNXeEN0MmFlY2RkUE1FTW93UUJnQ0FaYnIvWUc5MVhQcllBa0ZCY2hZSlpEd2VkOG1Dcnl1czhWNVNmVXFOcERzUERJeTlZRXREZVppYUNKdUUyQzRzZzUzZGtkSUxZYlovcUZyU1I1UjgrRExyNit3K0lQTUlZUUFBV0w2UGFFNFQ3d3UvYWs0NW9MZ2drUEc0emJYcExiQmd3NWU1V2lYZElla0RWRVBZcEZBSHJ5V0V5VjQ1VDBrcXRXRlpaMU42dGhXK2ZDRHhxRXJ4dmZaSitnRzdEOGc4cHFnR0FHQVo3ai9ZdTFyUyt4ZDdUbnpPSTJWeERaa3VsM1V4bmRJVTAwYkd1eDBaR1hweEdsTll2Ly9Bd05qcnFJMnc4U2E2RURFelVoWWt1bnpaMVJvbXVURmh0bitvWE5zLzlERkp4eVY5WEtrSE1KTDBaOXA1UjR3OUNHUWVJUXdBQU12emFhWHdqV2VxZ1l6cGNuV2xGcjVrYnN5WE5NS1IrUmVRM3ErWDh1OEhCc1kyVUIxaHcwMzBxS1NSQXR3MFdzSmtqMTBoek9KVFZHLy9rRS9iUC9RUldlSExKNVJlK0NKSlg5Zk9PMzZ4NkFhZG52UWNQajFwc0d1QjVhTTdFZ0FBYWJyL1lPODFrbjQvM2Rjbk15NnYyMk5HRmw5S1VYUTVTa2ExcERzUERJeTNiV2tvbTZaMllwbDZKRlVXMkRZUndtU1BYU0hNNlhsL3V2MURQa2tCU1IrVzFMVE05OWd2NlUvbTNZalRreHNsdlZ6U05ra3JKZDBvYTVZdEFNdEFDQU1BUVBvK2IxZUdzRkFnNC9XNEcrZC9CZUhMUEV1N1R0SVhaQTFHQ1N4SGw2U3RCYlpOaEREWmM4eW01Wndmd3RnYnZraFdTNXZYYStjZFk1SjBlSEN5VE5LTEpMMU0wc3NVMThZNUg5UTNiNnJ6RWNBQU5pQ0VBUUFnRGZjZjdIMlpwSmRrWXRsekFwbXcyMjJ1UHZmUHpFOHh2ZXpsR3hsY2RoSkxOS1EvUGpnd2ZzL21ockwvcHBaaUdRb3hzRGpPYnMwYXU4YmZHWkFrYmY5UWphUjN5eHB3ZDRWTnk0NUplc3ZoYjN6Q0xYM2lnN0phdkx4QWt2ZWlFNUtoZjkxVTU3dVAzUXJZZ3hBR0FJQVUzWCt3MXlWclJwNk1NZ3pqcUtTdHRIcFplb2tYTFA5ckJ3ZkduOXpjVUhhSTJvbzBIUyt3N1JucGJHOGJZTGZtVi8zWmQvVEpPbTMvMEQ5SmVydFNtMnA2UVZWbFB0MTQrVWE5NitWdGoxeTFmbFZIWEdwZTR2TzVUM0Y5bUYwSzJJY1FCZ0NBMUwxZDBwV1pmaE9QMnh6SmRQeVNoMTJPa2xsK3BhUTdEdzZNUDI5elE5a1UxUlZwT0ZaZzIzT1VYWnBWSit4WVNLanZ4RjNMWFlicGN1bUs5YzI2K2NwTnV2bktTM1RWaGxWeUdZWWtQVy8yT2ZIRlA2cy9zS25lZDRaZEN0aUhFQVlBZ0JUY2Y3RFhKK2x2cy9GZVhvODdZd09ENW5QNGt1U3lyNWIwUlZsTitJRlVIUyt3N1RuTUxzMmV6dmEyMFcwN2RwK1JWSlB1TXFiRFU0ckgwNXN4ZWtWMWhWNXd4U2JkZk9VbXZlQ0tqYW9xOHkzNW1nV0NtRjlzcXZkOWx6MEsySXNRQmdDQUZNU2xQek9rNW15OGw4Zmp0blhLWlNQREM4aHlsNk5rQkJManczQVRnVlFkTDdEdElZVEpUUjFLTzRTWm5CNVAvbHpoTnZXY1M5Ym9waXMzNmFZckw5SFcxWTNwbnQvbWZzNU9Tdm9qZGlOZ1AwSVlBQUNTZE4vQjNnWkpIMDVtYXVubE1nempwTXN3VnR1eXJBeS8ySUhoeTF6L2VuQmcvSW5ORFdYN3FjRklRWStrR1VtZUF0a2VRcGpzNjVKMGJib3ZucHlhV1BUM3F4dHFkUE5WbCtqbUt6ZnErWmR1a0svRWE4dEt6d2xpUHJhcDNuZWMzUWpZanhBR0FJRGtmVnhTeFlVWHJEYUZCZWN4VFZlZnBHV0ZNQVU2M2t1cWl5MlhkT2ZCd2ZFYk50ZVhUVktGa1l6TzlyYll0aDI3dXlSdExKQk5Jb1RKdnVQTGVmSG94TWg1Ly9hVmVQVzhTOWZwcGlzMjZlYXJObW5OaXRvTWZSWkxjZWx4dytyT0NTQURDR0VBQUVqQ2ZRZDdOMHNLTEhIaGF0dEZzZGZ0VHZzY1hRVGp2YVM2MkNza2ZVblNIMUNUa2VKTk5DRU0wcldzYWFwSHhzNXF5K3BHdmVDS2pYcmhWWmZvK2t2V3lPTTJGenozR0VzTnI1dThtS1RBcG5wZmhGMElaQVloREFBQXliazlsZlBtY2dNWnI4ZTlKcFhuRitGNEx5bXRxQ0c5NjlEZytEMlgxSmQ5bTZxTUpCMHZrTzBZN214djYyWjNPci8rK0V0TWJWMVZvYTB0NWZyWUc5K3FGZFVWU2IvV3hpRG1TNWZVKzRMc1BpQnpDR0VBQUZqQ2ZRZDdiNVQwdSttK1BvMUFadGcwWGJYSlBKRXVSNHN2NUlKZmRSd2FISC84a3ZxeVBkUnFKT0ZJZ1d6SFUrektuRmh5bW1xWFlXaE5nMCtYcmE3VXBhc3J0SzZoVE1ZeVBoUnRDR0pPU3ZwcmRoMlFXWVF3QUFBczRyNkR2WWFrejltMXZHUUNHZFBsT2lIcHFzV1dRL2lpeFZxOUxNUXY2ZnVIQnNkdnVLUytiSnphalNVY0xKRHQyTXV1eklsNVE1Z3F2MGRiV3lwMDJlcEtiVzJwVUZtSmFldWJMak9JZWU4bDliNVJkaDJRV1lRd0FBQXM3dldTbnArSkJTOFV5SGpjNXZSQ3I4bGsrRklBWFk2U2NabWtMMHQ2TzFVYlN5aVVjVlFJWVhLZ3M3MXRjTnVPM2VPbXl5amIyRlNtUzF1czFpNnJhbjBYblFjeU1MQnVPa0hNRHkrcDkvMkVQUWRrSGlFTUFBQUx1TzlncjFmV1dEQVpOemVROFhqZEsrYitqdkZlRmw5UUdzdC9XMko4bUc5UXk3R0lRZ2xobm1GWFp0ZUJnWWtOa2w1K29IczB1cjZ4VEY2M2E5RVAvN2lSOHlCbVZOTDcySE5BZHJnb0FnQUFGaFNRdENuTDd4bnhtTzYxU2x3NnAzMWhiaXk5Z0dVdFA0azN0R1g1aTJ6SE1wZi9MNGNHeDYra2ltTWhuZTF0NDVKQ0JiQXBqSUdVWVFjR0pzb09ERXhzUHpBdzhhVURBeE9IWlkwbjlFOWJWbFZVTGhyQXpJcWZIOFRiSlQ3bi8wdjR5Q1gxdmg3MkpKQWR0SVFCQUdBZTl4M29yVkpjSDg5QU01RkZHWVp4MUdWb2Mvb0xzT1VweTNyREhJMzNrcXBTU1hjZUdoeC96aVgxWldQVWVDemdzS1NXUEY3L25zNzJ0ajUyby8zMkQweGNaVWpiSkwxYzBnc2tlWmUxd055MWlIbEkwbGZZbzBEMkVNSUFBREMvajBpcVcvWmMweW55dU0yemFiMlFMa2ZwMkpLNCtmaDlxanNXY0VqU0xYbTgvbyt5QysyeGYyQ2lSdEx2U0hxWnBKZEthclo5UEpmc0J6RVJTZi92a25wZmpEME1aQThoREFBQUYvak5nWjZXdU9JZk1DNjhZTTFDSUZQaWNaY24vZVNzdDNxNWVJbFpubUk2RTF0ejIrSEI4ZDlzcWkvN0tqVWY4OTE3NS9uNi81WmRtT2FPSDVnd0pUMUhWdWp5TWtrM2FKNmhIUEk4aVBuOEpmVytwOW5iUUhZUndnQUFjTEZQU1NxTnowbGRGZzFrYkV3THZHNzNobVNTQXh1ZWtvTHNkam15Zi8yWFhQNC9IaDRjZjJSVGZka1RWSDFjSU45bkZxSWxUQXIyRDB3MHkrcGk5REpaclY1cWszbGRuZ1l4UnlWOWtyME9aQjhoREFBQWMvem1RTS9Wa3Q1NjhjWHJJb0hNN05YdE1oTUV3MUNQeTJVMEo1c2NwUG1VVk5Zb004dk9icGVqWkpaZkl1bk93NFBqMTIycUx4dmxLTUFjK1Q2ejBPUHN3b1h0SDVqd3loclA1YVd5Z3BlcjBsMVdIZ1l4Z1V2cWZaUFVBaUQ3bUIwSkFJRHpmVzZwYStuNG5QOFd2TXFkZmFUQWRKbTlDNllIU2N4eVpQOU1SMG05ZmJxTHRYLzVxYjN0aFRaSitsZXFQK2JxYkc4TFNSck8wOVUvMmRuZXhvdzNGOWczTUxGaDM4REVIKzhibVBpSnBDRkpkMG42a0pZUndNejk2TGRWNW1aTit2WWw5YjVkMUFZZ04yZ0pBd0JBd204TzlHeVQxUVE5aFl0WisxckllRDJta2V4emszeEtpZ3B1dkpkVXZlbnc0UGg5bStyTHZzelJnRG1lbHRWYUl0ODh5SzZUOWcxTWxFbDZrYXpXTGkrWHRISHV4M05tV3ByWXUwQ2JXOFFNU2ZvemFnYVFPNFF3QUFCSStzMkJIcGVzVmpETHVGWmVYaUJUNG5HdllieVhqTDF0c3Y3dThPREVRNXZxL1l5bGdWbDdsSjhoekFQRnVzUDI5WTlmSmNOSWF2cm9JZ3hpUHJpNTNqL0FZUTNrRGlFTUFBQ1d0OHFHNXVqbnJwbFREbVRHM0c2elBzTUJ3NEpMSytEeFhsSmRpbGZTOXcrZm5yaHVVNTEvbU1NQ3l0OXhZUjRxbGgyMHIzLzhvdW1qRlk5TFJuS2ZERVVVeE53ajZSc2Mwa0J1RWNJQUFJcmVidzcwK0dUTmlKUVJ5UVF5THBmcm1LUXJNeE11TEx4RXdoZGp2cjl1a1BRMVNXL2c2SUNrTTNtNHp1T1NIaXZVSGJLM2Y5eGxTSzFhWXZwb2dwanpURXNLYks3M3h6bWtnZHdpaEFFQVFQcFRTYXV5OFVZTEJUSmVqemxsYjdpdytOS0tjTHlYaFpjdy8yREJyejl5ZXVJREcrdjhYK1R3S0hxZVBGem4renZiMnlLRnRCUDI5byt2bE5YSzVhV1N0c1dsMnFRK0J3aGladTNZWE84L3lPRU01QjRoREFDZ3FQM21RRStEcEEvbjRyM25CaklsWG5lZFBlSENBa0hEd25tREhZdTFkL2taWGZiQzRjczh5Ny9qeU9tSjNSdnIvSTl3cENEUDNKUHZHN0MzZjl3cjZVYWQ2MkowOWNXZm9VbCtMaERFN0pQMEdRNEx3QmtJWVFBQXhlNWpraXB6dkE0eHI5dGNaKzhVMDR1R0MzWXMxdjdsSzFQTE4xTDU1MXdlU2Q4N2Nucml1bzExL2pNY0trWEx6TU4xdmljZkMzcHYvL2dHbmV0aTlDSko1VXU5aGlBbUtmOXZjNzAvektFTU9BTWhETkwybnEvODZvb0RKL29QM25YN2JYeW9BOGhMOXg3b3VTUXV2ZHZJOFhvWWhuSFVNSXhOTml3cDJYQmhPWXUxZi9uSzFQS1g3SEtVakhXUy92M0k2WW5mM1ZqSFdBcEY2dm84Vzk5UlNiL05oeFhkMnovdWwvUmlTYk16R2FYMU9VZ1FzNmgvM1Z6dnY1L0RHSEFPUWhpazdaSzFLN2JmZE4ybVR6Ly82dDJubmpyWXZYdDhNdnlvcEtja1BYWFg3YmVGS0NFQWVlQjJTZTU0Rm9PRitYamM1akphV1REZXk2SkxNR3haOW1zbC9ibWt6M1BJRktXWDVkbjYzdVhrOFdEMjlJOWZLZW1saGxXdU4ybVI2YU5UUVJBenJ6NUpIK0lRQnB6Rm9BaXdIUCs4YTg5L1hidTE1UzB6a2FqMkhqMmx4L2FmMU5IUWFjWGo4Yk9Tbmt3OG5wWVZ6anh6MSsyM1RWQnFBSnpnM2dNOWJaSWVjTUpKc3NKZityUy8xSHZsY2svaG1ReGY4bWlLNlhrWGFNUHlJNUp1M2xqbmY1Q2pwM2hzMjdIN1JrbjUxb3JnUFozdGJmL2lsSlhaWTAwZmZhdXNsaTdiTkdjUTlFeDhyaVM5VE1Pd2Y1bTV2QW1iUDRoNXkrWjYvM2M1a2dGbklZVEJzbjM5dm9PUGJWM2ZlTzNzdjRmSEp2WDQvcEFlUHhEUzZiUGpjNThhbDNSWWlkWXlpY2VUa283ZmRmdHROUEVHa0ZYM0h1aDVRRktiRTA2WTlkWGw0NmJMVlpiT210RGxLTzN4WHRKeFV0STFHK3Y4UXh4QnhXSGJqdDNma1BTMlBGdnRqWjN0YlVkejllWjcrc2Rkc3FhUGZxbXMxaTdQMVh6VFIyZndNNFlnUnBMMDg4MzEvbGR3RkFQT1F3aURaZnYwajRMZVRhc2JUcTVwcWxseDRlOU85QTdwOGYwaFBYMjRSOVBoQlZ2R2pzbHFMVE8zMWN4VGQ5MSsyd2lsQ3lBVDdqM1E4M3BKLysyUWsyZGZZMjFsWTZydlNwY2pXOFo3U2NmL1Nub1Y0OE1Vdm0wN2RxK1I5ZVZSUGsxUmZhU3p2VzFUdHQ5MHp3WFRSMHVxemZVTlNaRUhNUk9TTHQ5Yzd6L09rUXc0RHlFTWJQR1ovM20wOGZLTlRjZnFxOHQ5OC8xK251NUt5U3oyaEt4ZzVpbWRDMmtPMzNYN2JWRktIRUM2N2ozUTQ1RzBSOUlsVGppWnVrM3pzYnFxc3V1U1hUTGhTMGE3SENYN3puKzVvYzdQZEs4RmJ0dU8zZjhpNmQxNXR0cGY2bXh2KzVOTXY4bWVKS2FQZHNKTlNSRUhNWCt4cGQ3UEdGYUFReEhDd0RaMy9PU3g1MTEzYWNzRFpiNFMxMkxQR3g2YjFCTUh1dlg0L3BNYVBMKzdVakltSmUzVnVWWXpUOHBxTlhPYVBRQWdHZmNlNkhtdnBDODU1Y1JhVnVwOXROeGZldjFpUzZITDBRVkxNWEsrL2xGSnQyeW9ZOGFSUXJWdHgrNHRrcDVSL2sxaTBkYlozcGFSY1l1ZTZUdC8rbWpEV0hyNmFDZmNtQlJoRVBPNHBCdTJOUGdqSE1tQU14SEN3RmFmMy9uNFcyKzRZdTAzUFc0enFlZDNuVHFqeC9lZjFOT0hlalFWWHRhNW9rZm54cG1aRFdmMjMzWDdiVFBzRlFDejdqM1FVeW5waUtSNnA1eGtheXZMVG5uY1p0TjhyeUI4eVZtWG8yU1czeTNwbWcxMS9rR09yTUt6YmNmdW4wcmFubWVyZmJpenZjMjJGbjdQOUMwOWZiUmhPUEZ6WXhuTHpQOGdKaWJwZVZzYS9FR09Zc0M1Q0dGZ3UzLzg1Vk9mYTcxODdRZFRlVTBrR3RQZW83MTZiRjlJUjBLRHlYWlhXc3FNcEgwNmZ5RGdwKzY2L2JaZTloSlFuTzQ5MFBOcFNlME9PdUZPTk5aVytobnZaWkVsWkRsOFNYSFp2NVQwaWcxMS9oaEhWK0hZdG1QM2F5VDlPQTlYL1gyZDdXMy90SndGUE5OblRSK3RGS2FQSm9oeDFMYi93NVlHL3djNGlnRm5JNFJCUm5UY3ZlK1hWMTNTdkMyZDE0Nk1UMW16SzZYWFhTa1pnN29nbUpHMDU2N2JiNXRpendHRjY5NERQUzJTRGtrcWRjckoxM1M1OXRSWFYxeHU2MGs1UitGTEFYWTVTdFpmYjZqemY0b2pyREJzMjdHN1FsYTM1NVk4Vy9YVGt0WjB0cmROcFBLaVovb1duajQ2cGVPSElNWUoyMzVTMHVWYkd2eWpITW1Bc3hIQ0lHTys5ZURoUTV0V055eHJoSDRidXlzdEpacTRPWnVkTnZ0cFdhMW1UckFuZ2NKdzc0R2VyMHQ2dTVQV3FkVHJDZGFVKzFzemVVWm52SmVNcjM5TTBvczMxUG52NVNqTGY5dDI3TzZROVAveWNOVS8zTm5lZHNkU1QzcTZ6NW8rMmtoeSt1aVVqaVdDbUZ4disydTJOUGgvd2xFTU9COGhERExtMHo4S2xtOWQxeGhxYnFpcVd1NnlNdFJkS1JuRG1qTUFjT0x2VDk5MSsyMWo3R0VnZjl4N29PY3FTVTg0N2J4WFUrNC9WT3IxTEc4TUI4WjdjY0lGVUsrczhXSDZPZHJ5MTdZZHUxOHU2V2Q1dU9vaFNaczcyOXNtNS92bDAzMWpGMHdmYmRSbUxEZ2dpTW5WdHY5d1M0UC85UnpGUUg0Z2hFRkczZjdqMzE1eTllWlZlMm9xL1I2N2xqbmJYZW1KQXlFTm5NbEpGaEtYZEV6bldzM01kbWs2ZXRmdHR6RXVBT0JBOXh6bythV2tiUTQ3NmNXYmFpcGpobUdZS2IrUzhWNmNkZEZqTGZndVEzcnArbHAvbENNdS8yemJzYnMrY1M1Zm1ZZXIvNDdPOXJadnpQN2o2YjZ4SkthUE5qSVhIQkRFWkhzOVJ5VnQzZExnNytGSUJ2SURJUXd5N282ZlB2YXkxc3ZXL0t5MHhHTjdmUXYxbmRWaiswL3FxVU05bXByTytVUkk0NUwyNlB4V00wL2VkZnR0WjZrRlFPN2NzNy9uVmttL3luWTNsNld2NjQxalRUV1Y2KzA2YXpQZVN3N0t4cmhvK1o5WVgrdi9HNDY2L0xKdHgyNUQwdi9LR2hjbDMreVc5SUl2dk91cTlab3pmYlNVelBUUkJERUZFc1Q4OFpZRy96OXpKQVA1Z3hBR1dmSDNQMy95VDFzdlgvdDNwaXN6VlM0U2pXbmYwVk42YlA5SkhUazVxRmoydWlzbDQ2UXVIZ2o0NEYyMzN4YWhaZ0NaZGMvK0hwZWt4M1RoTjhFT0NHUzhibmV3cnJJc3VmRmdDcUhMVVE3S1BZdmh5NnlZcEczcmEvMTNjZlRsajIwN2R2KzVwTS9uMHpwNzNTNWQwbHdlZTkzem03OVhVKzV0MVR6VFI2ZFNtUWxpN04yZ0xLN25nNUplc0tXQkdkcUFmRUlJZzZ6NXAxODk4L1hyTDEzOTlreS96K2o0bEI0LzBLM0g5NS9NVlhlbFpFekxtajc3U1owL0VERGpDUUEydW1kL3oxc2xmWE1aT1VIR1ZQcExueW9yTGJrcW5iTTBYWTV5Y0hGakpMM3NQa25YcksvMW4rSUlkTDV0TzNiZktPa2VTVzZucit2S21sSnRhYW5RMXBZS2JXZ3FrMzFmYkJIRTVHa1FFNUYwM1pZRy85TWN5VUIrSVlSQlZ2MzdidzQ4ZE9tR3B1ZG02LzBjMWwwcEdYMjZ1TlhNM3J0dXZ5MU03UUZTYzgvK0hwK2tnMHBscXRrc0JqSU5WUldqYnROVmtjcVpPWi9EbHdKczliS1kzMGg2TWVQRE9OdTJIYnViWkxXVWMrUTRNTDRTVTV1Ynk3VzFwVktiVzhwVk5XZDRQU05ERlowZ3h0NE55dkI2M3I2bHdkL09rUXprSDBJWVpOV25meFIwYjFoVmYySmRjMjF6TnQvWDRkMlZsbHg5U2Z0MWJwYW0yVll6SVdvVXNMQjc5dmQ4Uk5MdGRwMGhiVDVobmw1WlcxV1h6QnN3eFhTT0xtU001U3pma0tSUHI2LzEvUlZIb2pOdDI3SGJLMm1YcEpzY2MxRnVTS3ZyL2RxeXFrSmJWMWRvVFlOLzBmdDlncGdjTGpQM1Fjd1JTVmR1YWZCUGNqUUQrWWNRQmxuMzZSOEY2Ni9ZdVBMRWl0b0tmeTdlZjNSOFNrOGM2TmJqQjBMcUh4ck41NkljMHNYVFp6OXoxKzIzVFZETFVPenUyZDlUTCttd3BLcE1uQzJYZS9KMG02N0hHNm9xcmwxc1lZejNrcU1MbU9XSEw3UGlrbDYydnRiWHlSSHBQTnQyN1A2YXBIZm1lajBxL1I1dFdWV3VMYXNxdEhsVmhmd2xaa3FWbkNBbWg4dk1iUkR6TzFzYi9MczRrb0g4UkFpRG5QanNUeDY5OXJxdHE0UGw1MTF0WkwvaWgvclA2ckY5SVQxMXFGdVQrZEZkYVNteHhJM24zRll6VDBvNmZ0ZnR0OFdwZVNnVzkrenYrVWRKNzh2R21UT2RFMmxaYWNtamxXV2wxK2ZpeE14NEx3c3YxTEIvclFZa1hidSsxdGZOVWVrYzIzYnMvbE5KZjVlTDl6WmRodFkzbG1sTFM0VzJyS3BRYzIzcHNpczhRVXdPbDVtYklPWmJXeHY4YitWSUJ2SVhJUXh5NW5NN0gzL0xEWmV2L1Mrdng4eDVwWTlHWTlwM3JFK1A3VCtwUTEwRCtkWmRLUm1qU25SajBybFdNMC9kZGZ0dEk5UkVGSnA3OXZkc2tyUlhraWZiSHlySm5sVHJLc3RDWG8rN0pac25aTVo3V1hqQlJtYlg2Z0ZEdW1WZHJZOFo4UnhnMjQ3ZEw1ZTBVNUlyVys5WlYrRjlOblRadUxKY3BSNlg3VldOSUNhSHk4eHVFRE1rYWV2V0J2OEFSek9RdndoaGtGUC84SXVuUHRWNitacVBHb2JobUVvL09qbXRKL2FIOU5qK3ZPK3VsSXpqdW5nZzRNTjMzWDRiZzBraWI5Mnp2K2UvSmIzZUNXZlZCVDV2cHB2cXFrb01NZDVMemk1U3NoTyt6SDNtWjlmVitqN0MwWmxiMjNic3ZsVFNRNUlxTS9rK0hyZExtMWFXVzkyTVdpcFVYMW15L0xwTkVKT1R6d3NIQmpIdjJOcmcvd1pITTVEZkNHR1FjMS81OWQ2ZlhyMTUxWFpIVlBnTG50Q2Q2SzcwNU1HQzZhNlVqRWxKZTNRdWxIbFMwdE4zM1g3YmFXb3JuTzZlL1QzUGw3VGJpV2ZZMlgrNlhNYStwcHJLUzUxOWNpL2NMa2ZwTDk5WTdyTmVzYTdXOTNPTzB0ell0bU4zZzZ3QVprTW1sdDlVVTZvdHF5cTBwYVZDNnh2TDVEWU4rK3M1UVV4T1Bqc2NGTVRjTGVrbFd4djhkQzhIOGh3aERCemhtdzhjMnJ0NTdZcmMzNVFzY0pFZWpjYTE5OWdwUGJhdllMc3JKYU5iNTdvMHpZNDNzLyt1MjIrYm9RYkRLZTdaMzNPL3BCdWRmTGIxZVQyUDFGYjRiM0RtU1QxMzRZc3pXNzBrLzhva25uVmEwblhyYW4xZEhLblp0VzNIYnIra3V5UTl6NjVsK2twTVhiS3lYRnRiS3JTNXBlSzg2YU16V3U4SlluTHlXZUtBSUdaYTBsVmJHL3dIT2FLQi9FY0lBMGY0OUkrQy9pMXJWNXhjdGFLNk5tZVZmY0Y3ai9QL05Ub3hyU2NPaFBUWS9wUHFPejFhN0x0dVJ0YllHK2ZOMG5UWDdiZjFVcXVSYlhmdjcvNWRTVCt3amxybm50NXFLdndIL0NXZUxjNDZrZFBsS04yMVNuSDVEMG02ZVYydGovQTZTN2J0MkcxSytwR2tWeTAzTEdpcDkydnJLaXQwV2J2RTlORVpQUVlJWW5MeXVaTGpJT1pqV3h2OGY4c1JEUlFHUWhnNHh1MC8vdTNhcXk1WmRiQzJ5dS9OZWtWZjlNdmZoVi9kM1Qrc3gvYWYxSk1IdXpVeEZXWW5uak9nODF2TlBDVnA3MTIzM3paRjBTQVQ3dDdmN1piVmpXN3p4VWV3czA1MUsrc3FaMXlHc2V4Qmd3bGZGbCt3dzhLWHViNndydGIzUVk3YTdOaTJZL2UvU0hwM09xK3Q4TG0xT1RHZzd0enBvdzBuSEE4RU1UbjVqTWxSRUxOUDBqVmJHL3hjYUFJRmdoQUdqbkxIVHg5NzRYTXVYWE8zcjlSalpMV1NKOWtLWnFHWFJhTXg3VHZlcDBmM25kVEJybjdGWW5UWG5VZFUwa0ZkM0dybUJFV0Q1YnA3Zi9jZlMvcW5wUS8xM0o3MkRNTTQwVnhYdVRhM0oyNm1tRTUzcld4YzkxZXZxL1g5bENNM3M3YnQyTjB1NmRQSlB0OTBHVnJYV1BiczJDNHJGNWsrbWlBbUU1K1ArZkY1azRNZzVnVmJHL3dQY0VRRGhZTVFCbzd6ZC8vN3hIdHV1R0x0bDAzVGxaMEtubVlBczlBenhpYW05ZmlCa0I2bHUxS3loblh4REUzUDNIWDdiV01VRFpKeDkvN3VDa2xISkRXazl2bVEvVk9nMTJQK3RxR3EvRG01T1dFejNrdTZhNWFCOVQ4ajZmcDF0YjVqSE1HWnNXM0g3cmRKK3NaU3o2dXQ4RDRidW14YVdTNXZDdE5IRThSa1lQc0pZaTcwMWEwTi9nQkhORkJZQ0dIZ1NGL3FmUHBmbm5QWm1uZG52SUxiSE1CY3FMdC9XSS9TWFNrZGNVbEhkYTdWek94QXdFZnZ1djIyR01XRHVlN2UzLzBwU1I5ZDNtZEZkazZIbFdXbFQxYjRTcTdPN2ttYUxrZnBybFdHeXlkb0dIckIyaG9mSndlYmJkdXhlN3VrSDBxNnFOdWZOWDEwbVRhdnF0Q1dsdklMcG84MkhGSEhDV0x5NDdNb0MwRk1uNlN0V3h2OFp6bXFnY0pDQ0FQSCtyZDc5OTkvK2NhVk4yYXNjaTk2TTJMWWV1REU1blJYT2tCM3BlVVlseFhHekk0Mzg1U2twKzY2L1RZdVVJclUzZnU3VjBrNkpNbG4zNGt4YzZmR3hwcUtzMjdUVlozNWs3T1J5ai96NStLaUFNS1hDKzdIL21GdGplOERITW4yMmJaajkwMlNmam4zTTZHcHBsU2JWNVZiMDBldm1ETjl0R0hQM2llSXlmaHg0dGpQcFF3SE1XL2UydUQvSGtjMVVIZ0lZZUJZbi81UjBMV3V1ZTc0aGxWMXF6TlNzWmM1RGt6SzY1TDR5OWpFdEo0NDJLMUg5NTFVNytBSU85b2VYVXFNTWFOenJXWU8zblg3YlJHS3ByRGR2Yi83YTVMZW1ibVRwSzJueWJPcjZxdXFNM3RTWnJ5WGROY3E0Mld6OEJ2ODd0b2EzNDg0bXBkdjI0N2RWMHY2amM5clZtNXF0a0tYemF2S0w1bysybGh5eHhQRXBQcW1CREgyYnBBaC9YeHJnLzhWSE5WQVlTS0VnYU45K2tmQjJzczNyRHpSV0ZkUmJtdkZ6bkEzcEl1ZXU4Q0xlZ2FHOWVpK2szcmlZTGZHSjJtUmJyTnBXYlBsWERnUWNEOUZVeGp1M3Q5OVpXTGZadVZjdHR4QXhtMjZubXlzcWJnNk15ZGp1aHlsdTJZNURGOW1EVXU2Zm0yTjd3aEhkWG9lN3gxMVBYbHMrTFduUjZiL1krUEs4ckkxU1V3ZlRSQmovMW9TeE5pMlFST1NMcnUwd2MvRUJVQ0JJb1NCNDMzbWZ4Njk0cnF0TFk5WGxKVzZiYW5VYVU1SG5jNEJZeVQ1d21nc3B2M0grcTN1U2lmNkZZMHg3RWtHbmRMRnJXYjIzblg3YmFSZ2VlYnUvZDAvbC9TeTNKdzhVejk5bHBWNmYxdGQ3bnVPdlNkZ3dwZDAxOG9CNGN0Y2owbHFXMXZqbStiSVRzN2p2YU5Oa2w0cTZXWHh1RjVxR0twWlZtMGhpTEZsTFFsaWJObWdEMTdhNFA4Q1J6bFF1QWhoa0JjK3QvUHgxOTV3K1pvZmVqMXVZOWtWT2tmZGtKSmQ5dGprdEI0L1FIZWxMSXRJMnEveloyaDYrcTdiYnd0Uk5NNTA5Lzd1V3lYOXloa24wdVErSGVxcnlrNlVlTnhyR2U5bDhRVm5Nbnh4V1BCeW9TK3ZyZkc5bDZON2ZvLzFqbm9OcVUxVzhQb3lTVmZiWHA4SllteFpTNEtZWlczUTQ1SnV1TFRCVDNkcW9JQVJ3aUJ2ZlBFWFQvNzFEWmV2L2FTeHdJa3JGOU5STC9sY1kza0hZcy9Bc0g1TGQ2VmNHdEw1d2N5VHNsck5URkEwdVhQMy9tNlhwRWNsWGVPOGsrcUNCLzNNcXJvcXovSnVKQmp2SmQyMWNuajRNdGYvV1Z2aisyK09jc3RqdmFNYmxHanRJdW5Ga3NvemZ1Tk1FR1BMV2hMRXBMVkJNVW5QdmJUQi8xdU9mcUN3RWNJZ3IvenpYWHUrZisyV2x2K1RWbVhPZGdCajR3VlFOQmJUUHJvck9VVk0wbUZkSE02Y3VPdjIyNWoyS2d0K3ZiLzcvMHI2RDZlZnhPWUdNaTZYY2FDNXRuTExzay9WdEhwSmFjM3lLSHlaTlNicHVyVTF2a1BGZUd3LzFqdjYvOXU3OC9ESThvTGUvNTlUVzVaSzBudlM2VWt2c3pMZGsrN3BaZEk5d0lDQ0lNTXdBK01WOWNwNEZhOWVlaEFkTmhYMS9zVG5lcEZoRTFFVWFQaUp3aWlpZ095Z3lJeUNPRnQ2ZW1DWVhtZnRKTDBuNmV5cDlaejdSMVYxS3RWVlNTM25WSjF6NnYxNm5ucXluWHpQa2pybmZNOG4zNlZkMHN1MEVMeGMyNUFIWjRJWVc3YVNJS2JpSGZyenJldmEzOFpkSHZBL1FoaDR6dC8rMTFOUHZHQno5L2FLM3NoMW5JNjYybTVJNVZab1p1WXpzeXNkUERxczB4Y21lVU80eDdRV3hwckpCVE5QM24vdlhmUXBzOUVEeDA2MVNUb3VhYU9YYm1odGtjaWphN3ZhOTFaOWl5WjhrWWZIZTZsMEwzOGs2ZVpOcTlwaXpYQk9Iem96M2E5TTZQSnFTYmRJYW5IRmd6TkJqQzFiU1JCVDlnNE5Lek1ZN3d4M2VzRC9DR0hnT1gveTVjSEl0WnZXbmRyWXMycHQyVzlpRjQ0RFUvNWlwU3N5WjBhbmRQRG9rQTRkSDZHN2tuczlyNFVCZ0hPek5EMXovNzEzcFRrMGxYdmcyS2wzU1hxZjEyNXVxenZhajBaYkkxdHJ1RmpWSjF4d3VOQW1IdStsMHUwL3NHbFYyOTErUEljUG5abGVKZW1ubEFsZFhpWHBDdGMrT0JQRTJMS1ZCREZsN2REcnRxNXIveHAzZWFBNUVNTEFrKzc5eXNFcnRsK3o0ZWsxSzZPdFhwbU91cGJIaXVXV05TMUxSNTgvcDROSGgzVHNPYm9yZWNDOHBDZTF1TlhNRS9mZmU5YzRoNmEwQjQ2ZVdpUHBHVWtyS2prNTNYQ2oyN0M2S3g0TUJGcXFUU29ZNzZWeGY5ODZoeS81N3RxMHF1MXpYajl2SHpzekhaQjBrNlJialV6b2NyT2tnR2NlbkFsaWJObEtncGdsZldscmQvVDEzT1dCNWtFSUE4OTYvOWNPdldoZzI4Yi9iRytOQktwN3J2RldONlJ5QzV1YlQralE4Ukc2SzNuVEtTMmVQdnNKU2NmdnYvZXVKSWRHZXVEb3FZOUllbXN0SjJzamJucUdZWXowclZuUlYrbEZpaTVIamYxYk5qQjh5Wm1WZE5PbVZXM0h2SGF1UHBZM2ZiU2tWMHBhNDZvd290SXlDV0pzMlVxQ21LS21KRzNkMmgwOXpWMGVhQjZFTVBDMFAvM200NysycjMvTC94OEtCaXA4dnZGSkFMUE1nOXZwMFNrZFBFSjNKWTlMU2pxaXhRTUJQM0gvdlhlZGJhYUQ4TURSVTFkTE9pb3BiT2ZKVzQrYllDUVVmS3huWmVlZU1pOU9oQzhOL0p1NUlIZ3BYUHBKU1hzM3JXcWRkL1A1K2RqcDZZZ0twNDgyWEI1R1ZGb21RWXd0VzBrUWM1bTNiTzJPZm95cUR0QmNDR0hnZVIvOXpvOC9NckJ0MDVML0hmZHJONlJ5SDk1TWM2RzcwbEc2Sy9uRkJWMCtROVBSKysrOXk1ZURlVDV3OU5RL1NmbzVKKzl3VHQwUXU5cGJIMS9SM3JxTExrZTFYaEVkUERidUMxL3kvZldtVmEyLzdyWno4ckhUbDA4ZlhjbU9FOFEwZU44Sll0endkM3BJMGkxYnU2TlV5b0FtUXdnRFgvalV2eC85N3Zack4veFVzWGUyMTZhakxydWlVdVYvejJmbkUvcmhpVk1hUERxa1UrZnBydVF6YVVrbnREQVFjSzdWekpDWGQrcUJvNmYyU1hxNG5uYzdPMitPNjFkMmpZVkR3VFdsQ25hMFpZZkRCUk8rMkh2Tlg4SWJONjFxL1V3ano4UEhUcGMzZlhRbHUwWVEwK0I5SjRocDVOOHBKV24zMXU3b2o2bTZBTTJIRUFhKzhONHZEd1kycjEvOTlOVWIxMTdwcCttb3l5MnMydTArTXphbGcwZUdkZWo0aUtibjRyeVIvR3RTQzJQTTVNYWJPWHovdlhkNVlpck1CNDZlK2s5bHBxNXR5SjJ2eGh2bDlNYTFxenJwY21SekpPSENoeldIOTNST21XNUpoK3Q1N2gwOHZYajZhS1BNNmFNcjJVMkNtQWJ2TzBGTW8vNU85Mjd0anY0QjFST2dPUkhDd0RmZSsrWEJqcTFYcmovVnU2NnJxL2diM052VFVTOVZtRkhqU1crYWxvNmRQS2ZCSThNNjh2dzVwZE8wakcwQ2xxUm5kZm4wMmMvZGYrOWRybmtEUEhEMDFKMlN2dXlXdTJDbDE0bFFNUEJFNytvVk8rb1dMamhjTU9POTJMWHRWVDJ3SDVHMGQrT3ExbG1uOXVIZzZha2kwMGNiOXZ5TkNHTGN1KzhFTWZYZS8yY2tiZC9XSFhYMVdFOEFQRmhmQXhyaC9WOTc3THFkTDdqaThJcU90bEN6andOVDdiYk14Ukk2ZEp6dVNrMXNWZ3RkbVhMaHpJL3Z2L2V1aVhwdnlBTkhUNFVrSFpaMG5SdnZpT1VzSG0xdEdWemQyVDdBZUMrTnE0aDRzTlhMVXZlYnoyeGMyZnBHdTdiOTRPbXBnS1E5eW9RdVB5M3BoU282ZlRSQlRORXlDV0pzMmNvbURHSmV1YTA3K2wycUcwRHpJb1NCNzN6dzY0ZHUyOWUvK1JzdGtaQlI3bHU5MmJvaGxidnNtYkVwRFI0ZDFxRmpkRmVDaGxRd1E1T2twKzYvOTY2VVV5dDg0T2lwMzVEMFYxNjRPNVphZk4yS2p1ZmFJdUVyUFhVREozeXhlZnR0Q1YveS9mckdsYTEvWGUxMkh6dzl0VjZad09YVzdNYzExZXdIUWN4U0t5Q0lxWFNsVFJURTNMZXRPL3JMVkNtQTVrWUlBMS82eUxkLzlMdjcramUvUHhBdzVOZnBxQTJIVDNZajc1Y3lzeXVkMStEUklSMTVqdTVLdUNTdVRFdVZSYk0wM1gvdlhhTzFGbnovMFZPZGtwNlcxTjN3bTFYMWdVeDY0OXFWQWNPdzkxR0FMa2YxZi9DcTE1NldPZGg3VE5MZWpTdGJ5eHJRYy9EMFZGalNpNDJGQVhWMzJyWDNCREZMcllBZ3B0S1ZOa0VRTXk3cCttM2QwUXRVSDREbVJnZ0QzL3I0ZDUvOHU5MWJOOTFsNTBuZ3AzRmdsbDIrUkExekxwYlE0OW51U3NQbkpuaWpvWml6dXJ6VnpKSDc3NzByV1c0Qjl4ODk5WDhsL1grdXUzRlZzUEtBWVR5MWNlM0theHV3NnFvS2RqSjhhZklwcG0yL3QwZzZMdW1talN0Yml3NnVQWGg2NmtwbEFwZFhLVFBHUzRkOWZ3ZUNtS0psRXNUWXNwVStEMkorZFZ0MzlHK3BJZ0FnaElHdi9jMFBUZ3h1dTNMOVRYYWNBRjZjanJxbS9TeGpoOCtPVGV2Z2tTRWRQRFpNZHlVc0p5WHBtQlpQbi8yaisrKzk2M1RoZ3ZjZlBiVkJtVll3YmE2K2lTMno4clpJZUxCN1JjZUFLMi9VZERteWVmdHQ3M0pVanIvZnVMTDFseVJwOFBSVXU2U2YxRUx3Y3AyemZ4T0NtUEp2bFFReGxhN1VwMEhNQTVKZXNhMDdhbEVkQUVBSUExOTc3NWNQUnE3WnVIWm9jKy9xbmxyZi9NMHlEa3ladGNwRlB6RXRTOGV5M1pVT1AzdFdLYm9yb1h6anlnWXl5ZzRFL0h1LzlCTnZDUVNNTjNycWhsWms1YXM3Mmc5M3RyWGM0S3FiTStHTHpkdmZrUEJGa3BReUxjMGswMStLcGMwVmtsNmlDcWFQSm9oeHNFeUNHRnUyMG1kQlRGelNqbTNkMFJQYzhnRTB2TTRLMU1ON3YzeXdlOGUxRzU1ZnQ2cWpyZVlnbzhIandGUzY3WFoyUXlxMzdQelpsZWl1aEVxdFd4blZyOTl4azJvZFJxWGhOemRENmx1ellpNFlDTFM3WXJzWjc4WG1iWGRzdkplU1RFdEtwRTNGMDZZU3BxVzBaYm5nSENHSUtmL3ZTeEJUNlVwOUZNVDg0YmJ1Nkh1NHd3TndUVDBWcUljUGZPM1F3SjZ0R3gvdWFHOEpWUHJHOS9OMDFKY3RhNVJmUWpsbG54MmIxaURkbFZDQlgvaXA3YnI2aWpXMmx0bUlHNTFoNk95bWRhdldOM1FialZyTHA5V0xyUS9TVmV4SDByUVV6d1l2eWJSbCs0RW5pSEd3VElJWVc3YlNCMEhNRVVtN3RuVkhFOXpoQVRTeWJnbzB4SjkrODRlL3RLOS84MzJSVU5DeENuU3pkVU1xdCt4Y2Q2Vkg2YTZFSld6cFhhVTN2UEpHWDl6MElxSGdvZDdWWGJzYnNqMTBPYko1Kyt2WDVjaTBMTVhUQzhHTHVWenVRaERqdXVzQlFZejlXK254SU9hV2JkM1IvK0lPRDZBUjlWSEFGVDc2cno5KzM5Nyt6ZTh5S2oxQm1tZzY2dVZLcUhWYjV1TkpIVG8rb2tlUERtdm83RVhlbE1oV2lBMzk2bXQyYS8zcVRsL2NBRmRFV3crdGpMYnRydXQ2NlhMa2lqMnROSHpKZERIS0JDOUowNnA4cXdoaVhIY2RJSWl4ZnlzOUdzUWMyTllkdlpzN1BJQjYxNlVBMS9uVWZ4ejkxbzNYWHZGcXV5dlNmcHlPMnBheWwvamh1ZkZwUFhwa1dBZVBEbXRxTnNhYnM0bjFYOVdqMTk2eTFUYzN3L1dyT3MrMWhFTTlkYm5oK2lCOGFhWXVSMm5MVWp5VmJlMWltcXBtYUJlQ0dQZFhoZ2xpN045S2p3VXg1eVJkdjYwN09zRWRIa0E5NjFTQWEvM2RRMDhmdjI1VGQzbFRlTklOcWJheXkvaWhaVms2ZnZLOEhqMHlyQjgvYzRidVNrMG1GQXpvN2p2M3FpdmE2cGNiNCt6bTdsVlJSMiswZERseVlQdWRDVjhzTFc3dGtqSXRaL2FOSU1aMUZXS0NHUHUzMGtOQnpDOXM2NDcrRTNkNEFFWHJ2aHdDTktQaHN4TjdvcTB0dzFkMHIxaFp2NHBHOHdRd2xXNWt3REMwZFV1UHRtN3B1ZFJkNlpFamRGZHFGamRkZjRWckFwamNRM010Ny8xZ0lQQ3NJVzEzTWxVZ2ZMSDN1bHgxK1NWK1BXVmFpbVdEbDRSRG9iSlZ1SHFyOWorY1pjdmZmbkVwVlplNXhDOWFEcnhISFMrejZBb3FYNnNyOXIyTVg3Qi9Pek1sT3JML2x1M1hwRzhSd0FCb1pEMExjSzMzZmVXeHEzZTk0SW9qcTdyYUk1VlVybXVwNk5NTnFiSjl6SFZYR3FTN2ttKzF0WVQxR3orelR5MFJiL3hQb0p4em9hTTFNcmkyS3pyZ3hJb1o3NlZ4ZTdyVTVkSzBkR2t3M1hpNitQVFJScjMybVJZeHJxc1kweUxHL3ExMGNZdVlPVW5iYnVpT251UU9ENkJSOVMzQTFUNzA5VU92SExoaDg3KzJ0WVFYWnhKTVIxMWIyUlg4c0p5eUxjdlNNYm9yK2RJckJxN1d3TmErdlBlRGQyNUxwYmEwczdYbC9KcXU5bTQ3VjhKNEwzWnR1MzFkanBLWFdydVlTcVN0aGg1bmdoajNWNDRKWXV6ZlNwY0dNZSs4b1R2NlllN3VBQnBWN3dJODRTUGYvdEU5Ky9vMy8za3dFR0E2YXJ2S0x2T0hsVDQ4R2NyT3JuVGlsQjQ5TXFUbno0enpCdmF3bFoydDJ2KzZ2UW9FakNYKzR0NjZtVnFXdEhIZENvVUNnWm9Mbzh1UnZkZmdxc3ZQZm1KYUM2RkxQRzJwMnFGZENHTHMzeGlDbUFidk8wRk16dU9TOXQ3UUhVMXhod2ZReURvWTRBa2YrN2NuUHpXd2JkT3YyMStaY0ZjQWMybjVlbmREc2ltQUtYVCs0b3dlT1RLa3dhTkRtcHlodTVMWDNQblNiZHE2WlYwTjd3RDNtWnlKYWVkVnZUWGRrUWxmN0wzK1ZsdStaZVFHMURWTFRCOXQxR0VmYWl5WElNWjFsV1NDR1B1MzBpVkJqS2xNQVBNWWQzY0FqYTZMQVo3eE45OC8vbEQvTmIwMzIvMm93emd3cWptRVdlNEIzTElzSFIrNm9FZU9ET25IejV4Uk1wWG1EZTF5dldzNzljYmJkbGQ1NDNMdnJXdHNjazQzWFh0RlZTY1A0NzAwYms5enY1SE90bmFKRlV3ZjdjU1E1UVF4OW04TVFVeUQ5NzI1ZzVpUDNOQWRmVHQzZHdEbFlIWWtJT3ZzMlBTTDI5c2lRMWRkc2VhS3VsVWdEQWZMbGt2S2RqaUF5VlNVREYyL3VWdlhiKzVXTEpIVW9lT245QWpkbFZ6dHAvWmNYZlgwR1ZiZS9FVnVDMlE2MjFvcVBuR2NERitZWW5wNXVaWXVzZnpwbzQzQzkxeXAwcXVmcThWeTZPL0RyRWtPSDArN3kyVFdKRnUyc3NHekpnMUwra1B1N0FEYzhGd0dlTTY5WHptNGR2czF2Yy8zck82TTFuYkNOTmQwMVBYdWhyVGs2dkorNGZ6RkdUMXllRWlQMGwzSlZhN3RXNlBYdjZ6ZjlqdVNHd0taZFYxUmRiUkdsajFaNkhKazEvWlh2aUVwMDdvVXVpVFNwaXhicmwrMGlLbTJGRnJFTExVQ1dzUlV1dElHdFloNTdRM2QwYTl6ZHdmUTZIcy80RmtmK05wak8vZHMzWGl3SzlvYXJPV2hnRzVJcWpGb3F2eVJ1bFJGeWJJc0hSdTZvRWNPMDEycDBRS0dvVjkvN1UxYTA5WHU2TjJwRVlITWZEeXBiUnU3bDl3ZndoZTd0ci84SlJkUEgyMFduVDY2a3RVUXhOaS9aUVF4UzYyQUlLYlNsZFk1aVBuU0RkM1IxM04zQitDRyt6N2dhUi8rNWc5L1lWLy81bitJaElNVnpsck5kTlRWUGJ6VS9oQmQ3c05oTEpIUzQ4ZEg5UENSSVQxM211NUs5YmJydWcyNmRkKzFkYjFUMVN1UUtUb2VET085Mkx6dDVTMmR5R3Z0a3F4MVNudUNHSWUybFNDbWFKa0VNYlpzWloyQ21DbEoxOS9RSFQzRDNSMkFHKzc1Z09kOTlGK2YrRC83K2plLzJ6QU11aUZWdW15RHV5R1Z1KzBYSm1iMDhPRWhQWHBrV0JNejg3enBIUllKQlhYM3oreFZkS251T2c3ZnRad01aS1puNDlweDVmcEYyOGg0TDNadC85SkxwNjJGMENVemZiUmw3N0VpaUhGb1d3bGl5cjlORThSVXV0STZCREcvY1VOMzlPUGMzUUc0NVg0UCtNSW4vLzNJbDNlL29POU8yMjc2VEVkdCsyTnl0UUZNUGt2UzhaUG45Y2lSSWYzb2Fib3JPZVdsTjI3UmkzZHNkczFkek81QXBqMFNVYytxS0YyT2JOdiswa3RhV3BnK09sWjArbWdIamh0QmpFUGJTaEJUdEV5Q0dGdTIwc0VnNWlGSnQ5elFIVFVGQUM2NTF3Tys4WGNQUG4zNCtpM2QyMnk1MlRNZHRlMFB4b1poN3pHTUpWSTZSSGNsMjNXMFJYVDNuZnNVRGdWY2VVZXJOWkJKcFUxZHUyR05vNDlJelI2K1hKbytPclY0K3VpNlZub0lZaHphVm9LWW9tVVN4Tml5bFE3c2Y4b3d0T3VHN3VpVDNOMEJWSU1wcW9GbGpKeWYyQk50aTR4czdGbTV4czRhQzlOUjEvNGc3TVJEWTJza3BCZHQzNklYYjk5eXFidlNJM1JYcXRsTGRsNnBVQ2h3YVNZYVI5NmpWdlVuUWEzVFhrL1B4aDJiVHRuUjg5bkZYWTRzbFpnK3VzYTNpR0Z6QVV4ZnpmVFZqcFhKOU5XMmJLVUQrLzlCQWhnQWJuMVdBM3pqQTE5OWJPT04xMjE0YXMyS2FFdXAwNGpwcUd0L0FLdDNONlJ5bDgxMVYzcjR5TENlZVBxMEVuUlhxc2k2bFZIOXo5djN5Q2p4eE8vNGphZ09MV1F1VHMxcno3VWJiTnVZWmgzdkpWbnU5TkdOcnZ6UUlzYWhiYVZGVFBtM2NGckVWTHBTbThwOVJsSi9mMDgweHQwZGdOdnU3NER2Zk9qcmgxNjY5NFpOLzk3ZUdnbFVmR05uT21xYkhuV3JlNGkwTDJneU1yTXJuVGlsaHcrZjFMT254aHg3U1BTVG4zdDV2NjYrWW8wamY2dDYzdldXZXBjYWxuVGwrbFUxcjdqWnVoemxwbytPVlROOWRLTXJRQVF4RG0wclFVelJNZ2xpYk5sS0c4cDlaWDlQOUx2YzJRRzQ3WjRCK05hZmYvdEhkKy9yMy96eFVEQWdwcU91OW1Ha3NvZmJXaDhrN1F4Z0NsMlltTlVqaDAvcTBTUERHcCtlNHdRcFl2UDZsZnJGVjk3b3podVVqVE10YlZxN1FwbnJRaTJSaElPNzZxTHdKVkhRMnNYVGxTQ0NHSWUybFNDbWFKa0VNYlpzWlEzbDN0ZmZFLzFsN3V3QTNIaS9BSHp0WS8vMjVGL3V2V0hUVzVpT3VwcUhrT1VlWmN2Y2xqcDFRMXJ1Q1RiM1hVdlNpYUVMZXZqd1NmM3dLYm9yNVh2amJidTFmazJuKzI5V05heGdlamF1blZmMVZobEpPTGhMTGdsZVRNdFNMSjBMWGk2ZlB0cnpGU0dDR0llMmxTQ20vTnM2UVV5bEs2MmkzREZKVy90N29oZTRzd053ZmIwVzhLTlBmLy80OTNaY3MrR2xURWRkYTludUNXQksxMjByRzhja2xranBFTjJWSkVrM1hObXRPMjdaNnIwYlY0VXJHSnVjMDk3citrU1hvNHpNOU5GV1JkTkhlNzR5UkJEajBMWVN4QlF0a3lER2xxMnNzTnhmN2UrSi9pMDFZQUIyWUhZa29Bcm54NmRmOXN6STZMUFg5SzNkN0lZSGdvYU5BK1BDeWxvOTluT3BaVnNqSWIyb2Y3TmUxTDlaRnlabTlYQ1RkbGNLQmdONjZhNHJIU25iY3ZvOVd1RXNTeDJ0TFdVdDZPZndKWjF0N1ZMTDlOR054S3hKekpya3F2ZlRjbVV5YTVJdFcxbEJ1UTlJK2d5MVh3QU5ld1lDa1BHK3J4eGMyWDlWNzFEdjJxN081YzRzdWlFVlc5Ylo2YWpyMFEycDNMSXZkVmM2TXFUSG56cWxSTkwvM1pYMmJkdW9sKzI1eWw4M3RSS0ZyKzJNYWtWN2E4TnV0STBJWHhhbWo3WnNtejdhRjVVaVdzUTR0SzIwaUNuL1ZrK0xtRXBYdWt5NWNVazcrbnVpSjZqNUF2QkVmUlh3dXc5OTdkQzIzZGR2L05HS2p0WlFxYk9LNmFpTEYrRDFjV0NxTFQrZXpIUlhldWp3a0o0WkdmVmxkNlhXbHBEdXZuT2ZXaU9OYld4WmowQW1sa2pwaG8wOWRiKzVOaUo0V1pnKzJuSjArbWpQVjR3SVloemFWb0tZOG0vNUJER1ZyblNKY3Yrd3Z5ZjZIbXE4QUR4VFJ3V2F3WWUvOGNNN2J1N2YvTldXU0tqb25aenBxQy8vWmE5TVIrM29NWlEwT2ptcmh3OFA2WkVqUXhxYjhrOTNwWmZ2dVZwN3QvVTF4YzF1YkhKT2UxK3dzVzQzMVhxR0w0dW5qN2JxT24yMDU5OHZCREVPYlN0QlRORXlDV0pzMmNvaTVSNlJ0S3UvSjVxZ3RndkFDL1ZTb0tsODlGK2UrSU1YYnQveUowYWd0Z29pMDFIWDl0RHBaQUJqNnpFc1lCblMwOE1YOU5DVG1lNUtjUTkzVjFyWjBhbzN2VzZ2QWdIMzNsN3MzTExwMllSMlh0M3JtL0JsOGZUUnpUeXNORUVNUVl6N0s5d0VNZlp2WlVHNXQvVDNSUCtMV2k0QUw5d1RnS2IweVFlTy9NT2VyUnYvdSsyQndGTExNaDIxL2Z0WjV3Q21jSlh4WkVxSGptZTZLejN0d2U1S3IzdkpWbTNkMHQwME44SDJjRmdiMW5RNXQzMkdzL3UrZVBwb1UyWno1eTcyVjVJSVloemFWb0tZOHFzQkJER1ZyalJiN29IK251amRYQVVCdUxKK0FXREJmUTgrOWNOdFY2Ni9rZW1vaXhmZ3QrbW83ZGlXcFI2eWM5MlZIajdzamU1S3ZXczY5U3UzN1c2YUcyTGFOSFZkNzFvWk5pY2xUZ1l2bHFTa3g2YVA5bnhGaVNER29XMGxpQ2xhSmtHTUhWdDV6cEN1NysrSlRuQUZCT0FFcHFnR2JIVHEvT1RlYUd0a1pFdnY2bldPaGdkTVIxMjMvWFQwR0M2ejhOb1ZVZDMrb3ExNnpZdTI2cW5oQzNyNDhKQU9uVGl0ZURMbHl2Zi95L2RjN2VuenQ4S1pxVFU5bTdBMWdIRXFmTWxOSHgzMzZQVFJibmhmTUgyMXZTdGkrbW9IeTJUNmFqdTI4aDRDR0FCT29pVU1ZTE1QZnUxUTc0NXJlcDlkdDZxajFiRkFnT21vN2QvUGVuZERNcW9wMjFnMHU5SlR3eGRjMDEzcG1yNDFldjNMK3B2cVJubHhhbDREMTlVK0FMSGQ0WXNsS1pHZHhTanVvK21qUFY5aG9rV01ROXRLaTVqeXF3YTBpQ25ETjdmM2ROek9GUStBcStzVUFDNzM0Vzg4ZnZQQXRrMy9GVzJMQkd3UEQraUdWUHN4TFBNcHVGSGRrTW85aW1OVGMzcm84RWs5ZkhoSW81T3pEWHUvQnd4RHYzYkhUVnF6b3IyNWJwcW1kTTJHTmRXWFplTWRPR1ZhbDJZeDh2UDAwWjZ2TkJIRU9MU3RCREhsVnhFSVlwWXdLK21HN1QwZEo3bmFBWEIxZlFKQWNSLzUxZzkvOVlYYnQzdzZIQXJhOTREUGROVE83R2NkcHFPdTVlSGJLR01OSjBaRzlkQ1RKM1hveEttNmQxZmFlVzJ2YnIzNXVxWTd4emV0V2FtV2NOQ3g5L2RTVEN2WDJxWDVwby8yZk1XSklNYWhiU1dJS1ZvbVFVd2wzcm05cCtQRFhPVUF1TDR1QWFDMGovM2JreCsrdVgvejIydCthSyt3NXN0MDFCVXM3NUZ1U09WS1pMc3JQVmluN2txUlVGRDc3OXlyYUZ1a3FjN3RtYm00ZGwyMXdaSDNkaW5KUzYxZG1EN2E4NVVuZ2hpSHRwVWdwbWlaQkRIbE9DUnAzL2FlRG5jT3VnYUFlZ1NBOG4zNmU4ZStzL082SzE1Wjh3TSswMUhidjU4Tm5vN2E3cU5ZdUdTdXU5SkREblpYdXVYR0xicGx4K2FtTzYvSEorZTE3d1Y5dHYrOTgrVlBIeDFuK21qL1ZhQUlZaHphVm9LWThxc05CREc1eTYya3ZkdDdPaDdqeWdiQUUzVUlBTXY3L0NQUFBuUGRwblZYVmZYUVhsNU5TbFdYWGZQRFFhM1JBZE5SMjNFVWw2dGZueGdlMVVPSE05MlZZZ2w3L3RIWDBSYlIvanYzcWxTWE96K0x4MUxxMzlKank5ODVKemQ5ZEs2MUM5TkhOMEVsaWlER29XMGxpQ2xhSmtGTUtYKzJ2YWZqSFZ6UkFIaW0vZ0JnZWUvL3lzR09iVmV0SCtsYnQySkZ4U2VvQzhhQnFUaHM4R2czSktlbm8zYXlHMUs1ZGV0RU1xM0huenFsQjU4OHFlUERvN0pxR0V2azFwdXYwODVyZTV2eW5GN1QwYTdWSFcxVnY0OXptRDZhaWhSQmpGUGJTaEJUdEV5Q21FTERrclp0NyttWTRXb0d3RE4xQndEbCtjRFhIcnYycHVzM0hsN1YyUmF1Nk9Sa09tcjc5OU5uNDhCVVdxZk8vV2hzYWs0UEh4N1NnNGRQNnNKRVpkMlYxcTVvMTYvZGNaTU1vL2x1STRsa1dqZHM3SzdxUGN6MDBWU21hci91RXNSVVd3cEJUSlUzRFRmdmUrMUJ6QjNiZXpxK3dWVU1nS2ZxRFFESzkyZmZmUHpXbS9zM2Y2czFFaTR2QjZFYlV0WGI0cmZwcUN2YWppb2VHSjRhR2RXRGg0ZjAyUEdSc3JvcnZmNWwvYnFtYjAxVG5zZmpVL1BhZDExZjJYOVhwbyttUWxWdEFRUXg5bThaUVV5Vk53ODM3M3YxUWN3WHQvZDAvQnhYTHdDZXF6TUFxTXhILytXSmQ3NXcrK1lQQlFPQkNzSUpwcU51bm5GZ0tsdERKUTgrNVpTYVNLWjFhSm51U3B0NlZ1b05QMzFqMDU3RDA3Tng3Ym1tOU14SVRCOU5wY3JPQWdoaTdOOHlncGdsYjVUdTIwNmJmcUZna1NsSjEyL3Y2VGpEbFF1QTUrb0xBQ3IzeWZzUGYyWmcyNlpmTG5sU01oMTFUUmNxdWlIWmN3d3pzeXRkM2wzcGpiZnQxdm8xblUxNy9yYUZROXE0ZHZId1Rrd2ZEZHNxVmdReERtMHJRVXpSTXBzM2lIbno5cDZPVDNERkF1REp1Z0tBNnR6M2c2Y2U2Yjk2L2Q2aUp5VFRVZHUvbno2Zmp0ck9oNE5peXo0MU1xcUhEZzlwT2g3WHJmdXVhOXJ6MXJRc1hkZWI2WWJGOU5Gd3JISkZFT1BRdGhMRWxGL044SFVRODVDa1c3YjNkSmhjclFBMFFvaERBRFRHNmRISkYwZmJ3c05YYmxpenZzS2FrYjJWSFo5TlIxMjhFTVBaWTFqK0ttMDVpazRHTUtWYzI3ZFcxL2F0bFdsSmMvR0VwdVpqbWs4a20rcWNEUWFEc2l4cExKWmkrbWdzeWFyMXZDdFNRT2t5cTErYkpXZXVnNWVWYThPSzdObld4YVZVWGVZU3YrakVNWFc4ektJcnFIeXRydGozNVg4aFpVbi9hd2NCRElBR29pVU0wRUIvOHFWSDErMjV2dTlreityT05xYWpkbkEvbTNRNmF2djMwMWowYVRwdGFubytwcW41dUpMcHRPL096MEFnb0dBb3FHQW9wR0F3MkpRelFhSEJsU3hheERpMHJiU0lLVnBtYzdTSWVlK09ubzcvemRVSmdLZnJCd0JxODZkZlA3UnI3N1pOZzUzdExVR21vM1pnUDVtTzJxYjlOQzc3TkgvNVdDS3BxZm00Wm1KeG1SNGVpRFlZQ2ltVURWNENTd3llRGRTdG9rVVE0OUMyRXNRVUxkUGZRY3d6a3ZwMzlIVEV1RElCOEhUZEFFRHQvdUpiUDN6RHpUdTIvSDBrRkxTOWlzMTAxQTRldy9KWGFjdFJkRVVBay8yeTFQS1daV2ttbHREMGZFeHpIdWl1bEdudHNoQzhBSzZzYkJIRU9MU3RCREZGeS9SdkVQT0tIVDBkOTNORkF1RDVlZ0VBZTN6c096OSs3d3UzYi81OXd3allkc0l5SGJYRHg3Q0dmVndvdTNIVFVaZS8vT0pXTU9XV25YSmhkeVhETUM1MU1Rb0ZReklDM0FiaGtRb1hRWXhEMjBvUVU3Uk0vd1V4OSszbzZmaGxya1FBZkZFbkFHQ2Z2L25lc1cvc2VrSGZhMndKQkd5cnpCZGJsdW1vaXkzY0RPUEFWSHNNWThsTWQ2WHArZnAzVndvRWc1ZGF1Z1NEUVM0MDhHNmxpeURHb1cwbGlDbGFwbitDbURFWnVuNUhUOGNvVnlFQXZxZ1BBTERYNXg5NTl1ajFtN3V2ZHl3OG9CdVNJeGRIMzNkRE11d3AyN0lzeldSblY1cUxPOU5kS2RQYVphR0xFUVBxd2xjVkw0SVloN2FWSUtab21mNElZdDY0WTMzSFo3ajZBSEFMT3NBRExqTjA5dUtlYUd0a1pHUFB5bFcyVjE2WWp0cWhoMzQ1ZGhRYk1SMjFrMlViaHFITzFoWjF0cllvbFRZMUZZdHJlajZtUktxMjdrckJZTGFMVVNpa1FKQUJkZUZlVEYvTjlOV3Vlajh0VjZiM3A2OStRTkpudWZJQWNCUCtQUWk0MEFlL2R1akszUys0NHRpYUZkRUkwMUZYdUR6VFVkdTBuMGJWKzFqTnRzU1RLVTNPeDhydXJzVDAwV2o2Q2hndFloemFWbHJFRkMzVG15MWk0cEsyNzFqZjhSUlhIQUMrcWdNQWNNYWZmZlB4bCsyN1lmUDkwZGJ5Y3hpbW8yWTZhbnYyMC81dVNPVXVuK3V1TkZta3V4TFRSNE5LV0MzWGRZS1lha3NoaUtueXB0VDRmZi9ESGVzNzNzT1ZCb0R2N3Y4QW5QT1gvL0xFVzE2MFk4dGZCc3Q4NEdRNmFuc0RnV1dYYmZMcHFCMDUzbm5mU0tWTmpjM09LMkdKNmFOQlJjeVc2enRCVExXbEVNUlVlWE5xM0w0ZmtiUnp4L3FPcEFEQVpmaFhJdUJpdjNucmpyOGFQREw4eVpvcU5IVU9ZQ3BkZ1p2R2dYRitPbXBuYXRhT3BlbEduY2VZS2ZpR2FWa0toTU5xaVlRVmtDV1pwbFRubVpVQXAxa09GR0E1c0Rhclh2dHZ1ZUNZRmluRmNtQmpMRGUrbjVZcjA3Sm5yUTV2cHlYcFRRUXdBTnlLbGpDQUI5ejNneFAvdGVPYURTK3E2a1JtT21yN3Q0WHBxSjNabHJ4dnBFMVRGK01wbVVWK25FNmJtWEZqREtQeU5BendhNFdNRmpFT2JTc3RZb3FXNmU0V01RZDJyTys0bTZzS0FMZWlKUXpnQVdmR3BsL3k5TWpvU01VVkdCdGF3YmloY3I1azJZMllqdHJCYXFiaDRJSDFTZ0JqV1pZbUNnS1lmTUZnUU9GUVVPRmdRQUVyMjBJRzhEaGF4TmkvSWxyRU9GaW1lMXZFbkxXazMrT0tBc0ROQ0dFQUQvamQxKzB4ancrZDMzbG1kR3EybHFkaXBxTjJiSlcySEVXL1RVZGRkdGtGMzVpSUpWWHVoTldYQXBtQW9ZQmxFc2pBMHdoaTdGOFJRWXlEWmJvemlIbnJqZXM3SnJpYUFIQXpRaGpBSS83Z3YrMGRPL3pjMlJkTnpjWlNybndJYjBRM3BEcVhyWHFQQTFPMy9henZkTlJMbVlvbFZHMG4vbUF3cUhBb3FGQWdJTU95R0Q4R25rUVFZLytLQ0dJY0xOTmRRY3czYjF6ZjhVOWNSUUM0SFNFTTRDSHZ2R1AzRTRlT2oveGlQSm15dkR3ZHRTMFArRGFzMU12VFVkdTNuMFpONjdPekc5SnNJcW1ZWmMvK2hvSkJSWUpCaFExRGhrbVhKWGdMUVl6OUt5S0ljYkJNZHdReHM1TGV3dFVEZ0JjUXdnQWU4OWJiZG43eDROSGgvMk9WK2krL3k4ZUJjZE4wMUU3dXA3dzRIYlVhTnc1TUxKblNYTnIrUndYRE1CUU9CUlVKaGJLQkRETXN3UnNJWXV4ZkVVR01nMlUyUG9oNTk0M3JPMDV5NVFEZ0JVd3JBWGpVcC8vajZCZHZ1bjdqenk1M1JqczlIWFhkWjBQeXpIVFVOWVF3aHNQSHNOaFBqVG9IYW5uZlNLWk5UU1JTeTFhK0RSdi9BcVlzcGROcFdXS0dKZmk4b3Nhc1NRNXRLN01tRlMyek1iTW1IWkswNzhiMUhTbXVHQUNhNHQ0T29IRSsvOUF6UDk1MlpVOS9kWlh0WXNzeUhYV3hoWm1PMm9GdHlYN0R0Q3hkTEhNZ1hqdERtUHdmbXFhcHRHbktNZ3h1aS9CblpZMGd4cUZ0SllncFdtWjlneGhUMHQ0YjEzYzh4cFVDZ0ZmUUhRbndzT0h6RTN0T25yMDRXbmtsdS9ZS0V0TlIyeFVWT0hOZ3ZSREFXSkltNXBOS043aDNVQ0FRVUNRVVVrc3dxSkFoR1pZcDV6cFpBSldqYTVMOUs2SnJrb05sMXJkcjBwOFR3QUR3R2tJWXdNTis1M1Y3RWllR0x1eStNRGticisxQm1lbW9LMWlsTFVlUjZhaWx5VmhDbGJRZHIwY3NFc3dMWklLeTFCb0tLRURqR0xnQVFZejlLeUtJY2JETStnUXh3NUxlemRVQmdOY1F3Z0FlOTg3WDdoNSs0dW5UcjVpZFQxUTkvUXZUVWRkZU9OTlJWL2JMMC9HRTRpNmZzQ2dVRE1xeXBIQWdvUFpRVUsyaEFKMlYwRkFFTWZhdmlDREd3VEtkRDJKKzQ4YjFIVE5jR1FCNERTRU00QU52ZjgydUh6eDJiT1R1Vk1xcytFR1o2YWlMTDh4MDFMVnZZcW5sNXhJcHphVzlkWTZsTFV1V0pVV0NtVUNtSmNqdEU0MUJFR1AvaWdoaUhDelR1U0RtQ3pldTcvZ0dWd1FBWGtRdEV2Q0ozN3gxeDZjR2p3MS9sT21vYThkMDFBNzg3YlBmaUtmU21rbVpuajdYMHBZbFExSmJNS0FvZ1F3YWdDREcvaFVSeERoWXB2MUJ6S1NrdDNJbEFPQlZ0S3dHZk9hei8zbjhnVjNYWGZHeWNrNS9wcU91YlI4WHltWTY2bkwyTVdXYUdvOHRub3JhcUhBbGhwMS9GY08rWTIxSUNoaUdrcWFwaE1tZ3Z2QklKWTVaa3h6YVZtWk5LdjhhWDlXL1BkNTg0L3FPVDNBRkFPQlYvUHNPOEpsejR6T3ZPREY4NFhtN0sxdUdTOGFCY2JSU1dlOEFwbTdIc0w3ZGtJcXhMRXNUQlFHTW0xZzIvSDdhc2hRd0RMV0ZBb3FHQWdvem9pOWMvcjZsUll4VDIwcUxtS0psMnRNaTVrRkwraVJuUHdBdm80WUkrTkFIdi9wWTEvYXIxdzlmc1c1RlY2bFQzeTJ6SWJscU9tcVB6b2JraGVtb3grY1RTbHJMTE4vQWxqQk9IWmRBdHRWUlBHMHBaZEZDQmk2dHpORWl4cUZ0cFVWTStkZjZzdGFha3JSejUvcU93NXoxQUx5TWxqQ0FELzNPNi9aTUhYMysvTDZKbWZsVWJkRUIwMUdYM2srbW95NzNRV2d5Vmp5QWtTUy94eEttbFhtRkE0YWk0WURhUXdFRkRmNy9BWHZSSXNiK0ZkRWl4c0V5cTI4UjgzNENHQUIrUUFnRCtOVGJiOTkxN05EeFUzZkdFaW1ycG9kd3BxT3VlVnZVc1Axcy9IVFVNL0drWWlibm81UUpZeXhKa2FDaGFEaW85bEJRUWZJWXVPWEJtU0RHb1cwbGlDbGFadVZCek5PUzNzT1pEc0FQQ0dFQUgzdnJiVHUvZWZEbzhPK2IyVzRRVEVkZGZHR21vNjU5RTRzdFA1OU1hVFpORjV4aUZnS1pvRHJDUWJXSEF0eVEwZmdIWjRJWWg3YVZJS1pvbVpVRk1YZnZYTjhSNHl3SDRBZjhEdzVvQW4vOTcwZitmdSsyelc5b2huRmdLdDRXdjQ4RGsvMnkzdVBBSk5OcFhVeWtWYzR3S0VZRksvYmFtRENsOTY5NENVSERVTm95RlV1WklyNUN3eXAzakJIajBMWXlSa3o1bDhORjMvenN6dlVkdjhLWkRZRDdOQUJQK2Z4RHp6eldmOVg2M1U2RUUweEhYZnVEZ0orbW8wNmJsc1pqU1ptVmx1SFRFT2JTOG1XT1FwejdTY0F3bERaTnphZnB6NFVHVlBBSVloemFWb0tZb21XV0RtTEdKRjIvYzMzSEtHYzFBTCtnOVRQUUpFYk9UN3p3dVRQajUrd09KNWlPdXZiaS9UUWR0V1ZKRS9IeUF4aG4rS01OaVdsWk1neEQwVkNteTFKTGtGczI2bmdXMERYSm9XMmxhMUxSTWt0M1RYb0hBUXdBdjZGR0J6U0ozMzdkbnNUVHc2TTNuaHVmbm5meUlieXFzaHN4SGJWOVcxL2VrZzBhQjZiZTNaQXV4aEpLdVNRRDhVdDNIa3VaTVdTQ2VZRk1oRUFHOVRnSENHSWMybGFDbUtKbFhyNkNCeVRyUHM1a0FINURMUTVvSW0rL1k5ZTVKNTQ1ODdMcHViaFo4cUdhNmFpTGJBdlRVUzlidGlGTnhaSktNSkNKNHcvVnBpV0ZERU1kNGFBNncwRkZBdlFzaG9NUHpnUXhEbTByUVV6Uk1oZStpRXZhdjNOOUozY1ZBTDVEQ0FNMG1iZmZ2dXVSeDQ2UHZER1pTdGYwMU01MDFMWHowemd3czRtazVrenF5dlZrV3BsWE9CQlFaempUUWlaRUlBTW5IcHdKWWh6YVZvS1lvbVZtdnZpL085ZDNQczNaQzhDUENHR0FKdlNidCs2NDc5R2p3eDljOUJ6TmROUWx5bVk2NnVYRWttbk5wQWhnR3NtME11UHh0T1FGTWtFQ0dkajU0RXdRNDlDMkVzUVVLZk9JTEgyQXN4YUFYMUZEQTVyWVo3NS8vRi8ydktEdlZVeEhYYXBzcHFOZWJ2bVVhV284bmxiaGhNcTFUK0ZjNi9hV0VhRzVmSGFrMnMreHpBeExwbVVwbGtvclRVNEdNV3NTc3lhNS9rSENNcVJiZHZaMlBzalpDb0I3TVFCZit1S2p6NTNZdXFYNzJubzl0R2UreVhUVTl1MW40N29obWJJMEZrc1dmYmduaENteWZBTkNtSHdCUXpKTmFUNlZGcE5lVS9tenV3Q0NHUHUzckVtRG1BTzdlanZ2NWl3RjRHZDBSd0thM1BObngzY1BuNStZY096QjB3MFBFVTB5SFhXOS96N2pzVVRUdHE3dzRtNmJWaWFNYkE4SDFSVUpxVDBVb0JJZzNyOTJGVURYSlB1M3JBbTdKcDJWOUM3T1VBQitSLzBMYUhLLy9kbzlNMGVlTzNmVDJPUmMwczV5bVk3YXdXTlkrTk02akFOVHVQekZlRUlwaThhVVhtVmFsZ0tHY1NtUWFRdFJIV2cyQkRIMnI0Z2dwbWIzN09ydG5PVHNCT0IzMUxvQTZCMTM3SDdtaDArZHVuMCtuclRzZW1ndlhnalRVVHUybjNVc2V6cVJWSnorTEw1aFdwYUNocUhPY0ZCZGthQmFDV1NhQmtHTS9Tc2lpS25hTjNmMWRuNkJzeEpBTTZDbUJVQ1NkTTl0Tzc4emVIVDRIV25UclBrQnYybW5vMjZDY1dEbWtpbk5wa2xnL1BwQWJscFM2RklnRTFKTGtHcENNL3pkN1M2QUlNYitMZk41RURNcjZUYzRHd0UwQzJwWEFDNTU4MDl2LzhqZzBlRy9xYVdNcHA2TzJvN3RsbnVubzA2azBwcE9wYjM5d0lpeWo3TnBTWkZBUUYyUmtMb2lJVVVJWkh6OTk3YTdBSUlZKzdmTXgwSE11M2YxZGc1eEpnSm9GblRvQjNDWmYzanc2WWQyWE5ON3MyMWhBOU5SMjdTUGpadU9Pak1WZFRKdlZoM0R2cjlWaGI5a1ZMQ1VVN01qVmJXUFpVN0o0dFRzU0pXWGZmbFpFVEF5NFV3c2JTcHAwaUtLU21FdDd6bG1UYXEyRkovTm1uUkkwdDVkdloxcHprQUF6WUovYXdHNHpLblJ5UmMvYzJyc3RKdkdnWEYrT21wbmFwcU9KZDFHL2NhQnNTeXJJSUJCc3pLei8rSnVEUWEwSWhKV1p6aWtVSUQvNS9nRkxXTHNYeEV0WXBhVWx2UW1BaGdBellZUUJzQmxmdnUxZTh5bmhpL2NlR1pzZXE2YWgzWW5Bd0c3TjRUcHFKYzNIaytJR3JJYm5uRGR4YlF5TzlRV0RHcEZKS1RPY0ZBQmFoVzhUUWxpSE5wV1h3WXhmN0dydC9NeHpqb0F6WWJxRW9DaTN2bmFQYU0vZnViTWk2ZG1ZOHMrZjN0MU9tcGJBaGlmVDBjOUVVOG9VYS93b040aGhVdERFUzltTmFZbEdZYWhqbEJJSzF2QzZnZ0hxV0I0R0VHTS9Tc2lpTG5Na0tSM2M3WUJhRWJVa1FDVTlMYmJkLzN3NExHUi81RklWdEVPd2dQVFVZdnBxSmNzZXlhZTFMelpQRVBoV3V5UUxlc3pMVXNCdzFCSEpCUElSTU5CQnFCcnhyY1BRWXhEMitxYklPWXR1M283WnpqVEFEUWpRaGdBUy9yTlY5LzRENDhjR1hxUFpWazFCd0pNUjEzTjhvMlpqanFXVEdtR3FhaFJJOU95RkRRTWRVVkNXdGtTVW5zNHlFSHhFSUlZKzFkRUVDTkorc0t1M3M1dmNJWUJhRmI4Y3dwQVdUNzcvV05mdmVuNmphOHQ2d0pTNzI1SWhudTZJVGs5SFhVOVFxOWtPcTN4UkNvekNHdkpubENHSStzdTV4Y05PLy9LUm4zZW84WDN6N0MzYkp2M3I3STV3MHJOQUZWNnVVVGEwbnlLMFlhYW9yTElyRWtPYmFzblowMmFOS1N0dTNvN3ozQm1BZUMrQ2dETCtNSWp6eDY1NGNxZXJVdGVQQm94RGd6VFVkZCtETE1mMDZhbHNYaENhZXZ5Z2doaGJGaVdFR2JSOHJsemR6NWxLazdMSzM5WEdBbGlITnBXendVeGI5N2QyL2tKemlnQXpZenVTQURLTm5UdTR1NlRaeStPbDY2cHVYOGNHS2FqTHIzZGxxU0wrUUVNZk1kdGYxckx5cnhhZ3dHdGJBbHBSU1NrU0pDcWlTL2ZPM1JOY21oYlBkVTE2VUZKbitSc0F0RHNxT2tBS05zN1g3c25kdXprK2QxakU3TUpwd01CK3hkbU91cmxYSnhQS0VrQWcwWTk1R2ZmZTIzQmdGWmxBNWx3Z0FhN3J2b2JPVkFBUVl6OVcrYlNJQ1lsNlUyN2V6dHA4Z2FnNlJIQ0FLakkyKy9ZZmZMeHAwNi9jaTZXV0Z5UllqcHFtN2E3TWROUlQ4VVNpbHNrTUs1OWVHMHl1VW01MmtOQnJXb0pxeXNTVklnYWl6L2V5d1F4RG0ycjY0T1k5Ky91N1R6TUdRUUFoREFBcW5EUGEzWisvOUdqdzcrVnpvM2h3SFRVenUxbkhjcWVUU1ExNjd1cHFJazkvTUswTEFWa3FDTVUwdXFXa0xyQ1FkRkF4dU5uRjBHTVE5dnEyaURtYVVudjRjd0JnQXhDR0FCVmVmT3Jkbnpza2FQREg3Y3JQR0E2Nm9LZjFtazY2bmdxcmVtVWYxdUhFOFg0aTJsSkFjTlFWemlrMVMxaGRZUkRWR1M4ZW00UnhEaTByYTRNWXU3ZTNkc1o0NndCQUp1ZVRRQTB0OC85MTFQZjMzWGRGUyt4SXhBb2QyR21vN1puVzFLbXFkRlljdWtLdFdkblJ5cnpyMStuMlpFdUxkL2cyWkVxTDl1b1lmL3NPMzdMemNZV01LUjQydEpjTWtYdzVyV0tKTE1tT2JTdHJwazE2Yk83ZXp0L2hUTUZBQmJ3RHlRQU5Ua3pOdjJUSjRZdkROWDFRZGFoMzNERk9EQjFPb2FtWldrOG51U0JGYlpwNUh2SnRLUnd3TkRLbHJCV3Q0WVZEUVg1ZzNqbDcwNkxHSWUyMVJVdFlrWWx2Wk96QkFBV0k0UUJVSk4zdm5hM2VlemsrWjJuTGt6T1ZCTUlWQlFlTUIyMTdOcWw4VmhTS1JJWStEQVFNQzBwRWd4b2RVdFlxMXZDYWlPUXFjdHh0N3NBZ2hqN3Q2d0JRY3c3ZC9kMmpuS0dBTUJpaERBQWF2YXVueG00K09TeloxODRNVE9mcWlZUXNIOWhwcU5leXNWWVFnbUhaMElpMy9IUUE3Q1BqNHNscVRVWTBPcldzRmExaE5VYXBOcmoydmNoUVl4RDI5cXdJT1orU2ZkeFpnQ0FQZlYzQUNqcXIvN2xSM2UrZVB1Vi85d2FDUzE3YmFrNGJLaDRyQWwzeklia3RuRmdwdU5KVGFmTjhzdW9ja3lZcXZlRk1XR3FMN3ZNSHpnMUpreDE1Mm10KzFmNXpHeUdJVm1XTkp0S0s1SDI3NkRVbnExWU1rYU1ROXRhMXpGaTRwTDZkL2QyUHMwWkFRQ1g0MTlDQUd6emxsdHYvTW9qUjRiZWJkbmN5b0xwcU8wcGV6NlpXaFRBb0RhMFFQSG8zeTM3aDR1R2dsclRHdGJLU0VqaEFOVWgxNXdYdEloeGFGdnIyaUxtandsZ0FLQXhkWDRBVGVvejN6djJqL3UyYmZwNVd5NDg5WjROeWFmVFVTZFNhWTBsVXlyTXgyZ0o0K1RmdU1peXRJU3A3ZjFSNWdxcktUdGdTQ25UMGt3cXJaUkp4TmJ3Q2lZdFloemFWc2RieEJ3MnBGMjdlenVUbkFVQVVOOTdENEFtOTRWSG52M1I5cXZXNzZqcG9zTjAxTFpzaTJtYXVoQkx5cXltTEdPcFplMmJwcG9ReHFIdDhFa0lVL3A4dFMrRXlSY3dwSVJwYVNhVmtrbmpzY1pWTWdsaUhOcFd4NElZUzlJdGUzbzdIK1RkRHdDbDBmNFdnQ09HejAwTVBIZG0vRUs5SG5DcmV6eDNwaWJ1cHVtb1pWa2FpeGNQWUx5S05ncHdtbWxKSWNQUXluQllhMXZENm9xRXFEQTE0bHlsYTVKRDIrcFkxNlFEQkRBQXNEenFGQUFjOFk3WDdrNGNIN3F3Ni96Rm1WZzF2ODkwMUxZVXIvRllncW1vL2Z1SXloYld3YVZBcGlXc05hMWhkWVJETkNPdTUzdUlJTWFoYmJVOWlEa3I2ZmQ0eHdQQThnaGhBRGptYmJmdk92WERwMC8vMU14ODNHUTY2b0tmMW1FNjZvbFlRbkVibnl4NElBZUJndFFTTkxTbU5kTkNKaG9LY2xEcWNlMGdpSEZvV3kwN3kveXRQYjJkazd6YkFXQjVoREFBSEhYUGJUc2ZIRHc2L0wrU3FYUjV2K0NpY1dBcVZlazRNUGFWZmJuWlJGSnpEQzRLT1BaUWJVbHFEUVcwdGpYVFFxYU5RTWJaMElBZ3hxRnR0U0dJc2ZTTlBiMmRYK1JkRGdEbElZUUI0TGczdjJySHB4ODVNdnlSY3BaMTB6Z3dYcDJPT3A1TWFUckZhS0lOZmVLcWNYM0VaOTU3QzdYbkJUS3RRYXBYanJ5dkNXSWMydGFhZ3BoWlNXL2gzUTBBN25nT0FJQkZQdmVERS8rMjV3VjlyMWpxaXNSMDFMVnRTeXB0YWl5UmttbFo5cFZkNVRUVlZYZjdzbTJHcERMZklZWlRmL2NTeXpvd1E1SlRzeU5WT2o5UzNXZEhLckZTUi8rT1J2bkxtWlkwbTB3cm5pWVV0Ylh5eWF4SkRtMXJWYk1tdldQUGhzNC80MTBOQU9Yalh6VUE2dWJzK015cmpnMmRmN1pVM2EvdTNaQ2NmamlzOVFtL3dsOHhMVXZqaVdUWkFRd3VaN0ZEZFZ1ZjM5K2xscFdwWkhXR1ExclhGdEdxbHJCQ0FhcGR0dnp0YVJIajBMWlczQ0xta0tTLzRCME5BTTdWN3dHZ1poLysycUdPSFZldlA3V3hlMlhYb290UnhZUHh1cU1iVWtWdFFRem53aUJMMHRoOFhFbXIwdU5ZMlVKK2J3bGo3OSsveExMMWJBbFQ0LzVWM0JLbXdoWFkwOXJIblMxaFNyMEREVU5LbXBabWtpbWxtbnpjSmxyRTJMK2lPcmFJU1V2YXUyZEQ1eUZxTmdCUUdmNGxBNkN1M3ZIYTNUTkhuajgvTUQ0OWw2em1vY2FwaXJ2VGxXMm5wNk9lcUNLQWNSUGE3cUJaV0xrcHJ5TmhyV3VMYUVVa3BFQ1Qva3VNRmpIMnI2aU9MV0wrZ2dBR0FLcERDQU9nN3U1NXpjNFRqeDAvZGVkOFBHa3hIWFh0MnpJVlR5aEdpZ0Y0am1WSjRVQkFxMXNpV3RjV1VWYzQxSFFWTTRJWXQ1YTVaQkF6Sk9rUE9ZTUJvRHFFTUFBYTRqZGZmZU8zSGprNi9MdFdCYzN4bVk3NmNuT0psR2JUSkRCby9NTWthanZXbGlXMUJBTmEweHJSdXRhSU9zUEJwdWt6VGhCai8wb2NEbUorWTgrR3psbk9jQUJ3NGprQ0FCejJtZjg0ZXQ4TCt6Zi9VbmtYTFBkTVIxMzJ1QU1PdG9LSnA5SzZtRWpWVk5sMnk1Z3dpNVpuVEJoN3Q2T21HWklZRTZhTTFUbDIzVElrV1lZMGwwcHJOcG1tVWxwRkFaNGRJOFp3eVRHOXZKUXYzTFNoOCtlcHZRQkFvNi9OQUZDREx6ejh6S00zWHRNN1lNUGpkT21MbTgrbW8wNlpwc1ppU2RreDhXMzFVemdUd2xTMWo0UXc5dTVqaVZURXNUQ3RRWU9JRzVKTVNYUEp0T1pTL2cxa0NHTHNYNG1OUWN5a3BPdHYydEI1bHBvTEFGU1A3a2dBR203a3d1UXRUNThhTzF2am8zVDlIcUlyVHl0czNSYlRzblF4bHJJbGdQRTNPdDdBWCs5bVExSTBIRlIzVzBScld5TnFEUVk0YThzb2dLNUp0cFh5ZXdRd0FGQTdRaGdBRGZmMk8zWW5qZzlkdVBIcytQUjg4U1U4Tmc1TUZhdXRaTm1Mc1lSU0JBd05mMWdDR3ZtZURoaFNWeVNrbnJhSTFyU0dGUWtFT0dlWEtJQWdwbVlQU3RZQnpqNEFxQjBoREFCWGVQc2R1OC8vNk9rekw1bWFpeTlxNE1GMDFJdE54QkpLa0NyQU80L0RxTU5mS0dnWVd0a1NVazk3Ukt0YndncjdJSkFoaUxGL0pUVVVrNVQwcHBzMmRIRkJBQUFiRU1JQWNJM2Z1bTNuWTROSGgvOUhNanZlQWROUkx6WWRUMnJlcEE0TUh6ODRvNlpqYlZsU0tHQm9WVXVtaGN5cWxwQkNBWVAzVTFsbEVzUXM0UU0zYmVnNnpGa0hBUFlnaEFIZ0ttOSsxWTdQUFhSNDZIMlpyNWlPT21jK21kSk0ybHVqd1BCQURqVDIvQXNIQWxyZEVsWlBXMFFyVzBJS0d0N2NEN3QvbVNDbUlrOUplZzluRkFEWWg5bVJBTGpTNTM1dzRwc0QxMis4cmVvTG1ZK21vMDZtMHhwTHBHUTVWTXQzYW5ha1NvKzEvYk1qTFN4WnlleEJYcHdkYWNubGpWci9McFZ0aWVIejJaRXFQYzhOQjhQa2F2Y3hsalkxbGZEV3lGS0dBNy9NckVsbGVjVk5HN3J1cDFZQ0FDNjVwd0dBazc1eThQbGpOMnpwZVVIRkZ6SWZUVWVkTmkyTnhoS096b1JFQ09Qa2U2VElzb1F3TlljSTVhelFQU0ZNK1d1b1Z3aVRZMG1hVDZjMWswaDdJcEFoaUxGL0pjc1U4NW1iTm5TOWtkb0lBTmlMN2tnQVhPdTVNK00zRFoyYnVPajRRMXhWeXp2ZkRjbXlMSTNIRTB4RkRjQ3hoL3IyWUZBOWJTM3Fib3NvR2c2NmVudnBtbVQvU3BZb1psVFNiM09XQUlEOUNHRUF1TmJiNzlnOTgrUnpaL2VNVHM0bVNqMUFsUGZONmg1T0t2bXBFMkhReFhoQ0tRWldBZUF3UzVrV1R4MmhrTmEzWndLWjlsRFF0ZHRxOXk4VHhCVDF6cHMyZEkxeWRnQ0EvUWhoQUxqYVcyL2Y5ZHloRTZkdW00c2xsNjl1K21nNjZzbFlRbkhYTjRFaElRTHZOajhlWjhNdzFCVUpxYmU5UmV2YUltb05CZnp6WGlDSUtXZGI3NWQwSDJjREFEajIrQUFBN25mZ08wLysxay9zdlBJdmdvRkE2WXRYeFgzK3ExbmUrWEZnWmhOSlRhWHFsOEJVUHlaTVJVZXIvTzB3N0R1V2pBbWptc2VFcVhSVUdLZkdoQ2w5M2pNbWpOM1h0V0xMRzVLU2xxV3BlRW9KMHgwSk1XUEUyTDhTUTRwTDZyOXBROWZUMUR3QXdCbTBoQUhnQ2Z0L3V2K2pEeDhlK2xRMUR5cjJWWmFkSHdjbWxrcHBPc1VvTU0yRDloM3d4cnZCa2hReURLMXVEYXUzdlVWcldzTUtCd0xlUFY2MGlDbFY1aDhUd0FDQXMyZ0pBOEJUdnZEUU13L3V1bmJEQzh1OWtqbnluK0xzbDNhM21FaW1UWTBuVWpLdCtqNktHUlV1WUZSLzFNcGJ0cWxhd3BRdWdaWXdaUzd2bzVZd0ZidzluTHUrR1pXWG5VaWJta3ltbERZYkV5UFJJc2EybFJ5V3RHdGdRMWVTMmdZQU9JZVdNQUE4NWRUbzVDMG5Sa1pIN0g1QXFiVEdhL2VEdW1sWnVwaEkxajJBQVlCYXRRUUQ2bTZOcUxlOVJTdGJ3Z3JVK1Y5OHRJaXhiZlBlUkFBREFNNGpoQUhnS1crN1k3ZDVZdmpDcnRPalU3TkxMZWVsNmFndFNlT3hoTkxrTDQxaHVYTjl2QjM4K3hid3M3WmdRRDF0TFZyZjNxSVZrVkRkbWx3VHhOUzhrZ01ERzdvZTVCME1BTTRqaEFIZ09XKzdZL2ZvajU0NTg2S0oyVmphanZJYVBSMzFSQ3l1cE5zSGcrQ0pHSzU5ZjFxOFAxM0lrTlFlQ21wOWV5YVE2UXc3SDhnUXhGUzlrak9TZm85M0xRRFVCeUVNQUUvNnJkZnNmT0xnc2VGZmpDZFRWckhLdjFOUEZYYVhQUlZQS01ZNHZPNTZwbWVINnJZKzhvem1lRjhia2pyQ21VQ21weTJpYURqb3p2MXMzaURtbm9FTlhaT2NKUUJRSDRRd0FEenI3bGZ0K01KRGg0ZisyTXI3VDdpWHBxT2VTeVkxU3g4a0FJMTRXbS9RK2dLR29SWGhrRFprQTVuMlVNQmR1OUI4UWN6WEJ6WjBmWkVURFFEcWg5bVJBSGplMy8vbjhYL2V0MjNUejFSNlVYTnl0cERsbGsyazBocFBwRnpSRXNDb2NDR25aa2RhdEx4aDAzYVhPemRORFRNazFUNERsR0Z2MlRidlg4V3pJMVc0QWx2MjBURHNlKytWczJ6RisyZlV0aDJHemVkWEdXOFF4MmFYVXZFWm9GS21wYWxrU3JHVWZVMERtVFZwMlpYTVN0bzJzS0ZyaUpvRUFMaXM3ZzBBYnZmbHdlZWUzSEhWK2h2c3VmZzVPeDExMmpRMUdrdktMYjJRQ0dGRUNMTk15WVF3eTY2dTFuZmcwdHZoZUFoeitVbGU3eEFtWHlKdGFpcVJWc0tzL1NwSkVMUGtTdDQrc0tIckk5UWdBTUNGZFc4QWNMdVBmUDFRcFAvS250Tlg5cTVlMDhpSGtlWEt0aXhMby9NSnBieDJJeUNFc1RkRWFIQUlVMmtzUUFpejdPcHNPNEtFTUl2RnM0Rk1zb1pBaGlEbThpL1Nsbjc4aitlbWI1OUxXeW5wMHY4RTBzcDBZTElLdnFmczE4VytaMGt5RHd6ME1ib1pBRFQ0ZWc4QWRmZlJiejYrY2VENmpVK3RXeGx0c2V0QnhPNEg4ckg1dUJJdUd3YUdFRWFFTUxaRkNJUXd0UjVCUXBoU1B6STBuMHByTXBsUzJxejhJa29RcytpTDlJbTU1TTk5LytMOFlRZFdkU21ZeWZ2YzB1S0FwekRzTVpmN25KQUhnSitFT0FRQS9PTEo3blduOU5TcFYvMUUvNVlIb20yUlFFMFBJUTQ4akUvRUVxNExZSlN0NFpMSWM2dzUxbkM3dGxCUWJhR2dMRm1hUzVtYVRpUlY3dGptTmIwZlN2eHk2VEtyWDV0VDc5djhjbWRUMW1jZENtQ2toVWsvYkowQ2EvL2dTRzQzOGdPYXdwZFZ5ZmNKZGdBMEN2VVRBSFczZjNERXlGYlVjcS9sdmk3bmU1ZXVaOXVtcG43aDF1MmIvemdVREZSNDBYT3VHOUpNUEtucHRIdnJlNVcwRlBGV1M1ak1rbTVwQ1hOcGVWckMyTHVQSlpxbU9OYWlpWll3OW01SG1TMWhpakV0UzNPcHRLYktIT2k4MlZ2RVdOTHBiNDNPM25ZMmtaNm5OcEk3SkNWRG5jSlh1dFRQQ0hRQXVPRWFEOERmb1VsaEVCSXNFWTRFU3dRb2pydHBidWJkTCsvZmZGYzlIa0NXSzNzK21kSkVNdTN0bTRISFE1aEtRd3BDbUdvakJFS1lXbytnRjBPWW1vOTFEU0ZNdnJSbGFTNloxblJ5NlVDbW1ZT1kwL0hVbTc0OU52YzlhamFPV0Rhc0tmalpvczhKY29EbVFRZ0RORWQ0RWl3U25nU1hDRmFLQlMyZTg1T3AyR2YzWG5mRnZrb2ZQdXg4ZUV1bU0xTlJtNWE3anhVaFRIMGUzb3VIRkc0UFlhb0lFUWhoYWp0K05ULzRWN084OTBPWS9LVlNscVdaWkZvenlaVDlGV0NQQmpGeDAvcjIzNTJkZmh1MUkxZGJNcWhaNm51RU9JQjNFTUlBN2c1UWdpVUNrM0pEbGFZK3h3T1dHWGhOV04vZHRtbmRGWlU4ZmR2MThKRTJMWTNGRTJXUFdlRHFtd0VoakwzNzZPTVFwdEtRZ2hDbWpPMHc1UHg3eEdjaFRMNmtaV2s2a2RKY0ttMWZKZGhqUVl3bFRUODBHYnYxNkd4aWxCcVdyNlYxZVZpVFh1THpYSUJqY2VnQUY5VzdBVlJuLytCSXNZQWtxT0toU2JIUE9UOXRFSTNITzErM0p2cTlqZDByb3ZWODhMQWtqYzdIbGZKSXRjYXBFS2JxaHpOQ0dIdTNneERHM3UwZ2hMRjNPeHdPWWZJbFRGTlR5WlJpS2JQMmlyQ0hncGp4WlBxUHZueGg5dlBVQ3JCRXRhVllXRlBzbFF0dTBodzJvREhYZE1EWDhscWpGSVlvcGI1SGlPSkNHMlptcjNuTmxldSt0cnF6TGJoY3NtRFhBODM0ZkVKeHl6di9XQ0tFcWMvRCs2WGxIUWhobGc0cGF2MjdFTUlVTHV4b2Q2NnFRb3BhOTdFNVFwajhoUkpwVXhPSmxKSzFESnJ1Z1NBbVpWbVAvOTNaNlY5TVc2SzFBK3hXTXFRcDlpSzRBV3E5RXdBZWttMlZFdFRsNGNseW9Rcm5pRTljTXpYMTh0ZHMyL2l4MWtqSUtQWFViZGZEekZRc29WblRXM1ZkUWhpSHdvOVN5eExDMkJzaXVENkVxVEZFSUlTUkV5Rk1ibGxMVWp4dGFqS2VWTEthYTdlN2c1alU0ZG5FNng2ZWpEMU5UUUF1a1F0bFVrVStOL08vVDJnRHYrSUJFNTVTMERLbFdJaFM2bnVBZGt4UDczL1ZqczN2Q0JpR1l3OGNzNG1rcGxMZUd4dVBFTWFoOEtQVXNvUXc5b1lJaERBMjdLTTdReGhiamwrSmhZb3RhMG1hVDZVMUdVOHBYVWxyUnBjR01UTnA4MlAvZUc3bXo2a0J3TU9XQ20zeVAwOHh0ZzE4VSs4R25GSWlVRm51eFhzV05YbGhiUGJETDkyMitUVk9QR3pFVXlsZFRLUTkyZDZiRU1haDhLUFVzb1F3OW9ZSWhEQTI3S1BiUXhnYnJ6ZGxkajgxTFV2ektWTVRpYVRLeW1OY0ZzU2tMWjM4NnVqTUhSZVRacHk3UDVwRWZrdWFKVDhTMk1EVjlXNmdYUHNIUnlvTlZBSWNOVFRDSzgza1YzWmYwN3ZWem5GZ1VtbFRZL0drdkRvL1pQVWhURVdQZHVWdkJ5R012ZHZoa3hDbWRFaEJDRlA3UGpvM1J0YXl5N28waEZuMFpHZFptazJsTlJWUExSMjB1eWlJR1lxbGZ1WGZ4dWNlNXE0UEZEK3R0VGlZeVgyZXpQOGVVMytqSWZWdU5LK0NjVlJDV2h5Z0ZINU5LeFY0UmppZGp0elJIdnFQYS92V3JMSGpBZEMwTEkzR3ZERVZkZFUzQXhlR01KVSsxaExDMUZLMjRkanNRWVF3dFlVVWhEQlZiSWRSMjNzdlpWbWFTYVkxa3lnUnlMZ2dpSW1aMXBmLy91ejA3M0hIQjJwbXFTQ1lFV0VObks1M3cxL3lXcXVFU256TS81ejNCM3hyOWR4ODl4MVhyUHh1NytyT2xsb3ZtR1B6Q1NVc2I3ZHFKWVJ4S1B3b3RXeVpUNkdFTUdVdVR3aGp3ejRTd2xSVGRzcTBOSjFJYVNhVkxtdEQ2aEhFV05MRjcxMmN2L1daK2VRRWQzdWdiZ3JEbXFRV1FwdGNVSlBpTUtHMkt6NWNJOXRpcFZTb1V2aVJ2em1RdFhsNmV1ZnQxMjM0aDg3MmxtVzd4cFU2Y1M3R0VvcVozdTlXYkZTNFFDWGp3aERDRkZtV0VNYmVmU1NFc1dFZkNXRnFMVHRwV3BwTXBEU2ZDMlFhRk1TTUp0UHYrdXFGMmE5d2x3ZGN4MUpCTUtPQ3dJYWdwam53UU81aWVlRksvaXRZOEhtWXZ5TlF2YTNUMHovejZ2NU43NHVFZ2hWZktLZmpDYzJrL1RHdUd5R01RK0ZIcVdVSlllemRSMElZRy9heCtVSVkrL2R4WVltRWFXb2lubFRjTkNzc3E3WWdKbWxaRDMzMnpQUWJ1YnNEbnBZZnp1UmVsOElhdWo0MVFiMGI5c3ZPQ2hRcTQ4WGZCNDJXRzBDNTJCaEFJUzBrK21iZXg5eVVnY25zejExdnorek11MTY1WTh2L3JPUkNPWjlNYVNLWmJwNmJRYjFEbURKLzBiWVFwb1lIczZyMzBZRnhZUWhoSENpN3hJS0VNRFllYXgrR01MblBMRWx4TTYySmVFcUpna0RHZ1NBbS9zUk0vSTZEVS9HVFZGOEFYOHZ2OHJRb29KR1VQRERRbCtZUWViemVqY3BrQTVhd0ZvY3BoVjhIT1ZLb1EzZ1N5YjczY2g4TFg1Rzg5MlpFaTF0YTVVS1ZPVW56MlZlc3lNczNGL21mU01iKytvWFg5OTFTemtVeWtVcHJQSm1TNWFQSkRXdDdjQ0dFSVlRcFVyWmgvN0ZiZWg4TjU4b3ViM1cxdmdOTGJ3Y2hUQlV4aVAzbmVqVWhUUDRYbHFUNVZGb1RpYVJTMlc2c2RnWXhVeW56ejc1NGZ1WVRWSUdBcHBjYm55Yi9sY2g5enZUY0hxbDNZOEgrd1pIQ1lDVmM4RG5UTHNQT0lLVWw3eFhKdmxwS0JDejVueTkxYnFja3plUUZMSE5hSExiTStpbGNxY1R0d2ZSMys3ZjBiRnpxQXBrMlRZM0d2RHNWdFRNUEx2NExZWng4QUcxSUNGUGovamtad3RpMmo0UXdOZTdqNVcrUXVvVXdaZStqWWQ5Mk9CSTBHV1h2bjJsWm1rdWxOWmxJeVN5WjZKZS9kV2xMVDMzcC9NeWRNMm1UOFNRQUxLZXdxOU9sRjJQU3VLamUzVXoyRDQ0VWhpcjVuOU5GQ0xYSWhTbnRSY0tWL0krNXoydHBNUlZUSm1qSmY4MW1QOFo4Y2p6elcvc1VhM1VXekR1SGd3WG5kSzVMVmE3clZFSlNLbUtheG4vcmlueDhTOC9LOW1JWFNNdXlORHFma0IvdlRvUXdoRENFTUM0T1laYjRkVUlZYjRZdytVekwwbXdxcmNsRXNrZ0x5N0syMEhwa0t2WW5oMmNTeDdJUFZ3a3RUS05iT0V0TDRSZ1RBTERvZXFMRkxXY1N1YzhKYUFoaGFnbFpBaXJlSllPUUJkVnFrOVNhZmJYbGZWMzQwWWxXVW5GSms1SW1zaDl6TDY5Y0pIT3RmVnExT0l3cTFjSW4vK3VsanFlcFRPaVVhOWtUMCtVdGZvcUdVZXRuNXpiZnZubk50OWF0aUlZS2Z6WTJIMWZDcHcwNDNSTENsQTRwQ0dFSVlRaGhDR0c4RThKVWNJb3Yrbkhhc2pTVFRHa3FrY29iVkczcFg1NU1tVi85VXFZYlVwc3kvK2pKMVVVNnNuWGI1UjYyRm5WVktQSjU3aFhQZXlXcC9nRk54eXdXemtoS01GZ3dJWXoyRDQ0RTh4N1dDaC9nR0k4RmxZcGtLektkMlkvdGtxSjVIK3ZWQlMwdWFTejdHcytHTGZNdVBGNkJ2QXBnZm1Xd1ZZdGJBTFhZY0Q3T1M3b29hVnFaVmo2NWozT3FZVkRncTZlbVgzTDd0cjVQdGJlRUwxMGpKMk1KelpuKzdVSkxDRU1JUXdqVDdDSE01U2M1SVV6OVE1aDhLZFBVVkRLdG1XU3FaQUdtZE9IKzhibFhEOGRTMHlXS2JzdldWVHF6SDdza3JjcldaMnA5R0l0cmNUZ1QwMEkzNTl3L081cTJpelBRWkZKNTRVenUycENnOVl6UFFwanNBTGlSZ3JBbFF0Q0NHclJJV3BGOXJjeFdWRHF6MzIrVU1Va2prczVsd3dhM0NHZVBVNWNXQXFwb1h0amk1UEU0cTB3SWRWRU9obEE3WnFiZmVPdjJ6YjhmREFRMEZVdG8xdlQzR0dhRU1HcTZFS2JTV0lBUVp0blYyWFlFQ1dGSy9jaXdiMXM4RU1Ma1M1aW1waE5wemFZVzV4bm5FK2w3dmpFNis2OVZYUFpEeW9ReHF5WDFaRjlPL1ZNcHFVd3drK3NXbmZ1bnlZVDgwMFVhUUhHNWJ2K0VNelhjTStzdUc3WVVqcHVSQzF1QVdxeVExQzFwYmZiVjdxS0wxVE9TVG1RckxHN1FLbWxEOW5pdFVlMy9RYXZVR1VtSHNoVzN1cmw1ZnZaOU83ZDAzeGtQQkl4bUdFYSsrdG1EQ0dFSVlZcVVTd2hUOVJFa2hDbjFJN2VITUV0c3JXSGY4WXVicGlianFmUjBLdjJEKzg1TXY4bW1XMENMcEcyU3JxdnpyU2N1YVZUU0JVbW42bjJmQjlEUTU1MzhjQ2FtSnVyVzVKb1FKcTlsUzJIZ1F0Z0NPNjJTZEZVMlVHaDM0ZmJGSlQwZ2FjcEYyM1NqcEJjMCtIcHhRdEtQcFBwT1N2U3p2VjI3T2kzckRRZW41cjhWa2lJR3JlenFlNk1wNXhlTlFMd2pFbXB4ZER2OGN2TTFhdnRsbzVtUG5SdTIyMmplNDJjNHNmVkdZNDZkbGVrcWExbVdMRXV5TEZteUxKbFczczlNeThvc0kxbG1kamxKTWkzTHRDUXJKYVduRXVuWVJDcDFZVFJobnJieFVHK1J0Sy9CZis3VGtuNmdHcm9VQS9DMHd2R240bjVzTlJOcXhFcnpXcmNVamhIQm9MaHdTalJic1Zqbjh1MGNsN3NDR0NuVHhhalI1K1oxa3Zva25WU21POUtZSE81ai90STEwU3UyZGJiK2xTR3RtUXNFbnZ1bjA1UGY0alJ5OC8wYUFId3R2NnRRN2g4U3VYOWF4cXNzMDFDbVZYQ1BNZ0hNU3BmVU9RQTByMXl2bDg2ODdDQ3RURXVaUytOUEhSam84L1RnNEk0L1dCVUVMcmxYaFBjWDZ1emxjbjhBazNOQzBoTnkxMEIyWGNxRUlEM0s5QjhQTlhoNzBzb0VWaGUwTURQVXRHejZ6OW5WMFVqSGY5K3c0dk5CdzdnMlYrRjk4T0xjLy83dWhabERuRW9BZ0RvcEZyd1VTaWpUZXFRYzdjb0VMU3VWNlZxODFnVjFjak43SDg5MVI3ckFueDFBbWM4Q3VRSEFZOG9FTTU3cHltUjdDSk9kbWFod2VsNWF1S0RSZHFuKy9aeHJFVk5tWEpobmxSbk16bTNYalU1bGdwa1Z5b3dQMDZHRmdYa2JKYVZNSzZKSlpmcVVUMmxoOEwreUE2MjJZQ0I0ejVWckRyUUVqSmNzdXRKYm12djIrYW0zSFpxTW5lUjBBZ0E0SktqTVB4U01DdTVkK2Exb0ExcVlEU2szY0g1dXdvRkdkdkdQYTJGdzN0dy9UcWF5TDJaUEFtQ0hoUEtDbVFNRGZYRzNibWpONGNqK3daR0FNc2w2N2tVckY3alZGbVhHTmxucHNlMGVVK2EvWEdlVStXK1JtL3RKQjdQWGdmd2d0clhFMS9VMHAwd2dNMXZrTlo5L1ROOXgxZHAzZDRRQ2R4VzlzcHZXbWMrZG1uamIwSHh5Z3RNSkFHQ1RnQmFDbDNMK2s5dFM1RjQ3cDB6NDBpN25aamtxSnFuRi80MmV6L3VZQzE3bXM4c0JRRDJaMmV2UG5LVDVBd045cnBtTnJhb1Fadi9nU0d2ZWhiNVZ0SFNCdDZ5VXRGRUxYV3U4OVA2Tkt4UEtqR1kvT2o0MmlvTVZ6aFl0VERHZkd4Y3FVdUtWKzVrVDNhRE03TVY1N3ZXOUsxNjByYlBsbDVkYWVEWnRIdjdreWZFL21FNlpUS3NKQUtpbERtN2szWWR5d2xvSVdmSzc4K2UzTUM4MlNIeFN0WTBwbDV1cEpKNHRhOUYwc2dXdmVONUhXckVBOEFyWGhESmxQWHhteDNWcDEwSzNBMllJZ1YrRWxla1R2VXFaUUdhVjNEbHJVaW1XTXExalJpVmR6SDd1NTZhOWhqSkJUTGpJSzVUM01WTGsrOEhzOTRQWjE2SkE1K1pWN2RmKzlMcU9YeXJudW5ocVB2bllwNGN2ZnRyS1RxZW54YU80TTZNREFLQlE3aDhLYmJwOE50Q1d2SjlWVXNlMnN2ZjdWUFoxVVpsV243a1FKWm45ZnY3SHdsZnUreVovSWdCTjV0SS9ZaVhOMW5PdzN5VWZOdllQanJRbzA0KzBVd1F2YUs2S1VwY1crbEYzWmw5UjFiZUpiN1VzWmZwYVR4Uzg1dm5UWGlZc0tmU1RhenV1ZThtYTZOOFlsaFV0OXhlZm5JcmQvODlucDc2dmhXREl5RjRuVTNtdi9IQW1vWVhRSnBiOU9RREF1NEphSEtJVXZ2TEQvOXdZTDdsS2ZtNWF0MXdBa2d0VDBubXZaUGFlbmlyeXM1UXVELzNUeWd4dVM2QUNBSlZMS0R0Y3dZR0JQa2ZINUx3c2hNbTJldWxVcHN0R0szOExZTkg1MHFxRlFXaHpyM1psL252VnJzYlBHclNVcERMaFRQN0F0Ym5CYTV1MndyWnpSZHVhMS9SMGZqRm9HQnNrU1ZaNURWa3NTVCtlaXQzN2xiTlQvN0hNZXlha1RIZ1h6SDRNWkwrWFg3R09VMmtHQUU5bzFVSUx5MEQyR3A0TFVmSS9XbG9JU2VyWlFuSkdtZGF4QUlEcXBaVUpaR2FVQ1dWc3ZZNHZDbUgyRDQ1MEtUTmxYWmpqRGxRbHJFd2dFMVhwUVduYjVLNnd4dExpMllSeU13ck5LTk42eHJmaFFIZExxT1hYTnEzK1REaGc3RnA4Uk1vT1lsTC9NVGI3Ty84NU5udUV0ejRBTkRXajRHTWo3NTFubFdseENRQ29uWm4zZkRSblJ5QmpTTkwrd1pHd3BQVnE3UFN5UURQSk5XRnUxVUsvOE56bnBRYXBiVVNYd0Z4ZnlmeHdaamJ2YTgrT1BSTTBET01kVjYvOVVGc3djUHRsUDdUS3Y3YW1MVTErNWV6a1d3OVB4OC93dGdhQXBoTW91R2U2UVZLWldSVVpvd3dBN0pWV3RqZEJMVk5nRy9zSFI5b2xiWkEzeHJvQW1sbXViM2x1UnFGeVgyRUh6Ky9jQ09PNTZaN3pQNStWaTBPYWU2NWFlOC9LY1BBdEpSZW9JSWlKbWViSnp3eFB2T05jUERYRDJ4UUFmQytnekQ4eUxibTN0ZWhGWmJvZkF3Q2NFVk5tM00zcFNsdkhHUHNIUjY0V2crNENmbGM0bzFDbzRIdVJndS9senpDVS83MUtyeFZ4TFE1bGNrRk43cFZveE1INHRjMnI3N2lpTmZ5aFpSZXNJSWlaU3BtUEhYaCs3SS9tVFN2SjJ3MEFmQ2VnVE9oaXlCdmRkQzFsV3NOd1R3SUFaNldWbmFYMndFQmZXZmNIWS8vZ3lKVmlEQmdBNVZkQzg4T2JYRmlUbS9ZNTk3MkFGb0tkZ0JhSE9Qa0RHaXBiUVp6VFFxdWF3cGV0c3dpOWZzT0tYZHM2V3orYjNiNWxxckNWdGVRK0gwOTkvUk1ueC8rU3R3a0ErSUloZDR6eFVxMllNdVBEQUFDY1p5clRNbVo4dVRERzJEODRFbEZtUEJobVFnTFFLTG1tM2JsWmhQSS96NTl0SWxsTFJmaWxhNkpYL01UYWppOGEwdXF5ZjZuQ0lPYnB1Y1FuUGpjeThXWCtwQURnU2ZrRDdPYlBjT1JWbzhxTTRRWUFxSSswcEhGbFdzWllTOTFvdEg5d0pDcXBTNWxaWFJnZkJvQ3ZYQnR0NmZ6NUsxWjhQbWdZMTFUOHl4VUdNUWNuNXYvb1crZW5IK2FvQTRBbkJQTHF4Ym5wcGYzQ2xIUktIaDVJSHdBOEtpN3AzSUdCdnN0bXF6TUt2N0YvY01SUVpwYWs5dXpIRmhIS0FQQ3d0bUFnZU05VmF6L1pFakJ1cWJxUUNvSVlVNHA5NS96TTJ4K2RtSHVXb3c4QXJ1VDFya2FWbUZHbVJRd0FvTDRzU2FNSEJ2b3VGdDZBbHBYdHNsUTRaYTZUTTY0QWdHM2VjZlc2UCtvSUJkNVEyeVcwc24rTUprMXI5QXVuSjkvMjlGemlBbjhCQUhDRlhQQmk1VldPbThVNVpjWmVBd0RVMzdTa3M3bnVTVVl0SmUwZkhNa054SmsvMjByKzRKdTV3VG9Cb0NIZXZHWE5MNjFyQ2YyaExZVlZHTVRNcGMwVGZ6MTA4VjBYaytrNS9oSUEwQkQ1d1l0WFpqWnlRa3FaYmtrV2J3a0FhSWlaQXdOOXAzTTNKa2RsdXpmbGh6SzVqNEc4ajRFaTN6UDRPd0dveGM5dVdORy9yYlAxMDZxaTFaNWxhVmJGK3RCWEdNU01KVlAvK2ZIbnh6OWU0d05FWUpsOU1MUzRhVDBBTkx0Y1hkSlM4d1l2aFNhVm1VWVZBTkFZNHdjRytrWmRXMkhQQzI4S2c1bkFNcCtYK3BsRTl5bjRTK0dzRFdhUnIwc3RtMTdpWjhVcXJFdDlYZW55aGV2WEVoWGtKUWRJWEc3Nk4xeTZudVptbkNxbVdQQ2R1LzdtUDh5RUNuNGVLQ2dqLy9kREJUL1BENUVLcjhtNTM4MS81YmVpREJiWnBtQ1I2enNBQk1xNHJ6Ujd2ZUdNcEFTSEFnQWE1bVJUL3RkMC8rQkkvZ05BNFFPQlVlSVZLSEdUTC96dmMvN0R6RkkvSzFhV2xpaFhTendBTGFkZS95RTNhL3hkcThyeWw1cENjcWx5Uy8xZXVvemx6Q0xMbURiODNwTEJDcUVEVVBLNm5ndHo4Z09jWEhBVXpydHU1Z2M5Um5hWi9JK0J2RElDZVQvTEQ0eG91UW00QjhGTFpSS1NUbk1ZQUtCaHBxZzRBZ0JRby8yREk3bWdKaGZtNUxyZkZuYTNYZXFWdjN6aDczSy9CaFlFMUp5RDY5cGxYTklVaHdFQUdpSkZwUTRBQUpmTHR2UUphR0VnL01Md3B0ajNDai9QLzBnM0xuaE5mcXZlcFZyQVlubVdwQkVWRy9jTUFGQ1hHeG9BQUdnaTJYSFhRbG9JZGNKYUhPZ1VmbDM0dmR4SDZoRndVdjdndWdRdjlwcVRkSjdEQUFCMVoxSjVBZ0FBVmNtT3NSYlc0akFubFBlOVV0L1BCVGxBSWNaNHFaL3p5b1F4QUlENm1TZUVBUUFBZFpkdGpaTWZ5a1IwZVhnVEtmZzZGK1JRZi9HWFhGY2p4bm1wcjdTa1V5THNBb0I2T2tjbEJnQUFlRXAyakp5SXBKYnN4MkRlNTduUUpwTDNOVjJuM0NsLzZuckdKMm1NS1dVRzZnVUFPQzhsNlRrcUpBQUF3UGYyRDQ3a1FwbGNNRlA0ZVM2OHlZVTUxSkdja1QvT0N5MHczT0dNcERpSEFRQWNOM0pnb0crT0NnWUFBRUNCYkd1YlZpMXVjZE9TZllVTHZrZDlhbW01S2FVRG9zV0xHeVdVQ1dMb0JnWUF6cmx3WUtEdm9xZzBBQUFBMUdiLzRFaElDNEZON2xVWTRPUStieFlNc09zdDQ4cDBUUUlBMk85U0FDTVJ3Z0FBQU5UTi9zR1JYR3VhM0tzMTcvUDgxalplWk9SOVpFcHBiN0dVR2FRM3hhRUFBTnVZa3M0ZEdPaWJMbmF6QkFBQWdBdGtaNDdLRDJyYUNqN213aHMzMU9NQ0JRL3lCQy9lTlMvcEhJY0JBR3dSbDNUbXdFQmZvdkFIaERBQUFBQWVsQjFzdUZVTHJXbmF0TkFWS2hmVUJCMVl0WkZYaHlSNDhaY0xrbVk1REFCUU5VdlNtS1NMQndiNnJGSTNVUUFBQVBoUWRyeWFkbVVDbWJic3F6WHZGU216cUZ6d1l1VlZNdUUvcHFRUk1ZNFBBRlJqV3BueFgxTEwzVkFCQUFEUWhQWVBqZ1MwRU16a1FwcVdndTlKbVc1SFBKZzNoeGxKb3h3R0FLam91amwyWUtBdlhzN0NoREFBQUFBb0tqcytUYXNXV3RPMGEzRkEwOEpSOHFXemttSWNCZ0FveVZLbTVjdkZjc09YSEVJWUFBQUFWQ1hia3FaZGkwT2FYRkRUcHNVRDk4STdrcEpPaTI1bkFGQW9KV2xTMHVSeTNZNUtJWVFCQUFDQUk3SlRjbmNvRThpMEYzd01jWVJjYlNMN0FvQm1aeW5UNVdqcXdFQmZ6WU9YRThJQUFBQ2c3dllQam9RbFJiWFFlaWEvRlUyWUkrU0toNDdUeXJTS0FZQm1OS2RNbDZQcEF3Tjl0bzJMUmdnREFBQUFWOGtHTkIzS2hETFI3S3N0KzVINmEvM0VsQmtmQmdDYWdTVnBYcG5nWmViQVFGL2FpWlZ3RXdNQUFJQm43QjhjeWJXWWlSYThJaHdkUjR4bEgwZ0F3STlTa21henJ6azdXN3lVUWdnREFBQUF6OXMvT0JKU3B2Vk03cFVMWjFvNU9qVXhKWjJTbE9aUUFQQ0ptTExCeTRHQnZyclBCRWNJQXdBQUFOL0t6dUNVQzJWeUgzTXRhYWdMbDJkRzBpaUhBWUJIeFpUcFpqUW5hYjRlclYyV3dvMEhBQUFBVFNuYnRTbS8xVXd1b0dGZzRNdWR5ejdFQUlEYnVTcDBLVVFJQXdBQUFPVFpQemdTMGVYaFRMTjNiVW9wMHkzSjRoMEN3RVhTeWdRdXNkekxiYUZMSVVJWUFBQUFvQXhGdWpibFpteHFseFJzZ2tNd0tla2k3d1FBRFdKSmlpc3ZkRGt3MEpmMDJrNFF3Z0FBQUFBMXlyYWV5Ujl2SmplTFU1djhFOUJZa3M1SVN2QVhCK0F3VTVuQUphNU00QktYbERndzBPZjUxbmlFTUFBQUFJQ0Q5ZytPdEdoeE1KUC9DbmhzZHhLU1R2TlhCV0NqdEJhQ2xyaWsrSUdCUHQrR3ZZUXdBQUFBUUlQc0h4eHBWU2FneWUvYTFDWjN0NkFabHpURlh3OUFoZExLQkxrSlpWdTJLQk80cEp2cElCRENBQUFBQUM2VTdlS1VDMlh5dzVrMlNTME5yTXRia2theUQxUUFVQ2pYbFdoUjRISmdvQy9Gb1NHRUFRQUFBRHhwLytCSWZqaVRIOUswU29vNHZQbzVTZWY1S3dCTnk1S1UxRUxRY3VuelptdlpVaWxDR0FBQUFNQm45ZytPQkxVUXpMVGtmZDZhL2JyRmh0V2NWeWFNQWVCZnlieFhMbkJKZUhGV0lyY2doQUVBQUFDYVRIYTY3Ull0QkRPNWo3bVFwbFZTYUpsaTBwSk9LZFAxQUlBM21Wb2N0T1RDbHFTa2xCOW1JM0liUWhnQUFBQUFsOWsvT0JMUzVTRk5TOEhIYVVrWE9WcUFhK1c2RGFXMEVMS2tsQTFhNkRwVWY0UXdBQUFBQUtxU2JWRVRLdklLU2dybmZjNXpCK0NNWEV1V3dwQWwxNUtGd1hCZGhvc2hBQUFBQUVkbHg2Z3BGZGJrZitUNUJGaGdLaE9vNUwrUytaOGZHT2lqTzZESGNKRURBQUFBNEFyN0IwY01MWVF5aFFGTnNPQm5RWTRZUEN5dHl3T1dSVUVMQVlzL0VjSUFBQUFBOEp4c1lKTWZ6QVMwT0tBcDlyMEFSdzRPeW0rNWt0YmlvQ1dkLzMwR3ZHMWVoREFBQUFBQW1rSTJ1Q2szck1sL01hNU44ekdWQ1V4eUg0dDl2aWhjSVZoQk9iaVFBQUFBQU1BeThnS2MvR0FtVU1iM0F0bm5McVBnYXpqSFVpWWtLZWRWTkdBaFVJRlRPUGtCQUFBQW9NNnlNMHNWQmpOTGZWVGVSNlBnODl4elhiREk5NHI5emxMUGg5VThJMXJaVjZIME1zdWFlUit0SWw4WHZzd2lYeTk2TVk0SzNPNy9BWlpVdEZrVTVMYkhBQUFBQUVsRlRrU3VRbUNDIi8+CjwvZGVmcz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./src/icons/search.svg":
/*!******************************!*\
  !*** ./src/icons/search.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReactComponent": () => (/* binding */ SvgSearch),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _rect, _path;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgSearch = function SvgSearch(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    width: 24,
    height: 24,
    fill: "#1D1D1F",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _rect || (_rect = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    y: 24,
    width: 24,
    height: 24,
    rx: 2,
    transform: "rotate(-90 0 24)",
    fill: "#F0F3F5"
  })), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "M6 10.5c0 3 2.5 5.5 5.5 5.5 1.1 0 2.1-.3 3-.9l3 3.4 1.1-1-2.9-3.4c.9-1 1.4-2.2 1.4-3.6 0-3-2.5-5.5-5.5-5.5C8.5 5 6 7.5 6 10.5Zm9.5 0c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4Z",
    fill: "#999"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzFEMUQxRiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHk9IjI0IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJ4PSIyIiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAgMCAyNCkiIGZpbGw9IiNGMEYzRjUiIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Ik02IDEwLjVDNiAxMy41IDguNSAxNiAxMS41IDE2QzEyLjYgMTYgMTMuNiAxNS43IDE0LjUgMTUuMUwxNy41IDE4LjVMMTguNiAxNy41TDE1LjcgMTQuMUMxNi42IDEzLjEgMTcuMSAxMS45IDE3LjEgMTAuNUMxNy4xIDcuNSAxNC42IDUgMTEuNiA1QzguNSA1IDYgNy41IDYgMTAuNVpNMTUuNSAxMC41QzE1LjUgMTIuNyAxMy43IDE0LjUgMTEuNSAxNC41QzkuMyAxNC41IDcuNSAxMi43IDcuNSAxMC41QzcuNSA4LjMgOS4zIDYuNSAxMS41IDYuNUMxMy43IDYuNSAxNS41IDguMyAxNS41IDEwLjVaIgogICAgICAgIGZpbGw9IiM5OTk5OTkiIC8+Cjwvc3ZnPg==");

/***/ }),

/***/ "./node_modules/algoliasearch-helper/index.js":
/*!****************************************************!*\
  !*** ./node_modules/algoliasearch-helper/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var AlgoliaSearchHelper = __webpack_require__(/*! ./src/algoliasearch.helper */ "./node_modules/algoliasearch-helper/src/algoliasearch.helper.js");

var SearchParameters = __webpack_require__(/*! ./src/SearchParameters */ "./node_modules/algoliasearch-helper/src/SearchParameters/index.js");
var SearchResults = __webpack_require__(/*! ./src/SearchResults */ "./node_modules/algoliasearch-helper/src/SearchResults/index.js");

/**
 * The algoliasearchHelper module is the function that will let its
 * contains everything needed to use the Algoliasearch
 * Helper. It is a also a function that instanciate the helper.
 * To use the helper, you also need the Algolia JS client v3.
 * @example
 * //using the UMD build
 * var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
 * var helper = algoliasearchHelper(client, 'bestbuy', {
 *   facets: ['shipping'],
 *   disjunctiveFacets: ['category']
 * });
 * helper.on('result', function(event) {
 *   console.log(event.results);
 * });
 * helper
 *   .toggleFacetRefinement('category', 'Movies & TV Shows')
 *   .toggleFacetRefinement('shipping', 'Free shipping')
 *   .search();
 * @example
 * // The helper is an event emitter using the node API
 * helper.on('result', updateTheResults);
 * helper.once('result', updateTheResults);
 * helper.removeListener('result', updateTheResults);
 * helper.removeAllListeners('result');
 * @module algoliasearchHelper
 * @param  {AlgoliaSearch} client an AlgoliaSearch client
 * @param  {string} index the name of the index to query
 * @param  {SearchParameters|object} opts an object defining the initial config of the search. It doesn't have to be a {SearchParameters}, just an object containing the properties you need from it.
 * @return {AlgoliaSearchHelper}
 */
function algoliasearchHelper(client, index, opts) {
  return new AlgoliaSearchHelper(client, index, opts);
}

/**
 * The version currently used
 * @member module:algoliasearchHelper.version
 * @type {number}
 */
algoliasearchHelper.version = __webpack_require__(/*! ./src/version.js */ "./node_modules/algoliasearch-helper/src/version.js");

/**
 * Constructor for the Helper.
 * @member module:algoliasearchHelper.AlgoliaSearchHelper
 * @type {AlgoliaSearchHelper}
 */
algoliasearchHelper.AlgoliaSearchHelper = AlgoliaSearchHelper;

/**
 * Constructor for the object containing all the parameters of the search.
 * @member module:algoliasearchHelper.SearchParameters
 * @type {SearchParameters}
 */
algoliasearchHelper.SearchParameters = SearchParameters;

/**
 * Constructor for the object containing the results of the search.
 * @member module:algoliasearchHelper.SearchResults
 * @type {SearchResults}
 */
algoliasearchHelper.SearchResults = SearchResults;

module.exports = algoliasearchHelper;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/DerivedHelper/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/DerivedHelper/index.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var EventEmitter = __webpack_require__(/*! @algolia/events */ "./node_modules/@algolia/events/events.js");
var inherits = __webpack_require__(/*! ../functions/inherits */ "./node_modules/algoliasearch-helper/src/functions/inherits.js");

/**
 * A DerivedHelper is a way to create sub requests to
 * Algolia from a main helper.
 * @class
 * @classdesc The DerivedHelper provides an event based interface for search callbacks:
 *  - search: when a search is triggered using the `search()` method.
 *  - result: when the response is retrieved from Algolia and is processed.
 *    This event contains a {@link SearchResults} object and the
 *    {@link SearchParameters} corresponding to this answer.
 */
function DerivedHelper(mainHelper, fn) {
  this.main = mainHelper;
  this.fn = fn;
  this.lastResults = null;
}

inherits(DerivedHelper, EventEmitter);

/**
 * Detach this helper from the main helper
 * @return {undefined}
 * @throws Error if the derived helper is already detached
 */
DerivedHelper.prototype.detach = function() {
  this.removeAllListeners();
  this.main.detachDerivedHelper(this);
};

DerivedHelper.prototype.getModifiedState = function(parameters) {
  return this.fn(parameters);
};

module.exports = DerivedHelper;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/**
 * Functions to manipulate refinement lists
 *
 * The RefinementList is not formally defined through a prototype but is based
 * on a specific structure.
 *
 * @module SearchParameters.refinementList
 *
 * @typedef {string[]} SearchParameters.refinementList.Refinements
 * @typedef {Object.<string, SearchParameters.refinementList.Refinements>} SearchParameters.refinementList.RefinementList
 */

var defaultsPure = __webpack_require__(/*! ../functions/defaultsPure */ "./node_modules/algoliasearch-helper/src/functions/defaultsPure.js");
var omit = __webpack_require__(/*! ../functions/omit */ "./node_modules/algoliasearch-helper/src/functions/omit.js");
var objectHasKeys = __webpack_require__(/*! ../functions/objectHasKeys */ "./node_modules/algoliasearch-helper/src/functions/objectHasKeys.js");

var lib = {
  /**
   * Adds a refinement to a RefinementList
   * @param {RefinementList} refinementList the initial list
   * @param {string} attribute the attribute to refine
   * @param {string} value the value of the refinement, if the value is not a string it will be converted
   * @return {RefinementList} a new and updated refinement list
   */
  addRefinement: function addRefinement(refinementList, attribute, value) {
    if (lib.isRefined(refinementList, attribute, value)) {
      return refinementList;
    }

    var valueAsString = '' + value;

    var facetRefinement = !refinementList[attribute] ?
      [valueAsString] :
      refinementList[attribute].concat(valueAsString);

    var mod = {};

    mod[attribute] = facetRefinement;

    return defaultsPure({}, mod, refinementList);
  },
  /**
   * Removes refinement(s) for an attribute:
   *  - if the value is specified removes the refinement for the value on the attribute
   *  - if no value is specified removes all the refinements for this attribute
   * @param {RefinementList} refinementList the initial list
   * @param {string} attribute the attribute to refine
   * @param {string} [value] the value of the refinement
   * @return {RefinementList} a new and updated refinement lst
   */
  removeRefinement: function removeRefinement(refinementList, attribute, value) {
    if (value === undefined) {
      // we use the "filter" form of clearRefinement, since it leaves empty values as-is
      // the form with a string will remove the attribute completely
      return lib.clearRefinement(refinementList, function(v, f) {
        return attribute === f;
      });
    }

    var valueAsString = '' + value;

    return lib.clearRefinement(refinementList, function(v, f) {
      return attribute === f && valueAsString === v;
    });
  },
  /**
   * Toggles the refinement value for an attribute.
   * @param {RefinementList} refinementList the initial list
   * @param {string} attribute the attribute to refine
   * @param {string} value the value of the refinement
   * @return {RefinementList} a new and updated list
   */
  toggleRefinement: function toggleRefinement(refinementList, attribute, value) {
    if (value === undefined) throw new Error('toggleRefinement should be used with a value');

    if (lib.isRefined(refinementList, attribute, value)) {
      return lib.removeRefinement(refinementList, attribute, value);
    }

    return lib.addRefinement(refinementList, attribute, value);
  },
  /**
   * Clear all or parts of a RefinementList. Depending on the arguments, three
   * kinds of behavior can happen:
   *  - if no attribute is provided: clears the whole list
   *  - if an attribute is provided as a string: clears the list for the specific attribute
   *  - if an attribute is provided as a function: discards the elements for which the function returns true
   * @param {RefinementList} refinementList the initial list
   * @param {string} [attribute] the attribute or function to discard
   * @param {string} [refinementType] optional parameter to give more context to the attribute function
   * @return {RefinementList} a new and updated refinement list
   */
  clearRefinement: function clearRefinement(refinementList, attribute, refinementType) {
    if (attribute === undefined) {
      if (!objectHasKeys(refinementList)) {
        return refinementList;
      }
      return {};
    } else if (typeof attribute === 'string') {
      return omit(refinementList, [attribute]);
    } else if (typeof attribute === 'function') {
      var hasChanged = false;

      var newRefinementList = Object.keys(refinementList).reduce(function(memo, key) {
        var values = refinementList[key] || [];
        var facetList = values.filter(function(value) {
          return !attribute(value, key, refinementType);
        });

        if (facetList.length !== values.length) {
          hasChanged = true;
        }
        memo[key] = facetList;

        return memo;
      }, {});

      if (hasChanged) return newRefinementList;
      return refinementList;
    }
  },
  /**
   * Test if the refinement value is used for the attribute. If no refinement value
   * is provided, test if the refinementList contains any refinement for the
   * given attribute.
   * @param {RefinementList} refinementList the list of refinement
   * @param {string} attribute name of the attribute
   * @param {string} [refinementValue] value of the filter/refinement
   * @return {boolean}
   */
  isRefined: function isRefined(refinementList, attribute, refinementValue) {
    var containsRefinements = !!refinementList[attribute] &&
      refinementList[attribute].length > 0;

    if (refinementValue === undefined || !containsRefinements) {
      return containsRefinements;
    }

    var refinementValueAsString = '' + refinementValue;

    return refinementList[attribute].indexOf(refinementValueAsString) !== -1;
  }
};

module.exports = lib;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/SearchParameters/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/SearchParameters/index.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var merge = __webpack_require__(/*! ../functions/merge */ "./node_modules/algoliasearch-helper/src/functions/merge.js");
var defaultsPure = __webpack_require__(/*! ../functions/defaultsPure */ "./node_modules/algoliasearch-helper/src/functions/defaultsPure.js");
var intersection = __webpack_require__(/*! ../functions/intersection */ "./node_modules/algoliasearch-helper/src/functions/intersection.js");
var find = __webpack_require__(/*! ../functions/find */ "./node_modules/algoliasearch-helper/src/functions/find.js");
var valToNumber = __webpack_require__(/*! ../functions/valToNumber */ "./node_modules/algoliasearch-helper/src/functions/valToNumber.js");
var omit = __webpack_require__(/*! ../functions/omit */ "./node_modules/algoliasearch-helper/src/functions/omit.js");
var objectHasKeys = __webpack_require__(/*! ../functions/objectHasKeys */ "./node_modules/algoliasearch-helper/src/functions/objectHasKeys.js");
var isValidUserToken = __webpack_require__(/*! ../utils/isValidUserToken */ "./node_modules/algoliasearch-helper/src/utils/isValidUserToken.js");

var RefinementList = __webpack_require__(/*! ./RefinementList */ "./node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js");

/**
 * isEqual, but only for numeric refinement values, possible values:
 * - 5
 * - [5]
 * - [[5]]
 * - [[5,5],[4]]
 */
function isEqualNumericRefinement(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length &&
      a.every(function(el, i) {
        return isEqualNumericRefinement(b[i], el);
      })
    );
  }
  return a === b;
}

/**
 * like _.find but using deep equality to be able to use it
 * to find arrays.
 * @private
 * @param {any[]} array array to search into (elements are base or array of base)
 * @param {any} searchedValue the value we're looking for (base or array of base)
 * @return {any} the searched value or undefined
 */
function findArray(array, searchedValue) {
  return find(array, function(currentValue) {
    return isEqualNumericRefinement(currentValue, searchedValue);
  });
}

/**
 * The facet list is the structure used to store the list of values used to
 * filter a single attribute.
 * @typedef {string[]} SearchParameters.FacetList
 */

/**
 * Structure to store numeric filters with the operator as the key. The supported operators
 * are `=`, `>`, `<`, `>=`, `<=` and `!=`.
 * @typedef {Object.<string, Array.<number|number[]>>} SearchParameters.OperatorList
 */

/**
 * SearchParameters is the data structure that contains all the information
 * usable for making a search to Algolia API. It doesn't do the search itself,
 * nor does it contains logic about the parameters.
 * It is an immutable object, therefore it has been created in a way that each
 * changes does not change the object itself but returns a copy with the
 * modification.
 * This object should probably not be instantiated outside of the helper. It will
 * be provided when needed. This object is documented for reference as you'll
 * get it from events generated by the {@link AlgoliaSearchHelper}.
 * If need be, instantiate the Helper from the factory function {@link SearchParameters.make}
 * @constructor
 * @classdesc contains all the parameters of a search
 * @param {object|SearchParameters} newParameters existing parameters or partial object
 * for the properties of a new SearchParameters
 * @see SearchParameters.make
 * @example <caption>SearchParameters of the first query in
 *   <a href="http://demos.algolia.com/instant-search-demo/">the instant search demo</a></caption>
{
   "query": "",
   "disjunctiveFacets": [
      "customerReviewCount",
      "category",
      "salePrice_range",
      "manufacturer"
  ],
   "maxValuesPerFacet": 30,
   "page": 0,
   "hitsPerPage": 10,
   "facets": [
      "type",
      "shipping"
  ]
}
 */
function SearchParameters(newParameters) {
  var params = newParameters ? SearchParameters._parseNumbers(newParameters) : {};

  if (params.userToken !== undefined && !isValidUserToken(params.userToken)) {
    console.warn('[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}');
  }
  /**
   * This attribute contains the list of all the conjunctive facets
   * used. This list will be added to requested facets in the
   * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
   * @member {string[]}
   */
  this.facets = params.facets || [];
  /**
   * This attribute contains the list of all the disjunctive facets
   * used. This list will be added to requested facets in the
   * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
   * @member {string[]}
   */
  this.disjunctiveFacets = params.disjunctiveFacets || [];
  /**
   * This attribute contains the list of all the hierarchical facets
   * used. This list will be added to requested facets in the
   * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
   * Hierarchical facets are a sub type of disjunctive facets that
   * let you filter faceted attributes hierarchically.
   * @member {string[]|object[]}
   */
  this.hierarchicalFacets = params.hierarchicalFacets || [];

  // Refinements
  /**
   * This attribute contains all the filters that need to be
   * applied on the conjunctive facets. Each facet must be properly
   * defined in the `facets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters selected for the associated facet name.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFilters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.facetsRefinements = params.facetsRefinements || {};
  /**
   * This attribute contains all the filters that need to be
   * excluded from the conjunctive facets. Each facet must be properly
   * defined in the `facets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters excluded for the associated facet name.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFilters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.facetsExcludes = params.facetsExcludes || {};
  /**
   * This attribute contains all the filters that need to be
   * applied on the disjunctive facets. Each facet must be properly
   * defined in the `disjunctiveFacets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters selected for the associated facet name.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFilters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.disjunctiveFacetsRefinements = params.disjunctiveFacetsRefinements || {};
  /**
   * This attribute contains all the filters that need to be
   * applied on the numeric attributes.
   *
   * The key is the name of the attribute, and the value is the
   * filters to apply to this attribute.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `numericFilters` attribute.
   * @member {Object.<string, SearchParameters.OperatorList>}
   */
  this.numericRefinements = params.numericRefinements || {};
  /**
   * This attribute contains all the tags used to refine the query.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `tagFilters` attribute.
   * @member {string[]}
   */
  this.tagRefinements = params.tagRefinements || [];
  /**
   * This attribute contains all the filters that need to be
   * applied on the hierarchical facets. Each facet must be properly
   * defined in the `hierarchicalFacets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters selected for the associated facet name. The FacetList values
   * are structured as a string that contain the values for each level
   * separated by the configured separator.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFilters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.hierarchicalFacetsRefinements = params.hierarchicalFacetsRefinements || {};

  var self = this;
  Object.keys(params).forEach(function(paramName) {
    var isKeyKnown = SearchParameters.PARAMETERS.indexOf(paramName) !== -1;
    var isValueDefined = params[paramName] !== undefined;

    if (!isKeyKnown && isValueDefined) {
      self[paramName] = params[paramName];
    }
  });
}

/**
 * List all the properties in SearchParameters and therefore all the known Algolia properties
 * This doesn't contain any beta/hidden features.
 * @private
 */
SearchParameters.PARAMETERS = Object.keys(new SearchParameters());

/**
 * @private
 * @param {object} partialState full or part of a state
 * @return {object} a new object with the number keys as number
 */
SearchParameters._parseNumbers = function(partialState) {
  // Do not reparse numbers in SearchParameters, they ought to be parsed already
  if (partialState instanceof SearchParameters) return partialState;

  var numbers = {};

  var numberKeys = [
    'aroundPrecision',
    'aroundRadius',
    'getRankingInfo',
    'minWordSizefor2Typos',
    'minWordSizefor1Typo',
    'page',
    'maxValuesPerFacet',
    'distinct',
    'minimumAroundRadius',
    'hitsPerPage',
    'minProximity'
  ];

  numberKeys.forEach(function(k) {
    var value = partialState[k];
    if (typeof value === 'string') {
      var parsedValue = parseFloat(value);
      // global isNaN is ok to use here, value is only number or NaN
      numbers[k] = isNaN(parsedValue) ? value : parsedValue;
    }
  });

  // there's two formats of insideBoundingBox, we need to parse
  // the one which is an array of float geo rectangles
  if (Array.isArray(partialState.insideBoundingBox)) {
    numbers.insideBoundingBox = partialState.insideBoundingBox.map(function(geoRect) {
      if (Array.isArray(geoRect)) {
        return geoRect.map(function(value) {
          return parseFloat(value);
        });
      }
      return geoRect;
    });
  }

  if (partialState.numericRefinements) {
    var numericRefinements = {};
    Object.keys(partialState.numericRefinements).forEach(function(attribute) {
      var operators = partialState.numericRefinements[attribute] || {};
      numericRefinements[attribute] = {};
      Object.keys(operators).forEach(function(operator) {
        var values = operators[operator];
        var parsedValues = values.map(function(v) {
          if (Array.isArray(v)) {
            return v.map(function(vPrime) {
              if (typeof vPrime === 'string') {
                return parseFloat(vPrime);
              }
              return vPrime;
            });
          } else if (typeof v === 'string') {
            return parseFloat(v);
          }
          return v;
        });
        numericRefinements[attribute][operator] = parsedValues;
      });
    });
    numbers.numericRefinements = numericRefinements;
  }

  return merge({}, partialState, numbers);
};

/**
 * Factory for SearchParameters
 * @param {object|SearchParameters} newParameters existing parameters or partial
 * object for the properties of a new SearchParameters
 * @return {SearchParameters} frozen instance of SearchParameters
 */
SearchParameters.make = function makeSearchParameters(newParameters) {
  var instance = new SearchParameters(newParameters);

  var hierarchicalFacets = newParameters.hierarchicalFacets || [];
  hierarchicalFacets.forEach(function(facet) {
    if (facet.rootPath) {
      var currentRefinement = instance.getHierarchicalRefinement(facet.name);

      if (currentRefinement.length > 0 && currentRefinement[0].indexOf(facet.rootPath) !== 0) {
        instance = instance.clearRefinements(facet.name);
      }

      // get it again in case it has been cleared
      currentRefinement = instance.getHierarchicalRefinement(facet.name);
      if (currentRefinement.length === 0) {
        instance = instance.toggleHierarchicalFacetRefinement(facet.name, facet.rootPath);
      }
    }
  });

  return instance;
};

/**
 * Validates the new parameters based on the previous state
 * @param {SearchParameters} currentState the current state
 * @param {object|SearchParameters} parameters the new parameters to set
 * @return {Error|null} Error if the modification is invalid, null otherwise
 */
SearchParameters.validate = function(currentState, parameters) {
  var params = parameters || {};

  if (currentState.tagFilters && params.tagRefinements && params.tagRefinements.length > 0) {
    return new Error(
      '[Tags] Cannot switch from the managed tag API to the advanced API. It is probably ' +
      'an error, if it is really what you want, you should first clear the tags with clearTags method.');
  }

  if (currentState.tagRefinements.length > 0 && params.tagFilters) {
    return new Error(
      '[Tags] Cannot switch from the advanced tag API to the managed API. It is probably ' +
      'an error, if it is not, you should first clear the tags with clearTags method.');
  }

  if (
    currentState.numericFilters &&
    params.numericRefinements &&
    objectHasKeys(params.numericRefinements)
  ) {
    return new Error(
      "[Numeric filters] Can't switch from the advanced to the managed API. It" +
        ' is probably an error, if this is really what you want, you have to first' +
        ' clear the numeric filters.'
    );
  }

  if (objectHasKeys(currentState.numericRefinements) && params.numericFilters) {
    return new Error(
      "[Numeric filters] Can't switch from the managed API to the advanced. It" +
      ' is probably an error, if this is really what you want, you have to first' +
      ' clear the numeric filters.');
  }

  return null;
};

SearchParameters.prototype = {
  constructor: SearchParameters,

  /**
   * Remove all refinements (disjunctive + conjunctive + excludes + numeric filters)
   * @method
   * @param {undefined|string|SearchParameters.clearCallback} [attribute] optional string or function
   * - If not given, means to clear all the filters.
   * - If `string`, means to clear all refinements for the `attribute` named filter.
   * - If `function`, means to clear all the refinements that return truthy values.
   * @return {SearchParameters}
   */
  clearRefinements: function clearRefinements(attribute) {
    var patch = {
      numericRefinements: this._clearNumericRefinements(attribute),
      facetsRefinements: RefinementList.clearRefinement(
        this.facetsRefinements,
        attribute,
        'conjunctiveFacet'
      ),
      facetsExcludes: RefinementList.clearRefinement(
        this.facetsExcludes,
        attribute,
        'exclude'
      ),
      disjunctiveFacetsRefinements: RefinementList.clearRefinement(
        this.disjunctiveFacetsRefinements,
        attribute,
        'disjunctiveFacet'
      ),
      hierarchicalFacetsRefinements: RefinementList.clearRefinement(
        this.hierarchicalFacetsRefinements,
        attribute,
        'hierarchicalFacet'
      )
    };
    if (
      patch.numericRefinements === this.numericRefinements &&
      patch.facetsRefinements === this.facetsRefinements &&
      patch.facetsExcludes === this.facetsExcludes &&
      patch.disjunctiveFacetsRefinements === this.disjunctiveFacetsRefinements &&
      patch.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements
    ) {
      return this;
    }
    return this.setQueryParameters(patch);
  },
  /**
   * Remove all the refined tags from the SearchParameters
   * @method
   * @return {SearchParameters}
   */
  clearTags: function clearTags() {
    if (this.tagFilters === undefined && this.tagRefinements.length === 0) return this;

    return this.setQueryParameters({
      tagFilters: undefined,
      tagRefinements: []
    });
  },
  /**
   * Set the index.
   * @method
   * @param {string} index the index name
   * @return {SearchParameters}
   */
  setIndex: function setIndex(index) {
    if (index === this.index) return this;

    return this.setQueryParameters({
      index: index
    });
  },
  /**
   * Query setter
   * @method
   * @param {string} newQuery value for the new query
   * @return {SearchParameters}
   */
  setQuery: function setQuery(newQuery) {
    if (newQuery === this.query) return this;

    return this.setQueryParameters({
      query: newQuery
    });
  },
  /**
   * Page setter
   * @method
   * @param {number} newPage new page number
   * @return {SearchParameters}
   */
  setPage: function setPage(newPage) {
    if (newPage === this.page) return this;

    return this.setQueryParameters({
      page: newPage
    });
  },
  /**
   * Facets setter
   * The facets are the simple facets, used for conjunctive (and) faceting.
   * @method
   * @param {string[]} facets all the attributes of the algolia records used for conjunctive faceting
   * @return {SearchParameters}
   */
  setFacets: function setFacets(facets) {
    return this.setQueryParameters({
      facets: facets
    });
  },
  /**
   * Disjunctive facets setter
   * Change the list of disjunctive (or) facets the helper chan handle.
   * @method
   * @param {string[]} facets all the attributes of the algolia records used for disjunctive faceting
   * @return {SearchParameters}
   */
  setDisjunctiveFacets: function setDisjunctiveFacets(facets) {
    return this.setQueryParameters({
      disjunctiveFacets: facets
    });
  },
  /**
   * HitsPerPage setter
   * Hits per page represents the number of hits retrieved for this query
   * @method
   * @param {number} n number of hits retrieved per page of results
   * @return {SearchParameters}
   */
  setHitsPerPage: function setHitsPerPage(n) {
    if (this.hitsPerPage === n) return this;

    return this.setQueryParameters({
      hitsPerPage: n
    });
  },
  /**
   * typoTolerance setter
   * Set the value of typoTolerance
   * @method
   * @param {string} typoTolerance new value of typoTolerance ("true", "false", "min" or "strict")
   * @return {SearchParameters}
   */
  setTypoTolerance: function setTypoTolerance(typoTolerance) {
    if (this.typoTolerance === typoTolerance) return this;

    return this.setQueryParameters({
      typoTolerance: typoTolerance
    });
  },
  /**
   * Add a numeric filter for a given attribute
   * When value is an array, they are combined with OR
   * When value is a single value, it will combined with AND
   * @method
   * @param {string} attribute attribute to set the filter on
   * @param {string} operator operator of the filter (possible values: =, >, >=, <, <=, !=)
   * @param {number | number[]} value value of the filter
   * @return {SearchParameters}
   * @example
   * // for price = 50 or 40
   * searchparameter.addNumericRefinement('price', '=', [50, 40]);
   * @example
   * // for size = 38 and 40
   * searchparameter.addNumericRefinement('size', '=', 38);
   * searchparameter.addNumericRefinement('size', '=', 40);
   */
  addNumericRefinement: function(attribute, operator, v) {
    var value = valToNumber(v);

    if (this.isNumericRefined(attribute, operator, value)) return this;

    var mod = merge({}, this.numericRefinements);

    mod[attribute] = merge({}, mod[attribute]);

    if (mod[attribute][operator]) {
      // Array copy
      mod[attribute][operator] = mod[attribute][operator].slice();
      // Add the element. Concat can't be used here because value can be an array.
      mod[attribute][operator].push(value);
    } else {
      mod[attribute][operator] = [value];
    }

    return this.setQueryParameters({
      numericRefinements: mod
    });
  },
  /**
   * Get the list of conjunctive refinements for a single facet
   * @param {string} facetName name of the attribute used for faceting
   * @return {string[]} list of refinements
   */
  getConjunctiveRefinements: function(facetName) {
    if (!this.isConjunctiveFacet(facetName)) {
      return [];
    }
    return this.facetsRefinements[facetName] || [];
  },
  /**
   * Get the list of disjunctive refinements for a single facet
   * @param {string} facetName name of the attribute used for faceting
   * @return {string[]} list of refinements
   */
  getDisjunctiveRefinements: function(facetName) {
    if (!this.isDisjunctiveFacet(facetName)) {
      return [];
    }
    return this.disjunctiveFacetsRefinements[facetName] || [];
  },
  /**
   * Get the list of hierarchical refinements for a single facet
   * @param {string} facetName name of the attribute used for faceting
   * @return {string[]} list of refinements
   */
  getHierarchicalRefinement: function(facetName) {
    // we send an array but we currently do not support multiple
    // hierarchicalRefinements for a hierarchicalFacet
    return this.hierarchicalFacetsRefinements[facetName] || [];
  },
  /**
   * Get the list of exclude refinements for a single facet
   * @param {string} facetName name of the attribute used for faceting
   * @return {string[]} list of refinements
   */
  getExcludeRefinements: function(facetName) {
    if (!this.isConjunctiveFacet(facetName)) {
      return [];
    }
    return this.facetsExcludes[facetName] || [];
  },

  /**
   * Remove all the numeric filter for a given (attribute, operator)
   * @method
   * @param {string} attribute attribute to set the filter on
   * @param {string} [operator] operator of the filter (possible values: =, >, >=, <, <=, !=)
   * @param {number} [number] the value to be removed
   * @return {SearchParameters}
   */
  removeNumericRefinement: function(attribute, operator, paramValue) {
    if (paramValue !== undefined) {
      if (!this.isNumericRefined(attribute, operator, paramValue)) {
        return this;
      }
      return this.setQueryParameters({
        numericRefinements: this._clearNumericRefinements(function(value, key) {
          return (
            key === attribute &&
            value.op === operator &&
            isEqualNumericRefinement(value.val, valToNumber(paramValue))
          );
        })
      });
    } else if (operator !== undefined) {
      if (!this.isNumericRefined(attribute, operator)) return this;
      return this.setQueryParameters({
        numericRefinements: this._clearNumericRefinements(function(value, key) {
          return key === attribute && value.op === operator;
        })
      });
    }

    if (!this.isNumericRefined(attribute)) return this;
    return this.setQueryParameters({
      numericRefinements: this._clearNumericRefinements(function(value, key) {
        return key === attribute;
      })
    });
  },
  /**
   * Get the list of numeric refinements for a single facet
   * @param {string} facetName name of the attribute used for faceting
   * @return {SearchParameters.OperatorList} list of refinements
   */
  getNumericRefinements: function(facetName) {
    return this.numericRefinements[facetName] || {};
  },
  /**
   * Return the current refinement for the (attribute, operator)
   * @param {string} attribute attribute in the record
   * @param {string} operator operator applied on the refined values
   * @return {Array.<number|number[]>} refined values
   */
  getNumericRefinement: function(attribute, operator) {
    return this.numericRefinements[attribute] && this.numericRefinements[attribute][operator];
  },
  /**
   * Clear numeric filters.
   * @method
   * @private
   * @param {string|SearchParameters.clearCallback} [attribute] optional string or function
   * - If not given, means to clear all the filters.
   * - If `string`, means to clear all refinements for the `attribute` named filter.
   * - If `function`, means to clear all the refinements that return truthy values.
   * @return {Object.<string, OperatorList>}
   */
  _clearNumericRefinements: function _clearNumericRefinements(attribute) {
    if (attribute === undefined) {
      if (!objectHasKeys(this.numericRefinements)) {
        return this.numericRefinements;
      }
      return {};
    } else if (typeof attribute === 'string') {
      return omit(this.numericRefinements, [attribute]);
    } else if (typeof attribute === 'function') {
      var hasChanged = false;
      var numericRefinements = this.numericRefinements;
      var newNumericRefinements = Object.keys(numericRefinements).reduce(function(memo, key) {
        var operators = numericRefinements[key];
        var operatorList = {};

        operators = operators || {};
        Object.keys(operators).forEach(function(operator) {
          var values = operators[operator] || [];
          var outValues = [];
          values.forEach(function(value) {
            var predicateResult = attribute({val: value, op: operator}, key, 'numeric');
            if (!predicateResult) outValues.push(value);
          });
          if (outValues.length !== values.length) {
            hasChanged = true;
          }
          operatorList[operator] = outValues;
        });

        memo[key] = operatorList;

        return memo;
      }, {});

      if (hasChanged) return newNumericRefinements;
      return this.numericRefinements;
    }
  },
  /**
   * Add a facet to the facets attribute of the helper configuration, if it
   * isn't already present.
   * @method
   * @param {string} facet facet name to add
   * @return {SearchParameters}
   */
  addFacet: function addFacet(facet) {
    if (this.isConjunctiveFacet(facet)) {
      return this;
    }

    return this.setQueryParameters({
      facets: this.facets.concat([facet])
    });
  },
  /**
   * Add a disjunctive facet to the disjunctiveFacets attribute of the helper
   * configuration, if it isn't already present.
   * @method
   * @param {string} facet disjunctive facet name to add
   * @return {SearchParameters}
   */
  addDisjunctiveFacet: function addDisjunctiveFacet(facet) {
    if (this.isDisjunctiveFacet(facet)) {
      return this;
    }

    return this.setQueryParameters({
      disjunctiveFacets: this.disjunctiveFacets.concat([facet])
    });
  },
  /**
   * Add a hierarchical facet to the hierarchicalFacets attribute of the helper
   * configuration.
   * @method
   * @param {object} hierarchicalFacet hierarchical facet to add
   * @return {SearchParameters}
   * @throws will throw an error if a hierarchical facet with the same name was already declared
   */
  addHierarchicalFacet: function addHierarchicalFacet(hierarchicalFacet) {
    if (this.isHierarchicalFacet(hierarchicalFacet.name)) {
      throw new Error(
        'Cannot declare two hierarchical facets with the same name: `' + hierarchicalFacet.name + '`');
    }

    return this.setQueryParameters({
      hierarchicalFacets: this.hierarchicalFacets.concat([hierarchicalFacet])
    });
  },
  /**
   * Add a refinement on a "normal" facet
   * @method
   * @param {string} facet attribute to apply the faceting on
   * @param {string} value value of the attribute (will be converted to string)
   * @return {SearchParameters}
   */
  addFacetRefinement: function addFacetRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }
    if (RefinementList.isRefined(this.facetsRefinements, facet, value)) return this;

    return this.setQueryParameters({
      facetsRefinements: RefinementList.addRefinement(this.facetsRefinements, facet, value)
    });
  },
  /**
   * Exclude a value from a "normal" facet
   * @method
   * @param {string} facet attribute to apply the exclusion on
   * @param {string} value value of the attribute (will be converted to string)
   * @return {SearchParameters}
   */
  addExcludeRefinement: function addExcludeRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }
    if (RefinementList.isRefined(this.facetsExcludes, facet, value)) return this;

    return this.setQueryParameters({
      facetsExcludes: RefinementList.addRefinement(this.facetsExcludes, facet, value)
    });
  },
  /**
   * Adds a refinement on a disjunctive facet.
   * @method
   * @param {string} facet attribute to apply the faceting on
   * @param {string} value value of the attribute (will be converted to string)
   * @return {SearchParameters}
   */
  addDisjunctiveFacetRefinement: function addDisjunctiveFacetRefinement(facet, value) {
    if (!this.isDisjunctiveFacet(facet)) {
      throw new Error(
        facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
    }

    if (RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)) return this;

    return this.setQueryParameters({
      disjunctiveFacetsRefinements: RefinementList.addRefinement(
        this.disjunctiveFacetsRefinements, facet, value)
    });
  },
  /**
   * addTagRefinement adds a tag to the list used to filter the results
   * @param {string} tag tag to be added
   * @return {SearchParameters}
   */
  addTagRefinement: function addTagRefinement(tag) {
    if (this.isTagRefined(tag)) return this;

    var modification = {
      tagRefinements: this.tagRefinements.concat(tag)
    };

    return this.setQueryParameters(modification);
  },
  /**
   * Remove a facet from the facets attribute of the helper configuration, if it
   * is present.
   * @method
   * @param {string} facet facet name to remove
   * @return {SearchParameters}
   */
  removeFacet: function removeFacet(facet) {
    if (!this.isConjunctiveFacet(facet)) {
      return this;
    }

    return this.clearRefinements(facet).setQueryParameters({
      facets: this.facets.filter(function(f) {
        return f !== facet;
      })
    });
  },
  /**
   * Remove a disjunctive facet from the disjunctiveFacets attribute of the
   * helper configuration, if it is present.
   * @method
   * @param {string} facet disjunctive facet name to remove
   * @return {SearchParameters}
   */
  removeDisjunctiveFacet: function removeDisjunctiveFacet(facet) {
    if (!this.isDisjunctiveFacet(facet)) {
      return this;
    }

    return this.clearRefinements(facet).setQueryParameters({
      disjunctiveFacets: this.disjunctiveFacets.filter(function(f) {
        return f !== facet;
      })
    });
  },
  /**
   * Remove a hierarchical facet from the hierarchicalFacets attribute of the
   * helper configuration, if it is present.
   * @method
   * @param {string} facet hierarchical facet name to remove
   * @return {SearchParameters}
   */
  removeHierarchicalFacet: function removeHierarchicalFacet(facet) {
    if (!this.isHierarchicalFacet(facet)) {
      return this;
    }

    return this.clearRefinements(facet).setQueryParameters({
      hierarchicalFacets: this.hierarchicalFacets.filter(function(f) {
        return f.name !== facet;
      })
    });
  },
  /**
   * Remove a refinement set on facet. If a value is provided, it will clear the
   * refinement for the given value, otherwise it will clear all the refinement
   * values for the faceted attribute.
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {string} [value] value used to filter
   * @return {SearchParameters}
   */
  removeFacetRefinement: function removeFacetRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }
    if (!RefinementList.isRefined(this.facetsRefinements, facet, value)) return this;

    return this.setQueryParameters({
      facetsRefinements: RefinementList.removeRefinement(this.facetsRefinements, facet, value)
    });
  },
  /**
   * Remove a negative refinement on a facet
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {string} value value used to filter
   * @return {SearchParameters}
   */
  removeExcludeRefinement: function removeExcludeRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }
    if (!RefinementList.isRefined(this.facetsExcludes, facet, value)) return this;

    return this.setQueryParameters({
      facetsExcludes: RefinementList.removeRefinement(this.facetsExcludes, facet, value)
    });
  },
  /**
   * Remove a refinement on a disjunctive facet
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {string} value value used to filter
   * @return {SearchParameters}
   */
  removeDisjunctiveFacetRefinement: function removeDisjunctiveFacetRefinement(facet, value) {
    if (!this.isDisjunctiveFacet(facet)) {
      throw new Error(
        facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
    }
    if (!RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)) return this;

    return this.setQueryParameters({
      disjunctiveFacetsRefinements: RefinementList.removeRefinement(
        this.disjunctiveFacetsRefinements, facet, value)
    });
  },
  /**
   * Remove a tag from the list of tag refinements
   * @method
   * @param {string} tag the tag to remove
   * @return {SearchParameters}
   */
  removeTagRefinement: function removeTagRefinement(tag) {
    if (!this.isTagRefined(tag)) return this;

    var modification = {
      tagRefinements: this.tagRefinements.filter(function(t) {
        return t !== tag;
      })
    };

    return this.setQueryParameters(modification);
  },
  /**
   * Generic toggle refinement method to use with facet, disjunctive facets
   * and hierarchical facets
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {SearchParameters}
   * @throws will throw an error if the facet is not declared in the settings of the helper
   * @deprecated since version 2.19.0, see {@link SearchParameters#toggleFacetRefinement}
   */
  toggleRefinement: function toggleRefinement(facet, value) {
    return this.toggleFacetRefinement(facet, value);
  },
  /**
   * Generic toggle refinement method to use with facet, disjunctive facets
   * and hierarchical facets
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {SearchParameters}
   * @throws will throw an error if the facet is not declared in the settings of the helper
   */
  toggleFacetRefinement: function toggleFacetRefinement(facet, value) {
    if (this.isHierarchicalFacet(facet)) {
      return this.toggleHierarchicalFacetRefinement(facet, value);
    } else if (this.isConjunctiveFacet(facet)) {
      return this.toggleConjunctiveFacetRefinement(facet, value);
    } else if (this.isDisjunctiveFacet(facet)) {
      return this.toggleDisjunctiveFacetRefinement(facet, value);
    }

    throw new Error('Cannot refine the undeclared facet ' + facet +
      '; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets');
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {SearchParameters}
   */
  toggleConjunctiveFacetRefinement: function toggleConjunctiveFacetRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }

    return this.setQueryParameters({
      facetsRefinements: RefinementList.toggleRefinement(this.facetsRefinements, facet, value)
    });
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {SearchParameters}
   */
  toggleExcludeFacetRefinement: function toggleExcludeFacetRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(facet + ' is not defined in the facets attribute of the helper configuration');
    }

    return this.setQueryParameters({
      facetsExcludes: RefinementList.toggleRefinement(this.facetsExcludes, facet, value)
    });
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {SearchParameters}
   */
  toggleDisjunctiveFacetRefinement: function toggleDisjunctiveFacetRefinement(facet, value) {
    if (!this.isDisjunctiveFacet(facet)) {
      throw new Error(
        facet + ' is not defined in the disjunctiveFacets attribute of the helper configuration');
    }

    return this.setQueryParameters({
      disjunctiveFacetsRefinements: RefinementList.toggleRefinement(
        this.disjunctiveFacetsRefinements, facet, value)
    });
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {SearchParameters}
   */
  toggleHierarchicalFacetRefinement: function toggleHierarchicalFacetRefinement(facet, value) {
    if (!this.isHierarchicalFacet(facet)) {
      throw new Error(
        facet + ' is not defined in the hierarchicalFacets attribute of the helper configuration');
    }

    var separator = this._getHierarchicalFacetSeparator(this.getHierarchicalFacetByName(facet));

    var mod = {};

    var upOneOrMultipleLevel = this.hierarchicalFacetsRefinements[facet] !== undefined &&
      this.hierarchicalFacetsRefinements[facet].length > 0 && (
      // remove current refinement:
      // refinement was 'beer > IPA', call is toggleRefine('beer > IPA'), refinement should be `beer`
      this.hierarchicalFacetsRefinements[facet][0] === value ||
      // remove a parent refinement of the current refinement:
      //  - refinement was 'beer > IPA > Flying dog'
      //  - call is toggleRefine('beer > IPA')
      //  - refinement should be `beer`
      this.hierarchicalFacetsRefinements[facet][0].indexOf(value + separator) === 0
    );

    if (upOneOrMultipleLevel) {
      if (value.indexOf(separator) === -1) {
        // go back to root level
        mod[facet] = [];
      } else {
        mod[facet] = [value.slice(0, value.lastIndexOf(separator))];
      }
    } else {
      mod[facet] = [value];
    }

    return this.setQueryParameters({
      hierarchicalFacetsRefinements: defaultsPure({}, mod, this.hierarchicalFacetsRefinements)
    });
  },

  /**
   * Adds a refinement on a hierarchical facet.
   * @param {string} facet the facet name
   * @param {string} path the hierarchical facet path
   * @return {SearchParameter} the new state
   * @throws Error if the facet is not defined or if the facet is refined
   */
  addHierarchicalFacetRefinement: function(facet, path) {
    if (this.isHierarchicalFacetRefined(facet)) {
      throw new Error(facet + ' is already refined.');
    }
    if (!this.isHierarchicalFacet(facet)) {
      throw new Error(facet + ' is not defined in the hierarchicalFacets attribute of the helper configuration.');
    }
    var mod = {};
    mod[facet] = [path];
    return this.setQueryParameters({
      hierarchicalFacetsRefinements: defaultsPure({}, mod, this.hierarchicalFacetsRefinements)
    });
  },

  /**
   * Removes the refinement set on a hierarchical facet.
   * @param {string} facet the facet name
   * @return {SearchParameter} the new state
   * @throws Error if the facet is not defined or if the facet is not refined
   */
  removeHierarchicalFacetRefinement: function(facet) {
    if (!this.isHierarchicalFacetRefined(facet)) {
      return this;
    }
    var mod = {};
    mod[facet] = [];
    return this.setQueryParameters({
      hierarchicalFacetsRefinements: defaultsPure({}, mod, this.hierarchicalFacetsRefinements)
    });
  },
  /**
   * Switch the tag refinement
   * @method
   * @param {string} tag the tag to remove or add
   * @return {SearchParameters}
   */
  toggleTagRefinement: function toggleTagRefinement(tag) {
    if (this.isTagRefined(tag)) {
      return this.removeTagRefinement(tag);
    }

    return this.addTagRefinement(tag);
  },
  /**
   * Test if the facet name is from one of the disjunctive facets
   * @method
   * @param {string} facet facet name to test
   * @return {boolean}
   */
  isDisjunctiveFacet: function(facet) {
    return this.disjunctiveFacets.indexOf(facet) > -1;
  },
  /**
   * Test if the facet name is from one of the hierarchical facets
   * @method
   * @param {string} facetName facet name to test
   * @return {boolean}
   */
  isHierarchicalFacet: function(facetName) {
    return this.getHierarchicalFacetByName(facetName) !== undefined;
  },
  /**
   * Test if the facet name is from one of the conjunctive/normal facets
   * @method
   * @param {string} facet facet name to test
   * @return {boolean}
   */
  isConjunctiveFacet: function(facet) {
    return this.facets.indexOf(facet) > -1;
  },
  /**
   * Returns true if the facet is refined, either for a specific value or in
   * general.
   * @method
   * @param {string} facet name of the attribute for used for faceting
   * @param {string} value, optional value. If passed will test that this value
   * is filtering the given facet.
   * @return {boolean} returns true if refined
   */
  isFacetRefined: function isFacetRefined(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      return false;
    }
    return RefinementList.isRefined(this.facetsRefinements, facet, value);
  },
  /**
   * Returns true if the facet contains exclusions or if a specific value is
   * excluded.
   *
   * @method
   * @param {string} facet name of the attribute for used for faceting
   * @param {string} [value] optional value. If passed will test that this value
   * is filtering the given facet.
   * @return {boolean} returns true if refined
   */
  isExcludeRefined: function isExcludeRefined(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      return false;
    }
    return RefinementList.isRefined(this.facetsExcludes, facet, value);
  },
  /**
   * Returns true if the facet contains a refinement, or if a value passed is a
   * refinement for the facet.
   * @method
   * @param {string} facet name of the attribute for used for faceting
   * @param {string} value optional, will test if the value is used for refinement
   * if there is one, otherwise will test if the facet contains any refinement
   * @return {boolean}
   */
  isDisjunctiveFacetRefined: function isDisjunctiveFacetRefined(facet, value) {
    if (!this.isDisjunctiveFacet(facet)) {
      return false;
    }
    return RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value);
  },
  /**
   * Returns true if the facet contains a refinement, or if a value passed is a
   * refinement for the facet.
   * @method
   * @param {string} facet name of the attribute for used for faceting
   * @param {string} value optional, will test if the value is used for refinement
   * if there is one, otherwise will test if the facet contains any refinement
   * @return {boolean}
   */
  isHierarchicalFacetRefined: function isHierarchicalFacetRefined(facet, value) {
    if (!this.isHierarchicalFacet(facet)) {
      return false;
    }

    var refinements = this.getHierarchicalRefinement(facet);

    if (!value) {
      return refinements.length > 0;
    }

    return refinements.indexOf(value) !== -1;
  },
  /**
   * Test if the triple (attribute, operator, value) is already refined.
   * If only the attribute and the operator are provided, it tests if the
   * contains any refinement value.
   * @method
   * @param {string} attribute attribute for which the refinement is applied
   * @param {string} [operator] operator of the refinement
   * @param {string} [value] value of the refinement
   * @return {boolean} true if it is refined
   */
  isNumericRefined: function isNumericRefined(attribute, operator, value) {
    if (value === undefined && operator === undefined) {
      return !!this.numericRefinements[attribute];
    }

    var isOperatorDefined =
      this.numericRefinements[attribute] &&
      this.numericRefinements[attribute][operator] !== undefined;

    if (value === undefined || !isOperatorDefined) {
      return isOperatorDefined;
    }

    var parsedValue = valToNumber(value);
    var isAttributeValueDefined =
      findArray(this.numericRefinements[attribute][operator], parsedValue) !==
      undefined;

    return isOperatorDefined && isAttributeValueDefined;
  },
  /**
   * Returns true if the tag refined, false otherwise
   * @method
   * @param {string} tag the tag to check
   * @return {boolean}
   */
  isTagRefined: function isTagRefined(tag) {
    return this.tagRefinements.indexOf(tag) !== -1;
  },
  /**
   * Returns the list of all disjunctive facets refined
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {string[]}
   */
  getRefinedDisjunctiveFacets: function getRefinedDisjunctiveFacets() {
    var self = this;

    // attributes used for numeric filter can also be disjunctive
    var disjunctiveNumericRefinedFacets = intersection(
      Object.keys(this.numericRefinements).filter(function(facet) {
        return Object.keys(self.numericRefinements[facet]).length > 0;
      }),
      this.disjunctiveFacets
    );

    return Object.keys(this.disjunctiveFacetsRefinements).filter(function(facet) {
      return self.disjunctiveFacetsRefinements[facet].length > 0;
    })
      .concat(disjunctiveNumericRefinedFacets)
      .concat(this.getRefinedHierarchicalFacets());
  },
  /**
   * Returns the list of all disjunctive facets refined
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {string[]}
   */
  getRefinedHierarchicalFacets: function getRefinedHierarchicalFacets() {
    var self = this;
    return intersection(
      // enforce the order between the two arrays,
      // so that refinement name index === hierarchical facet index
      this.hierarchicalFacets.map(function(facet) { return facet.name; }),
      Object.keys(this.hierarchicalFacetsRefinements).filter(function(facet) {
        return self.hierarchicalFacetsRefinements[facet].length > 0;
      })
    );
  },
  /**
   * Returned the list of all disjunctive facets not refined
   * @method
   * @return {string[]}
   */
  getUnrefinedDisjunctiveFacets: function() {
    var refinedFacets = this.getRefinedDisjunctiveFacets();

    return this.disjunctiveFacets.filter(function(f) {
      return refinedFacets.indexOf(f) === -1;
    });
  },

  managedParameters: [
    'index',

    'facets',
    'disjunctiveFacets',
    'facetsRefinements',
    'hierarchicalFacets',
    'facetsExcludes',

    'disjunctiveFacetsRefinements',
    'numericRefinements',
    'tagRefinements',
    'hierarchicalFacetsRefinements'
  ],
  getQueryParams: function getQueryParams() {
    var managedParameters = this.managedParameters;

    var queryParams = {};

    var self = this;
    Object.keys(this).forEach(function(paramName) {
      var paramValue = self[paramName];
      if (managedParameters.indexOf(paramName) === -1 && paramValue !== undefined) {
        queryParams[paramName] = paramValue;
      }
    });

    return queryParams;
  },
  /**
   * Let the user set a specific value for a given parameter. Will return the
   * same instance if the parameter is invalid or if the value is the same as the
   * previous one.
   * @method
   * @param {string} parameter the parameter name
   * @param {any} value the value to be set, must be compliant with the definition
   * of the attribute on the object
   * @return {SearchParameters} the updated state
   */
  setQueryParameter: function setParameter(parameter, value) {
    if (this[parameter] === value) return this;

    var modification = {};

    modification[parameter] = value;

    return this.setQueryParameters(modification);
  },
  /**
   * Let the user set any of the parameters with a plain object.
   * @method
   * @param {object} params all the keys and the values to be updated
   * @return {SearchParameters} a new updated instance
   */
  setQueryParameters: function setQueryParameters(params) {
    if (!params) return this;

    var error = SearchParameters.validate(this, params);

    if (error) {
      throw error;
    }

    var self = this;
    var nextWithNumbers = SearchParameters._parseNumbers(params);
    var previousPlainObject = Object.keys(this).reduce(function(acc, key) {
      acc[key] = self[key];
      return acc;
    }, {});

    var nextPlainObject = Object.keys(nextWithNumbers).reduce(
      function(previous, key) {
        var isPreviousValueDefined = previous[key] !== undefined;
        var isNextValueDefined = nextWithNumbers[key] !== undefined;

        if (isPreviousValueDefined && !isNextValueDefined) {
          return omit(previous, [key]);
        }

        if (isNextValueDefined) {
          previous[key] = nextWithNumbers[key];
        }

        return previous;
      },
      previousPlainObject
    );

    return new this.constructor(nextPlainObject);
  },

  /**
   * Returns a new instance with the page reset. Two scenarios possible:
   * the page is omitted -> return the given instance
   * the page is set -> return a new instance with a page of 0
   * @return {SearchParameters} a new updated instance
   */
  resetPage: function() {
    if (this.page === undefined) {
      return this;
    }

    return this.setPage(0);
  },

  /**
   * Helper function to get the hierarchicalFacet separator or the default one (`>`)
   * @param  {object} hierarchicalFacet
   * @return {string} returns the hierarchicalFacet.separator or `>` as default
   */
  _getHierarchicalFacetSortBy: function(hierarchicalFacet) {
    return hierarchicalFacet.sortBy || ['isRefined:desc', 'name:asc'];
  },

  /**
   * Helper function to get the hierarchicalFacet separator or the default one (`>`)
   * @private
   * @param  {object} hierarchicalFacet
   * @return {string} returns the hierarchicalFacet.separator or `>` as default
   */
  _getHierarchicalFacetSeparator: function(hierarchicalFacet) {
    return hierarchicalFacet.separator || ' > ';
  },

  /**
   * Helper function to get the hierarchicalFacet prefix path or null
   * @private
   * @param  {object} hierarchicalFacet
   * @return {string} returns the hierarchicalFacet.rootPath or null as default
   */
  _getHierarchicalRootPath: function(hierarchicalFacet) {
    return hierarchicalFacet.rootPath || null;
  },

  /**
   * Helper function to check if we show the parent level of the hierarchicalFacet
   * @private
   * @param  {object} hierarchicalFacet
   * @return {string} returns the hierarchicalFacet.showParentLevel or true as default
   */
  _getHierarchicalShowParentLevel: function(hierarchicalFacet) {
    if (typeof hierarchicalFacet.showParentLevel === 'boolean') {
      return hierarchicalFacet.showParentLevel;
    }
    return true;
  },

  /**
   * Helper function to get the hierarchicalFacet by it's name
   * @param  {string} hierarchicalFacetName
   * @return {object} a hierarchicalFacet
   */
  getHierarchicalFacetByName: function(hierarchicalFacetName) {
    return find(
      this.hierarchicalFacets,
      function(f) {
        return f.name === hierarchicalFacetName;
      }
    );
  },

  /**
   * Get the current breadcrumb for a hierarchical facet, as an array
   * @param  {string} facetName Hierarchical facet name
   * @return {array.<string>} the path as an array of string
   */
  getHierarchicalFacetBreadcrumb: function(facetName) {
    if (!this.isHierarchicalFacet(facetName)) {
      return [];
    }

    var refinement = this.getHierarchicalRefinement(facetName)[0];
    if (!refinement) return [];

    var separator = this._getHierarchicalFacetSeparator(
      this.getHierarchicalFacetByName(facetName)
    );
    var path = refinement.split(separator);
    return path.map(function(part) {
      return part.trim();
    });
  },

  toString: function() {
    return JSON.stringify(this, null, 2);
  }
};

/**
 * Callback used for clearRefinement method
 * @callback SearchParameters.clearCallback
 * @param {OperatorList|FacetList} value the value of the filter
 * @param {string} key the current attribute name
 * @param {string} type `numeric`, `disjunctiveFacet`, `conjunctiveFacet`, `hierarchicalFacet` or `exclude`
 * depending on the type of facet
 * @return {boolean} `true` if the element should be removed. `false` otherwise.
 */
module.exports = SearchParameters;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = generateTrees;

var orderBy = __webpack_require__(/*! ../functions/orderBy */ "./node_modules/algoliasearch-helper/src/functions/orderBy.js");
var find = __webpack_require__(/*! ../functions/find */ "./node_modules/algoliasearch-helper/src/functions/find.js");
var prepareHierarchicalFacetSortBy = __webpack_require__(/*! ../functions/formatSort */ "./node_modules/algoliasearch-helper/src/functions/formatSort.js");
var fv = __webpack_require__(/*! ../functions/escapeFacetValue */ "./node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js");
var escapeFacetValue = fv.escapeFacetValue;
var unescapeFacetValue = fv.unescapeFacetValue;

function generateTrees(state) {
  return function generate(hierarchicalFacetResult, hierarchicalFacetIndex) {
    var hierarchicalFacet = state.hierarchicalFacets[hierarchicalFacetIndex];
    var hierarchicalFacetRefinement =
      (state.hierarchicalFacetsRefinements[hierarchicalFacet.name] &&
        state.hierarchicalFacetsRefinements[hierarchicalFacet.name][0]) ||
      '';
    var hierarchicalSeparator = state._getHierarchicalFacetSeparator(
      hierarchicalFacet
    );
    var hierarchicalRootPath = state._getHierarchicalRootPath(
      hierarchicalFacet
    );
    var hierarchicalShowParentLevel = state._getHierarchicalShowParentLevel(
      hierarchicalFacet
    );
    var sortBy = prepareHierarchicalFacetSortBy(
      state._getHierarchicalFacetSortBy(hierarchicalFacet)
    );

    var rootExhaustive = hierarchicalFacetResult.every(function(facetResult) {
      return facetResult.exhaustive;
    });

    var generateTreeFn = generateHierarchicalTree(
      sortBy,
      hierarchicalSeparator,
      hierarchicalRootPath,
      hierarchicalShowParentLevel,
      hierarchicalFacetRefinement
    );

    var results = hierarchicalFacetResult;

    if (hierarchicalRootPath) {
      results = hierarchicalFacetResult.slice(
        hierarchicalRootPath.split(hierarchicalSeparator).length
      );
    }

    return results.reduce(generateTreeFn, {
      name: state.hierarchicalFacets[hierarchicalFacetIndex].name,
      count: null, // root level, no count
      isRefined: true, // root level, always refined
      path: null, // root level, no path
      escapedValue: null,
      exhaustive: rootExhaustive,
      data: null
    });
  };
}

function generateHierarchicalTree(
  sortBy,
  hierarchicalSeparator,
  hierarchicalRootPath,
  hierarchicalShowParentLevel,
  currentRefinement
) {
  return function generateTree(
    hierarchicalTree,
    hierarchicalFacetResult,
    currentHierarchicalLevel
  ) {
    var parent = hierarchicalTree;

    if (currentHierarchicalLevel > 0) {
      var level = 0;

      parent = hierarchicalTree;

      while (level < currentHierarchicalLevel) {
        /**
         * @type {object[]]} hierarchical data
         */
        var data = parent && Array.isArray(parent.data) ? parent.data : [];
        parent = find(data, function(subtree) {
          return subtree.isRefined;
        });
        level++;
      }
    }

    // we found a refined parent, let's add current level data under it
    if (parent) {
      // filter values in case an object has multiple categories:
      //   {
      //     categories: {
      //       level0: ['beers', 'bières'],
      //       level1: ['beers > IPA', 'bières > Belges']
      //     }
      //   }
      //
      // If parent refinement is `beers`, then we do not want to have `bières > Belges`
      // showing up

      var picked = Object.keys(hierarchicalFacetResult.data)
        .map(function(facetValue) {
          return [facetValue, hierarchicalFacetResult.data[facetValue]];
        })
        .filter(function(tuple) {
          var facetValue = tuple[0];
          return onlyMatchingTree(
            facetValue,
            parent.path || hierarchicalRootPath,
            currentRefinement,
            hierarchicalSeparator,
            hierarchicalRootPath,
            hierarchicalShowParentLevel
          );
        });

      parent.data = orderBy(
        picked.map(function(tuple) {
          var facetValue = tuple[0];
          var facetCount = tuple[1];

          return format(
            facetCount,
            facetValue,
            hierarchicalSeparator,
            unescapeFacetValue(currentRefinement),
            hierarchicalFacetResult.exhaustive
          );
        }),
        sortBy[0],
        sortBy[1]
      );
    }

    return hierarchicalTree;
  };
}

function onlyMatchingTree(
  facetValue,
  parentPath,
  currentRefinement,
  hierarchicalSeparator,
  hierarchicalRootPath,
  hierarchicalShowParentLevel
) {
  // we want the facetValue is a child of hierarchicalRootPath
  if (
    hierarchicalRootPath &&
    (facetValue.indexOf(hierarchicalRootPath) !== 0 ||
      hierarchicalRootPath === facetValue)
  ) {
    return false;
  }

  // we always want root levels (only when there is no prefix path)
  return (
    (!hierarchicalRootPath &&
      facetValue.indexOf(hierarchicalSeparator) === -1) ||
    // if there is a rootPath, being root level mean 1 level under rootPath
    (hierarchicalRootPath &&
      facetValue.split(hierarchicalSeparator).length -
        hierarchicalRootPath.split(hierarchicalSeparator).length ===
        1) ||
    // if current refinement is a root level and current facetValue is a root level,
    // keep the facetValue
    (facetValue.indexOf(hierarchicalSeparator) === -1 &&
      currentRefinement.indexOf(hierarchicalSeparator) === -1) ||
    // currentRefinement is a child of the facet value
    currentRefinement.indexOf(facetValue) === 0 ||
    // facetValue is a child of the current parent, add it
    (facetValue.indexOf(parentPath + hierarchicalSeparator) === 0 &&
      (hierarchicalShowParentLevel ||
        facetValue.indexOf(currentRefinement) === 0))
  );
}

function format(
  facetCount,
  facetValue,
  hierarchicalSeparator,
  currentRefinement,
  exhaustive
) {
  var parts = facetValue.split(hierarchicalSeparator);
  return {
    name: parts[parts.length - 1].trim(),
    path: facetValue,
    escapedValue: escapeFacetValue(facetValue),
    count: facetCount,
    isRefined:
      currentRefinement === facetValue ||
      currentRefinement.indexOf(facetValue + hierarchicalSeparator) === 0,
    exhaustive: exhaustive,
    data: null
  };
}


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/SearchResults/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/SearchResults/index.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var merge = __webpack_require__(/*! ../functions/merge */ "./node_modules/algoliasearch-helper/src/functions/merge.js");
var defaultsPure = __webpack_require__(/*! ../functions/defaultsPure */ "./node_modules/algoliasearch-helper/src/functions/defaultsPure.js");
var orderBy = __webpack_require__(/*! ../functions/orderBy */ "./node_modules/algoliasearch-helper/src/functions/orderBy.js");
var compact = __webpack_require__(/*! ../functions/compact */ "./node_modules/algoliasearch-helper/src/functions/compact.js");
var find = __webpack_require__(/*! ../functions/find */ "./node_modules/algoliasearch-helper/src/functions/find.js");
var findIndex = __webpack_require__(/*! ../functions/findIndex */ "./node_modules/algoliasearch-helper/src/functions/findIndex.js");
var formatSort = __webpack_require__(/*! ../functions/formatSort */ "./node_modules/algoliasearch-helper/src/functions/formatSort.js");
var fv = __webpack_require__(/*! ../functions/escapeFacetValue */ "./node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js");
var escapeFacetValue = fv.escapeFacetValue;
var unescapeFacetValue = fv.unescapeFacetValue;

var generateHierarchicalTree = __webpack_require__(/*! ./generate-hierarchical-tree */ "./node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js");

/**
 * @typedef SearchResults.Facet
 * @type {object}
 * @property {string} name name of the attribute in the record
 * @property {object} data the faceting data: value, number of entries
 * @property {object} stats undefined unless facet_stats is retrieved from algolia
 */

/**
 * @typedef SearchResults.HierarchicalFacet
 * @type {object}
 * @property {string} name name of the current value given the hierarchical level, trimmed.
 * If root node, you get the facet name
 * @property {number} count number of objects matching this hierarchical value
 * @property {string} path the current hierarchical value full path
 * @property {boolean} isRefined `true` if the current value was refined, `false` otherwise
 * @property {HierarchicalFacet[]} data sub values for the current level
 */

/**
 * @typedef SearchResults.FacetValue
 * @type {object}
 * @property {string} name the facet value itself
 * @property {number} count times this facet appears in the results
 * @property {boolean} isRefined is the facet currently selected
 * @property {boolean} isExcluded is the facet currently excluded (only for conjunctive facets)
 */

/**
 * @typedef Refinement
 * @type {object}
 * @property {string} type the type of filter used:
 * `numeric`, `facet`, `exclude`, `disjunctive`, `hierarchical`
 * @property {string} attributeName name of the attribute used for filtering
 * @property {string} name the value of the filter
 * @property {number} numericValue the value as a number. Only for numeric filters.
 * @property {string} operator the operator used. Only for numeric filters.
 * @property {number} count the number of computed hits for this filter. Only on facets.
 * @property {boolean} exhaustive if the count is exhaustive
 */

/**
 * @param {string[]} attributes
 */
function getIndices(attributes) {
  var indices = {};

  attributes.forEach(function(val, idx) {
    indices[val] = idx;
  });

  return indices;
}

function assignFacetStats(dest, facetStats, key) {
  if (facetStats && facetStats[key]) {
    dest.stats = facetStats[key];
  }
}

/**
 * @typedef {Object} HierarchicalFacet
 * @property {string} name
 * @property {string[]} attributes
 */

/**
 * @param {HierarchicalFacet[]} hierarchicalFacets
 * @param {string} hierarchicalAttributeName
 */
function findMatchingHierarchicalFacetFromAttributeName(
  hierarchicalFacets,
  hierarchicalAttributeName
) {
  return find(hierarchicalFacets, function facetKeyMatchesAttribute(
    hierarchicalFacet
  ) {
    var facetNames = hierarchicalFacet.attributes || [];
    return facetNames.indexOf(hierarchicalAttributeName) > -1;
  });
}

/*eslint-disable */
/**
 * Constructor for SearchResults
 * @class
 * @classdesc SearchResults contains the results of a query to Algolia using the
 * {@link AlgoliaSearchHelper}.
 * @param {SearchParameters} state state that led to the response
 * @param {array.<object>} results the results from algolia client
 * @example <caption>SearchResults of the first query in
 * <a href="http://demos.algolia.com/instant-search-demo">the instant search demo</a></caption>
{
   "hitsPerPage": 10,
   "processingTimeMS": 2,
   "facets": [
      {
         "name": "type",
         "data": {
            "HardGood": 6627,
            "BlackTie": 550,
            "Music": 665,
            "Software": 131,
            "Game": 456,
            "Movie": 1571
         },
         "exhaustive": false
      },
      {
         "exhaustive": false,
         "data": {
            "Free shipping": 5507
         },
         "name": "shipping"
      }
  ],
   "hits": [
      {
         "thumbnailImage": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_54x108_s.gif",
         "_highlightResult": {
            "shortDescription": {
               "matchLevel": "none",
               "value": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
               "matchedWords": []
            },
            "category": {
               "matchLevel": "none",
               "value": "Computer Security Software",
               "matchedWords": []
            },
            "manufacturer": {
               "matchedWords": [],
               "value": "Webroot",
               "matchLevel": "none"
            },
            "name": {
               "value": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
               "matchedWords": [],
               "matchLevel": "none"
            }
         },
         "image": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_105x210_sc.jpg",
         "shipping": "Free shipping",
         "bestSellingRank": 4,
         "shortDescription": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
         "url": "http://www.bestbuy.com/site/webroot-secureanywhere-internet-security-3-devi…d=1219060687969&skuId=1688832&cmp=RMX&ky=2d3GfEmNIzjA0vkzveHdZEBgpPCyMnLTJ",
         "name": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
         "category": "Computer Security Software",
         "salePrice_range": "1 - 50",
         "objectID": "1688832",
         "type": "Software",
         "customerReviewCount": 5980,
         "salePrice": 49.99,
         "manufacturer": "Webroot"
      },
      ....
  ],
   "nbHits": 10000,
   "disjunctiveFacets": [
      {
         "exhaustive": false,
         "data": {
            "5": 183,
            "12": 112,
            "7": 149,
            ...
         },
         "name": "customerReviewCount",
         "stats": {
            "max": 7461,
            "avg": 157.939,
            "min": 1
         }
      },
      {
         "data": {
            "Printer Ink": 142,
            "Wireless Speakers": 60,
            "Point & Shoot Cameras": 48,
            ...
         },
         "name": "category",
         "exhaustive": false
      },
      {
         "exhaustive": false,
         "data": {
            "> 5000": 2,
            "1 - 50": 6524,
            "501 - 2000": 566,
            "201 - 500": 1501,
            "101 - 200": 1360,
            "2001 - 5000": 47
         },
         "name": "salePrice_range"
      },
      {
         "data": {
            "Dynex™": 202,
            "Insignia™": 230,
            "PNY": 72,
            ...
         },
         "name": "manufacturer",
         "exhaustive": false
      }
  ],
   "query": "",
   "nbPages": 100,
   "page": 0,
   "index": "bestbuy"
}
 **/
/*eslint-enable */
function SearchResults(state, results, options) {
  var mainSubResponse = results[0];

  this._rawResults = results;

  var self = this;

  // https://www.algolia.com/doc/api-reference/api-methods/search/#response
  Object.keys(mainSubResponse).forEach(function(key) {
    self[key] = mainSubResponse[key];
  });

  // Make every key of the result options reachable from the instance
  Object.keys(options || {}).forEach(function(key) {
    self[key] = options[key];
  });

  /**
   * query used to generate the results
   * @name query
   * @member {string}
   * @memberof SearchResults
   * @instance
   */
  /**
   * The query as parsed by the engine given all the rules.
   * @name parsedQuery
   * @member {string}
   * @memberof SearchResults
   * @instance
   */
  /**
   * all the records that match the search parameters. Each record is
   * augmented with a new attribute `_highlightResult`
   * which is an object keyed by attribute and with the following properties:
   *  - `value` : the value of the facet highlighted (html)
   *  - `matchLevel`: full, partial or none depending on how the query terms match
   * @name hits
   * @member {object[]}
   * @memberof SearchResults
   * @instance
   */
  /**
   * index where the results come from
   * @name index
   * @member {string}
   * @memberof SearchResults
   * @instance
   */
  /**
   * number of hits per page requested
   * @name hitsPerPage
   * @member {number}
   * @memberof SearchResults
   * @instance
   */
  /**
   * total number of hits of this query on the index
   * @name nbHits
   * @member {number}
   * @memberof SearchResults
   * @instance
   */
  /**
   * total number of pages with respect to the number of hits per page and the total number of hits
   * @name nbPages
   * @member {number}
   * @memberof SearchResults
   * @instance
   */
  /**
   * current page
   * @name page
   * @member {number}
   * @memberof SearchResults
   * @instance
   */
  /**
   * The position if the position was guessed by IP.
   * @name aroundLatLng
   * @member {string}
   * @memberof SearchResults
   * @instance
   * @example "48.8637,2.3615",
   */
  /**
   * The radius computed by Algolia.
   * @name automaticRadius
   * @member {string}
   * @memberof SearchResults
   * @instance
   * @example "126792922",
   */
  /**
   * String identifying the server used to serve this request.
   *
   * getRankingInfo needs to be set to `true` for this to be returned
   *
   * @name serverUsed
   * @member {string}
   * @memberof SearchResults
   * @instance
   * @example "c7-use-2.algolia.net",
   */
  /**
   * Boolean that indicates if the computation of the counts did time out.
   * @deprecated
   * @name timeoutCounts
   * @member {boolean}
   * @memberof SearchResults
   * @instance
   */
  /**
   * Boolean that indicates if the computation of the hits did time out.
   * @deprecated
   * @name timeoutHits
   * @member {boolean}
   * @memberof SearchResults
   * @instance
   */
  /**
   * True if the counts of the facets is exhaustive
   * @name exhaustiveFacetsCount
   * @member {boolean}
   * @memberof SearchResults
   * @instance
   */
  /**
   * True if the number of hits is exhaustive
   * @name exhaustiveNbHits
   * @member {boolean}
   * @memberof SearchResults
   * @instance
   */
  /**
   * Contains the userData if they are set by a [query rule](https://www.algolia.com/doc/guides/query-rules/query-rules-overview/).
   * @name userData
   * @member {object[]}
   * @memberof SearchResults
   * @instance
   */
  /**
   * queryID is the unique identifier of the query used to generate the current search results.
   * This value is only available if the `clickAnalytics` search parameter is set to `true`.
   * @name queryID
   * @member {string}
   * @memberof SearchResults
   * @instance
   */

  /**
   * sum of the processing time of all the queries
   * @member {number}
   */
  this.processingTimeMS = results.reduce(function(sum, result) {
    return result.processingTimeMS === undefined
      ? sum
      : sum + result.processingTimeMS;
  }, 0);

  /**
   * disjunctive facets results
   * @member {SearchResults.Facet[]}
   */
  this.disjunctiveFacets = [];
  /**
   * disjunctive facets results
   * @member {SearchResults.HierarchicalFacet[]}
   */
  this.hierarchicalFacets = state.hierarchicalFacets.map(function initFutureTree() {
    return [];
  });
  /**
   * other facets results
   * @member {SearchResults.Facet[]}
   */
  this.facets = [];

  var disjunctiveFacets = state.getRefinedDisjunctiveFacets();

  var facetsIndices = getIndices(state.facets);
  var disjunctiveFacetsIndices = getIndices(state.disjunctiveFacets);
  var nextDisjunctiveResult = 1;

  // Since we send request only for disjunctive facets that have been refined,
  // we get the facets information from the first, general, response.

  var mainFacets = mainSubResponse.facets || {};

  Object.keys(mainFacets).forEach(function(facetKey) {
    var facetValueObject = mainFacets[facetKey];

    var hierarchicalFacet = findMatchingHierarchicalFacetFromAttributeName(
      state.hierarchicalFacets,
      facetKey
    );

    if (hierarchicalFacet) {
      // Place the hierarchicalFacet data at the correct index depending on
      // the attributes order that was defined at the helper initialization
      var facetIndex = hierarchicalFacet.attributes.indexOf(facetKey);
      var idxAttributeName = findIndex(state.hierarchicalFacets, function(f) {
        return f.name === hierarchicalFacet.name;
      });
      self.hierarchicalFacets[idxAttributeName][facetIndex] = {
        attribute: facetKey,
        data: facetValueObject,
        exhaustive: mainSubResponse.exhaustiveFacetsCount
      };
    } else {
      var isFacetDisjunctive = state.disjunctiveFacets.indexOf(facetKey) !== -1;
      var isFacetConjunctive = state.facets.indexOf(facetKey) !== -1;
      var position;

      if (isFacetDisjunctive) {
        position = disjunctiveFacetsIndices[facetKey];
        self.disjunctiveFacets[position] = {
          name: facetKey,
          data: facetValueObject,
          exhaustive: mainSubResponse.exhaustiveFacetsCount
        };
        assignFacetStats(self.disjunctiveFacets[position], mainSubResponse.facets_stats, facetKey);
      }
      if (isFacetConjunctive) {
        position = facetsIndices[facetKey];
        self.facets[position] = {
          name: facetKey,
          data: facetValueObject,
          exhaustive: mainSubResponse.exhaustiveFacetsCount
        };
        assignFacetStats(self.facets[position], mainSubResponse.facets_stats, facetKey);
      }
    }
  });

  // Make sure we do not keep holes within the hierarchical facets
  this.hierarchicalFacets = compact(this.hierarchicalFacets);

  // aggregate the refined disjunctive facets
  disjunctiveFacets.forEach(function(disjunctiveFacet) {
    var result = results[nextDisjunctiveResult];
    var facets = result && result.facets ? result.facets : {};
    var hierarchicalFacet = state.getHierarchicalFacetByName(disjunctiveFacet);

    // There should be only item in facets.
    Object.keys(facets).forEach(function(dfacet) {
      var facetResults = facets[dfacet];

      var position;

      if (hierarchicalFacet) {
        position = findIndex(state.hierarchicalFacets, function(f) {
          return f.name === hierarchicalFacet.name;
        });
        var attributeIndex = findIndex(self.hierarchicalFacets[position], function(f) {
          return f.attribute === dfacet;
        });

        // previous refinements and no results so not able to find it
        if (attributeIndex === -1) {
          return;
        }

        self.hierarchicalFacets[position][attributeIndex].data = merge(
          {},
          self.hierarchicalFacets[position][attributeIndex].data,
          facetResults
        );
      } else {
        position = disjunctiveFacetsIndices[dfacet];

        var dataFromMainRequest = mainSubResponse.facets && mainSubResponse.facets[dfacet] || {};

        self.disjunctiveFacets[position] = {
          name: dfacet,
          data: defaultsPure({}, facetResults, dataFromMainRequest),
          exhaustive: result.exhaustiveFacetsCount
        };
        assignFacetStats(self.disjunctiveFacets[position], result.facets_stats, dfacet);

        if (state.disjunctiveFacetsRefinements[dfacet]) {
          state.disjunctiveFacetsRefinements[dfacet].forEach(function(refinementValue) {
            // add the disjunctive refinements if it is no more retrieved
            if (!self.disjunctiveFacets[position].data[refinementValue] &&
              state.disjunctiveFacetsRefinements[dfacet].indexOf(unescapeFacetValue(refinementValue)) > -1) {
              self.disjunctiveFacets[position].data[refinementValue] = 0;
            }
          });
        }
      }
    });
    nextDisjunctiveResult++;
  });

  // if we have some parent level values for hierarchical facets, merge them
  state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
    var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
    var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);

    var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
    // if we are already at a root refinement (or no refinement at all), there is no
    // root level values request
    if (currentRefinement.length === 0 || currentRefinement[0].split(separator).length < 2) {
      return;
    }

    results.slice(nextDisjunctiveResult).forEach(function(result) {
      var facets = result && result.facets
        ? result.facets
        : {};

      Object.keys(facets).forEach(function(dfacet) {
        var facetResults = facets[dfacet];
        var position = findIndex(state.hierarchicalFacets, function(f) {
          return f.name === hierarchicalFacet.name;
        });
        var attributeIndex = findIndex(self.hierarchicalFacets[position], function(f) {
          return f.attribute === dfacet;
        });

        // previous refinements and no results so not able to find it
        if (attributeIndex === -1) {
          return;
        }

        // when we always get root levels, if the hits refinement is `beers > IPA` (count: 5),
        // then the disjunctive values will be `beers` (count: 100),
        // but we do not want to display
        //   | beers (100)
        //     > IPA (5)
        // We want
        //   | beers (5)
        //     > IPA (5)
        var defaultData = {};

        if (currentRefinement.length > 0) {
          var root = currentRefinement[0].split(separator)[0];
          defaultData[root] = self.hierarchicalFacets[position][attributeIndex].data[root];
        }

        self.hierarchicalFacets[position][attributeIndex].data = defaultsPure(
          defaultData,
          facetResults,
          self.hierarchicalFacets[position][attributeIndex].data
        );
      });

      nextDisjunctiveResult++;
    });
  });

  // add the excludes
  Object.keys(state.facetsExcludes).forEach(function(facetName) {
    var excludes = state.facetsExcludes[facetName];
    var position = facetsIndices[facetName];

    self.facets[position] = {
      name: facetName,
      data: mainSubResponse.facets[facetName],
      exhaustive: mainSubResponse.exhaustiveFacetsCount
    };
    excludes.forEach(function(facetValue) {
      self.facets[position] = self.facets[position] || {name: facetName};
      self.facets[position].data = self.facets[position].data || {};
      self.facets[position].data[facetValue] = 0;
    });
  });

  /**
   * @type {Array}
   */
  this.hierarchicalFacets = this.hierarchicalFacets.map(generateHierarchicalTree(state));

  /**
   * @type {Array}
   */
  this.facets = compact(this.facets);
  /**
   * @type {Array}
   */
  this.disjunctiveFacets = compact(this.disjunctiveFacets);

  this._state = state;
}

/**
 * Get a facet object with its name
 * @deprecated
 * @param {string} name name of the faceted attribute
 * @return {SearchResults.Facet} the facet object
 */
SearchResults.prototype.getFacetByName = function(name) {
  function predicate(facet) {
    return facet.name === name;
  }

  return find(this.facets, predicate) ||
    find(this.disjunctiveFacets, predicate) ||
    find(this.hierarchicalFacets, predicate);
};

/**
 * Get the facet values of a specified attribute from a SearchResults object.
 * @private
 * @param {SearchResults} results the search results to search in
 * @param {string} attribute name of the faceted attribute to search for
 * @return {array|object} facet values. For the hierarchical facets it is an object.
 */
function extractNormalizedFacetValues(results, attribute) {
  function predicate(facet) {
    return facet.name === attribute;
  }

  if (results._state.isConjunctiveFacet(attribute)) {
    var facet = find(results.facets, predicate);
    if (!facet) return [];

    return Object.keys(facet.data).map(function(name) {
      var value = escapeFacetValue(name);
      return {
        name: name,
        escapedValue: value,
        count: facet.data[name],
        isRefined: results._state.isFacetRefined(attribute, value),
        isExcluded: results._state.isExcludeRefined(attribute, name)
      };
    });
  } else if (results._state.isDisjunctiveFacet(attribute)) {
    var disjunctiveFacet = find(results.disjunctiveFacets, predicate);
    if (!disjunctiveFacet) return [];

    return Object.keys(disjunctiveFacet.data).map(function(name) {
      var value = escapeFacetValue(name);
      return {
        name: name,
        escapedValue: value,
        count: disjunctiveFacet.data[name],
        isRefined: results._state.isDisjunctiveFacetRefined(attribute, value)
      };
    });
  } else if (results._state.isHierarchicalFacet(attribute)) {
    var hierarchicalFacetValues = find(results.hierarchicalFacets, predicate);
    if (!hierarchicalFacetValues) return hierarchicalFacetValues;

    var hierarchicalFacet = results._state.getHierarchicalFacetByName(attribute);
    var currentRefinementSplit = unescapeFacetValue(
      results._state.getHierarchicalRefinement(attribute)[0] || ''
    ).split(results._state._getHierarchicalFacetSeparator(hierarchicalFacet));
    currentRefinementSplit.unshift(attribute);

    setIsRefined(hierarchicalFacetValues, currentRefinementSplit, 0);

    return hierarchicalFacetValues;
  }
}

/**
 * Set the isRefined of a hierarchical facet result based on the current state.
 * @param {SearchResults.HierarchicalFacet} item Hierarchical facet to fix
 * @param {string[]} currentRefinementSplit array of parts of the current hierarchical refinement
 * @param {number} depth recursion depth in the currentRefinement
 */
function setIsRefined(item, currentRefinement, depth) {
  item.isRefined = item.name === currentRefinement[depth];
  if (item.data) {
    item.data.forEach(function(child) {
      setIsRefined(child, currentRefinement, depth + 1);
    });
  }
}

/**
 * Sort nodes of a hierarchical or disjunctive facet results
 * @private
 * @param {function} sortFn
 * @param {HierarchicalFacet|Array} node node upon which we want to apply the sort
 * @param {string[]} names attribute names
 * @param {number} [level=0] current index in the names array
 */
function recSort(sortFn, node, names, level) {
  level = level || 0;

  if (Array.isArray(node)) {
    return sortFn(node, names[level]);
  }

  if (!node.data || node.data.length === 0) {
    return node;
  }

  var children = node.data.map(function(childNode) {
    return recSort(sortFn, childNode, names, level + 1);
  });
  var sortedChildren = sortFn(children, names[level]);
  var newNode = defaultsPure({data: sortedChildren}, node);
  return newNode;
}

SearchResults.DEFAULT_SORT = ['isRefined:desc', 'count:desc', 'name:asc'];

function vanillaSortFn(order, data) {
  return data.sort(order);
}

/**
 * @typedef FacetOrdering
 * @type {Object}
 * @property {string[]} [order]
 * @property {'count' | 'alpha' | 'hidden'} [sortRemainingBy]
 */

/**
 * Sorts facet arrays via their facet ordering
 * @param {Array} facetValues the values
 * @param {FacetOrdering} facetOrdering the ordering
 * @returns {Array}
 */
function sortViaFacetOrdering(facetValues, facetOrdering) {
  var orderedFacets = [];
  var remainingFacets = [];

  var order = facetOrdering.order || [];
  /**
   * an object with the keys being the values in order, the values their index:
   * ['one', 'two'] -> { one: 0, two: 1 }
   */
  var reverseOrder = order.reduce(function(acc, name, i) {
    acc[name] = i;
    return acc;
  }, {});

  facetValues.forEach(function(item) {
    // hierarchical facets get sorted using their raw name
    var name = item.path || item.name;
    if (reverseOrder[name] !== undefined) {
      orderedFacets[reverseOrder[name]] = item;
    } else {
      remainingFacets.push(item);
    }
  });

  orderedFacets = orderedFacets.filter(function(facet) {
    return facet;
  });

  var sortRemainingBy = facetOrdering.sortRemainingBy;
  var ordering;
  if (sortRemainingBy === 'hidden') {
    return orderedFacets;
  } else if (sortRemainingBy === 'alpha') {
    ordering = [['path', 'name'], ['asc', 'asc']];
  } else {
    ordering = [['count'], ['desc']];
  }

  return orderedFacets.concat(
    orderBy(remainingFacets, ordering[0], ordering[1])
  );
}

/**
 * @param {SearchResults} results the search results class
 * @param {string} attribute the attribute to retrieve ordering of
 * @returns {FacetOrdering=}
 */
function getFacetOrdering(results, attribute) {
  return (
    results.renderingContent &&
    results.renderingContent.facetOrdering &&
    results.renderingContent.facetOrdering.values &&
    results.renderingContent.facetOrdering.values[attribute]
  );
}

/**
 * Get a the list of values for a given facet attribute. Those values are sorted
 * refinement first, descending count (bigger value on top), and name ascending
 * (alphabetical order). The sort formula can overridden using either string based
 * predicates or a function.
 *
 * This method will return all the values returned by the Algolia engine plus all
 * the values already refined. This means that it can happen that the
 * `maxValuesPerFacet` [configuration](https://www.algolia.com/doc/rest-api/search#param-maxValuesPerFacet)
 * might not be respected if you have facet values that are already refined.
 * @param {string} attribute attribute name
 * @param {object} opts configuration options.
 * @param {boolean} [opts.facetOrdering]
 * Force the use of facetOrdering from the result if a sortBy is present. If
 * sortBy isn't present, facetOrdering will be used automatically.
 * @param {Array.<string> | function} opts.sortBy
 * When using strings, it consists of
 * the name of the [FacetValue](#SearchResults.FacetValue) or the
 * [HierarchicalFacet](#SearchResults.HierarchicalFacet) attributes with the
 * order (`asc` or `desc`). For example to order the value by count, the
 * argument would be `['count:asc']`.
 *
 * If only the attribute name is specified, the ordering defaults to the one
 * specified in the default value for this attribute.
 *
 * When not specified, the order is
 * ascending.  This parameter can also be a function which takes two facet
 * values and should return a number, 0 if equal, 1 if the first argument is
 * bigger or -1 otherwise.
 *
 * The default value for this attribute `['isRefined:desc', 'count:desc', 'name:asc']`
 * @return {FacetValue[]|HierarchicalFacet|undefined} depending on the type of facet of
 * the attribute requested (hierarchical, disjunctive or conjunctive)
 * @example
 * helper.on('result', function(event){
 *   //get values ordered only by name ascending using the string predicate
 *   event.results.getFacetValues('city', {sortBy: ['name:asc']});
 *   //get values  ordered only by count ascending using a function
 *   event.results.getFacetValues('city', {
 *     // this is equivalent to ['count:asc']
 *     sortBy: function(a, b) {
 *       if (a.count === b.count) return 0;
 *       if (a.count > b.count)   return 1;
 *       if (b.count > a.count)   return -1;
 *     }
 *   });
 * });
 */
SearchResults.prototype.getFacetValues = function(attribute, opts) {
  var facetValues = extractNormalizedFacetValues(this, attribute);
  if (!facetValues) {
    return undefined;
  }

  var options = defaultsPure({}, opts, {
    sortBy: SearchResults.DEFAULT_SORT,
    // if no sortBy is given, attempt to sort based on facetOrdering
    // if it is given, we still allow to sort via facet ordering first
    facetOrdering: !(opts && opts.sortBy)
  });

  var results = this;
  var attributes;
  if (Array.isArray(facetValues)) {
    attributes = [attribute];
  } else {
    var config = results._state.getHierarchicalFacetByName(facetValues.name);
    attributes = config.attributes;
  }

  return recSort(function(data, facetName) {
    if (options.facetOrdering) {
      var facetOrdering = getFacetOrdering(results, facetName);
      if (Boolean(facetOrdering)) {
        return sortViaFacetOrdering(data, facetOrdering);
      }
    }

    if (Array.isArray(options.sortBy)) {
      var order = formatSort(options.sortBy, SearchResults.DEFAULT_SORT);
      return orderBy(data, order[0], order[1]);
    } else if (typeof options.sortBy === 'function') {
      return vanillaSortFn(options.sortBy, data);
    }
    throw new Error(
      'options.sortBy is optional but if defined it must be ' +
        'either an array of string (predicates) or a sorting function'
    );
  }, facetValues, attributes);
};

/**
 * Returns the facet stats if attribute is defined and the facet contains some.
 * Otherwise returns undefined.
 * @param {string} attribute name of the faceted attribute
 * @return {object} The stats of the facet
 */
SearchResults.prototype.getFacetStats = function(attribute) {
  if (this._state.isConjunctiveFacet(attribute)) {
    return getFacetStatsIfAvailable(this.facets, attribute);
  } else if (this._state.isDisjunctiveFacet(attribute)) {
    return getFacetStatsIfAvailable(this.disjunctiveFacets, attribute);
  }

  return undefined;
};

/**
 * @typedef {Object} FacetListItem
 * @property {string} name
 */

/**
 * @param {FacetListItem[]} facetList (has more items, but enough for here)
 * @param {string} facetName
 */
function getFacetStatsIfAvailable(facetList, facetName) {
  var data = find(facetList, function(facet) {
    return facet.name === facetName;
  });
  return data && data.stats;
}

/**
 * Returns all refinements for all filters + tags. It also provides
 * additional information: count and exhaustiveness for each filter.
 *
 * See the [refinement type](#Refinement) for an exhaustive view of the available
 * data.
 *
 * Note that for a numeric refinement, results are grouped per operator, this
 * means that it will return responses for operators which are empty.
 *
 * @return {Array.<Refinement>} all the refinements
 */
SearchResults.prototype.getRefinements = function() {
  var state = this._state;
  var results = this;
  var res = [];

  Object.keys(state.facetsRefinements).forEach(function(attributeName) {
    state.facetsRefinements[attributeName].forEach(function(name) {
      res.push(getRefinement(state, 'facet', attributeName, name, results.facets));
    });
  });

  Object.keys(state.facetsExcludes).forEach(function(attributeName) {
    state.facetsExcludes[attributeName].forEach(function(name) {
      res.push(getRefinement(state, 'exclude', attributeName, name, results.facets));
    });
  });

  Object.keys(state.disjunctiveFacetsRefinements).forEach(function(attributeName) {
    state.disjunctiveFacetsRefinements[attributeName].forEach(function(name) {
      res.push(getRefinement(state, 'disjunctive', attributeName, name, results.disjunctiveFacets));
    });
  });

  Object.keys(state.hierarchicalFacetsRefinements).forEach(function(attributeName) {
    state.hierarchicalFacetsRefinements[attributeName].forEach(function(name) {
      res.push(getHierarchicalRefinement(state, attributeName, name, results.hierarchicalFacets));
    });
  });


  Object.keys(state.numericRefinements).forEach(function(attributeName) {
    var operators = state.numericRefinements[attributeName];
    Object.keys(operators).forEach(function(operator) {
      operators[operator].forEach(function(value) {
        res.push({
          type: 'numeric',
          attributeName: attributeName,
          name: value,
          numericValue: value,
          operator: operator
        });
      });
    });
  });

  state.tagRefinements.forEach(function(name) {
    res.push({type: 'tag', attributeName: '_tags', name: name});
  });

  return res;
};

/**
 * @typedef {Object} Facet
 * @property {string} name
 * @property {Object} data
 * @property {boolean} exhaustive
 */

/**
 * @param {*} state
 * @param {*} type
 * @param {string} attributeName
 * @param {*} name
 * @param {Facet[]} resultsFacets
 */
function getRefinement(state, type, attributeName, name, resultsFacets) {
  var facet = find(resultsFacets, function(f) {
    return f.name === attributeName;
  });
  var count = facet && facet.data && facet.data[name] ? facet.data[name] : 0;
  var exhaustive = (facet && facet.exhaustive) || false;

  return {
    type: type,
    attributeName: attributeName,
    name: name,
    count: count,
    exhaustive: exhaustive
  };
}

/**
 * @param {*} state
 * @param {string} attributeName
 * @param {*} name
 * @param {Facet[]} resultsFacets
 */
function getHierarchicalRefinement(state, attributeName, name, resultsFacets) {
  var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
  var separator = state._getHierarchicalFacetSeparator(facetDeclaration);
  var split = name.split(separator);
  var rootFacet = find(resultsFacets, function(facet) {
    return facet.name === attributeName;
  });

  var facet = split.reduce(function(intermediateFacet, part) {
    var newFacet =
      intermediateFacet && find(intermediateFacet.data, function(f) {
        return f.name === part;
      });
    return newFacet !== undefined ? newFacet : intermediateFacet;
  }, rootFacet);

  var count = (facet && facet.count) || 0;
  var exhaustive = (facet && facet.exhaustive) || false;
  var path = (facet && facet.path) || '';

  return {
    type: 'hierarchical',
    attributeName: attributeName,
    name: path,
    count: count,
    exhaustive: exhaustive
  };
}

module.exports = SearchResults;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/algoliasearch.helper.js":
/*!***********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/algoliasearch.helper.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var SearchParameters = __webpack_require__(/*! ./SearchParameters */ "./node_modules/algoliasearch-helper/src/SearchParameters/index.js");
var SearchResults = __webpack_require__(/*! ./SearchResults */ "./node_modules/algoliasearch-helper/src/SearchResults/index.js");
var DerivedHelper = __webpack_require__(/*! ./DerivedHelper */ "./node_modules/algoliasearch-helper/src/DerivedHelper/index.js");
var requestBuilder = __webpack_require__(/*! ./requestBuilder */ "./node_modules/algoliasearch-helper/src/requestBuilder.js");

var EventEmitter = __webpack_require__(/*! @algolia/events */ "./node_modules/@algolia/events/events.js");
var inherits = __webpack_require__(/*! ./functions/inherits */ "./node_modules/algoliasearch-helper/src/functions/inherits.js");
var objectHasKeys = __webpack_require__(/*! ./functions/objectHasKeys */ "./node_modules/algoliasearch-helper/src/functions/objectHasKeys.js");
var omit = __webpack_require__(/*! ./functions/omit */ "./node_modules/algoliasearch-helper/src/functions/omit.js");
var merge = __webpack_require__(/*! ./functions/merge */ "./node_modules/algoliasearch-helper/src/functions/merge.js");

var version = __webpack_require__(/*! ./version */ "./node_modules/algoliasearch-helper/src/version.js");
var escapeFacetValue = (__webpack_require__(/*! ./functions/escapeFacetValue */ "./node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js").escapeFacetValue);

/**
 * Event triggered when a parameter is set or updated
 * @event AlgoliaSearchHelper#event:change
 * @property {object} event
 * @property {SearchParameters} event.state the current parameters with the latest changes applied
 * @property {SearchResults} event.results the previous results received from Algolia. `null` before the first request
 * @example
 * helper.on('change', function(event) {
 *   console.log('The parameters have changed');
 * });
 */

/**
 * Event triggered when a main search is sent to Algolia
 * @event AlgoliaSearchHelper#event:search
 * @property {object} event
 * @property {SearchParameters} event.state the parameters used for this search
 * @property {SearchResults} event.results the results from the previous search. `null` if it is the first search.
 * @example
 * helper.on('search', function(event) {
 *   console.log('Search sent');
 * });
 */

/**
 * Event triggered when a search using `searchForFacetValues` is sent to Algolia
 * @event AlgoliaSearchHelper#event:searchForFacetValues
 * @property {object} event
 * @property {SearchParameters} event.state the parameters used for this search it is the first search.
 * @property {string} event.facet the facet searched into
 * @property {string} event.query the query used to search in the facets
 * @example
 * helper.on('searchForFacetValues', function(event) {
 *   console.log('searchForFacetValues sent');
 * });
 */

/**
 * Event triggered when a search using `searchOnce` is sent to Algolia
 * @event AlgoliaSearchHelper#event:searchOnce
 * @property {object} event
 * @property {SearchParameters} event.state the parameters used for this search it is the first search.
 * @example
 * helper.on('searchOnce', function(event) {
 *   console.log('searchOnce sent');
 * });
 */

/**
 * Event triggered when the results are retrieved from Algolia
 * @event AlgoliaSearchHelper#event:result
 * @property {object} event
 * @property {SearchResults} event.results the results received from Algolia
 * @property {SearchParameters} event.state the parameters used to query Algolia. Those might be different from the one in the helper instance (for example if the network is unreliable).
 * @example
 * helper.on('result', function(event) {
 *   console.log('Search results received');
 * });
 */

/**
 * Event triggered when Algolia sends back an error. For example, if an unknown parameter is
 * used, the error can be caught using this event.
 * @event AlgoliaSearchHelper#event:error
 * @property {object} event
 * @property {Error} event.error the error returned by the Algolia.
 * @example
 * helper.on('error', function(event) {
 *   console.log('Houston we got a problem.');
 * });
 */

/**
 * Event triggered when the queue of queries have been depleted (with any result or outdated queries)
 * @event AlgoliaSearchHelper#event:searchQueueEmpty
 * @example
 * helper.on('searchQueueEmpty', function() {
 *   console.log('No more search pending');
 *   // This is received before the result event if we're not expecting new results
 * });
 *
 * helper.search();
 */

/**
 * Initialize a new AlgoliaSearchHelper
 * @class
 * @classdesc The AlgoliaSearchHelper is a class that ease the management of the
 * search. It provides an event based interface for search callbacks:
 *  - change: when the internal search state is changed.
 *    This event contains a {@link SearchParameters} object and the
 *    {@link SearchResults} of the last result if any.
 *  - search: when a search is triggered using the `search()` method.
 *  - result: when the response is retrieved from Algolia and is processed.
 *    This event contains a {@link SearchResults} object and the
 *    {@link SearchParameters} corresponding to this answer.
 *  - error: when the response is an error. This event contains the error returned by the server.
 * @param  {AlgoliaSearch} client an AlgoliaSearch client
 * @param  {string} index the index name to query
 * @param  {SearchParameters | object} options an object defining the initial
 * config of the search. It doesn't have to be a {SearchParameters},
 * just an object containing the properties you need from it.
 */
function AlgoliaSearchHelper(client, index, options) {
  if (typeof client.addAlgoliaAgent === 'function') {
    client.addAlgoliaAgent('JS Helper (' + version + ')');
  }

  this.setClient(client);
  var opts = options || {};
  opts.index = index;
  this.state = SearchParameters.make(opts);
  this.lastResults = null;
  this._queryId = 0;
  this._lastQueryIdReceived = -1;
  this.derivedHelpers = [];
  this._currentNbQueries = 0;
}

inherits(AlgoliaSearchHelper, EventEmitter);

/**
 * Start the search with the parameters set in the state. When the
 * method is called, it triggers a `search` event. The results will
 * be available through the `result` event. If an error occurs, an
 * `error` will be fired instead.
 * @return {AlgoliaSearchHelper}
 * @fires search
 * @fires result
 * @fires error
 * @chainable
 */
AlgoliaSearchHelper.prototype.search = function() {
  this._search({onlyWithDerivedHelpers: false});
  return this;
};

AlgoliaSearchHelper.prototype.searchOnlyWithDerivedHelpers = function() {
  this._search({onlyWithDerivedHelpers: true});
  return this;
};

/**
 * Gets the search query parameters that would be sent to the Algolia Client
 * for the hits
 * @return {object} Query Parameters
 */
AlgoliaSearchHelper.prototype.getQuery = function() {
  var state = this.state;
  return requestBuilder._getHitsSearchParams(state);
};

/**
 * Start a search using a modified version of the current state. This method does
 * not trigger the helper lifecycle and does not modify the state kept internally
 * by the helper. This second aspect means that the next search call will be the
 * same as a search call before calling searchOnce.
 * @param {object} options can contain all the parameters that can be set to SearchParameters
 * plus the index
 * @param {function} [callback] optional callback executed when the response from the
 * server is back.
 * @return {promise|undefined} if a callback is passed the method returns undefined
 * otherwise it returns a promise containing an object with two keys :
 *  - content with a SearchResults
 *  - state with the state used for the query as a SearchParameters
 * @example
 * // Changing the number of records returned per page to 1
 * // This example uses the callback API
 * var state = helper.searchOnce({hitsPerPage: 1},
 *   function(error, content, state) {
 *     // if an error occurred it will be passed in error, otherwise its value is null
 *     // content contains the results formatted as a SearchResults
 *     // state is the instance of SearchParameters used for this search
 *   });
 * @example
 * // Changing the number of records returned per page to 1
 * // This example uses the promise API
 * var state1 = helper.searchOnce({hitsPerPage: 1})
 *                 .then(promiseHandler);
 *
 * function promiseHandler(res) {
 *   // res contains
 *   // {
 *   //   content : SearchResults
 *   //   state   : SearchParameters (the one used for this specific search)
 *   // }
 * }
 */
AlgoliaSearchHelper.prototype.searchOnce = function(options, cb) {
  var tempState = !options ? this.state : this.state.setQueryParameters(options);
  var queries = requestBuilder._getQueries(tempState.index, tempState);
  var self = this;

  this._currentNbQueries++;

  this.emit('searchOnce', {
    state: tempState
  });

  if (cb) {
    this.client
      .search(queries)
      .then(function(content) {
        self._currentNbQueries--;
        if (self._currentNbQueries === 0) {
          self.emit('searchQueueEmpty');
        }

        cb(null, new SearchResults(tempState, content.results), tempState);
      })
      .catch(function(err) {
        self._currentNbQueries--;
        if (self._currentNbQueries === 0) {
          self.emit('searchQueueEmpty');
        }

        cb(err, null, tempState);
      });

    return undefined;
  }

  return this.client.search(queries).then(function(content) {
    self._currentNbQueries--;
    if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
    return {
      content: new SearchResults(tempState, content.results),
      state: tempState,
      _originalResponse: content
    };
  }, function(e) {
    self._currentNbQueries--;
    if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
    throw e;
  });
};

 /**
 * Start the search for answers with the parameters set in the state.
 * This method returns a promise.
 * @param {Object} options - the options for answers API call
 * @param {string[]} options.attributesForPrediction - Attributes to use for predictions. If empty, `searchableAttributes` is used instead.
 * @param {string[]} options.queryLanguages - The languages in the query. Currently only supports ['en'].
 * @param {number} options.nbHits - Maximum number of answers to retrieve from the Answers Engine. Cannot be greater than 1000.
 *
 * @return {promise} the answer results
 * @deprecated answers is deprecated and will be replaced with new initiatives
 */
AlgoliaSearchHelper.prototype.findAnswers = function(options) {
  console.warn('[algoliasearch-helper] answers is no longer supported');
  var state = this.state;
  var derivedHelper = this.derivedHelpers[0];
  if (!derivedHelper) {
    return Promise.resolve([]);
  }
  var derivedState = derivedHelper.getModifiedState(state);
  var data = merge(
    {
      attributesForPrediction: options.attributesForPrediction,
      nbHits: options.nbHits
    },
    {
      params: omit(requestBuilder._getHitsSearchParams(derivedState), [
        'attributesToSnippet',
        'hitsPerPage',
        'restrictSearchableAttributes',
        'snippetEllipsisText' // FIXME remove this line once the engine is fixed.
      ])
    }
  );

  var errorMessage = 'search for answers was called, but this client does not have a function client.initIndex(index).findAnswers';
  if (typeof this.client.initIndex !== 'function') {
    throw new Error(errorMessage);
  }
  var index = this.client.initIndex(derivedState.index);
  if (typeof index.findAnswers !== 'function') {
    throw new Error(errorMessage);
  }
  return index.findAnswers(derivedState.query, options.queryLanguages, data);
};

/**
 * Structure of each result when using
 * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
 * @typedef FacetSearchHit
 * @type {object}
 * @property {string} value the facet value
 * @property {string} highlighted the facet value highlighted with the query string
 * @property {number} count number of occurrence of this facet value
 * @property {boolean} isRefined true if the value is already refined
 */

/**
 * Structure of the data resolved by the
 * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
 * promise.
 * @typedef FacetSearchResult
 * @type {object}
 * @property {FacetSearchHit} facetHits the results for this search for facet values
 * @property {number} processingTimeMS time taken by the query inside the engine
 */

/**
 * Search for facet values based on an query and the name of a faceted attribute. This
 * triggers a search and will return a promise. On top of using the query, it also sends
 * the parameters from the state so that the search is narrowed down to only the possible values.
 *
 * See the description of [FacetSearchResult](reference.html#FacetSearchResult)
 * @param {string} facet the name of the faceted attribute
 * @param {string} query the string query for the search
 * @param {number} [maxFacetHits] the maximum number values returned. Should be > 0 and <= 100
 * @param {object} [userState] the set of custom parameters to use on top of the current state. Setting a property to `undefined` removes
 * it in the generated query.
 * @return {promise.<FacetSearchResult>} the results of the search
 */
AlgoliaSearchHelper.prototype.searchForFacetValues = function(facet, query, maxFacetHits, userState) {
  var clientHasSFFV = typeof this.client.searchForFacetValues === 'function';
  var clientHasInitIndex = typeof this.client.initIndex === 'function';
  if (
    !clientHasSFFV &&
    !clientHasInitIndex &&
    typeof this.client.search !== 'function'
  ) {
    throw new Error(
      'search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues'
    );
  }

  var state = this.state.setQueryParameters(userState || {});
  var isDisjunctive = state.isDisjunctiveFacet(facet);
  var algoliaQuery = requestBuilder.getSearchForFacetQuery(facet, query, maxFacetHits, state);

  this._currentNbQueries++;
  var self = this;
  var searchForFacetValuesPromise;
  // newer algoliasearch ^3.27.1 - ~4.0.0
  if (clientHasSFFV) {
    searchForFacetValuesPromise = this.client.searchForFacetValues([
      {indexName: state.index, params: algoliaQuery}
    ]);
    // algoliasearch < 3.27.1
  } else if (clientHasInitIndex) {
    searchForFacetValuesPromise = this.client
      .initIndex(state.index)
      .searchForFacetValues(algoliaQuery);
    // algoliasearch ~5.0.0
  } else {
    // @MAJOR only use client.search
    delete algoliaQuery.facetName;
    searchForFacetValuesPromise = this.client
      .search([
        {
          type: 'facet',
          facet: facet,
          indexName: state.index,
          params: algoliaQuery
        }
      ])
      .then(function processResponse(response) {
        return response.results[0];
      });
  }

  this.emit('searchForFacetValues', {
    state: state,
    facet: facet,
    query: query
  });

  return searchForFacetValuesPromise.then(function addIsRefined(content) {
    self._currentNbQueries--;
    if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');

    content = Array.isArray(content) ? content[0] : content;

    content.facetHits.forEach(function(f) {
      f.escapedValue = escapeFacetValue(f.value);
      f.isRefined = isDisjunctive
        ? state.isDisjunctiveFacetRefined(facet, f.escapedValue)
        : state.isFacetRefined(facet, f.escapedValue);
    });

    return content;
  }, function(e) {
    self._currentNbQueries--;
    if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
    throw e;
  });
};

/**
 * Sets the text query used for the search.
 *
 * This method resets the current page to 0.
 * @param  {string} q the user query
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setQuery = function(q) {
  this._change({
    state: this.state.resetPage().setQuery(q),
    isPageReset: true
  });

  return this;
};

/**
 * Remove all the types of refinements except tags. A string can be provided to remove
 * only the refinements of a specific attribute. For more advanced use case, you can
 * provide a function instead. This function should follow the
 * [clearCallback definition](#SearchParameters.clearCallback).
 *
 * This method resets the current page to 0.
 * @param {string} [name] optional name of the facet / attribute on which we want to remove all refinements
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 * @example
 * // Removing all the refinements
 * helper.clearRefinements().search();
 * @example
 * // Removing all the filters on a the category attribute.
 * helper.clearRefinements('category').search();
 * @example
 * // Removing only the exclude filters on the category facet.
 * helper.clearRefinements(function(value, attribute, type) {
 *   return type === 'exclude' && attribute === 'category';
 * }).search();
 */
AlgoliaSearchHelper.prototype.clearRefinements = function(name) {
  this._change({
    state: this.state.resetPage().clearRefinements(name),
    isPageReset: true
  });

  return this;
};

/**
 * Remove all the tag filters.
 *
 * This method resets the current page to 0.
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.clearTags = function() {
  this._change({
    state: this.state.resetPage().clearTags(),
    isPageReset: true
  });

  return this;
};

/**
 * Adds a disjunctive filter to a faceted attribute with the `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value (will be converted to string)
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addDisjunctiveFacetRefinement = function(facet, value) {
  this._change({
    state: this.state.resetPage().addDisjunctiveFacetRefinement(facet, value),
    isPageReset: true
  });

  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addDisjunctiveFacetRefinement}
 */
AlgoliaSearchHelper.prototype.addDisjunctiveRefine = function() {
  return this.addDisjunctiveFacetRefinement.apply(this, arguments);
};

/**
 * Adds a refinement on a hierarchical facet. It will throw
 * an exception if the facet is not defined or if the facet
 * is already refined.
 *
 * This method resets the current page to 0.
 * @param {string} facet the facet name
 * @param {string} path the hierarchical facet path
 * @return {AlgoliaSearchHelper}
 * @throws Error if the facet is not defined or if the facet is refined
 * @chainable
 * @fires change
 */
AlgoliaSearchHelper.prototype.addHierarchicalFacetRefinement = function(facet, value) {
  this._change({
    state: this.state.resetPage().addHierarchicalFacetRefinement(facet, value),
    isPageReset: true
  });

  return this;
};

/**
 * Adds a an numeric filter to an attribute with the `operator` and `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} attribute the attribute on which the numeric filter applies
 * @param  {string} operator the operator of the filter
 * @param  {number} value the value of the filter
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addNumericRefinement = function(attribute, operator, value) {
  this._change({
    state: this.state.resetPage().addNumericRefinement(attribute, operator, value),
    isPageReset: true
  });

  return this;
};

/**
 * Adds a filter to a faceted attribute with the `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value (will be converted to string)
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addFacetRefinement = function(facet, value) {
  this._change({
    state: this.state.resetPage().addFacetRefinement(facet, value),
    isPageReset: true
  });

  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetRefinement}
 */
AlgoliaSearchHelper.prototype.addRefine = function() {
  return this.addFacetRefinement.apply(this, arguments);
};


/**
 * Adds a an exclusion filter to a faceted attribute with the `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value (will be converted to string)
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addFacetExclusion = function(facet, value) {
  this._change({
    state: this.state.resetPage().addExcludeRefinement(facet, value),
    isPageReset: true
  });

  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetExclusion}
 */
AlgoliaSearchHelper.prototype.addExclude = function() {
  return this.addFacetExclusion.apply(this, arguments);
};

/**
 * Adds a tag filter with the `tag` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param {string} tag the tag to add to the filter
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addTag = function(tag) {
  this._change({
    state: this.state.resetPage().addTagRefinement(tag),
    isPageReset: true
  });

  return this;
};

/**
 * Removes an numeric filter to an attribute with the `operator` and `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * Some parameters are optional, triggering different behavior:
 *  - if the value is not provided, then all the numeric value will be removed for the
 *  specified attribute/operator couple.
 *  - if the operator is not provided either, then all the numeric filter on this attribute
 *  will be removed.
 *
 * This method resets the current page to 0.
 * @param  {string} attribute the attribute on which the numeric filter applies
 * @param  {string} [operator] the operator of the filter
 * @param  {number} [value] the value of the filter
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeNumericRefinement = function(attribute, operator, value) {
  this._change({
    state: this.state.resetPage().removeNumericRefinement(attribute, operator, value),
    isPageReset: true
  });

  return this;
};

/**
 * Removes a disjunctive filter to a faceted attribute with the `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * If the value is omitted, then this method will remove all the filters for the
 * attribute.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} [value] the associated value
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeDisjunctiveFacetRefinement = function(facet, value) {
  this._change({
    state: this.state.resetPage().removeDisjunctiveFacetRefinement(facet, value),
    isPageReset: true
  });

  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeDisjunctiveFacetRefinement}
 */
AlgoliaSearchHelper.prototype.removeDisjunctiveRefine = function() {
  return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
};

/**
 * Removes the refinement set on a hierarchical facet.
 * @param {string} facet the facet name
 * @return {AlgoliaSearchHelper}
 * @throws Error if the facet is not defined or if the facet is not refined
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeHierarchicalFacetRefinement = function(facet) {
  this._change({
    state: this.state.resetPage().removeHierarchicalFacetRefinement(facet),
    isPageReset: true
  });

  return this;
};

/**
 * Removes a filter to a faceted attribute with the `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * If the value is omitted, then this method will remove all the filters for the
 * attribute.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} [value] the associated value
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeFacetRefinement = function(facet, value) {
  this._change({
    state: this.state.resetPage().removeFacetRefinement(facet, value),
    isPageReset: true
  });

  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetRefinement}
 */
AlgoliaSearchHelper.prototype.removeRefine = function() {
  return this.removeFacetRefinement.apply(this, arguments);
};

/**
 * Removes an exclusion filter to a faceted attribute with the `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * If the value is omitted, then this method will remove all the filters for the
 * attribute.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} [value] the associated value
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeFacetExclusion = function(facet, value) {
  this._change({
    state: this.state.resetPage().removeExcludeRefinement(facet, value),
    isPageReset: true
  });

  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetExclusion}
 */
AlgoliaSearchHelper.prototype.removeExclude = function() {
  return this.removeFacetExclusion.apply(this, arguments);
};

/**
 * Removes a tag filter with the `tag` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param {string} tag tag to remove from the filter
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeTag = function(tag) {
  this._change({
    state: this.state.resetPage().removeTagRefinement(tag),
    isPageReset: true
  });

  return this;
};

/**
 * Adds or removes an exclusion filter to a faceted attribute with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.toggleFacetExclusion = function(facet, value) {
  this._change({
    state: this.state.resetPage().toggleExcludeFacetRefinement(facet, value),
    isPageReset: true
  });

  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetExclusion}
 */
AlgoliaSearchHelper.prototype.toggleExclude = function() {
  return this.toggleFacetExclusion.apply(this, arguments);
};

/**
 * Adds or removes a filter to a faceted attribute with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method can be used for conjunctive, disjunctive and hierarchical filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 * @throws Error will throw an error if the facet is not declared in the settings of the helper
 * @fires change
 * @chainable
 * @deprecated since version 2.19.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
 */
AlgoliaSearchHelper.prototype.toggleRefinement = function(facet, value) {
  return this.toggleFacetRefinement(facet, value);
};

/**
 * Adds or removes a filter to a faceted attribute with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method can be used for conjunctive, disjunctive and hierarchical filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 * @throws Error will throw an error if the facet is not declared in the settings of the helper
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.toggleFacetRefinement = function(facet, value) {
  this._change({
    state: this.state.resetPage().toggleFacetRefinement(facet, value),
    isPageReset: true
  });

  return this;
};

/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
 */
AlgoliaSearchHelper.prototype.toggleRefine = function() {
  return this.toggleFacetRefinement.apply(this, arguments);
};

/**
 * Adds or removes a tag filter with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method resets the current page to 0.
 * @param {string} tag tag to remove or add
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.toggleTag = function(tag) {
  this._change({
    state: this.state.resetPage().toggleTagRefinement(tag),
    isPageReset: true
  });

  return this;
};

/**
 * Increments the page number by one.
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 * @example
 * helper.setPage(0).nextPage().getPage();
 * // returns 1
 */
AlgoliaSearchHelper.prototype.nextPage = function() {
  var page = this.state.page || 0;
  return this.setPage(page + 1);
};

/**
 * Decrements the page number by one.
 * @fires change
 * @return {AlgoliaSearchHelper}
 * @chainable
 * @example
 * helper.setPage(1).previousPage().getPage();
 * // returns 0
 */
AlgoliaSearchHelper.prototype.previousPage = function() {
  var page = this.state.page || 0;
  return this.setPage(page - 1);
};

/**
 * @private
 */
function setCurrentPage(page) {
  if (page < 0) throw new Error('Page requested below 0.');

  this._change({
    state: this.state.setPage(page),
    isPageReset: false
  });

  return this;
}

/**
 * Change the current page
 * @deprecated
 * @param  {number} page The page number
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setCurrentPage = setCurrentPage;

/**
 * Updates the current page.
 * @function
 * @param  {number} page The page number
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setPage = setCurrentPage;

/**
 * Updates the name of the index that will be targeted by the query.
 *
 * This method resets the current page to 0.
 * @param {string} name the index name
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setIndex = function(name) {
  this._change({
    state: this.state.resetPage().setIndex(name),
    isPageReset: true
  });

  return this;
};

/**
 * Update a parameter of the search. This method reset the page
 *
 * The complete list of parameters is available on the
 * [Algolia website](https://www.algolia.com/doc/rest#query-an-index).
 * The most commonly used parameters have their own [shortcuts](#query-parameters-shortcuts)
 * or benefit from higher-level APIs (all the kind of filters and facets have their own API)
 *
 * This method resets the current page to 0.
 * @param {string} parameter name of the parameter to update
 * @param {any} value new value of the parameter
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 * @example
 * helper.setQueryParameter('hitsPerPage', 20).search();
 */
AlgoliaSearchHelper.prototype.setQueryParameter = function(parameter, value) {
  this._change({
    state: this.state.resetPage().setQueryParameter(parameter, value),
    isPageReset: true
  });

  return this;
};

/**
 * Set the whole state (warning: will erase previous state)
 * @param {SearchParameters} newState the whole new state
 * @return {AlgoliaSearchHelper}
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setState = function(newState) {
  this._change({
    state: SearchParameters.make(newState),
    isPageReset: false
  });

  return this;
};

/**
 * Override the current state without triggering a change event.
 * Do not use this method unless you know what you are doing. (see the example
 * for a legit use case)
 * @param {SearchParameters} newState the whole new state
 * @return {AlgoliaSearchHelper}
 * @example
 *  helper.on('change', function(state){
 *    // In this function you might want to find a way to store the state in the url/history
 *    updateYourURL(state)
 *  })
 *  window.onpopstate = function(event){
 *    // This is naive though as you should check if the state is really defined etc.
 *    helper.overrideStateWithoutTriggeringChangeEvent(event.state).search()
 *  }
 * @chainable
 */
AlgoliaSearchHelper.prototype.overrideStateWithoutTriggeringChangeEvent = function(newState) {
  this.state = new SearchParameters(newState);
  return this;
};

/**
 * Check if an attribute has any numeric, conjunctive, disjunctive or hierarchical filters.
 * @param {string} attribute the name of the attribute
 * @return {boolean} true if the attribute is filtered by at least one value
 * @example
 * // hasRefinements works with numeric, conjunctive, disjunctive and hierarchical filters
 * helper.hasRefinements('price'); // false
 * helper.addNumericRefinement('price', '>', 100);
 * helper.hasRefinements('price'); // true
 *
 * helper.hasRefinements('color'); // false
 * helper.addFacetRefinement('color', 'blue');
 * helper.hasRefinements('color'); // true
 *
 * helper.hasRefinements('material'); // false
 * helper.addDisjunctiveFacetRefinement('material', 'plastic');
 * helper.hasRefinements('material'); // true
 *
 * helper.hasRefinements('categories'); // false
 * helper.toggleFacetRefinement('categories', 'kitchen > knife');
 * helper.hasRefinements('categories'); // true
 *
 */
AlgoliaSearchHelper.prototype.hasRefinements = function(attribute) {
  if (objectHasKeys(this.state.getNumericRefinements(attribute))) {
    return true;
  } else if (this.state.isConjunctiveFacet(attribute)) {
    return this.state.isFacetRefined(attribute);
  } else if (this.state.isDisjunctiveFacet(attribute)) {
    return this.state.isDisjunctiveFacetRefined(attribute);
  } else if (this.state.isHierarchicalFacet(attribute)) {
    return this.state.isHierarchicalFacetRefined(attribute);
  }

  // there's currently no way to know that the user did call `addNumericRefinement` at some point
  // thus we cannot distinguish if there once was a numeric refinement that was cleared
  // so we will return false in every other situations to be consistent
  // while what we should do here is throw because we did not find the attribute in any type
  // of refinement
  return false;
};

/**
 * Check if a value is excluded for a specific faceted attribute. If the value
 * is omitted then the function checks if there is any excluding refinements.
 *
 * @param  {string}  facet name of the attribute for used for faceting
 * @param  {string}  [value] optional value. If passed will test that this value
   * is filtering the given facet.
 * @return {boolean} true if refined
 * @example
 * helper.isExcludeRefined('color'); // false
 * helper.isExcludeRefined('color', 'blue') // false
 * helper.isExcludeRefined('color', 'red') // false
 *
 * helper.addFacetExclusion('color', 'red');
 *
 * helper.isExcludeRefined('color'); // true
 * helper.isExcludeRefined('color', 'blue') // false
 * helper.isExcludeRefined('color', 'red') // true
 */
AlgoliaSearchHelper.prototype.isExcluded = function(facet, value) {
  return this.state.isExcludeRefined(facet, value);
};

/**
 * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasRefinements}
 */
AlgoliaSearchHelper.prototype.isDisjunctiveRefined = function(facet, value) {
  return this.state.isDisjunctiveFacetRefined(facet, value);
};

/**
 * Check if the string is a currently filtering tag.
 * @param {string} tag tag to check
 * @return {boolean}
 */
AlgoliaSearchHelper.prototype.hasTag = function(tag) {
  return this.state.isTagRefined(tag);
};

/**
 * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasTag}
 */
AlgoliaSearchHelper.prototype.isTagRefined = function() {
  return this.hasTagRefinements.apply(this, arguments);
};


/**
 * Get the name of the currently used index.
 * @return {string}
 * @example
 * helper.setIndex('highestPrice_products').getIndex();
 * // returns 'highestPrice_products'
 */
AlgoliaSearchHelper.prototype.getIndex = function() {
  return this.state.index;
};

function getCurrentPage() {
  return this.state.page;
}

/**
 * Get the currently selected page
 * @deprecated
 * @return {number} the current page
 */
AlgoliaSearchHelper.prototype.getCurrentPage = getCurrentPage;
/**
 * Get the currently selected page
 * @function
 * @return {number} the current page
 */
AlgoliaSearchHelper.prototype.getPage = getCurrentPage;

/**
 * Get all the tags currently set to filters the results.
 *
 * @return {string[]} The list of tags currently set.
 */
AlgoliaSearchHelper.prototype.getTags = function() {
  return this.state.tagRefinements;
};

/**
 * Get the list of refinements for a given attribute. This method works with
 * conjunctive, disjunctive, excluding and numerical filters.
 *
 * See also SearchResults#getRefinements
 *
 * @param {string} facetName attribute name used for faceting
 * @return {Array.<FacetRefinement|NumericRefinement>} All Refinement are objects that contain a value, and
 * a type. Numeric also contains an operator.
 * @example
 * helper.addNumericRefinement('price', '>', 100);
 * helper.getRefinements('price');
 * // [
 * //   {
 * //     "value": [
 * //       100
 * //     ],
 * //     "operator": ">",
 * //     "type": "numeric"
 * //   }
 * // ]
 * @example
 * helper.addFacetRefinement('color', 'blue');
 * helper.addFacetExclusion('color', 'red');
 * helper.getRefinements('color');
 * // [
 * //   {
 * //     "value": "blue",
 * //     "type": "conjunctive"
 * //   },
 * //   {
 * //     "value": "red",
 * //     "type": "exclude"
 * //   }
 * // ]
 * @example
 * helper.addDisjunctiveFacetRefinement('material', 'plastic');
 * // [
 * //   {
 * //     "value": "plastic",
 * //     "type": "disjunctive"
 * //   }
 * // ]
 */
AlgoliaSearchHelper.prototype.getRefinements = function(facetName) {
  var refinements = [];

  if (this.state.isConjunctiveFacet(facetName)) {
    var conjRefinements = this.state.getConjunctiveRefinements(facetName);

    conjRefinements.forEach(function(r) {
      refinements.push({
        value: r,
        type: 'conjunctive'
      });
    });

    var excludeRefinements = this.state.getExcludeRefinements(facetName);

    excludeRefinements.forEach(function(r) {
      refinements.push({
        value: r,
        type: 'exclude'
      });
    });
  } else if (this.state.isDisjunctiveFacet(facetName)) {
    var disjRefinements = this.state.getDisjunctiveRefinements(facetName);

    disjRefinements.forEach(function(r) {
      refinements.push({
        value: r,
        type: 'disjunctive'
      });
    });
  }

  var numericRefinements = this.state.getNumericRefinements(facetName);

  Object.keys(numericRefinements).forEach(function(operator) {
    var value = numericRefinements[operator];

    refinements.push({
      value: value,
      operator: operator,
      type: 'numeric'
    });
  });

  return refinements;
};

/**
 * Return the current refinement for the (attribute, operator)
 * @param {string} attribute attribute in the record
 * @param {string} operator operator applied on the refined values
 * @return {Array.<number|number[]>} refined values
 */
AlgoliaSearchHelper.prototype.getNumericRefinement = function(attribute, operator) {
  return this.state.getNumericRefinement(attribute, operator);
};

/**
 * Get the current breadcrumb for a hierarchical facet, as an array
 * @param  {string} facetName Hierarchical facet name
 * @return {array.<string>} the path as an array of string
 */
AlgoliaSearchHelper.prototype.getHierarchicalFacetBreadcrumb = function(facetName) {
  return this.state.getHierarchicalFacetBreadcrumb(facetName);
};

// /////////// PRIVATE

/**
 * Perform the underlying queries
 * @private
 * @return {undefined}
 * @fires search
 * @fires result
 * @fires error
 */
AlgoliaSearchHelper.prototype._search = function(options) {
  var state = this.state;
  var states = [];
  var mainQueries = [];

  if (!options.onlyWithDerivedHelpers) {
    mainQueries = requestBuilder._getQueries(state.index, state);

    states.push({
      state: state,
      queriesCount: mainQueries.length,
      helper: this
    });

    this.emit('search', {
      state: state,
      results: this.lastResults
    });
  }

  var derivedQueries = this.derivedHelpers.map(function(derivedHelper) {
    var derivedState = derivedHelper.getModifiedState(state);
    var derivedStateQueries = requestBuilder._getQueries(derivedState.index, derivedState);

    states.push({
      state: derivedState,
      queriesCount: derivedStateQueries.length,
      helper: derivedHelper
    });

    derivedHelper.emit('search', {
      state: derivedState,
      results: derivedHelper.lastResults
    });

    return derivedStateQueries;
  });

  var queries = Array.prototype.concat.apply(mainQueries, derivedQueries);
  var queryId = this._queryId++;

  this._currentNbQueries++;

  try {
    this.client.search(queries)
      .then(this._dispatchAlgoliaResponse.bind(this, states, queryId))
      .catch(this._dispatchAlgoliaError.bind(this, queryId));
  } catch (error) {
    // If we reach this part, we're in an internal error state
    this.emit('error', {
      error: error
    });
  }
};

/**
 * Transform the responses as sent by the server and transform them into a user
 * usable object that merge the results of all the batch requests. It will dispatch
 * over the different helper + derived helpers (when there are some).
 * @private
 * @param {array.<{SearchParameters, AlgoliaQueries, AlgoliaSearchHelper}>}
 *  state state used for to generate the request
 * @param {number} queryId id of the current request
 * @param {object} content content of the response
 * @return {undefined}
 */
AlgoliaSearchHelper.prototype._dispatchAlgoliaResponse = function(states, queryId, content) {
  // FIXME remove the number of outdated queries discarded instead of just one

  if (queryId < this._lastQueryIdReceived) {
    // Outdated answer
    return;
  }

  this._currentNbQueries -= (queryId - this._lastQueryIdReceived);
  this._lastQueryIdReceived = queryId;

  if (this._currentNbQueries === 0) this.emit('searchQueueEmpty');

  var results = content.results.slice();

  states.forEach(function(s) {
    var state = s.state;
    var queriesCount = s.queriesCount;
    var helper = s.helper;
    var specificResults = results.splice(0, queriesCount);

    var formattedResponse = helper.lastResults = new SearchResults(state, specificResults);

    helper.emit('result', {
      results: formattedResponse,
      state: state
    });
  });
};

AlgoliaSearchHelper.prototype._dispatchAlgoliaError = function(queryId, error) {
  if (queryId < this._lastQueryIdReceived) {
    // Outdated answer
    return;
  }

  this._currentNbQueries -= queryId - this._lastQueryIdReceived;
  this._lastQueryIdReceived = queryId;

  this.emit('error', {
    error: error
  });

  if (this._currentNbQueries === 0) this.emit('searchQueueEmpty');
};

AlgoliaSearchHelper.prototype.containsRefinement = function(query, facetFilters, numericFilters, tagFilters) {
  return query ||
    facetFilters.length !== 0 ||
    numericFilters.length !== 0 ||
    tagFilters.length !== 0;
};

/**
 * Test if there are some disjunctive refinements on the facet
 * @private
 * @param {string} facet the attribute to test
 * @return {boolean}
 */
AlgoliaSearchHelper.prototype._hasDisjunctiveRefinements = function(facet) {
  return this.state.disjunctiveRefinements[facet] &&
    this.state.disjunctiveRefinements[facet].length > 0;
};

AlgoliaSearchHelper.prototype._change = function(event) {
  var state = event.state;
  var isPageReset = event.isPageReset;

  if (state !== this.state) {
    this.state = state;

    this.emit('change', {
      state: this.state,
      results: this.lastResults,
      isPageReset: isPageReset
    });
  }
};

/**
 * Clears the cache of the underlying Algolia client.
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.clearCache = function() {
  this.client.clearCache && this.client.clearCache();
  return this;
};

/**
 * Updates the internal client instance. If the reference of the clients
 * are equal then no update is actually done.
 * @param  {AlgoliaSearch} newClient an AlgoliaSearch client
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.setClient = function(newClient) {
  if (this.client === newClient) return this;

  if (typeof newClient.addAlgoliaAgent === 'function') {
    newClient.addAlgoliaAgent('JS Helper (' + version + ')');
  }
  this.client = newClient;

  return this;
};

/**
 * Gets the instance of the currently used client.
 * @return {AlgoliaSearch}
 */
AlgoliaSearchHelper.prototype.getClient = function() {
  return this.client;
};

/**
 * Creates an derived instance of the Helper. A derived helper
 * is a way to request other indices synchronised with the lifecycle
 * of the main Helper. This mechanism uses the multiqueries feature
 * of Algolia to aggregate all the requests in a single network call.
 *
 * This method takes a function that is used to create a new SearchParameter
 * that will be used to create requests to Algolia. Those new requests
 * are created just before the `search` event. The signature of the function
 * is `SearchParameters -> SearchParameters`.
 *
 * This method returns a new DerivedHelper which is an EventEmitter
 * that fires the same `search`, `result` and `error` events. Those
 * events, however, will receive data specific to this DerivedHelper
 * and the SearchParameters that is returned by the call of the
 * parameter function.
 * @param {function} fn SearchParameters -> SearchParameters
 * @return {DerivedHelper}
 */
AlgoliaSearchHelper.prototype.derive = function(fn) {
  var derivedHelper = new DerivedHelper(this, fn);
  this.derivedHelpers.push(derivedHelper);
  return derivedHelper;
};

/**
 * This method detaches a derived Helper from the main one. Prefer using the one from the
 * derived helper itself, to remove the event listeners too.
 * @private
 * @return {undefined}
 * @throws Error
 */
AlgoliaSearchHelper.prototype.detachDerivedHelper = function(derivedHelper) {
  var pos = this.derivedHelpers.indexOf(derivedHelper);
  if (pos === -1) throw new Error('Derived helper already detached');
  this.derivedHelpers.splice(pos, 1);
};

/**
 * This method returns true if there is currently at least one on-going search.
 * @return {boolean} true if there is a search pending
 */
AlgoliaSearchHelper.prototype.hasPendingRequests = function() {
  return this._currentNbQueries > 0;
};

/**
 * @typedef AlgoliaSearchHelper.NumericRefinement
 * @type {object}
 * @property {number[]} value the numbers that are used for filtering this attribute with
 * the operator specified.
 * @property {string} operator the faceting data: value, number of entries
 * @property {string} type will be 'numeric'
 */

/**
 * @typedef AlgoliaSearchHelper.FacetRefinement
 * @type {object}
 * @property {string} value the string use to filter the attribute
 * @property {string} type the type of filter: 'conjunctive', 'disjunctive', 'exclude'
 */

module.exports = AlgoliaSearchHelper;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/compact.js":
/*!********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/compact.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function compact(array) {
  if (!Array.isArray(array)) {
    return [];
  }

  return array.filter(Boolean);
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/defaultsPure.js":
/*!*************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/defaultsPure.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


// NOTE: this behaves like lodash/defaults, but doesn't mutate the target
// it also preserve keys order
module.exports = function defaultsPure() {
  var sources = Array.prototype.slice.call(arguments);

  return sources.reduceRight(function(acc, source) {
    Object.keys(Object(source)).forEach(function(key) {
      if (source[key] === undefined) {
        return;
      }
      if (acc[key] !== undefined) {
        // remove if already added, so that we can add it in correct order
        delete acc[key];
      }
      acc[key] = source[key];
    });
    return acc;
  }, {});
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Replaces a leading - with \-
 * @private
 * @param {any} value the facet value to replace
 * @returns any
 */
function escapeFacetValue(value) {
  if (typeof value !== 'string') return value;

  return String(value).replace(/^-/, '\\-');
}

/**
 * Replaces a leading \- with -
 * @private
 * @param {any} value the escaped facet value
 * @returns any
 */
function unescapeFacetValue(value) {
  if (typeof value !== 'string') return value;

  return value.replace(/^\\-/, '-');
}

module.exports = {
  escapeFacetValue: escapeFacetValue,
  unescapeFacetValue: unescapeFacetValue
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/find.js":
/*!*****************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/find.js ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";


// @MAJOR can be replaced by native Array#find when we change support
module.exports = function find(array, comparator) {
  if (!Array.isArray(array)) {
    return undefined;
  }

  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return array[i];
    }
  }
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/findIndex.js":
/*!**********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/findIndex.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


// @MAJOR can be replaced by native Array#findIndex when we change support
module.exports = function find(array, comparator) {
  if (!Array.isArray(array)) {
    return -1;
  }

  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return i;
    }
  }
  return -1;
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/formatSort.js":
/*!***********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/formatSort.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var find = __webpack_require__(/*! ./find */ "./node_modules/algoliasearch-helper/src/functions/find.js");

/**
 * Transform sort format from user friendly notation to lodash format
 * @param {string[]} sortBy array of predicate of the form "attribute:order"
 * @param {string[]} [defaults] array of predicate of the form "attribute:order"
 * @return {array.<string[]>} array containing 2 elements : attributes, orders
 */
module.exports = function formatSort(sortBy, defaults) {
  var defaultInstructions = (defaults || []).map(function(sort) {
    return sort.split(':');
  });

  return sortBy.reduce(
    function preparePredicate(out, sort) {
      var sortInstruction = sort.split(':');

      var matchingDefault = find(defaultInstructions, function(
        defaultInstruction
      ) {
        return defaultInstruction[0] === sortInstruction[0];
      });

      if (sortInstruction.length > 1 || !matchingDefault) {
        out[0].push(sortInstruction[0]);
        out[1].push(sortInstruction[1]);
        return out;
      }

      out[0].push(matchingDefault[0]);
      out[1].push(matchingDefault[1]);
      return out;
    },
    [[], []]
  );
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/inherits.js":
/*!*********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/inherits.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


function inherits(ctor, superCtor) {
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}

module.exports = inherits;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/intersection.js":
/*!*************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/intersection.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


function intersection(arr1, arr2) {
  return arr1.filter(function(value, index) {
    return (
      arr2.indexOf(value) > -1 &&
      arr1.indexOf(value) === index /* skips duplicates */
    );
  });
}

module.exports = intersection;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/merge.js":
/*!******************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/merge.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";


function clone(value) {
  if (typeof value === 'object' && value !== null) {
    return _merge(Array.isArray(value) ? [] : {}, value);
  }
  return value;
}

function isObjectOrArrayOrFunction(value) {
  return (
    typeof value === 'function' ||
    Array.isArray(value) ||
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function _merge(target, source) {
  if (target === source) {
    return target;
  }

  for (var key in source) {
    if (
      !Object.prototype.hasOwnProperty.call(source, key) ||
      key === '__proto__' ||
      key === 'constructor'
    ) {
      continue;
    }

    var sourceVal = source[key];
    var targetVal = target[key];

    if (typeof targetVal !== 'undefined' && typeof sourceVal === 'undefined') {
      continue;
    }

    if (
      isObjectOrArrayOrFunction(targetVal) &&
      isObjectOrArrayOrFunction(sourceVal)
    ) {
      target[key] = _merge(targetVal, sourceVal);
    } else {
      target[key] = clone(sourceVal);
    }
  }
  return target;
}

/**
 * This method is like Object.assign, but recursively merges own and inherited
 * enumerable keyed properties of source objects into the destination object.
 *
 * NOTE: this behaves like lodash/merge, but:
 * - does mutate functions if they are a source
 * - treats non-plain objects as plain
 * - does not work for circular objects
 * - treats sparse arrays as sparse
 * - does not convert Array-like objects (Arguments, NodeLists, etc.) to arrays
 *
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 */

function merge(target) {
  if (!isObjectOrArrayOrFunction(target)) {
    target = {};
  }

  for (var i = 1, l = arguments.length; i < l; i++) {
    var source = arguments[i];

    if (isObjectOrArrayOrFunction(source)) {
      _merge(target, source);
    }
  }
  return target;
}

module.exports = merge;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/objectHasKeys.js":
/*!**************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/objectHasKeys.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";


function objectHasKeys(obj) {
  return obj && Object.keys(obj).length > 0;
}

module.exports = objectHasKeys;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/omit.js":
/*!*****************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/omit.js ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";


// https://github.com/babel/babel/blob/3aaafae053fa75febb3aa45d45b6f00646e30ba4/packages/babel-helpers/src/helpers.js#L604-L620
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source === null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key;
  var i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

module.exports = _objectWithoutPropertiesLoose;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/orderBy.js":
/*!********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/orderBy.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined;
    var valIsNull = value === null;

    var othIsDefined = other !== undefined;
    var othIsNull = other === null;

    if (
      (!othIsNull && value > other) ||
      (valIsNull && othIsDefined) ||
      !valIsDefined
    ) {
      return 1;
    }
    if (
      (!valIsNull && value < other) ||
      (othIsNull && valIsDefined) ||
      !othIsDefined
    ) {
      return -1;
    }
  }
  return 0;
}

/**
 * @param {Array<object>} collection object with keys in attributes
 * @param {Array<string>} iteratees attributes
 * @param {Array<string>} orders asc | desc
 */
function orderBy(collection, iteratees, orders) {
  if (!Array.isArray(collection)) {
    return [];
  }

  if (!Array.isArray(orders)) {
    orders = [];
  }

  var result = collection.map(function(value, index) {
    return {
      criteria: iteratees.map(function(iteratee) {
        return value[iteratee];
      }),
      index: index,
      value: value
    };
  });

  result.sort(function comparer(object, other) {
    var index = -1;

    while (++index < object.criteria.length) {
      var res = compareAscending(object.criteria[index], other.criteria[index]);
      if (res) {
        if (index >= orders.length) {
          return res;
        }
        if (orders[index] === 'desc') {
          return -res;
        }
        return res;
      }
    }

    // This ensures a stable sort in V8 and other engines.
    // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index;
  });

  return result.map(function(res) {
    return res.value;
  });
}

module.exports = orderBy;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/valToNumber.js":
/*!************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/valToNumber.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


function valToNumber(v) {
  if (typeof v === 'number') {
    return v;
  } else if (typeof v === 'string') {
    return parseFloat(v);
  } else if (Array.isArray(v)) {
    return v.map(valToNumber);
  }

  throw new Error('The value should be a number, a parsable string or an array of those.');
}

module.exports = valToNumber;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/requestBuilder.js":
/*!*****************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/requestBuilder.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var merge = __webpack_require__(/*! ./functions/merge */ "./node_modules/algoliasearch-helper/src/functions/merge.js");

function sortObject(obj) {
  return Object.keys(obj)
    .sort(function(a, b) {
      return a.localeCompare(b);
    })
    .reduce(function(acc, curr) {
      acc[curr] = obj[curr];
      return acc;
    }, {});
}

var requestBuilder = {
  /**
   * Get all the queries to send to the client, those queries can used directly
   * with the Algolia client.
   * @private
   * @return {object[]} The queries
   */
  _getQueries: function getQueries(index, state) {
    var queries = [];

    // One query for the hits
    queries.push({
      indexName: index,
      params: requestBuilder._getHitsSearchParams(state)
    });

    // One for each disjunctive facets
    state.getRefinedDisjunctiveFacets().forEach(function(refinedFacet) {
      queries.push({
        indexName: index,
        params: requestBuilder._getDisjunctiveFacetSearchParams(state, refinedFacet)
      });
    });

    // More to get the parent levels of the hierarchical facets when refined
    state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
      var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
      var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
      var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);

      // If we are deeper than level 0 (starting from `beer > IPA`)
      // we want to get all parent values
      if (currentRefinement.length > 0 && currentRefinement[0].split(separator).length > 1) {
        // We generate a map of the filters we will use for our facet values queries
        var filtersMap = currentRefinement[0].split(separator).slice(0, -1).reduce(
          function createFiltersMap(map, segment, level) {
            return map.concat({
              attribute: hierarchicalFacet.attributes[level],
              value: level === 0
                ? segment
                : [map[map.length - 1].value, segment].join(separator)
            });
          }
        , []);

        filtersMap.forEach(function(filter, level) {
          var params = requestBuilder._getDisjunctiveFacetSearchParams(
            state,
            filter.attribute,
            level === 0
          );

          // Keep facet filters unrelated to current hierarchical attributes
          function hasHierarchicalFacetFilter(value) {
            return hierarchicalFacet.attributes.some(function(attribute) {
              return attribute === value.split(':')[0];
            });
          }

          var filteredFacetFilters = (params.facetFilters || []).reduce(function(acc, facetFilter) {
            if (Array.isArray(facetFilter)) {
              var filtered = facetFilter.filter(function(filterValue) {
                return !hasHierarchicalFacetFilter(filterValue);
              });

              if (filtered.length > 0) {
                acc.push(filtered);
              }
            }

            if (typeof facetFilter === 'string' && !hasHierarchicalFacetFilter(facetFilter)) {
              acc.push(facetFilter);
            }

            return acc;
          }, []);

          var parent = filtersMap[level - 1];
          if (level > 0) {
            params.facetFilters = filteredFacetFilters.concat(parent.attribute + ':' + parent.value);
          } else {
            params.facetFilters = filteredFacetFilters.length > 0 ? filteredFacetFilters : undefined;
          }

          queries.push({indexName: index, params: params});
        });
      }
    });

    return queries;
  },

  /**
   * Build search parameters used to fetch hits
   * @private
   * @return {object.<string, any>}
   */
  _getHitsSearchParams: function(state) {
    var facets = state.facets
      .concat(state.disjunctiveFacets)
      .concat(requestBuilder._getHitsHierarchicalFacetsAttributes(state));


    var facetFilters = requestBuilder._getFacetFilters(state);
    var numericFilters = requestBuilder._getNumericFilters(state);
    var tagFilters = requestBuilder._getTagFilters(state);
    var additionalParams = {
      facets: facets.indexOf('*') > -1 ? ['*'] : facets,
      tagFilters: tagFilters
    };

    if (facetFilters.length > 0) {
      additionalParams.facetFilters = facetFilters;
    }

    if (numericFilters.length > 0) {
      additionalParams.numericFilters = numericFilters;
    }

    return sortObject(merge({}, state.getQueryParams(), additionalParams));
  },

  /**
   * Build search parameters used to fetch a disjunctive facet
   * @private
   * @param  {string} facet the associated facet name
   * @param  {boolean} hierarchicalRootLevel ?? FIXME
   * @return {object}
   */
  _getDisjunctiveFacetSearchParams: function(state, facet, hierarchicalRootLevel) {
    var facetFilters = requestBuilder._getFacetFilters(state, facet, hierarchicalRootLevel);
    var numericFilters = requestBuilder._getNumericFilters(state, facet);
    var tagFilters = requestBuilder._getTagFilters(state);
    var additionalParams = {
      hitsPerPage: 0,
      page: 0,
      analytics: false,
      clickAnalytics: false
    };

    if (tagFilters.length > 0) {
      additionalParams.tagFilters = tagFilters;
    }

    var hierarchicalFacet = state.getHierarchicalFacetByName(facet);

    if (hierarchicalFacet) {
      additionalParams.facets = requestBuilder._getDisjunctiveHierarchicalFacetAttribute(
        state,
        hierarchicalFacet,
        hierarchicalRootLevel
      );
    } else {
      additionalParams.facets = facet;
    }

    if (numericFilters.length > 0) {
      additionalParams.numericFilters = numericFilters;
    }

    if (facetFilters.length > 0) {
      additionalParams.facetFilters = facetFilters;
    }

    return sortObject(merge({}, state.getQueryParams(), additionalParams));
  },

  /**
   * Return the numeric filters in an algolia request fashion
   * @private
   * @param {string} [facetName] the name of the attribute for which the filters should be excluded
   * @return {string[]} the numeric filters in the algolia format
   */
  _getNumericFilters: function(state, facetName) {
    if (state.numericFilters) {
      return state.numericFilters;
    }

    var numericFilters = [];

    Object.keys(state.numericRefinements).forEach(function(attribute) {
      var operators = state.numericRefinements[attribute] || {};
      Object.keys(operators).forEach(function(operator) {
        var values = operators[operator] || [];
        if (facetName !== attribute) {
          values.forEach(function(value) {
            if (Array.isArray(value)) {
              var vs = value.map(function(v) {
                return attribute + operator + v;
              });
              numericFilters.push(vs);
            } else {
              numericFilters.push(attribute + operator + value);
            }
          });
        }
      });
    });

    return numericFilters;
  },

  /**
   * Return the tags filters depending
   * @private
   * @return {string}
   */
  _getTagFilters: function(state) {
    if (state.tagFilters) {
      return state.tagFilters;
    }

    return state.tagRefinements.join(',');
  },


  /**
   * Build facetFilters parameter based on current refinements. The array returned
   * contains strings representing the facet filters in the algolia format.
   * @private
   * @param  {string} [facet] if set, the current disjunctive facet
   * @return {array.<string>}
   */
  _getFacetFilters: function(state, facet, hierarchicalRootLevel) {
    var facetFilters = [];

    var facetsRefinements = state.facetsRefinements || {};
    Object.keys(facetsRefinements).forEach(function(facetName) {
      var facetValues = facetsRefinements[facetName] || [];
      facetValues.forEach(function(facetValue) {
        facetFilters.push(facetName + ':' + facetValue);
      });
    });

    var facetsExcludes = state.facetsExcludes || {};
    Object.keys(facetsExcludes).forEach(function(facetName) {
      var facetValues = facetsExcludes[facetName] || [];
      facetValues.forEach(function(facetValue) {
        facetFilters.push(facetName + ':-' + facetValue);
      });
    });

    var disjunctiveFacetsRefinements = state.disjunctiveFacetsRefinements || {};
    Object.keys(disjunctiveFacetsRefinements).forEach(function(facetName) {
      var facetValues = disjunctiveFacetsRefinements[facetName] || [];
      if (facetName === facet || !facetValues || facetValues.length === 0) {
        return;
      }
      var orFilters = [];

      facetValues.forEach(function(facetValue) {
        orFilters.push(facetName + ':' + facetValue);
      });

      facetFilters.push(orFilters);
    });

    var hierarchicalFacetsRefinements = state.hierarchicalFacetsRefinements || {};
    Object.keys(hierarchicalFacetsRefinements).forEach(function(facetName) {
      var facetValues = hierarchicalFacetsRefinements[facetName] || [];
      var facetValue = facetValues[0];

      if (facetValue === undefined) {
        return;
      }

      var hierarchicalFacet = state.getHierarchicalFacetByName(facetName);
      var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
      var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
      var attributeToRefine;
      var attributesIndex;

      // we ask for parent facet values only when the `facet` is the current hierarchical facet
      if (facet === facetName) {
        // if we are at the root level already, no need to ask for facet values, we get them from
        // the hits query
        if (facetValue.indexOf(separator) === -1 || (!rootPath && hierarchicalRootLevel === true) ||
          (rootPath && rootPath.split(separator).length === facetValue.split(separator).length)) {
          return;
        }

        if (!rootPath) {
          attributesIndex = facetValue.split(separator).length - 2;
          facetValue = facetValue.slice(0, facetValue.lastIndexOf(separator));
        } else {
          attributesIndex = rootPath.split(separator).length - 1;
          facetValue = rootPath;
        }

        attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
      } else {
        attributesIndex = facetValue.split(separator).length - 1;

        attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
      }

      if (attributeToRefine) {
        facetFilters.push([attributeToRefine + ':' + facetValue]);
      }
    });

    return facetFilters;
  },

  _getHitsHierarchicalFacetsAttributes: function(state) {
    var out = [];

    return state.hierarchicalFacets.reduce(
      // ask for as much levels as there's hierarchical refinements
      function getHitsAttributesForHierarchicalFacet(allAttributes, hierarchicalFacet) {
        var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0];

        // if no refinement, ask for root level
        if (!hierarchicalRefinement) {
          allAttributes.push(hierarchicalFacet.attributes[0]);
          return allAttributes;
        }

        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var level = hierarchicalRefinement.split(separator).length;
        var newAttributes = hierarchicalFacet.attributes.slice(0, level + 1);

        return allAttributes.concat(newAttributes);
      }, out);
  },

  _getDisjunctiveHierarchicalFacetAttribute: function(state, hierarchicalFacet, rootLevel) {
    var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
    if (rootLevel === true) {
      var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
      var attributeIndex = 0;

      if (rootPath) {
        attributeIndex = rootPath.split(separator).length;
      }
      return [hierarchicalFacet.attributes[attributeIndex]];
    }

    var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0] || '';
    // if refinement is 'beers > IPA > Flying dog',
    // then we want `facets: ['beers > IPA']` as disjunctive facet (parent level values)

    var parentLevel = hierarchicalRefinement.split(separator).length - 1;
    return hierarchicalFacet.attributes.slice(0, parentLevel + 1);
  },

  getSearchForFacetQuery: function(facetName, query, maxFacetHits, state) {
    var stateForSearchForFacetValues = state.isDisjunctiveFacet(facetName) ?
      state.clearRefinements(facetName) :
      state;
    var searchForFacetSearchParameters = {
      facetQuery: query,
      facetName: facetName
    };
    if (typeof maxFacetHits === 'number') {
      searchForFacetSearchParameters.maxFacetHits = maxFacetHits;
    }
    return sortObject(merge(
      {},
      requestBuilder._getHitsSearchParams(stateForSearchForFacetValues),
      searchForFacetSearchParameters
    ));
  }
};

module.exports = requestBuilder;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/utils/isValidUserToken.js":
/*!*************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/utils/isValidUserToken.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isValidUserToken(userToken) {
  if (userToken === null) {
    return false;
  }
  return /^[a-zA-Z0-9_-]{1,64}$/.test(userToken);
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/version.js":
/*!**********************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/version.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";


module.exports = '3.12.0';


/***/ }),

/***/ "./node_modules/algoliasearch/dist/algoliasearch.umd.js":
/*!**************************************************************!*\
  !*** ./node_modules/algoliasearch/dist/algoliasearch.umd.js ***!
  \**************************************************************/
/***/ (function(module) {

/*! algoliasearch.umd.js | 4.17.0 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */
!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";function t(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function e(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function r(r){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?e(Object(a),!0).forEach((function(e){t(r,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(a)):e(Object(a)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(a,t))}))}return r}function n(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}function a(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,u=t[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){a=!0,o=t}finally{try{n||null==u.return||u.return()}finally{if(a)throw o}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(t){var e,r="algoliasearch-client-js-".concat(t.key),n=function(){return void 0===e&&(e=t.localStorage||window.localStorage),e},o=function(){return JSON.parse(n().getItem(r)||"{}")};return{get:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}};return Promise.resolve().then((function(){var r=JSON.stringify(t),n=o()[r];return Promise.all([n||e(),void 0!==n])})).then((function(t){var e=a(t,2),n=e[0],o=e[1];return Promise.all([n,o||r.miss(n)])})).then((function(t){return a(t,1)[0]}))},set:function(t,e){return Promise.resolve().then((function(){var a=o();return a[JSON.stringify(t)]=e,n().setItem(r,JSON.stringify(a)),e}))},delete:function(t){return Promise.resolve().then((function(){var e=o();delete e[JSON.stringify(t)],n().setItem(r,JSON.stringify(e))}))},clear:function(){return Promise.resolve().then((function(){n().removeItem(r)}))}}}function u(t){var e=o(t.caches),r=e.shift();return void 0===r?{get:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}},n=e();return n.then((function(t){return Promise.all([t,r.miss(t)])})).then((function(t){return a(t,1)[0]}))},set:function(t,e){return Promise.resolve(e)},delete:function(t){return Promise.resolve()},clear:function(){return Promise.resolve()}}:{get:function(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}};return r.get(t,n,a).catch((function(){return u({caches:e}).get(t,n,a)}))},set:function(t,n){return r.set(t,n).catch((function(){return u({caches:e}).set(t,n)}))},delete:function(t){return r.delete(t).catch((function(){return u({caches:e}).delete(t)}))},clear:function(){return r.clear().catch((function(){return u({caches:e}).clear()}))}}}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{serializable:!0},e={};return{get:function(r,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}},o=JSON.stringify(r);if(o in e)return Promise.resolve(t.serializable?JSON.parse(e[o]):e[o]);var i=n(),u=a&&a.miss||function(){return Promise.resolve()};return i.then((function(t){return u(t)})).then((function(){return i}))},set:function(r,n){return e[JSON.stringify(r)]=t.serializable?JSON.stringify(n):n,Promise.resolve(n)},delete:function(t){return delete e[JSON.stringify(t)],Promise.resolve()},clear:function(){return e={},Promise.resolve()}}}function c(t,e,r){var n={"x-algolia-api-key":r,"x-algolia-application-id":e};return{headers:function(){return t===m.WithinHeaders?n:{}},queryParameters:function(){return t===m.WithinQueryParameters?n:{}}}}function f(t){var e=0;return t((function r(){return e++,new Promise((function(n){setTimeout((function(){n(t(r))}),Math.min(100*e,1e3))}))}))}function d(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t,e){return Promise.resolve()};return Object.assign(t,{wait:function(r){return d(t.then((function(t){return Promise.all([e(t,r),t])})).then((function(t){return t[1]})))}})}function l(t){for(var e=t.length-1;e>0;e--){var r=Math.floor(Math.random()*(e+1)),n=t[e];t[e]=t[r],t[r]=n}return t}function p(t,e){return e?(Object.keys(e).forEach((function(r){t[r]=e[r](t)})),t):t}function h(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];var a=0;return t.replace(/%s/g,(function(){return encodeURIComponent(r[a++])}))}var m={WithinQueryParameters:0,WithinHeaders:1};function y(t,e){var r=t||{},n=r.data||{};return Object.keys(r).forEach((function(t){-1===["timeout","headers","queryParameters","data","cacheable"].indexOf(t)&&(n[t]=r[t])})),{data:Object.entries(n).length>0?n:void 0,timeout:r.timeout||e,headers:r.headers||{},queryParameters:r.queryParameters||{},cacheable:r.cacheable}}var g={Read:1,Write:2,Any:3},v=1,b=2,P=3;function w(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:v;return r(r({},t),{},{status:e,lastUpdate:Date.now()})}function O(t){return"string"==typeof t?{protocol:"https",url:t,accept:g.Any}:{protocol:t.protocol||"https",url:t.url,accept:t.accept||g.Any}}var I="DELETE",x="GET",j="POST",D="PUT";function q(t,e){return Promise.all(e.map((function(e){return t.get(e,(function(){return Promise.resolve(w(e))}))}))).then((function(t){var r=t.filter((function(t){return function(t){return t.status===v||Date.now()-t.lastUpdate>12e4}(t)})),n=t.filter((function(t){return function(t){return t.status===P&&Date.now()-t.lastUpdate<=12e4}(t)})),a=[].concat(o(r),o(n));return{getTimeout:function(t,e){return(0===n.length&&0===t?1:n.length+3+t)*e},statelessHosts:a.length>0?a.map((function(t){return O(t)})):e}}))}function S(t,e,n,a){var i=[],u=function(t,e){if(t.method===x||void 0===t.data&&void 0===e.data)return;var n=Array.isArray(t.data)?t.data:r(r({},t.data),e.data);return JSON.stringify(n)}(n,a),s=function(t,e){var n=r(r({},t.headers),e.headers),a={};return Object.keys(n).forEach((function(t){var e=n[t];a[t.toLowerCase()]=e})),a}(t,a),c=n.method,f=n.method!==x?{}:r(r({},n.data),a.data),d=r(r(r({"x-algolia-agent":t.userAgent.value},t.queryParameters),f),a.queryParameters),l=0,p=function e(r,o){var f=r.pop();if(void 0===f)throw{name:"RetryError",message:"Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",transporterStackTrace:R(i)};var p={data:u,headers:s,method:c,url:N(f,n.path,d),connectTimeout:o(l,t.timeouts.connect),responseTimeout:o(l,a.timeout)},h=function(t){var e={request:p,response:t,host:f,triesLeft:r.length};return i.push(e),e},m={onSuccess:function(t){return function(t){try{return JSON.parse(t.content)}catch(e){throw function(t,e){return{name:"DeserializationError",message:t,response:e}}(e.message,t)}}(t)},onRetry:function(n){var a=h(n);return n.isTimedOut&&l++,Promise.all([t.logger.info("Retryable failure",A(a)),t.hostsCache.set(f,w(f,n.isTimedOut?P:b))]).then((function(){return e(r,o)}))},onFail:function(t){throw h(t),function(t,e){var r=t.content,n=t.status,a=r;try{a=JSON.parse(r).message}catch(t){}return function(t,e,r){return{name:"ApiError",message:t,status:e,transporterStackTrace:r}}(a,n,e)}(t,R(i))}};return t.requester.send(p).then((function(t){return function(t,e){return function(t){var e=t.status;return t.isTimedOut||function(t){var e=t.isTimedOut,r=t.status;return!e&&0==~~r}(t)||2!=~~(e/100)&&4!=~~(e/100)}(t)?e.onRetry(t):2==~~(t.status/100)?e.onSuccess(t):e.onFail(t)}(t,m)}))};return q(t.hostsCache,e).then((function(t){return p(o(t.statelessHosts).reverse(),t.getTimeout)}))}function k(t){var e=t.hostsCache,r=t.logger,n=t.requester,o=t.requestsCache,i=t.responsesCache,u=t.timeouts,s=t.userAgent,c=t.hosts,f=t.queryParameters,d={hostsCache:e,logger:r,requester:n,requestsCache:o,responsesCache:i,timeouts:u,userAgent:s,headers:t.headers,queryParameters:f,hosts:c.map((function(t){return O(t)})),read:function(t,e){var r=y(e,d.timeouts.read),n=function(){return S(d,d.hosts.filter((function(t){return 0!=(t.accept&g.Read)})),t,r)};if(!0!==(void 0!==r.cacheable?r.cacheable:t.cacheable))return n();var o={request:t,mappedRequestOptions:r,transporter:{queryParameters:d.queryParameters,headers:d.headers}};return d.responsesCache.get(o,(function(){return d.requestsCache.get(o,(function(){return d.requestsCache.set(o,n()).then((function(t){return Promise.all([d.requestsCache.delete(o),t])}),(function(t){return Promise.all([d.requestsCache.delete(o),Promise.reject(t)])})).then((function(t){var e=a(t,2);e[0];return e[1]}))}))}),{miss:function(t){return d.responsesCache.set(o,t)}})},write:function(t,e){return S(d,d.hosts.filter((function(t){return 0!=(t.accept&g.Write)})),t,y(e,d.timeouts.write))}};return d}function T(t){var e={value:"Algolia for JavaScript (".concat(t,")"),add:function(t){var r="; ".concat(t.segment).concat(void 0!==t.version?" (".concat(t.version,")"):"");return-1===e.value.indexOf(r)&&(e.value="".concat(e.value).concat(r)),e}};return e}function N(t,e,r){var n=E(r),a="".concat(t.protocol,"://").concat(t.url,"/").concat("/"===e.charAt(0)?e.substr(1):e);return n.length&&(a+="?".concat(n)),a}function E(t){return Object.keys(t).map((function(e){return h("%s=%s",e,(r=t[e],"[object Object]"===Object.prototype.toString.call(r)||"[object Array]"===Object.prototype.toString.call(r)?JSON.stringify(t[e]):t[e]));var r})).join("&")}function R(t){return t.map((function(t){return A(t)}))}function A(t){var e=t.request.headers["x-algolia-api-key"]?{"x-algolia-api-key":"*****"}:{};return r(r({},t),{},{request:r(r({},t.request),{},{headers:r(r({},t.request.headers),e)})})}var C=function(t){return function(e,r){return t.transporter.write({method:j,path:"2/abtests",data:e},r)}},U=function(t){return function(e,r){return t.transporter.write({method:I,path:h("2/abtests/%s",e)},r)}},z=function(t){return function(e,r){return t.transporter.read({method:x,path:h("2/abtests/%s",e)},r)}},J=function(t){return function(e){return t.transporter.read({method:x,path:"2/abtests"},e)}},F=function(t){return function(e,r){return t.transporter.write({method:j,path:h("2/abtests/%s/stop",e)},r)}},H=function(t){return function(e){return t.transporter.read({method:x,path:"1/strategies/personalization"},e)}},M=function(t){return function(e,r){return t.transporter.write({method:j,path:"1/strategies/personalization",data:e},r)}};function K(t){return function e(r){return t.request(r).then((function(n){if(void 0!==t.batch&&t.batch(n.hits),!t.shouldStop(n))return n.cursor?e({cursor:n.cursor}):e({page:(r.page||0)+1})}))}({})}var W=function(t){return function(e,a){var o=a||{},i=o.queryParameters,u=n(o,["queryParameters"]),s=r({acl:e},void 0!==i?{queryParameters:i}:{});return d(t.transporter.write({method:j,path:"1/keys",data:s},u),(function(e,r){return f((function(n){return tt(t)(e.key,r).catch((function(t){if(404!==t.status)throw t;return n()}))}))}))}},B=function(t){return function(e,r,n){var a=y(n);return a.queryParameters["X-Algolia-User-ID"]=e,t.transporter.write({method:j,path:"1/clusters/mapping",data:{cluster:r}},a)}},Q=function(t){return function(e,r,n){return t.transporter.write({method:j,path:"1/clusters/mapping/batch",data:{users:e,cluster:r}},n)}},G=function(t){return function(e,r){return d(t.transporter.write({method:j,path:h("/1/dictionaries/%s/batch",e),data:{clearExistingDictionaryEntries:!0,requests:{action:"addEntry",body:[]}}},r),(function(e,r){return jt(t)(e.taskID,r)}))}},L=function(t){return function(e,r,n){return d(t.transporter.write({method:j,path:h("1/indexes/%s/operation",e),data:{operation:"copy",destination:r}},n),(function(r,n){return ut(t)(e,{methods:{waitTask:de}}).waitTask(r.taskID,n)}))}},V=function(t){return function(e,n,a){return L(t)(e,n,r(r({},a),{},{scope:[pe.Rules]}))}},_=function(t){return function(e,n,a){return L(t)(e,n,r(r({},a),{},{scope:[pe.Settings]}))}},X=function(t){return function(e,n,a){return L(t)(e,n,r(r({},a),{},{scope:[pe.Synonyms]}))}},Y=function(t){return function(e,r){return e.method===x?t.transporter.read(e,r):t.transporter.write(e,r)}},Z=function(t){return function(e,r){return d(t.transporter.write({method:I,path:h("1/keys/%s",e)},r),(function(r,n){return f((function(r){return tt(t)(e,n).then(r).catch((function(t){if(404!==t.status)throw t}))}))}))}},$=function(t){return function(e,r,n){var a=r.map((function(t){return{action:"deleteEntry",body:{objectID:t}}}));return d(t.transporter.write({method:j,path:h("/1/dictionaries/%s/batch",e),data:{clearExistingDictionaryEntries:!1,requests:a}},n),(function(e,r){return jt(t)(e.taskID,r)}))}},tt=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/keys/%s",e)},r)}},et=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/task/%s",e.toString())},r)}},rt=function(t){return function(e){return t.transporter.read({method:x,path:"/1/dictionaries/*/settings"},e)}},nt=function(t){return function(e){return t.transporter.read({method:x,path:"1/logs"},e)}},at=function(t){return function(e){return t.transporter.read({method:x,path:"1/clusters/mapping/top"},e)}},ot=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/clusters/mapping/%s",e)},r)}},it=function(t){return function(e){var r=e||{},a=r.retrieveMappings,o=n(r,["retrieveMappings"]);return!0===a&&(o.getClusters=!0),t.transporter.read({method:x,path:"1/clusters/mapping/pending"},o)}},ut=function(t){return function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={transporter:t.transporter,appId:t.appId,indexName:e};return p(n,r.methods)}},st=function(t){return function(e){return t.transporter.read({method:x,path:"1/keys"},e)}},ct=function(t){return function(e){return t.transporter.read({method:x,path:"1/clusters"},e)}},ft=function(t){return function(e){return t.transporter.read({method:x,path:"1/indexes"},e)}},dt=function(t){return function(e){return t.transporter.read({method:x,path:"1/clusters/mapping"},e)}},lt=function(t){return function(e,r,n){return d(t.transporter.write({method:j,path:h("1/indexes/%s/operation",e),data:{operation:"move",destination:r}},n),(function(r,n){return ut(t)(e,{methods:{waitTask:de}}).waitTask(r.taskID,n)}))}},pt=function(t){return function(e,r){return d(t.transporter.write({method:j,path:"1/indexes/*/batch",data:{requests:e}},r),(function(e,r){return Promise.all(Object.keys(e.taskID).map((function(n){return ut(t)(n,{methods:{waitTask:de}}).waitTask(e.taskID[n],r)})))}))}},ht=function(t){return function(e,r){return t.transporter.read({method:j,path:"1/indexes/*/objects",data:{requests:e}},r)}},mt=function(t){return function(e,n){var a=e.map((function(t){return r(r({},t),{},{params:E(t.params||{})})}));return t.transporter.read({method:j,path:"1/indexes/*/queries",data:{requests:a},cacheable:!0},n)}},yt=function(t){return function(e,a){return Promise.all(e.map((function(e){var o=e.params,i=o.facetName,u=o.facetQuery,s=n(o,["facetName","facetQuery"]);return ut(t)(e.indexName,{methods:{searchForFacetValues:ue}}).searchForFacetValues(i,u,r(r({},a),s))})))}},gt=function(t){return function(e,r){var n=y(r);return n.queryParameters["X-Algolia-User-ID"]=e,t.transporter.write({method:I,path:"1/clusters/mapping"},n)}},vt=function(t){return function(e,r,n){var a=r.map((function(t){return{action:"addEntry",body:t}}));return d(t.transporter.write({method:j,path:h("/1/dictionaries/%s/batch",e),data:{clearExistingDictionaryEntries:!0,requests:a}},n),(function(e,r){return jt(t)(e.taskID,r)}))}},bt=function(t){return function(e,r){return d(t.transporter.write({method:j,path:h("1/keys/%s/restore",e)},r),(function(r,n){return f((function(r){return tt(t)(e,n).catch((function(t){if(404!==t.status)throw t;return r()}))}))}))}},Pt=function(t){return function(e,r,n){var a=r.map((function(t){return{action:"addEntry",body:t}}));return d(t.transporter.write({method:j,path:h("/1/dictionaries/%s/batch",e),data:{clearExistingDictionaryEntries:!1,requests:a}},n),(function(e,r){return jt(t)(e.taskID,r)}))}},wt=function(t){return function(e,r,n){return t.transporter.read({method:j,path:h("/1/dictionaries/%s/search",e),data:{query:r},cacheable:!0},n)}},Ot=function(t){return function(e,r){return t.transporter.read({method:j,path:"1/clusters/mapping/search",data:{query:e}},r)}},It=function(t){return function(e,r){return d(t.transporter.write({method:D,path:"/1/dictionaries/*/settings",data:e},r),(function(e,r){return jt(t)(e.taskID,r)}))}},xt=function(t){return function(e,r){var a=Object.assign({},r),o=r||{},i=o.queryParameters,u=n(o,["queryParameters"]),s=i?{queryParameters:i}:{},c=["acl","indexes","referers","restrictSources","queryParameters","description","maxQueriesPerIPPerHour","maxHitsPerQuery"];return d(t.transporter.write({method:D,path:h("1/keys/%s",e),data:s},u),(function(r,n){return f((function(r){return tt(t)(e,n).then((function(t){return function(t){return Object.keys(a).filter((function(t){return-1!==c.indexOf(t)})).every((function(e){return t[e]===a[e]}))}(t)?Promise.resolve():r()}))}))}))}},jt=function(t){return function(e,r){return f((function(n){return et(t)(e,r).then((function(t){return"published"!==t.status?n():void 0}))}))}},Dt=function(t){return function(e,r){return d(t.transporter.write({method:j,path:h("1/indexes/%s/batch",t.indexName),data:{requests:e}},r),(function(e,r){return de(t)(e.taskID,r)}))}},qt=function(t){return function(e){return K(r(r({shouldStop:function(t){return void 0===t.cursor}},e),{},{request:function(r){return t.transporter.read({method:j,path:h("1/indexes/%s/browse",t.indexName),data:r},e)}}))}},St=function(t){return function(e){var n=r({hitsPerPage:1e3},e);return K(r(r({shouldStop:function(t){return t.hits.length<n.hitsPerPage}},n),{},{request:function(e){return se(t)("",r(r({},n),e)).then((function(t){return r(r({},t),{},{hits:t.hits.map((function(t){return delete t._highlightResult,t}))})}))}}))}},kt=function(t){return function(e){var n=r({hitsPerPage:1e3},e);return K(r(r({shouldStop:function(t){return t.hits.length<n.hitsPerPage}},n),{},{request:function(e){return ce(t)("",r(r({},n),e)).then((function(t){return r(r({},t),{},{hits:t.hits.map((function(t){return delete t._highlightResult,t}))})}))}}))}},Tt=function(t){return function(e,r,a){var o=a||{},i=o.batchSize,u=n(o,["batchSize"]),s={taskIDs:[],objectIDs:[]};return d(function n(){var a,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,c=[];for(a=o;a<e.length&&(c.push(e[a]),c.length!==(i||1e3));a++);return 0===c.length?Promise.resolve(s):Dt(t)(c.map((function(t){return{action:r,body:t}})),u).then((function(t){return s.objectIDs=s.objectIDs.concat(t.objectIDs),s.taskIDs.push(t.taskID),a++,n(a)}))}(),(function(e,r){return Promise.all(e.taskIDs.map((function(e){return de(t)(e,r)})))}))}},Nt=function(t){return function(e){return d(t.transporter.write({method:j,path:h("1/indexes/%s/clear",t.indexName)},e),(function(e,r){return de(t)(e.taskID,r)}))}},Et=function(t){return function(e){var r=e||{},a=r.forwardToReplicas,o=y(n(r,["forwardToReplicas"]));return a&&(o.queryParameters.forwardToReplicas=1),d(t.transporter.write({method:j,path:h("1/indexes/%s/rules/clear",t.indexName)},o),(function(e,r){return de(t)(e.taskID,r)}))}},Rt=function(t){return function(e){var r=e||{},a=r.forwardToReplicas,o=y(n(r,["forwardToReplicas"]));return a&&(o.queryParameters.forwardToReplicas=1),d(t.transporter.write({method:j,path:h("1/indexes/%s/synonyms/clear",t.indexName)},o),(function(e,r){return de(t)(e.taskID,r)}))}},At=function(t){return function(e,r){return d(t.transporter.write({method:j,path:h("1/indexes/%s/deleteByQuery",t.indexName),data:e},r),(function(e,r){return de(t)(e.taskID,r)}))}},Ct=function(t){return function(e){return d(t.transporter.write({method:I,path:h("1/indexes/%s",t.indexName)},e),(function(e,r){return de(t)(e.taskID,r)}))}},Ut=function(t){return function(e,r){return d(zt(t)([e],r).then((function(t){return{taskID:t.taskIDs[0]}})),(function(e,r){return de(t)(e.taskID,r)}))}},zt=function(t){return function(e,r){var n=e.map((function(t){return{objectID:t}}));return Tt(t)(n,le.DeleteObject,r)}},Jt=function(t){return function(e,r){var a=r||{},o=a.forwardToReplicas,i=y(n(a,["forwardToReplicas"]));return o&&(i.queryParameters.forwardToReplicas=1),d(t.transporter.write({method:I,path:h("1/indexes/%s/rules/%s",t.indexName,e)},i),(function(e,r){return de(t)(e.taskID,r)}))}},Ft=function(t){return function(e,r){var a=r||{},o=a.forwardToReplicas,i=y(n(a,["forwardToReplicas"]));return o&&(i.queryParameters.forwardToReplicas=1),d(t.transporter.write({method:I,path:h("1/indexes/%s/synonyms/%s",t.indexName,e)},i),(function(e,r){return de(t)(e.taskID,r)}))}},Ht=function(t){return function(e){return Lt(t)(e).then((function(){return!0})).catch((function(t){if(404!==t.status)throw t;return!1}))}},Mt=function(t){return function(e,r,n){return t.transporter.read({method:j,path:h("1/answers/%s/prediction",t.indexName),data:{query:e,queryLanguages:r},cacheable:!0},n)}},Kt=function(t){return function(e,o){var i=o||{},u=i.query,s=i.paginate,c=n(i,["query","paginate"]),f=0;return function n(){return ie(t)(u||"",r(r({},c),{},{page:f})).then((function(t){for(var r=0,o=Object.entries(t.hits);r<o.length;r++){var i=a(o[r],2),u=i[0],c=i[1];if(e(c))return{object:c,position:parseInt(u,10),page:f}}if(f++,!1===s||f>=t.nbPages)throw{name:"ObjectNotFoundError",message:"Object not found."};return n()}))}()}},Wt=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/indexes/%s/%s",t.indexName,e)},r)}},Bt=function(){return function(t,e){for(var r=0,n=Object.entries(t.hits);r<n.length;r++){var o=a(n[r],2),i=o[0];if(o[1].objectID===e)return parseInt(i,10)}return-1}},Qt=function(t){return function(e,a){var o=a||{},i=o.attributesToRetrieve,u=n(o,["attributesToRetrieve"]),s=e.map((function(e){return r({indexName:t.indexName,objectID:e},i?{attributesToRetrieve:i}:{})}));return t.transporter.read({method:j,path:"1/indexes/*/objects",data:{requests:s}},u)}},Gt=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/indexes/%s/rules/%s",t.indexName,e)},r)}},Lt=function(t){return function(e){return t.transporter.read({method:x,path:h("1/indexes/%s/settings",t.indexName),data:{getVersion:2}},e)}},Vt=function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/indexes/%s/synonyms/%s",t.indexName,e)},r)}},_t=function(t){return function(e,r){return d(Xt(t)([e],r).then((function(t){return{objectID:t.objectIDs[0],taskID:t.taskIDs[0]}})),(function(e,r){return de(t)(e.taskID,r)}))}},Xt=function(t){return function(e,r){var a=r||{},o=a.createIfNotExists,i=n(a,["createIfNotExists"]),u=o?le.PartialUpdateObject:le.PartialUpdateObjectNoCreate;return Tt(t)(e,u,i)}},Yt=function(t){return function(e,i){var u=i||{},s=u.safe,c=u.autoGenerateObjectIDIfNotExist,f=u.batchSize,l=n(u,["safe","autoGenerateObjectIDIfNotExist","batchSize"]),p=function(e,r,n,a){return d(t.transporter.write({method:j,path:h("1/indexes/%s/operation",e),data:{operation:n,destination:r}},a),(function(e,r){return de(t)(e.taskID,r)}))},m=Math.random().toString(36).substring(7),y="".concat(t.indexName,"_tmp_").concat(m),g=ee({appId:t.appId,transporter:t.transporter,indexName:y}),v=[],b=p(t.indexName,y,"copy",r(r({},l),{},{scope:["settings","synonyms","rules"]}));return v.push(b),d((s?b.wait(l):b).then((function(){var t=g(e,r(r({},l),{},{autoGenerateObjectIDIfNotExist:c,batchSize:f}));return v.push(t),s?t.wait(l):t})).then((function(){var e=p(y,t.indexName,"move",l);return v.push(e),s?e.wait(l):e})).then((function(){return Promise.all(v)})).then((function(t){var e=a(t,3),r=e[0],n=e[1],i=e[2];return{objectIDs:n.objectIDs,taskIDs:[r.taskID].concat(o(n.taskIDs),[i.taskID])}})),(function(t,e){return Promise.all(v.map((function(t){return t.wait(e)})))}))}},Zt=function(t){return function(e,n){return ne(t)(e,r(r({},n),{},{clearExistingRules:!0}))}},$t=function(t){return function(e,n){return oe(t)(e,r(r({},n),{},{clearExistingSynonyms:!0}))}},te=function(t){return function(e,r){return d(ee(t)([e],r).then((function(t){return{objectID:t.objectIDs[0],taskID:t.taskIDs[0]}})),(function(e,r){return de(t)(e.taskID,r)}))}},ee=function(t){return function(e,r){var a=r||{},o=a.autoGenerateObjectIDIfNotExist,i=n(a,["autoGenerateObjectIDIfNotExist"]),u=o?le.AddObject:le.UpdateObject;if(u===le.UpdateObject){var s=!0,c=!1,f=void 0;try{for(var l,p=e[Symbol.iterator]();!(s=(l=p.next()).done);s=!0){if(void 0===l.value.objectID)return d(Promise.reject({name:"MissingObjectIDError",message:"All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option."}))}}catch(t){c=!0,f=t}finally{try{s||null==p.return||p.return()}finally{if(c)throw f}}}return Tt(t)(e,u,i)}},re=function(t){return function(e,r){return ne(t)([e],r)}},ne=function(t){return function(e,r){var a=r||{},o=a.forwardToReplicas,i=a.clearExistingRules,u=y(n(a,["forwardToReplicas","clearExistingRules"]));return o&&(u.queryParameters.forwardToReplicas=1),i&&(u.queryParameters.clearExistingRules=1),d(t.transporter.write({method:j,path:h("1/indexes/%s/rules/batch",t.indexName),data:e},u),(function(e,r){return de(t)(e.taskID,r)}))}},ae=function(t){return function(e,r){return oe(t)([e],r)}},oe=function(t){return function(e,r){var a=r||{},o=a.forwardToReplicas,i=a.clearExistingSynonyms,u=a.replaceExistingSynonyms,s=y(n(a,["forwardToReplicas","clearExistingSynonyms","replaceExistingSynonyms"]));return o&&(s.queryParameters.forwardToReplicas=1),(u||i)&&(s.queryParameters.replaceExistingSynonyms=1),d(t.transporter.write({method:j,path:h("1/indexes/%s/synonyms/batch",t.indexName),data:e},s),(function(e,r){return de(t)(e.taskID,r)}))}},ie=function(t){return function(e,r){return t.transporter.read({method:j,path:h("1/indexes/%s/query",t.indexName),data:{query:e},cacheable:!0},r)}},ue=function(t){return function(e,r,n){return t.transporter.read({method:j,path:h("1/indexes/%s/facets/%s/query",t.indexName,e),data:{facetQuery:r},cacheable:!0},n)}},se=function(t){return function(e,r){return t.transporter.read({method:j,path:h("1/indexes/%s/rules/search",t.indexName),data:{query:e}},r)}},ce=function(t){return function(e,r){return t.transporter.read({method:j,path:h("1/indexes/%s/synonyms/search",t.indexName),data:{query:e}},r)}},fe=function(t){return function(e,r){var a=r||{},o=a.forwardToReplicas,i=y(n(a,["forwardToReplicas"]));return o&&(i.queryParameters.forwardToReplicas=1),d(t.transporter.write({method:D,path:h("1/indexes/%s/settings",t.indexName),data:e},i),(function(e,r){return de(t)(e.taskID,r)}))}},de=function(t){return function(e,r){return f((function(n){return function(t){return function(e,r){return t.transporter.read({method:x,path:h("1/indexes/%s/task/%s",t.indexName,e.toString())},r)}}(t)(e,r).then((function(t){return"published"!==t.status?n():void 0}))}))}},le={AddObject:"addObject",UpdateObject:"updateObject",PartialUpdateObject:"partialUpdateObject",PartialUpdateObjectNoCreate:"partialUpdateObjectNoCreate",DeleteObject:"deleteObject",DeleteIndex:"delete",ClearIndex:"clear"},pe={Settings:"settings",Synonyms:"synonyms",Rules:"rules"},he=1,me=2,ye=3;function ge(t,e,n){var a,o={appId:t,apiKey:e,timeouts:{connect:1,read:2,write:30},requester:{send:function(t){return new Promise((function(e){var r=new XMLHttpRequest;r.open(t.method,t.url,!0),Object.keys(t.headers).forEach((function(e){return r.setRequestHeader(e,t.headers[e])}));var n,a=function(t,n){return setTimeout((function(){r.abort(),e({status:0,content:n,isTimedOut:!0})}),1e3*t)},o=a(t.connectTimeout,"Connection timeout");r.onreadystatechange=function(){r.readyState>r.OPENED&&void 0===n&&(clearTimeout(o),n=a(t.responseTimeout,"Socket timeout"))},r.onerror=function(){0===r.status&&(clearTimeout(o),clearTimeout(n),e({content:r.responseText||"Network request failed",status:r.status,isTimedOut:!1}))},r.onload=function(){clearTimeout(o),clearTimeout(n),e({content:r.responseText,status:r.status,isTimedOut:!1})},r.send(t.data)}))}},logger:(a=ye,{debug:function(t,e){return he>=a&&console.debug(t,e),Promise.resolve()},info:function(t,e){return me>=a&&console.info(t,e),Promise.resolve()},error:function(t,e){return console.error(t,e),Promise.resolve()}}),responsesCache:s(),requestsCache:s({serializable:!1}),hostsCache:u({caches:[i({key:"".concat("4.17.0","-").concat(t)}),s()]}),userAgent:T("4.17.0").add({segment:"Browser"})},f=r(r({},o),n),d=function(){return function(t){return function(t){var e=t.region||"us",n=c(m.WithinHeaders,t.appId,t.apiKey),a=k(r(r({hosts:[{url:"personalization.".concat(e,".algolia.com")}]},t),{},{headers:r(r(r({},n.headers()),{"content-type":"application/json"}),t.headers),queryParameters:r(r({},n.queryParameters()),t.queryParameters)}));return p({appId:t.appId,transporter:a},t.methods)}(r(r(r({},o),t),{},{methods:{getPersonalizationStrategy:H,setPersonalizationStrategy:M}}))}};return function(t){var e=t.appId,n=c(void 0!==t.authMode?t.authMode:m.WithinHeaders,e,t.apiKey),a=k(r(r({hosts:[{url:"".concat(e,"-dsn.algolia.net"),accept:g.Read},{url:"".concat(e,".algolia.net"),accept:g.Write}].concat(l([{url:"".concat(e,"-1.algolianet.com")},{url:"".concat(e,"-2.algolianet.com")},{url:"".concat(e,"-3.algolianet.com")}]))},t),{},{headers:r(r(r({},n.headers()),{"content-type":"application/x-www-form-urlencoded"}),t.headers),queryParameters:r(r({},n.queryParameters()),t.queryParameters)}));return p({transporter:a,appId:e,addAlgoliaAgent:function(t,e){a.userAgent.add({segment:t,version:e})},clearCache:function(){return Promise.all([a.requestsCache.clear(),a.responsesCache.clear()]).then((function(){}))}},t.methods)}(r(r({},f),{},{methods:{search:mt,searchForFacetValues:yt,multipleBatch:pt,multipleGetObjects:ht,multipleQueries:mt,copyIndex:L,copySettings:_,copySynonyms:X,copyRules:V,moveIndex:lt,listIndices:ft,getLogs:nt,listClusters:ct,multipleSearchForFacetValues:yt,getApiKey:tt,addApiKey:W,listApiKeys:st,updateApiKey:xt,deleteApiKey:Z,restoreApiKey:bt,assignUserID:B,assignUserIDs:Q,getUserID:ot,searchUserIDs:Ot,listUserIDs:dt,getTopUserIDs:at,removeUserID:gt,hasPendingMappings:it,clearDictionaryEntries:G,deleteDictionaryEntries:$,getDictionarySettings:rt,getAppTask:et,replaceDictionaryEntries:vt,saveDictionaryEntries:Pt,searchDictionaryEntries:wt,setDictionarySettings:It,waitAppTask:jt,customRequest:Y,initIndex:function(t){return function(e){return ut(t)(e,{methods:{batch:Dt,delete:Ct,findAnswers:Mt,getObject:Wt,getObjects:Qt,saveObject:te,saveObjects:ee,search:ie,searchForFacetValues:ue,waitTask:de,setSettings:fe,getSettings:Lt,partialUpdateObject:_t,partialUpdateObjects:Xt,deleteObject:Ut,deleteObjects:zt,deleteBy:At,clearObjects:Nt,browseObjects:qt,getObjectPosition:Bt,findObject:Kt,exists:Ht,saveSynonym:ae,saveSynonyms:oe,getSynonym:Vt,searchSynonyms:ce,browseSynonyms:kt,deleteSynonym:Ft,clearSynonyms:Rt,replaceAllObjects:Yt,replaceAllSynonyms:$t,searchRules:se,getRule:Gt,deleteRule:Jt,saveRule:re,saveRules:ne,replaceAllRules:Zt,browseRules:St,clearRules:Et}})}},initAnalytics:function(){return function(t){return function(t){var e=t.region||"us",n=c(m.WithinHeaders,t.appId,t.apiKey),a=k(r(r({hosts:[{url:"analytics.".concat(e,".algolia.com")}]},t),{},{headers:r(r(r({},n.headers()),{"content-type":"application/json"}),t.headers),queryParameters:r(r({},n.queryParameters()),t.queryParameters)}));return p({appId:t.appId,transporter:a},t.methods)}(r(r(r({},o),t),{},{methods:{addABTest:C,getABTest:z,getABTests:J,stopABTest:F,deleteABTest:U}}))}},initPersonalization:d,initRecommendation:function(){return function(t){return f.logger.info("The `initRecommendation` method is deprecated. Use `initPersonalization` instead."),d()(t)}}}}))}return ge.version="4.17.0",ge}));


/***/ }),

/***/ "../wp-module-ai/index.js":
/*!********************************!*\
  !*** ../wp-module-ai/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _lib_moduleAI__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _lib_moduleAI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/moduleAI */ "../wp-module-ai/lib/moduleAI.js");



/***/ }),

/***/ "../wp-module-ai/lib/core/AISearch.js":
/*!********************************************!*\
  !*** ../wp-module-ai/lib/core/AISearch.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

const base = "newfold-ai/v1";
const AISearch = {
  getSearchResult: (userPrompt, identifier, extra) => _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: base + "/search",
    method: "POST",
    data: {
      user_prompt: userPrompt,
      identifier: identifier,
      extra: extra
    }
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AISearch);

/***/ }),

/***/ "../wp-module-ai/lib/moduleAI.js":
/*!***************************************!*\
  !*** ../wp-module-ai/lib/moduleAI.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_AISearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/AISearch */ "../wp-module-ai/lib/core/AISearch.js");

const moduleAI = {
  search: _core_AISearch__WEBPACK_IMPORTED_MODULE_0__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moduleAI);

/***/ }),

/***/ "./src/components/AlgoliaResult.js":
/*!*****************************************!*\
  !*** ./src/components/AlgoliaResult.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlgoliaResult": () => (/* binding */ AlgoliaResult)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_go_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/go.svg */ "./src/icons/go.svg");


const AlgoliaResult = _ref => {
  let {
    searchTitle,
    onGo
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "algoliaResult",
    onClick: () => {
      onGo();
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, searchTitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_go_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, null))));
};

/***/ }),

/***/ "./src/components/Feedback.js":
/*!************************************!*\
  !*** ./src/components/Feedback.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


//

const Feedback = _ref => {
  let {
    postId
  } = _ref;
  const [status, setStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const yesButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const noButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const postFeedback = async () => {
    if (status === "helpful" || status === "notHelpful") {
      _utils__WEBPACK_IMPORTED_MODULE_1__.InteractionAPIs.postFeedback(postId, status);
    }
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setStatus("");
    noButtonRef.current.className = "feedback-button no";
    yesButtonRef.current.className = "feedback-button yes";
  }, [postId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    postFeedback();
    if (status === "helpful") {
      yesButtonRef.current.className = "feedback-button yes selected-yes";
      noButtonRef.current.className = "feedback-button no";
    }
    if (status === "notHelpful") {
      noButtonRef.current.className = "feedback-button no selected-no";
      yesButtonRef.current.className = "feedback-button yes";
    }
  }, [status]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "feedback-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, "Did this result help you ?"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    ref: yesButtonRef,
    onClick: () => {
      setStatus("helpful");
    },
    class: "feedback-button yes"
  }, status === "helpful" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "\uD83E\uDD73"), " Yes"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => {
      setStatus("notHelpful");
    },
    ref: noButtonRef,
    class: "feedback-button no"
  }, status === "notHelpful" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "\uD83D\uDE2D"), " No")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Feedback);

/***/ }),

/***/ "./src/components/HelpCenter.js":
/*!**************************************!*\
  !*** ./src/components/HelpCenter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SearchResults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchResults */ "./src/components/SearchResults.js");
/* harmony import */ var algoliasearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! algoliasearch */ "./node_modules/algoliasearch/dist/algoliasearch.umd.js");
/* harmony import */ var algoliasearch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(algoliasearch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_instantsearch_hooks_web__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-instantsearch-hooks-web */ "./node_modules/react-instantsearch-hooks/dist/es/components/InstantSearch.js");
/* harmony import */ var react_instantsearch_hooks_web__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-instantsearch-hooks-web */ "./node_modules/react-instantsearch-hooks/dist/es/components/Index.js");
/* harmony import */ var react_instantsearch_hooks_web__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-instantsearch-hooks-web */ "./node_modules/react-instantsearch-hooks/dist/es/components/Configure.js");




const HelpCenter = props => {
  // Set up the instant search results
  const searchClient = algoliasearch__WEBPACK_IMPORTED_MODULE_2___default()("AVE0JWZU92", "eef54890add97ea2583ff1e417ff86ea");
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-help-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_instantsearch_hooks_web__WEBPACK_IMPORTED_MODULE_3__.InstantSearch, {
    searchClient: searchClient,
    indexName: "nfd_help_searchable_posts"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_instantsearch_hooks_web__WEBPACK_IMPORTED_MODULE_4__.Index, {
    indexName: "nfd_help_searchable_posts"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_instantsearch_hooks_web__WEBPACK_IMPORTED_MODULE_5__.Configure, {
    hitsPerPage: 3,
    getRankingInfo: true
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SearchResults__WEBPACK_IMPORTED_MODULE_1__["default"], null))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpCenter);

/***/ }),

/***/ "./src/components/Loader.js":
/*!**********************************!*\
  !*** ./src/components/Loader.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_loader_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/loader.svg */ "./src/icons/loader.svg");


const Loader = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_loader_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, null), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_loader_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, null), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_loader_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);

/***/ }),

/***/ "./src/components/Modal.js":
/*!*********************************!*\
  !*** ./src/components/Modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_close_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/close.svg */ "./src/icons/close.svg");
/* harmony import */ var _icons_help_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/help.svg */ "./src/icons/help.svg");
/* harmony import */ var _HelpCenter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HelpCenter */ "./src/components/HelpCenter.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! .. */ "./src/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./src/utils.js");







const Modal = _ref => {
  let {
    onClose
  } = _ref;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const helpVisible = _utils__WEBPACK_IMPORTED_MODULE_5__.LocalStorageUtils.getHelpVisible();
    (0,___WEBPACK_IMPORTED_MODULE_4__.toggleHelp)(helpVisible);
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modal"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "modal-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_help_svg__WEBPACK_IMPORTED_MODULE_2__.ReactComponent, null)), "Help Center"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "close-button",
    onClick: onClose
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icon-button"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_close_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, null)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_HelpCenter__WEBPACK_IMPORTED_MODULE_3__["default"], {
    closeHelp: onClose
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./src/components/NoResuts.js":
/*!************************************!*\
  !*** ./src/components/NoResuts.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_no_result_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/no-result.svg */ "./src/icons/no-result.svg");


const NoResults = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Result based on your search:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Sorry, we don't have any content for that yet."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_no_result_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "This tool is being built and doesn't always have a match."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "In the meantime, try searching our ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", null, "Resource center.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NoResults);

/***/ }),

/***/ "./src/components/ResultContent.js":
/*!*****************************************!*\
  !*** ./src/components/ResultContent.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResultContent": () => (/* binding */ ResultContent)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Feedback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Feedback */ "./src/components/Feedback.js");
/* harmony import */ var _NoResuts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NoResuts */ "./src/components/NoResuts.js");



const ResultContent = _ref => {
  let {
    content,
    noResult,
    postId
  } = _ref;
  if (noResult) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NoResuts__WEBPACK_IMPORTED_MODULE_2__["default"], null);
  }
  if (content && content.length > 0) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Follow these steps: "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: content
      }
    }), content && content.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Feedback__WEBPACK_IMPORTED_MODULE_1__["default"], {
      postId: postId
    }));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
};

/***/ }),

/***/ "./src/components/SearchResults.js":
/*!*****************************************!*\
  !*** ./src/components/SearchResults.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_instantsearch_hooks_web__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-instantsearch-hooks-web */ "./node_modules/react-instantsearch-hooks/dist/es/connectors/useSearchBox.js");
/* harmony import */ var react_instantsearch_hooks_web__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-instantsearch-hooks-web */ "./node_modules/react-instantsearch-hooks/dist/es/hooks/useInstantSearch.js");
/* harmony import */ var _newfold_labs_wp_module_ai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @newfold-labs/wp-module-ai */ "../wp-module-ai/index.js");
/* harmony import */ var _icons_search_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/search.svg */ "./src/icons/search.svg");
/* harmony import */ var _AlgoliaResult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AlgoliaResult */ "./src/components/AlgoliaResult.js");
/* harmony import */ var _ResultContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ResultContent */ "./src/components/ResultContent.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Loader */ "./src/components/Loader.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "./src/utils.js");





//

//




const SearchResults = () => {
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [noResult, setNoResult] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [searchInput, setSearchInput] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [resultContent, setResultContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [postId, setPostId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const {
    query,
    refine,
    clear
  } = (0,react_instantsearch_hooks_web__WEBPACK_IMPORTED_MODULE_8__.useSearchBox)();
  const {
    results
  } = (0,react_instantsearch_hooks_web__WEBPACK_IMPORTED_MODULE_9__.useInstantSearch)();
  const populateSearchResult = (resultContent, postId, searchInput) => {
    const resultContentFormatted = resultContent.replace(/\n/g, "<br /><br />");
    setResultContent(resultContentFormatted);
    setPostId(postId);
    _utils__WEBPACK_IMPORTED_MODULE_7__.LocalStorageUtils.persistResult(resultContentFormatted, postId);
    _utils__WEBPACK_IMPORTED_MODULE_7__.LocalStorageUtils.persistSearchInput(searchInput);
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Populate the results from local storage if they exist
    const {
      content: currentResultContent,
      postId: currentResultPostId
    } = _utils__WEBPACK_IMPORTED_MODULE_7__.LocalStorageUtils.getResultInfo();
    if (currentResultContent) {
      setResultContent(currentResultContent);
    }
    if (currentResultPostId) {
      setPostId(currentResultPostId);
    }
    const input = _utils__WEBPACK_IMPORTED_MODULE_7__.LocalStorageUtils.getSearchInput();
    if (input) {
      setSearchInput(input);
      refine(input);
    }
  }, []);
  const getResultMatches = (proximity, words) => {
    return proximity / words >= 0.75;
  };
  const getAIResult = async () => {
    setIsLoading(true);
    try {
      // Check if the algolia results are close enough
      const hits = results.hits;
      const resultMatches = hits.length > 0 ? getResultMatches(hits[0]._rankingInfo.proximityDistance, hits[0]._rankingInfo.words) : false;
      if (resultMatches) {
        populateSearchResult(hits[0].content, hits[0].post_id, searchInput);
        return;
      }
      const result = await _newfold_labs_wp_module_ai__WEBPACK_IMPORTED_MODULE_2__["default"].search.getSearchResult(query, "helpcenter");
      populateSearchResult(result["result"], result["post_id"], searchInput);
    } catch (exception) {
      console.log(exception);
      setNoResult(true);
    } finally {
      setIsLoading(false);
    }
  };
  const debouncedResults = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return (0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)(function (query) {
      if (query && query.length === 0) {
        clear();
      }
      refine(query);
    }, 300);
  }, []);

  // Clear any debounce problems
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    debouncedResults.cancel();
  }, []);
  if (isLoading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "searching..."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], null));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => {
      document.getElementById("search-input-box").focus();
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_search_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "search-input-box",
    style: {
      flexGrow: 2
    },
    value: searchInput,
    maxLength: "144",
    placeholder: "Ask me anything...",
    onChange: e => {
      setSearchInput(e.target.value);
      populateSearchResult("", undefined, e.target.value);
      setNoResult(false);
      debouncedResults(e.target.value);
    },
    onKeyDown: async e => {
      if (e.key === "Enter") {
        await getAIResult();
      }
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "attribute"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, searchInput ? searchInput.length : 0, "/144"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ResultContent__WEBPACK_IMPORTED_MODULE_5__.ResultContent, {
    content: resultContent,
    noResult: noResult,
    postId: postId
  }), results.hits.length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, resultContent.length > 0 ? "Other Resources" : "Search Suggestions")), results.hits.map(result => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_AlgoliaResult__WEBPACK_IMPORTED_MODULE_4__.AlgoliaResult, {
      searchTitle: result.post_title,
      onGo: () => {
        setSearchInput(result.post_title);
        populateSearchResult(result.content, result.post_id, result.post_title);
      }
    }));
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchResults);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleHelp": () => (/* binding */ toggleHelp)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles.scss */ "./styles.scss");
/* harmony import */ var _components_HelpCenter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/HelpCenter */ "./src/components/HelpCenter.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Modal */ "./src/components/Modal.js");
/* harmony import */ var _icons_help_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icons/help.svg */ "./src/icons/help.svg");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./src/utils.js");









const wpContentContainer = document.getElementById("wpcontent");
const toggleHelp = visible => {
  wpContentContainer.classList.toggle("wpcontent-container", visible);
  let nfdHelpContainer = document.getElementById("nfd-help-center");
  nfdHelpContainer.classList.toggle("help-container", visible);
  _utils__WEBPACK_IMPORTED_MODULE_7__.LocalStorageUtils.updateHelpVisible(visible);
};
window.newfoldEmbeddedHelp = {};
window.newfoldEmbeddedHelp.toggleNFDLaunchedEmbeddedHelp = () => {
  const helpVisible = _utils__WEBPACK_IMPORTED_MODULE_7__.LocalStorageUtils.getHelpVisible();
  if (Object.is(helpVisible, undefined)) {
    toggleHelp(true);
    return;
  }
  toggleHelp(!helpVisible);
};
window.newfoldEmbeddedHelp.toggleNFDUnlaunchedEmbeddedHelp = function toggleNFDUnlaunchedEmbeddedHelp() {
  let helpContainer = document.getElementById("nfd-help-center");
  wpContentContainer.removeChild(helpContainer);
  newfoldEmbeddedHelp.renderEmbeddedHelp();
};

//For rendering embedded help in Add, edit and View Pages
const HelpCenterPluginSidebar = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__.PluginSidebar, {
    name: "nfd-help-sidebar",
    title: "Help Center",
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_icons_help_svg__WEBPACK_IMPORTED_MODULE_6__.ReactComponent, null)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_HelpCenter__WEBPACK_IMPORTED_MODULE_4__["default"], null));
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__.registerPlugin)("nfd-help-panel", {
  render: HelpCenterPluginSidebar
});

//For rendering embedded help in Admin Pages
window.newfoldEmbeddedHelp.renderEmbeddedHelp = function renderEmbeddedHelp() {
  let helpContainer = document.createElement("div");
  helpContainer.id = "nfd-help-center";
  helpContainer.style.display = "none";
  wpContentContainer.appendChild(helpContainer);
  const DOM_TARGET = document.getElementById("nfd-help-center");
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Modal__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onClose: () => {
      toggleHelp(false);
    }
  }), DOM_TARGET);
};
newfoldEmbeddedHelp.renderEmbeddedHelp();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InteractionAPIs": () => (/* binding */ InteractionAPIs),
/* harmony export */   "LocalStorageUtils": () => (/* binding */ LocalStorageUtils)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

const base = "nfd-help/v1";
const InteractionAPIs = {
  postFeedback: (postId, status) => _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: base + "/feedback",
    method: "POST",
    data: {
      post_id: postId,
      status: status
    }
  })
};

// A wrapper to get and set things more easily
const LocalStorageUtils = {
  updateHelpVisible: visible => {
    localStorage.setItem("helpVisible", visible ? "true" : "false");
  },
  getHelpVisible: () => {
    return localStorage.getItem("helpVisible") === "true";
  },
  persistResult: (resultContent, postId) => {
    localStorage.setItem("helpResultContent", resultContent);
    localStorage.setItem("helpPostId", postId);
  },
  persistSearchInput: searchInput => {
    localStorage.setItem("searchInput", searchInput);
  },
  getResultInfo: () => {
    return {
      content: localStorage.getItem("helpResultContent"),
      postId: localStorage.getItem("helpPostId")
    };
  },
  getSearchInput: () => {
    return localStorage.getItem("searchInput");
  }
};

/***/ }),

/***/ "./node_modules/instantsearch.js/node_modules/qs/lib/formats.js":
/*!**********************************************************************!*\
  !*** ./node_modules/instantsearch.js/node_modules/qs/lib/formats.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};


/***/ }),

/***/ "./node_modules/instantsearch.js/node_modules/qs/lib/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/instantsearch.js/node_modules/qs/lib/index.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/instantsearch.js/node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/instantsearch.js/node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/instantsearch.js/node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/instantsearch.js/node_modules/qs/lib/parse.js":
/*!********************************************************************!*\
  !*** ./node_modules/instantsearch.js/node_modules/qs/lib/parse.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/instantsearch.js/node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else if (cleanRoot !== '__proto__') {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/instantsearch.js/node_modules/qs/lib/stringify.js":
/*!************************************************************************!*\
  !*** ./node_modules/instantsearch.js/node_modules/qs/lib/stringify.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/instantsearch.js/node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/instantsearch.js/node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var split = String.prototype.split;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
            if (generateArrayPrefix === 'comma' && encodeValuesOnly) {
                var valuesArray = split.call(String(obj), ',');
                var valuesJoined = '';
                for (var i = 0; i < valuesArray.length; ++i) {
                    valuesJoined += (i === 0 ? '' : ',') + formatter(encoder(valuesArray[i], defaults.encoder, charset, 'value', format));
                }
                return [formatter(keyValue) + '=' + valuesJoined];
            }
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
    } else if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');

        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/instantsearch.js/node_modules/qs/lib/utils.js":
/*!********************************************************************!*\
  !*** ./node_modules/instantsearch.js/node_modules/qs/lib/utils.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var formats = __webpack_require__(/*! ./formats */ "./node_modules/instantsearch.js/node_modules/qs/lib/formats.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
            || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        /* eslint operator-linebreak: [2, "before"] */
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};


/***/ }),

/***/ "./styles.scss":
/*!*********************!*\
  !*** ./styles.scss ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "react");

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

// dispatch for CommonJS interop named imports.

var useState = React.useState,
    useEffect = React.useEffect,
    useLayoutEffect = React.useLayoutEffect,
    useDebugValue = React.useDebugValue;
var didWarnOld18Alpha = false;
var didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  {
    if (!didWarnOld18Alpha) {
      if (React.startTransition !== undefined) {
        didWarnOld18Alpha = true;

        error('You are using an outdated, pre-release alpha of React 18 that ' + 'does not support useSyncExternalStore. The ' + 'use-sync-external-store shim will not work correctly. Upgrade ' + 'to a newer pre-release.');
      }
    }
  } // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.


  var value = getSnapshot();

  {
    if (!didWarnUncachedGetSnapshot) {
      var cachedValue = getSnapshot();

      if (!objectIs(value, cachedValue)) {
        error('The result of getSnapshot should be cached to avoid an infinite loop');

        didWarnUncachedGetSnapshot = true;
      }
    }
  } // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.


  var _useState = useState({
    inst: {
      value: value,
      getSnapshot: getSnapshot
    }
  }),
      inst = _useState[0].inst,
      forceUpdate = _useState[1]; // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.


  useLayoutEffect(function () {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }
  }, [subscribe, value, getSnapshot]);
  useEffect(function () {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }

    var handleStoreChange = function () {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst: inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.


    return subscribe(handleStoreChange);
  }, [subscribe]);
  useDebugValue(value);
  return value;
}

function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  var prevValue = inst.value;

  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');

var isServerEnvironment = !canUseDOM;

var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
var useSyncExternalStore$2 = React.useSyncExternalStore !== undefined ? React.useSyncExternalStore : shim;

exports.useSyncExternalStore = useSyncExternalStore$2;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/index.js":
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "./node_modules/instantsearch.js/es/connectors/configure/connectConfigure.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/connectors/configure/connectConfigure.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! algoliasearch-helper */ "./node_modules/algoliasearch-helper/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/documentation.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/noop.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/isPlainObject.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/mergeSearchParameters.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var withUsage = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.createDocumentationMessageGenerator)({
  name: 'configure',
  connector: true
});
function getInitialSearchParameters(state, widgetParams) {
  // We leverage the helper internals to remove the `widgetParams` from
  // the state. The function `setQueryParameters` omits the values that
  // are `undefined` on the next state.
  return state.setQueryParameters(Object.keys(widgetParams.searchParameters).reduce(function (acc, key) {
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, undefined));
  }, {}));
}
var connectConfigure = function connectConfigure() {
  var renderFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.noop;
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.noop;
  return function (widgetParams) {
    if (!widgetParams || !(0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.isPlainObject)(widgetParams.searchParameters)) {
      throw new Error(withUsage('The `searchParameters` option expects an object.'));
    }
    var connectorState = {};
    function refine(helper) {
      return function (searchParameters) {
        // Merge new `searchParameters` with the ones set from other widgets
        var actualState = getInitialSearchParameters(helper.state, widgetParams);
        var nextSearchParameters = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.mergeSearchParameters)(actualState, new algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__.SearchParameters(searchParameters));

        // Update original `widgetParams.searchParameters` to the new refined one
        widgetParams.searchParameters = searchParameters;

        // Trigger a search with the resolved search parameters
        helper.setState(nextSearchParameters).search();
      };
    }
    return {
      $$type: 'ais.configure',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref) {
        var state = _ref.state;
        unmountFn();
        return getInitialSearchParameters(state, widgetParams);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        var _renderState$configur;
        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        return _objectSpread(_objectSpread({}, renderState), {}, {
          configure: _objectSpread(_objectSpread({}, widgetRenderState), {}, {
            widgetParams: _objectSpread(_objectSpread({}, widgetRenderState.widgetParams), {}, {
              searchParameters: (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.mergeSearchParameters)(new algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__.SearchParameters((_renderState$configur = renderState.configure) === null || _renderState$configur === void 0 ? void 0 : _renderState$configur.widgetParams.searchParameters), new algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__.SearchParameters(widgetRenderState.widgetParams.searchParameters)).getQueryParams()
            })
          })
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var helper = _ref2.helper;
        if (!connectorState.refine) {
          connectorState.refine = refine(helper);
        }
        return {
          refine: connectorState.refine,
          widgetParams: widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref3) {
        var uiState = _ref3.uiState;
        return (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.mergeSearchParameters)(state, new algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__.SearchParameters(_objectSpread(_objectSpread({}, uiState.configure), widgetParams.searchParameters)));
      },
      getWidgetUiState: function getWidgetUiState(uiState) {
        return _objectSpread(_objectSpread({}, uiState), {}, {
          configure: _objectSpread(_objectSpread({}, uiState.configure), widgetParams.searchParameters)
        });
      }
    };
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectConfigure);

/***/ }),

/***/ "./node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js":
/*!************************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/documentation.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/noop.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/checkRendering.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var withUsage = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.createDocumentationMessageGenerator)({
  name: 'search-box',
  connector: true
});
var defaultQueryHook = function defaultQueryHook(query, hook) {
  return hook(query);
};

/**
 * **SearchBox** connector provides the logic to build a widget that will let the user search for a query.
 *
 * The connector provides to the rendering: `refine()` to set the query. The behaviour of this function
 * may be impacted by the `queryHook` widget parameter.
 */
var connectSearchBox = function connectSearchBox(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.noop;
  (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.checkRendering)(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
      _ref$queryHook = _ref.queryHook,
      queryHook = _ref$queryHook === void 0 ? defaultQueryHook : _ref$queryHook;
    var _refine;
    var _clear;
    return {
      $$type: 'ais.searchBox',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state.setQueryParameter('query', undefined);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          searchBox: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var helper = _ref3.helper,
          searchMetadata = _ref3.searchMetadata,
          state = _ref3.state;
        if (!_refine) {
          _refine = function _refine(query) {
            queryHook(query, function (q) {
              return helper.setQuery(q).search();
            });
          };
          _clear = function _clear() {
            helper.setQuery('').search();
          };
        }
        return {
          query: state.query || '',
          refine: _refine,
          clear: _clear,
          widgetParams: widgetParams,
          isSearchStalled: searchMetadata.isSearchStalled
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var query = searchParameters.query || '';
        if (query === '' || uiState && uiState.query === query) {
          return uiState;
        }
        return _objectSpread(_objectSpread({}, uiState), {}, {
          query: query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        return searchParameters.setQueryParameter('query', uiState.query || '');
      }
    };
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectSearchBox);

/***/ }),

/***/ "./node_modules/instantsearch.js/es/helpers/get-insights-anonymous-user-token.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/helpers/get-insights-anonymous-user-token.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ANONYMOUS_TOKEN_COOKIE_KEY": () => (/* binding */ ANONYMOUS_TOKEN_COOKIE_KEY),
/* harmony export */   "default": () => (/* binding */ getInsightsAnonymousUserToken),
/* harmony export */   "getInsightsAnonymousUserTokenInternal": () => (/* binding */ getInsightsAnonymousUserTokenInternal)
/* harmony export */ });
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/logger.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var ANONYMOUS_TOKEN_COOKIE_KEY = '_ALGOLIA';
function getCookie(name) {
  if ((typeof document === "undefined" ? "undefined" : _typeof(document)) !== 'object' || typeof document.cookie !== 'string') {
    return undefined;
  }
  var prefix = "".concat(name, "=");
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(prefix) === 0) {
      return cookie.substring(prefix.length, cookie.length);
    }
  }
  return undefined;
}
function getInsightsAnonymousUserTokenInternal() {
  return getCookie(ANONYMOUS_TOKEN_COOKIE_KEY);
}

/**
 * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
 */
function getInsightsAnonymousUserToken() {
   true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.warning)(false, "`getInsightsAnonymousUserToken` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : 0;
  return getInsightsAnonymousUserTokenInternal();
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/helpers/highlight.js":
/*!***************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/helpers/highlight.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ highlight)
/* harmony export */ });
/* harmony import */ var _lib_suit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/suit.js */ "./node_modules/instantsearch.js/es/lib/suit.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/logger.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/escape-highlight.js");


var suit = (0,_lib_suit_js__WEBPACK_IMPORTED_MODULE_0__.component)('Highlight');

/**
 * @deprecated use html tagged templates and the Highlight component instead
 */
function highlight(_ref) {
  var attribute = _ref.attribute,
    _ref$highlightedTagNa = _ref.highlightedTagName,
    highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
    hit = _ref.hit,
    _ref$cssClasses = _ref.cssClasses,
    cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
   true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.warning)(false, "`instantsearch.highlight` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `Highlight` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : 0;
  var highlightAttributeResult = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.getPropertyByPath)(hit._highlightResult, attribute);

  // @MAJOR fallback to attribute value if highlight is not found
   true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.warning)(highlightAttributeResult, "Could not enable highlight for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n")) : 0;
  var _ref2 = highlightAttributeResult || {},
    _ref2$value = _ref2.value,
    attributeValue = _ref2$value === void 0 ? '' : _ref2$value;

  // cx is not used, since it would be bundled as a dependency for Vue & Angular
  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  return attributeValue.replace(new RegExp(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/helpers/insights.js":
/*!**************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/helpers/insights.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ insights),
/* harmony export */   "readDataAttributes": () => (/* binding */ readDataAttributes),
/* harmony export */   "writeDataAttributes": () => (/* binding */ writeDataAttributes)
/* harmony export */ });
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/serializer.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/logger.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/** @deprecated use bindEvent instead */
function readDataAttributes(domElement) {
  var method = domElement.getAttribute('data-insights-method');
  var serializedPayload = domElement.getAttribute('data-insights-payload');
  if (typeof serializedPayload !== 'string') {
    throw new Error('The insights helper expects `data-insights-payload` to be a base64-encoded JSON string.');
  }
  try {
    var payload = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.deserializePayload)(serializedPayload);
    return {
      method: method,
      payload: payload
    };
  } catch (error) {
    throw new Error('The insights helper was unable to parse `data-insights-payload`.');
  }
}

/** @deprecated use bindEvent instead */
function writeDataAttributes(_ref) {
  var method = _ref.method,
    payload = _ref.payload;
  if (_typeof(payload) !== 'object') {
    throw new Error("The insights helper expects the payload to be an object.");
  }
  var serializedPayload;
  try {
    serializedPayload = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.serializePayload)(payload);
  } catch (error) {
    throw new Error("Could not JSON serialize the payload object.");
  }
  return "data-insights-method=\"".concat(method, "\" data-insights-payload=\"").concat(serializedPayload, "\"");
}

/**
 * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
 */
function insights(method, payload) {
   true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.warning)(false, "`insights` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : 0;
  return writeDataAttributes({
    method: method,
    payload: payload
  });
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/helpers/reverseHighlight.js":
/*!**********************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/helpers/reverseHighlight.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ reverseHighlight)
/* harmony export */ });
/* harmony import */ var _lib_suit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/suit.js */ "./node_modules/instantsearch.js/es/lib/suit.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/logger.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/concatHighlightedParts.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/reverseHighlightedParts.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/getHighlightedParts.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/escape-highlight.js");


var suit = (0,_lib_suit_js__WEBPACK_IMPORTED_MODULE_0__.component)('ReverseHighlight');

/**
 * @deprecated use html tagged templates and the ReverseHighlight component instead
 */
function reverseHighlight(_ref) {
  var attribute = _ref.attribute,
    _ref$highlightedTagNa = _ref.highlightedTagName,
    highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
    hit = _ref.hit,
    _ref$cssClasses = _ref.cssClasses,
    cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
   true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.warning)(false, "`instantsearch.reverseHighlight` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `ReverseHighlight` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : 0;
  var highlightAttributeResult = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.getPropertyByPath)(hit._highlightResult, attribute);

  // @MAJOR fallback to attribute value if highlight is not found
   true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.warning)(highlightAttributeResult, "Could not enable reverse highlight for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n")) : 0;
  var _ref2 = highlightAttributeResult || {},
    _ref2$value = _ref2.value,
    attributeValue = _ref2$value === void 0 ? '' : _ref2$value;

  // cx is not used, since it would be bundled as a dependency for Vue & Angular
  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  var reverseHighlightedValue = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.concatHighlightedParts)((0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.reverseHighlightedParts)((0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.getHighlightedParts)(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6__.TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6__.TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/helpers/reverseSnippet.js":
/*!********************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/helpers/reverseSnippet.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ reverseSnippet)
/* harmony export */ });
/* harmony import */ var _lib_suit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/suit.js */ "./node_modules/instantsearch.js/es/lib/suit.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/logger.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/concatHighlightedParts.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/reverseHighlightedParts.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/getHighlightedParts.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/escape-highlight.js");


var suit = (0,_lib_suit_js__WEBPACK_IMPORTED_MODULE_0__.component)('ReverseSnippet');

/**
 * @deprecated use html tagged templates and the ReverseSnippet component instead
 */
function reverseSnippet(_ref) {
  var attribute = _ref.attribute,
    _ref$highlightedTagNa = _ref.highlightedTagName,
    highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
    hit = _ref.hit,
    _ref$cssClasses = _ref.cssClasses,
    cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
   true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.warning)(false, "`instantsearch.reverseSnippet` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `ReverseSnippet` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : 0;
  var snippetAttributeResult = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.getPropertyByPath)(hit._snippetResult, attribute);

  // @MAJOR fallback to attribute value if snippet is not found
   true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.warning)(snippetAttributeResult, "Could not enable reverse snippet for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n")) : 0;
  var _ref2 = snippetAttributeResult || {},
    _ref2$value = _ref2.value,
    attributeValue = _ref2$value === void 0 ? '' : _ref2$value;

  // cx is not used, since it would be bundled as a dependency for Vue & Angular
  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  var reverseHighlightedValue = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.concatHighlightedParts)((0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.reverseHighlightedParts)((0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.getHighlightedParts)(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6__.TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6__.TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/helpers/snippet.js":
/*!*************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/helpers/snippet.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ snippet)
/* harmony export */ });
/* harmony import */ var _lib_suit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/suit.js */ "./node_modules/instantsearch.js/es/lib/suit.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/logger.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/escape-highlight.js");


var suit = (0,_lib_suit_js__WEBPACK_IMPORTED_MODULE_0__.component)('Snippet');

/**
 * @deprecated use html tagged templates and the Snippet component instead
 */
function snippet(_ref) {
  var attribute = _ref.attribute,
    _ref$highlightedTagNa = _ref.highlightedTagName,
    highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
    hit = _ref.hit,
    _ref$cssClasses = _ref.cssClasses,
    cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
   true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.warning)(false, "`instantsearch.snippet` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `Snippet` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : 0;
  var snippetAttributeResult = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.getPropertyByPath)(hit._snippetResult, attribute);

  // @MAJOR fallback to attribute value if snippet is not found
   true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.warning)(snippetAttributeResult, "Could not enable snippet for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n")) : 0;
  var _ref2 = snippetAttributeResult || {},
    _ref2$value = _ref2.value,
    attributeValue = _ref2$value === void 0 ? '' : _ref2$value;

  // cx is not used, since it would be bundled as a dependency for Vue & Angular
  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  return attributeValue.replace(new RegExp(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/InstantSearch.js":
/*!***************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/InstantSearch.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _algolia_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/events */ "./node_modules/@algolia/events/events.js");
/* harmony import */ var algoliasearch_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! algoliasearch-helper */ "./node_modules/algoliasearch-helper/index.js");
/* harmony import */ var _middlewares_createInsightsMiddleware_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../middlewares/createInsightsMiddleware.js */ "./node_modules/instantsearch.js/es/middlewares/createInsightsMiddleware.js");
/* harmony import */ var _middlewares_createMetadataMiddleware_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../middlewares/createMetadataMiddleware.js */ "./node_modules/instantsearch.js/es/middlewares/createMetadataMiddleware.js");
/* harmony import */ var _middlewares_createRouterMiddleware_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../middlewares/createRouterMiddleware.js */ "./node_modules/instantsearch.js/es/middlewares/createRouterMiddleware.js");
/* harmony import */ var _widgets_index_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widgets/index/index.js */ "./node_modules/instantsearch.js/es/widgets/index/index.js");
/* harmony import */ var _createHelpers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./createHelpers.js */ "./node_modules/instantsearch.js/es/lib/createHelpers.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/documentation.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/defer.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/logger.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/noop.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/setIndexHelperState.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./version.js */ "./node_modules/instantsearch.js/es/lib/version.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }









var withUsage = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.createDocumentationMessageGenerator)({
  name: 'instantsearch'
});
function defaultCreateURL() {
  return '#';
}

// this purposely breaks typescript's type inference to ensure it's not used
// as it's used for a default parameter for example
// source: https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-504042546
/**
 * The actual implementation of the InstantSearch. This is
 * created using the `instantsearch` factory function.
 * It emits the 'render' event every time a search is done
 */
var InstantSearch = /*#__PURE__*/function (_EventEmitter) {
  _inherits(InstantSearch, _EventEmitter);
  var _super = _createSuper(InstantSearch);
  function InstantSearch(options) {
    var _this;
    _classCallCheck(this, InstantSearch);
    _this = _super.call(this);

    // prevent `render` event listening from causing a warning
    _defineProperty(_assertThisInitialized(_this), "client", void 0);
    _defineProperty(_assertThisInitialized(_this), "indexName", void 0);
    _defineProperty(_assertThisInitialized(_this), "insightsClient", void 0);
    _defineProperty(_assertThisInitialized(_this), "onStateChange", null);
    _defineProperty(_assertThisInitialized(_this), "helper", void 0);
    _defineProperty(_assertThisInitialized(_this), "mainHelper", void 0);
    _defineProperty(_assertThisInitialized(_this), "mainIndex", void 0);
    _defineProperty(_assertThisInitialized(_this), "started", void 0);
    _defineProperty(_assertThisInitialized(_this), "templatesConfig", void 0);
    _defineProperty(_assertThisInitialized(_this), "renderState", {});
    _defineProperty(_assertThisInitialized(_this), "_stalledSearchDelay", void 0);
    _defineProperty(_assertThisInitialized(_this), "_searchStalledTimer", void 0);
    _defineProperty(_assertThisInitialized(_this), "_initialUiState", void 0);
    _defineProperty(_assertThisInitialized(_this), "_initialResults", void 0);
    _defineProperty(_assertThisInitialized(_this), "_createURL", void 0);
    _defineProperty(_assertThisInitialized(_this), "_searchFunction", void 0);
    _defineProperty(_assertThisInitialized(_this), "_mainHelperSearch", void 0);
    _defineProperty(_assertThisInitialized(_this), "middleware", []);
    _defineProperty(_assertThisInitialized(_this), "sendEventToInsights", void 0);
    _defineProperty(_assertThisInitialized(_this), "status", 'idle');
    _defineProperty(_assertThisInitialized(_this), "error", undefined);
    _defineProperty(_assertThisInitialized(_this), "scheduleSearch", (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.defer)(function () {
      if (_this.started) {
        _this.mainHelper.search();
      }
    }));
    _defineProperty(_assertThisInitialized(_this), "scheduleRender", (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.defer)(function () {
      var _this$mainHelper;
      var shouldResetStatus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!((_this$mainHelper = _this.mainHelper) !== null && _this$mainHelper !== void 0 && _this$mainHelper.hasPendingRequests())) {
        clearTimeout(_this._searchStalledTimer);
        _this._searchStalledTimer = null;
        if (shouldResetStatus) {
          _this.status = 'idle';
          _this.error = undefined;
        }
      }
      _this.mainIndex.render({
        instantSearchInstance: _assertThisInitialized(_this)
      });
      _this.emit('render');
    }));
    _defineProperty(_assertThisInitialized(_this), "onInternalStateChange", (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.defer)(function () {
      var nextUiState = _this.mainIndex.getWidgetUiState({});
      _this.middleware.forEach(function (_ref) {
        var instance = _ref.instance;
        instance.onStateChange({
          uiState: nextUiState
        });
      });
    }));
    _this.setMaxListeners(100);
    var _options$indexName = options.indexName,
      indexName = _options$indexName === void 0 ? null : _options$indexName,
      numberLocale = options.numberLocale,
      _options$initialUiSta = options.initialUiState,
      initialUiState = _options$initialUiSta === void 0 ? {} : _options$initialUiSta,
      _options$routing = options.routing,
      routing = _options$routing === void 0 ? null : _options$routing,
      _options$insights = options.insights,
      insights = _options$insights === void 0 ? false : _options$insights,
      searchFunction = options.searchFunction,
      _options$stalledSearc = options.stalledSearchDelay,
      stalledSearchDelay = _options$stalledSearc === void 0 ? 200 : _options$stalledSearc,
      _options$searchClient = options.searchClient,
      searchClient = _options$searchClient === void 0 ? null : _options$searchClient,
      _options$insightsClie = options.insightsClient,
      insightsClient = _options$insightsClie === void 0 ? null : _options$insightsClie,
      _options$onStateChang = options.onStateChange,
      onStateChange = _options$onStateChang === void 0 ? null : _options$onStateChang;
    if (indexName === null) {
      throw new Error(withUsage('The `indexName` option is required.'));
    }
    if (searchClient === null) {
      throw new Error(withUsage('The `searchClient` option is required.'));
    }
    if (typeof searchClient.search !== 'function') {
      throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
    }
    if (typeof searchClient.addAlgoliaAgent === 'function') {
      searchClient.addAlgoliaAgent("instantsearch.js (".concat(_version_js__WEBPACK_IMPORTED_MODULE_4__["default"], ")"));
    }
     true ? (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.warning)(insightsClient === null, "`insightsClient` property has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : 0;
    if (insightsClient && typeof insightsClient !== 'function') {
      throw new Error(withUsage('The `insightsClient` option should be a function.'));
    }
     true ? (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.warning)(!options.searchParameters, "The `searchParameters` option is deprecated and will not be supported in InstantSearch.js 4.x.\n\nYou can replace it with the `configure` widget:\n\n```\nsearch.addWidgets([\n  configure(".concat(JSON.stringify(options.searchParameters, null, 2), ")\n]);\n```\n\nSee ").concat((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.createDocumentationLink)({
      name: 'configure'
    }))) : 0;
    _this.client = searchClient;
    _this.insightsClient = insightsClient;
    _this.indexName = indexName;
    _this.helper = null;
    _this.mainHelper = null;
    _this.mainIndex = (0,_widgets_index_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])({
      indexName: indexName
    });
    _this.onStateChange = onStateChange;
    _this.started = false;
    _this.templatesConfig = {
      helpers: (0,_createHelpers_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
        numberLocale: numberLocale
      }),
      compileOptions: {}
    };
    _this._stalledSearchDelay = stalledSearchDelay;
    _this._searchStalledTimer = null;
    _this._createURL = defaultCreateURL;
    _this._initialUiState = initialUiState;
    _this._initialResults = null;
    if (searchFunction) {
       true ? (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.warning)(false, "The `searchFunction` option is deprecated. Use `onStateChange` instead.") : 0;
      _this._searchFunction = searchFunction;
    }
    _this.sendEventToInsights = _utils_index_js__WEBPACK_IMPORTED_MODULE_8__.noop;
    if (routing) {
      var routerOptions = typeof routing === 'boolean' ? {} : routing;
      routerOptions.$$internal = true;
      _this.use((0,_middlewares_createRouterMiddleware_js__WEBPACK_IMPORTED_MODULE_9__.createRouterMiddleware)(routerOptions));
    }

    // This is the default middleware,
    // any user-provided middleware will be added later and override this one.
    if (insights) {
      var insightsOptions = typeof insights === 'boolean' ? {} : insights;
      insightsOptions.$$internal = true;
      _this.use((0,_middlewares_createInsightsMiddleware_js__WEBPACK_IMPORTED_MODULE_10__.createInsightsMiddleware)(insightsOptions));
    }
    if ((0,_middlewares_createMetadataMiddleware_js__WEBPACK_IMPORTED_MODULE_11__.isMetadataEnabled)()) {
      _this.use((0,_middlewares_createMetadataMiddleware_js__WEBPACK_IMPORTED_MODULE_11__.createMetadataMiddleware)({
        $$internal: true
      }));
    }
    return _this;
  }

  /**
   * Hooks a middleware into the InstantSearch lifecycle.
   */
  _createClass(InstantSearch, [{
    key: "_isSearchStalled",
    get:
    /**
     * The status of the search. Can be "idle", "loading", "stalled", or "error".
     */

    /**
     * The last returned error from the Search API.
     * The error gets cleared when the next valid search response is rendered.
     */

    /**
     * @deprecated use `status === 'stalled'` instead
     */
    function get() {
       true ? (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.warning)(false, "`InstantSearch._isSearchStalled` is deprecated and will be removed in InstantSearch.js 5.0.\n\nUse `InstantSearch.status === \"stalled\"` instead.") : 0;
      return this.status === 'stalled';
    }
  }, {
    key: "use",
    value: function use() {
      var _this2 = this;
      for (var _len = arguments.length, middleware = new Array(_len), _key = 0; _key < _len; _key++) {
        middleware[_key] = arguments[_key];
      }
      var newMiddlewareList = middleware.map(function (fn) {
        var newMiddleware = _objectSpread({
          $$type: '__unknown__',
          $$internal: false,
          subscribe: _utils_index_js__WEBPACK_IMPORTED_MODULE_8__.noop,
          started: _utils_index_js__WEBPACK_IMPORTED_MODULE_8__.noop,
          unsubscribe: _utils_index_js__WEBPACK_IMPORTED_MODULE_8__.noop,
          onStateChange: _utils_index_js__WEBPACK_IMPORTED_MODULE_8__.noop
        }, fn({
          instantSearchInstance: _this2
        }));
        _this2.middleware.push({
          creator: fn,
          instance: newMiddleware
        });
        return newMiddleware;
      });

      // If the instance has already started, we directly subscribe the
      // middleware so they're notified of changes.
      if (this.started) {
        newMiddlewareList.forEach(function (m) {
          m.subscribe();
          m.started();
        });
      }
      return this;
    }

    /**
     * Removes a middleware from the InstantSearch lifecycle.
     */
  }, {
    key: "unuse",
    value: function unuse() {
      for (var _len2 = arguments.length, middlewareToUnuse = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        middlewareToUnuse[_key2] = arguments[_key2];
      }
      this.middleware.filter(function (m) {
        return middlewareToUnuse.includes(m.creator);
      }).forEach(function (m) {
        return m.instance.unsubscribe();
      });
      this.middleware = this.middleware.filter(function (m) {
        return !middlewareToUnuse.includes(m.creator);
      });
      return this;
    }

    // @major we shipped with EXPERIMENTAL_use, but have changed that to just `use` now
  }, {
    key: "EXPERIMENTAL_use",
    value: function EXPERIMENTAL_use() {
       true ? (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.warning)(false, 'The middleware API is now considered stable, so we recommend replacing `EXPERIMENTAL_use` with `use` before upgrading to the next major version.') : 0;
      return this.use.apply(this, arguments);
    }

    /**
     * Adds a widget to the search instance.
     * A widget can be added either before or after InstantSearch has started.
     * @param widget The widget to add to InstantSearch.
     *
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`.
     */
  }, {
    key: "addWidget",
    value: function addWidget(widget) {
       true ? (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.warning)(false, 'addWidget will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`') : 0;
      return this.addWidgets([widget]);
    }

    /**
     * Adds multiple widgets to the search instance.
     * Widgets can be added either before or after InstantSearch has started.
     * @param widgets The array of widgets to add to InstantSearch.
     */
  }, {
    key: "addWidgets",
    value: function addWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `addWidgets` method expects an array of widgets. Please use `addWidget`.'));
      }
      if (widgets.some(function (widget) {
        return typeof widget.init !== 'function' && typeof widget.render !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `render` and/or an `init` method.'));
      }
      this.mainIndex.addWidgets(widgets);
      return this;
    }

    /**
     * Removes a widget from the search instance.
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`
     * @param widget The widget instance to remove from InstantSearch.
     *
     * The widget must implement a `dispose()` method to clear its state.
     */
  }, {
    key: "removeWidget",
    value: function removeWidget(widget) {
       true ? (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.warning)(false, 'removeWidget will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`') : 0;
      return this.removeWidgets([widget]);
    }

    /**
     * Removes multiple widgets from the search instance.
     * @param widgets Array of widgets instances to remove from InstantSearch.
     *
     * The widgets must implement a `dispose()` method to clear their states.
     */
  }, {
    key: "removeWidgets",
    value: function removeWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `removeWidgets` method expects an array of widgets. Please use `removeWidget`.'));
      }
      if (widgets.some(function (widget) {
        return typeof widget.dispose !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `dispose` method.'));
      }
      this.mainIndex.removeWidgets(widgets);
      return this;
    }

    /**
     * Ends the initialization of InstantSearch.js and triggers the
     * first search. This method should be called after all widgets have been added
     * to the instance of InstantSearch.js. InstantSearch.js also supports adding and removing
     * widgets after the start as an **EXPERIMENTAL** feature.
     */
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;
      if (this.started) {
        throw new Error(withUsage('The `start` method has already been called once.'));
      }

      // This Helper is used for the queries, we don't care about its state. The
      // states are managed at the `index` level. We use this Helper to create
      // DerivedHelper scoped into the `index` widgets.
      // In Vue InstantSearch' hydrate, a main helper gets set before start, so
      // we need to respect this helper as a way to keep all listeners correct.
      var mainHelper = this.mainHelper || algoliasearch_helper__WEBPACK_IMPORTED_MODULE_1__(this.client, this.indexName);
      mainHelper.search = function () {
        _this3.status = 'loading';
        _this3.scheduleRender(false);

        // This solution allows us to keep the exact same API for the users but
        // under the hood, we have a different implementation. It should be
        // completely transparent for the rest of the codebase. Only this module
        // is impacted.
        return mainHelper.searchOnlyWithDerivedHelpers();
      };
      if (this._searchFunction) {
        // this client isn't used to actually search, but required for the helper
        // to not throw errors
        var fakeClient = {
          search: function search() {
            return new Promise(_utils_index_js__WEBPACK_IMPORTED_MODULE_8__.noop);
          }
        };
        this._mainHelperSearch = mainHelper.search.bind(mainHelper);
        mainHelper.search = function () {
          var mainIndexHelper = _this3.mainIndex.getHelper();
          var searchFunctionHelper = algoliasearch_helper__WEBPACK_IMPORTED_MODULE_1__(fakeClient, mainIndexHelper.state.index, mainIndexHelper.state);
          searchFunctionHelper.once('search', function (_ref2) {
            var state = _ref2.state;
            mainIndexHelper.overrideStateWithoutTriggeringChangeEvent(state);
            _this3._mainHelperSearch();
          });
          // Forward state changes from `searchFunctionHelper` to `mainIndexHelper`
          searchFunctionHelper.on('change', function (_ref3) {
            var state = _ref3.state;
            mainIndexHelper.setState(state);
          });
          _this3._searchFunction(searchFunctionHelper);
          return mainHelper;
        };
      }

      // Only the "main" Helper emits the `error` event vs the one for `search`
      // and `results` that are also emitted on the derived one.
      mainHelper.on('error', function (_ref4) {
        var error = _ref4.error;
        if (!(error instanceof Error)) {
          // typescript lies here, error is in some cases { name: string, message: string }
          var err = error;
          error = Object.keys(err).reduce(function (acc, key) {
            acc[key] = err[key];
            return acc;
          }, new Error(err.message));
        }
        // If an error is emitted, it is re-thrown by events. In previous versions
        // we emitted {error}, which is thrown as:
        // "Uncaught, unspecified \"error\" event. ([object Object])"
        // To avoid breaking changes, we make the error available in both
        // `error` and `error.error`
        // @MAJOR emit only error
        error.error = error;
        _this3.error = error;
        _this3.status = 'error';
        _this3.scheduleRender(false);

        // This needs to execute last because it throws the error.
        _this3.emit('error', error);
      });
      this.mainHelper = mainHelper;
      this.middleware.forEach(function (_ref5) {
        var instance = _ref5.instance;
        instance.subscribe();
      });
      this.mainIndex.init({
        instantSearchInstance: this,
        parent: null,
        uiState: this._initialUiState
      });
      if (this._initialResults) {
        var originalScheduleSearch = this.scheduleSearch;
        // We don't schedule a first search when initial results are provided
        // because we already have the results to render. This skips the initial
        // network request on the browser on `start`.
        this.scheduleSearch = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.defer)(_utils_index_js__WEBPACK_IMPORTED_MODULE_8__.noop);
        // We also skip the initial network request when widgets are dynamically
        // added in the first tick (that's the case in all the framework-based flavors).
        // When we add a widget to `index`, it calls `scheduleSearch`. We can rely
        // on our `defer` util to restore the original `scheduleSearch` value once
        // widgets are added to hook back to the regular lifecycle.
        (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.defer)(function () {
          _this3.scheduleSearch = originalScheduleSearch;
        })();
      }
      // We only schedule a search when widgets have been added before `start()`
      // because there are listeners that can use these results.
      // This is especially useful in framework-based flavors that wait for
      // dynamically-added widgets to trigger a network request. It avoids
      // having to batch this initial network request with the one coming from
      // `addWidgets()`.
      // Later, we could also skip `index()` widgets and widgets that don't read
      // the results, but this is an optimization that has a very low impact for now.
      else if (this.mainIndex.getWidgets().length > 0) {
        this.scheduleSearch();
      }

      // Keep the previous reference for legacy purpose, some pattern use
      // the direct Helper access `search.helper` (e.g multi-index).
      this.helper = this.mainIndex.getHelper();

      // track we started the search if we add more widgets,
      // to init them directly after add
      this.started = true;
      this.middleware.forEach(function (_ref6) {
        var instance = _ref6.instance;
        instance.started();
      });
    }

    /**
     * Removes all widgets without triggering a search afterwards. This is an **EXPERIMENTAL** feature,
     * if you find an issue with it, please
     * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20dispose).
     * @return {undefined} This method does not return anything
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this$mainHelper2;
      this.scheduleSearch.cancel();
      this.scheduleRender.cancel();
      clearTimeout(this._searchStalledTimer);
      this.removeWidgets(this.mainIndex.getWidgets());
      this.mainIndex.dispose();

      // You can not start an instance two times, therefore a disposed instance
      // needs to set started as false otherwise this can not be restarted at a
      // later point.
      this.started = false;

      // The helper needs to be reset to perform the next search from a fresh state.
      // If not reset, it would use the state stored before calling `dispose()`.
      this.removeAllListeners();
      (_this$mainHelper2 = this.mainHelper) === null || _this$mainHelper2 === void 0 ? void 0 : _this$mainHelper2.removeAllListeners();
      this.mainHelper = null;
      this.helper = null;
      this.middleware.forEach(function (_ref7) {
        var instance = _ref7.instance;
        instance.unsubscribe();
      });
    }
  }, {
    key: "scheduleStalledRender",
    value: function scheduleStalledRender() {
      var _this4 = this;
      if (!this._searchStalledTimer) {
        this._searchStalledTimer = setTimeout(function () {
          _this4.status = 'stalled';
          _this4.scheduleRender();
        }, this._stalledSearchDelay);
      }
    }

    /**
     * Set the UI state and trigger a search.
     * @param uiState The next UI state or a function computing it from the current state
     * @param callOnStateChange private parameter used to know if the method is called from a state change
     */
  }, {
    key: "setUiState",
    value: function setUiState(uiState) {
      var _this5 = this;
      var callOnStateChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this.mainHelper) {
        throw new Error(withUsage('The `start` method needs to be called before `setUiState`.'));
      }

      // We refresh the index UI state to update the local UI state that the
      // main index passes to the function form of `setUiState`.
      this.mainIndex.refreshUiState();
      var nextUiState = typeof uiState === 'function' ? uiState(this.mainIndex.getWidgetUiState({})) : uiState;
      if (this.onStateChange && callOnStateChange) {
        this.onStateChange({
          uiState: nextUiState,
          setUiState: function setUiState(finalUiState) {
            (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_12__.setIndexHelperState)(typeof finalUiState === 'function' ? finalUiState(nextUiState) : finalUiState, _this5.mainIndex);
            _this5.scheduleSearch();
            _this5.onInternalStateChange();
          }
        });
      } else {
        (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_12__.setIndexHelperState)(nextUiState, this.mainIndex);
        this.scheduleSearch();
        this.onInternalStateChange();
      }
    }
  }, {
    key: "getUiState",
    value: function getUiState() {
      if (this.started) {
        // We refresh the index UI state to make sure changes from `refine` are taken in account
        this.mainIndex.refreshUiState();
      }
      return this.mainIndex.getWidgetUiState({});
    }
  }, {
    key: "createURL",
    value: function createURL() {
      var nextState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.started) {
        throw new Error(withUsage('The `start` method needs to be called before `createURL`.'));
      }
      return this._createURL(nextState);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (!this.mainHelper) {
        throw new Error(withUsage('The `start` method needs to be called before `refresh`.'));
      }
      this.mainHelper.clearCache().search();
    }
  }]);
  return InstantSearch;
}(_algolia_events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InstantSearch);

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/createHelpers.js":
/*!***************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/createHelpers.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hoganHelpers)
/* harmony export */ });
/* harmony import */ var _helpers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/index.js */ "./node_modules/instantsearch.js/es/helpers/highlight.js");
/* harmony import */ var _helpers_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/index.js */ "./node_modules/instantsearch.js/es/helpers/reverseHighlight.js");
/* harmony import */ var _helpers_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/index.js */ "./node_modules/instantsearch.js/es/helpers/snippet.js");
/* harmony import */ var _helpers_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/index.js */ "./node_modules/instantsearch.js/es/helpers/reverseSnippet.js");
/* harmony import */ var _helpers_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/index.js */ "./node_modules/instantsearch.js/es/helpers/insights.js");
/* harmony import */ var _formatNumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatNumber.js */ "./node_modules/instantsearch.js/es/lib/formatNumber.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


function hoganHelpers(_ref) {
  var numberLocale = _ref.numberLocale;
  return {
    formatNumber: function formatNumber(value, render) {
      return (0,_formatNumber_js__WEBPACK_IMPORTED_MODULE_0__.formatNumber)(Number(render(value)), numberLocale);
    },
    highlight: function highlight(options, render) {
      try {
        var highlightOptions = JSON.parse(options);
        return render((0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_objectSpread(_objectSpread({}, highlightOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\nThe highlight helper expects a JSON object of the format:\n{ \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    reverseHighlight: function reverseHighlight(options, render) {
      try {
        var reverseHighlightOptions = JSON.parse(options);
        return render((0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_objectSpread(_objectSpread({}, reverseHighlightOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\n  The reverseHighlight helper expects a JSON object of the format:\n  { \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    snippet: function snippet(options, render) {
      try {
        var snippetOptions = JSON.parse(options);
        return render((0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_objectSpread(_objectSpread({}, snippetOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\nThe snippet helper expects a JSON object of the format:\n{ \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    reverseSnippet: function reverseSnippet(options, render) {
      try {
        var reverseSnippetOptions = JSON.parse(options);
        return render((0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_objectSpread(_objectSpread({}, reverseSnippetOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\n  The reverseSnippet helper expects a JSON object of the format:\n  { \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    insights: function insights(options, render) {
      try {
        var _JSON$parse = JSON.parse(options),
          method = _JSON$parse.method,
          payload = _JSON$parse.payload;
        return render((0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(method, _objectSpread({
          objectIDs: [this.objectID]
        }, payload)));
      } catch (error) {
        throw new Error("\nThe insights helper expects a JSON object of the format:\n{ \"method\": \"method-name\", \"payload\": { \"eventName\": \"name of the event\" } }");
      }
    }
  };
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/formatNumber.js":
/*!**************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/formatNumber.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatNumber": () => (/* binding */ formatNumber)
/* harmony export */ });
function formatNumber(value, numberLocale) {
  return value.toLocaleString(numberLocale);
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/routers/history.js":
/*!*****************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/routers/history.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ historyRouter)
/* harmony export */ });
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qs */ "./node_modules/instantsearch.js/node_modules/qs/lib/index.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var setWindowTitle = function setWindowTitle(title) {
  if (title) {
    // This function is only executed on browsers so we can disable this check.
    // eslint-disable-next-line no-restricted-globals
    window.document.title = title;
  }
};
var BrowserHistory = /*#__PURE__*/function () {
  /**
   * Initializes a new storage provider that syncs the search state to the URL
   * using web APIs (`window.location.pushState` and `onpopstate` event).
   */
  function BrowserHistory(_ref) {
    var _this = this;
    var windowTitle = _ref.windowTitle,
      _ref$writeDelay = _ref.writeDelay,
      writeDelay = _ref$writeDelay === void 0 ? 400 : _ref$writeDelay,
      createURL = _ref.createURL,
      parseURL = _ref.parseURL,
      getLocation = _ref.getLocation,
      start = _ref.start,
      dispose = _ref.dispose,
      push = _ref.push;
    _classCallCheck(this, BrowserHistory);
    _defineProperty(this, "$$type", 'ais.browser');
    _defineProperty(this, "windowTitle", void 0);
    _defineProperty(this, "writeDelay", void 0);
    _defineProperty(this, "_createURL", void 0);
    _defineProperty(this, "parseURL", void 0);
    _defineProperty(this, "getLocation", void 0);
    _defineProperty(this, "writeTimer", void 0);
    _defineProperty(this, "inPopState", false);
    _defineProperty(this, "isDisposed", false);
    _defineProperty(this, "latestAcknowledgedHistory", 0);
    _defineProperty(this, "_start", void 0);
    _defineProperty(this, "_dispose", void 0);
    _defineProperty(this, "_push", void 0);
    this.windowTitle = windowTitle;
    this.writeTimer = undefined;
    this.writeDelay = writeDelay;
    this._createURL = createURL;
    this.parseURL = parseURL;
    this.getLocation = getLocation;
    this._start = start;
    this._dispose = dispose;
    this._push = push;
    (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.safelyRunOnBrowser)(function (_ref2) {
      var window = _ref2.window;
      var title = _this.windowTitle && _this.windowTitle(_this.read());
      setWindowTitle(title);
      _this.latestAcknowledgedHistory = window.history.length;
    });
  }

  /**
   * Reads the URL and returns a syncable UI search state.
   */
  _createClass(BrowserHistory, [{
    key: "read",
    value: function read() {
      return this.parseURL({
        qsModule: qs__WEBPACK_IMPORTED_MODULE_0__,
        location: this.getLocation()
      });
    }

    /**
     * Pushes a search state into the URL.
     */
  }, {
    key: "write",
    value: function write(routeState) {
      var _this2 = this;
      (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.safelyRunOnBrowser)(function (_ref3) {
        var window = _ref3.window;
        var url = _this2.createURL(routeState);
        var title = _this2.windowTitle && _this2.windowTitle(routeState);
        if (_this2.writeTimer) {
          clearTimeout(_this2.writeTimer);
        }
        _this2.writeTimer = setTimeout(function () {
          setWindowTitle(title);
          if (_this2.shouldWrite(url)) {
            if (_this2._push) {
              _this2._push(url);
            } else {
              window.history.pushState(routeState, title || '', url);
            }
            _this2.latestAcknowledgedHistory = window.history.length;
          }
          _this2.inPopState = false;
          _this2.writeTimer = undefined;
        }, _this2.writeDelay);
      });
    }

    /**
     * Sets a callback on the `onpopstate` event of the history API of the current page.
     * It enables the URL sync to keep track of the changes.
     */
  }, {
    key: "onUpdate",
    value: function onUpdate(callback) {
      var _this3 = this;
      if (this._start) {
        this._start(function () {
          callback(_this3.read());
        });
      }
      this._onPopState = function () {
        if (_this3.writeTimer) {
          clearTimeout(_this3.writeTimer);
          _this3.writeTimer = undefined;
        }
        _this3.inPopState = true;

        // We always read the state from the URL because the state of the history
        // can be incorect in some cases (e.g. using React Router).
        callback(_this3.read());
      };
      (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.safelyRunOnBrowser)(function (_ref4) {
        var window = _ref4.window;
        window.addEventListener('popstate', _this3._onPopState);
      });
    }

    /**
     * Creates a complete URL from a given syncable UI state.
     *
     * It always generates the full URL, not a relative one.
     * This allows to handle cases like using a <base href>.
     * See: https://github.com/algolia/instantsearch.js/issues/790
     */
  }, {
    key: "createURL",
    value: function createURL(routeState) {
      return this._createURL({
        qsModule: qs__WEBPACK_IMPORTED_MODULE_0__,
        routeState: routeState,
        location: this.getLocation()
      });
    }

    /**
     * Removes the event listener and cleans up the URL.
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this4 = this;
      if (this._dispose) {
        this._dispose();
      }
      this.isDisposed = true;
      (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.safelyRunOnBrowser)(function (_ref5) {
        var window = _ref5.window;
        if (_this4._onPopState) {
          window.removeEventListener('popstate', _this4._onPopState);
        }
      });
      if (this.writeTimer) {
        clearTimeout(this.writeTimer);
      }
      this.write({});
    }
  }, {
    key: "start",
    value: function start() {
      this.isDisposed = false;
    }
  }, {
    key: "shouldWrite",
    value: function shouldWrite(url) {
      var _this5 = this;
      return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.safelyRunOnBrowser)(function (_ref6) {
        var window = _ref6.window;
        // We do want to `pushState` if:
        // - the router is not disposed, IS.js needs to update the URL
        // OR
        // - the last write was from InstantSearch.js
        // (unlike a SPA, where it would have last written)
        var lastPushWasByISAfterDispose = !(_this5.isDisposed && _this5.latestAcknowledgedHistory !== window.history.length);
        return (
          // When the last state change was through popstate, the IS.js state changes,
          // but that should not write the URL.
          !_this5.inPopState &&
          // When the previous pushState after dispose was by IS.js, we want to write the URL.
          lastPushWasByISAfterDispose &&
          // When the URL is the same as the current one, we do not want to write it.
          url !== window.location.href
        );
      });
    }
  }]);
  return BrowserHistory;
}();
function historyRouter() {
  var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref7$createURL = _ref7.createURL,
    createURL = _ref7$createURL === void 0 ? function (_ref8) {
      var qsModule = _ref8.qsModule,
        routeState = _ref8.routeState,
        location = _ref8.location;
      var protocol = location.protocol,
        hostname = location.hostname,
        _location$port = location.port,
        port = _location$port === void 0 ? '' : _location$port,
        pathname = location.pathname,
        hash = location.hash;
      var queryString = qsModule.stringify(routeState);
      var portWithPrefix = port === '' ? '' : ":".concat(port);

      // IE <= 11 has no proper `location.origin` so we cannot rely on it.
      if (!queryString) {
        return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname).concat(hash);
      }
      return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname, "?").concat(queryString).concat(hash);
    } : _ref7$createURL,
    _ref7$parseURL = _ref7.parseURL,
    parseURL = _ref7$parseURL === void 0 ? function (_ref9) {
      var qsModule = _ref9.qsModule,
        location = _ref9.location;
      // `qs` by default converts arrays with more than 20 items to an object.
      // We want to avoid this because the data structure manipulated can therefore vary.
      // Setting the limit to `100` seems a good number because the engine's default is 100
      // (it can go up to 1000 but it is very unlikely to select more than 100 items in the UI).
      //
      // Using an `arrayLimit` of `n` allows `n + 1` items.
      //
      // See:
      //   - https://github.com/ljharb/qs#parsing-arrays
      //   - https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/
      return qsModule.parse(location.search.slice(1), {
        arrayLimit: 99
      });
    } : _ref7$parseURL,
    _ref7$writeDelay = _ref7.writeDelay,
    writeDelay = _ref7$writeDelay === void 0 ? 400 : _ref7$writeDelay,
    windowTitle = _ref7.windowTitle,
    _ref7$getLocation = _ref7.getLocation,
    getLocation = _ref7$getLocation === void 0 ? function () {
      return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.safelyRunOnBrowser)(function (_ref10) {
        var window = _ref10.window;
        return window.location;
      }, {
        fallback: function fallback() {
          throw new Error('You need to provide `getLocation` to the `history` router in environments where `window` does not exist.');
        }
      });
    } : _ref7$getLocation,
    start = _ref7.start,
    dispose = _ref7.dispose,
    push = _ref7.push;
  return new BrowserHistory({
    createURL: createURL,
    parseURL: parseURL,
    writeDelay: writeDelay,
    windowTitle: windowTitle,
    getLocation: getLocation,
    start: start,
    dispose: dispose,
    push: push
  });
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/stateMappings/simple.js":
/*!**********************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/stateMappings/simple.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ simpleStateMapping)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["configure"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function getIndexStateWithoutConfigure(uiState) {
  var configure = uiState.configure,
    trackedUiState = _objectWithoutProperties(uiState, _excluded);
  return trackedUiState;
}

// technically a URL could contain any key, since users provide it,
// which is why the input to this function is UiState, not something
// which excludes "configure" as this function does.
function simpleStateMapping() {
  return {
    $$type: 'ais.simple',
    stateToRoute: function stateToRoute(uiState) {
      return Object.keys(uiState).reduce(function (state, indexId) {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, indexId, getIndexStateWithoutConfigure(uiState[indexId])));
      }, {});
    },
    routeToState: function routeToState() {
      var routeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.keys(routeState).reduce(function (state, indexId) {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, indexId, getIndexStateWithoutConfigure(routeState[indexId])));
      }, {});
    }
  };
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/suit.js":
/*!******************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/suit.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "component": () => (/* binding */ component)
/* harmony export */ });
var NAMESPACE = 'ais';
var component = function component(componentName) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      descendantName = _ref.descendantName,
      modifierName = _ref.modifierName;
    var descendent = descendantName ? "-".concat(descendantName) : '';
    var modifier = modifierName ? "--".concat(modifierName) : '';
    return "".concat(NAMESPACE, "-").concat(componentName).concat(descendent).concat(modifier);
  };
};

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/capitalize.js":
/*!******************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/capitalize.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "capitalize": () => (/* binding */ capitalize)
/* harmony export */ });
function capitalize(text) {
  return text.toString().charAt(0).toUpperCase() + text.toString().slice(1);
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/checkIndexUiState.js":
/*!*************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/checkIndexUiState.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkIndexUiState": () => (/* binding */ checkIndexUiState)
/* harmony export */ });
/* harmony import */ var _capitalize_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./capitalize.js */ "./node_modules/instantsearch.js/es/lib/utils/capitalize.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger.js */ "./node_modules/instantsearch.js/es/lib/utils/logger.js");
/* harmony import */ var _typedObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typedObject.js */ "./node_modules/instantsearch.js/es/lib/utils/typedObject.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



// Some connectors are responsible for multiple widgets so we need
// to map them.
function getWidgetNames(connectorName) {
  switch (connectorName) {
    case 'range':
      return [];
    case 'menu':
      return ['menu', 'menuSelect'];
    default:
      return [connectorName];
  }
}
var stateToWidgetsMap = {
  query: {
    connectors: ['connectSearchBox'],
    widgets: ['ais.searchBox', 'ais.autocomplete', 'ais.voiceSearch']
  },
  refinementList: {
    connectors: ['connectRefinementList'],
    widgets: ['ais.refinementList']
  },
  menu: {
    connectors: ['connectMenu'],
    widgets: ['ais.menu']
  },
  hierarchicalMenu: {
    connectors: ['connectHierarchicalMenu'],
    widgets: ['ais.hierarchicalMenu']
  },
  numericMenu: {
    connectors: ['connectNumericMenu'],
    widgets: ['ais.numericMenu']
  },
  ratingMenu: {
    connectors: ['connectRatingMenu'],
    widgets: ['ais.ratingMenu']
  },
  range: {
    connectors: ['connectRange'],
    widgets: ['ais.rangeInput', 'ais.rangeSlider', 'ais.range']
  },
  toggle: {
    connectors: ['connectToggleRefinement'],
    widgets: ['ais.toggleRefinement']
  },
  geoSearch: {
    connectors: ['connectGeoSearch'],
    widgets: ['ais.geoSearch']
  },
  sortBy: {
    connectors: ['connectSortBy'],
    widgets: ['ais.sortBy']
  },
  page: {
    connectors: ['connectPagination'],
    widgets: ['ais.pagination', 'ais.infiniteHits']
  },
  hitsPerPage: {
    connectors: ['connectHitsPerPage'],
    widgets: ['ais.hitsPerPage']
  },
  configure: {
    connectors: ['connectConfigure'],
    widgets: ['ais.configure']
  },
  places: {
    connectors: [],
    widgets: ['ais.places']
  }
};
function checkIndexUiState(_ref) {
  var index = _ref.index,
    indexUiState = _ref.indexUiState;
  var mountedWidgets = index.getWidgets().map(function (widget) {
    return widget.$$type;
  }).filter(Boolean);
  var missingWidgets = (0,_typedObject_js__WEBPACK_IMPORTED_MODULE_0__.keys)(indexUiState).reduce(function (acc, parameter) {
    var widgetUiState = stateToWidgetsMap[parameter];
    if (!widgetUiState) {
      return acc;
    }
    var requiredWidgets = widgetUiState.widgets;
    if (requiredWidgets && !requiredWidgets.some(function (requiredWidget) {
      return mountedWidgets.includes(requiredWidget);
    })) {
      acc.push([parameter, {
        connectors: widgetUiState.connectors,
        widgets: widgetUiState.widgets.map(function (widgetIdentifier) {
          return widgetIdentifier.split('ais.')[1];
        })
      }]);
    }
    return acc;
  }, []);
   true ? (0,_logger_js__WEBPACK_IMPORTED_MODULE_1__.warning)(missingWidgets.length === 0, "The UI state for the index \"".concat(index.getIndexId(), "\" is not consistent with the widgets mounted.\n\nThis can happen when the UI state is specified via `initialUiState`, `routing` or `setUiState` but that the widgets responsible for this state were not added. This results in those query parameters not being sent to the API.\n\nTo fully reflect the state, some widgets need to be added to the index \"").concat(index.getIndexId(), "\":\n\n").concat(missingWidgets.map(function (_ref2) {
    var _ref4;
    var _ref3 = _slicedToArray(_ref2, 2),
      stateParameter = _ref3[0],
      widgets = _ref3[1].widgets;
    return "- `".concat(stateParameter, "` needs one of these widgets: ").concat((_ref4 = []).concat.apply(_ref4, _toConsumableArray(widgets.map(function (name) {
      return getWidgetNames(name);
    }))).map(function (name) {
      return "\"".concat(name, "\"");
    }).join(', '));
  }).join('\n'), "\n\nIf you do not wish to display widgets but still want to support their search parameters, you can mount \"virtual widgets\" that don't render anything:\n\n```\n").concat(missingWidgets.filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      _stateParameter = _ref6[0],
      connectors = _ref6[1].connectors;
    return connectors.length > 0;
  }).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      _stateParameter = _ref8[0],
      _ref8$ = _ref8[1],
      connectors = _ref8$.connectors,
      widgets = _ref8$.widgets;
    var capitalizedWidget = (0,_capitalize_js__WEBPACK_IMPORTED_MODULE_2__.capitalize)(widgets[0]);
    var connectorName = connectors[0];
    return "const virtual".concat(capitalizedWidget, " = ").concat(connectorName, "(() => null);");
  }).join('\n'), "\n\nsearch.addWidgets([\n  ").concat(missingWidgets.filter(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
      _stateParameter = _ref10[0],
      connectors = _ref10[1].connectors;
    return connectors.length > 0;
  }).map(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
      _stateParameter = _ref12[0],
      widgets = _ref12[1].widgets;
    var capitalizedWidget = (0,_capitalize_js__WEBPACK_IMPORTED_MODULE_2__.capitalize)(widgets[0]);
    return "virtual".concat(capitalizedWidget, "({ /* ... */ })");
  }).join(',\n  '), "\n]);\n```\n\nIf you're using custom widgets that do set these query parameters, we recommend using connectors instead.\n\nSee https://www.algolia.com/doc/guides/building-search-ui/widgets/customize-an-existing-widget/js/#customize-the-complete-ui-of-the-widgets")) : 0;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/checkRendering.js":
/*!**********************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/checkRendering.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkRendering": () => (/* binding */ checkRendering)
/* harmony export */ });
/* harmony import */ var _getObjectType_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getObjectType.js */ "./node_modules/instantsearch.js/es/lib/utils/getObjectType.js");

function checkRendering(rendering, usage) {
  if (rendering === undefined || typeof rendering !== 'function') {
    throw new Error("The render function is not valid (received type ".concat((0,_getObjectType_js__WEBPACK_IMPORTED_MODULE_0__.getObjectType)(rendering), ").\n\n").concat(usage));
  }
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/concatHighlightedParts.js":
/*!******************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/concatHighlightedParts.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatHighlightedParts": () => (/* binding */ concatHighlightedParts)
/* harmony export */ });
/* harmony import */ var _escape_highlight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./escape-highlight.js */ "./node_modules/instantsearch.js/es/lib/utils/escape-highlight.js");

function concatHighlightedParts(parts) {
  var highlightPreTag = _escape_highlight_js__WEBPACK_IMPORTED_MODULE_0__.TAG_REPLACEMENT.highlightPreTag,
    highlightPostTag = _escape_highlight_js__WEBPACK_IMPORTED_MODULE_0__.TAG_REPLACEMENT.highlightPostTag;
  return parts.map(function (part) {
    return part.isHighlighted ? highlightPreTag + part.value + highlightPostTag : part.value;
  }).join('');
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/defer.js":
/*!*************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/defer.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defer": () => (/* binding */ defer)
/* harmony export */ });
var nextMicroTask = Promise.resolve();
function defer(callback) {
  var progress = null;
  var cancelled = false;
  var fn = function fn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (progress !== null) {
      return;
    }
    progress = nextMicroTask.then(function () {
      progress = null;
      if (cancelled) {
        cancelled = false;
        return;
      }
      callback.apply(void 0, args);
    });
  };
  fn.wait = function () {
    if (progress === null) {
      throw new Error('The deferred function should be called before calling `wait()`');
    }
    return progress;
  };
  fn.cancel = function () {
    if (progress === null) {
      return;
    }
    cancelled = true;
  };
  return fn;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/documentation.js":
/*!*********************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/documentation.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDocumentationLink": () => (/* binding */ createDocumentationLink),
/* harmony export */   "createDocumentationMessageGenerator": () => (/* binding */ createDocumentationMessageGenerator)
/* harmony export */ });
function createDocumentationLink(_ref) {
  var name = _ref.name,
    _ref$connector = _ref.connector,
    connector = _ref$connector === void 0 ? false : _ref$connector;
  return ['https://www.algolia.com/doc/api-reference/widgets/', name, '/js/', connector ? '#connector' : ''].join('');
}
function createDocumentationMessageGenerator() {
  for (var _len = arguments.length, widgets = new Array(_len), _key = 0; _key < _len; _key++) {
    widgets[_key] = arguments[_key];
  }
  var links = widgets.map(function (widget) {
    return createDocumentationLink(widget);
  }).join(', ');
  return function (message) {
    return [message, "See documentation: ".concat(links)].filter(Boolean).join('\n\n');
  };
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/escape-highlight.js":
/*!************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/escape-highlight.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TAG_PLACEHOLDER": () => (/* binding */ TAG_PLACEHOLDER),
/* harmony export */   "TAG_REPLACEMENT": () => (/* binding */ TAG_REPLACEMENT),
/* harmony export */   "escapeFacets": () => (/* binding */ escapeFacets),
/* harmony export */   "escapeHits": () => (/* binding */ escapeHits)
/* harmony export */ });
/* harmony import */ var _escape_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./escape-html.js */ "./node_modules/instantsearch.js/es/lib/utils/escape-html.js");
/* harmony import */ var _isPlainObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isPlainObject.js */ "./node_modules/instantsearch.js/es/lib/utils/isPlainObject.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var TAG_PLACEHOLDER = {
  highlightPreTag: '__ais-highlight__',
  highlightPostTag: '__/ais-highlight__'
};
var TAG_REPLACEMENT = {
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>'
};
function replaceTagsAndEscape(value) {
  return (0,_escape_html_js__WEBPACK_IMPORTED_MODULE_0__.escape)(value).replace(new RegExp(TAG_PLACEHOLDER.highlightPreTag, 'g'), TAG_REPLACEMENT.highlightPreTag).replace(new RegExp(TAG_PLACEHOLDER.highlightPostTag, 'g'), TAG_REPLACEMENT.highlightPostTag);
}
function recursiveEscape(input) {
  if ((0,_isPlainObject_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(input) && typeof input.value !== 'string') {
    return Object.keys(input).reduce(function (acc, key) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, recursiveEscape(input[key])));
    }, {});
  }
  if (Array.isArray(input)) {
    return input.map(recursiveEscape);
  }
  return _objectSpread(_objectSpread({}, input), {}, {
    value: replaceTagsAndEscape(input.value)
  });
}
function escapeHits(hits) {
  if (hits.__escaped === undefined) {
    // We don't override the value on hit because it will mutate the raw results
    // instead we make a shallow copy and we assign the escaped values on it.
    hits = hits.map(function (_ref) {
      var hit = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
      if (hit._highlightResult) {
        hit._highlightResult = recursiveEscape(hit._highlightResult);
      }
      if (hit._snippetResult) {
        hit._snippetResult = recursiveEscape(hit._snippetResult);
      }
      return hit;
    });
    hits.__escaped = true;
  }
  return hits;
}
function escapeFacets(facetHits) {
  return facetHits.map(function (h) {
    return _objectSpread(_objectSpread({}, h), {}, {
      highlighted: replaceTagsAndEscape(h.highlighted)
    });
  });
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/escape-html.js":
/*!*******************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/escape-html.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "escape": () => (/* binding */ escape),
/* harmony export */   "unescape": () => (/* binding */ unescape)
/* harmony export */ });
/**
 * This implementation is taken from Lodash implementation.
 * See: https://github.com/lodash/lodash/blob/4.17.11-npm/escape.js
 */

// Used to map characters to HTML entities.
var htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

// Used to match HTML entities and HTML characters.
var regexUnescapedHtml = /[&<>"']/g;
var regexHasUnescapedHtml = RegExp(regexUnescapedHtml.source);

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 */
function escape(value) {
  return value && regexHasUnescapedHtml.test(value) ? value.replace(regexUnescapedHtml, function (character) {
    return htmlEntities[character];
  }) : value;
}

/**
 * This implementation is taken from Lodash implementation.
 * See: https://github.com/lodash/lodash/blob/4.17.11-npm/unescape.js
 */

// Used to map HTML entities to characters.
var htmlCharacters = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
};

// Used to match HTML entities and HTML characters.
var regexEscapedHtml = /&(amp|quot|lt|gt|#39);/g;
var regexHasEscapedHtml = RegExp(regexEscapedHtml.source);

/**
 * Converts the HTML entities "&", "<", ">", '"', and "'" in `string` to their
 * characters.
 */
function unescape(value) {
  return value && regexHasEscapedHtml.test(value) ? value.replace(regexEscapedHtml, function (character) {
    return htmlCharacters[character];
  }) : value;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/find.js":
/*!************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/find.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "find": () => (/* binding */ find)
/* harmony export */ });
// We aren't using the native `Array.prototype.find` because the refactor away from Lodash is not
// published as a major version.
// Relying on the `find` polyfill on user-land, which before was only required for niche use-cases,
// was decided as too risky.
// @MAJOR Replace with the native `Array.prototype.find` method
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
function find(items, predicate) {
  var value;
  for (var i = 0; i < items.length; i++) {
    value = items[i];
    // inlined for performance: if (Call(predicate, thisArg, [value, i, list])) {
    if (predicate(value, i, items)) {
      return value;
    }
  }
  return undefined;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/findIndex.js":
/*!*****************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/findIndex.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findIndex": () => (/* binding */ findIndex)
/* harmony export */ });
// We aren't using the native `Array.prototype.findIndex` because the refactor away from Lodash is not
// published as a major version.
// Relying on the `findIndex` polyfill on user-land, which before was only required for niche use-cases,
// was decided as too risky.
// @MAJOR Replace with the native `Array.prototype.findIndex` method
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
function findIndex(array, comparator) {
  if (!Array.isArray(array)) {
    return -1;
  }
  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return i;
    }
  }
  return -1;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/getAppIdAndApiKey.js":
/*!*************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/getAppIdAndApiKey.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAppIdAndApiKey": () => (/* binding */ getAppIdAndApiKey)
/* harmony export */ });
// typed as any, since it accepts the _real_ js clients, not the interface we otherwise expect
function getAppIdAndApiKey(searchClient) {
  if (searchClient.transporter) {
    // searchClient v4
    var _searchClient$transpo = searchClient.transporter,
      headers = _searchClient$transpo.headers,
      queryParameters = _searchClient$transpo.queryParameters;
    var APP_ID = 'x-algolia-application-id';
    var API_KEY = 'x-algolia-api-key';
    var appId = headers[APP_ID] || queryParameters[APP_ID];
    var apiKey = headers[API_KEY] || queryParameters[API_KEY];
    return [appId, apiKey];
  } else {
    // searchClient v3
    return [searchClient.applicationID, searchClient.apiKey];
  }
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/getHighlightFromSiblings.js":
/*!********************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/getHighlightFromSiblings.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHighlightFromSiblings": () => (/* binding */ getHighlightFromSiblings)
/* harmony export */ });
/* harmony import */ var _escape_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./escape-html.js */ "./node_modules/instantsearch.js/es/lib/utils/escape-html.js");

var hasAlphanumeric = new RegExp(/\w/i);
function getHighlightFromSiblings(parts, i) {
  var _parts, _parts2;
  var current = parts[i];
  var isNextHighlighted = ((_parts = parts[i + 1]) === null || _parts === void 0 ? void 0 : _parts.isHighlighted) || true;
  var isPreviousHighlighted = ((_parts2 = parts[i - 1]) === null || _parts2 === void 0 ? void 0 : _parts2.isHighlighted) || true;
  if (!hasAlphanumeric.test((0,_escape_html_js__WEBPACK_IMPORTED_MODULE_0__.unescape)(current.value)) && isPreviousHighlighted === isNextHighlighted) {
    return isPreviousHighlighted;
  }
  return current.isHighlighted;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/getHighlightedParts.js":
/*!***************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/getHighlightedParts.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHighlightedParts": () => (/* binding */ getHighlightedParts)
/* harmony export */ });
/* harmony import */ var _escape_highlight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./escape-highlight.js */ "./node_modules/instantsearch.js/es/lib/utils/escape-highlight.js");

function getHighlightedParts(highlightedValue) {
  var highlightPostTag = _escape_highlight_js__WEBPACK_IMPORTED_MODULE_0__.TAG_REPLACEMENT.highlightPostTag,
    highlightPreTag = _escape_highlight_js__WEBPACK_IMPORTED_MODULE_0__.TAG_REPLACEMENT.highlightPreTag;
  var splitByPreTag = highlightedValue.split(highlightPreTag);
  var firstValue = splitByPreTag.shift();
  var elements = !firstValue ? [] : [{
    value: firstValue,
    isHighlighted: false
  }];
  splitByPreTag.forEach(function (split) {
    var splitByPostTag = split.split(highlightPostTag);
    elements.push({
      value: splitByPostTag[0],
      isHighlighted: true
    });
    if (splitByPostTag[1] !== '') {
      elements.push({
        value: splitByPostTag[1],
        isHighlighted: false
      });
    }
  });
  return elements;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/getObjectType.js":
/*!*********************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/getObjectType.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getObjectType": () => (/* binding */ getObjectType)
/* harmony export */ });
function getObjectType(object) {
  return Object.prototype.toString.call(object).slice(8, -1);
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js":
/*!*************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPropertyByPath": () => (/* binding */ getPropertyByPath)
/* harmony export */ });
function getPropertyByPath(object, path) {
  var parts = Array.isArray(path) ? path : path.split('.');
  return parts.reduce(function (current, key) {
    return current && current[key];
  }, object);
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/isEqual.js":
/*!***************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/isEqual.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEqual": () => (/* binding */ isEqual)
/* harmony export */ });
function isPrimitive(obj) {
  return obj !== Object(obj);
}
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (isPrimitive(first) || isPrimitive(second) || typeof first === 'function' || typeof second === 'function') {
    return first === second;
  }
  if (Object.keys(first).length !== Object.keys(second).length) {
    return false;
  }

  // @TODO avoid for..of because of the large polyfill
  // eslint-disable-next-line no-restricted-syntax
  for (var _i = 0, _Object$keys = Object.keys(first); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (!(key in second)) {
      return false;
    }
    if (!isEqual(first[key], second[key])) {
      return false;
    }
  }
  return true;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/isIndexWidget.js":
/*!*********************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/isIndexWidget.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isIndexWidget": () => (/* binding */ isIndexWidget)
/* harmony export */ });
function isIndexWidget(widget) {
  return widget.$$type === 'ais.index';
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/isPlainObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/isPlainObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPlainObject": () => (/* binding */ isPlainObject)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * This implementation is taken from Lodash implementation.
 * See: https://github.com/lodash/lodash/blob/master/isPlainObject.js
 */

function getTag(value) {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return Object.prototype.toString.call(value);
}
function isObjectLike(value) {
  return _typeof(value) === 'object' && value !== null;
}

/**
 * Checks if `value` is a plain object.
 *
 * A plain object is an object created by the `Object`
 * constructor or with a `[[Prototype]]` of `null`.
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/logger.js":
/*!**************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/logger.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deprecate": () => (/* binding */ deprecate),
/* harmony export */   "warn": () => (/* binding */ warn),
/* harmony export */   "warning": () => (/* binding */ _warning)
/* harmony export */ });
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./noop.js */ "./node_modules/instantsearch.js/es/lib/utils/noop.js");

/**
 * Logs a warning when this function is called, in development environment only.
 */
var deprecate = function deprecate(fn, message) {
  return fn;
};

/**
 * Logs a warning
 * This is used to log issues in development environment only.
 */
var warn = _noop_js__WEBPACK_IMPORTED_MODULE_0__.noop;

/**
 * Logs a warning if the condition is not met.
 * This is used to log issues in development environment only.
 */
var _warning = _noop_js__WEBPACK_IMPORTED_MODULE_0__.noop;
if (true) {
  warn = function warn(message) {
    // eslint-disable-next-line no-console
    console.warn("[InstantSearch.js]: ".concat(message.trim()));
  };
  deprecate = function deprecate(fn, message) {
    var hasAlreadyPrinted = false;
    return function () {
      if (!hasAlreadyPrinted) {
        hasAlreadyPrinted = true;
         true ? warn(message) : 0;
      }
      return fn.apply(void 0, arguments);
    };
  };
  _warning = function warning(condition, message) {
    if (condition) {
      return;
    }
    var hasAlreadyPrinted = _warning.cache[message];
    if (!hasAlreadyPrinted) {
      _warning.cache[message] = true;
       true ? warn(message) : 0;
    }
  };
  _warning.cache = {};
}


/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/mergeSearchParameters.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/mergeSearchParameters.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeSearchParameters": () => (/* binding */ mergeSearchParameters)
/* harmony export */ });
/* harmony import */ var _findIndex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findIndex.js */ "./node_modules/instantsearch.js/es/lib/utils/findIndex.js");
/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uniq.js */ "./node_modules/instantsearch.js/es/lib/utils/uniq.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


var mergeWithRest = function mergeWithRest(left, right) {
  var facets = right.facets,
    disjunctiveFacets = right.disjunctiveFacets,
    facetsRefinements = right.facetsRefinements,
    facetsExcludes = right.facetsExcludes,
    disjunctiveFacetsRefinements = right.disjunctiveFacetsRefinements,
    numericRefinements = right.numericRefinements,
    tagRefinements = right.tagRefinements,
    hierarchicalFacets = right.hierarchicalFacets,
    hierarchicalFacetsRefinements = right.hierarchicalFacetsRefinements,
    ruleContexts = right.ruleContexts,
    rest = _objectWithoutProperties(right, _excluded);
  return left.setQueryParameters(rest);
};

// Merge facets
var mergeFacets = function mergeFacets(left, right) {
  return right.facets.reduce(function (_, name) {
    return _.addFacet(name);
  }, left);
};
var mergeDisjunctiveFacets = function mergeDisjunctiveFacets(left, right) {
  return right.disjunctiveFacets.reduce(function (_, name) {
    return _.addDisjunctiveFacet(name);
  }, left);
};
var mergeHierarchicalFacets = function mergeHierarchicalFacets(left, right) {
  return left.setQueryParameters({
    hierarchicalFacets: right.hierarchicalFacets.reduce(function (facets, facet) {
      var index = (0,_findIndex_js__WEBPACK_IMPORTED_MODULE_0__.findIndex)(facets, function (_) {
        return _.name === facet.name;
      });
      if (index === -1) {
        return facets.concat(facet);
      }
      var nextFacets = facets.slice();
      nextFacets.splice(index, 1, facet);
      return nextFacets;
    }, left.hierarchicalFacets)
  });
};

// Merge facet refinements
var mergeTagRefinements = function mergeTagRefinements(left, right) {
  return right.tagRefinements.reduce(function (_, value) {
    return _.addTagRefinement(value);
  }, left);
};
var mergeFacetRefinements = function mergeFacetRefinements(left, right) {
  return left.setQueryParameters({
    facetsRefinements: _objectSpread(_objectSpread({}, left.facetsRefinements), right.facetsRefinements)
  });
};
var mergeFacetsExcludes = function mergeFacetsExcludes(left, right) {
  return left.setQueryParameters({
    facetsExcludes: _objectSpread(_objectSpread({}, left.facetsExcludes), right.facetsExcludes)
  });
};
var mergeDisjunctiveFacetsRefinements = function mergeDisjunctiveFacetsRefinements(left, right) {
  return left.setQueryParameters({
    disjunctiveFacetsRefinements: _objectSpread(_objectSpread({}, left.disjunctiveFacetsRefinements), right.disjunctiveFacetsRefinements)
  });
};
var mergeNumericRefinements = function mergeNumericRefinements(left, right) {
  return left.setQueryParameters({
    numericRefinements: _objectSpread(_objectSpread({}, left.numericRefinements), right.numericRefinements)
  });
};
var mergeHierarchicalFacetsRefinements = function mergeHierarchicalFacetsRefinements(left, right) {
  return left.setQueryParameters({
    hierarchicalFacetsRefinements: _objectSpread(_objectSpread({}, left.hierarchicalFacetsRefinements), right.hierarchicalFacetsRefinements)
  });
};
var mergeRuleContexts = function mergeRuleContexts(left, right) {
  var ruleContexts = (0,_uniq_js__WEBPACK_IMPORTED_MODULE_1__.uniq)([].concat(left.ruleContexts).concat(right.ruleContexts).filter(Boolean));
  if (ruleContexts.length > 0) {
    return left.setQueryParameters({
      ruleContexts: ruleContexts
    });
  }
  return left;
};
var mergeSearchParameters = function mergeSearchParameters() {
  for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
    parameters[_key] = arguments[_key];
  }
  return parameters.reduce(function (left, right) {
    var hierarchicalFacetsRefinementsMerged = mergeHierarchicalFacetsRefinements(left, right);
    var hierarchicalFacetsMerged = mergeHierarchicalFacets(hierarchicalFacetsRefinementsMerged, right);
    var tagRefinementsMerged = mergeTagRefinements(hierarchicalFacetsMerged, right);
    var numericRefinementsMerged = mergeNumericRefinements(tagRefinementsMerged, right);
    var disjunctiveFacetsRefinementsMerged = mergeDisjunctiveFacetsRefinements(numericRefinementsMerged, right);
    var facetsExcludesMerged = mergeFacetsExcludes(disjunctiveFacetsRefinementsMerged, right);
    var facetRefinementsMerged = mergeFacetRefinements(facetsExcludesMerged, right);
    var disjunctiveFacetsMerged = mergeDisjunctiveFacets(facetRefinementsMerged, right);
    var ruleContextsMerged = mergeRuleContexts(disjunctiveFacetsMerged, right);
    var facetsMerged = mergeFacets(ruleContextsMerged, right);
    return mergeWithRest(facetsMerged, right);
  });
};

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/noop.js":
/*!************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/noop.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
function noop() {}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/render-args.js":
/*!*******************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/render-args.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInitArgs": () => (/* binding */ createInitArgs),
/* harmony export */   "createRenderArgs": () => (/* binding */ createRenderArgs)
/* harmony export */ });
function createInitArgs(instantSearchInstance, parent, uiState) {
  var helper = parent.getHelper();
  return {
    uiState: uiState,
    helper: helper,
    parent: parent,
    instantSearchInstance: instantSearchInstance,
    state: helper.state,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    createURL: parent.createURL,
    scopedResults: [],
    searchMetadata: {
      isSearchStalled: instantSearchInstance.status === 'stalled'
    },
    status: instantSearchInstance.status,
    error: instantSearchInstance.error
  };
}
function createRenderArgs(instantSearchInstance, parent) {
  var results = parent.getResults();
  return {
    helper: parent.getHelper(),
    parent: parent,
    instantSearchInstance: instantSearchInstance,
    results: results,
    scopedResults: parent.getScopedResults(),
    state: results._state,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    createURL: parent.createURL,
    searchMetadata: {
      isSearchStalled: instantSearchInstance.status === 'stalled'
    },
    status: instantSearchInstance.status,
    error: instantSearchInstance.error
  };
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/resolveSearchParameters.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/resolveSearchParameters.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveSearchParameters": () => (/* binding */ resolveSearchParameters)
/* harmony export */ });
function resolveSearchParameters(current) {
  var parent = current.getParent();
  var states = [current.getHelper().state];
  while (parent !== null) {
    states = [parent.getHelper().state].concat(states);
    parent = parent.getParent();
  }
  return states;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/reverseHighlightedParts.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/reverseHighlightedParts.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reverseHighlightedParts": () => (/* binding */ reverseHighlightedParts)
/* harmony export */ });
/* harmony import */ var _getHighlightFromSiblings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getHighlightFromSiblings.js */ "./node_modules/instantsearch.js/es/lib/utils/getHighlightFromSiblings.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function reverseHighlightedParts(parts) {
  if (!parts.some(function (part) {
    return part.isHighlighted;
  })) {
    return parts.map(function (part) {
      return _objectSpread(_objectSpread({}, part), {}, {
        isHighlighted: false
      });
    });
  }
  return parts.map(function (part, i) {
    return _objectSpread(_objectSpread({}, part), {}, {
      isHighlighted: !(0,_getHighlightFromSiblings_js__WEBPACK_IMPORTED_MODULE_0__.getHighlightFromSiblings)(parts, i)
    });
  });
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js":
/*!**************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "safelyRunOnBrowser": () => (/* binding */ safelyRunOnBrowser)
/* harmony export */ });
// eslint-disable-next-line no-restricted-globals

/**
 * Runs code on browser environments safely.
 */
function safelyRunOnBrowser(callback) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      fallback: function fallback() {
        return undefined;
      }
    },
    fallback = _ref.fallback;
  // eslint-disable-next-line no-restricted-globals
  if (typeof window === 'undefined') {
    return fallback();
  }

  // eslint-disable-next-line no-restricted-globals
  return callback({
    window: window
  });
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/serializer.js":
/*!******************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/serializer.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deserializePayload": () => (/* binding */ deserializePayload),
/* harmony export */   "serializePayload": () => (/* binding */ serializePayload)
/* harmony export */ });
function serializePayload(payload) {
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}
function deserializePayload(serialized) {
  return JSON.parse(decodeURIComponent(atob(serialized)));
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/setIndexHelperState.js":
/*!***************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/setIndexHelperState.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setIndexHelperState": () => (/* binding */ setIndexHelperState)
/* harmony export */ });
/* harmony import */ var _checkIndexUiState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkIndexUiState.js */ "./node_modules/instantsearch.js/es/lib/utils/checkIndexUiState.js");
/* harmony import */ var _isIndexWidget_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isIndexWidget.js */ "./node_modules/instantsearch.js/es/lib/utils/isIndexWidget.js");


function setIndexHelperState(finalUiState, indexWidget) {
  var nextIndexUiState = finalUiState[indexWidget.getIndexId()] || {};
  if (true) {
    (0,_checkIndexUiState_js__WEBPACK_IMPORTED_MODULE_0__.checkIndexUiState)({
      index: indexWidget,
      indexUiState: nextIndexUiState
    });
  }
  indexWidget.getHelper().setState(indexWidget.getWidgetSearchParameters(indexWidget.getHelper().state, {
    uiState: nextIndexUiState
  }));
  indexWidget.getWidgets().filter(_isIndexWidget_js__WEBPACK_IMPORTED_MODULE_1__.isIndexWidget).forEach(function (widget) {
    return setIndexHelperState(finalUiState, widget);
  });
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/typedObject.js":
/*!*******************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/typedObject.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keys": () => (/* binding */ keys)
/* harmony export */ });
/**
 * A typed version of Object.keys, to use when looping over a static object
 * inspired from https://stackoverflow.com/a/65117465/3185307
 */
var keys = Object.keys;

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/utils/uniq.js":
/*!************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/utils/uniq.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uniq": () => (/* binding */ uniq)
/* harmony export */ });
function uniq(array) {
  return array.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/lib/version.js":
/*!*********************************************************!*\
  !*** ./node_modules/instantsearch.js/es/lib/version.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('4.55.0');

/***/ }),

/***/ "./node_modules/instantsearch.js/es/middlewares/createInsightsMiddleware.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/middlewares/createInsightsMiddleware.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInsightsMiddleware": () => (/* binding */ createInsightsMiddleware)
/* harmony export */ });
/* harmony import */ var _helpers_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/index.js */ "./node_modules/instantsearch.js/es/helpers/get-insights-anonymous-user-token.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/noop.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/getAppIdAndApiKey.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/logger.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/find.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


var ALGOLIA_INSIGHTS_VERSION = '2.6.0';
var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@".concat(ALGOLIA_INSIGHTS_VERSION, "/dist/search-insights.min.js");
function createInsightsMiddleware() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _insightsClient = props.insightsClient,
    insightsInitParams = props.insightsInitParams,
    onEvent = props.onEvent,
    _props$$$internal = props.$$internal,
    $$internal = _props$$$internal === void 0 ? false : _props$$$internal;
  var potentialInsightsClient = _insightsClient;
  if (!_insightsClient && _insightsClient !== null) {
    (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.safelyRunOnBrowser)(function (_ref) {
      var window = _ref.window;
      var pointer = window.AlgoliaAnalyticsObject || 'aa';
      if (typeof pointer === 'string') {
        potentialInsightsClient = window[pointer];
      }
      if (!potentialInsightsClient) {
        window.AlgoliaAnalyticsObject = pointer;
        if (!window[pointer]) {
          window[pointer] = function () {
            if (!window[pointer].queue) {
              window[pointer].queue = [];
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            window[pointer].queue.push(args);
          };
          window[pointer].version = ALGOLIA_INSIGHTS_VERSION;
          window[pointer].shouldAddScript = true;
        }
        potentialInsightsClient = window[pointer];
      }
    });
  }
  // if still no insightsClient was found, we use a noop
  var insightsClient = potentialInsightsClient || _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.noop;
  return function (_ref2) {
    var instantSearchInstance = _ref2.instantSearchInstance;
    // remove existing default insights middleware
    // user-provided insights middleware takes precedence
    var existingInsightsMiddlewares = instantSearchInstance.middleware.filter(function (m) {
      return m.instance.$$type === 'ais.insights' && m.instance.$$internal;
    }).map(function (m) {
      return m.creator;
    });
    instantSearchInstance.unuse.apply(instantSearchInstance, _toConsumableArray(existingInsightsMiddlewares));
    var _getAppIdAndApiKey = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.getAppIdAndApiKey)(instantSearchInstance.client),
      _getAppIdAndApiKey2 = _slicedToArray(_getAppIdAndApiKey, 2),
      appId = _getAppIdAndApiKey2[0],
      apiKey = _getAppIdAndApiKey2[1];

    // search-insights.js also throws an error so dev-only clarification is sufficient
     true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.warning)(Boolean(appId && apiKey), 'could not extract Algolia credentials from searchClient in insights middleware.') : 0;
    var queuedUserToken = undefined;
    var userTokenBeforeInit = undefined;
    if (Array.isArray(insightsClient.queue)) {
      // Context: The umd build of search-insights is asynchronously loaded by the snippet.
      //
      // When user calls `aa('setUserToken', 'my-user-token')` before `search-insights` is loaded,
      // ['setUserToken', 'my-user-token'] gets stored in `aa.queue`.
      // Whenever `search-insights` is finally loaded, it will process the queue.
      //
      // But here's the reason why we handle it here:
      // At this point, even though `search-insights` is not loaded yet,
      // we still want to read the token from the queue.
      // Otherwise, the first search call will be fired without the token.
      var _ref3 = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.find)(insightsClient.queue.slice().reverse(), function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
          method = _ref6[0];
        return method === 'setUserToken';
      }) || [];
      var _ref4 = _slicedToArray(_ref3, 2);
      queuedUserToken = _ref4[1];
    }
    insightsClient('getUserToken', null, function (_error, userToken) {
      // If user has called `aa('setUserToken', 'my-user-token')` before creating
      // the `insights` middleware, we store them temporarily and
      // set it later on.
      //
      // Otherwise, the `init` call might override it with anonymous user token.
      userTokenBeforeInit = userToken;
    });

    // Only `init` if the `insightsInitParams` option is passed or
    // if the `insightsClient` version doesn't supports optional `init` calling.
    if (insightsInitParams || !isModernInsightsClient(insightsClient)) {
      insightsClient('init', _objectSpread({
        appId: appId,
        apiKey: apiKey,
        partial: true
      }, insightsInitParams));
    }
    var initialParameters;
    var helper;
    return {
      $$type: 'ais.insights',
      $$internal: $$internal,
      onStateChange: function onStateChange() {},
      subscribe: function subscribe() {
        if (!insightsClient.shouldAddScript) return;
        var errorMessage = '[insights middleware]: could not load search-insights.js. Please load it manually following https://alg.li/insights-init';
        try {
          var script = document.createElement('script');
          script.async = true;
          script.src = ALGOLIA_INSIGHTS_SRC;
          script.onerror = function () {
            instantSearchInstance.emit('error', new Error(errorMessage));
          };
          document.body.appendChild(script);
          insightsClient.shouldAddScript = false;
        } catch (cause) {
          insightsClient.shouldAddScript = false;
          instantSearchInstance.emit('error', new Error(errorMessage));
        }
      },
      started: function started() {
        insightsClient('addAlgoliaAgent', 'insights-middleware');
        helper = instantSearchInstance.helper;
        initialParameters = {
          userToken: helper.state.userToken,
          clickAnalytics: helper.state.clickAnalytics
        };
        helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread(_objectSpread({}, helper.state), {}, {
          clickAnalytics: true
        }));
        if (!$$internal) {
          instantSearchInstance.scheduleSearch();
        }
        var setUserTokenToSearch = function setUserTokenToSearch(userToken) {
          if (!userToken) {
            return;
          }
          var existingToken = helper.state.userToken;
          helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread(_objectSpread({}, helper.state), {}, {
            userToken: userToken
          }));
          if (existingToken && existingToken !== userToken) {
            instantSearchInstance.scheduleSearch();
          }
        };
        var anonymousUserToken = (0,_helpers_index_js__WEBPACK_IMPORTED_MODULE_5__.getInsightsAnonymousUserTokenInternal)();
        if (anonymousUserToken) {
          // When `aa('init', { ... })` is called, it creates an anonymous user token in cookie.
          // We can set it as userToken.
          setUserTokenToSearch(anonymousUserToken);
        }

        // We consider the `userToken` coming from a `init` call to have a higher
        // importance than the one coming from the queue.
        if (userTokenBeforeInit) {
          setUserTokenToSearch(userTokenBeforeInit);
          insightsClient('setUserToken', userTokenBeforeInit);
        } else if (queuedUserToken) {
          setUserTokenToSearch(queuedUserToken);
          insightsClient('setUserToken', queuedUserToken);
        }

        // This updates userToken which is set explicitly by `aa('setUserToken', userToken)`
        insightsClient('onUserTokenChange', setUserTokenToSearch, {
          immediate: true
        });
        var insightsClientWithLocalCredentials = insightsClient;
        if (isModernInsightsClient(insightsClient)) {
          insightsClientWithLocalCredentials = function insightsClientWithLocalCredentials(method, payload) {
            var extraParams = {
              headers: {
                'X-Algolia-Application-Id': appId,
                'X-Algolia-API-Key': apiKey
              }
            };

            // @ts-ignore we are calling this only when we know that the client actually is correct
            return insightsClient(method, payload, extraParams);
          };
        }
        instantSearchInstance.sendEventToInsights = function (event) {
          if (onEvent) {
            onEvent(event, insightsClientWithLocalCredentials);
          } else if (event.insightsMethod) {
            // Source is used to differentiate events sent by instantsearch from those sent manually.
            event.payload.algoliaSource = ['instantsearch'];
            if (event.eventModifier === 'internal') {
              event.payload.algoliaSource.push('instantsearch-internal');
            }
            insightsClientWithLocalCredentials(event.insightsMethod, event.payload);
             true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.warning)(Boolean(helper.state.userToken), "\nCannot send event to Algolia Insights because `userToken` is not set.\n\nSee documentation: https://www.algolia.com/doc/guides/building-search-ui/going-further/send-insights-events/js/#setting-the-usertoken\n") : 0;
          } else {
             true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.warning)(false, 'Cannot send event to Algolia Insights because `insightsMethod` option is missing.') : 0;
          }
        };
      },
      unsubscribe: function unsubscribe() {
        insightsClient('onUserTokenChange', undefined);
        instantSearchInstance.sendEventToInsights = _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.noop;
        if (helper && initialParameters) {
          helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread(_objectSpread({}, helper.state), initialParameters));
          instantSearchInstance.scheduleSearch();
        }
      }
    };
  };
}

/**
 * Determines if a given insights `client` supports the optional call to `init`
 * and the ability to set credentials via extra parameters when sending events.
 */
function isModernInsightsClient(client) {
  var _split$map = (client.version || '').split('.').map(Number),
    _split$map2 = _slicedToArray(_split$map, 2),
    major = _split$map2[0],
    minor = _split$map2[1];

  /* eslint-disable @typescript-eslint/naming-convention */
  var v3 = major >= 3;
  var v2_6 = major === 2 && minor >= 6;
  var v1_10 = major === 1 && minor >= 10;
  /* eslint-enable @typescript-eslint/naming-convention */

  return v3 || v2_6 || v1_10;
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/middlewares/createMetadataMiddleware.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/middlewares/createMetadataMiddleware.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMetadataMiddleware": () => (/* binding */ createMetadataMiddleware),
/* harmony export */   "isMetadataEnabled": () => (/* binding */ isMetadataEnabled)
/* harmony export */ });
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/render-args.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js");

function extractWidgetPayload(widgets, instantSearchInstance, payload) {
  var initOptions = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.createInitArgs)(instantSearchInstance, instantSearchInstance.mainIndex, instantSearchInstance._initialUiState);
  widgets.forEach(function (widget) {
    var widgetParams = {};
    if (widget.getWidgetRenderState) {
      var renderState = widget.getWidgetRenderState(initOptions);
      if (renderState && renderState.widgetParams) {
        // casting, as we just earlier checked widgetParams exists, and thus an object
        widgetParams = renderState.widgetParams;
      }
    }

    // since we destructure in all widgets, the parameters with defaults are set to "undefined"
    var params = Object.keys(widgetParams).filter(function (key) {
      return widgetParams[key] !== undefined;
    });
    payload.widgets.push({
      type: widget.$$type,
      widgetType: widget.$$widgetType,
      params: params
    });
    if (widget.$$type === 'ais.index') {
      extractWidgetPayload(widget.getWidgets(), instantSearchInstance, payload);
    }
  });
}
function isMetadataEnabled() {
  return (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.safelyRunOnBrowser)(function (_ref) {
    var _window$navigator, _window$navigator$use;
    var window = _ref.window;
    return ((_window$navigator = window.navigator) === null || _window$navigator === void 0 ? void 0 : (_window$navigator$use = _window$navigator.userAgent) === null || _window$navigator$use === void 0 ? void 0 : _window$navigator$use.indexOf('Algolia Crawler')) > -1;
  }, {
    fallback: function fallback() {
      return false;
    }
  });
}

/**
 * Exposes the metadata of mounted widgets in a custom
 * `<meta name="instantsearch:widgets" />` tag. The metadata per widget is:
 * - applied parameters
 * - widget name
 * - connector name
 */
function createMetadataMiddleware() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref2$$$internal = _ref2.$$internal,
    $$internal = _ref2$$$internal === void 0 ? false : _ref2$$$internal;
  return function (_ref3) {
    var instantSearchInstance = _ref3.instantSearchInstance;
    var payload = {
      widgets: []
    };
    var payloadContainer = document.createElement('meta');
    var refNode = document.querySelector('head');
    payloadContainer.name = 'instantsearch:widgets';
    return {
      $$type: 'ais.metadata',
      $$internal: $$internal,
      onStateChange: function onStateChange() {},
      subscribe: function subscribe() {
        // using setTimeout here to delay extraction until widgets have been added in a tick (e.g. Vue)
        setTimeout(function () {
          var client = instantSearchInstance.client;
          payload.ua = client.transporter && client.transporter.userAgent ? client.transporter.userAgent.value : client._ua;
          extractWidgetPayload(instantSearchInstance.mainIndex.getWidgets(), instantSearchInstance, payload);
          instantSearchInstance.middleware.forEach(function (middleware) {
            return payload.widgets.push({
              middleware: true,
              type: middleware.instance.$$type,
              internal: middleware.instance.$$internal
            });
          });
          payloadContainer.content = JSON.stringify(payload);
          refNode.appendChild(payloadContainer);
        }, 0);
      },
      started: function started() {},
      unsubscribe: function unsubscribe() {
        payloadContainer.remove();
      }
    };
  };
}

/***/ }),

/***/ "./node_modules/instantsearch.js/es/middlewares/createRouterMiddleware.js":
/*!********************************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/middlewares/createRouterMiddleware.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRouterMiddleware": () => (/* binding */ createRouterMiddleware)
/* harmony export */ });
/* harmony import */ var _lib_routers_history_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/routers/history.js */ "./node_modules/instantsearch.js/es/lib/routers/history.js");
/* harmony import */ var _lib_stateMappings_simple_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/stateMappings/simple.js */ "./node_modules/instantsearch.js/es/lib/stateMappings/simple.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/isEqual.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var createRouterMiddleware = function createRouterMiddleware() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _props$router = props.router,
    router = _props$router === void 0 ? (0,_lib_routers_history_js__WEBPACK_IMPORTED_MODULE_0__["default"])() : _props$router,
    _props$stateMapping = props.stateMapping,
    stateMapping = _props$stateMapping === void 0 ? (0,_lib_stateMappings_simple_js__WEBPACK_IMPORTED_MODULE_1__["default"])() : _props$stateMapping,
    _props$$$internal = props.$$internal,
    $$internal = _props$$$internal === void 0 ? false : _props$$$internal;
  return function (_ref) {
    var instantSearchInstance = _ref.instantSearchInstance;
    function topLevelCreateURL(nextState) {
      var uiState = Object.keys(nextState).reduce(function (acc, indexId) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, indexId, nextState[indexId]));
      }, instantSearchInstance.mainIndex.getWidgetUiState({}));
      var route = stateMapping.stateToRoute(uiState);
      return router.createURL(route);
    }

    // casting to UiState here to keep createURL unaware of custom UiState
    // (as long as it's an object, it's ok)
    instantSearchInstance._createURL = topLevelCreateURL;
    var lastRouteState = undefined;
    var initialUiState = instantSearchInstance._initialUiState;
    return {
      $$type: "ais.router({router:".concat(router.$$type || '__unknown__', ", stateMapping:").concat(stateMapping.$$type || '__unknown__', "})"),
      $$internal: $$internal,
      onStateChange: function onStateChange(_ref2) {
        var uiState = _ref2.uiState;
        var routeState = stateMapping.stateToRoute(uiState);
        if (lastRouteState === undefined || !(0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.isEqual)(lastRouteState, routeState)) {
          router.write(routeState);
          lastRouteState = routeState;
        }
      },
      subscribe: function subscribe() {
        instantSearchInstance._initialUiState = _objectSpread(_objectSpread({}, initialUiState), stateMapping.routeToState(router.read()));
        router.onUpdate(function (route) {
          instantSearchInstance.setUiState(stateMapping.routeToState(route));
        });
      },
      started: function started() {
        var _router$start;
        (_router$start = router.start) === null || _router$start === void 0 ? void 0 : _router$start.call(router);
      },
      unsubscribe: function unsubscribe() {
        router.dispose();
      }
    };
  };
};

/***/ }),

/***/ "./node_modules/instantsearch.js/es/widgets/index/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/instantsearch.js/es/widgets/index/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! algoliasearch-helper */ "./node_modules/algoliasearch-helper/index.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/documentation.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/isIndexWidget.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/render-args.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/mergeSearchParameters.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/resolveSearchParameters.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/checkIndexUiState.js");
/* harmony import */ var _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/utils/index.js */ "./node_modules/instantsearch.js/es/lib/utils/logger.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["initialSearchParameters"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


var withUsage = (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.createDocumentationMessageGenerator)({
  name: 'index-widget'
});
/**
 * This is the same content as helper._change / setState, but allowing for extra
 * UiState to be synchronized.
 * see: https://github.com/algolia/algoliasearch-helper-js/blob/6b835ffd07742f2d6b314022cce6848f5cfecd4a/src/algoliasearch.helper.js#L1311-L1324
 */
function privateHelperSetState(helper, _ref) {
  var state = _ref.state,
    isPageReset = _ref.isPageReset,
    _uiState = _ref._uiState;
  if (state !== helper.state) {
    helper.state = state;
    helper.emit('change', {
      state: helper.state,
      results: helper.lastResults,
      isPageReset: isPageReset,
      _uiState: _uiState
    });
  }
}
function getLocalWidgetsUiState(widgets, widgetStateOptions) {
  var initialUiState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return widgets.reduce(function (uiState, widget) {
    if ((0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.isIndexWidget)(widget)) {
      return uiState;
    }
    if (!widget.getWidgetUiState && !widget.getWidgetState) {
      return uiState;
    }
    if (widget.getWidgetUiState) {
      return widget.getWidgetUiState(uiState, widgetStateOptions);
    }
    return widget.getWidgetState(uiState, widgetStateOptions);
  }, initialUiState);
}
function getLocalWidgetsSearchParameters(widgets, widgetSearchParametersOptions) {
  var initialSearchParameters = widgetSearchParametersOptions.initialSearchParameters,
    rest = _objectWithoutProperties(widgetSearchParametersOptions, _excluded);
  return widgets.filter(function (widget) {
    return !(0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.isIndexWidget)(widget);
  }).reduce(function (state, widget) {
    if (!widget.getWidgetSearchParameters) {
      return state;
    }
    return widget.getWidgetSearchParameters(state, rest);
  }, initialSearchParameters);
}
function resetPageFromWidgets(widgets) {
  var indexWidgets = widgets.filter(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.isIndexWidget);
  if (indexWidgets.length === 0) {
    return;
  }
  indexWidgets.forEach(function (widget) {
    var widgetHelper = widget.getHelper();
    privateHelperSetState(widgetHelper, {
      state: widgetHelper.state.resetPage(),
      isPageReset: true
    });
    resetPageFromWidgets(widget.getWidgets());
  });
}
function resolveScopedResultsFromWidgets(widgets) {
  var indexWidgets = widgets.filter(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.isIndexWidget);
  return indexWidgets.reduce(function (scopedResults, current) {
    return scopedResults.concat.apply(scopedResults, [{
      indexId: current.getIndexId(),
      results: current.getResults(),
      helper: current.getHelper()
    }].concat(_toConsumableArray(resolveScopedResultsFromWidgets(current.getWidgets()))));
  }, []);
}
var index = function index(widgetParams) {
  if (widgetParams === undefined || widgetParams.indexName === undefined) {
    throw new Error(withUsage('The `indexName` option is required.'));
  }
  var indexName = widgetParams.indexName,
    _widgetParams$indexId = widgetParams.indexId,
    indexId = _widgetParams$indexId === void 0 ? indexName : _widgetParams$indexId;
  var localWidgets = [];
  var localUiState = {};
  var localInstantSearchInstance = null;
  var localParent = null;
  var helper = null;
  var derivedHelper = null;
  var lastValidSearchParameters = null;
  return {
    $$type: 'ais.index',
    $$widgetType: 'ais.index',
    getIndexName: function getIndexName() {
      return indexName;
    },
    getIndexId: function getIndexId() {
      return indexId;
    },
    getHelper: function getHelper() {
      return helper;
    },
    getResults: function getResults() {
      var _derivedHelper;
      if (!((_derivedHelper = derivedHelper) !== null && _derivedHelper !== void 0 && _derivedHelper.lastResults)) return null;

      // To make the UI optimistic, we patch the state to display to the current
      // one instead of the one associated with the latest results.
      // This means user-driven UI changes (e.g., checked checkbox) are reflected
      // immediately instead of waiting for Algolia to respond, regardless of
      // the status of the network request.
      derivedHelper.lastResults._state = helper.state;
      return derivedHelper.lastResults;
    },
    getPreviousState: function getPreviousState() {
      return lastValidSearchParameters;
    },
    getScopedResults: function getScopedResults() {
      var widgetParent = this.getParent();

      // If the widget is the root, we consider itself as the only sibling.
      var widgetSiblings = widgetParent ? widgetParent.getWidgets() : [this];
      return resolveScopedResultsFromWidgets(widgetSiblings);
    },
    getParent: function getParent() {
      return localParent;
    },
    createURL: function createURL(nextState) {
      return localInstantSearchInstance._createURL(_defineProperty({}, indexId, getLocalWidgetsUiState(localWidgets, {
        searchParameters: nextState,
        helper: helper
      })));
    },
    getWidgets: function getWidgets() {
      return localWidgets;
    },
    addWidgets: function addWidgets(widgets) {
      var _this = this;
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `addWidgets` method expects an array of widgets.'));
      }
      if (widgets.some(function (widget) {
        return typeof widget.init !== 'function' && typeof widget.render !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `render` and/or an `init` method.'));
      }
      localWidgets = localWidgets.concat(widgets);
      if (localInstantSearchInstance && Boolean(widgets.length)) {
        privateHelperSetState(helper, {
          state: getLocalWidgetsSearchParameters(localWidgets, {
            uiState: localUiState,
            initialSearchParameters: helper.state
          }),
          _uiState: localUiState
        });

        // We compute the render state before calling `init` in a separate loop
        // to construct the whole render state object that is then passed to
        // `init`.
        widgets.forEach(function (widget) {
          if (widget.getRenderState) {
            var renderState = widget.getRenderState(localInstantSearchInstance.renderState[_this.getIndexId()] || {}, (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.createInitArgs)(localInstantSearchInstance, _this, localInstantSearchInstance._initialUiState));
            storeRenderState({
              renderState: renderState,
              instantSearchInstance: localInstantSearchInstance,
              parent: _this
            });
          }
        });
        widgets.forEach(function (widget) {
          if (widget.init) {
            widget.init((0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.createInitArgs)(localInstantSearchInstance, _this, localInstantSearchInstance._initialUiState));
          }
        });
        localInstantSearchInstance.scheduleSearch();
      }
      return this;
    },
    removeWidgets: function removeWidgets(widgets) {
      var _this2 = this;
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `removeWidgets` method expects an array of widgets.'));
      }
      if (widgets.some(function (widget) {
        return typeof widget.dispose !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `dispose` method.'));
      }
      localWidgets = localWidgets.filter(function (widget) {
        return widgets.indexOf(widget) === -1;
      });
      if (localInstantSearchInstance && Boolean(widgets.length)) {
        var nextState = widgets.reduce(function (state, widget) {
          // the `dispose` method exists at this point we already assert it
          var next = widget.dispose({
            helper: helper,
            state: state,
            parent: _this2
          });
          return next || state;
        }, helper.state);
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: nextState,
          helper: helper
        });
        helper.setState(getLocalWidgetsSearchParameters(localWidgets, {
          uiState: localUiState,
          initialSearchParameters: nextState
        }));
        if (localWidgets.length) {
          localInstantSearchInstance.scheduleSearch();
        }
      }
      return this;
    },
    init: function init(_ref2) {
      var _this3 = this,
        _instantSearchInstanc;
      var instantSearchInstance = _ref2.instantSearchInstance,
        parent = _ref2.parent,
        uiState = _ref2.uiState;
      if (helper !== null) {
        // helper is already initialized, therefore we do not need to set up
        // any listeners
        return;
      }
      localInstantSearchInstance = instantSearchInstance;
      localParent = parent;
      localUiState = uiState[indexId] || {};

      // The `mainHelper` is already defined at this point. The instance is created
      // inside InstantSearch at the `start` method, which occurs before the `init`
      // step.
      var mainHelper = instantSearchInstance.mainHelper;
      var parameters = getLocalWidgetsSearchParameters(localWidgets, {
        uiState: localUiState,
        initialSearchParameters: new algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__.SearchParameters({
          index: indexName
        })
      });

      // This Helper is only used for state management we do not care about the
      // `searchClient`. Only the "main" Helper created at the `InstantSearch`
      // level is aware of the client.
      helper = algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__({}, parameters.index, parameters);

      // We forward the call to `search` to the "main" instance of the Helper
      // which is responsible for managing the queries (it's the only one that is
      // aware of the `searchClient`).
      helper.search = function () {
        if (instantSearchInstance.onStateChange) {
          instantSearchInstance.onStateChange({
            uiState: instantSearchInstance.mainIndex.getWidgetUiState({}),
            setUiState: function setUiState(nextState) {
              return instantSearchInstance.setUiState(nextState, false);
            }
          });

          // We don't trigger a search when controlled because it becomes the
          // responsibility of `setUiState`.
          return mainHelper;
        }
        return mainHelper.search();
      };
      helper.searchWithoutTriggeringOnStateChange = function () {
        return mainHelper.search();
      };

      // We use the same pattern for the `searchForFacetValues`.
      helper.searchForFacetValues = function (facetName, facetValue, maxFacetHits, userState) {
        var state = helper.state.setQueryParameters(userState);
        return mainHelper.searchForFacetValues(facetName, facetValue, maxFacetHits, state);
      };
      derivedHelper = mainHelper.derive(function () {
        return _lib_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.mergeSearchParameters.apply(void 0, _toConsumableArray((0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.resolveSearchParameters)(_this3)));
      });
      var indexInitialResults = (_instantSearchInstanc = instantSearchInstance._initialResults) === null || _instantSearchInstanc === void 0 ? void 0 : _instantSearchInstanc[this.getIndexId()];
      if (indexInitialResults) {
        // We restore the shape of the results provided to the instance to respect
        // the helper's structure.
        var results = new algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__.SearchResults(new algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__.SearchParameters(indexInitialResults.state), indexInitialResults.results);
        derivedHelper.lastResults = results;
        helper.lastResults = results;
      }

      // Subscribe to the Helper state changes for the page before widgets
      // are initialized. This behavior mimics the original one of the Helper.
      // It makes sense to replicate it at the `init` step. We have another
      // listener on `change` below, once `init` is done.
      helper.on('change', function (_ref3) {
        var isPageReset = _ref3.isPageReset;
        if (isPageReset) {
          resetPageFromWidgets(localWidgets);
        }
      });
      derivedHelper.on('search', function () {
        // The index does not manage the "staleness" of the search. This is the
        // responsibility of the main instance. It does not make sense to manage
        // it at the index level because it's either: all of them or none of them
        // that are stalled. The queries are performed into a single network request.
        instantSearchInstance.scheduleStalledRender();
        if (true) {
          (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_6__.checkIndexUiState)({
            index: _this3,
            indexUiState: localUiState
          });
        }
      });
      derivedHelper.on('result', function (_ref4) {
        var results = _ref4.results;
        // The index does not render the results it schedules a new render
        // to let all the other indices emit their own results. It allows us to
        // run the render process in one pass.
        instantSearchInstance.scheduleRender();

        // the derived helper is the one which actually searches, but the helper
        // which is exposed e.g. via instance.helper, doesn't search, and thus
        // does not have access to lastResults, which it used to in pre-federated
        // search behavior.
        helper.lastResults = results;
        lastValidSearchParameters = results._state;
      });

      // We compute the render state before calling `init` in a separate loop
      // to construct the whole render state object that is then passed to
      // `init`.
      localWidgets.forEach(function (widget) {
        if (widget.getRenderState) {
          var renderState = widget.getRenderState(instantSearchInstance.renderState[_this3.getIndexId()] || {}, (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.createInitArgs)(instantSearchInstance, _this3, uiState));
          storeRenderState({
            renderState: renderState,
            instantSearchInstance: instantSearchInstance,
            parent: _this3
          });
        }
      });
      localWidgets.forEach(function (widget) {
         true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_7__.warning)(
        // if it has NO getWidgetState or if it has getWidgetUiState, we don't warn
        // aka we warn if there's _only_ getWidgetState
        !widget.getWidgetState || Boolean(widget.getWidgetUiState), 'The `getWidgetState` method is renamed `getWidgetUiState` and will no longer exist under that name in InstantSearch.js 5.x. Please use `getWidgetUiState` instead.') : 0;
        if (widget.init) {
          widget.init((0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.createInitArgs)(instantSearchInstance, _this3, uiState));
        }
      });

      // Subscribe to the Helper state changes for the `uiState` once widgets
      // are initialized. Until the first render, state changes are part of the
      // configuration step. This is mainly for backward compatibility with custom
      // widgets. When the subscription happens before the `init` step, the (static)
      // configuration of the widget is pushed in the URL. That's what we want to avoid.
      // https://github.com/algolia/instantsearch.js/pull/994/commits/4a672ae3fd78809e213de0368549ef12e9dc9454
      helper.on('change', function (event) {
        var state = event.state;
        var _uiState = event._uiState;
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: state,
          helper: helper
        }, _uiState || {});

        // We don't trigger an internal change when controlled because it
        // becomes the responsibility of `setUiState`.
        if (!instantSearchInstance.onStateChange) {
          instantSearchInstance.onInternalStateChange();
        }
      });
      if (indexInitialResults) {
        // If there are initial results, we're not notified of the next results
        // because we don't trigger an initial search. We therefore need to directly
        // schedule a render that will render the results injected on the helper.
        instantSearchInstance.scheduleRender();
      }
    },
    render: function render(_ref5) {
      var _this4 = this;
      var instantSearchInstance = _ref5.instantSearchInstance;
      if (!this.getResults()) {
        return;
      }

      // we can't attach a listener to the error event of search, as the error
      // then would no longer be thrown for global handlers.
      if (instantSearchInstance.status === 'error' && !instantSearchInstance.mainHelper.hasPendingRequests()) {
        helper.setState(lastValidSearchParameters);
      }
      localWidgets.forEach(function (widget) {
        if (widget.getRenderState) {
          var renderState = widget.getRenderState(instantSearchInstance.renderState[_this4.getIndexId()] || {}, (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.createRenderArgs)(instantSearchInstance, _this4));
          storeRenderState({
            renderState: renderState,
            instantSearchInstance: instantSearchInstance,
            parent: _this4
          });
        }
      });
      localWidgets.forEach(function (widget) {
        // At this point, all the variables used below are set. Both `helper`
        // and `derivedHelper` have been created at the `init` step. The attribute
        // `lastResults` might be `null` though. It's possible that a stalled render
        // happens before the result e.g with a dynamically added index the request might
        // be delayed. The render is triggered for the complete tree but some parts do
        // not have results yet.

        if (widget.render) {
          widget.render((0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.createRenderArgs)(instantSearchInstance, _this4));
        }
      });
    },
    dispose: function dispose() {
      var _this5 = this,
        _helper,
        _derivedHelper2;
      localWidgets.forEach(function (widget) {
        if (widget.dispose) {
          // The dispose function is always called once the instance is started
          // (it's an effect of `removeWidgets`). The index is initialized and
          // the Helper is available. We don't care about the return value of
          // `dispose` because the index is removed. We can't call `removeWidgets`
          // because we want to keep the widgets on the instance, to allow idempotent
          // operations on `add` & `remove`.
          widget.dispose({
            helper: helper,
            state: helper.state,
            parent: _this5
          });
        }
      });
      localInstantSearchInstance = null;
      localParent = null;
      (_helper = helper) === null || _helper === void 0 ? void 0 : _helper.removeAllListeners();
      helper = null;
      (_derivedHelper2 = derivedHelper) === null || _derivedHelper2 === void 0 ? void 0 : _derivedHelper2.detach();
      derivedHelper = null;
    },
    getWidgetUiState: function getWidgetUiState(uiState) {
      return localWidgets.filter(_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.isIndexWidget).reduce(function (previousUiState, innerIndex) {
        return innerIndex.getWidgetUiState(previousUiState);
      }, _objectSpread(_objectSpread({}, uiState), {}, _defineProperty({}, indexId, _objectSpread(_objectSpread({}, uiState[indexId]), localUiState))));
    },
    getWidgetState: function getWidgetState(uiState) {
       true ? (0,_lib_utils_index_js__WEBPACK_IMPORTED_MODULE_7__.warning)(false, 'The `getWidgetState` method is renamed `getWidgetUiState` and will no longer exist under that name in InstantSearch.js 5.x. Please use `getWidgetUiState` instead.') : 0;
      return this.getWidgetUiState(uiState);
    },
    getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
      var uiState = _ref6.uiState;
      return getLocalWidgetsSearchParameters(localWidgets, {
        uiState: uiState,
        initialSearchParameters: searchParameters
      });
    },
    refreshUiState: function refreshUiState() {
      localUiState = getLocalWidgetsUiState(localWidgets, {
        searchParameters: this.getHelper().state,
        helper: this.getHelper()
      }, localUiState);
    },
    setIndexUiState: function setIndexUiState(indexUiState) {
      var nextIndexUiState = typeof indexUiState === 'function' ? indexUiState(localUiState) : indexUiState;
      localInstantSearchInstance.setUiState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, indexId, nextIndexUiState));
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);
function storeRenderState(_ref7) {
  var renderState = _ref7.renderState,
    instantSearchInstance = _ref7.instantSearchInstance,
    parent = _ref7.parent;
  var parentIndexName = parent ? parent.getIndexId() : instantSearchInstance.mainIndex.getIndexId();
  instantSearchInstance.renderState = _objectSpread(_objectSpread({}, instantSearchInstance.renderState), {}, _defineProperty({}, parentIndexName, _objectSpread(_objectSpread({}, instantSearchInstance.renderState[parentIndexName]), renderState)));
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/components/Configure.js":
/*!********************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/components/Configure.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Configure": () => (/* binding */ Configure)
/* harmony export */ });
/* harmony import */ var _connectors_useConfigure_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../connectors/useConfigure.js */ "./node_modules/react-instantsearch-hooks/dist/es/connectors/useConfigure.js");

function Configure(props) {
  (0,_connectors_useConfigure_js__WEBPACK_IMPORTED_MODULE_0__.useConfigure)(props, {
    $$widgetType: 'ais.configure'
  });
  return null;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/components/Index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/components/Index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Index": () => (/* binding */ Index)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _lib_IndexContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/IndexContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/IndexContext.js");
/* harmony import */ var _lib_useIndex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/useIndex.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIndex.js");
var _excluded = ["children"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



function Index(_ref) {
  var children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  var index = (0,_lib_useIndex_js__WEBPACK_IMPORTED_MODULE_1__.useIndex)(props);
  if (index.getHelper() === null) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_lib_IndexContext_js__WEBPACK_IMPORTED_MODULE_2__.IndexContext.Provider, {
    value: index
  }, children);
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/components/InstantSearch.js":
/*!************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/components/InstantSearch.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InstantSearch": () => (/* binding */ InstantSearch)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _lib_IndexContext_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/IndexContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/IndexContext.js");
/* harmony import */ var _lib_InstantSearchContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/InstantSearchContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/InstantSearchContext.js");
/* harmony import */ var _lib_useInstantSearchApi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/useInstantSearchApi.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchApi.js");
var _excluded = ["children"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




function InstantSearch(_ref) {
  var children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  var search = (0,_lib_useInstantSearchApi_js__WEBPACK_IMPORTED_MODULE_1__.useInstantSearchApi)(props);
  if (!search.started) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_lib_InstantSearchContext_js__WEBPACK_IMPORTED_MODULE_2__.InstantSearchContext.Provider, {
    value: search
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_lib_IndexContext_js__WEBPACK_IMPORTED_MODULE_3__.IndexContext.Provider, {
    value: search.mainIndex
  }, children));
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/components/InstantSearchServerContext.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/components/InstantSearchServerContext.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InstantSearchServerContext": () => (/* binding */ InstantSearchServerContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

var InstantSearchServerContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
if (true) {
  InstantSearchServerContext.displayName = 'InstantSearchServer';
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/connectors/useConfigure.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/connectors/useConfigure.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useConfigure": () => (/* binding */ useConfigure)
/* harmony export */ });
/* harmony import */ var instantsearch_js_es_connectors_configure_connectConfigure_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! instantsearch.js/es/connectors/configure/connectConfigure.js */ "./node_modules/instantsearch.js/es/connectors/configure/connectConfigure.js");
/* harmony import */ var _hooks_useConnector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hooks/useConnector.js */ "./node_modules/react-instantsearch-hooks/dist/es/hooks/useConnector.js");


function useConfigure(props, additionalWidgetProperties) {
  return (0,_hooks_useConnector_js__WEBPACK_IMPORTED_MODULE_0__.useConnector)(instantsearch_js_es_connectors_configure_connectConfigure_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
    searchParameters: props
  }, additionalWidgetProperties);
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/connectors/useSearchBox.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/connectors/useSearchBox.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useSearchBox": () => (/* binding */ useSearchBox)
/* harmony export */ });
/* harmony import */ var instantsearch_js_es_connectors_search_box_connectSearchBox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! instantsearch.js/es/connectors/search-box/connectSearchBox.js */ "./node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js");
/* harmony import */ var _hooks_useConnector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../hooks/useConnector.js */ "./node_modules/react-instantsearch-hooks/dist/es/hooks/useConnector.js");


function useSearchBox(props, additionalWidgetProperties) {
  return (0,_hooks_useConnector_js__WEBPACK_IMPORTED_MODULE_0__.useConnector)(instantsearch_js_es_connectors_search_box_connectSearchBox_js__WEBPACK_IMPORTED_MODULE_1__["default"], props, additionalWidgetProperties);
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/hooks/useConnector.js":
/*!******************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/hooks/useConnector.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useConnector": () => (/* binding */ useConnector)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _lib_dequal_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/dequal.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/dequal.js");
/* harmony import */ var _lib_getIndexSearchResults_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/getIndexSearchResults.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/getIndexSearchResults.js");
/* harmony import */ var _lib_useIndexContext_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/useIndexContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIndexContext.js");
/* harmony import */ var _lib_useInstantSearchContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/useInstantSearchContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchContext.js");
/* harmony import */ var _lib_useInstantSearchServerContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/useInstantSearchServerContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchServerContext.js");
/* harmony import */ var _lib_useStableValue_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/useStableValue.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useStableValue.js");
/* harmony import */ var _lib_useWidget_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/useWidget.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useWidget.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["instantSearchInstance", "widgetParams"],
  _excluded2 = ["widgetParams"];
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








function useConnector(connector) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var additionalWidgetProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var serverContext = (0,_lib_useInstantSearchServerContext_js__WEBPACK_IMPORTED_MODULE_1__.useInstantSearchServerContext)();
  var search = (0,_lib_useInstantSearchContext_js__WEBPACK_IMPORTED_MODULE_2__.useInstantSearchContext)();
  var parentIndex = (0,_lib_useIndexContext_js__WEBPACK_IMPORTED_MODULE_3__.useIndexContext)();
  var stableProps = (0,_lib_useStableValue_js__WEBPACK_IMPORTED_MODULE_4__.useStableValue)(props);
  var stableAdditionalWidgetProperties = (0,_lib_useStableValue_js__WEBPACK_IMPORTED_MODULE_4__.useStableValue)(additionalWidgetProperties);
  var shouldSetStateRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  var previousRenderStateRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var widget = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var createWidget = connector(function (connectorState, isFirstRender) {
      // We skip the `init` widget render because:
      // - We rely on `getWidgetRenderState` to compute the initial state before
      //   the InstantSearch.js lifecycle starts.
      // - It prevents UI flashes when updating the widget props.
      if (isFirstRender) {
        shouldSetStateRef.current = true;
        return;
      }

      // There are situations where InstantSearch.js may render widgets slightly
      // after they're removed by React, and thus try to update the React state
      // on unmounted components. React 16 and 17 consider them as memory leaks
      // and display a warning.
      // This happens in <DynamicWidgets> when `attributesToRender` contains a
      // value without an attribute previously mounted. React will unmount the
      // component controlled by that attribute, but InstantSearch.js will stay
      // unaware of this change until the render pass finishes, and therefore
      // notifies of a state change.
      // This ref lets us track this situation and ignore these state updates.
      if (shouldSetStateRef.current) {
        var instantSearchInstance = connectorState.instantSearchInstance,
          widgetParams = connectorState.widgetParams,
          renderState = _objectWithoutProperties(connectorState, _excluded);

        // We only update the state when a widget render state param changes,
        // except for functions. We ignore function reference changes to avoid
        // infinite loops. It's safe to omit them because they get updated
        // every time another render param changes.
        if (!(0,_lib_dequal_js__WEBPACK_IMPORTED_MODULE_5__.dequal)(renderState, previousRenderStateRef.current, function (a, b) {
          return (a === null || a === void 0 ? void 0 : a.constructor) === Function && (b === null || b === void 0 ? void 0 : b.constructor) === Function;
        })) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          setState(renderState);
          previousRenderStateRef.current = renderState;
        }
      }
    }, function () {
      // We'll ignore the next state update until we know for sure that
      // InstantSearch.js re-inits the component.
      shouldSetStateRef.current = false;
    });
    return _objectSpread(_objectSpread({}, createWidget(stableProps)), stableAdditionalWidgetProperties);
  }, [connector, stableProps, stableAdditionalWidgetProperties]);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
      if (widget.getWidgetRenderState) {
        var _widget$getWidgetSear;
        // The helper exists because we've started InstantSearch.
        var helper = parentIndex.getHelper();
        var uiState = parentIndex.getWidgetUiState({})[parentIndex.getIndexId()];
        helper.state = ((_widget$getWidgetSear = widget.getWidgetSearchParameters) === null || _widget$getWidgetSear === void 0 ? void 0 : _widget$getWidgetSear.call(widget, helper.state, {
          uiState: uiState
        })) || helper.state;
        var _getIndexSearchResult = (0,_lib_getIndexSearchResults_js__WEBPACK_IMPORTED_MODULE_6__.getIndexSearchResults)(parentIndex),
          results = _getIndexSearchResult.results,
          scopedResults = _getIndexSearchResult.scopedResults;

        // We get the widget render state by providing the same parameters as
        // InstantSearch provides to the widget's `render` method.
        // See https://github.com/algolia/instantsearch.js/blob/019cd18d0de6dd320284aa4890541b7fe2198c65/src/widgets/index/index.ts#L604-L617
        var _widget$getWidgetRend = widget.getWidgetRenderState({
            helper: helper,
            parent: parentIndex,
            instantSearchInstance: search,
            results: results,
            scopedResults: scopedResults,
            state: helper.state,
            renderState: search.renderState,
            templatesConfig: search.templatesConfig,
            createURL: parentIndex.createURL,
            searchMetadata: {
              isSearchStalled: search.status === 'stalled'
            },
            status: search.status,
            error: search.error
          }),
          widgetParams = _widget$getWidgetRend.widgetParams,
          renderState = _objectWithoutProperties(_widget$getWidgetRend, _excluded2);
        return renderState;
      }
      return {};
    }),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  (0,_lib_useWidget_js__WEBPACK_IMPORTED_MODULE_7__.useWidget)({
    widget: widget,
    parentIndex: parentIndex,
    props: stableProps,
    shouldSsr: Boolean(serverContext)
  });
  return state;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/hooks/useInstantSearch.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/hooks/useInstantSearch.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useInstantSearch": () => (/* binding */ useInstantSearch)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _lib_useInstantSearchContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/useInstantSearchContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchContext.js");
/* harmony import */ var _lib_useIsomorphicLayoutEffect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/useIsomorphicLayoutEffect.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIsomorphicLayoutEffect.js");
/* harmony import */ var _lib_useSearchResults_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/useSearchResults.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useSearchResults.js");
/* harmony import */ var _lib_useSearchState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/useSearchState.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useSearchState.js");





function useInstantSearch() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    catchError = _ref.catchError;
  var search = (0,_lib_useInstantSearchContext_js__WEBPACK_IMPORTED_MODULE_1__.useInstantSearchContext)();
  var _useSearchState = (0,_lib_useSearchState_js__WEBPACK_IMPORTED_MODULE_2__.useSearchState)(),
    uiState = _useSearchState.uiState,
    setUiState = _useSearchState.setUiState,
    indexUiState = _useSearchState.indexUiState,
    setIndexUiState = _useSearchState.setIndexUiState;
  var _useSearchResults = (0,_lib_useSearchResults_js__WEBPACK_IMPORTED_MODULE_3__.useSearchResults)(),
    results = _useSearchResults.results,
    scopedResults = _useSearchResults.scopedResults;
  var use = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }
    search.use.apply(search, middlewares);
    return function () {
      search.unuse.apply(search, middlewares);
    };
  }, [search]);
  var refresh = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    search.refresh();
  }, [search]);
  (0,_lib_useIsomorphicLayoutEffect_js__WEBPACK_IMPORTED_MODULE_4__.useIsomorphicLayoutEffect)(function () {
    if (catchError) {
      var onError = function onError() {};
      search.addListener('error', onError);
      return function () {
        return search.removeListener('error', onError);
      };
    }
    return function () {};
  }, [search, catchError]);
  return {
    results: results,
    scopedResults: scopedResults,
    uiState: uiState,
    setUiState: setUiState,
    indexUiState: indexUiState,
    setIndexUiState: setIndexUiState,
    use: use,
    refresh: refresh,
    status: search.status,
    error: search.error
  };
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/IndexContext.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/IndexContext.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexContext": () => (/* binding */ IndexContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

var IndexContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
if (true) {
  IndexContext.displayName = 'Index';
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/InstantSearchContext.js":
/*!************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/InstantSearchContext.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InstantSearchContext": () => (/* binding */ InstantSearchContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

var InstantSearchContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
if (true) {
  InstantSearchContext.displayName = 'InstantSearch';
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/InstantSearchSSRContext.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/InstantSearchSSRContext.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InstantSearchSSRContext": () => (/* binding */ InstantSearchSSRContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

var InstantSearchSSRContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
if (true) {
  InstantSearchSSRContext.displayName = 'InstantSearchSSR';
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/createSearchResults.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/createSearchResults.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSearchResults": () => (/* binding */ createSearchResults)
/* harmony export */ });
/* harmony import */ var algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! algoliasearch-helper */ "./node_modules/algoliasearch-helper/index.js");

function createSearchResults(state) {
  var _state$query, _state$page, _state$hitsPerPage;
  return new algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__.SearchResults(state, [{
    query: (_state$query = state.query) !== null && _state$query !== void 0 ? _state$query : '',
    page: (_state$page = state.page) !== null && _state$page !== void 0 ? _state$page : 0,
    hitsPerPage: (_state$hitsPerPage = state.hitsPerPage) !== null && _state$hitsPerPage !== void 0 ? _state$hitsPerPage : 20,
    hits: [],
    nbHits: 0,
    nbPages: 0,
    params: '',
    exhaustiveNbHits: true,
    exhaustiveFacetsCount: true,
    processingTimeMS: 0,
    index: state.index
  }], {
    /** used by connectors to prevent persisting these results */
    __isArtificial: true
  });
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/dequal.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/dequal.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dequal": () => (/* binding */ dequal)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* eslint-disable complexity */

/*
 * Code taken from dequal/lite v2.0.0
 * https://github.com/lukeed/dequal/blob/9aa73181ac7e081cd330cac67d313632ac04bb02/src/lite.js
 *
 * It adds a 3rd argument `compare(a, b)` that lets execute custom logic to
 * compare values.
 * We use it to skip comparing function references.
 */

var has = Object.prototype.hasOwnProperty;
function dequal(foo, bar, compare) {
  // start of custom implementation
  if (compare !== null && compare !== void 0 && compare(foo, bar)) {
    return true;
  }
  // end of custom implementation

  var ctor;
  var len;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len], compare));
      }
      return len === -1;
    }
    if (!ctor || _typeof(foo) === 'object') {
      len = 0;
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor], compare)) return false;
      }
      return Object.keys(bar).length === len;
    }
  }

  // eslint-disable-next-line no-self-compare
  return foo !== foo && bar !== bar;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/getIndexSearchResults.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/getIndexSearchResults.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getIndexSearchResults": () => (/* binding */ getIndexSearchResults)
/* harmony export */ });
/* harmony import */ var _createSearchResults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createSearchResults.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/createSearchResults.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function getIndexSearchResults(indexWidget) {
  var helper = indexWidget.getHelper();
  var results =
  // On SSR, we get the results injected on the Index.
  indexWidget.getResults() ||
  // On the browser, we create fallback results based on the helper state.
  (0,_createSearchResults_js__WEBPACK_IMPORTED_MODULE_0__.createSearchResults)(helper.state);
  var scopedResults = indexWidget.getScopedResults().map(function (scopedResult) {
    var fallbackResults = scopedResult.indexId === indexWidget.getIndexId() ? results : (0,_createSearchResults_js__WEBPACK_IMPORTED_MODULE_0__.createSearchResults)(scopedResult.helper.state);
    return _objectSpread(_objectSpread({}, scopedResult), {}, {
      // We keep `results` from being `null`.
      results: scopedResult.results || fallbackResults
    });
  });
  return {
    results: results,
    scopedResults: scopedResults
  };
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/invariant.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/invariant.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "invariant": () => (/* binding */ invariant)
/* harmony export */ });
/**
 * Throws an error if the condition is not met.
 *
 * The error is exhaustive in development, and becomes generic in production.
 *
 * This is used to make development a better experience to provide guidance as
 * to where the error comes from.
 */
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (false) {}
  if (true) {
    throw new Error("[InstantSearch] ".concat(typeof message === 'function' ? message() : message));
  }
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useForceUpdate.js":
/*!******************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useForceUpdate.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useForceUpdate": () => (/* binding */ useForceUpdate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/**
 * Forces a React update that triggers a rerender.
 * @link https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
 */
function useForceUpdate() {
  var _useReducer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(function (x) {
      return x + 1;
    }, 0),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    forceUpdate = _useReducer2[1];
  return forceUpdate;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIndex.js":
/*!************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useIndex.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useIndex": () => (/* binding */ useIndex)
/* harmony export */ });
/* harmony import */ var instantsearch_js_es_widgets_index_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! instantsearch.js/es/widgets/index/index.js */ "./node_modules/instantsearch.js/es/widgets/index/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _useIndexContext_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useIndexContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIndexContext.js");
/* harmony import */ var _useForceUpdate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useForceUpdate.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useForceUpdate.js");
/* harmony import */ var _useInstantSearchServerContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useInstantSearchServerContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchServerContext.js");
/* harmony import */ var _useInstantSearchSSRContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useInstantSearchSSRContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchSSRContext.js");
/* harmony import */ var _useIsomorphicLayoutEffect_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useIsomorphicLayoutEffect.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIsomorphicLayoutEffect.js");
/* harmony import */ var _useStableValue_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useStableValue.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useStableValue.js");
/* harmony import */ var _useWidget_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useWidget.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useWidget.js");









function useIndex(props) {
  var serverContext = (0,_useInstantSearchServerContext_js__WEBPACK_IMPORTED_MODULE_1__.useInstantSearchServerContext)();
  var ssrContext = (0,_useInstantSearchSSRContext_js__WEBPACK_IMPORTED_MODULE_2__.useInstantSearchSSRContext)();
  var initialResults = ssrContext === null || ssrContext === void 0 ? void 0 : ssrContext.initialResults;
  var parentIndex = (0,_useIndexContext_js__WEBPACK_IMPORTED_MODULE_3__.useIndexContext)();
  var stableProps = (0,_useStableValue_js__WEBPACK_IMPORTED_MODULE_4__.useStableValue)(props);
  var indexWidget = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return (0,instantsearch_js_es_widgets_index_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(stableProps);
  }, [stableProps]);
  var helper = indexWidget.getHelper();
  var forceUpdate = (0,_useForceUpdate_js__WEBPACK_IMPORTED_MODULE_6__.useForceUpdate)();
  (0,_useIsomorphicLayoutEffect_js__WEBPACK_IMPORTED_MODULE_7__.useIsomorphicLayoutEffect)(function () {
    forceUpdate();
  }, [helper, forceUpdate]);
  (0,_useWidget_js__WEBPACK_IMPORTED_MODULE_8__.useWidget)({
    widget: indexWidget,
    parentIndex: parentIndex,
    props: stableProps,
    shouldSsr: Boolean(serverContext || initialResults)
  });
  return indexWidget;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIndexContext.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useIndexContext.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useIndexContext": () => (/* binding */ useIndexContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _invariant_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./invariant.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/invariant.js");
/* harmony import */ var _IndexContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IndexContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/IndexContext.js");



function useIndexContext() {
  var context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_IndexContext_js__WEBPACK_IMPORTED_MODULE_1__.IndexContext);
  (0,_invariant_js__WEBPACK_IMPORTED_MODULE_2__.invariant)(context !== null, 'The <Index> component must be used within <InstantSearch>.');
  return context;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchApi.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchApi.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useInstantSearchApi": () => (/* binding */ useInstantSearchApi)
/* harmony export */ });
/* harmony import */ var instantsearch_js_es_lib_InstantSearch_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! instantsearch.js/es/lib/InstantSearch.js */ "./node_modules/instantsearch.js/es/lib/InstantSearch.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! use-sync-external-store/shim/index.js */ "./node_modules/use-sync-external-store/shim/index.js");
/* harmony import */ var _useInstantSearchServerContext_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useInstantSearchServerContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchServerContext.js");
/* harmony import */ var _useInstantSearchSSRContext_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useInstantSearchSSRContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchSSRContext.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../version.js */ "./node_modules/react-instantsearch-hooks/dist/es/version.js");
/* harmony import */ var _useForceUpdate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useForceUpdate.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useForceUpdate.js");
/* harmony import */ var _warn_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./warn.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/warn.js");








var defaultUserAgents = ["react (".concat(react__WEBPACK_IMPORTED_MODULE_0__.version, ")"), "react-instantsearch (".concat(_version_js__WEBPACK_IMPORTED_MODULE_2__["default"], ")"), "react-instantsearch-hooks (".concat(_version_js__WEBPACK_IMPORTED_MODULE_2__["default"], ")")];
var serverUserAgent = "react-instantsearch-server (".concat(_version_js__WEBPACK_IMPORTED_MODULE_2__["default"], ")");
function useInstantSearchApi(props) {
  var forceUpdate = (0,_useForceUpdate_js__WEBPACK_IMPORTED_MODULE_3__.useForceUpdate)();
  var serverContext = (0,_useInstantSearchServerContext_js__WEBPACK_IMPORTED_MODULE_4__.useInstantSearchServerContext)();
  var serverState = (0,_useInstantSearchSSRContext_js__WEBPACK_IMPORTED_MODULE_5__.useInstantSearchSSRContext)();
  var initialResults = serverState === null || serverState === void 0 ? void 0 : serverState.initialResults;
  var prevPropsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(props);
  var searchRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  // As we need to render on mount with SSR, using the local ref above in `StrictMode` will
  // create and start two instances of InstantSearch. To avoid this, we instead discard it and use
  // an upward ref from `InstantSearchSSRContext` as it has already been mounted a second time at this point.
  if (serverState) {
    searchRef = serverState.ssrSearchRef;
  }
  if (searchRef.current === null) {
    // We don't use the `instantsearch()` function because it comes with other
    // top-level APIs that we don't need.
    // See https://github.com/algolia/instantsearch.js/blob/5b529f43d8acc680f85837eaaa41f7fd03a3f833/src/index.es.ts#L63-L86
    var search = new instantsearch_js_es_lib_InstantSearch_js__WEBPACK_IMPORTED_MODULE_6__["default"](props);
    search._schedule = function _schedule(cb) {
      search._schedule.queue.push(cb);
      clearTimeout(search._schedule.timer);
      search._schedule.timer = setTimeout(function () {
        search._schedule.queue.forEach(function (callback) {
          callback();
        });
        search._schedule.queue = [];
      }, 0);
    };
    search._schedule.queue = [];
    if (serverContext || initialResults) {
      // InstantSearch.js has a private Initial Results API that lets us inject
      // results on the search instance.
      // On the server, we default the initial results to an empty object so that
      // InstantSearch.js doesn't schedule a search that isn't used, leading to
      // an additional network request. (This is equivalent to monkey-patching
      // `scheduleSearch` to a noop.)
      search._initialResults = initialResults || {};
    }
    addAlgoliaAgents(props.searchClient, [].concat(defaultUserAgents, [serverContext && serverUserAgent]));

    // On the server, we start the search early to compute the search parameters.
    // On SSR, we start the search early to directly catch up with the lifecycle
    // and render.
    if (serverContext || initialResults) {
      search.start();
    }
    if (serverContext) {
      // We notify `getServerState()` of the InstantSearch internals to retrieve
      // the server state and pass it to the render on SSR.
      serverContext.notifyServer({
        search: search
      });
    }
    warnNextRouter(props.routing);
    searchRef.current = search;
  }
  {
    var _search = searchRef.current;
    var prevProps = prevPropsRef.current;
    if (prevProps.indexName !== props.indexName) {
      _search.helper.setIndex(props.indexName).search();
      prevPropsRef.current = props;
    }
    if (prevProps.searchClient !== props.searchClient) {
       true ? (0,_warn_js__WEBPACK_IMPORTED_MODULE_7__.warn)(false, 'The `searchClient` prop of `<InstantSearch>` changed between renders, which may cause more search requests than necessary. If this is an unwanted behavior, please provide a stable reference: https://www.algolia.com/doc/api-reference/widgets/instantsearch/react-hooks/#widget-param-searchclient') : 0;
      addAlgoliaAgents(props.searchClient, [].concat(defaultUserAgents, [serverContext && serverUserAgent]));
      _search.mainHelper.setClient(props.searchClient).search();
      prevPropsRef.current = props;
    }
    if (prevProps.onStateChange !== props.onStateChange) {
      _search.onStateChange = props.onStateChange;
      prevPropsRef.current = props;
    }
    if (prevProps.searchFunction !== props.searchFunction) {
      // Updating the `searchFunction` to `undefined` is not supported by
      // InstantSearch.js, so it will throw an error.
      // This is a fair behavior until we add an update API in InstantSearch.js.
      _search._searchFunction = props.searchFunction;
      prevPropsRef.current = props;
    }
    if (prevProps.stalledSearchDelay !== props.stalledSearchDelay) {
      var _props$stalledSearchD;
      // The default `stalledSearchDelay` in InstantSearch.js is 200ms.
      // We need to reset it when it's undefined to get back to the original value.
      _search._stalledSearchDelay = (_props$stalledSearchD = props.stalledSearchDelay) !== null && _props$stalledSearchD !== void 0 ? _props$stalledSearchD : 200;
      prevPropsRef.current = props;
    }

    // Updating the `routing` prop is not supported because InstantSearch.js
    // doesn't let us change it. This might not be a problem though, because `routing`
    // shouldn't need to be dynamic.
    // If we find scenarios where `routing` needs to change, we can always expose
    // it privately on the InstantSearch instance. Another way would be to
    // manually inject the routing middleware in this library, and not rely
    // on the provided `routing` prop.
  }

  var cleanupTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var store = (0,use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore)((0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var search = searchRef.current;

    // Scenario 1: the component mounts.
    if (cleanupTimerRef.current === null) {
      // On SSR, the instance is already started so we don't start it again.
      if (!search.started) {
        search.start();
        forceUpdate();
      }
    }
    // Scenario 2: the component updates.
    else {
      // We cancel the previous cleanup function because we don't want to
      // dispose the search during an update.
      clearTimeout(cleanupTimerRef.current);
      search._preventWidgetCleanup = false;
    }
    return function () {
      function cleanup() {
        search.dispose();
      }
      clearTimeout(search._schedule.timer);
      // We clean up only when the component that uses this subscription unmounts,
      // but not when it updates, because it would dispose the instance, which
      // would remove all the widgets and break routing.
      // Executing the cleanup function in a `setTimeout()` lets us cancel it
      // in the next effect.
      // (There might be better ways to do this.)
      cleanupTimerRef.current = setTimeout(cleanup);

      // We need to prevent the `useWidget` cleanup function so that widgets
      // are not removed before the instance is disposed, triggering
      // an unwanted search request.
      search._preventWidgetCleanup = true;
    };
  }, [forceUpdate]), function () {
    return searchRef.current;
  }, function () {
    return searchRef.current;
  });
  return store;
}
function addAlgoliaAgents(searchClient, userAgents) {
  if (typeof searchClient.addAlgoliaAgent !== 'function') {
    return;
  }
  userAgents.filter(Boolean).forEach(function (userAgent) {
    searchClient.addAlgoliaAgent(userAgent);
  });
}
function warnNextRouter(routing) {
  if (true) {
    var _routing$router;
    if (!routing || typeof window === 'undefined' || !('__NEXT_DATA__' in window)) {
      return;
    }
    var isUsingNextRouter =
    // @ts-expect-error: _isNextRouter is only set on the Next.js router
    routing !== true && (routing === null || routing === void 0 ? void 0 : (_routing$router = routing.router) === null || _routing$router === void 0 ? void 0 : _routing$router._isNextRouter);
     true ? (0,_warn_js__WEBPACK_IMPORTED_MODULE_7__.warn)(isUsingNextRouter, "\nYou are using Next.js with InstantSearch without the \"react-instantsearch-hooks-router-nextjs\" package.\nThis package is recommended to make the routing work correctly with Next.js.\nPlease check its usage instructions: https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch-hooks-router-nextjs\n\nYou can ignore this warning if you are using a custom router that suits your needs, it won't be outputted in production builds.") : 0;
  }
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchContext.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchContext.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useInstantSearchContext": () => (/* binding */ useInstantSearchContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _invariant_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./invariant.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/invariant.js");
/* harmony import */ var _InstantSearchContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InstantSearchContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/InstantSearchContext.js");



function useInstantSearchContext() {
  var search = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_InstantSearchContext_js__WEBPACK_IMPORTED_MODULE_1__.InstantSearchContext);
  (0,_invariant_js__WEBPACK_IMPORTED_MODULE_2__.invariant)(search !== null, 'Hooks must be used inside the <InstantSearch> component.\n\n' + 'They are not compatible with the `react-instantsearch-core` and `react-instantsearch-dom` packages, so make sure to use the <InstantSearch> component from `react-instantsearch-hooks`.');
  return search;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchSSRContext.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchSSRContext.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useInstantSearchSSRContext": () => (/* binding */ useInstantSearchSSRContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _InstantSearchSSRContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InstantSearchSSRContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/InstantSearchSSRContext.js");


function useInstantSearchSSRContext() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_InstantSearchSSRContext_js__WEBPACK_IMPORTED_MODULE_1__.InstantSearchSSRContext);
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchServerContext.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchServerContext.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useInstantSearchServerContext": () => (/* binding */ useInstantSearchServerContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _components_InstantSearchServerContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/InstantSearchServerContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/components/InstantSearchServerContext.js");


function useInstantSearchServerContext() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_InstantSearchServerContext_js__WEBPACK_IMPORTED_MODULE_1__.InstantSearchServerContext);
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIsomorphicLayoutEffect.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useIsomorphicLayoutEffect.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useIsomorphicLayoutEffect": () => (/* binding */ useIsomorphicLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


/**
 * `useLayoutEffect` that doesn't show a warning when server-side rendering.
 *
 * It uses `useEffect` on the server (no-op), and `useLayoutEffect` on the browser.
 */
var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useSearchResults.js":
/*!********************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useSearchResults.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useSearchResults": () => (/* binding */ useSearchResults)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _getIndexSearchResults_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getIndexSearchResults.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/getIndexSearchResults.js");
/* harmony import */ var _useIndexContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useIndexContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIndexContext.js");
/* harmony import */ var _useInstantSearchContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useInstantSearchContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




function useSearchResults() {
  var search = (0,_useInstantSearchContext_js__WEBPACK_IMPORTED_MODULE_1__.useInstantSearchContext)();
  var searchIndex = (0,_useIndexContext_js__WEBPACK_IMPORTED_MODULE_2__.useIndexContext)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
      return (0,_getIndexSearchResults_js__WEBPACK_IMPORTED_MODULE_3__.getIndexSearchResults)(searchIndex);
    }),
    _useState2 = _slicedToArray(_useState, 2),
    searchResults = _useState2[0],
    setSearchResults = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    function handleRender() {
      var results = searchIndex.getResults();

      // Results can be `null` when the first search is stalled.
      // In this case, we skip the update.
      // See: https://github.com/algolia/instantsearch.js/blob/20996c7a159988c58e00ff24d2d2dc98af8b980f/src/widgets/index/index.ts#L652-L657
      if (results !== null) {
        setSearchResults({
          results: results,
          scopedResults: searchIndex.getScopedResults()
        });
      }
    }
    search.addListener('render', handleRender);
    return function () {
      search.removeListener('render', handleRender);
    };
  }, [search, searchIndex]);
  return searchResults;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useSearchState.js":
/*!******************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useSearchState.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useSearchState": () => (/* binding */ useSearchState)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _useIndexContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useIndexContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIndexContext.js");
/* harmony import */ var _useInstantSearchContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useInstantSearchContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function useSearchState() {
  var search = (0,_useInstantSearchContext_js__WEBPACK_IMPORTED_MODULE_1__.useInstantSearchContext)();
  var searchIndex = (0,_useIndexContext_js__WEBPACK_IMPORTED_MODULE_2__.useIndexContext)();
  var indexId = searchIndex.getIndexId();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
      return search.getUiState();
    }),
    _useState2 = _slicedToArray(_useState, 2),
    uiState = _useState2[0],
    setLocalUiState = _useState2[1];
  var indexUiState = uiState[indexId];
  var setUiState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (nextUiState) {
    search.setUiState(nextUiState);
  }, [search]);
  var setIndexUiState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (nextIndexUiState) {
    searchIndex.setIndexUiState(nextIndexUiState);
  }, [searchIndex]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    function handleRender() {
      setLocalUiState(search.getUiState());
    }
    search.addListener('render', handleRender);
    return function () {
      search.removeListener('render', handleRender);
    };
  }, [search]);
  return {
    uiState: uiState,
    setUiState: setUiState,
    indexUiState: indexUiState,
    setIndexUiState: setIndexUiState
  };
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useStableValue.js":
/*!******************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useStableValue.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useStableValue": () => (/* binding */ useStableValue)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _dequal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dequal.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/dequal.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function useStableValue(value) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
      return value;
    }),
    _useState2 = _slicedToArray(_useState, 2),
    stableValue = _useState2[0],
    setStableValue = _useState2[1];
  if (!(0,_dequal_js__WEBPACK_IMPORTED_MODULE_1__.dequal)(stableValue, value)) {
    setStableValue(value);
  }
  return stableValue;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/useWidget.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/useWidget.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useWidget": () => (/* binding */ useWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _dequal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dequal.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/dequal.js");
/* harmony import */ var _useInstantSearchContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useInstantSearchContext.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useInstantSearchContext.js");
/* harmony import */ var _useIsomorphicLayoutEffect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useIsomorphicLayoutEffect.js */ "./node_modules/react-instantsearch-hooks/dist/es/lib/useIsomorphicLayoutEffect.js");




function useWidget(_ref) {
  var widget = _ref.widget,
    parentIndex = _ref.parentIndex,
    props = _ref.props,
    shouldSsr = _ref.shouldSsr;
  var prevPropsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(props);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    prevPropsRef.current = props;
  }, [props]);
  var prevWidgetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(widget);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    prevWidgetRef.current = widget;
  }, [widget]);
  var cleanupTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var shouldAddWidgetEarly = shouldSsr && !parentIndex.getWidgets().includes(widget);
  var search = (0,_useInstantSearchContext_js__WEBPACK_IMPORTED_MODULE_1__.useInstantSearchContext)();

  // This effect is responsible for adding, removing, and updating the widget.
  // We need to support scenarios where the widget is remounted quickly, like in
  // Strict Mode, so that we don't lose its state, and therefore that we don't
  // break routing.
  (0,_useIsomorphicLayoutEffect_js__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(function () {
    var previousWidget = prevWidgetRef.current;

    // Scenario 1: the widget is added for the first time.
    if (!cleanupTimerRef.current) {
      if (!shouldAddWidgetEarly) {
        parentIndex.addWidgets([widget]);
      }
    }
    // Scenario 2: the widget is rerendered or updated.
    else {
      // We cancel the original effect cleanup because it may not be necessary if
      // props haven't changed. (We manually call it if it is below.)
      clearTimeout(cleanupTimerRef.current);

      // Warning: if an unstable function prop is provided, `dequal` is not able
      // to keep its reference and therefore will consider that props did change.
      // This could unsollicitely remove/add the widget, therefore forget its state,
      // and could be a source of confusion.
      // If users face this issue, we should advise them to provide stable function
      // references.
      var arePropsEqual = (0,_dequal_js__WEBPACK_IMPORTED_MODULE_3__.dequal)(props, prevPropsRef.current);

      // If props did change, then we execute the cleanup function instantly
      // and then add the widget back. This lets us add the widget without
      // waiting for the scheduled cleanup function to finish (that we canceled
      // above).
      if (!arePropsEqual) {
        parentIndex.removeWidgets([previousWidget]);
        parentIndex.addWidgets([widget]);
      }
    }
    return function () {
      // We don't remove the widget right away, but rather schedule it so that
      // we're able to cancel it in the next effect.
      cleanupTimerRef.current = setTimeout(function () {
        search._schedule(function () {
          if (search._preventWidgetCleanup) return;
          parentIndex.removeWidgets([previousWidget]);
        });
      });
    };
  }, [parentIndex, widget, shouldAddWidgetEarly, search, props]);
  if (shouldAddWidgetEarly) {
    parentIndex.addWidgets([widget]);
  }
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/lib/warn.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/lib/warn.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "warn": () => (/* binding */ warn),
/* harmony export */   "warnCache": () => (/* binding */ warnCache)
/* harmony export */ });
/* eslint-disable no-console, no-empty */

var warnCache = {
  current: {}
};

/**
 * Logs a warning if the condition is not met.
 * This is used to log issues in development environment only.
 */
function warn(condition, message) {
  if (false) {}
  if (condition) {
    return;
  }
  var sanitizedMessage = message.trim();
  var hasAlreadyPrinted = warnCache.current[sanitizedMessage];
  if (!hasAlreadyPrinted) {
    warnCache.current[sanitizedMessage] = true;
    var warning = "[InstantSearch] ".concat(sanitizedMessage);
    console.warn(warning);
    try {
      // Welcome to debugging InstantSearch.
      //
      // This error was thrown as a convenience so that you can find the source
      // of the warning that appears in the console by enabling "Pause on exceptions"
      // in your debugger.
      throw new Error(warning);
    } catch (error) {}
  }
}

/***/ }),

/***/ "./node_modules/react-instantsearch-hooks/dist/es/version.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-instantsearch-hooks/dist/es/version.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('6.38.1');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map