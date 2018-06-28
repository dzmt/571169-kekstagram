'use strict';

var EVENT = {
  CHANGE: 'change',
  CLICK: 'click',
  INPUT: 'input',
  INVALID: 'invalid',
  KEYDOWN: 'keydown',
  MOUSEUP: 'mouseup'
};

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья.\nНе обижайте всех словами......',
  'Вот это тачка!'
];

var QUANTITY = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var CLASS_NAME_TEXT_HASHTAGS = 'text__hashtags';
var CLASS_NAME_TEXT_DESCRIPTION = 'text__description';

var getRandomNumber = function (toNumberExcluding) {
  var randomValue = Math.floor(Math.random() * toNumberExcluding);
  return randomValue;
};

var isEvenNumber = function (number) {
  return (number % 2 === 0) ? true : false;
};

var addClass = function (selector, targetClassName) {
  var element = document.querySelector(selector);
  element.classList.add(targetClassName);
};

var removeClass = function (selector, targetClassName) {
  var element = document.querySelector(selector);
  element.classList.remove(targetClassName);
};

var removeChildFromElement = function (element) {
  var children = [];
  for (var i = 0; i < element.children.length; i++) {
    children.push(element.children[i]);
  }
  for (var j = 0; j < children.length; j++) {
    element.removeChild(children[j]);
  }
};

var createUrls = function (quantity) {
  var urls = [];
  for (var i = 1; i <= quantity; i++) {
    var urlPath = 'photos/' + i + '.jpg';
    urls.push(urlPath);
  }
  return urls;
};

var createRandomLike = function (from, to) {
  var valueOfLikes = from + getRandomNumber(to + 1);
  return valueOfLikes;
};

var createRandomComment = function (anyNumber) {
  var comments = [];
  comments.push(COMMENTS[getRandomNumber(COMMENTS.length)]);
  if (isEvenNumber(anyNumber)) {
    comments.push(COMMENTS[getRandomNumber(COMMENTS.length)]);
  }
  return comments;
};

var createMockPhotoDesc = function (quantity) {
  var photoDescriptions = [];
  var urls = createUrls(quantity);
  for (var i = 0; i < quantity; i++) {
    var itemPhotoDescription = {};
    itemPhotoDescription.url = urls[i];
    itemPhotoDescription.likes = createRandomLike(15, 200);
    itemPhotoDescription.comments = createRandomComment(i);
    itemPhotoDescription.description = DESCRIPTIONS[getRandomNumber(DESCRIPTIONS.length)];
    photoDescriptions.push(itemPhotoDescription);
  }
  return photoDescriptions;
};

var fillDocFragment = function (elements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(elements[i]);
  }
  return fragment;
};

var getDFFromTemplate = function (templateSelector) {
  return document.querySelector(templateSelector).content;
};

var getElement = function (from, selector) {
  return from.querySelector(selector);
};

var fillFragmentPhotoData = function (documentFragment, fotoDescription) {
  var cloneDocumentFragment = documentFragment.cloneNode(true);

  var img = getElement(cloneDocumentFragment, '.picture__img');
  img.src = fotoDescription.url;

  var likes = getElement(cloneDocumentFragment, '.picture__stat--likes');
  likes.textContent = fotoDescription.likes;

  var comments = getElement(cloneDocumentFragment, '.picture__stat--comments');
  comments.textContent = fotoDescription.comments;

  return cloneDocumentFragment;
};

var addFragmentsToElement = function (photoDescriptions, selector) {
  var element = document.querySelector(selector);

  for (var i = 0; i < photoDescriptions.length; i++) {
    var filledFragment = fillFragmentPhotoData(getDFFromTemplate('#picture'), photoDescriptions[i]);
    element.appendChild(filledFragment);
  }
};

var createEmptySocialCommentItem = function (selector) {
  var commentItem = document.querySelector(selector);
  return commentItem.cloneNode(true);
};

var createElementsOfSocialComments = function (emptySocialCommentElement, photoDesc) {
  var socialComments = [];
  for (var i = 0; i < photoDesc.comments.length; i++) {
    var socialCommentElement = emptySocialCommentElement.cloneNode(true);

    var socialPicture = socialCommentElement.querySelector('.social__picture');
    var avatarIndex = 1 + getRandomNumber(6);
    socialPicture.src = 'img/avatar-' + avatarIndex + '.svg';

    var commentText = socialCommentElement.querySelector('.social__text');
    commentText.textContent = photoDesc.comments[i];

    socialComments.push(socialCommentElement);
  }
  return socialComments;
};

var fillElementsBigPicture = function (photoDescription) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.big-picture__img img').src = photoDescription.url;
  bigPicture.querySelector('.likes-count').textContent = photoDescription.likes;
  bigPicture.querySelector('.comments-count').textContent = photoDescription.comments.length;

  var socialCommentsList = bigPicture.querySelector('.social__comments');
  var socialCaption = bigPicture.querySelector('.social__caption');
  socialCaption.textContent = photoDescription.description;
  var socialComments = createElementsOfSocialComments(createEmptySocialCommentItem('.social__comment'), photoDescription);
  removeChildFromElement(socialCommentsList);
  socialCommentsList.appendChild(fillDocFragment(socialComments));
};

