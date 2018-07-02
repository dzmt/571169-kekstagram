'use strict';

(function () {
  var SELECTOR_PICTURE_IMG = '.picture__img';
  var SELECTOR_PICTURE_STAT_LIKES = '.picture__stat--likes';
  var SELECTOR_PICTURE_STAT_COMMENTS = '.picture__stat--comments';
  var SELECTOR_PICTURE_LINK = '.picture__link';

  window.fragment = {
    createWithElements: function (elements) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < elements.length; i++) {
        fragment.appendChild(elements[i]);
      }
      return fragment;
    },

    getFromTemplateTag: function (templateSelector) {
      return document.querySelector(templateSelector).content;
    },

    clone: function (documentFragment) {
      var cloneDocumentFragment = documentFragment.cloneNode(true);
      return cloneDocumentFragment;
    },

    addEventListener: function (img, link, photo) {
      var openClickHandler = window.picture.getOpenClickHadler(photo);
      var openEnterPressHandler = window.picture.getOpenEnterPressHandler(photo);

      img.addEventListener(window.enum.EVENT.CLICK, openClickHandler);
      link.addEventListener(window.enum.EVENT.KEYDOWN, openEnterPressHandler);
    },

    fillData: function (documentFragment, photo) {
      var img = documentFragment.querySelector(SELECTOR_PICTURE_IMG);
      img.src = photo.url;

      var likes = documentFragment.querySelector(SELECTOR_PICTURE_STAT_LIKES);
      likes.textContent = photo.likes;

      var comments = documentFragment.querySelector(SELECTOR_PICTURE_STAT_COMMENTS);
      comments.textContent = photo.comments.length;

      var link = documentFragment.querySelector(SELECTOR_PICTURE_LINK);

      this.addEventListener(img, link, photo);
    },

    createListWithData: function (documentFragmentTemplate, photos) {
      var documentFragments = [];
      for (var i = 0; i < photos.length; i++) {
        var cloneDocumentFragment = this.clone(documentFragmentTemplate);
        this.fillData(cloneDocumentFragment, photos[i]);
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
