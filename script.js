// ====== CONSTANTS =====================================================
const WAIT_BEFORE_START_HIGHLIGHTS = 2500;
const WAIT_BETWEEN_PROP_CHECK = 400;
const WAIT_AFTER_WRONG_HIGHLIGHTS = 2000;
const WAIT_AFTER_CORRECT_HIGHLIGHTS = 1000;
const RESET_AFTER_SUCCESS_MATCH = 8000;
const RESET_AFTER_WRONG_MATCH = 1000;
const GAME_TIMER_MINUTES = undefined;
const WINS_FOR_GIFT = 2;
const HAS_TIMER = false;
const HAS_BG_MUSIC = true;
// ====== CONSTANTS =====================================================

const DELAY_AFTER_STEP_BEFORE_BUTTON_APPEAR = 2000;
const ANIMATION_BEFORE_MOVE_DURATION = 4000;
const REMOVE_STUCKED_VEHICLE = false;

let isGameStarted = false;
let isGameOver = false;
const gameBgSound = new Audio('./sounds/game-bg.mp3');
gameBgSound.loop = true;

let wins = 0;

const vehicles = [
  { id: 1, pathId: "path-1", image: "assets/car.png", position: 0, speed: 2, type: "car", obstaclePosition: 46, steps: 7 },
  { id: 2, pathId: "path-2", image: "assets/track.png", position: 0, speed: 3, type: "truck", obstaclePosition: 38, steps: 15 },
  { id: 3, pathId: "path-3", image: "assets/tractor.png", position: 0, speed: 2.5, type: "bus", obstaclePosition: 70, steps: 10 },
  { id: 4, pathId: "path-4", image: "assets/moto.png", position: 0, speed: 2, type: "motorcycle", obstaclePosition: 76, steps: 6 }
];
const obstacles = vehicles.map(vehicle => {
  const obstaclePosition = vehicle.obstaclePosition;
  return {
    vehicleId: vehicle.id,
    position: obstaclePosition,
    pathId: vehicle.pathId,
    image: "assets/obstacle.png",
  };
});

