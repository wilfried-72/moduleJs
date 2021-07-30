/*
 * Import Module
 ****************/ 
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    upload  = require('./config/multer')

/*
 * Controller
 *************/ 
const homeController = require('./controllers/homeController'),
    articleController = require('./controllers/articleController')

/*
 * Router
 ***********/

// Home
router.route('/')
    .get(homeController.get)

// Article
router.route('/article')
    .get(articleController.get)
    .post(upload.single('dropzone'),articleController.post)
    .delete(articleController.deleteAll)

// Article ID
router.route('/article/:id')
    .delete(articleController.deleteOne)

module.exports = router;