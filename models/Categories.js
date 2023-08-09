const database = require("../database/connection");
const slug = require("slugify");

class Categories {

    async setCategory(nameCategory, date_publication) {
        try {
            await database('categories').insert({nameCategory: nameCategory, date_publication: date_publication, slug: slug(nameCategory)});
            return ({status: true});
        }  catch (erro) {
            return ({status: false, erro: erro})
        }
    }

}

module.exports = new Categories();