const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

//Initialise array to store people data - name and wealth values:
let data = [];

//Call the random user (function to make them below):
getRandomUser();
getRandomUser();
getRandomUser();

//Fetch a random user and add in their wealth:
async function getRandomUser() {
  //Random user generator:
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  //Pass the random data into an array:
  const user = data.results[0];

  //Process the array to only look for user's names and create a random wealth figure up to $1million:
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  //Call the addData function (coded below) to process the newUser:
  addData(newUser);
}

//Doubling everyones money (map function):
function doubleMoney() {
  data = data.map(user => {
    return {
      ...user,
      money: user.money * 2
    };
  });

  updateDOM();
}

//Sort users by the richest (sort function):
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//Show only millionaires (filter function):
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

//Calculate Entire Wealth (reduce function):
function calculateWealth() {
  //Starting from $0, accumulate all values:
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  //Create a div (& element), inject HTML of the accumulated value in a formated way, then append:
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

//Add the new object to a data array:
function addData(obj) {
  data.push(obj);

  //Call the updateDOM function (coded below):
  updateDOM();
}

//Update the DOM:
function updateDOM(providedData = data) {
  //Clear the main div:
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  //Loop through the data in the addData array:
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;

    //Insert the loop data into the DOM:
    main.appendChild(element);
  });
}

//Format the number as money:
function formatMoney(number) {
  return '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//EVENT LISTENERS:

//Listen for click on 'Add User' button:
addUserBtn.addEventListener('click', getRandomUser);

//Listen for click on 'Double Money' button:
doubleBtn.addEventListener('click', doubleMoney);

//Listen for click on 'Show only Millionaires' button:
showMillionairesBtn.addEventListener('click', showMillionaires);

//Listen for click on 'Sort by Richest' button:
sortBtn.addEventListener('click', sortByRichest);

//Listen for click on 'Calculate Entire Wealth' button:
calculateWealthBtn.addEventListener('click', calculateWealth);