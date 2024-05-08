const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const foto = document.querySelector('#foto');
const Cumpleanos = document.querySelector('#Cumpleanos');
const ubicacion = document.querySelector('#ubicacion');
const password = document.querySelector('#password');
const iconos = document.querySelectorAll('.iconos div');
const infoHover = document.querySelector('#infoHover');

const generarUsuario = async () => {
    const url = 'https://randomuser.me/api/';
    const respuesta = await fetch(url);
    const { results } = await respuesta.json();
    const datos = results[0];

    foto.src = datos.picture.medium;
    nombre.textContent = datos.name.first;
    correo.textContent = datos.email;
    telefono.textContent = datos.phone;
    Cumpleanos.textContent = datos.dob.date;
    ubicacion.textContent = datos.location.city;
    password.textContent = datos.login.password;
}

const mostrarDato = (dato, textoAdicional) => {
    if (dato !== datoActual) {
        infoHover.textContent = `${textoAdicional}: ${dato}`;
        datoActual = dato;
    }
}

const limpiarInfo = () => {
    infoHover.textContent = '';
    datoActual = null;
}

generarUsuario();

iconos.forEach((icono, index) => {
    icono.addEventListener('mouseover', () => {
        switch (index) {
            case 0:
                mostrarDato(nombre.textContent, 'Hola, Mi nombre es');
                break;
            case 1:
                mostrarDato(correo.textContent, 'Mi correo es');
                break;
            case 2:
                mostrarDato(telefono.textContent, 'Mi número de telefono es');
                break;
            case 3:
                mostrarDato(Cumpleanos.textContent, 'Mi fecha de cumpleaños es');
                break;
            case 4:
                mostrarDato(ubicacion.textContent, 'Yo me ubico en');
                break;
            case 5:
                mostrarDato(password.textContent, 'Mi contraseña es');
                break;
        }
    });

    icono.addEventListener('mouseout', limpiarInfo);
});
