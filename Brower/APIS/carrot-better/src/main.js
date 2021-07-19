'use strict';

import PopUp from './popup.js';
import GameBulder from './game.js';

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new GameBulder()
  .withGameDuration(5)
  .withCarrotCount(5)
  .withBugCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case 'cancel':
      message = 'Replay❓';
      break;
    case 'win':
      message = 'YOU WON 🎉';
      break;
    case 'lose':
      message = 'YOU LOST 💩';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});
