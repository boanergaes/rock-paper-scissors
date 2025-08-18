let themeToggler = document.querySelector('#theme');
let body = document.body;
const theme = localStorage.getItem('theme');

if (!theme) localStorage.setItem('theme', 'dark');
if (theme === 'light') body.classList.add('lightmode');
else if (theme === 'dark') body.classList.remove('lightmode')
    
function applyTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        body.classList.add('lightmode');
        localStorage.setItem('theme', 'light');
    }
    else {
        body.classList.remove('lightmode');
        localStorage.setItem('theme', 'dark');
    }
}

themeToggler.addEventListener('click', applyTheme);