const searchFood = async () => {
    const searchField = document.getElementById('search-field')
    const searchFieldText = searchField.value;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`)
    const data = await res.json()
    searchField.value = '';
    displayFood(data.meals)
}

const displayFood = (meals) => {
    const mealContainer = document.getElementById('meal-container')
    meals.forEach(meal => {
        // console.log(meal)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card" onclick="singleMeal('${meal.idMeal}')">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                </div>
            </div>
        `
        mealContainer.append(div)
    });
}

const singleMeal = async (meal) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
    const singleMeal = await res.json()
    displaySingleMeal(singleMeal.meals[0])
}

const displaySingleMeal = (singleMeal) => {
    console.log(singleMeal)
    const singleMealDetail = document.getElementById('meal-single')
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
        <div class="card">
            <img src="${singleMeal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${singleMeal.strMeal}</h5>
            <p class="card-text">${singleMeal.strInstructions.slice(0, 250)}</p>
            </div>
        </div>
    `
    singleMealDetail.append(div)
}