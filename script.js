'use strict';

// Selecting elements

const player0Elm = document.querySelector('.player--0');
const player1Elm = document.querySelector('.player--1');
const score0Elm = document.querySelector('#score--0');
const score1Elm = document.getElementById('score--1');
const current0Elm = document.getElementById('current--0');
const current1Elm = document.getElementById('current--1');
const diceElm = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



//Starting conditions
diceElm.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function() {
    score0Elm.textContent = 0;
    score1Elm.textContent = 0;
    current0Elm.textContent = 0;
    current1Elm.textContent = 0;
    player0Elm.classList.remove('player--winner');
    player1Elm.classList.remove('player--winner');
    player0Elm.classList.add('player--active');
    player1Elm.classList.remove('player--active');
}

const switchPlayer = function() {

    //Switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    //Changing the active class for players
    player0Elm.classList.toggle('player--active');
    player1Elm.classList.toggle('player--active');
}


btnRoll.addEventListener('click', function() {
    //1. Generate a random dice roll
    if(playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display dice
        diceElm.classList.remove('hidden');
        diceElm.src = `dice-${dice}.png`;

        //3. Check for roll 1: if true, switch player
        if(dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if(playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        //2. Check if player's score is >=100
        //Finish game
        if(scores[activePlayer] >= 100) {
            playing = false;
            console.log(`player--${activePlayer} has won.`)
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        //Switch to the next player
        switchPlayer();
    }
});

btnNew.addEventListener('click', init());