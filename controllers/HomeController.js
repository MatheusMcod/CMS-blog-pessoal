class HomeController {

    async index(req, res) {
        res.send("Inicio do projeto!");
    }

}

module.exports = new HomeController();