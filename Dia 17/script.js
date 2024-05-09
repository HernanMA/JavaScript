const container = document.getElementById('container');
const shadowRoot = container.attachShadow({ mode: 'open' });

const div = document.createElement('div');

div.classList.add('container');

shadowRoot.appendChild(div);

div.innerHTML = `
<div class="container">
<img id="foto" src="" alt="imagen">
<h2>My name is <br> <span id="nombre"></span></h2>

<div class="datos">
    <p>Correo: <span id="correo"></span></p>
    <p>Celular: <span id="telefono"></span></p>
    <p>Cumpleaños: <span id="Cumpleanos"></span></p>
    <p>Ubicación: <span id="ubicacion"></span></p>
    <p>Contraseña: <span id="password"></span></p>
</div>

<div id="infoHover"></div>

<div class="iconos">
    <div class="gg-user"></div>
    <div class="gg-voicemail-r"></div>  
    <div class="gg-calendar-dates"></div>
    <div class="gg-flag"></div>
    <div class="gg-smartphone-shake"></div>
    <div class="gg-block"></div>
</div>
</div>
`;

const nombre = shadowRoot.getElementById('nombre');
const correo = shadowRoot.getElementById('correo');
const telefono = shadowRoot.getElementById('telefono');
const foto = shadowRoot.getElementById('foto');
const Cumpleanos = shadowRoot.getElementById('Cumpleanos');
const ubicacion = shadowRoot.getElementById('ubicacion');
const password = shadowRoot.getElementById('password');
const iconos = shadowRoot.querySelectorAll('.iconos div');
const infoHover = shadowRoot.getElementById('infoHover');

let datoActual = null;

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
        infoHover.innerHTML = `${textoAdicional}:<br>${dato}`;
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
