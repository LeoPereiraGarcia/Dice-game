'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //Another way of selecting elements with IDs
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden'); //In order to remove the dice,we first created the ".hidden" style in CSS so we could manipulate here.

let scores = [0, 0]; //This are the final scores of both players(in the page the ones under player 1 and player 2)

let currentScore = 0; //This variable can't be inside the function because if we put inside everytime we click the button it will set to 0

let activePlayer = 0; //is set at 0 for player 1 and 1 for player 2 since arrays are 0 based, so it's convenient to do it that way

let playing = true; // In order to solve the problem of stop playing once a player wins, we create a variable that holds the state of the game (boolean). So if the game is playing we can click the "roll dice" and "hold" buttons, but as soon the game is finishes we can't play and therefore click the buttons

const startGame = function () {
  //VISIBLE PART SET TO 0

  //Set all scores to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  //First we need to remove the active class in player 1 only since we need to set player 0 as the starting (active( one))

  player1El.classList.remove('player--active');
  document;

  //W have to remove both classes as we don't know  which player won (even if we know the active class is only going to be on one player, we can still tell JS to remove a class even if it's not there and it won't be a problem)
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  //Remove dice
  diceEl.classList.add('hidden');
  //Set player 1 as starting player
  player0El.classList.add('player--active');
  document;

  //INTERNAL PART SET TO 0
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //when it hits 0, the current player's score goes to 0

  //Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0; //Switching player 0 to 1 or viceversa

  currentScore = 0;

  player0El.classList.toggle('player--active'); //this property of classList adds the class if it's not there and if it is there will remove it.
  player1El.classList.toggle('player--active');
};

//User rolls dice ---Rolling dice functionality---

btnRoll.addEventListener('click', function () {
  if (playing) {
    //we don't need to write a condition here because playing itself is already a boolean variable

    //1-Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2- Display the dice(we use a new element "src" to manipulate the images of HTML)
    diceEl.classList.remove('hidden');

    diceEl.src = `dice-${dice}.png`; //with this we can dinamically upload any of the 6 images depending of the random number

    //3- Check for rolled 1, if true switch to next player

    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice; //currentScore=currentScore + dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//User holds score ---Holding current score functionality---

btnHold.addEventListener('click', function () {
  if (playing) {
    //1-Add current score to active's player score

    scores[activePlayer] += currentScore; //ej: scores[1]=scores[1]+currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2- Check if player's score >=100, if so finish the game

    if (scores[activePlayer] >= 100) {
      //Finish the game, player wins
      playing = false; //Once the code hits this line, the game will stop because playing will ne now set to false therefore both "roll dice" and "hold" buttons will not execute their code.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      //3- Switch to next player
      switchPlayer();
    }
  }
});

// User resets game ---new game functionalitty---

btnNew.addEventListener('click', startGame); //we don't need to call the 'startGame" function here, it will be JS who call it
