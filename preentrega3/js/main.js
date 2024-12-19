/* Esta es la clase alumno donde se maneja al alumno, saca el promedio y crea los tr */
class alumno {
    constructor(nombre, apellido, nota1, nota2, nota3) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.promedio = this.calcularPromedio();
    }

    calcularPromedio() {
        return ((this.nota1 + this.nota2 + this.nota3) / 3).toFixed(2);
    }

    crearTr() {
        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        const tdApellido = document.createElement("td");
        const tdNota1 = document.createElement("td");
        const tdNota2 = document.createElement("td");
        const tdNota3 = document.createElement("td");
        const tdPromedio = document.createElement("td");
        const tdAcciones = document.createElement("td");

        tdNombre.innerText = this.nombre;
        tdApellido.innerText = this.apellido;
        tdPromedio.innerText = this.promedio;

        // Agregar listeners a las notas
        const spanNota1 = crearSpanEditable(this.nota1, tdNota1, this, "nota1");
        const spanNota2 = crearSpanEditable(this.nota2, tdNota2, this, "nota2");
        const spanNota3 = crearSpanEditable(this.nota3, tdNota3, this, "nota3");

        tdNota1.append(spanNota1);
        tdNota2.append(spanNota2);
        tdNota3.append(spanNota3);

        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.addEventListener("click", () => eliminarAlumno(this));

        tdAcciones.append(botonEliminar);
        tr.append(tdNombre, tdApellido, tdNota1, tdNota2, tdNota3, tdPromedio, tdAcciones);

        return tr;
    }
}

/* Crear span editable */
function crearSpanEditable(valor, td, alumno, key) {
    const span = document.createElement("span");
    span.innerText = valor;
    span.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "number";
        input.value = valor;
        input.addEventListener("blur", () => {
            const nuevoValor = parseFloat(input.value);
            if (nuevoValor >= 0 && nuevoValor <= 10) {
                alumno[key] = nuevoValor;
                alumno.promedio = alumno.calcularPromedio();
                guardarEnLS();
                renderizarTablaAlumnos();
            } else {
                Swal.fire("Error", "La nota debe estar entre 0 y 10", "error");
            }
        });
        td.innerHTML = "";
        td.appendChild(input);
        input.focus();
    });
    return span;
}

/* Buscar alumnos */
function buscarAlumno() {
    const value = inputBuscarAlumno.value.toLowerCase();
    alumnosFiltrados = alumnos.filter((el) =>
        el.nombre.toLowerCase().includes(value) || el.apellido.toLowerCase().includes(value)
    );
    renderizarTablaAlumnos();
}

/* Guardar en localStorage */
function guardarEnLS() {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}

function transformarAlumnosLocalStorage(alumnosJSON) {
    if (!alumnosJSON) return [];
    return alumnosJSON.map(
        (data) => new alumno(data.nombre, data.apellido, data.nota1, data.nota2, data.nota3)
    );
}

function obtenerDeLS() {
    const alumnosLS = transformarAlumnosLocalStorage(JSON.parse(localStorage.getItem("alumnos")));
    return alumnosLS.length > 0
        ? alumnosLS
        : [
            new alumno("Nahuel", "Ferrari", 8, 9, 10),
            new alumno("Agustín", "Fernández", 7, 8, 9),
        ];
}

/* Crear alumno */
function crearAlumno(e) {
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

    const nuevoAlumno = new alumno(nombre, apellido, nota1, nota2, nota3);
    alumnos.push(nuevoAlumno);
    alumnosFiltrados.push(nuevoAlumno);

    guardarEnLS();
    renderizarTablaAlumnos();
    Swal.fire("Éxito", "Alumno agregado correctamente", "success");
}

/* Eliminar alumno */
function eliminarAlumno(alumno) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás deshacer esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            alumnos = alumnos.filter((el) => el !== alumno);
            alumnosFiltrados = [...alumnos];
            guardarEnLS();
            renderizarTablaAlumnos();
            Swal.fire("Eliminado", "El alumno fue eliminado", "success");
        }
    });
}

/* Renderizar tabla */
function renderizarTablaAlumnos() {
    tbodyAlumnos.innerHTML = "";
    alumnosFiltrados.forEach((alumno) => tbodyAlumnos.append(alumno.crearTr()));
}

/* PPL */
const formAgregarAlumno = document.getElementById("formAgregarAlumno");
const tbodyAlumnos = document.getElementById("tbodyAlumnos");
const inputBuscarAlumno = document.getElementById("buscarAlumno");

let alumnos = obtenerDeLS();
let alumnosFiltrados = [...alumnos];

renderizarTablaAlumnos();

formAgregarAlumno.addEventListener("submit", crearAlumno);
inputBuscarAlumno.addEventListener("input", buscarAlumno);
