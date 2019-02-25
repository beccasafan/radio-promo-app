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
/******/ 	return __webpack_require__(__webpack_require__.s = "./code/client/src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./code/client/src/components/countries/list.tsx":
/*!*******************************************************!*\
  !*** ./code/client/src/components/countries/list.tsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = __webpack_require__(/*! react */ "react");

var util_1 = __webpack_require__(/*! ../../../../common/util/util */ "./code/common/util/util.ts");

var summary_1 = __webpack_require__(/*! ./summary */ "./code/client/src/components/countries/summary.tsx");

;

var Countries =
/** @class */
function (_super) {
  __extends(Countries, _super);

  function Countries(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {
      countries: []
    };
    return _this;
  }

  Countries.prototype.componentDidMount = function () {
    var _this = this;

    google.script.run.withSuccessHandler(function (data) {
      _this.setState({
        countries: data
      });
    }).getCountrySummaries();
  };

  Countries.prototype.render = function () {
    if (util_1.Util.isEmpty(this.state.countries)) {
      return React.createElement("div", null, "Loading countries...");
    }

    return React.createElement("div", {
      className: "row"
    }, this.state.countries.map(function (c) {
      return React.createElement(summary_1.Summary, {
        key: c.id,
        country: c
      });
    }));
  };

  return Countries;
}(React.Component);

exports.Countries = Countries;

/***/ }),

/***/ "./code/client/src/components/countries/summary.tsx":
/*!**********************************************************!*\
  !*** ./code/client/src/components/countries/summary.tsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = __webpack_require__(/*! react */ "react"); //import "../../styles/app.scss";


var styles = __webpack_require__(/*! ./../../styles/app.scss */ "./code/client/src/styles/app.scss");

var classnames_1 = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var Summary =
/** @class */
function (_super) {
  __extends(Summary, _super);

  function Summary(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    return _this;
  }

  Summary.prototype.render = function () {
    var imageCode = this.props.country.code.toLowerCase();

    if (imageCode === "uk") {
      imageCode = "gb";
    }

    return React.createElement("div", {
      className: "col-sm-4"
    }, React.createElement("div", {
      className: "card"
    }, React.createElement("img", {
      className: "card-img-top",
      src: "http://files.stevenskelton.ca/flag-icon/flag-icon/svg/country-4x3/" + imageCode + ".svg",
      alt: "Card image cap"
    }), React.createElement("div", {
      className: "card-img-overlay"
    }, React.createElement("h5", {
      className: "card-title"
    }, this.props.country.name), React.createElement("p", {
      className: "card-text"
    }, this.props.country.stations, " stations"), React.createElement("a", {
      href: "#",
      className: classnames_1.default("btn", "btn-primary", styles.test)
    }, "View"))));
  };

  return Summary;
}(React.Component);

exports.Summary = Summary;

/***/ }),

/***/ "./code/client/src/index.tsx":
/*!***********************************!*\
  !*** ./code/client/src/index.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = __webpack_require__(/*! react */ "react");

var ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");

var list_1 = __webpack_require__(/*! ./components/countries/list */ "./code/client/src/components/countries/list.tsx");

ReactDOM.render(React.createElement(list_1.Countries, null), document.getElementById("root"));

/***/ }),

/***/ "./code/client/src/styles/app.scss":
/*!*****************************************!*\
  !*** ./code/client/src/styles/app.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"card-overlay":"card-overlay","cardOverlay":"card-overlay","test":"test"};

/***/ }),

/***/ "./code/common/util/util.ts":
/*!**********************************!*\
  !*** ./code/common/util/util.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Util =
/** @class */
function () {
  function Util() {}

  Util.isEmpty = function (obj) {
    return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
  };

  Util.createJSONOutput = function (obj) {
    return HtmlService.createHtmlOutput("<pre>" + JSON.stringify(obj, null, 4) + "</pre>");
  };

  return Util;
}();

exports.Util = Util;

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=index_bundle.js.map