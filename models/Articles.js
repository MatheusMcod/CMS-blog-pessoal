const database = require("../database/connection");
const slug = require("slugify");

class Article {

    async setArticle(title, content, date) {
        try {
            await database('articles').insert({title:title, content:content, date_publication:date, slug: slug(title)});
            return {status: true};
        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

    async getAllArticles() {
        try {
            let articles = await database.select().from('articles');
            return ({status: true, articles: articles});
        } catch(erro) {
            return ({status: false, erro: erro});
        }
    }

    async getArticleById(id) {
        try {
            let articleResult = await database('articles').select('*').where('id_article', id);
            if (articleResult != undefined) {
                return ({status: true, article: articleResult});
            } else {
                return ({status: false});
            }
        } catch(erro) {
            return ({status: false, erro: erro});
        }
    }

    async getArticleByTitle(title) {
        try {
            let articleResult = await database('articles').select('*').where('title', title);
            if (articleResult != undefined) {
                return ({status: true, article: articleResult});
            } else {
                return ({status: false});
            }
        } catch(erro) {
            return ({status: false, erro: erro});
        }
    }

    async deleteArticle(id) {
        let articleResult = this.getArticleById(id);

        if (articleResult.status) {
            try {
                await database.delete().where('id_article', id).table('articles');
                return ({status: true});
            } catch(erro) {
                return ({status: false, erro: erro});
            }
        } else {
            return ({status: false, erro: "Article not found!"})
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
                return ({status:true});
            } catch(erro) {
                return ({status: false, erro: erro});
            }

        } else {
            return ({status: false, erro: "Article not found!"});
        }

    }

}

module.exports = new Article();