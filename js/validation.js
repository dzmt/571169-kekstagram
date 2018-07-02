'use strict';

(function () {
  // image upload validation form
  var HASHTAG_QUANTITY = 5;
  var HASHTAG_LENGTH = 20;

  var CHAR_HASHTAG = '#';

  var ERROR_STYLE = '3px solid red';
  var ERROR_CSS_PROPERTY = 'border';

  var ERROR_MESSAGE = {
    beginWithHashtag: 'Хэштег должен начинатся с решетки.',
    notAnoughlength: 'Хэштег не может состоять только из одной решетки.',
    divideHashtagBySpace: 'Хэштеги должны разделяться пробелами.',
    repeatHashtag: 'Хэштеги не должны повторятся (регистр символов не учитывается).',
    maxHashtagQuantity: 'Нельзя указать больше 5 хэштегов',
    maxHashtagLength: 'Максимальная длина хэштега 20 символов включая решетку'
  };

  var isBeginWithHashtag = function (hashtag) {
    return hashtag.charAt(0) === CHAR_HASHTAG ? true : false;
  };

  var isTooShortHashtag = function (hashtag) {
    return hashtag.length === 1;
  };

  var isContainHashtagInside = function (hashtag) {
    return hashtag.substr(1).includes(CHAR_HASHTAG);
  };

  var isRepeatHashtag = function (hashtag, firstIndex, hashtags) {
    var lastIndexHashtag = hashtags.lastIndexOf(hashtag);
    return lastIndexHashtag === firstIndex ? false : true;
  };

  var isTooLongHashtagQuantity = function (hashtags, quantity) {
    return hashtags.length > quantity ? true : false;
  };

  var isTooLongHashtagLenght = function (hashtag, length) {
    return hashtag.length > length ? true : false;
  };

  var checkInputHashtag = function (inputHashtag) {
    var hashtags = inputHashtag.value.toLowerCase().split(' ');
    var message = '';
    if (inputHashtag.value) {
      for (var k = 0; k < hashtags.length; k++) {
        var hashtag = hashtags[k];
        if (!isBeginWithHashtag(hashtag)) {
          message = ERROR_MESSAGE.beginWithHashtag;
          break;
        } else if (isTooShortHashtag(hashtag)) {
          message = ERROR_MESSAGE.notAnoughlength;
          break;
        } else if (isContainHashtagInside(hashtag)) {
          message = ERROR_MESSAGE.divideHashtagBySpace;
          break;
        } else if (isRepeatHashtag(hashtag, k, hashtags)) {
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
    input.setCustomValidity('');
  };

  var inputHashtagInputHandler = function (evt) {
    resetValidationMessage(evt.target);
    window.utils.resetStyle(evt.target, ERROR_CSS_PROPERTY);
  };

  var inputHashtagChangeHandler = function (evt) {
    var inputHashtag = evt.target;
    checkInputHashtag(inputHashtag);
    inputHashtag.addEventListener(window.enum.EVENT.INPUT, inputHashtagInputHandler);
  };

  var inputHashtagInvalidHandler = function (evt) {
    window.utils.setStyle(evt.target, ERROR_CSS_PROPERTY, ERROR_STYLE);
  };

  var hashtagInput = document.querySelector(window.enum.SELECTOR.TEXT_HASHTAGS);
  hashtagInput.addEventListener(window.enum.EVENT.CHANGE, inputHashtagChangeHandler);
  hashtagInput.addEventListener(window.enum.EVENT.INVALID, inputHashtagInvalidHandler);

})();
