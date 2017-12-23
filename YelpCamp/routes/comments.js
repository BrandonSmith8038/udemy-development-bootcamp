const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleWare = require("../middleware")

//Displays new comment form
router.get('/new', middleWare.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

//Handles Add New Comment
router.post('/', middleWare.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.flash("error", "Something went wrong")
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
            req.flash("success", "Successfully Added Comment")
            res.redirect(`/campgrounds/${campground._id}`);
          }
        }
      );
    }
  });
});

//Edit Comment
router.get('/:comment_id/edit', middleWare.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if(err){
      console.log(err)
    } else {
      res.render('comments/edit', {campground_id: req.params.id, comment: foundComment})
    }
  })
})

//Update Comment
router.put('/:comment_id', middleWare.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
    if(err){
      res.redirect('back')
    } else {
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})

//Delete Comment
router.delete('/:comment_id', middleWare.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err, foundComment) => {
    if(err) {
      res.redirect('back')
    } else {
      req.flash("success", "Comment Deleted!")
      res.redirect(`/campgrounds/${req.params.id}`)
    }
  })
})

module.exports = router;
