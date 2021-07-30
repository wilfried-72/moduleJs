// Import de Mongoose
const mongoose = require('mongoose')


const ArticleSchema = new mongoose.Schema({
    title: String,
    imgArticle: String,
    imgName: String
})

module.exports = mongoose.model('Article', ArticleSchema)