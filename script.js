// select DOM elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMilliBtn = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calcWealth = document.getElementById("calculate-wealth");


// init arrays
let data = [];

getRandomUser();

// get random user from api 
async function getRandomUser()  {
  /* fetch("https://randomuser.me/api")
  .then((res) => res.json())
  .then(); */

  const res = await fetch("https://randomuser.me/api");

  const data = await res.json();
  console.log(data);

  const user = data.results[0];

  // create our user object
  const newUser = {
    name:  `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  }
  console.log(newUser);
  // add user data
  addData(newUser);
}

function addData(object) {
  data.push(object);
  updateDOM();
}

function updateDOM(provideddata = data) {
  // default value is our data array
  
  //clear main div

  main.innerHTML= "<h2><strong>Person</strong> Wealth</h2>";

  provideddata.forEach((person) => {
    //create new div
    const element = document.createElement("div");
    //add css class to div
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;

    main.appendChild(element);

  })
}
//Add new user, event listener
addUserBtn.addEventListener("click", getRandomUser);


// function for double the money
function doubleMoney() {
  for (let i = 0; i < data.length; i++) {
    data[i].money *= 2;
  }
  updateDOM();
}
doubleBtn.addEventListener("click", doubleMoney);


// function for showing only millionaires
function showMillionaires() {
  const millionaires = data.filter((person) => person.money >= 1000000);
  updateDOM(millionaires);
}
showMilliBtn.addEventListener("click", showMillionaires);


//function for sorting rich persons
function sortRich() {
  data.sort((person1, person2) => {
    if (person1.money > person2.money) return -1;
    if (person1.money < person2.money) return 1;
    return 0;
  });

updateDOM(); 
}
sort.addEventListener("click", sortRich);


//function for calculating the total wealth of all persons
function calculateWealth() {
    let totalWealth = 0;
    for (let i = 0; i < data.length; i++) {
      totalWealth += data[i].money;
    }
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<strong>Total Wealth: ${formatMoney(totalWealth)}</strong>`;
  main.appendChild(wealthElement);
}
calcWealth.addEventListener("click", calculateWealth);


// funktion för att formatera nummer som pengar
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
