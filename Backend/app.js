const express = require('express');
const bodyParser = require('body-parser');
const { Endereco } = require('./models');

const app = express();
app.use(bodyParser.json());

app.post('/api/enderecos', async (req, res) => {
  const { rua, cidade, estado, cep } = req.body;

  try {
    const novoEndereco = await Endereco.create({ rua, cidade, estado, cep });
    res.status(201).json(novoEndereco);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao salvar o endereço' });
  }
});

app.get('/api/enderecos', async (req, res) => {
  try {
    const enderecos = await Endereco.findAll();
    res.status(200).json(enderecos);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar os endereços' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
