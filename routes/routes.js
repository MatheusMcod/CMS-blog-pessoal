const express = require('express');
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const ArticlesController = require("../controllers/ArticlesController");
const CategoriesController = require("../controllers/CategoriesController");

router.get('/', HomeController.index);
router.get('/articles', ArticlesController.findAllArticles);
router.get('/article/:id', ArticlesController.findArticleById);
router.get('/categories', CategoriesController.findAllCategories);
router.post('/article', ArticlesController.createArticle);
router.post('/category', CategoriesController.createCategory);
router.put('/article', ArticlesController.editArticle);
router.delete('/article', ArticlesController.deleteArticle);

module.exports = router;