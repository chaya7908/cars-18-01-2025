// ====== CONSTANTS =====================================================
const WAIT_BEFORE_START_HIGHLIGHTS = 2500;
const WAIT_BETWEEN_PROP_CHECK = 400;
const WAIT_AFTER_WRONG_HIGHLIGHTS = 2000;
const WAIT_AFTER_CORRECT_HIGHLIGHTS = 1000;
const RESET_AFTER_SUCCESS_MATCH = 6000;
const RESET_AFTER_WRONG_MATCH = 1000;
const GAME_TIMER_MINUTES = 3;
const WINS_FOR_GIFT = 2;
const HAS_TIMER = false;
const HAS_BG_MUSIC = false;
// ====== CONSTANTS =====================================================

let isGameStarted = false;
let isGameOver = false;
const gameBgSound = new Audio('./sounds/game-bg.mp3');
gameBgSound.loop = true;

let wins = 0;

const vehicles = [
  { id: 1, pathId: "path-1", image: "assets/car.png", position: 0, speed: 2, type: "car" },
  { id: 2, pathId: "path-2", image: "assets/track.png", position: 0, speed: 3, type: "truck" },
  { id: 3, pathId: "path-3", image: "assets/bus.png", position: 0, speed: 2.5, type: "bus" },
  { id: 4, pathId: "path-4", image: "assets/moto.png", position: 0, speed: 2, type: "motorcycle" },
];
const maxPoints = 10;


let firstChoosenCard = null;
let canClick = true;

const brushAnimationsStack = [];
const gameSounds = [];

// ------------------------- BUILD GAME BOARD -------------------------
async function initStartContainer() {
  const text1Elements = document.querySelectorAll('.start-game-container .text-1 p');
  const text2Elements = document.querySelectorAll('.start-game-container .text-2 p');
  [...text1Elements, ...text2Elements].forEach(p => p.classList.add('transparent'));
  
  for (p of text1Elements) {
    p.classList.remove('transparent');
    animateBrush({ element: p, color: 'purple', duration: 2, playSound: false, zoomTimeout: 1000 });
    await delay(1000);
    p.classList.add('active');
  }

  await delay(1000);

  for (p of text2Elements) {
    p.classList.remove('transparent');
    animateBrush({ element: p, color: 'natural', duration: 2, playSound: false, zoomTimeout: 1000 });
    await delay(1000);
    p.classList.add('active');
  }

  await delay(1000);
  const button = document.querySelector('.start-game-container button');
  button.classList.remove('transparent');
}

function initializeGame() {
  if (isGameStarted) return;
  isGameStarted = true;
  document.getElementsByClassName('board-container')[0].classList.remove('hidden');
  initTimer();
  initializeVehicles();
  
  if (HAS_BG_MUSIC) {
    gameBgSound.play();
  }
}

function initTimer() {
  if (!HAS_TIMER) return;
  
  let timeInSeconds = GAME_TIMER_MINUTES * 60;
  
  function updateTimerDisplay(minutes, seconds) {
    const minuteElem = document.getElementById('minutes');
    const secondElem = document.getElementById('seconds');
    
    // Update minutes and seconds with animations
    applyAnimation(minuteElem, minutes.toString().padStart(2, '0'));
    applyAnimation(secondElem, seconds.toString().padStart(2, '0'));
  }
  
  function applyAnimation(element, newValue) {
    // Store current value
    const currentValue = element.textContent;
    
    // If the value has changed, apply animation
    if (currentValue !== newValue) {
      // Add the 'old' class for current value
      element.classList.add('old');
      
      // Wait for the animation to complete, then update the value
      setTimeout(() => {
        element.textContent = newValue;
        // Remove the 'old' class and add the 'new' class
        element.classList.remove('old');
        element.classList.add('new');
        
        // Remove the 'new' class after animation completes
        setTimeout(() => {
          element.classList.remove('new');
        }, 300); // Duration of animation
      }, 300); // Duration of 'old' animation
    }
  }
  
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    
    updateTimerDisplay(minutes, seconds);
    
    // Decrement the time
    timeInSeconds--;
    
    // Stop the timer when it reaches 0
    if (timeInSeconds < 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0, 0); // Ensure it shows 00:00 at the end
      gameOver();
    }
  }, 1000);
}

function initializeVehicles() {
  vehicles.forEach((vehicle) => {
    const path = document.getElementById(vehicle.pathId);
    if (path) {
      const img = document.createElement("img");
      img.src = vehicle.image;
      img.className = "vehicle";
      img.id = `vehicle-${vehicle.id}`;
      path.appendChild(img);
      updateVehiclePosition(vehicle);
      img.addEventListener('click', () => {
        moveVehicle(vehicle.id);
      });
    }
  });
}

// ------------------------- GAME EVENTS -------------------------------

