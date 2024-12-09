const db = require('../config/db');

class Kategori {
    static create(namaCat) {
        const query = 'INSERT INTO category (namaCategory) VALUES (?)';
        return new Promise((resolve, reject) => {
            db.query(query, [namaCat], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static edit(namaCat, editNama) {
        const query = 'UPDATE category SET namaCategory = ? WHERE namaCategory = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [editNama, namaCat], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static delete(namaCat) {
        const query = 'DELETE FROM category WHERE namaCategory = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [namaCat], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static find(namaCat) {
        const query = 'SELECT * FROM category WHERE namaCategory = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [namaCat], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static get() {
        const query = 'SELECT namaCategory FROM category';
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

}

module.exports=Kategori;