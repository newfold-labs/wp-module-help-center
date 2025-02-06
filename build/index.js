/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@newfold-labs/wp-module-ai/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@newfold-labs/wp-module-ai/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _lib_moduleAI__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _lib_moduleAI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/moduleAI */ "./node_modules/@newfold-labs/wp-module-ai/lib/moduleAI.js");





/***/ }),

/***/ "./node_modules/@newfold-labs/wp-module-ai/lib/core/AISearch.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@newfold-labs/wp-module-ai/lib/core/AISearch.js ***!
  \**********************************************************************/
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
  getSearchResult: (userPrompt, identifier, extra) =>
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: base + "/search",
      method: "POST",
      data: {
        user_prompt: userPrompt,
        identifier: identifier,
        extra: extra,
      },
    }),
  getDefaultSearchResult: () => _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: base + "/search/default",
    method: "POST",
  })
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AISearch);


/***/ }),

/***/ "./node_modules/@newfold-labs/wp-module-ai/lib/moduleAI.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@newfold-labs/wp-module-ai/lib/moduleAI.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_AISearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/AISearch */ "./node_modules/@newfold-labs/wp-module-ai/lib/core/AISearch.js");


const moduleAI = {
    search: _core_AISearch__WEBPACK_IMPORTED_MODULE_0__["default"],
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moduleAI);


/***/ }),

/***/ "./node_modules/@newfold/js-utility-ui-analytics/build/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@newfold/js-utility-ui-analytics/build/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{HiiveAnalytics:()=>y,HiiveEvent:()=>s});var n={};e.r(n),e.d(n,{initializeNamespace:()=>r,updateHiiveDebounceInstance:()=>v,updateHiiveDebounceTime:()=>l,updateHiiveEventsQueue:()=>o,updateHiiveEventsQueueThreshold:()=>d,updateHiiveUrls:()=>u});var i={};e.r(i),e.d(i,{getHiiveBatchUrl:()=>m,getHiiveDebounce:()=>H,getHiiveEventsQueue:()=>p,getHiiveEventsQueueThreshold:()=>h,getHiiveSingleUrl:()=>E});const a=window.wp.data;class s{constructor(e,t,n,i){this.category=e,this.action=t,this.data=n,this.namespace=i}}const c={urls:{single:void 0,batch:void 0},queue:{events:[],threshold:100},debounce:{time:void 0,instance:void 0}};function r(e){return{type:"INITIALIZE_NAMESPACE",namespace:e}}function u(e,t){return{type:"UPDATE_HIIVE_URLS",urls:e,namespace:t}}function o(e,t){return{type:"UPDATE_HIIVE_EVENTS_QUEUE",events:e,namespace:t}}function d(e,t){return{type:"UPDATE_HIIVE_EVENTS_QUEUE_THRESHOLD",threshold:e,namespace:t}}function l(e,t){return{type:"UPDATE_HIIVE_DEBOUNCE_TIME",debounceTime:e,namespace:t}}function v(e,t){return{type:"UPDATE_HIIVE_DEBOUNCE_INSTANCE",instance:e,namespace:t}}function p(e,t){return e.hiive[t]?.queue.events}function h(e,t){return e.hiive[t]?.queue.threshold}function E(e,t){return e.hiive[t]?.urls.single}function m(e,t){return e.hiive[t]?.urls.batch}function H(e,t){return e.hiive[t]?.debounce}const I={reducer:(0,a.combineReducers)({hiive:(e,t)=>{switch(t.type){case"INITIALIZE_NAMESPACE":return{...e,[t.namespace]:c};case"UPDATE_HIIVE_URLS":return{...e,[t.namespace]:{...e[t.namespace],urls:{single:t.urls.single,batch:t.urls.batch}}};case"UPDATE_HIIVE_EVENTS_QUEUE":return{...e,[t.namespace]:{...e[t.namespace],queue:{events:t.events,threshold:e[t.namespace].queue.threshold}}};case"UPDATE_HIIVE_EVENTS_QUEUE_THRESHOLD":return{...e,[t.namespace]:{...e[t.namespace],queue:{events:e[t.namespace].queue.events,threshold:t.threshold}}};case"UPDATE_HIIVE_DEBOUNCE_TIME":return{...e,[t.namespace]:{...e[t.namespace],debounce:{time:t.debounceTime,instance:e[t.namespace].debounce.instance}}};case"UPDATE_HIIVE_DEBOUNCE_INSTANCE":return{...e,[t.namespace]:{...e[t.namespace],debounce:{time:e[t.namespace].debounce.time,instance:t.instance}}}}return e}}),actions:n,selectors:i},_=(0,a.createReduxStore)("newfold/ui-analytics",I);(0,a.register)(_);const b=window.wp.apiFetch;var T=e.n(b);const f=e=>!!window?.nfdUIAnalytics?.hiive&&e in window.nfdUIAnalytics.hiive,U=e=>e instanceof s,g=async e=>{if(!e||!f(e))return!1;const t=(0,a.select)(_).getHiiveBatchUrl(e);if(!t)return!1;const n=(0,a.select)(_).getHiiveEventsQueue(e);if(0===n.length)return!0;(0,a.dispatch)(_).updateHiiveEventsQueue([],e);try{await T()({url:t,method:"POST",data:n})}catch(t){console.error(t),(0,a.dispatch)(_).updateHiiveEventsQueue(n,e)}return!0},y={initialize:async({namespace:e,urls:{single:t,batch:n}={},settings:{debounce:{time:i}={},queue:{threshold:s=100}={}}={}})=>!(!e||!f(e)&&(!t&&!n||((0,a.dispatch)(_).initializeNamespace(e),(0,a.dispatch)(_).updateHiiveUrls({single:t,batch:n},e),(0,a.dispatch)(_).updateHiiveDebounceTime(i,e),(0,a.dispatch)(_).updateHiiveEventsQueueThreshold(s,e),window.nfdUIAnalytics?.hiive?window.nfdUIAnalytics.hiive[e]=!0:window.nfdUIAnalytics={hiive:{[e]:!0}},0))),initialized:f,validate:U,track:e=>{if(!U(e)||!f(e.namespace))return!1;const t=e.namespace;delete e.namespace;const n=(0,a.select)(_).getHiiveEventsQueue(t);n.push(e),(0,a.dispatch)(_).updateHiiveEventsQueue(n,t);const i=(0,a.select)(_).getHiiveEventsQueueThreshold(t);return i&&i<n.length&&g(t),(e=>{if(!e)return!1;const t=(0,a.select)(_).getHiiveDebounce(e);!!t.time&&(clearInterval(t.instance),(0,a.dispatch)(_).updateHiiveDebounceInstance(setTimeout((()=>{g(e),(0,a.dispatch)(_).updateHiiveDebounceInstance(void 0,e)}),t.time),e))})(t),!0},send:async e=>{if(!U(e)||!f(e.namespace))return!1;const t=e.namespace;delete e.namespace;const n=(0,a.select)(_).getHiiveSingleUrl(t);if(!n)return!1;try{await T()({url:n,method:"POST",data:e})}catch(e){return console.error(e),!1}},dispatchEvents:g,disableDebounce:e=>{if(!e)return!1;const t=(0,a.select)(_).getHiiveDebounce(e);return t.instance&&(clearInterval(t.instance),(0,a.dispatch)(_).updateHiiveDebounceInstance(void 0,e),(0,a.dispatch)(_).updateHiiveDebounceTime(void 0,e)),!0}};var D=exports;for(var A in t)D[A]=t[A];t.__esModule&&Object.defineProperty(D,"__esModule",{value:!0})})();

/***/ }),

/***/ "./src/icons/ai-stars.svg":
/*!********************************!*\
  !*** ./src/icons/ai-stars.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgAiStars),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgAiStars = function SvgAiStars(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 22,
    height: 22,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#330A55",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M8.563 14.904 7.75 17.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L1 11l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L7.75 4.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L14.5 11l-2.846.813a4.5 4.5 0 0 0-3.09 3.09M17.009 7.715 16.75 8.75l-.259-1.035a3.38 3.38 0 0 0-2.455-2.456L13 5l1.036-.259a3.38 3.38 0 0 0 2.455-2.456l.259-1.035.259 1.035a3.38 3.38 0 0 0 2.456 2.456L20.5 5l-1.035.259a3.38 3.38 0 0 0-2.456 2.456M15.644 19.567l-.394 1.183-.394-1.183a2.25 2.25 0 0 0-1.423-1.423l-1.183-.394 1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguNTYzMiAxNC45MDM4TDcuNzUgMTcuNzVMNi45MzY4IDE0LjkwMzhDNi41MDk2OCAxMy40MDg5IDUuMzQxMTIgMTIuMjQwMyAzLjg0NjE5IDExLjgxMzJMMSAxMUwzLjg0NjE5IDEwLjE4NjhDNS4zNDExMyA5Ljc1OTY4IDYuNTA5NjggOC41OTExMiA2LjkzNjggNy4wOTYxOUw3Ljc1IDQuMjVMOC41NjMyIDcuMDk2MTlDOC45OTAzMiA4LjU5MTEzIDEwLjE1ODkgOS43NTk2OCAxMS42NTM4IDEwLjE4NjhMMTQuNSAxMUwxMS42NTM4IDExLjgxMzJDMTAuMTU4OSAxMi4yNDAzIDguOTkwMzIgMTMuNDA4OSA4LjU2MzIgMTQuOTAzOFoiIHN0cm9rZT0iIzMzMEE1NSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTcuMDA4OSA3LjcxNDU0TDE2Ljc1IDguNzVMMTYuNDkxMSA3LjcxNDU0QzE2LjE4ODggNi41MDUzMyAxNS4yNDQ3IDUuNTYxMTcgMTQuMDM1NSA1LjI1ODg3TDEzIDVMMTQuMDM1NSA0Ljc0MTEzQzE1LjI0NDcgNC40Mzg4MyAxNi4xODg4IDMuNDk0NjcgMTYuNDkxMSAyLjI4NTQ2TDE2Ljc1IDEuMjVMMTcuMDA4OSAyLjI4NTQ2QzE3LjMxMTIgMy40OTQ2NyAxOC4yNTUzIDQuNDM4ODMgMTkuNDY0NSA0Ljc0MTEzTDIwLjUgNUwxOS40NjQ1IDUuMjU4ODdDMTguMjU1MyA1LjU2MTE3IDE3LjMxMTIgNi41MDUzMyAxNy4wMDg5IDcuNzE0NTRaIiBzdHJva2U9IiMzMzBBNTUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTE1LjY0NDIgMTkuNTY3M0wxNS4yNSAyMC43NUwxNC44NTU4IDE5LjU2NzNDMTQuNjMxOCAxOC44OTU0IDE0LjEwNDYgMTguMzY4MiAxMy40MzI3IDE4LjE0NDJMMTIuMjUgMTcuNzVMMTMuNDMyNyAxNy4zNTU4QzE0LjEwNDYgMTcuMTMxOCAxNC42MzE4IDE2LjYwNDYgMTQuODU1OCAxNS45MzI3TDE1LjI1IDE0Ljc1TDE1LjY0NDIgMTUuOTMyN0MxNS44NjgyIDE2LjYwNDYgMTYuMzk1NCAxNy4xMzE4IDE3LjA2NzMgMTcuMzU1OEwxOC4yNSAxNy43NUwxNy4wNjczIDE4LjE0NDJDMTYuMzk1NCAxOC4zNjgyIDE1Ljg2ODIgMTguODk1NCAxNS42NDQyIDE5LjU2NzNaIiBzdHJva2U9IiMzMzBBNTUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./src/icons/chat-bubble.svg":
/*!***********************************!*\
  !*** ./src/icons/chat-bubble.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgChatBubble),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgChatBubble = function SvgChatBubble(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#0F172A",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M7.188 8.125a.312.312 0 1 1-.625 0 .312.312 0 0 1 .625 0m0 0h-.313m3.438 0a.312.312 0 1 1-.625 0 .312.312 0 0 1 .624 0m0 0H10m3.438 0a.312.312 0 1 1-.625 0 .312.312 0 0 1 .624 0m0 0h-.313m-11.25 2.508c0 1.334.936 2.495 2.256 2.69q1.358.2 2.744.307v3.87l3.486-3.486a.95.95 0 0 1 .649-.276 40 40 0 0 0 4.859-.415c1.32-.194 2.256-1.356 2.256-2.69V5.617c0-1.334-.936-2.495-2.256-2.69A40 40 0 0 0 10 2.5c-1.994 0-3.953.146-5.869.428-1.32.194-2.256 1.355-2.256 2.69z"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuMTg3NSA4LjEyNUM3LjE4NzUgOC4yOTc1OSA3LjA0NzU5IDguNDM3NSA2Ljg3NSA4LjQzNzVDNi43MDI0MSA4LjQzNzUgNi41NjI1IDguMjk3NTkgNi41NjI1IDguMTI1QzYuNTYyNSA3Ljk1MjQxIDYuNzAyNDEgNy44MTI1IDYuODc1IDcuODEyNUM3LjA0NzU5IDcuODEyNSA3LjE4NzUgNy45NTI0MSA3LjE4NzUgOC4xMjVaTTcuMTg3NSA4LjEyNUg2Ljg3NU0xMC4zMTI1IDguMTI1QzEwLjMxMjUgOC4yOTc1OSAxMC4xNzI2IDguNDM3NSAxMCA4LjQzNzVDOS44Mjc0MSA4LjQzNzUgOS42ODc1IDguMjk3NTkgOS42ODc1IDguMTI1QzkuNjg3NSA3Ljk1MjQxIDkuODI3NDEgNy44MTI1IDEwIDcuODEyNUMxMC4xNzI2IDcuODEyNSAxMC4zMTI1IDcuOTUyNDEgMTAuMzEyNSA4LjEyNVpNMTAuMzEyNSA4LjEyNUgxME0xMy40Mzc1IDguMTI1QzEzLjQzNzUgOC4yOTc1OSAxMy4yOTc2IDguNDM3NSAxMy4xMjUgOC40Mzc1QzEyLjk1MjQgOC40Mzc1IDEyLjgxMjUgOC4yOTc1OSAxMi44MTI1IDguMTI1QzEyLjgxMjUgNy45NTI0MSAxMi45NTI0IDcuODEyNSAxMy4xMjUgNy44MTI1QzEzLjI5NzYgNy44MTI1IDEzLjQzNzUgNy45NTI0MSAxMy40Mzc1IDguMTI1Wk0xMy40Mzc1IDguMTI1SDEzLjEyNU0xLjg3NSAxMC42MzI4QzEuODc1IDExLjk2NyAyLjgxMTE4IDEzLjEyODQgNC4xMzEyMiAxMy4zMjI1QzUuMDM2MzEgMTMuNDU1NSA1Ljk1MTI2IDEzLjU1ODMgNi44NzUgMTMuNjI5N1YxNy41TDEwLjM2MTIgMTQuMDEzOEMxMC41MzM1IDEzLjg0MTUgMTAuNzY2MSAxMy43NDM1IDExLjAwOTcgMTMuNzM3NUMxMi42NTYgMTMuNjk2NyAxNC4yNzc2IDEzLjU1NjUgMTUuODY4NyAxMy4zMjI2QzE3LjE4ODggMTMuMTI4NSAxOC4xMjUgMTEuOTY3MSAxOC4xMjUgMTAuNjMyOVY1LjYxNzEzQzE4LjEyNSA0LjI4Mjg4IDE3LjE4ODggMy4xMjE1MiAxNS44Njg3IDIuOTI3NDVDMTMuOTUzNCAyLjY0NTg0IDExLjk5MzggMi41IDEwLjAwMDIgMi41QzguMDA2NDcgMi41IDYuMDQ2NzYgMi42NDU4NyA0LjEzMTIyIDIuOTI3NTJDMi44MTExOCAzLjEyMTYxIDEuODc1IDQuMjgyOTcgMS44NzUgNS42MTcyVjEwLjYzMjhaIiBzdHJva2U9IiMwRjE3MkEiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./src/icons/close.svg":
/*!*****************************!*\
  !*** ./src/icons/close.svg ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgClose),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _g, _defs;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgClose = function SvgClose(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none"
  }, props), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    clipPath: "url(#close_svg__a)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    clipPath: "url(#close_svg__b)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#1E1E1E",
    fillRule: "evenodd",
    d: "m12 13.06 3.712 3.713 1.06-1.06L13.06 12l3.713-3.712-1.061-1.06-3.713 3.711-3.712-3.712-1.06 1.06L10.939 12l-3.712 3.712 1.06 1.061z",
    clipRule: "evenodd"
  })))), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "close_svg__a"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    width: 24,
    height: 24,
    fill: "#fff",
    rx: 2
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "close_svg__b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    width: 24,
    height: 24,
    fill: "#fff",
    rx: 2
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
/* harmony export */   ReactComponent: () => (/* binding */ SvgGo),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgGo = function SvgGo(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlSpace: "preserve",
    width: 12,
    height: 12,
    fill: "#1D1D1F",
    stroke: "#394150",
    viewBox: "-13.63 -13.63 254.36 254.36"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    d: "m152.835 39.285-5.902 5.898 64.18 64.19H0v8.35h211.124l-64.191 64.179 5.902 5.909 74.261-74.261z",
    style: {
      fill: "#010002"
    }
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEycHgiIHdpZHRoPSIxMnB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iLTEzLjYzIC0xMy42MyAyNTQuMzYgMjU0LjM2IgogICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgZmlsbD0iIzFEMUQxRiIgc3Ryb2tlPSIjMzk0MTUwIj48ZyBpZD0iU1ZHUmVwb19iZ0NhcnJpZXIiIHN0cm9rZS13aWR0aD0iMCI+PC9nPjxnIGlkPSJTVkdSZXBvX3RyYWNlckNhcnJpZXIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9nPjxnIGlkPSJTVkdSZXBvX2ljb25DYXJyaWVyIj4gPGc+IDxnPiA8cG9seWdvbiBzdHlsZT0iZmlsbDojMDEwMDAyOyIgcG9pbnRzPSIxNTIuODM1LDM5LjI4NSAxNDYuOTMzLDQ1LjE4MyAyMTEuMTEzLDEwOS4zNzMgMCwxMDkuMzczIDAsMTE3LjcyMyAyMTEuMTI0LDExNy43MjMgMTQ2LjkzMywxODEuOTAyIDE1Mi44MzUsMTg3LjgxMSAyMjcuMDk2LDExMy41NSAiPjwvcG9seWdvbj4gPC9nPiA8L2c+IDwvZz48L3N2Zz4=");

/***/ }),

/***/ "./src/icons/help-plugin-sidebar-icon.svg":
/*!************************************************!*\
  !*** ./src/icons/help-plugin-sidebar-icon.svg ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgHelpPluginSidebarIcon),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgHelpPluginSidebarIcon = function SvgHelpPluginSidebarIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 22,
    height: 22,
    style: {
      verticalAlign: "middle",
      cursor: "pointer"
    },
    viewBox: "0 1 36 37"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    d: "M18 .902c-9.941 0-18 8.059-18 18s8.059 18 18 18h15.366A2.634 2.634 0 0 0 36 34.268V18.902c0-9.941-8.059-18-18-18m-.913 17.877q-.504.883-.504 2.092v.832h3.326v-.404q0-.881.303-1.461.327-.58 1.184-1.386 1.084-1.033 1.638-1.966.555-.932.555-2.243 0-1.335-.706-2.419-.68-1.109-1.915-1.739t-2.823-.63q-2.116 0-3.528 1.185-1.386 1.16-1.864 2.772l2.898 1.21a3.3 3.3 0 0 1 .907-1.462q.655-.605 1.663-.605.957 0 1.537.555.58.529.58 1.31 0 .655-.353 1.16-.327.503-1.084 1.184-1.284 1.134-1.814 2.015m-.428 8.644q.654.63 1.562.63.907 0 1.537-.63.63-.655.63-1.562t-.63-1.538-1.537-.63-1.562.63q-.63.63-.63 1.538 0 .906.63 1.562",
    clipRule: "evenodd"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyBzdHlsZT0idmVydGljYWwtYWxpZ246IG1pZGRsZTsgY3Vyc29yOiBwb2ludGVyIiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMSAzNiAzNyIKICAgIGZpbGw9IiMwMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKICAgICAgICBkPSJNMTggMC45MDE4NTVDOC4wNTg4OCAwLjkwMTg1NSAwIDguOTYwNzMgMCAxOC45MDE5QzAgMjguODQzIDguMDU4ODggMzYuOTAxOSAxOCAzNi45MDE5SDMzLjM2NTlDMzQuODIwNyAzNi45MDE5IDM2IDM1LjcyMjUgMzYgMzQuMjY3N1YxOC45MDE5QzM2IDguOTYwNzMgMjcuOTQxMSAwLjkwMTg1NSAxOCAwLjkwMTg1NVpNMTcuMDg3IDE4Ljc3OTVDMTYuNzUxIDE5LjM2NzUgMTYuNTgzIDIwLjA2NDcgMTYuNTgzIDIwLjg3MTFWMjEuNzAyN0gxOS45MDk0VjIxLjI5OTVDMTkuOTA5NCAyMC43MTE1IDIwLjAxMDIgMjAuMjI0MyAyMC4yMTE4IDE5LjgzNzlDMjAuNDMwMiAxOS40NTE1IDIwLjgyNSAxOC45ODk1IDIxLjM5NjIgMTguNDUxOUMyMi4xMTg2IDE3Ljc2MzEgMjIuNjY0NiAxNy4xMDc5IDIzLjAzNDIgMTYuNDg2M0MyMy40MDM4IDE1Ljg2NDcgMjMuNTg4NiAxNS4xMTcxIDIzLjU4ODYgMTQuMjQzNUMyMy41ODg2IDEzLjM1MzEgMjMuMzUzNCAxMi41NDY3IDIyLjg4MyAxMS44MjQzQzIyLjQyOTQgMTEuMDg1MSAyMS43OTEgMTAuNTA1NSAyMC45Njc4IDEwLjA4NTVDMjAuMTQ0NiA5LjY2NTQ4IDE5LjIwMzggOS40NTU0OCAxOC4xNDU0IDkuNDU1NDhDMTYuNzM0MiA5LjQ1NTQ4IDE1LjU1ODIgOS44NTAyOCAxNC42MTc0IDEwLjYzOTlDMTMuNjkzNCAxMS40MTI3IDEzLjA3MTggMTIuMzM2NyAxMi43NTI2IDEzLjQxMTlMMTUuNjUwNiAxNC42MjE1QzE1LjgzNTQgMTQuMDMzNSAxNi4xMzc4IDEzLjU0NjMgMTYuNTU3OCAxMy4xNTk5QzE2Ljk5NDYgMTIuNzU2NyAxNy41NDkgMTIuNTU1MSAxOC4yMjEgMTIuNTU1MUMxOC44NTk0IDEyLjU1NTEgMTkuMzcxOCAxMi43Mzk5IDE5Ljc1ODIgMTMuMTA5NUMyMC4xNDQ2IDEzLjQ2MjMgMjAuMzM3OCAxMy44OTkxIDIwLjMzNzggMTQuNDE5OUMyMC4zMzc4IDE0Ljg1NjcgMjAuMjIwMiAxNS4yNDMxIDE5Ljk4NSAxNS41NzkxQzE5Ljc2NjYgMTUuOTE1MSAxOS40MDU0IDE2LjMwOTkgMTguOTAxNCAxNi43NjM1QzE4LjA0NDYgMTcuNTE5NSAxNy40Mzk4IDE4LjE5MTUgMTcuMDg3IDE4Ljc3OTVaTTE2LjY1ODYgMjcuNDIzMUMxNy4wOTU0IDI3Ljg0MzEgMTcuNjE2MiAyOC4wNTMxIDE4LjIyMSAyOC4wNTMxQzE4LjgyNTggMjguMDUzMSAxOS4zMzgyIDI3Ljg0MzEgMTkuNzU4MiAyNy40MjMxQzIwLjE3ODIgMjYuOTg2MyAyMC4zODgyIDI2LjQ2NTUgMjAuMzg4MiAyNS44NjA3QzIwLjM4ODIgMjUuMjU1OSAyMC4xNzgyIDI0Ljc0MzUgMTkuNzU4MiAyNC4zMjM1QzE5LjMzODIgMjMuOTAzNSAxOC44MjU4IDIzLjY5MzUgMTguMjIxIDIzLjY5MzVDMTcuNjE2MiAyMy42OTM1IDE3LjA5NTQgMjMuOTAzNSAxNi42NTg2IDI0LjMyMzVDMTYuMjM4NiAyNC43NDM1IDE2LjAyODYgMjUuMjU1OSAxNi4wMjg2IDI1Ljg2MDdDMTYuMDI4NiAyNi40NjU1IDE2LjIzODYgMjYuOTg2MyAxNi42NTg2IDI3LjQyMzFaIgogICAgICAgIC8+Cjwvc3ZnPg==");

/***/ }),

