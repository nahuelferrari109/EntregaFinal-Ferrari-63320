const API_URL = "http://localhost:3000/alumnos";

let alumnos = [];

// Función para obtener los datos del servidor
async function obtenerAlumnos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener los alumnos");
        alumnos = await response.json();
        renderizarTablaAlumnos();
    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudieron cargar los alumnos", "error");
    }
}

// Función para renderizar los alumnos en la tabla
function renderizarTablaAlumnos() {
    const tbodyAlumnos = document.getElementById("tbodyAlumnos");
    tbodyAlumnos.innerHTML = ""; // Limpiar tabla

    alumnos.forEach((alumno) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.nota1}</td>
            <td>${alumno.nota2}</td>
            <td>${alumno.nota3}</td>
            <td>${calcularPromedio(alumno)}</td>
            <td>
                <button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button>
            </td>
        `;

        tbodyAlumnos.appendChild(tr);
    });

    // Agregar eventos para eliminar
    document.querySelectorAll(".btn-eliminar").forEach((button) => {
        button.addEventListener("click", () => eliminarAlumno(button.dataset.id));
    });
}

// Función para calcular el promedio de un alumno
function calcularPromedio(alumno) {
    return ((alumno.nota1 + alumno.nota2 + alumno.nota3) / 3).toFixed(2);
}

// Función para agregar un nuevo alumno
async function agregarAlumno(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreAlumno").value.trim();
    const apellido = document.getElementById("apellidoAlumno").value.trim();
    const nota1 = parseFloat(document.getElementById("nota1Alumno").value);
    const nota2 = parseFloat(document.getElementById("nota2Alumno").value);
    const nota3 = parseFloat(document.getElementById("nota3Alumno").value);

    if (!nombre || !apellido || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        Swal.fire("Error", "Todos los campos son obligatorios y deben ser válidos", "error");
        return;
    }

    const nuevoAlumno = { nombre, apellido, nota1, nota2, nota3 };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoAlumno),
        });

        if (!response.ok) throw new Error("Error al agregar el alumno");
        const alumnoAgregado = await response.json();

        alumnos.push(alumnoAgregado);
        renderizarTablaAlumnos();
        Swal.fire("Éxito", "Alumno agregado correctamente", "success");
        e.target.reset();
    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo agregar el alumno", "error");
    }
}

// Función para eliminar un alumno
async function eliminarAlumno(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al eliminar el alumno");

        alumnos = alumnos.filter((alumno) => alumno.id != id);
        renderizarTablaAlumnos();
        Swal.fire("Éxito", "Alumno eliminado correctamente", "success");
    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo eliminar el alumno", "error");
    }
}

// Función para filtrar alumnos
document.getElementById("buscarAlumno").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const alumnosFiltrados = alumnos.filter(
        (alumno) =>
            alumno.nombre.toLowerCase().includes(texto) ||
            alumno.apellido.toLowerCase().includes(texto)
    );
    renderizarTablaFiltrada(alumnosFiltrados);
});

// Renderizar tabla con los alumnos filtrados
function renderizarTablaFiltrada(alumnosFiltrados) {
    const tbodyAlumnos = document.getElementById("tbodyAlumnos");
    tbodyAlumnos.innerHTML = ""; // Limpiar tabla

    alumnosFiltrados.forEach((alumno) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.nota1}</td>
            <td>${alumno.nota2}</td>
            <td>${alumno.nota3}</td>
            <td>${calcularPromedio(alumno)}</td>
        `;

        tbodyAlumnos.appendChild(tr);
    });
}

// Inicializar la aplicación
document.getElementById("formAgregarAlumno").addEventListener("submit", agregarAlumno);
obtenerAlumnos();
