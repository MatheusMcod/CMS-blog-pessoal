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

        await Articles.registerArticle(title, content, date);

        res.status(200);
        res.send("Sucessfull");
    }

}

module.exports = new ArticlesController();