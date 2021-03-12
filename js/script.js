const worksAPI = [
    {
        name: 'Alien Landing Page',
        resume: 'Landing page totalmente responsiva com SASS e FlexBox!',
        image: '../styles/images/works/sassProject.svg',
        link: 'https://github.com/RockVoid/Sass',
    },
    {
        name: 'Vue To do List',
        resume: 'Mini Projeto com Vue JS + Sass + Grid + Local Storage!',
        image: '../styles/images/works/vuetodo.png',
        link: 'https://codepen.io/rockvoid/pen/gOLoLBX',
    },
    {
        name: 'Rock Movie Site',
        resume: 'Site de filmes com React hooks, styled components & consumindo API com axios!',
        image: '../styles/images/works/rockmoviesite.png',
        link: 'https://rockvoid.github.io/react-movies-site/',
    },
];

const $projectsContainer = document.getElementById('projects');
const $navbar = document.querySelector('nav');
const $openMenu = document.getElementById('btn-open-menu');
const $closeMenu = document.getElementById('btn-close-menu');
const $menu = document.getElementById('navbar__menu');
const $sectionPaths = document.querySelectorAll('.sectionPath');

let navInitialPosit = window.pageYOffset;
window.onscroll = function() {
    let navCurrentPos = window.pageYOffset;

    if (navInitialPosit > navCurrentPos) {
        $navbar.style.opacity = "1";
    } else {
        $navbar.style.opacity = "0"
    }

    navInitialPosit = navCurrentPos;
}

const showProjects = () => {
    worksAPI.map(work => {
        const $workEl = document.createElement('div');
        $workEl.setAttribute('class', 'section-works__projects__workStyle');

        $workEl.innerHTML = `
            <h3>${work.name}</h3>
            <img src=${work.image} alt="${work.name}">
            <h3>Resumo</h3>
            <p>${work.resume}</p>
            <a href="${work.link}" target="_blank" title=${work.name}>Confira</a>
        `;

        $projectsContainer.appendChild($workEl);
    })
}

showProjects();


$sectionPaths.forEach(value => value.addEventListener('click', () => $menu.classList.add('push')));

$openMenu.addEventListener('click', () => $menu.classList.remove('push'));
$closeMenu.addEventListener('click', () => $menu.classList.add('push'));