const tasks = [
  { question: "באיזה מחזור מספר תלמידות הקטן ביותר?", answer: "יב' - 137 תלמידות בלי עין הרע" },
  {
    question: "יורשת העצר זו מעלתה <br>כמספר יהודי בנות לוויתה<br>בשמה של אצבע אמצעית<br>נעשה שימוש בלי תוצאה וודאית",
    answer: "בתיה בת פרעה המלך, 7 משרתות לה, באמה נעשה שימוש בלי הגיון שמשהו אכן יקרה, זכתה שנקרא משה בשם שהיא קראה לו."
  },
  { question: `<img src='assets/questions/q1.JPG' style='width: 100%;'>`, answer: "<img src='assets/questions/a1.JPG' style='width: 100%;'>" },
  { question: `<img src='assets/questions/q2.JPG' style='width: 100%;'>`, answer: "<img src='assets/questions/a2.JPG' style='width: 100%;'>" },
  { question: `<img src='assets/questions/q3.JPG' style='width: 100%;'>`, answer: "<img src='assets/questions/a3.JPG' style='width: 100%;'>" },
  { question: `<img src='assets/questions/q4.JPG' style='width: 100%;'>`, answer: "<img src='assets/questions/a4.JPG' style='width: 100%;'>" },
  { question: `<img src='assets/questions/q5.JPG' style='width: 100%;'>`, answer: "<img src='assets/questions/a5.JPG' style='width: 100%;'>" },
  { question: `<img src='assets/questions/q6.JPG' style='width: 100%;'>`, answer: "<img src='assets/questions/a6.JPG' style='width: 100%;'>" },
  {
    question: "כמספר רגלים צעד בבטחה<br>לכבודו של מקום ימנע השליחה<br>ותהי משכורתו ברוכה<br>באימפריה של שליטה ומלוכה",
    answer: "נבוכדנצאר, צעד 3 צעדים למנוע שליחת האגרת שהוזכר בו שמו של אלוקים בסוף, וזכה לשליטה בכל העולם ולשלוש דורות."
  },
  {
    question: "הבאנה פסוקים הכוללים בתוכם את השורש ק.ט.נ. בכל נטייותיו הדקדוקיות.",
    answer: `<div style="font-size: 26px;">"הקטן יהיה לאלף והצעיר לגוי עצום"<br>
              "המאור הגדול...המאור הקטן לממשלת הלילה" בראשית.<br>
              "יש לנו אב זקן וילד זקונים קטן" ויגש.<br>
              "ברחל בתך הקטנה" ויצא.<br>
              "שם הגדולה לאה ושם הקטנה רחל" (ויצא)<br>
              "ואת גביעי גביע הכסף תשים בפי אמתחת הקטן" מקץ<br>
              "ויחפש בגדול החל ובקטן כילה וימצא הגביע באמתחת בניימין" מקץ<br>
              "ואולם אחיו הקטן יגדל ממנו"<br>
              "למגדול ועד קטן" - מגילת אסתר<br>
              "יברך... הקטנים עם הגדולים" - הלל.<br>
              "קטונתי מכל החסדים ומכל האמת" וישלח<div>`
  },
  {
    question: "מי הקטנה בכל מחזור?",
    answer: `ט - מירי חריטן ט1<br>
             י' - לאהלה הרשטיק - י1<br>
             יא' - שרי שפרונג - יא3<br>
             יב' - רייזי לנגנויאר - יב3`
  },
  {
    question: "שלוש מאות וחמש הוא רדף<br>בחושבו שמא אולי נהדף<br>על כפיים ברחמים ובחמלה<br>זו זכותו להביא גאולה",
    answer: "משה רבנו, 305=שה, רדף אחרי שה וסבור היה שמא תקפוהו, פגש אותו ליד מקווה המים והבין שהיה צמא על כן הרימו ברחמים וזכה להיות מנהיג ומושיע."
  },
  { question: "כמה קליין יש בסמינר?", answer: `<div style="font-size: 100px;">24<div>` },
  { question: "א' זעירה בויקרא מה הטעם?", answer: "ויקר - דרך מקרה, שמשה לא רצה להתגאות שה' נגלה אליו" },
  { question: "באיזו מחזור מס' המוזינקאלאך גדול ביותר?", answer: "מחזור ט' עם 16 מוז'ינקאלאך" },
  {
    question: "כמניין הכוסות זלגו העיניים<br>על מי ששיכלה פעמיים<br>בגפה, לבדה, נותרה בירכתיים<br>ובגבורה נאזרו חלציה בינתיים",
    answer: "עורפה, הוזילה 4 דמעות בפרידתה מנעמי ששיכלה שני בנים, נותרה לבדה וזכתה שמצאצאיה יצאו ארבעה גיבורים, סף, מדין, גלית, ישבי."
  },
  {
    question: "בפרשת חיי שרה כתובה המילה לבכותה בכ' זעירה, מהו הטעם לכך?",
    answer: "שלא בכה אלא מעט לפי שזקנה היתה."
  },
  { question: "כיתה שענו בה הכי הרבה אמנים על ברכות השחר מהבוקר.", answer: `<div style="font-size: 100px;" class='spin'>💫</div>` },
  { question: "כיתה שיש בה הכי הרבה בנות שאומרות עלינו לשבח מילה במילה מהחל ועד כלה מתוך הסידור בעמידה.", answer: `<div style="font-size: 100px;" class='spin'>💫</div>` },
  { question: "כמה בנות בכיתה מקיימות את המצווה העתיקה של קימה לכבוד ההורים בכניסתם לבית.", answer: `<div style="font-size: 100px;" class='spin'>💫</div>` },
  { question: "כיתה שיש בה הכי הרבה בנות שמקפידות ללמוד 2 הלכות מידי יום בכל תחום שהוא.", answer: `<div style="font-size: 100px;" class='spin'>💫</div>` },
].reverse();

let firstChoosenCard = null;
let canClick = true;

const brushAnimationsStack = [];
const gameSounds = [];

