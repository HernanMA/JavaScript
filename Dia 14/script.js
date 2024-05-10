document.addEventListener("DOMContentLoaded", function() {
    const btnMostrar = document.getElementById("Mostrar");
    const btnCrear = document.getElementById("Crear");
    const bodyDetail = document.querySelector(".body-detail");
    let heroes = []; // JSON de ejemplo

    // Función para mostrar los héroes cargados desde el archivo JSON
    function mostrarHeroesDesdeJSON() {
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                bodyDetail.innerHTML = "";
                data.forEach(heroe => {
                    const heroDiv = document.createElement("div");
                    heroDiv.textContent = `${heroe.superhero} - ${heroe.publisher} - ${heroe.alter_ego} - ${heroe.first_appearance} - ${heroe.characters}`;
                    bodyDetail.appendChild(heroDiv);
                });
            })
            .catch(error => {
                console.error("Error al cargar el archivo JSON:", error);
            });
    }

    const btnEliminarr = document.getElementById("Eliminar");
    btnEliminarr.addEventListener("click", function() {
        if(heroes.length > 0) {
            heroes.pop(); // Elimina el último héroe del array
            console.log("Héroe eliminado, héroes restantes:", heroes);
            location.reload(); // Recarga la página
        } else {
            console.log("No hay héroes para eliminar");
        }
    });


// Evento para eliminar el último héroe añadido cuando se hace clic en el botón "Eliminar"
const btnEliminar = document.getElementById("Eliminar");
btnEliminar.addEventListener("click", function() {
    if(heroes.length > 0) {
        heroes.pop(); // Elimina el último héroe del array
        console.log("Héroe eliminado, héroes restantes:", heroes);

        // Opcional: Actualizar la interfaz para reflejar el héroe eliminado
        const heroesDivs = bodyDetail.querySelectorAll("div");
        if(heroesDivs.length > 0) {
            bodyDetail.removeChild(heroesDivs[heroesDivs.length - 1]);
        }
    } else {
        console.log("No hay héroes para eliminar");
    }
});

    // Evento para actualizar los datos en el servidor cuando se hace clic en el botón "Actualizar"
    const btnActualizar = document.getElementById("Actualizar");
    btnActualizar.addEventListener("click", function () {
        fetch('/javascript/dia14/data.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(heroes) // Envía el array de héroes como JSON
        })
            .then(response => response.json())
            .then(data => {
                console.log('Datos guardados:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });


    // Evento para mostrar los héroes cuando se hace clic en el botón "Ver Heroes"
    btnMostrar.addEventListener("click", mostrarHeroesDesdeJSON);

    // Evento para agregar un nuevo héroe cuando se hace clic en el botón "Nuevo Heroe"
    btnCrear.addEventListener("click", function() {
        const characterName = document.getElementById("characterName").value;
        const actorName = document.getElementById("actorName").value;
        const age = document.getElementById("age").value;
        const cityName = document.getElementById("cityName").value;
        const poster = document.getElementById("poster").value;
        const dateAppears = document.getElementById("dateAppears").value;
        const producer = document.getElementById("producer").value;
        const suits = document.querySelectorAll(".suit");

        let suitsArray = [];
        suits.forEach(suit => {
            if(suit.value !== "") { // Asegurarse de que el valor no esté vacío
                suitsArray.push(suit.value);
            }
        });

        const nuevoHeroe = {
            superhero: characterName,
            publisher: producer,
            alter_ego: actorName,
            first_appearance: dateAppears,
            characters: suitsArray.join(", ")
        };

        heroes.push(nuevoHeroe);
        console.log("Nuevo héroe agregado:", nuevoHeroe);

        // Opcional: Actualizar la interfaz con el nuevo héroe
        const heroDiv = document.createElement("div");
        heroDiv.textContent = `${nuevoHeroe.superhero} - ${nuevoHeroe.publisher} - ${nuevoHeroe.alter_ego} - ${nuevoHeroe.first_appearance} - ${nuevoHeroe.characters}`;
        bodyDetail.appendChild(heroDiv);
    });
});
