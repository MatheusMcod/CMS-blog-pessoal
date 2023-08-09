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

        let statusOperation = await Articles.setArticle(title, content, date, categories);

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
        let articlesResult = await Articles.getAllArticles();
        
        if(articlesResult.articles != undefined) {
            res.status(200);
            res.send(articlesResult.articles);
        } else {
            res.status(502);
            console.error(articlesResult.erro);
            res.send("Error in search of articles!");
        }
    }

    async findArticle(req, res) {
        let {title,id} = req.body;

        if (id != undefined) {
            let articleResult = await Articles.getArticleById(id);
            if (articleResult.status) {
                res.status(200);
                res.send(articleResult.article);
            } else {
                res.status(400);
                res.send("Error. Article not found!");
            }
        } else if (title != undefined) {
            let articleResult = await Articles.getArticleByTitle(title);
            if (articleResult.status) {
                res.status(200);
                res.send(articleResult.article);
            } else {
                res.status(400);
                res.send("Error. Article not found!");
            }
        } else {
            res.status(400);
            console.error(articleResult.erro);
            res.send("Error in search of article!");
        }    
    }

    async deleteArticle(req, res) {
        let id = req.body.id;
        let statusOperation = await Articles.deleteArticle(id);

        if (statusOperation.status) {
            res.status(200);
            res.send("Successful!");
        } else {
            res.status(400);
            console.error(statusOperation.erro);
            res.send("Error deleting article! " + statusOperation.erro);
        }
    }

    async editArticle(req,res) {
        let {id, title, content} = req.body;
        let statusOperation = await Articles.modifyArticle(id,title,content);

        if(statusOperation.status) {
            res.status(200);
            res.send("Successful!");
        } else {
            console.error(statusOperation.erro);
            res.status(406);
            res.send("Error!" + statusOperation.erro);
        }
    }

}

module.exports = new ArticlesController();