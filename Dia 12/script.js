const API_URL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=20';
let jugadorMazo = [];
let computadoraMazo = [];
let puntajeJugador = 0;
let puntajeComputadora = 0;
let deckId = null;

async function iniciarJuego() {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();

    deckId = datos.deck_id;
    jugadorMazo = datos.cards.slice(0, 10);
    computadoraMazo = datos.cards.slice(10, 20);

    mostrarCartasEnMano(jugadorMazo, 'jugador');
}

function mostrarCartasEnMano(cartas, jugador) {
    const contenedor = document.getElementById(jugador === 'jugador' ? 'mano-jugador' : 'mano-computadora');
    contenedor.innerHTML = '';

    cartas.forEach((carta, index) => {
        const elementoCarta = document.createElement('img');
        elementoCarta.className = 'card';
        elementoCarta.src = carta.image;
        elementoCarta.alt = `${carta.value} ${carta.suit}`;
        elementoCarta.onclick = () => jugarCarta(jugador, carta, index);
        contenedor.appendChild(elementoCarta);
    });
}

function jugarCarta(jugador, cartaJugada, index) {
    if (!cartasHabilitadas) {
        return;
    }

    cartasHabilitadas = false;

    const cartaComputadora = computadoraMazo[Math.floor(Math.random() * computadoraMazo.length)];

    mostrarCartasSeleccionadas(cartaJugada, cartaComputadora);

    setTimeout(() => {
        const resultado = compararCartas(cartaJugada, cartaComputadora);
        actualizarPuntaje(resultado);

        jugadorMazo.splice(index, 1);
        computadoraMazo.splice(computadoraMazo.indexOf(cartaComputadora), 1);

        mostrarCartasEnMano(jugadorMazo, 'jugador');
        ocultarCartaComputadora();

        setTimeout(() => {
            cartasHabilitadas = true;
        }, 2000);
    }, 2000);
}

function mostrarCartasSeleccionadas(cartaJugador, cartaComputadora) {
    const contenedorCartas = document.getElementById('cartas-seleccionadas');
    contenedorCartas.innerHTML = '';

    const cartaJugadorElemento = document.createElement('img');
    cartaJugadorElemento.className = 'carta-seleccionada';
    cartaJugadorElemento.src = cartaJugador.image;
    cartaJugadorElemento.alt = `${cartaJugador.value} ${cartaJugador.suit}`;
    contenedorCartas.appendChild(cartaJugadorElemento);

    const vsElemento = document.createElement('span');
    vsElemento.className = 'vs';
    vsElemento.textContent = 'vs';
    contenedorCartas.appendChild(vsElemento);

    const cartaComputadoraElemento = document.createElement('img');
    cartaComputadoraElemento.className = 'carta-seleccionada';
    cartaComputadoraElemento.src = cartaComputadora.image;
    cartaComputadoraElemento.alt = `${cartaComputadora.value} ${cartaComputadora.suit}`;
    contenedorCartas.appendChild(cartaComputadoraElemento);

    setTimeout(() => {
        contenedorCartas.innerHTML = '';
    }, 2000);
}

let cartasHabilitadas = true;

function compararCartas(cartaJugador, cartaComputadora) {
    const valorCartaJugador = getValorCarta(cartaJugador);
    const valorCartaComputadora = getValorCarta(cartaComputadora);

    if (valorCartaJugador > valorCartaComputadora) {
        return 'Ganaste la ronda!';
    } else if (valorCartaJugador < valorCartaComputadora) {
        return 'La Computadora ganó la ronda.';
    } else {
        return 'Empate en la ronda.';
    }
}

function getValorCarta(carta) {
    const valores = {
        'ACE': 14,
        'KING': 13,
        'QUEEN': 12,
        'JACK': 11
    };
    return valores[carta.value] || parseInt(carta.value);
}

function actualizarPuntaje(resultado) {
    if (resultado === 'Ganaste la ronda!') {
        puntajeJugador++;
    } else if (resultado === 'La Computadora ganó la ronda.') {
        puntajeComputadora++;
    }
    document.getElementById('info-juego').textContent = `Puntuación Jugador: ${puntajeJugador} | Puntuación Computadora: ${puntajeComputadora}`;
}

function mostrarGanador() {
    let mensaje = '';
    if (puntajeJugador > puntajeComputadora) {
        mensaje = '¡Felicidades, has ganado!';
    } else if (puntajeJugador < puntajeComputadora) {
        mensaje = 'La Computadora ha ganado.';
    } else {
        mensaje = 'Empate.';
    }
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<h1>${mensaje}</h1>`;
}

function ocultarCartaComputadora() {
    const cartaComputadora = document.getElementById('carta-computadora');
    cartaComputadora.style.display = 'none';
}

function mostrarCartaComputadora(carta) {
    const cartaComputadora = document.getElementById('carta-computadora');
    cartaComputadora.src = carta.image;
    cartaComputadora.alt = `${carta.value} ${carta.suit}`;
    cartaComputadora.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', iniciarJuego);
