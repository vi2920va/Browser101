'use strict';
import Field from './field.js';
import * as sound from './sound.js';

// Builder Patterno
export default class GameBulder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  // Game class crate
  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');

    this.gameBtn.addEventListener('click', () => {
      if (!this.started) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.init();
    this.showStopButton();
    this.showTimerAndScore();
    this.startTimer();
    sound.playBackground();
  }

  stop() {
    this.started = false;
    this.stopTimer();
    this.hideButton();
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop('cancel');
  }

  finsh(win) {
    this.started = false;
    this.hideButton();
    this.stopTimer();
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
    win ? sound.playWin() : sound.playBug();
    sound.stopBackground();
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }

    if (item === 'carrot') {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.finsh(true);
      }
    } else if (item === 'bug') {
      this.finsh(false);
    }
  };

  showStopButton() {
    let icon = this.gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  hideButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);

    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finsh(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

    this.gameTimer.innerText = `${displayMinutes}:${displaySeconds}`;
  }

  init() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
