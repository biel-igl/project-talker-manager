const express = require('express');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const { readJson, writeJson } = require('./handleJson');
const generateToken = require('./utils/generateToken');
const validateAuthorization = require('./middlewares/validateAuthorization');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalker = require('./middlewares/validateTalker');
const validateRateToQuery = require('./middlewares/validateRateToQuery');
const validateDateToQuery = require('./middlewares/validatedateToQuery');
const validateRate = require('./middlewares/validateRate');
const validateRatePatch = require('./middlewares/validateRatePatch');

const docPath = 'talker.json';

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await readJson(docPath);
  return res.status(200).json(talker); 
});

app.patch('/talker/rate/:id', validateAuthorization, validateRatePatch, async (req, res) => {
  const { rate } = req.body;
  const { id } = req.params;
  const talker = await readJson(docPath);
  const talkeById = talker.find((one) => one.id === Number(id));
  if (!talkeById) { return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); }
  talkeById.talk.rate = rate;
  await writeJson(docPath, [...talker, talkeById]);
  return res.status(204).json(talker[id - 1]);
});

app.get('/talker/search',
  validateAuthorization,
  validateRateToQuery,
  validateDateToQuery,
  async (req, res) => {
    const { q, rate, date } = req.query;
    const talker = await readJson(docPath);
    let filter = talker;
    if (q) filter = talker.filter((one) => one.name.includes(q));
    if (rate) filter = filter.filter((one) => one.talk.rate === Number(rate));
    if (date) filter = filter.filter((one) => one.talk.watchedAt === date);
    return res.status(200).json(filter); 
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readJson(docPath);
  const talkeById = talker.find((one) => one.id === Number(id));
  if (!talkeById) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkeById); 
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.post('/talker',
  validateAuthorization,
  validateName,
  validateAge,
  validateTalker,
  validateRate,
  async (req, res) => {
  const talker = await readJson(docPath);
  const id = talker.length + 1;
  await writeJson(docPath, [...talker, { ...req.body, id }]);
  return res.status(201).json({ ...req.body, id });
});

app.delete('/talker/:id',
  validateAuthorization, async (req, res) => {
    const { id } = req.params;
    const talker = await readJson(docPath);
    const talkerById = talker.filter((one) => one.id !== Number(id));
    await writeJson(docPath, talkerById);
    return res.sendStatus(204);
});

app.put('/talker/:id',
validateAuthorization,
validateName,
validateAge,
validateTalker,
validateRate,
async (req, res) => {
  const { id } = req.params;
  const talker = await readJson(docPath);
  const talkeById = talker.find((one) => one.id === Number(id));
  if (!talkeById) { return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); }
  const idNumber = parseInt(id, 32);
  talker[id - 1] = { id: idNumber, ...req.body };
  await writeJson(docPath, [...talker]);
  return res.status(200).json(talker[id - 1]);
});

app.listen(PORT, () => {
  console.log('Online');
});
