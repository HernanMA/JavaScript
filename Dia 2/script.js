const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function solicitarEntrada() {
    rl.question("Introduce el rol que ejerce el usuario: ", (Rol) => {
        rl.question("Introduce su nombre: ", (Nombre) => {
            const datos = {
                [Rol]: Nombre
            };
            const datosString = JSON.stringify(datos);
            fs.writeFile("datos.json", datosString, (err) => {
                if (err) {
                    console.error("Error al escribir en el archivo:", err);
                } else {
                    console.log("El json fue guardado correctamente en datos.json");
                }
                rl.close();
            });
        });
    });
}

function modificarArchivo() {
    fs.readFile("datos.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error al leer el archivo:", err);
            rl.close();
            return;
        }
        const datos = JSON.parse(data);
        rl.question("Introduce el Rol que desea modificar: ", (Rol) => {
            rl.question("Introduce el nuevo nombre: ", (Nombre) => {
                datos[Rol] = Nombre;
                const datosString = JSON.stringify(datos);
                fs.writeFile("datos.json", datosString, (err) => {
                    if (err) {
                        console.error("Error al escribir en el archivo:", err);
                    } else {
                        console.log("Los datos se han modificado correctamente en el json");
                    }
                    rl.close();
                });
            });
        });
    });
}

function mostrarJSON() {
    fs.readFile("datos.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error al leer el archivo:", err);
            rl.close();
            return;
        }
        const datos = JSON.parse(data);
        console.log("Contenido del archivo JSON:");
        console.log(datos);
        rl.close();
    });
}

function iniciarPrograma() {
    rl.question("¿Qué acción deseas realizar? (crear/modificar/mostrar): ", (respuesta) => {
        if (respuesta.toLowerCase() == "crear") {
            solicitarEntrada();
        } else if (respuesta.toLowerCase() == "modificar") {
            modificarArchivo();
        } else if (respuesta.toLowerCase() == "mostrar") {
            mostrarJSON();
        } else {
            console.log("Opción no válida");
            rl.close();
        }
    });
}

iniciarPrograma();
