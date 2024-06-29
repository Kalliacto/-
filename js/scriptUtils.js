const playersInfo = [
    {
        image: './img/profile.png',
        name: 'Хозе-Рауль Капабланка',
        dignity: 'Чемпион мира по шахматам',
    },
    { image: './img/profile.png', name: 'Эммануил Ласкер', dignity: 'Чемпион мира по шахматам' },
    { image: './img/profile.png', name: 'Александр Алехин', dignity: 'Чемпион мира по шахматам' },
    { image: './img/profile.png', name: 'Арон Нимцович', dignity: 'Чемпион мира по шахматам' },
    { image: './img/profile.png', name: 'Рихард Рети', dignity: 'Чемпион мира по шахматам' },
    { image: './img/profile.png', name: 'Остап Бендер', dignity: 'Чемпион мира по шахматам' },
];

const stagesCardInfo = [
    'Строительство железнодорожной магистрали Москва-Васюки',
    'Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов',
    'Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет',
    'Строительство дворца для турнира',
    'Размещение гаражей для гостевого автотранспорта',
    'Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов',
    'Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн',
];

function createElem(tag, options = {}) {
    const elem = document.createElement(tag);

    for (const option in options) {
        elem[option] = options[option];
    }

    return elem;
}

function createPlayerCard(player) {
    const div = document.createElement('div');
    div.className = 'player';

    div.innerHTML = `
    <img class='player__img' src=${player.image} alt='profile' />
    <h4 class='player__name'>${player.name}</h4>
    <p class='player__info'>${player.dignity}</p>
    <button class='btn__oval'>Подробнее</button>
    `;
    return div;
}

function createStagesItem(str, i) {
    const p = document.createElement('p');
    p.className = 'stages__item';

    p.innerHTML = `
    <span class="stages__num">${i + 1}</span> 
    <span class="stages__text">${str}</span>
    `;

    return p;
}

function allocationItem(stagesInfoArr) {
    const arr = [];
    let card;

    for (let i = 0; i < stagesInfoArr.length; ) {
        card = createElem('div', { className: 'stages__card' });

        if (stagesInfoArr[i].length > 80) {
            card.append(createStagesItem(stagesInfoArr[i], i));
            i++;
        } else {
            card.append(createStagesItem(stagesInfoArr[i], i), createStagesItem(stagesInfoArr[i + 1], i + 1));
            i += 2;
        }

        arr.push(card);
    }

    return arr;
}

function paintGridStages(stagesInfoArr) {
    const stagesList = createElem('ul', { className: 'stages__list' });

    let card;

    for (let i = 0; i < stagesInfoArr.length; i++) {
        card = createElem('li', { className: 'stages__card-li' });
        card.append(createStagesItem(stagesInfoArr[i], i));
        stagesList.append(card);
    }

    return stagesList;
}
