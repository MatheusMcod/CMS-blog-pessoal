const database = require("../database/connection");

class Users {

    async setArticle(name, email, password, role, date) {
        try {

            await trx('users').insert({name:name, email:email, password: password, role: role, date_publication:date});
            
            return {status: true};

        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

}

module.exports = new Users;