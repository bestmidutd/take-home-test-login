var express =  require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
require('./auth/passport')(passport)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret: 'takehometest',
    resave: true, 
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.set("view engine", "pug")
require('./routes/index')(app, passport)
app.listen("3000")