/***/ "./src/icons/helpcenter-icon.svg":
/*!***************************************!*\
  !*** ./src/icons/helpcenter-icon.svg ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgHelpcenterIcon),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgHelpcenterIcon = function SvgHelpcenterIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#394150",
    stroke: "#394150",
    d: "M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12v10.244c0 .694-.562 1.256-1.256 1.256H12C5.649 23.5.5 18.351.5 12Z"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11h9.39c.89 0 1.61-.72 1.61-1.61V12c0-6.075-4.925-11-11-11m-.609 10.918q-.336.588-.336 1.395v.554h2.218v-.269q0-.588.202-.974.217-.387.79-.924.721-.69 1.091-1.31.37-.622.37-1.496 0-.89-.47-1.612a3.13 3.13 0 0 0-1.277-1.16q-.824-.42-1.882-.42-1.41 0-2.352.79-.924.772-1.243 1.848l1.932.806q.185-.587.605-.974.435-.403 1.108-.403.64 0 1.025.37.387.352.386.873 0 .437-.235.773-.218.336-.722.79-.857.755-1.21 1.343m-.285 5.763q.436.42 1.041.42t1.025-.42q.42-.437.42-1.042t-.42-1.025-1.025-.42-1.041.42q-.42.42-.42 1.025 0 .604.42 1.042",
    clipRule: "evenodd"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkZyYW1lIDE1MTMxIj4KPHBhdGggaWQ9IlJlY3RhbmdsZSA5MTM4IiBkPSJNMC41IDEyQzAuNSA1LjY0ODczIDUuNjQ4NzMgMC41IDEyIDAuNUMxOC4zNTEzIDAuNSAyMy41IDUuNjQ4NzMgMjMuNSAxMlYyMi4yNDM5QzIzLjUgMjIuOTM3NiAyMi45Mzc2IDIzLjUgMjIuMjQzOSAyMy41SDEyQzUuNjQ4NzMgMjMuNSAwLjUgMTguMzUxMyAwLjUgMTJaIiBmaWxsPSIjMzk0MTUwIiBzdHJva2U9IiMzOTQxNTAiLz4KPHBhdGggaWQ9IlN1YnRyYWN0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDFDNS45MjQ4NyAxIDEgNS45MjQ4NyAxIDEyQzEgMTguMDc1MSA1LjkyNDg3IDIzIDEyIDIzSDIxLjM5MDJDMjIuMjc5MyAyMyAyMyAyMi4yNzkzIDIzIDIxLjM5MDJWMTJDMjMgNS45MjQ4NyAxOC4wNzUxIDEgMTIgMVpNMTEuMzkxMyAxMS45MTg0QzExLjE2NzMgMTIuMzEwNCAxMS4wNTUzIDEyLjc3NTIgMTEuMDU1MyAxMy4zMTI4VjEzLjg2NzJIMTMuMjcyOVYxMy41OTg0QzEzLjI3MjkgMTMuMjA2NCAxMy4zNDAxIDEyLjg4MTYgMTMuNDc0NSAxMi42MjRDMTMuNjIwMSAxMi4zNjY0IDEzLjg4MzMgMTIuMDU4NCAxNC4yNjQxIDExLjdDMTQuNzQ1NyAxMS4yNDA4IDE1LjEwOTcgMTAuODA0IDE1LjM1NjEgMTAuMzg5NkMxNS42MDI1IDkuOTc1MjIgMTUuNzI1NyA5LjQ3NjgyIDE1LjcyNTcgOC44OTQ0MkMxNS43MjU3IDguMzAwODIgMTUuNTY4OSA3Ljc2MzIyIDE1LjI1NTMgNy4yODE2MkMxNC45NTI5IDYuNzg4ODIgMTQuNTI3MyA2LjQwMjQyIDEzLjk3ODUgNi4xMjI0MkMxMy40Mjk3IDUuODQyNDIgMTIuODAyNSA1LjcwMjQyIDEyLjA5NjkgNS43MDI0MkMxMS4xNTYxIDUuNzAyNDIgMTAuMzcyMSA1Ljk2NTYyIDkuNzQ0OTQgNi40OTIwMkM5LjEyODkzIDcuMDA3MjIgOC43MTQ1MyA3LjYyMzIyIDguNTAxNzMgOC4zNDAwMkwxMC40MzM3IDkuMTQ2NDJDMTAuNTU2OSA4Ljc1NDQyIDEwLjc1ODUgOC40Mjk2MiAxMS4wMzg1IDguMTcyMDJDMTEuMzI5NyA3LjkwMzIyIDExLjY5OTMgNy43Njg4MiAxMi4xNDczIDcuNzY4ODJDMTIuNTcyOSA3Ljc2ODgyIDEyLjkxNDUgNy44OTIwMiAxMy4xNzIxIDguMTM4NDJDMTMuNDI5NyA4LjM3MzYyIDEzLjU1ODUgOC42NjQ4MiAxMy41NTg1IDkuMDEyMDJDMTMuNTU4NSA5LjMwMzIyIDEzLjQ4MDEgOS41NjA4MiAxMy4zMjMzIDkuNzg0ODJDMTMuMTc3NyAxMC4wMDg4IDEyLjkzNjkgMTAuMjcyIDEyLjYwMDkgMTAuNTc0NEMxMi4wMjk3IDExLjA3ODQgMTEuNjI2NSAxMS41MjY0IDExLjM5MTMgMTEuOTE4NFpNMTEuMTA1NyAxNy42ODA4QzExLjM5NjkgMTcuOTYwOCAxMS43NDQxIDE4LjEwMDggMTIuMTQ3MyAxOC4xMDA4QzEyLjU1MDUgMTguMTAwOCAxMi44OTIxIDE3Ljk2MDggMTMuMTcyMSAxNy42ODA4QzEzLjQ1MjEgMTcuMzg5NiAxMy41OTIxIDE3LjA0MjQgMTMuNTkyMSAxNi42MzkyQzEzLjU5MjEgMTYuMjM2IDEzLjQ1MjEgMTUuODk0NCAxMy4xNzIxIDE1LjYxNDRDMTIuODkyMSAxNS4zMzQ0IDEyLjU1MDUgMTUuMTk0NCAxMi4xNDczIDE1LjE5NDRDMTEuNzQ0MSAxNS4xOTQ0IDExLjM5NjkgMTUuMzM0NCAxMS4xMDU3IDE1LjYxNDRDMTAuODI1NyAxNS44OTQ0IDEwLjY4NTcgMTYuMjM2IDEwLjY4NTcgMTYuNjM5MkMxMC42ODU3IDE3LjA0MjQgMTAuODI1NyAxNy4zODk2IDExLjEwNTcgMTcuNjgwOFoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./src/icons/paper-airplane.svg":
/*!**************************************!*\
  !*** ./src/icons/paper-airplane.svg ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgPaperAirplane),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgPaperAirplane = function SvgPaperAirplane(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#7A889D",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M5 10 2.723 2.604A49.8 49.8 0 0 1 17.904 10a49.8 49.8 0 0 1-15.18 7.396zm0 0h6.25"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTk5NCAxMEwyLjcyMzYzIDIuNjAzNzZDOC4yMzYyNCA0LjIwNTE0IDEzLjM1NiA2LjczIDE3LjkwNDIgOS45OTk3OEMxMy4zNTYgMTMuMjY5NiA4LjIzNjMgMTUuNzk0NSAyLjcyMzcxIDE3LjM5Nkw0Ljk5OTQgMTBaTTQuOTk5NCAxMEwxMS4yNDk2IDEwIiBzdHJva2U9IiM3QTg4OUQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./src/icons/phone.svg":
/*!*****************************!*\
  !*** ./src/icons/phone.svg ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgPhone),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgPhone = function SvgPhone(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 17,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#0F172A",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "M1.688 4.563c0 6.213 5.036 11.25 11.25 11.25h1.687c.932 0 1.688-.756 1.688-1.688v-1.029a.844.844 0 0 0-.64-.818l-3.317-.83a.84.84 0 0 0-.88.313l-.727.97a.8.8 0 0 1-.907.285 9.03 9.03 0 0 1-5.358-5.358.8.8 0 0 1 .285-.907l.97-.727a.84.84 0 0 0 .313-.88l-.83-3.317a.844.844 0 0 0-.818-.64H3.375c-.932 0-1.687.756-1.687 1.688z"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxOCAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuNjg3NSA0LjU2MjVDMS42ODc1IDEwLjc3NTcgNi43MjQzIDE1LjgxMjUgMTIuOTM3NSAxNS44MTI1SDE0LjYyNUMxNS41NTcgMTUuODEyNSAxNi4zMTI1IDE1LjA1NyAxNi4zMTI1IDE0LjEyNVYxMy4wOTYzQzE2LjMxMjUgMTIuNzA5MSAxNi4wNDkgMTIuMzcxNiAxNS42NzM0IDEyLjI3NzdMMTIuMzU2IDExLjQ0ODRDMTIuMDI2NyAxMS4zNjYgMTEuNjggMTEuNDg5MSAxMS40NzY0IDExLjc2MDdMMTAuNzQ4NyAxMi43MzA5QzEwLjUzNzUgMTMuMDEyNSAxMC4xNzIzIDEzLjEzNyA5Ljg0MTc2IDEzLjAxNTlDNy4zNjE1NCAxMi4xMDc0IDUuMzkyNjIgMTAuMTM4NSA0LjQ4NDA3IDcuNjU4MjRDNC4zNjMgNy4zMjc3NCA0LjQ4NzUyIDYuOTYyNDkgNC43NjkxIDYuNzUxM0w1LjczOTMyIDYuMDIzNjRDNi4wMTA5IDUuODE5OTUgNi4xMzM5NiA1LjQ3MzM0IDYuMDUxNjIgNS4xNDRMNS4yMjIyOCAxLjgyNjYxQzUuMTI4MzggMS40NTEgNC43OTA4OSAxLjE4NzUgNC40MDM3MiAxLjE4NzVIMy4zNzVDMi40NDMwMiAxLjE4NzUgMS42ODc1IDEuOTQzMDIgMS42ODc1IDIuODc1VjQuNTYyNVoiIHN0cm9rZT0iIzBGMTcyQSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K");

/***/ }),

