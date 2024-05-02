// Constantes globales
const BACK_CARD = "https://deckofcardsapi.com/static/img/back.png"; // URL de la imagen de la parte trasera de una carta.
const DEALER_PAUSE = 1500; // Tiempo de pausa del dealer en milisegundos.

// Inicialización de Alpine.js
document.addEventListener('alpine:init', () => {
    // Definición de la aplicación 'app' con Alpine.js
    Alpine.data('app', () => ({
        // Método inicial que baraja el mazo y reparte las cartas.
        async init() {
            await this.shuffleDeck();
            await this.deal();
        },
        // Método para barajar el mazo de cartas utilizando la API de deckofcards.
        async shuffleDeck() {
            let resp = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${this.deckSize}`);
            this.deck = await resp.json();
        },
        // Método para repartir las cartas al jugador y al PC (dealer).
        async deal() {
            this.playerCards.push(await this.drawCard());
            
            let newcard = await this.drawCard();
            newcard.showback = true;
            this.pcCards.push(newcard);
            this.playerCards.push(await this.drawCard());
            this.pcCards.push(await this.drawCard());
        },
        // Método para solicitar una carta del mazo.
        async drawCard(count = 1) {
            let resp = await fetch(`https://www.deckofcardsapi.com/api/deck/${this.deck.deck_id}/draw/?count=${count}`);
            let cardArr = await resp.json();
            let card = cardArr.cards[0];
            card.title = `${card.value} of ${card.suit}`;
            return card;
        },
        // Método para calcular el valor de la mano, considerando el valor especial del As.
        getCount(hand) {
            let result = {};
            let lowCount = 0;
            for (card of hand) {
                if (card.value === 'JACK' || card.value === 'KING' || card.value === 'QUEEN') lowCount += 10;
                else if (card.value === 'ACE') lowCount += 1;
                else lowCount += Number(card.value);
            }
            let highCount = 0;
            let oneAce = false;
            for (card of hand) {
                if (card.value === 'JACK' || card.value === 'KING' || card.value === 'QUEEN') highCount += 10;
                else if (card.value === 'ACE') {
                    if (oneAce) highCount += 1;
                    else {
                        highCount += 11;
                        oneAce = true;
                    }
                }
                else highCount += Number(card.value);
            }
            return { lowCount, highCount };
        },
        // Método para que el jugador pida una carta.
        async hitMe() {
            this.hitMeDisabled = true;
            this.playerCards.push(await this.drawCard());
            let count = this.getCount(this.playerCards);
            if (count.lowCount >= 22) {
                this.playerTurn = false;
                this.playerBusted = true;
            }
            this.hitMeDisabled = false;
        },
        // Método para iniciar un nuevo juego.
        async newGame() {
            this.pcBusted = false;
            this.playerBusted = false;
            this.playerWon = false;
            this.pcWon = false;
            this.playerCards = [];
            this.pcCards = [];
            await this.shuffleDeck();
            await this.deal();
            this.playerTurn = true;
        },
        // Método para que el jugador se plante y pase el turno al dealer.
        async stay() {
            this.playerTurn = false;
            this.pcTurn = true;
            this.startDealer();
        },
        // Método para controlar el turno del dealer.
        async startDealer() {
            this.pcText = 'El dealer comienza su turno...';
            await delay(DEALER_PAUSE);

            this.pcText = 'Déjame mostrar mi mano...';
            await delay(DEALER_PAUSE);

            this.pcCards[0].showback = false;

            let playerCount = this.getCount(this.playerCards);
            let playerScore = playerCount.lowCount;
            if (playerCount.highCount < 22) playerScore = playerCount.highCount;

            let dealerLoop = true;
            while (dealerLoop) {
                let count = this.getCount(this.pcCards);

                if (count.highCount <= 16) {
                    this.pcText = 'El dealer saca una carta...';
                    await delay(DEALER_PAUSE);
                    this.pcCards.push(await this.drawCard());
                } else if (count.highCount <= 21) {
                    this.pcText = 'El dealer se planta...';
                    await delay(DEALER_PAUSE);
                    dealerLoop = false;
                    this.pcTurn = false;
                    if (count.highCount >= playerScore) this.pcWon = true;
                    else this.playerWon = true;
                } else {
                    dealerLoop = false;
                    this.pcTurn = false;
                    this.pcBusted = true;
                }
            }
        },
        // Propiedades de la aplicación para controlar el estado del juego.
        deckSize: 6, // Tamaño del mazo.
        hitMeDisabled: false, // Estado del botón "Hit Me".
        playerCards: [], // Cartas del jugador.
        pcCards: [], // Cartas del PC (dealer).
        pcText: '', // Texto para mostrar acciones del dealer.
        // Estados para controlar el resultado del juego.
        pcBusted: false, // Si el dealer se ha pasado.
        pcWon: false, // Si el dealer ha ganado.
        playerBusted: false, // Si el jugador se ha pasado.
        playerWon: false, // Si el jugador ha ganado.
        pcTurn: false, // Si es el turno del dealer.
        playerTurn: true // Si es el turno del jugador.
    }))
});

// Función para crear un retraso.
async function delay(x) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), x);
    });
}
