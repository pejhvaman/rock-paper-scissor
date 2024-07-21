'use strict';

const body = document.body;
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

let currentPlayer,
  currentScores,
  scores,
  limit,
  play,
  messageTimer,
  initStatesTimer,
  removeCheerUpTimer,
  encourageTimer;

const gameMap = new Map([
  [0, 'rock'],
  [1, 'paper'],
  [2, 'scissor'],
]);

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const messageTimeout = function (content) {
  const removeResult = () => stateEl.classList.add('state--hidden');

  // window.addEventListener('load', function () {
  stateEl.classList.remove('state--hidden');
  stateEl.innerHTML = `${content} 
    <span class="timeout"></span>`;
  if (messageTimer) clearTimeout(messageTimer);
  messageTimer = setTimeout(removeResult, 2000);
  // });
};

const animeStates = function () {
  const initStates = function () {
    state0Btn.classList.remove('state-active');
    state1Btn.classList.remove('state-active');
  };
  if (initStatesTimer) clearTimeout(initStatesTimer);
  initStatesTimer = setTimeout(initStates, 1000);
};

const init = function () {
  currentScores = [0, 0];
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  currentPlayer = 0; //for 0 and 1s in code
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  limit = 3;
  play = true;
  state0Btn.src = 'rock.png';
  state0Btn.classList.add('state-active');
  state1Btn.src = 'scissor.png';
  state1Btn.classList.add('state-active');
  animeStates();
  player1El.classList.remove('player--wins');
  playersEl.forEach(p => p.classList.remove('player--winner'));
  player0El.classList.add('player--wins');
  btns.forEach(b => b.classList.remove('btn--active'));
  btns[0].classList.add('btn--active');
  messageTimeout(`"Start the game by picking"... <br />
      You have ${limit} shots.`);
};

init();

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
  messageTimeout(`${thisPlayer === 0 ? 'You win' : 'The system wins'}`);
};

const handlePicks = btn => {
  btn.classList.add('btn--active');
  //set state for player
  const src = btn.getAttribute('src');
  state0Btn.src = src;
  state0Btn.classList.add('state-active');
  //make random play for system
  const randomPlay = gameMap.get(randInt(0, 2));
  state1Btn.src = `${randomPlay}.png`;
  state1Btn.classList.add('state-active');
  //handlePicks
  btn.classList.contains('btn--rock') && handleRock(randomPlay);

  btn.classList.contains('btn--paper') && handlePaper(randomPlay);

  btn.classList.contains('btn--scissor') && handleScissor(randomPlay);

  animeStates();
};

const handleRock = randomPlay => {
  //compare random play with player's choice
  randomPlay === 'rock' && messageTimeout('Pick again.');

  if (randomPlay === 'scissor') {
    currentPlayer = 0;
    thisPlayerWins(currentPlayer);
    showCheerUp();
  }
  if (randomPlay === 'paper') {
    currentPlayer = 1;
    thisPlayerWins(currentPlayer);
  }
};

const handlePaper = randomPlay => {
  if (randomPlay === 'rock') {
    currentPlayer = 0;
    thisPlayerWins(currentPlayer);
    showCheerUp();
  }
  if (randomPlay === 'scissor') {
    currentPlayer = 1;
    thisPlayerWins(currentPlayer);
  }

  randomPlay === 'paper' && messageTimeout('Pick again.');
};

const handleScissor = randomPlay => {
  if (randomPlay === 'rock') {
    currentPlayer = 1;
    thisPlayerWins(currentPlayer);
  }

  randomPlay === 'scissor' && messageTimeout('Pick again.');

  if (randomPlay === 'paper') {
    currentPlayer = 0;
    thisPlayerWins(currentPlayer);
    showCheerUp();
  }
};

const gameWinner = player => {
  document.querySelector(`.player--${player}`).classList.add('player--winner');
  messageTimeout(`${player === 0 ? 'You win' : 'The system wins'} the game.
    Reset to play again.`);
};

const showCheerUp = function () {
  const cheerUpHtml = `<lottie-player
      src="https://lottie.host/32d2a61c-de76-45b4-826e-85adf44a6c81/6Zrusgld2f.json"
      speed="1"
      autoplay
      direction="1"
      mode="normal"
      class="cheer-up"
    ></lottie-player>`;

  body.insertAdjacentHTML('afterbegin', cheerUpHtml);

  const cheerUpEl = document.querySelector('.cheer-up');

  const removeCheerUp = function () {
    cheerUpEl.remove();
  };
  if (removeCheerUpTimer) clearTimeout(removeCheerUpTimer);
  removeCheerUpTimer = setTimeout(removeCheerUp, 2000);
};

const showWinnerCheerUp = function () {
  const encourageHtml = `<lottie-player
  src="https://lottie.host/6f392f50-ad14-4c0a-9645-471d2b8937e0/lBK446XqNF.json"
  background="transparent"
  speed="1"
  autoplay
  direction="1"
  mode="normal"
  class="encourage"
></lottie-player>`;
  player0El.insertAdjacentHTML('afterbegin', encourageHtml);
  const encourageEl = document.querySelector('.encourage');
  const removeEncourage = function () {
    encourageEl.remove();
  };
  if (encourageTimer) clearTimeout(encourageTimer);
  encourageTimer = setTimeout(removeEncourage, 2000);
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

  if (scores[currentPlayer] === limit) {
    gameWinner(currentPlayer);
    if (currentPlayer === 0) showWinnerCheerUp();
    play = false;
  }
});

resetBtn.addEventListener('click', function () {
  if (play === false) init();
});

player0El.addEventListener('click', function (e) {
  //picking effect
  btns.forEach(b => b.classList.remove('btn--active'));
  if (e.target.classList.contains('btn') && play === true) {
    e.target.classList.add('btn--active');
  }
});
