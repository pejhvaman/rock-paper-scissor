'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btns = document.querySelectorAll('.btn');
const state0Btn = document.querySelector('.state--0');
const state1Btn = document.querySelector('.state--1');
const stateEl = document.querySelector('.state');
const playersEl = document.querySelectorAll('.player');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const resetBtn = document.querySelector('.reset');
const timeoutBar = document.querySelector('.timeout');

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

let currentScores, scores, limit, play;

const init = function () {
  currentScores = [0, 0];
  currentScore1.textContent = 0;
  currentScore1.textContent = 0;
  // currentPlayer = 0;
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  limit = 3;
  play = true;
  console.log(play);
  state0Btn.src = 'rock.png';
  state1Btn.src = 'scissor.png';
  player1El.classList.remove('player--wins');
  playersEl.forEach(p => p.classList.remove('player--winner'));
  player0El.classList.add('player--wins');
  btns.forEach(b => b.classList.remove('btn--active'));
  btns[0].classList.add('btn--active');
  stateEl.classList.remove('state--hidden');
  stateEl.innerHTML = `"Start the game by picking"... <br />
        You have ${limit} shots.
        <span class="timeout"></span>`;
  const removeResult = function () {
    stateEl.classList.add('state--hidden');
  };
  window.addEventListener('load', function () {
    // timeoutBar.style.animationName = 'timeoutBar';
    // timeoutBar.style.animationDuration = '3s';
    // timeoutBar.style.animationTimingFunction = 'linear';
    setTimeout(removeResult, 3000);
  });
};

init();

const gameMap = new Map([
  [0, 'rock'],
  [1, 'paper'],
  [2, 'scissor'],
]);

const thisPlayerWins = function (thisPlayer) {
  playersEl.forEach(p => p.classList.remove('player--wins'));
  document
    .querySelector(`.player--${thisPlayer}`)
    .classList.add('player--wins');
  currentScores[thisPlayer]++;
  scores[thisPlayer]++;
  document.querySelector(`#current--${thisPlayer}`).textContent =
    currentScores[thisPlayer];
  document.querySelector(`#score--${thisPlayer}`).textContent =
    scores[thisPlayer];
  currentScores[thisPlayer === 0 ? 1 : 0] = 0;
  document.querySelector(`#current--${thisPlayer === 0 ? 1 : 0}`);
  showResult(`${thisPlayer === 0 ? 'You win' : 'The system wins'}`);
};

const handlePicks = btn => {
  btn.classList.add('btn--active');
  //set state for player
  const src = btn.getAttribute('src');
  state0Btn.src = src;

  //make random play for system
  const randomPlay = gameMap.get(randInt(0, 2));
  // console.log('random play:', randomPlay);
  state1Btn.src = `${randomPlay}.png`;
  //handlePicks
  btn.classList.contains('btn--rock') && handleRock(randomPlay);

  btn.classList.contains('btn--paper') && handlePaper(randomPlay);

  btn.classList.contains('btn--scissor') && handleScissor(randomPlay);
};

const showResult = function (message) {
  stateEl.classList.remove('state--hidden');
  stateEl.textContent = message;
};

const handleRock = randomPlay => {
  //compare random play with player's choice
  randomPlay === 'rock' && showResult('Pick again.');
  randomPlay === 'scissor' && thisPlayerWins(0);
  randomPlay === 'paper' && thisPlayerWins(1);
};

const handlePaper = randomPlay => {
  randomPlay === 'rock' && thisPlayerWins(0);
  randomPlay === 'scissor' && thisPlayerWins(1);
  randomPlay === 'paper' && showResult('Pick again.');
};

const handleScissor = randomPlay => {
  randomPlay === 'rock' && thisPlayerWins(1);
  randomPlay === 'scissor' && showResult('Pick again.');
  randomPlay === 'paper' && thisPlayerWins(0);
};

const gameWinner = player => {
  document.querySelector(`.player--${player}`).classList.add('player--winner');
  stateEl.textContent = `${
    player === 0 ? 'You win' : 'The system wins'
  } the game.`;
};

//handlers
player0El.addEventListener('click', function (e) {
  e.preventDefault();
  if (scores[0] < limit && scores[1] < limit) {
    // console.log(scores);
    if (e.target.classList.contains('btn')) {
      //display result
      stateEl.classList.add('state--hidden');

      const btn = e.target;
      handlePicks(btn);
    }
  }
  if (scores[0] === limit) {
    play = false;
    console.log(play);
    gameWinner(0);
  }

  if (scores[1] === limit) {
    play = false;
    gameWinner(1);
  }
});

resetBtn.addEventListener('click', function () {
  if (play === false) init();
});

player0El.addEventListener('click', function (e) {
  //picking effect

  if (e.target.classList.contains('btn') && play === true) {
    btns.forEach(b => b.classList.remove('btn--active'));
    e.target.classList.add('btn--active');
  }
  if (play === false) {
    //reset message
    showResult('Reset the game to play again.');
  }
});