/***/ "./src/icons/user-avatar.svg":
/*!***********************************!*\
  !*** ./src/icons/user-avatar.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgUserAvatar),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _rect, _defs;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgUserAvatar = function SvgUserAvatar(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    width: 24,
    height: 24,
    fill: "none"
  }, props), _rect || (_rect = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("rect", {
    width: 24,
    height: 24,
    fill: "url(#user-avatar_svg__a)",
    rx: 2
  })), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pattern", {
    id: "user-avatar_svg__a",
    width: 1,
    height: 1,
    patternContentUnits: "objectBoundingBox"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", {
    xlinkHref: "#user-avatar_svg__b",
    transform: "scale(.0052)"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("image", {
    xlinkHref: "data:image/png;base64,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",
    id: "user-avatar_svg__b",
    width: 192,
    height: 192
  }))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgcng9IjIiIGZpbGw9InVybCgjcGF0dGVybjBfMjQ2XzEzNTQ0KSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wXzI0Nl8xMzU0NCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMjQ2XzEzNTQ0IiB0cmFuc2Zvcm09InNjYWxlKDAuMDA1MjA4MzMpIi8+CjwvcGF0dGVybj4KPGltYWdlIGlkPSJpbWFnZTBfMjQ2XzEzNTQ0IiB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFNQUFBQURBQ0FJQUFBRGR2dnRRQUFBQUFYTlNSMElBcnM0YzZRQUFBRVJsV0VsbVRVMEFLZ0FBQUFnQUFZZHBBQVFBQUFBQkFBQUFHZ0FBQUFBQUE2QUJBQU1BQUFBQkFBRUFBS0FDQUFRQUFBQUJBQUFBd0tBREFBUUFBQUFCQUFBQXdBQUFBQUJOT3puS0FBQWdBVWxFUVZSNEFlM2Q2YmJzUnJFdDRHTnM0TkIzeHNiWXh0dVlZUWJ2L3d4K0EvaEJOMHhqMHh5RDZYdXc3N2ZXM0lSMVZjcGFwYXBVU2JXMzhvZFdLcFFaR1RGalptUktwVlgxekZ0dnZmVS9lOWtST0JlQmo1M2JjZSszSTNDSHdFNmduUWNYSWJBVDZDTDQ5czQ3Z1hZT1hJVEFUcUNMNE5zNzd3VGFPWEFSQWp1QkxvSnY3L3pjMWlENDhNTVB0MmJTYnM4UkJQWU1kQVNjL2RMRENPd0VlaGlqdmNVUkJEYTNoRDN6ekROSHpOMHZiUTJCUFFOdExTSTNaczlPb0JzTDJOYk0zUW0wdFlqY21EMDdnVzRzWUZzemR5ZlExaUp5WS9aczdpN3N4dkE3TUxmMUlIVHUzZVd0Nk5rSmRFQ0J5d1J6aWRJYTdWYjA3RXRZSzRLNy9DUUU5Z3gwRWt5bk43cVZwV2R1aG12NXRXZWcwN214dDV4QVlNOUFFNkJjSXZyWXg2Ym5aR3NHdDhhNkZUMDdnVm9SUEZQK3dRY2ZUUGFjdTJUY2lwNDdBZzBuUjh2UGF0TnFNSW5hTG56aUViaVpERlFNSG9Wa0xxRjc2Um1aVWFlM3N2UzBjQ2hIUnBXV1h6ZERvTGxFR2ZsZnA3MzBsTUpSNVZhV25yazR0UHlhM3ZHTlFObFBkd1JhQ054TUJtcWwzTGt6cVplZUZxQno3YmwxUFhzR2FrVndsNStFd00xa29OWW1ycFZSV3Q3MzB0UFMzN0puYm1hNkZUMDNRNkRXSm01dVlIcnBhUkZvcmoyM3J1ZTVZbm92ejF1SVhDaWZhNTcyNWRwd2FCbUlQSmNPZFVaU0RYUXNQWVRxU3JRaFlrNGRvNU1rYmRJZ1Y2UEtwVmJtRzlwMmkvV2J5VUJ6d2EzNFZjY2hMUWcxcUtQS0tET0pkNWp4bi8vOFI2V1lFU1dPSC8vNHgvVlMwVkViZFYwVWRjZDBVVTlIRWcxbUZSMG4yOGZzeVV1VHdxWDFQTEVFK3ZlLy94MUFJUjdRSFFXUy9GN3dXQmdHSk14cHBwNlM3dXBwcjYveTM0c2YvdXRmL3lJbnFWNXAvOXh6ejZHVVF2N3NzOC9XVlIwbkE5d1NwbVByNnVueXBmVThzUVNTSVNyWXdobkVvU25rNmlvVjBaRGdFNS80aEM3L2UxOCsrY2xQcWlmOHJ1cU9kaGp6ejMvKzgrOS8vN3VqK3QvKzlqZEtTcy9oV05HZm9kVXo3dW1CdjVXV1R5eUJocGtHRlJKTzhSWklLNHVpamkyZi8vem52L1NsTDMzbU01L0JHSmVVWWVUU3F5UzZxQk1xOVAvbEwzLzUvZTkvLzhjLy9oR3JpcU0wUzBJWlVaMmN6aktnVkQxWU1jUmttOWd3ZVdsU3VMU2VKNVpBb1VnSUVSQUR2Y0IvOXJPZi9jcFh2dkxGTDM3eDA1Lys5SWd4WXFCeHRkZWxtRkdSVTFGa0xBWDVkRUdnUC96aEQ3Lzk3VytSU2ZZeUJJazJTS25ReHBqSjZENEJ3aWVXUUovNjFLY1NPUXdRUzFsQnZJWHpqVGZla0ErY0hsSW40YnhqeDM5dnRVZ21tNFZoMVQ0TDN3c3Z2SUFvNzd6enpwLy8vR2RNUXFNTVRXakpNL29zdWt5T1M4Tnc2Rk1VTHEzbmlTV1FtSWtmdU5GRnB2bnlsNy84L1BQUHE1QVVQNUpkQW5HQ1haYzB5OVdTcUtUdWtsS0JVYSs0YXZEbzBhTi8vT01mQ1BUKysrOWI0TlJqQUQ2ZEV1OXFrOUhydENxeG9VNGZyQ3l0NTJZSWxEZ2Q0Z1hRdXFTaUNLMEVJMkRxY3NOWHYvcFZ1UUYxMG5jWWdDS0JTOE82VTgwRS9uQzRYQm9xU1gwb3NZb1pGR1hmZSsrOVgvemlGN1pLa2hEOVlza2tMUldWcUVybGNDQnREb1ZuU0piV2N6TUVHZ1c0b0JTVlJEcEJVbGR4aTJUSmVQSEZGNy8ydGEvWkptc3NUdVNPVnJIcWUwcWxGZUFqZlhWUkdHeDBhZStYdi96bHUrKythM1N4TEM4U1Y4YjNDdkFSZXhhOWRETUVhcVZpak1ucUlPdG9ZOGxRc2JkOStlV1hQL2U1ejBrRzRFdWN5QmVGTXNxTkZVSW5CZUlyUyt6WmYvYXpuMW5YTUpzWllUbVNxVGhld2FybGhyZ0dwc3RaUDlRc2NtSm1pb3ZXMTcvK2RlekoxU1NEcXMrZDhYUGJoeE1HRFY4enVnWDB0ZGRlKzcvNzRnYU5NZXgwS2N3ZWVuRno5WnNoVUN1UVNDTlVZWTg3TDh1V0hZK3RqMGlJa0Y3cHFFSENkb1VJV2ExcUxLTm44V0xicTYrK2lrbDJSWC82MDU5Q0xNYkh2Q3RZdGRBUU4wT2dsdjhDNEliTDBWNEhlNVRhWjJTS1Ywb29lVXZWcEp5U1NYbEx5SkxLUFdFU0E4SVNCdGhjVzFWdGlTUWptckVxYlZyYXRpKy9HUUsxQWhsYWVEWm8yUkllaUd1cFZNeEkxRU9qcEt0Rm80SVFUTXJvWVpMaFVGemRKVWRFZDFWRzlPd3h6UmExWjJubC85K1QrNlVIdTBRL3JDY0xUbnpoQzEvSVJyWDBoMVVKWkZhM1VLb2lXaTBmckV3T2VrUlkrVVliZzJicHRKVjJhblNuaFBabmI3NzU1a3N2dldSUC9hQUJHMi93VVFiaTJLU3RQQ2ZQY2JMQmRZU21MeHVVa0NPQlVmY3hscjBGRGczWGd0QWxobW1qWE1mSTBTZ3hlQ2hrU1ZJVVNsbHRaU2JQaWdoTkE1SWNDWFhSZDlpeDZpMTVOUmhWam9kMTFQaklhVXRQODRsK0luUkU0NVV2bWRrZ0JtNHRRMXdpK2NZM3ZwRW5QY1dTckJSWE51L0I0VmpGQmMyeW1LcllVS00rbkgvMXExL1pHS200SkNkeHg3SGNHV2x1QlhMVXJFNlgxbk9YVkd1d0xWY0F4OVNDVDhVTzFKTTZOKzBtcFZNbGxXMTZnUnpzVHpoanJUb1hMR1JtaGYxUXBvZWpSMWxjYU1WbGJnWmFXczg2dWYyTUdBTWQwT0FEc2JwNG9JNnRUd0N0OWN0cGE4NmRNV2ozTGl5bmMwZ2ppNjhrS2dQeGpsTXFIaFJ0MllVUkpuZjNDNU5sMUc3MVUrQUdlbE5LOGF6Wjg1Nnl5djYwUU9kT3liZFdLZHRZVzNXM2tHWkNaZ1gyNE5Ca1JDS2M2MUZMVlM4OXQ1U0JnSTQ2a28zZGc1dDJSN00yY3pwd3VLb0NzcUZ3TGxJTHRXZFNVWHlZTHcxSGJqSzg4c29yMk1Nams2RWFMR1JNUjdVZi9WZEdSNlZMcUVJT1FFUFdCTFZ2cUkwenVyamthRkJCVWpMbmxyRGhFcDJoZGRuSmtlUlVPZ21SQm9HOGttWUROSm9WbzBHallTUThjZ3FReWF1OTlOelNFcFlaN0NGS0ZxKzhhaE4wd0tGVVNDWWhXMTJZOU1rTWRJbXBpVzd5RGZ0OVh1WWxBa0lON2gyYU9NejFZa0xGdmFpWG5pMHVZUkJVeXNPY09wcWEwbzh0Si9RRkkxaHJWa3VET25DcTQyU2x0STBxazQzN0NwbXRESFhHV2tMdUlJMVhpRXlQM0lVeGoxOHhVa1VEN28rNkQxV3RWZi9vUWVKYUZyVEdoVjN3clNNY1BYekx1NkdFaWphdDdpMjVYcTFMcThqalpxekNEeHp5RU9pdmYvMXJqQ2tIaTB5ckdIbGswQzFtb0lweHdVZGlDdWFwU1c3anE4MFIzMjdpRWtmQ29WanJCVFNmNkdWUmk5d3hGUnlLZkZOK2JaRkFBQUpyU3NBS2lCNzhKUDBVZ3VSVlA3RVNWWWZIRTdzdjBjemNpRnBXWVlsL0Y2blZHUWpKUFdsUUxaY3c0enlkbXlOUU9GSHNxVWpEZFBqZ2g3ZlFCTzVjdHg4VDgrRFBYRDBkMjhkbENwTmdKRm9MR1NFSGkwQk9DNU9PUTErdWFuWUFMaC95UVEySFNKR1lsNUNGYWFCOFVNa05OZURkMEZvN0lWTWxLM1U0bEt0bXl4a1RacWg1aWZvV0NZUWlWZmdNTlpqYVBxZnU2R3JWVldhVjBqeXF6RkxTdDNIUm9pcnV4VHllNW5VOE5WeFYrZzU5dWJZdEVpaDRKZG1vaDBBK004cmJ4S0NzdmFRMmN5RkllanM4enRYVHEzM2xHSDZGUUNxb2cwQnU3STBTNmpocXFmUWF0NWVlelJGSWFJR1ZBQWRCejBWOGNNSGh2T2tNNWNoSmFzcjJndVA2ZXNvRkxtZjBWR1JjODZROHphVnFmSDA3V3lOdThUa1FBcVhFYUx5eCt5R1o5S0Z3bjd4NktPeWw1MUJ6WDRrazVNTSsvNVRJNFBKeFdPODczTm5hdGtpZ09BTTFHUnRrM2psVUNzU3pYUzIxRjJxNFRuZTV4MzJELzkrSTQ3M2M3Mjc4RnBld2dneDdGQlBSTFVsM3p6ZXUwR3BsMndjS3MyaXo3SUhoNWpJUXhveENtL1J6S0UrenVlRDIwak15Y29uVHpCeTNEaTJibHhoMHJzN05FYWdtSE5TUVF5WjNQOEtydVVScEFkRkxUMHQvTHpuMytXN3pWL2VlY3RJR21iUzVKU3k4Y1ZRRUE0Z21ZcStvM0pZZVhKZDlOMjd6NWpLUWVhYklRd3JzMUIzVlc1bWpKVy9oSGw0ZVhwMnI1MURERXBKNnZmVUlBa3VNZTdyTzdiNlJtSWptTytUVWMzcTZZNjJXdmZTMDlQZVNzeE5wOG0rc0hnZ05uMHJQR3FMWGhHbnArZWhkOUpGWlNRQWo0ZlZQQVdkUTF0OUs0RHRDeE9YN2RIejNGa2NyZmc4T2x4UisyR3l1d3BhZUxmNWZHTi9pSHFPZndodjRDallDMlFLYVFwZE01bGJmdVJPeXBXZHptMmp3aFQzeEVJSUY2Rk5WcVNsa0ZvSGlia3B0TWczZnZidzlHUmptVHNxdktXUkRDTlF5OHByR3JESVc5aWlYRE4wTHVwYWVpNHk3eExFSCs3SVlnYklIZXJEeGs5b2dZV3NGYnd0ZWIvUXVMSkJaZDdlUDRLSlJySFhnYkE2VmhwR2RjeFcyOUd4M0NXTnhObTRxYzcwZGdYVzdwM3hYTHJHL0YzUXRQWnRid3VCbDFROXFOa0QrR1NxbTN3RTVWZWFDTzZYalRqWlh6OUx0ZVczK01Bd2F2dEVtOTJLdEtDNXR6Qkg5bTc3SEFSL3NXSy9TQzd0ZWVvNWcydXNTVXptZTF5K3ptanZ0cGJ5WG5zMWxvSkZqTXRCSThwU2NaczdnalNtRVNac2wwSFl6VU9hZkgrY0tsSzNKTnplajlOSnpIUjZiUHpLUVZjelJNOVdRNlRwRG56aks1Z2dVM3JBK3pQQkNkQWcwbHlndC8zdnBhZW52SlkrZGVSbklCZ2lCU0NMc05VUVhQVnRmd2hCSTl1N2k2aTBxOGN0UnpBNTFzb3B0ell2TlphQUFsSVVHWkFna2I3c2Q2N1gwOU5Kem5VQjZxUjU3Q28wTlpxRE5FV2lJRWVDd0I0MlVDNS9vVjd5SCtrdTQyWXI1dzdZaTBBYWZ5Mjl1Q2NNVmtFazVxSU0wM3FqNjlhOS9IZmJra3QxQUFOVmdzNEUvM2JENGt2WnhVRDBWWC9MaXExN3lNQXgxZkR0QU5UaGQvOUl0TjVlQmNBV21CYXNwQ0VTa3laTTBWNVZMUUNuTkl5VnJaU2JqTWltamx3M3gwUVlJWTVTMGFWaytjdVRLcHhjRll3bGJBMkpRZzZNMFl5SzZtYSt4TkVpYjgvSjV1aDhlUy8vMUs1Z1Jjc1F2QmpnMVoveStHQWtvd2lmQ2FuQjlJMXNqYm81QWdUTG1vZ2pzUEF1cG01R2hHeHRFYzJqZTZmV2h5K29wWmc2dlF4MDRFR0xTNlRxdjFuSnpCRXJ1UVk3Z2FBZEE4cnZmL2M1cGNBeVVqakE2QTlPb1BUeGVEZkhEZ1RpcmtNY3BkYnp4UDZuV2JuWEN1cHJLb1lZVkpac2pVSENFSU9EeTlBeEwvUHd4TkYwS2dxNmVEYVdPazJYTkdQeDNWMWRjWVl5di9KVjZTVkxLOXhYdG5CeDZjd1JDamlRaCtTWTNYT0p0RC9TYjMvem0wQUdORDRVM0trRVVuakpleGVMbDF6TXlUd2h6S2J6Zm1uZWJDd0NZaWtCQk16Z2lrRHN5VUdJVnVUYktHV2pTTUZuT1VOV2xDeS9ZUTFYeHc4Y1grY0Y1SDM3eFhhbUIwckpPdDFCNStEYitSS1A1MzhVZnc5bjNoQ1dTVUhSUzdwbXNQT1JaU0haRmdSWDZRM3hQTWFDWG5hZU1kVW9iOW84UTluVTJmaWs4Q1RnYVJnMU9VWHUxTmc4VDZFSlRXczdQRFNTZy9YTDJkNzd6SGR3S3cwaVVsdjRMelg2dysxejdXM2JTbzdqbnFvbmhWM2x2NkJucDRnU0N6b1BCT0tVQlBiWUZmcXZXYjRRSmhna2EwSHZwUDhXR1M5b2NzYk80WlQ1WXB2MytYRWt1R2ZFNmZUOWFYNjh6M3RtakJOUE16Z1REbEwwaG9JODRucHlhQnRpVHo3K090Ti9VcGNVelVDdkdSMlprQ3lCQTIyRCsvT2MvZi8zMTE3UDdJYWw5VXF2WFF2SzU5cmR3WUY2cDhyZ0xnVWcwTHVGQzl2ZFN1emlCZWhrSzBNVEFBeExmL2VaTEY3S0U5ZEsvdEo0V0lUaGxEcGdQR21DUEdlSkdZV2xqT3VwZm5FRFc5VWx6ajh6SXlmYUVrSlZ5OE9hZGQ5N3hUY3BuYUdocFhsRWVZbmxtNk5iZEpzKzZYRk5sUmF0T0gzcHhBcGxiazlhMFp1UmtZMEo2ekZTOXpGRkhISHIwNkJFeTNmb1N4aGZzNFlqdG5RcDNUSXdzMEMwb05pVi9US0RoYkU1b2M3emMxbDU2SUF0ZitjeTN2b0hiN1ppRTVQdWpnelg3bFdRN1Y4M2p5eTN2cXdFT1RIVlVtRXE1U2lTbXhMdnZ2cHVmZUdvbDdMN0dkTlMyT2FDUCt3WjZvRHNpazRUdmRUTS80YVB1b2ExNFpBYm5nWXJUNDZwT3ZOcExqK0ZDbCtUUjRwQjdMcFBoL2ZmZjF5QnJ0R2JKUXlkYXVHNnpteUZRRUFkV0tsRDJ1Z3pHK0JaQk5DSlA0dWtZNzc2QkNTMWlubm95RFY4OGRIWmJJQW5sMit4Y1Vzd0h1NzIrQml5a2JYcUh1OUJnbDZnRksvUVRBT2lyWUk5M0huN3lrNTlBbitiN2kzZFpSOHMwaU9UQzR5VTJEL3ZHL3BnWGVSWmlMK3ppU243RkllL04zVkQ2NGNqTkVHZ1lqRHU3NzR1S0QxbC8rdE9mZ2g3dUlxSGl5cWp4Rms2enNDSk5qSmQ3M252dnZiQWZ4ZXZtUzUzOWxXNjNZUGx4RzI1bUNVc2lpVFB3cmJ4aVpsc0NuUG94WHZ0ck5Fb0c2aFVEbW84amVQcFZKbVYzaitYMlBZcmNhZDlUckhKVkcrVjBuYXUzdkJrQ1pWNEdYRUV0bE1NWWorQkU1WTAzM3ZDbDB2SlF4NmozaWhDRGt4cnRtdDJ4WTQ4bE9Qc2VCcnZLRVdaamYrcmxZQzhERnRKelN3UUswTUlRZmdSaTA1ZkVQTGFuL3NFUGZ1QlREajh4c1JCWWw2aU56ZTdWY1YxaGR2SU54cUJPcGtjYzNDRDdqemorbUVDSFJzK2RBWWNhTW1wTFQ2dDl5MWJndXBSSkhKM1JrQ21yVHVqRy92dmYvLzdMTDcvODBrc3Z0UnJQSFhkdSs2RnRRd1Rvc2RUS1BkNDIxSVlqOFFoN05PT0ZvemFLU3BTays4YVBpMmVnaFB3UWhWNFkxYjdCUU5BM3M5M1h1RHQ3ODgwM2s1eUduR3NaYzJqZTJSSTJZQU55RkROSWpPdFJvWWM5UGk1MXlWMTZyaHFsRnc1bkczeGh4OFVKbExsMWFHV20ycUY4cnNST1FuakVRekZXN3UyOXZtaXhlUFhWVi8wR080V0NsT0Vxcm5OSE9iMjlzZGlqWkN4V1dWdTlRVkQvV0dLMTFjYlZ0T3lGdytrVzltMzV6RnR2dlRXcGtYdVQ4cGF3QlVSTFQ2dDlTMzlMTGtJeWpYaG9RS2R5UjZWbm4wVWdkYitmL2NvcnI5Z1ZoY2RKVnkxVmszSktKdVZIaEl6UkM0ZXNWclk3Vmk2MGxuWFlHZEs0cEJLVHp0Qi9aT2pyWDFvOEF5ME5rREFJaGxHUUpvRVJQM2Rrdzl1eGhETlVYdHFlaE5Bb29RanoxQkhYelJmekdPazBObXZwTkRTNmZ1QjdqYmc0Z1hvWjJ0S0RLOEpqZm91RUthNlp1cDhZODg3UTg4OC9uOThhYzBud1hOSkE0NWFxTHZJYVFzVTdKMzR0UlI2eUxjc1N4aEw4Vm93VkpuVVpkRVVseTZMSnNjejdRdy9CZHlnOFE1SVBBVVJMVkV4b3E5VUxMN3pnZFRNMG9vM2NRTmlUaWE1Qnk1N1cwSFB0UkZCakdTV0RxdnUwemdNcXE1aTFMQnQ4bHpUVGhubGhkbXYwN2NzWDN3TmRBWUtFQVhXOGIrL0RlU0VSRzVGRGw5SG81SE1KTWRKd3l1bG9GS2VSR0pwVjdzVjhnT3FKZy9yUzZmQVVheTlzczNnR21tdGZra1NTUENxa0F1aVNDSU40T0ZVSlY5eHF5VG9XaThRajBUcGtEMHV1d0o3RFVReGE0ekxZd21wNWRXdm1ZVFF5dVJUWFlqRGphY0F0OGpoUzgwRkZXcFhKNWtLNmFQdkZDUlJFRG4wb1RFZVhiRFlEWlJvRVIyM0FCOVpha25BbERiNzFyVy81UUNDZmdtbFd3MVZscEwvWGFjditsdjdZazE2TWx5K1pqVXcvL09FUFZmaUZSdkdSbTNreFNPTzBqMDROWE5LbU5jUXE4c1VKTklUZ1JBK0RFYkNxdmJvQUtPRU51RjE2OGNVWHZaR0lPdFZNcFlhcnl2RHF1dldZeEFzVms4VGVTSkU0MzM3N2JhbUlKUHpnWTlJTUhPNmRmdHhlZllqSnVyN1U2SXNUcUVZNnNRTEhtb2hoRXJnVjNWMUNIVGphSTN1Nll5R0lUcEpVMHV6RWdhN2NiR2diSHR5NWRMOUlTVGJmL3ZhMzNhUGwxUTZYc0lmUVVRTkdrbkFRRkVxNlhObnk0OE10VHFDSzdzaU9vRE1TT3RVK3VWcEZHNlUwd0ZTMnQ5MnhXYTZiTDdEcWxXTzBWZnRENVIwbERKdWxEUS9LeUZUWUdhR2pLZUdlSDRmY3FaRjdOcUZOaGdnQ29aRVI1NDQ3eThnekdpOU9vRE5zU3Bla29scjRJU2piVzdQeTZRUXlBZHBNSGVrbjNCckVzVEE4R0ZwTEVwYW9ZQXhmN09la1ZlL0hjVmJoZTlybzVYVFlkenYxeFFsVTAyN2tzMGlQSkRuRm01QkFSeFVncXNnM3RndVdMUThHUTZrODVrR2pWTkozcyt4aEhpckV5RkNoVHJuRFpleUpYN2JWUEpXS2ZKem5mb0pRU3czMDFUR1lSTTlHam9zVHFEVjFDc0VSRU5xSFd6bUdQZWFsWjNHNUJFMEZkVnpDSHMzU2tzTG9qQ1Qxa2ZLT3AzUDFKL3dNR0pLQUVyNjRoQ2g4VWRjQW1Yd0p5WTkrOUNQUGlueWlGM2UwVWVZTzJ0SGZscXJIQkVvTTBpaFc5cksxcFFjY2RVdWxEdFpDVmhmbERyQVBQbkNUTlhxL0owWlc0a25qb1h1SGt1SFZ0ZXE4cTZGWldIV1ZlOWMvdWhvYVdjNThFT3YvSjNGSUcxMGlWd0VMU1VJV0RLMkF1VHBVZTUzNjRobW81UVlnY2pjT1Btd0lMZ0VGRm1ha2VuMldQdVIzUytGQ2NvWXRwUGxCdGJsWHdDSC85YXh4WUVrdnZGRUJvQUxBRlkxY2pVRGNEa3NBZ1IvMzZlWnVZb0VtOXlBK2xKQjdQSEFqZEhWRmpCaHcvY0psRUZtN09hN2lRUkZZM0lUbTdnRjBTVG1nVXpTNHZvVVpjVFVDQlNEbzhCOGNyQWxTNnVESWt4NjNYYm1hQ2JjV1JxdU1Dd1RaQlV0TW9hRGtXUkVKS0J5aEJ4bUdPWFVWYUk3cjJMbktxQVpOVWdrMFRpR2xBSVZjNm43MDZKSG5JdVFhUElYc1NWQkNEblZRQUFRczRRMXV3U3JRaFRlWmdlbDE1ZU5xR2Fqb2dqVEJBZ3BoajFmaTNjb0NJaE5PSld5N01qUVpMaEc2L3RCY3pzS1VSeFVBQ1lIc3JKa0VQU1lsUFlkUDE3Y3dJNjVHb0tSb1JxZ0FDM3NzOEY0ajlDS3pTb3h6S2NsNXJTaXVGUlhqY2hrc0tCS3VrQVFjT3lIL01vQlY4aE44TkZCU1djWGExUWdVejZIakZnd2N3TExqOGFnd0g0NjZDa0c0ckFMS0ZnYmx2bEtXaENYQXNaWjVWSjMzUUhBbys2RVZnWHBNb0tHdE1ackZaZjBwbFVNTngvWHdXUmU4VWN3cTdBR04zRlBqVnVXVTBaZHIwL0pydVJFbk5aY1pPUFROYjM3VFEycHZGS2xuOStQcVduQXRub0dPVEE0K2Urb0tpMndTcGFJampTZGhmUXFGY3JiRVk3SzkvZmJiUHU0dzVVeS9GWEZZbkVBU3pLUjdKbzFpQXVHUTdhRm5ocFBOZHVFaEFnZ0VMcjgrNDkvTnNrZGNLLzJ3YlhFQ0hmb2ZDV0taVEk3dXVid2FCZ0o4Y3VyWTZyS0tmR3YyZ0VpZUJoZlFzQWVIbkVhNENqNkxFNmdWQUxzL2E1YVpoRURaRERwcTNHcS9Dam9iSERUNG9BNjRRQ2NQK2FERFhjaGFxLzlxdHptQXNINjc3YktFbVVEZzJHRDYyU2FCQ2k0ekVJQmdYSEhXTFo2QldzdXpKMk9Tc0tQSnBFM2w0VmI3dFdLNVlteGFMbWZCY3RRZ0R4aGg2RjZrMVg1UitlSUVhZ1hBcDEweU1OODB5R2JJRVh0YTdSZEY0WWFVZ3loQUpXZXozQzJJVno0OG9WN0ZpOFdYTUlUSUp4STU4dC9VY2QvKyt1dXZxeXNhNUxpSy83YzRLTVFVbHRlK0I1Z2dsWWV5dXFrZ0djQ3J3WEp1THA2QjdPKzhoK3JsT2tzMWwzaWVsYnZsRWpLMUxtMUtuaENlYmxMTHI3bDZXaVBhRE1sREVGWWtKNCtJdkFyaWlFbXRMbDNraXhNSVFDWUVseURJR1h6eWFaZjFhMmxBdTZEVFVVa3ZvclJNQXFuL09QQjBzVzVLTU9rS0dXanhKWXcvZVdDYXBDclQ4ck9Gd2k2L0JBRjd5aXhrZU9QZkVDUWt5ZjRTaGFmMFhUd0R5VFQ4a1lRYzFWOTc3VFZNeXVta2ZhM01OTmw0UmVIY2pOTHlhNjZlbHN2Wi9ZRDNlOS83SHQ0ay9iUUdiU2s1UTc0NGdYaVNwT3FSbDFkVVpWcXVIa0h0eUtVejNOdE9sNlg5TWo4QjY4R3NtekxmeDRoREN2QVhIM2RwaURNSmtsUnQ5QXpISmFkTGovc1U2ZzlYZ0d6OUNzSlBRZ2JpRlRmc25iMkVZRTRrcmtjY08zSnBVNXlZTzdOYmZzM1Y4eUFJUU1haEgvLzR4eEwvZzQwdmIvQjRDUnU2RjVjdWNhejZVcHU2MTMzOFQzdWVmWmtjSmIvY2dWdlJVSmhjYVBDa25oSm1KK1FSdjU4UXNZbE9Ic3BWbUNzMWVuVXB5WG1WUmZaQTNJZzFaYnIvMkIwNTAzSmc2T1I1THZYdDFiS3o3eWlYYTROYm1RcHEveFNGUU5UZXNlYSs1R3FPQkplUEdBMDk5eUtNaTMyeHUweTBKRXMvYnI2T2I1K3IvVjQ1R3dINEl3ZW9KU0d3MDFNUlNUMm5RK0haWTZWanp3d1VYak5PcWJwaHBKK3N4MFY4RFZwMkg3blU2ckxMSVREQ0RlQmdkenNHYzVkU05ITWFTUy9RdW1VZ0pzWTRsa21oT1pWeXpBT3pJYVlURGl1OWZOajFCSUhzSEFJeVNaSlFna0lZdVRaOUNkUXRBOFcrbU12S010UW5NajRGOCtSUWcyeURqanZnNnFZSUViODJaVkxMbUlKT0JmNWdCNzZkVUU2QnI2TDA5YWhiQm1JWngySmMyR01sbG43eWZWRHFMZzNidEZEWTVXY2prUG1aS0FCY0JmaENvSDQzb2UvdmJMSTRuRDNFWWNkdUdhaklVVVR4UU1ML25maDB4dS95Y1lNOFBvUmtoNlpFY3Z4cXE5Y3VoMEFoSHd3OSt2Y2VoQkFJalJYQXNWYUFCS3NMYUk4SmRCaTJ1V05vaittTy9zc0VYYndncCtJM2wwamswbWpMS01QNm9RKzVlaWhmUzNLSXpGcVduREx1MEZyVTBjWEhSOS85N25kVlhES0J3VnR2b3AyaThNRTIzVEpRMk8yWTVPbm9heVdTZUI0MFl0aGdDTUZRdnRmUFE4RHNGUWovaFlnNnNIV1VqYWpxaFhPM1BSQ2J5ckpzbVQzTGNqUEo0c2x5SGh4N3I3a0lJRkNlNGtvL1NHT0daeU14VjArcmZiY01aSUFRUllXSklYNXIxQ055U281Y3ZmNmxYalAxK3BablJQYTdGN01nNUI5WTQ0N1RYalRxUnFDdzIxRmhlclp2S2prOUhiNjU3VS9YL05TMnRKSHd6UjUycFNabmQzaTdMV0dNUzNwVXNVM0xWOU05dFRIYmp1UEo2SktRN1lTc0V3NzFTai9jN0phQjdIdnFEU2EyNXEzbm1EdUpabXNxeE9ISkxxc0lXM2F1WXN3Wmd5WUVYalR6K1h5U1VPYTU0eG5hRHJ0MEl4RFZWdGE4U1drRGxIdklNOUEvbzh1aFY3dWtFTWlFRkE2em1oQzhxTk54bHZhaFlTeGpWdGp0clVxUzVFbkNXYVU4M3l0ZEVEQ3JvMGRRZW1XZG9XSGRNaEJxaHpGSlAwaHpucms2RHUzYmJIMXVwbXo1dGJRZVFVa2d4RVZ4TDBZeWQ5QWpVZWhNSU1ibC9pdFd0bEE3WWxCSDM0Nk1jdjFMdmZ5YXF5Y2hFQTZybU5EWUNkR0FVbWVFWmhLMGJrdFl0RFBVaGw4OWZzNzFkdExFWFhnSkFoVUNGYmZHN25WNlVTZFc5Y3hBTkxMU3A2ZXBNTFNzUHgyQ3Z1NmRQdTdjbG5OZGEvbTF0SjZzWHpsNk05MXdTc3VZdVNCbzM0MUFHVnVlOU5ncTFNbHhyazNjbTl2bEp0cjM4dXNNUFFtRXhXR0pKNG85bHpBbUxzSHhtK0RIbG8zRU9hRnhsSWVzWXVkTjdKYURQVE1RSzMzZkVmc01wdTRHTXZYVzJKUHlNN3BNNmxsYU9EY1R0UHhhV285QTRJMWp2dC9DUGpyZmRkK3laeTV1andrMFZCZVh6bkNNRXAvQXg0SThmcGlyWks3MU45UytGeFJ6OVdDUHVHQlAzcFZ3aTBNRFBzM1YwNEs2V3daaWtJOHltRHV5YkVqTm9SR2pabldwMWI0YVhMblNzdlBLWm5RWlRuUVVZUXFaK3Vqc29pVks3S0FsSGlZNnhZTlFRUUFtUzhkeGQxWEhFUmdHUW9DRTZYajdXVmU3WlNCV3NneDcwSVVGVGxPWlpZM0c1L1dhTzhwVDIxNkFoTW5QdGZUQ3VTZUJ2SFF5REV3eGFTaXNlaThIU3VGZWFTRXdnbm9VcGxhdkUrWGRDTVRLNU1hemMwOHNUcjQ5MGZvck5CdWhmNFVSK3c1eGlLY3dkWFNxRzRHeXVMSXNGc2ZFQzhuVUY4cW5WdHVRTHVvSUpGaTk5dEU5Q1dSN2Z4aWt3eG1RTmtPdmhyMWE4bUdidlg0NkFqV0hBNnhqYnBZN0UrZ3diSzNBdDB6UC9hRXZrZ3FOMklmbXJjWkg1SFBIUGFLcXk2VkRaTHFvdlpxUzJKOEhQN0JWU0R3V0Vxa3VOblRMUUY1NFkxbVJwbTdINWxwNTZ3R2I2KzkxMmdmVnd0WWs5MytyWFlidVJpQXZLdzBOQ3RtSGtsRzluQm5KOTlQdUNDVHJPTklNZG1VVXJFdEc3RWFndkhJYksrdkkxcm5HcGUvY1hzdTFQOE9GNVl5NVJETmd5NWN0RXNpckF0d3JFL2NsN0pKZ0w5RzNacVpLWm51WFVicTl6bUZmVmdhRjdHVnh5ZmZLaWdoVU9Qb1M2S09vWCtpYmZSbkxGSHFHeDViYXlsV2pCdWs3RXE1NDJySnpSWlBPRzNvSWJPNlV6OU16NnRXTlFESVFySE1YWnYweWpGTmxOTjZEcDJkMGVWRG4zbUNFd0hDNUdGMmFlL3IvQUY5bGZaSHNOL0UvQUFBQUFFbEZUa1N1UW1DQyIvPgo8L2RlZnM+Cjwvc3ZnPgo=");

/***/ }),

