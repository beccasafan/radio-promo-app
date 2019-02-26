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

/***/ "./code/client/src/components/app.tsx":
/*!********************************************!*\
  !*** ./code/client/src/components/app.tsx ***!
  \********************************************/
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

var intro_1 = __webpack_require__(/*! ./intro */ "./code/client/src/components/intro.tsx");

var dropdown_1 = __webpack_require__(/*! ./countries/dropdown */ "./code/client/src/components/countries/dropdown.tsx");

var App =
/** @class */
function (_super) {
  __extends(App, _super);

  function App(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    return _this;
  }

  App.prototype.componentDidMount = function () {
    var _this = this;

    google.script.run.withSuccessHandler(function (data) {
      _this.setState({
        countries: data
      });
    }).getCountrySummaries();
  };

  App.prototype.render = function () {
    return React.createElement("div", null, React.createElement(intro_1.Intro, null), React.createElement(dropdown_1.CountryDropdown, {
      countries: this.state.countries
    }));
  };

  return App;
}(React.Component);

exports.App = App;

/***/ }),

/***/ "./code/client/src/components/countries/dropdown.tsx":
/*!***********************************************************!*\
  !*** ./code/client/src/components/countries/dropdown.tsx ***!
  \***********************************************************/
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

var select2_1 = __webpack_require__(/*! ./../select2 */ "./code/client/src/components/select2.tsx");

var CountryDropdown =
/** @class */
function (_super) {
  __extends(CountryDropdown, _super);

  function CountryDropdown(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    return _this;
  }

  CountryDropdown.prototype.formatCountry = function (country) {
    if (!country.id) {
      return country.text;
    }

    return React.createElement("span", null, country.name, " - ", country.stations, " stations");
  };

  CountryDropdown.prototype.render = function () {
    var dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");

    console.log("dropdown data adapter", dataAdapter);
    return React.createElement(select2_1.Select2, {
      data: this.props.countries,
      templateResult: this.formatCountry,
      dataAdapter: dataAdapter
    });
  };

  return CountryDropdown;
}(React.Component);

exports.CountryDropdown = CountryDropdown;

/***/ }),

/***/ "./code/client/src/components/intro.tsx":
/*!**********************************************!*\
  !*** ./code/client/src/components/intro.tsx ***!
  \**********************************************/
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

var Intro =
/** @class */
function (_super) {
  __extends(Intro, _super);

  function Intro(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    return _this;
  }

  Intro.prototype.render = function () {
    return React.createElement("div", {
      className: "jumbotron"
    }, React.createElement("h1", {
      className: "display-4"
    }, "Radio Promo App"), React.createElement("p", {
      className: "lead"
    }, "Explain things here..."), React.createElement("hr", {
      className: "my-4"
    }), React.createElement("p", null, "Maybe some more text here/"));
  };

  return Intro;
}(React.Component);

exports.Intro = Intro;

/***/ }),

/***/ "./code/client/src/components/select2.tsx":
/*!************************************************!*\
  !*** ./code/client/src/components/select2.tsx ***!
  \************************************************/
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

var $ = __webpack_require__(/*! jquery */ "jquery");

var ArrayAdapter =
/** @class */
function () {
  function ArrayAdapter($element, options) {}

  ArrayAdapter.prototype.addOptions = function (data) {};

  ArrayAdapter.prototype.convertToOptions = function (data) {
    return null;
  };

  return ArrayAdapter;
}();

$.fn.select2.amd.define('select2/data/customDataAdapter', ['select2/data/array'], function (ArrayAdapter) {
  var CustomDataAdapter =
  /** @class */
  function (_super) {
    __extends(CustomDataAdapter, _super);

    function CustomDataAdapter($element, options) {
      var _this = _super.call(this, $element, options) || this;

      _this.$element = $element;
      return _this;
    }

    CustomDataAdapter.prototype.updateOptions = function (data) {
      this.$element.find("option").remove();
      var base = this;
      base.addOptions(base.convertToOptions(data.data));
    };

    return CustomDataAdapter;
  }(ArrayAdapter);

  return CustomDataAdapter;
});

var Select2 =
/** @class */
function (_super) {
  __extends(Select2, _super);

  function Select2(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    return _this;
  }

  Select2.prototype.componentDidMount = function () {
    console.log("did mount", this.props.dataAdapter);
    this.$el = $(this.el);
    this.$el.select2(this.props);
  };

  Select2.prototype.componentWillUnmount = function () {
    this.$el.select2('destroy');
  };

  Select2.prototype.componentDidUpdate = function (prevProps) {
    console.log("did update", $($(this.el).data("select2")));

    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      var select2Data = $(this.el).data("select2");
      var dataAdapter = select2Data.dataAdapter;
      dataAdapter.updateOptions(this.props);
      $(this.el).trigger("change");
    }
  };

  Select2.prototype.render = function () {
    var _this = this;

    return React.createElement("div", null, React.createElement("select", {
      className: "select2",
      ref: function ref(el) {
        return _this.el = el;
      }
    }));
  };

  return Select2;
}(React.Component);

exports.Select2 = Select2;

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

var app_1 = __webpack_require__(/*! ./components/app */ "./code/client/src/components/app.tsx");

ReactDOM.render(React.createElement(app_1.App, null), document.getElementById("root"));

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

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