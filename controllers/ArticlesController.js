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
            res.send("Sucessfull!");
        } else {
            res.status(406);
            res.send("Error!")
        }
    }

    async findAllArticles(req, res) {
        let articles = await Articles.getAllArticles();
        
        if(articles) {
            res.status(200);
            res.json({articles});
        } else {
            res.status(502);
            res.send("Error!");
        }

    }

}

module.exports = new ArticlesController();