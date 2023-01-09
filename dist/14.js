(globalThis["webpackJsonp"] = globalThis["webpackJsonp"] || []).push([[14],{

/***/ 1552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ManageEventIndexDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _SdkConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(116);
/* harmony import */ var _indexing_EventIndexPeg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(93);
/* harmony import */ var _settings_SettingLevel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
/* harmony import */ var _components_views_elements_Field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(26);
/* harmony import */ var _components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(28);
/* harmony import */ var _components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(51);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Copyright 2020-2021 The Matrix.org Foundation C.I.C.

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
 * Allows the user to introspect the event index state and disable it.
 */
class ManageEventIndexDialog extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "updateCurrentRoom", async room => {
      const eventIndex = _indexing_EventIndexPeg__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].get();
      let stats;

      try {
        stats = await eventIndex.getStats();
      } catch {
        // This call may fail if sporadically, not a huge issue as we will
        // try later again and probably succeed.
        return;
      }

      let currentRoom = null;
      if (room) currentRoom = room.name;
      const roomStats = eventIndex.crawlingRooms();
      const crawlingRoomsCount = roomStats.crawlingRooms.size;
      const roomCount = roomStats.totalRooms.size;
      this.setState({
        eventIndexSize: stats.size,
        eventCount: stats.eventCount,
        crawlingRoomsCount: crawlingRoomsCount,
        roomCount: roomCount,
        currentRoom: currentRoom
      });
    });

    _defineProperty(this, "onDisable", async () => {
      const DisableEventIndexDialog = (await __webpack_require__.e(/* import() */ 13).then(__webpack_require__.bind(null, 1561))).default;
      _Modal__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].createTrackedDialog("Disable message search", "Disable message search", DisableEventIndexDialog, null, null,
      /* priority = */
      false,
      /* static = */
      true);
    });

    _defineProperty(this, "onCrawlerSleepTimeChange", e => {
      this.setState({
        crawlerSleepTime: e.target.value
      });
      _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].setValue("crawlerSleepTime", null, _settings_SettingLevel__WEBPACK_IMPORTED_MODULE_7__[/* SettingLevel */ "a"].DEVICE, e.target.value);
    });

    this.state = {
      eventIndexSize: 0,
      eventCount: 0,
      crawlingRoomsCount: 0,
      roomCount: 0,
      currentRoom: null,
      crawlerSleepTime: _settings_SettingsStore__WEBPACK_IMPORTED_MODULE_3__[/* default */ "b"].getValueAt(_settings_SettingLevel__WEBPACK_IMPORTED_MODULE_7__[/* SettingLevel */ "a"].DEVICE, 'crawlerSleepTime')
    };
  }

  componentWillUnmount() {
    const eventIndex = _indexing_EventIndexPeg__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].get();

    if (eventIndex !== null) {
      eventIndex.removeListener("changedCheckpoint", this.updateCurrentRoom);
    }
  }

  async componentDidMount() {
    let eventIndexSize = 0;
    let crawlingRoomsCount = 0;
    let roomCount = 0;
    let eventCount = 0;
    let currentRoom = null;
    const eventIndex = _indexing_EventIndexPeg__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].get();

    if (eventIndex !== null) {
      eventIndex.on("changedCheckpoint", this.updateCurrentRoom);

      try {
        const stats = await eventIndex.getStats();
        eventIndexSize = stats.size;
        eventCount = stats.eventCount;
      } catch {// This call may fail if sporadically, not a huge issue as we
        // will try later again in the updateCurrentRoom call and
        // probably succeed.
      }

      const roomStats = eventIndex.crawlingRooms();
      crawlingRoomsCount = roomStats.crawlingRooms.size;
      roomCount = roomStats.totalRooms.size;
      const room = eventIndex.currentRoom();
      if (room) currentRoom = room.name;
    }

    this.setState({
      eventIndexSize,
      eventCount,
      crawlingRoomsCount,
      roomCount,
      currentRoom
    });
  }

  render() {
    const brand = _SdkConfig__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].get().brand;
    let crawlerState;

    if (this.state.currentRoom === null) {
      crawlerState = Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])("Not currently indexing messages for any room.");
    } else {
      crawlerState = Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])("Currently indexing: %(currentRoom)s", {
        currentRoom: this.state.currentRoom
      });
    }

    const doneRooms = Math.max(0, this.state.roomCount - this.state.crawlingRoomsCount);
    const eventIndexingSettings = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])("%(brand)s is securely caching encrypted messages locally for them " + "to appear in search results:", {
      brand
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx_SettingsTab_subsectionText"
    }, crawlerState, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])("Space used:"), " ", Object(_utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_5__[/* formatBytes */ "a"])(this.state.eventIndexSize, 0), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])("Indexed messages:"), " ", Object(_utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_5__[/* formatCountLong */ "d"])(this.state.eventCount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])("Indexed rooms:"), " ", Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])("%(doneRooms)s out of %(totalRooms)s", {
      doneRooms: Object(_utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_5__[/* formatCountLong */ "d"])(doneRooms),
      totalRooms: Object(_utils_FormattingUtils__WEBPACK_IMPORTED_MODULE_5__[/* formatCountLong */ "d"])(this.state.roomCount)
    }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_Field__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
      label: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])('Message downloading sleep time(ms)'),
      type: "number",
      value: this.state.crawlerSleepTime.toString(),
      onChange: this.onCrawlerSleepTimeChange
    })));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_dialogs_BaseDialog__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
      className: "mx_ManageEventIndexDialog",
      onFinished: this.props.onFinished,
      title: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])("Message search")
    }, eventIndexingSettings, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
      primaryButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])("Done"),
      onPrimaryButtonClick: this.props.onFinished,
      primaryButtonClass: "primary",
      cancelButton: Object(_languageHandler__WEBPACK_IMPORTED_MODULE_1__[/* _t */ "a"])("Disable"),
      onCancel: this.onDisable,
      cancelButtonClass: "danger"
    }));
  }

}

/***/ })

}]);