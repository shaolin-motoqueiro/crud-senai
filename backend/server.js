const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// CREATE
app.post('/usuarios', async (req, res) => {
  const { nome, email, idade } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, idade) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, idade]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// READ
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, idade } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nome=$1, email=$2, idade=$3 WHERE id=$4 RETURNING *',
      [nome, email, idade, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id=$1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));
