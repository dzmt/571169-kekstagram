'use strict';

(function () {
  var SELECTOR_TEMPLATE_TAG = '#picture';
  var SELECTOR_PICTURES_CONTAINER = '.pictures';

  var fragment = window.fragment;

  var renderGallery = function (data) {
    var dfTemplate = fragment.getFromTemplateTag(SELECTOR_TEMPLATE_TAG);

    var fragmentList = fragment.createListWithData(dfTemplate, data);
    var picturesContainer = document.querySelector(SELECTOR_PICTURES_CONTAINER);

    fragment.addToElement(picturesContainer, fragmentList);
  };

  var onLoad = function (data) {
    renderGallery(data);
    window.data = data;
  };

  var onError = function (message) {
    window.error.render(message);
  };

  window.backend.load(onLoad, onError);
})();