var photoDescriptions = createMockPhotoDesc(QUANTITY);
addFragmentsToElement(photoDescriptions, '.pictures');
addClass('.social__comment-count', 'visually-hidden');
addClass('.social__loadmore', 'visually-hidden');

// opening and closing image overlay
var resetImgSizePreview = function () {
  var controlValue = document.querySelector('.resize__control--value');
  controlValue.value = '100%';
  var imgPreview = document.querySelector('.img-upload__preview');
  imgPreview.style.transform = '';
};

var overlayCloseEscPressHandler = function (evt) {
  var className = evt.target.className;
  if (evt.keyCode === ESC_KEYCODE && (className !== CLASS_NAME_TEXT_HASHTAGS) && (className !== CLASS_NAME_TEXT_DESCRIPTION)) {
    closeImgOverlay();
  }
};

var openImgUploadOverlay = function () {
  removeClass('.img-upload__overlay', 'hidden');
  document.addEventListener(EVENT.KEYDOWN, overlayCloseEscPressHandler);
  resetImgSizePreview();
};

var closeImgOverlay = function () {
  addClass('.img-upload__overlay', 'hidden');
  var inputUploadFile = getElement(document, '.img-upload__input');
  inputUploadFile.value = '';
  document.removeEventListener(EVENT.KEYDOWN, overlayCloseEscPressHandler);
};

var imgUploadInputChangeHandler = function () {
  openImgUploadOverlay();
};

var imgUploadCancelClickHandler = function () {
  closeImgOverlay();
};

var inputUploadFile = getElement(document, '.img-upload__input');
inputUploadFile.addEventListener(EVENT.CHANGE, imgUploadInputChangeHandler);

var imgUploadCancel = getElement(document, '.img-upload__cancel');
imgUploadCancel.addEventListener(EVENT.CLICK, imgUploadCancelClickHandler);

// toggling effects
var ID_SELECTOR_RADIO_EFFECTS = [
  '#effect-none',
  '#effect-chrome',
  '#effect-sepia',
  '#effect-marvin',
  '#effect-phobos',
  '#effect-heat'
];

var EFFECT_FUNCTIONS = {
  chrome: function (ratio) {
    return 'grayscale(' + ratio + ')';
  },
  sepia: function (ratio) {
    return 'sepia(' + ratio + ')';
  },
  marvin: function (ratio) {
    var valueOfEffect = ratio * 100;
    return 'invert(' + valueOfEffect + '%)';
  },
  phobos: function (ratio) {
    var valueOfEffect = 3 * ratio;
    return 'blur(' + valueOfEffect + 'px)';
  },
  heat: function (ratio) {
    var valueOfEffect = 1 + 2 * ratio;
    return 'brightness(' + valueOfEffect + ')';
  }
};

var imgUploadPreview = document.querySelector('.img-upload__preview');

var applyEffect = function (classEffect) {
  imgUploadPreview.classList.add(classEffect);
};

var resetEffect = function () {
  imgUploadPreview.style.filter = '';
  if (imgUploadPreview.classList[1]) {
    imgUploadPreview.classList.remove(imgUploadPreview.classList[1]);
  }
};

var hideImgUploadScale = function () {
  var imgUploadScale = getElement(document, '.img-upload__scale');
  if (!imgUploadScale.classList.contains('hidden') || imgUploadPreview.classList.length === 1) {
    addClass('.img-upload__scale', 'hidden');
  }
};

var showImgUploadScale = function () {
  removeClass('.img-upload__scale', 'hidden');
};

var effectsRadioChangeHandler = function (evt) {
  if (evt.target.id === 'effect-none') {
    hideImgUploadScale();
  } else {
    showImgUploadScale();
  }

  // reset previous effect
  resetEffect();

  // add new effect
  var effect = evt.target.id.split('-')[1];
  if (effect !== 'none') {
    var classEffect = 'effects__preview--' + effect;
    applyEffect(classEffect);
  }
};

// add pin click handler
var getRatioScalePinToScaleLine = function () {
  var scalePin = document.querySelector('.scale__pin');
  var scaleLine = document.querySelector('.scale__line');
  var ratio = Math.round((scalePin.offsetLeft / scaleLine.offsetWidth) * 1000) / 1000;
  return ratio;
};

var applyFiltersFromScaleValue = function (ratio) {
  var effectClass = imgUploadPreview.classList[1];
  if (effectClass) {
    var effect = effectClass.split('--')[1];
    var effectFuction = EFFECT_FUNCTIONS[effect](ratio);
    imgUploadPreview.style.filter = effectFuction;
  }
};

var scalePinMouseUpHandler = function () {
  applyFiltersFromScaleValue(getRatioScalePinToScaleLine());
};

