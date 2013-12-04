var eventy = require('eventy');
var trigger = require('./trigger');
var $ = jQuery = require('jquery');

module.exports = Modal;

function Modal(el) {
  var modal = this;

  modal.el = el;

  $(modal.el).on('click', '[data-trigger="close"]', onClickCloseModal);
  $(modal.el).on('click', '>.inner', onClickInner);
  $(modal.el).on('click', onClickOuter);

  function onClickCloseModal(click) {
    modal.close();
  }

  function onClickInner(click) {
    click.stopPropagation();
  }

  function onClickOuter(click) {
    modal.close();
  }

  trigger.on('open-modal', function (selector) {
    if ($(selector).get(0) === modal.el) {
      modal.open();
    }
  });

  trigger.on('close-modal', function (selector) {
    if ($(selector).get(0) === modal.el) {
      modal.close();
    }
  });

  trigger.on('toggle-modal', function (selector) {
    if ($(selector).get(0) === modal.el) {
      modal.toggle();
    }
  });
}

Modal.prototype.close = function () {
  $(this.el).removeClass('open');
}

Modal.prototype.open = function () {
  $(this.el).addClass('open');
}

Modal.prototype.toggle = function () {
  if ($(this.el).hasClass('open')) {
    this.close();
  } else {
    this.open();
  }
}