// ------------------------- SELECTORS -------------------------
const START_BUTTON = () => document.getElementById('task-button');
const TASK_MODAL = () => document.getElementById('task-modal');
const WINNER_MODAL = () => document.getElementById('winnerModal');

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
  document.getElementsByClassName('board-container')[0].classList.remove('hidden');
  initializeVehicles();

  // לחיצה על כפתור המשימה
  START_BUTTON().addEventListener('click', showTaskCard);
}

function initGameAfterClick() {
  if (isGameStarted) return;
  isGameStarted = true;

  initTimer();
  if (HAS_BG_MUSIC) {
    gameBgSound.play();
  }
}

function initTimer() {
  if (!HAS_TIMER) return;
  
  let timeInSeconds = GAME_TIMER_MINUTES ? GAME_TIMER_MINUTES * 60 : 0;
  
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
    GAME_TIMER_MINUTES ? timeInSeconds-- : timeInSeconds++;
    
    // Stop the timer when it reaches 0
    if (GAME_TIMER_MINUTES && timeInSeconds < 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0, 0); // Ensure it shows 00:00 at the end
      gameOver();
    }
  }, 1000);
}

function initializeVehicles() {
  obstacles.forEach((obstacle) => {
    const path = document.getElementById(obstacle.pathId);
    if (path) {
      const img = document.createElement("img");
      img.src = obstacle.image;
      img.className = "obstacle";
      img.id = `obstacle-${obstacle.id}`;
      path.appendChild(img);
      img.style.right = `${obstacle.position}%`;  // מיקום רנדומלי
    }
  });
  
  vehicles.forEach((vehicle) => {
    const path = document.getElementById(vehicle.pathId);
    if (path) {
      const vehicleContainer = document.createElement("div");
      vehicleContainer.className = "vehicle";
      vehicleContainer.id = `vehicle-${vehicle.id}`;

      const img = document.createElement("img");
      img.className = "vehicle-img";
      img.src = vehicle.image;

      const logo = document.createElement("div");
      logo.className = "vehicle-logo";
      const logoImg = document.createElement("img");
      logoImg.src = 'assets/logo.png';
      logo.appendChild(logoImg);
      vehicleContainer.appendChild(logo);

      vehicleContainer.appendChild(img);
      path.appendChild(vehicleContainer);
      updateVehiclePosition(vehicle);
    }
  });
}

// ------------------------- GAME EVENTS -------------------------------
async function updateVehiclePosition(vehicle) {
  const speed = vehicle.position === 0 ? 0 : vehicle.speed;
  // path
  const path = document.getElementById(vehicle.pathId);
  const pathWidth = path.offsetWidth;
  // vehicle
  const img = document.getElementById(`vehicle-${vehicle.id}`);
  // obstacle
  const obstacleElement = path.getElementsByClassName('obstacle')[0];
  const obstacleRect = obstacleElement?.getBoundingClientRect();
  const obstacleRight = pathWidth - obstacleRect.left - obstacleRect.width;

  if (!img) return;

  const percentageStep = 100 / (vehicle.steps + 1);
  const percentageRightPosition = vehicle.position * percentageStep;
  const pixelRightPosition = percentageRightPosition / 100 * (pathWidth - img.offsetWidth);
  
  let finalRightPosition = pixelRightPosition;

  if ((finalRightPosition + img.offsetWidth) >= obstacleRight && vehicle.type !== 'motorcycle') {
    finalRightPosition = (obstacleRight - img.offsetWidth) + 15;
    vehicle.stucked = true;
  }

  img.style.transitionDuration = `${speed}s`;
  img.style.right = `${finalRightPosition}px`;

  await animateVehicle(img, vehicle, speed, false, vehicle.position > 0 && !vehicle.stucked);
  if (vehicle.stucked) {
    stuckVehicle(vehicle);
  }
}

async function stuckVehicle(vehicle) {
  const img = document.getElementById(`vehicle-${vehicle.id}`);

  img.classList.add('vehicleCollision');
  await delay(500);
  playGameSound('horn', true, true);
  await delay(4000);
  img.classList.remove('vehicleCollision');
  if (REMOVE_STUCKED_VEHICLE) {
    animateVehicle(img, vehicle, speed, true, false);
  }
}

