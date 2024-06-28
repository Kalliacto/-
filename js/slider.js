class Slider {
    constructor(config = {}) {
        this.root = config.root;
        this.sliderRoot = createElem('div');

        if (config.title) {
            this.title = createElem('h4', { className: 'slider__title', textContent: config.title });
            this.sliderRoot.append(this.title);
        }

        this.sliderContainer = createElem('div', { className: 'slider__container' });
        this.slider = createElem('div', { className: 'slider' });
        this.sliderList = createElem('ul', { className: 'slider__list' });
        this.sliderList.append(...this.#addSlides(config.slides ?? []));
        this.slider.append(this.sliderList);

        this.sliderBtns = createElem('div', { className: 'slider__btns' });
        this.btnLeft = createElem('button', { className: 'btn__round left' });

        if (config.type !== 'dots') {
            this.countSlidesInfoParent = createElem('span');
            this.countSlidesInfoCurrent = createElem('span');
            this.countSlidesInfoTotal = createElem('span');
            this.countSlidesInfoParent.append(this.countSlidesInfoCurrent, '/', this.countSlidesInfoTotal);
        }
        this.btnRight = createElem('button', { className: 'btn__round right' });
        this.sliderBtns.append(this.btnLeft, this.countSlidesInfoParent, this.btnRight);

        this.sliderContainer.append(this.slider, this.sliderBtns);
        this.sliderRoot.append(this.sliderContainer);

        // Размеры и колличества
        this.totalCardCount = config?.slides?.length ?? 0;
        this.gapSize = config.sliderGap ?? 20;
        this.sliderWidth = parseInt(getComputedStyle(this.sliderRoot).width);
        this.screenWidth = window.innerWidth;
        this.cardCountOnSlide = this.#getCardCountOnSlide();
        this.totalGap = this.#calcTotalGap();
        this.cardSize = this.#calcCardSize();
        this.currentCard = this.cardCountOnSlide;

        // Слушатели
        this.btnLeft.addEventListener('click', () => this.#moveSlide('left'));
        this.btnRight.addEventListener('click', () => this.#moveSlide('right'));
    }

    mount(delay) {
        this.root.append(this.sliderRoot);
        this.updateSize();
        this.countSlidesInfoCurrent.textContent = this.currentCard;
        this.countSlidesInfoTotal.textContent = this.totalCardCount;
        if (delay) {
            this.#autoPlaySlide(delay);
        }
    }

    updateSize() {
        this.sliderWidth = parseInt(getComputedStyle(this.sliderRoot).width);
        this.screenWidth = window.innerWidth;
        this.cardCountOnSlide = this.#getCardCountOnSlide();
        this.currentCard = this.cardCountOnSlide;
        this.totalGap = this.#calcTotalGap();
        this.cardSize = this.#calcCardSize();
        document.documentElement.style.setProperty('--cardSize', this.cardSize + 'px');
        document.documentElement.style.setProperty('--slider-gap', this.gapSize + 'px');
        this.sliderList.style.translate = 0;
        this.#btnStateSwitch();
        this.#updateCountSlidesInfo();
    }

    #updateCountSlidesInfo() {
        this.countSlidesInfoCurrent.textContent = this.currentCard;
    }

    #addSlides(slides) {
        return slides.map((slide) => {
            const li = createElem('li', { className: 'slide' });
            li.append(slide);
            return li;
        });
    }

    #getCardCountOnSlide() {
        if (this.screenWidth > 820) return 3;
        if (520 < this.screenWidth && this.screenWidth < 820) return 2;
        return 1;
    }

    #calcTotalGap() {
        return this.gapSize * (this.cardCountOnSlide + 1);
    }

    #calcCardSize() {
        return (this.sliderWidth - this.totalGap) / this.cardCountOnSlide;
    }

    #calcTranslate() {
        return (
            -(
                (this.cardSize + this.gapSize) * this.currentCard -
                (this.cardSize + this.gapSize) * this.cardCountOnSlide
            ) + 'px'
        );
    }

    #moveSlide(direction = 'right') {
        this.currentCard += direction === 'right' ? 1 : -1;
        this.sliderList.style.translate = this.#calcTranslate();
        this.#btnStateSwitch();
        this.#updateCountSlidesInfo();
    }

    #btnStateSwitch() {
        if (this.currentCard === this.cardCountOnSlide) {
            this.btnLeft.disabled = true;
            this.btnRight.disabled = false;
        } else if (this.currentCard === this.totalCardCount) {
            this.btnRight.disabled = true;
            this.btnLeft.disabled = false;
        } else {
            this.btnLeft.disabled = this.btnRight.disabled = false;
        }
    }

    #autoPlaySlide(delay) {
        setInterval(() => {
            if (this.currentCard === this.totalCardCount) {
                this.currentCard = this.cardCountOnSlide;
                this.sliderList.style.translate = 0;
                this.#btnStateSwitch();
            } else {
                this.#moveSlide();
            }
        }, delay);
    }
}

function createElem(tag, options = {}) {
    const elem = document.createElement(tag);

    for (const option in options) {
        elem[option] = options[option];
    }

    return elem;
}
