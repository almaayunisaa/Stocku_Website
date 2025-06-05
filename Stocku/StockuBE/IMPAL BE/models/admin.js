const { knex } = require('../config/db');

class Admin {
    static create(username, email, password) {
        return knex('Administrator').insert({
            username: username,
            pass: password,
            email: email
        });
    }

    static findUser(username) {
        return knex('Administrator')
            .where({ username: username })
            .select('*');
    }

    static editEmail(username, email) {
        return knex('Administrator')
            .where({ username: username })
            .update({ email: email });
    }

    static getEmail(username) {
        console.log(username);
        return knex('Administrator')
            .where({ username: username })
            .select('email');
    }
}

module.exports = Admin;
