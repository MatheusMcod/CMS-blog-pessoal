const database = require("../database/connection");

class Users {

    async setUser(name, email, password, role, date) {
        try {
            await database('users').insert({name:name, email:email, password: password, role: role, date_creation:date});
            
            return {status: true};
        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

    async getUsers() {
        try {
            const articles = await database('users').select('id_user', 'name', 'email', 'role', 'date_creation');

            return {status: true, article: articles};
        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

    async getUserById(id) {
        try {
            const article = await database('users').select('id_user', 'name', 'email', 'role', 'date_creation').where('id_user', id);

            return {status: true, article: article};
        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

}

module.exports = new Users;