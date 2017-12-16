const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local')
const bodyParser = require('body-parser');
const User = require('./models/user')
const Campground = require('./models/campground')
const Comment = require('./models/comment')
const seedDB = require('./seeds')

//========================================
//App Setup
//========================================

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

//========================================
//Populate Database
//========================================

seedDB()

//========================================
//Mongoose Setup
//========================================
//Map global promie - get rid of the warning

mongoose.Promise = global.Promise;

//Connect to mongoose

mongoose
  .connect(
    'mongodb://cowboy8038:Nascar8038@ds135876.mlab.com:35876/reddirt-yelp-camp',
    {
      useMongoClient: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//SCHEMA SETUP


//========================================
//Routes
//========================================

//Home Page Route
app.get('/', (req, res) => {
  res.render('home');
});

//Display All Campgrounds
app.get('/campgrounds', (req, res) => {
  //Get all campground from DB
  Campground.find({}, (err, allcampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: allcampgrounds });
    }
  });
});

//Handle App New Campground
app.post('/campgrounds', (req, res) => {
  const name = req.body.name;
  const img = req.body.image;
  const description = req.body.description;

  const newCampground = { name: name, image: img, description: description };

  //Creat A New Campground and Save It To The Database

  Campground.create(
    {
      name: name,
      image: img,
      description: description
    },
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
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

//Display Individual Campground
app.get('/campgrounds/:id', (req, res) => {
  //Find the campground with the provided ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});


//Displays new comment form
app.get('/campgrounds/:id/comments/new', (req, res) => {
  
  Campground.findById(req.params.id, (err, campground) => {
     if(err){
       console.log(err)
     } else {
        res.render('comments/new', {campground: campground})
     }
  })
  
})

//Handles Add New Comment
app.post('/campgrounds/:id/comments', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err){
      console.log(err)
    } else {
      
      Comment.create(
        {
          text: req.body.comment.text,
          author: req.body.comment.author
        }, (err, comment) => {
          if(err){
            console.log(err)
          } else {
            campground.comments.push(comment)
            campground.save()
            res.redirect(`/campgrounds/${campground._id}`)
          }
        }
        )
    }
  })
})


//========================================
//Serve App
//========================================

const port = process.env.PORT || 3000;
const ip = process.env.IP;


app.listen(port, ip, () => {
  console.log(`App started on port ${port}`);
});
