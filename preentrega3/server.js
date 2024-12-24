const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());
app.use(cors()); // Habilitar CORS

// Datos iniciales
let alumnos = [
    { id: 1, nombre: "Nahuel", apellido: "Ferrari", nota1: 8, nota2: 9, nota3: 10 },
    { id: 2, nombre: "Agustín", apellido: "Fernández", nota1: 7, nota2: 8, nota3: 9 },
];

// Endpoints

// Obtener todos los alumnos
app.get('/alumnos', (req, res) => {
    res.json(alumnos);
});

// Crear un nuevo alumno
app.post('/alumnos', (req, res) => {
    const { nombre, apellido, nota1, nota2, nota3 } = req.body;

    // Validación básica de los campos
    if (!nombre || !apellido || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        return res.status(400).json({ error: "Todos los campos son requeridos y las notas deben ser números válidos." });
    }

    const nuevoAlumno = { id: alumnos.length + 1, nombre, apellido, nota1, nota2, nota3 };
    alumnos.push(nuevoAlumno);
    res.status(201).json(nuevoAlumno);
});

// Actualizar un alumno
app.put('/alumnos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, nota1, nota2, nota3 } = req.body;
    const index = alumnos.findIndex((alumno) => alumno.id == id);

    if (index !== -1) {
        // Validación de los campos
        if (!nombre || !apellido || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
            return res.status(400).json({ error: "Todos los campos son requeridos y las notas deben ser números válidos." });
        }

        alumnos[index] = { ...alumnos[index], nombre, apellido, nota1, nota2, nota3 };
        res.json(alumnos[index]);
    } else {
        res.status(404).json({ error: "Alumno no encontrado" });
    }
});

// Eliminar un alumno
app.delete('/alumnos/:id', (req, res) => {
    const { id } = req.params;
    const alumnoEliminado = alumnos.find((alumno) => alumno.id == id);

    if (alumnoEliminado) {
        alumnos = alumnos.filter((alumno) => alumno.id != id);
        res.status(200).json(alumnoEliminado); // Puedes devolver el alumno eliminado
    } else {
        res.status(404).json({ error: "Alumno no encontrado" });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
