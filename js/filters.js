'use strict';

(function () {
  var SELECTOR_FILTER_BUTTON = '.img-filters__button';

  var ACTIVE_CLASS = 'img-filters__button--active';

  var SORT_FUNC_FROM_ID = {
    'filter-popular': function (data) {
      return data;
    },

    'filter-new': function () {
      var newestPhotos = window.data.slice().reverse();
      return newestPhotos;
    },

    'filter-discussed': function () {
      var popPhotos = window.data.slice().sort(function (left, right) {
        var marker = right.comments.length - left.comments.length;
        if (marker === 0) {
          marker = right.likes - left.likes;
          return marker;
        }
        return marker;
      });
      return popPhotos;
    }
  };

  var EVENT = window.enum.EVENT;

  var gallery = window.gallery;

  var toggleClassBetweenElements = function (target, activeClass) {
    var currentActiveElement = document.querySelector('.' + activeClass);
    currentActiveElement.classList.toggle(activeClass);
    target.classList.toggle(activeClass);
  };

  var buttonClickHandler = function (evt) {
    var sortData = SORT_FUNC_FROM_ID[evt.target.id](window.data);
    var render = window.debounce(gallery.render, sortData);
    render(sortData);
    toggleClassBetweenElements(evt.target, ACTIVE_CLASS);
  };

  var addFilterHandlers = function (buttons) {
    buttons.forEach(function (button) {
      button.addEventListener(EVENT.CLICK, buttonClickHandler);
    });
  };

  addFilterHandlers(document.querySelectorAll(SELECTOR_FILTER_BUTTON));
})();
