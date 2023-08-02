const database = require("../database/connection");

class Article {

    async setArticle(title, content, date) {
        try {
            await database('articles').insert({title:title, content:content, date_publication:date});
            return true;
        } catch(erro) {
            console.log(erro);
            return false;
        }
    }

    async getAllArticles() {
        try {
            let articles = database.select().from('articles');
            return articles;
        } catch(erro) {
            console.log(erro);
            return false;
        }
    }

}

module.exports = new Article();