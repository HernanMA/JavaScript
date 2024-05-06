let Heroes = [];

function init(){
    loadHeroes();
}

function loadHeroes(){
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let responseObject = JSON.parse(xhttp.responseText);
            Heroes = responseObject;
            render();
        }
    };

    xhttp.open("GET", "data.json", true);
    xhttp.send();
}

function render(){
    let content = "";
    Heroes.forEach(heroe =>{
        content += `
            <div>
                <p> Heroe: ${heroe.superhero}</p>
                <br/>
                <p> Universo: ${heroe.publisher}</p>
            </div>
        `
    })
    document.getElementById("Heroediv").innerHTML = content;
}


