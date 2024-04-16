// Se importa el módulo 'fs' (file system) para trabajar con archivos.
const fs = require("fs");

// Se importa el módulo 'readline' para leer datos desde la consola.
const readline = require("readline");

// Se crea una interfaz readline para leer desde y escribir en la consola.
const rl = readline.createInterface({
    input: process.stdin, // Establece la entrada estándar como la consola.
    output: process.stdout // Establece la salida estándar como la consola.
});

// Función para solicitar entrada al usuario y guardarla en un archivo JSON.
function solicitarEntrada() {
    // Se hace una pregunta al usuario para introducir el rol que ejerce.
    rl.question("Introduce el rol que ejerce el usuario: ", (Rol) => {
        // Se hace otra pregunta al usuario para introducir su nombre.
        rl.question("Introduce su nombre: ", (Nombre) => {
            // Se crea un objeto 'datos' con el rol como clave y el nombre como valor.
            const datos = {
                [Rol]: Nombre
            };

            // Se convierte el objeto 'datos' a una cadena JSON.
            const datosString = JSON.stringify(datos);

            // Se escribe la cadena JSON en un archivo llamado 'datos.json'.
            fs.writeFile("datos.json", datosString, (err) => {
                if (err) {
                    // Se muestra un mensaje de error si ocurre algún problema al escribir en el archivo.
                    console.error("Error al escribir en el archivo:", err);
                } else {
                    // Se muestra un mensaje de éxito si la escritura en el archivo es exitosa.
                    console.log("El json fue guardado correctamente en datos.json");
                }
                // Se cierra la interfaz readline después de terminar.
                rl.close();
            });
        });
    });
}

// Función para modificar un archivo JSON existente.
function modificarArchivo() {
    // Se lee el contenido del archivo 'datos.json'.
    fs.readFile("datos.json", "utf-8", (err, data) => {
        if (err) {
            // Se muestra un mensaje de error si ocurre algún problema al leer el archivo.
            console.error("Error al leer el archivo:", err);
            // Se cierra la interfaz readline después de terminar.
            rl.close();
            return;
        }

        // Se convierte el contenido del archivo JSON a un objeto JavaScript.
        const datos = JSON.parse(data);

        // Se pregunta al usuario el rol que desea modificar.
        rl.question("Introduce el Rol que desea modificar: ", (Rol) => {
            // Se pregunta al usuario el nuevo valor para el rol.
            rl.question("Introduce el nuevo nombre: ", (Nombre) => {
                // Se actualiza el valor del rol en el objeto 'datos'.
                datos[Rol] = Nombre;

                // Se convierte el objeto 'datos' actualizado a una cadena JSON.
                const datosString = JSON.stringify(datos);

                // Se escribe la cadena JSON actualizada en el archivo 'datos.json'.
                fs.writeFile("datos.json", datosString, (err) => {
                    if (err) {
                        // Se muestra un mensaje de error si ocurre algún problema al escribir en el archivo.
                        console.error("Error al escribir en el archivo:", err);
                    } else {
                        // Se muestra un mensaje de éxito si la escritura en el archivo es exitosa.
                        console.log("Los datos se han modificado correctamente en el json");
                    }
                    // Se cierra la interfaz readline después de terminar.
                    rl.close();
                });
            });
        });
    });
}

// Función para mostrar el contenido del archivo JSON.
function mostrarJSON() {
    // Se lee el contenido del archivo 'datos.json'.
    fs.readFile("datos.json", "utf-8", (err, data) => {
        if (err) {
            // Se muestra un mensaje de error si ocurre algún problema al leer el archivo.
            console.error("Error al leer el archivo:", err);
            // Se cierra la interfaz readline después de terminar.
            rl.close();
            return;
        }

        // Se convierte el contenido del archivo JSON a un objeto JavaScript.
        const datos = JSON.parse(data);
        
        // Se muestra el contenido del archivo JSON por la consola.
        console.log("Contenido del archivo JSON:");
        console.log(datos);

        // Se cierra la interfaz readline después de terminar.
        rl.close();
    });
}

// Función para iniciar el programa, preguntando al usuario qué acción desea realizar.
function iniciarPrograma() {
    // Se pregunta al usuario qué acción desea realizar.
    rl.question("¿Qué acción deseas realizar? (crear/modificar/mostrar): ", (respuesta) => {
        // Se verifica la respuesta del usuario y se llama a la función correspondiente.
        if (respuesta.toLowerCase() == "crear") {
            solicitarEntrada(); // Si el usuario elige 'crear', se llama a la función 'solicitarEntrada()'.
        } else if (respuesta.toLowerCase() == "modificar") {
            modificarArchivo(); // Si el usuario elige 'modificar', se llama a la función 'modificarArchivo()'.
        } else if (respuesta.toLowerCase() == "mostrar") {
            mostrarJSON(); // Si el usuario elige 'mostrar', se llama a la función 'mostrarJSON()'.
        } else {
            // Si la respuesta del usuario no coincide con ninguna de las opciones anteriores, se muestra un mensaje de error.
            console.log("Opción no válida");
            // Se cierra la interfaz readline después de terminar.
            rl.close();
        }
    });
}

// Se llama a la función 'iniciarPrograma()' para iniciar la ejecución del programa.
iniciarPrograma();