var setEventHandlerToEffectTogglers = function () {
  for (var i = 0; i < ID_SELECTOR_RADIO_EFFECTS.length; i++) {
    var radio = document.querySelector(ID_SELECTOR_RADIO_EFFECTS[i]);
    radio.addEventListener(EVENT.CHANGE, effectsRadioChangeHandler);
  }
};

hideImgUploadScale();
setEventHandlerToEffectTogglers();
var scalePin = document.querySelector('.scale__pin');
scalePin.addEventListener(EVENT.MOUSEUP, scalePinMouseUpHandler);

// photo zoom
var ZOOM_STEP = 25;
var MAX_ZOOM = 100;

var setImageScale = function (valueScale) {
  var imgPreview = document.querySelector('.img-upload__preview');
  var ratioValue = valueScale / 100;
  var scaleFunc = 'scale(' + ratioValue + ')';
  imgPreview.style.transform = scaleFunc;
};

var decreaseResizeControlValue = function () {
  var currentSize = Number.parseInt(resizeControlValue.value, 10);
  if (currentSize !== ZOOM_STEP) {
    currentSize -= ZOOM_STEP;
  }
  resizeControlValue.value = currentSize + '%';
  setImageScale(currentSize);
};

var increaseResizeControlPlus = function () {
  var currentSize = Number.parseInt(resizeControlValue.value, 10);
  if (currentSize !== MAX_ZOOM) {
    currentSize += ZOOM_STEP;
  }
  resizeControlValue.value = currentSize + '%';
  setImageScale(currentSize);
};

var resizeControlMinusClickHandler = function () {
  decreaseResizeControlValue();
};

var resizeControlPlusHandler = function () {
  increaseResizeControlPlus();
};

var resizeControlMinus = document.querySelector('.resize__control--minus');
var resizeControlPlus = document.querySelector('.resize__control--plus');
var resizeControlValue = document.querySelector('.resize__control--value');

resizeControlMinus.addEventListener(EVENT.CLICK, resizeControlMinusClickHandler);
resizeControlPlus.addEventListener(EVENT.CLICK, resizeControlPlusHandler);


// add open and close event handler for big picture element
var getImgData = function (imgElement) {
  var imgID = Number.parseInt(imgElement.src.match(/\d+.jpg/)[0].match(/\d+/), 10);
  var imgData = photoDescriptions[imgID - 1];
  return imgData;
};

var pictureImgClickHandler = function (evt) {
  var imgData = getImgData(evt.target);
  openBigPictureOverlay(imgData);
};

var bigPictureCloseEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPictureOverlay();
  }
};
var bigPictureOpenEnterPressHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    var imgElement = evt.target.children[0];
    var imgData = getImgData(imgElement);
    openBigPictureOverlay(imgData);
  }
};

var openBigPictureOverlay = function (fotoDescription) {
  document.addEventListener(EVENT.KEYDOWN, bigPictureCloseEscPressHandler);
  fillElementsBigPicture(fotoDescription);
  removeClass('.big-picture', 'hidden');
};

var closeBigPictureOverlay = function () {
  addClass('.big-picture', 'hidden');
  document.removeEventListener(EVENT.KEYDOWN, bigPictureCloseEscPressHandler);
};

var setEventHandlerToPictureImgs = function () {
  var pictureImgs = document.querySelectorAll('.picture__img');
  for (var k = 0; k < pictureImgs.length; k++) {
    pictureImgs[k].addEventListener(EVENT.CLICK, pictureImgClickHandler);
    pictureImgs[k].parentElement.addEventListener(EVENT.KEYDOWN, bigPictureOpenEnterPressHandler);
  }
};

var bigPictureCancelButton = document.querySelector('.big-picture__cancel');
bigPictureCancelButton.addEventListener(EVENT.CLICK, closeBigPictureOverlay);
setEventHandlerToPictureImgs();


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

// reset validation message for stopping popup error message when correct hashtags
var setStyle = function (element, property, style) {
  element.style[property] = style;
};

var resetStyle = function (element, property) {
  element.style[property] = '';
};

var resetValidationMessage = function (input) {
  input.setCustomValidity('');
};

var inputHashtagInputHandler = function (evt) {
  resetValidationMessage(evt.target);
  resetStyle(evt.target, ERROR_CSS_PROPERTY);
};

var inputHashtagChangeHandler = function (evt) {
  var inputHashtag = evt.target;
  checkInputHashtag(inputHashtag);
  inputHashtag.addEventListener(EVENT.INPUT, inputHashtagInputHandler);
};

var inputHashtagInvalidHandler = function (evt) {
  setStyle(evt.target, ERROR_CSS_PROPERTY, ERROR_STYLE);
};

var hashtagInput = document.querySelector('.text__hashtags');
hashtagInput.addEventListener(EVENT.CHANGE, inputHashtagChangeHandler);
hashtagInput.addEventListener(EVENT.INVALID, inputHashtagInvalidHandler);
