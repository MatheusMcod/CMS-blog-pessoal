const Users = require("../models/Users");

class UsersController {
    
    async createUser(req, res) {
        const {name, email, password, role, date} = req.body;

        if (date == undefined || date == '' || date == ' ') {
            res.status(406);
            res.json({erro: "Date cannot by empty!"});
        }

        if (email == undefined || email == '' || email == ' ') {
            res.status(406);
            res.json({erro: "Email cannot by empty!"});
        }

        if (password == undefined || password == '' || password == ' ') {
            res.status(406);
            res.json({erro: "Password cannot by empty!"});
        }

        if (role == undefined || role == '' || role == ' ') {
            res.status(406);
            res.json({erro: "Role cannot by empty!"});
        }

        const statusOperation = await Users.setUser(name, email, password, role, date);

        if (statusOperation.status){
            res.status(200);
            res.send("Successful!");
        } else {
            console.error(statusOperation.erro);
            res.status(406);
            res.send("Error creating user!");
        }
    }

    async findAllUsers(req, res) {
        const usersResult = await Users.getUsers();
        
        if(usersResult.article != undefined) {
            res.status(200);
            res.json(usersResult.article);
        } else {
            res.status(502);
            console.error(articlesResult.erro);
            res.send("Error in search of articles!");
        }
    }

    async findUserById(req, res) {
        const userId = req.params.id;
        const usersResult = await Users.getUserById(userId);
        
        if(usersResult.article != undefined) {
            res.status(200);
            res.json(usersResult.article);
        } else {
            res.status(502);
            console.error(articlesResult.erro);
            res.send("Error in search of articles!");
        }
    }
    
}

module.exports = new UsersController;