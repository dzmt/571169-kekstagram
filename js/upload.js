'use strict';

(function () {
  var utils = window.utils;

  var CLASS_TEXT_HASHTAGS = 'text__hashtags';
  var CLASS_TEXT_DESCRIPTION = 'text__description';

  var STYLE_TRANSFORM = 'transform';

  var PROPERTY_VALUE = 'value';

  var ORIGINAL_SIZE = '100%';

  var SELECTOR_IMG_UPLOAD_OVERLAY = '.img-upload__overlay';
  var SELECTOR_IMG_UPLOAD_PREVIEW = '.img-upload__preview';
  var SELECTOR_RESIZE_CONTROL_VALUE = '.resize__control--value';
  var SELECTOR_IMG_UPLOAD_INPUT = '.img-upload__input';
  var SELECTOR_IMG_UPLOAD_CANCEL = '.img-upload__cancel';


  var IMG_UPLOAD_OVERLAY = document.querySelector(SELECTOR_IMG_UPLOAD_OVERLAY);
  var IMG_UPLOAD_PREVIEW = IMG_UPLOAD_OVERLAY.querySelector(SELECTOR_IMG_UPLOAD_PREVIEW);

  var resetImgSizePreview = function (originalValue) {
    var controlValue = document.querySelector(SELECTOR_RESIZE_CONTROL_VALUE);
    utils.setElementProperty(controlValue, PROPERTY_VALUE, originalValue);
    utils.resetStyle(IMG_UPLOAD_PREVIEW, STYLE_TRANSFORM);
  };

  var setInitialUploadUIState = function () {
    utils.hideImgUploadScale();
    utils.showElement(IMG_UPLOAD_OVERLAY);
    resetImgSizePreview(ORIGINAL_SIZE);
    utils.resetPreviousEffect(IMG_UPLOAD_PREVIEW);
    window.togglers.reset();
  };

  var overlayCloseEscPressHandler = function (evt) {

    if (utils.isEscKeyCode(evt.keyCode)
        && !evt.target.classList.contains(CLASS_TEXT_HASHTAGS)
        && !evt.target.classList.contains(CLASS_TEXT_DESCRIPTION)) {

      closeImgOverlay();
    }
  };

  var openImgUploadOverlay = function () {
    setInitialUploadUIState();
    document.addEventListener(window.enum.EVENT.KEYDOWN, overlayCloseEscPressHandler);
  };

  var closeImgOverlay = function () {
    utils.hideElement(IMG_UPLOAD_OVERLAY);
    utils.resetInputTypeFile(SELECTOR_IMG_UPLOAD_INPUT);
    document.removeEventListener(window.enum.EVENT.KEYDOWN, overlayCloseEscPressHandler);
  };

  var imgUploadInputChangeHandler = function () {
    openImgUploadOverlay();
  };

  var imgUploadCancelClickHandler = function () {
    closeImgOverlay();
  };

  var inputUploadFile = document.querySelector(SELECTOR_IMG_UPLOAD_INPUT);
  inputUploadFile.addEventListener(window.enum.EVENT.CHANGE, imgUploadInputChangeHandler);

  var imgUploadCancel = document.querySelector(SELECTOR_IMG_UPLOAD_CANCEL);
  imgUploadCancel.addEventListener(window.enum.EVENT.CLICK, imgUploadCancelClickHandler);


  window.upload = {
    close: function () {
      closeImgOverlay();
    }
  };

})();