/***/ "./src/components/Footer.js":
/*!**********************************!*\
  !*** ./src/components/Footer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_phone_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/phone.svg */ "./src/icons/phone.svg");
/* harmony import */ var _icons_chat_bubble_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/chat-bubble.svg */ "./src/icons/chat-bubble.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




function Footer() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "nfd-hc-modal__footer",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "helpcenter-supportinfo__wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h4", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Account Support', 'wp-module-help-center')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "helpcenter-supportinfo__text",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('If you need help with your Bluehost account, contact our support team:', 'wp-module-help-center')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "helpcenter-supportinfo__telephone",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons_phone_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, {})
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
              href: "tel:8884014678",
              "aria-label": "Call 888-401-4678",
              children: "888-401-4678"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "helpcenter-supportinfo__chat",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons_chat_bubble_svg__WEBPACK_IMPORTED_MODULE_2__.ReactComponent, {})
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
              href: "https://www.bluehost.com/contact",
              "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Chat with support', 'wp-module-help-center'),
              target: "_blank",
              rel: "noreferrer",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Chat with support', 'wp-module-help-center')
            })
          })]
        })]
      })
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _newfold_labs_wp_module_ai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @newfold-labs/wp-module-ai */ "./node_modules/@newfold-labs/wp-module-ai/index.js");
/* harmony import */ var _ResultList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ResultList */ "./src/components/ResultList/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _HelpCenterIntro__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HelpCenterIntro */ "./src/components/HelpCenterIntro.js");
/* harmony import */ var _SearchInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SearchInput */ "./src/components/SearchInput.js");
/* harmony import */ var _SuggestionList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SuggestionList */ "./src/components/SuggestionList.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);










const HelpCenter = props => {
  const [state, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    visible: false,
    helpEnabled: false,
    noResult: false,
    isNewResult: false,
    source: 'kb',
    searchInput: _utils__WEBPACK_IMPORTED_MODULE_5__.LocalStorageUtils.getSearchInput(),
    isLoading: false,
    loadingQuery: null,
    loadingIndex: null,
    resultContent: [],
    multiResults: {},
    showSuggestions: false,
    initComplete: false,
    errorMsg: ''
  });
  const suggestionsRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const resultsContainer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const wrapper = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const introRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const brand = _utils__WEBPACK_IMPORTED_MODULE_5__.CapabilityAPI.getBrand();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    getHelpStatus();
    fetchInitialData();

    // Add event listener for localStorage changes
    const updateVisibility = () => {
      setState(prev => ({
        ...prev,
        visible: _utils__WEBPACK_IMPORTED_MODULE_5__.LocalStorageUtils.getHelpVisible()
      }));
    };
    window.addEventListener('storage', updateVisibility);

    // Remove the event listener when the component unmounts
    return () => {
      // Cancel any debounced calls
      debouncedResults.cancel();
      // Remove the storage event listener
      window.removeEventListener('storage', updateVisibility);
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // If visible changed to true, reset search input
    if (state.visible) {
      setState(prev => ({
        ...prev,
        searchInput: ''
      }));
    }

    // If the wrapper is visible or we’ve just finished init, scroll
    if (state.initComplete || state.visible) {
      setTimeout(() => {
        (0,_utils__WEBPACK_IMPORTED_MODULE_5__.scrollToBottom)(wrapper, introRef, resultsContainer);
      }, 100);
    }
  }, [state.initComplete, state.visible]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Always adjust padding if any of these dependencies change
    (0,_utils__WEBPACK_IMPORTED_MODULE_5__.adjustPadding)(wrapper, suggestionsRef, state.showSuggestions);
  }, [state.showSuggestions]);
  const getHelpStatus = async () => {
    try {
      const response = await _utils__WEBPACK_IMPORTED_MODULE_5__.CapabilityAPI.getHelpCenterCapability();
      setState(prev => ({
        ...prev,
        helpEnabled: response
      }));
    } catch (exception) {
      setState(prev => ({
        ...prev,
        helpEnabled: false
      }));
    }
  };
  const populateSearchResult = (postContent, postId, postTitle) => {
    const resultContentFormatted = postContent ? (0,_utils__WEBPACK_IMPORTED_MODULE_5__.formatPostContent)(postContent) : '';
    // Retrieve existing results from local storage and using the updated persistResult method to store the result
    _utils__WEBPACK_IMPORTED_MODULE_5__.LocalStorageUtils.persistResult(resultContentFormatted, postId, postTitle);

    // Add new result to existing results and retrieve all results from local storage
    setState(prev => ({
      ...prev,
      resultContent: _utils__WEBPACK_IMPORTED_MODULE_5__.LocalStorageUtils.getResultInfo()
    }));
    if (postId) {
      setState(prev => ({
        ...prev,
        isNewResult: !!postId,
        searchInput: ''
      }));
      _utils__WEBPACK_IMPORTED_MODULE_5__.Analytics.sendEvent('help_search', {
        label_key: 'term',
        term: postTitle,
        page: window.location.href.toString()
      });
    }
  };
  const debouncedResults = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.debounce)(async query => {
      if (!query) {
        setState(prev => ({
          ...prev,
          multiResults: {},
          showSuggestions: false
        }));
        return;
      }
      try {
        const multiSearchResults = await _utils__WEBPACK_IMPORTED_MODULE_5__.MultiSearchAPI.fetchMultiSearchResults(query, brand);
        const results = multiSearchResults?.results?.[0]?.grouped_hits;
        if (results) {
          setState(prev => ({
            ...prev,
            multiResults: {
              hits: results
            },
            showSuggestions: !!results
          }));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching debounced results:', error);
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAIResult = async () => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      showSuggestions: false,
      loadingQuery: prev.searchInput,
      loadingIndex: prev.resultContent.length
    }));
    try {
      // Check existing multiResults
      let hits = state.multiResults?.hits?.[0]?.hits;
      const lastQuery = state.multiResults?.results?.[0]?.request_params?.q;
      if (state.searchInput === lastQuery && checkAndPopulateResult(hits)) return;

      // Make a new multi-search API call if no match is found
      const multiSearchResults = await _utils__WEBPACK_IMPORTED_MODULE_5__.MultiSearchAPI.fetchMultiSearchResults(state.searchInput, brand);
      hits = multiSearchResults?.results?.[0]?.grouped_hits?.[0]?.hits;
      if (checkAndPopulateResult(hits)) return;
      const result = await _newfold_labs_wp_module_ai__WEBPACK_IMPORTED_MODULE_3__["default"].search.getSearchResult(state.searchInput, 'helpcenter');
      if (result.result[0]) {
        setState(prevState => ({
          ...prevState,
          source: 'ai'
        }));
        populateSearchResult(result.result[0].text, result.post_id, state.searchInput);
      } else {
        setState(prev => ({
          ...prev,
          noResult: true
        }));
      }
    } catch (exception) {
      // eslint-disable-next-line no-console
      console.error('An error occurred:', exception);
      setState(prev => ({
        ...prev,
        noResult: true,
        isNewResult: true
      }));
    } finally {
      setState(prev => ({
        ...prev,
        searchInput: '',
        isLoading: false,
        loadingIndex: null,
        loadingQuery: null,
        showSuggestions: false
      }));
      _utils__WEBPACK_IMPORTED_MODULE_5__.LocalStorageUtils.persistSearchInput(state.searchInput);
    }
  };
  const handleSuggestionsClick = (result, postTitle) => {
    setState(prev => ({
      ...prev,
      showSuggestions: false
    }));
    populateSearchResult(result?.hits[0]?.document?.post_content, result?.hits[0]?.document?.id, postTitle);
  };
  const fetchInitialData = async () => {
    try {
      // Populate the results from local storage if they exist
      const resultContent = _utils__WEBPACK_IMPORTED_MODULE_5__.LocalStorageUtils.getResultInfo();
      if (resultContent) {
        setState(prev => ({
          ...prev,
          resultContent
        }));
      }
      const multiSearchResults = await _utils__WEBPACK_IMPORTED_MODULE_5__.MultiSearchAPI.fetchMultiSearchResults(state.searchInput, brand);
      setState(prev => ({
        ...prev,
        showSuggestions: true,
        initComplete: true,
        multiResults: {
          hits: multiSearchResults?.results?.[0]?.grouped_hits
        }
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching initial data:', error);
    }
  };
  const checkAndPopulateResult = hits => {
    if (hits?.length > 0) {
      const resultMatches = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.getResultMatches)(state.searchInput, hits[0]?.text_match_info?.tokens_matched, hits[0]?.text_match_info?.fields_matched);
      if (resultMatches) {
        populateSearchResult(hits[0].document.post_content, hits[0].document.post_id || hits[0].document.id, state.searchInput);
        return true;
      }
    }
    return false;
  };
  const validateInput = () => {
    const isValid = state.searchInput.trim().length > 0;
    setState(prev => ({
      ...prev,
      errorMsg: isValid ? '' : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please enter a specific search term to get results.', 'wp-module-help-center')
    }));
    return isValid;
  };
  const handleOnChange = e => {
    populateSearchResult('', undefined, e.target.value);
    debouncedResults(e.target.value);
    setState(prev => ({
      ...prev,
      noResult: false,
      errorMsg: '',
      searchInput: e.target.value
    }));
  };
  const handleSubmit = async () => {
    if (validateInput()) {
      await getAIResult();
    }
  };
  if (!state.helpEnabled || !state.visible) return null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: "nfd-help-center",
    id: "helpcenterResultsWrapper",
    ref: wrapper,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_HelpCenterIntro__WEBPACK_IMPORTED_MODULE_6__["default"], {
      introRef: introRef
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_ResultList__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ...state,
      wrapper: wrapper,
      introRef: introRef,
      resultsContainer: resultsContainer,
      suggestionsRef: suggestionsRef,
      ...props
    }), state.showSuggestions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_SuggestionList__WEBPACK_IMPORTED_MODULE_8__.SuggestionList, {
      suggestionsRef: suggestionsRef,
      multiResults: state.multiResults,
      handleSuggestionsClick: handleSuggestionsClick
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_SearchInput__WEBPACK_IMPORTED_MODULE_7__["default"], {
      searchInput: state.searchInput,
      handleOnChange: handleOnChange,
      handleSubmit: handleSubmit,
      errorMsg: state.errorMsg
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpCenter);

/***/ }),

/***/ "./src/components/HelpCenterIntro.js":
/*!*******************************************!*\
  !*** ./src/components/HelpCenterIntro.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _icons_ai_stars_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/ai-stars.svg */ "./src/icons/ai-stars.svg");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* eslint-disable react-hooks/rules-of-hooks */





const HelpCenterIntro = ({
  introRef
}) => {
  const [startReveal, setStartReveal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setStartReveal(_utils__WEBPACK_IMPORTED_MODULE_3__.LocalStorageUtils.getResultInfo().length <= 0);
  }, []);
  const introText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hi! I’m your WordPress AI assistant. </br></br> Ask me how to do things in WordPress and I’ll provide step by step instructions.</br></br> I’m still learning so I don’t have all the answers just yet.', 'wp-module-help-center');
  const {
    displayedText: revealedIntro
  } = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.useRevealText)(introText || '', 50, startReveal);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    role: "region",
    "aria-labelledby": "helpcenter-intro-heading",
    className: "helpcenter-intro",
    ref: introRef,
    style: {
      visibility: _utils__WEBPACK_IMPORTED_MODULE_3__.LocalStorageUtils.getResultInfo().length > 0 ? 'hidden' : 'visible'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_icons_ai_stars_svg__WEBPACK_IMPORTED_MODULE_2__.ReactComponent, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "helpcenter-intro__text",
      dangerouslySetInnerHTML: {
        __html: revealedIntro
      }
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpCenterIntro);

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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _icons_close_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/close.svg */ "./src/icons/close.svg");
/* harmony import */ var _icons_helpcenter_icon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/helpcenter-icon.svg */ "./src/icons/helpcenter-icon.svg");
/* harmony import */ var _HelpCenter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HelpCenter */ "./src/components/HelpCenter.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Footer */ "./src/components/Footer.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! .. */ "./src/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);









const Modal = ({
  onClose
}) => {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const helpVisible = window.newfoldHelpCenter?.closeOnLoad ? false : _utils__WEBPACK_IMPORTED_MODULE_7__.LocalStorageUtils.getHelpVisible();
    (0,___WEBPACK_IMPORTED_MODULE_6__.toggleHelp)(helpVisible);
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    role: "dialog",
    "aria-labelledby": "helpcenter-modal-heading",
    "aria-describedby": "helpcenter-modal-description",
    "aria-modal": "true",
    className: "nfd-hc-modal",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "nfd-hc-modal__header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("h3", {
        id: "helpcenter-modal-heading",
        className: "nfd-hc-modal__header__heading",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "nfd-hc-modal__header__heading__icon",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_icons_helpcenter_icon_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Help with WordPress', 'wp-module-help-center')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close Help Modal', 'wp-module-help-center'),
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close Help Modal', 'wp-module-help-center'),
        className: "nfd-hc-modal__header__close-button",
        onClick: () => {
          onClose();
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_icons_close_svg__WEBPACK_IMPORTED_MODULE_2__.ReactComponent, {
          "aria-hidden": "true"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      id: "helpcenter-modal-description",
      className: "nfd-hc-modal__content",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_HelpCenter__WEBPACK_IMPORTED_MODULE_4__["default"], {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Footer__WEBPACK_IMPORTED_MODULE_5__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./src/components/ResultList/NoResults.js":
/*!************************************************!*\
  !*** ./src/components/ResultList/NoResults.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ResultHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResultHeader */ "./src/components/ResultList/ResultHeader.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icons_ai_stars_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../icons/ai-stars.svg */ "./src/icons/ai-stars.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const NoResults = ({
  isNewResult
}) => {
  const responseRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const resourceLink = window?.nfdHelpCenter?.resourceLink || '#'; // Fallback if resourceLink is not defined

  // Define the content with a placeholder for the link
  const contentWithLink = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You can try searching our <a href="{link}">Resource center.</a> though to see if there’s a helpful article or video on that subject.', 'wp-module-help-center');

  // Replace the {link} placeholder with the actual link
  const formattedContent = contentWithLink.replace('{link}', resourceLink);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    ref: responseRef,
    className: "helpcenter-response-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ResultHeader__WEBPACK_IMPORTED_MODULE_1__["default"], {
      noResult: true,
      isNewEntry: isNewResult
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "helpcenter-result-block",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "helpcenter-result-block__aistars",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_icons_ai_stars_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent, {})
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sorry, I don’t have any information on that topic yet.', 'wp-module-help-center')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          dangerouslySetInnerHTML: {
            __html: formattedContent
          }
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NoResults);

/***/ }),

/***/ "./src/components/ResultList/Result.js":
/*!*********************************************!*\
  !*** ./src/components/ResultList/Result.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Result: () => (/* binding */ Result)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ResultFeedback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResultFeedback */ "./src/components/ResultList/ResultFeedback.js");
