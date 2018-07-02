'use strict';

(function () {
  var utils = window.utils;

  var CLASS_EFFECT = {
    chrome: 'effects__preview--chrome',
    sepia: 'effects__preview--sepia',
    marvin: 'effects__preview--marvin',
    phobos: 'effects__preview--phobos',
    heat: 'effects__preview--heat'
  };

  var SELECTOR_IMG_UPLOAD_PREVIEW = '.img-upload__preview';
  var SELECTOR_EFFECTS_RADIO = '.effects__radio';

  var ID_RADIO_EFFECT_NONE = 'effect-none';
  var INDEX_START_EFFECT_NAME = 7;

  var IMG_UPLOAD_PREVIEW = document.querySelector(SELECTOR_IMG_UPLOAD_PREVIEW);
  var TOGGLERS = document.querySelectorAll(SELECTOR_EFFECTS_RADIO);

  var applyEffect = function (classEffect) {
    IMG_UPLOAD_PREVIEW.classList.add(classEffect);
  };

  var getNameEffect = function (radio) {
    return radio.id.substr(INDEX_START_EFFECT_NAME);
  };

  var resetTogglers = function () {
    for (var i = 0; i < TOGGLERS.length; i++) {
      var toogler = TOGGLERS[i];
      var checked = false;
      if (toogler.id === ID_RADIO_EFFECT_NONE) {
        checked = true;
      }
      toogler.checked = checked;
    }
  };

  var effectsRadioChangeHandler = function (evt) {
    utils.resetPreviousEffect(IMG_UPLOAD_PREVIEW);

    if (evt.target.id === ID_RADIO_EFFECT_NONE) {
      utils.hideImgUploadScale();
    } else {
      utils.showImgUploadScale();
      window.slider.setSliderEndPosition();
      var radioEffect = evt.target;
      var effectName = getNameEffect(radioEffect);
      var classEffect = CLASS_EFFECT[effectName];
      applyEffect(classEffect);
    }
  };

  var setEventHandlerToEffectTogglers = function () {
    for (var i = 0; i < TOGGLERS.length; i++) {
      var radio = TOGGLERS[i];
      resetTogglers();
      radio.addEventListener(window.enum.EVENT.CHANGE, effectsRadioChangeHandler);
    }
  };

  setEventHandlerToEffectTogglers();

  window.togglers = {
    reset: function () {
      resetTogglers();
    }
  };
})();
