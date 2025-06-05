const mysql = require('mysql2');
const knex = require('knex');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stocku'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Terkoneksi ke Database (mysql2)');
});

const knexInstance = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'stocku'
    }
});

module.exports = {
    connection,
    knex: knexInstance
};
