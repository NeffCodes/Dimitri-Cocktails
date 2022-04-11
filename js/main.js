//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink)

function getDrink(){

  searchTerm = document.querySelector('input').value

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const drinks = data.drinks

    for(let i = 0; i < drinks.length; i++) {
      document.querySelector('h2').innerText = `${drinks[0].strDrink}`
      document.querySelector('img').src = drinks[0].strDrinkThumb
      document.querySelector('h3').innerText = drinks[0].strInstructions
    }


  })
  .catch(err => console.error(err))

}

