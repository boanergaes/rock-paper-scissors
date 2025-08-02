let usrInput = document.querySelector('#input');
let winStatusDisplay = document.querySelector('.win-status');
let usrScore = 0;
let usrScoreDisplay = document.querySelector('#user-score');
let computerScore = 0;
let computerScoreDisplay = document.querySelector('#computer-score')
let goBtn = document.querySelector('#go-btn');
let roundDisplay = document.querySelector('#round-display');

const bascket = ['Rock', 'Paper', 'Scissors'];
const round = 5; //take user input perhaps

function generateNumber() {
    const min = 1;
    const max = 3;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function determineWinner(usrInput, computerInput) {
    if (usrInput === computerInput) return 'tie';
    
    else if (
        usrInput === 1 && computerInput === 3 ||
        usrInput === 2 && computerInput === 1 ||
        usrInput === 3 && computerInput === 2
    ) { return 'user'; }

    else return 'computer';
}

function inputDisplayer(usrNum, genNum) {
    let usrInpDisplay = document.querySelector('#user-input');
    let computerInpDisplay = document.querySelector('#computer-input');
    
    usrInpDisplay.textContent = bascket[usrNum - 1];
    computerInpDisplay.textContent = bascket[genNum - 1];
}

let r = round;
goBtn.addEventListener('click', () => {
    if (usrInput.value === '') {
        alert('Enter 1(rock), 2(paper), 3(scissors) to play')
        return;
    }
    const usrNum = parseInt(usrInput.value);
    if (usrNum < 1 || usrNum > 3) {
        alert('Please make sure you enter a number between 1 and 3');
        return;
    }

    const genNum = generateNumber();

    inputDisplayer(usrNum, genNum)

    const winner = determineWinner(usrNum, genNum);

    if (winner  === 'tie') {
        winStatusDisplay.textContent = 'TIE';
    }
    else if (winner === 'user') {
        winStatusDisplay.textContent = 'WIN';
        usrScore++;
        usrScoreDisplay.textContent = usrScore;
    }
    else {
        winStatusDisplay.textContent = 'LOSE';
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
    }

    if (r === 1) {
        if (usrScore > computerScore) winStatusDisplay.textContent = 'Congratulations, You have WON!!!';
        else if (usrScore < computerScore) winStatusDisplay.textContent = 'Oops, You have LOST!!!';
        else winStatusDisplay.textContent = 'Nice try, it was a TIE.';
        r = round;
        return;
    }    
    r--;
    roundDisplay.textContent = r;
})