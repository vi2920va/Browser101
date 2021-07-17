'use strict';
// 1. PopUp Class 선언.
export default class PopUp {
  // 2. PopUp과 관련된 DOM 요소를 불러와서 초기화.
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpBtn = document.querySelector('.pop-up__refresh');
    this.popUpMessage = document.querySelector('.pop-up__message');

    // 3. PopUpBtn에 클릭 이벤트 등록
    this.popUpBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  // 4. 사용자가 setClickListener를 등록하면 등록된 onClick 콜백 함수를 호출.
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  // 5. PopUpBtn을 누르면 팝업창을 숨김.
  hide() {
    this.popUp.classList.add('hide');
  }

  // 6. 게임 종료되었을 때 보여줄 팝업창과 메시지.
  showWithText(text) {
    this.popUp.classList.remove('hide');
    this.popUpMessage.innerText = text;
  }
}
