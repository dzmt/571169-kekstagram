'use strict';

(function () {
  var ZOOM_STEP = 25;
  var MAX_ZOOM = 100;

  var STYLE_PROPERTY_TRANSFORM = 'transform';

  var TEXT_CONTENT_INCREASE = 'Увеличить';

  var COEFFICIENT_MINUS = -1;
  var COEFFICIENT_PLUS = 1;

  var DECIMAL_NOTATION = 10;
  var PERSENT_BASE = 100;

  var SELECTOR_RESIZE_CONTROL_MINUS = '.resize__control--minus';
  var SELECTOR_RESIZE_CONTROL_PLUS = '.resize__control--plus';
  var SELECTOR_RESIZE_CONTROL_VALUE = '.resize__control--value';
  var SELECTOR_IMG_UPLOAD_PREVIEW = '.img-upload__preview';

  var CONTROL_MINUS = document.querySelector(SELECTOR_RESIZE_CONTROL_MINUS);
  var CONTROL_PLUS = document.querySelector(SELECTOR_RESIZE_CONTROL_PLUS);
  var CONTROL_VALUE = document.querySelector(SELECTOR_RESIZE_CONTROL_VALUE);
  var IMG_UPLOAD_PREVIEW = document.querySelector(SELECTOR_IMG_UPLOAD_PREVIEW);

  var getScaleFunc = function (value) {
    return 'scale(' + value + ')';
  };

  var getInputValue = function (input) {
    return input.value;
  };

  var setInputValue = function (input, value) {
    input.value = value;
  };

  var getNumberFromInputValue = function (value) {
    var number = Number.parseInt(value, DECIMAL_NOTATION);
    return number;
  };

  var getRatioFromPercentages = function (percentages) {
    return percentages / PERSENT_BASE;
  };

  var getPercentagesFrom = function (ratio) {
    return ratio + '%';
  };

  var getCurrentSize = function (input) {
    var curentScaleString = getInputValue(input);
    var currentSize = getNumberFromInputValue(curentScaleString);
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
    var factor = evt.target.textContent === TEXT_CONTENT_INCREASE ? COEFFICIENT_PLUS : COEFFICIENT_MINUS;
    step *= factor;
    changeControlValue(step);
  };

  CONTROL_MINUS.addEventListener(window.enum.EVENT.CLICK, resizeControlClickHandler);
  CONTROL_PLUS.addEventListener(window.enum.EVENT.CLICK, resizeControlClickHandler);
})();
