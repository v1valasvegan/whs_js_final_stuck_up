const body = document.body;
const button = document.querySelector('.button');
const menuCanvas = document.querySelector('.menu-canvas')
const gameCanvas = document.querySelector('.game-canvas');
const cards = document.querySelectorAll('.card');
const david = document.getElementById('david');
const nina = document.getElementById('nina');
const philip = document.getElementById('philip');
const cardsDavid = document.querySelectorAll('.card_david');
const cardsNina = document.querySelectorAll('.card_nina');
const cardsPhilip = document.querySelectorAll('.card_philip');
const bubbles = document.querySelector('.bubbles');
let numberOfCards;
let bugNumber;
let jedi;
const audio = document.querySelector('.audio');
function setNumberOfCards() {
    if (david.checked) {
        return 3;
    } else if(nina.checked) {
        return 6;
    } else if(philip.checked) {
        return 9;
    }
};
function getBugNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
};
function revealCards(cardsArray) {
    cardsArray.forEach(function(item, i, arr) {
        item.classList.toggle('hidden');
    });
    };
function dealCards () {
    if(david.checked) {
        revealCards(cardsDavid);
    } else if(nina.checked) {
        revealCards(cardsNina);
    } else if(philip.checked) {
        revealCards(cardsPhilip)
    };
};
function setBugCard(index) {
    if(david.checked) {
        cardsDavid[index].classList.add('bug'); 
    } else if(nina.checked) { 
        cardsNina[index].classList.add('bug');
    } else if(philip.checked) {
        cardsPhilip[index].classList.add('bug');
    };
};
function setAudio(audioObj) {
    if(david.checked) {
        audio.setAttribute('src', './sound/david.mp3');
    } else if(nina.checked) {
        audio.setAttribute('src', './sound/nina.mp3');
    } else if(philip.checked) {
        audio.setAttribute('src', './sound/philip.mp3');
    }
};
function loadNewGame() {
    setAudio();
    audio.play();
    menuCanvas.classList.toggle('hidden');
    gameCanvas.classList.toggle('hidden');
    cards.forEach(item => item.classList.add('hidden'));
    cards.forEach(item => item.removeEventListener('click', loadMenu));
    cards.forEach(item => item.classList.add('card_reverse'));
    numberOfCards = setNumberOfCards();
    bugNumber = getBugNumber(numberOfCards);
    dealCards();
    setBugCard(bugNumber);
    bubbles.innerHTML = 'Слухи дошли до меня, что экстрасенс великий ты. Карту выбери с багом,и хорош ли как говорят о тебе ты посмотрим мы.'
};
function loadMenu() {
    menuCanvas.classList.toggle('hidden');
    gameCanvas.classList.toggle('hidden');
    david.checked = true;
}
function addLoadMenuOnClick(item) {
    item.addEventListener('click', loadMenu);
};
function saysJoda() {
    if(jedi) {
        bubbles.innerHTML = 'Умный сильно ты до фига? На карту нажми любую и еще испытай свои силы раз.';
    } else {
        bubbles.innerHTML = 'Курс начальный пройди от нуля до Всемирной Сети Героя в школе webheroschool.ru и приходи потом снова.'
    };
}
    
button.addEventListener('click', loadNewGame);
cards.forEach(function(item) {
    item.addEventListener('click', function() {
        item.classList.toggle('card_reverse')
        cards.forEach(addLoadMenuOnClick);
        jedi = (item.classList.contains('bug')) ? true: false;
        saysJoda();
    });
});