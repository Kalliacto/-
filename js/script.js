const TOTAL_CARD_COUNT = document.querySelectorAll('.player').length;
const playersBtns = document.querySelector('.players__slider_btns');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const slider = document.querySelector('.slider');
const sliderList = document.querySelector('.players__list');
const countSlide = document.querySelector('.count-slide');
const gapSize = 20;
let sliderWidth = parseInt(getComputedStyle(slider).width);
let screenWidth = window.innerWidth;
let cardCountOnSlide = getCardCountOnSlide();
let hiddenCardCount = calcHiddenCardCount();
let totalGap = gapSize * (cardCountOnSlide + 1);
let cardSize = calcCardSize();
let currentCard = cardCountOnSlide;
let translateShift = 0;
countSlide.textContent = currentCard;
document.documentElement.style.setProperty('--cardSize', cardSize + 'px');

//Для управления изначальной стилизации кнопки по условию видимости
if (currentCard - 1 < cardCountOnSlide) {
    leftBtn.disabled = true;
}

window.addEventListener('resize', onresize);

function onresize() {
    sliderWidth = parseInt(getComputedStyle(slider).width);
    screenWidth = window.innerWidth;
    cardCountOnSlide = getCardCountOnSlide();
    hiddenCardCount = calcHiddenCardCount();
    currentCard = cardCountOnSlide;
    countSlide.textContent = currentCard;
    totalGap = getTotalGap();
    cardSize = calcCardSize();
    translateShift = 0;
    document.documentElement.style.setProperty('--cardSize', cardSize + 'px');
    sliderList.style.translate = -(cardSize + gapSize) * translateShift + 'px';
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
    if (currentCard + 1 > TOTAL_CARD_COUNT) rightBtn.disabled = false;

    if (currentCard - 1 < cardCountOnSlide) {
        leftBtn.disabled = true;
        return true;
    }
    // if (currentCard - 1 === cardCountOnSlide) {
    //     leftBtn.disabled = true;
    // }
    currentCard--;
    countSlide.textContent = currentCard;
    sliderList.style.translate = -((cardSize + gapSize) * currentCard - (cardSize + gapSize) * cardCountOnSlide) + 'px';
}

function moveRight() {
    if (currentCard + 1 >= cardCountOnSlide) leftBtn.disabled = false;
    if (currentCard + 1 > TOTAL_CARD_COUNT) {
        rightBtn.disabled = false;
        return true;
    }
    if (currentCard + 1 === TOTAL_CARD_COUNT) {
        rightBtn.disabled = true;
    }
    currentCard++;
    countSlide.textContent = currentCard;
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
    if (moveRight()) {
        currentCard = cardCountOnSlide;
        countSlide.textContent = currentCard;
    }
}, 4000);
