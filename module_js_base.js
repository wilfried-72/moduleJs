/*
 * Dropzone.js
 * ****** */

const
    express = require('express'),
    app = express(),
    hbs = require('express-handlebars'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    port = process.env.PORT || 3000

app.use(methodOverride('_method'))

// Mongoose
const urlDb = 'mongodb://localhost:27017/dropzone'
mongoose.connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// save session avec MongoDB
const mongoStore = MongoStore(expressSession)

// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));

// Express-session
app.use(expressSession({
    secret: 'securite',
    name: 'ptiGato',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// Express Static (Permet de pointer un dossier static sur une URL)
app.use('/assets', express.static('public'));

// Body Parser qui nous permet de parser des data d'une req a une autre
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Router
const ROUTER = require('./api/router')
app.use('/', ROUTER)

app.use((req, res) => {
res.render('err404')
})

// Lancement de l'application
app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port);
});
