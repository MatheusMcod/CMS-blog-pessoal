const Articles = require("../models/Articles");
const Categories = require("../models/Categories");

class categoriesController {

    async createCategory(req, res) {
        const {nameCategory, date_publication} = req.body;
        const statusOperation = await Categories.setCategory(nameCategory, date_publication);

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

    async findAllCategories(req, res) {
        const categoriesResult = await Categories.getAllCategories();

        if(categoriesResult.categories){
            res.status(200);
            res.json(categoriesResult.categories)
        } else {
            res.status(502);
            console.error(categoriesResult.erro);
            res.send("Error in search of articles!");
        }
    }

}

module.exports = new categoriesController();