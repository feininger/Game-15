let gameBox = document.querySelector('.game__box');
let mixButton = document.querySelector('.game__bnt-mix');
let numbers = generateArray();
let items;

checkStorage();
addGameItems(numbers);

function moveItem(evt) {
  if (isCanMove(this)) {
    changeItem (this);
    removeGameItems();
    addGameItems(numbers);
  } 
};

function isCanMove(obj) {
  let zeroIndex = numbers.indexOf(0);
  let index = numbers.indexOf(parseInt(obj.textContent));

  switch (index) {
    case index = zeroIndex + 1: return true;
    case index = zeroIndex - 1: return true;
    case index = zeroIndex + 4: return true;
    case index = zeroIndex - 4: return true;
    default: return false;
  }
};

function changeItem(obj) {
  let zeroIndex = numbers.indexOf(0);
  let index = numbers.indexOf(parseInt(obj.textContent));
  numbers[zeroIndex] = numbers[index];
  numbers[index] = 0;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));;
};

function generateArray() {
  let source = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  for (let i = source.length - 1; i >= 0; i--) {
    let j = getRandomInt(i);
    let temp = source[i];
    source[i] = source[j];
    source[j] = temp;
  }
  
  return source;
};

function addGameItems(numbers) {
  numbers.forEach(function (item) {
    let newElement = document.createElement('div');
    newElement.className = 'game__item';
    if (item === 0) {newElement.classList.add('zero-item')}
    newElement.innerHTML = item;
    gameBox.appendChild(newElement);
    setStorage();
  });

  items = document.querySelectorAll('.game__item');

  items.forEach(function (item) {
      item.addEventListener('click', moveItem);
  });
};

function removeGameItems() {
  for (let i = gameBox.children.length -1 ; i >= 0; i--) {
    gameBox.children[i].remove();
  }
};

function mixGameItems() {
  numbers = generateArray();
  removeGameItems();
  addGameItems(numbers);
};

function setStorage() {
  localStorage.setItem('tagGameStorage', JSON.stringify(numbers)); 
};

function checkStorage() {
  if (localStorage.getItem('tagGameStorage')) {
    numbers = JSON.parse(localStorage.getItem('tagGameStorage'));
  }
};

mixButton.addEventListener('click', mixGameItems);