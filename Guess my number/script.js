'use strict';

const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
let messageText = document.querySelector('.message');
const scoreText = document.querySelector('.score');
const highscoreDisplay = document.querySelector('.highscore');
let score;
let highScore = 0;
let number;
let body = document.querySelector('body');
let numberDiv = document.querySelector('.number');
let difficultyLevel;


checkBtn.addEventListener('click', function() {
    let guess = document.querySelector('.guess').value;


    if (!guess) {
        displayMessage('⛔ No number!');
    }

    else if (guess != number) {
        if (score > 1) {
            decScore();
            displayMessage(guess > number ? '📈Too high!' : '📉 Too low!');
        } else {
            lostGame();
        }
    }

    else if (number == guess) {
        displayMessage('🎉 Correct number!');
        disableCheckBtn();
        if (highScore < score) {
            highScore = score;
            highscoreDisplay.textContent = score;
        }
        changeBCcolor('#60b347');
        numberDiv.style.width = '30rem';
        numberDiv.textContent = guess;
    }
});


againBtn.addEventListener('click', newNumber);


function decScore() {
    score = score - 20 / difficultyLevel;
    scoreText.textContent = score;
}


function lostGame() {
    displayMessage('💥 You lost the game! ');
    disableCheckBtn();
    scoreText.textContent = 0;
    changeBCcolor('#970119');
}


function newNumber() {
    numberDiv.textContent = '?';
    numberDiv.style.width = '15rem';
    document.querySelector('.guess').value = '';
    checkBtn.disabled = false;
    checkBtn.classList.remove('disabled');
    number = Math.floor(Math.random() * 20 + 1);

    score = 20;
    scoreText.textContent = score;
    displayMessage('Start Guessing... ');
    changeBCcolor('#222');
}

function disableCheckBtn() {
    checkBtn.disabled = true;
    checkBtn.classList.add('disabled');
}


function displayMessage(message) {
    messageText.textContent = message;
}


function changeBCcolor(color) {
    body.style.backgroundColor = color;
}


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModals = document.querySelectorAll('.show-modal');
const difficultyOptions = document.querySelectorAll('.difficulty');
const startBtn = document.querySelector('.start');

for (let i = 0; i < btnsOpenModals.length; i++) {
    btnsOpenModals[i].addEventListener('click', function() {
        removeHidden(modal);
        removeHidden(overlay);
    });
}

startBtn.addEventListener('click', cooseDifficulty);

btnCloseModal.addEventListener('click', cooseDifficulty);
overlay.addEventListener('click', cooseDifficulty);

function cooseDifficulty() {
    addHidden(modal);
    addHidden(overlay);
    for (let i = 0; i < difficultyOptions.length; i++) {
        if (difficultyOptions[i].checked) {
            switch (difficultyOptions[i].value) {
                case 'easy':
                    {
                        difficultyLevel = 20;
                        break;
                    }
                case 'medium':
                    {
                        difficultyLevel = 10;
                        break;
                    }
                case 'hard':
                    {
                        difficultyLevel = 5;
                        break;
                    }
            }
            newNumber();
        }
    }
}

function removeHidden(element) {
    element.classList.remove('hidden');
}

function addHidden(element) {
    element.classList.add('hidden');
}