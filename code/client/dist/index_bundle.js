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

var list_1 = __webpack_require__(/*! ./stations/list */ "./code/client/src/components/stations/list.tsx");

var styles = __webpack_require__(/*! ./../styles/app.scss */ "./code/client/src/styles/app.scss");

var detail_1 = __webpack_require__(/*! ./stations/detail */ "./code/client/src/components/stations/detail.tsx");

var App =
/** @class */
function (_super) {
  __extends(App, _super);

  function App(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {
      countries: null,
      selectedCountry: null,
      stations: null,
      selectedStation: null,
      selectedStationDetails: null,
      search: null
    };
    _this.countrySelected = _this.countrySelected.bind(_this);
    _this.stationSelected = _this.stationSelected.bind(_this);
    _this.stationUnselected = _this.stationUnselected.bind(_this);
    return _this;
  }

  App.prototype.componentDidMount = function () {
    var _this = this;

    google.script.run.withSuccessHandler(function (data) {
      _this.setState({
        countries: data
      });

      _this.countrySelected(data.find(function (c) {
        return c.code === "US";
      }));
    }).getCountrySummaries();
  };

  App.prototype.countrySelected = function (country) {
    var _this = this;

    this.setState({
      selectedCountry: country
    });
    google.script.run.withSuccessHandler(function (data) {
      _this.setState({
        stations: data
      });
    }).getStationsByCountry(country.id);
    google.script.run.withSuccessHandler(function (data) {
      _this.setState({
        search: data
      });
    }).getSearchOptions(country.id);
  };

  App.prototype.stationSelected = function (station) {
    var _this = this;

    this.setState({
      selectedStation: station
    });
    google.script.run.withSuccessHandler(function (data) {
      _this.setState({
        selectedStationDetails: data
      });
    }).getStation(station.code);
  };

  App.prototype.stationUnselected = function (e) {
    this.setState({
      selectedStation: null,
      selectedStationDetails: null
    });
  };

  App.prototype.render = function () {
    return React.createElement("div", {
      className: styles.app
    }, React.createElement(intro_1.Intro, null), this.state.countries != null && React.createElement("div", null, React.createElement(dropdown_1.CountryDropdown, {
      countries: this.state.countries,
      onChange: this.countrySelected
    })), this.state.selectedCountry && React.createElement(list_1.Stations, {
      stations: this.state.stations,
      search: this.state.search,
      onSelect: this.stationSelected
    }), this.state.selectedStation && React.createElement(detail_1.Detail, {
      station: this.state.selectedStation,
      detail: this.state.selectedStationDetails,
      handleClose: this.stationUnselected
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

var select2_1 = __webpack_require__(/*! ./../plugins/select2 */ "./code/client/src/components/plugins/select2.tsx");

var server_1 = __webpack_require__(/*! react-dom/server */ "react-dom/server");

var styles = __webpack_require__(/*! ./../../styles/country.scss */ "./code/client/src/styles/country.scss");

var CountryDropdown =
/** @class */
function (_super) {
  __extends(CountryDropdown, _super);

  function CountryDropdown(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {
      selectedCountry: null
    };
    _this.countrySelected = _this.countrySelected.bind(_this);
    return _this;
  }

  CountryDropdown.prototype.formatCountry = function (country) {
    if (!country.id) {
      return country.text;
    }

    var imageCode = country.code.toLowerCase();

    if (imageCode === "uk") {
      imageCode = "gb";
    }

    return $(server_1.renderToStaticMarkup(React.createElement("span", {
      key: country.id,
      className: styles.countrySelector
    }, React.createElement("img", {
      className: "mr-3",
      src: "http://files.stevenskelton.ca/flag-icon/flag-icon/svg/country-4x3/" + imageCode + ".svg",
      alt: "Card image cap"
    }), React.createElement("span", null, country.name, " - ", country.stations, " stations"))));
  };

  CountryDropdown.prototype.formatCountrySelection = function (country) {
    if (!country.id) {
      return country.text;
    }

    var imageCode = country.code.toLowerCase();

    if (imageCode === "uk") {
      imageCode = "gb";
    }

    return $(server_1.renderToStaticMarkup(React.createElement("span", {
      key: country.id,
      className: styles.countrySelector
    }, React.createElement("img", {
      className: "mr-3",
      src: "http://files.stevenskelton.ca/flag-icon/flag-icon/svg/country-4x3/" + imageCode + ".svg",
      alt: "Card image cap"
    }), React.createElement("span", null, country.name))));
  };

  CountryDropdown.prototype.countrySelected = function (e) {
    var country = e.params.data;
    this.props.onChange(country);
  };

  CountryDropdown.prototype.render = function () {
    var dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");

    var events = {
      "select2:select": this.countrySelected
    };
    return React.createElement(select2_1.Select2, {
      width: "100%",
      data: this.props.countries,
      templateResult: this.formatCountry,
      templateSelection: this.formatCountrySelection,
      dataAdapter: dataAdapter,
      events: events,
      containerCssClass: "country-dropdown-select2"
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

/***/ "./code/client/src/components/plugins/modal.tsx":
/*!******************************************************!*\
  !*** ./code/client/src/components/plugins/modal.tsx ***!
  \******************************************************/
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

var Modal =
/** @class */
function (_super) {
  __extends(Modal, _super);

  function Modal(props) {
    return _super.call(this, props) || this;
  }

  Modal.prototype.componentDidMount = function () {
    var _this = this;

    this.$el = $(this.el);
    this.$el.modal({});
    this.$el.on("hidden.bs.modal", function (e) {
      return _this.props.handleClose(e);
    });
  };

  Modal.prototype.componentWillUnmount = function () {
    this.$el.modal("dispose");
  };

  Modal.prototype.componentDidUpdate = function (prevProps) {
    console.log("modal", prevProps, this.props);

    if (this.props.contentKey != null) {
      this.$el.modal("show");
    } else {
      this.$el.modal("hide");
    }
  };

  Modal.prototype.render = function () {
    var _this = this;

    return React.createElement("div", {
      ref: function ref(el) {
        return _this.el = el;
      },
      className: "modal",
      tabIndex: -1,
      role: "dialog"
    }, React.createElement("div", {
      className: "modal-dialog",
      role: "document"
    }, React.createElement("div", {
      className: "modal-content"
    }, this.props.children)));
  };

  return Modal;
}(React.Component);

exports.Modal = Modal;
;

/***/ }),

/***/ "./code/client/src/components/plugins/modalBody.tsx":
/*!**********************************************************!*\
  !*** ./code/client/src/components/plugins/modalBody.tsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = __webpack_require__(/*! react */ "react");

exports.ModalBody = function (props) {
  return React.createElement("div", {
    className: "modal-body"
  }, props.children);
};

/***/ }),

/***/ "./code/client/src/components/plugins/modalFooter.tsx":
/*!************************************************************!*\
  !*** ./code/client/src/components/plugins/modalFooter.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = __webpack_require__(/*! react */ "react");

exports.ModalFooter = function (props) {
  return React.createElement("div", {
    className: "modal-footer"
  }, props.children);
};

/***/ }),

/***/ "./code/client/src/components/plugins/modalHeader.tsx":
/*!************************************************************!*\
  !*** ./code/client/src/components/plugins/modalHeader.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = __webpack_require__(/*! react */ "react");

