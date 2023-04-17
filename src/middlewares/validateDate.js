module.exports = (watchedAt, res) => {
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateFormat.test(watchedAt)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
};