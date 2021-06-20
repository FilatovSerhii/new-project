let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $result = document.querySelector('#result');
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $gameTime = document.querySelector('#game-time');

let colors = ['red', 'blue', 'green', 'yellow', 'pink'];
let score = 0; //переменная для подсчета очков
let isGameStarted = false;

$start.addEventListener('click', startGame); //прослушивание события по клику => запуск игры
$game.addEventListener('click', handelBoxClick); // прослушка события на весь блок game
$gameTime.addEventListener('input', setGameTime);

function show($el) {
  $el.classList.remove('hide');
}

function hide($el) {
  $el.classList.add('hide');
}

function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute('disabled', 'true'); //блокировка изменения времени во время игры

  isGameStarted = true;
  $game.style.backgroundColor = '#fff'; /// белый фон
  hide($start);
  let interval = setInterval(function () {
    let time = parseFloat($time.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
}
// счет игры
function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($resultHeader);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute('disabled');
  show($start);
  $game.innerHTML = '';
  $game.style.backgroundColor = '#ccc';
  hide($timeHeader);
  show($resultHeader);
}

// функция клик по квадрату
function handelBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset) {
    score++; // увеличиваем счет на единицу
    renderBox(); // если нажили на квадрат, то рендерим новый
  }
}

// функция для рендеринга квадратов
function renderBox() {
  $game.innerHTML = ''; //очищаем содержимое контейнера game, иначе квадраты будут дублироваться и оставаться на зачальном месте

  let box = document.createElement('div');
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect(); // задаем переменную определяющую размер холста
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  let randomColorIndex = getRandom(0, colors.length); //

  box.style.height = box.style.width = boxSize + 'px'; // задаем размеры квадрата
  box.style.position = 'absolute'; // расположение бокса вычесляется относительно границ заданного квадрата
  box.style.backgroundColor = colors[randomColorIndex];
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer'; // что бы пользователь понималб что по данному элементу можно сделать клик
  box.setAttribute('data-box', 'true'); // атрибут для проверки в функции handelBoxClick, является ли єто квадратом или нет

  $game.insertAdjacentElement('afterbegin', box); // Помещаем объект box в єлемент game, insertAdjacentElemen(позиция - сразу после открытия тега element ,сам элемент - box)
}

//
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