exports.ModalHeader = function (props) {
  return React.createElement("div", {
    className: "modal-header"
  }, props.children);
};

/***/ }),

/***/ "./code/client/src/components/plugins/select2.tsx":
/*!********************************************************!*\
  !*** ./code/client/src/components/plugins/select2.tsx ***!
  \********************************************************/
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
    var _this = this;

    this.$el = $(this.el);
    this.$el.select2(this.props);
    Object.keys(this.props.events).forEach(function (key) {
      return $(_this.el).on(key, function (e) {
        _this.props.events[key](e);
      });
    });
  };

  Select2.prototype.componentWillUnmount = function () {
    this.$el.select2('destroy');
  };

  Select2.prototype.componentDidUpdate = function (prevProps) {
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

/***/ "./code/client/src/components/search.tsx":
/*!***********************************************!*\
  !*** ./code/client/src/components/search.tsx ***!
  \***********************************************/
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

var select2_1 = __webpack_require__(/*! ./plugins/select2 */ "./code/client/src/components/plugins/select2.tsx");

var Search =
/** @class */
function (_super) {
  __extends(Search, _super);

  function Search(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    _this.onFormatChange = _this.onFormatChange.bind(_this);
    return _this;
  }

  Search.prototype.onFormatChange = function (e) {
    this.props.onSearch({
      selectedFormat: e.params.data.id
    });
  };

  Search.prototype.render = function () {
    var dataAdapter = $.fn.select2.amd.require("select2/data/customDataAdapter");

    var events = {
      "select2:select": this.onFormatChange
    };

    if (this.props.options == null) {
      return React.createElement("div", null);
    }

    var uniqueFormats = this.props.options.formats.reduce(function (uniqueFormats, f) {
      if (uniqueFormats[f.name] != null) {
        uniqueFormats[f.name] = {};
      }

      return uniqueFormats;
    }, {});
    return React.createElement("div", null, this.props.options.formats && React.createElement(select2_1.Select2, {
      width: "100%",
      data: uniqueFormats,
      dataAdapter: dataAdapter,
      events: events
    }));
  };

  return Search;
}(React.Component);

exports.Search = Search;

/***/ }),

