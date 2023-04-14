const fs = require('fs').promises;
const path = require('path');

const readJson = async (nameFile) => {
    const filePath = path.resolve(__dirname, nameFile);
    const fileRead = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileRead);
};

module.exports = { readJson };
