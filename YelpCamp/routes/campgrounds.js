const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleWare = require("../middleware")


//Display All Campgrounds
router.get('/', (req, res) => {
  //Get all campground from DB
  Campground.find({}, (err, allcampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds: allcampgrounds,
        currentUser: req.user,
        page: 'campgrounds'
      });
    }
  });
});

//Handle App New Campground
router.post('/', middleWare.isLoggedIn, (req, res) => {
  const name = req.body.name;
  const img = req.body.image;
  const description = req.body.description;
  const author = {
    id: req.user.id,
    username: req.user.username
  }

  const newCampground = { name: name, image: img, description: description, author: author };
  
  //Creat A New Campground and Save It To The Database

  Campground.create(
      newCampground,
    (err, campground) => {
      if (err) {
        console.log(err);
      } else {
        console.log('New Campground Added');
      }
    }
  );

  res.redirect('/campgrounds');
});

//Display Add New Camground Form
router.get('/new', middleWare.isLoggedIn, (req, res) => {
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
router.get('/:id/edit', middleWare.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
      res.render('campgrounds/edit', {campground: foundCampground})
    })
})


//Update Campground Route
router.put('/:id', middleWare.checkCampgroundOwnership, (req, res) => {
 Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
   if(err){
     res.redirect('/campground')
   } else {
     res.redirect(`/campgrounds/${req.params.id}`)
   }
 })
})

//Delete Campground Route
router.delete('/:id/', middleWare.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err, foundCampground) => {
    if(err){
      res.redirect('/campgrounds')
    } else {
      res.redirect('/campgrounds')
    }
  })
})

module.exports = router;
