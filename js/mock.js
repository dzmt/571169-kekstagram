'use strict';

(function () {
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

  window.mock = {
    createUrls: function (quantity) {
      var urls = [];
      for (var i = 1; i <= quantity; i++) {
        var urlPath = 'photos/' + i + '.jpg';
        urls.push(urlPath);
      }
      return urls;
    },

    createRandomLike: function (from, to) {
      var valueOfLikes = from + window.utils.getRandomNumber(to);
      return valueOfLikes;
    },

    createRandomComments: function (seed) {
      var comments = [];
      comments.push(COMMENTS[window.utils.getRandomNumber(COMMENTS.length - 1)]);
      if (window.utils.isEvenNumber(seed)) {
        comments.push(COMMENTS[window.utils.getRandomNumber(COMMENTS.length - 1)]);
      }
      return comments;
    },

    createMockPhotos: function () {
      var photos = [];
      var urls = this.createUrls(QUANTITY);
      for (var i = 0; i < QUANTITY; i++) {
        var itemPhotoDescription = {};
        itemPhotoDescription.url = urls[i];
        itemPhotoDescription.likes = this.createRandomLike(15, 200);
        itemPhotoDescription.comments = this.createRandomComments(i);
        itemPhotoDescription.description = DESCRIPTIONS[window.utils.getRandomNumber(DESCRIPTIONS.length - 1)];
        photos.push(itemPhotoDescription);
      }
      return photos;
    }
  };

})();