/***/ "./code/client/src/components/stations/detail.tsx":
/*!********************************************************!*\
  !*** ./code/client/src/components/stations/detail.tsx ***!
  \********************************************************/
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

var modal_1 = __webpack_require__(/*! ./../plugins/modal */ "./code/client/src/components/plugins/modal.tsx");

var modalHeader_1 = __webpack_require__(/*! ../plugins/modalHeader */ "./code/client/src/components/plugins/modalHeader.tsx");

var modalBody_1 = __webpack_require__(/*! ../plugins/modalBody */ "./code/client/src/components/plugins/modalBody.tsx");

var modalFooter_1 = __webpack_require__(/*! ../plugins/modalFooter */ "./code/client/src/components/plugins/modalFooter.tsx");

var talent_1 = __webpack_require__(/*! ../talent/talent */ "./code/client/src/components/talent/talent.tsx");

var Detail =
/** @class */
function (_super) {
  __extends(Detail, _super);

  function Detail(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    _this.handleClose = _this.handleClose.bind(_this);
    return _this;
  }

  Detail.prototype.handleClose = function (e) {
    this.props.handleClose(e);
  };

  Detail.prototype.render = function () {
    return React.createElement(modal_1.Modal, {
      contentKey: this.props.station != null ? this.props.station.id : null,
      handleClose: this.handleClose
    }, React.createElement(modalHeader_1.ModalHeader, null, React.createElement("h5", {
      className: "modal-title",
      id: "station-detail-header"
    }, this.props.station.name), React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }, React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"))), React.createElement(modalBody_1.ModalBody, null, this.props.detail && this.props.detail.location && React.createElement("p", null, this.props.detail.location), this.props.detail && this.props.detail.parentGroup && React.createElement("p", null, this.props.detail.parentGroup), this.props.detail && this.props.detail.note && React.createElement("p", null, this.props.detail.note), this.props.detail && this.props.detail.website && React.createElement("p", null, this.props.detail.website), this.props.detail && this.props.detail.twitter && React.createElement("p", null, this.props.detail.twitter), this.props.detail && this.props.detail.instagram && React.createElement("p", null, this.props.detail.instagram), this.props.detail && this.props.detail.facebook && React.createElement("p", null, this.props.detail.facebook), this.props.detail && this.props.detail.email && React.createElement("p", null, this.props.detail.email), this.props.detail && this.props.detail.text && React.createElement("p", null, this.props.detail.text), this.props.detail && this.props.detail.phone && React.createElement("p", null, this.props.detail.phone), this.props.detail && this.props.detail.talent && this.props.detail.talent.map(function (t) {
      return React.createElement(talent_1.Talent, {
        talent: t
      });
    }), this.props.detail && this.props.detail.syndicatedTalent && this.props.detail.syndicatedTalent.map(function (t) {
      return React.createElement(talent_1.Talent, {
        talent: t
      });
    }), this.props.detail == null && React.createElement("p", null, "Loading...")), React.createElement(modalFooter_1.ModalFooter, null, React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      "data-dismiss": "modal"
    }, "Close")));
  };

  return Detail;
}(React.Component);

exports.Detail = Detail;

/***/ }),

/***/ "./code/client/src/components/stations/list.tsx":
/*!******************************************************!*\
  !*** ./code/client/src/components/stations/list.tsx ***!
  \******************************************************/
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

var summary_1 = __webpack_require__(/*! ./summary */ "./code/client/src/components/stations/summary.tsx");

