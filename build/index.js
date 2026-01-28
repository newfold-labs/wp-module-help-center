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

(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{HiiveAnalytics:()=>D,HiiveEvent:()=>s});var n={};e.r(n),e.d(n,{initializeNamespace:()=>r,updateHiiveDebounceInstance:()=>v,updateHiiveDebounceTime:()=>l,updateHiiveEventsQueue:()=>o,updateHiiveEventsQueueThreshold:()=>d,updateHiiveUrls:()=>u});var i={};e.r(i),e.d(i,{getHiiveBatchUrl:()=>m,getHiiveDebounce:()=>H,getHiiveEventsQueue:()=>p,getHiiveEventsQueueThreshold:()=>h,getHiiveSingleUrl:()=>E});const a=window.wp.data;class s{constructor(e,t,n,i){this.category=e,this.action=t,this.data=n,this.namespace=i}}const c={urls:{single:void 0,batch:void 0},queue:{events:[],threshold:100},debounce:{time:void 0,instance:void 0}};function r(e){return{type:"INITIALIZE_NAMESPACE",namespace:e}}function u(e,t){return{type:"UPDATE_HIIVE_URLS",urls:e,namespace:t}}function o(e,t){return{type:"UPDATE_HIIVE_EVENTS_QUEUE",events:e,namespace:t}}function d(e,t){return{type:"UPDATE_HIIVE_EVENTS_QUEUE_THRESHOLD",threshold:e,namespace:t}}function l(e,t){return{type:"UPDATE_HIIVE_DEBOUNCE_TIME",debounceTime:e,namespace:t}}function v(e,t){return{type:"UPDATE_HIIVE_DEBOUNCE_INSTANCE",instance:e,namespace:t}}function p(e,t){return e.hiive[t]?.queue.events}function h(e,t){return e.hiive[t]?.queue.threshold}function E(e,t){return e.hiive[t]?.urls.single}function m(e,t){return e.hiive[t]?.urls.batch}function H(e,t){return e.hiive[t]?.debounce}const I="newfold/ui-analytics",_={reducer:(0,a.combineReducers)({hiive:(e,t)=>{switch(t.type){case"INITIALIZE_NAMESPACE":return{...e,[t.namespace]:c};case"UPDATE_HIIVE_URLS":return{...e,[t.namespace]:{...e[t.namespace],urls:{single:t.urls.single,batch:t.urls.batch}}};case"UPDATE_HIIVE_EVENTS_QUEUE":return{...e,[t.namespace]:{...e[t.namespace],queue:{events:t.events,threshold:e[t.namespace].queue.threshold}}};case"UPDATE_HIIVE_EVENTS_QUEUE_THRESHOLD":return{...e,[t.namespace]:{...e[t.namespace],queue:{events:e[t.namespace].queue.events,threshold:t.threshold}}};case"UPDATE_HIIVE_DEBOUNCE_TIME":return{...e,[t.namespace]:{...e[t.namespace],debounce:{time:t.debounceTime,instance:e[t.namespace].debounce.instance}}};case"UPDATE_HIIVE_DEBOUNCE_INSTANCE":return{...e,[t.namespace]:{...e[t.namespace],debounce:{time:e[t.namespace].debounce.time,instance:t.instance}}}}return e}}),actions:n,selectors:i},b=(0,a.createReduxStore)(I,_);(0,a.select)(I)||(0,a.register)(b);const T=window.wp.apiFetch;var f=e.n(T);const U=e=>!!window?.nfdUIAnalytics?.hiive&&e in window.nfdUIAnalytics.hiive,g=e=>e instanceof s,y=async e=>{if(!e||!U(e))return!1;const t=(0,a.select)(b).getHiiveBatchUrl(e);if(!t)return!1;const n=(0,a.select)(b).getHiiveEventsQueue(e);if(0===n.length)return!0;(0,a.dispatch)(b).updateHiiveEventsQueue([],e);try{await f()({url:t,method:"POST",data:n})}catch(t){console.error(t),(0,a.dispatch)(b).updateHiiveEventsQueue(n,e)}return!0},D={initialize:async({namespace:e,urls:{single:t,batch:n}={},settings:{debounce:{time:i}={},queue:{threshold:s=100}={}}={}})=>!(!e||!U(e)&&(!t&&!n||((0,a.dispatch)(b).initializeNamespace(e),(0,a.dispatch)(b).updateHiiveUrls({single:t,batch:n},e),(0,a.dispatch)(b).updateHiiveDebounceTime(i,e),(0,a.dispatch)(b).updateHiiveEventsQueueThreshold(s,e),window.nfdUIAnalytics?.hiive?window.nfdUIAnalytics.hiive[e]=!0:window.nfdUIAnalytics={hiive:{[e]:!0}},0))),initialized:U,validate:g,track:e=>{if(!g(e)||!U(e.namespace))return!1;const t=e.namespace;delete e.namespace;const n=(0,a.select)(b).getHiiveEventsQueue(t);n.push(e),(0,a.dispatch)(b).updateHiiveEventsQueue(n,t);const i=(0,a.select)(b).getHiiveEventsQueueThreshold(t);return i&&i<n.length&&y(t),(e=>{if(!e)return!1;const t=(0,a.select)(b).getHiiveDebounce(e);!!t.time&&(clearInterval(t.instance),(0,a.dispatch)(b).updateHiiveDebounceInstance(setTimeout((()=>{y(e),(0,a.dispatch)(b).updateHiiveDebounceInstance(void 0,e)}),t.time),e))})(t),!0},send:async e=>{if(!g(e)||!U(e.namespace))return!1;const t=e.namespace;delete e.namespace;const n=(0,a.select)(b).getHiiveSingleUrl(t);if(!n)return!1;try{await f()({url:n,method:"POST",data:e})}catch(e){return console.error(e),!1}},dispatchEvents:y,disableDebounce:e=>{if(!e)return!1;const t=(0,a.select)(b).getHiiveDebounce(e);return t.instance&&(clearInterval(t.instance),(0,a.dispatch)(b).updateHiiveDebounceInstance(void 0,e),(0,a.dispatch)(b).updateHiiveDebounceTime(void 0,e)),!0}};var A=exports;for(var S in t)A[S]=t[S];t.__esModule&&Object.defineProperty(A,"__esModule",{value:!0})})();

/***/ }),

/***/ "./node_modules/@newfold/wp-module-runtime/build/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@newfold/wp-module-runtime/build/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

(()=>{"use strict";var e={d:(t,i)=>{for(var o in i)e.o(i,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:i[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{NewfoldRuntime:()=>o});const i=window.wp.url,o={hasCapability:e=>!0===window.NewfoldRuntime?.capabilities[e],adminUrl:e=>window.NewfoldRuntime?.admin_url+e,createApiUrl:(e,t={})=>(0,i.addQueryArgs)(window.NewfoldRuntime?.base_url,{rest_route:e,...t}),get siteDetails(){return window.NewfoldRuntime?.site},get sdk(){return window.NewfoldRuntime?.sdk},get isWoo(){return window.NewfoldRuntime?.isWoocommerceActive},get isYithBooking(){return window.NewfoldRuntime?.isYithBookingActive},get ecommerce(){return window.NewfoldRuntime?.ecommerce},get plugin(){return window.NewfoldRuntime?.plugin},get wpversion(){return window.NewfoldRuntime?.wpversion},get siteTitle(){return window.NewfoldRuntime?.siteTitle},get currentTheme(){return window.NewfoldRuntime?.currentTheme}};var r=exports;for(var n in t)r[n]=t[n];t.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})();

/***/ }),

/***/ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs":
/*!*********************************************************************!*\
  !*** ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReducerType: () => (/* binding */ ReducerType),
/* harmony export */   SHOULD_AUTOBATCH: () => (/* binding */ SHOULD_AUTOBATCH),
/* harmony export */   TaskAbortError: () => (/* binding */ TaskAbortError),
/* harmony export */   Tuple: () => (/* binding */ Tuple),
/* harmony export */   __DO_NOT_USE__ActionTypes: () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.__DO_NOT_USE__ActionTypes),
/* harmony export */   addListener: () => (/* binding */ addListener),
/* harmony export */   applyMiddleware: () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.applyMiddleware),
/* harmony export */   asyncThunkCreator: () => (/* binding */ asyncThunkCreator),
/* harmony export */   autoBatchEnhancer: () => (/* binding */ autoBatchEnhancer),
/* harmony export */   bindActionCreators: () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.bindActionCreators),
/* harmony export */   buildCreateSlice: () => (/* binding */ buildCreateSlice),
/* harmony export */   clearAllListeners: () => (/* binding */ clearAllListeners),
/* harmony export */   combineReducers: () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers),
/* harmony export */   combineSlices: () => (/* binding */ combineSlices),
/* harmony export */   compose: () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.compose),
/* harmony export */   configureStore: () => (/* binding */ configureStore),
/* harmony export */   createAction: () => (/* binding */ createAction),
/* harmony export */   createActionCreatorInvariantMiddleware: () => (/* binding */ createActionCreatorInvariantMiddleware),
/* harmony export */   createAsyncThunk: () => (/* binding */ createAsyncThunk),
/* harmony export */   createDraftSafeSelector: () => (/* binding */ createDraftSafeSelector),
/* harmony export */   createDraftSafeSelectorCreator: () => (/* binding */ createDraftSafeSelectorCreator),
/* harmony export */   createDynamicMiddleware: () => (/* binding */ createDynamicMiddleware),
/* harmony export */   createEntityAdapter: () => (/* binding */ createEntityAdapter),
/* harmony export */   createImmutableStateInvariantMiddleware: () => (/* binding */ createImmutableStateInvariantMiddleware),
/* harmony export */   createListenerMiddleware: () => (/* binding */ createListenerMiddleware),
/* harmony export */   createNextState: () => (/* reexport safe */ immer__WEBPACK_IMPORTED_MODULE_1__.produce),
/* harmony export */   createReducer: () => (/* binding */ createReducer),
/* harmony export */   createSelector: () => (/* reexport safe */ reselect__WEBPACK_IMPORTED_MODULE_2__.createSelector),
/* harmony export */   createSelectorCreator: () => (/* reexport safe */ reselect__WEBPACK_IMPORTED_MODULE_2__.createSelectorCreator),
/* harmony export */   createSerializableStateInvariantMiddleware: () => (/* binding */ createSerializableStateInvariantMiddleware),
/* harmony export */   createSlice: () => (/* binding */ createSlice),
/* harmony export */   createStore: () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.createStore),
/* harmony export */   current: () => (/* reexport safe */ immer__WEBPACK_IMPORTED_MODULE_1__.current),
/* harmony export */   findNonSerializableValue: () => (/* binding */ findNonSerializableValue),
/* harmony export */   formatProdErrorMessage: () => (/* binding */ formatProdErrorMessage),
/* harmony export */   freeze: () => (/* reexport safe */ immer__WEBPACK_IMPORTED_MODULE_1__.freeze),
/* harmony export */   isAction: () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.isAction),
/* harmony export */   isActionCreator: () => (/* binding */ isActionCreator),
/* harmony export */   isAllOf: () => (/* binding */ isAllOf),
/* harmony export */   isAnyOf: () => (/* binding */ isAnyOf),
/* harmony export */   isAsyncThunkAction: () => (/* binding */ isAsyncThunkAction),
/* harmony export */   isDraft: () => (/* reexport safe */ immer__WEBPACK_IMPORTED_MODULE_1__.isDraft),
/* harmony export */   isFluxStandardAction: () => (/* binding */ isFSA),
/* harmony export */   isFulfilled: () => (/* binding */ isFulfilled),
/* harmony export */   isImmutableDefault: () => (/* binding */ isImmutableDefault),
/* harmony export */   isPending: () => (/* binding */ isPending),
/* harmony export */   isPlain: () => (/* binding */ isPlain),
/* harmony export */   isPlainObject: () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.isPlainObject),
/* harmony export */   isRejected: () => (/* binding */ isRejected),
/* harmony export */   isRejectedWithValue: () => (/* binding */ isRejectedWithValue),
/* harmony export */   legacy_createStore: () => (/* reexport safe */ redux__WEBPACK_IMPORTED_MODULE_0__.legacy_createStore),
/* harmony export */   lruMemoize: () => (/* reexport safe */ reselect__WEBPACK_IMPORTED_MODULE_2__.lruMemoize),
/* harmony export */   miniSerializeError: () => (/* binding */ miniSerializeError),
/* harmony export */   nanoid: () => (/* binding */ nanoid),
/* harmony export */   original: () => (/* reexport safe */ immer__WEBPACK_IMPORTED_MODULE_1__.original),
/* harmony export */   prepareAutoBatched: () => (/* binding */ prepareAutoBatched),
/* harmony export */   removeListener: () => (/* binding */ removeListener),
/* harmony export */   unwrapResult: () => (/* binding */ unwrapResult),
/* harmony export */   weakMapMemoize: () => (/* reexport safe */ reselect__WEBPACK_IMPORTED_MODULE_2__.weakMapMemoize)
/* harmony export */ });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/dist/redux.mjs");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! immer */ "./node_modules/immer/dist/immer.mjs");
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/dist/reselect.mjs");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/dist/redux-thunk.mjs");
// src/index.ts




// src/createDraftSafeSelector.ts


var createDraftSafeSelectorCreator = (...args) => {
  const createSelector2 = (0,reselect__WEBPACK_IMPORTED_MODULE_2__.createSelectorCreator)(...args);
  const createDraftSafeSelector2 = Object.assign((...args2) => {
    const selector = createSelector2(...args2);
    const wrappedSelector = (value, ...rest) => selector((0,immer__WEBPACK_IMPORTED_MODULE_1__.isDraft)(value) ? (0,immer__WEBPACK_IMPORTED_MODULE_1__.current)(value) : value, ...rest);
    Object.assign(wrappedSelector, selector);
    return wrappedSelector;
  }, {
    withTypes: () => createDraftSafeSelector2
  });
  return createDraftSafeSelector2;
};
var createDraftSafeSelector = /* @__PURE__ */ createDraftSafeSelectorCreator(reselect__WEBPACK_IMPORTED_MODULE_2__.weakMapMemoize);

// src/configureStore.ts


// src/devtoolsExtension.ts

var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0) return void 0;
  if (typeof arguments[0] === "object") return redux__WEBPACK_IMPORTED_MODULE_0__.compose;
  return redux__WEBPACK_IMPORTED_MODULE_0__.compose.apply(null, arguments);
};
var devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
  return function(noop3) {
    return noop3;
  };
};

// src/getDefaultMiddleware.ts


// src/createAction.ts


// src/tsHelpers.ts
var hasMatchFunction = (v) => {
  return v && typeof v.match === "function";
};

// src/createAction.ts
function createAction(type, prepareAction) {
  function actionCreator(...args) {
    if (prepareAction) {
      let prepared = prepareAction(...args);
      if (!prepared) {
        throw new Error( false ? 0 : "prepareAction did not return an object");
      }
      return {
        type,
        payload: prepared.payload,
        ..."meta" in prepared && {
          meta: prepared.meta
        },
        ..."error" in prepared && {
          error: prepared.error
        }
      };
    }
    return {
      type,
      payload: args[0]
    };
  }
  actionCreator.toString = () => `${type}`;
  actionCreator.type = type;
  actionCreator.match = (action) => (0,redux__WEBPACK_IMPORTED_MODULE_0__.isAction)(action) && action.type === type;
  return actionCreator;
}
function isActionCreator(action) {
  return typeof action === "function" && "type" in action && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
  hasMatchFunction(action);
}
function isFSA(action) {
  return (0,redux__WEBPACK_IMPORTED_MODULE_0__.isAction)(action) && Object.keys(action).every(isValidKey);
}
function isValidKey(key) {
  return ["type", "payload", "error", "meta"].indexOf(key) > -1;
}

// src/actionCreatorInvariantMiddleware.ts
function getMessage(type) {
  const splitType = type ? `${type}`.split("/") : [];
  const actionName = splitType[splitType.length - 1] || "actionCreator";
  return `Detected an action creator with type "${type || "unknown"}" being dispatched. 
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${actionName}())\` instead of \`dispatch(${actionName})\`. This is necessary even if the action has no payload.`;
}
function createActionCreatorInvariantMiddleware(options = {}) {
  if (false) // removed by dead control flow
{}
  const {
    isActionCreator: isActionCreator2 = isActionCreator
  } = options;
  return () => (next) => (action) => {
    if (isActionCreator2(action)) {
      console.warn(getMessage(action.type));
    }
    return next(action);
  };
}

// src/utils.ts

function getTimeMeasureUtils(maxDelay, fnName) {
  let elapsed = 0;
  return {
    measureTime(fn) {
      const started = Date.now();
      try {
        return fn();
      } finally {
        const finished = Date.now();
        elapsed += finished - started;
      }
    },
    warnIfExceeded() {
      if (elapsed > maxDelay) {
        console.warn(`${fnName} took ${elapsed}ms, which is more than the warning threshold of ${maxDelay}ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
      }
    }
  };
}
var Tuple = class _Tuple extends Array {
  constructor(...items) {
    super(...items);
    Object.setPrototypeOf(this, _Tuple.prototype);
  }
  static get [Symbol.species]() {
    return _Tuple;
  }
  concat(...arr) {
    return super.concat.apply(this, arr);
  }
  prepend(...arr) {
    if (arr.length === 1 && Array.isArray(arr[0])) {
      return new _Tuple(...arr[0].concat(this));
    }
    return new _Tuple(...arr.concat(this));
  }
};
function freezeDraftable(val) {
  return (0,immer__WEBPACK_IMPORTED_MODULE_1__.isDraftable)(val) ? (0,immer__WEBPACK_IMPORTED_MODULE_1__.produce)(val, () => {
  }) : val;
}
function getOrInsertComputed(map, key, compute) {
  if (map.has(key)) return map.get(key);
  return map.set(key, compute(key)).get(key);
}

// src/immutableStateInvariantMiddleware.ts
function isImmutableDefault(value) {
  return typeof value !== "object" || value == null || Object.isFrozen(value);
}
function trackForMutations(isImmutable, ignorePaths, obj) {
  const trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
  return {
    detectMutations() {
      return detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
    }
  };
}
function trackProperties(isImmutable, ignorePaths = [], obj, path = "", checkedObjects = /* @__PURE__ */ new Set()) {
  const tracked = {
    value: obj
  };
  if (!isImmutable(obj) && !checkedObjects.has(obj)) {
    checkedObjects.add(obj);
    tracked.children = {};
    for (const key in obj) {
      const childPath = path ? path + "." + key : key;
      if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
        continue;
      }
      tracked.children[key] = trackProperties(isImmutable, ignorePaths, obj[key], childPath);
    }
  }
  return tracked;
}
function detectMutations(isImmutable, ignoredPaths = [], trackedProperty, obj, sameParentRef = false, path = "") {
  const prevObj = trackedProperty ? trackedProperty.value : void 0;
  const sameRef = prevObj === obj;
  if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
    return {
      wasMutated: true,
      path
    };
  }
  if (isImmutable(prevObj) || isImmutable(obj)) {
    return {
      wasMutated: false
    };
  }
  const keysToDetect = {};
  for (let key in trackedProperty.children) {
    keysToDetect[key] = true;
  }
  for (let key in obj) {
    keysToDetect[key] = true;
  }
  const hasIgnoredPaths = ignoredPaths.length > 0;
  for (let key in keysToDetect) {
    const nestedPath = path ? path + "." + key : key;
    if (hasIgnoredPaths) {
      const hasMatches = ignoredPaths.some((ignored) => {
        if (ignored instanceof RegExp) {
          return ignored.test(nestedPath);
        }
        return nestedPath === ignored;
      });
      if (hasMatches) {
        continue;
      }
    }
    const result = detectMutations(isImmutable, ignoredPaths, trackedProperty.children[key], obj[key], sameRef, nestedPath);
    if (result.wasMutated) {
      return result;
    }
  }
  return {
    wasMutated: false
  };
}
function createImmutableStateInvariantMiddleware(options = {}) {
  if (false) // removed by dead control flow
{} else {
    let stringify2 = function(obj, serializer, indent, decycler) {
      return JSON.stringify(obj, getSerialize2(serializer, decycler), indent);
    }, getSerialize2 = function(serializer, decycler) {
      let stack = [], keys = [];
      if (!decycler) decycler = function(_, value) {
        if (stack[0] === value) return "[Circular ~]";
        return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
      };
      return function(key, value) {
        if (stack.length > 0) {
          var thisPos = stack.indexOf(this);
          ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
          ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
          if (~stack.indexOf(value)) value = decycler.call(this, key, value);
        } else stack.push(value);
        return serializer == null ? value : serializer.call(this, key, value);
      };
    };
    var stringify = stringify2, getSerialize = getSerialize2;
    let {
      isImmutable = isImmutableDefault,
      ignoredPaths,
      warnAfter = 32
    } = options;
    const track = trackForMutations.bind(null, isImmutable, ignoredPaths);
    return ({
      getState
    }) => {
      let state = getState();
      let tracker = track(state);
      let result;
      return (next) => (action) => {
        const measureUtils = getTimeMeasureUtils(warnAfter, "ImmutableStateInvariantMiddleware");
        measureUtils.measureTime(() => {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          if (result.wasMutated) {
            throw new Error( false ? 0 : `A state mutation was detected between dispatches, in the path '${result.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
          }
        });
        const dispatchedAction = next(action);
        measureUtils.measureTime(() => {
          state = getState();
          result = tracker.detectMutations();
          tracker = track(state);
          if (result.wasMutated) {
            throw new Error( false ? 0 : `A state mutation was detected inside a dispatch, in the path: ${result.path || ""}. Take a look at the reducer(s) handling the action ${stringify2(action)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
          }
        });
        measureUtils.warnIfExceeded();
        return dispatchedAction;
      };
    };
  }
}

// src/serializableStateInvariantMiddleware.ts

function isPlain(val) {
  const type = typeof val;
  return val == null || type === "string" || type === "boolean" || type === "number" || Array.isArray(val) || (0,redux__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(val);
}
function findNonSerializableValue(value, path = "", isSerializable = isPlain, getEntries, ignoredPaths = [], cache) {
  let foundNestedSerializable;
  if (!isSerializable(value)) {
    return {
      keyPath: path || "<root>",
      value
    };
  }
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (cache?.has(value)) return false;
  const entries = getEntries != null ? getEntries(value) : Object.entries(value);
  const hasIgnoredPaths = ignoredPaths.length > 0;
  for (const [key, nestedValue] of entries) {
    const nestedPath = path ? path + "." + key : key;
    if (hasIgnoredPaths) {
      const hasMatches = ignoredPaths.some((ignored) => {
        if (ignored instanceof RegExp) {
          return ignored.test(nestedPath);
        }
        return nestedPath === ignored;
      });
      if (hasMatches) {
        continue;
      }
    }
    if (!isSerializable(nestedValue)) {
      return {
        keyPath: nestedPath,
        value: nestedValue
      };
    }
    if (typeof nestedValue === "object") {
      foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable, getEntries, ignoredPaths, cache);
      if (foundNestedSerializable) {
        return foundNestedSerializable;
      }
    }
  }
  if (cache && isNestedFrozen(value)) cache.add(value);
  return false;
}
function isNestedFrozen(value) {
  if (!Object.isFrozen(value)) return false;
  for (const nestedValue of Object.values(value)) {
    if (typeof nestedValue !== "object" || nestedValue === null) continue;
    if (!isNestedFrozen(nestedValue)) return false;
  }
  return true;
}
function createSerializableStateInvariantMiddleware(options = {}) {
  if (false) // removed by dead control flow
{} else {
    const {
      isSerializable = isPlain,
      getEntries,
      ignoredActions = [],
      ignoredActionPaths = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths = [],
      warnAfter = 32,
      ignoreState = false,
      ignoreActions = false,
      disableCache = false
    } = options;
    const cache = !disableCache && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (storeAPI) => (next) => (action) => {
      if (!(0,redux__WEBPACK_IMPORTED_MODULE_0__.isAction)(action)) {
        return next(action);
      }
      const result = next(action);
      const measureUtils = getTimeMeasureUtils(warnAfter, "SerializableStateInvariantMiddleware");
      if (!ignoreActions && !(ignoredActions.length && ignoredActions.indexOf(action.type) !== -1)) {
        measureUtils.measureTime(() => {
          const foundActionNonSerializableValue = findNonSerializableValue(action, "", isSerializable, getEntries, ignoredActionPaths, cache);
          if (foundActionNonSerializableValue) {
            const {
              keyPath,
              value
            } = foundActionNonSerializableValue;
            console.error(`A non-serializable value was detected in an action, in the path: \`${keyPath}\`. Value:`, value, "\nTake a look at the logic that dispatched this action: ", action, "\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)", "\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)");
          }
        });
      }
      if (!ignoreState) {
        measureUtils.measureTime(() => {
          const state = storeAPI.getState();
          const foundStateNonSerializableValue = findNonSerializableValue(state, "", isSerializable, getEntries, ignoredPaths, cache);
          if (foundStateNonSerializableValue) {
            const {
              keyPath,
              value
            } = foundStateNonSerializableValue;
            console.error(`A non-serializable value was detected in the state, in the path: \`${keyPath}\`. Value:`, value, `
Take a look at the reducer(s) handling this action type: ${action.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
          }
        });
        measureUtils.warnIfExceeded();
      }
      return result;
    };
  }
}

// src/getDefaultMiddleware.ts
function isBoolean(x) {
  return typeof x === "boolean";
}
var buildGetDefaultMiddleware = () => function getDefaultMiddleware(options) {
  const {
    thunk = true,
    immutableCheck = true,
    serializableCheck = true,
    actionCreatorCheck = true
  } = options ?? {};
  let middlewareArray = new Tuple();
  if (thunk) {
    if (isBoolean(thunk)) {
      middlewareArray.push(redux_thunk__WEBPACK_IMPORTED_MODULE_3__.thunk);
    } else {
      middlewareArray.push((0,redux_thunk__WEBPACK_IMPORTED_MODULE_3__.withExtraArgument)(thunk.extraArgument));
    }
  }
  if (true) {
    if (immutableCheck) {
      let immutableOptions = {};
      if (!isBoolean(immutableCheck)) {
        immutableOptions = immutableCheck;
      }
      middlewareArray.unshift(createImmutableStateInvariantMiddleware(immutableOptions));
    }
    if (serializableCheck) {
      let serializableOptions = {};
      if (!isBoolean(serializableCheck)) {
        serializableOptions = serializableCheck;
      }
      middlewareArray.push(createSerializableStateInvariantMiddleware(serializableOptions));
    }
    if (actionCreatorCheck) {
      let actionCreatorOptions = {};
      if (!isBoolean(actionCreatorCheck)) {
        actionCreatorOptions = actionCreatorCheck;
      }
      middlewareArray.unshift(createActionCreatorInvariantMiddleware(actionCreatorOptions));
    }
  }
  return middlewareArray;
};

// src/autoBatchEnhancer.ts
var SHOULD_AUTOBATCH = "RTK_autoBatch";
var prepareAutoBatched = () => (payload) => ({
  payload,
  meta: {
    [SHOULD_AUTOBATCH]: true
  }
});
var createQueueWithTimer = (timeout) => {
  return (notify) => {
    setTimeout(notify, timeout);
  };
};
var autoBatchEnhancer = (options = {
  type: "raf"
}) => (next) => (...args) => {
  const store = next(...args);
  let notifying = true;
  let shouldNotifyAtEndOfTick = false;
  let notificationQueued = false;
  const listeners = /* @__PURE__ */ new Set();
  const queueCallback = options.type === "tick" ? queueMicrotask : options.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window !== "undefined" && window.requestAnimationFrame ? window.requestAnimationFrame : createQueueWithTimer(10)
  ) : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
  const notifyListeners = () => {
    notificationQueued = false;
    if (shouldNotifyAtEndOfTick) {
      shouldNotifyAtEndOfTick = false;
      listeners.forEach((l) => l());
    }
  };
  return Object.assign({}, store, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(listener2) {
      const wrappedListener = () => notifying && listener2();
      const unsubscribe = store.subscribe(wrappedListener);
      listeners.add(listener2);
      return () => {
        unsubscribe();
        listeners.delete(listener2);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(action) {
      try {
        notifying = !action?.meta?.[SHOULD_AUTOBATCH];
        shouldNotifyAtEndOfTick = !notifying;
        if (shouldNotifyAtEndOfTick) {
          if (!notificationQueued) {
            notificationQueued = true;
            queueCallback(notifyListeners);
          }
        }
        return store.dispatch(action);
      } finally {
        notifying = true;
      }
    }
  });
};

// src/getDefaultEnhancers.ts
var buildGetDefaultEnhancers = (middlewareEnhancer) => function getDefaultEnhancers(options) {
  const {
    autoBatch = true
  } = options ?? {};
  let enhancerArray = new Tuple(middlewareEnhancer);
  if (autoBatch) {
    enhancerArray.push(autoBatchEnhancer(typeof autoBatch === "object" ? autoBatch : void 0));
  }
  return enhancerArray;
};

// src/configureStore.ts
function configureStore(options) {
  const getDefaultMiddleware = buildGetDefaultMiddleware();
  const {
    reducer = void 0,
    middleware,
    devTools = true,
    duplicateMiddlewareCheck = true,
    preloadedState = void 0,
    enhancers = void 0
  } = options || {};
  let rootReducer;
  if (typeof reducer === "function") {
    rootReducer = reducer;
  } else if ((0,redux__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(reducer)) {
    rootReducer = (0,redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers)(reducer);
  } else {
    throw new Error( false ? 0 : "`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");
  }
  if ( true && middleware && typeof middleware !== "function") {
    throw new Error( false ? 0 : "`middleware` field must be a callback");
  }
  let finalMiddleware;
  if (typeof middleware === "function") {
    finalMiddleware = middleware(getDefaultMiddleware);
    if ( true && !Array.isArray(finalMiddleware)) {
      throw new Error( false ? 0 : "when using a middleware builder function, an array of middleware must be returned");
    }
  } else {
    finalMiddleware = getDefaultMiddleware();
  }
  if ( true && finalMiddleware.some((item) => typeof item !== "function")) {
    throw new Error( false ? 0 : "each middleware provided to configureStore must be a function");
  }
  if ( true && duplicateMiddlewareCheck) {
    let middlewareReferences = /* @__PURE__ */ new Set();
    finalMiddleware.forEach((middleware2) => {
      if (middlewareReferences.has(middleware2)) {
        throw new Error( false ? 0 : "Duplicate middleware references found when creating the store. Ensure that each middleware is only included once.");
      }
      middlewareReferences.add(middleware2);
    });
  }
  let finalCompose = redux__WEBPACK_IMPORTED_MODULE_0__.compose;
  if (devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: "development" !== "production",
      ...typeof devTools === "object" && devTools
    });
  }
  const middlewareEnhancer = (0,redux__WEBPACK_IMPORTED_MODULE_0__.applyMiddleware)(...finalMiddleware);
  const getDefaultEnhancers = buildGetDefaultEnhancers(middlewareEnhancer);
  if ( true && enhancers && typeof enhancers !== "function") {
    throw new Error( false ? 0 : "`enhancers` field must be a callback");
  }
  let storeEnhancers = typeof enhancers === "function" ? enhancers(getDefaultEnhancers) : getDefaultEnhancers();
  if ( true && !Array.isArray(storeEnhancers)) {
    throw new Error( false ? 0 : "`enhancers` callback must return an array");
  }
  if ( true && storeEnhancers.some((item) => typeof item !== "function")) {
    throw new Error( false ? 0 : "each enhancer provided to configureStore must be a function");
  }
  if ( true && finalMiddleware.length && !storeEnhancers.includes(middlewareEnhancer)) {
    console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
  }
  const composedEnhancer = finalCompose(...storeEnhancers);
  return (0,redux__WEBPACK_IMPORTED_MODULE_0__.createStore)(rootReducer, preloadedState, composedEnhancer);
}

// src/createReducer.ts


// src/mapBuilders.ts
function executeReducerBuilderCallback(builderCallback) {
  const actionsMap = {};
  const actionMatchers = [];
  let defaultCaseReducer;
  const builder = {
    addCase(typeOrActionCreator, reducer) {
      if (true) {
        if (actionMatchers.length > 0) {
          throw new Error( false ? 0 : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        }
        if (defaultCaseReducer) {
          throw new Error( false ? 0 : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
        }
      }
      const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (!type) {
        throw new Error( false ? 0 : "`builder.addCase` cannot be called with an empty action type");
      }
      if (type in actionsMap) {
        throw new Error( false ? 0 : `\`builder.addCase\` cannot be called with two reducers for the same action type '${type}'`);
      }
      actionsMap[type] = reducer;
      return builder;
    },
    addAsyncThunk(asyncThunk, reducers) {
      if (true) {
        if (defaultCaseReducer) {
          throw new Error( false ? 0 : "`builder.addAsyncThunk` should only be called before calling `builder.addDefaultCase`");
        }
      }
      if (reducers.pending) actionsMap[asyncThunk.pending.type] = reducers.pending;
      if (reducers.rejected) actionsMap[asyncThunk.rejected.type] = reducers.rejected;
      if (reducers.fulfilled) actionsMap[asyncThunk.fulfilled.type] = reducers.fulfilled;
      if (reducers.settled) actionMatchers.push({
        matcher: asyncThunk.settled,
        reducer: reducers.settled
      });
      return builder;
    },
    addMatcher(matcher, reducer) {
      if (true) {
        if (defaultCaseReducer) {
          throw new Error( false ? 0 : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
        }
      }
      actionMatchers.push({
        matcher,
        reducer
      });
      return builder;
    },
    addDefaultCase(reducer) {
      if (true) {
        if (defaultCaseReducer) {
          throw new Error( false ? 0 : "`builder.addDefaultCase` can only be called once");
        }
      }
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}

// src/createReducer.ts
function isStateFunction(x) {
  return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback) {
  if (true) {
    if (typeof mapOrBuilderCallback === "object") {
      throw new Error( false ? 0 : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
    }
  }
  let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
  let getInitialState;
  if (isStateFunction(initialState)) {
    getInitialState = () => freezeDraftable(initialState());
  } else {
    const frozenInitialState = freezeDraftable(initialState);
    getInitialState = () => frozenInitialState;
  }
  function reducer(state = getInitialState(), action) {
    let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({
      matcher
    }) => matcher(action)).map(({
      reducer: reducer2
    }) => reducer2)];
    if (caseReducers.filter((cr) => !!cr).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        if ((0,immer__WEBPACK_IMPORTED_MODULE_1__.isDraft)(previousState)) {
          const draft = previousState;
          const result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!(0,immer__WEBPACK_IMPORTED_MODULE_1__.isDraftable)(previousState)) {
          const result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return (0,immer__WEBPACK_IMPORTED_MODULE_1__.produce)(previousState, (draft) => {
            return caseReducer(draft, action);
          });
        }
      }
      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;
  return reducer;
}

// src/matchers.ts
var matches = (matcher, action) => {
  if (hasMatchFunction(matcher)) {
    return matcher.match(action);
  } else {
    return matcher(action);
  }
};
function isAnyOf(...matchers) {
  return (action) => {
    return matchers.some((matcher) => matches(matcher, action));
  };
}
function isAllOf(...matchers) {
  return (action) => {
    return matchers.every((matcher) => matches(matcher, action));
  };
}
function hasExpectedRequestMetadata(action, validStatus) {
  if (!action || !action.meta) return false;
  const hasValidRequestId = typeof action.meta.requestId === "string";
  const hasValidRequestStatus = validStatus.indexOf(action.meta.requestStatus) > -1;
  return hasValidRequestId && hasValidRequestStatus;
}
function isAsyncThunkArray(a) {
  return typeof a[0] === "function" && "pending" in a[0] && "fulfilled" in a[0] && "rejected" in a[0];
}
function isPending(...asyncThunks) {
  if (asyncThunks.length === 0) {
    return (action) => hasExpectedRequestMetadata(action, ["pending"]);
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isPending()(asyncThunks[0]);
  }
  return isAnyOf(...asyncThunks.map((asyncThunk) => asyncThunk.pending));
}
function isRejected(...asyncThunks) {
  if (asyncThunks.length === 0) {
    return (action) => hasExpectedRequestMetadata(action, ["rejected"]);
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isRejected()(asyncThunks[0]);
  }
  return isAnyOf(...asyncThunks.map((asyncThunk) => asyncThunk.rejected));
}
function isRejectedWithValue(...asyncThunks) {
  const hasFlag = (action) => {
    return action && action.meta && action.meta.rejectedWithValue;
  };
  if (asyncThunks.length === 0) {
    return isAllOf(isRejected(...asyncThunks), hasFlag);
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isRejectedWithValue()(asyncThunks[0]);
  }
  return isAllOf(isRejected(...asyncThunks), hasFlag);
}
function isFulfilled(...asyncThunks) {
  if (asyncThunks.length === 0) {
    return (action) => hasExpectedRequestMetadata(action, ["fulfilled"]);
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isFulfilled()(asyncThunks[0]);
  }
  return isAnyOf(...asyncThunks.map((asyncThunk) => asyncThunk.fulfilled));
}
function isAsyncThunkAction(...asyncThunks) {
  if (asyncThunks.length === 0) {
    return (action) => hasExpectedRequestMetadata(action, ["pending", "fulfilled", "rejected"]);
  }
  if (!isAsyncThunkArray(asyncThunks)) {
    return isAsyncThunkAction()(asyncThunks[0]);
  }
  return isAnyOf(...asyncThunks.flatMap((asyncThunk) => [asyncThunk.pending, asyncThunk.rejected, asyncThunk.fulfilled]));
}

// src/nanoid.ts
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = (size = 21) => {
  let id = "";
  let i = size;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};

// src/createAsyncThunk.ts
var commonProperties = ["name", "message", "stack", "code"];
var RejectWithValue = class {
  constructor(payload, meta) {
    this.payload = payload;
    this.meta = meta;
  }
  /*
  type-only property to distinguish between RejectWithValue and FulfillWithMeta
  does not exist at runtime
  */
  _type;
};
var FulfillWithMeta = class {
  constructor(payload, meta) {
    this.payload = payload;
    this.meta = meta;
  }
  /*
  type-only property to distinguish between RejectWithValue and FulfillWithMeta
  does not exist at runtime
  */
  _type;
};
var miniSerializeError = (value) => {
  if (typeof value === "object" && value !== null) {
    const simpleError = {};
    for (const property of commonProperties) {
      if (typeof value[property] === "string") {
        simpleError[property] = value[property];
      }
    }
    return simpleError;
  }
  return {
    message: String(value)
  };
};
var externalAbortMessage = "External signal was aborted";
var createAsyncThunk = /* @__PURE__ */ (() => {
  function createAsyncThunk2(typePrefix, payloadCreator, options) {
    const fulfilled = createAction(typePrefix + "/fulfilled", (payload, requestId, arg, meta) => ({
      payload,
      meta: {
        ...meta || {},
        arg,
        requestId,
        requestStatus: "fulfilled"
      }
    }));
    const pending = createAction(typePrefix + "/pending", (requestId, arg, meta) => ({
      payload: void 0,
      meta: {
        ...meta || {},
        arg,
        requestId,
        requestStatus: "pending"
      }
    }));
    const rejected = createAction(typePrefix + "/rejected", (error, requestId, arg, payload, meta) => ({
      payload,
      error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
      meta: {
        ...meta || {},
        arg,
        requestId,
        rejectedWithValue: !!payload,
        requestStatus: "rejected",
        aborted: error?.name === "AbortError",
        condition: error?.name === "ConditionError"
      }
    }));
    function actionCreator(arg, {
      signal
    } = {}) {
      return (dispatch, getState, extra) => {
        const requestId = options?.idGenerator ? options.idGenerator(arg) : nanoid();
        const abortController = new AbortController();
        let abortHandler;
        let abortReason;
        function abort(reason) {
          abortReason = reason;
          abortController.abort();
        }
        if (signal) {
          if (signal.aborted) {
            abort(externalAbortMessage);
          } else {
            signal.addEventListener("abort", () => abort(externalAbortMessage), {
              once: true
            });
          }
        }
        const promise = async function() {
          let finalAction;
          try {
            let conditionResult = options?.condition?.(arg, {
              getState,
              extra
            });
            if (isThenable(conditionResult)) {
              conditionResult = await conditionResult;
            }
            if (conditionResult === false || abortController.signal.aborted) {
              throw {
                name: "ConditionError",
                message: "Aborted due to condition callback returning false."
              };
            }
            const abortedPromise = new Promise((_, reject) => {
              abortHandler = () => {
                reject({
                  name: "AbortError",
                  message: abortReason || "Aborted"
                });
              };
              abortController.signal.addEventListener("abort", abortHandler);
            });
            dispatch(pending(requestId, arg, options?.getPendingMeta?.({
              requestId,
              arg
            }, {
              getState,
              extra
            })));
            finalAction = await Promise.race([abortedPromise, Promise.resolve(payloadCreator(arg, {
              dispatch,
              getState,
              extra,
              requestId,
              signal: abortController.signal,
              abort,
              rejectWithValue: (value, meta) => {
                return new RejectWithValue(value, meta);
              },
              fulfillWithValue: (value, meta) => {
                return new FulfillWithMeta(value, meta);
              }
            })).then((result) => {
              if (result instanceof RejectWithValue) {
                throw result;
              }
              if (result instanceof FulfillWithMeta) {
                return fulfilled(result.payload, requestId, arg, result.meta);
              }
              return fulfilled(result, requestId, arg);
            })]);
          } catch (err) {
            finalAction = err instanceof RejectWithValue ? rejected(null, requestId, arg, err.payload, err.meta) : rejected(err, requestId, arg);
          } finally {
            if (abortHandler) {
              abortController.signal.removeEventListener("abort", abortHandler);
            }
          }
          const skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
          if (!skipDispatch) {
            dispatch(finalAction);
          }
          return finalAction;
        }();
        return Object.assign(promise, {
          abort,
          requestId,
          arg,
          unwrap() {
            return promise.then(unwrapResult);
          }
        });
      };
    }
    return Object.assign(actionCreator, {
      pending,
      rejected,
      fulfilled,
      settled: isAnyOf(rejected, fulfilled),
      typePrefix
    });
  }
  createAsyncThunk2.withTypes = () => createAsyncThunk2;
  return createAsyncThunk2;
})();
function unwrapResult(action) {
  if (action.meta && action.meta.rejectedWithValue) {
    throw action.payload;
  }
  if (action.error) {
    throw action.error;
  }
  return action.payload;
}
function isThenable(value) {
  return value !== null && typeof value === "object" && typeof value.then === "function";
}

// src/createSlice.ts
var asyncThunkSymbol = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
var asyncThunkCreator = {
  [asyncThunkSymbol]: createAsyncThunk
};
var ReducerType = /* @__PURE__ */ ((ReducerType2) => {
  ReducerType2["reducer"] = "reducer";
  ReducerType2["reducerWithPrepare"] = "reducerWithPrepare";
  ReducerType2["asyncThunk"] = "asyncThunk";
  return ReducerType2;
})(ReducerType || {});
function getType(slice, actionKey) {
  return `${slice}/${actionKey}`;
}
function buildCreateSlice({
  creators
} = {}) {
  const cAT = creators?.asyncThunk?.[asyncThunkSymbol];
  return function createSlice2(options) {
    const {
      name,
      reducerPath = name
    } = options;
    if (!name) {
      throw new Error( false ? 0 : "`name` is a required option for createSlice");
    }
    if (typeof process !== "undefined" && "development" === "development") {
      if (options.initialState === void 0) {
        console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
      }
    }
    const reducers = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
    const reducerNames = Object.keys(reducers);
    const context = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    };
    const contextMethods = {
      addCase(typeOrActionCreator, reducer2) {
        const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
        if (!type) {
          throw new Error( false ? 0 : "`context.addCase` cannot be called with an empty action type");
        }
        if (type in context.sliceCaseReducersByType) {
          throw new Error( false ? 0 : "`context.addCase` cannot be called with two reducers for the same action type: " + type);
        }
        context.sliceCaseReducersByType[type] = reducer2;
        return contextMethods;
      },
      addMatcher(matcher, reducer2) {
        context.sliceMatchers.push({
          matcher,
          reducer: reducer2
        });
        return contextMethods;
      },
      exposeAction(name2, actionCreator) {
        context.actionCreators[name2] = actionCreator;
        return contextMethods;
      },
      exposeCaseReducer(name2, reducer2) {
        context.sliceCaseReducersByName[name2] = reducer2;
        return contextMethods;
      }
    };
    reducerNames.forEach((reducerName) => {
      const reducerDefinition = reducers[reducerName];
      const reducerDetails = {
        reducerName,
        type: getType(name, reducerName),
        createNotation: typeof options.reducers === "function"
      };
      if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) {
        handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
      } else {
        handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
      }
    });
    function buildReducer() {
      if (true) {
        if (typeof options.extraReducers === "object") {
          throw new Error( false ? 0 : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
        }
      }
      const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
      const finalCaseReducers = {
        ...extraReducers,
        ...context.sliceCaseReducersByType
      };
      return createReducer(options.initialState, (builder) => {
        for (let key in finalCaseReducers) {
          builder.addCase(key, finalCaseReducers[key]);
        }
        for (let sM of context.sliceMatchers) {
          builder.addMatcher(sM.matcher, sM.reducer);
        }
        for (let m of actionMatchers) {
          builder.addMatcher(m.matcher, m.reducer);
        }
        if (defaultCaseReducer) {
          builder.addDefaultCase(defaultCaseReducer);
        }
      });
    }
    const selectSelf = (state) => state;
    const injectedSelectorCache = /* @__PURE__ */ new Map();
    const injectedStateCache = /* @__PURE__ */ new WeakMap();
    let _reducer;
    function reducer(state, action) {
      if (!_reducer) _reducer = buildReducer();
      return _reducer(state, action);
    }
    function getInitialState() {
      if (!_reducer) _reducer = buildReducer();
      return _reducer.getInitialState();
    }
    function makeSelectorProps(reducerPath2, injected = false) {
      function selectSlice(state) {
        let sliceState = state[reducerPath2];
        if (typeof sliceState === "undefined") {
          if (injected) {
            sliceState = getOrInsertComputed(injectedStateCache, selectSlice, getInitialState);
          } else if (true) {
            throw new Error( false ? 0 : "selectSlice returned undefined for an uninjected slice reducer");
          }
        }
        return sliceState;
      }
      function getSelectors(selectState = selectSelf) {
        const selectorCache = getOrInsertComputed(injectedSelectorCache, injected, () => /* @__PURE__ */ new WeakMap());
        return getOrInsertComputed(selectorCache, selectState, () => {
          const map = {};
          for (const [name2, selector] of Object.entries(options.selectors ?? {})) {
            map[name2] = wrapSelector(selector, selectState, () => getOrInsertComputed(injectedStateCache, selectState, getInitialState), injected);
          }
          return map;
        });
      }
      return {
        reducerPath: reducerPath2,
        getSelectors,
        get selectors() {
          return getSelectors(selectSlice);
        },
        selectSlice
      };
    }
    const slice = {
      name,
      reducer,
      actions: context.actionCreators,
      caseReducers: context.sliceCaseReducersByName,
      getInitialState,
      ...makeSelectorProps(reducerPath),
      injectInto(injectable, {
        reducerPath: pathOpt,
        ...config
      } = {}) {
        const newReducerPath = pathOpt ?? reducerPath;
        injectable.inject({
          reducerPath: newReducerPath,
          reducer
        }, config);
        return {
          ...slice,
          ...makeSelectorProps(newReducerPath, true)
        };
      }
    };
    return slice;
  };
}
function wrapSelector(selector, selectState, getInitialState, injected) {
  function wrapper(rootState, ...args) {
    let sliceState = selectState(rootState);
    if (typeof sliceState === "undefined") {
      if (injected) {
        sliceState = getInitialState();
      } else if (true) {
        throw new Error( false ? 0 : "selectState returned undefined for an uninjected slice reducer");
      }
    }
    return selector(sliceState, ...args);
  }
  wrapper.unwrapped = selector;
  return wrapper;
}
var createSlice = /* @__PURE__ */ buildCreateSlice();
function buildReducerCreators() {
  function asyncThunk(payloadCreator, config) {
    return {
      _reducerDefinitionType: "asyncThunk" /* asyncThunk */,
      payloadCreator,
      ...config
    };
  }
  asyncThunk.withTypes = () => asyncThunk;
  return {
    reducer(caseReducer) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [caseReducer.name](...args) {
          return caseReducer(...args);
        }
      }[caseReducer.name], {
        _reducerDefinitionType: "reducer" /* reducer */
      });
    },
    preparedReducer(prepare, reducer) {
      return {
        _reducerDefinitionType: "reducerWithPrepare" /* reducerWithPrepare */,
        prepare,
        reducer
      };
    },
    asyncThunk
  };
}
function handleNormalReducerDefinition({
  type,
  reducerName,
  createNotation
}, maybeReducerWithPrepare, context) {
  let caseReducer;
  let prepareCallback;
  if ("reducer" in maybeReducerWithPrepare) {
    if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) {
      throw new Error( false ? 0 : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    }
    caseReducer = maybeReducerWithPrepare.reducer;
    prepareCallback = maybeReducerWithPrepare.prepare;
  } else {
    caseReducer = maybeReducerWithPrepare;
  }
  context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "asyncThunk" /* asyncThunk */;
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "reducerWithPrepare" /* reducerWithPrepare */;
}
function handleThunkCaseReducerDefinition({
  type,
  reducerName
}, reducerDefinition, context, cAT) {
  if (!cAT) {
    throw new Error( false ? 0 : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  }
  const {
    payloadCreator,
    fulfilled,
    pending,
    rejected,
    settled,
    options
  } = reducerDefinition;
  const thunk = cAT(type, payloadCreator, options);
  context.exposeAction(reducerName, thunk);
  if (fulfilled) {
    context.addCase(thunk.fulfilled, fulfilled);
  }
  if (pending) {
    context.addCase(thunk.pending, pending);
  }
  if (rejected) {
    context.addCase(thunk.rejected, rejected);
  }
  if (settled) {
    context.addMatcher(thunk.settled, settled);
  }
  context.exposeCaseReducer(reducerName, {
    fulfilled: fulfilled || noop,
    pending: pending || noop,
    rejected: rejected || noop,
    settled: settled || noop
  });
}
function noop() {
}

// src/entities/entity_state.ts
function getInitialEntityState() {
  return {
    ids: [],
    entities: {}
  };
}
function createInitialStateFactory(stateAdapter) {
  function getInitialState(additionalState = {}, entities) {
    const state = Object.assign(getInitialEntityState(), additionalState);
    return entities ? stateAdapter.setAll(state, entities) : state;
  }
  return {
    getInitialState
  };
}

// src/entities/state_selectors.ts
function createSelectorsFactory() {
  function getSelectors(selectState, options = {}) {
    const {
      createSelector: createSelector2 = createDraftSafeSelector
    } = options;
    const selectIds = (state) => state.ids;
    const selectEntities = (state) => state.entities;
    const selectAll = createSelector2(selectIds, selectEntities, (ids, entities) => ids.map((id) => entities[id]));
    const selectId = (_, id) => id;
    const selectById = (entities, id) => entities[id];
    const selectTotal = createSelector2(selectIds, (ids) => ids.length);
    if (!selectState) {
      return {
        selectIds,
        selectEntities,
        selectAll,
        selectTotal,
        selectById: createSelector2(selectEntities, selectId, selectById)
      };
    }
    const selectGlobalizedEntities = createSelector2(selectState, selectEntities);
    return {
      selectIds: createSelector2(selectState, selectIds),
      selectEntities: selectGlobalizedEntities,
      selectAll: createSelector2(selectState, selectAll),
      selectTotal: createSelector2(selectState, selectTotal),
      selectById: createSelector2(selectGlobalizedEntities, selectId, selectById)
    };
  }
  return {
    getSelectors
  };
}

// src/entities/state_adapter.ts

var isDraftTyped = immer__WEBPACK_IMPORTED_MODULE_1__.isDraft;
function createSingleArgumentStateOperator(mutator) {
  const operator = createStateOperator((_, state) => mutator(state));
  return function operation(state) {
    return operator(state, void 0);
  };
}
function createStateOperator(mutator) {
  return function operation(state, arg) {
    function isPayloadActionArgument(arg2) {
      return isFSA(arg2);
    }
    const runMutator = (draft) => {
      if (isPayloadActionArgument(arg)) {
        mutator(arg.payload, draft);
      } else {
        mutator(arg, draft);
      }
    };
    if (isDraftTyped(state)) {
      runMutator(state);
      return state;
    }
    return (0,immer__WEBPACK_IMPORTED_MODULE_1__.produce)(state, runMutator);
  };
}

// src/entities/utils.ts

function selectIdValue(entity, selectId) {
  const key = selectId(entity);
  if ( true && key === void 0) {
    console.warn("The entity passed to the `selectId` implementation returned undefined.", "You should probably provide your own `selectId` implementation.", "The entity that was passed:", entity, "The `selectId` implementation:", selectId.toString());
  }
  return key;
}
function ensureEntitiesArray(entities) {
  if (!Array.isArray(entities)) {
    entities = Object.values(entities);
  }
  return entities;
}
function getCurrent(value) {
  return (0,immer__WEBPACK_IMPORTED_MODULE_1__.isDraft)(value) ? (0,immer__WEBPACK_IMPORTED_MODULE_1__.current)(value) : value;
}
function splitAddedUpdatedEntities(newEntities, selectId, state) {
  newEntities = ensureEntitiesArray(newEntities);
  const existingIdsArray = getCurrent(state.ids);
  const existingIds = new Set(existingIdsArray);
  const added = [];
  const addedIds = /* @__PURE__ */ new Set([]);
  const updated = [];
  for (const entity of newEntities) {
    const id = selectIdValue(entity, selectId);
    if (existingIds.has(id) || addedIds.has(id)) {
      updated.push({
        id,
        changes: entity
      });
    } else {
      addedIds.add(id);
      added.push(entity);
    }
  }
  return [added, updated, existingIdsArray];
}

// src/entities/unsorted_state_adapter.ts
function createUnsortedStateAdapter(selectId) {
  function addOneMutably(entity, state) {
    const key = selectIdValue(entity, selectId);
    if (key in state.entities) {
      return;
    }
    state.ids.push(key);
    state.entities[key] = entity;
  }
  function addManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    for (const entity of newEntities) {
      addOneMutably(entity, state);
    }
  }
  function setOneMutably(entity, state) {
    const key = selectIdValue(entity, selectId);
    if (!(key in state.entities)) {
      state.ids.push(key);
    }
    ;
    state.entities[key] = entity;
  }
  function setManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    for (const entity of newEntities) {
      setOneMutably(entity, state);
    }
  }
  function setAllMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    state.ids = [];
    state.entities = {};
    addManyMutably(newEntities, state);
  }
  function removeOneMutably(key, state) {
    return removeManyMutably([key], state);
  }
  function removeManyMutably(keys, state) {
    let didMutate = false;
    keys.forEach((key) => {
      if (key in state.entities) {
        delete state.entities[key];
        didMutate = true;
      }
    });
    if (didMutate) {
      state.ids = state.ids.filter((id) => id in state.entities);
    }
  }
  function removeAllMutably(state) {
    Object.assign(state, {
      ids: [],
      entities: {}
    });
  }
  function takeNewKey(keys, update, state) {
    const original3 = state.entities[update.id];
    if (original3 === void 0) {
      return false;
    }
    const updated = Object.assign({}, original3, update.changes);
    const newKey = selectIdValue(updated, selectId);
    const hasNewKey = newKey !== update.id;
    if (hasNewKey) {
      keys[update.id] = newKey;
      delete state.entities[update.id];
    }
    ;
    state.entities[newKey] = updated;
    return hasNewKey;
  }
  function updateOneMutably(update, state) {
    return updateManyMutably([update], state);
  }
  function updateManyMutably(updates, state) {
    const newKeys = {};
    const updatesPerEntity = {};
    updates.forEach((update) => {
      if (update.id in state.entities) {
        updatesPerEntity[update.id] = {
          id: update.id,
          // Spreads ignore falsy values, so this works even if there isn't
          // an existing update already at this key
          changes: {
            ...updatesPerEntity[update.id]?.changes,
            ...update.changes
          }
        };
      }
    });
    updates = Object.values(updatesPerEntity);
    const didMutateEntities = updates.length > 0;
    if (didMutateEntities) {
      const didMutateIds = updates.filter((update) => takeNewKey(newKeys, update, state)).length > 0;
      if (didMutateIds) {
        state.ids = Object.values(state.entities).map((e) => selectIdValue(e, selectId));
      }
    }
  }
  function upsertOneMutably(entity, state) {
    return upsertManyMutably([entity], state);
  }
  function upsertManyMutably(newEntities, state) {
    const [added, updated] = splitAddedUpdatedEntities(newEntities, selectId, state);
    addManyMutably(added, state);
    updateManyMutably(updated, state);
  }
  return {
    removeAll: createSingleArgumentStateOperator(removeAllMutably),
    addOne: createStateOperator(addOneMutably),
    addMany: createStateOperator(addManyMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    updateOne: createStateOperator(updateOneMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    upsertMany: createStateOperator(upsertManyMutably),
    removeOne: createStateOperator(removeOneMutably),
    removeMany: createStateOperator(removeManyMutably)
  };
}

// src/entities/sorted_state_adapter.ts
function findInsertIndex(sortedItems, item, comparisonFunction) {
  let lowIndex = 0;
  let highIndex = sortedItems.length;
  while (lowIndex < highIndex) {
    let middleIndex = lowIndex + highIndex >>> 1;
    const currentItem = sortedItems[middleIndex];
    const res = comparisonFunction(item, currentItem);
    if (res >= 0) {
      lowIndex = middleIndex + 1;
    } else {
      highIndex = middleIndex;
    }
  }
  return lowIndex;
}
function insert(sortedItems, item, comparisonFunction) {
  const insertAtIndex = findInsertIndex(sortedItems, item, comparisonFunction);
  sortedItems.splice(insertAtIndex, 0, item);
  return sortedItems;
}
function createSortedStateAdapter(selectId, comparer) {
  const {
    removeOne,
    removeMany,
    removeAll
  } = createUnsortedStateAdapter(selectId);
  function addOneMutably(entity, state) {
    return addManyMutably([entity], state);
  }
  function addManyMutably(newEntities, state, existingIds) {
    newEntities = ensureEntitiesArray(newEntities);
    const existingKeys = new Set(existingIds ?? getCurrent(state.ids));
    const addedKeys = /* @__PURE__ */ new Set();
    const models = newEntities.filter((model) => {
      const modelId = selectIdValue(model, selectId);
      const notAdded = !addedKeys.has(modelId);
      if (notAdded) addedKeys.add(modelId);
      return !existingKeys.has(modelId) && notAdded;
    });
    if (models.length !== 0) {
      mergeFunction(state, models);
    }
  }
  function setOneMutably(entity, state) {
    return setManyMutably([entity], state);
  }
  function setManyMutably(newEntities, state) {
    let deduplicatedEntities = {};
    newEntities = ensureEntitiesArray(newEntities);
    if (newEntities.length !== 0) {
      for (const item of newEntities) {
        const entityId = selectId(item);
        deduplicatedEntities[entityId] = item;
        delete state.entities[entityId];
      }
      newEntities = ensureEntitiesArray(deduplicatedEntities);
      mergeFunction(state, newEntities);
    }
  }
  function setAllMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    state.entities = {};
    state.ids = [];
    addManyMutably(newEntities, state, []);
  }
  function updateOneMutably(update, state) {
    return updateManyMutably([update], state);
  }
  function updateManyMutably(updates, state) {
    let appliedUpdates = false;
    let replacedIds = false;
    for (let update of updates) {
      const entity = state.entities[update.id];
      if (!entity) {
        continue;
      }
      appliedUpdates = true;
      Object.assign(entity, update.changes);
      const newId = selectId(entity);
      if (update.id !== newId) {
        replacedIds = true;
        delete state.entities[update.id];
        const oldIndex = state.ids.indexOf(update.id);
        state.ids[oldIndex] = newId;
        state.entities[newId] = entity;
      }
    }
    if (appliedUpdates) {
      mergeFunction(state, [], appliedUpdates, replacedIds);
    }
  }
  function upsertOneMutably(entity, state) {
    return upsertManyMutably([entity], state);
  }
  function upsertManyMutably(newEntities, state) {
    const [added, updated, existingIdsArray] = splitAddedUpdatedEntities(newEntities, selectId, state);
    if (added.length) {
      addManyMutably(added, state, existingIdsArray);
    }
    if (updated.length) {
      updateManyMutably(updated, state);
    }
  }
  function areArraysEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        continue;
      }
      return false;
    }
    return true;
  }
  const mergeFunction = (state, addedItems, appliedUpdates, replacedIds) => {
    const currentEntities = getCurrent(state.entities);
    const currentIds = getCurrent(state.ids);
    const stateEntities = state.entities;
    let ids = currentIds;
    if (replacedIds) {
      ids = new Set(currentIds);
    }
    let sortedEntities = [];
    for (const id of ids) {
      const entity = currentEntities[id];
      if (entity) {
        sortedEntities.push(entity);
      }
    }
    const wasPreviouslyEmpty = sortedEntities.length === 0;
    for (const item of addedItems) {
      stateEntities[selectId(item)] = item;
      if (!wasPreviouslyEmpty) {
        insert(sortedEntities, item, comparer);
      }
    }
    if (wasPreviouslyEmpty) {
      sortedEntities = addedItems.slice().sort(comparer);
    } else if (appliedUpdates) {
      sortedEntities.sort(comparer);
    }
    const newSortedIds = sortedEntities.map(selectId);
    if (!areArraysEqual(currentIds, newSortedIds)) {
      state.ids = newSortedIds;
    }
  };
  return {
    removeOne,
    removeMany,
    removeAll,
    addOne: createStateOperator(addOneMutably),
    updateOne: createStateOperator(updateOneMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    addMany: createStateOperator(addManyMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertMany: createStateOperator(upsertManyMutably)
  };
}

// src/entities/create_adapter.ts
function createEntityAdapter(options = {}) {
  const {
    selectId,
    sortComparer
  } = {
    sortComparer: false,
    selectId: (instance) => instance.id,
    ...options
  };
  const stateAdapter = sortComparer ? createSortedStateAdapter(selectId, sortComparer) : createUnsortedStateAdapter(selectId);
  const stateFactory = createInitialStateFactory(stateAdapter);
  const selectorsFactory = createSelectorsFactory();
  return {
    selectId,
    sortComparer,
    ...stateFactory,
    ...selectorsFactory,
    ...stateAdapter
  };
}

// src/listenerMiddleware/index.ts


// src/listenerMiddleware/exceptions.ts
var task = "task";
var listener = "listener";
var completed = "completed";
var cancelled = "cancelled";
var taskCancelled = `task-${cancelled}`;
var taskCompleted = `task-${completed}`;
var listenerCancelled = `${listener}-${cancelled}`;
var listenerCompleted = `${listener}-${completed}`;
var TaskAbortError = class {
  constructor(code) {
    this.code = code;
    this.message = `${task} ${cancelled} (reason: ${code})`;
  }
  name = "TaskAbortError";
  message;
};

// src/listenerMiddleware/utils.ts
var assertFunction = (func, expected) => {
  if (typeof func !== "function") {
    throw new TypeError( false ? 0 : `${expected} is not a function`);
  }
};
var noop2 = () => {
};
var catchRejection = (promise, onError = noop2) => {
  promise.catch(onError);
  return promise;
};
var addAbortSignalListener = (abortSignal, callback) => {
  abortSignal.addEventListener("abort", callback, {
    once: true
  });
  return () => abortSignal.removeEventListener("abort", callback);
};
var abortControllerWithReason = (abortController, reason) => {
  const signal = abortController.signal;
  if (signal.aborted) {
    return;
  }
  if (!("reason" in signal)) {
    Object.defineProperty(signal, "reason", {
      enumerable: true,
      value: reason,
      configurable: true,
      writable: true
    });
  }
  ;
  abortController.abort(reason);
};

// src/listenerMiddleware/task.ts
var validateActive = (signal) => {
  if (signal.aborted) {
    const {
      reason
    } = signal;
    throw new TaskAbortError(reason);
  }
};
function raceWithSignal(signal, promise) {
  let cleanup = noop2;
  return new Promise((resolve, reject) => {
    const notifyRejection = () => reject(new TaskAbortError(signal.reason));
    if (signal.aborted) {
      notifyRejection();
      return;
    }
    cleanup = addAbortSignalListener(signal, notifyRejection);
    promise.finally(() => cleanup()).then(resolve, reject);
  }).finally(() => {
    cleanup = noop2;
  });
}
var runTask = async (task2, cleanUp) => {
  try {
    await Promise.resolve();
    const value = await task2();
    return {
      status: "ok",
      value
    };
  } catch (error) {
    return {
      status: error instanceof TaskAbortError ? "cancelled" : "rejected",
      error
    };
  } finally {
    cleanUp?.();
  }
};
var createPause = (signal) => {
  return (promise) => {
    return catchRejection(raceWithSignal(signal, promise).then((output) => {
      validateActive(signal);
      return output;
    }));
  };
};
var createDelay = (signal) => {
  const pause = createPause(signal);
  return (timeoutMs) => {
    return pause(new Promise((resolve) => setTimeout(resolve, timeoutMs)));
  };
};

// src/listenerMiddleware/index.ts
var {
  assign
} = Object;
var INTERNAL_NIL_TOKEN = {};
var alm = "listenerMiddleware";
var createFork = (parentAbortSignal, parentBlockingPromises) => {
  const linkControllers = (controller) => addAbortSignalListener(parentAbortSignal, () => abortControllerWithReason(controller, parentAbortSignal.reason));
  return (taskExecutor, opts) => {
    assertFunction(taskExecutor, "taskExecutor");
    const childAbortController = new AbortController();
    linkControllers(childAbortController);
    const result = runTask(async () => {
      validateActive(parentAbortSignal);
      validateActive(childAbortController.signal);
      const result2 = await taskExecutor({
        pause: createPause(childAbortController.signal),
        delay: createDelay(childAbortController.signal),
        signal: childAbortController.signal
      });
      validateActive(childAbortController.signal);
      return result2;
    }, () => abortControllerWithReason(childAbortController, taskCompleted));
    if (opts?.autoJoin) {
      parentBlockingPromises.push(result.catch(noop2));
    }
    return {
      result: createPause(parentAbortSignal)(result),
      cancel() {
        abortControllerWithReason(childAbortController, taskCancelled);
      }
    };
  };
};
var createTakePattern = (startListening, signal) => {
  const take = async (predicate, timeout) => {
    validateActive(signal);
    let unsubscribe = () => {
    };
    const tuplePromise = new Promise((resolve, reject) => {
      let stopListening = startListening({
        predicate,
        effect: (action, listenerApi) => {
          listenerApi.unsubscribe();
          resolve([action, listenerApi.getState(), listenerApi.getOriginalState()]);
        }
      });
      unsubscribe = () => {
        stopListening();
        reject();
      };
    });
    const promises = [tuplePromise];
    if (timeout != null) {
      promises.push(new Promise((resolve) => setTimeout(resolve, timeout, null)));
    }
    try {
      const output = await raceWithSignal(signal, Promise.race(promises));
      validateActive(signal);
      return output;
    } finally {
      unsubscribe();
    }
  };
  return (predicate, timeout) => catchRejection(take(predicate, timeout));
};
var getListenerEntryPropsFrom = (options) => {
  let {
    type,
    actionCreator,
    matcher,
    predicate,
    effect
  } = options;
  if (type) {
    predicate = createAction(type).match;
  } else if (actionCreator) {
    type = actionCreator.type;
    predicate = actionCreator.match;
  } else if (matcher) {
    predicate = matcher;
  } else if (predicate) {
  } else {
    throw new Error( false ? 0 : "Creating or removing a listener requires one of the known fields for matching an action");
  }
  assertFunction(effect, "options.listener");
  return {
    predicate,
    type,
    effect
  };
};
var createListenerEntry = /* @__PURE__ */ assign((options) => {
  const {
    type,
    predicate,
    effect
  } = getListenerEntryPropsFrom(options);
  const entry = {
    id: nanoid(),
    effect,
    type,
    predicate,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error( false ? 0 : "Unsubscribe not initialized");
    }
  };
  return entry;
}, {
  withTypes: () => createListenerEntry
});
var findListenerEntry = (listenerMap, options) => {
  const {
    type,
    effect,
    predicate
  } = getListenerEntryPropsFrom(options);
  return Array.from(listenerMap.values()).find((entry) => {
    const matchPredicateOrType = typeof type === "string" ? entry.type === type : entry.predicate === predicate;
    return matchPredicateOrType && entry.effect === effect;
  });
};
var cancelActiveListeners = (entry) => {
  entry.pending.forEach((controller) => {
    abortControllerWithReason(controller, listenerCancelled);
  });
};
var createClearListenerMiddleware = (listenerMap, executingListeners) => {
  return () => {
    for (const listener2 of executingListeners.keys()) {
      cancelActiveListeners(listener2);
    }
    listenerMap.clear();
  };
};
var safelyNotifyError = (errorHandler, errorToNotify, errorInfo) => {
  try {
    errorHandler(errorToNotify, errorInfo);
  } catch (errorHandlerError) {
    setTimeout(() => {
      throw errorHandlerError;
    }, 0);
  }
};
var addListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/add`), {
  withTypes: () => addListener
});
var clearAllListeners = /* @__PURE__ */ createAction(`${alm}/removeAll`);
var removeListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/remove`), {
  withTypes: () => removeListener
});
var defaultErrorHandler = (...args) => {
  console.error(`${alm}/error`, ...args);
};
var createListenerMiddleware = (middlewareOptions = {}) => {
  const listenerMap = /* @__PURE__ */ new Map();
  const executingListeners = /* @__PURE__ */ new Map();
  const trackExecutingListener = (entry) => {
    const count = executingListeners.get(entry) ?? 0;
    executingListeners.set(entry, count + 1);
  };
  const untrackExecutingListener = (entry) => {
    const count = executingListeners.get(entry) ?? 1;
    if (count === 1) {
      executingListeners.delete(entry);
    } else {
      executingListeners.set(entry, count - 1);
    }
  };
  const {
    extra,
    onError = defaultErrorHandler
  } = middlewareOptions;
  assertFunction(onError, "onError");
  const insertEntry = (entry) => {
    entry.unsubscribe = () => listenerMap.delete(entry.id);
    listenerMap.set(entry.id, entry);
    return (cancelOptions) => {
      entry.unsubscribe();
      if (cancelOptions?.cancelActive) {
        cancelActiveListeners(entry);
      }
    };
  };
  const startListening = (options) => {
    const entry = findListenerEntry(listenerMap, options) ?? createListenerEntry(options);
    return insertEntry(entry);
  };
  assign(startListening, {
    withTypes: () => startListening
  });
  const stopListening = (options) => {
    const entry = findListenerEntry(listenerMap, options);
    if (entry) {
      entry.unsubscribe();
      if (options.cancelActive) {
        cancelActiveListeners(entry);
      }
    }
    return !!entry;
  };
  assign(stopListening, {
    withTypes: () => stopListening
  });
  const notifyListener = async (entry, action, api, getOriginalState) => {
    const internalTaskController = new AbortController();
    const take = createTakePattern(startListening, internalTaskController.signal);
    const autoJoinPromises = [];
    try {
      entry.pending.add(internalTaskController);
      trackExecutingListener(entry);
      await Promise.resolve(entry.effect(
        action,
        // Use assign() rather than ... to avoid extra helper functions added to bundle
        assign({}, api, {
          getOriginalState,
          condition: (predicate, timeout) => take(predicate, timeout).then(Boolean),
          take,
          delay: createDelay(internalTaskController.signal),
          pause: createPause(internalTaskController.signal),
          extra,
          signal: internalTaskController.signal,
          fork: createFork(internalTaskController.signal, autoJoinPromises),
          unsubscribe: entry.unsubscribe,
          subscribe: () => {
            listenerMap.set(entry.id, entry);
          },
          cancelActiveListeners: () => {
            entry.pending.forEach((controller, _, set) => {
              if (controller !== internalTaskController) {
                abortControllerWithReason(controller, listenerCancelled);
                set.delete(controller);
              }
            });
          },
          cancel: () => {
            abortControllerWithReason(internalTaskController, listenerCancelled);
            entry.pending.delete(internalTaskController);
          },
          throwIfCancelled: () => {
            validateActive(internalTaskController.signal);
          }
        })
      ));
    } catch (listenerError) {
      if (!(listenerError instanceof TaskAbortError)) {
        safelyNotifyError(onError, listenerError, {
          raisedBy: "effect"
        });
      }
    } finally {
      await Promise.all(autoJoinPromises);
      abortControllerWithReason(internalTaskController, listenerCompleted);
      untrackExecutingListener(entry);
      entry.pending.delete(internalTaskController);
    }
  };
  const clearListenerMiddleware = createClearListenerMiddleware(listenerMap, executingListeners);
  const middleware = (api) => (next) => (action) => {
    if (!(0,redux__WEBPACK_IMPORTED_MODULE_0__.isAction)(action)) {
      return next(action);
    }
    if (addListener.match(action)) {
      return startListening(action.payload);
    }
    if (clearAllListeners.match(action)) {
      clearListenerMiddleware();
      return;
    }
    if (removeListener.match(action)) {
      return stopListening(action.payload);
    }
    let originalState = api.getState();
    const getOriginalState = () => {
      if (originalState === INTERNAL_NIL_TOKEN) {
        throw new Error( false ? 0 : `${alm}: getOriginalState can only be called synchronously`);
      }
      return originalState;
    };
    let result;
    try {
      result = next(action);
      if (listenerMap.size > 0) {
        const currentState = api.getState();
        const listenerEntries = Array.from(listenerMap.values());
        for (const entry of listenerEntries) {
          let runListener = false;
          try {
            runListener = entry.predicate(action, currentState, originalState);
          } catch (predicateError) {
            runListener = false;
            safelyNotifyError(onError, predicateError, {
              raisedBy: "predicate"
            });
          }
          if (!runListener) {
            continue;
          }
          notifyListener(entry, action, api, getOriginalState);
        }
      }
    } finally {
      originalState = INTERNAL_NIL_TOKEN;
    }
    return result;
  };
  return {
    middleware,
    startListening,
    stopListening,
    clearListeners: clearListenerMiddleware
  };
};

// src/dynamicMiddleware/index.ts

var createMiddlewareEntry = (middleware) => ({
  middleware,
  applied: /* @__PURE__ */ new Map()
});
var matchInstance = (instanceId) => (action) => action?.meta?.instanceId === instanceId;
var createDynamicMiddleware = () => {
  const instanceId = nanoid();
  const middlewareMap = /* @__PURE__ */ new Map();
  const withMiddleware = Object.assign(createAction("dynamicMiddleware/add", (...middlewares) => ({
    payload: middlewares,
    meta: {
      instanceId
    }
  })), {
    withTypes: () => withMiddleware
  });
  const addMiddleware = Object.assign(function addMiddleware2(...middlewares) {
    middlewares.forEach((middleware2) => {
      getOrInsertComputed(middlewareMap, middleware2, createMiddlewareEntry);
    });
  }, {
    withTypes: () => addMiddleware
  });
  const getFinalMiddleware = (api) => {
    const appliedMiddleware = Array.from(middlewareMap.values()).map((entry) => getOrInsertComputed(entry.applied, api, entry.middleware));
    return (0,redux__WEBPACK_IMPORTED_MODULE_0__.compose)(...appliedMiddleware);
  };
  const isWithMiddleware = isAllOf(withMiddleware, matchInstance(instanceId));
  const middleware = (api) => (next) => (action) => {
    if (isWithMiddleware(action)) {
      addMiddleware(...action.payload);
      return api.dispatch;
    }
    return getFinalMiddleware(api)(next)(action);
  };
  return {
    middleware,
    addMiddleware,
    withMiddleware,
    instanceId
  };
};

// src/combineSlices.ts

var isSliceLike = (maybeSliceLike) => "reducerPath" in maybeSliceLike && typeof maybeSliceLike.reducerPath === "string";
var getReducers = (slices) => slices.flatMap((sliceOrMap) => isSliceLike(sliceOrMap) ? [[sliceOrMap.reducerPath, sliceOrMap.reducer]] : Object.entries(sliceOrMap));
var ORIGINAL_STATE = Symbol.for("rtk-state-proxy-original");
var isStateProxy = (value) => !!value && !!value[ORIGINAL_STATE];
var stateProxyMap = /* @__PURE__ */ new WeakMap();
var createStateProxy = (state, reducerMap, initialStateCache) => getOrInsertComputed(stateProxyMap, state, () => new Proxy(state, {
  get: (target, prop, receiver) => {
    if (prop === ORIGINAL_STATE) return target;
    const result = Reflect.get(target, prop, receiver);
    if (typeof result === "undefined") {
      const cached = initialStateCache[prop];
      if (typeof cached !== "undefined") return cached;
      const reducer = reducerMap[prop];
      if (reducer) {
        const reducerResult = reducer(void 0, {
          type: nanoid()
        });
        if (typeof reducerResult === "undefined") {
          throw new Error( false ? 0 : `The slice reducer for key "${prop.toString()}" returned undefined when called for selector(). If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
        }
        initialStateCache[prop] = reducerResult;
        return reducerResult;
      }
    }
    return result;
  }
}));
var original = (state) => {
  if (!isStateProxy(state)) {
    throw new Error( false ? 0 : "original must be used on state Proxy");
  }
  return state[ORIGINAL_STATE];
};
var emptyObject = {};
var noopReducer = (state = emptyObject) => state;
function combineSlices(...slices) {
  const reducerMap = Object.fromEntries(getReducers(slices));
  const getReducer = () => Object.keys(reducerMap).length ? (0,redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers)(reducerMap) : noopReducer;
  let reducer = getReducer();
  function combinedReducer(state, action) {
    return reducer(state, action);
  }
  combinedReducer.withLazyLoadedSlices = () => combinedReducer;
  const initialStateCache = {};
  const inject = (slice, config = {}) => {
    const {
      reducerPath,
      reducer: reducerToInject
    } = slice;
    const currentReducer = reducerMap[reducerPath];
    if (!config.overrideExisting && currentReducer && currentReducer !== reducerToInject) {
      if (typeof process !== "undefined" && "development" === "development") {
        console.error(`called \`inject\` to override already-existing reducer ${reducerPath} without specifying \`overrideExisting: true\``);
      }
      return combinedReducer;
    }
    if (config.overrideExisting && currentReducer !== reducerToInject) {
      delete initialStateCache[reducerPath];
    }
    reducerMap[reducerPath] = reducerToInject;
    reducer = getReducer();
    return combinedReducer;
  };
  const selector = Object.assign(function makeSelector(selectorFn, selectState) {
    return function selector2(state, ...args) {
      return selectorFn(createStateProxy(selectState ? selectState(state, ...args) : state, reducerMap, initialStateCache), ...args);
    };
  }, {
    original
  });
  return Object.assign(combinedReducer, {
    inject,
    selector
  });
}

// src/formatProdErrorMessage.ts
function formatProdErrorMessage(code) {
  return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}

//# sourceMappingURL=redux-toolkit.modern.mjs.map

/***/ }),

/***/ "./node_modules/immer/dist/immer.mjs":
/*!*******************************************!*\
  !*** ./node_modules/immer/dist/immer.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Immer: () => (/* binding */ Immer2),
/* harmony export */   applyPatches: () => (/* binding */ applyPatches),
/* harmony export */   castDraft: () => (/* binding */ castDraft),
/* harmony export */   castImmutable: () => (/* binding */ castImmutable),
/* harmony export */   createDraft: () => (/* binding */ createDraft),
/* harmony export */   current: () => (/* binding */ current),
/* harmony export */   enableMapSet: () => (/* binding */ enableMapSet),
/* harmony export */   enablePatches: () => (/* binding */ enablePatches),
/* harmony export */   finishDraft: () => (/* binding */ finishDraft),
/* harmony export */   freeze: () => (/* binding */ freeze),
/* harmony export */   immerable: () => (/* binding */ DRAFTABLE),
/* harmony export */   isDraft: () => (/* binding */ isDraft),
/* harmony export */   isDraftable: () => (/* binding */ isDraftable),
/* harmony export */   nothing: () => (/* binding */ NOTHING),
/* harmony export */   original: () => (/* binding */ original),
/* harmony export */   produce: () => (/* binding */ produce),
/* harmony export */   produceWithPatches: () => (/* binding */ produceWithPatches),
/* harmony export */   setAutoFreeze: () => (/* binding */ setAutoFreeze),
/* harmony export */   setUseStrictShallowCopy: () => (/* binding */ setUseStrictShallowCopy)
/* harmony export */ });
// src/utils/env.ts
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");

// src/utils/errors.ts
var errors =  true ? [
  // All error codes, starting by 0:
  function(plugin) {
    return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
  },
  function(thing) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
  },
  "This object has been frozen and should not be mutated",
  function(data) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(thing) {
    return `'current' expects a draft, got: ${thing}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(thing) {
    return `'original' expects a draft, got: ${thing}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : 0;
function die(error, ...args) {
  if (true) {
    const e = errors[error];
    const msg = typeof e === "function" ? e.apply(null, args) : e;
    throw new Error(`[Immer] ${msg}`);
  }
  // removed by dead control flow

}

// src/utils/common.ts
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
function isPlainObject(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function original(value) {
  if (!isDraft(value))
    die(15, value);
  return value[DRAFT_STATE].base_;
}
function each(obj, iter) {
  if (getArchtype(obj) === 0 /* Object */) {
    Reflect.ownKeys(obj).forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 /* Array */ : isMap(thing) ? 2 /* Map */ : isSet(thing) ? 3 /* Set */ : 0 /* Object */;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 /* Map */ ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function get(thing, prop) {
  return getArchtype(thing) === 2 /* Map */ ? thing.get(prop) : thing[prop];
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2 /* Map */)
    thing.set(propOrOldValue, value);
  else if (t === 3 /* Set */) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    Object.defineProperties(obj, {
      set: { value: dontMutateFrozenCollections },
      add: { value: dontMutateFrozenCollections },
      clear: { value: dontMutateFrozenCollections },
      delete: { value: dontMutateFrozenCollections }
    });
  }
  Object.freeze(obj);
  if (deep)
    Object.values(obj).forEach((value) => freeze(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
function isFrozen(obj) {
  return Object.isFrozen(obj);
}

// src/utils/plugins.ts
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
function loadPlugin(pluginKey, implementation) {
  if (!plugins[pluginKey])
    plugins[pluginKey] = implementation;
}

// src/core/scope.ts
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 /* Object */ || state.type_ === 1 /* Array */)
    state.revoke_();
  else
    state.revoked_ = true;
}

// src/core/finalize.ts
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path)
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3 /* Set */) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(
      resultEach,
      (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if ( true && childValue === targetObject)
    die(5);
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 /* Set */ && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && (isMap(targetObject) ? targetObject.has(prop) : Object.prototype.propertyIsEnumerable.call(targetObject, prop)))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}

// src/core/proxy.ts
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 /* Array */ : 0 /* Object */,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 /* Array */ || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  if ( true && isNaN(parseInt(prop)))
    die(13);
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  if ( true && prop !== "length" && isNaN(parseInt(prop)))
    die(14);
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}

// src/core/immerClass.ts
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    /**
     * The `produce` function takes a value and a "recipe function" (whose
     * return value often depends on the base state). The recipe function is
     * free to mutate its first argument however it wants. All mutations are
     * only ever applied to a __copy__ of the base state.
     *
     * Pass only a function to create a "curried producer" which relieves you
     * from passing the recipe function every time.
     *
     * Only plain objects and arrays are made mutable. All other objects are
     * considered uncopyable.
     *
     * Note: This function is __bound__ to its `Immer` instance.
     *
     * @param {any} base - the initial state
     * @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
     * @param {Function} patchListener - optional function that will be called with all the patches produced here
     * @returns {any} a new state, or the initial state if nothing was modified
     */
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof config?.autoFreeze === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof config?.useStrictShallowCopy === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}

// src/core/current.ts
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy = shallowCopy(value, true);
  }
  each(copy, (key, childValue) => {
    set(copy, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}

// src/plugins/patches.ts
function enablePatches() {
  const errorOffset = 16;
  if (true) {
    errors.push(
      'Sets cannot have "replace" patches.',
      function(op) {
        return "Unsupported patch operation: " + op;
      },
      function(path) {
        return "Cannot apply patch, path doesn't resolve: " + path;
      },
      "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
    );
  }
  const REPLACE = "replace";
  const ADD = "add";
  const REMOVE = "remove";
  function generatePatches_(state, basePath, patches, inversePatches) {
    switch (state.type_) {
      case 0 /* Object */:
      case 2 /* Map */:
        return generatePatchesFromAssigned(
          state,
          basePath,
          patches,
          inversePatches
        );
      case 1 /* Array */:
        return generateArrayPatches(state, basePath, patches, inversePatches);
      case 3 /* Set */:
        return generateSetPatches(
          state,
          basePath,
          patches,
          inversePatches
        );
    }
  }
  function generateArrayPatches(state, basePath, patches, inversePatches) {
    let { base_, assigned_ } = state;
    let copy_ = state.copy_;
    if (copy_.length < base_.length) {
      ;
      [base_, copy_] = [copy_, base_];
      [patches, inversePatches] = [inversePatches, patches];
    }
    for (let i = 0; i < base_.length; i++) {
      if (assigned_[i] && copy_[i] !== base_[i]) {
        const path = basePath.concat([i]);
        patches.push({
          op: REPLACE,
          path,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: clonePatchValueIfNeeded(copy_[i])
        });
        inversePatches.push({
          op: REPLACE,
          path,
          value: clonePatchValueIfNeeded(base_[i])
        });
      }
    }
    for (let i = base_.length; i < copy_.length; i++) {
      const path = basePath.concat([i]);
      patches.push({
        op: ADD,
        path,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: clonePatchValueIfNeeded(copy_[i])
      });
    }
    for (let i = copy_.length - 1; base_.length <= i; --i) {
      const path = basePath.concat([i]);
      inversePatches.push({
        op: REMOVE,
        path
      });
    }
  }
  function generatePatchesFromAssigned(state, basePath, patches, inversePatches) {
    const { base_, copy_ } = state;
    each(state.assigned_, (key, assignedValue) => {
      const origValue = get(base_, key);
      const value = get(copy_, key);
      const op = !assignedValue ? REMOVE : has(base_, key) ? REPLACE : ADD;
      if (origValue === value && op === REPLACE)
        return;
      const path = basePath.concat(key);
      patches.push(op === REMOVE ? { op, path } : { op, path, value });
      inversePatches.push(
        op === ADD ? { op: REMOVE, path } : op === REMOVE ? { op: ADD, path, value: clonePatchValueIfNeeded(origValue) } : { op: REPLACE, path, value: clonePatchValueIfNeeded(origValue) }
      );
    });
  }
  function generateSetPatches(state, basePath, patches, inversePatches) {
    let { base_, copy_ } = state;
    let i = 0;
    base_.forEach((value) => {
      if (!copy_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: REMOVE,
          path,
          value
        });
        inversePatches.unshift({
          op: ADD,
          path,
          value
        });
      }
      i++;
    });
    i = 0;
    copy_.forEach((value) => {
      if (!base_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: ADD,
          path,
          value
        });
        inversePatches.unshift({
          op: REMOVE,
          path,
          value
        });
      }
      i++;
    });
  }
  function generateReplacementPatches_(baseValue, replacement, patches, inversePatches) {
    patches.push({
      op: REPLACE,
      path: [],
      value: replacement === NOTHING ? void 0 : replacement
    });
    inversePatches.push({
      op: REPLACE,
      path: [],
      value: baseValue
    });
  }
  function applyPatches_(draft, patches) {
    patches.forEach((patch) => {
      const { path, op } = patch;
      let base = draft;
      for (let i = 0; i < path.length - 1; i++) {
        const parentType = getArchtype(base);
        let p = path[i];
        if (typeof p !== "string" && typeof p !== "number") {
          p = "" + p;
        }
        if ((parentType === 0 /* Object */ || parentType === 1 /* Array */) && (p === "__proto__" || p === "constructor"))
          die(errorOffset + 3);
        if (typeof base === "function" && p === "prototype")
          die(errorOffset + 3);
        base = get(base, p);
        if (typeof base !== "object")
          die(errorOffset + 2, path.join("/"));
      }
      const type = getArchtype(base);
      const value = deepClonePatchValue(patch.value);
      const key = path[path.length - 1];
      switch (op) {
        case REPLACE:
          switch (type) {
            case 2 /* Map */:
              return base.set(key, value);
            case 3 /* Set */:
              die(errorOffset);
            default:
              return base[key] = value;
          }
        case ADD:
          switch (type) {
            case 1 /* Array */:
              return key === "-" ? base.push(value) : base.splice(key, 0, value);
            case 2 /* Map */:
              return base.set(key, value);
            case 3 /* Set */:
              return base.add(value);
            default:
              return base[key] = value;
          }
        case REMOVE:
          switch (type) {
            case 1 /* Array */:
              return base.splice(key, 1);
            case 2 /* Map */:
              return base.delete(key);
            case 3 /* Set */:
              return base.delete(patch.value);
            default:
              return delete base[key];
          }
        default:
          die(errorOffset + 1, op);
      }
    });
    return draft;
  }
  function deepClonePatchValue(obj) {
    if (!isDraftable(obj))
      return obj;
    if (Array.isArray(obj))
      return obj.map(deepClonePatchValue);
    if (isMap(obj))
      return new Map(
        Array.from(obj.entries()).map(([k, v]) => [k, deepClonePatchValue(v)])
      );
    if (isSet(obj))
      return new Set(Array.from(obj).map(deepClonePatchValue));
    const cloned = Object.create(getPrototypeOf(obj));
    for (const key in obj)
      cloned[key] = deepClonePatchValue(obj[key]);
    if (has(obj, DRAFTABLE))
      cloned[DRAFTABLE] = obj[DRAFTABLE];
    return cloned;
  }
  function clonePatchValueIfNeeded(obj) {
    if (isDraft(obj)) {
      return deepClonePatchValue(obj);
    } else
      return obj;
  }
  loadPlugin("Patches", {
    applyPatches_,
    generatePatches_,
    generateReplacementPatches_
  });
}

// src/plugins/mapset.ts
function enableMapSet() {
  class DraftMap extends Map {
    constructor(target, parent) {
      super();
      this[DRAFT_STATE] = {
        type_: 2 /* Map */,
        parent_: parent,
        scope_: parent ? parent.scope_ : getCurrentScope(),
        modified_: false,
        finalized_: false,
        copy_: void 0,
        assigned_: void 0,
        base_: target,
        draft_: this,
        isManual_: false,
        revoked_: false
      };
    }
    get size() {
      return latest(this[DRAFT_STATE]).size;
    }
    has(key) {
      return latest(this[DRAFT_STATE]).has(key);
    }
    set(key, value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!latest(state).has(key) || latest(state).get(key) !== value) {
        prepareMapCopy(state);
        markChanged(state);
        state.assigned_.set(key, true);
        state.copy_.set(key, value);
        state.assigned_.set(key, true);
      }
      return this;
    }
    delete(key) {
      if (!this.has(key)) {
        return false;
      }
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareMapCopy(state);
      markChanged(state);
      if (state.base_.has(key)) {
        state.assigned_.set(key, false);
      } else {
        state.assigned_.delete(key);
      }
      state.copy_.delete(key);
      return true;
    }
    clear() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (latest(state).size) {
        prepareMapCopy(state);
        markChanged(state);
        state.assigned_ = /* @__PURE__ */ new Map();
        each(state.base_, (key) => {
          state.assigned_.set(key, false);
        });
        state.copy_.clear();
      }
    }
    forEach(cb, thisArg) {
      const state = this[DRAFT_STATE];
      latest(state).forEach((_value, key, _map) => {
        cb.call(thisArg, this.get(key), key, this);
      });
    }
    get(key) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      const value = latest(state).get(key);
      if (state.finalized_ || !isDraftable(value)) {
        return value;
      }
      if (value !== state.base_.get(key)) {
        return value;
      }
      const draft = createProxy(value, state);
      prepareMapCopy(state);
      state.copy_.set(key, draft);
      return draft;
    }
    keys() {
      return latest(this[DRAFT_STATE]).keys();
    }
    values() {
      const iterator = this.keys();
      return {
        [Symbol.iterator]: () => this.values(),
        next: () => {
          const r = iterator.next();
          if (r.done)
            return r;
          const value = this.get(r.value);
          return {
            done: false,
            value
          };
        }
      };
    }
    entries() {
      const iterator = this.keys();
      return {
        [Symbol.iterator]: () => this.entries(),
        next: () => {
          const r = iterator.next();
          if (r.done)
            return r;
          const value = this.get(r.value);
          return {
            done: false,
            value: [r.value, value]
          };
        }
      };
    }
    [(DRAFT_STATE, Symbol.iterator)]() {
      return this.entries();
    }
  }
  function proxyMap_(target, parent) {
    return new DraftMap(target, parent);
  }
  function prepareMapCopy(state) {
    if (!state.copy_) {
      state.assigned_ = /* @__PURE__ */ new Map();
      state.copy_ = new Map(state.base_);
    }
  }
  class DraftSet extends Set {
    constructor(target, parent) {
      super();
      this[DRAFT_STATE] = {
        type_: 3 /* Set */,
        parent_: parent,
        scope_: parent ? parent.scope_ : getCurrentScope(),
        modified_: false,
        finalized_: false,
        copy_: void 0,
        base_: target,
        draft_: this,
        drafts_: /* @__PURE__ */ new Map(),
        revoked_: false,
        isManual_: false
      };
    }
    get size() {
      return latest(this[DRAFT_STATE]).size;
    }
    has(value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!state.copy_) {
        return state.base_.has(value);
      }
      if (state.copy_.has(value))
        return true;
      if (state.drafts_.has(value) && state.copy_.has(state.drafts_.get(value)))
        return true;
      return false;
    }
    add(value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!this.has(value)) {
        prepareSetCopy(state);
        markChanged(state);
        state.copy_.add(value);
      }
      return this;
    }
    delete(value) {
      if (!this.has(value)) {
        return false;
      }
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      markChanged(state);
      return state.copy_.delete(value) || (state.drafts_.has(value) ? state.copy_.delete(state.drafts_.get(value)) : (
        /* istanbul ignore next */
        false
      ));
    }
    clear() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (latest(state).size) {
        prepareSetCopy(state);
        markChanged(state);
        state.copy_.clear();
      }
    }
    values() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      return state.copy_.values();
    }
    entries() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      return state.copy_.entries();
    }
    keys() {
      return this.values();
    }
    [(DRAFT_STATE, Symbol.iterator)]() {
      return this.values();
    }
    forEach(cb, thisArg) {
      const iterator = this.values();
      let result = iterator.next();
      while (!result.done) {
        cb.call(thisArg, result.value, result.value, this);
        result = iterator.next();
      }
    }
  }
  function proxySet_(target, parent) {
    return new DraftSet(target, parent);
  }
  function prepareSetCopy(state) {
    if (!state.copy_) {
      state.copy_ = /* @__PURE__ */ new Set();
      state.base_.forEach((value) => {
        if (isDraftable(value)) {
          const draft = createProxy(value, state);
          state.drafts_.set(value, draft);
          state.copy_.add(draft);
        } else {
          state.copy_.add(value);
        }
      });
    }
  }
  function assertUnrevoked(state) {
    if (state.revoked_)
      die(3, JSON.stringify(latest(state)));
  }
  loadPlugin("MapSet", { proxyMap_, proxySet_ });
}

// src/immer.ts
var immer = new Immer2();
var produce = immer.produce;
var produceWithPatches = /* @__PURE__ */ immer.produceWithPatches.bind(
  immer
);
var setAutoFreeze = /* @__PURE__ */ immer.setAutoFreeze.bind(immer);
var setUseStrictShallowCopy = /* @__PURE__ */ immer.setUseStrictShallowCopy.bind(
  immer
);
var applyPatches = /* @__PURE__ */ immer.applyPatches.bind(immer);
var createDraft = /* @__PURE__ */ immer.createDraft.bind(immer);
var finishDraft = /* @__PURE__ */ immer.finishDraft.bind(immer);
function castDraft(value) {
  return value;
}
function castImmutable(value) {
  return value;
}

//# sourceMappingURL=immer.mjs.map

/***/ }),

/***/ "./node_modules/react-redux/dist/react-redux.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/react-redux/dist/react-redux.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Provider: () => (/* binding */ Provider_default),
/* harmony export */   ReactReduxContext: () => (/* binding */ ReactReduxContext),
/* harmony export */   batch: () => (/* binding */ batch),
/* harmony export */   connect: () => (/* binding */ connect_default),
/* harmony export */   createDispatchHook: () => (/* binding */ createDispatchHook),
/* harmony export */   createSelectorHook: () => (/* binding */ createSelectorHook),
/* harmony export */   createStoreHook: () => (/* binding */ createStoreHook),
/* harmony export */   shallowEqual: () => (/* binding */ shallowEqual),
/* harmony export */   useDispatch: () => (/* binding */ useDispatch),
/* harmony export */   useSelector: () => (/* binding */ useSelector),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var use_sync_external_store_with_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! use-sync-external-store/with-selector.js */ "./node_modules/use-sync-external-store/with-selector.js");
// src/utils/react.ts


// src/utils/react-is.ts
var IS_REACT_19 = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.version.startsWith("19");
var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for(
  IS_REACT_19 ? "react.transitional.element" : "react.element"
);
var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for(
  "react.suspense_list"
);
var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for("react.offscreen");
var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for(
  "react.client.reference"
);
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Memo = REACT_MEMO_TYPE;
function isValidElementType(type) {
  return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_OFFSCREEN_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE || type.getModuleId !== void 0) ? true : false;
}
function typeOf(object) {
  if (typeof object === "object" && object !== null) {
    const { $$typeof } = object;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        switch (object = object.type, object) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return object;
          default:
            switch (object = object && object.$$typeof, object) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
                return object;
              case REACT_CONSUMER_TYPE:
                return object;
              default:
                return $$typeof;
            }
        }
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }
}
function isContextConsumer(object) {
  return IS_REACT_19 ? typeOf(object) === REACT_CONSUMER_TYPE : typeOf(object) === REACT_CONTEXT_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}

// src/utils/warning.ts
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}

// src/connect/verifySubselectors.ts
function verify(selector, methodName) {
  if (!selector) {
    throw new Error(`Unexpected value for ${methodName} in connect.`);
  } else if (methodName === "mapStateToProps" || methodName === "mapDispatchToProps") {
    if (!Object.prototype.hasOwnProperty.call(selector, "dependsOnOwnProps")) {
      warning(
        `The selector for ${methodName} of connect did not specify a value for dependsOnOwnProps.`
      );
    }
  }
}
function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps) {
  verify(mapStateToProps, "mapStateToProps");
  verify(mapDispatchToProps, "mapDispatchToProps");
  verify(mergeProps, "mergeProps");
}

// src/connect/selectorFactory.ts
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, {
  areStatesEqual,
  areOwnPropsEqual,
  areStatePropsEqual
}) {
  let hasRunAtLeastOnce = false;
  let state;
  let ownProps;
  let stateProps;
  let dispatchProps;
  let mergedProps;
  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }
  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps)
      dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps)
      stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps)
      dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleNewState() {
    const nextStateProps = mapStateToProps(state, ownProps);
    const statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged)
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleSubsequentCalls(nextState, nextOwnProps) {
    const propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    const stateChanged = !areStatesEqual(
      nextState,
      state,
      nextOwnProps,
      ownProps
    );
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }
  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}
function finalPropsSelectorFactory(dispatch, {
  initMapStateToProps,
  initMapDispatchToProps,
  initMergeProps,
  ...options
}) {
  const mapStateToProps = initMapStateToProps(dispatch, options);
  const mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  const mergeProps = initMergeProps(dispatch, options);
  if (true) {
    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps);
  }
  return pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

// src/utils/bindActionCreators.ts
function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = (...args) => dispatch(actionCreator(...args));
    }
  }
  return boundActionCreators;
}

// src/utils/isPlainObject.ts
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) return false;
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;
  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  return proto === baseProto;
}

// src/utils/verifyPlainObject.ts
function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject(value)) {
    warning(
      `${methodName}() in ${displayName} must return a plain object. Instead received ${value}.`
    );
  }
}

// src/connect/wrapMapToProps.ts
function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch) {
    const constant = getConstant(dispatch);
    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, { displayName }) {
    const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch, void 0);
    };
    proxy.dependsOnOwnProps = true;
    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      let props = proxy(stateOrDispatch, ownProps);
      if (typeof props === "function") {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }
      if (true)
        verifyPlainObject(props, displayName, methodName);
      return props;
    };
    return proxy;
  };
}

// src/connect/invalidArgFactory.ts
function createInvalidArgFactory(arg, name) {
  return (dispatch, options) => {
    throw new Error(
      `Invalid value of type ${typeof arg} for ${name} argument when connecting component ${options.wrappedComponentName}.`
    );
  };
}

// src/connect/mapDispatchToProps.ts
function mapDispatchToPropsFactory(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === "object" ? wrapMapToPropsConstant(
    (dispatch) => (
      // @ts-ignore
      bindActionCreators(mapDispatchToProps, dispatch)
    )
  ) : !mapDispatchToProps ? wrapMapToPropsConstant((dispatch) => ({
    dispatch
  })) : typeof mapDispatchToProps === "function" ? (
    // @ts-ignore
    wrapMapToPropsFunc(mapDispatchToProps, "mapDispatchToProps")
  ) : createInvalidArgFactory(mapDispatchToProps, "mapDispatchToProps");
}

// src/connect/mapStateToProps.ts
function mapStateToPropsFactory(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(() => ({})) : typeof mapStateToProps === "function" ? (
    // @ts-ignore
    wrapMapToPropsFunc(mapStateToProps, "mapStateToProps")
  ) : createInvalidArgFactory(mapStateToProps, "mapStateToProps");
}

// src/connect/mergeProps.ts
function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return { ...ownProps, ...stateProps, ...dispatchProps };
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, { displayName, areMergedPropsEqual }) {
    let hasRunOnce = false;
    let mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      const nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      if (hasRunOnce) {
        if (!areMergedPropsEqual(nextMergedProps, mergedProps))
          mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (true)
          verifyPlainObject(mergedProps, displayName, "mergeProps");
      }
      return mergedProps;
    };
  };
}
function mergePropsFactory(mergeProps) {
  return !mergeProps ? () => defaultMergeProps : typeof mergeProps === "function" ? wrapMergePropsFunc(mergeProps) : createInvalidArgFactory(mergeProps, "mergeProps");
}

// src/utils/batch.ts
function defaultNoopBatch(callback) {
  callback();
}

// src/utils/Subscription.ts
function createListenerCollection() {
  let first = null;
  let last = null;
  return {
    clear() {
      first = null;
      last = null;
    },
    notify() {
      defaultNoopBatch(() => {
        let listener = first;
        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get() {
      const listeners = [];
      let listener = first;
      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }
      return listeners;
    },
    subscribe(callback) {
      let isSubscribed = true;
      const listener = last = {
        callback,
        next: null,
        prev: last
      };
      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }
      return function unsubscribe() {
        if (!isSubscribed || first === null) return;
        isSubscribed = false;
        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }
        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }
  };
}
var nullListeners = {
  notify() {
  },
  get: () => []
};
function createSubscription(store, parentSub) {
  let unsubscribe;
  let listeners = nullListeners;
  let subscriptionsAmount = 0;
  let selfSubscribed = false;
  function addNestedSub(listener) {
    trySubscribe();
    const cleanupListener = listeners.subscribe(listener);
    let removed = false;
    return () => {
      if (!removed) {
        removed = true;
        cleanupListener();
        tryUnsubscribe();
      }
    };
  }
  function notifyNestedSubs() {
    listeners.notify();
  }
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }
  function isSubscribed() {
    return selfSubscribed;
  }
  function trySubscribe() {
    subscriptionsAmount++;
    if (!unsubscribe) {
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    subscriptionsAmount--;
    if (unsubscribe && subscriptionsAmount === 0) {
      unsubscribe();
      unsubscribe = void 0;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  function trySubscribeSelf() {
    if (!selfSubscribed) {
      selfSubscribed = true;
      trySubscribe();
    }
  }
  function tryUnsubscribeSelf() {
    if (selfSubscribed) {
      selfSubscribed = false;
      tryUnsubscribe();
    }
  }
  const subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe: trySubscribeSelf,
    tryUnsubscribe: tryUnsubscribeSelf,
    getListeners: () => listeners
  };
  return subscription;
}

// src/utils/useIsomorphicLayoutEffect.ts
var canUseDOM = () => !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var isDOM = /* @__PURE__ */ canUseDOM();
var isRunningInReactNative = () => typeof navigator !== "undefined" && navigator.product === "ReactNative";
var isReactNative = /* @__PURE__ */ isRunningInReactNative();
var getUseIsomorphicLayoutEffect = () => isDOM || isReactNative ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
var useIsomorphicLayoutEffect = /* @__PURE__ */ getUseIsomorphicLayoutEffect();

// src/utils/shallowEqual.ts
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

// src/utils/hoistStatics.ts
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  $$typeof: true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  $$typeof: true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {
  [ForwardRef]: FORWARD_REF_STATICS,
  [Memo]: MEMO_STATICS
};
function getStatics(component) {
  if (isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      const inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent);
      }
    }
    let keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    const targetStatics = getStatics(targetComponent);
    const sourceStatics = getStatics(sourceComponent);
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      if (!KNOWN_STATICS[key] && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        const descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {
        }
      }
    }
  }
  return targetComponent;
}

// src/components/Context.ts
var ContextKey = /* @__PURE__ */ Symbol.for(`react-redux-context`);
var gT = typeof globalThis !== "undefined" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function getContext() {
  if (!react__WEBPACK_IMPORTED_MODULE_0__.createContext) return {};
  const contextMap = gT[ContextKey] ??= /* @__PURE__ */ new Map();
  let realContext = contextMap.get(react__WEBPACK_IMPORTED_MODULE_0__.createContext);
  if (!realContext) {
    realContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
      null
    );
    if (true) {
      realContext.displayName = "ReactRedux";
    }
    contextMap.set(react__WEBPACK_IMPORTED_MODULE_0__.createContext, realContext);
  }
  return realContext;
}
var ReactReduxContext = /* @__PURE__ */ getContext();

// src/components/connect.tsx
var NO_SUBSCRIPTION_ARRAY = [null, null];
var stringifyComponent = (Comp) => {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};
function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
  useIsomorphicLayoutEffect(() => effectFunc(...effectArgs), dependencies);
}
function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, childPropsFromStoreUpdate, notifyNestedSubs) {
  lastWrapperProps.current = wrapperProps;
  renderIsScheduled.current = false;
  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null;
    notifyNestedSubs();
  }
}
function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, additionalSubscribeListener) {
  if (!shouldHandleStateChanges) return () => {
  };
  let didUnsubscribe = false;
  let lastThrownError = null;
  const checkForUpdates = () => {
    if (didUnsubscribe || !isMounted.current) {
      return;
    }
    const latestStoreState = store.getState();
    let newChildProps, error;
    try {
      newChildProps = childPropsSelector(
        latestStoreState,
        lastWrapperProps.current
      );
    } catch (e) {
      error = e;
      lastThrownError = e;
    }
    if (!error) {
      lastThrownError = null;
    }
    if (newChildProps === lastChildProps.current) {
      if (!renderIsScheduled.current) {
        notifyNestedSubs();
      }
    } else {
      lastChildProps.current = newChildProps;
      childPropsFromStoreUpdate.current = newChildProps;
      renderIsScheduled.current = true;
      additionalSubscribeListener();
    }
  };
  subscription.onStateChange = checkForUpdates;
  subscription.trySubscribe();
  checkForUpdates();
  const unsubscribeWrapper = () => {
    didUnsubscribe = true;
    subscription.tryUnsubscribe();
    subscription.onStateChange = null;
    if (lastThrownError) {
      throw lastThrownError;
    }
  };
  return unsubscribeWrapper;
}
function strictEqual(a, b) {
  return a === b;
}
var hasWarnedAboutDeprecatedPureOption = false;
function connect(mapStateToProps, mapDispatchToProps, mergeProps, {
  // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
  // @ts-ignore
  pure,
  areStatesEqual = strictEqual,
  areOwnPropsEqual = shallowEqual,
  areStatePropsEqual = shallowEqual,
  areMergedPropsEqual = shallowEqual,
  // use React's forwardRef to expose a ref of the wrapped component
  forwardRef = false,
  // the context consumer to use
  context = ReactReduxContext
} = {}) {
  if (true) {
    if (pure !== void 0 && !hasWarnedAboutDeprecatedPureOption) {
      hasWarnedAboutDeprecatedPureOption = true;
      warning(
        'The `pure` option has been removed. `connect` is now always a "pure/memoized" component'
      );
    }
  }
  const Context = context;
  const initMapStateToProps = mapStateToPropsFactory(mapStateToProps);
  const initMapDispatchToProps = mapDispatchToPropsFactory(mapDispatchToProps);
  const initMergeProps = mergePropsFactory(mergeProps);
  const shouldHandleStateChanges = Boolean(mapStateToProps);
  const wrapWithConnect = (WrappedComponent) => {
    if (true) {
      const isValid = /* @__PURE__ */ isValidElementType(WrappedComponent);
      if (!isValid)
        throw new Error(
          `You must pass a component to the function returned by connect. Instead received ${stringifyComponent(
            WrappedComponent
          )}`
        );
    }
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
    const displayName = `Connect(${wrappedComponentName})`;
    const selectorFactoryOptions = {
      shouldHandleStateChanges,
      displayName,
      wrappedComponentName,
      WrappedComponent,
      // @ts-ignore
      initMapStateToProps,
      initMapDispatchToProps,
      initMergeProps,
      areStatesEqual,
      areStatePropsEqual,
      areOwnPropsEqual,
      areMergedPropsEqual
    };
    function ConnectFunction(props) {
      const [propsContext, reactReduxForwardedRef, wrapperProps] = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        const { reactReduxForwardedRef: reactReduxForwardedRef2, ...wrapperProps2 } = props;
        return [props.context, reactReduxForwardedRef2, wrapperProps2];
      }, [props]);
      const ContextToUse = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        let ResultContext = Context;
        if (propsContext?.Consumer) {
          if (true) {
            const isValid = /* @__PURE__ */ isContextConsumer(
              // @ts-ignore
              /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(propsContext.Consumer, null)
            );
            if (!isValid) {
              throw new Error(
                "You must pass a valid React context consumer as `props.context`"
              );
            }
            ResultContext = propsContext;
          }
        }
        return ResultContext;
      }, [propsContext, Context]);
      const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ContextToUse);
      const didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
      const didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
      if ( true && !didStoreComeFromProps && !didStoreComeFromContext) {
        throw new Error(
          `Could not find "store" in the context of "${displayName}". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to ${displayName} in connect options.`
        );
      }
      const store = didStoreComeFromProps ? props.store : contextValue.store;
      const getServerState = didStoreComeFromContext ? contextValue.getServerState : store.getState;
      const childPropsSelector = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        return finalPropsSelectorFactory(store.dispatch, selectorFactoryOptions);
      }, [store]);
      const [subscription, notifyNestedSubs] = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY;
        const subscription2 = createSubscription(
          store,
          didStoreComeFromProps ? void 0 : contextValue.subscription
        );
        const notifyNestedSubs2 = subscription2.notifyNestedSubs.bind(subscription2);
        return [subscription2, notifyNestedSubs2];
      }, [store, didStoreComeFromProps, contextValue]);
      const overriddenContextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        if (didStoreComeFromProps) {
          return contextValue;
        }
        return {
          ...contextValue,
          subscription
        };
      }, [didStoreComeFromProps, contextValue, subscription]);
      const lastChildProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0);
      const lastWrapperProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(wrapperProps);
      const childPropsFromStoreUpdate = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0);
      const renderIsScheduled = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
      const isMounted = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
      const latestSubscriptionCallbackError = react__WEBPACK_IMPORTED_MODULE_0__.useRef(
        void 0
      );
      useIsomorphicLayoutEffect(() => {
        isMounted.current = true;
        return () => {
          isMounted.current = false;
        };
      }, []);
      const actualChildPropsSelector = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        const selector = () => {
          if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
            return childPropsFromStoreUpdate.current;
          }
          return childPropsSelector(store.getState(), wrapperProps);
        };
        return selector;
      }, [store, wrapperProps]);
      const subscribeForReact = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        const subscribe = (reactListener) => {
          if (!subscription) {
            return () => {
            };
          }
          return subscribeUpdates(
            shouldHandleStateChanges,
            store,
            subscription,
            // @ts-ignore
            childPropsSelector,
            lastWrapperProps,
            lastChildProps,
            renderIsScheduled,
            isMounted,
            childPropsFromStoreUpdate,
            notifyNestedSubs,
            reactListener
          );
        };
        return subscribe;
      }, [subscription]);
      useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [
        lastWrapperProps,
        lastChildProps,
        renderIsScheduled,
        wrapperProps,
        childPropsFromStoreUpdate,
        notifyNestedSubs
      ]);
      let actualChildProps;
      try {
        actualChildProps = react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore(
          // TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
          subscribeForReact,
          // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
          // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
          actualChildPropsSelector,
          getServerState ? () => childPropsSelector(getServerState(), wrapperProps) : actualChildPropsSelector
        );
      } catch (err) {
        if (latestSubscriptionCallbackError.current) {
          ;
          err.message += `
The error may be correlated with this previous error:
${latestSubscriptionCallbackError.current.stack}

`;
        }
        throw err;
      }
      useIsomorphicLayoutEffect(() => {
        latestSubscriptionCallbackError.current = void 0;
        childPropsFromStoreUpdate.current = void 0;
        lastChildProps.current = actualChildProps;
      });
      const renderedWrappedComponent = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        return (
          // @ts-ignore
          /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            WrappedComponent,
            {
              ...actualChildProps,
              ref: reactReduxForwardedRef
            }
          )
        );
      }, [reactReduxForwardedRef, WrappedComponent, actualChildProps]);
      const renderedChild = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        if (shouldHandleStateChanges) {
          return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ContextToUse.Provider, { value: overriddenContextValue }, renderedWrappedComponent);
        }
        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
      return renderedChild;
    }
    const _Connect = react__WEBPACK_IMPORTED_MODULE_0__.memo(ConnectFunction);
    const Connect = _Connect;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;
    if (forwardRef) {
      const _forwarded = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
        function forwardConnectRef(props, ref) {
          return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Connect, { ...props, reactReduxForwardedRef: ref });
        }
      );
      const forwarded = _forwarded;
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return /* @__PURE__ */ hoistNonReactStatics(forwarded, WrappedComponent);
    }
    return /* @__PURE__ */ hoistNonReactStatics(Connect, WrappedComponent);
  };
  return wrapWithConnect;
}
var connect_default = connect;

// src/components/Provider.tsx
function Provider(providerProps) {
  const { children, context, serverState, store } = providerProps;
  const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const subscription = createSubscription(store);
    const baseContextValue = {
      store,
      subscription,
      getServerState: serverState ? () => serverState : void 0
    };
    if (false) // removed by dead control flow
{} else {
      const { identityFunctionCheck = "once", stabilityCheck = "once" } = providerProps;
      return /* @__PURE__ */ Object.assign(baseContextValue, {
        stabilityCheck,
        identityFunctionCheck
      });
    }
  }, [store, serverState]);
  const previousState = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => store.getState(), [store]);
  useIsomorphicLayoutEffect(() => {
    const { subscription } = contextValue;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();
    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }
    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = void 0;
    };
  }, [contextValue, previousState]);
  const Context = context || ReactReduxContext;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Context.Provider, { value: contextValue }, children);
}
var Provider_default = Provider;

// src/hooks/useReduxContext.ts
function createReduxContextHook(context = ReactReduxContext) {
  return function useReduxContext2() {
    const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useContext(context);
    if ( true && !contextValue) {
      throw new Error(
        "could not find react-redux context value; please ensure the component is wrapped in a <Provider>"
      );
    }
    return contextValue;
  };
}
var useReduxContext = /* @__PURE__ */ createReduxContextHook();

// src/hooks/useStore.ts
function createStoreHook(context = ReactReduxContext) {
  const useReduxContext2 = context === ReactReduxContext ? useReduxContext : (
    // @ts-ignore
    createReduxContextHook(context)
  );
  const useStore2 = () => {
    const { store } = useReduxContext2();
    return store;
  };
  Object.assign(useStore2, {
    withTypes: () => useStore2
  });
  return useStore2;
}
var useStore = /* @__PURE__ */ createStoreHook();

// src/hooks/useDispatch.ts
function createDispatchHook(context = ReactReduxContext) {
  const useStore2 = context === ReactReduxContext ? useStore : createStoreHook(context);
  const useDispatch2 = () => {
    const store = useStore2();
    return store.dispatch;
  };
  Object.assign(useDispatch2, {
    withTypes: () => useDispatch2
  });
  return useDispatch2;
}
var useDispatch = /* @__PURE__ */ createDispatchHook();

// src/hooks/useSelector.ts

var refEquality = (a, b) => a === b;
function createSelectorHook(context = ReactReduxContext) {
  const useReduxContext2 = context === ReactReduxContext ? useReduxContext : createReduxContextHook(context);
  const useSelector2 = (selector, equalityFnOrOptions = {}) => {
    const { equalityFn = refEquality } = typeof equalityFnOrOptions === "function" ? { equalityFn: equalityFnOrOptions } : equalityFnOrOptions;
    if (true) {
      if (!selector) {
        throw new Error(`You must pass a selector to useSelector`);
      }
      if (typeof selector !== "function") {
        throw new Error(`You must pass a function as a selector to useSelector`);
      }
      if (typeof equalityFn !== "function") {
        throw new Error(
          `You must pass a function as an equality function to useSelector`
        );
      }
    }
    const reduxContext = useReduxContext2();
    const { store, subscription, getServerState } = reduxContext;
    const firstRun = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    const wrappedSelector = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
      {
        [selector.name](state) {
          const selected = selector(state);
          if (true) {
            const { devModeChecks = {} } = typeof equalityFnOrOptions === "function" ? {} : equalityFnOrOptions;
            const { identityFunctionCheck, stabilityCheck } = reduxContext;
            const {
              identityFunctionCheck: finalIdentityFunctionCheck,
              stabilityCheck: finalStabilityCheck
            } = {
              stabilityCheck,
              identityFunctionCheck,
              ...devModeChecks
            };
            if (finalStabilityCheck === "always" || finalStabilityCheck === "once" && firstRun.current) {
              const toCompare = selector(state);
              if (!equalityFn(selected, toCompare)) {
                let stack = void 0;
                try {
                  throw new Error();
                } catch (e) {
                  ;
                  ({ stack } = e);
                }
                console.warn(
                  "Selector " + (selector.name || "unknown") + " returned a different result when called with the same parameters. This can lead to unnecessary rerenders.\nSelectors that return a new reference (such as an object or an array) should be memoized: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization",
                  {
                    state,
                    selected,
                    selected2: toCompare,
                    stack
                  }
                );
              }
            }
            if (finalIdentityFunctionCheck === "always" || finalIdentityFunctionCheck === "once" && firstRun.current) {
              if (selected === state) {
                let stack = void 0;
                try {
                  throw new Error();
                } catch (e) {
                  ;
                  ({ stack } = e);
                }
                console.warn(
                  "Selector " + (selector.name || "unknown") + " returned the root state when called. This can lead to unnecessary rerenders.\nSelectors that return the entire state are almost certainly a mistake, as they will cause a rerender whenever *anything* in state changes.",
                  { stack }
                );
              }
            }
            if (firstRun.current) firstRun.current = false;
          }
          return selected;
        }
      }[selector.name],
      [selector]
    );
    const selectedState = (0,use_sync_external_store_with_selector_js__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStoreWithSelector)(
      subscription.addNestedSub,
      store.getState,
      getServerState || store.getState,
      wrappedSelector,
      equalityFn
    );
    react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(selectedState);
    return selectedState;
  };
  Object.assign(useSelector2, {
    withTypes: () => useSelector2
  });
  return useSelector2;
}
var useSelector = /* @__PURE__ */ createSelectorHook();

// src/exports.ts
var batch = defaultNoopBatch;

//# sourceMappingURL=react-redux.mjs.map

/***/ }),

/***/ "./node_modules/redux-thunk/dist/redux-thunk.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/redux-thunk/dist/redux-thunk.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   thunk: () => (/* binding */ thunk),
/* harmony export */   withExtraArgument: () => (/* binding */ withExtraArgument)
/* harmony export */ });
// src/index.ts
function createThunkMiddleware(extraArgument) {
  const middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
  return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;



/***/ }),

/***/ "./node_modules/redux/dist/redux.mjs":
/*!*******************************************!*\
  !*** ./node_modules/redux/dist/redux.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __DO_NOT_USE__ActionTypes: () => (/* binding */ actionTypes_default),
/* harmony export */   applyMiddleware: () => (/* binding */ applyMiddleware),
/* harmony export */   bindActionCreators: () => (/* binding */ bindActionCreators),
/* harmony export */   combineReducers: () => (/* binding */ combineReducers),
/* harmony export */   compose: () => (/* binding */ compose),
/* harmony export */   createStore: () => (/* binding */ createStore),
/* harmony export */   isAction: () => (/* binding */ isAction),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   legacy_createStore: () => (/* binding */ legacy_createStore)
/* harmony export */ });
// src/utils/formatProdErrorMessage.ts
function formatProdErrorMessage(code) {
  return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}

// src/utils/symbol-observable.ts
var $$observable = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var symbol_observable_default = $$observable;

// src/utils/actionTypes.ts
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var ActionTypes = {
  INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
var actionTypes_default = ActionTypes;

// src/utils/isPlainObject.ts
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}

// src/utils/kindOf.ts
function miniKindOf(val) {
  if (val === void 0)
    return "undefined";
  if (val === null)
    return "null";
  const type = typeof val;
  switch (type) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function": {
      return type;
    }
  }
  if (Array.isArray(val))
    return "array";
  if (isDate(val))
    return "date";
  if (isError(val))
    return "error";
  const constructorName = ctorName(val);
  switch (constructorName) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return constructorName;
  }
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function ctorName(val) {
  return typeof val.constructor === "function" ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
}
function isDate(val) {
  if (val instanceof Date)
    return true;
  return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
}
function kindOf(val) {
  let typeOfVal = typeof val;
  if (true) {
    typeOfVal = miniKindOf(val);
  }
  return typeOfVal;
}

// src/createStore.ts
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error( false ? 0 : `Expected the root reducer to be a function. Instead, received: '${kindOf(reducer)}'`);
  }
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error( false ? 0 : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error( false ? 0 : `Expected the enhancer to be a function. Instead, received: '${kindOf(enhancer)}'`);
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = /* @__PURE__ */ new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = /* @__PURE__ */ new Map();
      currentListeners.forEach((listener, key) => {
        nextListeners.set(key, listener);
      });
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error( false ? 0 : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error( false ? 0 : `Expected the listener to be a function. Instead, received: '${kindOf(listener)}'`);
    }
    if (isDispatching) {
      throw new Error( false ? 0 : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error( false ? 0 : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error( false ? 0 : `Actions must be plain objects. Instead, the actual type was: '${kindOf(action)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    }
    if (typeof action.type === "undefined") {
      throw new Error( false ? 0 : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }
    if (typeof action.type !== "string") {
      throw new Error( false ? 0 : `Action "type" property must be a string. Instead, the actual type was: '${kindOf(action.type)}'. Value was: '${action.type}' (stringified)`);
    }
    if (isDispatching) {
      throw new Error( false ? 0 : "Reducers may not dispatch actions.");
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = currentListeners = nextListeners;
    listeners.forEach((listener) => {
      listener();
    });
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error( false ? 0 : `Expected the nextReducer to be a function. Instead, received: '${kindOf(nextReducer)}`);
    }
    currentReducer = nextReducer;
    dispatch({
      type: actionTypes_default.REPLACE
    });
  }
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error( false ? 0 : `Expected the observer to be an object. Instead, received: '${kindOf(observer)}'`);
        }
        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      },
      [symbol_observable_default]() {
        return this;
      }
    };
  }
  dispatch({
    type: actionTypes_default.INIT
  });
  const store = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [symbol_observable_default]: observable
  };
  return store;
}
function legacy_createStore(reducer, preloadedState, enhancer) {
  return createStore(reducer, preloadedState, enhancer);
}

// src/utils/warning.ts
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}

// src/combineReducers.ts
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  const reducerKeys = Object.keys(reducers);
  const argumentName = action && action.type === actionTypes_default.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (reducerKeys.length === 0) {
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  }
  if (!isPlainObject(inputState)) {
    return `The ${argumentName} has unexpected type of "${kindOf(inputState)}". Expected argument to be an object with the following keys: "${reducerKeys.join('", "')}"`;
  }
  const unexpectedKeys = Object.keys(inputState).filter((key) => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]);
  unexpectedKeys.forEach((key) => {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === actionTypes_default.REPLACE)
    return;
  if (unexpectedKeys.length > 0) {
    return `Unexpected ${unexpectedKeys.length > 1 ? "keys" : "key"} "${unexpectedKeys.join('", "')}" found in ${argumentName}. Expected to find one of the known reducer keys instead: "${reducerKeys.join('", "')}". Unexpected keys will be ignored.`;
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(void 0, {
      type: actionTypes_default.INIT
    });
    if (typeof initialState === "undefined") {
      throw new Error( false ? 0 : `The slice reducer for key "${key}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    }
    if (typeof reducer(void 0, {
      type: actionTypes_default.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error( false ? 0 : `The slice reducer for key "${key}" returned undefined when probed with a random type. Don't try to handle '${actionTypes_default.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
    }
  });
}
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (true) {
      if (typeof reducers[key] === "undefined") {
        warning(`No reducer provided for key "${key}"`);
      }
    }
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  let unexpectedKeyCache;
  if (true) {
    unexpectedKeyCache = {};
  }
  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if (true) {
      const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        const actionType = action && action.type;
        throw new Error( false ? 0 : `When called with an action of type ${actionType ? `"${String(actionType)}"` : "(unknown type)"}, the slice reducer for key "${key}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

// src/bindActionCreators.ts
function bindActionCreator(actionCreator, dispatch) {
  return function(...args) {
    return dispatch(actionCreator.apply(this, args));
  };
}
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error( false ? 0 : `bindActionCreators expected an object or a function, but instead received: '${kindOf(actionCreators)}'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`);
  }
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

// src/compose.ts
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// src/applyMiddleware.ts
function applyMiddleware(...middlewares) {
  return (createStore2) => (reducer, preloadedState) => {
    const store = createStore2(reducer, preloadedState);
    let dispatch = () => {
      throw new Error( false ? 0 : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}

// src/utils/isAction.ts
function isAction(action) {
  return isPlainObject(action) && "type" in action && typeof action.type === "string";
}

//# sourceMappingURL=redux.mjs.map

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

/***/ "./node_modules/reselect/dist/reselect.mjs":
/*!*************************************************!*\
  !*** ./node_modules/reselect/dist/reselect.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSelector: () => (/* binding */ createSelector),
/* harmony export */   createSelectorCreator: () => (/* binding */ createSelectorCreator),
/* harmony export */   createStructuredSelector: () => (/* binding */ createStructuredSelector),
/* harmony export */   lruMemoize: () => (/* binding */ lruMemoize),
/* harmony export */   referenceEqualityCheck: () => (/* binding */ referenceEqualityCheck),
/* harmony export */   setGlobalDevModeChecks: () => (/* binding */ setGlobalDevModeChecks),
/* harmony export */   unstable_autotrackMemoize: () => (/* binding */ autotrackMemoize),
/* harmony export */   weakMapMemoize: () => (/* binding */ weakMapMemoize)
/* harmony export */ });
// src/devModeChecks/identityFunctionCheck.ts
var runIdentityFunctionCheck = (resultFunc, inputSelectorsResults, outputSelectorResult) => {
  if (inputSelectorsResults.length === 1 && inputSelectorsResults[0] === outputSelectorResult) {
    let isInputSameAsOutput = false;
    try {
      const emptyObject = {};
      if (resultFunc(emptyObject) === emptyObject)
        isInputSameAsOutput = true;
    } catch {
    }
    if (isInputSameAsOutput) {
      let stack = void 0;
      try {
        throw new Error();
      } catch (e) {
        ;
        ({ stack } = e);
      }
      console.warn(
        "The result function returned its own inputs without modification. e.g\n`createSelector([state => state.todos], todos => todos)`\nThis could lead to inefficient memoization and unnecessary re-renders.\nEnsure transformation logic is in the result function, and extraction logic is in the input selectors.",
        { stack }
      );
    }
  }
};

// src/devModeChecks/inputStabilityCheck.ts
var runInputStabilityCheck = (inputSelectorResultsObject, options, inputSelectorArgs) => {
  const { memoize, memoizeOptions } = options;
  const { inputSelectorResults, inputSelectorResultsCopy } = inputSelectorResultsObject;
  const createAnEmptyObject = memoize(() => ({}), ...memoizeOptions);
  const areInputSelectorResultsEqual = createAnEmptyObject.apply(null, inputSelectorResults) === createAnEmptyObject.apply(null, inputSelectorResultsCopy);
  if (!areInputSelectorResultsEqual) {
    let stack = void 0;
    try {
      throw new Error();
    } catch (e) {
      ;
      ({ stack } = e);
    }
    console.warn(
      "An input selector returned a different result when passed same arguments.\nThis means your output selector will likely run more frequently than intended.\nAvoid returning a new reference inside your input selector, e.g.\n`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)`",
      {
        arguments: inputSelectorArgs,
        firstInputs: inputSelectorResults,
        secondInputs: inputSelectorResultsCopy,
        stack
      }
    );
  }
};

// src/devModeChecks/setGlobalDevModeChecks.ts
var globalDevModeChecks = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
var setGlobalDevModeChecks = (devModeChecks) => {
  Object.assign(globalDevModeChecks, devModeChecks);
};

// src/utils.ts
var NOT_FOUND = /* @__PURE__ */ Symbol("NOT_FOUND");
function assertIsFunction(func, errorMessage = `expected a function, instead received ${typeof func}`) {
  if (typeof func !== "function") {
    throw new TypeError(errorMessage);
  }
}
function assertIsObject(object, errorMessage = `expected an object, instead received ${typeof object}`) {
  if (typeof object !== "object") {
    throw new TypeError(errorMessage);
  }
}
function assertIsArrayOfFunctions(array, errorMessage = `expected all items to be functions, instead received the following types: `) {
  if (!array.every((item) => typeof item === "function")) {
    const itemTypes = array.map(
      (item) => typeof item === "function" ? `function ${item.name || "unnamed"}()` : typeof item
    ).join(", ");
    throw new TypeError(`${errorMessage}[${itemTypes}]`);
  }
}
var ensureIsArray = (item) => {
  return Array.isArray(item) ? item : [item];
};
function getDependencies(createSelectorArgs) {
  const dependencies = Array.isArray(createSelectorArgs[0]) ? createSelectorArgs[0] : createSelectorArgs;
  assertIsArrayOfFunctions(
    dependencies,
    `createSelector expects all input-selectors to be functions, but received the following types: `
  );
  return dependencies;
}
function collectInputSelectorResults(dependencies, inputSelectorArgs) {
  const inputSelectorResults = [];
  const { length } = dependencies;
  for (let i = 0; i < length; i++) {
    inputSelectorResults.push(dependencies[i].apply(null, inputSelectorArgs));
  }
  return inputSelectorResults;
}
var getDevModeChecksExecutionInfo = (firstRun, devModeChecks) => {
  const { identityFunctionCheck, inputStabilityCheck } = {
    ...globalDevModeChecks,
    ...devModeChecks
  };
  return {
    identityFunctionCheck: {
      shouldRun: identityFunctionCheck === "always" || identityFunctionCheck === "once" && firstRun,
      run: runIdentityFunctionCheck
    },
    inputStabilityCheck: {
      shouldRun: inputStabilityCheck === "always" || inputStabilityCheck === "once" && firstRun,
      run: runInputStabilityCheck
    }
  };
};

// src/autotrackMemoize/autotracking.ts
var $REVISION = 0;
var CURRENT_TRACKER = null;
var Cell = class {
  revision = $REVISION;
  _value;
  _lastValue;
  _isEqual = tripleEq;
  constructor(initialValue, isEqual = tripleEq) {
    this._value = this._lastValue = initialValue;
    this._isEqual = isEqual;
  }
  // Whenever a storage value is read, it'll add itself to the current tracker if
  // one exists, entangling its state with that cache.
  get value() {
    CURRENT_TRACKER?.add(this);
    return this._value;
  }
  // Whenever a storage value is updated, we bump the global revision clock,
  // assign the revision for this storage to the new value, _and_ we schedule a
  // rerender. This is important, and it's what makes autotracking  _pull_
  // based. We don't actively tell the caches which depend on the storage that
  // anything has happened. Instead, we recompute the caches when needed.
  set value(newValue) {
    if (this.value === newValue)
      return;
    this._value = newValue;
    this.revision = ++$REVISION;
  }
};
function tripleEq(a, b) {
  return a === b;
}
var TrackingCache = class {
  _cachedValue;
  _cachedRevision = -1;
  _deps = [];
  hits = 0;
  fn;
  constructor(fn) {
    this.fn = fn;
  }
  clear() {
    this._cachedValue = void 0;
    this._cachedRevision = -1;
    this._deps = [];
    this.hits = 0;
  }
  get value() {
    if (this.revision > this._cachedRevision) {
      const { fn } = this;
      const currentTracker = /* @__PURE__ */ new Set();
      const prevTracker = CURRENT_TRACKER;
      CURRENT_TRACKER = currentTracker;
      this._cachedValue = fn();
      CURRENT_TRACKER = prevTracker;
      this.hits++;
      this._deps = Array.from(currentTracker);
      this._cachedRevision = this.revision;
    }
    CURRENT_TRACKER?.add(this);
    return this._cachedValue;
  }
  get revision() {
    return Math.max(...this._deps.map((d) => d.revision), 0);
  }
};
function getValue(cell) {
  if (!(cell instanceof Cell)) {
    console.warn("Not a valid cell! ", cell);
  }
  return cell.value;
}
function setValue(storage, value) {
  if (!(storage instanceof Cell)) {
    throw new TypeError(
      "setValue must be passed a tracked store created with `createStorage`."
    );
  }
  storage.value = storage._lastValue = value;
}
function createCell(initialValue, isEqual = tripleEq) {
  return new Cell(initialValue, isEqual);
}
function createCache(fn) {
  assertIsFunction(
    fn,
    "the first parameter to `createCache` must be a function"
  );
  return new TrackingCache(fn);
}

// src/autotrackMemoize/tracking.ts
var neverEq = (a, b) => false;
function createTag() {
  return createCell(null, neverEq);
}
function dirtyTag(tag, value) {
  setValue(tag, value);
}
var consumeCollection = (node) => {
  let tag = node.collectionTag;
  if (tag === null) {
    tag = node.collectionTag = createTag();
  }
  getValue(tag);
};
var dirtyCollection = (node) => {
  const tag = node.collectionTag;
  if (tag !== null) {
    dirtyTag(tag, null);
  }
};

// src/autotrackMemoize/proxy.ts
var REDUX_PROXY_LABEL = Symbol();
var nextId = 0;
var proto = Object.getPrototypeOf({});
var ObjectTreeNode = class {
  constructor(value) {
    this.value = value;
    this.value = value;
    this.tag.value = value;
  }
  proxy = new Proxy(this, objectProxyHandler);
  tag = createTag();
  tags = {};
  children = {};
  collectionTag = null;
  id = nextId++;
};
var objectProxyHandler = {
  get(node, key) {
    function calculateResult() {
      const { value } = node;
      const childValue = Reflect.get(value, key);
      if (typeof key === "symbol") {
        return childValue;
      }
      if (key in proto) {
        return childValue;
      }
      if (typeof childValue === "object" && childValue !== null) {
        let childNode = node.children[key];
        if (childNode === void 0) {
          childNode = node.children[key] = createNode(childValue);
        }
        if (childNode.tag) {
          getValue(childNode.tag);
        }
        return childNode.proxy;
      } else {
        let tag = node.tags[key];
        if (tag === void 0) {
          tag = node.tags[key] = createTag();
          tag.value = childValue;
        }
        getValue(tag);
        return childValue;
      }
    }
    const res = calculateResult();
    return res;
  },
  ownKeys(node) {
    consumeCollection(node);
    return Reflect.ownKeys(node.value);
  },
  getOwnPropertyDescriptor(node, prop) {
    return Reflect.getOwnPropertyDescriptor(node.value, prop);
  },
  has(node, prop) {
    return Reflect.has(node.value, prop);
  }
};
var ArrayTreeNode = class {
  constructor(value) {
    this.value = value;
    this.value = value;
    this.tag.value = value;
  }
  proxy = new Proxy([this], arrayProxyHandler);
  tag = createTag();
  tags = {};
  children = {};
  collectionTag = null;
  id = nextId++;
};
var arrayProxyHandler = {
  get([node], key) {
    if (key === "length") {
      consumeCollection(node);
    }
    return objectProxyHandler.get(node, key);
  },
  ownKeys([node]) {
    return objectProxyHandler.ownKeys(node);
  },
  getOwnPropertyDescriptor([node], prop) {
    return objectProxyHandler.getOwnPropertyDescriptor(node, prop);
  },
  has([node], prop) {
    return objectProxyHandler.has(node, prop);
  }
};
function createNode(value) {
  if (Array.isArray(value)) {
    return new ArrayTreeNode(value);
  }
  return new ObjectTreeNode(value);
}
function updateNode(node, newValue) {
  const { value, tags, children } = node;
  node.value = newValue;
  if (Array.isArray(value) && Array.isArray(newValue) && value.length !== newValue.length) {
    dirtyCollection(node);
  } else {
    if (value !== newValue) {
      let oldKeysSize = 0;
      let newKeysSize = 0;
      let anyKeysAdded = false;
      for (const _key in value) {
        oldKeysSize++;
      }
      for (const key in newValue) {
        newKeysSize++;
        if (!(key in value)) {
          anyKeysAdded = true;
          break;
        }
      }
      const isDifferent = anyKeysAdded || oldKeysSize !== newKeysSize;
      if (isDifferent) {
        dirtyCollection(node);
      }
    }
  }
  for (const key in tags) {
    const childValue = value[key];
    const newChildValue = newValue[key];
    if (childValue !== newChildValue) {
      dirtyCollection(node);
      dirtyTag(tags[key], newChildValue);
    }
    if (typeof newChildValue === "object" && newChildValue !== null) {
      delete tags[key];
    }
  }
  for (const key in children) {
    const childNode = children[key];
    const newChildValue = newValue[key];
    const childValue = childNode.value;
    if (childValue === newChildValue) {
      continue;
    } else if (typeof newChildValue === "object" && newChildValue !== null) {
      updateNode(childNode, newChildValue);
    } else {
      deleteNode(childNode);
      delete children[key];
    }
  }
}
function deleteNode(node) {
  if (node.tag) {
    dirtyTag(node.tag, null);
  }
  dirtyCollection(node);
  for (const key in node.tags) {
    dirtyTag(node.tags[key], null);
  }
  for (const key in node.children) {
    deleteNode(node.children[key]);
  }
}

// src/lruMemoize.ts
function createSingletonCache(equals) {
  let entry;
  return {
    get(key) {
      if (entry && equals(entry.key, key)) {
        return entry.value;
      }
      return NOT_FOUND;
    },
    put(key, value) {
      entry = { key, value };
    },
    getEntries() {
      return entry ? [entry] : [];
    },
    clear() {
      entry = void 0;
    }
  };
}
function createLruCache(maxSize, equals) {
  let entries = [];
  function get(key) {
    const cacheIndex = entries.findIndex((entry) => equals(key, entry.key));
    if (cacheIndex > -1) {
      const entry = entries[cacheIndex];
      if (cacheIndex > 0) {
        entries.splice(cacheIndex, 1);
        entries.unshift(entry);
      }
      return entry.value;
    }
    return NOT_FOUND;
  }
  function put(key, value) {
    if (get(key) === NOT_FOUND) {
      entries.unshift({ key, value });
      if (entries.length > maxSize) {
        entries.pop();
      }
    }
  }
  function getEntries() {
    return entries;
  }
  function clear() {
    entries = [];
  }
  return { get, put, getEntries, clear };
}
var referenceEqualityCheck = (a, b) => a === b;
function createCacheKeyComparator(equalityCheck) {
  return function areArgumentsShallowlyEqual(prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    }
    const { length } = prev;
    for (let i = 0; i < length; i++) {
      if (!equalityCheck(prev[i], next[i])) {
        return false;
      }
    }
    return true;
  };
}
function lruMemoize(func, equalityCheckOrOptions) {
  const providedOptions = typeof equalityCheckOrOptions === "object" ? equalityCheckOrOptions : { equalityCheck: equalityCheckOrOptions };
  const {
    equalityCheck = referenceEqualityCheck,
    maxSize = 1,
    resultEqualityCheck
  } = providedOptions;
  const comparator = createCacheKeyComparator(equalityCheck);
  let resultsCount = 0;
  const cache = maxSize <= 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator);
  function memoized() {
    let value = cache.get(arguments);
    if (value === NOT_FOUND) {
      value = func.apply(null, arguments);
      resultsCount++;
      if (resultEqualityCheck) {
        const entries = cache.getEntries();
        const matchingEntry = entries.find(
          (entry) => resultEqualityCheck(entry.value, value)
        );
        if (matchingEntry) {
          value = matchingEntry.value;
          resultsCount !== 0 && resultsCount--;
        }
      }
      cache.put(arguments, value);
    }
    return value;
  }
  memoized.clearCache = () => {
    cache.clear();
    memoized.resetResultsCount();
  };
  memoized.resultsCount = () => resultsCount;
  memoized.resetResultsCount = () => {
    resultsCount = 0;
  };
  return memoized;
}

// src/autotrackMemoize/autotrackMemoize.ts
function autotrackMemoize(func) {
  const node = createNode(
    []
  );
  let lastArgs = null;
  const shallowEqual = createCacheKeyComparator(referenceEqualityCheck);
  const cache = createCache(() => {
    const res = func.apply(null, node.proxy);
    return res;
  });
  function memoized() {
    if (!shallowEqual(lastArgs, arguments)) {
      updateNode(node, arguments);
      lastArgs = arguments;
    }
    return cache.value;
  }
  memoized.clearCache = () => {
    return cache.clear();
  };
  return memoized;
}

// src/weakMapMemoize.ts
var StrongRef = class {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value;
  }
};
var Ref = typeof WeakRef !== "undefined" ? WeakRef : StrongRef;
var UNTERMINATED = 0;
var TERMINATED = 1;
function createCacheNode() {
  return {
    s: UNTERMINATED,
    v: void 0,
    o: null,
    p: null
  };
}
function weakMapMemoize(func, options = {}) {
  let fnNode = createCacheNode();
  const { resultEqualityCheck } = options;
  let lastResult;
  let resultsCount = 0;
  function memoized() {
    let cacheNode = fnNode;
    const { length } = arguments;
    for (let i = 0, l = length; i < l; i++) {
      const arg = arguments[i];
      if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
        let objectCache = cacheNode.o;
        if (objectCache === null) {
          cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
        }
        const objectNode = objectCache.get(arg);
        if (objectNode === void 0) {
          cacheNode = createCacheNode();
          objectCache.set(arg, cacheNode);
        } else {
          cacheNode = objectNode;
        }
      } else {
        let primitiveCache = cacheNode.p;
        if (primitiveCache === null) {
          cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
        }
        const primitiveNode = primitiveCache.get(arg);
        if (primitiveNode === void 0) {
          cacheNode = createCacheNode();
          primitiveCache.set(arg, cacheNode);
        } else {
          cacheNode = primitiveNode;
        }
      }
    }
    const terminatedNode = cacheNode;
    let result;
    if (cacheNode.s === TERMINATED) {
      result = cacheNode.v;
    } else {
      result = func.apply(null, arguments);
      resultsCount++;
      if (resultEqualityCheck) {
        const lastResultValue = lastResult?.deref?.() ?? lastResult;
        if (lastResultValue != null && resultEqualityCheck(lastResultValue, result)) {
          result = lastResultValue;
          resultsCount !== 0 && resultsCount--;
        }
        const needsWeakRef = typeof result === "object" && result !== null || typeof result === "function";
        lastResult = needsWeakRef ? new Ref(result) : result;
      }
    }
    terminatedNode.s = TERMINATED;
    terminatedNode.v = result;
    return result;
  }
  memoized.clearCache = () => {
    fnNode = createCacheNode();
    memoized.resetResultsCount();
  };
  memoized.resultsCount = () => resultsCount;
  memoized.resetResultsCount = () => {
    resultsCount = 0;
  };
  return memoized;
}

// src/createSelectorCreator.ts
function createSelectorCreator(memoizeOrOptions, ...memoizeOptionsFromArgs) {
  const createSelectorCreatorOptions = typeof memoizeOrOptions === "function" ? {
    memoize: memoizeOrOptions,
    memoizeOptions: memoizeOptionsFromArgs
  } : memoizeOrOptions;
  const createSelector2 = (...createSelectorArgs) => {
    let recomputations = 0;
    let dependencyRecomputations = 0;
    let lastResult;
    let directlyPassedOptions = {};
    let resultFunc = createSelectorArgs.pop();
    if (typeof resultFunc === "object") {
      directlyPassedOptions = resultFunc;
      resultFunc = createSelectorArgs.pop();
    }
    assertIsFunction(
      resultFunc,
      `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
    );
    const combinedOptions = {
      ...createSelectorCreatorOptions,
      ...directlyPassedOptions
    };
    const {
      memoize,
      memoizeOptions = [],
      argsMemoize = weakMapMemoize,
      argsMemoizeOptions = [],
      devModeChecks = {}
    } = combinedOptions;
    const finalMemoizeOptions = ensureIsArray(memoizeOptions);
    const finalArgsMemoizeOptions = ensureIsArray(argsMemoizeOptions);
    const dependencies = getDependencies(createSelectorArgs);
    const memoizedResultFunc = memoize(function recomputationWrapper() {
      recomputations++;
      return resultFunc.apply(
        null,
        arguments
      );
    }, ...finalMemoizeOptions);
    let firstRun = true;
    const selector = argsMemoize(function dependenciesChecker() {
      dependencyRecomputations++;
      const inputSelectorResults = collectInputSelectorResults(
        dependencies,
        arguments
      );
      lastResult = memoizedResultFunc.apply(null, inputSelectorResults);
      if (true) {
        const { identityFunctionCheck, inputStabilityCheck } = getDevModeChecksExecutionInfo(firstRun, devModeChecks);
        if (identityFunctionCheck.shouldRun) {
          identityFunctionCheck.run(
            resultFunc,
            inputSelectorResults,
            lastResult
          );
        }
        if (inputStabilityCheck.shouldRun) {
          const inputSelectorResultsCopy = collectInputSelectorResults(
            dependencies,
            arguments
          );
          inputStabilityCheck.run(
            { inputSelectorResults, inputSelectorResultsCopy },
            { memoize, memoizeOptions: finalMemoizeOptions },
            arguments
          );
        }
        if (firstRun)
          firstRun = false;
      }
      return lastResult;
    }, ...finalArgsMemoizeOptions);
    return Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      dependencyRecomputations: () => dependencyRecomputations,
      resetDependencyRecomputations: () => {
        dependencyRecomputations = 0;
      },
      lastResult: () => lastResult,
      recomputations: () => recomputations,
      resetRecomputations: () => {
        recomputations = 0;
      },
      memoize,
      argsMemoize
    });
  };
  Object.assign(createSelector2, {
    withTypes: () => createSelector2
  });
  return createSelector2;
}
var createSelector = /* @__PURE__ */ createSelectorCreator(weakMapMemoize);

// src/createStructuredSelector.ts
var createStructuredSelector = Object.assign(
  (inputSelectorsObject, selectorCreator = createSelector) => {
    assertIsObject(
      inputSelectorsObject,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof inputSelectorsObject}`
    );
    const inputSelectorKeys = Object.keys(inputSelectorsObject);
    const dependencies = inputSelectorKeys.map(
      (key) => inputSelectorsObject[key]
    );
    const structuredSelector = selectorCreator(
      dependencies,
      (...inputSelectorResults) => {
        return inputSelectorResults.reduce((composition, value, index) => {
          composition[inputSelectorKeys[index]] = value;
          return composition;
        }, {});
      }
    );
    return structuredSelector;
  },
  { withTypes: () => createStructuredSelector }
);

//# sourceMappingURL=reselect.mjs.map

/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


 true &&
  (function () {
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __webpack_require__(/*! react */ "react"),
      objectIs = "function" === typeof Object.is ? Object.is : is,
      useSyncExternalStore = React.useSyncExternalStore,
      useRef = React.useRef,
      useEffect = React.useEffect,
      useMemo = React.useMemo,
      useDebugValue = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function (
      subscribe,
      getSnapshot,
      getServerSnapshot,
      selector,
      isEqual
    ) {
      var instRef = useRef(null);
      if (null === instRef.current) {
        var inst = { hasValue: !1, value: null };
        instRef.current = inst;
      } else inst = instRef.current;
      instRef = useMemo(
        function () {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = !0;
              memoizedSnapshot = nextSnapshot;
              nextSnapshot = selector(nextSnapshot);
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value;
                if (isEqual(currentSelection, nextSnapshot))
                  return (memoizedSelection = currentSelection);
              }
              return (memoizedSelection = nextSnapshot);
            }
            currentSelection = memoizedSelection;
            if (objectIs(memoizedSnapshot, nextSnapshot))
              return currentSelection;
            var nextSelection = selector(nextSnapshot);
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return (memoizedSnapshot = nextSnapshot), currentSelection;
            memoizedSnapshot = nextSnapshot;
            return (memoizedSelection = nextSelection);
          }
          var hasMemo = !1,
            memoizedSnapshot,
            memoizedSelection,
            maybeGetServerSnapshot =
              void 0 === getServerSnapshot ? null : getServerSnapshot;
          return [
            function () {
              return memoizedSelector(getSnapshot());
            },
            null === maybeGetServerSnapshot
              ? void 0
              : function () {
                  return memoizedSelector(maybeGetServerSnapshot());
                }
          ];
        },
        [getSnapshot, getServerSnapshot, selector, isEqual]
      );
      var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
      useEffect(
        function () {
          inst.hasValue = !0;
          inst.value = value;
        },
        [value]
      );
      useDebugValue(value);
      return value;
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();


/***/ }),

/***/ "./node_modules/use-sync-external-store/with-selector.js":
/*!***************************************************************!*\
  !*** ./node_modules/use-sync-external-store/with-selector.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./cjs/use-sync-external-store-with-selector.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js");
}


/***/ }),

/***/ "./src/components/BackButton.js":
/*!**************************************!*\
  !*** ./src/components/BackButton.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icons_arrow_long_left_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/arrow-long-left.svg */ "./src/icons/arrow-long-left.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const BackButton = ({
  handleBackClick
}) => {
  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleBackClick?.();
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "helpcenter-back-arrow",
    role: "button",
    tabIndex: 0,
    onClick: handleBackClick,
    onKeyDown: handleKeyDown,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_icons_arrow_long_left_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Back', 'wp-module-help-center')
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackButton);

/***/ }),

/***/ "./src/components/DislikeFeedbackPanel.js":
/*!************************************************!*\
  !*** ./src/components/DislikeFeedbackPanel.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/helpcenterSlice */ "./store/helpcenterSlice.js");
/* harmony import */ var _icons_dislike_help_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/dislike-help.svg */ "./src/icons/dislike-help.svg");
/* harmony import */ var _BackButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BackButton */ "./src/components/BackButton.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const DislikeFeedbackPanel = () => {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "dislike-feedback",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_BackButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
      handleBackClick: () => {
        dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_2__.helpcenterActions.setDisliked(false));
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "dislike-feedback-icon",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_icons_dislike_help_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`We're sorry the suggestions didn’t help.`, 'wp-module-help-center'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Try to:', 'wp-module-help-center')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("ul", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("li", {
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`Use different keywords in the search field.`, 'wp-module-help-center'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`A clear, short prompt can make the difference.`, 'wp-module-help-center')]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("li", {
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Reach out to our customer support.', 'wp-module-help-center'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Call at', 'wp-module-help-center'), ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
              href: "tel:8884014678",
              children: "888-401-4678"
            })
          }), ' ', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('or', 'wp-module-help-center'), ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
              href: window.NewfoldRuntime?.linkTracker?.addUtmParams('https://www.bluehost.com/contact') || 'https://www.bluehost.com/contact',
              target: "_blank",
              rel: "noreferrer",
              children: "Chat Live"
            }), ' ']
          }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('with one of our support agents — we will assist you as soon as possible.', 'wp-module-help-center')]
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DislikeFeedbackPanel);

/***/ }),

/***/ "./src/components/FloatingIcon.js":
/*!****************************************!*\
  !*** ./src/components/FloatingIcon.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .. */ "./src/index.js");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/helpcenterSlice */ "./store/helpcenterSlice.js");
/* harmony import */ var _icons_help_bubble_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../icons/help-bubble.svg */ "./src/icons/help-bubble.svg");
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const FloatingIcon = () => {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const {
    floatingIconVisibilty,
    visible,
    hasLaunchedFromTooltip
  } = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_5__.useHelpCenterState)();
  const handleClick = () => {
    (0,___WEBPACK_IMPORTED_MODULE_2__.toggleHelp)(true);
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_3__.helpcenterActions.updateFloatingIconVisibilty(false));
  };
  if (!floatingIconVisibilty && (visible || !hasLaunchedFromTooltip)) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "nfd-hc-floating-icon",
    role: "button",
    tabIndex: 0,
    "aria-label": "Open Help Center",
    onClick: handleClick,
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_icons_help_bubble_svg__WEBPACK_IMPORTED_MODULE_4__.ReactComponent, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Help', 'wp-module-help-center')
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FloatingIcon);

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _icons_footer_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/footer.svg */ "./src/icons/footer.svg");
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* eslint-disable @wordpress/i18n-no-flanking-whitespace */





const Footer = () => {
  const {
    disliked,
    noResult
  } = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_3__.useHelpCenterState)();
  const [contactUrl, setContactUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('https://www.bluehost.com/contact');
  const [proDesignUrl, setProDesignUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('https://www.bluehost.com/pro-design-live');

  // Function to add UTM parameters to a URL
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const interval = setInterval(() => {
      if (window.NewfoldRuntime?.linkTracker?.addUtmParams instanceof Function) {
        const addParamsContact = window.NewfoldRuntime.linkTracker.addUtmParams(contactUrl);
        const addParamsProDesign = window.NewfoldRuntime.linkTracker.addUtmParams(proDesignUrl);
        setContactUrl(addParamsContact);
        setProDesignUrl(addParamsProDesign);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "nfd-hc-modal__footer",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "helpcenter-supportinfo__wrapper",
      children: !disliked && !noResult && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("hr", {
          className: "helpcenter-supportinfo__breakline"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "helpcenter-supportinfo__text",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
            className: "helpcenter-supportinfo__text--heading",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Account Support', 'wp-module-help-center')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("p", {
            className: "helpcenter-supportinfo__text--body",
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('If you need help with your Bluehost account, give us a call at ', 'wp-module-help-center'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
              href: "tel:8884014678",
              children: "888-401-4678"
            }), ' or ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
              href: contactUrl,
              target: "_blank",
              rel: "noreferrer",
              children: "Chat Live"
            }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(" with one of our support agents — we're here for you!", 'wp-module-help-center')]
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "hc-banner__wrapper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "hc-banner",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "hc-banner-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("p", {
            className: "hc-banner-content__heading",
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`Your dream site is just a click away.`, 'wp-module-help-center'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("br", {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(`Let's build a site you love, together.`, 'wp-module-help-center')]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
            className: "hc-banner-content__body",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('With Pro Design Live, our expert team bring your vision to life. We help you to create and the site you’ve always dreamed of — tailored to your goals, ready to perform.', 'wp-module-help-center')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "hc-banner-content__cta",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
              "data-action": "load-nfd-ctb",
              "data-ctb-id": "838cc912-adb3-4d75-9450-262bf3ee3576",
              role: "button",
              href: proDesignUrl,
              className: "hc-banner-content__cta--button",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Start Now', 'wp-module-help-center')
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "hc-banner-background",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_icons_footer_svg__WEBPACK_IMPORTED_MODULE_2__.ReactComponent, {})
      })]
    })]
  });
};
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
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/helpcenterSlice */ "./store/helpcenterSlice.js");
/* harmony import */ var _DislikeFeedbackPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DislikeFeedbackPanel */ "./src/components/DislikeFeedbackPanel.js");
/* harmony import */ var _HelpCenterIntro__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HelpCenterIntro */ "./src/components/HelpCenterIntro.js");
/* harmony import */ var _ResultList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ResultList */ "./src/components/ResultList/index.js");
/* harmony import */ var _ResultList_NoResults__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ResultList/NoResults */ "./src/components/ResultList/NoResults.js");
/* harmony import */ var _SearchInput__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SearchInput */ "./src/components/SearchInput.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);











const HelpCenter = () => {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();

  // Use reusable hook for Redux state
  const {
    visible,
    helpEnabled,
    disliked,
    noResult,
    initComplete,
    resultContent,
    isLoading,
    hasLaunchedFromTooltip
  } = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_3__.useHelpCenterState)();
  const wrapper = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const resultsContainer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  // === useEffect: on mount ===
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    getHelpStatus();
    // Sync visibility state with Redux when localStorage changes
    const updateVisibility = () => dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_4__.helpcenterActions.updateVisibility(_utils__WEBPACK_IMPORTED_MODULE_2__.LocalStorageUtils.getHelpVisible()));
    window.addEventListener('storage', updateVisibility);

    // Initial sync
    updateVisibility();
    return () => {
      window.removeEventListener('storage', updateVisibility);
    };
  }, [dispatch]);

  // === useEffect: on visible ===
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (visible) {
      dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_4__.helpcenterActions.updateInitComplete(true));
      checkFooterVisibility();
      (0,_utils__WEBPACK_IMPORTED_MODULE_2__.adjustPadding)(wrapper);
      /* setTimeout( () => {
      	scrollToBottom( wrapper, resultsContainer );
      }, 500 ); */
    }
  }, [visible]);

  // === useEffect: on initComplete / disliked ===
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (initComplete) {
      checkFooterVisibility();
      (0,_utils__WEBPACK_IMPORTED_MODULE_2__.adjustPadding)(wrapper);
      /* scrollToBottom( wrapper, resultsContainer ); */
    }
  }, [initComplete, disliked]);
  const getHelpStatus = async () => {
    try {
      const response = await _utils__WEBPACK_IMPORTED_MODULE_2__.CapabilityAPI.getHelpCenterCapability();
      const aiResponse = _utils__WEBPACK_IMPORTED_MODULE_2__.CapabilityAPI.getAIHelpCenterCapability();
      // Show help center if either capability is true
      // If AI capability is true, HelpCenterChat will show AI chat instead
      // but we still need helpEnabled to be true so the modal/content area renders
      dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_4__.helpcenterActions.updateHelpEnabled(response || aiResponse));
    } catch {
      // On error, check AI capability as fallback
      const aiResponse = _utils__WEBPACK_IMPORTED_MODULE_2__.CapabilityAPI.getAIHelpCenterCapability();
      dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_4__.helpcenterActions.updateHelpEnabled(aiResponse));
    }
  };
  const checkFooterVisibility = () => {
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_4__.helpcenterActions.setIsFooterVisible(resultContent.length < 1 || disliked));
  };

  // Check both capabilities - show if either is true
  const canAccessAIHelpCenter = _utils__WEBPACK_IMPORTED_MODULE_2__.CapabilityAPI.getAIHelpCenterCapability();
  const shouldShow = (helpEnabled || canAccessAIHelpCenter) && visible;
  if (!shouldShow) {
    return null;
  }
  const renderResultContainer = () => {
    if (noResult) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_ResultList_NoResults__WEBPACK_IMPORTED_MODULE_8__["default"], {
        hasLaunchedFromTooltip: hasLaunchedFromTooltip
      });
    }
    if (disliked) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_DislikeFeedbackPanel__WEBPACK_IMPORTED_MODULE_5__["default"], {});
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
      children: [resultContent?.length < 1 && !isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_HelpCenterIntro__WEBPACK_IMPORTED_MODULE_6__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_ResultList__WEBPACK_IMPORTED_MODULE_7__["default"], {
        wrapper: wrapper,
        resultsContainer: resultsContainer
      })]
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
    className: "nfd-help-center",
    id: "helpcenterResultsWrapper",
    ref: wrapper,
    style: hasLaunchedFromTooltip ? {
      height: window.innerHeight - 100
    } : undefined,
    children: [renderResultContainer(), !hasLaunchedFromTooltip && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_SearchInput__WEBPACK_IMPORTED_MODULE_9__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpCenter);

/***/ }),

/***/ "./src/components/HelpCenterChat.jsx":
/*!*******************************************!*\
  !*** ./src/components/HelpCenterChat.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HelpCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HelpCenter */ "./src/components/HelpCenter.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Help Center Chat Component
 *
 * Wrapper component that checks capability and renders either:
 * - Legacy HelpCenter (when capability is off OR when launched from tooltip)
 * - AI Chat interface (when capability is on and not from tooltip)
 */

 // Legacy component





// Lazy load AI chat component to avoid loading when capability is off

const HelpCenterChatAI = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-wp-module-ai-chat_node_modules_lucide-react_dist_esm_icons_arrow-up_js-wp-module-ai-c-00f4d1"), __webpack_require__.e("src_components_HelpCenterChatAI_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./HelpCenterChatAI */ "./src/components/HelpCenterChatAI.jsx")).then(module => ({
  default: module.default
})));

// Loading placeholder to prevent flash of old UI while AI chat loads
const LoadingPlaceholder = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
  className: "nfd-help-center-chat-loading",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    className: "nfd-help-center-chat-loading__spinner"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
    className: "nfd-help-center-chat-loading__text",
    children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Loading...', 'wp-module-help-center')
  })]
});
const HelpCenterChat = () => {
  // Check capability FIRST, before any AI chat code execution
  const canAccessAIHelpCenter = _utils__WEBPACK_IMPORTED_MODULE_1__.CapabilityAPI.getAIHelpCenterCapability();

  // Check if launched from tooltip - tooltips need legacy UI to show content properly
  const {
    hasLaunchedFromTooltip
  } = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_2__.useHelpCenterState)();

  // Use legacy HelpCenter for:
  // 1. When AI capability is off
  // 2. When launched from tooltip (tooltip content is displayed via legacy result system)
  if (!canAccessAIHelpCenter || hasLaunchedFromTooltip) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_HelpCenter__WEBPACK_IMPORTED_MODULE_0__["default"], {});
  }

  // Only load AI chat when capability is enabled and NOT from tooltip
  // Use loading placeholder instead of old UI to prevent flash
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Suspense, {
    fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(LoadingPlaceholder, {}),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(HelpCenterChatAI, {})
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpCenterChat);

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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const HelpCenterIntro = () => {
  const hcData = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_3__.useHelpCenterState)();
  const [startReveal, setStartReveal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setStartReveal(hcData.resultContent.length <= 0);
  }, []);
  const introText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hey there! I’m here to help you find your way around WordPress. </br></br> If you’re not sure how to do something, just ask — I’ll walk you through it step by step. I’m still learning, so I might not have every answer, but I’ll do my best to help!', 'wp-module-help-center');
  const {
    displayedText: revealedIntro
  } = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.useRevealText)(introText || '', 50, startReveal);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    role: "region",
    "aria-labelledby": "helpcenter-intro-heading",
    className: "helpcenter-intro",
    style: {
      display: hcData.resultContent?.postId ? 'none' : 'flex'
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "helpcenter-intro__text",
      dangerouslySetInnerHTML: {
        __html: revealedIntro
      }
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpCenterIntro);

/***/ }),

/***/ "./src/components/HistoryList.js":
/*!***************************************!*\
  !*** ./src/components/HistoryList.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/helpcenterSlice */ "./store/helpcenterSlice.js");
/* harmony import */ var _icons_reload_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/reload.svg */ "./src/icons/reload.svg");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils */ "./src/utils.js");
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const HistoryList = () => {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch)();
  const {
    helpResultHistory
  } = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_4__.useHelpCenterState)();
  const handleHistory = historyItem => {
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_1__.helpcenterActions.clearViaLinkSearch());
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_1__.helpcenterActions.setIsFooterVisible(false));
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_1__.helpcenterActions.updateResultContent(historyItem));
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_1__.helpcenterActions.updateSearchInput(historyItem.searchInput));
    _utils__WEBPACK_IMPORTED_MODULE_3__.LocalStorageUtils.persistResult(historyItem.resultContent, historyItem.postId, historyItem.searchInput, historyItem.feedbackSubmitted, false);
    _utils__WEBPACK_IMPORTED_MODULE_3__.LocalStorageUtils.persistSearchInput(historyItem.searchInput);
  };
  const reversedHistory = [...helpResultHistory].reverse();
  return reversedHistory.map((history, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "HistoryList",
    role: "button",
    tabIndex: 0,
    onClick: () => handleHistory(history),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleHistory(history);
      }
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_icons_reload_svg__WEBPACK_IMPORTED_MODULE_2__.ReactComponent, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      children: history.searchInput
    })]
  }, history.searchInput + index));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HistoryList);

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
/* harmony import */ var _icons_helpcenter_chat_bubble_icon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/helpcenter-chat-bubble-icon.svg */ "./src/icons/helpcenter-chat-bubble-icon.svg");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Footer */ "./src/components/Footer.js");
/* harmony import */ var _HelpCenterChat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HelpCenterChat */ "./src/components/HelpCenterChat.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! .. */ "./src/index.js");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/helpcenterSlice */ "./store/helpcenterSlice.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var _utils_footerUtils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/footerUtils */ "./src/utils/footerUtils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);













const Modal = ({
  onClose
}) => {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();

  // Use reusable hook for Redux state
  const {
    isFooterVisible,
    hasLaunchedFromTooltip
  } = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_10__.useHelpCenterState)();

  // Check capability to determine which flow is active
  // HelpCenterChat renders its own Footer when capability is true
  // Legacy HelpCenter flow (when capability is false) needs Footer from Modal.js
  const canAccessAIHelpCenter = _utils__WEBPACK_IMPORTED_MODULE_9__.CapabilityAPI.getAIHelpCenterCapability();

  // Use reusable utility function for footer visibility logic
  const showFooter = (0,_utils_footerUtils__WEBPACK_IMPORTED_MODULE_11__.shouldShowFooter)({
    isFooterVisible,
    hasLaunchedFromTooltip,
    canAccessAIHelpCenter
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.initialDataSet({
      isFooterVisible: _utils__WEBPACK_IMPORTED_MODULE_9__.LocalStorageUtils.getResultInfo()?.length < 1,
      SearchInput: _utils__WEBPACK_IMPORTED_MODULE_9__.LocalStorageUtils.getSearchInput() || ''
    }));
    const helpVisible = window.newfoldHelpCenter?.closeOnLoad ? false : _utils__WEBPACK_IMPORTED_MODULE_9__.LocalStorageUtils.getHelpVisible();
    (0,___WEBPACK_IMPORTED_MODULE_7__.toggleHelp)(helpVisible);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let data = [];
    async function fetchData() {
      data = await (0,_utils__WEBPACK_IMPORTED_MODULE_9__.getHelpcenterOption)();
      if (data) {
        dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.updateHelpResultHistoryFromDB(data));
      }
    }
    fetchData();
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
    role: "dialog",
    "aria-labelledby": "helpcenter-modal-heading",
    "aria-describedby": "helpcenter-modal-description",
    "aria-modal": "true",
    className: "nfd-hc-modal",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
      className: "nfd-hc-modal__header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("h3", {
        id: "helpcenter-modal-heading",
        className: "nfd-hc-modal__header__heading",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
          className: "nfd-hc-modal__header__heading__icon",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_icons_helpcenter_chat_bubble_icon_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Help with WordPress', 'wp-module-help-center')
        })]
      }), hasLaunchedFromTooltip && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("button", {
        className: "nfd-hc-modal__header__minimize-button",
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Minimize HelpCenter', 'wp-module-help-center'),
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Minimize HelpCenter', 'wp-module-help-center'),
        onClick: () => {
          dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.updateFloatingIconVisibilty(true));
          (0,___WEBPACK_IMPORTED_MODULE_7__.toggleHelp)(false);
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("button", {
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close Help Modal', 'wp-module-help-center'),
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close Help Modal', 'wp-module-help-center'),
        className: "nfd-hc-modal__header__close-button",
        onClick: () => {
          dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.resetState());
          onClose();
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_icons_close_svg__WEBPACK_IMPORTED_MODULE_2__.ReactComponent, {
          "aria-hidden": "true"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
      className: "nfd-hc-seperator",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("hr", {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
      id: "helpcenter-modal-description",
      className: "nfd-hc-modal__content",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_HelpCenterChat__WEBPACK_IMPORTED_MODULE_5__["default"], {})
    }), showFooter && !canAccessAIHelpCenter && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_Footer__WEBPACK_IMPORTED_MODULE_4__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./src/components/ResultList/IframeModal.js":
/*!**************************************************!*\
  !*** ./src/components/ResultList/IframeModal.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const IframeModal = ({
  isOpen,
  onClose,
  iframeAttributes
}) => {
  const iframeContainerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isOpen) {
      return;
    }
    const container = iframeContainerRef.current; // capture ref target
    if (!container) {
      return;
    }

    // clear and inject
    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    Object.entries(iframeAttributes || {}).forEach(([key, value]) => {
      if (value !== null) {
        iframe.setAttribute(key, value);
      }
    });
    iframe.className = 'iframe-modal__iframe';
    container.appendChild(iframe);

    // cleanup
    return () => {
      // use captured `container` (may differ from ref after unmount)
      if (container) {
        try {
          if (container.contains(iframe)) {
            container.removeChild(iframe);
          } else {
            container.innerHTML = '';
          }
        } catch {
          /* container might already be gone; ignore */
        }
      }
    };
  }, [isOpen, iframeAttributes]);
  if (!isOpen) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "iframe-modal__overlay",
    onClick: onClose,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "iframe-modal__content",
      onClick: e => e.stopPropagation(),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
        onClick: onClose,
        className: "iframe-modal__close",
        "aria-label": "Close modal",
        children: "\xD7"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "iframe-modal__iframe-wrapper",
        ref: iframeContainerRef
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IframeModal);

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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var _icons_noresults_icon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../icons/noresults-icon.svg */ "./src/icons/noresults-icon.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* eslint-disable @wordpress/i18n-translator-comments */





const NoResults = ({
  hasLaunchedFromTooltip,
  query: queryProp
}) => {
  const responseRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const resourceLink = window?.nfdHelpCenter?.resourceLink || '#'; // Fallback if resourceLink is not defined

  // Define the content with a placeholder for the link
  const contentWithLink = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You can try searching our <a href="{link}">Resource center.</a> though to see if there’s a helpful article or video on that subject.', 'wp-module-help-center');

  // Replace the {link} placeholder with the actual link
  const formattedContent = contentWithLink.replace('{link}', resourceLink);
  // Use prop query if provided, otherwise try localStorage, fallback to null
  const query = queryProp !== undefined ? queryProp : _utils__WEBPACK_IMPORTED_MODULE_2__.LocalStorageUtils.getSearchInput();
  // Determine the message text - use "this" if launched from tooltip or query is null/empty
  const messageText = hasLaunchedFromTooltip || !query ? 'this' : `"${query}"`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    ref: responseRef,
    className: "helpcenter-response-block",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "helpcenter-noresult-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "helpcenter-noresult-block",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "helpcenter-noresult-icon",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_icons_noresults_icon_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sorry, I don’t have any information on %s yet.', 'wp-module-help-center'), messageText)
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Try to:', 'wp-module-help-center')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("ul", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
                dangerouslySetInnerHTML: {
                  __html: formattedContent
                }
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("p", {
                children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`Use different keywords in the search field.`, 'wp-module-help-center'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("br", {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`A clear, short prompt can make the difference.`, 'wp-module-help-center')]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("p", {
                children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reach out to our customer support.', 'wp-module-help-center'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("br", {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Call at', 'wp-module-help-center'), ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
                  href: "tel:8884014678",
                  children: "888-401-4678"
                }), ' ', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('or', 'wp-module-help-center'), ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
                  href: window.NewfoldRuntime?.linkTracker?.addUtmParams('https://www.bluehost.com/contact') || 'https://www.bluehost.com/contact',
                  target: "_blank",
                  rel: "noreferrer",
                  children: "Chat Live"
                }), ' ', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('with one of our support agents — we will assist you as soon as possible.', 'wp-module-help-center')]
              })
            })]
          })]
        })]
      })
    })
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
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/helpcenterSlice */ "./store/helpcenterSlice.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var _BackButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../BackButton */ "./src/components/BackButton.js");
/* harmony import */ var _ResultContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ResultContent */ "./src/components/ResultList/ResultContent.js");
/* harmony import */ var _ResultFeedback__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ResultFeedback */ "./src/components/ResultList/ResultFeedback.js");
/* harmony import */ var _ResultHeader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ResultHeader */ "./src/components/ResultList/ResultHeader.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);










const Result = ({
  content,
  postId,
  source,
  questionBlock,
  index,
  wrapper,
  feedbackSubmitted
}) => {
  const {
    isLoading,
    isNewResult,
    noResult,
    showBackButton,
    hasLaunchedFromTooltip
  } = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_4__.useHelpCenterState)();
  const isNewEntry = isNewResult;
  const responseRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [shouldReveal, setShouldReveal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isNewEntry && responseRef.current || isLoading) {
      adjustHeightAndScroll();
    }
  }, [isNewEntry, isLoading]);
  const adjustHeightAndScroll = () => {
    const viewportHeight = window.innerHeight;
    const minHeight = viewportHeight - 255;
    responseRef.current.style.minHeight = `${minHeight}px`;
    const scrollDistance = wrapper.current.scrollHeight;
    wrapper.current.scrollBy({
      top: scrollDistance,
      left: 0,
      behavior: 'smooth'
    });
    setShouldReveal(true);
  };
  const startReveal = isNewResult ? shouldReveal : false;
  const {
    displayedText: textToDisplay,
    isComplete: revealComplete
  } = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.useRevealText)(content || '', 50, startReveal);
  const htmlContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const processedHTMLContent = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.processContentForMarkdown)(textToDisplay);
    return processedHTMLContent;
  }, [textToDisplay]);
  function shouldShowFeedback() {
    return !noResult && feedbackSubmitted === null && content && revealComplete && content.length > 0 && !hasLaunchedFromTooltip;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    ref: responseRef,
    className: "helpcenter-response-block",
    children: [showBackButton && !hasLaunchedFromTooltip && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_BackButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
      handleBackClick: () => {
        dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_2__.helpcenterActions.goBackInHistory());
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_ResultHeader__WEBPACK_IMPORTED_MODULE_8__["default"], {
      noResult: noResult,
      questionBlock: questionBlock
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_ResultContent__WEBPACK_IMPORTED_MODULE_6__["default"], {
      content: htmlContent,
      index: index,
      questionBlock: questionBlock,
      source: source
    }), shouldShowFeedback() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_ResultFeedback__WEBPACK_IMPORTED_MODULE_7__["default"], {
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/helpcenterSlice */ "./store/helpcenterSlice.js");
/* harmony import */ var _IframeModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IframeModal */ "./src/components/ResultList/IframeModal.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function ResultContent({
  source,
  index,
  questionBlock,
  content
}) {
  const {
    isLoading,
    loadingQuery,
    loadingIndex
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.helpcenter);
  const [iframeModalOpen, setIframeModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [iframeAttributes, setIframeAttributes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const resultBlockRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const resultBlock = resultBlockRef.current;
    if (!resultBlock) {
      return;
    }
    const ensureOverlays = () => {
      const iframes = resultBlock.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        // Avoid duplicating overlays
        if (iframe.dataset.hcOverlay === '1') {
          return;
        }

        // Use Gutenberg wrapper if present; else use the iframe's parent
        const wrapper = iframe.closest('.wp-block-embed__wrapper') || iframe.parentElement;
        if (!wrapper) {
          return;
        }

        // Make wrapper positioned for overlay
        if (getComputedStyle(wrapper).position === 'static') {
          wrapper.style.position = 'relative';
        }

        // Create overlay
        const overlay = document.createElement('button');
        overlay.type = 'button';
        overlay.className = 'hc-iframe-click-overlay';
        overlay.setAttribute('aria-label', 'Open player');
        overlay.tabIndex = 0;

        // On hover, cache all attributes we’ll need
        const cacheAttrs = () => {
          const attrs = {};
          for (let i = 0; i < iframe.attributes.length; i++) {
            const attr = iframe.attributes[i];
            attrs[attr.name] = attr.value;
          }
          // Save on overlay dataset for quick retrieval on click
          overlay.dataset.hcAttrs = JSON.stringify(attrs);
        };
        overlay.addEventListener('mouseenter', cacheAttrs, {
          passive: true
        });
        overlay.addEventListener('focus', cacheAttrs, {
          passive: true
        });

        // Clicking overlay opens modal; prevent any bubbling to underlying iframe
        overlay.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          let attrs = {};
          try {
            if (overlay.dataset.hcAttrs) {
              attrs = JSON.parse(overlay.dataset.hcAttrs) || {};
            } else {
              // fallback if hover never happened
              for (let i = 0; i < iframe.attributes.length; i++) {
                const attr = iframe.attributes[i];
                attrs[attr.name] = attr.value;
              }
            }
          } catch {
            // ignore JSON errors; just rebuild from DOM
            for (let i = 0; i < iframe.attributes.length; i++) {
              const attr = iframe.attributes[i];
              attrs[attr.name] = attr.value;
            }
          }

          // Keep original src as requested (don’t strip/modify)
          setIframeAttributes(attrs);
          setIframeModalOpen(true);
        });

        // Insert overlay as last child so it sits above iframe
        wrapper.appendChild(overlay);

        // Mark iframe prepared
        iframe.dataset.hcOverlay = '1';
        // Make the cursor show intent; DO NOT disable pointer events on iframe (keeps visual cues)
        iframe.style.cursor = 'pointer';
      });
    };
    ensureOverlays();
    const handleClick = e => {
      const anchor = e.target.closest('a[href*="bhmultisite.com/"]');
      if (anchor && resultBlock.contains(anchor)) {
        e.preventDefault();
        const clickedText = anchor.textContent.trim();
        dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_2__.helpcenterActions.updateSearchInput(clickedText));
        dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_2__.helpcenterActions.setAIResultLoading());

        // set a flag like "triggerSubmit" in the store
        dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_2__.helpcenterActions.setTriggerSearch(true));
        dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_2__.helpcenterActions.setShowBackButton(true));
      }
    };
    resultBlock.addEventListener('click', handleClick);
    return () => {
      resultBlock.removeEventListener('click', handleClick);
    };
  }, [content]);
  function renderContentOrLoading() {
    const isAISourceLoading = isLoading && source === 'ai' && loadingQuery === questionBlock && loadingIndex === index;
    if (isAISourceLoading) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "loading-cursor"
      });
    }
    if (content && content.length > 0) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "helpcenter-results",
        dangerouslySetInnerHTML: {
          __html: content
        }
      });
    }
    return null;
  }
  const handleCloseIframeModal = () => {
    setIframeModalOpen(false);
    setIframeAttributes({});
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "helpcenter-result-block",
      ref: resultBlockRef,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        children: renderContentOrLoading()
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_IframeModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
      isOpen: iframeModalOpen,
      onClose: handleCloseIframeModal,
      iframeAttributes: iframeAttributes
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
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store/helpcenterSlice */ "./store/helpcenterSlice.js");
/* harmony import */ var _icons_thumb_down_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../icons/thumb-down.svg */ "./src/icons/thumb-down.svg");
/* harmony import */ var _icons_thumb_up_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icons/thumb-up.svg */ "./src/icons/thumb-up.svg");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








const ResultFeedback = ({
  postId,
  source
}) => {
  const [status, setStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [hasSubmitted, setHasSubmitted] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showThanksMessage, setShowThanksMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const yesButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const noButtonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const postFeedback = async () => {
    if (status === 'helpful' || status === 'notHelpful') {
      _utils__WEBPACK_IMPORTED_MODULE_6__.InteractionAPIs.postFeedback(postId, status);
      _utils__WEBPACK_IMPORTED_MODULE_6__.Analytics.sendEvent('help_feedback_submitted', {
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
    if (noButtonRef.current) {
      noButtonRef.current.className = 'feedback-button no';
    }
    if (yesButtonRef.current) {
      yesButtonRef.current.className = 'feedback-button yes';
    }
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
    if (feedback === 'notHelpful') {
      dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_3__.helpcenterActions.setDisliked(true));
    }
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_3__.helpcenterActions.setFeeback({
      feedbackStatus: feedback === 'helpful' ? true : false,
      postId
    }));
    setStatus(feedback);
    _utils__WEBPACK_IMPORTED_MODULE_6__.LocalStorageUtils.updateFeedbackStatus(postId);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: "feedback-container",
    children: [!hasSubmitted && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "feedback-question",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Did this result help you?', 'wp-module-help-center')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "icon",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
          ref: yesButtonRef,
          onClick: () => handleFeedback('helpful'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_icons_thumb_up_svg__WEBPACK_IMPORTED_MODULE_5__.ReactComponent, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
          onClick: () => handleFeedback('notHelpful'),
          ref: noButtonRef,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_icons_thumb_down_svg__WEBPACK_IMPORTED_MODULE_4__.ReactComponent, {})
        })]
      })]
    }), hasSubmitted && showThanksMessage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
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
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function ResultHeader({
  noResult,
  questionBlock
}) {
  const {
    isNewEntry,
    hasLaunchedFromTooltip
  } = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_0__.useHelpCenterState)();
  const getQuestionBlockText = () => {
    if (!questionBlock || noResult && isNewEntry) {
      return '';
    }
    if (hasLaunchedFromTooltip) {
      return questionBlock;
    }
    return `"${questionBlock}"`;
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "helpcenter-question-block",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      children: getQuestionBlockText()
    })
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
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var _styles_result_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/result.scss */ "./src/styles/result.scss");
/* harmony import */ var _Result__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Result */ "./src/components/ResultList/Result.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/* eslint-disable no-shadow */




const ResultList = ({
  wrapper,
  resultsContainer
}) => {
  const {
    resultContent,
    isLoading
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)(state => state.helpcenter);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "hc-results-container",
      ref: resultsContainer,
      children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "skeleton skeleton-text"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "skeleton skeleton-text",
          style: {
            margin: 0,
            marginTop: '30px',
            borderRadius: '4px 4px 0 0'
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "skeleton skeleton-subtext",
          style: {
            borderRadius: ' 0 0 4px 4px'
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "skeleton skeleton-card"
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Result__WEBPACK_IMPORTED_MODULE_2__.Result, {
        content: resultContent?.resultContent,
        postId: resultContent?.postId,
        questionBlock: resultContent?.searchInput,
        wrapper: wrapper,
        feedbackSubmitted: resultContent?.feedbackSubmitted
      })
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
/* harmony import */ var _newfold_labs_wp_module_ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @newfold-labs/wp-module-ai */ "./node_modules/@newfold-labs/wp-module-ai/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var _hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useHelpCenterState */ "./src/hooks/useHelpCenterState.js");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/helpcenterSlice */ "./store/helpcenterSlice.js");
/* harmony import */ var _icons_paper_airplane_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../icons/paper-airplane.svg */ "./src/icons/paper-airplane.svg");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _HistoryList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HistoryList */ "./src/components/HistoryList.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);










const SearchInput = () => {
  const isFirstRender = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
  const brand = _utils__WEBPACK_IMPORTED_MODULE_7__.CapabilityAPI.getBrand();
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
  const [errorMsg, setErrorMsg] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const searchData = (0,_hooks_useHelpCenterState__WEBPACK_IMPORTED_MODULE_4__.useHelpCenterState)();
  const getInputBoxBottomPosition = data => {
    if (data.isFooterVisible && (data.disliked || data.noResult)) {
      return '222px';
    }
    if (data.isFooterVisible) {
      return '375px';
    }
    return '0px';
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // skip on initial render
    }
    if (searchData.helpResultHistory?.length > 0) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_7__.saveHelpcenterOption)(searchData.helpResultHistory);
    }
  }, [searchData.helpResultHistory]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (searchData.triggerSearch) {
      handleSubmit();
      dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.setTriggerSearch(false));
    }
  }, [searchData.triggerSearch]);
  const populateSearchResult = async (postContent, postId, postTitle, searchSource = 'kb') => {
    const resultContentFormatted = postContent ? (0,_utils__WEBPACK_IMPORTED_MODULE_7__.formatPostContent)(postContent) : '';
    // Retrieve existing results from local storage and using the updated persistResult method to store the result
    const result = {
      resultContent: resultContentFormatted,
      postId,
      searchInput: postTitle,
      feedbackSubmitted: null
    };
    _utils__WEBPACK_IMPORTED_MODULE_7__.LocalStorageUtils.persistResult(result.resultContent, postId, result.searchInput, result.feedbackSubmitted, false);
    _utils__WEBPACK_IMPORTED_MODULE_7__.LocalStorageUtils.persistSearchInput(result.searchInput);
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.updateResultContent(result));
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.updateHelpResultHistory(result));
    if (postId) {
      dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.setNewSearchResult(!!postId));
      _utils__WEBPACK_IMPORTED_MODULE_7__.Analytics.sendEvent('help_search', {
        label_key: 'term',
        term: postTitle,
        page: window.location.href.toString(),
        search_source: searchSource
      });
    }
  };
  const checkAndPopulateResult = hits => {
    if (hits?.length > 0) {
      const resultMatches = (0,_utils__WEBPACK_IMPORTED_MODULE_7__.getResultMatches)(searchData.searchInput, hits[0]?.text_match_info?.tokens_matched, hits[0]?.text_match_info?.fields_matched);
      if (resultMatches) {
        populateSearchResult(hits[0].document.post_content, hits[0].document.post_id || hits[0].document.id, searchData.searchInput);
        return true;
      }
    }
    return false;
  };
  const getAIResult = async () => {
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.setAIResultLoading());
    try {
      // Make a new multi-search API call if no match is found
      const multiSearchResults = await _utils__WEBPACK_IMPORTED_MODULE_7__.MultiSearchAPI.fetchMultiSearchResults(searchData.searchInput, brand);
      const hits = multiSearchResults?.results?.[0]?.grouped_hits?.[0]?.hits;
      if (checkAndPopulateResult(hits)) {
        return;
      }
      const result = await _newfold_labs_wp_module_ai__WEBPACK_IMPORTED_MODULE_0__["default"].search.getSearchResult(searchData.searchInput, 'helpcenter');
      if (result.result[0]) {
        populateSearchResult(result.result[0].text, result.post_id, searchData.searchInput, 'ai');
      } else {
        dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.setNoResult());
      }
    } catch (exception) {
      // eslint-disable-next-line no-console
      console.error('An error occurred:', exception);
      dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.searchInputCatch());
    } finally {
      dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.searchInputFinally());
      _utils__WEBPACK_IMPORTED_MODULE_7__.LocalStorageUtils.persistSearchInput(searchData.searchInput);
    }
  };
  const validateInput = () => {
    const isValid = searchData.searchInput.trim().length > 0;
    setErrorMsg(isValid ? '' : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please enter a specific search term to get results.', 'wp-module-help-center'));
    return isValid;
  };
  const handleSubmit = async () => {
    if (validateInput()) {
      if (!searchData.triggerSearch) {
        dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.clearViaLinkSearch());
      }
      dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.setIsFooterVisible(false));
      dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.setDisliked(false));
      await getAIResult();
    }
  };
  const handleOnChange = e => {
    dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_5__.helpcenterActions.updateSearchInput(e.target.value));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
    className: "helpcenter-input-wrapper",
    id: "nfdHelpcenterInputWrapper",
    role: "search",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search Help Center', 'wp-module-help-center'),
    style: {
      bottom: getInputBoxBottomPosition(searchData)
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "search-container__wrapper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "attribute",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
          className: "hc-input-label",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Ask anything about WordPress', 'wp-module-help-center')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
          className: "hc-input-counter",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
            children: [searchData.searchInput ? searchData.searchInput.length : 0, "/144"]
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "search-container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
          type: "text",
          id: "search-input-box",
          value: searchData.searchInput,
          maxLength: "144",
          onChange: e => handleOnChange(e),
          onKeyDown: e => e.key === 'Enter' && handleSubmit()
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("button", {
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('submit text', 'wp-module-help-center'),
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('submit text', 'wp-module-help-center'),
          onClick: () => handleSubmit(),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_icons_paper_airplane_svg__WEBPACK_IMPORTED_MODULE_6__.ReactComponent, {})
        })]
      }), errorMsg && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
        className: "hc-input-error-message",
        children: errorMsg
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_HistoryList__WEBPACK_IMPORTED_MODULE_8__["default"], {})]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchInput);

/***/ }),

/***/ "./src/hooks/useHelpCenterState.js":
/*!*****************************************!*\
  !*** ./src/hooks/useHelpCenterState.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useHelpCenterState: () => (/* binding */ useHelpCenterState)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/**
 * Custom hook for accessing help center Redux state
 * Provides commonly used state selectors to avoid duplication
 *
 * @return {Object} Help center state object with commonly used properties
 */

const useHelpCenterState = () => {
  return (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)(state => state.helpcenter);
};

/***/ }),

/***/ "./src/icons/arrow-long-left.svg":
/*!***************************************!*\
  !*** ./src/icons/arrow-long-left.svg ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgArrowLongLeft),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgArrowLongLeft = function SvgArrowLongLeft(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 17,
    height: 17,
    fill: "#4276DA",
    viewBox: "0 0 20 20"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fillRule: "evenodd",
    d: "M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10",
    clipRule: "evenodd"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNyIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSIjNDI3NkRBIj4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOCAxMGEuNzUuNzUgMCAwIDEtLjc1Ljc1SDQuNjZsMi4xIDEuOTVhLjc1Ljc1IDAgMSAxLTEuMDIgMS4xbC0zLjUtMy4yNWEuNzUuNzUgMCAwIDEgMC0xLjFsMy41LTMuMjVhLjc1Ljc1IDAgMSAxIDEuMDIgMS4xbC0yLjEgMS45NWgxMi41OUEuNzUuNzUgMCAwIDEgMTggMTBaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+Cjwvc3ZnPg==");

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
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgClose = function SvgClose(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 17,
    height: 17,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#A1A7B6",
    d: "M5.338 4.437a.637.637 0 1 0-.901.901L7.598 8.5l-3.161 3.162a.638.638 0 0 0 .901.901L8.5 9.402l3.162 3.161a.638.638 0 0 0 .901-.901L9.402 8.5l3.161-3.162a.638.638 0 0 0-.901-.901L8.5 7.598z"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9Imhlcm9pY29ucy1taW5pL3gtbWFyayI+CjxwYXRoIGlkPSJVbmlvbiIgZD0iTTUuMzM4MjggNC40MzY3MkM1LjA4OTMyIDQuMTg3NzYgNC42ODU2OCA0LjE4Nzc2IDQuNDM2NzIgNC40MzY3MkM0LjE4Nzc2IDQuNjg1NjggNC4xODc3NiA1LjA4OTMyIDQuNDM2NzIgNS4zMzgyOEw3LjU5ODQ0IDguNUw0LjQzNjcyIDExLjY2MTdDNC4xODc3NiAxMS45MTA3IDQuMTg3NzYgMTIuMzE0MyA0LjQzNjcyIDEyLjU2MzNDNC42ODU2OCAxMi44MTIyIDUuMDg5MzIgMTIuODEyMiA1LjMzODI4IDEyLjU2MzNMOC41IDkuNDAxNTZMMTEuNjYxNyAxMi41NjMzQzExLjkxMDcgMTIuODEyMiAxMi4zMTQzIDEyLjgxMjIgMTIuNTYzMyAxMi41NjMzQzEyLjgxMjIgMTIuMzE0MyAxMi44MTIyIDExLjkxMDcgMTIuNTYzMyAxMS42NjE3TDkuNDAxNTYgOC41TDEyLjU2MzMgNS4zMzgyOEMxMi44MTIyIDUuMDg5MzIgMTIuODEyMiA0LjY4NTY4IDEyLjU2MzMgNC40MzY3MkMxMi4zMTQzIDQuMTg3NzYgMTEuOTEwNyA0LjE4Nzc2IDExLjY2MTcgNC40MzY3Mkw4LjUgNy41OTg0NEw1LjMzODI4IDQuNDM2NzJaIiBmaWxsPSIjQTFBN0I2Ii8+CjwvZz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./src/icons/dislike-help.svg":
/*!************************************!*\
  !*** ./src/icons/dislike-help.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgDislikeHelp),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2, _path3, _path4, _path5, _path6;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgDislikeHelp = function SvgDislikeHelp(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 97,
    height: 82,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#ECF1F9",
    fillOpacity: 0.53,
    d: "M94.282 49.475c-.595-1.15-.367-2.762-.578-4.06-.264-1.619-.962-3.137-1.707-4.637-2.545-5.119-6.678-9.246-11.664-12.594-10.8-7.253-25.52-8.786-38.63-7.418-7.315.764-13.61 4.056-16.536 10.47-1.955 4.287-.097 7.155 3.043 10.21 2.635 2.563 6.212 5.627 4.845 9.516-2.236 6.36-13.937 7.321-11.882 15.684 3.16 12.86 26.217 11.642 36.51 10.062 13.352-2.05 39.26-8.764 36.768-25.53-.193-1.299-.734-2.55-.752-3.877m-72.02-5.912c-.502 5.553-7.478 6.812-12.369 5.309-6.01-1.847-7.188-7.979-4.597-12.94 2.195-4.203 7.05-5.48 11.42-3.498 4.86 2.203 5.825 7.534 5.46 12.167"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#798199",
    fillOpacity: 0.7,
    d: "M74.645 49.06a.683.683 0 0 1-.743-.616l-.982-9.958c-.147-1.491-1.549-2.58-3.124-2.427h-.006a2.93 2.93 0 0 0-1.956 1.006 2.62 2.62 0 0 0-.636 1.986l.906 9.203a.684.684 0 0 1-.612.75.683.683 0 0 1-.744-.616l-.906-9.204a4.01 4.01 0 0 1 .961-3.017 4.29 4.29 0 0 1 2.855-1.478h.009c2.32-.225 4.389 1.415 4.611 3.66l.982 9.958a.684.684 0 0 1-.612.75z"
  })), _path3 || (_path3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#798199",
    fillOpacity: 0.7,
    d: "M61.774 71.41c-2.017.128-3.887-1.453-4.413-1.94-1.893-1.76-4.487-5.54-8.155-11.898-.61-1.054-5.827-11.275-6.207-12.026a3.96 3.96 0 0 1-.508-3.026 4.1 4.1 0 0 1 1.93-2.606c1.985-1.178 4.59-.59 5.81 1.315l.033.057 3.463 6.745a.686.686 0 0 1-.293.924.68.68 0 0 1-.92-.297l-3.447-6.716c-.834-1.269-2.598-1.652-3.952-.848a2.75 2.75 0 0 0-1.3 1.74 2.58 2.58 0 0 0 .346 1.995l.032.057c.055.11 5.587 10.95 6.19 11.992 3.548 6.15 6.134 9.938 7.9 11.58.876.811 2.221 1.653 3.377 1.58l14.007-1.351.044-.005c1.107-.106 2.405-1.554 2.766-2.707 1.072-3.413 1.802-6.22 2.373-10.467.17-1.276.33-5.395.256-6.575l-.653-6.767c-.147-1.491-1.562-2.593-3.13-2.424a2.93 2.93 0 0 0-1.956 1.006 2.62 2.62 0 0 0-.636 1.986l.457 5.135a.68.68 0 0 1-.613.744h-.005a.68.68 0 0 1-.742-.622l-.456-5.13a4.01 4.01 0 0 1 .962-3.01 4.27 4.27 0 0 1 2.854-1.476h.012c2.321-.225 4.39 1.415 4.612 3.66l.655 6.79c.088 1.38-.095 5.616-.264 6.87-.642 4.797-1.549 7.917-2.422 10.698-.45 1.435-2.052 3.477-3.914 3.657l-.089.009-14.007 1.351z"
  })), _path4 || (_path4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#798199",
    fillOpacity: 0.7,
    d: "M60.315 48.883a.683.683 0 0 1-.744-.617l-2.128-21.5c-.147-1.492-1.549-2.58-3.124-2.428h-.006a2.93 2.93 0 0 0-1.956 1.007 2.62 2.62 0 0 0-.636 1.985l2.084 20.946a.684.684 0 0 1-.612.75.683.683 0 0 1-.744-.617l-2.084-20.945a4.01 4.01 0 0 1 .961-3.018 4.29 4.29 0 0 1 2.855-1.478h.012c2.32-.225 4.389 1.415 4.611 3.66l2.128 21.5a.684.684 0 0 1-.611.751z"
  })), _path5 || (_path5 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#798199",
    fillOpacity: 0.7,
    d: "M67.494 49.056a.683.683 0 0 1-.744-.617l-1.222-12.26c-.147-1.492-1.548-2.58-3.124-2.428H62.4a2.93 2.93 0 0 0-1.956 1.007 2.62 2.62 0 0 0-.636 1.985L60.955 48.4a.684.684 0 0 1-.612.75.683.683 0 0 1-.743-.616L58.45 36.88a4.01 4.01 0 0 1 .961-3.018 4.29 4.29 0 0 1 2.855-1.478h.009c2.32-.224 4.389 1.416 4.611 3.66l1.222 12.261a.684.684 0 0 1-.612.75zM81.35 23.768 63.084 25.53a.685.685 0 0 1-.132-1.364l18.265-1.762a2.956 2.956 0 0 0 2.646-3.232L82.54 5.444a2.956 2.956 0 0 0-3.216-2.666L25.42 7.978a2.956 2.956 0 0 0-2.646 3.232l1.324 13.726a2.956 2.956 0 0 0 3.215 2.666l17.954-1.733a.685.685 0 0 1 .132 1.364l-17.954 1.733c-2.365.228-4.474-1.522-4.703-3.899l-1.324-13.726c-.23-2.377 1.508-4.499 3.87-4.727l53.903-5.2c2.365-.229 4.473 1.522 4.703 3.898l1.324 13.727c.23 2.38-1.508 4.498-3.87 4.726z"
  })), _path6 || (_path6 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#798199",
    fillOpacity: 0.7,
    d: "m32.308 10.404 1.243-.12 1.22 12.636-1.244.12zm1.396 5.709 7.49-.723.117 1.21-7.49.722zm6.257-6.448 1.243-.12 1.22 12.637-1.244.12zM44.316 9.245l1.244-.12 1.22 12.637-1.244.12zm.856-.082 7.215-.697.113 1.165-7.216.696zm.558 5.78 6.265-.604.112 1.164-6.265.605zm.55 5.695 7.214-.697.113 1.165-7.215.696zM54.892 8.225l1.243-.12 1.22 12.636-1.244.12zm1.99 11.39 7.188-.694.112 1.165-7.189.693zM65.038 7.246l1.244-.12L67.5 19.762l-1.244.12zm1.54 6.485 4.018-.387q.733-.07 1.264-.465a2.3 2.3 0 0 0 .776-1.03q.248-.638.172-1.44c-.052-.532-.201-1.002-.445-1.39a2.3 2.3 0 0 0-.96-.87 2.47 2.47 0 0 0-1.329-.214l-4.018.388-.112-1.165 3.959-.381q1.123-.11 2.024.291a3.34 3.34 0 0 1 1.457 1.233q.555.834.668 1.989c.074.771-.019 1.454-.276 2.068a3.35 3.35 0 0 1-1.196 1.483q-.809.564-1.931.673l-3.958.382z"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTciIGhlaWdodD0iODIiIHZpZXdCb3g9IjAgMCA5NyA4MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTk0LjI4MTggNDkuNDc0NkM5My42ODcgNDguMzI0MSA5My45MTQ5IDQ2LjcxMyA5My43MDM1IDQ1LjQxNDlDOTMuNDQwMSA0My43OTYxIDkyLjc0MjQgNDIuMjc4NCA5MS45OTY2IDQwLjc3OEM4OS40NTIxIDM1LjY1OTQgODUuMzE4OCAzMS41MzI0IDgwLjMzMzMgMjguMTg0NEM2OS41MzI4IDIwLjkzMDggNTQuODEzNyAxOS4zOTc4IDQxLjcwMzggMjAuNzY2NEMzNC4zODgxIDIxLjUzMDEgMjguMDkyOSAyNC44MjIyIDI1LjE2NzQgMzEuMjM2MUMyMy4yMTE4IDM1LjUyMzQgMjUuMDY5OCAzOC4zOTExIDI4LjIwOTcgNDEuNDQ1MkMzMC44NDU0IDQ0LjAwODUgMzQuNDIyMSA0Ny4wNzM0IDMzLjA1NDggNTAuOTYxOEMzMC44MTg1IDU3LjMyMjYgMTkuMTE4NCA1OC4yODM1IDIxLjE3MyA2Ni42NDU5QzI0LjMzMjUgNzkuNTA1NCA0Ny4zODk5IDc4LjI4ODUgNTcuNjgyNyA3Ni43MDc5QzcxLjAzNDcgNzQuNjU3OCA5Ni45NDM2IDY3Ljk0MzkgOTQuNDUwNiA1MS4xNzcxQzk0LjI1NzYgNDkuODc5MyA5My43MTY4IDQ4LjYyNzYgOTMuNjk4OSA0Ny4zMDEzTTIxLjY3OTMgNDEuMzg5M0MyMS4xNzY3IDQ2Ljk0MjEgMTQuMjAwOSA0OC4yMDA4IDkuMzA5OTYgNDYuNjk3OEMzLjMwMDc2IDQ0Ljg1MTIgMi4xMjIwMiAzOC43MTkxIDQuNzEzIDMzLjc1NzVDNi45MDc2NSAyOS41NTQ3IDExLjc2MjkgMjguMjc4NiAxNi4xMzI3IDMwLjI1OTdDMjAuOTkzOCAzMi40NjM0IDIxLjk1ODEgMzcuNzkzOSAyMS41OTI4IDQyLjQyNjgiIGZpbGw9IiNFQ0YxRjkiIGZpbGwtb3BhY2l0eT0iMC41MyIvPgo8cGF0aCBkPSJNNzQuNjQ1MyA0OS4wNjAyQzc0LjI3MjIgNDkuMDk2MiA3My45MzggNDguODIxOSA3My45MDE1IDQ4LjQ0MzZMNzIuOTE5OCAzOC40ODY1QzcyLjc3MjkgMzYuOTk0NyA3MS4zNzEgMzUuOTA2NiA2OS43OTU5IDM2LjA1ODVMNjkuNzkgMzYuMDU5MUM2OS4wMjAyIDM2LjEzMzQgNjguMzI1NyAzNi40OTIgNjcuODM0MiAzNy4wNjU0QzY3LjM1MDcgMzcuNjI5MSA2Ny4xMjU4IDM4LjMzMzEgNjcuMTk4IDM5LjA1MDZMNjguMTA0IDQ4LjI1NDVDNjguMTQwNSA0OC42MzI4IDY3Ljg2ODEgNDguOTY4NiA2Ny40OTIxIDQ5LjAwNDlDNjcuMTE5IDQ5LjA0MDkgNjYuNzg0OCA0OC43NjY2IDY2Ljc0ODMgNDguMzg4M0w2NS44NDIzIDM5LjE4NDRDNjUuNzM2NSAzOC4wODg0IDY2LjA3NTYgMzcuMDE4NyA2Ni44MDMyIDM2LjE2NjlDNjcuNTIyOCAzNS4zMjUgNjguNTM2IDM0LjgwMDQgNjkuNjU3OCAzNC42ODkxTDY5LjY2NjcgMzQuNjg4M0M3MS45ODc5IDM0LjQ2NDMgNzQuMDU1NiAzNi4xMDQ0IDc0LjI3ODIgMzguMzQ5NEw3NS4yNTk4IDQ4LjMwNjZDNzUuMjk2MyA0OC42ODQ4IDc1LjAyMzkgNDkuMDIwNyA3NC42NDc5IDQ5LjA1N0w3NC42NDUzIDQ5LjA2MDJaIiBmaWxsPSIjNzk4MTk5IiBmaWxsLW9wYWNpdHk9IjAuNyIvPgo8cGF0aCBkPSJNNjEuNzc0IDcxLjQwOThDNTkuNzU3NCA3MS41MzgyIDU3Ljg4NjYgNjkuOTU3MyA1Ny4zNjE1IDY5LjQ2OTlDNTUuNDY3NSA2Ny43MTA4IDUyLjg3MzUgNjMuOTMwMSA0OS4yMDYgNTcuNTcxN0M0OC41OTY0IDU2LjUxODQgNDMuMzc4OCA0Ni4yOTY2IDQyLjk5ODYgNDUuNTQ1N0M0Mi40MjY3IDQ0LjYzNiA0Mi4yNDg0IDQzLjU2MjEgNDIuNDkxNSA0Mi41MTk2QzQyLjc0NzcgNDEuNDI3OCA0My40MzIzIDQwLjUwMiA0NC40MjE0IDM5LjkxMzZDNDYuNDA1NiAzOC43MzYyIDQ5LjAxMTIgMzkuMzIzNSA1MC4yMzE5IDQxLjIyODdMNTAuMjY0MyA0MS4yODU3TDUzLjcyNyA0OC4wMzA1QzUzLjkwMDEgNDguMzY4NiA1My43Njk2IDQ4Ljc4MDkgNTMuNDMzNyA0OC45NTQ2QzUzLjA5NzkgNDkuMTI4MyA1Mi42ODc3IDQ4Ljk5NjUgNTIuNTE0NiA0OC42NTg1TDQ5LjA2NjYgNDEuOTQyM0M0OC4yMzMgNDAuNjczMSA0Ni40Njg4IDQwLjI5MDIgNDUuMTE1IDQxLjA5NDJDNDQuNDQ3OSA0MS40ODkyIDQzLjk4NzcgNDIuMTA3NyA0My44MTU3IDQyLjgzMzdDNDMuNjU1IDQzLjUyMjUgNDMuNzc3MyA0NC4yMzIyIDQ0LjE2MDYgNDQuODI5NEw0NC4xOTMgNDQuODg2NEM0NC4yNDgzIDQ0Ljk5NTMgNDkuNzc5NyA1NS44MzYxIDUwLjM4MjIgNTYuODc4MUM1My45MzEgNjMuMDI4NSA1Ni41MTY3IDY2LjgxNiA1OC4yODI4IDY4LjQ1ODJDNTkuMTU5IDY5LjI2OTQgNjAuNTA0MSA3MC4xMTA1IDYxLjY1OTYgNzAuMDM4MUw3NS42NjY1IDY4LjY4NjZDNzUuNjY2NSA2OC42ODY2IDc1LjY5NjEgNjguNjgzOCA3NS43MTA5IDY4LjY4MjRDNzYuODE4MiA2OC41NzU1IDc4LjExNTkgNjcuMTI3NyA3OC40NzY4IDY1Ljk3NDdDNzkuNTQ4OSA2Mi41NjE3IDgwLjI3OTMgNTkuNzU1OCA4MC44NDk1IDU1LjUwNzVDODEuMDE5MyA1NC4yMzE3IDgxLjE4MDcgNTAuMTEzIDgxLjEwNTcgNDguOTMyOUw4MC40NTI4IDQyLjE2NjRDODAuMzA1OSA0MC42NzQ2IDc4Ljg5MDcgMzkuNTcyNyA3Ny4zMjMzIDM5Ljc0MkM3Ni41NTM1IDM5LjgxNjMgNzUuODU5IDQwLjE3NDkgNzUuMzY3NCA0MC43NDgzQzc0Ljg4NCA0MS4zMTIgNzQuNjU5IDQyLjAxNiA3NC43MzEyIDQyLjczMzVMNzUuMTg3OSA0Ny44Njg3Qzc1LjIyNDEgNDguMjQzOSA3NC45NDg0IDQ4LjU3NzEgNzQuNTc1NCA0OC42MTMxTDc0LjU2OTUgNDguNjEzN0M3NC4xOTM1IDQ4LjY1IDczLjg2MTYgNDguMzY5NCA3My44MjgxIDQ3Ljk5MDhMNzMuMzcyIDQyLjg2MTZDNzMuMjY3MSA0MS43NzQ2IDczLjYwNTkgNDAuNzAxOSA3NC4zMzM1IDM5Ljg1MDFDNzUuMDUzMSAzOS4wMDgxIDc2LjA2NjMgMzguNDgzNSA3Ny4xODg0IDM4LjM3NTNMNzcuMjAwMyAzOC4zNzQxQzc5LjUyMTQgMzguMTUwMiA4MS41ODkyIDM5Ljc5MDMgODEuODExNyA0Mi4wMzUzTDgyLjQ2NjkgNDguODI1NkM4Mi41NTUzIDUwLjIwNTggODIuMzcyMiA1NC40NDA4IDgyLjIwMzQgNTUuNjk1NUM4MS41NjA1IDYwLjQ5MTkgODAuNjU0NCA2My42MTIzIDc5Ljc4MTEgNjYuMzkyOUM3OS4zMzA5IDY3LjgyODEgNzcuNzI5MSA2OS44NzA0IDc1Ljg2NjggNzAuMDVDNzUuODM3MiA3MC4wNTI5IDc1LjgwNzYgNzAuMDU1OCA3NS43NzggNzAuMDU4Nkw2MS43NzEgNzEuNDEwMUw2MS43NzQgNzEuNDA5OFoiIGZpbGw9IiM3OTgxOTkiIGZpbGwtb3BhY2l0eT0iMC43Ii8+CjxwYXRoIGQ9Ik02MC4zMTQ4IDQ4Ljg4MjhDNTkuOTQxOCA0OC45MTg4IDU5LjYwNzUgNDguNjQ0NSA1OS41NzEgNDguMjY2Mkw1Ny40NDI4IDI2Ljc2NTdDNTcuMjk1OCAyNS4yNzM5IDU1Ljg5NCAyNC4xODU4IDU0LjMxODkgMjQuMzM3OEw1NC4zMTMgMjQuMzM4M0M1My41NDMyIDI0LjQxMjYgNTIuODQ4NyAyNC43NzEyIDUyLjM1NzEgMjUuMzQ0N0M1MS44NzM2IDI1LjkwODMgNTEuNjQ4NyAyNi42MTI0IDUxLjcyMDkgMjcuMzI5OEw1My44MDQ2IDQ4LjI3NTVDNTMuODQxMSA0OC42NTM3IDUzLjU2ODggNDguOTg5NiA1My4xOTI3IDQ5LjAyNTlDNTIuODE5NyA0OS4wNjE5IDUyLjQ4NTQgNDguNzg3NiA1Mi40NDg5IDQ4LjQwOTNMNTAuMzY1MiAyNy40NjM2QzUwLjI1OTUgMjYuMzY3NyA1MC41OTg1IDI1LjI5NzkgNTEuMzI2MiAyNC40NDYyQzUyLjA0NTggMjMuNjA0MiA1My4wNTkgMjMuMDc5NiA1NC4xODA4IDIyLjk2ODRMNTQuMTkyNiAyMi45NjcyQzU2LjUxMzggMjIuNzQzMyA1OC41ODE1IDI0LjM4MzQgNTguODA0MSAyNi42Mjg0TDYwLjkzMjQgNDguMTI4OUM2MC45Njg5IDQ4LjUwNzEgNjAuNjk2NSA0OC44NDMgNjAuMzIwNSA0OC44NzkzTDYwLjMxNDggNDguODgyOFoiIGZpbGw9IiM3OTgxOTkiIGZpbGwtb3BhY2l0eT0iMC43Ii8+CjxwYXRoIGQ9Ik02Ny40OTQgNDkuMDU1OEM2Ny4xMjEgNDkuMDkxOCA2Ni43ODY3IDQ4LjgxNzUgNjYuNzUwMiA0OC40MzkzTDY1LjUyODQgMzYuMTc4N0M2NS4zODE1IDM0LjY4NjkgNjMuOTc5NiAzMy41OTg4IDYyLjQwNDUgMzMuNzUwN0w2Mi4zOTg2IDMzLjc1MTNDNjEuNjI4OCAzMy44MjU2IDYwLjkzNDMgMzQuMTg0MiA2MC40NDI4IDM0Ljc1NzZDNTkuOTU5MyAzNS4zMjEzIDU5LjczNDQgMzYuMDI1NCA1OS44MDY2IDM2Ljc0MjhMNjAuOTU1MyA0OC40MDAyQzYwLjk5MTggNDguNzc4NCA2MC43MTk0IDQ5LjExNDMgNjAuMzQzNCA0OS4xNTA2QzU5Ljk3MDMgNDkuMTg2NiA1OS42MzYxIDQ4LjkxMjIgNTkuNTk5NiA0OC41MzRMNTguNDUxMiAzNi44Nzk2QzU4LjM0NTQgMzUuNzgzNiA1OC42ODQ1IDM0LjcxMzkgNTkuNDEyMSAzMy44NjIxQzYwLjEzMTcgMzMuMDIwMiA2MS4xNDQ5IDMyLjQ5NTYgNjIuMjY2NyAzMi4zODQzTDYyLjI3NTYgMzIuMzgzNUM2NC41OTY4IDMyLjE1OTUgNjYuNjY0NSAzMy43OTk2IDY2Ljg4NzEgMzYuMDQ0Nkw2OC4xMDg5IDQ4LjMwNTJDNjguMTQ1NCA0OC42ODM0IDY3Ljg3MyA0OS4wMTkzIDY3LjQ5NyA0OS4wNTU2TDY3LjQ5NCA0OS4wNTU4WiIgZmlsbD0iIzc5ODE5OSIgZmlsbC1vcGFjaXR5PSIwLjciLz4KPHBhdGggZD0iTTgxLjM0OTQgMjMuNzY3N0w2My4wODUgMjUuNTNDNjIuNzA5IDI1LjU2NjMgNjIuMzc3NCAyNS4yODg2IDYyLjM0MTIgMjQuOTEzNEM2Mi4zMDUgMjQuNTM4MSA2Mi41ODA0IDI0LjIwMiA2Mi45NTM0IDI0LjE2Nkw4MS4yMTc4IDIyLjQwMzdDODIuODM0MyAyMi4yNDc3IDg0LjAyMTMgMjAuNzk4NiA4My44NjQ0IDE5LjE3MjVMODIuNTM5NyA1LjQ0Mjk2QzgyLjM4MjggMy44MTY4NiA4MC45NDA3IDIuNjIxMzcgNzkuMzI0MSAyLjc3NzM0TDI1LjQxOTIgNy45NzgzOUMyMy44MDI2IDguMTM0MzcgMjIuNjE1NyA5LjU4MzUyIDIyLjc3MjYgMTEuMjA5NkwyNC4wOTcgMjQuOTM2MkMyNC4yNTM5IDI2LjU2MjMgMjUuNjk2IDI3Ljc1NzggMjcuMzEyNSAyNy42MDE4TDQ1LjI2NiAyNS44Njk1QzQ1LjY0MjEgMjUuODMzMyA0NS45NzM2IDI2LjExMDkgNDYuMDA5OCAyNi40ODYxQzQ2LjA0NjEgMjYuODYxNCA0NS43NzA3IDI3LjE5NzYgNDUuMzk3NyAyNy4yMzM2TDI3LjQ0NDEgMjguOTY1OEMyNS4wNzg2IDI5LjE5NDEgMjIuOTcwMyAyNy40NDM2IDIyLjc0MSAyNS4wNjdMMjEuNDE2NiAxMS4zNDA1QzIxLjE4NzMgOC45NjM4NSAyMi45MjQ5IDYuODQyMzMgMjUuMjg3NSA2LjYxNDM4TDc5LjE4OTYgMS40MTM2MUM4MS41NTUxIDEuMTg1MzcgODMuNjYzNCAyLjkzNTgxIDgzLjg5MjcgNS4zMTI0MUw4NS4yMTcxIDE5LjAzOUM4NS40NDY3IDIxLjQxODYgODMuNzA4OCAyMy41MzcxIDgxLjM0NjIgMjMuNzY1TDgxLjM0OTQgMjMuNzY3N1oiIGZpbGw9IiM3OTgxOTkiIGZpbGwtb3BhY2l0eT0iMC43Ii8+CjxwYXRoIGQ9Ik0zMi4zMDc2IDEwLjQwMzlMMzMuNTUxMSAxMC4yODM5TDM0Ljc3MDMgMjIuOTIwNEwzMy41MjY5IDIzLjA0MDRMMzIuMzA3NiAxMC40MDM5Wk0zMy43MDQxIDE2LjExMjdMNDEuMTk0NiAxNS4zODk5TDQxLjMxMTMgMTYuNTk5MUwzMy44MjA4IDE3LjMyMThMMzMuNzA0MSAxNi4xMTI3Wk0zOS45NjEgOS42NjU0M0w0MS4yMDQ0IDkuNTQ1NDVMNDIuNDIzNyAyMi4xODJMNDEuMTgwMiAyMi4zMDJMMzkuOTYxIDkuNjY1NDNaIiBmaWxsPSIjNzk4MTk5IiBmaWxsLW9wYWNpdHk9IjAuNyIvPgo8cGF0aCBkPSJNNDQuMzE2NCA5LjI0NTE4TDQ1LjU1OTkgOS4xMjUyTDQ2Ljc3OTEgMjEuNzYxN0w0NS41MzU2IDIxLjg4MTdMNDQuMzE2NCA5LjI0NTE4Wk00NS4xNzIgOS4xNjI2Mkw1Mi4zODcyIDguNDY2NDZMNTIuNDk5NiA5LjYzMDk0TDQ1LjI4NDQgMTAuMzI3MUw0NS4xNzIgOS4xNjI2MlpNNDUuNzI5OCAxNC45NDMzTDUxLjk5NDYgMTQuMzM4OUw1Mi4xMDY5IDE1LjUwMzNMNDUuODQyMSAxNi4xMDc4TDQ1LjcyOTggMTQuOTQzM1pNNDYuMjc5MiAyMC42Mzc2TDUzLjQ5NDQgMTkuOTQxNUw1My42MDY3IDIxLjEwNkw0Ni4zOTE2IDIxLjgwMjFMNDYuMjc5MiAyMC42Mzc2WiIgZmlsbD0iIzc5ODE5OSIgZmlsbC1vcGFjaXR5PSIwLjciLz4KPHBhdGggZD0iTTU0Ljg5MTYgOC4yMjQ3OUw1Ni4xMzUxIDguMTA0ODFMNTcuMzU0MyAyMC43NDEzTDU2LjExMDggMjAuODYxM0w1NC44OTE2IDguMjI0NzlaTTU2Ljg4MTEgMTkuNjE0N0w2NC4wNjk2IDE4LjkyMTFMNjQuMTgxOSAyMC4wODU2TDU2Ljk5MzQgMjAuNzc5Mkw1Ni44ODExIDE5LjYxNDdaIiBmaWxsPSIjNzk4MTk5IiBmaWxsLW9wYWNpdHk9IjAuNyIvPgo8cGF0aCBkPSJNNjUuMDM4MSA3LjI0NTg1TDY2LjI4MTYgNy4xMjU4N0w2Ny41MDA4IDE5Ljc2MjRMNjYuMjU3MyAxOS44ODI0TDY1LjAzODEgNy4yNDU4NVpNNjYuNTc4MiAxMy43MzEzTDcwLjU5NTkgMTMuMzQzN0M3MS4wODQ0IDEzLjI5NjYgNzEuNTA1NyAxMy4xNDE3IDcxLjg1OTkgMTIuODc5MUM3Mi4yMTQxIDEyLjYxNjQgNzIuNDcwOCAxMi4yNzMgNzIuNjM2IDExLjg0ODNDNzIuODAxMiAxMS40MjM1IDcyLjg1OTQgMTAuOTQzIDcyLjgwOCAxMC40MDk5QzcyLjc1NjUgOS44NzY3OSA3Mi42MDY3IDkuNDA3MyA3Mi4zNjMgOS4wMTg5OUM3Mi4xMTk0IDguNjMwNjkgNzEuNzk4NSA4LjM0MDAyIDcxLjQwMzYgOC4xNDk2N0M3MS4wMDU3IDcuOTU5NiA3MC41NjU1IDcuODg3ODUgNzAuMDc0IDcuOTM1MjdMNjYuMDU2NCA4LjMyMjkyTDY1Ljk0NDEgNy4xNTg0NEw2OS45MDI1IDYuNzc2NTFDNzAuNjUxNSA2LjcwNDIzIDcxLjMyNzMgNi44MDEzNSA3MS45MjY4IDcuMDY4MTVDNzIuNTI5MiA3LjMzNDY3IDczLjAxNCA3Ljc0NDc5IDczLjM4NDUgOC4zMDEyMkM3My43NTQ5IDguODU3NjQgNzMuOTc3IDkuNTE4NTYgNzQuMDUxNSAxMC4yODk5Qzc0LjEyNTkgMTEuMDYxMyA3NC4wMzMzIDExLjc0MzUgNzMuNzc1OCAxMi4zNTc1QzczLjUxODMgMTIuOTcxNSA3My4xMjA2IDEzLjQ2MzggNzIuNTgwMiAxMy44NDA2QzcyLjAzOTggMTQuMjE3NCA3MS4zOTgxIDE0LjQ0MTYgNzAuNjQ5IDE0LjUxMzlMNjYuNjkwNiAxNC44OTU4TDY2LjU3ODIgMTMuNzMxM1oiIGZpbGw9IiM3OTgxOTkiIGZpbGwtb3BhY2l0eT0iMC43Ii8+Cjwvc3ZnPgo=");

/***/ }),

/***/ "./src/icons/footer.svg":
/*!******************************!*\
  !*** ./src/icons/footer.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgFooter),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2, _ellipse, _path3, _path4, _path5, _path6, _path7, _path8, _path9, _path0, _path1, _path10, _path11, _path12, _path13, _path14, _path15, _path16, _path17, _path18, _path19, _path20, _path21, _path22, _path23, _path24, _path25, _path26, _path27, _path28, _path29, _path30, _path31, _path32, _path33, _path34, _path35, _path36, _path37;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgFooter = function SvgFooter(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlSpace: "preserve",
    fillRule: "evenodd",
    strokeLinejoin: "round",
    strokeMiterlimit: 2,
    clipRule: "evenodd",
    viewBox: "0 0 1269 804"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#acd0ff",
    d: "M0 37.5h1268.2v766H0z"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#acd0ff",
    fillRule: "nonzero",
    d: "m634.1 0 287 248.5H347L634.2 0Z"
  })), _ellipse || (_ellipse = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ellipse", {
    cx: 84.5,
    cy: 79.5,
    fill: "#d6e8ff",
    fillOpacity: 0.3,
    rx: 84.5,
    ry: 79.5,
    transform: "matrix(4 0 0 4 180 83.6)"
  })), _path3 || (_path3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1207 767.8c0 4.3-60.3 22.2-101.1 3.7-9.4-4.2-8-.2-18.8.6-18.4 1.3-39.3-.5-39.3-4 0-3.7 22.4-6.5 37-6.3 18.8.2 41.5-4.6 66.8-4.6 47 0 55.4 6.3 55.4 10.6"
  })), _path4 || (_path4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1159 671.6h4.3v94.9h-4.3z"
  })), _path5 || (_path5 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1163.8 767.4h-5.6v-96.3h5.6zm-4.4-1.2h3.2v-93.8h-3.2z"
  })), _path6 || (_path6 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "nonzero",
    d: "M1148.3 766.5a18.9 18.9 0 0 1 25.4 0c2 2.7-26 4-25.4 0"
  })), _path7 || (_path7 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1159.8 769.7c-4.5 0-8.7-.4-10.6-1.3-1.4-.6-1.6-1.4-1.5-2v-.2l.2-.1a19.5 19.5 0 0 1 26.2 0 1 1 0 0 1 0 1.3c-1 1.4-7.9 2.3-14.3 2.3m-10.8-3 .7.6c4.8 2 21.4 1 23.4-.5a18.3 18.3 0 0 0-24.1 0Z"
  })), _path8 || (_path8 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "nonzero",
    d: "M1175.2 671a18.9 18.9 0 0 1-28.4 0z"
  })), _path9 || (_path9 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1174.6 670.9c-2.7 3-6.2 5-10.1 6a17.8 17.8 0 0 1-17.1-5.9l-.5.5h28.4c.2 0 .7 0 .6-.4 0-.3-.6-.4-.8-.4h-28.4c-.2 0-.8.1-.5.5a20 20 0 0 0 29.7.1c.3-.4-1-.8-1.3-.4"
  })), _path0 || (_path0 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1119 664.7h86.4v6H1119z"
  })), _path1 || (_path1 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1206.2 671.4h-87.6V664h87.6zm-86.4-1.3h85.2v-4.9h-85.2v5Z"
  })), _path10 || (_path10 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#e70070",
    fillRule: "nonzero",
    d: "M1046.4 681.9v-.2l1.3-.9.1.2c-.5.2-1 .5-1.4.9m-14.5 9.8v-.1c5-2.3 7.8-4.6 10.5-6.8l2.9-2.3.1.1-2.9 2.3c-2.7 2.2-5.5 4.5-10.6 6.8"
  })), _path11 || (_path11 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "nonzero",
    d: "M1026.4 693.8c15.8-5.5 15.4-11 26.7-15.5a38 38 0 0 1 22.7-2.3c27.5 5.8 39.3 10.6 49.5 19.3 23 19.7-12.7 57-10.5 60s4.6 7.2 7.7 8.7c1.3.7 2.5 1.3 3.6 1.7.8.4.5 2.5-.4 2.5h-6.9c-3.9 0-7.5-4.7-10.7-6-3.2-1.4 1.2-5.9 1.2-7.8 0-11.8 1.6-34.4-7.3-36.3-16.3-3.5-31.6 2.7-48.8 2.4a46.3 46.3 0 0 1-41.3-24.2s4 1.2 14.5-2.5"
  })), _path12 || (_path12 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1123.1 768.9h-4.3c-2.6 0-5-2-7.3-3.7a18 18 0 0 0-3.6-2.5 2.3 2.3 0 0 1-1.4-1.4c-.5-1.3.4-3 1.2-4.5.5-1 1-1.9 1-2.4v-4.8c.2-11.7.5-29.3-6.9-31-9.4-2-18.5-.6-28.1.7-6.6 1-13.4 2-20.5 1.8a52 52 0 0 1-24-6.3 43.3 43.3 0 0 1-17.8-18.2l-.7-1.4 1.4.5s4 1.1 14-2.4a45 45 0 0 0 16-9 39.5 39.5 0 0 1 33.9-9c27.2 5.9 39.2 10.6 49.7 19.5 7.6 6.6 9.7 15.7 6.4 27.4-2.8 9.6-8.8 19-12.7 25.3-2.1 3.3-4.3 6.7-4.1 7.4l1.2 1.7c1.8 2.7 4 5.7 6.4 6.9 1 .6 2.3 1.1 3.5 1.7.8.3 1 1.4.7 2.2-.1.9-.7 1.5-1.3 1.5zm-31.8-52.5c3.7 0 7.3.3 10.8 1 8.3 1.9 8 19.4 7.9 32.2v4.8c0 .8-.6 1.8-1.2 3s-1.5 2.7-1.2 3.5l.3.4.5.3c1.2.5 2.5 1.5 3.9 2.6 2.1 1.7 4.3 3.4 6.6 3.4h6.8c.2-.2.2-.5.2-.7v-.6l-3.6-1.7a21.7 21.7 0 0 1-6.8-7.3l-1.2-1.7c-.8-1 .4-3 4-8.8 8.2-12.8 23.3-36.7 6.6-51-10.3-8.9-22.2-13.5-49.2-19.2a38 38 0 0 0-22.4 2.3c-5 2-7.6 4-10.5 6.4-3.6 3-7.4 6-16.2 9.1a35 35 0 0 1-13.5 2.7c3.8 7 9.6 12.8 16.6 16.6 7.2 4 15.3 6 23.5 6.2 7 .1 13.8-.8 20.3-1.8 6-.9 12-1.7 17.8-1.7"
  })), _path13 || (_path13 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1068.4 675.2s-16.9-13-15.9-19.6c0 0 17.8 17.6 33.8 18.7a63 63 0 0 0 27.1-3.5c6.8 3.7 11.8 9.8 11.8 15 0 1.8-.8 4.5-2.1 7.7-10.3-7.5-29.2-15.2-54.7-18.3"
  })), _path14 || (_path14 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "nonzero",
    d: "M1080.6 753c-3.1 3.7-5 6.3-4.3 7 2.7 2.4 13 6.8 13 6.8a.8.8 0 0 1 .4 1l-.3.4-.5.2h-6.8c-1.8-.2-3-.7-4.7-.7-2.8 0-5.6.3-8.4.6a2.2 2.2 0 0 1-2.2-3c.7-1.8 2.3-4 3.3-7.2l2.5-7.5z"
  })), _path15 || (_path15 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1085.2 769a53 53 0 0 1-7.7-.6q-4.2 0-8.4.6h-.1a2.9 2.9 0 0 1-2.7-3.8c.3-1 .8-2 1.3-2.8l2-4.5 2.4-7.5.2-.6 9.5 2.8-.6.7c-3.9 4.6-4.3 6-4.3 6.2a75 75 0 0 0 12.7 6.7h.1c.3.2.5.5.6.8v.9a1.5 1.5 0 0 1-1.4 1s-1.6.2-3.6.2Zm-7.7-1.9 2.4.3 2.3.4h6.8v-.2l.1-.1v-.1c-1-.4-10.6-4.5-13.2-7-.8-.7-.4-2.1 3.7-7.1l-6.5-2-2.3 7a33 33 0 0 1-2.1 4.7c-.5.8-.9 1.7-1.2 2.6l-.1.8a1.6 1.6 0 0 0 .8 1.2l.8.2a79 79 0 0 1 8.5-.7"
  })), _path16 || (_path16 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "nonzero",
    d: "M1073.6 591.1c-2.8-3.7-3.6-12.7 3.8-16.3 11.2-5.5 24.9 9 17.5 17-3.2 3.6.1 7.6-.8 9.2-1 1.6-2.3 1-3.3 1.5-1.9 1-3 3.7-6 4.3-3.3.8-5.3-2.7-6.4-3-3.2-1-12.3 1.8-7 14.8-23.6 2.5-31.4-11.5-31.4-11.5 7.5-4.2 16.7.5 33.6-16"
  })), _path17 || (_path17 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1066 619.5a35 35 0 0 1-19.5-5.2 22 22 0 0 1-7-7l-.3-.4.5-.3c2.5-1.4 5-1.9 8-2.4 6.2-1 14-2.4 25-13.1a13 13 0 0 1-1.4-9.6 10.6 10.6 0 0 1 5.8-7.3 12.8 12.8 0 0 1 10-.5 17 17 0 0 1 7.9 5.7c3.3 4.5 3.5 9.4.4 12.9-1.9 2-1.4 4.2-.9 6 .3 1.2.6 2.2.1 3a2.7 2.7 0 0 1-2.6 1.5l-1 .2-1.7 1.6a8.5 8.5 0 0 1-4.4 2.9c-2.6.5-4.5-1.2-5.7-2.3a5 5 0 0 0-1-.8c-1.3-.5-4.2 0-6 2-1.7 1.8-3 5.3-.3 12l.3.7-.9.1-5.4.3Zm-25.1-12.2c1.7 2.5 10 12.5 29.5 10.8-2.5-6.8-1-10.6.8-12.5a7.8 7.8 0 0 1 7.4-2.4c.6.2 1 .6 1.5 1 1 1 2.6 2.5 4.6 2 1.7-.3 2.7-1.4 3.7-2.5.6-.7 1.3-1.2 2-1.7.5-.3 1-.4 1.5-.4.7 0 1.2-.1 1.7-.9.2-.3 0-1.2-.3-2-.5-2-1.1-4.7 1.2-7.3 3.2-3.5 1.8-8.1-.5-11.2-4.7-6.2-11.7-7.1-16.4-4.9a9.4 9.4 0 0 0-5.1 6.5c-.9 3.6.2 7.2 1.6 9l.3.4-.4.4a43 43 0 0 1-26 13.8c-2.7.5-5 .9-7.1 2Z"
  })), _path18 || (_path18 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "nonzero",
    d: "M1040 607s7.8 14 31.3 11.6a61 61 0 0 0 19.4 29.2 36 36 0 0 0 8.3 5.2c14.8 6.7 15.2-1.2 34.5 1.2 12.2 1.5 15.5 6.5 15.2 8.5h-8.6a9.3 9.3 0 0 0-6-2.3c-4.1 0-10.5 4.2-16.3 7.7a49.1 49.1 0 0 1-40.2 3.9c-12-5-25.1-16.4-25.1-16.4 0 9 15.9 19.6 15.9 19.6-7 .1-10.4 1.1-15.3 3-11.3 4.5-10.9 10-26.7 15.6-10.5 3.7-14.5 2.4-14.5 2.4-3.8-8-7.5-19-7.5-31.5 0-23.7 19.6-46.7 35.6-57.6Z"
  })), _path19 || (_path19 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1014 697c-.7.1-1.5 0-2.3-.2h-.2l-.1-.3c-3.5-7-7.6-18.3-7.6-31.8 0-23 18.6-46.3 35.8-58.1l1-.7v1c.9 1.4 9 13.3 30.6 11h.5l.2.5c4.3 11.9 8.7 20 19.2 29a35 35 0 0 0 8.2 5 22 22 0 0 0 16.6 2c4-.9 9-1.9 17.6-.8 9.6 1.1 13.4 4.3 14.8 6.2.7 1 1.1 2.1 1 3v.5h-9.4l-.2-.2a8.7 8.7 0 0 0-5.5-2c-3.7 0-9 3.2-14.3 6.4l-1.7 1a49.9 49.9 0 0 1-40.8 4c-10-4-20.7-12.5-24.1-15.4 1.5 8.2 15.3 17.5 15.4 17.6l1.6 1-2 .1c-6.6.2-10 1-15 3a35 35 0 0 0-10.4 6.5c-3.7 3-7.4 6-16.3 9.1a38.7 38.7 0 0 1-12.5 2.7Zm-1.6-1.3c1 .2 5 .6 13.8-2.5 8.6-3 12.3-6 15.9-8.9 2.9-2.4 5.6-4.6 10.8-6.6 4.5-1.8 8-2.8 13.6-3-4-3-14.6-11.5-14.6-19v-1.4l1 .9c.1 0 13.2 11.4 25 16.2 5 2.1 23.5 6 39.6-3.9l1.7-1c5.4-3.3 11-6.7 15-6.7 2.2 0 4.4.8 6.1 2.3h7.8a4 4 0 0 0-.8-1.6c-1-1.3-4.4-4.5-13.9-5.7-8.5-1-13.2 0-17.3.8-5 1-9 1.8-17.3-2-3-1.4-6-3.1-8.5-5.3-10.6-9-15-17.2-19.4-29-14.5 1.3-23-3.3-27.7-7.5a21.3 21.3 0 0 1-3.4-3.8c-16.8 11.7-34.8 34.3-34.8 56.7 0 13 4 24 7.4 31m106.9 50.5-8.6-2.2-1.2-.3c-.5 0-.7.7-.2.8l8.6 2.2 1.2.3h.2l.2-.3a.4.4 0 0 0-.2-.5"
  })), _path20 || (_path20 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1087.7 645.4a29.3 29.3 0 0 0-13.3 15 28.8 28.8 0 0 0-1.7 10.6l.3.2c.1 0 .2 0 .3-.2l.1-.3a27.6 27.6 0 0 1 14.7-24.6c.5-.2 0-1-.4-.7"
  })), _path21 || (_path21 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1086.6 644.3c-2.4.5-4.6 2-6.4 3.6a25.5 25.5 0 0 0-4.7 5.8 35.2 35.2 0 0 0-3 6.8l-.6 1.8-.5 1.8-.2 1-.2.8-.4 1.9-1.2-.2.5-2 .2-.9.2-.9.6-1.8.6-1.8a27.4 27.4 0 0 1 8.3-12.8c2-1.7 4.2-3 6.7-3.6zm-36.6-26c-2.5-1-4.8-2.3-7-3.8a27.1 27.1 0 0 1-5.7-5.5l.6-.4a26 26 0 0 0 5.4 5.6c2 1.6 4.3 3 6.6 4.1Zm22.1 2.5c-2.6.8-5.3 1.2-8 1 2.7-.2 5.3-.7 7.8-1.6z"
  })), _path22 || (_path22 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#66a8f7",
    fillRule: "nonzero",
    d: "M1056.3 648a6.8 6.8 0 1 0 0-13.5 6.8 6.8 0 0 0 0 13.6Zm-16.6-19a5.8 5.8 0 1 0 0-11.6 5.8 5.8 0 0 0 0 11.5Zm-7.8 39.2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11m-14.2-15.2a4.9 4.9 0 1 0 0-9.8 4.9 4.9 0 0 0 0 9.7Zm33.9 15.6a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8m-18.1-21.1a2.9 2.9 0 1 0 0-5.7 2.9 2.9 0 0 0 0 5.7m31.6 9.8a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2m-47.4 25.5a5.6 5.6 0 1 0 0-11.1 5.6 5.6 0 0 0 0 11.1m52.3-48.2a3.2 3.2 0 1 0 0-6.3 3.2 3.2 0 0 0 0 6.3"
  })), _path23 || (_path23 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1074.5 674.4a30.5 30.5 0 0 0-17-.8l-2 .5-1 .3-.6.2-.5.2-2 .9-.9.4-1 .5c-2.4 1.4-4.8 3.1-7.1 4.7l-7.2 5a41.6 41.6 0 0 1-15.9 7 36 36 0 0 1-8.7.5v-.7h4.3a38.3 38.3 0 0 0 12.4-3.3q3.9-1.8 7.5-4.2l7.1-4.8c2.4-1.7 4.8-3.3 7.4-4.7l1-.5.9-.5 2-.8.5-.2.6-.2 1-.3 2.1-.6a31.2 31.2 0 0 1 17.2 1.2zM1102 718c2.4.6 4.1 2.7 5.2 5.7-6.4 7.6-20 21.5-26.6 29.3l-8-2.4c3.6-11 7.2-25.8 9.4-33a61 61 0 0 1 20 .5Z"
  })), _path24 || (_path24 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "m1080.9 753.6-9-2.6.1-.6a438 438 0 0 0 6.3-22l3.1-11 .2-.4h.4a62 62 0 0 1 20 .5c2.6.5 4.5 2.6 5.8 6l.1.4-.2.3-12.9 14c-5 5.5-10.3 11.2-13.7 15.2zm-7.5-3.4 7 2c3.4-4 8.6-9.5 13.5-14.8 4.7-5 9.5-10.1 12.6-13.8-1.1-2.9-2.7-4.5-4.7-5a61 61 0 0 0-19.3-.4l-3 10.6c-1.8 6.9-4 14.7-6 21.4Z"
  })), _path25 || (_path25 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1038.7 689.5a27.7 27.7 0 0 0 10.5 10.3c2.3 1.1 4.6 2 7 2.5 2.5.5 5 .8 7.5 1 5 .1 10-.4 14.9-1.1l7.5-1 3.7-.4a58 58 0 0 1 11.3-.1c2.6.2 5 .8 7.4 1.9 2.3 1.1 4.3 2.9 5.7 5 1.3 2.3 2.3 4.6 2.8 7.1a54.7 54.7 0 0 1 .5 15c-.5 5.1-1.6 10-3.1 14.8h-.1a84 84 0 0 0 3-22.2c-.1-2.5-.4-5-1-7.4-.5-2.4-1.5-4.7-2.8-6.8l-.5-.8-.6-.7a5 5 0 0 0-1.2-1.3l-.3-.3-1.1-.9-.8-.4-.8-.5c-2.3-1-4.7-1.6-7.1-1.8a47 47 0 0 0-7.5-.2c-5 .3-10 1-15 1.6-4.9.6-10 1.2-15 1a29.8 29.8 0 0 1-14.5-3.7 25.5 25.5 0 0 1-10.6-10.6z"
  })), _path26 || (_path26 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1037.6 692.4c1.2 2 2.6 4 4.2 5.8a26 26 0 0 0 12 7.5c2.3.6 4.7 1 7 1.2a66 66 0 0 0 14.4-.8c4.7-.7 9.5-1.5 14.3-2l7.2-.3c2.5 0 4.9.2 7.3.9a13.6 13.6 0 0 1 6.3 3.7l2 3 1.4 3.4c1.7 4.7 2 9.6 1.6 14.4a54.5 54.5 0 0 1-3 14.2h-.2a63.3 63.3 0 0 0 2.5-21.4 29.4 29.4 0 0 0-3-10.2 13.7 13.7 0 0 0-4.6-5.1c-1-.6-2.1-1-3.2-1.3-2.3-.6-4.7-1-7-1-2.5 0-4.9.2-7.3.4-4.7.4-9.5 1.2-14.3 1.9-4.7.7-9.6 1.1-14.4.7a26.9 26.9 0 0 1-23.4-15zm37.4-92.5a3.1 3.1 0 0 0 2.1 3 3.6 3.6 0 0 0 3.7-1 3.2 3.2 0 0 0 .4-3.8 3.2 3.2 0 0 0-3.5-1.4 3.4 3.4 0 0 0-2.7 3.2c0 .3.6 0 .6-.1a2.6 2.6 0 0 1 4.7-1.7 3 3 0 0 1 .3 3.2 2.5 2.5 0 0 1-2.8 1.3 3 3 0 0 1-2.2-2.8c0-.3-.6-.1-.6.1m3.3-3.4a1 1 0 1 0 0-2.1 1 1 0 0 0 0 2Z"
  })), _path27 || (_path27 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    d: "M1140.1 662.1h38.6v1.7h-38.6z"
  })), _path28 || (_path28 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1178.5 664.3a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
  })), _path29 || (_path29 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "m1196.5 633.7-1.2-.6-15.8 30.7h1.5l15.5-30Z"
  })), _path30 || (_path30 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1181 664.4h-1.8l-.3-.3v-.6l15.9-30.7.1-.2a.6.6 0 0 1 .5-.1h.2l1.3.7.3.3v.5l-15.6 30-.2.4zm-.5-1.2h.1l15-29.2v-.1z"
  })), _path31 || (_path31 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "nonzero",
    d: "m1162.9 662.3 11.2-27.6s16-1.6 21.2-1.6l-14.3 29.2h-18Z"
  })), _path32 || (_path32 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1181 663h-18a.6.6 0 0 1-.5-.3l-.1-.3v-.3l11.2-27.6.2-.3h.3c.7-.1 16.1-1.7 21.3-1.7h.3l.2.2v.6l-14.2 29.3a.6.6 0 0 1-.6.4Zm-17.2-1.3h16.8l13.7-28c-5.4.2-17.5 1.4-19.8 1.6z"
  })), _path33 || (_path33 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#66a8f7",
    fillRule: "nonzero",
    d: "M1173 645.4h13l2.5-6.2-13.6.4-2 5.8Zm3.5 8h6l2.6-6.2h-6z"
  })), _path34 || (_path34 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1095 578.6c-1.7-.4 0-2.6-2.6-3-2.4-.4-1.3-3.2-4.5-3-3.3.2-3.3-2-6.1-1l-1.7.2c.3-.2-.3-2.5 2.7-2.3 1.2 0 .8-1.9 2-2.8.9-.8 2.5-.1 3.7-2 .6-1 .2-2.1 0-3.2-.3-1 1.3-2.6 1.3-4 0-1.2-2.2-1.9-.9-3.8.9-1.4-1.5-3.3-.4-4.8 1.4-2-2-3-1.1-5.2.9-2.4-1-2.4-2.8-2.2-1.5.3.4-2.9-3-2.1-4.8 1-2-1.8-5.9-.9-2.9.7-4.1-3-7.4-.6-1.5 1-4.7-2.2-6.7 0-2 2.1-3.9-1.3-7.1 1.7-3.3 3-5.9 0-8 3.5-2.2 3.4 0 4.5-1.5 6.3-2.4 2.8-2.9 6-1.4 7.8 2 2.4 1.3 3.7 2.2 5.4 1.4 2.7 3.2.4 4.1 2.2.8 1.5-.2 4 5 3.4 4.5-.4 2.2 6.3 7.2 3.6 3.2-1.8 6 3.5 6.3 3.6-.8.3-2.4 1.3-2 2.6.4 1.8-3 1.8-1.8 4 1.3 2.5-1.5 2.9.6 4.7 2.5 2.1-1 4 2 5.2 2.8 1-.6 2.3 2.6 3.4l2.8-2.4 1.4-2.4c-1.6-2 1.3-6.3 4.3-5.4 2.2.7 3.3 2.7 2.4 4-1 1.3.4 4.9.4 4.9 0-1.1 0-2.3.3-3.4.4-1 2-1.3 2.2-2 .4-2 1.2-3.2 3.8-2.7 3.1.5 3.6-2.8 5-3.5 1.1-.7 2-.4 2.2.3s1.2 0 1.3 1.2l1.2-.3s1.5-4.2-2-5Zm-41.5 152.8a93.1 93.1 0 0 1-54.2-17.7 1.2 1.2 0 0 1-.2-1.7c.2-.3.5-.4.8-.5.3 0 .6 0 .9.2a89 89 0 0 0 52.7 17.2c.3 0 .6.1.8.4.3.2.4.5.4.8s-.1.6-.4.9z"
  })), _path35 || (_path35 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1030 769.6a2 2 0 0 1-1.8-1.3l-8.6-28.7L993 754a2.5 2.5 0 0 1-3.2-3.6l25.3-30.7 5.4 18 18-9.6-6.2 39.7a2 2 0 0 1-2.1 1.8Zm-.7-1.7a.9.9 0 0 0 1 .5.9.9 0 0 0 .7-.8l5.7-37.3-16 8.7zM990.7 751a1.2 1.2 0 0 0 .1 1.6 1.2 1.2 0 0 0 1.5.3l27-14.6-4.8-16.1zm-1.1-4.6h-.2l-.1-.2v-.2l1.9-3.3a49 49 0 0 0 2.8-4.6.3.3 0 0 1 .3.2v.2l-2.6 4.5-1.9 3.3v.1zm-.8-4.1h-.1l-.2-.1v-.3l1.5-2.9 1.5-2.9a.3.3 0 0 1 .3-.1h.1l.2.2v.2c-.9 1.5-1.2 2.2-1.5 2.9a65 65 0 0 1-1.8 3m51.2 7.7h-.2v-.2c0-2.8 0-5.6.6-8v-.2h.1l.1-.1h.2a.3.3 0 0 1 .2.4c-.6 2.4-.6 5.2-.6 7.9l-.1.2h-.2Z"
  })), _path36 || (_path36 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#121212",
    fillRule: "nonzero",
    d: "M1025.2 771.2c4.3 0 7.8-.6 7.8-1.3 0-.8-3.5-1.4-7.8-1.4-4.4 0-7.9.6-7.9 1.4 0 .7 3.5 1.3 7.9 1.3"
  })), _path37 || (_path37 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#66a8f7",
    fillRule: "nonzero",
    d: "M1053.8 729.8a92.8 92.8 0 0 1-54.2-17.7c-.2-.2-.4-.5-.4-.8a1.2 1.2 0 0 1 1-1.4c.3 0 .6 0 .9.2a88.9 88.9 0 0 0 53.2 17.3l.5.2a1.3 1.3 0 0 1 .3 1 1.3 1.3 0 0 1-.3.8l-.5.3h-.5Z"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIGNsaXAtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDEyNjkgODA0Ij4KICA8cGF0aCBmaWxsPSIjYWNkMGZmIiBkPSJNMCAzNy41aDEyNjguMnY3NjZIMHoiLz4KICA8cGF0aCBmaWxsPSIjYWNkMGZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im02MzQuMSAwIDI4NyAyNDguNUgzNDdMNjM0LjIgMFoiLz4KICA8ZWxsaXBzZSBjeD0iODQuNSIgY3k9Ijc5LjUiIGZpbGw9IiNkNmU4ZmYiIGZpbGwtb3BhY2l0eT0iLjMiIHJ4PSI4NC41IiByeT0iNzkuNSIgdHJhbnNmb3JtPSJtYXRyaXgoNCAwIDAgNCAxODAgODMuNikiLz4KICA8cGF0aCBmaWxsPSIjMTIxMjEyIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMjA3IDc2Ny44YzAgNC4zLTYwLjMgMjIuMi0xMDEuMSAzLjctOS40LTQuMi04LS4yLTE4LjguNi0xOC40IDEuMy0zOS4zLS41LTM5LjMtNCAwLTMuNyAyMi40LTYuNSAzNy02LjMgMTguOC4yIDQxLjUtNC42IDY2LjgtNC42IDQ3IDAgNTUuNCA2LjMgNTUuNCAxMC42WiIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMTU5IDY3MS42aDQuM3Y5NC45aC00LjN6Ii8+CiAgPHBhdGggZmlsbD0iIzEyMTIxMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTE2My44IDc2Ny40aC01LjZ2LTk2LjNoNS42djk2LjNabS00LjQtMS4yaDMuMnYtOTMuOGgtMy4ydjkzLjhaIi8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTE0OC4zIDc2Ni41YTE4LjkgMTguOSAwIDAgMSAyNS40IDBjMiAyLjctMjYgNC0yNS40IDBaIi8+CiAgPHBhdGggZmlsbD0iIzEyMTIxMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTE1OS44IDc2OS43Yy00LjUgMC04LjctLjQtMTAuNi0xLjMtMS40LS42LTEuNi0xLjQtMS41LTJ2LS4ybC4yLS4xYTE5LjUgMTkuNSAwIDAgMSAyNi4yIDAgMSAxIDAgMCAxIDAgMS4zYy0xIDEuNC03LjkgMi4zLTE0LjMgMi4zWm0tMTAuOC0zIC43LjZjNC44IDIgMjEuNCAxIDIzLjQtLjVhMTguMyAxOC4zIDAgMCAwLTI0LjEgMFoiLz4KICA8cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMTc1LjIgNjcxYTE4LjkgMTguOSAwIDAgMS0yOC40IDBoMjguNFoiLz4KICA8cGF0aCBmaWxsPSIjMTIxMjEyIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMTc0LjYgNjcwLjljLTIuNyAzLTYuMiA1LTEwLjEgNmExNy44IDE3LjggMCAwIDEtMTcuMS01LjlsLS41LjVoMjguNGMuMiAwIC43IDAgLjYtLjQgMC0uMy0uNi0uNC0uOC0uNGgtMjguNGMtLjIgMC0uOC4xLS41LjVhMjAgMjAgMCAwIDAgMjkuNy4xYy4zLS40LTEtLjgtMS4zLS40WiIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMTE5IDY2NC43aDg2LjR2NkgxMTE5eiIvPgogIDxwYXRoIGZpbGw9IiMxMjEyMTIiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEyMDYuMiA2NzEuNGgtODcuNlY2NjRoODcuNnY3LjRabS04Ni40LTEuM2g4NS4ydi00LjloLTg1LjJ2NVoiLz4KICA8cGF0aCBmaWxsPSIjZTcwMDcwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMDQ2LjQgNjgxLjl2LS4ybDEuMy0uOS4xLjJjLS41LjItMSAuNS0xLjQuOVptLTE0LjUgOS44di0uMWM1LTIuMyA3LjgtNC42IDEwLjUtNi44bDIuOS0yLjMuMS4xLTIuOSAyLjNjLTIuNyAyLjItNS41IDQuNS0xMC42IDYuOFoiLz4KICA8cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMDI2LjQgNjkzLjhjMTUuOC01LjUgMTUuNC0xMSAyNi43LTE1LjVhMzggMzggMCAwIDEgMjIuNy0yLjNjMjcuNSA1LjggMzkuMyAxMC42IDQ5LjUgMTkuMyAyMyAxOS43LTEyLjcgNTctMTAuNSA2MCAyLjIgMyA0LjYgNy4yIDcuNyA4LjcgMS4zLjcgMi41IDEuMyAzLjYgMS43LjguNC41IDIuNS0uNCAyLjVoLTYuOWMtMy45IDAtNy41LTQuNy0xMC43LTYtMy4yLTEuNCAxLjItNS45IDEuMi03LjggMC0xMS44IDEuNi0zNC40LTcuMy0zNi4zLTE2LjMtMy41LTMxLjYgMi43LTQ4LjggMi40YTQ2LjMgNDYuMyAwIDAgMS00MS4zLTI0LjJzNCAxLjIgMTQuNS0yLjVaIi8+CiAgPHBhdGggZmlsbD0iIzEyMTIxMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTEyMy4xIDc2OC45aC00LjNjLTIuNiAwLTUtMi03LjMtMy43YTE4IDE4IDAgMCAwLTMuNi0yLjUgMi4zIDIuMyAwIDAgMS0xLjQtMS40Yy0uNS0xLjMuNC0zIDEuMi00LjUuNS0xIDEtMS45IDEtMi40di00LjhjLjItMTEuNy41LTI5LjMtNi45LTMxLTkuNC0yLTE4LjUtLjYtMjguMS43LTYuNiAxLTEzLjQgMi0yMC41IDEuOGE1MiA1MiAwIDAgMS0yNC02LjMgNDMuMyA0My4zIDAgMCAxLTE3LjgtMTguMmwtLjctMS40IDEuNC41czQgMS4xIDE0LTIuNGE0NSA0NSAwIDAgMCAxNi05IDM5LjUgMzkuNSAwIDAgMSAzMy45LTljMjcuMiA1LjkgMzkuMiAxMC42IDQ5LjcgMTkuNSA3LjYgNi42IDkuNyAxNS43IDYuNCAyNy40LTIuOCA5LjYtOC44IDE5LTEyLjcgMjUuMy0yLjEgMy4zLTQuMyA2LjctNC4xIDcuNGwxLjIgMS43YzEuOCAyLjcgNCA1LjcgNi40IDYuOSAxIC42IDIuMyAxLjEgMy41IDEuNy44LjMgMSAxLjQuNyAyLjItLjEuOS0uNyAxLjUtMS4zIDEuNWgtMi43Wm0tMzEuOC01Mi41YzMuNyAwIDcuMy4zIDEwLjggMSA4LjMgMS45IDggMTkuNCA3LjkgMzIuMnY0LjhjMCAuOC0uNiAxLjgtMS4yIDNzLTEuNSAyLjctMS4yIDMuNWwuMy40LjUuM2MxLjIuNSAyLjUgMS41IDMuOSAyLjYgMi4xIDEuNyA0LjMgMy40IDYuNiAzLjRoNi44Yy4yLS4yLjItLjUuMi0uN3YtLjZsLTMuNi0xLjdhMjEuNyAyMS43IDAgMCAxLTYuOC03LjNsLTEuMi0xLjdjLS44LTEgLjQtMyA0LTguOCA4LjItMTIuOCAyMy4zLTM2LjcgNi42LTUxLTEwLjMtOC45LTIyLjItMTMuNS00OS4yLTE5LjJhMzggMzggMCAwIDAtMjIuNCAyLjNjLTUgMi03LjYgNC0xMC41IDYuNC0zLjYgMy03LjQgNi0xNi4yIDkuMWEzNSAzNSAwIDAgMS0xMy41IDIuN2MzLjggNyA5LjYgMTIuOCAxNi42IDE2LjYgNy4yIDQgMTUuMyA2IDIzLjUgNi4yIDcgLjEgMTMuOC0uOCAyMC4zLTEuOCA2LS45IDEyLTEuNyAxNy44LTEuN1oiLz4KICA8cGF0aCBmaWxsPSIjMTIxMjEyIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMDY4LjQgNjc1LjJzLTE2LjktMTMtMTUuOS0xOS42YzAgMCAxNy44IDE3LjYgMzMuOCAxOC43YTYzIDYzIDAgMCAwIDI3LjEtMy41YzYuOCAzLjcgMTEuOCA5LjggMTEuOCAxNSAwIDEuOC0uOCA0LjUtMi4xIDcuNy0xMC4zLTcuNS0yOS4yLTE1LjItNTQuNy0xOC4zWiIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEwODAuNiA3NTNjLTMuMSAzLjctNSA2LjMtNC4zIDcgMi43IDIuNCAxMyA2LjggMTMgNi44YS44LjggMCAwIDEgLjQgMWwtLjMuNC0uNS4yaC02LjhjLTEuOC0uMi0zLS43LTQuNy0uNy0yLjggMC01LjYuMy04LjQuNmEyLjIgMi4yIDAgMCAxLTIuMi0zYy43LTEuOCAyLjMtNCAzLjMtNy4ybDIuNS03LjUgOCAyLjRaIi8+CiAgPHBhdGggZmlsbD0iIzEyMTIxMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTA4NS4yIDc2OWE1My4zIDUzLjMgMCAwIDEtNy43LS42Yy0yLjggMC01LjYuMi04LjQuNmgtLjFhMi45IDIuOSAwIDAgMS0yLjctMy44Yy4zLTEgLjgtMiAxLjMtMi44bDItNC41IDIuNC03LjUuMi0uNiA5LjUgMi44LS42LjdjLTMuOSA0LjYtNC4zIDYtNC4zIDYuMmE3NSA3NSAwIDAgMCAxMi43IDYuN2guMWMuMy4yLjUuNS42Ljh2LjlhMS41IDEuNSAwIDAgMS0xLjQgMXMtMS42LjItMy42LjJabS03LjctMS45IDIuNC4zIDIuMy40aDYuOHYtLjJsLjEtLjF2LS4xYy0xLS40LTEwLjYtNC41LTEzLjItNy0uOC0uNy0uNC0yLjEgMy43LTcuMWwtNi41LTItMi4zIDdhMzMgMzMgMCAwIDEtMi4xIDQuN2MtLjUuOC0uOSAxLjctMS4yIDIuNmwtLjEuOGExLjYgMS42IDAgMCAwIC44IDEuMmwuOC4yYTc5IDc5IDAgMCAxIDguNS0uN1oiLz4KICA8cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMDczLjYgNTkxLjFjLTIuOC0zLjctMy42LTEyLjcgMy44LTE2LjMgMTEuMi01LjUgMjQuOSA5IDE3LjUgMTctMy4yIDMuNi4xIDcuNi0uOCA5LjItMSAxLjYtMi4zIDEtMy4zIDEuNS0xLjkgMS0zIDMuNy02IDQuMy0zLjMuOC01LjMtMi43LTYuNC0zLTMuMi0xLTEyLjMgMS44LTcgMTQuOC0yMy42IDIuNS0zMS40LTExLjUtMzEuNC0xMS41IDcuNS00LjIgMTYuNy41IDMzLjYtMTZaIi8+CiAgPHBhdGggZmlsbD0iIzEyMTIxMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTA2NiA2MTkuNWEzNSAzNSAwIDAgMS0xOS41LTUuMiAyMiAyMiAwIDAgMS03LTdsLS4zLS40LjUtLjNjMi41LTEuNCA1LTEuOSA4LTIuNCA2LjItMSAxNC0yLjQgMjUtMTMuMWExMyAxMyAwIDAgMS0xLjQtOS42IDEwLjYgMTAuNiAwIDAgMSA1LjgtNy4zIDEyLjggMTIuOCAwIDAgMSAxMC0uNSAxNyAxNyAwIDAgMSA3LjkgNS43YzMuMyA0LjUgMy41IDkuNC40IDEyLjktMS45IDItMS40IDQuMi0uOSA2IC4zIDEuMi42IDIuMi4xIDNhMi43IDIuNyAwIDAgMS0yLjYgMS41bC0xIC4yLTEuNyAxLjZhOC41IDguNSAwIDAgMS00LjQgMi45Yy0yLjYuNS00LjUtMS4yLTUuNy0yLjNhNSA1IDAgMCAwLTEtLjhjLTEuMy0uNS00LjIgMC02IDItMS43IDEuOC0zIDUuMy0uMyAxMmwuMy43LS45LjEtNS40LjNabS0yNS4xLTEyLjJjMS43IDIuNSAxMCAxMi41IDI5LjUgMTAuOC0yLjUtNi44LTEtMTAuNi44LTEyLjVhNy44IDcuOCAwIDAgMSA3LjQtMi40Yy42LjIgMSAuNiAxLjUgMSAxIDEgMi42IDIuNSA0LjYgMiAxLjctLjMgMi43LTEuNCAzLjctMi41LjYtLjcgMS4zLTEuMiAyLTEuNy41LS4zIDEtLjQgMS41LS40LjcgMCAxLjItLjEgMS43LS45LjItLjMgMC0xLjItLjMtMi0uNS0yLTEuMS00LjcgMS4yLTcuMyAzLjItMy41IDEuOC04LjEtLjUtMTEuMi00LjctNi4yLTExLjctNy4xLTE2LjQtNC45YTkuNCA5LjQgMCAwIDAtNS4xIDYuNWMtLjkgMy42LjIgNy4yIDEuNiA5bC4zLjQtLjQuNGE0MyA0MyAwIDAgMS0yNiAxMy44Yy0yLjcuNS01IC45LTcuMSAyWiIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEwNDAgNjA3czcuOCAxNCAzMS4zIDExLjZhNjEgNjEgMCAwIDAgMTkuNCAyOS4yIDM2IDM2IDAgMCAwIDguMyA1LjJjMTQuOCA2LjcgMTUuMi0xLjIgMzQuNSAxLjIgMTIuMiAxLjUgMTUuNSA2LjUgMTUuMiA4LjVoLTguNmE5LjMgOS4zIDAgMCAwLTYtMi4zYy00LjEgMC0xMC41IDQuMi0xNi4zIDcuN2E0OS4xIDQ5LjEgMCAwIDEtNDAuMiAzLjljLTEyLTUtMjUuMS0xNi40LTI1LjEtMTYuNCAwIDkgMTUuOSAxOS42IDE1LjkgMTkuNi03IC4xLTEwLjQgMS4xLTE1LjMgMy0xMS4zIDQuNS0xMC45IDEwLTI2LjcgMTUuNi0xMC41IDMuNy0xNC41IDIuNC0xNC41IDIuNC0zLjgtOC03LjUtMTktNy41LTMxLjUgMC0yMy43IDE5LjYtNDYuNyAzNS42LTU3LjZaIi8+CiAgPHBhdGggZmlsbD0iIzEyMTIxMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTAxNCA2OTdjLS43LjEtMS41IDAtMi4zLS4yaC0uMmwtLjEtLjNjLTMuNS03LTcuNi0xOC4zLTcuNi0zMS44IDAtMjMgMTguNi00Ni4zIDM1LjgtNTguMWwxLS43djFjLjkgMS40IDkgMTMuMyAzMC42IDExaC41bC4yLjVjNC4zIDExLjkgOC43IDIwIDE5LjIgMjlhMzUgMzUgMCAwIDAgOC4yIDUgMjIgMjIgMCAwIDAgMTYuNiAyYzQtLjkgOS0xLjkgMTcuNi0uOCA5LjYgMS4xIDEzLjQgNC4zIDE0LjggNi4yLjcgMSAxLjEgMi4xIDEgM3YuNWgtOS40bC0uMi0uMmE4LjcgOC43IDAgMCAwLTUuNS0yYy0zLjcgMC05IDMuMi0xNC4zIDYuNGwtMS43IDFhNDkuOSA0OS45IDAgMCAxLTQwLjggNGMtMTAtNC0yMC43LTEyLjUtMjQuMS0xNS40IDEuNSA4LjIgMTUuMyAxNy41IDE1LjQgMTcuNmwxLjYgMS0yIC4xYy02LjYuMi0xMCAxLTE1IDNhMzUgMzUgMCAwIDAtMTAuNCA2LjVjLTMuNyAzLTcuNCA2LTE2LjMgOS4xYTM4LjcgMzguNyAwIDAgMS0xMi41IDIuN1ptLTEuNi0xLjNjMSAuMiA1IC42IDEzLjgtMi41IDguNi0zIDEyLjMtNiAxNS45LTguOSAyLjktMi40IDUuNi00LjYgMTAuOC02LjYgNC41LTEuOCA4LTIuOCAxMy42LTMtNC0zLTE0LjYtMTEuNS0xNC42LTE5di0xLjRsMSAuOWMuMSAwIDEzLjIgMTEuNCAyNSAxNi4yIDUgMi4xIDIzLjUgNiAzOS42LTMuOWwxLjctMWM1LjQtMy4zIDExLTYuNyAxNS02LjcgMi4yIDAgNC40LjggNi4xIDIuM2g3LjhhNCA0IDAgMCAwLS44LTEuNmMtMS0xLjMtNC40LTQuNS0xMy45LTUuNy04LjUtMS0xMy4yIDAtMTcuMy44LTUgMS05IDEuOC0xNy4zLTItMy0xLjQtNi0zLjEtOC41LTUuMy0xMC42LTktMTUtMTcuMi0xOS40LTI5LTE0LjUgMS4zLTIzLTMuMy0yNy43LTcuNWEyMS4zIDIxLjMgMCAwIDEtMy40LTMuOGMtMTYuOCAxMS43LTM0LjggMzQuMy0zNC44IDU2LjcgMCAxMyA0IDI0IDcuNCAzMVptMTA2LjkgNTAuNS04LjYtMi4yLTEuMi0uM2MtLjUgMC0uNy43LS4yLjhsOC42IDIuMiAxLjIuM2guMmwuMi0uM2EuNC40IDAgMCAwLS4yLS41WiIvPgogIDxwYXRoIGZpbGw9IiMxMjEyMTIiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEwODcuNyA2NDUuNGEyOS4zIDI5LjMgMCAwIDAtMTMuMyAxNSAyOC44IDI4LjggMCAwIDAtMS43IDEwLjZsLjMuMmMuMSAwIC4yIDAgLjMtLjJsLjEtLjNhMjcuNiAyNy42IDAgMCAxIDE0LjctMjQuNmMuNS0uMiAwLTEtLjQtLjdaIi8+CiAgPHBhdGggZmlsbD0iIzEyMTIxMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTA4Ni42IDY0NC4zYy0yLjQuNS00LjYgMi02LjQgMy42YTI1LjUgMjUuNSAwIDAgMC00LjcgNS44IDM1LjIgMzUuMiAwIDAgMC0zIDYuOGwtLjYgMS44LS41IDEuOC0uMiAxLS4yLjgtLjQgMS45LTEuMi0uMi41LTIgLjItLjkuMi0uOS42LTEuOC42LTEuOGEyNy40IDI3LjQgMCAwIDEgOC4zLTEyLjhjMi0xLjcgNC4yLTMgNi43LTMuNmwuMS41Wm0tMzYuNi0yNmMtMi41LTEtNC44LTIuMy03LTMuOGEyNy4xIDI3LjEgMCAwIDEtNS43LTUuNWwuNi0uNGEyNiAyNiAwIDAgMCA1LjQgNS42YzIgMS42IDQuMyAzIDYuNiA0LjFabTIyLjEgMi41Yy0yLjYuOC01LjMgMS4yLTggMSAyLjctLjIgNS4zLS43IDcuOC0xLjZsLjIuNloiLz4KICA8cGF0aCBmaWxsPSIjNjZhOGY3IiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMDU2LjMgNjQ4YTYuOCA2LjggMCAxIDAgMC0xMy41IDYuOCA2LjggMCAwIDAgMCAxMy42Wm0tMTYuNi0xOWE1LjggNS44IDAgMSAwIDAtMTEuNiA1LjggNS44IDAgMCAwIDAgMTEuNVptLTcuOCAzOS4yYTUuNSA1LjUgMCAxIDAgMC0xMSA1LjUgNS41IDAgMCAwIDAgMTFabS0xNC4yLTE1LjJhNC45IDQuOSAwIDEgMCAwLTkuOCA0LjkgNC45IDAgMCAwIDAgOS43Wm0zMy45IDE1LjZhMi45IDIuOSAwIDEgMCAwLTUuOCAyLjkgMi45IDAgMCAwIDAgNS44Wm0tMTguMS0yMS4xYTIuOSAyLjkgMCAxIDAgMC01LjcgMi45IDIuOSAwIDAgMCAwIDUuN1ptMzEuNiA5LjhhMy42IDMuNiAwIDEgMCAwLTcuMiAzLjYgMy42IDAgMCAwIDAgNy4yWm0tNDcuNCAyNS41YTUuNiA1LjYgMCAxIDAgMC0xMS4xIDUuNiA1LjYgMCAwIDAgMCAxMS4xWm01Mi4zLTQ4LjJhMy4yIDMuMiAwIDEgMCAwLTYuMyAzLjIgMy4yIDAgMCAwIDAgNi4zWiIvPgogIDxwYXRoIGZpbGw9IiMxMjEyMTIiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEwNzQuNSA2NzQuNGEzMC41IDMwLjUgMCAwIDAtMTctLjhsLTIgLjUtMSAuMy0uNi4yLS41LjItMiAuOS0uOS40LTEgLjVjLTIuNCAxLjQtNC44IDMuMS03LjEgNC43bC03LjIgNWE0MS42IDQxLjYgMCAwIDEtMTUuOSA3IDM2IDM2IDAgMCAxLTguNy41di0uN2g0LjNhMzguMyAzOC4zIDAgMCAwIDEyLjQtMy4zYzIuNi0xLjIgNS4xLTIuNiA3LjUtNC4ybDcuMS00LjhjMi40LTEuNyA0LjgtMy4zIDcuNC00LjdsMS0uNS45LS41IDItLjguNS0uMi42LS4yIDEtLjMgMi4xLS42YTMxLjIgMzEuMiAwIDAgMSAxNy4yIDEuMmwtLjEuMlpNMTEwMiA3MThjMi40LjYgNC4xIDIuNyA1LjIgNS43LTYuNCA3LjYtMjAgMjEuNS0yNi42IDI5LjNsLTgtMi40YzMuNi0xMSA3LjItMjUuOCA5LjQtMzNhNjEgNjEgMCAwIDEgMjAgLjVaIi8+CiAgPHBhdGggZmlsbD0iIzEyMTIxMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtMTA4MC45IDc1My42LTktMi42LjEtLjZhNDM4IDQzOCAwIDAgMCA2LjMtMjJsMy4xLTExIC4yLS40aC40YTYyIDYyIDAgMCAxIDIwIC41YzIuNi41IDQuNSAyLjYgNS44IDZsLjEuNC0uMi4zLTEyLjkgMTRjLTUgNS41LTEwLjMgMTEuMi0xMy43IDE1LjJsLS4yLjJabS03LjUtMy40IDcgMmMzLjQtNCA4LjYtOS41IDEzLjUtMTQuOCA0LjctNSA5LjUtMTAuMSAxMi42LTEzLjgtMS4xLTIuOS0yLjctNC41LTQuNy01YTYxIDYxIDAgMCAwLTE5LjMtLjRsLTMgMTAuNmMtMS44IDYuOS00IDE0LjctNiAyMS40WiIvPgogIDxwYXRoIGZpbGw9IiMxMjEyMTIiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEwMzguNyA2ODkuNWEyNy43IDI3LjcgMCAwIDAgMTAuNSAxMC4zYzIuMyAxLjEgNC42IDIgNyAyLjUgMi41LjUgNSAuOCA3LjUgMSA1IC4xIDEwLS40IDE0LjktMS4xbDcuNS0xIDMuNy0uNGE1OC4yIDU4LjIgMCAwIDEgMTEuMy0uMWMyLjYuMiA1IC44IDcuNCAxLjkgMi4zIDEuMSA0LjMgMi45IDUuNyA1IDEuMyAyLjMgMi4zIDQuNiAyLjggNy4xYTU0LjcgNTQuNyAwIDAgMSAuNSAxNWMtLjUgNS4xLTEuNiAxMC0zLjEgMTQuOGgtLjFhODQuMSA4NC4xIDAgMCAwIDMtMjIuMmMtLjEtMi41LS40LTUtMS03LjQtLjUtMi40LTEuNS00LjctMi44LTYuOGwtLjUtLjgtLjYtLjdhNSA1IDAgMCAwLTEuMi0xLjNsLS4zLS4zLTEuMS0uOS0uOC0uNC0uOC0uNWMtMi4zLTEtNC43LTEuNi03LjEtMS44YTQ3IDQ3IDAgMCAwLTcuNS0uMmMtNSAuMy0xMCAxLTE1IDEuNi00LjkuNi0xMCAxLjItMTUgMWEyOS44IDI5LjggMCAwIDEtMTQuNS0zLjcgMjUuNSAyNS41IDAgMCAxLTEwLjYtMTAuNmguMloiLz4KICA8cGF0aCBmaWxsPSIjMTIxMjEyIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMDM3LjYgNjkyLjRjMS4yIDIgMi42IDQgNC4yIDUuOGEyNiAyNiAwIDAgMCAxMiA3LjVjMi4zLjYgNC43IDEgNyAxLjJhNjYgNjYgMCAwIDAgMTQuNC0uOGM0LjctLjcgOS41LTEuNSAxNC4zLTJsNy4yLS4zYzIuNSAwIDQuOS4yIDcuMy45YTEzLjYgMTMuNiAwIDAgMSA2LjMgMy43bDIgMyAxLjQgMy40YzEuNyA0LjcgMiA5LjYgMS42IDE0LjRhNTQuNSA1NC41IDAgMCAxLTMgMTQuMmgtLjJhNjMuMyA2My4zIDAgMCAwIDIuNS0yMS40IDI5LjQgMjkuNCAwIDAgMC0zLTEwLjIgMTMuNyAxMy43IDAgMCAwLTQuNi01LjFjLTEtLjYtMi4xLTEtMy4yLTEuMy0yLjMtLjYtNC43LTEtNy0xLTIuNSAwLTQuOS4yLTcuMy40LTQuNy40LTkuNSAxLjItMTQuMyAxLjktNC43LjctOS42IDEuMS0xNC40LjdhMjYuOSAyNi45IDAgMCAxLTIzLjQtMTVoLjJabTM3LjQtOTIuNWEzLjEgMy4xIDAgMCAwIDIuMSAzIDMuNiAzLjYgMCAwIDAgMy43LTEgMy4yIDMuMiAwIDAgMCAuNC0zLjggMy4yIDMuMiAwIDAgMC0zLjUtMS40IDMuNCAzLjQgMCAwIDAtMi43IDMuMmMwIC4zLjYgMCAuNi0uMWEyLjYgMi42IDAgMCAxIDQuNy0xLjcgMyAzIDAgMCAxIC4zIDMuMiAyLjUgMi41IDAgMCAxLTIuOCAxLjMgMyAzIDAgMCAxLTIuMi0yLjhjMC0uMy0uNi0uMS0uNi4xWm0zLjMtMy40YTEgMSAwIDEgMCAwLTIuMSAxIDEgMCAwIDAgMCAyWiIvPgogIDxwYXRoIGZpbGw9IiMxMjEyMTIiIGQ9Ik0xMTQwLjEgNjYyLjFoMzguNnYxLjdoLTM4LjZ6Ii8+CiAgPHBhdGggZmlsbD0iIzEyMTIxMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTE3OC41IDY2NC4zYTEgMSAwIDEgMCAwLTIgMSAxIDAgMCAwIDAgMloiLz4KICA8cGF0aCBmaWxsPSIjMTIxMjEyIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im0xMTk2LjUgNjMzLjctMS4yLS42LTE1LjggMzAuN2gxLjVsMTUuNS0zMFoiLz4KICA8cGF0aCBmaWxsPSIjMTIxMjEyIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMTgxIDY2NC40aC0xLjhsLS4zLS4zdi0uNmwxNS45LTMwLjcuMS0uMmEuNi42IDAgMCAxIC41LS4xaC4ybDEuMy43LjMuM3YuNWwtMTUuNiAzMC0uMi40aC0uNFptLS41LTEuMmguMWwxNS0yOS4ydi0uMWwtMTUuMSAyOS4zWiIvPgogIDxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTExNjIuOSA2NjIuMyAxMS4yLTI3LjZzMTYtMS42IDIxLjItMS42bC0xNC4zIDI5LjJoLTE4WiIvPgogIDxwYXRoIGZpbGw9IiMxMjEyMTIiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTExODEgNjYzaC0xOGEuNi42IDAgMCAxLS41LS4zbC0uMS0uM3YtLjNsMTEuMi0yNy42LjItLjNoLjNjLjctLjEgMTYuMS0xLjcgMjEuMy0xLjdoLjNsLjIuMnYuNmwtMTQuMiAyOS4zYS42LjYgMCAwIDEtLjYuNFptLTE3LjItMS4zaDE2LjhsMTMuNy0yOGMtNS40LjItMTcuNSAxLjQtMTkuOCAxLjZsLTEwLjcgMjYuNFoiLz4KICA8cGF0aCBmaWxsPSIjNjZhOGY3IiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMTczIDY0NS40aDEzbDIuNS02LjItMTMuNi40LTIgNS44Wm0zLjUgOGg2bDIuNi02LjJoLTZsLTIuNiA2LjJaIi8+CiAgPHBhdGggZmlsbD0iIzEyMTIxMiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTA5NSA1NzguNmMtMS43LS40IDAtMi42LTIuNi0zLTIuNC0uNC0xLjMtMy4yLTQuNS0zLTMuMy4yLTMuMy0yLTYuMS0xbC0xLjcuMmMuMy0uMi0uMy0yLjUgMi43LTIuMyAxLjIgMCAuOC0xLjkgMi0yLjguOS0uOCAyLjUtLjEgMy43LTIgLjYtMSAuMi0yLjEgMC0zLjItLjMtMSAxLjMtMi42IDEuMy00IDAtMS4yLTIuMi0xLjktLjktMy44LjktMS40LTEuNS0zLjMtLjQtNC44IDEuNC0yLTItMy0xLjEtNS4yLjktMi40LTEtMi40LTIuOC0yLjItMS41LjMuNC0yLjktMy0yLjEtNC44IDEtMi0xLjgtNS45LS45LTIuOS43LTQuMS0zLTcuNC0uNi0xLjUgMS00LjctMi4yLTYuNyAwLTIgMi4xLTMuOS0xLjMtNy4xIDEuNy0zLjMgMy01LjkgMC04IDMuNS0yLjIgMy40IDAgNC41LTEuNSA2LjMtMi40IDIuOC0yLjkgNi0xLjQgNy44IDIgMi40IDEuMyAzLjcgMi4yIDUuNCAxLjQgMi43IDMuMi40IDQuMSAyLjIuOCAxLjUtLjIgNCA1IDMuNCA0LjUtLjQgMi4yIDYuMyA3LjIgMy42IDMuMi0xLjggNiAzLjUgNi4zIDMuNi0uOC4zLTIuNCAxLjMtMiAyLjYuNCAxLjgtMyAxLjgtMS44IDQgMS4zIDIuNS0xLjUgMi45LjYgNC43IDIuNSAyLjEtMSA0IDIgNS4yIDIuOCAxLS42IDIuMyAyLjYgMy40bDIuOC0yLjQgMS40LTIuNGMtMS42LTIgMS4zLTYuMyA0LjMtNS40IDIuMi43IDMuMyAyLjcgMi40IDQtMSAxLjMuNCA0LjkuNCA0LjkgMC0xLjEgMC0yLjMuMy0zLjQuNC0xIDItMS4zIDIuMi0yIC40LTIgMS4yLTMuMiAzLjgtMi43IDMuMS41IDMuNi0yLjggNS0zLjUgMS4xLS43IDItLjQgMi4yLjMuMi43IDEuMiAwIDEuMyAxLjJsMS4yLS4zczEuNS00LjItMi01Wm0tNDEuNSAxNTIuOGE5My4xIDkzLjEgMCAwIDEtNTQuMi0xNy43IDEuMiAxLjIgMCAwIDEtLjItMS43Yy4yLS4zLjUtLjQuOC0uNS4zIDAgLjYgMCAuOS4yYTg5IDg5IDAgMCAwIDUyLjcgMTcuMmMuMyAwIC42LjEuOC40LjMuMi40LjUuNC44IDAgLjMtLjEuNi0uNC45bC0uOC40WiIvPgogIDxwYXRoIGZpbGw9IiMxMjEyMTIiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEwMzAgNzY5LjZhMiAyIDAgMCAxLTEuOC0xLjNsLTguNi0yOC43TDk5MyA3NTRhMi41IDIuNSAwIDAgMS0zLjItMy42bDI1LjMtMzAuNyA1LjQgMTggMTgtOS42LTYuMiAzOS43YTIgMiAwIDAgMS0yLjEgMS44Wm0tLjctMS43YS45LjkgMCAwIDAgMSAuNS45LjkgMCAwIDAgLjctLjhsNS43LTM3LjMtMTYgOC43IDguNiAyOC45Wk05OTAuNyA3NTFhMS4yIDEuMiAwIDAgMCAuMSAxLjYgMS4yIDEuMiAwIDAgMCAxLjUuM2wyNy0xNC42LTQuOC0xNi4xLTIzLjggMjguOFptLTEuMS00LjZoLS4ybC0uMS0uMnYtLjJsMS45LTMuM2E0OC44IDQ4LjggMCAwIDAgMi44LTQuNi4zLjMgMCAwIDEgLjMuMnYuMmwtMi42IDQuNS0xLjkgMy4zdi4xaC0uMlptLS44LTQuMWgtLjFsLS4yLS4xdi0uM2wxLjUtMi45IDEuNS0yLjlhLjMuMyAwIDAgMSAuMy0uMWguMWwuMi4ydi4yYy0uOSAxLjUtMS4yIDIuMi0xLjUgMi45YTY1LjMgNjUuMyAwIDAgMS0xLjggM1ptNTEuMiA3LjdoLS4ydi0uMmMwLTIuOCAwLTUuNi42LTh2LS4yaC4xbC4xLS4xaC4yYS4zLjMgMCAwIDEgLjIuNGMtLjYgMi40LS42IDUuMi0uNiA3LjlsLS4xLjJoLS4yWiIvPgogIDxwYXRoIGZpbGw9IiMxMjEyMTIiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEwMjUuMiA3NzEuMmM0LjMgMCA3LjgtLjYgNy44LTEuMyAwLS44LTMuNS0xLjQtNy44LTEuNC00LjQgMC03LjkuNi03LjkgMS40IDAgLjcgMy41IDEuMyA3LjkgMS4zWiIvPgogIDxwYXRoIGZpbGw9IiM2NmE4ZjciIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEwNTMuOCA3MjkuOGE5Mi44IDkyLjggMCAwIDEtNTQuMi0xNy43Yy0uMi0uMi0uNC0uNS0uNC0uOGExLjIgMS4yIDAgMCAxIDEtMS40Yy4zIDAgLjYgMCAuOS4yYTg4LjkgODguOSAwIDAgMCA1My4yIDE3LjNsLjUuMmExLjMgMS4zIDAgMCAxIC4zIDEgMS4zIDEuMyAwIDAgMS0uMy44bC0uNS4zaC0uNVoiLz4KPC9zdmc+");

/***/ }),

/***/ "./src/icons/help-bubble.svg":
/*!***********************************!*\
  !*** ./src/icons/help-bubble.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgHelpBubble),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _circle, _circle2, _circle3, _circle4;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgHelpBubble = function SvgHelpBubble(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 27,
    height: 27,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#0F172A",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.2,
    d: "M20.25 11.511c.884.285 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193q-.51.041-1.02.072v3.091l-3-3q-2.031 0-4.02-.163a2.1 2.1 0 0 1-.825-.242m9.345-8.334a2 2 0 0 0-.476-.095 48.7 48.7 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V9.637c0-1.621-1.152-3.026-2.76-3.235A48.5 48.5 0 0 0 11.25 6c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235q.865.113 1.74.194V24l4.155-4.155"
  })), _circle || (_circle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: 19,
    cy: 8,
    r: 7,
    fill: "#4F73C6",
    stroke: "#fff",
    strokeWidth: 2
  })), _circle2 || (_circle2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: 16,
    cy: 8,
    r: 1,
    fill: "#fff"
  })), _circle3 || (_circle3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: 19,
    cy: 8,
    r: 1,
    fill: "#fff"
  })), _circle4 || (_circle4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: 22,
    cy: 8,
    r: 1,
    fill: "#fff"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjI1IDExLjUxMUMyMS4xMzQxIDExLjc5NTUgMjEuNzUgMTIuNjM5MiAyMS43NSAxMy42MDgyVjE3Ljg5MzhDMjEuNzUgMTkuMDMwNCAyMC45MDI2IDE5Ljk5NDMgMTkuNzY5NyAyMC4wODY3QzE5LjQzMDggMjAuMTE0NCAxOS4wOTA5IDIwLjEzODYgMTguNzUgMjAuMTU5MlYyMy4yNUwxNS43NSAyMC4yNUMxNC4zOTYzIDIwLjI1IDEzLjA1NTYgMjAuMTk0OCAxMS43MzAyIDIwLjA4NjZDMTEuNDMxOSAyMC4wNjIzIDExLjE1MzQgMTkuOTc3NSAxMC45MDQ5IDE5Ljg0NTFNMjAuMjUgMTEuNTExQzIwLjA5ODYgMTEuNDYyMyAxOS45MzkzIDExLjQzIDE5Ljc3MzkgMTEuNDE2M0MxOC40NDcyIDExLjMwNjIgMTcuMTA1MSAxMS4yNSAxNS43NSAxMS4yNUMxNC4zOTQ4IDExLjI1IDEzLjA1MjggMTEuMzA2MiAxMS43MjYxIDExLjQxNjNDMTAuNTk1IDExLjUxMDEgOS43NSAxMi40NzMyIDkuNzUgMTMuNjA4MlYxNy44OTM3QzkuNzUgMTguNzMxIDEwLjIwOTkgMTkuNDc0NiAxMC45MDQ5IDE5Ljg0NTFNMjAuMjUgMTEuNTExVjkuNjM3MzFDMjAuMjUgOC4wMTU4OSAxOS4wOTgzIDYuNjEwNjUgMTcuNDkwMyA2LjQwMTkxQzE1LjQ0NzggNi4xMzY3NiAxMy4zNjUgNiAxMS4yNTAzIDZDOS4xMzUzMyA2IDcuMDUyMzMgNi4xMzY3OCA1LjAwOTYzIDYuNDAxOTlDMy40MDE3MyA2LjYxMDc0IDIuMjUgOC4wMTU5OCAyLjI1IDkuNjM3MzhWMTUuODYyNkMyLjI1IDE3LjQ4NCAzLjQwMTczIDE4Ljg4OTMgNS4wMDk2NCAxOS4wOThDNS41ODY2MSAxOS4xNzI5IDYuMTY2NzkgMTkuMjM3NiA2Ljc1IDE5LjI5MThWMjRMMTAuOTA0OSAxOS44NDUxIiBzdHJva2U9IiMwRjE3MkEiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iMTkiIGN5PSI4IiByPSI3IiBmaWxsPSIjNEY3M0M2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSI4IiByPSIxIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIxOSIgY3k9IjgiIHI9IjEiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjIyIiBjeT0iOCIgcj0iMSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==");

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

/***/ "./src/icons/helpcenter-chat-bubble-icon.svg":
/*!***************************************************!*\
  !*** ./src/icons/helpcenter-chat-bubble-icon.svg ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgHelpcenterChatBubbleIcon),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgHelpcenterChatBubbleIcon = function SvgHelpcenterChatBubbleIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#0F172A",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.2,
    d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193q-.51.041-1.02.072v3.091l-3-3q-2.031 0-4.02-.163a2.1 2.1 0 0 1-.825-.242m9.345-8.334a2 2 0 0 0-.476-.095 48.6 48.6 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.5 48.5 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235q.865.113 1.74.194V21l4.155-4.155"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjI1IDguNTExMDRDMjEuMTM0MSA4Ljc5NTQ5IDIxLjc1IDkuNjM5MiAyMS43NSAxMC42MDgyVjE0Ljg5MzhDMjEuNzUgMTYuMDMwNCAyMC45MDI2IDE2Ljk5NDMgMTkuNzY5NyAxNy4wODY3QzE5LjQzMDggMTcuMTE0NCAxOS4wOTA5IDE3LjEzODYgMTguNzUgMTcuMTU5MlYyMC4yNUwxNS43NSAxNy4yNUMxNC4zOTYzIDE3LjI1IDEzLjA1NTYgMTcuMTk0OCAxMS43MzAyIDE3LjA4NjZDMTEuNDMxOSAxNy4wNjIzIDExLjE1MzQgMTYuOTc3NSAxMC45MDQ5IDE2Ljg0NTFNMjAuMjUgOC41MTEwNEMyMC4wOTg2IDguNDYyMzIgMTkuOTM5MyA4LjQzIDE5Ljc3MzkgOC40MTYyOEMxOC40NDcyIDguMzA2MTYgMTcuMTA1MSA4LjI1IDE1Ljc1IDguMjVDMTQuMzk0OCA4LjI1IDEzLjA1MjggOC4zMDYxNiAxMS43MjYxIDguNDE2MjdDMTAuNTk1IDguNTEwMTUgOS43NSA5LjQ3MzIzIDkuNzUgMTAuNjA4MlYxNC44OTM3QzkuNzUgMTUuNzMxIDEwLjIwOTkgMTYuNDc0NiAxMC45MDQ5IDE2Ljg0NTFNMjAuMjUgOC41MTEwNFY2LjYzNzMxQzIwLjI1IDUuMDE1ODkgMTkuMDk4MyAzLjYxMDY1IDE3LjQ5MDMgMy40MDE5MUMxNS40NDc4IDMuMTM2NzYgMTMuMzY1IDMgMTEuMjUwMyAzQzkuMTM1MzMgMyA3LjA1MjMzIDMuMTM2NzggNS4wMDk2MyAzLjQwMTk5QzMuNDAxNzMgMy42MTA3NCAyLjI1IDUuMDE1OTggMi4yNSA2LjYzNzM4VjEyLjg2MjZDMi4yNSAxNC40ODQgMy40MDE3MyAxNS44ODkzIDUuMDA5NjQgMTYuMDk4QzUuNTg2NjEgMTYuMTcyOSA2LjE2Njc5IDE2LjIzNzYgNi43NSAxNi4yOTE4VjIxTDEwLjkwNDkgMTYuODQ1MSIgc3Ryb2tlPSIjMEYxNzJBIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=");

/***/ }),

/***/ "./src/icons/noresults-icon.svg":
/*!**************************************!*\
  !*** ./src/icons/noresults-icon.svg ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgNoresultsIcon),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2, _path3;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgNoresultsIcon = function SvgNoresultsIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 92,
    height: 58,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#ECF1F9",
    fillOpacity: 0.53,
    d: "M91.282 29.475c-.595-1.15-.367-2.762-.578-4.06-.264-1.619-.962-3.136-1.707-4.637-2.545-5.118-6.678-9.245-11.664-12.593C66.533.93 51.813-.602 38.703.767c-7.315.763-13.61 4.055-16.536 10.47-1.955 4.287-.097 7.154 3.043 10.208 2.635 2.564 6.212 5.628 4.845 9.517-2.236 6.36-13.937 7.322-11.882 15.684 3.16 12.86 26.217 11.643 36.51 10.062 13.352-2.05 39.26-8.764 36.768-25.53-.193-1.299-.734-2.55-.752-3.877m-72.02-5.912c-.502 5.553-7.478 6.812-12.369 5.309C.3 24.85-.878 18.719 1.713 13.758c2.195-4.203 7.05-5.48 11.42-3.498 4.86 2.204 5.825 7.534 5.46 12.167"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#9EA5B6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.5,
    d: "m83.625 50.625-9.31-9.31m0 0a13.4 13.4 0 0 0 3.935-9.502c0-7.422-6.016-13.438-13.437-13.438-7.422 0-13.438 6.016-13.438 13.438 0 7.42 6.016 13.437 13.438 13.437 3.71 0 7.07-1.504 9.501-3.936"
  })), _path3 || (_path3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#9EA5B6",
    d: "M34.5 22a.35.35 0 0 1-.35-.349v-1.996a.35.35 0 1 1 .7 0v1.996a.35.35 0 0 1-.35.35M34.5 13.695a.35.35 0 0 1-.35-.35V11.35a.35.35 0 1 1 .7 0v1.996a.35.35 0 0 1-.35.35M31.346 16.85h-1.997a.35.35 0 1 1 0-.7h1.997a.35.35 0 1 1 0 .7M39.65 16.85h-1.996a.35.35 0 1 1 0-.7h1.996a.35.35 0 1 1 0 .7M43 38a.254.254 0 0 1-.254-.254v-1.452a.254.254 0 1 1 .508 0v1.452c0 .14-.113.255-.254.255M43 31.96a.254.254 0 0 1-.254-.254v-1.452a.254.254 0 1 1 .508 0v1.452c0 .14-.113.254-.254.254M40.706 34.254h-1.452a.254.254 0 1 1 0-.508h1.452a.254.254 0 1 1 0 .508M46.746 34.254h-1.452a.254.254 0 1 1 0-.508h1.452a.254.254 0 1 1 0 .508M48 16a.254.254 0 0 1-.254-.254v-1.452a.254.254 0 1 1 .508 0v1.452c0 .14-.113.254-.254.254M48 9.96a.254.254 0 0 1-.254-.254V8.254a.254.254 0 1 1 .508 0v1.452c0 .14-.113.254-.254.254M45.706 12.254h-1.452a.254.254 0 1 1 0-.508h1.452a.254.254 0 1 1 0 .508M51.746 12.254h-1.452a.254.254 0 1 1 0-.508h1.452a.254.254 0 1 1 0 .508"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iNTgiIHZpZXdCb3g9IjAgMCA5MiA1OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkxLjI4MTggMjkuNDc0OEM5MC42ODcgMjguMzI0MiA5MC45MTQ5IDI2LjcxMzEgOTAuNzAzNSAyNS40MTVDOTAuNDQwMSAyMy43OTYyIDg5Ljc0MjQgMjIuMjc4NiA4OC45OTY2IDIwLjc3ODFDODYuNDUyMSAxNS42NTk1IDgyLjMxODggMTEuNTMyNSA3Ny4zMzMzIDguMTg0NTFDNjYuNTMyOCAwLjkzMDkyMiA1MS44MTM3IC0wLjYwMjA3MSAzOC43MDM4IDAuNzY2NTA5QzMxLjM4ODEgMS41MzAyNCAyNS4wOTI5IDQuODIyMjcgMjIuMTY3NCAxMS4yMzYyQzIwLjIxMTggMTUuNTIzNSAyMi4wNjk4IDE4LjM5MTMgMjUuMjA5NyAyMS40NDUzQzI3Ljg0NTQgMjQuMDA4NiAzMS40MjIxIDI3LjA3MzUgMzAuMDU0OCAzMC45NjE5QzI3LjgxODUgMzcuMzIyNyAxNi4xMTg0IDM4LjI4MzYgMTguMTczIDQ2LjY0NkMyMS4zMzI1IDU5LjUwNTYgNDQuMzg5OSA1OC4yODg3IDU0LjY4MjcgNTYuNzA4QzY4LjAzNDcgNTQuNjU3OSA5My45NDM2IDQ3Ljk0NCA5MS40NTA2IDMxLjE3NzJDOTEuMjU3NiAyOS44Nzk0IDkwLjcxNjggMjguNjI3NyA5MC42OTg5IDI3LjMwMTRNMTguNjc5MyAyMS4zODk0QzE4LjE3NjcgMjYuOTQyMiAxMS4yMDA5IDI4LjIwMDkgNi4zMDk5NiAyNi42OTc5QzAuMzAwNzU4IDI0Ljg1MTMgLTAuODc3OTg0IDE4LjcxOTIgMS43MTMgMTMuNzU3NkMzLjkwNzY1IDkuNTU0ODMgOC43NjI5MiA4LjI3ODY5IDEzLjEzMjcgMTAuMjU5OEMxNy45OTM4IDEyLjQ2MzUgMTguOTU4MSAxNy43OTQgMTguNTkyOCAyMi40MjY5IiBmaWxsPSIjRUNGMUY5IiBmaWxsLW9wYWNpdHk9IjAuNTMiLz4KPHBhdGggZD0iTTgzLjYyNSA1MC42MjVMNzQuMzE0MiA0MS4zMTQyTTc0LjMxNDIgNDEuMzE0MkM3Ni43NDYgMzguODgyNSA3OC4yNSAzNS41MjMyIDc4LjI1IDMxLjgxMjVDNzguMjUgMjQuMzkxMiA3Mi4yMzM4IDE4LjM3NSA2NC44MTI1IDE4LjM3NUM1Ny4zOTEyIDE4LjM3NSA1MS4zNzUgMjQuMzkxMiA1MS4zNzUgMzEuODEyNUM1MS4zNzUgMzkuMjMzOCA1Ny4zOTEyIDQ1LjI1IDY0LjgxMjUgNDUuMjVDNjguNTIzMiA0NS4yNSA3MS44ODI1IDQzLjc0NiA3NC4zMTQyIDQxLjMxNDJaIiBzdHJva2U9IiM5RUE1QjYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTM0LjQ5OTkgMjIuMDAwN0MzNC4zMDY4IDIyLjAwMDcgMzQuMTUwNCAyMS44NDQzIDM0LjE1MDQgMjEuNjUxMlYxOS42NTQ5QzM0LjE1MDQgMTkuNDYxOCAzNC4zMDY4IDE5LjMwNTQgMzQuNDk5OSAxOS4zMDU0QzM0LjY5MyAxOS4zMDU0IDM0Ljg0OTQgMTkuNDYxOCAzNC44NDk0IDE5LjY1NDlWMjEuNjUxMkMzNC44NDk0IDIxLjg0NDMgMzQuNjkzIDIyLjAwMDcgMzQuNDk5OSAyMi4wMDA3WiIgZmlsbD0iIzlFQTVCNiIvPgo8cGF0aCBkPSJNMzQuNDk5OSAxMy42OTUzQzM0LjMwNjggMTMuNjk1MyAzNC4xNTA0IDEzLjUzODkgMzQuMTUwNCAxMy4zNDU4VjExLjM0OTVDMzQuMTUwNCAxMS4xNTY0IDM0LjMwNjggMTEgMzQuNDk5OSAxMUMzNC42OTMgMTEgMzQuODQ5NCAxMS4xNTY0IDM0Ljg0OTQgMTEuMzQ5NVYxMy4zNDU4QzM0Ljg0OTQgMTMuNTM4OSAzNC42OTMgMTMuNjk1MyAzNC40OTk5IDEzLjY5NTNaIiBmaWxsPSIjOUVBNUI2Ii8+CjxwYXRoIGQ9Ik0zMS4zNDU4IDE2Ljg0OTRIMjkuMzQ5NUMyOS4xNTY0IDE2Ljg0OTQgMjkgMTYuNjkzIDI5IDE2LjQ5OTlDMjkgMTYuMzA2OCAyOS4xNTY0IDE2LjE1MDQgMjkuMzQ5NSAxNi4xNTA0SDMxLjM0NThDMzEuNTM4OSAxNi4xNTA0IDMxLjY5NTMgMTYuMzA2OCAzMS42OTUzIDE2LjQ5OTlDMzEuNjk1MyAxNi42OTMgMzEuNTM4OSAxNi44NDk0IDMxLjM0NTggMTYuODQ5NFoiIGZpbGw9IiM5RUE1QjYiLz4KPHBhdGggZD0iTTM5LjY1MDQgMTYuODQ5NEgzNy42NTQyQzM3LjQ2MTEgMTYuODQ5NCAzNy4zMDQ3IDE2LjY5MyAzNy4zMDQ3IDE2LjQ5OTlDMzcuMzA0NyAxNi4zMDY4IDM3LjQ2MTEgMTYuMTUwNCAzNy42NTQyIDE2LjE1MDRIMzkuNjUwNEMzOS44NDM2IDE2LjE1MDQgNDAgMTYuMzA2OCA0MCAxNi40OTk5QzQwIDE2LjY5MyAzOS44NDM2IDE2Ljg0OTQgMzkuNjUwNCAxNi44NDk0WiIgZmlsbD0iIzlFQTVCNiIvPgo8cGF0aCBkPSJNNDMuMDAwMyAzOC4wMDA1QzQyLjg1OTggMzguMDAwNSA0Mi43NDYxIDM3Ljg4NjcgNDIuNzQ2MSAzNy43NDYzVjM2LjI5NDVDNDIuNzQ2MSAzNi4xNTQgNDIuODU5OCAzNi4wNDAzIDQzLjAwMDMgMzYuMDQwM0M0My4xNDA3IDM2LjA0MDMgNDMuMjU0NSAzNi4xNTQgNDMuMjU0NSAzNi4yOTQ1VjM3Ljc0NjNDNDMuMjU0NSAzNy44ODY3IDQzLjE0MDcgMzguMDAwNSA0My4wMDAzIDM4LjAwMDVaIiBmaWxsPSIjOUVBNUI2Ii8+CjxwYXRoIGQ9Ik00My4wMDAzIDMxLjk2MDJDNDIuODU5OCAzMS45NjAyIDQyLjc0NjEgMzEuODQ2NSA0Mi43NDYxIDMxLjcwNlYzMC4yNTQyQzQyLjc0NjEgMzAuMTEzNyA0Mi44NTk4IDMwIDQzLjAwMDMgMzBDNDMuMTQwNyAzMCA0My4yNTQ1IDMwLjExMzcgNDMuMjU0NSAzMC4yNTQyVjMxLjcwNkM0My4yNTQ1IDMxLjg0NjUgNDMuMTQwNyAzMS45NjAyIDQzLjAwMDMgMzEuOTYwMloiIGZpbGw9IiM5RUE1QjYiLz4KPHBhdGggZD0iTTQwLjcwNiAzNC4yNTQxSDM5LjI1NDJDMzkuMTEzNyAzNC4yNTQxIDM5IDM0LjE0MDQgMzkgMzMuOTk5OUMzOSAzMy44NTk1IDM5LjExMzcgMzMuNzQ1NyAzOS4yNTQyIDMzLjc0NTdINDAuNzA2QzQwLjg0NjUgMzMuNzQ1NyA0MC45NjAyIDMzLjg1OTUgNDAuOTYwMiAzMy45OTk5QzQwLjk2MDIgMzQuMTQwNCA0MC44NDY1IDM0LjI1NDEgNDAuNzA2IDM0LjI1NDFaIiBmaWxsPSIjOUVBNUI2Ii8+CjxwYXRoIGQ9Ik00Ni43NDYgMzQuMjU0MUg0NS4yOTQyQzQ1LjE1MzggMzQuMjU0MSA0NS4wNCAzNC4xNDA0IDQ1LjA0IDMzLjk5OTlDNDUuMDQgMzMuODU5NSA0NS4xNTM4IDMzLjc0NTcgNDUuMjk0MiAzMy43NDU3SDQ2Ljc0NkM0Ni44ODY1IDMzLjc0NTcgNDcuMDAwMiAzMy44NTk1IDQ3LjAwMDIgMzMuOTk5OUM0Ny4wMDAyIDM0LjE0MDQgNDYuODg2NSAzNC4yNTQxIDQ2Ljc0NiAzNC4yNTQxWiIgZmlsbD0iIzlFQTVCNiIvPgo8cGF0aCBkPSJNNDguMDAwMyAxNi4wMDA1QzQ3Ljg1OTggMTYuMDAwNSA0Ny43NDYxIDE1Ljg4NjcgNDcuNzQ2MSAxNS43NDYzVjE0LjI5NDVDNDcuNzQ2MSAxNC4xNTQgNDcuODU5OCAxNC4wNDAzIDQ4LjAwMDMgMTQuMDQwM0M0OC4xNDA3IDE0LjA0MDMgNDguMjU0NSAxNC4xNTQgNDguMjU0NSAxNC4yOTQ1VjE1Ljc0NjNDNDguMjU0NSAxNS44ODY3IDQ4LjE0MDcgMTYuMDAwNSA0OC4wMDAzIDE2LjAwMDVaIiBmaWxsPSIjOUVBNUI2Ii8+CjxwYXRoIGQ9Ik00OC4wMDAzIDkuOTYwMkM0Ny44NTk4IDkuOTYwMiA0Ny43NDYxIDkuODQ2NDYgNDcuNzQ2MSA5LjcwNlY4LjI1NDE5QzQ3Ljc0NjEgOC4xMTM3MyA0Ny44NTk4IDggNDguMDAwMyA4QzQ4LjE0MDcgOCA0OC4yNTQ1IDguMTEzNzMgNDguMjU0NSA4LjI1NDE5VjkuNzA2QzQ4LjI1NDUgOS44NDY0NiA0OC4xNDA3IDkuOTYwMiA0OC4wMDAzIDkuOTYwMloiIGZpbGw9IiM5RUE1QjYiLz4KPHBhdGggZD0iTTQ1LjcwNiAxMi4yNTQxSDQ0LjI1NDJDNDQuMTEzNyAxMi4yNTQxIDQ0IDEyLjE0MDQgNDQgMTEuOTk5OUM0NCAxMS44NTk1IDQ0LjExMzcgMTEuNzQ1NyA0NC4yNTQyIDExLjc0NTdINDUuNzA2QzQ1Ljg0NjUgMTEuNzQ1NyA0NS45NjAyIDExLjg1OTUgNDUuOTYwMiAxMS45OTk5QzQ1Ljk2MDIgMTIuMTQwNCA0NS44NDY1IDEyLjI1NDEgNDUuNzA2IDEyLjI1NDFaIiBmaWxsPSIjOUVBNUI2Ii8+CjxwYXRoIGQ9Ik01MS43NDYgMTIuMjU0MUg1MC4yOTQyQzUwLjE1MzggMTIuMjU0MSA1MC4wNCAxMi4xNDA0IDUwLjA0IDExLjk5OTlDNTAuMDQgMTEuODU5NSA1MC4xNTM4IDExLjc0NTcgNTAuMjk0MiAxMS43NDU3SDUxLjc0NkM1MS44ODY1IDExLjc0NTcgNTIuMDAwMiAxMS44NTk1IDUyLjAwMDIgMTEuOTk5OUM1Mi4wMDAyIDEyLjE0MDQgNTEuODg2NSAxMi4yNTQxIDUxLjc0NiAxMi4yNTQxWiIgZmlsbD0iIzlFQTVCNiIvPgo8L3N2Zz4K");

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

/***/ "./src/icons/reload.svg":
/*!******************************!*\
  !*** ./src/icons/reload.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgReload),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgReload = function SvgReload(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 9,
    height: 8,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3F73D9",
    fillRule: "evenodd",
    d: "M1.162 3.137C1.656 1.36 3.55.305 5.394.781a3.47 3.47 0 0 1 1.55.862l.877.846H6.354a.34.34 0 0 0-.346.333.34.34 0 0 0 .346.333h2.3c.092 0 .18-.035.245-.098A.33.33 0 0 0 9 2.822V.603A.34.34 0 0 0 8.654.27a.34.34 0 0 0-.345.333v1.413l-.876-.844A4.17 4.17 0 0 0 5.573.137C3.361-.434 1.087.832.494 2.965c-.05.178.06.36.244.408a.347.347 0 0 0 .424-.236m7.1 1.49a.347.347 0 0 0-.424.236C7.344 6.64 5.45 7.695 3.605 7.219a3.47 3.47 0 0 1-1.549-.862l-.876-.846h1.466a.34.34 0 0 0 .346-.333.34.34 0 0 0-.346-.333h-2.3A.34.34 0 0 0 0 5.178v2.219a.34.34 0 0 0 .346.333.34.34 0 0 0 .345-.333V5.983l.876.845c.498.481 1.13.846 1.86 1.035 2.212.571 4.486-.695 5.079-2.828a.33.33 0 0 0-.245-.408",
    clipRule: "evenodd"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOSA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEuMTYxNyAzLjEzNzQ4QzEuNjU1NyAxLjM1OTcgMy41NTA3NiAwLjMwNDY5MiA1LjM5NDQyIDAuNzgxMDQ2QzYuMDAzMTMgMC45MzgzMjIgNi41MjkyOCAxLjI0MjMzIDYuOTQzOTMgMS42NDI5Mkw3LjgyMDg2IDIuNDg4NTFINi4zNTM4MUM2LjE2Mjk0IDIuNDg4NTEgNi4wMDgyIDIuNjM3NzIgNi4wMDgyIDIuODIxNzdDNi4wMDgyIDMuMDA1ODEgNi4xNjI5NCAzLjE1NTAyIDYuMzUzODEgMy4xNTUwMkg4LjY1NDRDOC43NDYwNyAzLjE1NTAyIDguODMzOTggMy4xMTk5IDguODk4NzkgMy4wNTczOUM4Ljk2MzYxIDIuOTk0ODkgOS4wMDAwMSAyLjkxMDExIDkgMi44MjE3MlYwLjYwMzM4MUM5IDAuNDE5MzMyIDguODQ1MjcgMC4yNzAxMyA4LjY1NDQgMC4yNzAxM0M4LjQ2MzUzIDAuMjcwMTMgOC4zMDg4IDAuNDE5MzMyIDguMzA4OCAwLjYwMzM4MVYyLjAxNjQ0TDcuNDMzMTQgMS4xNzIwN0M2LjkzNDk0IDAuNjkwODIgNi4zMDI0OCAwLjMyNTY1NCA1LjU3MzMyIDAuMTM3MjU1QzMuMzYwOTIgLTAuNDM0MzcgMS4wODY4NiAwLjgzMTY0NiAwLjQ5NDA0OCAyLjk2NDk4QzAuNDQ0NjQ3IDMuMTQyNzYgMC41NTQwNTggMy4zMjU0OSAwLjczODQyNCAzLjM3MzEzQzAuOTIyNzkgMy40MjA3NiAxLjExMjMgMy4zMTUyNiAxLjE2MTcgMy4xMzc0OFpNOC4yNjE0NiA0LjYyNjg3QzguMDc3MDkgNC41NzkyNCA3Ljg4NzU5IDQuNjg0NzQgNy44MzgxOCA0Ljg2MjUyQzcuMzQ0MTggNi42NDAzIDUuNDQ5MTIgNy42OTUzMSAzLjYwNTQ2IDcuMjE4OTVDMi45OTY3NSA3LjA2MTY4IDIuNDcwNjEgNi43NTc2OCAyLjA1NTk2IDYuMzU3MDlMMS4xNzk1NyA1LjUxMTQ3SDIuNjQ2MjFDMi44MzcwOCA1LjUxMTQ3IDIuOTkxODEgNS4zNjIyNyAyLjk5MTgxIDUuMTc4MjJDMi45OTE4MSA0Ljk5NDE3IDIuODM3MDggNC44NDQ5NyAyLjY0NjIxIDQuODQ0OTdMMC4zNDU2IDQuODQ0OTdDMC4xNTQ3MzEgNC44NDQ5NyAwIDQuOTk0MTcgMCA1LjE3ODIyVjcuMzk2NjJDMCA3LjU4MDY3IDAuMTU0NzMxIDcuNzI5ODcgMC4zNDU2IDcuNzI5ODdDMC41MzY0NyA3LjcyOTg3IDAuNjkxMjAxIDcuNTgwNjcgMC42OTEyMDEgNy4zOTY2MlY1Ljk4MzEzTDEuNTY2NzUgNi44Mjc5NEMyLjA2NDk3IDcuMzA5MjUgMi42OTczNCA3LjY3NDMzIDMuNDI2NTYgNy44NjI3NEM1LjYzODk2IDguNDM0MzcgNy45MTMwMiA3LjE2ODM1IDguNTA1ODMgNS4wMzUwMkM4LjU1NTIzIDQuODU3MjQgOC40NDU4MiA0LjY3NDUxIDguMjYxNDYgNC42MjY4N1oiIGZpbGw9IiMzRjczRDkiLz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./src/icons/thumb-down.svg":
/*!**********************************!*\
  !*** ./src/icons/thumb-down.svg ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgThumbDown),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2, _g, _circle, _path3, _defs;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgThumbDown = function SvgThumbDown(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    fill: "none",
    viewBox: "0 0 29 29"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#F5F5F5",
    d: "M0 0h29v29H0z"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#thumb-down_svg__a)",
    d: "M-1108-641H52v928h-1160z"
  })), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    filter: "url(#thumb-down_svg__b)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M-251-641H52v928h-303z"
  }))), _circle || (_circle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: 14.5,
    cy: 14.5,
    r: 14.5,
    fill: "#FFE4E4"
  })), _path3 || (_path3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#C71A1A",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.2,
    d: "M11.04 16.75h-2.4c-.8 0-1.5-.54-1.59-1.33a9.36 9.36 0 0 1 1.99-6.85c.3-.38.76-.57 1.23-.57h3.1c.36 0 .73.06 1.09.18l2.4.8c.34.13.71.19 1.09.19h1m-7.91 7.58c.47 0 .76.56.55 1-.35.76-.55 1.6-.55 2.5 0 .97.77 1.75 1.73 1.75.32 0 .58-.26.58-.58v-.5c0-.44.08-.88.24-1.3.24-.59.72-1.03 1.28-1.33.85-.46 1.6-1.1 2.2-1.87.38-.49.94-.84 1.56-.84h.3m-7.9 1.17h1.7m6.21-7.58.04.11a7.04 7.04 0 0 1-.06 6.3m.02-6.41c-.06-.29.14-.59.44-.59h.7c.69 0 1.32.4 1.52 1.07a9.43 9.43 0 0 1-.24 6.15c-.23.6-.83.95-1.47.95h-.81c-.37 0-.58-.43-.39-.75.08-.13.16-.27.23-.42"
  })), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pattern", {
    id: "thumb-down_svg__a",
    width: 1,
    height: 1,
    patternContentUnits: "objectBoundingBox"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", {
    xlinkHref: "#thumb-down_svg__c",
    transform: "scale(0)"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", {
    id: "thumb-down_svg__b",
    width: 327,
    height: 952,
    x: -263,
    y: -649,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", {
    "in": "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMorphology", {
    "in": "SourceAlpha",
    operator: "dilate",
    radius: 8,
    result: "effect1_dropShadow_58_120"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", {
    dy: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", {
    values: "0 0 0 0 0.371717 0 0 0 0 0.672951 0 0 0 0 0.919415 0 0 0 0.1 0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_58_120"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feBlend", {
    "in": "SourceGraphic",
    in2: "effect1_dropShadow_58_120",
    result: "shape"
  })))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMjkgMjkiPgogIDxwYXRoIGZpbGw9IiNGNUY1RjUiIGQ9Ik0wIDBoMjl2MjlIMHoiLz4KICA8cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNLTExMDgtNjQxSDUydjkyOGgtMTE2MHoiLz4KICA8ZyBmaWx0ZXI9InVybCgjYikiPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTS0yNTEtNjQxSDUydjkyOGgtMzAzeiIvPgogIDwvZz4KICA8Y2lyY2xlIGN4PSIxNC41IiBjeT0iMTQuNSIgcj0iMTQuNSIgZmlsbD0iI0ZGRTRFNCIvPgogIDxwYXRoIHN0cm9rZT0iI0M3MUExQSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuMiIgZD0iTTExLjA0IDE2Ljc1aC0yLjRjLS44IDAtMS41LS41NC0xLjU5LTEuMzNhOS4zNiA5LjM2IDAgMCAxIDEuOTktNi44NWMuMy0uMzguNzYtLjU3IDEuMjMtLjU3aDMuMWMuMzYgMCAuNzMuMDYgMS4wOS4xOGwyLjQuOGMuMzQuMTMuNzEuMTkgMS4wOS4xOWgxbS03LjkxIDcuNThjLjQ3IDAgLjc2LjU2LjU1IDEtLjM1Ljc2LS41NSAxLjYtLjU1IDIuNSAwIC45Ny43NyAxLjc1IDEuNzMgMS43NS4zMiAwIC41OC0uMjYuNTgtLjU4di0uNWMwLS40NC4wOC0uODguMjQtMS4zLjI0LS41OS43Mi0xLjAzIDEuMjgtMS4zMy44NS0uNDYgMS42LTEuMSAyLjItMS44Ny4zOC0uNDkuOTQtLjg0IDEuNTYtLjg0aC4zbS03LjkgMS4xN2gxLjdtNi4yMS03LjU4LjA0LjExYTcuMDQgNy4wNCAwIDAgMS0uMDYgNi4zbS4wMi02LjQxYy0uMDYtLjI5LjE0LS41OS40NC0uNTloLjdjLjY5IDAgMS4zMi40IDEuNTIgMS4wN2E5LjQzIDkuNDMgMCAwIDEtLjI0IDYuMTVjLS4yMy42LS44My45NS0xLjQ3Ljk1aC0uODFjLS4zNyAwLS41OC0uNDMtLjM5LS43NS4wOC0uMTMuMTYtLjI3LjIzLS40MiIvPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIHBhdHRlcm5Db250ZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgPHVzZSB4bGluazpocmVmPSIjYyIgdHJhbnNmb3JtPSJzY2FsZSgwKSIvPgogICAgPC9wYXR0ZXJuPgogICAgPGZpbHRlciBpZD0iYiIgd2lkdGg9IjMyNyIgaGVpZ2h0PSI5NTIiIHg9Ii0yNjMiIHk9Ii02NDkiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KICAgICAgPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9ImhhcmRBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPgogICAgICA8ZmVNb3JwaG9sb2d5IGluPSJTb3VyY2VBbHBoYSIgb3BlcmF0b3I9ImRpbGF0ZSIgcmFkaXVzPSI4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd181OF8xMjAiLz4KICAgICAgPGZlT2Zmc2V0IGR5PSI0Ii8+CiAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KICAgICAgPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0ib3V0Ii8+CiAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjM3MTcxNyAwIDAgMCAwIDAuNjcyOTUxIDAgMCAwIDAgMC45MTk0MTUgMCAwIDAgMC4xIDAiLz4KICAgICAgPGZlQmxlbmQgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzU4XzEyMCIvPgogICAgICA8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfNThfMTIwIiByZXN1bHQ9InNoYXBlIi8+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+Cjwvc3ZnPg==");

/***/ }),

/***/ "./src/icons/thumb-up.svg":
/*!********************************!*\
  !*** ./src/icons/thumb-up.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgThumbUp),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2, _g, _circle, _path3, _defs;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgThumbUp = function SvgThumbUp(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    fill: "none",
    viewBox: "0 0 29 29"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#F5F5F5",
    d: "M0 0h29v29H0z"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#thumb-up_svg__a)",
    d: "M-1070-641H90v928h-1160z"
  })), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    filter: "url(#thumb-up_svg__b)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M-213-641H90v928h-303z"
  }))), _circle || (_circle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    cx: 14.5,
    cy: 14.5,
    r: 14.5,
    fill: "#E4F5CB"
  })), _path3 || (_path3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#5CAA0A",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.2,
    d: "M17.963 11.875h2.404c.79 0 1.497.501 1.58 1.239q.053.457.053.928c0 2.056-.763 3.946-2.038 5.432-.298.347-.759.526-1.234.526h-3.09c-.371 0-.741-.056-1.094-.167l-2.396-.75a3.7 3.7 0 0 0-1.094-.166h-.996m7.905-7.042c-.476 0-.762-.523-.558-.926a5.1 5.1 0 0 0 .556-2.324c0-.897-.774-1.625-1.73-1.625-.319 0-.577.243-.577.542v.457c0 .414-.084.823-.248 1.207-.234.549-.716.961-1.271 1.24a6.9 6.9 0 0 0-2.201 1.732c-.383.458-.942.78-1.563.78h-.295m7.887-1.083h-1.694m-6.21 7.042a.4.4 0 0 0-.04-.107 6.15 6.15 0 0 1 .057-5.852m-.018 5.959a.45.45 0 0 1-.442.541h-.698c-.684 0-1.318-.374-1.518-.988a8.2 8.2 0 0 1-.4-2.532c0-1.122.227-2.193.64-3.177.234-.559.835-.886 1.475-.886h.81c.363 0 .573.402.384.693a6 6 0 0 0-.233.39"
  })), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pattern", {
    id: "thumb-up_svg__a",
    width: 1,
    height: 1,
    patternContentUnits: "objectBoundingBox"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("use", {
    xlinkHref: "#thumb-up_svg__c",
    transform: "scale(0)"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("filter", {
    id: "thumb-up_svg__b",
    width: 327,
    height: 952,
    x: -225,
    y: -649,
    colorInterpolationFilters: "sRGB",
    filterUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", {
    "in": "SourceAlpha",
    result: "hardAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feMorphology", {
    "in": "SourceAlpha",
    operator: "dilate",
    radius: 8,
    result: "effect1_dropShadow_58_120"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feOffset", {
    dy: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feColorMatrix", {
    values: "0 0 0 0 0.371717 0 0 0 0 0.672951 0 0 0 0 0.919415 0 0 0 0.1 0"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_58_120"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("feBlend", {
    "in": "SourceGraphic",
    in2: "effect1_dropShadow_58_120",
    result: "shape"
  })))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMjkgMjkiPgogIDxwYXRoIGZpbGw9IiNGNUY1RjUiIGQ9Ik0wIDBoMjl2MjlIMHoiLz4KICA8cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNLTEwNzAtNjQxSDkwdjkyOGgtMTE2MHoiLz4KICA8ZyBmaWx0ZXI9InVybCgjYikiPgogICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTS0yMTMtNjQxSDkwdjkyOGgtMzAzeiIvPgogIDwvZz4KICA8Y2lyY2xlIGN4PSIxNC41IiBjeT0iMTQuNSIgcj0iMTQuNSIgZmlsbD0iI0U0RjVDQiIvPgogIDxwYXRoIHN0cm9rZT0iIzVDQUEwQSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuMiIgZD0iTTE3Ljk2MyAxMS44NzVoMi40MDRjLjc5IDAgMS40OTcuNTAxIDEuNTggMS4yMzkuMDM1LjMwNC4wNTMuNjE0LjA1My45MjggMCAyLjA1Ni0uNzYzIDMuOTQ2LTIuMDM4IDUuNDMyLS4yOTguMzQ3LS43NTkuNTI2LTEuMjM0LjUyNmgtMy4wOWMtLjM3MSAwLS43NDEtLjA1Ni0xLjA5NC0uMTY3bC0yLjM5Ni0uNzVhMy42NyAzLjY3IDAgMCAwLTEuMDk0LS4xNjZoLS45OTZtNy45MDUtNy4wNDJjLS40NzYgMC0uNzYyLS41MjMtLjU1OC0uOTI2YTUuMTIzIDUuMTIzIDAgMCAwIC41NTYtMi4zMjRjMC0uODk3LS43NzQtMS42MjUtMS43My0xLjYyNS0uMzE5IDAtLjU3Ny4yNDMtLjU3Ny41NDJ2LjQ1N2MwIC40MTQtLjA4NC44MjMtLjI0OCAxLjIwNy0uMjM0LjU0OS0uNzE2Ljk2MS0xLjI3MSAxLjI0YTYuODY4IDYuODY4IDAgMCAwLTIuMjAxIDEuNzMyYy0uMzgzLjQ1OC0uOTQyLjc4LTEuNTYzLjc4aC0uMjk1bTcuODg3LTEuMDgzaC0xLjY5NG0tNi4yMSA3LjA0MmEuNDM3LjQzNyAwIDAgMC0uMDQtLjEwNyA2LjE1MSA2LjE1MSAwIDAgMSAuMDU3LTUuODUybS0uMDE4IDUuOTU5YS40NDkuNDQ5IDAgMCAxLS40NDIuNTQxaC0uNjk4Yy0uNjg0IDAtMS4zMTgtLjM3NC0xLjUxOC0uOTg4YTguMTc3IDguMTc3IDAgMCAxLS40LTIuNTMyYzAtMS4xMjIuMjI3LTIuMTkzLjY0LTMuMTc3LjIzNC0uNTU5LjgzNS0uODg2IDEuNDc1LS44ODZoLjgxYy4zNjMgMCAuNTczLjQwMi4zODQuNjkzYTYuNDQgNi40NCAwIDAgMC0uMjMzLjM5Ii8+CiAgPGRlZnM+CiAgICA8cGF0dGVybiBpZD0iYSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8dXNlIHhsaW5rOmhyZWY9IiNjIiB0cmFuc2Zvcm09InNjYWxlKDApIi8+CiAgICA8L3BhdHRlcm4+CiAgICA8ZmlsdGVyIGlkPSJiIiB3aWR0aD0iMzI3IiBoZWlnaHQ9Ijk1MiIgeD0iLTIyNSIgeT0iLTY0OSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgogICAgICA8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0iaGFyZEFscGhhIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CiAgICAgIDxmZU1vcnBob2xvZ3kgaW49IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iZGlsYXRlIiByYWRpdXM9IjgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzU4XzEyMCIvPgogICAgICA8ZmVPZmZzZXQgZHk9IjQiLz4KICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIvPgogICAgICA8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAuMzcxNzE3IDAgMCAwIDAgMC42NzI5NTEgMCAwIDAgMCAwLjkxOTQxNSAwIDAgMCAwLjEgMCIvPgogICAgICA8ZmVCbGVuZCBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfNThfMTIwIi8+CiAgICAgIDxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd181OF8xMjAiIHJlc3VsdD0ic2hhcGUiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KPC9zdmc+");

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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @newfold/js-utility-ui-analytics */ "./node_modules/@newfold/js-utility-ui-analytics/build/index.js");
/* harmony import */ var _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../store */ "./store/index.js");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../store/helpcenterSlice */ "./store/helpcenterSlice.js");
/* harmony import */ var _components_FloatingIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/FloatingIcon */ "./src/components/FloatingIcon.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Modal */ "./src/components/Modal.js");
/* harmony import */ var _icons_help_plugin_sidebar_icon_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./icons/help-plugin-sidebar-icon.svg */ "./src/icons/help-plugin-sidebar-icon.svg");
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./styles/styles.scss */ "./src/styles/styles.scss");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__);
// eslint-disable-next-line import/no-extraneous-dependencies




//


//









_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5___default()(() => {
  // Run only once DOM is ready, else this won't work.
  if (window?.nfdHelpCenter?.restUrl) {
    _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_4__.HiiveAnalytics.initialize({
      namespace: 'wonder_help',
      urls: {
        single: window.nfdHelpCenter.restUrl + '/newfold-data/v1/events'
      },
      dependencies: {
        wpData: (_wordpress_data__WEBPACK_IMPORTED_MODULE_3___default()),
        wpApiFetch: (_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default())
      }
    });
  }
});
const wpContentContainer = document.getElementById('wpcontent');
const toggleHelp = visible => {
  wpContentContainer.classList.toggle('wpcontent-container', visible);
  const nfdHelpContainer = document.getElementById('nfd-help-center');
  nfdHelpContainer.classList.toggle('help-container', visible);
  _utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.updateHelpVisible(visible);
  window.dispatchEvent(new Event('storage'));
  _utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.clearSearchInput();
  if (!visible) {
    _utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.clearSearchInput();
  }
};
const toggleHelpViaLocalStorage = () => {
  const helpVisible = _utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.getHelpVisible();
  if (Object.is(helpVisible, undefined)) {
    toggleHelp(true);
    _utils__WEBPACK_IMPORTED_MODULE_13__.Analytics.sendEvent('help_sidebar_opened', {
      page: window.location.href.toString()
    });
    return;
  }
  if (!helpVisible) {
    _utils__WEBPACK_IMPORTED_MODULE_13__.Analytics.sendEvent('help_sidebar_opened', {
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

    // Create separate container for FloatingIcon
    const floatingIconContainer = document.createElement('div');
    floatingIconContainer.id = 'nfd-hc-floating-icon-wrapper';
    wpContentContainer.appendChild(floatingIconContainer);
    const DOM_TARGET = document.getElementById('nfd-help-center');
    const FLOATING_ICON_TARGET = document.getElementById('nfd-hc-floating-icon-wrapper');
    const {
      hasLaunchedFromTooltip
    } = _store__WEBPACK_IMPORTED_MODULE_7__.store.getState().helpcenter;
    if (null !== DOM_TARGET) {
      if ('undefined' !== _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot) {
        // WP 6.2+ only
        (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(DOM_TARGET).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(react_redux__WEBPACK_IMPORTED_MODULE_6__.Provider, {
          store: _store__WEBPACK_IMPORTED_MODULE_7__.store,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_10__["default"], {
            onClose: () => {
              _utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.clear();
              _store__WEBPACK_IMPORTED_MODULE_7__.store.dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.resetState());
              toggleHelp(false);
            }
          })
        }));
        if (hasLaunchedFromTooltip) {
          (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(FLOATING_ICON_TARGET).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(react_redux__WEBPACK_IMPORTED_MODULE_6__.Provider, {
            store: _store__WEBPACK_IMPORTED_MODULE_7__.store,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_FloatingIcon__WEBPACK_IMPORTED_MODULE_9__["default"], {})
          }));
        }
      } else if ('undefined' !== _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render) {
        (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(react_redux__WEBPACK_IMPORTED_MODULE_6__.Provider, {
          store: _store__WEBPACK_IMPORTED_MODULE_7__.store,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_10__["default"], {
            onClose: () => {
              _utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.clear();
              _store__WEBPACK_IMPORTED_MODULE_7__.store.dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.resetState());
              toggleHelp(false);
            }
          })
        }), DOM_TARGET);

        // Render FloatingIcon in separate container
        if (hasLaunchedFromTooltip) {
          (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(react_redux__WEBPACK_IMPORTED_MODULE_6__.Provider, {
            store: _store__WEBPACK_IMPORTED_MODULE_7__.store,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_FloatingIcon__WEBPACK_IMPORTED_MODULE_9__["default"], {})
          }), FLOATING_ICON_TARGET);
        }
      }
    }
  }
};

//For rendering embedded help in Add, edit and View Pages
/* Using the subscribe from the store to keep the UI persistent */
const unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.subscribe)(() => {
  const wrapper = document.getElementById('nfd-help-menu-button-wrapper');
  if (wrapper) {
    unsubscribe(); // Unsubscribe from the state changes
    return;
  }
  _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5___default()(() => {
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
    const helpMenuButton = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("button", {
      className: "components-button has-icon",
      onClick: () => {
        window.newfoldEmbeddedHelp.toggleNFDLaunchedEmbeddedHelp();
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_icons_help_plugin_sidebar_icon_svg__WEBPACK_IMPORTED_MODULE_11__.ReactComponent, {})
    });
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)(helpMenuButton, document.getElementById('nfd-help-menu-button-wrapper'));
  });
});
window.newfoldEmbeddedHelp.renderEmbeddedHelp();

/* The method added to the window object can be used to open the help center pop and enter the text/query clicked */

window.newfoldEmbeddedHelp.launchNFDEmbeddedHelpQuery = function (selectedText, launchByElement) {
  const helpVisible = _utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.getHelpVisible();
  _utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.persistSearchInput(selectedText);
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

/* Detect click event on the calling element and  checking if the clicked element has a specific class name nfd-help-center-tip */
document.addEventListener('click', async event => {
  try {
    if (event.target?.classList?.contains('nfd-help-center-tip')) {
      !_utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.getHelpVisible() && document.getElementById('wp-admin-bar-help-center').querySelector('.ab-item').click();
      _store__WEBPACK_IMPORTED_MODULE_7__.store.dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.setIsTooltipLoading());
      const postId = event.target.dataset.postId;
      const results = await _utils__WEBPACK_IMPORTED_MODULE_13__.MultiSearchAPI.fetchTooltipSearchResults(postId);
      if (!results?.content) {
        _store__WEBPACK_IMPORTED_MODULE_7__.store.dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.updateIsTooltipLoading());
        _store__WEBPACK_IMPORTED_MODULE_7__.store.dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.setNoResult());
        return;
      }
      const result = {
        resultContent: (0,_utils__WEBPACK_IMPORTED_MODULE_13__.formatPostContent)(results.content.rendered),
        postId,
        searchInput: results.title.rendered,
        feedbackSubmitted: null
      };
      _utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.persistResult(result.resultContent, postId, result.searchInput, result.feedbackSubmitted, true);
      _utils__WEBPACK_IMPORTED_MODULE_13__.LocalStorageUtils.persistSearchInput(result.searchInput);
      _store__WEBPACK_IMPORTED_MODULE_7__.store.dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.updateIsTooltipLoading());
      _store__WEBPACK_IMPORTED_MODULE_7__.store.dispatch(_store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_8__.helpcenterActions.updateResultContent(result));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error launching help center via query:', error);
  }
});

/***/ }),

/***/ "./src/styles/result.scss":
/*!********************************!*\
  !*** ./src/styles/result.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/* harmony export */   getHelpcenterOption: () => (/* binding */ getHelpcenterOption),
/* harmony export */   getMultiSearchResponse: () => (/* binding */ getMultiSearchResponse),
/* harmony export */   getResultMatches: () => (/* binding */ getResultMatches),
/* harmony export */   isValidJSON: () => (/* binding */ isValidJSON),
/* harmony export */   processContentForMarkdown: () => (/* binding */ processContentForMarkdown),
/* harmony export */   saveHelpcenterOption: () => (/* binding */ saveHelpcenterOption),
/* harmony export */   scrollToBottom: () => (/* binding */ scrollToBottom),
/* harmony export */   useRevealText: () => (/* binding */ useRevealText)
/* harmony export */ });
/* harmony import */ var _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @newfold/js-utility-ui-analytics */ "./node_modules/@newfold/js-utility-ui-analytics/build/index.js");
/* harmony import */ var _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _newfold_wp_module_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @newfold/wp-module-runtime */ "./node_modules/@newfold/wp-module-runtime/build/index.js");
/* harmony import */ var _newfold_wp_module_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_newfold_wp_module_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* eslint-disable no-undef */




const base = 'nfd-help-center/v1';
const onboardingBase = 'newfold-onboarding/v1';
const InteractionAPIs = {
  postFeedback: (postId, status) => _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    path: base + '/feedback',
    method: 'POST',
    data: {
      post_id: postId,
      status
    }
  })
};
const OnboardingAPIs = {
  getFlowData: () => _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    path: onboardingBase + '/flow',
    method: 'GET'
  })
};
const MultiSearchAPI = {
  fetchMultiSearchResults: async (query, brand) => {
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
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
  },
  fetchTooltipSearchResults: async postId => {
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: '/newfold-multi-search/v1/tooltip_search',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId
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
  getAIHelpCenterCapability: () => {
    return (
      // get the AI help center capability from newfold runtime
      window.NewfoldRuntime?.capabilities?.canAccessAIHelpCenter || false
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
  persistResult: (resultContent, postId, searchInput, feedbackSubmitted = null, hasLaunchedFromTooltip) => {
    // Only store the result if resultContent has a value
    if (!resultContent || resultContent.trim() === '') {
      return;
    }

    /* 		// Retrieve existing results or initialize as an empty array
    const existingResults = LocalStorageUtils.getResultInfo();
    */
    // Create a new result object
    const newResult = {
      searchInput,
      resultContent,
      postId,
      feedbackSubmitted,
      hasLaunchedFromTooltip
    };

    // Add new result to the array
    /* existingResults.push(newResult); */

    // Store the updated array back in local storage
    localStorage.setItem('helpResultContent', JSON.stringify(newResult));
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
  clearSearchInput() {
    localStorage.removeItem('searchInput');
  },
  setFeatureFlag(flagName, value) {
    localStorage.setItem(flagName, value);
  },
  updateFeedbackStatus: () => {
    const savedResults = LocalStorageUtils.getResultInfo();
    savedResults.feedbackSubmitted = true;
    localStorage.setItem('helpResultContent', JSON.stringify(savedResults));
  }
};
const Analytics = {
  sendEvent: (action, data) => {
    const hiiveEvent = new _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__.HiiveEvent('wonder_help', action, data, 'wonder_help');
    _newfold_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__.HiiveAnalytics.send(hiiveEvent);
  }
};
const useRevealText = (text, speed = 100, startReveal = false) => {
  const [displayedText, setDisplayedText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('');
  const [isComplete, setIsComplete] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
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

/* Replace multiple line breaks with one line, remove line breaks at the start and end, convert existing \n to <br> */
function formatPostContent(postContent = '') {
  return postContent.replace(/\n{2,}/g, '\n').replace(/^\n+|\n+$/g, '').replace(/\n/g, '<br />').replace(/(<ul[^>]*>)[\s\n\r]*<br\s*\/?>/g, '$1').replace(/<br\s*\/?>\s*(?=<li)/g, '').replace(/<br\s*\/?>\s*(<\/ul>)/g, '$1');
}
function getResultMatches(query, tokensMatched, fieldsMatched) {
  const clearedQuery = query.replace(/[^\w\s]|_/g, '').replace(/\s{2,}/g, ' ').trim();
  const tokensPerQuery = tokensMatched / clearedQuery.split(/\s+/).length;
  return fieldsMatched >= 1 && tokensPerQuery >= 0.99;
}
function scrollToBottom(wrapperRef, resultsContainerRef) {
  if (!wrapperRef?.current) {
    return;
  }
  const scrollDistance = wrapperRef.current.scrollHeight;
  wrapperRef.current.scrollBy({
    top: scrollDistance,
    left: 0,
    behavior: 'auto'
  });
  if (resultsContainerRef?.current) {
    resultsContainerRef.current.style.visibility = 'visible';
  }
}
function adjustPadding(wrapperRef) {
  let availableHeight;
  const header = document.querySelector('.nfd-hc-modal__header');
  const inputWrapper = document.querySelector('#nfdHelpcenterInputWrapper');
  if (header && inputWrapper) {
    const totalUsedHeight = header.offsetHeight + inputWrapper.offsetHeight + 32;
    availableHeight = window.innerHeight - totalUsedHeight;
  }
  if (wrapperRef?.current) {
    wrapperRef.current.style.height = `${availableHeight}px`;
  }
}

/* Process inline markdown syntax inside the <p> tags */
const processContentForMarkdown = textToDisplay => {
  if (!textToDisplay) {
    return '';
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(textToDisplay, 'text/html');

  // Only process text inside <p> tags
  const paragraphElements = doc.querySelectorAll('p');
  paragraphElements.forEach(p => {
    let innerHTML = p.innerHTML;

    // replace inline Markdown syntax with html tags
    innerHTML = innerHTML.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>').replace(/___(.+?)___/g, '<strong><em>$1</em></strong>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/__(.+?)__/g, '<strong>$1</strong>').replace(/\*([^\s*](?:[^*]*[^\s*])?)\*/g, '<em>$1</em>').replace(/_([^\s_](?:[^_]*[^\s_])?)_/g, '<em>$1</em>').replace(/~~(.+?)~~/g, '<del>$1</del>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\[([^\]]+)\]\(([^)]+?)(?:\s+"([^"]*)")?\)/g, (match, text, url, title) => {
      return title ? `<a href="${url}" title="${title}">${text}</a>` : `<a href="${url}">${text}</a>`;
    }).replace(/!\[([^\]]*)\]\(([^)]+?)(?:\s+"([^"]*)")?\)/g, (match, alt, src, title) => {
      return title ? `<img src="${src}" alt="${alt}" title="${title}" />` : `<img src="${src}" alt="${alt}" />`;
    });
    p.innerHTML = innerHTML;
  });
  return doc.body.innerHTML;
};
const saveHelpcenterOption = async result => {
  const apiUrl = _newfold_wp_module_runtime__WEBPACK_IMPORTED_MODULE_1__.NewfoldRuntime.createApiUrl('/wp/v2/settings');
  try {
    await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      url: apiUrl,
      method: 'POST',
      data: {
        nfd_helpcenter_data: JSON.stringify(result)
      }
    });
  } catch (err) {
    // console.log(err);
  }
};
const getHelpcenterOption = async () => {
  const apiUrl = _newfold_wp_module_runtime__WEBPACK_IMPORTED_MODULE_1__.NewfoldRuntime.createApiUrl('/wp/v2/settings');
  try {
    const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      url: apiUrl,
      method: 'GET'
    });
    const responseData = response.nfd_helpcenter_data && JSON.parse(response.nfd_helpcenter_data);
    if (responseData?.length > 0) {
      return responseData;
    }
  } catch (err) {}
};
const getMultiSearchResponse = async (query, brand) => {
  try {
    const multiSearchResults = await MultiSearchAPI.fetchMultiSearchResults(query, brand);
    const hits = multiSearchResults?.results?.[0]?.grouped_hits?.[0]?.hits || [];
    return {
      hits,
      fullResponse: multiSearchResults,
      lastQuery: multiSearchResults?.results?.[0]?.request_params?.q
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Multi-search failed:', error);
    throw error;
  }
};

/***/ }),

/***/ "./src/utils/footerUtils.js":
/*!**********************************!*\
  !*** ./src/utils/footerUtils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shouldShowFooter: () => (/* binding */ shouldShowFooter),
/* harmony export */   shouldShowFooterInChat: () => (/* binding */ shouldShowFooterInChat)
/* harmony export */ });
/**
 * Utility functions for footer visibility logic
 * Centralizes footer display logic to avoid duplication
 */

/**
 * Determines if footer should be shown based on state and capability
 *
 * @param {Object}  params                        - Parameters object
 * @param {boolean} params.isFooterVisible        - Whether footer is visible from Redux state
 * @param {boolean} params.hasLaunchedFromTooltip - Whether help was launched from tooltip
 * @param {boolean} params.canAccessAIHelpCenter  - Whether AI help center is enabled
 * @return {boolean} Whether footer should be shown
 */
const shouldShowFooter = ({
  isFooterVisible,
  hasLaunchedFromTooltip,
  canAccessAIHelpCenter
}) => {
  // Footer should not show when launched from tooltip
  if (hasLaunchedFromTooltip) {
    return false;
  }

  // For legacy flow, show footer based on isFooterVisible
  // For AI chat flow, footer is handled by HelpCenterChat component
  return isFooterVisible && !canAccessAIHelpCenter;
};

/**
 * Determines if footer should be shown in AI chat component
 *
 * @param {boolean} hasLaunchedFromTooltip - Whether help was launched from tooltip
 * @return {boolean} Whether footer should be shown
 */
const shouldShowFooterInChat = hasLaunchedFromTooltip => {
  return !hasLaunchedFromTooltip;
};

/***/ }),

/***/ "./store/helpcenterSlice.js":
/*!**********************************!*\
  !*** ./store/helpcenterSlice.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   helpcenterActions: () => (/* binding */ helpcenterActions)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* harmony import */ var _src_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/utils */ "./src/utils.js");


const lastSearchedResult = _src_utils__WEBPACK_IMPORTED_MODULE_1__.LocalStorageUtils.getResultInfo();
const initialState = {
  visible: false,
  helpEnabled: false,
  noResult: false,
  isNewResult: false,
  searchInput: '',
  isLoading: false,
  loadingQuery: null,
  loadingIndex: null,
  resultContent: lastSearchedResult,
  multiResults: {},
  showSuggestions: false,
  initComplete: false,
  disliked: false,
  isFooterVisible: true,
  helpResultHistory: [],
  triggerSearch: false,
  showBackButton: false,
  viaLinkSearch: [],
  hasLaunchedFromTooltip: lastSearchedResult?.hasLaunchedFromTooltip || false,
  floatingIconVisibility: false
};
const helpcenterSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: 'helpcenter',
  initialState,
  reducers: {
    setIsTooltipLoading: state => {
      state.isLoading = true;
      state.isFooterVisible = false;
      state.hasLaunchedFromTooltip = true;
    },
    updateIsTooltipLoading: state => {
      state.isLoading = false;
    },
    clearViaLinkSearch: state => {
      state.showBackButton = false;
      state.viaLinkSearch = [];
    },
    initialDataSet: (state, action) => {
      state.isFooterVisible = action.payload.isFooterVisible;
      state.searchInput = action.payload.SearchInput;
    },
    updateHelpResultHistoryFromDB: (state, action) => {
      state.helpResultHistory = action.payload;
    },
    updateHelpResultHistory: (state, action) => {
      const isAlreadyInHistory = state.helpResultHistory.some(item => item.postId === action.payload.postId);
      if (!isAlreadyInHistory) {
        if (state.helpResultHistory.length === 3) {
          state.helpResultHistory.shift();
        }
        state.helpResultHistory.push(action.payload);
      }
      if (!state.searchInput) {
        if (state.viaLinkSearch.length === 10) {
          state.viaLinkSearch.shift();
        }
        state.viaLinkSearch.push(action.payload);
      }
    },
    setDisliked: (state, action) => {
      state.disliked = action.payload;
    },
    setFeeback: (state, action) => {
      const index = state.helpResultHistory.findIndex(item => item.postId === action.payload.postId);
      if (index >= 0) {
        state.helpResultHistory[index].feedbackSubmitted = action.payload.feedbackStatus;
      }
    },
    setIsFooterVisible: (state, action) => {
      state.isFooterVisible = action.payload;
    },
    setNoResult: state => {
      state.noResult = true;
      state.isFooterVisible = true;
    },
    updateHelpEnabled: (state, action) => {
      state.helpEnabled = action.payload;
    },
    updateVisibility: (state, action) => {
      state.visible = action.payload;
    },
    updateResultContent: (state, action) => {
      state.noResult = false;
      state.resultContent = action.payload;
      state.viaLinkSearch.push(action.payload);
      state.showBackButton = true;
      state.isFooterVisible = false;
    },
    resetState: state => {
      state.resultContent = [];
      state.disliked = false;
      state.noResult = false;
      state.viaLinkSearch = [];
      state.showBackButton = false;
      state.hasLaunchedFromTooltip = false;
      state.searchInput = '';
      state.floatingIconVisibility = false;
    },
    setNewSearchResult: (state, action) => {
      state.isNewResult = action.payload;
      state.searchInput = '';
    },
    updateMultiResults: (state, action) => {
      state.multiResults = action.payload.results;
      state.showSuggestions = action.payload.suggestions;
    },
    updateInitComplete: (state, action) => {
      state.initComplete = action.payload;
    },
    updateSearchInput: (state, action) => {
      state.noResult = false;
      state.errorMsg = '';
      state.searchInput = action.payload;
      state.hasLaunchedFromTooltip = false;
    },
    searchInputCatch: state => {
      state.noResult = true;
      state.isNewResult = true;
      state.isFooterVisible = true;
    },
    searchInputFinally: state => {
      state.searchInput = '';
      state.isLoading = false;
      state.loadingIndex = null;
      state.showSuggestions = false;
    },
    setAIResultLoading: state => {
      state.isLoading = true;
      state.showSuggestions = false;
      state.loadingQuery = state.searchInput;
    },
    setTriggerSearch: (state, action) => {
      state.triggerSearch = action.payload;
    },
    goBackInHistory: state => {
      if (state.hasLaunchedFromTooltip) {
        state.hasLaunchedFromTooltip = false;
      }
      if (state.viaLinkSearch.length >= 1) {
        state.viaLinkSearch.pop();
        state.resultContent = state.viaLinkSearch[state.viaLinkSearch.length - 1];
        state.isNewResult = false;
      }
      if (state.viaLinkSearch.length < 1) {
        state.showBackButton = false;
        state.resultContent = [];
        state.disliked = false;
        state.noResult = false;
        state.viaLinkSearch = [];
        state.isFooterVisible = true;
      }
      if (state.hasLaunchedFromTooltip) {
        state.hasLaunchedFromTooltip = false;
      }
    },
    setShowBackButton: (state, action) => {
      state.showBackButton = action.payload;
    },
    updateFloatingIconVisibilty: (state, action) => {
      state.floatingIconVisibility = action.payload;
    }
  }
});
const helpcenterActions = helpcenterSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (helpcenterSlice.reducer);

/***/ }),

/***/ "./store/index.js":
/*!************************!*\
  !*** ./store/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   store: () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* harmony import */ var _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/helpcenterSlice */ "./store/helpcenterSlice.js");


const store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({
  reducer: {
    helpcenter: _store_helpcenterSlice__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

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

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["primitives"];

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js?ver=" + {"vendors-wp-module-ai-chat_node_modules_lucide-react_dist_esm_icons_arrow-up_js-wp-module-ai-c-00f4d1":"b1e3ce30467e3292a310","src_components_HelpCenterChatAI_jsx":"de880878f3f6adeb5711"}[chunkId] + "";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "@newfold-labs/wp-module-help-center:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// object to store loaded CSS chunks
/******/ 		var installedCssChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.miniCss = (chunkId, promises) => {
/******/ 			var cssChunks = {"src_components_HelpCenterChatAI_jsx":1};
/******/ 			if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 			else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 				promises.push(installedCssChunks[chunkId] = loadStylesheet(chunkId).then(() => {
/******/ 					installedCssChunks[chunkId] = 0;
/******/ 				}, (e) => {
/******/ 					delete installedCssChunks[chunkId];
/******/ 					throw e;
/******/ 				}));
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no hmr
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunk_newfold_labs_wp_module_help_center"] = globalThis["webpackChunk_newfold_labs_wp_module_help_center"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
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