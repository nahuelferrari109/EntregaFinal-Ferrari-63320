/* Esta es la clase alumno donde se maneja al alumno saca el promedio y crea los tr*/

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
        return (this.nota1 + this.nota2 + this.nota3) / 3;
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
        tdPromedio.innerText = this.promedio.toFixed(2);

        const spanNota1 = document.createElement("span");
        spanNota1.innerText = this.nota1;
        spanNota1.addEventListener("click", () => clickSpan(tdNota1, spanNota1, this, "nota1"));

        const spanNota2 = document.createElement("span");
        spanNota2.innerText = this.nota2;
        spanNota2.addEventListener("click", () => clickSpan(tdNota2, spanNota2, this, "nota2"));

        const spanNota3 = document.createElement("span");
        spanNota3.innerText = this.nota3;
        spanNota3.addEventListener("click", () => clickSpan(tdNota3, spanNota3, this, "nota3"));

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
/* Esta funcion se encarga de buscar el alumno en la tabla*/
function buscarAlumno() {
    const value = inputBuscarAlumno.value.toLowerCase();
    alumnosFiltrados = alumnos.filter((el) => el.nombre.toLowerCase().includes(value));
    renderizarTablaAlumnos();
}
/* Esta funcion se encargar de guardar en localStorage*/ 
function guardarEnLS() {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}
 
function trasformarAlumnosLocalStorage(alumnosJSON) {
    if (!alumnosJSON) return [];
    return alumnosJSON.map((data) => new alumno(data.nombre, data.apellido, data.nota1, data.nota2, data.nota3));
}

function obtenerdeLS() {
    const alumnosLS = trasformarAlumnosLocalStorage(JSON.parse(localStorage.getItem("alumnos")));
    return alumnosLS.length > 0 ? alumnosLS : [
        new alumno("Nahuel", "Ferrari", 8, 9, 10),
        new alumno("Agustin", "Fernandez", 8, 8, 6)
    ];
}

/* Esta funcion crea al alumno y pone un alerta cuando esta creado */
function crearAlumno(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreAlumno").value;
    const apellido = document.getElementById("apellidoAlumno").value;
    const nota1 = parseFloat(document.getElementById("nota1Alumno").value);
    const nota2 = parseFloat(document.getElementById("nota2Alumno").value);
    const nota3 = parseFloat(document.getElementById("nota3Alumno").value);

    const nuevoAlumno = new alumno(nombre, apellido, nota1, nota2, nota3);
    alumnos.push(nuevoAlumno);
    alumnosFiltrados.push(nuevoAlumno);

    guardarEnLS();
    renderizarTablaAlumnos();
    alert("Alumno agregado");
}
/* Esta funcion elimia al alumno*/
function eliminarAlumno(alumno) {
    alumnos = alumnos.filter((el) => el !== alumno);
    alumnosFiltrados = [...alumnos];
    guardarEnLS();
    renderizarTablaAlumnos();
}
/* Esta funcion sirve para modificar las notas de los alumnos*/
function clickSpan(td, span, alumno, key) {
    const input = document.createElement("input");
    input.type = "number";
    input.value = alumno[key];
    input.addEventListener("change", () => {
        alumno[key] = parseFloat(input.value);
        alumno.promedio = alumno.calcularPromedio();
        guardarEnLS();
        renderizarTablaAlumnos();
    });

    td.append(input);
    span.style.display = "none";
}
/* Esta funcion renderiza constante mente la tabla para que se agregue o desaparezcan los alumnos*/
function renderizarTablaAlumnos() {
    tbodyAlumnos.innerHTML = "";
    alumnosFiltrados.forEach((alumno) => tbodyAlumnos.append(alumno.crearTr()));
}
/* PPL */ 
const formAgregarAlumno = document.getElementById("formAgregarAlumno");
const tbodyAlumnos = document.getElementById("tbodyAlumnos");
const inputBuscarAlumno = document.getElementById("buscarAlumno");

let alumnos = obtenerdeLS();
let alumnosFiltrados = [...alumnos];

renderizarTablaAlumnos();

formAgregarAlumno.addEventListener("submit", crearAlumno);
inputBuscarAlumno.addEventListener("input", buscarAlumno);
