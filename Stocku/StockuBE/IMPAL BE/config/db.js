const mysql = require('mysql2');

// Membuat koneksi ke database
const connection = 
mysql.createConnection({
    host:'',
    user:'',
    password:'',
    database:'stocku'
})

connection.connect((err)=> {
    if (err) throw err;
    console.log('Terkoneksi ke Database');
});

module.exports=connection;
