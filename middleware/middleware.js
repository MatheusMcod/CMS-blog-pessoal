const jwt = require("jsonwebtoken");
const secret = require("../middleware/jwtconfig").secret;

class middleware {
    async validation(req, res, next) {
        const authToken = req.headers['authorization'];

        if(authToken != undefined) {
            const token = authToken.split(' ');
            const tratedToken = token[1];
            try {
                await jwt.verify(tratedToken, secret);
                next();
            } catch (erro) {
                res.status(401);
                console.error(erro);
                res.send("Invalid Token!");
            }

        } else {
            res.status(401);
            res.send("Invalid Token!")
        }
    }
}

module.exports = new middleware;