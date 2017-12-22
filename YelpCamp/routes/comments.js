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
            //Add Username and id to comment
            comment.author.id = req.user.id
            comment.author.username = req.user.username
            //Save Comment
            comment.save()
            campground.comments.push(comment);
            campground.save();
            res.redirect(`/campgrounds/${campground._id}`);
          }
        }
      );
    }
  });
});

//Edit Comment
router.get('/:comment_id/edit', (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if(err){
      console.log(err)
    } else {
      res.render('comments/edit', {campground_id: req.params.id, comment: foundComment})
    }
  })
})

//Update Comment
router.put('/:comment_id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
    if(err){
      res.redirect('back')
    } else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})

//Delete Comment
router.delete('/:comment_id', (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err, foundComment) => {
    if(err) {
      res.redirect('back')
    } else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})

module.exports = router;
