const Comment = require('../models/comment')
const Campground  = require("../models/campground")

const middleWareObject = {}

middleWareObject.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please Login First!")
  res.redirect('/login');
};

middleWareObject.checkCommentOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        res.redirect('back')
      } else {
        if(foundComment.author.id.equals(req.user.id) || req.user.isAdmin){
          next()
        } else {
          req.flash("error", "Permission Denied")
          res.redirect('back')
        }
      }
    })
  } else {
    req.flash("error", "Please login first!")
    res.redirect('back')
  }
}

//Check Campground Ownership

middleWareObject.checkCampgroundOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
         
        if(err){
          req.flash("error", "Campground Not Found")
          res.redirect('back')
        } else {
          if(foundCampground.author.id.equals(req.user.id)  || req.user.isAdmin){
            next()
          } else {
            req.flash("error", "Permission Denied")
            res.redirect('back')
          }
        }
      })
    } else {
        req.flash("error", "Please login first!")
        res.redirect("back")
    }
}

module.exports = middleWareObject