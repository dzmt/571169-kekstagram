'use strict';

(function () {
  var SELECTOR_PICTURE_IMG = '.picture__img';
  var SELECTOR_PICTURE_STAT_LIKES = '.picture__stat--likes';
  var SELECTOR_PICTURE_STAT_COMMENTS = '.picture__stat--comments';
  var SELECTOR_PICTURE_LINK = '.picture__link';

  var clone = function (documentFragment) {
    var cloneDocumentFragment = documentFragment.cloneNode(true);
    return cloneDocumentFragment;
  };

  var addEventListener = function (img, link, photo) {
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

    addEventListener(img, link, photo);
  };

  window.fragment = {
    getFromTemplateTag: function (templateSelector) {
      return document.querySelector(templateSelector).content;
    },

    createListWithData: function (documentFragmentTemplate, photos) {
      var documentFragments = [];
      for (var i = 0; i < photos.length; i++) {
        var cloneDocumentFragment = clone(documentFragmentTemplate);
        fillData(cloneDocumentFragment, photos[i]);
        documentFragments.push(cloneDocumentFragment);
      }
      return documentFragments;
    },

    addToElement: function (element, documentFragments) {
      for (var i = 0; i < documentFragments.length; i++) {
        element.appendChild(documentFragments[i]);
      }
    }
  };
})();
