'use strict';

(function () {
  var utils = window.utils;

  var ERROR_STYLE = {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
    padding: '20px',
    backgroundColor: '#FFFFFF',
    boxShadow: '-2px 2px 10px black',
    fontFamily: 'monospace',
    fontSize: '20px',
    color: 'red',
    whiteSpce: 'nowrap'
  };

  var REFRESH_PAGE = ' Please, try again.';

  var TAG_NAME_DIV = 'div';

  var createElement = function (tagNameElement) {
    var element = document.createElement(tagNameElement);
    return element;
  };

  var setErrorStyle = function (element, style) {
    for (var property in style) {
      if (style.hasOwnProperty(property)) {
        utils.setStyle(element, property, style[property]);
      }
    }
  };

  var setTextContent = function (element, text) {
    element.textContent = text + REFRESH_PAGE;
  };

  window.error = {
    render: function (message) {
      var error = createElement(TAG_NAME_DIV);
      setTextContent(error, message);
      setErrorStyle(error, ERROR_STYLE);
      document.body.appendChild(error);
    }
  };
})();
