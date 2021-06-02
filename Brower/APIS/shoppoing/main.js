'use strict';

const items = document.querySelector('.items');
const input = document.querySelector('.add__input');
const addBtn = document.querySelector('.add__btn');

function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받기.
  const value = input.value;
  if (value === '') {
    input.focus();
    return;
  }

  // 2. 새로운 아이템을 생성(텍스트 + 삭제 버튼)
  const item = createItem(value);

  // 3. items 컨테이너안에 새로 만든 아이템을 추가.
  items.appendChild(item);

  // 4. 새로 추가된 item 스크롤링
  item.scrollIntoView({ block: 'center' });

  // 5. input 초기화
  input.value = '';
  input.focus();
}

function createItem(value) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const name = document.createElement('span');
  name.setAttribute('class', 'item__name');
  name.innerText = value;

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'item__delete');
  deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;

  deleteBtn.addEventListener('click', e => {
    e.preventDefault();
    items.removeChild(itemRow);
  });

  item.appendChild(name);
  item.appendChild(deleteBtn);
  itemRow.appendChild(item);

  return itemRow;
}

addBtn.addEventListener('click', e => {
  e.preventDefault();
  onAdd();
});

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    onAdd();
  }
});