/* harmony import */ var _ResultContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResultContent */ "./src/components/ResultList/ResultContent.js");
/* harmony import */ var _ResultHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ResultHeader */ "./src/components/ResultList/ResultHeader.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var marked__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! marked */ "./node_modules/marked/lib/marked.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const Result = ({
  content,
  noResult,
  postId,
  source,
  showFeedbackSection,
  questionBlock,
  isLoading,
  loadingQuery,
  loadingIndex,
  index,
  isNewResult,
  wrapper,
  feedbackSubmitted
}) => {
  const isNewEntry = isNewResult && index === _utils__WEBPACK_IMPORTED_MODULE_4__.LocalStorageUtils.getResultInfo().length - 1;
  const responseRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [shouldReveal, setShouldReveal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isNewEntry && responseRef.current || isLoading) {
      adjustHeightAndScroll();
    }
  }, [isNewEntry, isLoading]);
  const adjustHeightAndScroll = () => {
    const viewportHeight = window.innerHeight;
    const minHeight = viewportHeight - 332;
    responseRef.current.style.minHeight = `${minHeight}px`;
    const scrollDistance = wrapper.current.scrollHeight;
    wrapper.current.scrollBy({
      top: scrollDistance,
      left: 0,
      behavior: 'smooth'
    });
    setShouldReveal(true);
  };
  const {
    displayedText: textToDisplay,
    isComplete: revealComplete
  } = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.useRevealText)(content || '', 50, shouldReveal);
  const htmlContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const processedHTMLContent = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.processContentForMarkdown)(textToDisplay);
    const markedContent = processedHTMLContent ? (0,marked__WEBPACK_IMPORTED_MODULE_5__.marked)(processedHTMLContent) : '';
    return markedContent;
  }, [textToDisplay]);
  function shouldShowFeedback() {
    return !noResult && !feedbackSubmitted && showFeedbackSection && content && revealComplete && content.length > 0;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    ref: responseRef,
    className: "helpcenter-response-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ResultHeader__WEBPACK_IMPORTED_MODULE_3__["default"], {
      noResult: noResult,
      isNewEntry: isNewEntry,
      questionBlock: questionBlock
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ResultContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
      noResult: noResult,
      isNewEntry: isNewEntry,
      content: htmlContent,
      isLoading: isLoading,
      loadingQuery: loadingQuery,
      loadingIndex: loadingIndex,
      index: index,
      questionBlock: questionBlock,
      source: source
    }), shouldShowFeedback() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ResultFeedback__WEBPACK_IMPORTED_MODULE_1__["default"], {
      postId: postId,
      source: source
    })]
  });
};

/***/ }),

/***/ "./src/components/ResultList/ResultContent.js":
/*!****************************************************!*\
  !*** ./src/components/ResultList/ResultContent.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _icons_ai_stars_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons/ai-stars.svg */ "./src/icons/ai-stars.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function ResultContent({
  isLoading,
  loadingQuery,
  loadingIndex,
  source,
  index,
  questionBlock,
  content
}) {
  function renderContentOrLoading() {
    // 2) Check loading scenario
    const isAISourceLoading = isLoading && source === 'ai' && loadingQuery === questionBlock && loadingIndex === index;
    if (isAISourceLoading) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "loading-cursor"
      });
    }

    // 3) If there's actual content
    if (content && content.length > 0) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        className: "helpcenter-results",
        dangerouslySetInnerHTML: {
          __html: content
        }
      });
    }

    // 4) Otherwise, render nothing or handle other edge cases
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "helpcenter-result-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "helpcenter-result-block__aistars",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_icons_ai_stars_svg__WEBPACK_IMPORTED_MODULE_0__.ReactComponent, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      children: renderContentOrLoading()
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResultContent);

/***/ }),

/***/ "./src/components/ResultList/ResultFeedback.js":
/*!*****************************************************!*\
  !*** ./src/components/ResultList/ResultFeedback.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const ResultFeedback = ({
  postId,
  source
}) => {
  const [status, setStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [hasSubmitted, setHasSubmitted] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showThanksMessage, setShowThanksMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const yesButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const noButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const postFeedback = async () => {
    if (status === 'helpful' || status === 'notHelpful') {
      _utils__WEBPACK_IMPORTED_MODULE_2__.InteractionAPIs.postFeedback(postId, status);
      _utils__WEBPACK_IMPORTED_MODULE_2__.Analytics.sendEvent('help_feedback_submitted', {
        label_key: 'type',
        type: status === 'helpful' ? 'positive' : 'negative',
        source,
        post_id: postId,
        page: window.location.href.toString()
      });
    }
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setStatus('');
    noButtonRef.current.className = 'feedback-button no';
    yesButtonRef.current.className = 'feedback-button yes';
  }, [postId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    postFeedback();
    if (status === 'helpful' || status === 'notHelpful') {
      setHasSubmitted(true);
      setShowThanksMessage(true);
      const timeout = setTimeout(() => {
        setShowThanksMessage(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [status]);
  const handleFeedback = feedback => {
    setStatus(feedback);
    _utils__WEBPACK_IMPORTED_MODULE_2__.LocalStorageUtils.updateFeedbackStatus(postId);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "feedback-container",
    children: [!hasSubmitted && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "feedback-question",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Did this result help you?', 'wp-module-help-center')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "icon",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
          ref: yesButtonRef,
          onClick: () => handleFeedback('helpful'),
          className: "feedback-button yes",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Yes', 'wp-module-help-center')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
          onClick: () => handleFeedback('notHelpful'),
          ref: noButtonRef,
          className: "feedback-button no",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No', 'wp-module-help-center')
        })]
      })]
    }), hasSubmitted && showThanksMessage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "thanks-message",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Thanks for the feedback!', 'wp-module-help-center')
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResultFeedback);

/***/ }),

/***/ "./src/components/ResultList/ResultHeader.js":
/*!***************************************************!*\
  !*** ./src/components/ResultList/ResultHeader.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResultHeader)
/* harmony export */ });
/* harmony import */ var _icons_user_avatar_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons/user-avatar.svg */ "./src/icons/user-avatar.svg");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function ResultHeader({
  noResult,
  isNewEntry,
  questionBlock
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "helpcenter-question-block",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "helpcenter-question__user-avatar",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_icons_user_avatar_svg__WEBPACK_IMPORTED_MODULE_0__.ReactComponent, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      children: noResult && isNewEntry ? _utils__WEBPACK_IMPORTED_MODULE_1__.LocalStorageUtils.getSearchInput() : questionBlock
    })]
  });
}

/***/ }),

/***/ "./src/components/ResultList/index.js":
/*!********************************************!*\
  !*** ./src/components/ResultList/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Result__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Result */ "./src/components/ResultList/Result.js");
/* harmony import */ var _NoResults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NoResults */ "./src/components/ResultList/NoResults.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* eslint-disable no-shadow */



const ResultList = ({
  wrapper,
  noResult,
  loadingQuery,
  loadingIndex,
  isNewResult,
  isLoading,
  source,
  resultContent,
  resultsContainer,
  searchInput
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "hc-results-container",
      ref: resultsContainer,
      style: {
        visibility: 'hidden'
      },
      children: [resultContent?.length > 0 && resultContent.map((result, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Result__WEBPACK_IMPORTED_MODULE_0__.Result, {
        content: result.resultContent,
        noResult: noResult,
        postId: result.postId,
        source: source,
        showFeedbackSection: !result.resultContent.includes('do not possess the answer'),
        questionBlock: result.searchInput,
        isLoading: isLoading,
        loadingQuery: loadingQuery,
        loadingIndex: loadingIndex,
        index: index,
        isNewResult: isNewResult,
        searchInput: searchInput,
        wrapper: wrapper,
        feedbackSubmitted: result.feedbackSubmitted || false
      }, index)), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Result__WEBPACK_IMPORTED_MODULE_0__.Result, {
        content: null,
        noResult: false,
        postId: null,
        source: "ai",
        showFeedbackSection: false,
        questionBlock: loadingQuery,
        isLoading: isLoading,
        loadingQuery: loadingQuery,
        loadingIndex: loadingIndex,
        index: resultContent.length,
        isNewResult: isNewResult,
        searchInput: searchInput,
        wrapper: wrapper,
        feedbackSubmitted: false
      }, "loading"), noResult && isNewResult && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_NoResults__WEBPACK_IMPORTED_MODULE_1__["default"], {
        isNewResult: isNewResult
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResultList);

/***/ }),

/***/ "./src/components/SearchInput.js":
/*!***************************************!*\
  !*** ./src/components/SearchInput.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_paper_airplane_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/paper-airplane.svg */ "./src/icons/paper-airplane.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const SearchInput = ({
  searchInput,
  handleOnChange,
  handleSubmit,
  errorMsg
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    role: "search",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search Help Center', 'wp-module-help-center'),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "helpcenter-input-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "search-container__wrapper",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "search-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "text",
            id: "search-input-box",
            value: searchInput,
            maxLength: "144",
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Ask about WordPress', 'wp-module-help-center'),
            onChange: e => handleOnChange(e),
            onKeyDown: e => e.key === 'Enter' && handleSubmit()
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
            "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('submit text', 'wp-module-help-center'),
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('submit text', 'wp-module-help-center'),
            onClick: () => handleSubmit(),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_icons_paper_airplane_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, {})
          })]
        }), errorMsg && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
          className: "hc-input-error-message",
          children: errorMsg
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "attribute",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "hc-input-counter",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
              children: [searchInput ? searchInput.length : 0, "/144"]
            })
          })
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchInput);

/***/ }),

/***/ "./src/components/SuggestionList.js":
/*!******************************************!*\
  !*** ./src/components/SuggestionList.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuggestionList: () => (/* binding */ SuggestionList)
/* harmony export */ });
/* harmony import */ var _icons_go_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../icons/go.svg */ "./src/icons/go.svg");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */



const SuggestionList = ({
  suggestionsRef,
  multiResults,
  handleSuggestionsClick
}) => {
  // Handle the click for individual suggestions
  const onSuggestionClick = (result, postTitle) => {
    handleSuggestionsClick(result, postTitle);
  };
  if (!multiResults?.hits?.length) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "suggestions-wrapper",
    id: "suggestionsWrapper",
    ref: suggestionsRef,
    children: [multiResults.hits.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("b", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Common Topics', 'wp-module-help-center')
      })
    }), multiResults.hits.map((result, index) => {
      var _result$group_key$;
      const postTitle = (_result$group_key$ = result?.group_key?.[0]) !== null && _result$group_key$ !== void 0 ? _result$group_key$ : '';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "algolia-result",
        onClick: () => onSuggestionClick(result, postTitle),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
          children: postTitle
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "svg",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_icons_go_svg__WEBPACK_IMPORTED_MODULE_0__.ReactComponent, {})
        })]
      }, index);
    })]
  });
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toggleHelp: () => (/* binding */ toggleHelp)
/* harmony export */ });
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @newfold/js-utility-ui-analytics */ "./node_modules/@newfold/js-utility-ui-analytics/build/index.js");
/* harmony import */ var _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Modal */ "./src/components/Modal.js");
/* harmony import */ var _icons_help_plugin_sidebar_icon_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./icons/help-plugin-sidebar-icon.svg */ "./src/icons/help-plugin-sidebar-icon.svg");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./styles/styles.scss */ "./src/styles/styles.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
// eslint-disable-next-line import/no-extraneous-dependencies




//


//





_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_4___default()(() => {
  // Run only once DOM is ready, else this won't work.
  if (window?.nfdHelpCenter?.restUrl) {
    _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_5__.HiiveAnalytics.initialize({
      namespace: 'wonder_help',
      urls: {
        single: window.nfdHelpCenter.restUrl + '/newfold-data/v1/events'
      },
      dependencies: {
        wpData: (_wordpress_data__WEBPACK_IMPORTED_MODULE_2___default()),
        wpApiFetch: (_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default())
      }
    });
  }
});
const wpContentContainer = document.getElementById('wpcontent');
const toggleHelp = visible => {
  wpContentContainer.classList.toggle('wpcontent-container', visible);
  const nfdHelpContainer = document.getElementById('nfd-help-center');
  nfdHelpContainer.classList.toggle('help-container', visible);
  _utils__WEBPACK_IMPORTED_MODULE_8__.LocalStorageUtils.updateHelpVisible(visible);
  window.dispatchEvent(new Event('storage'));
};
const toggleHelpViaLocalStorage = () => {
  const helpVisible = _utils__WEBPACK_IMPORTED_MODULE_8__.LocalStorageUtils.getHelpVisible();
  if (Object.is(helpVisible, undefined)) {
    toggleHelp(true);
    _utils__WEBPACK_IMPORTED_MODULE_8__.Analytics.sendEvent('help_sidebar_opened', {
      page: window.location.href.toString()
    });
    return;
  }
  if (!helpVisible) {
    _utils__WEBPACK_IMPORTED_MODULE_8__.Analytics.sendEvent('help_sidebar_opened', {
      page: window.location.href.toString()
    });
  }
  toggleHelp(!helpVisible);
};
window.newfoldEmbeddedHelp = {
  toggleNFDLaunchedEmbeddedHelp: () => {
    toggleHelpViaLocalStorage();
  },
  renderEmbeddedHelp: () => {
    const helpContainer = document.createElement('div');
    helpContainer.id = 'nfd-help-center';
    helpContainer.style.display = 'none';
    wpContentContainer.appendChild(helpContainer);
    const DOM_TARGET = document.getElementById('nfd-help-center');
    if (null !== DOM_TARGET) {
      if ('undefined' !== _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot) {
        // WP 6.2+ only
        (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(DOM_TARGET).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_6__["default"], {
          onClose: () => {
            toggleHelp(false);
          }
        }));
      } else if ('undefined' !== _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.render) {
        (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.render)(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_6__["default"], {
          onClose: () => {
            toggleHelp(false);
          }
        }), DOM_TARGET);
      }
    }
  }
};

//For rendering embedded help in Add, edit and View Pages
/* Using the subscribe from the store to keep the UI persistent */
const unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.subscribe)(() => {
  const wrapper = document.getElementById('nfd-help-menu-button-wrapper');
  if (wrapper) {
    unsubscribe(); // Unsubscribe from the state changes
    return;
  }
  _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_4___default()(() => {
    const editorToolbarSettings = document.querySelector('.edit-post-header__settings');
    if (!editorToolbarSettings) {
      return;
    }

    // Create wrapper to fill with the button
    const buttonWrapper = document.createElement('div');
    buttonWrapper.id = 'nfd-help-menu-button-wrapper';
    buttonWrapper.classList.add('nfd-help-menu-button-wrapper');
    const moreMenuDropdown = editorToolbarSettings.querySelector('.components-dropdown-menu.interface-more-menu-dropdown');
    if (moreMenuDropdown) {
      editorToolbarSettings.insertBefore(buttonWrapper, moreMenuDropdown);
    } else {
      editorToolbarSettings.appendChild(buttonWrapper);
    }
    const helpMenuButton = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("button", {
      className: "components-button has-icon",
      onClick: () => {
        window.newfoldEmbeddedHelp.toggleNFDLaunchedEmbeddedHelp();
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_icons_help_plugin_sidebar_icon_svg__WEBPACK_IMPORTED_MODULE_7__.ReactComponent, {})
    });
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.render)(helpMenuButton, document.getElementById('nfd-help-menu-button-wrapper'));
  });
});
window.newfoldEmbeddedHelp.renderEmbeddedHelp();

/* The method added to the window object can be used to open the help center pop and enter the text/query clicked */

window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery = function (selectedText, launchByElement) {
  const helpVisible = _utils__WEBPACK_IMPORTED_MODULE_8__.LocalStorageUtils.getHelpVisible();
  _utils__WEBPACK_IMPORTED_MODULE_8__.LocalStorageUtils.persistSearchInput(selectedText);
  if (helpVisible !== 'true' && launchByElement) {
    window.newfoldEmbeddedHelp.renderEmbeddedHelp(); // Ensure this is called to update the UI
    toggleHelp(true);
  }
  const isElementVisible = element => {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  };

  // Create the Enter key event in advance
  // eslint-disable-next-line no-undef
  const enterKey = new KeyboardEvent('keydown', {
    bubbles: true,
    // Allow the event to bubble up
    cancelable: true,
    // Allow the event to be cancellable
    key: 'Enter',
    // Specify which key is pressed
    code: 'Enter',
    // Physical key code
    keyCode: 13 // Deprecated but included for compatibility
  });
  const targetElement = document.getElementById('nfd-help-center');
  const maxAttempts = 5;
  let attempts = 0;
  const searchInterval = setInterval(() => {
    attempts++;
    if (targetElement && isElementVisible(targetElement)) {
      const searchInput = document.getElementById('search-input-box');
      searchInput.value = selectedText;
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
      // Dispatch the pre-created Enter key event to the input
      searchInput.dispatchEvent(enterKey);
      clearInterval(searchInterval);
    } else if (attempts >= maxAttempts) {
      clearInterval(searchInterval);
    }
  }, 500);
};

/* Detect click event on the calling element and  checking if the clicked element has a specific data attribute name nfdhelpcenterquery */
document.addEventListener('click', event => {
  try {
    if (event.target?.dataset?.nfdhelpcenterquery && event.target.dataset.nfdhelpcenterquery.trim() !== '') {
      window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery(event.target.dataset.nfdhelpcenterquery, true);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error launching help center via query:', error);
  }
});

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Analytics: () => (/* binding */ Analytics),
/* harmony export */   CapabilityAPI: () => (/* binding */ CapabilityAPI),
/* harmony export */   InteractionAPIs: () => (/* binding */ InteractionAPIs),
/* harmony export */   LocalStorageUtils: () => (/* binding */ LocalStorageUtils),
/* harmony export */   MultiSearchAPI: () => (/* binding */ MultiSearchAPI),
/* harmony export */   OnboardingAPIs: () => (/* binding */ OnboardingAPIs),
/* harmony export */   adjustPadding: () => (/* binding */ adjustPadding),
/* harmony export */   formatPostContent: () => (/* binding */ formatPostContent),
/* harmony export */   getResultMatches: () => (/* binding */ getResultMatches),
/* harmony export */   isValidJSON: () => (/* binding */ isValidJSON),
/* harmony export */   processContentForMarkdown: () => (/* binding */ processContentForMarkdown),
/* harmony export */   scrollToBottom: () => (/* binding */ scrollToBottom),
/* harmony export */   useRevealText: () => (/* binding */ useRevealText)
/* harmony export */ });
/* harmony import */ var _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @newfold/js-utility-ui-analytics */ "./node_modules/@newfold/js-utility-ui-analytics/build/index.js");
/* harmony import */ var _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* eslint-disable no-undef */



const base = 'nfd-help-center/v1';
const onboardingBase = 'newfold-onboarding/v1';
const InteractionAPIs = {
  postFeedback: (postId, status) => _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
    path: base + '/feedback',
    method: 'POST',
    data: {
      post_id: postId,
      status
    }
  })
};
const OnboardingAPIs = {
  getFlowData: () => _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
    path: onboardingBase + '/flow',
    method: 'GET'
  })
};
const MultiSearchAPI = {
  fetchMultiSearchResults: async (query, brand) => {
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/newfold-multi-search/v1/multi_search',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          brand
        })
      });
      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in getMultiSearchResults:', error);
      return {};
    }
  }
};
const CapabilityAPI = {
  getHelpCenterCapability: () => {
    return (
      // get the help center capability from newfold runtime
      window.NewfoldRuntime?.capabilities?.canAccessHelpCenter || false
    );
  },
  getBrand: () => {
    // get the brand name from newfold runtime
    const brand = window.NewfoldRuntime?.plugin?.brand || 'wordpress';
    // add region if HostGator
    if (brand.includes('hostgator') && window.NewfoldRuntime?.plugin?.region) {
      return brand + '-' + window.NewfoldRuntime?.plugin?.region;
    }
    return brand;
  }
};

// A wrapper to get and set things more easily
const LocalStorageUtils = {
  updateHelpVisible: visible => {
    localStorage.setItem('helpVisible', visible ? 'true' : 'false');
  },
  getHelpVisible: () => {
    return localStorage.getItem('helpVisible') === 'true';
  },
  persistResult: (resultContent, postId, searchInput) => {
    // Only store the result if resultContent has a value
    if (!resultContent || resultContent.trim() === '') {
      return;
    }

    // Retrieve existing results or initialize as an empty array
    const existingResults = LocalStorageUtils.getResultInfo();

    // Create a new result object
    const newResult = {
      searchInput,
      resultContent,
      postId
    };

    // Add new result to the array
    existingResults.push(newResult);

    // Store the updated array back in local storage
    localStorage.setItem('helpResultContent', JSON.stringify(existingResults));
  },
  persistSearchInput: searchInput => {
    localStorage.setItem('searchInput', searchInput);
  },
  clear: () => {
    localStorage.removeItem('helpResultContent');
    localStorage.removeItem('helpPostId');
    localStorage.removeItem('searchInput');
  },
  // Update getResultInfo to retrieve all results
  getResultInfo: () => {
    const results = localStorage.getItem('helpResultContent');
    return results && isValidJSON(results) ? JSON.parse(results) : [];
  },
  getSearchInput: () => {
    return localStorage.getItem('searchInput');
  },
  getFeatureFlag(flagName) {
    return localStorage.getItem(flagName);
  },
  setFeatureFlag(flagName, value) {
    localStorage.setItem(flagName, value);
  },
  updateFeedbackStatus: postId => {
    const savedResults = LocalStorageUtils.getResultInfo();
    const updatedResults = savedResults.map(result => result.postId === postId ? {
      ...result,
      feedbackSubmitted: true
    } : result);
    localStorage.setItem('helpResultContent', JSON.stringify(updatedResults));
  }
};
const Analytics = {
  sendEvent: (action, data) => {
    const hiiveEvent = new _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__.HiiveEvent('wonder_help', action, data, 'wonder_help');
    _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__.HiiveAnalytics.send(hiiveEvent);
  }
};
const useRevealText = (text, speed = 100, startReveal = false) => {
  const [displayedText, setDisplayedText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [isComplete, setIsComplete] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!text) {
      setDisplayedText('');
      setIsComplete(false);
      return;
    }

    // Only trigger the reveal effect if startReveal is true
    if (startReveal) {
      // Split text and filter out empty strings
      const words = text.trim().split(' ').filter(Boolean);
      let index = 0;

      // Initialize with the first word
      setDisplayedText(words[0]);
      setIsComplete(false);
      const intervalId = setInterval(() => {
        if (index < words.length - 1) {
          index++;
          setDisplayedText(prev => prev + ' ' + words[index]);
        } else {
          clearInterval(intervalId);
          setIsComplete(true);
        }
      }, speed);
      return () => clearInterval(intervalId);
    }
    setDisplayedText(text);
    setIsComplete(true);
  }, [text, speed, startReveal]);
  return {
    displayedText,
    isComplete
  };
};
const isValidJSON = json => {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
};
function formatPostContent(postContent = '') {
  return postContent.replace(/\n/g, '<br />');
}
function getResultMatches(query, tokensMatched, fieldsMatched) {
  const clearedQuery = query.replace(/[^\w\s]|_/g, '').replace(/\s{2,}/g, ' ').trim();
  const tokensPerQuery = tokensMatched / clearedQuery.split(/\s+/).length;
  return fieldsMatched >= 1 && tokensPerQuery >= 0.99;
}
function scrollToBottom(wrapperRef, introRef, resultsContainerRef) {
  if (!wrapperRef?.current) return;
  const scrollDistance = wrapperRef.current.scrollHeight;
  wrapperRef.current.scrollBy({
    top: scrollDistance,
    left: 0,
    behavior: 'auto'
  });
  setTimeout(() => {
    if (introRef?.current) {
      introRef.current.style.visibility = 'visible';
    }
    if (resultsContainerRef?.current) {
      resultsContainerRef.current.style.visibility = 'visible';
    }
  }, 100);
}
function adjustPadding(wrapperRef, suggestionsRef, showSuggestions) {
  let paddingBottom = 0;
  if (showSuggestions && suggestionsRef?.current) {
    const suggestionsHeight = suggestionsRef.current.getBoundingClientRect().height;
    paddingBottom = `${suggestionsHeight}px`;
  }
  if (wrapperRef?.current) {
    wrapperRef.current.style.paddingBottom = paddingBottom;
  }
}

