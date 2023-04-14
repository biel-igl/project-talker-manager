const express = require('express');
const { readJson } = require('./handleJson');

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

app.listen(PORT, () => {
  console.log('Online');
});
