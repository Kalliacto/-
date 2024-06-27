const TOTAL_CARD_COUNT = document.querySelectorAll('.player').length;
const playersBtns = document.querySelector('.players__slider_btns');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const slider = document.querySelector('.slider');
const sliderList = document.querySelector('.players__list');
const gapSize = 20;
let sliderWidth = parseInt(getComputedStyle(slider).width);
let screenWidth = window.innerWidth;
let cardCountOnSlide = getCardCountOnSlide();
let hiddenCardCount = calcHiddenCardCount();
let totalGap = gapSize * (cardCountOnSlide + 1);
let cardSize = calcCardSize();
let currentCard = cardCountOnSlide;
let translateShift = 0;
document.documentElement.style.setProperty('--cardSize', cardSize + 'px');

window.addEventListener('resize', onresize);

function onresize() {
    sliderWidth = parseInt(getComputedStyle(slider).width);
    screenWidth = window.innerWidth;
    cardCountOnSlide = getCardCountOnSlide();
    hiddenCardCount = calcHiddenCardCount();
    currentCard = cardCountOnSlide;
    totalGap = getTotalGap();
    cardSize = calcCardSize();
    translateShift = 0;
    document.documentElement.style.setProperty('--cardSize', cardSize + 'px');
    sliderList.style.translate = -(cardSize + gapSize) * translateShift + 'px';
    console.log(translateShift);
}

function getCardCountOnSlide() {
    if (screenWidth > 820) {
        return 3;
    } else if (520 < screenWidth && screenWidth < 820) {
        return 2;
    } else {
        return 1;
    }
}

function getTotalGap() {
    return gapSize * (cardCountOnSlide + 1);
}

function calcCardSize() {
    return (sliderWidth - totalGap) / cardCountOnSlide;
}

function calcHiddenCardCount() {
    return TOTAL_CARD_COUNT - cardCountOnSlide;
}

function moveLeft() {
    if (currentCard + 1 > TOTAL_CARD_COUNT) {
        return true;
    }
    if (currentCard + 1 === TOTAL_CARD_COUNT) {
        left.disabled = true;
    }
    currentCard++;
    sliderList.style.translate = -((cardSize + gapSize) * currentCard - (cardSize + gapSize) * cardCountOnSlide) + 'px';
}

function moveRight() {
    if (currentCard - 1 < cardCountOnSlide) {
        return;
    }
    if (currentCard - 1 === cardCountOnSlide) {
        right.disabled = true;
    }
    currentCard--;
    sliderList.style.translate = -((cardSize + gapSize) * currentCard - (cardSize + gapSize) * cardCountOnSlide) + 'px';
}

playersBtns.addEventListener('click', (e) => {
    if (e.target.matches('.left')) {
        moveLeft();
    } else {
        moveRight();
    }
});

setInterval(() => {
    if (moveLeft()) {
        currentCard = cardCountOnSlide;
    }
}, 2000);
