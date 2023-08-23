const express = require("express");
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const ArticlesController = require("../controllers/ArticlesController");
const CategoriesController = require("../controllers/CategoriesController");
const UsersController = require("../controllers/UsersController");
const auth = require("../middleware/middleware");

router.get('/', HomeController.index);
router.get('/articles', ArticlesController.findAllArticles);
router.get('/article/:id', ArticlesController.findArticleById);
router.get('/categories', CategoriesController.findAllCategories);
router.get('/category/:id', CategoriesController.findCategoryById);
router.get('/users', auth.validation,UsersController.findAllUsers);
router.get('/user/:id', auth.validation, UsersController.findUserById);
router.post('/article', auth.validation,ArticlesController.createArticle);
router.post('/category', auth.validation,CategoriesController.createCategory);
router.post('/user',auth.validation, UsersController.createUser);
router.post('/auth', UsersController.authUser)
router.put('/article',auth.validation, ArticlesController.editArticle);
router.put('/category',auth.validation, CategoriesController.editCategory);
router.put('/user',auth.validation, UsersController.editUser);
router.delete('/user/:id',auth.validation, UsersController.deleteUser);
router.delete('/article/:id',auth.validation, ArticlesController.deleteArticle);
router.delete('/category/:id',auth.validation, CategoriesController.deleteCategory);

module.exports = router;