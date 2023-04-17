const validateDate = require('./validateDate');
const validateRade = require('./validateRate');

module.exports = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    const { watchedAt, rate } = req.body.talk;
    return validateDate(watchedAt, res)
    || validateRade(rate, res)
    || next();
};