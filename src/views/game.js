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
    gameView.ClickColor('-1');
  }
}

function ShowHearts(elem, lives) {
  RemoveChildren(elem);
  for (let i = 1; i <= lives; i += 1) {
    const heart = document.createElement('div');
    heart.setAttribute('id', `heart-${i}`);
    heart.classList.add('fas', 'fa-heart');
    elem.appendChild(heart);
  }
}

class GameView {
  constructor() {
    this.game = null;
    this.ColorHeader = document.querySelector('#ColorCoding');
    this.Points = document.querySelector('#Points');
    this.Lives = document.querySelector('#Lives');
    this.TimeClock = document.querySelector('#TimeClock');
    this.GameBox = document.querySelector('#GameBox');
    this.Body = document.querySelector('#main');
    this.Modal = document.querySelector('#Modal');
    this.ModalContent = document.querySelector('#ModalContent');
  }

  run() {
    this.game = new GameModel();
    this.game.NewGame('Normal');
    ShowHearts(this.Lives, this.game.lives);
    this.newRound();
  }

  LoseLife() {
    const lastHeart = document.querySelector(`#heart-${this.game.lives + 1}`);
    lastHeart.classList.add('animate-shrink');
  }

  ShowGameOver() {
    clearInterval(this.game.timer);
    this.Body.classList.add('blur');
    this.Modal.classList.toggle('hide');
    this.ModalContent.textContent = 'Game Over!';
  }

  ClickColor(i) {
    const { board } = this.game;
    if (this.game.gameOver) return;
    const colorSelected = board.retrieveColor(i);
    if (this.game.checkColor(colorSelected)) {
      this.Points.innerHTML = `<span>Score:</span> ${this.game.pointsScored}`;
      this.newRound();
    } else {
      this.LoseLife();
      if (this.game.GameOver()) {
        this.ShowGameOver();
      } else {
        this.newRound();
      }
    }
  }

  newRound() {
    const { game } = this;
    RemoveChildren(this.GameBox);
    game.newRound();
    clearInterval(game.timer);
    game.time = game.maxRoundTime;
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
      if (game.colorDisplay === 'RGB') {
        colorBox.setAttribute('style', `background-color: ${colorObj.hex};`);
      } else {
        colorBox.setAttribute('style', `background-color: rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b});`);
      }
      this.GameBox.appendChild(colorBox);
    }
  }
}

export default GameView;