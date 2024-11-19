const db = require('../config/db');

class Admin {
    static create(username, email, password) {
        const query = 'INSERT INTO Administrator (username, pass, email) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(query, [username, password, email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static findUser(username) {
        const query = 'SELECT * FROM Administrator WHERE username = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [username], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static editEmail(username, email) {
        const query = 'UPDATE Administrator SET email = ? WHERE username = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [email, username], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports=Admin;