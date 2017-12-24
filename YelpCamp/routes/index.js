const express = require('express');
const router = express.Router();
const passport = require('passport');
const Campground = require('../models/campground')
const User = require('../models/user');
//========================================
//Middleware
//========================================




//Home Page Route
router.get('/', (req, res) => {
  res.render('home');
});

//Show register form
router.get('/register', (req, res) => {
  res.render('register', {page: 'register'});
});
//Handle Sign Up Logic
router.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    avatar: req.body.avatar
  });
  if(req.body.adminCode === 'secretcode123'){
    newUser.isAdmin = true
  }
  
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash("error", err.message)
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash("success", "Successfully logged in")
      res.redirect('/campgrounds');
    });
  });
});
//Show Login Form
router.get('/login', (req, res) => {
 res.render("login", {page: 'login'})
});

//Handle login form logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }),
  (req, res) => {
  }
);

//Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash("success", 'Logged You Out!')
  res.redirect('/campgrounds');
});

//User Profiles
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if(err){
      req.flash('error', 'User Not Found')
      res.redirect('/')
    } 
      Campground.find().where('author.id').equals(foundUser._id).exec((err, campgrounds) => {
        if(err){
      req.flash('error', 'No Campgrounds Found')
      res.redirect('/')
      } 
      res.render('users/show', {user: foundUser, campgrounds: campgrounds})
      })
  })
})

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = router;
