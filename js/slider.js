'use strict';

(function () {
  var PROPERTY_LEFT = 'left';
  var PROPERTY_WIDTH = 'width';

  var MEASURING_PX = 'px';

  var SELECTOR_PIN = '.scale__pin';
  var SELECTOR_LEVEL = '.scale__level';
  var SELECTOR_LINE = '.scale__line';

  var SCALE_PIN = document.querySelector(SELECTOR_PIN);
  var SCALE_LINE = document.querySelector(SELECTOR_LINE);
  var SCALE_LEVEL = document.querySelector(SELECTOR_LEVEL);

  var translatePin = function (pin, offsetLeft) {
    var translateValue = offsetLeft + MEASURING_PX;
    window.utils.setStyle(pin, PROPERTY_LEFT, translateValue);
  };

  var changeWidthLevel = function (level, offsetWidth) {
    var offsetWidthValue = offsetWidth + MEASURING_PX;
    window.utils.setStyle(level, PROPERTY_WIDTH, offsetWidthValue);
  };

  var moveSlider = function (pin, level, line, shift) {
    var offsetLeft = pin.offsetLeft + shift.x;
    var scaleLevelWidth = pin.offsetLeft;
    if ((offsetLeft >= 0) && (offsetLeft <= line.offsetWidth)) {
      translatePin(pin, offsetLeft);
      changeWidthLevel(level, scaleLevelWidth);
    }
  };

  var getRatioScalePinToScaleLine = function (pin, line) {
    var scalePinCenterPosition = pin.offsetLeft;
    var scaleLineWidth = line.offsetWidth;
    var ratio = window.utils.getRatioOfNumbers(scalePinCenterPosition, scaleLineWidth);
    return ratio;
  };

  var setPosition = function (position) {
    translatePin(SCALE_PIN, position);
    changeWidthLevel(SCALE_LEVEL, position);
  };

  var addEventListenerToPin = function (pin, level, line, callback) {
    var scalePinMousedownHandler = function (mousedownEvt) {
      var startCoords = window.utils.setCoords(mousedownEvt.clientX, mousedownEvt.clientY);
      var mousemoveHandler = function (mousemoveEvt) {
        var shift = window.utils.calculateShift(startCoords.x, startCoords.y, mousemoveEvt.clientX, mousemoveEvt.clientY);
        startCoords = window.utils.setCoords(mousemoveEvt.x, mousemoveEvt.y);
        moveSlider(pin, level, line, shift);
        var ratio = getRatioScalePinToScaleLine(pin, line);
        callback(ratio);
      };
      var mouseupHandler = function () {
        document.removeEventListener(window.enum.EVENT.MOUSEMOVE, mousemoveHandler);
        document.removeEventListener(window.enum.EVENT.MOUSEUP, mouseupHandler);
      };
      document.addEventListener(window.enum.EVENT.MOUSEMOVE, mousemoveHandler);
      document.addEventListener(window.enum.EVENT.MOUSEUP, mouseupHandler);
    };
    pin.addEventListener(window.enum.EVENT.MOUSEDOWN, scalePinMousedownHandler);
  };

  window.slider = {
    init: function (callback) {
      addEventListenerToPin(SCALE_PIN, SCALE_LEVEL, SCALE_LINE, callback);
    },

    setEndPosition: function () {
      setPosition(SCALE_LINE.offsetWidth);
    }
  };

})();
