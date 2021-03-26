const worksAPI = [
    {
        name: 'Rock Movie Site',
        resume: 'Site de filmes com React hooks, styled components & consumindo API com axios!',
        image: '../styles/images/works/rockmoviesite.png',
        link: 'https://rockvoid.github.io/react-movies-site/',
    },
    {
        name: 'Recipe App',
        resume: 'Site de receitas com consultas na API + Javascript assícrono!',
        image: '../styles/images/works/recipe.png',
        link: '../projects/MealFinder/index.html',
    },
    {
        name: 'Kanban Vue Js',
        resume: 'Mapa de Kanban com Vuex, Vue Router e BootstrapVue, persistência de dados com Local Storage!',
        image: '../styles/images/works/vueKanban.png',
        link: 'https://github.com/RockVoid/Vue-Agile',
    },
];

const $projectsContainer = document.getElementById('projects');
const $navbar = document.querySelector('nav');
const $openMenu = document.getElementById('btn-open-menu');
const $closeMenu = document.getElementById('btn-close-menu');
const $menu = document.getElementById('navbar__menu');
const $sectionPaths = document.querySelectorAll('.sectionPath');

let navInitialPosit = window.pageYOffset;
window.onscroll = function () {
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

