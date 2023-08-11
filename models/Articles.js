const database = require("../database/connection");
const slug = require("slugify");

class Article {

    async setArticle(title, content, date, categories) {
        try {
            await database.transaction(async trans => {

               const [id_article] = await database('articles').insert({title:title, content:content, date_publication:date, slug: slug(title)});
            
               let categoriesIds = categories.map(category => category.id);
               await database('articlescategories').insert(categoriesIds.map(id_category => ({
                    id_articles: id_article,
                    id_categories: id_category,
                    creation: date
                }))
            );
        });
            
            return {status: true};

        } catch(erro) {
            return {status: false, erro: erro};
        }
    }

    async getAllArticles() {
        try {
            const articles = await database.select().from('articles');
            return ({status: true, articles: articles});
        } catch(erro) {
            return ({status: false, erro: erro});
        }
    }

    async getArticleById(id) {
        try {
            const articleResult = await database('articlescategories').select([
                'articles.id_article',
                'articles.title',
                'articles.content',
                'articles.date_publication',
                'categories.nameCategory'
            ])
            .innerJoin('articles','articlescategories.id_articles', 'articles.id_article')
            .innerJoin('categories','articlescategories.id_categories', 'categories.id_category')
            .where('articles.id_article', id);
           
            if (articleResult != undefined) {
                const defaultDataPlacement = 0;
                const treatmentResult = {
                    id_article: articleResult[defaultDataPlacement].id_article,
                    title: articleResult[defaultDataPlacement].title,
                    content: articleResult[defaultDataPlacement].content,
                    date_publication: articleResult[defaultDataPlacement].date_publication,
                    categories: []
                }
                articleResult.forEach(article => {
                    treatmentResult.categories.push(article.nameCategory);
                });

                return ({status: true, article: treatmentResult});
            } else {
                return ({status: false});
            }
        } catch(erro) {
            return ({status: false, erro: erro});
        }
    }

    async getArticleByTitle(title) {
        try {
            const articleResult = await database('articles').select('*').where('title', title);
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
        const articleResult = this.getArticleById(id);

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
        const article = await this.getArticleById(id);
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