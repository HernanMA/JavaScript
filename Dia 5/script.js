function esSegura(tablero, fila, columna) {
    for (let i = 0; i < columna; i++) {
        if (tablero[fila][i] === '*') {
            return false;
        }
    }
    for (let i = fila, j = columna; i >= 0 && j >= 0; i--, j--) {
        if (tablero[i][j] === '*') {
            return false;
        }
    }
    for (let i = fila, j = columna; i < 8 && j >= 0; i++, j--) {
        if (tablero[i][j] === '*') {
            return false;
        }
    }
    return true;
}

function resolver8Reinas(tablero, columna, reinasColocadas) {
    if (reinasColocadas === 8) {
        return true;
    }
    for (let i = 0; i < 8; i++) {
        if (esSegura(tablero, i, columna)) {
            tablero[i][columna] = '*';
            reinasColocadas++;
            if (resolver8Reinas(tablero, columna + 1, reinasColocadas)) {
                return true;
            }
            tablero[i][columna] = '0';
            reinasColocadas--;
        }
    }
    return false;
}

function crearMatrizConReinas(filaUsuario, columnaUsuario) {
    let tablero = new Array(8).fill('0').map(() => new Array(8).fill('0'));
    tablero[filaUsuario - 1][columnaUsuario - 1] = '*';
    let reinasColocadas = 1;
    if (!resolver8Reinas(tablero, 0, reinasColocadas)) {
        console.log('No se encontró una solución');
    } else {
        console.log(tablero.map(fila => fila.join(' ')).join('\n'));
    }
}

crearMatrizConReinas(8, 8);

