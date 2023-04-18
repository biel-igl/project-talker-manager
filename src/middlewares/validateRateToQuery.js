module.exports = (req, res, next) => {
    const { rate } = req.query;
    const number = Number(rate);
    if (!Number.isInteger(number) || number < 1 || number > 5) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};