document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("start-btn");
    const hitBtn = document.getElementById("hit-btn");
    const standBtn = document.getElementById("stand-btn");
    const playerHand = document.getElementById("player-hand");
    const dealerHand = document.getElementById("dealer-hand");
    const resultDiv = document.getElementById("result");

    let deckId;
    let playerScore = 0;
    let dealerScore = 0;
    let playerHandCards = [];
    let dealerHandCards = [];

    startBtn.addEventListener("click", startGame);
    function startGame() {
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then(response => response.json())
            .then(data => {
                deckId = data.deck_id;
                playerScore = 0;
                dealerScore = 0;
                playerHandCards = [];
                dealerHandCards = [];
                resultDiv.textContent = "";
                drawCard("player");
                drawCard("player");
                drawCard("dealer");
                drawCard("dealer");
                hitBtn.style.display = "inline";
                standBtn.style.display = "inline";
                startBtn.style.display = "none";
            })
            .catch(error => console.log("Error:", error));
    }

    function drawCard(player) {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => response.json())
            .then(data => {
                const card = data.cards[0];
                const value = getCardValue(card);
                if (player === "player") {
                    playerHandCards.push(card);
                    playerScore += value;
                    renderHand(playerHand, playerHandCards);
                } else {
                    dealerHandCards.push(card);
                    dealerScore += value;
                    renderHand(dealerHand, dealerHandCards);
                }
            })
            .catch(error => console.log("Error:", error));
    }

    function getCardValue(card) {
        const value = parseInt(card.value);
        return isNaN(value) ? (card.value === "ACE" ? 11 : 10) : value;
    }

    function renderHand(handElement, handCards) {
        handElement.innerHTML = "";
        handCards.forEach(card => {
            const img = document.createElement("img");
            img.src = card.image;
            img.alt = card.code;
            img.classList.add("card");
            handElement.appendChild(img);
        });
    }

    hitBtn.addEventListener("click", () => {
        drawCard("player");
        if (playerScore > 21) {
            endGame("Dealer wins - Player busted!");
        }
    });

    standBtn.addEventListener("click", () => {
        while (dealerScore < 17) {
            drawCard("dealer");
        }
        if (dealerScore > 21 || dealerScore < playerScore) {
            endGame("Player wins!");
        } else if (dealerScore > playerScore) {
            endGame("Dealer wins!");
        } else {
            endGame("It's a tie!");
        }
    });

    function endGame(message) {
        resultDiv.textContent = message;
        hitBtn.style.display = "none";
        standBtn.style.display = "none";
        startBtn.style.display = "inline";
    }
});
