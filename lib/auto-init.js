var $ = require('jquery');
var Modal = require('./modal');

$(function () {
  $('.ui.modal.auto-init').each(function (i, element) {
    new Modal(element);
  });
});
