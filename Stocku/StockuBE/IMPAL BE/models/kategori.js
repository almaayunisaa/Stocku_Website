const { knex } = require('../config/db');

class Kategori {
    static create(namaCat) {
        return knex('category').insert({
            namaCategory: namaCat
        });
    }

    static edit(namaCat, editNama) {
        return knex('category')
            .where({ namaCategory: namaCat })
            .whereNull('deleted_at')
            .update({ namaCategory: editNama });
    }

    static delete(namaCat) {
        return knex('category')
            .where({ namaCategory: namaCat })
            .update({ deleted_at: knex.fn.now() });
    }

    static find(namaCat) {
        return knex('category')
            .where({ namaCategory: namaCat })
            .whereNull('deleted_at')
            .select('*');
    }

    static get() {
        return knex('category')
            .whereNull('deleted_at')
            .select('namaCategory');
    }
}

module.exports = Kategori;
