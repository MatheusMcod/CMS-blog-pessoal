const database = require("../database/connection");
const slug = require("slugify");

class Categories {

    async setCategory(nameCategory, date_publication) {
        try {
            await database('categories').insert({nameCategory: nameCategory, date_publication: date_publication, slug: slug(nameCategory)});
            return ({status: true});
        }  catch(erro) {
            return ({status: false, erro: erro})
        }
    }

    async getAllCategories() {
        try {
            const categoriesResult = await database.select().from('categories');
            return ({status: true, categories: categoriesResult});
        } catch(erro) {
            return ({status: false, erro: erro});
        }
    }

    async getCategoryById(id) {
        try {
            const categoryResult = await database.select().from('categories').where('id_category', id);
            if(categoryResult != undefined) {
                return ({status: true, category: categoryResult});
            } else {
                return ({status: false, erro: "Category not found!"});
            }
            
        } catch(erro) {
            return ({status: false, erro: erro});
        }
    }

    async deleteCategory(id) {
        const categoryResult = await this.getCategoryById(id);

        if(categoryResult.status) {
            try {
                database.transaction(async trx => {
                    await trx.delete().where('id_categories', id).table('articlescategories');
                    await trx.delete().where('id_category', id).table('categories');
                });

                return ({status: true});
            } catch(erro){
                return ({status: false, erro: erro});
            }
        } else {
            return ({status: false, erro: "Category not found!"});
        }
        
        
    }
    

}

module.exports = new Categories();