const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

//Display All Campgrounds
router.get('/', (req, res) => {
  console.log(req.user);
  //Get all campground from DB
  Campground.find({}, (err, allcampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds: allcampgrounds,
        currentUser: req.user
      });
    }
  });
});

//Handle App New Campground
router.post('/', isLoggedIn, (req, res) => {
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
        console.log(campground);
      }
    }
  );

  res.redirect('/campgrounds');
});

//Display Add New Camground Form
router.get('/new', isLoggedIn, (req, res) => {
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

module.exports = router;
