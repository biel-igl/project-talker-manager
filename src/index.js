const express = require('express');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const { readJson } = require('./handleJson');
const generateToken = require('./utils/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await readJson('talker.json');
  return res.status(200).json(talker); 
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readJson('talker.json');
  const talkeById = talker.find((one) => one.id === Number(id));
  if (!talkeById) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkeById); 
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
