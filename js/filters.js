'use strict';

(function () {
  var SELECTOR_FILTER_BUTTON = '.img-filters__button';

  var ACTIVE_CLASS = 'img-filters__button--active';

  var SORT_FUNC_FROM_ID = {
    'filter-popular': function (data) {
      return data;
    },

    'filter-new': function () {
      var newestPhotos = window.utils.getShuffledArray(window.data);
      return newestPhotos.slice(0, 10);
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

  var render = window.debounce(window.gallery.render);

  var toggleClassBetweenElements = function (target, activeClass) {
    if (!target.classList.contains(activeClass)) {
      var currentActiveElement = document.querySelector('.' + activeClass);
      currentActiveElement.classList.toggle(activeClass);
      target.classList.toggle(activeClass);
    }
  };

  var buttonClickHandler = function (evt) {
    var sortData = SORT_FUNC_FROM_ID[evt.target.id](window.data);
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
