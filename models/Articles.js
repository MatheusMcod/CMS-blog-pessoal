const database = require("../database/connection");
const slug = require("slugify");

class Article {

    async setArticle(title, content, date, categories) {
        try {
            await database.transaction(async trx => {

               const [id_article] = await trx('articles').insert({title:title, content:content, date_publication:date, slug: slug(title)});
            
               let categoriesIds = categories.map(category => category.id);
               await trx('articlescategories').insert(categoriesIds.map(id_category => ({
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
            const articleResult = await database('articlescategories').select([
                'articles.id_article',
                'articles.title',
                'articles.content',
                'articles.date_publication',
                'categories.nameCategory'
            ])
            .innerJoin('articles','articlescategories.id_articles', 'articles.id_article')
            .innerJoin('categories','articlescategories.id_categories', 'categories.id_category');
           
            if (articleResult != undefined) {
                const treatmentResult = articleResult.reduce((acc, article) => {
                const existingTreatment = acc.find(treatment => treatment.id_article === article.id_article);
                
                    if (existingTreatment) {
                      existingTreatment.categories.push(article.nameCategory);
                    } else {
                      const newTreatment = {
                        id_article: article.id_article,
                        title: article.title,
                        content: article.content,
                        date_publication: article.date_publication,
                        categories: [article.nameCategory]
                      };
                      acc.push(newTreatment);
                    }
                  
                    return acc;
                }, []);

                return ({status: true, articles: treatmentResult});
            } else {
                return ({status: false});
            }
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

    async deleteArticle(id) {
        const articleResult = await this.getArticleById(id);

        if (articleResult.status) {
            try {
                await database.transaction(async trx => {
                    await trx.delete().where('id_articles', id).table('articlescategories');
                    await trx.delete().where('id_article', id).table('articles');
                });
                
                return ({status: true});
            } catch(erro) {
                return ({status: false, erro: erro});
            }
        } else {
            return ({status: false, erro: "Article not found!"});
        }
    }

    async modifyArticle (id, title, content, categories, date) {
        const articleResult = await this.getArticleById(id);
        let articleEditingInformation = {};
        if(articleResult != undefined) {

            if(title != articleResult.article.title) {
                articleEditingInformation.title = title;
                articleEditingInformation.slug = slug(title);
            }

            if(content != articleResult.article.content) {
                articleEditingInformation.content = content;
            }

            try {
                await database.transaction(async trx => {
                    const idCategories = categories.map(category => category.id);
                    
                    if(Object.keys(articleEditingInformation).length != 0) {
                         await trx('articles').update(articleEditingInformation).where('id_article', id);
                    }
                   
                    if(idCategories.length != 0) {
                        await trx('articlescategories').where('id_articles', id).whereIn('id_Categories', idCategories).del();

                        await trx('articlescategories').insert(idCategories.map(categoryId => ({
                                id_articles: id,
                                id_categories: categoryId,
                                creation: date
                            }))
                        );
                    }   
                });

                
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