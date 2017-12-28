const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require("../middleware")
const geocoder = require("geocoder")


//Display All Campgrounds
router.get('/', (req, res) => {
  let noMatch
  //Get all campground from DB
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi')
    Campground.find({name: regex}, (err, allcampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      
      if(allcampgrounds.length < 1 ){
        noMatch = 'No Campgrounds Found'
      }
      console.log(noMatch)
      res.render('campgrounds/index', {
        campgrounds: allcampgrounds,
        currentUser: req.user,
        page: 'campgrounds',
        noMatch: noMatch
      });
    }
  });
  } else {
    Campground.find({}, (err, allcampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds: allcampgrounds,
        currentUser: req.user,
        page: 'campgrounds',
        noMatch: noMatch
      });
    }
  });
  }
  
});

//Handle App New Campground
//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var price = req.body.price;
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground = {name: name, image: image, description: desc, price: price, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
  });
});

//Display Add New Camground Form
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

//Display Individual Campground
router.get('/:id', (req, res) => {
  //Find the campground with the provided ID
  Campground.findById(req.params.id)
    .populate('comments')
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        res.render('campgrounds/show', { campground: foundCampground });
      }
    });
});

//Edit Campground Route
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
      res.render('campgrounds/edit', {campground: foundCampground})
    })
})


//Update Campground Route
router.put("/:id", function(req, res){
  geocoder.geocode(req.body.campground.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.campground.name, image: req.body.campground.image, description: req.body.campground.description, price: req.body.campground.price, location: req.body.campground.location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

//Delete Campground Route
router.delete('/:id/', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err, foundCampground) => {
    if(err){
      res.redirect('/campgrounds')
    } else {
      res.redirect('/campgrounds')
    }
  })
})

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$!#\s]/g, "\\$&")
}

module.exports = router;
