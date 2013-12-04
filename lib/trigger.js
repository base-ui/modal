var eventy = require('eventy');
var $ = require('jquery');
var trigger = eventy({});

$(function () {
  $(document).on('click', '[data-open-modal]', onClickOpenModal);

  function onClickOpenModal(click) {
    click.stopPropagation();
    click.preventDefault();
    trigger.trigger('open-modal', $(this).attr('data-open-modal'));
  }
});

module.exports = trigger;
