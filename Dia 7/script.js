document.getElementById('searchByName').addEventListener('click', function () {
    var name = prompt("Introduce el nombre del superhéroe:");
    if (name) {
        searchSuperheroByName(name);
    }
});

document.getElementById('searchByPower').addEventListener('click', function () {
    var power = prompt("Introduce el poder del superhéroe:");
    if (power) {
        searchSuperheroByPower(power);
    }
});

document.getElementById('randomHero').addEventListener('click', function () {
    getRandomSuperhero();
});

function searchSuperheroByName(name) {
    fetch(`https://superheroapi.com/api.php/6cc5657b0377e514d32a84daa08395e4/search/${name}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => console.error('Error:', error));
}

function searchSuperheroByPower(power) {
    fetch(`https://superheroapi.com/api.php/6cc5657b0377e514d32a84daa08395e4/search/${power}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => console.error('Error:', error));
}

function getRandomSuperhero() {
    fetch(`https://superheroapi.com/api.php/6cc5657b0377e514d32a84daa08395e4/${Math.floor(Math.random() * 731)}`)
        .then(response => response.json())
        .then(data => {
            displayResults([data]);
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(heroes) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (heroes.length === 0) {
        resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    heroes.forEach(hero => {
        var heroCard = `
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${hero.image.url}" class="card-img" alt="${hero.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${hero.name}</h5>
              <p class="card-text">Inteligencia: ${hero.powerstats.intelligence}</p>
              <p class="card-text">Fuerza: ${hero.powerstats.strength}</p>
              <p class="card-text">Velocidad: ${hero.powerstats.speed}</p>
              <p class="card-text">Publicado por: ${hero.biography.publisher}</p>
            </div>
          </div>
        </div>
      </div>
    `;
        resultsDiv.innerHTML += heroCard;
    });
}
