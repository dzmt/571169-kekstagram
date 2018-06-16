'use strict';

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
  bigPicture.querySelector('.big-picture__img').src = photoDescription.url;
  bigPicture.querySelector('.likes-count').textContent = photoDescription.likes;
  bigPicture.querySelector('.comments-count').textContent = photoDescription.comments.length;

  var socialCommentsList = bigPicture.querySelector('.social__comments');
  var socialComments = createElementsOfSocialComments(createEmptySocialCommentItem('.social__comment'), photoDescription);
  removeChildFromElement(socialCommentsList);
  socialCommentsList.appendChild(fillDocFragment(socialComments));
};

var photoDescriptions = createMockPhotoDesc(QUANTITY);
addFragmentsToElement(photoDescriptions, '.pictures');
fillElementsBigPicture(photoDescriptions[0]);
removeClass('.big-picture', 'hidden');
// console.log(document.querySelector('.big-picture'));
addClass('.social__comment-count', 'visually-hidden');
addClass('.social__loadmore', 'visually-hidden');
