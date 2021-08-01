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
        console.log(req.body)
        console.log(req.files)
        //console.log("req body: " + req.body)


        if (!req.files) {
            console.log("Title sans img: " + req.body.title)
            console.log("----------------------------------")
            Article.create({
                title: req.body.title,
            })

        } else {
            console.log("Title avec img:")
            console.log("----------------------------------")
            console.log("Title: " + req.body.title)
            console.log("----------------------------------")

            // tableau du req.files
            const files = req.files,
                // Définition d'un tableau que l'on va agrémenté avec nos data pour l'inscrire dans la DB
                arrayFiles = [];

            // Boucle parcours notre req.files afin de récupéré les datas que l'on veux avant d'inscrire
            // nos objets dans le tableaux
            for (let i = 0; i < files.length; i++) {
                if (files) {
                    // C'est grace à la method push que nous inscrivont nos data dans nos Objets
                    // Et nos objets dans le tableau
                    arrayFiles.push({
                        name: files[i].filename,
                        filename: `/assets/images/${files[i].filename}`,
                        originalname: files[i].originalname
                    })
                }
            }

            Article.create({
                title: req.body.title,
                galleryImg: arrayFiles
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