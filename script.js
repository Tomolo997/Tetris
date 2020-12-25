'use strict';
//we take the grid and save it in a gridLayout variable
let gridLayout = document.querySelector('.gridLayout');

for (let i = 0; i < 360; i++) {
  let gridItem = document.createElement('div');
  gridItem.classList.add('gridItem');
  gridLayout.appendChild(gridItem);
}
for (let i = 0; i < 15; i++) {
  let gridItem = document.createElement('div');
  gridItem.classList.add('taken');
  gridLayout.appendChild(gridItem);
}
//Izbrali squarese, torej squares so eno polje po eno
//we build an array of divs in gridLayout and name it squares
let squares = Array.from(gridLayout.querySelectorAll('div'));

//tetraminoes
const width = 15;

//l tetraminoes
const lTetramino = [
  //each index in lTetramino is just an rotated Tetramino
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],

  [1, width + 1, width * 2 + 1, width * 2],

  [width * 2 + 2, width * 2 + 1, width * 2, width],
];
const zTetramino = [
  [width + 1, width + 2, width * 2 + 1, width * 2],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2 + 1, width * 2],
  [0, width, width + 1, width * 2 + 1],
];

const tTetramino = [
  [1, width + 1, width + 2, width],
  [width * 2 + 1, width, width + 1, width + 2],
  [1, width + 1, width * 2 + 1, width + 2],
  [1, width + 1, width * 2 + 1, width],
];

const oTetramino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetramino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const Tetraminoes = [
  lTetramino,
  zTetramino,
  tTetramino,
  oTetramino,
  iTetramino,
];

//where we want to start drawing
let currentPosition = 4;
let currentRotation = 0;
//randomly selecting the tetraminoes
let number = Math.floor(Math.random() * Tetraminoes.length);

//pick a tetramino and first rotation
//first tetramino in tetraminoes array
//the current shape is the l tetramino with first rotation
let current = Tetraminoes[number][currentRotation];
console.log(current);

function control(e) {
  if (e.keyCode === 37) {
    leftMove();
  } else if (e.keyCode === 39) {
    rightMove();
  } else if (e.keyCode === 38) {
    rotate();
  }
}

document.addEventListener('keyup', control);
let nextRandom = 0;
//draw the first rotaiton in the first tetramino
function draw() {
  //vsako koordinato tetraminosa pofarbamo
  current.forEach(index => {
    //v velikem arrayu squarese pobarvamo tetramino
    //koordinata vsakega indexa tetraminoja je
    //trenutna pozicija + vska index
    //torej ta funkcija gre 4 krat skozi in dodaja vsakemu squaru classo tetramino
    squares[currentPosition + index].classList.add('tetramino');
  });
}

//undraw the tetraunib
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetramino');
  });
}

//timer IDS, set Interval
//move down every second
let timerID = setInterval(moveDown, 100);
function moveDown() {
  //removaj class
  undraw();
  //current pozicijo postavi za eno widht doj
  currentPosition += width;
  draw();
  freeze();
}

//frezze functon
function freeze() {
  //if any of the current indexes containt taken , width => we are checking one space down
  if (
    current.some(index =>
      squares[currentPosition + index + width].classList.contains('taken')
    )
  ) {
    current.forEach(index =>
      squares[currentPosition + index].classList.add('taken')
    );
    number = nextRandom;
    //Start a new tetramino
    nextRandom = Math.floor(Math.random() * Tetraminoes.length);
    current = Tetraminoes[number][currentRotation];
    currentPosition = 4;
    draw();
    displaySquaresFunction();
  }
}

//setting the boandries to the grid

//left boundary
function leftMove() {
  undraw();
  //what is the left EDGE
  const leftEdge = current.some(
    // če je katerikoli element na robu returnaj true
    //na robu pa je če je trenutna pozicija + index na levem
    index => (currentPosition + index) % width === 0
  );
  //če ni na levem robu potem, pomakni eno polje nazaj ali levo
  if (!leftEdge) {
    currentPosition -= 1;
  }
  if (
    current.some(index =>
      squares[currentPosition + index].classList.contains('taken')
    )
  ) {
    currentPosition += 1;
  }

  draw();
}

function rightMove() {
  undraw();
  //what is the left EDGE
  const rightEdge = current.some(
    index => (currentPosition + index) % width === width - 1
  );
  //če ni na levem robu potem, pomakni eno polje nazaj ali levo
  if (!rightEdge) {
    currentPosition += 1;
  }
  if (
    current.some(index =>
      squares[currentPosition + index].classList.contains('taken')
    )
  ) {
    currentPosition -= 1;
  }

  draw();
}

//roting the tetramino

function rotate() {
  undraw();
  currentRotation++;
  if (currentRotation === current.length) {
    currentRotation = 0;
  }
  current = Tetraminoes[number][currentRotation];
  draw();
}

//mini grid
const displaySquares = document.querySelectorAll('.miniGrid div');
console.log(displaySquares);
const displayWidth = 4;
let displyIndex = 0;

const upNextTetrimonoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], //ltetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //ztetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], //ttetromino
  [0, 1, displayWidth, displayWidth + 1], //otetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //itetromino
];

function displaySquaresFunction() {
  displaySquares.forEach(square => {
    square.classList.remove('tetramino');
  });
  upNextTetrimonoes[nextRandom].forEach(index => {
    displaySquares[displyIndex + index].classList.add('tetramino');
  });
}
