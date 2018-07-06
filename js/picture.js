'use strict';

(function () {
  var utils = window.utils;
  var EVENT = window.enum.EVENT;

  var SELECTOR_BIG_PICTURE = '.big-picture';
  var SELECTOR_CANCEL_BUTTON = '.big-picture__cancel';
  var BIG_PICTURE = document.querySelector(SELECTOR_BIG_PICTURE);

  var bigPictureCloseEscPressHandler = function (evt) {
    if (utils.isEscKeyCode(evt.keyCode)) {
      closeBigPictureOverlay();
    }
  };

  var openBigPictureOverlay = function (fotoDescription) {
    document.addEventListener(EVENT.KEYDOWN, bigPictureCloseEscPressHandler);
    window.preview.fill(fotoDescription);
    utils.showElement(BIG_PICTURE);
  };

  var closeBigPictureOverlay = function () {
    utils.hideElement(BIG_PICTURE);
    document.removeEventListener(EVENT.KEYDOWN, bigPictureCloseEscPressHandler);
  };

  var bigPictureCancelClickHandler = function () {
    closeBigPictureOverlay();
  };

  var addEventListener = function (elementSelector, event, handler) {
    var element = document.querySelector(elementSelector);
    element.addEventListener(event, handler);
  };

  addEventListener(SELECTOR_CANCEL_BUTTON, EVENT.CLICK, bigPictureCancelClickHandler);

  window.picture = {
    getOpenClickHadler: function (picture) {
      return function () {
        openBigPictureOverlay(picture);
      };
    },

    getOpenEnterPressHandler: function (picture) {
      return function (evt) {
        if (utils.isEnterKeyCode(evt.keyCode)) {
          openBigPictureOverlay(picture);
        }
      };
    }
  };
})();
