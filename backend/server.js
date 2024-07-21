const express = require('express')
const initDB = require('./config/db')
const bodyParser = require('body-parser')
const app = express()
const cors=require('cors');
const port = 3008

const passport = require('passport')

global.__basedir = __dirname;
global._tokenExpira = 48;
global._tokenSecret = "llaveRvipae*//*";
app.use(cors({origin: true, credentials: true}));
// for parsing json
app.use(
    bodyParser.json({
        limit: '20mb'
    })
)
// for parsing application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        limit: '20mb',
        extended: true
    })
)

app.use(express.static('public'));  
app.use('/uploads', express.static('uploads')); 

app.use(passport.initialize())

app.use(require('./app/routes'))

app.listen(port, () => {
    console.log('La aplicacion esta en linea!');
})

initDB()