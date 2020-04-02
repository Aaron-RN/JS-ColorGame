import '../css/main.css';
import GameModel from '../models/game';

function RemoveChildren(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.lastChild);
  }
}

function handleRightClick(e) {
  e.preventDefault();
}

window.oncontextmenu = handleRightClick;

function ClockTick(gameView) {
  const { game } = gameView;
  game.time -= 1;
  gameView.TimeClock.textContent = game.time;
  if (game.time <= 0) {
    game.lives -= 1;
    gameView.Lives.textContent = game.lives;
    gameView.newRound();
  }
}

class GameView {
  constructor() {
    this.game = null;
    this.ColorHeader = document.querySelector('#ColorCoding');
    this.Lives = document.querySelector('#Lives');
    this.TimeClock = document.querySelector('#TimeClock');
    this.GameBox = document.querySelector('#GameBox');
  }

  run() {
    this.game = new GameModel();
    this.game.NewGame('Normal');
    this.newRound();
  }

  ClickColor(i) {
    const { board } = this.game;
    const colorSelected = board.retrieveColor(i);
    if (this.game.checkColor(colorSelected)) {
      this.newRound();
    }
  }

  newRound() {
    const { game } = this;
    RemoveChildren(this.GameBox);
    game.newRound();
    clearInterval(game.timer);
    game.time = game.maxRoundTime;
    this.Lives.textContent = game.lives;
    this.TimeClock.textContent = game.time;
    game.timer = setInterval(() => ClockTick(this), 1000);
    this.ColorHeader.innerHTML = `<h1 id="RGB">rgb( <span id="R">${game.R}</span>, <span id="G"> ${game.G}</span>, <span id="B"> ${game.B}</span> )</h1>`;
    const { board } = this.game;
    for (let i = 0; i < board.maxColors; i += 1) {
      const colorObj = board.colors[i];
      const colorBox = document.createElement('div');
      colorBox.setAttribute('id', `box-${colorObj.id}`);
      colorBox.classList.add('Gridbox');
      colorBox.onclick = () => this.ClickColor(i);
      colorBox.setAttribute('data-bg', `${colorObj.r}${colorObj.g}${colorObj.b}`);
      colorBox.setAttribute('style', `background-color: rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b});`);
      this.GameBox.appendChild(colorBox);
    }
  }
}

export default GameView;