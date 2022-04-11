document.querySelector('#byName').addEventListener('click', getDrinkByName)

//filters
document.querySelector('#filterAlc').addEventListener('click', filterAlcoholic)
document.querySelector('#filterNon').addEventListener('click', filterNonAlcoholic)
document.querySelector('#showAll').addEventListener('click', showAll)

let drinkStorage = []
function getDrinkByName(){
  clearData();
  searchTerm = document.querySelector('input').value
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
  .then(res => res.json())
  .then(data => {
    drinkStorage = [...data.drinks]
    console.log(drinkStorage)
    displayDrinks(drinkStorage);
  })
  .catch(err => console.error(err))
}


function displayDrinks(arr){
  for(let i = 0; i < arr.length; i++) {
    createDrinkCard(arr[i])
  }
}

function showAll(){ 
  console.log('show')
  clearData();
  displayDrinks(drinkStorage)
}

function filterAlcoholic(){
  console.log('Alc')
  clearData();
  let filtered = drinkStorage.filter( obj => obj.strAlcoholic === 'Alcoholic')
  displayDrinks(filtered);
}

function filterNonAlcoholic(){
  console.log('Non')
  clearData();
  let filtered = drinkStorage.filter( obj => obj.strAlcoholic !== 'Alcoholic')
  displayDrinks(filtered);
}

function createDrinkCard(obj) {
  let container = document.querySelector('.drink_container');
  let drink = document.createElement('li');
  drink.classList.add('drink');

  //add image thumbnail
  addImage({element: drink, src: obj.strDrinkThumb})

  //Add correct tag class depending on alcoholic
  obj.strAlcoholic === 'Alcoholic' ?
    addSpan({element: drink, text: obj.strAlcoholic, classes:['tag','alcoholic']}) :
    addSpan({element: drink, text: obj.strAlcoholic, classes:['tag','non-alcoholic']});

  //add name of drink
  addH2({element: drink, text: obj.strDrink})

  //add ingredient container
  let ingredientContainer = document.createElement('ul');
  ingredientContainer.classList.add('ingredient_container');
  drink.appendChild(ingredientContainer)

  //add individual ingredients
  let ingredients = getIngredients(obj);
  ingredients.forEach( ing => {
    let item = document.createElement('li');
    item.innerHTML =`<span class="measure"> ${ing.measurement}</span>${ing.ingredient}`;
    ingredientContainer.appendChild(item)
  })

  //add instructions
  addP({element:drink, text: obj.strInstructions})

  //add drink to container
  container.appendChild(drink) 
}

////////////////// Data Helpers
function capitalize(str) {
  let arr = str.split(' ');
  for(let i=0; i<arr.length;i++){
    arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1)
  }
  return arr.join(' ')
}

function getIngredients(drink) {
  let arr = [];

  let counter = 1;
  while(drink[`strIngredient${counter}`]){
    let tempObj = {
      ingredient: capitalize(drink[`strIngredient${counter}`]),
      measurement: drink[`strMeasure${counter}`] ? drink[`strMeasure${counter}`] : '',
    }
    arr.push(tempObj)
    counter++;
  }
  return arr;
}

function clearData(){
  let container = document.querySelector('.drink_container');
  container.innerHTML = null;
}

////////////////// HTML Creation Helpers
function addH2({element, text, classes}) {
  let h2 = document.createElement('h2');
  h2.innerText = text;
  addClasses(h2, classes);
  element.appendChild(h2)
}

function addImage({element, src, alt='', classes}){
  let image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  addClasses(image, classes);
  element.appendChild(image)
}

function addP({element, text, classes}) {
  let p = document.createElement('p');
  p.innerText = text;
  addClasses(p, classes);
  element.appendChild(p)
}

function addSpan({element, text, classes}) {
  let span = document.createElement('span');
  span.innerText = text;
  addClasses(span, classes);
  element.appendChild(span)
}

function addClasses(element, classArray) {
  if(classArray && classArray.length){
    for(let i = 0; i<classArray.length; i++){
      element.classList.add(classArray[i])
    }
  }
}
// }