const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require('../models/user');
//========================================
//Middleware
//========================================

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//Home Page Route
router.get('/', (req, res) => {
  res.render('home');
});

//Show register form
router.get('/register', (req, res) => {
  res.render('register');
});
//Handle Sign Up Logic
router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    });
  });
});
//Show Login Form
router.get('/login', (req, res) => {
  res.render('login');
});

//Handle login form logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }),
  (req, res) => {
    //Callback, doesn't do anything, using middleware instead
  }
);

//Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/campgrounds');
});

module.exports = router;
