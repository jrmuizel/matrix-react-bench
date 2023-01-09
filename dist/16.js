(globalThis["webpackJsonp"] = globalThis["webpackJsonp"] || []).push([[16],{

/***/ 1562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewRecoveryMethodDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_views_dialogs_security_RestoreKeyBackupDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(285);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(51);
/* harmony import */ var _components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(28);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2018, 2019 New Vector Ltd
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









class NewRecoveryMethodDialog extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  constructor() {
    super(...arguments);

    _defineProperty(this, "onOkClick", () => {
      this.props.onFinished();
    });

    _defineProperty(this, "onGoToSettingsClick", () => {
      this.props.onFinished();
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].fire(_dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__[/* Action */ "a"].ViewUserSettings);
    });

    _defineProperty(this, "onSetupClick", async () => {
      _Modal__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].createTrackedDialog('Restore Backup', '', _components_views_dialogs_security_RestoreKeyBackupDialog__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
        onFinished: this.props.onFinished
      }, null,
      /* priority = */
      false,
      /* static = */
      true);
    });
  }

  render() {
    const title = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "mx_KeyBackupFailedDialog_title"
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("New Recovery Method"));
    const newMethodDetected = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("A new Security Phrase and key for Secure Messages have been detected."));
    const hackWarning = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "warning"
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("If you didn't set the new recovery method, an " + "attacker may be trying to access your account. " + "Change your account password and set a new recovery " + "method immediately in Settings."));
    let content;

    if (_MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().getKeyBackupEnabled()) {
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, newMethodDetected, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("This session is encrypting history using the new recovery method.")), hackWarning, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
        primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("OK"),
        onPrimaryButtonClick: this.onOkClick,
        cancelButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Go to Settings"),
        onCancel: this.onGoToSettingsClick
      }));
    } else {
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, newMethodDetected, hackWarning, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
        primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Set up Secure Messages"),
        onPrimaryButtonClick: this.onSetupClick,
        cancelButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Go to Settings"),
        onCancel: this.onGoToSettingsClick
      }));
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
      className: "mx_KeyBackupFailedDialog",
      onFinished: this.props.onFinished,
      title: title
    }, content);
  }

}

/***/ })

}]);