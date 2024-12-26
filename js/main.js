let alumnos = [];  

// Función para cargar los alumnos desde un archivo JSON  
async function cargarAlumnos() {  
    try {  
        const response = await fetch('alumnos.json');  
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);  
        alumnos = await response.json();  
        renderizarTablaAlumnos();  
    } catch (error) {  
        console.error("Error al cargar alumnos:", error);  
        Swal.fire("Error", `No se pudieron cargar los alumnos: ${error.message}`, "error");  
    }  
}  

function capitalizarTexto(texto) {  
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();  
}  

function obtenerEstado(promedio) {  
    if (promedio < 4) {  
        return "Desaprobado";  
    } else if (promedio >= 4 && promedio < 7) {  
        return "Aprobado";  
    } else {  
        return "Promocionado";  
    }  
}  

function renderizarTablaAlumnos() {  
    const tbodyAlumnos = document.getElementById("tbodyAlumnos");  
    tbodyAlumnos.innerHTML = ""; // Limpiar tabla  
    alumnos.forEach((alumno) => {  
        const promedio = calcularPromedio(alumno);  
        const estado = obtenerEstado(promedio);  
        const tr = document.createElement("tr");  
        tr.innerHTML = `  
            <td>${capitalizarTexto(alumno.nombre)}</td>  
            <td>${capitalizarTexto(alumno.apellido)}</td>  
            <td>${alumno.nota1}</td>  
            <td>${alumno.nota2}</td>  
            <td>${alumno.nota3}</td>  
            <td>${promedio}</td>  
            <td>${estado}</td>  
            <td>  
                <button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button>  
            </td>  
        `;  
        tbodyAlumnos.appendChild(tr);  
    });  
    agregarEventosEliminar();  
}  

function calcularPromedio(alumno) {  
    return ((alumno.nota1 + alumno.nota2 + alumno.nota3) / 3).toFixed(2);  
}  

function agregarAlumno(e) {  
    e.preventDefault();  
    const nombre = capitalizarTexto(document.getElementById("nombreAlumno").value.trim());  
    const apellido = capitalizarTexto(document.getElementById("apellidoAlumno").value.trim());  
    const nota1 = parseFloat(document.getElementById("nota1Alumno").value);  
    const nota2 = parseFloat(document.getElementById("nota2Alumno").value);  
    const nota3 = parseFloat(document.getElementById("nota3Alumno").value);  
    const nuevoAlumno = { id: alumnos.length + 1, nombre, apellido, nota1, nota2, nota3 };  

    alumnos.push(nuevoAlumno);  
    renderizarTablaAlumnos();  
    Swal.fire("Éxito", "Alumno agregado correctamente", "success");  
    e.target.reset();  
}  

function eliminarAlumno(id) {  
    alumnos = alumnos.filter((alumno) => alumno.id != id);  
    renderizarTablaAlumnos();  
    Swal.fire("Éxito", "Alumno eliminado correctamente", "success");  
}  

document.getElementById("buscarAlumno").addEventListener("input", (e) => {  
    const texto = e.target.value.toLowerCase();  
    const alumnosFiltrados = alumnos.filter(  
        (alumno) =>  
            alumno.nombre.toLowerCase().includes(texto) ||  
            alumno.apellido.toLowerCase().includes(texto)  
    );  
    renderizarTablaFiltrada(alumnosFiltrados);  
});  

function renderizarTablaFiltrada(alumnosFiltrados) {  
    const tbodyAlumnos = document.getElementById("tbodyAlumnos");  
    tbodyAlumnos.innerHTML = "";  
    alumnosFiltrados.forEach((alumno) => {  
        const promedio = calcularPromedio(alumno);  
        const estado = obtenerEstado(promedio);  
        const tr = document.createElement("tr");  
        tr.innerHTML = `  
            <td>${capitalizarTexto(alumno.nombre)}</td>  
            <td>${capitalizarTexto(alumno.apellido)}</td>  
            <td>${alumno.nota1}</td>  
            <td>${alumno.nota2}</td>  
            <td>${alumno.nota3}</td>  
            <td>${promedio}</td>  
            <td>${estado}</td>  
            <td>  
                <button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button>  
            </td>  
        `;  
        tbodyAlumnos.appendChild(tr);  
    });  
    agregarEventosEliminar(); // Agregar eventos de eliminación a los botones filtrados  
}  

function agregarEventosEliminar() {  
    document.querySelectorAll(".btn-eliminar").forEach((button) => {  
        button.addEventListener("click", () => eliminarAlumno(button.dataset.id));  
    });  
}  

// Inicializar  
document.getElementById("formAgregarAlumno").addEventListener("submit", agregarAlumno);  
cargarAlumnos(); // Cargar alumnos desde el archivo JSON