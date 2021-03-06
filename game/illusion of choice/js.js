const scissorsImg = '<img src="img/scissors.jpg" alt="#" id="card">';
const paperImg = '<img src="img/paper.jpg" alt="#" id="card">';
const rockImg = '<img src="img/rock.jpg" alt="#" id="card">';

function Card(name, img) {
  this.name = name;
  this.img = img;
}

const card1 = new Card('scissors', scissorsImg);
const card2 = new Card('paper', paperImg);
const card3 = new Card('rock', rockImg);

const objArr = [];
objArr.push(card1, card2, card3);

const cards = [];
cards.push(card1.img, card2.img, card3.img);
const randPicture= Math.floor(Math.random() * cards.length);
const picture = cards[randPicture];

const randomCard1 = Math.floor(Math.random() * cards.length);
const randomCard2 = Math.floor(Math.random() * cards.length);
const randomCard3 = Math.floor(Math.random() * cards.length);

const userCard1= cards[randomCard1];
const userCard2= cards[randomCard2];
const userCard3= cards[randomCard3];

const firstCard = document.getElementById('firstCard');
const secondCard = document.getElementById('secondCard');
const thidrCard = document.getElementById('thidrCard');
const userCards=[];
userCards.push(firstCard, secondCard, thidrCard);

const btn = document.getElementById('btn');
const choice = document.getElementById('choice');
const enemy = document.getElementById('enemy');

const end = function() {
  document.location.reload();
};

const check = function() {
  document.getElementById('img').style.marginLeft= '37.5%';
  enemy.innerHTML=picture;
  const resultArr= [];
  objArr.forEach((elem)=>{
    if (elem.img === choice.innerHTML) {
      resultArr.push(elem.name);
    }
  });
  objArr.forEach((elem)=>{
    if (elem.img === enemy.innerHTML) {
      resultArr.push(elem.name);
    }
  });

  if (resultArr[0] === resultArr[1]) {
    btn.innerHTML= 'nothing';
  }

  if (resultArr[0] === 'scissors' && resultArr[1] === 'paper') {
    btn.innerHTML= 'you won';
  } else if (resultArr[1] === 'scissors' && resultArr[0] === 'paper') {
    btn.innerHTML= 'you lose';
  }


  if (resultArr[0] === 'scissors' && resultArr[1] === 'rock') {
    btn.innerHTML= 'you lose';
  } else if (resultArr[0] === 'rock' && resultArr[1] === 'scissors') {
    btn.innerHTML= 'you won';
  }


  if (resultArr[0] === 'paper' && resultArr[1] === 'rock') {
    btn.innerHTML= 'you won';
  } else if (resultArr[0] === 'rock' && resultArr[1] === 'paper') {
    btn.innerHTML= 'you lose';
  }

  setTimeout(end, 3000);
};

const play = function() {
  btn.style.color='red';
  btn.style.fontSize='43px';
  btn.style.textTransform='uppercase';
  start.style.display='none';

  let time = 10;
  function timer() {
    btn.innerHTML= `left ${time}`;
    time--;
    if (time < 0) {
      btn.innerHTML= 'you lose';
    }
  }

  const rest = setInterval(timer, 1000);

  choice.style.display='block';
  firstCard.innerHTML=userCard1;
  secondCard.innerHTML=userCard2;
  thidrCard.innerHTML=userCard3;

  function allowDrop(e) {
    e.preventDefault();
  }

  function drag(e) {
    e.dataTransfer.setData('id', e.target.id);
  }

  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    const dragElement = document.getElementById(id);
    e.target.append(dragElement);
    clearInterval(rest);
    check();
  }

  userCards.forEach((elem) => {
    elem.addEventListener('dragstart', drag);
  });

  choice.addEventListener('dragover', allowDrop);
  choice.addEventListener('drop', drop);
};

const start = document.getElementById('btnStyle');
start.addEventListener('click', play);

if(!(/iPhone|iPad/i.test(navigator.userAgent))){
  document.getElementById('back').style.display='none';
  document.getElementById('sorry').style.display = 'block';
}
