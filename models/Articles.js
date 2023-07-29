const database = require("../database/connection");

class Article {

    async registerArticle(title, content, date) {
        try {
            await database('articles').insert({title:title, content:content, date_publication:date});
        } catch(erro) {
            console.log(erro);
        }
    }

}

module.exports = new Article();