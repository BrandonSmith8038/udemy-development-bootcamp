const express = require('express');
const router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

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
router.get('/new', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

//Handles Add New Comment
router.post('/', isLoggedIn, (req, res) => {
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
