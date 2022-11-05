class Deck {
    constructor() {
        this.$width = document.querySelector('[data-control-width]');
        this.$height = document.querySelector('[data-control-height]');
        this.$diagonal = document.querySelector('[data-control-diagonal]');
        this.$deck = document.querySelector('[data-control-deck]')

        this.realDeck = {
            width: 29.8,
            height: 11.7,
        }

        this.init();
    }

    getScreenWidthInCm() {
        this.screenWidth = window.screen.width;
        this.screenHeight = window.screen.height;
        this.diagonal = Math.sqrt(this.screenWidth ** 2 + this.screenHeight ** 2);
        let relation = this.diagonal / this.inchToCm(27);
        return this.screenWidth / relation;
    }

    init() {
        // this.$width.value = this.screenWidth;
        // this.$height.value = this.screenHeight;

        this.resizeDeck(this.getScreenWidthInCm());
    }

    inchToCm(inches) {
        return inches * 2.54;
    }

    resizeDeck(screenWidth) {
        let deckWidth = this.screenWidth / screenWidth * this.realDeck.width;
        this.$deck.style.width = deckWidth + 'px';
    }
}

export default new Deck();