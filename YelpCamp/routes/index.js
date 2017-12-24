const express = require('express');
const router = express.Router();
const passport = require('passport');
const Campground = require('../models/campground')
const User = require('../models/user');
const async = require('async')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const sgTransport = require('nodemailer-sendgrid-transport');
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

router.get('/forgot', (req, res) => {
  res.render('forgot')
})

router.post('/forgot', (req, res) => {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, (err, buf) => {
        const token = buf.toString('hex')
        done(err, token)
      })
    },
    function(token, done){
      User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
          req.flash('error', 'No account with that email address exists.')
          return res.redirect('/forgot')
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 360000;
        
        user.save((err) => {
          done(err, token, user)
        })
      })
    },
    function(token, user, done){
      
      const options = {
          auth: {
            api_user: 'RedDirtWD',
            api_key: process.env.SENDGRIDPW
        }
      }
      
      const mailer = nodemailer.createTransport(sgTransport(options));
      
      const mailOptions = {
        to: user.email,
        from: 'cowboy8038@gmail.com',
        subject: 'Node Js Password Reset',
        text: `Your are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process. http://${req.headers.host}/reset/${token} If You did not request this, please ignore this email and your password will remain unchanged.`
      }
      mailer.sendMail(mailOptions, (err) => {
        console.log('Mail Sent')
        req.flash('success', `An email has been sent to ${user.email} with further instructions`)
        done(err, 'done')
      })
    }
  ], (err) => {
    if (err) {
      console.log(err)
    res.redirect('/forgot')
    }
  })
})

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
