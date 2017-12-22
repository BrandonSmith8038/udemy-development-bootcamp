const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

//Check Campground Ownership

const checkCampgroundOwnership = (req, res, next) => {
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

//Edit Campground Route
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
      res.render('campgrounds/edit', {campground: foundCampground})
    })
})


//Update Campground Route
router.put('/:id', checkCampgroundOwnership, (req, res) => {
 Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
   if(err){
     res.redirect('/campground')
   } else {
     res.redirect(`/campgrounds/${req.params.id}`)
   }
 })
})

//Delete Campground Route
router.delete('/:id/', checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err, foundCampground) => {
    if(err){
      res.redirect('/campgrounds')
    } else {
      res.redirect('/campgrounds')
    }
  })
})

module.exports = router;
