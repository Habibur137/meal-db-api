const loadCategoriesData = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => displayCategoriesData(data.categories))
}
loadCategoriesData()

//display food categories
const displayCategoriesData = categories => {
    const mealContainer = document.getElementById('meal-container')
    categories.forEach(category => {
        // console.log(category)
        const div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `
        <div class="card">
            <img src="${category.strCategoryThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${category.strCategory}</h5>
            <p class="card-text">${category.strCategoryDescription.slice(0, 200)}</p>
            </div>
        </div>
        `
        mealContainer.append(div)
    });
}

// load meals by search
const loadMealBySearch = () => {
    const search = document.getElementById('search-field')
    const error = document.getElementById('error')
    // meal container 
    const mealContainer = document.getElementById('meal-container')
    const searchText = search.value;
    search.value = ''
    // console.log(searchText)
    if(!isNaN(searchText) || searchText == ''){
        error.innerText = 'Please Give A Food Name'
        mealContainer.textContent = ''
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => displayMealsBySearch(data.meals))
        error.innerText = ''
    }
}

const displayMealsBySearch = meals => {
    // meal container 
    const mealContainer = document.getElementById('meal-container')
    mealContainer.innerHTML = ''
    console.log(meals)
    meals.forEach(meal => {
        const div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            <button onclick="loadSingleMeal('single meal')" class='btn btn-success'>Meal Detail</button>
            </div>
        </div>
        `
        mealContainer.append(div)
    })
}