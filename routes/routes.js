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
router.get('/category/:id', CategoriesController.findCategoryById);
router.post('/article', ArticlesController.createArticle);
router.post('/category', CategoriesController.createCategory);
router.put('/article', ArticlesController.editArticle);
router.put('/category', CategoriesController.editCategory);
router.delete('/article/:id', ArticlesController.deleteArticle);
router.delete('/category/:id', CategoriesController.deleteCategory);

module.exports = router;