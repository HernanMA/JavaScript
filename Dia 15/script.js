const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const foto = document.querySelector('#foto');
const Cumpleanos = document.querySelector('#Cumpleanos')
const ubicacion = document.querySelector('#ubicacion')
const password = document.querySelector('#password')

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

document.addEventListener('DOMContentLoaded', generarUsuario);