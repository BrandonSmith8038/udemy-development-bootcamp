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
        if(foundComment.author.id.equals(req.user.id)){
          next()
        } else {
          res.redirect('back')
        }
      }
    })
  } else {
    res.redirect('back')
  }
}

//Check Campground Ownership

middleWareObject.checkCampgroundOwnership = (req, res, next) => {
  if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
         
        if(err){
          res.redirect('back')
        } else {
          if(foundCampground.author.id.equals(req.user.id) ){
            next()
          } else {
            res.redirect('back')
          }
        }
      })
    } else {
     res.redirect("back")
    }
}

module.exports = middleWareObject