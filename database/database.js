const Sequelize = require('sequelize');

const connection = new Sequelize('cadastroConcurso', 'root', '123honorato', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = connection;