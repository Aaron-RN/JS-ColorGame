import './css/main.css';

const ColorHeader = document.querySelector('#ColorCoding');
const Lives = document.querySelector('#Lives');
const TimeClock = document.querySelector('#TimeClock');
const GameBox = document.querySelector('#GameBox');

function handleRightClick(e) {
  e.preventDefault();
}

window.oncontextmenu = handleRightClick;

let difficulty = 'Muy Dificil';
let R;
let G;
let B;
let colorShown = false;
let round = 1;
let lives = 3;
let time = 10;
let timer;

function RemoveChildren(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.lastChild);
  }
}

function clickColorBox(e) {
  const elem = e.currentTarget;
  const RGB = `${R}${G}${B}`;
  if (elem.getAttribute('data-bg') === RGB) {
    newRound();
  }
  else {
    alert('Incorrect');
  }
}

const generateColorBox = (i, maxLength) => {
  let lastColor = false;
  const colorBox = document.createElement('div');
  colorBox.setAttribute('id', `box-${i}`);
  colorBox.classList.add('Gridbox');
  colorBox.onclick = clickColorBox;
  if (i === maxLength) { lastColor = true; }
  const rand = Math.floor(Math.random() * 2);
  if ((!colorShown && rand === 1) || (!colorShown && lastColor)) {
    colorShown = true;
    colorBox.setAttribute('data-bg', `${R}${G}${B}`);
    colorBox.setAttribute('style', `background-color: rgb(${R}, ${G}, ${B});`);

    return colorBox;
  }
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  colorBox.setAttribute('data-bg', `${r}${g}${b}`);
  colorBox.setAttribute('style', `background-color: rgb(${r}, ${g}, ${b});`);

  return colorBox;
};

function ClockTick() {
  time -= 1;
  TimeClock.textContent = time;
  if (time <= 0) {
    lives -= 1;
    Lives.textContent = lives;
    newRound();
  }
}

function newRound() {
  Lives.textContent = lives;
  clearInterval(timer);
  time = 10;
  TimeClock.textContent = time;
  timer = setInterval(ClockTick, 1000);
  RemoveChildren(GameBox);
  colorShown = false;
  let maxBoxes = 4;
  R = Math.floor(Math.random() * 255);
  G = Math.floor(Math.random() * 255);
  B = Math.floor(Math.random() * 255);
  ColorHeader.innerHTML = `<h1 id="RGB">rgb( <span id="R">${R}</span>, <span id="G"> ${G}</span>, <span id="B"> ${B}</span> )</h1>`;

  if (difficulty === 'Easy') { maxBoxes = 3; }
  if (difficulty === 'Hard') { maxBoxes = 6; }
  if (difficulty === 'Muy Dificil') { maxBoxes = 8; }

  for (let i = 1; i <= maxBoxes; i += 1) {
    GameBox.appendChild(generateColorBox(i, maxBoxes));
  }
}

newRound();
