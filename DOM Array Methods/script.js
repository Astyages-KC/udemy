const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];


// fetch random user and add money
async function getRandomUser () {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 2000000)
  }
  addData(newUser);
}

// double users money
function doubleMoney(){
  data = data.map((user) => {
    return {...user, money: user.money * 2};
  });
  updateDOM();
}

// sort people by amt of money
function sortByRichest() {
  data.sort((a, b) => b.money - a.money)
  updateDOM();
}

//show millionaires using filter
function showMillionaires() {
  data = data.filter(user => user.money > 999999.99);
  updateDOM();
}

//total all the wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEle = document.createElement('div');
  wealthEle.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEle);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj)
  updateDOM()
}

// Update DOM
  function updateDOM(providedData = data) { 
    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(item => {
      const element = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
      main.appendChild(element);
    })
  }

  //format numb as $
  function formatMoney(chaching) {
    return '$' + chaching.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  // Event listner
  addUserBtn.addEventListener('click', getRandomUser)
  doubleBtn.addEventListener('click', doubleMoney);
  sortBtn.addEventListener('click', sortByRichest);
  showMillionairesBtn.addEventListener('click', showMillionaires);
  calculateWealthBtn.addEventListener('click', calculateWealth);