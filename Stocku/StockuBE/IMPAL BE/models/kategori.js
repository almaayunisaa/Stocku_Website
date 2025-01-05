const db = require('../config/db');

/**
 * Kelas untuk menangani operasi CRUD pada tabel kategori di database.
 */
class Kategori {
    /**
     * Menambahkan kategori baru ke dalam database.
     * 
     * @param {string} namaCat - Nama kategori yang akan ditambahkan.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Mengedit nama kategori yang sudah ada di database.
     * 
     * @param {string} namaCat - Nama kategori yang akan diubah.
     * @param {string} editNama - Nama baru untuk kategori.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Menghapus kategori dari database berdasarkan nama.
     * 
     * @param {string} namaCat - Nama kategori yang akan dihapus.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Mencari kategori berdasarkan nama di database.
     * 
     * @param {string} namaCat - Nama kategori yang dicari.
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

    /**
     * Mengambil semua kategori dari database.
     * 
     * @returns {Promise<Object[]>} Promise yang berisi array kategori dari database.
     */
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

module.exports = Kategori;
