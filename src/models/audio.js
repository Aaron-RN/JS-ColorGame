// Sounds
import score from '../sfx/score.ogg';
import heartbreak from '../sfx/lazerFaze.ogg';
import gameover from '../sfx/gameOver.ogg';
import personalBest from '../sfx/personalBest.ogg';
import highScore from '../sfx/highScore.ogg';
import bootup from '../sfx/bootup.ogg';
import alarm from '../sfx/alarm.wav';
import menu from '../sfx/menuclick.wav';

const SoundMenu = document.querySelector('#SoundMenu');
const SoundIcon = document.querySelector('#SoundIcon');
const SoundControls = document.querySelector('#SoundControls');
const VolumeSlider = document.querySelector('#VolumeSlider');
let sliderVolume = 0.1;

SoundMenu.addEventListener('click', () => {
  SoundMenu.classList.toggle('soundMenuActive');
  SoundControls.classList.toggle('hide');
});

SoundMenu.addEventListener('mouseleave', () => {
  SoundMenu.classList.remove('soundMenuActive');
  SoundControls.classList.add('hide');
});

VolumeSlider.addEventListener('change', () => {
  sliderVolume = VolumeSlider.value;
  if (sliderVolume <= 0) {
    SoundIcon.classList.remove('fa-volume-up');
    SoundIcon.classList.add('fa-volume-mute');
  } else {
    SoundIcon.classList.remove('fa-volume-mute');
    SoundIcon.classList.add('fa-volume-up');
  }
});

function playSound(snd) {
  if (snd === 'menu') { const snd = new Audio(menu); snd.volume = sliderVolume; snd.play(); }
  if (snd === 'gameStart') { const snd = new Audio(bootup); snd.volume = sliderVolume; snd.play(); }
  if (snd === 'score') {
    const snd = new Audio(score);
    snd.volume = 0.1;
    snd.play();
  }
  if (snd === 'heartbreak') { const snd = new Audio(heartbreak); snd.volume = sliderVolume; snd.play(); }
  if (snd === 'alarm') { const snd = new Audio(alarm); snd.volume = sliderVolume; snd.play(); }

  if (snd === 'gameover') {
    const snd = new Audio(gameover);
    snd.volume = sliderVolume;
    snd.play();
  }
  if (snd === 'personalBest') { const snd = new Audio(personalBest); snd.volume = sliderVolume; snd.play(); }
  if (snd === 'highScore') { const snd = new Audio(highScore); snd.volume = sliderVolume; snd.play(); }
}

// const attribution = 'Sound SFX from http://www.gameburp.com/';

export default playSound;