'use strict';

const GAME_DURATION_SEC = 5;
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector('.game__field');
const fieldRet = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpBtn = document.querySelector('.pop-up__refresh');
const popUpMessage = document.querySelector('.pop-up__message');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const windSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (!started) {
    startGame();
  } else {
    stopGame();
  }
  // started = !started;
});

field.addEventListener('click', onFieldClick);

popUpBtn.addEventListener('click', () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('REPLAY ❓');
  playSound(alertSound);
  stopSound(bgSound);
}

function finshGame(win) {
  started = false;
  hideGameButton();
  stopGameTimer();
  showPopUpWithText(win ? 'YOU WON🎉' : 'YOU LOST💩');
  win ? playSound(windSound) : playSound(bugSound);
  stopSound(bgSound);
}

function showStopButton() {
  let icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);

  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finshGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

  gameTimer.innerText = `${displayMinutes}:${displaySeconds}`;
}

function showPopUpWithText(text) {
  popUp.classList.remove('pop-up--hide');
  popUpMessage.innerText = text;
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}
function initGame() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, './img/carrot.png');
  addItem('bug', BUG_COUNT, './img/bug.png');
}

function onFieldClick(event) {
  if (!started) {
    return;
  }

  const target = event.target;

  if (target.matches('.carrot')) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finshGame(true);
    }
  } else if (target.matches('.bug')) {
    finshGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRet.width - CARROT_SIZE;
  const y2 = fieldRet.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    let item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