async function animateVehicle(element, vehicle, speed = 1, infinite = false, needAnimateLogo = false) {
  switch(vehicle.type) {
    case "car":
      element.classList.add('carAnimation');
      break;
    case "truck":
      element.classList.add('truckAnimation');
      break;
    case "bus":
      element.classList.add('busAnimation');
      break;
    case "motorcycle":
      if (vehicle.position === vehicle.steps + 1) {
        element.classList.add('motorcycleAnimation2');
      } else {
        element.classList.add('motorcycleAnimation');
      }
      break;
    default:
      element.style.animation = '';
      break;
  }
  element.style.animationDuration = `${speed}s`;
  
  if (needAnimateLogo) {
    animateLogo(element.querySelector('.vehicle-logo'));
  }

  await delay(speed * 1000);
  element.classList.remove('carAnimation', 'truckAnimation', 'busAnimation', 'motorcycleAnimation', 'motorcycleAnimation2');
  if (infinite) {
    setTimeout(() => {
      animateVehicle(element, vehicle, speed, true);
    }, vehicle.stucked ? 0 : 1000);
  }
}

function animateLogo(logo) {
  logo.style.opacity = '1';
  logo.style.transform = 'scale(1)';

  logo.classList.add('spin');

  setTimeout(() => {
    logo.classList.remove('spin');
    logo.classList.add('flash');

    setTimeout(() => {
      logo.style.opacity = '0';
      logo.style.transform = 'scale(0)';
      logo.classList.remove('flash');
    }, 1000);
  }, 2000);
}

async function moveVehicle(vehicleId) {
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  if (vehicle && vehicle.position <= vehicle.steps) {
    if (vehicle.type === 'motorcycle' && vehicle.position === vehicle.steps - 1) {
      vehicle.position = vehicle.position + 2; 
    } else {
      vehicle.position++;
    }
    await updateVehiclePosition(vehicle);
  }
}

async function showWinner(vehicle) {
  playGameSound('claps')
  const winnerImage = document.getElementById('winnerImage');

  winnerImage.src = vehicle.image;
  winnerImage.classList.add('vehicleDance');

  const vehicleElement = document.getElementById(`vehicle-${vehicle.id}`);
  vehicleElement.classList.add('vehicleDance');

  await delay(4000);
  vehicleElement.classList.remove('vehicleDance');
  WINNER_MODAL().classList.add('active');
  hideElement(START_BUTTON());
}

// ------------------------- LOGIC ------------------------------------


// ------------------------ ACTIONS -----------------------------------
async function showTaskCard() {
  playGameSound('tada');
  await delay(1000);

  const taskText = document.getElementById('task-text');
  TASK_MODAL().classList.add('active');

  hideElement(START_BUTTON());
  const vehiclesContainer = document.querySelector('.vehicles-container');

  const { question, answer } = tasks.pop();
  if (tasks.length === 0) {
    START_BUTTON().remove();
  }
  
  // text
  taskText.innerHTML = question;
  taskText.classList.remove('flash');


  // task.split(' ').forEach((word, index) => {
  //   const span = document.createElement('span');
  //   span.textContent = word;
  
  //   if (index !== task.split(' ').length - 1) {
  //     span.textContent += ' ';
  //   }
  
  //   span.style.display = 'inline-block'; // מאפשר אנימציות על המילה
  //   span.style.opacity = 0; // הסתר את המילה בהתחלה
  //   span.style.animation = `
  //     fall 0.8s ${index * 0.3}s ease-out forwards
  //   `;
  //   taskText.appendChild(span);
  // });
  
  const textAnimationDuration = 0; //task.split(' ').length * 300 + 800;
  // vehicles
  vehiclesContainer.innerHTML = '';
  vehicles.filter(v => !REMOVE_STUCKED_VEHICLE || !v.stucked).forEach(async vehicle => {
    const img = document.createElement('img');
    img.classList.add('vehicle-button')
    img.src = vehicle.image;
    img.alt = vehicle.type;
    img.style.opacity = 0;
    img.addEventListener('click', async () => {
      document.querySelectorAll('.vehicles-container img').forEach(e => {
        e.style.animation = 'none';
        e.style.opacity = 0.3;
      });
      img.style.animation = '';
      img.style.opacity = 1;
      playGameSound('claps2')

      taskText.style.visibility = 'hidden';
      taskText.classList.remove('flash');
      await delay(1000);
      taskText.style.visibility = 'visible';
      taskText.classList.add('flash');
      taskText.innerHTML = answer;
      await delay(RESET_AFTER_SUCCESS_MATCH);

      handleVehicleClick(vehicle)
      TASK_MODAL().classList.remove('active');
    });
    vehiclesContainer.appendChild(img);

    setTimeout(() => {
      img.style.transition = `opacity ${textAnimationDuration / 1000}s ease`;
      img.style.opacity = 1;
    }, 10);

    setTimeout(async () => {
      await delay(Math.random() * 4 * 500);
      animateVehicle(img, vehicle, 1, true);
    }, textAnimationDuration);
  });

  await delay(textAnimationDuration);
  taskText.classList.add('flash');
  resetBgVolume();
}

