'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

// 1. Field Class 선언
export default class Field {
  // 2. 당근과 벌레의 갯수를 받으며, 게임을 실행.
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRet = this.field.getBoundingClientRect();
    // 4. 사용자 setClickListener 등록 하면 필드 클래스에 onClick 메서드를 실행.
    // this.field.addEventListener(('click') => this.onClick(event));
    this.field.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // 3. 필드에 당근과 벌레를 생성.
  init() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, './img/carrot.png');
    this._addItem('bug', this.carrotCount, './img/bug.png');
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRet.width - CARROT_SIZE;
    const y2 = this.fieldRet.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      let item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
      this.field.appendChild(item);
    }
  }

  // field class 안에 onClick 함수를 다른 콜백으로 전달할 때는 클래스의 정보가 사라지므로 바인딩을 해줘야 한다.
  // 그래서 onClick함수와 클래스를 바인딩 하려면 onClick을 멤버 변수로 만들면 화살표 함수는 자동으로 바인딩 해준다.
  onClick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  };
}

// static method
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// 참고
// class에서 arrow function 사용하지 말아야되는 이유 -  https://simsimjae.tistory.com/452
