const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDB = require('./seeds');


//========================================
//App Setup
//========================================

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));


//========================================
//Passport Setup
//========================================

app.use(
  require('express-session')({
    secret: 'Brandon is awesome',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========================================
//Require Routes
//========================================

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

const commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  authRoutes = require('./routes/index');
  
  app.use('/campgrounds', campgroundRoutes);
  app.use('/campgrounds/:id/comments',commentRoutes);
  app.use(authRoutes);

//========================================
//Populate Database
//========================================

//seedDB();



//========================================
//Mongoose Setup
//========================================
//Map global promie - get rid of the warning

mongoose.Promise = global.Promise;

//Connect to mongoose

mongoose
  .connect(
    'mongodb://cowboy8038:Nascar8038@ds135876.mlab.com:35876/reddirt-yelp-camp',
    {
      useMongoClient: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//========================================
//Serve App
//========================================

const port = process.env.PORT || 3000;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`App started on port ${port}`);
});
