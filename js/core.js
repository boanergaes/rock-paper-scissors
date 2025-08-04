let winStatusDisplay = document.querySelector('.win-status');
let usrScore = 0;
let usrScoreDisplay = document.querySelector('#user-score');
let computerScore = 0;
let computerScoreDisplay = document.querySelector('#computer-score')
let roundDisplay = document.querySelector('#round');
const playAgainSec = document.querySelector('.play-again');

let history = [];

let round = 7; //take user input perhaps

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
    round = 7;
    roundDisplay.textContent = round;
    usrScore = 0;
    usrScoreDisplay.textContent = usrScore;
    computerScore = 0;
    computerScoreDisplay.textContent = computerScore;
    winStatusDisplay.textContent = 'Good Luck!';
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

// below this is to have a hover effect on the weapon buttons but the change is applied on the pawn bars
rockBtn.addEventListener('mouseover', () => {
    const rockPawn = document.querySelector(`.rps-bar.rock`);
    rockPawn.style.backgroundColor = 'orange';
});
rockBtn.addEventListener('mouseleave', () => {
    const rockPawn = document.querySelector(`.rps-bar.rock`);
    rockPawn.style.backgroundColor = 'hsl(39, 100%, 40%)';
})

paperBtn.addEventListener('mouseover', () => {
    const rockPawn = document.querySelector(`.rps-bar.paper`);
    rockPawn.style.backgroundColor = 'orange';
});
paperBtn.addEventListener('mouseleave', () => {
    const rockPawn = document.querySelector(`.rps-bar.paper`);
    rockPawn.style.backgroundColor = 'hsl(39, 100%, 40%)';
})

scrBtn.addEventListener('mouseover', () => {
    const rockPawn = document.querySelector(`.rps-bar.scissors`);
    rockPawn.style.backgroundColor = 'orange';
});
scrBtn.addEventListener('mouseleave', () => {
    const rockPawn = document.querySelector(`.rps-bar.scissors`);
    rockPawn.style.backgroundColor = 'hsl(39, 100%, 40%)';
})

const playAgainBtn = document.querySelector('#play-again-btn');

playAgainBtn.addEventListener('click', () => {
    reset();
    playAgainSec.style.display = 'none';
})

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
    if (round === 1) {
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
    round--;
    roundDisplay.textContent = round;
}
