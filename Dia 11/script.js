// Selecciona elementos del DOM relacionados con la información del Pokémon
const pokemonName = document.querySelector('.pokemon__name'); // Elemento para mostrar el nombre del Pokémon
const pokemonNumber = document.querySelector('.pokemon__number'); // Elemento para mostrar el número del Pokémon
const pokemonImage = document.querySelector('.pokemon__image'); // Elemento para mostrar la imagen del Pokémon

// Selecciona elementos del DOM relacionados con el formulario de búsqueda
const form = document.querySelector('.form'); // Formulario de búsqueda de Pokémon
const input = document.querySelector('.input__search'); // Entrada de texto para ingresar el nombre o número del Pokémon
const buttonPrev = document.querySelector('.btn-prev'); // Botón para buscar el Pokémon anterior
const buttonNext = document.querySelector('.btn-next'); // Botón para buscar el Pokémon siguiente

let searchPokemon = 1; // Inicializa el número de Pokémon a buscar

// Función asincrónica para obtener datos de un Pokémon desde la API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

// Función asincrónica para renderizar la información del Pokémon
const renderPokemon = async (pokemon) => {

    // Muestra un mensaje de carga mientras se obtienen los datos del Pokémon
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    // Si el número de Pokémon buscado está por encima del número máximo conocido
    if (pokemon > 649) {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Pokemon not found :c'; // Muestra un mensaje de "Pokemon no encontrado"
        pokemonNumber.innerHTML = '';
        return; // Finaliza la función sin continuar con la obtención de datos
    }

    // Obtiene los datos del Pokémon mediante la función fetchPokemon
    const data = await fetchPokemon(pokemon);

    // Si se obtienen los datos del Pokémon
    if (data) {
        // Muestra la imagen del Pokémon, su nombre y número
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = ''; // Limpia el campo de entrada de búsqueda
        searchPokemon = data.id; // Actualiza el número de Pokémon buscado
    } else {
        // Si no se encuentran datos del Pokémon, muestra un mensaje de error
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
    }
}

// Escucha el evento de envío del formulario de búsqueda
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    renderPokemon(input.value.toLowerCase()); // Llama a la función renderPokemon con el valor ingresado en minúsculas
});

// Escucha el evento de clic en el botón de búsqueda del Pokémon anterior
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) { // Verifica que el número de Pokémon buscado no sea menor que 1
        searchPokemon -= 1; // Reduce en 1 el número de Pokémon buscado
        renderPokemon(searchPokemon); // Renderiza la información del Pokémon con el nuevo número
    }
});

// Escucha el evento de clic en el botón de búsqueda del Pokémon siguiente
buttonNext.addEventListener('click', () => {
    searchPokemon += 1; // Aumenta en 1 el número de Pokémon buscado
    renderPokemon(searchPokemon); // Renderiza la información del Pokémon con el nuevo número
});

// Renderiza la información del primer Pokémon al cargar la página
renderPokemon(searchPokemon);
