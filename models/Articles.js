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
            let articles = await database.select().from('articles');
            return articles;
        } catch(erro) {
            console.log(erro);
            return false;
        }
    }

    async getArticlesById(id) {
        try {
            let articleResult = await database('articles').select('*').where('id_article', id);
            if (articleResult != undefined) {
                return articleResult;
            } else {
                return false;
            }
        } catch(erro) {
            console.log(erro);
            return false;
        }
    }

    async getArticlesByTitle(title) {
        try {
            let articleResult = await database('articles').select('*').where('title', title);
            if (articleResult != undefined) {
                return articleResult;
            } else {
                return false;
            }
        } catch(erro) {
            console.log(erro);
            return false;
        }
    }

    async deleteArticle(id) {
        let articleResult = this.getArticlesById(id);

        if (articleResult != false) {
            try {
                await database.delete().where('id_article', id).table('articles');
                return true;
            } catch(erro) {
                console.log(erro);
                return false;
            }
            
        }
    }

}

module.exports = new Article();