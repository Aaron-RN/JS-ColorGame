import ColorGame from './views/game';
import playSound from './models/audio';
import favIcon from './images/pallette.png';
import The from './images/The.svg';
import Color from './images/Color.svg';
import Game from './images/Game.svg';
import Exclaim from './images/Exclaim.svg';

// The Color Game! Title is constructed
const GameTitle = document.querySelector('#GameTitle');
const TheText = document.createElement('img');
TheText.setAttribute('src', The);
TheText.setAttribute('id', 'TheText');
const ColorText = document.createElement('img');
ColorText.setAttribute('src', Color);
ColorText.setAttribute('id', 'ColorText');
const GameText = document.createElement('img');
GameText.setAttribute('src', Game);
GameText.setAttribute('id', 'GameText');
const ExclaimText = document.createElement('img');
ExclaimText.setAttribute('src', Exclaim);
ExclaimText.setAttribute('id', 'ExclaimText');
GameTitle.appendChild(TheText);
GameTitle.appendChild(ColorText);
GameTitle.appendChild(GameText);
GameTitle.appendChild(ExclaimText);

const Head = document.querySelector('head');
const menuDiv = document.querySelector('#GameMenu');
const gameDiv = document.querySelector('#ActiveGame');
const difficultyBtn = document.querySelector('#DifficultyBtn');
const difficultyDiv = document.querySelector('#Difficulty');
const colorDisplayBtn = document.querySelector('#ColorDisplayBtn');
const colorDisplayDiv = document.querySelector('#ColorCode');
const startGameBtn = document.querySelector('#StartGameBtn');
const modal = document.querySelector('#Modal');
const aliasMenu = document.querySelector('#AliasMenu');
const aliasBtn = document.querySelector('#AliasBtn');

const favIconLink = document.createElement('link');
favIconLink.setAttribute('rel', 'icon');
favIconLink.setAttribute('type', 'image/png');
favIconLink.setAttribute('href', favIcon);
Head.appendChild(favIconLink);

let difficulty = 'Normal';
let colorDisplay = 'RGB';

difficultyBtn.addEventListener('click', () => {
  playSound('menu');
  if (difficulty === 'Easy') {
    difficulty = 'Normal';
    difficultyDiv.classList.remove('Y');
    difficultyDiv.classList.add('G');
  } else if (difficulty === 'Normal') {
    difficulty = 'Hard';
    difficultyDiv.classList.remove('G');
    difficultyDiv.classList.add('R');
  } else if (difficulty === 'Hard') {
    difficulty = 'Oops';
    difficultyDiv.classList.remove('R');
    difficultyDiv.classList.add('B');
  } else {
    difficulty = 'Easy';
    difficultyDiv.classList.remove('B');
    difficultyDiv.classList.add('Y');
  }
  difficultyDiv.textContent = difficulty;
});

colorDisplayBtn.addEventListener('click', () => {
  playSound('menu');
  colorDisplay = colorDisplay === 'RGB' ? 'HEX' : 'RGB';
  colorDisplayDiv.textContent = colorDisplay;
});

startGameBtn.addEventListener('click', () => {
  playSound('menu');
  const aliasInput = document.querySelector('#Alias');
  aliasMenu.classList.toggle('hide');
  modal.classList.toggle('hide');
  aliasInput.focus();
});

aliasMenu.addEventListener('focusout', (e) => {
  const newFocus = e.relatedTarget;
  if (!newFocus || (newFocus.textContent !== 'Confirm' && newFocus.id !== 'Alias')) {
    // alert(newFocus);
    aliasMenu.classList.add('hide');
    modal.classList.toggle('hide');
  }
});


function AliasConfirm(App) {
  const aliasMenu = document.querySelector('#AliasMenu');
  const aliasInput = document.querySelector('#Alias');
  const aliasValue = aliasInput.value.trim();
  const aliasErrors = document.querySelector('#AliasErrors');
  const errors = [];
  if (aliasValue && aliasValue.length >= 3) {
    menuDiv.classList.toggle('hide');
    gameDiv.classList.toggle('hide');
    App.run(difficulty, colorDisplay, aliasValue);
    aliasMenu.classList.add('hide');
    modal.classList.add('hide');
  } else {
    playSound('menu');
    if (!aliasValue || aliasValue === ' ') errors.push('cannot be blank');
    if (aliasValue.length < 3) errors.push('must be greater than 2 characters');
    // eslint-disable-next-line arrow-body-style
    aliasErrors.innerHTML = errors.map(error => {
      return `Alias: <span class="text-white">"${aliasInput.value}"</span> ${error} <br>`;
    }).join('');
  }
}

// Alias Confirm Button Event:OnClick Function
const App = new ColorGame();
aliasBtn.addEventListener('click', () => AliasConfirm(App));
window.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    aliasBtn.focus();
  }
});