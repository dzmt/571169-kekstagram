'use strict';

(function () {
  var START_INDEX_EFFECT_NAME = 18;
  var INDEX_CLASS_EFFECT = 1;

  var SELECTOR_IMG_UPLAD_PREVIEW = '.img-upload__preview';

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

  var applyFilterInSliderMotion = function (ratio) {
    var effectClassName = getEffectClassName(IMG_UPLOAD_PREVIEW);
    var effectName = getEffectName(effectClassName);
    var filterFunction = getFilterFunction(effectName, ratio);
    applyFilter(IMG_UPLOAD_PREVIEW, filterFunction);
  };

  window.slider.init(applyFilterInSliderMotion);
})();
