import Board from './board';

class GameModel {
  constructor() {
    this.board = null;
    this.colorDisplay = 'RGB';
    this.gameMode = 'Survival';
    this.difficulty = 'Normal';
    this.playerAlias = null;
    this.R = null;
    this.G = null;
    this.B = null;
    this.gameStarted = false;
    this.pointsScored = 0;
    this.lives = 3;
    this.maxRoundTime = 10;
    this.time = this.maxRoundTime;
    this.timer = null;
    this.gameOver = false;
  }

  GameOver() {
    if (this.lives <= 0) {
      this.gameOver = true;
      return true;
    }

    return false;
  }

  checkColor(colorSelected) {
    const { r, g, b } = colorSelected;
    if (this.R === r && this.G === g && this.B === b) {
      this.pointsScored += 1;
      return true;
    }

    this.lives -= 1;
    this.GameOver();
    return false;
  }

  newRound() {
    this.R = Math.floor(Math.random() * 255);
    this.G = Math.floor(Math.random() * 255);
    this.B = Math.floor(Math.random() * 255);
    this.board.PopulateColors(this.R, this.G, this.B);
    this.gameStarted = true;
  }

  NewGame(setDifficulty, setColorDisplay, setPlayerAlias) {
    this.playerAlias = setPlayerAlias;
    this.difficulty = setDifficulty;
    this.colorDisplay = setColorDisplay;
    const { difficulty } = this;
    let maxColors = 4;
    if (difficulty === 'Easy') maxColors = 3;
    if (difficulty === 'Normal') maxColors = 4;
    if (difficulty === 'Hard') maxColors = 6;
    if (difficulty === 'Oops') maxColors = 8;
    this.board = new Board(maxColors);
  }
}

export default GameModel;