(globalThis["webpackJsonp"] = globalThis["webpackJsonp"] || []).push([[17],{

/***/ 1563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RecoveryMethodRemovedDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);
/* harmony import */ var _components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(51);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2019 New Vector Ltd
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







class RecoveryMethodRemovedDialog extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  constructor() {
    super(...arguments);

    _defineProperty(this, "onGoToSettingsClick", () => {
      this.props.onFinished();
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].fire(_dispatcher_actions__WEBPACK_IMPORTED_MODULE_4__[/* Action */ "a"].ViewUserSettings);
    });

    _defineProperty(this, "onSetupClick", () => {
      this.props.onFinished();
      _Modal__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].createTrackedDialogAsync("Key Backup", "Key Backup", __webpack_require__.e(/* import() */ 6).then(__webpack_require__.bind(null, 1015)), null, null,
      /* priority = */
      false,
      /* static = */
      true);
    });
  }

  render() {
    const title = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "mx_KeyBackupFailedDialog_title"
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_2__[/* _t */ "a"])("Recovery Method Removed"));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      className: "mx_KeyBackupFailedDialog",
      onFinished: this.props.onFinished,
      title: title
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_2__[/* _t */ "a"])("This session has detected that your Security Phrase and key " + "for Secure Messages have been removed.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_2__[/* _t */ "a"])("If you did this accidentally, you can setup Secure Messages on " + "this session which will re-encrypt this session's message " + "history with a new recovery method.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "warning"
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_2__[/* _t */ "a"])("If you didn't remove the recovery method, an " + "attacker may be trying to access your account. " + "Change your account password and set a new recovery " + "method immediately in Settings.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
      primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_2__[/* _t */ "a"])("Set up Secure Messages"),
      onPrimaryButtonClick: this.onSetupClick,
      cancelButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_2__[/* _t */ "a"])("Go to Settings"),
      onCancel: this.onGoToSettingsClick
    })));
  }

}

/***/ })

}]);