var search_1 = __webpack_require__(/*! ../search */ "./code/client/src/components/search.tsx");

;

var Stations =
/** @class */
function (_super) {
  __extends(Stations, _super);

  function Stations(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {
      selectedFormat: null,
      visibleStations: null
    };
    _this.onSearch = _this.onSearch.bind(_this);
    return _this;
  }

  Stations.prototype.onSearch = function (values) {
    var _this = this;

    var visibleStations = this.props.stations.filter(function (s) {
      var format = _this.props.search.formats.find(function (f) {
        return f.id === s.props.station.formatId;
      });

      var visibleByFormat = values.selectedFormat === format.code;
      return visibleByFormat;
    });
    this.setState({
      visibleStations: visibleStations
    });
  };

  Stations.prototype.render = function () {
    var _this = this;

    if (this.props.stations == null) {
      return React.createElement("div", null, "Loading stations...");
    }

    var stations = this.props.stations.map(function (s) {
      return React.createElement(summary_1.Summary, {
        station: s,
        onSelect: _this.props.onSelect
      });
    });
    return React.createElement("div", null, React.createElement("div", null, "There are ", this.props.stations.length, " stations, and ", this.state.visibleStations.length, " match your search."), React.createElement(search_1.Search, {
      options: this.props.search,
      onSearch: this.onSearch
    }), React.createElement("div", {
      className: "row"
    }, stations));
  };

  return Stations;
}(React.Component);

exports.Stations = Stations;

/***/ }),

/***/ "./code/client/src/components/stations/summary.tsx":
/*!*********************************************************!*\
  !*** ./code/client/src/components/stations/summary.tsx ***!
  \*********************************************************/
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

var styles = __webpack_require__(/*! ./../../styles/station.scss */ "./code/client/src/styles/station.scss");

