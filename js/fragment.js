'use strict';

(function () {
  var SELECTOR_PICTURE_IMG = '.picture__img';
  var SELECTOR_PICTURE_STAT_LIKES = '.picture__stat--likes';
  var SELECTOR_PICTURE_STAT_COMMENTS = '.picture__stat--comments';
  var SELECTOR_PICTURE_LINK = '.picture__link';

  var addEventListenerToPane = function (img, link, photo) {
    var openClickHandler = window.picture.getOpenClickHadler(photo);
    var openEnterPressHandler = window.picture.getOpenEnterPressHandler(photo);

    img.addEventListener(window.enum.EVENT.CLICK, openClickHandler);
    link.addEventListener(window.enum.EVENT.KEYDOWN, openEnterPressHandler);
  };

  var fillData = function (documentFragment, photo) {
    var img = documentFragment.querySelector(SELECTOR_PICTURE_IMG);
    img.src = photo.url;

    var likes = documentFragment.querySelector(SELECTOR_PICTURE_STAT_LIKES);
    likes.textContent = photo.likes;

    var comments = documentFragment.querySelector(SELECTOR_PICTURE_STAT_COMMENTS);
    comments.textContent = photo.comments.length;

    var link = documentFragment.querySelector(SELECTOR_PICTURE_LINK);

    addEventListenerToPane(img, link, photo);
  };

  window.fragment = {
    getFromTemplateTag: function (templateSelector) {
      return document.querySelector(templateSelector).content;
    },

    createListWithData: function (documentFragmentTemplate, photos) {
      var documentFragments = [];
      photos.forEach(function (photo) {
        var cloneDocumentFragment = documentFragmentTemplate.cloneNode(true);
        fillData(cloneDocumentFragment, photo);
        documentFragments.push(cloneDocumentFragment);
      });
      return documentFragments;
    },

    addToElement: function (element, documentFragments) {
      documentFragments.forEach(function (fragment) {
        element.appendChild(fragment);
      });
    }
  };
})();
