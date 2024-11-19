const db = require('../config/db');

class Product {
    static create(namaCat, produk, id, stok, harga, cek, prediksi, deskripsi) {
        const query = 'INSERT INTO product (namaCategory, Produk, ID, Stok, harga, Cek, Prediksi, deskripsi) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(query, [namaCat, produk, id, stok, harga, cek, prediksi, deskripsi], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static findName(namaProduk) {
        const query = 'SELECT * FROM product WHERE Produk = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [namaProduk], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static findID(id) {
        const query = 'SELECT * FROM product WHERE ID = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static delete(id) {
        const query = 'DELETE FROM product WHERE ID = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static editNama(id, produk) {
        const query = 'UPDATE product SET Produk = ? WHERE ID = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [produk, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static editStok(id, stok) {
        const query = 'UPDATE product SET Stok = ? WHERE ID = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [stok, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static editHarga(id, harga) {
        const query = 'UPDATE product SET Harga = ? WHERE ID = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [harga, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static editCek(id, cek) {
        const query = 'UPDATE product SET Cek = ? WHERE ID = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [cek, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static editPrediksi(id, prediksi) {
        const query = 'UPDATE product SET Prediksi = ? WHERE ID = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [prediksi, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static editDes(id, deskripsi) {
        const query = 'UPDATE product SET deskripsi = ? WHERE ID = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [deskripsi, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports=Product;