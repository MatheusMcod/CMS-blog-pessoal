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

    async getArticleById(id) {
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

    async getArticleByTitle(title) {
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
        let articleResult = this.getArticleById(id);

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

    async modifyArticle (id, title, content) {

        let article = await this.getArticleById(id);
        let articleEditingInformation = {};
        if(article != undefined) {
            if(title != article.title) {
                articleEditingInformation.title = title;
            }

            if(content != article.content) {
                articleEditingInformation.content = content;
            }

            try {
                await database.update(articleEditingInformation).where('id_article', id).table('articles');
                return true;
            } catch(erro) {
                console.log(erro);
                return false;
            }

        } else {
            return false;
        }

    }

}

module.exports = new Article();