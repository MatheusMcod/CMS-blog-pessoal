const express = require('express');
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const ArticlesController = require("../controllers/ArticlesController");
const CategoriesController = require("../controllers/CategoriesController");
const UsersController = require("../controllers/UsersController");

router.get('/', HomeController.index);
router.get('/articles', ArticlesController.findAllArticles);
router.get('/article/:id', ArticlesController.findArticleById);
router.get('/categories', CategoriesController.findAllCategories);
router.get('/category/:id', CategoriesController.findCategoryById);
router.get('/users', UsersController.findAllUsers);
router.get('/user/:id', UsersController.findUserById);
router.post('/article', ArticlesController.createArticle);
router.post('/category', CategoriesController.createCategory);
router.post('/user', UsersController.createUser);
router.put('/article', ArticlesController.editArticle);
router.put('/category', CategoriesController.editCategory);
router.put('/user', UsersController.editUser);
router.delete('/user/:id', UsersController.deleteUser);
router.delete('/article/:id', ArticlesController.deleteArticle);
router.delete('/category/:id', CategoriesController.deleteCategory);

module.exports = router;