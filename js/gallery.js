'use strict';

(function () {
  var SELECTOR_TEMPLATE_TAG = '#picture';
  var SELECTOR_PICTURES_CONTAINER = '.pictures';

  var fragment = window.fragment;

  var dfTemplate = fragment.getFromTemplateTag(SELECTOR_TEMPLATE_TAG);

  var fragmentList = fragment.createListWithData(dfTemplate, window.data);
  var picturesContainer = document.querySelector(SELECTOR_PICTURES_CONTAINER);

  fragment.addToElement(picturesContainer, fragmentList);
})();
