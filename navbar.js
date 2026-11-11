
let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let lightsaber = document.querySelector('#lightsaber');
let collapse = document.querySelector('#collapse');

let check = false;
let lightsaberTimeout;

// Gestione dello scroll della navbar
function updateNavbar() {

    let scrolled = window.scrollY;

    if (scrolled > 0) {

        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');

        collapse.classList.remove('bg-black');
        collapse.classList.add('bg-yellow');

        navbar.style.height = '70px';

        links.forEach((link) => {
            link.style.color = 'var(--yellow)';
        });

        logoNavbar.src = './media/logo-y.png';
        lightsaber.src = './media/lightsaber-y.png';

    } else {

        navbar.classList.remove('bg-yellow');
        navbar.classList.add('bg-black');

        collapse.classList.remove('bg-yellow');
        collapse.classList.add('bg-black');

        navbar.style.height = '70px';

        links.forEach((link) => {
            link.style.color = 'var(--yellow)';
        });

        logoNavbar.src = './media/logo-y.png';
        lightsaber.src = './media/lightsaber-y.png';
    }
}

window.addEventListener('scroll', updateNavbar);

// Gestione rotazione spada
lightsaber.addEventListener('click', () => {

    if (check === false) {

        clearTimeout(lightsaberTimeout);
        lightsaber.style.top = '10px';
        lightsaberTimeout = setTimeout(() => {
            lightsaber.style.transform = 'rotate(-90deg)';
        }, 200);
        check = true;

    } else {

        clearTimeout(lightsaberTimeout);
        lightsaber.style.transform = 'rotate(0deg)';
        lightsaberTimeout = setTimeout(() => {
            lightsaber.style.top = '';
        }, 500);
        check = false;
    }
});

// Controllo iniziale
updateNavbar();
