// Import de Mongoose
const mongoose = require('mongoose')


const ArticleSchema = new mongoose.Schema({
    title: String,
    galleryImg: {
        type: Array
    },
})

module.exports = mongoose.model('Article', ArticleSchema)