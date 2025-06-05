const { knex } = require('../config/db');

class Product {
    static create(namaCat, produk, id, stok, harga, cek, prediksi, deskripsi) {
        return knex('product').insert({
            namaCategory: namaCat,
            Produk: produk,
            ID: id,
            Stok: stok,
            harga: harga,
            Cek: cek,
            Prediksi: prediksi,
            deskripsi: deskripsi
        });
    }

    static findName(namaProduk) {
        return knex('product')
            .where({ Produk: namaProduk })
            .whereNull('deleted_at')
            .select('*');
    }

    static findID(id) {
        return knex('product')
            .where({ ID: id })
            .whereNull('deleted_at')
            .select('*');
    }

    static delete(id) {
        return knex('product')
            .where({ ID: id })
            .update({ deleted_at: knex.fn.now() });
    }

    static editNama(id, produk) {
        return knex('product')
            .where({ ID: id })
            .whereNull('deleted_at')
            .update({ Produk: produk });
    }

    static editStok(id, stok) {
        return knex('product')
            .where({ ID: id })
            .whereNull('deleted_at')
            .update({ Stok: stok });
    }

    static editHarga(id, harga) {
        return knex('product')
            .where({ ID: id })
            .whereNull('deleted_at')
            .update({ harga: harga });
    }

    static editCek(id, cek) {
        return knex('product')
            .where({ ID: id })
            .whereNull('deleted_at')
            .update({ Cek: cek });
    }

    static editPrediksi(id, prediksi) {
        return knex('product')
            .where({ ID: id })
            .whereNull('deleted_at')
            .update({ Prediksi: prediksi });
    }

    static editDes(id, deskripsi) {
        return knex('product')
            .where({ ID: id })
            .whereNull('deleted_at')
            .update({ deskripsi: deskripsi });
    }

    static getTanggalHabisNStok(id) {
        return knex('oldproduct')
            .where({ IDProduk: id })
            .select('tanggal_habis', 'Stok');
    }

    static get(namaCat) {
        return knex('product')
            .where({ namaCategory: namaCat })
            .whereNull('deleted_at')
            .select('*');
    }

    static getWithName(namaProduk) {
        return knex('product')
            .where({ Produk: namaProduk })
            .whereNull('deleted_at')
            .select('*');
    }

    static getWithID(id) {
        return knex('product')
            .where({ ID: id })
            .whereNull('deleted_at')
            .select('*');
    }

    static sort_asc(namaCat) {
        return knex('product')
            .where({ namaCategory: namaCat })
            .whereNull('deleted_at')
            .orderBy('Produk', 'asc')
            .select('*');
    }

    static sort_dsc(namaCat) {
        return knex('product')
            .where({ namaCategory: namaCat })
            .whereNull('deleted_at')
            .orderBy('Produk', 'desc')
            .select('*');
    }

    static getData() {
        return knex('product')
            .whereNull('deleted_at')
            .select('*');
    }

    static setStokOld(ID, Stok, Harga, IDProduk, tanggal_habis) {
        return knex('oldproduct').insert({
            ID: ID,
            Stok: Stok,
            Harga: Harga,
            IDProduk: IDProduk,
            tanggal_habis: tanggal_habis
        });
    }

    static getDataOld() {
        return knex('oldproduct').select('*');
    }
}

module.exports = Product;
