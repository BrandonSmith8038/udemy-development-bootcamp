const express = require('express')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const PassportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')



const app = express()

app.use(require('express-session')({
    secret: 'Brandon is awesome',
    resave: false,
    saveUninitialized: false
}))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.set('view engine', 'ejs')

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({extended: true}))

//Map global promie - get rid of the warning

mongoose.Promise = global.Promise;

mongoose
  .connect(
    'mongodb://cowboy8038:Nascar8038@ds135876.mlab.com:35876/reddirt-yelp-camp',
    {
      useMongoClient: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/secret', (req, res) => {
 res.render('secret')   
})

const port = process.env.PORT || 3000
const ip = process.env.IP

app.listen(port, ip, () => {
    console.log(`App started on port ${port}`)
})