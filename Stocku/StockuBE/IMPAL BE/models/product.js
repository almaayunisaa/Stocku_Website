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

    static getTanggalHabisNStok(id) {
        const query = 'SELECT tanggal_habis, Stok FROM oldproduct WHERE IDProduk = ? ';
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

    static get(namaCat) {
        const query = 'SELECT * FROM product WHERE namaCategory = ?';
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

    static getWithName(namaCat) {
        const query = 'SELECT * FROM product WHERE Produk = ?';
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

    static getWithID(id) {
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

    static sort_asc(namaCat) {
        const query = 'SELECT * FROM product WHERE namaCategory = ? ORDER by Produk ASC';
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

    static sort_dsc(namaCat) {
        const query = 'SELECT * FROM product WHERE namaCategory = ? ORDER by Produk DESC';
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

    static getData() {
        const query = 'SELECT * FROM product';
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

    static setStokOld(ID, Stok, Harga, IDProduk, tanggal_habis) {
        const query = 'INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES (?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(query, [ID, Stok, Harga, IDProduk, tanggal_habis], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static getDataOld() {
        const query = 'SELECT * FROM oldproduct';
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

module.exports=Product;