/* Parse the html in string to a document node, replace the <p>  tags with a fragment and line break */
const processContentForMarkdown = textToDisplay => {
  if (textToDisplay) {
    // eslint-disable-next-line no-undef
    const parser = new DOMParser();
    const doc = parser.parseFromString(textToDisplay, 'text/html');
    const paragraphElements = doc.querySelectorAll('p');
    paragraphElements.forEach(p => {
      // Create a DocumentFragment to hold the content and <br> tags
      const fragment = document.createDocumentFragment();

      // Append all child nodes of the <p> to the fragment
      while (p.firstChild) {
        fragment.appendChild(p.firstChild);
      }
      const br1 = document.createElement('br');
      const br2 = document.createElement('br');
      fragment.appendChild(br1);
      fragment.appendChild(br2);

      // Replace the <p> element with the fragment
      p.parentNode.replaceChild(fragment, p);
    });
    const updatedContent = doc.body.innerHTML;
    return updatedContent;
  }
  return '';
};

/***/ }),

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; };
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
  defineProperty(
    GeneratorFunctionPrototype,
    "constructor",
    { value: GeneratorFunction, configurable: true }
  );
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    defineProperty(this, "_invoke", { value: enqueue });
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per GeneratorResume behavior specified since ES2015:
        // ES2015 spec, step 3: https://262.ecma-international.org/6.0/#sec-generatorresume
        // Latest spec, step 2: https://tc39.es/ecma262/#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method;
    var method = delegate.iterator[methodName];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method, or a missing .next method, always terminate the
      // yield* loop.
      context.delegate = null;

      // Note: ["return"] must be used for ES3 parsing compatibility.
      if (methodName === "throw" && delegate.iterator["return"]) {
        // If the delegate iterator has a return method, give it a
        // chance to clean up.
        context.method = "return";
        context.arg = undefined;
        maybeInvokeDelegate(delegate, context);

        if (context.method === "throw") {
          // If maybeInvokeDelegate(context) changed context.method from
          // "return" to "throw", let that override the TypeError below.
          return ContinueSentinel;
        }
      }
      if (methodName !== "return") {
        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a '" + methodName + "' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(val) {
    var object = Object(val);
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable != null) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    throw new TypeError(typeof iterable + " is not iterable");
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
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

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

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

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/marked/lib/marked.esm.js":
/*!***********************************************!*\
  !*** ./node_modules/marked/lib/marked.esm.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hooks: () => (/* binding */ _Hooks),
/* harmony export */   Lexer: () => (/* binding */ _Lexer),
/* harmony export */   Marked: () => (/* binding */ Marked),
/* harmony export */   Parser: () => (/* binding */ _Parser),
/* harmony export */   Renderer: () => (/* binding */ _Renderer),
/* harmony export */   TextRenderer: () => (/* binding */ _TextRenderer),
/* harmony export */   Tokenizer: () => (/* binding */ _Tokenizer),
/* harmony export */   defaults: () => (/* binding */ _defaults),
/* harmony export */   getDefaults: () => (/* binding */ _getDefaults),
/* harmony export */   lexer: () => (/* binding */ lexer),
/* harmony export */   marked: () => (/* binding */ marked),
/* harmony export */   options: () => (/* binding */ options),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   parseInline: () => (/* binding */ parseInline),
/* harmony export */   parser: () => (/* binding */ parser),
/* harmony export */   setOptions: () => (/* binding */ setOptions),
/* harmony export */   use: () => (/* binding */ use),
/* harmony export */   walkTokens: () => (/* binding */ walkTokens)
/* harmony export */ });
/**
 * marked v14.0.0 - a markdown parser
 * Copyright (c) 2011-2024, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */

/**
 * Gets the original marked default options.
 */
function _getDefaults() {
    return {
        async: false,
        breaks: false,
        extensions: null,
        gfm: true,
        hooks: null,
        pedantic: false,
        renderer: null,
        silent: false,
        tokenizer: null,
        walkTokens: null,
    };
}
let _defaults = _getDefaults();
function changeDefaults(newDefaults) {
    _defaults = newDefaults;
}

/**
 * Helpers
 */
const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, 'g');
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');
const escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape$1(html, encode) {
    if (encode) {
        if (escapeTest.test(html)) {
            return html.replace(escapeReplace, getEscapeReplacement);
        }
    }
    else {
        if (escapeTestNoEncode.test(html)) {
            return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
        }
    }
    return html;
}
const caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
    let source = typeof regex === 'string' ? regex : regex.source;
    opt = opt || '';
    const obj = {
        replace: (name, val) => {
            let valSource = typeof val === 'string' ? val : val.source;
            valSource = valSource.replace(caret, '$1');
            source = source.replace(name, valSource);
            return obj;
        },
        getRegex: () => {
            return new RegExp(source, opt);
        },
    };
    return obj;
}
function cleanUrl(href) {
    try {
        href = encodeURI(href).replace(/%25/g, '%');
    }
    catch {
        return null;
    }
    return href;
}
const noopTest = { exec: () => null };
function splitCells(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    const row = tableRow.replace(/\|/g, (match, offset, str) => {
        let escaped = false;
        let curr = offset;
        while (--curr >= 0 && str[curr] === '\\')
            escaped = !escaped;
        if (escaped) {
            // odd number of slashes means | is escaped
            // so we leave it alone
            return '|';
        }
        else {
            // add space before unescaped |
            return ' |';
        }
    }), cells = row.split(/ \|/);
    let i = 0;
    // First/last cell in a row cannot be empty if it has no leading/trailing pipe
    if (!cells[0].trim()) {
        cells.shift();
    }
    if (cells.length > 0 && !cells[cells.length - 1].trim()) {
        cells.pop();
    }
    if (count) {
        if (cells.length > count) {
            cells.splice(count);
        }
        else {
            while (cells.length < count)
                cells.push('');
        }
    }
    for (; i < cells.length; i++) {
        // leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(/\\\|/g, '|');
    }
    return cells;
}
/**
 * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
 * /c*$/ is vulnerable to REDOS.
 *
 * @param str
 * @param c
 * @param invert Remove suffix of non-c chars instead. Default falsey.
 */
function rtrim(str, c, invert) {
    const l = str.length;
    if (l === 0) {
        return '';
    }
    // Length of suffix matching the invert condition.
    let suffLen = 0;
    // Step left until we fail to match the invert condition.
    while (suffLen < l) {
        const currChar = str.charAt(l - suffLen - 1);
        if (currChar === c && !invert) {
            suffLen++;
        }
        else if (currChar !== c && invert) {
            suffLen++;
        }
        else {
            break;
        }
    }
    return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
        return -1;
    }
    let level = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '\\') {
            i++;
        }
        else if (str[i] === b[0]) {
            level++;
        }
        else if (str[i] === b[1]) {
            level--;
            if (level < 0) {
                return i;
            }
        }
    }
    return -1;
}

function outputLink(cap, link, raw, lexer) {
    const href = link.href;
    const title = link.title ? escape$1(link.title) : null;
    const text = cap[1].replace(/\\([\[\]])/g, '$1');
    if (cap[0].charAt(0) !== '!') {
        lexer.state.inLink = true;
        const token = {
            type: 'link',
            raw,
            href,
            title,
            text,
            tokens: lexer.inlineTokens(text),
        };
        lexer.state.inLink = false;
        return token;
    }
    return {
        type: 'image',
        raw,
        href,
        title,
        text: escape$1(text),
    };
}
function indentCodeCompensation(raw, text) {
    const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
    if (matchIndentToCode === null) {
        return text;
    }
    const indentToCode = matchIndentToCode[1];
    return text
        .split('\n')
        .map(node => {
        const matchIndentInNode = node.match(/^\s+/);
        if (matchIndentInNode === null) {
            return node;
        }
        const [indentInNode] = matchIndentInNode;
        if (indentInNode.length >= indentToCode.length) {
            return node.slice(indentToCode.length);
        }
        return node;
    })
        .join('\n');
}
/**
 * Tokenizer
 */
class _Tokenizer {
    options;
    rules; // set by the lexer
    lexer; // set by the lexer
    constructor(options) {
        this.options = options || _defaults;
    }
    space(src) {
        const cap = this.rules.block.newline.exec(src);
        if (cap && cap[0].length > 0) {
            return {
                type: 'space',
                raw: cap[0],
            };
        }
    }
    code(src) {
        const cap = this.rules.block.code.exec(src);
        if (cap) {
            const text = cap[0].replace(/^ {1,4}/gm, '');
            return {
                type: 'code',
                raw: cap[0],
                codeBlockStyle: 'indented',
                text: !this.options.pedantic
                    ? rtrim(text, '\n')
                    : text,
            };
        }
    }
    fences(src) {
        const cap = this.rules.block.fences.exec(src);
        if (cap) {
            const raw = cap[0];
            const text = indentCodeCompensation(raw, cap[3] || '');
            return {
                type: 'code',
                raw,
                lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, '$1') : cap[2],
                text,
            };
        }
    }
    heading(src) {
        const cap = this.rules.block.heading.exec(src);
        if (cap) {
            let text = cap[2].trim();
            // remove trailing #s
            if (/#$/.test(text)) {
                const trimmed = rtrim(text, '#');
                if (this.options.pedantic) {
                    text = trimmed.trim();
                }
                else if (!trimmed || / $/.test(trimmed)) {
                    // CommonMark requires space before trailing #s
                    text = trimmed.trim();
                }
            }
            return {
                type: 'heading',
                raw: cap[0],
                depth: cap[1].length,
                text,
                tokens: this.lexer.inline(text),
            };
        }
    }
    hr(src) {
        const cap = this.rules.block.hr.exec(src);
        if (cap) {
            return {
                type: 'hr',
                raw: rtrim(cap[0], '\n'),
            };
        }
    }
    blockquote(src) {
        const cap = this.rules.block.blockquote.exec(src);
        if (cap) {
            let lines = rtrim(cap[0], '\n').split('\n');
            let raw = '';
            let text = '';
            const tokens = [];
            while (lines.length > 0) {
                let inBlockquote = false;
                const currentLines = [];
                let i;
                for (i = 0; i < lines.length; i++) {
                    // get lines up to a continuation
                    if (/^ {0,3}>/.test(lines[i])) {
                        currentLines.push(lines[i]);
                        inBlockquote = true;
                    }
                    else if (!inBlockquote) {
                        currentLines.push(lines[i]);
                    }
                    else {
                        break;
                    }
                }
                lines = lines.slice(i);
                const currentRaw = currentLines.join('\n');
                const currentText = currentRaw
                    // precede setext continuation with 4 spaces so it isn't a setext
                    .replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, '\n    $1')
                    .replace(/^ {0,3}>[ \t]?/gm, '');
                raw = raw ? `${raw}\n${currentRaw}` : currentRaw;
                text = text ? `${text}\n${currentText}` : currentText;
                // parse blockquote lines as top level tokens
                // merge paragraphs if this is a continuation
                const top = this.lexer.state.top;
                this.lexer.state.top = true;
                this.lexer.blockTokens(currentText, tokens, true);
                this.lexer.state.top = top;
                // if there is no continuation then we are done
                if (lines.length === 0) {
                    break;
                }
                const lastToken = tokens[tokens.length - 1];
                if (lastToken?.type === 'code') {
                    // blockquote continuation cannot be preceded by a code block
                    break;
                }
                else if (lastToken?.type === 'blockquote') {
                    // include continuation in nested blockquote
                    const oldToken = lastToken;
                    const newText = oldToken.raw + '\n' + lines.join('\n');
                    const newToken = this.blockquote(newText);
                    tokens[tokens.length - 1] = newToken;
                    raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
                    text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
                    break;
                }
                else if (lastToken?.type === 'list') {
                    // include continuation in nested list
                    const oldToken = lastToken;
                    const newText = oldToken.raw + '\n' + lines.join('\n');
                    const newToken = this.list(newText);
                    tokens[tokens.length - 1] = newToken;
                    raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
                    text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
                    lines = newText.substring(tokens[tokens.length - 1].raw.length).split('\n');
                    continue;
                }
            }
            return {
                type: 'blockquote',
                raw,
                tokens,
                text,
            };
        }
    }
    list(src) {
        let cap = this.rules.block.list.exec(src);
        if (cap) {
            let bull = cap[1].trim();
            const isordered = bull.length > 1;
            const list = {
                type: 'list',
                raw: '',
                ordered: isordered,
                start: isordered ? +bull.slice(0, -1) : '',
                loose: false,
                items: [],
            };
            bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
            if (this.options.pedantic) {
                bull = isordered ? bull : '[*+-]';
            }
            // Get next list item
            const itemRegex = new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`);
            let endsWithBlankLine = false;
            // Check if current bullet point can start a new List Item
            while (src) {
                let endEarly = false;
                let raw = '';
                let itemContents = '';
                if (!(cap = itemRegex.exec(src))) {
                    break;
                }
                if (this.rules.block.hr.test(src)) { // End list if bullet was actually HR (possibly move into itemRegex?)
                    break;
                }
                raw = cap[0];
                src = src.substring(raw.length);
                let line = cap[2].split('\n', 1)[0].replace(/^\t+/, (t) => ' '.repeat(3 * t.length));
                let nextLine = src.split('\n', 1)[0];
                let blankLine = !line.trim();
                let indent = 0;
                if (this.options.pedantic) {
                    indent = 2;
                    itemContents = line.trimStart();
                }
                else if (blankLine) {
                    indent = cap[1].length + 1;
                }
                else {
                    indent = cap[2].search(/[^ ]/); // Find first non-space char
                    indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
                    itemContents = line.slice(indent);
                    indent += cap[1].length;
                }
                if (blankLine && /^ *$/.test(nextLine)) { // Items begin with at most one blank line
                    raw += nextLine + '\n';
                    src = src.substring(nextLine.length + 1);
                    endEarly = true;
                }
                if (!endEarly) {
                    const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`);
                    const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
                    const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
                    const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
                    // Check if following lines should be included in List Item
                    while (src) {
                        const rawLine = src.split('\n', 1)[0];
                        nextLine = rawLine;
                        // Re-align to follow commonmark nesting rules
                        if (this.options.pedantic) {
                            nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ');
                        }
                        // End list item if found code fences
                        if (fencesBeginRegex.test(nextLine)) {
                            break;
                        }
                        // End list item if found start of new heading
                        if (headingBeginRegex.test(nextLine)) {
                            break;
                        }
                        // End list item if found start of new bullet
                        if (nextBulletRegex.test(nextLine)) {
                            break;
                        }
                        // Horizontal rule found
                        if (hrRegex.test(src)) {
                            break;
                        }
                        if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) { // Dedent if possible
                            itemContents += '\n' + nextLine.slice(indent);
                        }
                        else {
                            // not enough indentation
                            if (blankLine) {
                                break;
                            }
                            // paragraph continuation unless last line was a different block level element
                            if (line.search(/[^ ]/) >= 4) { // indented code block
                                break;
                            }
                            if (fencesBeginRegex.test(line)) {
                                break;
                            }
                            if (headingBeginRegex.test(line)) {
                                break;
                            }
                            if (hrRegex.test(line)) {
                                break;
                            }
                            itemContents += '\n' + nextLine;
                        }
                        if (!blankLine && !nextLine.trim()) { // Check if current line is blank
                            blankLine = true;
                        }
                        raw += rawLine + '\n';
                        src = src.substring(rawLine.length + 1);
                        line = nextLine.slice(indent);
                    }
                }
                if (!list.loose) {
                    // If the previous item ended with a blank line, the list is loose
                    if (endsWithBlankLine) {
                        list.loose = true;
                    }
                    else if (/\n *\n *$/.test(raw)) {
                        endsWithBlankLine = true;
                    }
                }
                let istask = null;
                let ischecked;
                // Check for task list items
                if (this.options.gfm) {
                    istask = /^\[[ xX]\] /.exec(itemContents);
                    if (istask) {
                        ischecked = istask[0] !== '[ ] ';
                        itemContents = itemContents.replace(/^\[[ xX]\] +/, '');
                    }
                }
                list.items.push({
                    type: 'list_item',
                    raw,
                    task: !!istask,
                    checked: ischecked,
                    loose: false,
                    text: itemContents,
                    tokens: [],
                });
                list.raw += raw;
            }
            // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
            list.items[list.items.length - 1].raw = list.items[list.items.length - 1].raw.trimEnd();
            list.items[list.items.length - 1].text = list.items[list.items.length - 1].text.trimEnd();
            list.raw = list.raw.trimEnd();
            // Item child tokens handled here at end because we needed to have the final item to trim it first
            for (let i = 0; i < list.items.length; i++) {
                this.lexer.state.top = false;
                list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
                if (!list.loose) {
                    // Check if list should be loose
                    const spacers = list.items[i].tokens.filter(t => t.type === 'space');
                    const hasMultipleLineBreaks = spacers.length > 0 && spacers.some(t => /\n.*\n/.test(t.raw));
                    list.loose = hasMultipleLineBreaks;
                }
            }
            // Set all items to loose if list is loose
            if (list.loose) {
                for (let i = 0; i < list.items.length; i++) {
                    list.items[i].loose = true;
                }
            }
            return list;
        }
    }
    html(src) {
        const cap = this.rules.block.html.exec(src);
        if (cap) {
            const token = {
                type: 'html',
                block: true,
                raw: cap[0],
                pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
                text: cap[0],
            };
            return token;
        }
    }
    def(src) {
        const cap = this.rules.block.def.exec(src);
        if (cap) {
            const tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
            const href = cap[2] ? cap[2].replace(/^<(.*)>$/, '$1').replace(this.rules.inline.anyPunctuation, '$1') : '';
            const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, '$1') : cap[3];
            return {
                type: 'def',
                tag,
                raw: cap[0],
                href,
                title,
            };
        }
    }
    table(src) {
        const cap = this.rules.block.table.exec(src);
        if (!cap) {
            return;
        }
        if (!/[:|]/.test(cap[2])) {
            // delimiter row must have a pipe (|) or colon (:) otherwise it is a setext heading
            return;
        }
        const headers = splitCells(cap[1]);
        const aligns = cap[2].replace(/^\||\| *$/g, '').split('|');
        const rows = cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, '').split('\n') : [];
        const item = {
            type: 'table',
            raw: cap[0],
            header: [],
            align: [],
            rows: [],
        };
        if (headers.length !== aligns.length) {
            // header and align columns must be equal, rows can be different.
            return;
        }
        for (const align of aligns) {
            if (/^ *-+: *$/.test(align)) {
                item.align.push('right');
            }
            else if (/^ *:-+: *$/.test(align)) {
                item.align.push('center');
            }
            else if (/^ *:-+ *$/.test(align)) {
                item.align.push('left');
            }
            else {
                item.align.push(null);
            }
        }
        for (let i = 0; i < headers.length; i++) {
            item.header.push({
                text: headers[i],
                tokens: this.lexer.inline(headers[i]),
                header: true,
                align: item.align[i],
            });
        }
        for (const row of rows) {
            item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
                return {
                    text: cell,
                    tokens: this.lexer.inline(cell),
                    header: false,
                    align: item.align[i],
                };
            }));
        }
        return item;
    }
    lheading(src) {
        const cap = this.rules.block.lheading.exec(src);
        if (cap) {
            return {
                type: 'heading',
                raw: cap[0],
                depth: cap[2].charAt(0) === '=' ? 1 : 2,
                text: cap[1],
                tokens: this.lexer.inline(cap[1]),
            };
        }
    }
    paragraph(src) {
        const cap = this.rules.block.paragraph.exec(src);
        if (cap) {
            const text = cap[1].charAt(cap[1].length - 1) === '\n'
                ? cap[1].slice(0, -1)
                : cap[1];
            return {
                type: 'paragraph',
                raw: cap[0],
                text,
                tokens: this.lexer.inline(text),
            };
        }
    }
    text(src) {
        const cap = this.rules.block.text.exec(src);
        if (cap) {
            return {
                type: 'text',
                raw: cap[0],
                text: cap[0],
                tokens: this.lexer.inline(cap[0]),
            };
        }
    }
    escape(src) {
        const cap = this.rules.inline.escape.exec(src);
        if (cap) {
            return {
                type: 'escape',
                raw: cap[0],
                text: escape$1(cap[1]),
            };
        }
    }
    tag(src) {
        const cap = this.rules.inline.tag.exec(src);
        if (cap) {
            if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
                this.lexer.state.inLink = true;
            }
            else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
                this.lexer.state.inLink = false;
            }
            if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                this.lexer.state.inRawBlock = true;
            }
            else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                this.lexer.state.inRawBlock = false;
            }
            return {
                type: 'html',
                raw: cap[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                block: false,
                text: cap[0],
            };
        }
    }
    link(src) {
        const cap = this.rules.inline.link.exec(src);
        if (cap) {
            const trimmedUrl = cap[2].trim();
            if (!this.options.pedantic && /^</.test(trimmedUrl)) {
                // commonmark requires matching angle brackets
                if (!(/>$/.test(trimmedUrl))) {
                    return;
                }
                // ending angle bracket cannot be escaped
                const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');
                if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
                    return;
                }
            }
            else {
                // find closing parenthesis
                const lastParenIndex = findClosingBracket(cap[2], '()');
                if (lastParenIndex > -1) {
                    const start = cap[0].indexOf('!') === 0 ? 5 : 4;
                    const linkLen = start + cap[1].length + lastParenIndex;
                    cap[2] = cap[2].substring(0, lastParenIndex);
                    cap[0] = cap[0].substring(0, linkLen).trim();
                    cap[3] = '';
                }
            }
            let href = cap[2];
            let title = '';
            if (this.options.pedantic) {
                // split pedantic href and title
                const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
                if (link) {
                    href = link[1];
                    title = link[3];
                }
            }
            else {
                title = cap[3] ? cap[3].slice(1, -1) : '';
            }
            href = href.trim();
            if (/^</.test(href)) {
                if (this.options.pedantic && !(/>$/.test(trimmedUrl))) {
                    // pedantic allows starting angle bracket without ending angle bracket
                    href = href.slice(1);
                }
                else {
                    href = href.slice(1, -1);
                }
            }
            return outputLink(cap, {
                href: href ? href.replace(this.rules.inline.anyPunctuation, '$1') : href,
                title: title ? title.replace(this.rules.inline.anyPunctuation, '$1') : title,
            }, cap[0], this.lexer);
        }
    }
    reflink(src, links) {
        let cap;
        if ((cap = this.rules.inline.reflink.exec(src))
            || (cap = this.rules.inline.nolink.exec(src))) {
            const linkString = (cap[2] || cap[1]).replace(/\s+/g, ' ');
            const link = links[linkString.toLowerCase()];
            if (!link) {
                const text = cap[0].charAt(0);
                return {
                    type: 'text',
                    raw: text,
                    text,
                };
            }
            return outputLink(cap, link, cap[0], this.lexer);
        }
    }
    emStrong(src, maskedSrc, prevChar = '') {
        let match = this.rules.inline.emStrongLDelim.exec(src);
        if (!match)
            return;
        // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
        if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
            return;
        const nextChar = match[1] || match[2] || '';
        if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
            // unicode Regex counts emoji as 1 char; spread into array for proper count (used multiple times below)
            const lLength = [...match[0]].length - 1;
            let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
            const endReg = match[0][0] === '*' ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
            endReg.lastIndex = 0;
            // Clip maskedSrc to same section of string as src (move to lexer?)
            maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
            while ((match = endReg.exec(maskedSrc)) != null) {
                rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
                if (!rDelim)
                    continue; // skip single * in __abc*abc__
                rLength = [...rDelim].length;
                if (match[3] || match[4]) { // found another Left Delim
                    delimTotal += rLength;
                    continue;
                }
                else if (match[5] || match[6]) { // either Left or Right Delim
                    if (lLength % 3 && !((lLength + rLength) % 3)) {
                        midDelimTotal += rLength;
                        continue; // CommonMark Emphasis Rules 9-10
                    }
                }
                delimTotal -= rLength;
                if (delimTotal > 0)
                    continue; // Haven't found enough closing delimiters
                // Remove extra characters. *a*** -> *a*
                rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
                // char length can be >1 for unicode characters;
                const lastCharLength = [...match[0]][0].length;
                const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
                // Create `em` if smallest delimiter has odd char count. *a***
                if (Math.min(lLength, rLength) % 2) {
                    const text = raw.slice(1, -1);
                    return {
                        type: 'em',
                        raw,
                        text,
                        tokens: this.lexer.inlineTokens(text),
                    };
                }
                // Create 'strong' if smallest delimiter has even char count. **a***
                const text = raw.slice(2, -2);
                return {
                    type: 'strong',
                    raw,
                    text,
                    tokens: this.lexer.inlineTokens(text),
                };
            }
        }
    }
    codespan(src) {
        const cap = this.rules.inline.code.exec(src);
        if (cap) {
            let text = cap[2].replace(/\n/g, ' ');
            const hasNonSpaceChars = /[^ ]/.test(text);
            const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
            if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
                text = text.substring(1, text.length - 1);
            }
            text = escape$1(text, true);
            return {
                type: 'codespan',
                raw: cap[0],
                text,
            };
        }
    }
    br(src) {
        const cap = this.rules.inline.br.exec(src);
        if (cap) {
            return {
                type: 'br',
                raw: cap[0],
            };
        }
    }
    del(src) {
        const cap = this.rules.inline.del.exec(src);
        if (cap) {
            return {
                type: 'del',
                raw: cap[0],
                text: cap[2],
                tokens: this.lexer.inlineTokens(cap[2]),
            };
        }
    }
    autolink(src) {
        const cap = this.rules.inline.autolink.exec(src);
        if (cap) {
            let text, href;
            if (cap[2] === '@') {
                text = escape$1(cap[1]);
                href = 'mailto:' + text;
            }
            else {
                text = escape$1(cap[1]);
                href = text;
            }
            return {
                type: 'link',
                raw: cap[0],
                text,
                href,
                tokens: [
                    {
                        type: 'text',
                        raw: text,
                        text,
                    },
                ],
            };
        }
    }
    url(src) {
        let cap;
        if (cap = this.rules.inline.url.exec(src)) {
            let text, href;
            if (cap[2] === '@') {
                text = escape$1(cap[0]);
                href = 'mailto:' + text;
            }
            else {
                // do extended autolink path validation
                let prevCapZero;
                do {
                    prevCapZero = cap[0];
                    cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? '';
                } while (prevCapZero !== cap[0]);
                text = escape$1(cap[0]);
                if (cap[1] === 'www.') {
                    href = 'http://' + cap[0];
                }
                else {
                    href = cap[0];
                }
            }
            return {
                type: 'link',
                raw: cap[0],
                text,
                href,
                tokens: [
                    {
                        type: 'text',
                        raw: text,
                        text,
                    },
                ],
            };
        }
    }
    inlineText(src) {
        const cap = this.rules.inline.text.exec(src);
        if (cap) {
            let text;
            if (this.lexer.state.inRawBlock) {
                text = cap[0];
            }
            else {
                text = escape$1(cap[0]);
            }
            return {
                type: 'text',
                raw: cap[0],
                text,
            };
        }
    }
}