var classnames_1 = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var Summary =
/** @class */
function (_super) {
  __extends(Summary, _super);

  function Summary(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    _this.open = _this.open.bind(_this);
    return _this;
  }

  Summary.prototype.open = function () {
    this.props.onSelect(this.props.station);
  };

  Summary.prototype.render = function () {
    if (util_1.Util.isEmpty(this.props)) {
      return React.createElement("div", null, "Loading station...");
    }

    return React.createElement("div", {
      className: classnames_1.default(styles.station, "col-sm-12 col-md-6 col-lg-4 col-xl-3 py-3")
    }, React.createElement("div", {
      className: "card h-100"
    }, React.createElement("div", {
      className: "card-header",
      onClick: this.open
    }, this.props.station.code), React.createElement("div", {
      className: "card-body"
    }, React.createElement("h5", {
      className: "card-title",
      onClick: this.open
    }, this.props.station.name), React.createElement("p", {
      className: "card-text"
    }, this.props.station.location), React.createElement("div", {
      className: styles.cardGrow
    }, !util_1.Util.isEmpty(this.props.station.parentGroup) && React.createElement("p", {
      className: "card-text"
    }, this.props.station.parentGroup), this.props.station.talent > 0 && React.createElement("p", {
      className: "card-text"
    }, this.props.station.talent, " talent"), this.props.station.syndicated > 0 && React.createElement("p", {
      className: "card-text"
    }, this.props.station.syndicated, " syndicated talent"), !util_1.Util.isEmpty(this.props.station.note) && React.createElement("p", {
      className: "card-text"
    }, this.props.station.note)), React.createElement("a", {
      href: "javascript:;",
      onClick: this.open,
      className: "btn btn-outline-secondary btn-block"
    }, "View")), React.createElement("div", {
      className: "card-footer"
    }, React.createElement("div", {
      className: "row no-gutters"
    }, React.createElement("div", {
      className: "col"
    }, React.createElement("a", {
      href: "javascript:;",
      onClick: this.open
    }, React.createElement("i", {
      className: "fas fa-eye"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.station.website && React.createElement("a", {
      href: this.props.station.website,
      target: "_blank"
    }, React.createElement("i", {
      className: "fas fa-link"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.station.twitter && React.createElement("a", {
      href: "https://twitter.com/" + this.props.station.twitter,
      target: "_blank"
    }, React.createElement("i", {
      className: "fab fa-twitter"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.station.instagram && React.createElement("a", {
      href: "https://instagram.com/" + this.props.station.instagram,
      target: "_blank"
    }, React.createElement("i", {
      className: "fab fa-instagram"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.station.facebook && React.createElement("a", {
      href: "https://facebook.com/" + this.props.station.facebook,
      target: "_blank"
    }, React.createElement("i", {
      className: "fab fa-facebook"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.station.email && React.createElement("a", {
      href: "mailto:" + this.props.station.email,
      target: "_blank"
    }, React.createElement("i", {
      className: "fas fa-envelope"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.station.text && React.createElement("a", {
      href: "javascript:;",
      onClick: this.open
    }, React.createElement("i", {
      className: "fas fa-comment"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.station.phone && React.createElement("a", {
      href: "javascript:;",
      onClick: this.open
    }, React.createElement("i", {
      className: "fas fa-phone"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.station.note && React.createElement("a", {
      href: "javascript:;",
      onClick: this.open
    }, React.createElement("i", {
      onClick: this.open,
      className: "fas fa-sticky-note"
    })))))));
  };

  return Summary;
}(React.Component);

exports.Summary = Summary;

/***/ }),

/***/ "./code/client/src/components/talent/talent.tsx":
/*!******************************************************!*\
  !*** ./code/client/src/components/talent/talent.tsx ***!
  \******************************************************/
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

var styles = __webpack_require__(/*! ./../../styles/station.scss */ "./code/client/src/styles/station.scss");

var Talent =
/** @class */
function (_super) {
  __extends(Talent, _super);

  function Talent(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    return _this;
  }

  Talent.prototype.render = function () {
    return React.createElement("div", {
      className: styles.talent
    }, React.createElement("div", {
      className: "card"
    }, React.createElement("div", {
      className: "card-body"
    }, React.createElement("div", {
      className: "card-title"
    }, this.props.talent.name), !util_1.Util.isEmpty(this.props.talent.note) && React.createElement("p", {
      className: "card-text"
    }, this.props.talent.note), React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col"
    }, this.props.talent.twitter && React.createElement("a", {
      href: "https://twitter.com/" + this.props.talent.twitter,
      target: "_blank"
    }, React.createElement("i", {
      className: "fab fa-twitter"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.talent.instagram && React.createElement("a", {
      href: "https://instagram.com/" + this.props.talent.instagram,
      target: "_blank"
    }, React.createElement("i", {
      className: "fab fa-instagram"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.talent.facebook && React.createElement("a", {
      href: "https://facebook.com/" + this.props.talent.facebook,
      target: "_blank"
    }, React.createElement("i", {
      className: "fab fa-facebook"
    }))), React.createElement("div", {
      className: "col"
    }, this.props.talent.email && React.createElement("a", {
      href: "mailto:" + this.props.talent.email,
      target: "_blank"
    }, React.createElement("i", {
      className: "fas fa-envelope"
    })))))));
  };

  return Talent;
}(React.Component);

exports.Talent = Talent;

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

/***/ "./code/client/src/styles/app.scss":
/*!*****************************************!*\
  !*** ./code/client/src/styles/app.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"app":"app"};

/***/ }),

/***/ "./code/client/src/styles/country.scss":
/*!*********************************************!*\
  !*** ./code/client/src/styles/country.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"card-img-overlay":"card-img-overlay","cardImgOverlay":"card-img-overlay","country-selector":"country-selector","countrySelector":"country-selector","select2-container":"select2-container","select2Container":"select2-container","country-dropdown-select2":"country-dropdown-select2","countryDropdownSelect2":"country-dropdown-select2"};

/***/ }),

/***/ "./code/client/src/styles/station.scss":
/*!*********************************************!*\
  !*** ./code/client/src/styles/station.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"station":"station","card-footer":"card-footer","cardFooter":"card-footer","card-body":"card-body","cardBody":"card-body","card-text":"card-text","cardText":"card-text","card-grow":"card-grow","cardGrow":"card-grow","talent":"talent"};

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

  Util.groupBy = function (data, property) {
    return data.reduce(function (groups, item) {
      var groupKey = item[property].toString();
      var group = groups[groupKey] || [];
      group.push(item);
      groups[groupKey] = group;
      return groups;
    }, {});
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

/***/ }),

/***/ "react-dom/server":
/*!*********************************!*\
  !*** external "ReactDOMServer" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOMServer;

/***/ })

/******/ });
//# sourceMappingURL=index_bundle.js.map