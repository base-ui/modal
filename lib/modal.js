var eventy = require('eventy');
var trigger = require('./trigger');
var j = require('jquery');

module.exports = Modal;

function Modal(el) {
  var self = eventy(this);

  self.el = el;
  self.windowHeightElement = self.select('.window-height');

  j(self.el).on('click', '[data-modal-trigger-close]', onClickCloseModal);
  j(self.el).on('click', '.modal-inner', onClickInner);
  j(self.el).on('click', onClickOuter);

  function onClickCloseModal(click) {
    self.close();
  }

  function onClickInner(click) {
    if (!j(click.target).attr('data-bubble-event')) {
      click.stopPropagation();
    }
  }

  function onClickOuter(click) {
    if (j(self.el).attr('data-ignore-outer-click')) {
      return;
    }

    self.close();
  }

  trigger.on('open-modal', function (selector) {
    if (j(selector).get(0) === self.el) {
      self.open();
    }
  });

  trigger.on('close-modal', function (selector) {
    if (j(selector).get(0) === self.el) {
      self.close();
    }
  });

  trigger.on('toggle-modal', function (selector) {
    if (j(selector).get(0) === self.el) {
      self.toggle();
    }
  });

  /**
   * Keep window-height element's height update with window's height
   */
  if (self.windowHeightElement) {
    self.windowHeightElement.style.height = getWindowHeight() + 'px';
  }

  window.addEventListener('resize', function (resizeEvent) {
    if (self.windowHeightElement) {
      self.windowHeightElement.style.height = getWindowHeight() + 'px';
    }
  });
}

Modal.prototype.select = function (selector) {
  return j(this.el).find(selector).get(0);
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

function getWindowHeight() {
  return "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
}
