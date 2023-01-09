(globalThis["webpackJsonp"] = globalThis["webpackJsonp"] || []).push([[13],{

/***/ 1561:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DisableEventIndexDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _components_views_elements_Spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);
/* harmony import */ var _indexing_EventIndexPeg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(93);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
/* harmony import */ var _settings_SettingLevel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/











/*
 * Allows the user to disable the Event Index.
 */
class DisableEventIndexDialog extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onDisable", async () => {
      this.setState({
        disabling: true
      });
      await _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_6__[/* default */ "b"].setValue('enableEventIndexing', null, _settings_SettingLevel__WEBPACK_IMPORTED_MODULE_9__[/* SettingLevel */ "a"].DEVICE, false);
      await _indexing_EventIndexPeg__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].deleteEventIndex();
      this.props.onFinished(true);
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].fire(_dispatcher_actions__WEBPACK_IMPORTED_MODULE_8__[/* Action */ "a"].ViewUserSettings);
    });

    this.state = {
      disabling: false
    };
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
      onFinished: this.props.onFinished,
      title: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_5__[/* _t */ "a"])("Are you sure?")
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_5__[/* _t */ "a"])("If disabled, messages from encrypted rooms won't appear in search results."), this.state.disabling ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_Spinner__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_5__[/* _t */ "a"])('Disable'),
      onPrimaryButtonClick: this.onDisable,
      primaryButtonClass: "danger",
      cancelButtonClass: "warning",
      onCancel: this.props.onFinished,
      disabled: this.state.disabling
    }));
  }

}

/***/ })

}]);