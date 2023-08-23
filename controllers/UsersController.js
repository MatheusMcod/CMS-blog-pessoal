const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const secret = require("../middleware/jwtconfig").secret;

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
            res.send("Error creating user! " + statusOperation.erro);
        }
    }

    async findAllUsers(req, res) {
        const usersResult = await Users.getUsers();
        
        if(usersResult.user != undefined) {
            res.status(200);
            res.json(usersResult.user);
        } else {
            res.status(502);
            console.error(usersResult.erro);
            res.send("Error in search of articles!");
        }
    }

    async findUserById(req, res) {
        const userId = req.params.id;
        const usersResult = await Users.getUserById(userId);
        
        if(usersResult.user != undefined) {
            res.status(200);
            res.json(usersResult.user);
        } else {
            res.status(502);
            console.error(usersResult.erro);
            res.send("Error in search of articles!");
        }
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        let verificationId = parseInt(id, 10);

        if (!isNaN(verificationId)) {
            const userResult = await Users.deleteUser(id);
            if (userResult.status) {
                res.status(200);
                res.send("Successful");
            } else {
                res.status(400);
                res.send("Error. Article not found!");
            }
        } else {
            res.status(406);
            res.send("Error, parameter not acceptable!");
        }    
    }

    async editUser(req, res) {
        let {id, name, role, email} = req.body;
        let userResult = await Users.modifyUser(id, name, email, role);
        if(userResult.status) {
            res.status(200);
            res.send("Successful!");
        } else {
            res.status(406);
            console.error(userResult.erro);
            res.send("Error in editing user! " + userResult.erro);
        }
    }

    async authUser(req, res) {
        let {email, password} = req.body;

        if(email != undefined && password != undefined) {
            const user = await Users.getUserByEmail(email);

            if(user.status && user.user.email == email && user.user.password == password) {
                try{
                    const token = await jwt.sign({id_user: user.user.id_user, email: user.user.email, role: user.user.role}, secret, {expiresIn: '48h'});
                    res.status(200);
                    res.json(token);
                } catch(erro) {
                    res.status(400);
                    console.error(erro);
                    res.send("Internal error!");
                }
            } else {
                res.status(404);
                res.send("Invalid Credentials!");
            }

        } else {
            res.status(400);
            res.send("Invalid Credentials!");
        }
    }
    
}

module.exports = new UsersController;