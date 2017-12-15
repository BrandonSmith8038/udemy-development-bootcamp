const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Campground = require('./models/campground')
const seedDB = require('./seeds')

seedDB()


const app = express();

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

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/campgrounds', (req, res) => {
  //Get all campground from DB
  Campground.find({}, (err, allcampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { campgrounds: allcampgrounds });
    }
  });
});

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

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
  //Find the campground with the provided ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground)
      res.render('show', { campground: foundCampground });
    }
  });
});

const port = process.env.PORT || 3000;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`App started on port ${port}`);
});
