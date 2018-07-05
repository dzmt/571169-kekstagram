'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';

  var METHOD_GET = 'GET';
  var METHOD_POST = 'POST';

  var EVENT_LOAD = 'load';
  var EVENT_ERROR = 'error';
  var EVENT_TIMEOUT = 'timeout';

  var TIMEOUT = 10000;

  var RESPONSE_TYPE = 'json';

  var STATUS_200 = 200;

  var ERROR_MESSAGE_CONNECTION = 'Connection error.';
  var ERROR_MESSAGE_TIMEOUT = 'Loading timeout: ';
  var ERROR_MESSAGE_RESPONCE_STATUS = 'Response status: ';


  window.backend = {
    load: function (onLoad, onError) {

      var xhr = new XMLHttpRequest();

      xhr.open(METHOD_GET, URL_LOAD);
      xhr.responseType = RESPONSE_TYPE;
      xhr.timeout = TIMEOUT;

      xhr.addEventListener(EVENT_LOAD, function () {
        if (xhr.status === STATUS_200) {
          onLoad(xhr.response);
        } else {
          var errorMessage = ERROR_MESSAGE_RESPONCE_STATUS + xhr.status;
          if (!xhr.statusText) {
            errorMessage += ' ' + xhr.statusText + '.';
          }
          onError(errorMessage);
        }
      });
      xhr.addEventListener(EVENT_ERROR, function () {
        onError(ERROR_MESSAGE_CONNECTION);
      });
      xhr.addEventListener(EVENT_TIMEOUT, function () {
        var errorMessage = ERROR_MESSAGE_TIMEOUT + TIMEOUT / 1000 + 's.';
        onError(errorMessage);
      });

      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.open(METHOD_POST, URL_SAVE);

      xhr.addEventListener(EVENT_LOAD, function () {
        if (xhr.status === STATUS_200) {
          onLoad();
        } else {
          var errorMessage = ERROR_MESSAGE_RESPONCE_STATUS + xhr.status;
          if (!xhr.statusText) {
            errorMessage += ' ' + xhr.statusText + '.';
          }
          onError(errorMessage);
        }
      });
      xhr.addEventListener(EVENT_ERROR, function () {
        onError(ERROR_MESSAGE_CONNECTION);
      });
      xhr.addEventListener(EVENT_TIMEOUT, function () {
        var errorMessage = ERROR_MESSAGE_TIMEOUT + TIMEOUT / 1000 + 's.';
        onError(errorMessage);
      });

      xhr.send(data);
    }
  };
})();
