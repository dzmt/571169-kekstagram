'use strict';

(function () {
  var SELECTOR_TEMPLATE_TAG = '#picture';
  var SELECTOR_PICTURES_CONTAINER = '.pictures';
  var SELECTOR_FILTERS = '.img-filters';

  var CLASS_INNACTIVE_FILTERS = 'img-filters--inactive';

  var INIT_COUNT_ELEMENT = 2;

  var fragment = window.fragment;

  var removeChildren = function (element, from) {
    var length = element.children.length - from;
    for (var i = length - 1; i > 1; i--) {
      var target = element.children[i];
      element.removeChild(target);
    }
  };

  var renderGallery = function (data) {
    var dfTemplate = fragment.getFromTemplateTag(SELECTOR_TEMPLATE_TAG);
    var fragmentList = fragment.createListWithData(dfTemplate, data);
    var picContainer = document.querySelector(SELECTOR_PICTURES_CONTAINER);

    if (picContainer.children.length > INIT_COUNT_ELEMENT) {
      removeChildren(picContainer, INIT_COUNT_ELEMENT);
    }
    fragment.addToElement(picContainer, fragmentList);
  };

  var onLoad = function (data) {
    renderGallery(data);
    window.utils.removeClass(SELECTOR_FILTERS, CLASS_INNACTIVE_FILTERS);
    window.data = data;
  };

  var onError = function (message) {
    window.error.render(message, document.body);
  };

  window.backend.load(onLoad, onError);

  window.gallery = {
    render: function (photos) {
      renderGallery(photos);
    }
  };
})();
