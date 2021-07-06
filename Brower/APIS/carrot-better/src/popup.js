'use strict';

export default class Popup {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.popUpBtn = document.querySelector('.pop-up__refresh');

    this.popUpBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpMessage.innerText = text;
    this.popUp.classList.remove('hide');
  }

  hide() {
    this.popUp.classList.add('hide');
  }
}
