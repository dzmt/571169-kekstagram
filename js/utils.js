'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var CLASS_HIDDEN = 'hidden';

  var PROPERTY_LEFT = 'left';
  var PROPERTY_WIDTH = 'width';

  var MEASURING_PX = 'px';

  var RESET_VALUE = '';

  var MARKER_CONTAING_EFFECT_CLASS = 2;
  var PROPERTY_FILTER = 'filter';
  var CLASS_IMG_UPLOAD_PREVIEW = 'img-upload__preview';
  var SELECTOR_IMG_UPLOAD_SCALE = '.img-upload__scale';

  window.utils = {
    getRandomNumber: function (number) {
      var randomValue = Math.floor(Math.random() * number);
      return randomValue;
    },

    isEvenNumber: function (number) {
      return (number % 2 === 0) ? true : false;
    },

    setCoords: function (valueX, valueY) {
      return {
        x: valueX,
        y: valueY
      };
    },

    calculateShift: function (startX, startY, endX, endY) {
      var deltaX = endX - startX;
      var deltaY = endY - startY;
      return {
        x: deltaX,
        y: deltaY
      };
    },

    getRatioToNumbers: function (numerator, denominator) {
      var ratio = Math.round((numerator / denominator) * 1000) / 1000;
      return ratio;
    },

    isEscKeyCode: function (keyCode) {
      return ESC_KEY_CODE === keyCode ? true : false;
    },

    isEnterKeyCode: function (keyCode) {
      return ENTER_KEY_CODE === keyCode ? true : false;
    },

    addClass: function (elementSelector, targetClass) {
      var element = document.querySelector(elementSelector);
      element.classList.add(targetClass);
    },

    removeClass: function (elementSelector, targetClass) {
      var element = document.querySelector(elementSelector);
      element.classList.remove(targetClass);
    },

    setStyle: function (element, property, value) {
      element.style[property] = value;
    },

    resetStyle: function (element, property) {
      element.style[property] = RESET_VALUE;
    },

    removeChildrenElement: function (element) {
      var children = [];
      for (var i = 0; i < element.children.length; i++) {
        children.push(element.children[i]);
      }
      for (var j = 0; j < children.length; j++) {
        element.removeChild(children[j]);
      }
    },

    createElementWithClass: function (elementTagName, elementClass) {
      var element = document.createElement(elementTagName);
      element.classList.add(elementClass);
      return element;
    },

    hideElement: function (element) {
      element.classList.add(CLASS_HIDDEN);
    },

    showElement: function (element) {
      element.classList.remove(CLASS_HIDDEN);
    },

    setElementProperty: function (element, property, value) {
      element[property] = value;
    },

    resetElementProperty: function (element, property) {
      element[property] = RESET_VALUE;
    },

    resetInputTypeFile: function (selectorInput) {
      var input = document.querySelector(selectorInput);
      input.value = RESET_VALUE;
    },

    hideImgUploadScale: function () {
      var imgUploadScale = document.querySelector(SELECTOR_IMG_UPLOAD_SCALE);
      this.hideElement(imgUploadScale);
    },

    showImgUploadScale: function () {
      var imgUploadScale = document.querySelector(SELECTOR_IMG_UPLOAD_SCALE);
      this.showElement(imgUploadScale);
    },

    translatePin: function (pin, offsetLeft) {
      var translateValue = offsetLeft + MEASURING_PX;
      window.utils.setStyle(pin, PROPERTY_LEFT, translateValue);
    },

    changeWidthLevel: function (level, offsetWidth) {
      var offsetWidthValue = offsetWidth + MEASURING_PX;
      window.utils.setStyle(level, PROPERTY_WIDTH, offsetWidthValue);
    },

    hasEffectClassUploadPreview: function (imgUploadPreview) {
      var countClass = imgUploadPreview.classList.length;
      return countClass >= MARKER_CONTAING_EFFECT_CLASS ? true : false;
    },

    resetPreviousEffect: function (imgUploadPreview) {
      this.resetStyle(imgUploadPreview, PROPERTY_FILTER);
      if (this.hasEffectClassUploadPreview(imgUploadPreview)) {
        imgUploadPreview.className = CLASS_IMG_UPLOAD_PREVIEW;
      }
    }
  };
})();
