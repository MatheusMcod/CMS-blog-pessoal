const express = require('express');
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const ArticlesController = require("../controllers/ArticlesController");

router.get('/', HomeController.index);
router.get('/articles', ArticlesController.findAllArticles);
router.get('/article', ArticlesController.findArticle);
router.post('/article', ArticlesController.createArticle);
router.delete('/article', ArticlesController.deleteArticle);

module.exports = router;