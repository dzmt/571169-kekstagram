'use strict';

(function () {
  var ZOOM_STEP = 25;
  var MAX_ZOOM = 100;

  var STYLE_PROPERTY_TRANSFORM = 'transform';

  var TEXT_CONTENT_INCREASE = 'Увеличить';

  var CONTROL_MINUS = document.querySelector(window.enum.SELECTOR.RESIZE_CONTROL_MINUS);
  var CONTROL_PLUS = document.querySelector(window.enum.SELECTOR.RESIZE_CONTROL_PLUS);
  var CONTROL_VALUE = document.querySelector(window.enum.SELECTOR.RESIZE_CONTROL_VALUE);
  var IMG_UPLOAD_PREVIEW = document.querySelector(window.enum.SELECTOR.IMG_UPLOAD_PREVIEW);

  var getScaleFunc = function (value) {
    return 'scale(' + value + ')';
  };

  var getInputValue = function (input) {
    return input.value;
  };

  var setInputValue = function (input, value) {
    input.value = value;
  };

  var parseInputValue = function (value) {
    var number = Number.parseInt(value, 10);
    return number;
  };

  var getRatioFromPercentages = function (percentages) {
    return percentages / 100;
  };

  var getPercentagesFrom = function (ratio) {
    return ratio + '%';
  };

  var getCurrentSize = function (input) {
    var curentScaleString = getInputValue(input);
    var currentSize = parseInputValue(curentScaleString);
    return currentSize;
  };

  var getCurrentScaleFunc = function (size) {
    var valueScaleFunc = getRatioFromPercentages(size);
    var scaleFunc = getScaleFunc(valueScaleFunc);
    return scaleFunc;
  };

  var changeControlValue = function (step) {
    var currentSize = getCurrentSize(CONTROL_VALUE);
    var newSize = currentSize + step;

    if (newSize >= ZOOM_STEP && newSize <= MAX_ZOOM) {
      var scaleFunc = getCurrentScaleFunc(newSize);
      window.utils.setStyle(IMG_UPLOAD_PREVIEW, STYLE_PROPERTY_TRANSFORM, scaleFunc);
      setInputValue(CONTROL_VALUE, getPercentagesFrom(newSize));
    }
  };

  var resizeControlClickHandler = function (evt) {
    var step = ZOOM_STEP;
    var factor = evt.target.textContent === TEXT_CONTENT_INCREASE ? 1 : -1;
    step *= factor;
    changeControlValue(step);
  };

  CONTROL_MINUS.addEventListener(window.enum.EVENT.CLICK, resizeControlClickHandler);
  CONTROL_PLUS.addEventListener(window.enum.EVENT.CLICK, resizeControlClickHandler);
})();