async function updateVehiclePosition(vehicle) {
  const speed = vehicle.position === 0 ? 0 : vehicle.speed;
  const img = document.getElementById(`vehicle-${vehicle.id}`);
  if (img) {
    const percentageStep = 100 / (maxPoints + 1);
    const rightPosition = vehicle.position * percentageStep;
    img.style.transitionDuration = `${speed}s`;
    img.style.right = `${rightPosition}%`;

    switch(vehicle.type) {
      case "car":
        img.classList.add('carAnimation');
        break;
      case "truck":
        img.classList.add('truckAnimation');
        break;
      case "bus":
        img.classList.add('busAnimation');
        break;
      case "motorcycle":
        img.classList.add('motorcycleAnimation');
        break;
      default:
        img.style.animation = '';
        break;
    }
    img.style.animationDuration = `${speed}s`;
    await delay(speed * 1000);
    img.classList.remove('carAnimation', 'truckAnimation', 'busAnimation', 'motorcycleAnimation');
  }
}

function moveVehicle(vehicleId) {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  if (vehicle && vehicle.position <= maxPoints) {
    vehicle.position++;
    updateVehiclePosition(vehicle);
  }
}

async function gameOver() {
  isGameOver = true;
  const gameOverBoard = document.querySelector('.game-over-container');
  gameOverBoard.style.display = 'block';
  const text = gameOverBoard.querySelector('.text-2');
  playGameSound('game-over');

  await delay(500);
  animateBrush({ element: text, color: 'red', duration: 3, playSound: false });
  setInterval(() => {
    playGameSound('game-over');
    lowerBgVolume(0.5);
    animateBrush({ element: text, color: 'red', duration: 3, playSound: false });
  }, 4000);
}

// ------------------------- LOGIC ------------------------------------


// ------------------------ ACTIONS -----------------------------------
function blink(elements, color) {
  // Get the value of the CSS variable
  const colorVar = getComputedStyle(document.body).getPropertyValue(`--color-${color}`);

  elements.forEach(e => {
    e.style.setProperty('--blink-color', colorVar);
    e.classList.add('blink-bg-color');
  });
}

function stopBlink(elements) {
  elements.forEach(e => e.classList.remove('blink-bg-color'));
}

async function playGameSound(type, pauseOther = true) {
  if (pauseOther) {
    gameSounds.forEach(sound => sound.pause());
  }

  let path = '';
  let volume = 0.3;
  switch (type) {
    case 'check':
      path = './sounds/check2.mp3';
      break;
    case 'wrong':
      volume = 0.1;
      path = './sounds/wrong1.mp3';
      break;
    case 'wrong-check':
      path = './sounds/wrong-check.mp3';
      break;
    case 'flip':
      volume = 0.2;
      path = './sounds/card.mp3';
      break;
    case 'claps':
      path = './sounds/claps.mp3';
      break;
    case 'claps2':
      volume = 0.3;
      path = './sounds/claps2.mp3';
      break;
    case 'game-over':
      path = './sounds/game-over.mp3';
      break;
    case 'win':
      path = './sounds/win.mp3';
      break;
    default:
      break;
  }

  var audio = new Audio(path);
  audio.volume = volume;

  audio.play();
  gameSounds.push(audio);
};

function lowerBgVolume(volume = 0.3) {
  gameBgSound.volume = volume;
}

function resetBgVolume() {
  gameBgSound.volume = 1;
}

// ------------------------ ANIMATIONS -----------------------------------

function animateBrush({ element, color, duration = 1, playSound = true, zoomTimeout = 0 }) {
  element.classList.remove('zoom-once');
  
  const id = getAnimationBrushId();

  element.style.setProperty('--clip-path', `url(#clip-indefinite-${id})`);

  setTimeout(() => {
    element.classList.add('zoom-once');
  }, zoomTimeout);
  element.classList.add('brush-highlight');
  element.classList.add(`highlight-${color}`);

  const anim = document.getElementById(`anim-${id}`);
  if (duration) {
    anim.setAttribute('dur', `${duration}s`);
  }
  anim.beginElement();

  if (playSound) {
    playGameSound('check');
  }
}

// ------------------------ UTILS -----------------------------------
function shuffleArray(array) {
  if (isDev()) return array;

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isDev() {
  return localStorage.getItem('hashadchan-pairs-game-dev') === 'true' ;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomId() {
  return 'id-' + Math.random().toString(36).substring(2, 15);
}

function genereateBrushAnimations() {
  for (let i = 0; i < 10; i++) {
    genereateBrushAnimation();
  }
}

function genereateBrushAnimation() {
  const id = generateRandomId();
  const svgString = BRUSH_SVG.replaceAll('{{id}}', id);
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
  const svgElement = svgDoc.documentElement;
  document.body.appendChild(svgElement);
  brushAnimationsStack.unshift(id);
}

function getAnimationBrushId() {
  const id = brushAnimationsStack.pop();
  genereateBrushAnimation();
  return id;
}

function goToSite() {
  window.open('https://hashadchan.co.il/?utm_source=memory_game&utm_medium=site', '_blank');
}

function baseLayout() {
  if (!HAS_TIMER) {
    document.querySelector('.timer-container').remove();
  }
}

genereateBrushAnimations();
baseLayout();

document.addEventListener('click', () => {
  initializeGame();
})