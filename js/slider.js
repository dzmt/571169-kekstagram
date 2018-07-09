'use strict';

(function () {
  var START_INDEX_EFFECT_NAME = 18;
  var INDEX_CLASS_EFFECT = 1;

  var PROPERTY_LEFT = 'left';
  var PROPERTY_WIDTH = 'width';

  var MEASURING_PX = 'px';

  var SELECTOR_PIN = '.scale__pin';
  var SELECTOR_LEVEL = '.scale__level';
  var SELECTOR_LINE = '.scale__line';
  var SELECTOR_IMG_UPLAD_PREVIEW = '.img-upload__preview';

  var SCALE_PIN = document.querySelector(SELECTOR_PIN);
  var SCALE_LINE = document.querySelector(SELECTOR_LINE);
  var SCALE_LEVEL = document.querySelector(SELECTOR_LEVEL);
  var IMG_UPLOAD_PREVIEW = document.querySelector(SELECTOR_IMG_UPLAD_PREVIEW);

  var FILTER_NAME_TO_FUNCTION = {
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

  var utils = window.utils;

  var translatePin = function (pin, offsetLeft) {
    var translateValue = offsetLeft + MEASURING_PX;
    window.utils.setStyle(pin, PROPERTY_LEFT, translateValue);
  };

  var changeWidthLevel = function (level, offsetWidth) {
    var offsetWidthValue = offsetWidth + MEASURING_PX;
    window.utils.setStyle(level, PROPERTY_WIDTH, offsetWidthValue);
  };

  var setPosition = function (position) {
    translatePin(SCALE_PIN, position);
    changeWidthLevel(SCALE_LEVEL, position);
  };

  var getRatioScalePinToScaleLine = function () {
    var scalePinCenterPosition = SCALE_PIN.offsetLeft;
    var scaleLineWidth = SCALE_LINE.offsetWidth;
    var ratio = utils.getRatioOfNumbers(scalePinCenterPosition, scaleLineWidth);
    return ratio;
  };

  var getEffectClassName = function (element) {
    var effectClassName = element.classList[INDEX_CLASS_EFFECT];
    return effectClassName;
  };

  var getEffectName = function (className) {
    return className.substr(START_INDEX_EFFECT_NAME);
  };

  var getFilterFunction = function (filterName, ratio) {
    return FILTER_NAME_TO_FUNCTION[filterName](ratio);
  };

  var applyFilter = function (element, filterFunction) {
    element.style.filter = filterFunction;
  };

  var applyFilterInSliderMotion = function () {
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
      translatePin(SCALE_PIN, offsetLeft);
      changeWidthLevel(SCALE_LEVEL, scaleLevelWidth);
    }
  };

  var scalePinMousedownHandler = function (mousedownEvt) {
    var startCoords = utils.setCoords(mousedownEvt.clientX, mousedownEvt.clientY);

    var mousemoveHandler = function (mousemoveEvt) {
      var shift = utils.calculateShift(startCoords.x, startCoords.y, mousemoveEvt.clientX, mousemoveEvt.clientY);
      startCoords = utils.setCoords(mousemoveEvt.x, mousemoveEvt.y);
      moveSlider(shift);
      applyFilterInSliderMotion();
    };
    var mouseupHandler = function () {
      document.removeEventListener(window.enum.EVENT.MOUSEMOVE, mousemoveHandler);
      document.removeEventListener(window.enum.EVENT.MOUSEUP, mouseupHandler);
    };

    document.addEventListener(window.enum.EVENT.MOUSEMOVE, mousemoveHandler);
    document.addEventListener(window.enum.EVENT.MOUSEUP, mouseupHandler);
  };

  SCALE_PIN.addEventListener(window.enum.EVENT.MOUSEDOWN, scalePinMousedownHandler);


  window.slider = {
    setSliderEndPosition: function () {
      setPosition(SCALE_LINE.offsetWidth);
    }
  };
})();
