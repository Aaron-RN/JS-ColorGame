import '../css/main.css';
import playSound from '../models/audio';
import RGBToHex from '../models/rgbToHex';
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
  if (game.time <= 3 && game.time !== 0) { playSound('alarm'); }
  if (game.time <= 0) {
    gameView.ClickColor(null, '-1');
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
    this.lastClickLocation = null;
  }

  run(setDifficulty, setColorDisplay) {
    playSound('gameStart');
    this.game = new GameModel();
    this.game.NewGame(setDifficulty, setColorDisplay);
    ShowHearts(this.Lives, this.game.lives);
    this.newRound();
  }

  LoseLife() {
    playSound('heartbreak');
    const lastHeart = document.querySelector(`#heart-${this.game.lives + 1}`);
    lastHeart.classList.add('animate-shrink');
  }

  PlusPoint(mouseLocation) {
    playSound('score');
    const score = document.createElement('div');
    score.setAttribute('style', `top:${mouseLocation.Y}px; left:${mouseLocation.X}px`);
    score.classList.add('animate-score', 'score-fx');
    score.innerHTML = '<i class="fas fa-plus"></i>1';
    this.Body.appendChild(score);
    setTimeout(() => this.Body.removeChild(score), 1000);
    this.Points.innerHTML = `<span>Score:</span> ${this.game.pointsScored}`;
  }

  ShowGameOver() {
    playSound('gameover');
    clearInterval(this.game.timer);
    this.Body.classList.add('blur');
    this.Modal.classList.toggle('hide');
    this.Modal.classList.toggle('animate-fade-in');
    this.ModalContent.textContent = 'Game Over!';
  }

  ClickColor(e, i) {
    const mouseLocation = e ? { X: e.clientX, Y: e.clientY } : null;
    const { board } = this.game;
    if (this.game.gameOver) return;
    const colorSelected = board.retrieveColor(i);
    if (this.game.checkColor(colorSelected)) {
      this.PlusPoint(mouseLocation);
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
    if (game.colorDisplay === 'RGB') {
      this.ColorHeader.innerHTML = `<span id='RGB'>rgb</span>
      ( <span id="R">${game.R}</span>, <span id="G"> ${game.G}</span>, <span id="B"> ${game.B}</span> )`;
    } else {
      const hex = RGBToHex(game.R, game.G, game.B);
      const hex1 = `${hex[1]}${hex[2]}`;
      const hex2 = `${hex[3]}${hex[4]}`;
      const hex3 = `${hex[5]}${hex[6]}`;
      this.ColorHeader.innerHTML = `<span id='RGB'>hex</span>
      ( <span id="R">${hex1}</span>, <span id="G"> ${hex2}</span>, <span id="B"> ${hex3}</span> )`;
    }
    const { board } = this.game;
    for (let i = 0; i < board.maxColors; i += 1) {
      const colorObj = board.colors[i];
      const colorBox = document.createElement('div');
      colorBox.setAttribute('id', `box-${colorObj.id}`);
      colorBox.classList.add('Gridbox');
      colorBox.onclick = (e) => this.ClickColor(e, i);
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