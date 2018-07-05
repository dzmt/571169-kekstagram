'use strict';

(function () {
  var utils = window.utils;

  var QUANTITY = 25;

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

  var IMG_BEGIN_URL = 'photos/';
  var IMG_END_URL = '.jpg';

  var createUrls = function (quantity) {
    var urls = [];
    for (var i = 1; i <= quantity; i++) {
      var urlPath = IMG_BEGIN_URL + i + IMG_END_URL;
      urls.push(urlPath);
    }
    return urls;
  };

  var createRandomLike = function (from, to) {
    var valueOfLikes = from + utils.getRandomNumber(to);
    return valueOfLikes;
  };

  var createRandomComments = function (seed) {
    var comments = [];
    comments.push(COMMENTS[utils.getRandomNumber(COMMENTS.length)]);
    if (utils.isEvenNumber(seed)) {
      comments.push(COMMENTS[utils.getRandomNumber(COMMENTS.length)]);
    }
    return comments;
  };

  window.mock = {
    createMockPhotos: function () {
      var photos = [];
      var urls = createUrls(QUANTITY);
      for (var i = 0; i < QUANTITY; i++) {
        var itemPhotoDescription = {};
        itemPhotoDescription.url = urls[i];
        itemPhotoDescription.likes = createRandomLike(15, 200);
        itemPhotoDescription.comments = createRandomComments(i);
        itemPhotoDescription.description = DESCRIPTIONS[utils.getRandomNumber(DESCRIPTIONS.length)];
        photos.push(itemPhotoDescription);
      }
      return photos;
    }
  };

})();
