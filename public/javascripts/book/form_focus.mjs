// eslint-disable-next-line func-names
Element.prototype.addEventListeners = function (events, callback) {
  events.forEach((event) => {
    this.addEventListener(event, callback);
  });
};

document.forms.booking_form
  .addEventListeners(['focusin', 'focusout'], (event) => {
    if (event.type === 'focusin') {
      // eslint-disable-next-line no-param-reassign
      event.target.style.borderColor = 'azure';
    } else {
      // eslint-disable-next-line no-param-reassign
      event.target.style.borderColor = '';
    }
  });
