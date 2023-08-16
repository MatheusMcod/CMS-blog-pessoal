const Articles = require("../models/Articles");
const Categories = require("../models/Categories");
const { deleteArticle } = require("./ArticlesController");

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
            console.error(statusOperation.erro);
            res.send("Error creating article!");
        }
    }

    async findAllCategories(req, res) {
        const categoriesResult = await Categories.getAllCategories();

        if(categoriesResult.categories){
            res.status(200);
            res.json(categoriesResult.categories);
        } else {
            res.status(502);
            console.error(categoriesResult.erro);
            res.send("Error in search of articles!");
        }
    }

    async findCategoryById(req, res) {
        let id = req.params.id;
        let verificationId = parseInt(id, 10);

        if (!isNaN(verificationId)) {
            const categoryResult = await Categories.getCategoryById(id);
            if (categoryResult.status) {
                res.status(200);
                res.json(categoryResult.category);
            } else {
                res.status(400);
                res.send("Error. Category not found!");
            }
        } else {
            res.status(406);
            res.send("Error, parameter not acceptable!");
        }    
    }

    async deleteCategory(req, res) {
        const id = req.params.id;
        let verificationId = parseInt(id, 10);

        if (!isNaN(verificationId)) {
            const categoryResult = await Categories.deleteCategory(id);
            if (categoryResult.status) {
                res.status(200);
                res.json("Successful!");
            } else {
                res.status(400);
                res.send("Error. Category not found!");
            }
        } else {
            res.status(406);
            res.send("Error, parameter not acceptable!");
        }    
    }

    async editCategory(req,res) {
        const {id, name} = req.body;
        const statusOperation = await Categories.modifyCategory(id,name);

        if(statusOperation.status) {
            res.status(200);
            res.send("Successful!");
        } else {
            console.error(statusOperation.erro);
            res.status(406);
            res.send("Error! " + statusOperation.erro);
        }
    }







}

module.exports = new categoriesController();