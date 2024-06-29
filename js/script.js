const playersSection = document.querySelector('.players');
const stagesContent = document.querySelector('.stages__content');

const playersCards = playersInfo.map((el) => createPlayerCard(el));
const playersSlider = new Slider({
    title: 'Участники турнира',
    slides: playersCards,
    root: playersSection,
    delay: 4000,
});

let stagesCards, stagesSlider, gridForStage;

window.addEventListener('resize', () => {
    playersSlider.updateSize();

    if (stagesSlider) {
        stagesSlider.updateSize();
    }
    switchBlockType();
});

playersSlider.mount();

function switchBlockType() {
    if (document.documentElement.clientWidth >= 820) {
        if (!gridForStage) {
            gridForStage = paintGridStages(stagesCardInfo);
            stagesContent.append(gridForStage);
        } else {
            gridForStage.style.display = '';
        }
        if (stagesSlider) {
            stagesSlider.changeVisible('none');
        }
    } else {
        if (gridForStage) {
            gridForStage.style.display = 'none';
        }

        if (!stagesSlider) {
            stagesCards = allocationItem(stagesCardInfo);
            stagesSlider = new Slider({ slides: stagesCards, root: stagesContent, type: 'dots' });
            stagesSlider.mount();
        } else {
            stagesSlider.changeVisible('');
        }
    }
}

switchBlockType();
