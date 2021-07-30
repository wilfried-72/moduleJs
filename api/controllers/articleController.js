const Article = require('../database/Article'),
    path = require('path'),
    fs = require('fs')

module.exports = {
    // Method Get
    get: async (req, res) => {
        Article.find({}).lean()
            .exec((err, data) => {
                res.render('article', {
                    dbArticle: data
                })
            })

    },
    // Method Post
    post: async (req, res) => {
        //console.log(req.body)
        //console.log(req.file)
        //console.log("req body: " + req.body)


        if (!req.file) {
            console.log("Title sans img: " + req.body.title)
            console.log("----------------------------------")
            Article.create({
                title: req.body.title,
            })

        } else {
            console.log("req file: " + req.file.originalname)
            console.log("----------------------------------")
            console.log("Title: " + req.body.title)
            console.log("----------------------------------")
            Article.create({
                title: req.body.title,
                imgArticle: `/assets/images/${req.file.originalname}`,
                imgName: req.file.originalname
            })
        }
        res.redirect('/article')
    },
    // Method Delete One
    deleteOne: async (req, res) => {

        const dbArticle = await Article.findById(req.params.id)

        Article.deleteOne({
            _id: req.params.id
        }, (err) => {
            if (!err) {
                if (req.file) {
                    const pathImg = path.resolve("public/images/" + dbArticle.imgName)
                    fs.unlink(pathImg, (err) => {
                        if (err) console.log(err)
                        else res.redirect('/article')
                    })
                } else res.redirect('/article')
            } else res.send(err)
        })
    },
    // Method Delete All
    deleteAll: (req, res) => {
        const directory = path.resolve("public/images/")
        Article.deleteMany((err) => {
            if (err) console.log(err)
            else {
                fs.readdir(directory, (err, files) => {
                    if (err) {
                        console.log(err)
                        res.redirect('/')
                    } else {
                        for (const file of files) {
                            fs.unlink(path.join(directory, file), (err) => {
                                if (err) console.log(err)
                            })
                        }
                        res.redirect('/article')
                    }
                })
            }
        })
    }
}