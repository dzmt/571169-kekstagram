'use strict';

(function () {
  var CLASS_TEXT_HASHTAGS = 'text__hashtags';
  var CLASS_TEXT_DESCRIPTION = 'text__description';
  var CLASS_IMG_UPLOAD_PREVIEW = 'img-upload__preview';

  var STYLE_TRANSFORM = 'transform';

  var PROPERTY_VALUE = 'value';

  var ORIGINAL_SIZE = '100%';

  var IMG_UPLOAD_OVERLAY = document.querySelector(window.enum.SELECTOR.IMG_UPLOAD_OVERLAY);

  var resetImgSizePreview = function (originalValue) {
    var controlValue = document.querySelector(window.enum.SELECTOR.RESIZE_CONTROL_VALUE);
    window.utils.setElementProperty(controlValue, PROPERTY_VALUE, originalValue);

    var imgUploadPreview = document.querySelector(window.enum.SELECTOR.IMG_UPLOAD_PREVIEW);
    window.utils.resetStyle(imgUploadPreview, STYLE_TRANSFORM);
  };

  var resetImgEffect = function () {
    var imgUploadPreview = IMG_UPLOAD_OVERLAY.querySelector(window.enum.SELECTOR.IMG_UPLOAD_PREVIEW);
    if (imgUploadPreview.classList.length > 1) {
      imgUploadPreview.className = CLASS_IMG_UPLOAD_PREVIEW;
    }
  };

  var overlayCloseEscPressHandler = function (evt) {

    if (window.utils.isEscKeyCode(evt.keyCode)
        && !evt.target.classList.contains(CLASS_TEXT_HASHTAGS)
        && !evt.target.classList.contains(CLASS_TEXT_DESCRIPTION)) {

      closeImgOverlay();
    }
  };

  var openImgUploadOverlay = function () {
    window.utils.hideImgUploadScale();
    window.utils.showElement(IMG_UPLOAD_OVERLAY);
    resetImgSizePreview(ORIGINAL_SIZE);
    resetImgEffect();
    document.addEventListener(window.enum.EVENT.KEYDOWN, overlayCloseEscPressHandler);
  };

  var closeImgOverlay = function () {
    window.utils.hideElement(IMG_UPLOAD_OVERLAY);
    window.utils.resetInputTypeFile(window.enum.SELECTOR.IMG_UPLOAD_INPUT);
    document.removeEventListener(window.enum.EVENT.KEYDOWN, overlayCloseEscPressHandler);
  };

  var imgUploadInputChangeHandler = function () {
    openImgUploadOverlay();
  };

  var imgUploadCancelClickHandler = function () {
    closeImgOverlay();
  };

  var inputUploadFile = document.querySelector(window.enum.SELECTOR.IMG_UPLOAD_INPUT);
  inputUploadFile.addEventListener(window.enum.EVENT.CHANGE, imgUploadInputChangeHandler);

  var imgUploadCancel = document.querySelector(window.enum.SELECTOR.IMG_UPLOAD_CANCEL);
  imgUploadCancel.addEventListener(window.enum.EVENT.CLICK, imgUploadCancelClickHandler);
})();

