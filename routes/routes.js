const express = require('express');
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const ArticlesController = require("../controllers/ArticlesController");

router.get('/', HomeController.index);
router.post('/article', ArticlesController.createArticle);
router.get('/articles', ArticlesController.findAllArticles);

module.exports = router;