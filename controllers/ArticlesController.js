const Articles = require("../models/Articles");

class ArticlesController {
    
    async createArticle(req, res) {
        let {title, content, date} = req.body;

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

        let statusOperation = await Articles.setArticle(title, content, date);

        if (statusOperation){
            res.status(200);
            res.send("Successful!");
        } else {
            res.status(406);
            res.send("Error!")
        }
    }

    async findAllArticles(req, res) {
        let articles = await Articles.getAllArticles();
        
        if(articles != undefined) {
            res.status(200);
            res.json({articles});
        } else {
            res.status(502);
            res.send("Error!");
        }
    }

    async findArticle(req, res) {
        let {title,id} = req.body;

        if (id != undefined) {
            let articleResult = await Articles.getArticleById(id);
            if (articleResult != false) {
                res.status(200);
                res.json(articleResult);
            } else {
                res.status(400);
                res.send("Error!");
            }
        } else if (title != undefined) {
            let articleResult = await Articles.getArticleByTitle(title);
            if (articleResult != false) {
                res.status(200);
                res.json(articleResult);
            } else {
                res.status(400);
                res.send("Error!");
            }
        } else {
            res.status(400);
            res.send("Error!");
        }    
    }

    async deleteArticle(req, res) {
        let id = req.body.id;
        let article = await Articles.deleteArticle(id);

        if (article != false) {
            res.status(200);
            res.send("Successful!");
        } else {
            res.status(400);
            res.send("Error!");
        }
    }

    async editArticle(req,res) {
        let {id, title, content} = req.body;
        let status = await Articles.modifyArticle(id,title,content)

        if(status) {
            res.status(200);
            res.send("Tudo OK!");
        } else {
            res.status(406);
            res.send("Error!");
        }
    }

}

module.exports = new ArticlesController();