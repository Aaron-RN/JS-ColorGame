import Board from './board';

class GameModel {
  constructor() {
    this.board = null;
    this.colorDisplay = 'RGB';
    this.gameMode = 'Survival';
    this.difficulty = 'Normal';
    this.R = null;
    this.G = null;
    this.B = null;
    this.round = 1;
    this.lives = 3;
    this.maxRoundTime = 10;
    this.time = this.maxRoundTime;
    this.timer = null;
  }

  checkColor(colorSelected) {
    const { r, g, b } = colorSelected;
    if (this.R === r && this.G === g && this.B === b) {
      return true;
    }

    return false;
  }

  newRound() {
    this.R = Math.floor(Math.random() * 255);
    this.G = Math.floor(Math.random() * 255);
    this.B = Math.floor(Math.random() * 255);
    this.board.PopulateColors(this.R, this.G, this.B);
  }

  NewGame(setDifficulty) {
    this.difficulty = setDifficulty;
    const { difficulty } = this;
    let maxColors = 4;
    if (difficulty === 'Easy') maxColors = 3;
    if (difficulty === 'Hard') maxColors = 6;
    if (difficulty === 'Muy Dificil') maxColors = 8;
    this.board = new Board(maxColors);
  }

}

export default GameModel;