const express = require('express');
const db = require('./db'); // Archivo que conecta a PostgreSQL

const app = express();
app.use(express.json()); // Para manejar JSON en las solicitudes

const PORT = 3000;

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡API funcionando!');
});

// 1. CRUD Usuarios

// Crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Usuarios (nombre, email, contraseña) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, contraseña]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Leer todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Usuarios', []);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// 2. CRUD Juegos

// Crear un nuevo juego
app.post('/juegos', async (req, res) => {
  const { nombre, plataforma, fecha_lanzamiento } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Juegos (nombre, plataforma, fecha_lanzamiento) VALUES ($1, $2, $3) RETURNING *',
      [nombre, plataforma, fecha_lanzamiento]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear juego' });
  }
});

// Leer todos los juegos
app.get('/juegos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Juegos', []);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener juegos' });
  }
});

// 3. CRUD Biblioteca

// Añadir un juego a la biblioteca de un usuario
app.post('/biblioteca', async (req, res) => {
  const { usuario_id, juego_id, fecha_adquisicion, fuente } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Biblioteca (usuario_id, juego_id, fecha_adquisicion, fuente) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, juego_id, fecha_adquisicion, fuente]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar juego a biblioteca' });
  }
});

// Leer todos los juegos en la biblioteca de un usuario
app.get('/biblioteca/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM Biblioteca WHERE usuario_id = $1',
      [usuario_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la biblioteca' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
