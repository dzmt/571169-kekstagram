'use strict';

(function () {
  var BIG_PICTURE = document.querySelector(window.enum.SELECTOR.BIG_PICTURE);

  var bigPictureCloseEscPressHandler = function (evt) {
    if (window.utils.isEscKeyCode(evt.keyCode)) {
      closeBigPictureOverlay();
    }
  };

  var openBigPictureOverlay = function (fotoDescription) {
    document.addEventListener(window.enum.EVENT.KEYDOWN, bigPictureCloseEscPressHandler);
    window.preview.fill(fotoDescription);
    window.utils.showElement(BIG_PICTURE);
  };

  var closeBigPictureOverlay = function () {
    window.utils.hideElement(BIG_PICTURE);
    document.removeEventListener(window.enum.EVENT.KEYDOWN, bigPictureCloseEscPressHandler);
  };

  var bigPictureCancelClickHandler = function () {
    closeBigPictureOverlay();
  };

  window.picture = {
    getOpenClickHadler: function (picture) {
      return function () {
        openBigPictureOverlay(picture);
      };
    },

    getOpenEnterPressHandler: function (picture) {
      return function (evt) {
        if (window.utils.isEnterKeyCode(evt.keyCode)) {
          openBigPictureOverlay(picture);
        }
      };
    }
  };

  var bigPictureCancelButton = document.querySelector(window.enum.SELECTOR.BIG_PICTURE_CANCEL);
  bigPictureCancelButton.addEventListener(window.enum.EVENT.CLICK, bigPictureCancelClickHandler);
})();
