let a = 10;
let b = 2;
console.log(a*b);
console.log(typeof a)

let palabra1 = "Campus";
let palabra2 = "Lands";
concatenacion = palabra1 + palabra2;
console.log(concatenacion);


// ***************** FUNCIONES *****************


// ***************** FUNCION SIN RETORNO Y SIN PARAMETROS *****************
function funcionNormal(){
    console.log("Mi función");
}

// ***************** FUNCION SIN RETORNO Y CON PARAMETROS *****************
function suma(a,b){
    console.log(a+b);
}
// ***************** FUNCION CON RETORNO Y CON PARAMETROS *****************
function sumaR(a,b){
    //console.log(a+b);
    return a+b;
}
// ***************** FUNCION CON RETORNO Y SIN PARAMETROS *****************
function salonFavorito(){
    //console.log(a+b);
    return "P1";
}


// ***************** BUCLE FOR *****************

for (let i=0; i<5; i= i+1){
    console.log(i);   
}



// Actividad 1
let celcius = prompt("Por favor ingrese los grados centigrados");
fahrenheit = 32 + (9 * celcius / 5);
alert(fahrenheit);