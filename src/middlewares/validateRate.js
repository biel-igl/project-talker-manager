const returnTrue = (rate) => (!rate && rate !== 0);

module.exports = (rate, res) => {
    if (returnTrue(rate)) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (rate < 1 || !Number.isInteger(rate) || rate > 5) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
};