const $open_menu_btn = document.getElementById("open-btn");
const $close_menu_btn = document.getElementById("btn-close");
const $head_menu = document.getElementById("head_menu");

$open_menu_btn.addEventListener("click", () => $head_menu.classList.remove("head__menu__hide__menu"));
$close_menu_btn.addEventListener("click", () => $head_menu.classList.add("head__menu__hide__menu"));