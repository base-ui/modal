var eventy = require('eventy');
var trigger = require('./trigger');
var j = require('jquery');

module.exports = Modal;

function Modal(el) {
  var thisModal = eventy(this);

  thisModal.el = el;

  j(thisModal.el).on('click', '[data-modal-trigger-close]', onClickCloseModal);
  j(thisModal.el).on('click', '>.inner', onClickInner);
  j(thisModal.el).on('click', onClickOuter);

  function onClickCloseModal(click) {
    thisModal.close();
  }

  function onClickInner(click) {
    if (!j(click.target).attr('data-bubble-event')) {
      click.stopPropagation();
    }
  }

  function onClickOuter(click) {
    if (j(thisModal.el).attr('data-ignore-outer-click')) {
      return;
    }

    thisModal.close();
  }

  trigger.on('open-modal', function (selector) {
    if (j(selector).get(0) === thisModal.el) {
      thisModal.open();
    }
  });

  trigger.on('close-modal', function (selector) {
    if (j(selector).get(0) === thisModal.el) {
      thisModal.close();
    }
  });

  trigger.on('toggle-modal', function (selector) {
    if (j(selector).get(0) === thisModal.el) {
      thisModal.toggle();
    }
  });
}

Modal.prototype.close = function () {
  j(this.el).removeClass('open');
  this.trigger('close');
}

Modal.prototype.open = function () {
  j(this.el).addClass('open');
  this.trigger('open');
}

Modal.prototype.toggle = function () {
  if (j(this.el).hasClass('open')) {
    this.close();
  } else {
    this.open();
  }
}