async function handleVehicleClick(vehicle) {
  if (vehicle.stucked) {
    await stuckVehicle(vehicle);
    showElement(START_BUTTON());
    resetBgVolume();
    return;
  }

  playGameSound('claps2');
  const allVehicles = document.querySelectorAll('.vehicle, .obstacle');
  allVehicles.forEach(v => {
    v.style.transition = "all 1s ease";
    v.style.opacity = 0.5;
  });
  const vehicleElement = document.getElementById(`vehicle-${vehicle.id}`);
  vehicleElement.style.opacity = 1;

  // animation before move
  vehicleElement.style.transform = "scale(1.2)";
  await delay(ANIMATION_BEFORE_MOVE_DURATION/4*3);
  allVehicles.forEach(vehicle => {
    vehicle.style.opacity = 1;
  });
  vehicleElement.style.transform = "scale(1)";
  await delay(ANIMATION_BEFORE_MOVE_DURATION/4);

  // move
  vehicleElement.style.transition = "";
  playGameSound('car-pass-by');
  await moveVehicle(vehicle.id);
  if (vehicle.position >= vehicle.steps) {
    showWinner(vehicle);
  }
  
  await delay(DELAY_AFTER_STEP_BEFORE_BUTTON_APPEAR);
  showElement(START_BUTTON());
  resetBgVolume();
}

async function playGameSound(type, pauseOther = true, playTwice = false) {
  if (pauseOther) {
    gameSounds.forEach(sound => sound.pause());
  }
  lowerBgVolume();

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
    case 'tada':
      path = './sounds/tada.mp3';
      break;
    case 'click':
      path = './sounds/click3.mp3';
      break;
    case 'car-pass-by':
      path = './sounds/car-pass-by.mp3';
      break;
    case 'horn':
      path = './sounds/horn.mp3';
      break;
    default:
      break;
  }

  var audio = new Audio(path);
  audio.volume = volume;

  // Play the sound
  audio.play();
  gameSounds.push(audio);

  // If playTwice is true, play again after the first playback ends
  if (playTwice) {
    audio.addEventListener('ended', () => {
      var secondAudio = new Audio(path);
      secondAudio.volume = volume;
      secondAudio.play();
      gameSounds.push(secondAudio);
      resetBgVolume();
    });
  }
}

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

function baseLayout() {
  if (!HAS_TIMER) {
    document.querySelector('.timer-container').remove();
  }
}

function animateElement(element) {
  element.classList.add('animated');
}

function removeElementAnimation(element) {
  element.classList.remove('animated');
}

function hideElement(element) {
  element.classList.add('hidden');
}

function showElement(element) {
  element.classList.remove('hidden');
}

genereateBrushAnimations();
baseLayout();

initializeGame();

document.addEventListener('click', () => {
  initGameAfterClick();
});