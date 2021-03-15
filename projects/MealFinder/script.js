const $searchInp = document.getElementById("search");
const $btnSearch = document.getElementById("submit-search");
const $callMeals = document.getElementById("call-meals");
const $callAbout = document.getElementById("call-info");
const $modalAbout = document.getElementById("modal-about");
const $closeBtn = document.getElementById("close-modal-btn");
const $containerMeal = document.getElementById("container-meals");
const $containerContent = document.getElementById("container-content");

const API_URL =  `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
//For first letter
// const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=`;

const getResults = async term => {
    const res = await fetch(API_URL + term); 
    const mealsData = await res.json();

    addMealsToDOM(mealsData);
}

const getRandomMeals = async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await res.json();

    const meal = data.meals[0];

    addFullMealToDOM(meal);
}

const getMealById = async idMeal => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const mealData = await res.json();

    const meal = mealData.meals[0];

    addFullMealToDOM(meal);
}

const addFullMealToDOM = async mealEl => {
    clearDOM();

    const ingredients = getIngredients(mealEl); 

    const divMeal = document.createElement("div");
    divMeal.setAttribute("class", "meal-style-2");
    divMeal.setAttribute("id", `${mealEl.idMeal}`)

    divMeal.innerHTML = `
        <div class="meal-top">
            <h3>${mealEl.strMeal}</h3>
            <small>
                Origin: ${mealEl.strArea} <br/>
            <a 
                href=${mealEl.strYoutube}
                target="_blank"
                rel="noopeer noreferrer"
            >
                Click to see recipe video!
            </a>
            </small>

            <div class="meal-img-style">
                <img src=${mealEl.strMealThumb}>
            </div>

            <h4>Ingredients</h4>
            <p>
                ${ingredients.map(ing =>`<li>${ing}</li>`).join("")}
            </p>
        </div>
        <div class="meal-tips">
            <h4>Instructions</h4>
            <p>
                ${mealEl.strInstructions}
            </p>
        </div>
    `;

    $containerMeal.appendChild(divMeal);
}

const addMealsToDOM = async mealsData => {
    const listOfMeals = mealsData.meals;
    
    clearDOM();

    const limitResults = listOfMeals.length; 
    for (let index = 0; index < limitResults; index++) {

        const divMeal = document.createElement("div");
        divMeal.setAttribute("class", "meal-style");
        divMeal.setAttribute("id", `${listOfMeals[index].idMeal}`)

        divMeal.innerHTML = `
            <h3>${listOfMeals[index].strMeal}</h3>
            <small>
                Origin: ${listOfMeals[index].strArea}
            </small>
            <div class="meal-img-style">
                <img src=${listOfMeals[index].strMealThumb}>
            </div>
            <small>
                Click to see recipe!
            </small>
        `;

        $containerMeal.appendChild(divMeal);
    }
}

const getIngredients = meal => {
    const maxIngredients = 20;
    const ingredients = [];
    
    for (let index = 1;index < maxIngredients; index++) {
        if (meal[`strIngredient${index}`]) {
            ingredients.push(
                `${meal[`strIngredient${index}`]} - ${meal[`strMeasure${index}`]}`
            ); 
        }
    }

    return ingredients;
}

const clearDOM = () => {
    $containerMeal.innerHTML = "";
    $containerContent.innerHTML = "";
}

$btnSearch.addEventListener("click", event => {
    event.preventDefault();

    const term = $searchInp.value.trim();

    if (isNaN(term)) {
        getResults(term);
        $searchInp.value = "";
    } else {
        alert("Please, type only characters!");
    }
});

$callMeals.addEventListener("click", getRandomMeals);
$searchInp.addEventListener("keypress", e => {
    if (e.which == 13) getResults(e.target.value);
});

$callAbout.addEventListener("click", () => $modalAbout.classList.remove("hidden"));
$closeBtn.addEventListener("click", () => $modalAbout.classList.add("hidden"));

$containerMeal.addEventListener("click", e => {
    const meal = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains("meal-style");
        } else {
            return false;
        }
    })

    if (meal) {
        const mealID = meal.getAttribute("id");
        getMealById(mealID);
    }
})