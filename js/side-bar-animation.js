const historyBtn = document.querySelector('#history');
const helpBtn = document.querySelector('#help');
const aboutBtn = document.querySelector('#about');

const sideBarContainer = document.querySelector('.side-bar-container');
const historyPage = document.querySelector('aside.history');
const helpPage = document.querySelector('aside.help');
const aboutPage = document.querySelector('aside.about');

const list = document.querySelector('aside.history ul');
function loadHistory() {

    if (history.length === 0) {
        list.textContent = "There's is no history yet.";
        return;
    }

    for (let l = history.length - 1; l >= 0; l--) {
        let newli = document.createElement('li');
    
        let h2 = document.createElement('h2');
        h2.textContent = 'Game ';
    
        let span = document.createElement('span');
    
        let scrDisplayLi = document.createElement('div');
        scrDisplayLi.classList.add('score-display-li');
    
        let cout = document.createElement('output');
        cout.classList.add('comp-li');
    
        let sta = document.createElement('output');
        sta.classList.add('status-li');
        
        let uout = document.createElement('output');
        uout.classList.add('usr-li');
    
        span.textContent = l + 1;
        cout.textContent = history[l].computer;
        sta.textContent = history[l].status;
        uout.textContent = history[l].user;
    
        scrDisplayLi.append(cout, sta, uout);
        h2.append(span);
        newli.append(h2, scrDisplayLi);
        list.append(newli);
    }
}

function removeHistory() {
    while (list.hasChildNodes()) {
        list.firstChild.remove();
    }
}

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
    loadHistory();
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
    removeHistory(); // it removes all elements from the history ul to make sure it waits clean the next time loadHistory() is called.
});
closeBtnHelp.addEventListener('click', () => {
    slideAway(closeBtnHelp);
});
closeBtnAbt.addEventListener('click', () => {
    slideAway(closeBtnAbt);
});


