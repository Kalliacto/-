const playersSection = document.querySelector('.players');
const stagesContent = document.querySelector('.stages__content');

const playersCards = playersInfo.map((el) => createPlayerCard(el));
const playersSlider = new Slider({ title: 'Участники турнира', slides: playersCards, root: playersSection });
const stagesCards = allocationItem(stagesCardInfo);
const stagesSlider = new Slider({ this: '', slides: stagesCards, root: stagesContent });

window.addEventListener('resize', () => {
    playersSlider.updateSize();
    stagesSlider.updateSize();
});

playersSlider.mount();
stagesSlider.mount();
