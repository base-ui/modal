var eventy = require('eventy');
var trigger = require('./trigger');
var j = require('jquery');

module.exports = Modal;

function Modal(el) {
  var modal = this;

  modal.el = el;

  j(modal.el).on('click', '[data-modal-trigger-close]', onClickCloseModal);
  j(modal.el).on('click', '>.inner', onClickInner);
  j(modal.el).on('click', onClickOuter);

  function onClickCloseModal(click) {
    modal.close();
  }

  function onClickInner(click) {
    if (!j(click.target).attr('data-bubble-event')) {
      click.stopPropagation();
    }
  }

  function onClickOuter(click) {
    if (j(modal.el).attr('data-ignore-outer-click')) {
      return;
    }

    modal.close();
  }

  trigger.on('open-modal', function (selector) {
    if (j(selector).get(0) === modal.el) {
      modal.open();
    }
  });

  trigger.on('close-modal', function (selector) {
    if (j(selector).get(0) === modal.el) {
      modal.close();
    }
  });

  trigger.on('toggle-modal', function (selector) {
    if (j(selector).get(0) === modal.el) {
      modal.toggle();
    }
  });
}

Modal.prototype.close = function () {
  j(this.el).removeClass('open');
}

Modal.prototype.open = function () {
  j(this.el).addClass('open');
}

Modal.prototype.toggle = function () {
  if (j(this.el).hasClass('open')) {
    this.close();
  } else {
    this.open();
  }
}
