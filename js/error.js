'use strict';

(function () {
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

  var ADVISE_MESSAGE = ' Please, try again.';

  var TAG_NAME_DIV = 'div';

  var utils = window.utils;

  var setErrorStyle = function (element, styles) {
    for (var property in styles) {
      if (styles.hasOwnProperty(property)) {
        utils.setStyle(element, property, styles[property]);
      }
    }
  };

  var setTextContent = function (element, text) {
    element.textContent = text + ADVISE_MESSAGE;
  };

  window.error = {
    render: function (message, targetElement) {
      var error = document.createElement(TAG_NAME_DIV);
      setTextContent(error, message);
      setErrorStyle(error, ERROR_STYLE);
      targetElement.appendChild(error);
    }
  };
})();
