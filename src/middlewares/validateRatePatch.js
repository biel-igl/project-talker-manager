const rateTrue = (number) => (
    !Number.isInteger(number) || number < 1 || number > 5
);

module.exports = (req, res, next) => {
    const { rate } = req.body;
    if (rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (rateTrue(rate)) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};