const historyBtn = document.querySelector('#history');
const helpBtn = document.querySelector('#help');
const aboutBtn = document.querySelector('#about');

const sideBarContainer = document.querySelector('.side-bar-container');
const historyPage = document.querySelector('aside.history');
const helpPage = document.querySelector('aside.help');
const aboutPage = document.querySelector('aside.about');

function coverPage() {
    sideBarContainer.animate(
        [
            {width: '100%', background: 'hsla(0, 0%, 15%, 0)'},
            {width: '100%', background: 'hsla(0, 0%, 15%, .9)'}
        ],
        {
            duration: 400,
            iterations: 1,
            easing: 'linear',
            delay: 0,
            fill: 'forwards'
        }
    )
}

function slideIn(page) {
    const slidingPage = document.querySelector(`aside.${page}`);
    coverPage();
    slidingPage.animate(
        [
            {right: 0},
        ],
        {
            duration: 400,
            iterations: 1,
            easing: 'ease',
            delay: 70,
            fill: 'forwards'
        }
    )
}

historyBtn.addEventListener('click', () => {
    slideIn('history');
});

helpBtn.addEventListener('click', () => {
    slideIn('help');
});

aboutBtn.addEventListener('click', () => {
    slideIn('about');
});

const closeBtnHis = document.querySelector(`aside.history .cls`);
const closeBtnHelp = document.querySelector(`aside.help .cls`);
const closeBtnAbt = document.querySelector(`aside.about .cls`);

function uncoverPage() {
    sideBarContainer.animate(
        [
            {width: '100%', background: 'hsla(0, 0%, 15%, .9)'},
            {width: '100%', background: 'hsla(0, 0%, 15%, 0)'},
            {width:  0, background: 'hsla(0, 0%, 15%, 0)'}
        ],
        {
            duration: 400,
            iterations: 1,
            easing: 'linear',
            delay: 180,
            fill: 'forwards'
        }
    )
}

function slideAway(elem) {
    const pageOut = elem.parentElement.parentElement; //target the aside elements
    pageOut.animate(
        [
            {right: 'min(-350px, -35vw)'}
        ],
        {
            duration: 400,
            iterations: 1,
            easing: 'ease',
            delay: 0,
            fill: 'forwards'
        }
    )
    uncoverPage();
}

closeBtnHis.addEventListener('click', () => {
    slideAway(closeBtnHis);
});
closeBtnHelp.addEventListener('click', () => {
    slideAway(closeBtnHelp);
});
closeBtnAbt.addEventListener('click', () => {
    slideAway(closeBtnAbt);
});


