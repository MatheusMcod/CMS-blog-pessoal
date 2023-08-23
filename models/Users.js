const database = require("../database/connection");
const bcrypt = require("bcrypt");

class Users {

    async setUser(name, email, password, role, date) {
        try {
            const hash = await bcrypt.hash(password, 10);
            const emailVerify = await this.getUserByEmail(email);
            
            if (emailVerify.user == undefined) {
                await database('users').insert({name:name, email:email, password: hash, role: role, date_creation:date});

                return {status: true};
            } else {
                return {status: false, erro: "Email already exists!"}
            }
            
        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

    async getUsers() {
        try {
            const user = await database('users').select('id_user', 'name', 'email', 'role', 'date_creation');
            
            return {status: true, user: user};
        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

    async getUserById(id) {
        try {
            const user = await database('users').select('id_user', 'name', 'email', 'role', 'date_creation').where('id_user', id);
        
            return {status: true, user: user[0]};
        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await database('users').select().where('email', email);
        
            return {status: true, user: user[0]};
        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

    async deleteUser(id) {
        try {
            const article = await database('users').where('id_user', id).delete();

            return {status: true};
        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

    async modifyUser(id, name, email, role) {
        const userResult = await this.getUserById(id);

        if (Object.keys(userResult.user).length != 0) {
                let userEditInformation = {};

                if (name != undefined && name != userResult.user.name) {
                    userEditInformation.name = name;
                }

                if (email != undefined && email != userResult.user.email) {
                    userEditInformation.email = email;
                }

                if (role != undefined && role != userResult.user.role) {
                    userEditInformation.role = role;
                }
                
                try {
                    await database('users').update(userEditInformation).where('id_user', id);
    
                    return ({status: true});
                } catch(erro) {
                    return({status: false, erro: erro});
                }

        } else {
            return ({status: false, erro: "User not found!"});
        }    
    }

    

}

module.exports = new Users;