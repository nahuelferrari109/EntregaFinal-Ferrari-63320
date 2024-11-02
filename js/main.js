
/* 
Esta funcion sirve para saber cuantas notas va a ingresar el profesor
 y validar para que no sea nulo
*/
function cantidadNota(){
    
    const contador = 3
   
    let cantidadNotas;
    
    for (let i = 0 ; i < contador; i++){
        cantidadNotas = parseFloat(prompt("Ingrese la cantidad de notas del alumno: "));

        if(cantidadNotas > 0){
        
        return cantidadNotas;
       }
       
       else{
        
        alert ("La cantidad debe ser  major a 0. Intente nuevamente: ")
        
        
        }
    
    }
   
    return  alert("Ingreso mal la cantidad 3 veces reinicie la pagina.");
}



/* 
Esta funcion suma notas las notas ingresadas por el profesor y verifica que sean numeros.
*/
function sumaDeNotas(cantidadNotas){
    
    let sumaDeNotas = 0
    
    for (let i = 0 ; i < cantidadNotas ; i++ ){
        
        const notas = parseInt(prompt("Ingrese la nota del alumno: "));
        
        if(!isNaN(notas)){
            
            sumaDeNotas = sumaDeNotas + notas;
        
        }
        else{
            
            alert("Ingrese nuevamente un numero valido para la nota");
            i--;
        }
    
    }
    
    return sumaDeNotas;

}

/* 
Esta funcion saca el promedio de las notas.
*/

function promedio (cantidadNotas, sumaDeNotas){

    const promedio = sumaDeNotas / cantidadNotas;

    return promedio;
}


/* 
Esta funcion te dice si el alumno promociono, aprobo o desaprobo la materia.
*/ 
function promocion (cantidadNotas){
    
    const totalNotas =  sumaDeNotas(cantidadNotas);

    const prom = promedio(cantidadNotas , totalNotas);

    if (cantidadNotas === 0){
        return "No se puede calcular la promocion porque no se ingresaron notas.";
    }

    const promocion = (prom >= 7);
    const aprobado = (prom >= 4) && (prom < 7) ;
    const desaprobado = (prom < 4);
    
    if (promocion){
       return "Felicitaciones promocionaste no tenes que rendir final. Tu nota es: "+ prom;
    }
    else if (aprobado) {
        return "Felcitaciones aprobaste la materias un paso mas que tenes que rendir el final. Tu nota es: "+ prom;
    }
    else if (desaprobado){
        return "Lamentablemente desprobaste la materia por lo tanto la tenes que recursar. Tu nota es: "+ prom;
    }
}


/*
Esta funcion pide el nombre y apellido y le dice al alumno que nota tiene.
*/
function mensajeDeNota (promocion){
    
    const nombreAlumno = prompt("Ingrese el nombre del alumno: ");
    const apellidoAlumno = prompt("Ingrese el apellido del alumno: ");
    
    const espacio = " ";
    
    alert(apellidoAlumno + espacio + nombreAlumno + espacio + promocion);
    
}


// PPL
const cantidadDenotas = cantidadNota()
mensajeDeNota(promocion(cantidadDenotas));