/**
 * Block-Level Grammar
 */
const newline = /^(?: *(?:\n|$))+/;
const blockCode = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/;
const fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
const hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
const heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
const bullet = /(?:[*+-]|\d{1,9}[.)])/;
const lheading = edit(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/)
    .replace(/bull/g, bullet) // lists can interrupt
    .replace(/blockCode/g, / {4}/) // indented code blocks can interrupt
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/) // fenced code blocks can interrupt
    .replace(/blockquote/g, / {0,3}>/) // blockquote can interrupt
    .replace(/heading/g, / {0,3}#{1,6}/) // ATX heading can interrupt
    .replace(/html/g, / {0,3}<[^\n>]+>\n/) // block html can interrupt
    .getRegex();
const _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
const blockText = /^[^\n]+/;
const _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
const def = edit(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/)
    .replace('label', _blockLabel)
    .replace('title', /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/)
    .getRegex();
const list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
    .replace(/bull/g, bullet)
    .getRegex();
const _tag = 'address|article|aside|base|basefont|blockquote|body|caption'
    + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
    + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
    + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
    + '|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title'
    + '|tr|track|ul';
const _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
const html = edit('^ {0,3}(?:' // optional indentation
    + '<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
    + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (6)
    + '|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) open tag
    + '|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) closing tag
    + ')', 'i')
    .replace('comment', _comment)
    .replace('tag', _tag)
    .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
    .getRegex();
const paragraph = edit(_paragraph)
    .replace('hr', hr)
    .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
    .replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
    .replace('|table', '')
    .replace('blockquote', ' {0,3}>')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
    .replace('tag', _tag) // pars can be interrupted by type (6) html blocks
    .getRegex();
const blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
    .replace('paragraph', paragraph)
    .getRegex();
/**
 * Normal Block Grammar
 */
const blockNormal = {
    blockquote,
    code: blockCode,
    def,
    fences,
    heading,
    hr,
    html,
    lheading,
    list,
    newline,
    paragraph,
    table: noopTest,
    text: blockText,
};
/**
 * GFM Block Grammar
 */
const gfmTable = edit('^ *([^\\n ].*)\\n' // Header
    + ' {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)' // Align
    + '(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)') // Cells
    .replace('hr', hr)
    .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
    .replace('blockquote', ' {0,3}>')
    .replace('code', ' {4}[^\\n]')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
    .replace('tag', _tag) // tables can be interrupted by type (6) html blocks
    .getRegex();
const blockGfm = {
    ...blockNormal,
    table: gfmTable,
    paragraph: edit(_paragraph)
        .replace('hr', hr)
        .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
        .replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
        .replace('table', gfmTable) // interrupt paragraphs with table
        .replace('blockquote', ' {0,3}>')
        .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
        .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
        .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
        .replace('tag', _tag) // pars can be interrupted by type (6) html blocks
        .getRegex(),
};
/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */
const blockPedantic = {
    ...blockNormal,
    html: edit('^ *(?:comment *(?:\\n|\\s*$)'
        + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
        + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
        .replace('comment', _comment)
        .replace(/tag/g, '(?!(?:'
        + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
        + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
        + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
        .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest, // fences not supported
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(_paragraph)
        .replace('hr', hr)
        .replace('heading', ' *#{1,6} *[^\n]')
        .replace('lheading', lheading)
        .replace('|table', '')
        .replace('blockquote', ' {0,3}>')
        .replace('|fences', '')
        .replace('|list', '')
        .replace('|html', '')
        .replace('|tag', '')
        .getRegex(),
};
/**
 * Inline-Level Grammar
 */
const escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
const inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
const br = /^( {2,}|\\)\n(?!\s*$)/;
const inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
// list of unicode punctuation marks, plus any missing characters from CommonMark spec
const _punctuation = '\\p{P}\\p{S}';
const punctuation = edit(/^((?![*_])[\spunctuation])/, 'u')
    .replace(/punctuation/g, _punctuation).getRegex();
// sequences em should skip over [title](link), `code`, <html>
const blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
const emStrongLDelim = edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, 'u')
    .replace(/punct/g, _punctuation)
    .getRegex();
const emStrongRDelimAst = edit('^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)' // Skip orphan inside strong
    + '|[^*]+(?=[^*])' // Consume to delim
    + '|(?!\\*)[punct](\\*+)(?=[\\s]|$)' // (1) #*** can only be a Right Delimiter
    + '|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)' // (2) a***#, a*** can only be a Right Delimiter
    + '|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])' // (3) #***a, ***a can only be Left Delimiter
    + '|[\\s](\\*+)(?!\\*)(?=[punct])' // (4) ***# can only be Left Delimiter
    + '|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])' // (5) #***# can be either Left or Right Delimiter
    + '|[^punct\\s](\\*+)(?=[^punct\\s])', 'gu') // (6) a***a can be either Left or Right Delimiter
    .replace(/punct/g, _punctuation)
    .getRegex();
// (6) Not allowed for _
const emStrongRDelimUnd = edit('^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)' // Skip orphan inside strong
    + '|[^_]+(?=[^_])' // Consume to delim
    + '|(?!_)[punct](_+)(?=[\\s]|$)' // (1) #___ can only be a Right Delimiter
    + '|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)' // (2) a___#, a___ can only be a Right Delimiter
    + '|(?!_)[punct\\s](_+)(?=[^punct\\s])' // (3) #___a, ___a can only be Left Delimiter
    + '|[\\s](_+)(?!_)(?=[punct])' // (4) ___# can only be Left Delimiter
    + '|(?!_)[punct](_+)(?!_)(?=[punct])', 'gu') // (5) #___# can be either Left or Right Delimiter
    .replace(/punct/g, _punctuation)
    .getRegex();
const anyPunctuation = edit(/\\([punct])/, 'gu')
    .replace(/punct/g, _punctuation)
    .getRegex();
const autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
    .replace('scheme', /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
    .replace('email', /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/)
    .getRegex();
const _inlineComment = edit(_comment).replace('(?:-->|$)', '-->').getRegex();
const tag = edit('^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>') // CDATA section
    .replace('comment', _inlineComment)
    .replace('attribute', /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/)
    .getRegex();
const _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
const link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/)
    .replace('label', _inlineLabel)
    .replace('href', /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/)
    .replace('title', /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/)
    .getRegex();
const reflink = edit(/^!?\[(label)\]\[(ref)\]/)
    .replace('label', _inlineLabel)
    .replace('ref', _blockLabel)
    .getRegex();
const nolink = edit(/^!?\[(ref)\](?:\[\])?/)
    .replace('ref', _blockLabel)
    .getRegex();
const reflinkSearch = edit('reflink|nolink(?!\\()', 'g')
    .replace('reflink', reflink)
    .replace('nolink', nolink)
    .getRegex();
/**
 * Normal Inline Grammar
 */
const inlineNormal = {
    _backpedal: noopTest, // only used for GFM url
    anyPunctuation,
    autolink,
    blockSkip,
    br,
    code: inlineCode,
    del: noopTest,
    emStrongLDelim,
    emStrongRDelimAst,
    emStrongRDelimUnd,
    escape,
    link,
    nolink,
    punctuation,
    reflink,
    reflinkSearch,
    tag,
    text: inlineText,
    url: noopTest,
};
/**
 * Pedantic Inline Grammar
 */
const inlinePedantic = {
    ...inlineNormal,
    link: edit(/^!?\[(label)\]\((.*?)\)/)
        .replace('label', _inlineLabel)
        .getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
        .replace('label', _inlineLabel)
        .getRegex(),
};
/**
 * GFM Inline Grammar
 */
const inlineGfm = {
    ...inlineNormal,
    escape: edit(escape).replace('])', '~|])').getRegex(),
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, 'i')
        .replace('email', /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/)
        .getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
};
/**
 * GFM + Line Breaks Inline Grammar
 */
const inlineBreaks = {
    ...inlineGfm,
    br: edit(br).replace('{2,}', '*').getRegex(),
    text: edit(inlineGfm.text)
        .replace('\\b_', '\\b_| {2,}\\n')
        .replace(/\{2,\}/g, '*')
        .getRegex(),
};
/**
 * exports
 */
const block = {
    normal: blockNormal,
    gfm: blockGfm,
    pedantic: blockPedantic,
};
const inline = {
    normal: inlineNormal,
    gfm: inlineGfm,
    breaks: inlineBreaks,
    pedantic: inlinePedantic,
};

/**
 * Block Lexer
 */
class _Lexer {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(options) {
        // TokenList cannot be created in one go
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options || _defaults;
        this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
        this.tokenizer = this.options.tokenizer;
        this.tokenizer.options = this.options;
        this.tokenizer.lexer = this;
        this.inlineQueue = [];
        this.state = {
            inLink: false,
            inRawBlock: false,
            top: true,
        };
        const rules = {
            block: block.normal,
            inline: inline.normal,
        };
        if (this.options.pedantic) {
            rules.block = block.pedantic;
            rules.inline = inline.pedantic;
        }
        else if (this.options.gfm) {
            rules.block = block.gfm;
            if (this.options.breaks) {
                rules.inline = inline.breaks;
            }
            else {
                rules.inline = inline.gfm;
            }
        }
        this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */
    static get rules() {
        return {
            block,
            inline,
        };
    }
    /**
     * Static Lex Method
     */
    static lex(src, options) {
        const lexer = new _Lexer(options);
        return lexer.lex(src);
    }
    /**
     * Static Lex Inline Method
     */
    static lexInline(src, options) {
        const lexer = new _Lexer(options);
        return lexer.inlineTokens(src);
    }
    /**
     * Preprocessing
     */
    lex(src) {
        src = src
            .replace(/\r\n|\r/g, '\n');
        this.blockTokens(src, this.tokens);
        for (let i = 0; i < this.inlineQueue.length; i++) {
            const next = this.inlineQueue[i];
            this.inlineTokens(next.src, next.tokens);
        }
        this.inlineQueue = [];
        return this.tokens;
    }
    blockTokens(src, tokens = [], lastParagraphClipped = false) {
        if (this.options.pedantic) {
            src = src.replace(/\t/g, '    ').replace(/^ +$/gm, '');
        }
        else {
            src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
                return leading + '    '.repeat(tabs.length);
            });
        }
        let token;
        let lastToken;
        let cutSrc;
        while (src) {
            if (this.options.extensions
                && this.options.extensions.block
                && this.options.extensions.block.some((extTokenizer) => {
                    if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
                        src = src.substring(token.raw.length);
                        tokens.push(token);
                        return true;
                    }
                    return false;
                })) {
                continue;
            }
            // newline
            if (token = this.tokenizer.space(src)) {
                src = src.substring(token.raw.length);
                if (token.raw.length === 1 && tokens.length > 0) {
                    // if there's a single \n as a spacer, it's terminating the last line,
                    // so move it there so that we don't get unnecessary paragraph tags
                    tokens[tokens.length - 1].raw += '\n';
                }
                else {
                    tokens.push(token);
                }
                continue;
            }
            // code
            if (token = this.tokenizer.code(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                // An indented code block cannot interrupt a paragraph.
                if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.text;
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                }
                else {
                    tokens.push(token);
                }
                continue;
            }
            // fences
            if (token = this.tokenizer.fences(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // heading
            if (token = this.tokenizer.heading(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // hr
            if (token = this.tokenizer.hr(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // blockquote
            if (token = this.tokenizer.blockquote(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // list
            if (token = this.tokenizer.list(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // html
            if (token = this.tokenizer.html(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // def
            if (token = this.tokenizer.def(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.raw;
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                }
                else if (!this.tokens.links[token.tag]) {
                    this.tokens.links[token.tag] = {
                        href: token.href,
                        title: token.title,
                    };
                }
                continue;
            }
            // table (gfm)
            if (token = this.tokenizer.table(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // lheading
            if (token = this.tokenizer.lheading(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // top-level paragraph
            // prevent paragraph consuming extensions by clipping 'src' to extension start
            cutSrc = src;
            if (this.options.extensions && this.options.extensions.startBlock) {
                let startIndex = Infinity;
                const tempSrc = src.slice(1);
                let tempStart;
                this.options.extensions.startBlock.forEach((getStartIndex) => {
                    tempStart = getStartIndex.call({ lexer: this }, tempSrc);
                    if (typeof tempStart === 'number' && tempStart >= 0) {
                        startIndex = Math.min(startIndex, tempStart);
                    }
                });
                if (startIndex < Infinity && startIndex >= 0) {
                    cutSrc = src.substring(0, startIndex + 1);
                }
            }
            if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
                lastToken = tokens[tokens.length - 1];
                if (lastParagraphClipped && lastToken?.type === 'paragraph') {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.text;
                    this.inlineQueue.pop();
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                }
                else {
                    tokens.push(token);
                }
                lastParagraphClipped = (cutSrc.length !== src.length);
                src = src.substring(token.raw.length);
                continue;
            }
            // text
            if (token = this.tokenizer.text(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && lastToken.type === 'text') {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.text;
                    this.inlineQueue.pop();
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                }
                else {
                    tokens.push(token);
                }
                continue;
            }
            if (src) {
                const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
                if (this.options.silent) {
                    console.error(errMsg);
                    break;
                }
                else {
                    throw new Error(errMsg);
                }
            }
        }
        this.state.top = true;
        return tokens;
    }
    inline(src, tokens = []) {
        this.inlineQueue.push({ src, tokens });
        return tokens;
    }
    /**
     * Lexing/Compiling
     */
    inlineTokens(src, tokens = []) {
        let token, lastToken, cutSrc;
        // String with links masked to avoid interference with em and strong
        let maskedSrc = src;
        let match;
        let keepPrevChar, prevChar;
        // Mask out reflinks
        if (this.tokens.links) {
            const links = Object.keys(this.tokens.links);
            if (links.length > 0) {
                while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
                    if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
                        maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
                    }
                }
            }
        }
        // Mask out other blocks
        while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
            maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }
        // Mask out escaped characters
        while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
            maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        }
        while (src) {
            if (!keepPrevChar) {
                prevChar = '';
            }
            keepPrevChar = false;
            // extensions
            if (this.options.extensions
                && this.options.extensions.inline
                && this.options.extensions.inline.some((extTokenizer) => {
                    if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
                        src = src.substring(token.raw.length);
                        tokens.push(token);
                        return true;
                    }
                    return false;
                })) {
                continue;
            }
            // escape
            if (token = this.tokenizer.escape(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // tag
            if (token = this.tokenizer.tag(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && token.type === 'text' && lastToken.type === 'text') {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                }
                else {
                    tokens.push(token);
                }
                continue;
            }
            // link
            if (token = this.tokenizer.link(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // reflink, nolink
            if (token = this.tokenizer.reflink(src, this.tokens.links)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && token.type === 'text' && lastToken.type === 'text') {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                }
                else {
                    tokens.push(token);
                }
                continue;
            }
            // em & strong
            if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // code
            if (token = this.tokenizer.codespan(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // br
            if (token = this.tokenizer.br(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // del (gfm)
            if (token = this.tokenizer.del(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // autolink
            if (token = this.tokenizer.autolink(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // url (gfm)
            if (!this.state.inLink && (token = this.tokenizer.url(src))) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // text
            // prevent inlineText consuming extensions by clipping 'src' to extension start
            cutSrc = src;
            if (this.options.extensions && this.options.extensions.startInline) {
                let startIndex = Infinity;
                const tempSrc = src.slice(1);
                let tempStart;
                this.options.extensions.startInline.forEach((getStartIndex) => {
                    tempStart = getStartIndex.call({ lexer: this }, tempSrc);
                    if (typeof tempStart === 'number' && tempStart >= 0) {
                        startIndex = Math.min(startIndex, tempStart);
                    }
                });
                if (startIndex < Infinity && startIndex >= 0) {
                    cutSrc = src.substring(0, startIndex + 1);
                }
            }
            if (token = this.tokenizer.inlineText(cutSrc)) {
                src = src.substring(token.raw.length);
                if (token.raw.slice(-1) !== '_') { // Track prevChar before string of ____ started
                    prevChar = token.raw.slice(-1);
                }
                keepPrevChar = true;
                lastToken = tokens[tokens.length - 1];
                if (lastToken && lastToken.type === 'text') {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                }
                else {
                    tokens.push(token);
                }
                continue;
            }
            if (src) {
                const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
                if (this.options.silent) {
                    console.error(errMsg);
                    break;
                }
                else {
                    throw new Error(errMsg);
                }
            }
        }
        return tokens;
    }
}

/**
 * Renderer
 */
class _Renderer {
    options;
    parser; // set by the parser
    constructor(options) {
        this.options = options || _defaults;
    }
    space(token) {
        return '';
    }
    code({ text, lang, escaped }) {
        const langString = (lang || '').match(/^\S*/)?.[0];
        const code = text.replace(/\n$/, '') + '\n';
        if (!langString) {
            return '<pre><code>'
                + (escaped ? code : escape$1(code, true))
                + '</code></pre>\n';
        }
        return '<pre><code class="language-'
            + escape$1(langString)
            + '">'
            + (escaped ? code : escape$1(code, true))
            + '</code></pre>\n';
    }
    blockquote({ tokens }) {
        const body = this.parser.parse(tokens);
        return `<blockquote>\n${body}</blockquote>\n`;
    }
    html({ text }) {
        return text;
    }
    heading({ tokens, depth }) {
        return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>\n`;
    }
    hr(token) {
        return '<hr>\n';
    }
    list(token) {
        const ordered = token.ordered;
        const start = token.start;
        let body = '';
        for (let j = 0; j < token.items.length; j++) {
            const item = token.items[j];
            body += this.listitem(item);
        }
        const type = ordered ? 'ol' : 'ul';
        const startAttr = (ordered && start !== 1) ? (' start="' + start + '"') : '';
        return '<' + type + startAttr + '>\n' + body + '</' + type + '>\n';
    }
    listitem(item) {
        let itemBody = '';
        if (item.task) {
            const checkbox = this.checkbox({ checked: !!item.checked });
            if (item.loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === 'paragraph') {
                    item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                    if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                        item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                    }
                }
                else {
                    item.tokens.unshift({
                        type: 'text',
                        raw: checkbox + ' ',
                        text: checkbox + ' ',
                    });
                }
            }
            else {
                itemBody += checkbox + ' ';
            }
        }
        itemBody += this.parser.parse(item.tokens, !!item.loose);
        return `<li>${itemBody}</li>\n`;
    }
    checkbox({ checked }) {
        return '<input '
            + (checked ? 'checked="" ' : '')
            + 'disabled="" type="checkbox">';
    }
    paragraph({ tokens }) {
        return `<p>${this.parser.parseInline(tokens)}</p>\n`;
    }
    table(token) {
        let header = '';
        // header
        let cell = '';
        for (let j = 0; j < token.header.length; j++) {
            cell += this.tablecell(token.header[j]);
        }
        header += this.tablerow({ text: cell });
        let body = '';
        for (let j = 0; j < token.rows.length; j++) {
            const row = token.rows[j];
            cell = '';
            for (let k = 0; k < row.length; k++) {
                cell += this.tablecell(row[k]);
            }
            body += this.tablerow({ text: cell });
        }
        if (body)
            body = `<tbody>${body}</tbody>`;
        return '<table>\n'
            + '<thead>\n'
            + header
            + '</thead>\n'
            + body
            + '</table>\n';
    }
    tablerow({ text }) {
        return `<tr>\n${text}</tr>\n`;
    }
    tablecell(token) {
        const content = this.parser.parseInline(token.tokens);
        const type = token.header ? 'th' : 'td';
        const tag = token.align
            ? `<${type} align="${token.align}">`
            : `<${type}>`;
        return tag + content + `</${type}>\n`;
    }
    /**
     * span level renderer
     */
    strong({ tokens }) {
        return `<strong>${this.parser.parseInline(tokens)}</strong>`;
    }
    em({ tokens }) {
        return `<em>${this.parser.parseInline(tokens)}</em>`;
    }
    codespan({ text }) {
        return `<code>${text}</code>`;
    }
    br(token) {
        return '<br>';
    }
    del({ tokens }) {
        return `<del>${this.parser.parseInline(tokens)}</del>`;
    }
    link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const cleanHref = cleanUrl(href);
        if (cleanHref === null) {
            return text;
        }
        href = cleanHref;
        let out = '<a href="' + href + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
    }
    image({ href, title, text }) {
        const cleanHref = cleanUrl(href);
        if (cleanHref === null) {
            return text;
        }
        href = cleanHref;
        let out = `<img src="${href}" alt="${text}"`;
        if (title) {
            out += ` title="${title}"`;
        }
        out += '>';
        return out;
    }
    text(token) {
        return 'tokens' in token && token.tokens ? this.parser.parseInline(token.tokens) : token.text;
    }
}

/**
 * TextRenderer
 * returns only the textual part of the token
 */
class _TextRenderer {
    // no need for block level renderers
    strong({ text }) {
        return text;
    }
    em({ text }) {
        return text;
    }
    codespan({ text }) {
        return text;
    }
    del({ text }) {
        return text;
    }
    html({ text }) {
        return text;
    }
    text({ text }) {
        return text;
    }
    link({ text }) {
        return '' + text;
    }
    image({ text }) {
        return '' + text;
    }
    br() {
        return '';
    }
}

/**
 * Parsing & Compiling
 */
class _Parser {
    options;
    renderer;
    textRenderer;
    constructor(options) {
        this.options = options || _defaults;
        this.options.renderer = this.options.renderer || new _Renderer();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.renderer.parser = this;
        this.textRenderer = new _TextRenderer();
    }
    /**
     * Static Parse Method
     */
    static parse(tokens, options) {
        const parser = new _Parser(options);
        return parser.parse(tokens);
    }
    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens, options) {
        const parser = new _Parser(options);
        return parser.parseInline(tokens);
    }
    /**
     * Parse Loop
     */
    parse(tokens, top = true) {
        let out = '';
        for (let i = 0; i < tokens.length; i++) {
            const anyToken = tokens[i];
            // Run any renderer extensions
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[anyToken.type]) {
                const genericToken = anyToken;
                const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
                if (ret !== false || !['space', 'hr', 'heading', 'code', 'table', 'blockquote', 'list', 'html', 'paragraph', 'text'].includes(genericToken.type)) {
                    out += ret || '';
                    continue;
                }
            }
            const token = anyToken;
            switch (token.type) {
                case 'space': {
                    out += this.renderer.space(token);
                    continue;
                }
                case 'hr': {
                    out += this.renderer.hr(token);
                    continue;
                }
                case 'heading': {
                    out += this.renderer.heading(token);
                    continue;
                }
                case 'code': {
                    out += this.renderer.code(token);
                    continue;
                }
                case 'table': {
                    out += this.renderer.table(token);
                    continue;
                }
                case 'blockquote': {
                    out += this.renderer.blockquote(token);
                    continue;
                }
                case 'list': {
                    out += this.renderer.list(token);
                    continue;
                }
                case 'html': {
                    out += this.renderer.html(token);
                    continue;
                }
                case 'paragraph': {
                    out += this.renderer.paragraph(token);
                    continue;
                }
                case 'text': {
                    let textToken = token;
                    let body = this.renderer.text(textToken);
                    while (i + 1 < tokens.length && tokens[i + 1].type === 'text') {
                        textToken = tokens[++i];
                        body += '\n' + this.renderer.text(textToken);
                    }
                    if (top) {
                        out += this.renderer.paragraph({
                            type: 'paragraph',
                            raw: body,
                            text: body,
                            tokens: [{ type: 'text', raw: body, text: body }],
                        });
                    }
                    else {
                        out += body;
                    }
                    continue;
                }
                default: {
                    const errMsg = 'Token with "' + token.type + '" type was not found.';
                    if (this.options.silent) {
                        console.error(errMsg);
                        return '';
                    }
                    else {
                        throw new Error(errMsg);
                    }
                }
            }
        }
        return out;
    }
    /**
     * Parse Inline Tokens
     */
    parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        let out = '';
        for (let i = 0; i < tokens.length; i++) {
            const anyToken = tokens[i];
            // Run any renderer extensions
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[anyToken.type]) {
                const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
                if (ret !== false || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(anyToken.type)) {
                    out += ret || '';
                    continue;
                }
            }
            const token = anyToken;
            switch (token.type) {
                case 'escape': {
                    out += renderer.text(token);
                    break;
                }
                case 'html': {
                    out += renderer.html(token);
                    break;
                }
                case 'link': {
                    out += renderer.link(token);
                    break;
                }
                case 'image': {
                    out += renderer.image(token);
                    break;
                }
                case 'strong': {
                    out += renderer.strong(token);
                    break;
                }
                case 'em': {
                    out += renderer.em(token);
                    break;
                }
                case 'codespan': {
                    out += renderer.codespan(token);
                    break;
                }
                case 'br': {
                    out += renderer.br(token);
                    break;
                }
                case 'del': {
                    out += renderer.del(token);
                    break;
                }
                case 'text': {
                    out += renderer.text(token);
                    break;
                }
                default: {
                    const errMsg = 'Token with "' + token.type + '" type was not found.';
                    if (this.options.silent) {
                        console.error(errMsg);
                        return '';
                    }
                    else {
                        throw new Error(errMsg);
                    }
                }
            }
        }
        return out;
    }
}

class _Hooks {
    options;
    constructor(options) {
        this.options = options || _defaults;
    }
    static passThroughHooks = new Set([
        'preprocess',
        'postprocess',
        'processAllTokens',
    ]);
    /**
     * Process markdown before marked
     */
    preprocess(markdown) {
        return markdown;
    }
    /**
     * Process HTML after marked is finished
     */
    postprocess(html) {
        return html;
    }
    /**
     * Process all tokens before walk tokens
     */
    processAllTokens(tokens) {
        return tokens;
    }
}

class Marked {
    defaults = _getDefaults();
    options = this.setOptions;
    parse = this.parseMarkdown(_Lexer.lex, _Parser.parse);
    parseInline = this.parseMarkdown(_Lexer.lexInline, _Parser.parseInline);
    Parser = _Parser;
    Renderer = _Renderer;
    TextRenderer = _TextRenderer;
    Lexer = _Lexer;
    Tokenizer = _Tokenizer;
    Hooks = _Hooks;
    constructor(...args) {
        this.use(...args);
    }
    /**
     * Run callback for every token
     */
    walkTokens(tokens, callback) {
        let values = [];
        for (const token of tokens) {
            values = values.concat(callback.call(this, token));
            switch (token.type) {
                case 'table': {
                    const tableToken = token;
                    for (const cell of tableToken.header) {
                        values = values.concat(this.walkTokens(cell.tokens, callback));
                    }
                    for (const row of tableToken.rows) {
                        for (const cell of row) {
                            values = values.concat(this.walkTokens(cell.tokens, callback));
                        }
                    }
                    break;
                }
                case 'list': {
                    const listToken = token;
                    values = values.concat(this.walkTokens(listToken.items, callback));
                    break;
                }
                default: {
                    const genericToken = token;
                    if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
                        this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
                            const tokens = genericToken[childTokens].flat(Infinity);
                            values = values.concat(this.walkTokens(tokens, callback));
                        });
                    }
                    else if (genericToken.tokens) {
                        values = values.concat(this.walkTokens(genericToken.tokens, callback));
                    }
                }
            }
        }
        return values;
    }
    use(...args) {
        const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
        args.forEach((pack) => {
            // copy options to new object
            const opts = { ...pack };
            // set async to true if it was set to true before
            opts.async = this.defaults.async || opts.async || false;
            // ==-- Parse "addon" extensions --== //
            if (pack.extensions) {
                pack.extensions.forEach((ext) => {
                    if (!ext.name) {
                        throw new Error('extension name required');
                    }
                    if ('renderer' in ext) { // Renderer extensions
                        const prevRenderer = extensions.renderers[ext.name];
                        if (prevRenderer) {
                            // Replace extension with func to run new extension but fall back if false
                            extensions.renderers[ext.name] = function (...args) {
                                let ret = ext.renderer.apply(this, args);
                                if (ret === false) {
                                    ret = prevRenderer.apply(this, args);
                                }
                                return ret;
                            };
                        }
                        else {
                            extensions.renderers[ext.name] = ext.renderer;
                        }
                    }
                    if ('tokenizer' in ext) { // Tokenizer Extensions
                        if (!ext.level || (ext.level !== 'block' && ext.level !== 'inline')) {
                            throw new Error("extension level must be 'block' or 'inline'");
                        }
                        const extLevel = extensions[ext.level];
                        if (extLevel) {
                            extLevel.unshift(ext.tokenizer);
                        }
                        else {
                            extensions[ext.level] = [ext.tokenizer];
                        }
                        if (ext.start) { // Function to check for start of token
                            if (ext.level === 'block') {
                                if (extensions.startBlock) {
                                    extensions.startBlock.push(ext.start);
                                }
                                else {
                                    extensions.startBlock = [ext.start];
                                }
                            }
                            else if (ext.level === 'inline') {
                                if (extensions.startInline) {
                                    extensions.startInline.push(ext.start);
                                }
                                else {
                                    extensions.startInline = [ext.start];
                                }
                            }
                        }
                    }
                    if ('childTokens' in ext && ext.childTokens) { // Child tokens to be visited by walkTokens
                        extensions.childTokens[ext.name] = ext.childTokens;
                    }
                });
                opts.extensions = extensions;
            }
            // ==-- Parse "overwrite" extensions --== //
            if (pack.renderer) {
                const renderer = this.defaults.renderer || new _Renderer(this.defaults);
                for (const prop in pack.renderer) {
                    if (!(prop in renderer)) {
                        throw new Error(`renderer '${prop}' does not exist`);
                    }
                    if (['options', 'parser'].includes(prop)) {
                        // ignore options property
                        continue;
                    }
                    const rendererProp = prop;
                    const rendererFunc = pack.renderer[rendererProp];
                    const prevRenderer = renderer[rendererProp];
                    // Replace renderer with func to run extension, but fall back if false
                    renderer[rendererProp] = (...args) => {
                        let ret = rendererFunc.apply(renderer, args);
                        if (ret === false) {
                            ret = prevRenderer.apply(renderer, args);
                        }
                        return ret || '';
                    };
                }
                opts.renderer = renderer;
            }
            if (pack.tokenizer) {
                const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
                for (const prop in pack.tokenizer) {
                    if (!(prop in tokenizer)) {
                        throw new Error(`tokenizer '${prop}' does not exist`);
                    }
                    if (['options', 'rules', 'lexer'].includes(prop)) {
                        // ignore options, rules, and lexer properties
                        continue;
                    }
                    const tokenizerProp = prop;
                    const tokenizerFunc = pack.tokenizer[tokenizerProp];
                    const prevTokenizer = tokenizer[tokenizerProp];
                    // Replace tokenizer with func to run extension, but fall back if false
                    // @ts-expect-error cannot type tokenizer function dynamically
                    tokenizer[tokenizerProp] = (...args) => {
                        let ret = tokenizerFunc.apply(tokenizer, args);
                        if (ret === false) {
                            ret = prevTokenizer.apply(tokenizer, args);
                        }
                        return ret;
                    };
                }
                opts.tokenizer = tokenizer;
            }
            // ==-- Parse Hooks extensions --== //
            if (pack.hooks) {
                const hooks = this.defaults.hooks || new _Hooks();
                for (const prop in pack.hooks) {
                    if (!(prop in hooks)) {
                        throw new Error(`hook '${prop}' does not exist`);
                    }
                    if (prop === 'options') {
                        // ignore options property
                        continue;
                    }
                    const hooksProp = prop;
                    const hooksFunc = pack.hooks[hooksProp];
                    const prevHook = hooks[hooksProp];
                    if (_Hooks.passThroughHooks.has(prop)) {
                        // @ts-expect-error cannot type hook function dynamically
                        hooks[hooksProp] = (arg) => {
                            if (this.defaults.async) {
                                return Promise.resolve(hooksFunc.call(hooks, arg)).then(ret => {
                                    return prevHook.call(hooks, ret);
                                });
                            }
                            const ret = hooksFunc.call(hooks, arg);
                            return prevHook.call(hooks, ret);
                        };
                    }
                    else {
                        // @ts-expect-error cannot type hook function dynamically
                        hooks[hooksProp] = (...args) => {
                            let ret = hooksFunc.apply(hooks, args);
                            if (ret === false) {
                                ret = prevHook.apply(hooks, args);
                            }
                            return ret;
                        };
                    }
                }
                opts.hooks = hooks;
            }
            // ==-- Parse WalkTokens extensions --== //
            if (pack.walkTokens) {
                const walkTokens = this.defaults.walkTokens;
                const packWalktokens = pack.walkTokens;
                opts.walkTokens = function (token) {
                    let values = [];
                    values.push(packWalktokens.call(this, token));
                    if (walkTokens) {
                        values = values.concat(walkTokens.call(this, token));
                    }
                    return values;
                };
            }
            this.defaults = { ...this.defaults, ...opts };
        });
        return this;
    }
    setOptions(opt) {
        this.defaults = { ...this.defaults, ...opt };
        return this;
    }
    lexer(src, options) {
        return _Lexer.lex(src, options ?? this.defaults);
    }
    parser(tokens, options) {
        return _Parser.parse(tokens, options ?? this.defaults);
    }
    parseMarkdown(lexer, parser) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parse = (src, options) => {
            const origOpt = { ...options };
            const opt = { ...this.defaults, ...origOpt };
            const throwError = this.onError(!!opt.silent, !!opt.async);
            // throw error if an extension set async to true but parse was called with async: false
            if (this.defaults.async === true && origOpt.async === false) {
                return throwError(new Error('marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.'));
            }
            // throw error in case of non string input
            if (typeof src === 'undefined' || src === null) {
                return throwError(new Error('marked(): input parameter is undefined or null'));
            }
            if (typeof src !== 'string') {
                return throwError(new Error('marked(): input parameter is of type '
                    + Object.prototype.toString.call(src) + ', string expected'));
            }
            if (opt.hooks) {
                opt.hooks.options = opt;
            }
            if (opt.async) {
                return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src)
                    .then(src => lexer(src, opt))
                    .then(tokens => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens)
                    .then(tokens => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens)
                    .then(tokens => parser(tokens, opt))
                    .then(html => opt.hooks ? opt.hooks.postprocess(html) : html)
                    .catch(throwError);
            }
            try {
                if (opt.hooks) {
                    src = opt.hooks.preprocess(src);
                }
                let tokens = lexer(src, opt);
                if (opt.hooks) {
                    tokens = opt.hooks.processAllTokens(tokens);
                }
                if (opt.walkTokens) {
                    this.walkTokens(tokens, opt.walkTokens);
                }
                let html = parser(tokens, opt);
                if (opt.hooks) {
                    html = opt.hooks.postprocess(html);
                }
                return html;
            }
            catch (e) {
                return throwError(e);
            }
        };
        return parse;
    }
    onError(silent, async) {
        return (e) => {
            e.message += '\nPlease report this to https://github.com/markedjs/marked.';
            if (silent) {
                const msg = '<p>An error occurred:</p><pre>'
                    + escape$1(e.message + '', true)
                    + '</pre>';
                if (async) {
                    return Promise.resolve(msg);
                }
                return msg;
            }
            if (async) {
                return Promise.reject(e);
            }
            throw e;
        };
    }
}

const markedInstance = new Marked();
function marked(src, opt) {
    return markedInstance.parse(src, opt);
}
/**
 * Sets the default options.
 *
 * @param options Hash of options
 */
marked.options =
    marked.setOptions = function (options) {
        markedInstance.setOptions(options);
        marked.defaults = markedInstance.defaults;
        changeDefaults(marked.defaults);
        return marked;
    };
/**
 * Gets the original marked default options.
 */
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
/**
 * Use Extension
 */
marked.use = function (...args) {
    markedInstance.use(...args);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
};
/**
 * Run callback for every token
 */
marked.walkTokens = function (tokens, callback) {
    return markedInstance.walkTokens(tokens, callback);
};
/**
 * Compiles markdown to HTML without enclosing `p` tag.
 *
 * @param src String of markdown source to be compiled
 * @param options Hash of options
 * @return String of compiled HTML
 */
marked.parseInline = markedInstance.parseInline;
/**
 * Expose
 */
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
const options = marked.options;
const setOptions = marked.setOptions;
const use = marked.use;
const walkTokens = marked.walkTokens;
const parseInline = marked.parseInline;
const parse = marked;
const parser = _Parser.parse;
const lexer = _Lexer.lex;


//# sourceMappingURL=marked.esm.js.map


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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