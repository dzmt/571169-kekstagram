'use strict';

(function () {

  var CLASS_EFFECT = {
    chrome: 'effects__preview--chrome',
    sepia: 'effects__preview--sepia',
    marvin: 'effects__preview--marvin',
    phobos: 'effects__preview--phobos',
    heat: 'effects__preview--heat'
  };

  var ID_RADIO_EFFECT_NONE = 'effect-none';

  var CLASS_IMG_UPLOAD_PREVIEW = 'img-upload__preview';

  var PROPERTY_FILTER = 'filter';

  var IMG_UPLOAD_PREVIEW = document.querySelector(window.enum.SELECTOR.IMG_UPLOAD_PREVIEW);

  var applyEffect = function (classEffect) {
    IMG_UPLOAD_PREVIEW.classList.add(classEffect);
  };

  var resetPreviousEffect = function () {
    window.utils.resetStyle(IMG_UPLOAD_PREVIEW, PROPERTY_FILTER);
    if (IMG_UPLOAD_PREVIEW.classList.length > 1) {
      IMG_UPLOAD_PREVIEW.className = CLASS_IMG_UPLOAD_PREVIEW;
    }
  };

  var resetScale = function () {
    var pin = document.querySelector(window.enum.SELECTOR.SCALE_PIN);
    var level = document.querySelector(window.enum.SELECTOR.SCALE_LEVEL);
    var line = document.querySelector(window.enum.SELECTOR.SCALE_LINE);
    var originValue = line.clientWidth;
    window.utils.translatePin(pin, originValue);
    window.utils.changeWidthLevel(level, originValue);
  };

  var getNameEffect = function (radio) {
    return radio.id.substr(7);
  };

  var effectsRadioChangeHandler = function (evt) {
    resetPreviousEffect();

    if (evt.target.id === ID_RADIO_EFFECT_NONE) {
      window.utils.hideImgUploadScale();
    } else {
      window.utils.showImgUploadScale();
      resetScale();
      var radioEffect = evt.target;
      var effectName = getNameEffect(radioEffect);
      var classEffect = CLASS_EFFECT[effectName];
      applyEffect(classEffect);
    }
  };

  var setEventHandlerToEffectTogglers = function () {
    var togglers = document.querySelectorAll(window.enum.SELECTOR.EFFECTS_RADIO);
    for (var i = 0; i < togglers.length; i++) {
      var radio = togglers[i];
      if (radio.id === ID_RADIO_EFFECT_NONE) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
      radio.addEventListener(window.enum.EVENT.CHANGE, effectsRadioChangeHandler);
    }
  };

  setEventHandlerToEffectTogglers();
})();
