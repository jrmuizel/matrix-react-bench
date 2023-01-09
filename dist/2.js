(globalThis["webpackJsonp"] = globalThis["webpackJsonp"] || []).push([[2],{

/***/ 783:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultOptions", function() { return DefaultOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rainfall; });
/* harmony import */ var _utils_arrays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 Copyright 2020 The Matrix.org Foundation C.I.C.
 Copyright 2021 Josias Allestad

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

const DefaultOptions = {
  maxCount: 600,
  speed: 12
};
const KEY_FRAME_INTERVAL = 15;
class Rainfall {
  constructor(options) {
    var _this = this;

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "context", null);

    _defineProperty(this, "particles", []);

    _defineProperty(this, "lastAnimationTime", void 0);

    _defineProperty(this, "isRunning", void 0);

    _defineProperty(this, "start", async function (canvas) {
      let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

      if (!canvas) {
        return;
      }

      _this.context = canvas.getContext('2d');
      _this.particles = [];
      const count = _this.options.maxCount;

      while (_this.particles.length < count) {
        _this.particles.push(_this.resetParticle({}, canvas.width, canvas.height));
      }

      _this.isRunning = true;
      requestAnimationFrame(_this.renderLoop);

      if (timeout) {
        window.setTimeout(_this.stop, timeout);
      }
    });

    _defineProperty(this, "stop", async () => {
      this.isRunning = false;
    });

    _defineProperty(this, "resetParticle", (particle, width, height) => {
      particle.x = Math.random() * width;
      particle.y = Math.random() * -height;
      particle.width = Math.random() * 1.5;
      particle.height = particle.width * 15 + 4;
      particle.speed = Math.random() * this.options.speed * 4 / 5 + this.options.speed;
      return particle;
    });

    _defineProperty(this, "renderLoop", () => {
      if (!this.context || !this.context.canvas) {
        return;
      }

      if (this.particles.length === 0) {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      } else {
        const timeDelta = Date.now() - this.lastAnimationTime;

        if (timeDelta >= KEY_FRAME_INTERVAL || !this.lastAnimationTime) {
          // Clear the screen first
          this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
          this.lastAnimationTime = Date.now();
          this.animateAndRenderRaindrops();
        }

        requestAnimationFrame(this.renderLoop);
      }
    });

    _defineProperty(this, "animateAndRenderRaindrops", () => {
      if (!this.context || !this.context.canvas) {
        return;
      }

      const height = this.context.canvas.height;

      for (const particle of Object(_utils_arrays__WEBPACK_IMPORTED_MODULE_0__[/* arrayFastClone */ "b"])(this.particles)) {
        particle.y += particle.speed;
        this.context.save();
        this.context.beginPath();
        this.context.rect(particle.x, particle.y, particle.width, particle.height);
        this.context.fillStyle = '#5dadec'; // light blue

        this.context.fill();
        this.context.closePath();
        this.context.restore(); // Remove dead raindrops

        const maxBounds = height * 2;

        if (particle.y > height + maxBounds) {
          const idx = this.particles.indexOf(particle);
          this.particles.splice(idx, 1);
        }
      }
    });

    this.options = _objectSpread(_objectSpread({}, DefaultOptions), options);
  }

}

/***/ })

}]);