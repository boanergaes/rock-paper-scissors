let themeToggler = document.querySelector('#theme');
let body = document.body;

themeToggler.addEventListener('click', () => {
    body.classList.toggle('lightmode');
})