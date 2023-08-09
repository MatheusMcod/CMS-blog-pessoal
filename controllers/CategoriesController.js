const Articles = require("../models/Articles");
const Categories = require("../models/Categories");

class categoriesController {

    async createCategory(req, res) {
        let {nameCategory, date_publication} = req.body;
        let statusOperation = await Categories.setCategory(nameCategory, date_publication);

        if (nameCategory == undefined || nameCategory == '' || nameCategory == ' ') {
            res.status(406);
            res.json({erro: "Name cannot by empty!"});
        }

        if (date_publication == undefined || date_publication == '' || date_publication == ' ') {
            res.status(406);
            res.json({erro: "Date cannot by empty!"});
        }

        if(statusOperation.status) {
            res.status(200);
            res.send("Successful!");
        } else {
            res.status(406);
            console.error(statusOperation.erro)
            res.send("Error creating article!");
        }
    }

}

module.exports = new categoriesController();