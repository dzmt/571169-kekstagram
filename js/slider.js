'use strict';

(function () {
  var START_INDEX_EFFECT_NAME = 18;

  var FILTER_FUNCTIONS = {
    chrome: function (ratio) {
      return 'grayscale(' + ratio + ')';
    },
    sepia: function (ratio) {
      return 'sepia(' + ratio + ')';
    },
    marvin: function (ratio) {
      var valueOfEffect = ratio * 100;
      return 'invert(' + valueOfEffect + '%)';
    },
    phobos: function (ratio) {
      var valueOfEffect = 3 * ratio;
      return 'blur(' + valueOfEffect + 'px)';
    },
    heat: function (ratio) {
      var valueOfEffect = 1 + 2 * ratio;
      return 'brightness(' + valueOfEffect + ')';
    }
  };

  var SCALE_PIN = document.querySelector(window.enum.SELECTOR.SCALE_PIN);
  var SCALE_LINE = document.querySelector(window.enum.SELECTOR.SCALE_LINE);
  var SCALE_LEVEL = document.querySelector(window.enum.SELECTOR.SCALE_LEVEL);
  var IMG_UPLOAD_PREVIEW = document.querySelector(window.enum.SELECTOR.IMG_UPLOAD_PREVIEW);

  var getRatioScalePinToScaleLine = function () {
    var scalePinCenterPosition = SCALE_PIN.offsetLeft + SCALE_PIN.offsetWidth / 2;
    var scaleLineWidth = SCALE_LINE.offsetWidth;
    var ratio = window.utils.getRatioToNumbers(scalePinCenterPosition, scaleLineWidth);
    return ratio;
  };

  var getEffectClassName = function (element) {
    var effectClassName = element.classList[1];
    return effectClassName;
  };

  var getEffectName = function (className) {
    return className.substr(START_INDEX_EFFECT_NAME);
  };

  var getFilterFunction = function (effect, ratio) {
    return FILTER_FUNCTIONS[effect](ratio);
  };

  var applyFilter = function (element, filterFunction) {
    element.style.filter = filterFunction;
  };

  var apllyFilterInSliderMotion = function () {
    var effectClassName = getEffectClassName(IMG_UPLOAD_PREVIEW);
    var effectName = getEffectName(effectClassName);
    var ratio = getRatioScalePinToScaleLine();
    var filterFunction = getFilterFunction(effectName, ratio);
    applyFilter(IMG_UPLOAD_PREVIEW, filterFunction);
  };

  var moveSlider = function (shift) {
    var offsetLeft = SCALE_PIN.offsetLeft + shift.x;
    var scaleLevelWidth = offsetLeft;
    if ((offsetLeft >= 0) && (offsetLeft <= SCALE_LINE.offsetWidth)) {
      window.utils.translatePin(SCALE_PIN, offsetLeft);
      window.utils.changeWidthLevel(SCALE_LEVEL, scaleLevelWidth);
    }
  };

  var scalePinMousedownHandler = function (mousedownEvt) {
    var startCoords = window.utils.setCoords(mousedownEvt.clientX, mousedownEvt.clientY);

    var mousemoveHandler = function (mousemoveEvt) {
      var shift = window.utils.calculateShift(startCoords.x, startCoords.y, mousemoveEvt.clientX, mousemoveEvt.clientY);
      startCoords = window.utils.setCoords(mousemoveEvt.x, mousemoveEvt.y);
      moveSlider(shift);
      apllyFilterInSliderMotion();
    };
    var mouseupHandler = function () {
      document.removeEventListener(window.enum.EVENT.MOUSEMOVE, mousemoveHandler);
      document.removeEventListener(window.enum.EVENT.MOUSEUP, mouseupHandler);
    };

    document.addEventListener(window.enum.EVENT.MOUSEMOVE, mousemoveHandler);
    document.addEventListener(window.enum.EVENT.MOUSEUP, mouseupHandler);
  };

  SCALE_PIN.addEventListener(window.enum.EVENT.MOUSEDOWN, scalePinMousedownHandler);
})();