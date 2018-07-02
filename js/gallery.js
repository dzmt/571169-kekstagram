'use strict';

(function () {
  var dfTemplate = window.fragment.getFromTemplateTag(window.enum.SELECTOR.HASHTAG_PICTURE);

  var fragmentList = window.fragment.createListWithData(dfTemplate, window.data);
  var picturesContainer = document.querySelector(window.enum.SELECTOR.PICTURES);

  window.fragment.addToElement(picturesContainer, fragmentList);
})();
