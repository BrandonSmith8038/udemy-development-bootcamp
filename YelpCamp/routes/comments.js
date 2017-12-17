const express = require('express');
const router = express.Router();

//========================================
//Middleware
//========================================

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

//Displays new comment form
router.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

const Campground = require('../models/campground');

//Handles Add New Comment
router.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      Comment.create(
        {
          text: req.body.comment.text,
          author: req.body.comment.author
        },
        (err, comment) => {
          if (err) {
            console.log(err);
          } else {
            campground.comments.push(comment);
            campground.save();
            res.redirect(`/campgrounds/${campground._id}`);
          }
        }
      );
    }
  });
});

module.exports = router;
