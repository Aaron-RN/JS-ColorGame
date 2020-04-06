import ColorGame from './views/game';
import playSound from './models/audio';

const menuDiv = document.querySelector('#GameMenu');
const gameDiv = document.querySelector('#ActiveGame');
const difficultyBtn = document.querySelector('#DifficultyBtn');
const difficultyDiv = document.querySelector('#Difficulty');
const colorDisplayBtn = document.querySelector('#ColorDisplayBtn');
const colorDisplayDiv = document.querySelector('#ColorCode');
const startGameBtn = document.querySelector('#StartGameBtn');

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

const App = new ColorGame();
startGameBtn.addEventListener('click', () => {
  menuDiv.classList.toggle('hide');
  gameDiv.classList.toggle('hide');
  App.run(difficulty, colorDisplay);
});