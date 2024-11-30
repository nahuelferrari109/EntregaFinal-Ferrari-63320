let alumnos = [];

/* 
Esta función captura cuántas notas ingresará el profesor y valida que no sea nulo.
*/
function capturarCantidadNotas() {
    const intentosMaximos = 3;
    let intentos = 0;

    while (intentos < intentosMaximos) {
        const cantidadNotas = parseFloat(prompt("Ingrese la cantidad de notas del alumno: "));

        if (cantidadNotas > 0) {
            return cantidadNotas; // Sale de la función si el valor es válido.
        } else {
            alert("La cantidad debe ser mayor a 0. Intente nuevamente.");
            intentos++;
        }
    }

    alert("Se ingresaron datos inválidos 3 veces. Reinicie la página.");
    return 0; // Retorna 0 si se agotaron los intentos.
}

/* 
Esta función suma las notas ingresadas por el profesor y verifica que sean números válidos.
*/
function sumaDeNotas(cantidadNotas) {
    let suma = 0;

    for (let i = 0; i < cantidadNotas; i++) {
        const nota = parseFloat(prompt(`Ingrese la nota del alumno (entre 0 y 10): `));

        if (!isNaN(nota) && nota >= 0 && nota <= 10) {
            suma += nota;
        } else {
            alert("Ingrese nuevamente un número válido para la nota.");
            i--; // Repetir el intento para esta nota.
        }
    }

    return suma;
}

/* 
Esta función calcula el promedio de las notas.
*/
function calcularPromedio(cantidadNotas, sumaDeNotas) {
    return sumaDeNotas / cantidadNotas;
}

/* 
Esta función evalúa si el alumno promocionó, aprobó o desaprobó la materia.
*/
function promocion(promedio) {
    if (promedio >= 7) {
        return "Felicitaciones, promocionaste. Tu promedio es: " + promedio.toFixed(2);
    } else if (promedio >= 4) {
        return "Aprobaste la materia. Deberás rendir el final. Tu promedio es: "+ promedio.toFixed(2);
    } else {
        return "Desaprobaste la materia. Tu promedio es: " + promedio.toFixed(2) ;
    }
}

/* 
Función para buscar un alumno por su nombre o apellido.
*/
function buscarAlumno(busqueda) {
    return alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        alumno.apellido.toLowerCase().includes(busqueda.toLowerCase())
    );
}

/* 
Función para mostrar el resultado del alumno y guardar sus datos.
*/
function mostrarResultado() {
    const nombreAlumno = prompt("Ingrese el nombre del alumno: ");
    const apellidoAlumno = prompt("Ingrese el apellido del alumno: ");

    if (!nombreAlumno || !apellidoAlumno) {
        alert("El nombre y apellido son obligatorios. Intente nuevamente.");
        return;
    }

    const cantidadNotas = capturarCantidadNotas();
    if (cantidadNotas === 0) return; // Detener si no se ingresaron notas válidas.

    const suma = sumaDeNotas(cantidadNotas);
    const promedio = calcularPromedio(cantidadNotas, suma);
    const mensajeDePromocion = promocion(promedio);

    const alumno = {
        nombre: nombreAlumno,
        apellido: apellidoAlumno,
        promedioAlumno: promedio,
    };

    alumnos.push(alumno);
    alert(`${alumno.apellido} ${alumno.nombre}: ${mensajeDePromocion}`);
}

/* 
Función para buscar un alumno y mostrar sus datos.
*/
function busquedaAlumno() {
    const busqueda = prompt("Ingrese el nombre o el apellido del alumno a buscar: ");

    if (!busqueda) {
        alert("Debe ingresar un criterio de búsqueda.");
        return;
    }

    const resultado = buscarAlumno(busqueda);

    if (resultado.length > 0) {
        resultado.forEach(alumno => {
            alert( "Alumno: " + alumno.apellido + " " + alumno.nombre + " Promedio: " + alumno.promedioAlumno.toFixed(2));
        });
    } else {
        alert("No se encontraron alumnos que coincidan con el criterio de búsqueda.");
    }
}

// Programa Principal
mostrarResultado();
busquedaAlumno();