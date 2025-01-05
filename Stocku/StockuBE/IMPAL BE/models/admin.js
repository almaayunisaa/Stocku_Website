const db = require('../config/db');

/**
 * Class untuk menangani operasi database terkait administrator.
 */
class Admin {
    /**
     * Menambahkan administrator baru ke dalam database.
     * 
     * @param {string} username - Nama pengguna (username) administrator.
     * @param {string} email - Email administrator.
     * @param {string} password - Password yang telah di-hash untuk administrator.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Mencari administrator berdasarkan username.
     * 
     * @param {string} username - Nama pengguna (username) administrator yang dicari.
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

    /**
     * Memperbarui email administrator berdasarkan username.
     * 
     * @param {string} username - Nama pengguna (username) administrator.
     * @param {string} email - Email baru untuk administrator.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Mengambil email administrator berdasarkan username.
     * 
     * @param {string} username - Nama pengguna (username) administrator.
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query, dengan kolom email.
     */
    static getEmail(username) {
        const query = 'SELECT email FROM Administrator WHERE username = ?';
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
}

module.exports = Admin;
