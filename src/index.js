import ColorGame from './views/game';
import playSound from './models/audio';
import favIcon from './images/pallette.png';

const Head = document.querySelector('head');
const menuDiv = document.querySelector('#GameMenu');
const gameDiv = document.querySelector('#ActiveGame');
const difficultyBtn = document.querySelector('#DifficultyBtn');
const difficultyDiv = document.querySelector('#Difficulty');
const colorDisplayBtn = document.querySelector('#ColorDisplayBtn');
const colorDisplayDiv = document.querySelector('#ColorCode');
const startGameBtn = document.querySelector('#StartGameBtn');
const modal = document.querySelector('#Modal');
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
  const aliasMenu = document.querySelector('#AliasMenu');
  const aliasInput = document.querySelector('#Alias');
  aliasMenu.classList.toggle('hide');
  aliasInput.focus();
  modal.classList.toggle('hide');
});

const App = new ColorGame();
aliasBtn.addEventListener('click', () => {
  const aliasMenu = document.querySelector('#AliasMenu');
  const aliasInput = document.querySelector('#Alias');
  const aliasValue = aliasInput.value.trim();
  const aliasErrors = document.querySelector('#AliasErrors');
  const errors = [];
  if (aliasValue && aliasValue.length >= 3) {
    menuDiv.classList.toggle('hide');
    gameDiv.classList.toggle('hide');
    App.run(difficulty, colorDisplay, aliasValue);
    modal.classList.toggle('hide');
    aliasMenu.classList.toggle('hide');
  } else {
    playSound('menu');
    if (!aliasValue || aliasValue === ' ') errors.push('cannot be blank');
    if (aliasValue.length < 3) errors.push('must be greater than 2 characters');
    aliasErrors.innerHTML = errors.map(error => {
      return `Alias: <span class="text-white">"${aliasInput.value}"</span> ${error} <br>`;
    }).join('');
  }
});