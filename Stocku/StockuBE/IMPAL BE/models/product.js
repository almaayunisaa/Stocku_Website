const db = require('../config/db');

/**
 * Kelas untuk menangani operasi CRUD pada tabel produk di database.
 */
class Product {
    /**
     * Menambahkan produk baru ke dalam database.
     * 
     * @param {string} namaCat - Nama kategori produk.
     * @param {string} produk - Nama produk.
     * @param {string} id - ID produk.
     * @param {number} stok - Stok produk.
     * @param {number} harga - Harga produk.
     * @param {string} cek - Status cek produk.
     * @param {string} prediksi - Data prediksi produk.
     * @param {string} deskripsi - Deskripsi produk.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Mencari produk berdasarkan nama.
     * 
     * @param {string} namaProduk - Nama produk yang akan dicari.
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

    /**
     * Mencari produk berdasarkan ID.
     * 
     * @param {string} id - ID produk.
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

    /**
     * Menghapus produk berdasarkan ID.
     * 
     * @param {string} id - ID produk yang akan dihapus.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Mengedit nama produk berdasarkan ID.
     * 
     * @param {string} id - ID produk.
     * @param {string} produk - Nama produk baru.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Mengedit stok produk berdasarkan ID.
     * 
     * @param {string} id - ID produk.
     * @param {number} stok - Stok produk baru.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Mengedit harga produk berdasarkan ID.
     * 
     * @param {string} id - ID produk.
     * @param {number} harga - Harga produk baru.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
        * Memperbarui kolom "Cek" pada tabel produk dengan nilai yang diberikan berdasarkan ID produk.
        * @param {string} id - ID produk yang akan diperbarui.
        * @param {string} cek - Nilai baru untuk kolom "Cek".
        * @returns {Promise<object>} Promise yang akan diselesaikan dengan hasil query SQL jika berhasil.
        * @throws {Error} Jika terjadi kesalahan selama eksekusi query.
        */
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

    /**
    * Memperbarui kolom "Prediksi" pada tabel produk dengan nilai yang diberikan berdasarkan ID produk.
    * @param {string} id - ID produk yang akan diperbarui.
    * @param {string} prediksi - Nilai baru untuk kolom "Prediksi".
    * @returns {Promise<object>} Promise yang akan diselesaikan dengan hasil query SQL jika berhasil.
    * @throws {Error} Jika terjadi kesalahan selama eksekusi query.
    */
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

    /**
     * Mengedit deskripsi produk berdasarkan ID.
     * 
     * @param {string} id - ID produk.
     * @param {string} deskripsi - Deskripsi baru untuk produk.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Mengambil produk berdasarkan kategori.
     * 
     * @param {string} namaCat - Nama kategori produk.
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

    /**
     * Mengambil produk berdasarkan nama.
     *
     * @param {string} namaCat - Nama produk yang akan dicari.
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

    /**
     * Mengambil produk berdasarkan ID.
     *
     * @param {string} id - ID produk.
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

    /**
     * Mengambil produk dalam kategori tertentu dan mengurutkan secara ascending berdasarkan nama produk.
     *
     * @param {string} namaCat - Nama kategori produk.
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

    /**
     * Mengambil produk dalam kategori tertentu dan mengurutkan secara descending berdasarkan nama produk.
     *
     * @param {string} namaCat - Nama kategori produk.
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

    /**
     * Mengambil semua data produk dari database.
     *
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

    /**
     * Menambahkan stok produk lama ke tabel `oldproduct`.
     *
     * @param {string} ID - ID produk lama.
     * @param {number} Stok - Jumlah stok produk lama.
     * @param {number} Harga - Harga produk lama.
     * @param {string} IDProduk - ID produk terkait.
     * @param {string} tanggal_habis - Tanggal habis stok.
     * @returns {Promise<Object>} Promise yang berisi hasil query.
     */
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

    /**
     * Mengambil semua data produk lama dari tabel `oldproduct`.
     *
     * @returns {Promise<Object[]>} Promise yang berisi array hasil query.
     */
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

module.exports = Product;