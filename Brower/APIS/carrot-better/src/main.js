'use strict';

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const GAME_DURATION_SEC = 5;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const gameFinishBanner = new PopUp();
const gameField = new Field(CARROT_COUNT, BUG_COUNT);

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (!started) {
    startGame();
  } else {
    stopGame();
  }
});

gameFinishBanner.setClickListener(() => {
  startGame();
});

gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }

  if (item === 'carrot') {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finshGame(true);
    }
  } else if (item === 'bug') {
    finshGame(false);
  }
}

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  sound.playBackground();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('REPLAY ❓');
  sound.playAlert();
  sound.stopBackground();
}

function finshGame(win) {
  started = false;
  hideGameButton();
  stopGameTimer();
  gameFinishBanner.showWithText(win ? 'YOU WON🎉' : 'YOU LOST💩');
  win ? sound.playWin() : sound.playBug();
  sound.stopBackground();
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

function initGame() {
  score = 0;
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}
