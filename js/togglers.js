'use strict';

(function () {
  var CLASS_EFFECT = {
    chrome: 'effects__preview--chrome',
    sepia: 'effects__preview--sepia',
    marvin: 'effects__preview--marvin',
    phobos: 'effects__preview--phobos',
    heat: 'effects__preview--heat'
  };

  var utils = window.utils;

  var SELECTOR_IMG_UPLOAD_PREVIEW = '.img-upload__preview';
  var SELECTOR_TOGGLERS = '.effects__radio';

  var ID_RADIO_EFFECT_NONE = 'effect-none';
  var INDEX_START_EFFECT_NAME = 7;

  var IMG_UPLOAD_PREVIEW = document.querySelector(SELECTOR_IMG_UPLOAD_PREVIEW);
  var TOGGLERS = document.querySelectorAll(SELECTOR_TOGGLERS);

  var applyEffect = function (classEffect) {
    IMG_UPLOAD_PREVIEW.classList.add(classEffect);
  };

  var getNameEffect = function (radio) {
    return radio.id.substr(INDEX_START_EFFECT_NAME);
  };

  var resetTogglers = function () {
    TOGGLERS.forEach(function (toggler) {
      var checked = false;
      if (toggler.id === ID_RADIO_EFFECT_NONE) {
        checked = true;
      }
      toggler.checked = checked;
    });
  };

  var setInitState = function (toggler) {
    utils.showImgUploadScale();
    window.slider.setSliderEndPosition();
    var radioEffect = toggler;
    var effectName = getNameEffect(radioEffect);
    var classEffect = CLASS_EFFECT[effectName];
    applyEffect(classEffect);
  };

  var effectsRadioChangeHandler = function (evt) {
    utils.resetPreviousEffect(IMG_UPLOAD_PREVIEW);

    if (evt.target.id === ID_RADIO_EFFECT_NONE) {
      utils.hideImgUploadScale();
    } else {
      setInitState(evt.target);
    }
  };

  var setEventHandlerToEffectTogglers = function () {
    TOGGLERS.forEach(function (toggler) {
      resetTogglers();
      toggler.addEventListener(window.enum.EVENT.CHANGE, effectsRadioChangeHandler);
    });
  };

  setEventHandlerToEffectTogglers();

  window.togglers = {
    reset: function () {
      resetTogglers();
    }
  };
})();
