const Articles = require("../models/Articles");

class ArticlesController {
    
    async createArticle(req, res) {
        const {title, content, date, categories} = req.body;

        if (title == undefined || title == '' || title == ' ') {
            res.status(406);
            res.json({erro: "Title cannot by empty!"});
        }

        if (content == undefined || content == '' || content == ' ') {
            res.status(406);
            res.json({erro: "The body of the article cannot by empty!"});
        }

        if (date == undefined || date == '' || date == ' ') {
            res.status(406);
            res.json({erro: "Date cannot by empty!"});
        }

        if (categories == undefined || categories.length == 0) {
            res.status(406);
            res.json({erro: "Unassigned category!"});
        }

        const statusOperation = await Articles.setArticle(title, content, date, categories);

        if (statusOperation.status){
            res.status(200);
            res.send("Successful!");
        } else {
            console.error(statusOperation.erro);
            res.status(406);
            res.send("Error creating article!");
        }
    }

    async findAllArticles(req, res) {
        const articlesResult = await Articles.getAllArticles();
        
        if(articlesResult.articles != undefined) {
            res.status(200);
            res.json(articlesResult.articles);
        } else {
            res.status(502);
            console.error(articlesResult.erro);
            res.send("Error in search of articles!");
        }
    }

    async findArticleById(req, res) {
        let id = req.params.id;
        let verificationId = parseInt(id, 10);

        if (!isNaN(verificationId)) {
            const articleResult = await Articles.getArticleById(id);
            if (articleResult.status) {
                res.status(200);
                res.json(articleResult.article);
            } else {
                res.status(400);
                res.send("Error. Article not found!");
            }
        } else {
            res.status(406);
            res.send("Error, parameter not acceptable!");
        }    
    }

    async deleteArticle(req, res) {
        const id = req.params.id;
        let verificationId = parseInt(id, 10);

        if (!isNaN(verificationId)) {
            const articleResult = await Articles.deleteArticle(id);
            if (articleResult.status) {
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

    async editArticle(req,res) {
        const {id, title, content, categories, date} = req.body;
        const statusOperation = await Articles.modifyArticle(id,title,content,categories,date);

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

module.exports = new ArticlesController();