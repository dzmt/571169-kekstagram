'use strict';

(function () {
  var SELECTOR_FORM = '#upload-select-image';

  var FORM = document.querySelector(SELECTOR_FORM);

  var onLoad = function () {
    window.upload.close();
  };

  var onError = function (message) {
    window.error.render(message, document.body);
  };

  var getFormData = function (form) {
    var formData = new FormData(form);
    return formData;
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    var formData = getFormData(evt.target);
    window.backend.save(formData, onLoad, onError);
  };

  window.form = {
    addEventListener: function () {
      FORM.addEventListener(window.enum.EVENT.SUBMIT, formSubmitHandler);
    },

    removeEventListener: function () {
      FORM.removeEventListener(window.enum.EVENT.SUBMIT, formSubmitHandler);
    }
  };
})();
