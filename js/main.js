//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink)

function getDrink(){
  clearData();
  searchTerm = document.querySelector('input').value

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const drinks = data.drinks

    for(let i = 0; i < drinks.length; i++) {
      createListItemDrink(drinks[i])
    }


  })
  .catch(err => console.error(err))

}

function clearData(){
  let container = document.querySelector('.drink_container');
  container.innerHTML = null;
}

function createListItemDrink(obj) {
  let container = document.querySelector('.drink_container');
  let drink = document.createElement('li');

  let name = document.createElement('h2');
  name.innerText = obj.strDrink;
  drink.appendChild(name)

  let thumbnail = document.createElement('img');
  thumbnail.src = obj.strDrinkThumb;
  drink.appendChild(thumbnail)

  let instructions = document.createElement('p');
  instructions.innerText = obj.strInstructions;
  drink.appendChild(instructions)

  container.appendChild(drink)
  
}
