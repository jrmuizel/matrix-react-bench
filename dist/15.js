(globalThis["webpackJsonp"] = globalThis["webpackJsonp"] || []).push([[15],{

/***/ 1548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CreateSecretStorageDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(780);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _SecurityManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(136);
/* harmony import */ var _utils_strings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(99);
/* harmony import */ var _components_views_auth_InteractiveAuthEntryComponents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(87);
/* harmony import */ var _components_views_auth_PassphraseField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(286);
/* harmony import */ var _components_views_elements_StyledRadioButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(118);
/* harmony import */ var _components_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8);
/* harmony import */ var _components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(51);
/* harmony import */ var _components_views_elements_InlineSpinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(91);
/* harmony import */ var _components_views_dialogs_security_RestoreKeyBackupDialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(285);
/* harmony import */ var _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(265);
/* harmony import */ var _customisations_Security__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(148);
/* harmony import */ var matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2);
/* harmony import */ var _components_views_elements_Field__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(26);
/* harmony import */ var _components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(28);
/* harmony import */ var _components_views_elements_Spinner__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(18);
/* harmony import */ var _components_views_dialogs_InteractiveAuthDialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(191);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2018, 2019 New Vector Ltd
Copyright 2019, 2020 The Matrix.org Foundation C.I.C.

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





















// I made a mistake while converting this and it has to be fixed!
var Phase;

(function (Phase) {
  Phase["Loading"] = "loading";
  Phase["LoadError"] = "load_error";
  Phase["ChooseKeyPassphrase"] = "choose_key_passphrase";
  Phase["Migrate"] = "migrate";
  Phase["Passphrase"] = "passphrase";
  Phase["PassphraseConfirm"] = "passphrase_confirm";
  Phase["ShowKey"] = "show_key";
  Phase["Storing"] = "storing";
  Phase["ConfirmSkip"] = "confirm_skip";
})(Phase || (Phase = {}));

const PASSWORD_MIN_SCORE = 4; // So secure, many characters, much complex, wow, etc, etc.

/*
 * Walks the user through the process of creating a passphrase to guard Secure
 * Secret Storage in account data.
 */
class CreateSecretStorageDialog extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "recoveryKey", void 0);

    _defineProperty(this, "backupKey", void 0);

    _defineProperty(this, "recoveryKeyNode", /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createRef"])());

    _defineProperty(this, "passphraseField", /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createRef"])());

    _defineProperty(this, "onKeyBackupStatusChange", () => {
      if (this.state.phase === Phase.Migrate) this.fetchBackupInfo();
    });

    _defineProperty(this, "onKeyPassphraseChange", e => {
      this.setState({
        passPhraseKeySelected: e.target.value
      });
    });

    _defineProperty(this, "onChooseKeyPassphraseFormSubmit", async () => {
      if (this.state.passPhraseKeySelected === _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Key) {
        this.recoveryKey = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().createRecoveryKeyFromPassphrase();
        this.setState({
          copied: false,
          downloaded: false,
          setPassphrase: false,
          phase: Phase.ShowKey
        });
      } else {
        this.setState({
          copied: false,
          downloaded: false,
          phase: Phase.Passphrase
        });
      }
    });

    _defineProperty(this, "onMigrateFormSubmit", e => {
      e.preventDefault();

      if (this.state.backupSigStatus.usable) {
        this.bootstrapSecretStorage();
      } else {
        this.restoreBackup();
      }
    });

    _defineProperty(this, "onCopyClick", () => {
      const successful = Object(_utils_strings__WEBPACK_IMPORTED_MODULE_6__[/* copyNode */ "b"])(this.recoveryKeyNode.current);

      if (successful) {
        this.setState({
          copied: true
        });
      }
    });

    _defineProperty(this, "onDownloadClick", () => {
      const blob = new Blob([this.recoveryKey.encodedPrivateKey], {
        type: 'text/plain;charset=us-ascii'
      });
      file_saver__WEBPACK_IMPORTED_MODULE_2___default.a.saveAs(blob, 'security-key.txt');
      this.setState({
        downloaded: true
      });
    });

    _defineProperty(this, "doBootstrapUIAuth", async makeRequest => {
      if (this.state.canUploadKeysWithPasswordOnly && this.state.accountPassword) {
        await makeRequest({
          type: 'm.login.password',
          identifier: {
            type: 'm.id.user',
            user: _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().getUserId()
          },
          // TODO: Remove `user` once servers support proper UIA
          // See https://github.com/matrix-org/synapse/issues/5665
          user: _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().getUserId(),
          password: this.state.accountPassword
        });
      } else {
        const dialogAesthetics = {
          [_components_views_auth_InteractiveAuthEntryComponents__WEBPACK_IMPORTED_MODULE_7__[/* SSOAuthEntry */ "c"].PHASE_PREAUTH]: {
            title: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Use Single Sign On to continue"),
            body: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("To continue, use Single Sign On to prove your identity."),
            continueText: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Single Sign On"),
            continueKind: "primary"
          },
          [_components_views_auth_InteractiveAuthEntryComponents__WEBPACK_IMPORTED_MODULE_7__[/* SSOAuthEntry */ "c"].PHASE_POSTAUTH]: {
            title: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Confirm encryption setup"),
            body: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Click the button below to confirm setting up encryption."),
            continueText: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Confirm"),
            continueKind: "primary"
          }
        };
        const {
          finished
        } = _Modal__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].createTrackedDialog('Cross-signing keys dialog', '', _components_views_dialogs_InteractiveAuthDialog__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"], {
          title: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Setting up keys"),
          matrixClient: _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get(),
          makeRequest,
          aestheticsForStagePhases: {
            [_components_views_auth_InteractiveAuthEntryComponents__WEBPACK_IMPORTED_MODULE_7__[/* SSOAuthEntry */ "c"].LOGIN_TYPE]: dialogAesthetics,
            [_components_views_auth_InteractiveAuthEntryComponents__WEBPACK_IMPORTED_MODULE_7__[/* SSOAuthEntry */ "c"].UNSTABLE_LOGIN_TYPE]: dialogAesthetics
          }
        });
        const [confirmed] = await finished;

        if (!confirmed) {
          throw new Error("Cross-signing key upload auth canceled");
        }
      }
    });

    _defineProperty(this, "bootstrapSecretStorage", async () => {
      this.setState({
        phase: Phase.Storing,
        error: null
      });
      const cli = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get();
      const {
        forceReset
      } = this.props;

      try {
        if (forceReset) {
          matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_16__[/* logger */ "a"].log("Forcing secret storage reset");
          await cli.bootstrapSecretStorage({
            createSecretStorageKey: async () => this.recoveryKey,
            setupNewKeyBackup: true,
            setupNewSecretStorage: true
          });
        } else {
          // For password authentication users after 2020-09, this cross-signing
          // step will be a no-op since it is now setup during registration or login
          // when needed. We should keep this here to cover other cases such as:
          //   * Users with existing sessions prior to 2020-09 changes
          //   * SSO authentication users which require interactive auth to upload
          //     keys (and also happen to skip all post-authentication flows at the
          //     moment via token login)
          await cli.bootstrapCrossSigning({
            authUploadDeviceSigningKeys: this.doBootstrapUIAuth
          });
          await cli.bootstrapSecretStorage({
            createSecretStorageKey: async () => this.recoveryKey,
            keyBackupInfo: this.state.backupInfo,
            setupNewKeyBackup: !this.state.backupInfo,
            getKeyBackupPassphrase: async () => {
              // We may already have the backup key if we earlier went
              // through the restore backup path, so pass it along
              // rather than prompting again.
              if (this.backupKey) {
                return this.backupKey;
              }

              return Object(_SecurityManager__WEBPACK_IMPORTED_MODULE_5__[/* promptForBackupPassphrase */ "e"])();
            }
          });
        }

        this.props.onFinished(true);
      } catch (e) {
        if (this.state.canUploadKeysWithPasswordOnly && e.httpStatus === 401 && e.data.flows) {
          this.setState({
            accountPassword: '',
            accountPasswordCorrect: false,
            phase: Phase.Migrate
          });
        } else {
          this.setState({
            error: e
          });
        }

        matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_16__[/* logger */ "a"].error("Error bootstrapping secret storage", e);
      }
    });

    _defineProperty(this, "onCancel", () => {
      this.props.onFinished(false);
    });

    _defineProperty(this, "restoreBackup", async () => {
      // It's possible we'll need the backup key later on for bootstrapping,
      // so let's stash it here, rather than prompting for it twice.
      const keyCallback = k => this.backupKey = k;

      const {
        finished
      } = _Modal__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].createTrackedDialog('Restore Backup', '', _components_views_dialogs_security_RestoreKeyBackupDialog__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
        showSummary: false,
        keyCallback
      }, null,
      /* priority = */
      false,
      /* static = */
      false);
      await finished;
      const {
        backupSigStatus
      } = await this.fetchBackupInfo();

      if (backupSigStatus.usable && this.state.canUploadKeysWithPasswordOnly && this.state.accountPassword) {
        this.bootstrapSecretStorage();
      }
    });

    _defineProperty(this, "onLoadRetryClick", () => {
      this.setState({
        phase: Phase.Loading
      });
      this.fetchBackupInfo();
    });

    _defineProperty(this, "onShowKeyContinueClick", () => {
      this.bootstrapSecretStorage();
    });

    _defineProperty(this, "onCancelClick", () => {
      this.setState({
        phase: Phase.ConfirmSkip
      });
    });

    _defineProperty(this, "onGoBackClick", () => {
      this.setState({
        phase: Phase.ChooseKeyPassphrase
      });
    });

    _defineProperty(this, "onPassPhraseNextClick", async e => {
      e.preventDefault();
      if (!this.passphraseField.current) return; // unmounting

      await this.passphraseField.current.validate({
        allowEmpty: false
      });

      if (!this.passphraseField.current.state.valid) {
        this.passphraseField.current.focus();
        this.passphraseField.current.validate({
          allowEmpty: false,
          focused: true
        });
        return;
      }

      this.setState({
        phase: Phase.PassphraseConfirm
      });
    });

    _defineProperty(this, "onPassPhraseConfirmNextClick", async e => {
      e.preventDefault();
      if (this.state.passPhrase !== this.state.passPhraseConfirm) return;
      this.recoveryKey = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().createRecoveryKeyFromPassphrase(this.state.passPhrase);
      this.setState({
        copied: false,
        downloaded: false,
        setPassphrase: true,
        phase: Phase.ShowKey
      });
    });

    _defineProperty(this, "onSetAgainClick", () => {
      this.setState({
        passPhrase: '',
        passPhraseValid: false,
        passPhraseConfirm: '',
        phase: Phase.Passphrase
      });
    });

    _defineProperty(this, "onPassPhraseValidate", result => {
      this.setState({
        passPhraseValid: result.valid
      });
    });

    _defineProperty(this, "onPassPhraseChange", e => {
      this.setState({
        passPhrase: e.target.value
      });
    });

    _defineProperty(this, "onPassPhraseConfirmChange", e => {
      this.setState({
        passPhraseConfirm: e.target.value
      });
    });

    _defineProperty(this, "onAccountPasswordChange", e => {
      this.setState({
        accountPassword: e.target.value
      });
    });

    let passPhraseKeySelected;
    const setupMethods = Object(_utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* getSecureBackupSetupMethods */ "d"])();

    if (setupMethods.includes(_utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Key)) {
      passPhraseKeySelected = _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Key;
    } else {
      passPhraseKeySelected = _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Passphrase;
    }

    const accountPassword = props.accountPassword || "";
    let canUploadKeysWithPasswordOnly = null;

    if (accountPassword) {
      // If we have an account password in memory, let's simplify and
      // assume it means password auth is also supported for device
      // signing key upload as well. This avoids hitting the server to
      // test auth flows, which may be slow under high load.
      canUploadKeysWithPasswordOnly = true;
    } else {
      this.queryKeyUploadAuth();
    }

    this.state = {
      phase: Phase.Loading,
      passPhrase: '',
      passPhraseValid: false,
      passPhraseConfirm: '',
      copied: false,
      downloaded: false,
      setPassphrase: false,
      backupInfo: null,
      backupSigStatus: null,
      // does the server offer a UI auth flow with just m.login.password
      // for /keys/device_signing/upload?
      accountPasswordCorrect: null,
      canSkip: !Object(_utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* isSecureBackupRequired */ "e"])(),
      canUploadKeysWithPasswordOnly,
      passPhraseKeySelected,
      accountPassword
    };
    _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().on('crypto.keyBackupStatus', this.onKeyBackupStatusChange);
    this.getInitialPhase();
  }

  componentWillUnmount() {
    _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().removeListener('crypto.keyBackupStatus', this.onKeyBackupStatusChange);
  }

  getInitialPhase() {
    var _SecurityCustomisatio;

    const keyFromCustomisations = (_SecurityCustomisatio = _customisations_Security__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"].createSecretStorageKey) === null || _SecurityCustomisatio === void 0 ? void 0 : _SecurityCustomisatio.call(_customisations_Security__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"]);

    if (keyFromCustomisations) {
      matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_16__[/* logger */ "a"].log("Created key via customisations, jumping to bootstrap step");
      this.recoveryKey = {
        privateKey: keyFromCustomisations
      };
      this.bootstrapSecretStorage();
      return;
    }

    this.fetchBackupInfo();
  }

  async fetchBackupInfo() {
    try {
      const backupInfo = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().getKeyBackupVersion();
      const backupSigStatus = // we may not have started crypto yet, in which case we definitely don't trust the backup
      _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().isCryptoEnabled() && (await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().isKeyBackupTrusted(backupInfo));
      const {
        forceReset
      } = this.props;
      const phase = backupInfo && !forceReset ? Phase.Migrate : Phase.ChooseKeyPassphrase;
      this.setState({
        phase,
        backupInfo,
        backupSigStatus
      });
      return {
        backupInfo,
        backupSigStatus
      };
    } catch (e) {
      this.setState({
        phase: Phase.LoadError
      });
    }
  }

  async queryKeyUploadAuth() {
    try {
      await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_1__[/* MatrixClientPeg */ "a"].get().uploadDeviceSigningKeys(null, {}); // We should never get here: the server should always require
      // UI auth to upload device signing keys. If we do, we upload
      // no keys which would be a no-op.

      matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_16__[/* logger */ "a"].log("uploadDeviceSigningKeys unexpectedly succeeded without UI auth!");
    } catch (error) {
      if (!error.data || !error.data.flows) {
        matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_16__[/* logger */ "a"].log("uploadDeviceSigningKeys advertised no flows!");
        return;
      }

      const canUploadKeysWithPasswordOnly = error.data.flows.some(f => {
        return f.stages.length === 1 && f.stages[0] === 'm.login.password';
      });
      this.setState({
        canUploadKeysWithPasswordOnly
      });
    }
  }

  renderOptionKey() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_StyledRadioButton__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
      key: _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Key,
      value: _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Key,
      name: "keyPassphrase",
      checked: this.state.passPhraseKeySelected === _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Key,
      onChange: this.onKeyPassphraseChange,
      outlined: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_CreateSecretStorageDialog_optionTitle"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "mx_CreateSecretStorageDialog_optionIcon mx_CreateSecretStorageDialog_optionIcon_secureBackup"
    }), Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Generate a Security Key")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("We'll generate a Security Key for you to store somewhere safe, like a password manager or a safe.")));
  }

  renderOptionPassphrase() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_StyledRadioButton__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
      key: _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Passphrase,
      value: _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Passphrase,
      name: "keyPassphrase",
      checked: this.state.passPhraseKeySelected === _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Passphrase,
      onChange: this.onKeyPassphraseChange,
      outlined: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_CreateSecretStorageDialog_optionTitle"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "mx_CreateSecretStorageDialog_optionIcon mx_CreateSecretStorageDialog_optionIcon_securePhrase"
    }), Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Enter a Security Phrase")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Use a secret phrase only you know, and optionally save a Security Key to use for backup.")));
  }

  renderPhaseChooseKeyPassphrase() {
    const setupMethods = Object(_utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* getSecureBackupSetupMethods */ "d"])();
    const optionKey = setupMethods.includes(_utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Key) ? this.renderOptionKey() : null;
    const optionPassphrase = setupMethods.includes(_utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_14__[/* SecureBackupSetupMethod */ "a"].Passphrase) ? this.renderOptionPassphrase() : null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.onChooseKeyPassphraseFormSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "mx_CreateSecretStorageDialog_centeredBody"
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Safeguard against losing access to encrypted messages & data by " + "backing up encryption keys on your server.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_CreateSecretStorageDialog_primaryContainer",
      role: "radiogroup"
    }, optionKey, optionPassphrase), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
      primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Continue"),
      onPrimaryButtonClick: this.onChooseKeyPassphraseFormSubmit,
      onCancel: this.onCancelClick,
      hasCancel: this.state.canSkip
    }));
  }

  renderPhaseMigrate() {
    // TODO: This is a temporary screen so people who have the labs flag turned on and
    // click the button are aware they're making a change to their account.
    // Once we're confident enough in this (and it's supported enough) we can do
    // it automatically.
    // https://github.com/vector-im/element-web/issues/11696
    let authPrompt;

    let nextCaption = Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Next");

    if (this.state.canUploadKeysWithPasswordOnly) {
      authPrompt = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Enter your account password to confirm the upgrade:")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_Field__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"], {
        type: "password",
        label: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Password"),
        value: this.state.accountPassword,
        onChange: this.onAccountPasswordChange,
        forceValidity: this.state.accountPasswordCorrect === false ? false : null,
        autoFocus: true
      })));
    } else if (!this.state.backupSigStatus.usable) {
      authPrompt = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Restore your key backup to upgrade your encryption")));
      nextCaption = Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Restore");
    } else {
      authPrompt = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("You'll need to authenticate with the server to confirm the upgrade."));
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.onMigrateFormSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Upgrade this session to allow it to verify other sessions, " + "granting them access to encrypted messages and marking them " + "as trusted for other users.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, authPrompt), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
      primaryButton: nextCaption,
      onPrimaryButtonClick: this.onMigrateFormSubmit,
      hasCancel: false,
      primaryDisabled: this.state.canUploadKeysWithPasswordOnly && !this.state.accountPassword
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "danger",
      onClick: this.onCancelClick
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Skip'))));
  }

  renderPhasePassPhrase() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.onPassPhraseNextClick
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Enter a security phrase only you know, as it's used to safeguard your data. " + "To be secure, you shouldn't re-use your account password.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_CreateSecretStorageDialog_passPhraseContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_auth_PassphraseField__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
      className: "mx_CreateSecretStorageDialog_passPhraseField",
      onChange: this.onPassPhraseChange,
      minScore: PASSWORD_MIN_SCORE,
      value: this.state.passPhrase,
      onValidate: this.onPassPhraseValidate,
      fieldRef: this.passphraseField,
      autoFocus: true,
      label: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _td */ "b"])("Enter a Security Phrase"),
      labelEnterPassword: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _td */ "b"])("Enter a Security Phrase"),
      labelStrongPassword: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _td */ "b"])("Great! This Security Phrase looks strong enough."),
      labelAllowedButUnsafe: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _td */ "b"])("Great! This Security Phrase looks strong enough.")
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
      primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Continue'),
      onPrimaryButtonClick: this.onPassPhraseNextClick,
      hasCancel: false,
      disabled: !this.state.passPhraseValid
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      onClick: this.onCancelClick,
      className: "danger"
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Cancel"))));
  }

  renderPhasePassPhraseConfirm() {
    let matchText;
    let changeText;

    if (this.state.passPhraseConfirm === this.state.passPhrase) {
      matchText = Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("That matches!");
      changeText = Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Use a different passphrase?");
    } else if (!this.state.passPhrase.startsWith(this.state.passPhraseConfirm)) {
      // only tell them they're wrong if they've actually gone wrong.
      // Security concious readers will note that if you left element-web unattended
      // on this screen, this would make it easy for a malicious person to guess
      // your passphrase one letter at a time, but they could get this faster by
      // just opening the browser's developer tools and reading it.
      // Note that not having typed anything at all will not hit this clause and
      // fall through so empty box === no hint.
      matchText = Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("That doesn't match.");
      changeText = Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Go back to set it again.");
    }

    let passPhraseMatch = null;

    if (matchText) {
      passPhraseMatch = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, matchText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
        element: "span",
        className: "mx_linkButton",
        onClick: this.onSetAgainClick
      }, changeText)));
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.onPassPhraseConfirmNextClick
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Enter your Security Phrase a second time to confirm it.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_CreateSecretStorageDialog_passPhraseContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_Field__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"], {
      type: "password",
      onChange: this.onPassPhraseConfirmChange,
      value: this.state.passPhraseConfirm,
      className: "mx_CreateSecretStorageDialog_passPhraseField",
      label: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Confirm your Security Phrase"),
      autoFocus: true,
      autoComplete: "new-password"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_CreateSecretStorageDialog_passPhraseMatch"
    }, passPhraseMatch)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
      primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Continue'),
      onPrimaryButtonClick: this.onPassPhraseConfirmNextClick,
      hasCancel: false,
      disabled: this.state.passPhrase !== this.state.passPhraseConfirm
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      onClick: this.onCancelClick,
      className: "danger"
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Skip"))));
  }

  renderPhaseShowKey() {
    let continueButton;

    if (this.state.phase === Phase.ShowKey) {
      continueButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
        primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Continue"),
        disabled: !this.state.downloaded && !this.state.copied && !this.state.setPassphrase,
        onPrimaryButtonClick: this.onShowKeyContinueClick,
        hasCancel: false
      });
    } else {
      continueButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "mx_CreateSecretStorageDialog_continueSpinner"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_InlineSpinner__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], null));
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Store your Security Key somewhere safe, like a password manager or a safe, " + "as it's used to safeguard your encrypted data.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_CreateSecretStorageDialog_primaryContainer mx_CreateSecretStorageDialog_recoveryKeyPrimarycontainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_CreateSecretStorageDialog_recoveryKeyContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_CreateSecretStorageDialog_recoveryKey"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", {
      ref: this.recoveryKeyNode
    }, this.recoveryKey.encodedPrivateKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_CreateSecretStorageDialog_recoveryKeyButtons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      kind: "primary",
      className: "mx_Dialog_primary",
      onClick: this.onDownloadClick,
      disabled: this.state.phase === Phase.Storing
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Download")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("or")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      kind: "primary",
      className: "mx_Dialog_primary mx_CreateSecretStorageDialog_recoveryKeyButtons_copyBtn",
      onClick: this.onCopyClick,
      disabled: this.state.phase === Phase.Storing
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "mx_CreateSecretStorageDialog_recoveryKeyCopyButtonText",
      style: {
        height: this.state.copied ? '0' : 'auto'
      },
      "aria-hidden": this.state.copied
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Copy")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "mx_CreateSecretStorageDialog_recoveryKeyCopyButtonText",
      style: {
        height: this.state.copied ? 'auto' : '0'
      },
      "aria-hidden": !this.state.copied
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Copied!")))))), continueButton);
  }

  renderBusyPhase() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_Spinner__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"], null));
  }

  renderPhaseLoadError() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Unable to query secret storage status")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_Dialog_buttons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
      primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Retry'),
      onPrimaryButtonClick: this.onLoadRetryClick,
      hasCancel: this.state.canSkip,
      onCancel: this.onCancel
    })));
  }

  renderPhaseSkipConfirm() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("If you cancel now, you may lose encrypted messages & data if you lose access to your logins.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("You can also set up Secure Backup & manage your keys in Settings.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
      primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Go back'),
      onPrimaryButtonClick: this.onGoBackClick,
      hasCancel: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "danger",
      onClick: this.onCancel
    }, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Cancel'))));
  }

  titleForPhase(phase) {
    switch (phase) {
      case Phase.ChooseKeyPassphrase:
        return Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Set up Secure Backup');

      case Phase.Migrate:
        return Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Upgrade your encryption');

      case Phase.Passphrase:
        return Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Set a Security Phrase');

      case Phase.PassphraseConfirm:
        return Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Confirm Security Phrase');

      case Phase.ConfirmSkip:
        return Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Are you sure?');

      case Phase.ShowKey:
        return Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Save your Security Key');

      case Phase.Storing:
        return Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Setting up keys');

      default:
        return '';
    }
  }

  render() {
    let content;

    if (this.state.error) {
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])("Unable to set up secret storage")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "mx_Dialog_buttons"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
        primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_3__[/* _t */ "a"])('Retry'),
        onPrimaryButtonClick: this.bootstrapSecretStorage,
        hasCancel: this.state.canSkip,
        onCancel: this.onCancel
      })));
    } else {
      switch (this.state.phase) {
        case Phase.Loading:
          content = this.renderBusyPhase();
          break;

        case Phase.LoadError:
          content = this.renderPhaseLoadError();
          break;

        case Phase.ChooseKeyPassphrase:
          content = this.renderPhaseChooseKeyPassphrase();
          break;

        case Phase.Migrate:
          content = this.renderPhaseMigrate();
          break;

        case Phase.Passphrase:
          content = this.renderPhasePassPhrase();
          break;

        case Phase.PassphraseConfirm:
          content = this.renderPhasePassPhraseConfirm();
          break;

        case Phase.ShowKey:
          content = this.renderPhaseShowKey();
          break;

        case Phase.Storing:
          content = this.renderBusyPhase();
          break;

        case Phase.ConfirmSkip:
          content = this.renderPhaseSkipConfirm();
          break;
      }
    }

    let titleClass = null;

    switch (this.state.phase) {
      case Phase.Passphrase:
      case Phase.PassphraseConfirm:
        titleClass = ['mx_CreateSecretStorageDialog_titleWithIcon', 'mx_CreateSecretStorageDialog_securePhraseTitle'];
        break;

      case Phase.ShowKey:
        titleClass = ['mx_CreateSecretStorageDialog_titleWithIcon', 'mx_CreateSecretStorageDialog_secureBackupTitle'];
        break;

      case Phase.ChooseKeyPassphrase:
        titleClass = 'mx_CreateSecretStorageDialog_centeredTitle';
        break;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
      className: "mx_CreateSecretStorageDialog",
      onFinished: this.props.onFinished,
      title: this.titleForPhase(this.state.phase),
      titleClass: titleClass,
      hasCancel: this.props.hasCancel && [Phase.Passphrase].includes(this.state.phase),
      fixedWidth: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, content));
  }

}

_defineProperty(CreateSecretStorageDialog, "defaultProps", {
  hasCancel: true,
  forceReset: false
});

/***/ })

}]);