'use strict';

(function () {
  var HASHTAG_QUANTITY = 5;
  var HASHTAG_LENGTH = 20;
  var HASHTAG_INDEX = 0;
  var ONE_CHAR_LENGTH = 1;
  var HASHTAG_INDEX_START_TEXT = 1;


  var CHAR_SPLIT_HASHTAG = ' ';
  var CHAR_HASHTAG = '#';

  var ERROR_STYLE = '3px solid red';
  var ERROR_CSS_PROPERTY = 'border';
  var INIT_CUSTOM_VALIDITY_MESSAGE = '';

  var SELECTOR_TEXT_HASHTAGS = '.text__hashtags';

  var ERROR_MESSAGE = {
    beginWithHashtag: 'Хэштег должен начинатся с решетки.',
    notAnoughlength: 'Хэштег не может состоять только из одной решетки.',
    divideHashtagBySpace: 'Хэштеги должны разделяться пробелами.',
    repeatHashtag: 'Хэштеги не должны повторятся (регистр символов не учитывается).',
    maxHashtagQuantity: 'Укажите не более 5 хэштегов',
    maxHashtagLength: 'Максимальная длина хэштега 20 символов включая решетку'
  };

  var EVENT = window.enum.EVENT;

  var INPUT_HASHTAG = document.querySelector(SELECTOR_TEXT_HASHTAGS);

  var utils = window.utils;

  var isBeginWithHashtag = function (hashtag) {
    return hashtag.charAt(HASHTAG_INDEX) === CHAR_HASHTAG;
  };

  var isTooShortHashtag = function (hashtag) {
    return hashtag.length === ONE_CHAR_LENGTH;
  };

  var isContainHashtagInside = function (hashtag) {
    return hashtag.substr(HASHTAG_INDEX_START_TEXT).includes(CHAR_HASHTAG);
  };

  var isRepeatHashtag = function (hashtag, firstIndex, hashtags) {
    var lastIndexHashtag = hashtags.lastIndexOf(hashtag);
    return lastIndexHashtag !== firstIndex;
  };

  var isTooLongHashtagQuantity = function (hashtags, quantity) {
    return hashtags.length > quantity;
  };

  var isTooLongHashtagLenght = function (hashtag, length) {
    return hashtag.length > length;
  };

  var checkInputHashtag = function (inputHashtag) {
    var hashtags = inputHashtag.value.toLowerCase().split(CHAR_SPLIT_HASHTAG);
    var message = INIT_CUSTOM_VALIDITY_MESSAGE;
    if (inputHashtag.value) {
      for (var i = 0; i < hashtags.length; i++) {
        var hashtag = hashtags[i];
        if (!isBeginWithHashtag(hashtag)) {
          message = ERROR_MESSAGE.beginWithHashtag;
          break;
        } else if (isTooShortHashtag(hashtag)) {
          message = ERROR_MESSAGE.notAnoughlength;
          break;
        } else if (isContainHashtagInside(hashtag)) {
          message = ERROR_MESSAGE.divideHashtagBySpace;
          break;
        } else if (isRepeatHashtag(hashtag, i, hashtags)) {
          message = ERROR_MESSAGE.repeatHashtag;
          break;
        } else if (isTooLongHashtagQuantity(hashtags, HASHTAG_QUANTITY)) {
          message = ERROR_MESSAGE.maxHashtagQuantity;
          break;
        } else if (isTooLongHashtagLenght(hashtag, HASHTAG_LENGTH)) {
          message = ERROR_MESSAGE.maxHashtagLength;
          break;
        }
      }
    }
    inputHashtag.setCustomValidity(message);
  };

  var resetValidationMessage = function (input) {
    input.setCustomValidity(INIT_CUSTOM_VALIDITY_MESSAGE);
  };

  var inputHashtagInputHandler = function (evt) {
    resetValidationMessage(evt.target);
    utils.resetStyle(evt.target, ERROR_CSS_PROPERTY);
  };

  var inputHashtagChangeHandler = function (evt) {
    var inputHashtag = evt.target;
    checkInputHashtag(inputHashtag);
    inputHashtag.addEventListener(EVENT.INPUT, inputHashtagInputHandler);
  };

  var inputHashtagInvalidHandler = function (evt) {
    utils.setStyle(evt.target, ERROR_CSS_PROPERTY, ERROR_STYLE);
  };

  var addHashtagsEventListener = function () {
    INPUT_HASHTAG.addEventListener(EVENT.CHANGE, inputHashtagChangeHandler);
    INPUT_HASHTAG.addEventListener(EVENT.INVALID, inputHashtagInvalidHandler);
  };

  var removeHashtagsEventListener = function () {
    INPUT_HASHTAG.removeEventListener(EVENT.INPUT, inputHashtagInputHandler);
    INPUT_HASHTAG.removeEventListener(EVENT.CHANGE, inputHashtagChangeHandler);
    INPUT_HASHTAG.removeEventListener(EVENT.INVALID, inputHashtagInvalidHandler);
  };

  window.validation = {
    addEventListener: function () {
      addHashtagsEventListener();
    },

    removeEventListener: function () {
      removeHashtagsEventListener();
    }
  };
})();
