const db = require('./db');

db.query('SELECT NOW()', [])
  .then(res => {
    console.log('Conexión exitosa:', res.rows[0]);
  })
  .catch(err => {
    console.error('Error en la conexión', err.stack);
  });
