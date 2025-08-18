let winStatusDisplay = document.querySelector('.win-status');
let usrScore = 0;
let usrScoreDisplay = document.querySelector('#user-score');
let computerScore = 0;
let computerScoreDisplay = document.querySelector('#computer-score')
let roundDisplay = document.querySelector('#round');
const playAgainSec = document.querySelector('.play-again');
const playBtn = document.querySelector('#play-btn');
const welcomeSec = document.querySelector('.welcome');
const greeting = document.querySelector('.greeting');
const nameInp = document.querySelector('.name-inp-container');

let round; //take user input
let r;

let history = [];

// if the player have entered their name before, remove the input field,
// load thier name from local storage, and greet them. 
// ask their name otherwise
function greeter() {
    if (localStorage.getItem('name')) {
        greeting.style.display = 'block';
        nameInp.style.display = 'none';
        document.querySelector('.usr-name-display').textContent = localStorage.getItem('name');
        document.querySelector('.greeting-container h1').textContent = 'WELCOME BACK✨';
    } else {
        greeting.style.display = 'none';
        nameInp.style.display = 'block';
    }
}
greeter();

function nameRecorder(name) {
    localStorage.setItem('name', name);
}

playBtn.addEventListener('click', () => {
    const usrName = document.querySelector('#usr-name').value;
    if (usrName) nameRecorder(usrName);
    const radio = document.querySelector('input[name="round-inp"]:checked');
    round = radio ? radio.value : 5;
    r = round;
    welcomeSec.style.display = 'none';
    roundDisplay.textContent = round;
});

function generateInput() {
    const bascket = ['rock', 'paper', 'scissors'];
    const min = 0;
    const max = 2;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return bascket[num];
}

function determineWinner(usrInput, computerInput) {
    let winner;
    if (usrInput === computerInput) winner = 'tie';
    
    else if (
        usrInput === 'rock' && computerInput === 'scissors' ||
        usrInput === 'paper' && computerInput === 'rock' ||
        usrInput === 'scissors' && computerInput === 'paper'
    ) { winner =  'user'; }

    else winner = 'computer';

    // for the floating +10 animation
    if (winner != 'tie') {
        const bonus = document.querySelector(`.bonus.${winner}`); //to pick on which side to perform the animation on
        bonus.animate(
            [
                {opacity: 1},
                {opacity: 0, transform: 'translateY(-16rem)'}
            ],
            {
                duration: 1600,
                iterations: 1,
                easing: 'ease',
            }
        );
        
    }
    return winner;
}

function inputDisplayer(usrInp, compInp) {
    const usrInputBuff = {
        rock: './images/hand-rock-to-left.PNG',
        paper: './images/hand-paper-to-left.PNG',
        scissors: './images/hand-scr-to-left.PNG'
    }

    const computerInputBuff = {
        rock: './images/hand-rock-to-right.PNG',
        paper: './images/hand-paper-to-right.PNG',
        scissors: './images/hand-scr-to-right.PNG'
    }

    let usrInpDisplay = document.querySelector('#user-input img');
    let computerInpDisplay = document.querySelector('#computer-input img');
    
    usrInpDisplay.setAttribute('src', usrInputBuff[usrInp]);
    computerInpDisplay.setAttribute('src', computerInputBuff[compInp]);
}

function reset() {
    r = round;
    roundDisplay.textContent = r;
    usrScore = 0;
    usrScoreDisplay.textContent = usrScore;
    computerScore = 0;
    computerScoreDisplay.textContent = computerScore;
    winStatusDisplay.textContent = 'Good Luck!';
    playAgainSec.style.display = 'none';
}

function hardReset() {
    greeter();
    roundDisplay.textContent = '_';
    usrScore = 0;
    usrScoreDisplay.textContent = usrScore;
    computerScore = 0;
    computerScoreDisplay.textContent = computerScore;
    winStatusDisplay.textContent = 'Good Luck!';
    playAgainSec.style.display = 'none';
    welcomeSec.style.display = 'flex';
}

const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scrBtn = document.getElementById('scr');

rockBtn.addEventListener('click', () => {
    main('rock');
});
paperBtn.addEventListener('click', () => {
    main('paper');
});
scrBtn.addEventListener('click', () => {
    main('scissors');
});

const playAgainBtn = document.querySelector('#play-again-btn');
const toHomeBtn = document.querySelector('#to-home-btn');

playAgainBtn.addEventListener('click', reset);
toHomeBtn.addEventListener('click', hardReset);

function main(usrInp) {
    const genInp = generateInput();
    const winner = determineWinner(usrInp, genInp);

    inputDisplayer(usrInp, genInp);

    if (winner === 'user') {
        winStatusDisplay.textContent  = 'WIN';
        usrScore += 10;
        usrScoreDisplay.textContent =  usrScore;
    }

    else if (winner === 'computer') {
        winStatusDisplay.textContent = 'LOSE';
        computerScore += 10;
        computerScoreDisplay.textContent = computerScore;
    }
        
    else winStatusDisplay.textContent = 'TIE';

    // the end of a game with 7 rounds
    if (r === 1) {
        setTimeout(() => {
            playAgainSec.style.display = 'flex';
        }, 300);

        let stat = {};
        stat['user'] = usrScore;
        stat['computer'] = computerScore;

        const winStatusFinal = document.querySelector('.play-again h1');

        if (usrScore > computerScore) {
            winStatusFinal.textContent = 'Congrats, You have WON!!!🎉';
            stat['status'] = 'WIN';
        }
        else if (usrScore < computerScore) {
            winStatusFinal.textContent = 'Oops, You have LOST!!!😢';
            stat['status'] = 'LOSE';
        }
        else {
            winStatusFinal.textContent = 'Nice try, it was a TIE.👍';
            stat['status'] = 'TIE';
        }

        history.push(stat);

        const compFinalScoreOutput = document.querySelector('#c-final-output');
        const usrFinalScoreOutput = document.querySelector('#u-final-output');

        compFinalScoreOutput.textContent = computerScore;
        usrFinalScoreOutput.textContent = usrScore;
    }    
    r--;
    roundDisplay.textContent = r;
}
