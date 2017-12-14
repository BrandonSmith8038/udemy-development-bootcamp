const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
//Map global promise(get rid of the warning)

mongoose.Promise = global.Promise;

//Connect to mlab db

mongoose
  .connect(
    'mongodb://cowboy8038:Nascar8038@ds135876.mlab.com:35876/reddirt-yelp-camp',
    { useMongoClient: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Story Schema Setup
const storySchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  created: { type: Date, default: Date.now }
});

const Story = mongoose.model('Story', storySchema);

//Restful Routes

//Home Page
app.get('/', (req, res) => {
  res.render('home');
});

//Index(Show all stories)
app.get('/index', (req, res) => {
  Story.find({}, (err, stories) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { stories: stories });
    }
  });
});

//Add New Post Form
app.get('/story/new', (req, res) => {
  res.render('new');
});

//Capture Form Post Request
app.post('/story/create', (req, res) => {
  Story.create(
      req.body.story,
    (err, Story) => {
      if (err) {
        console.log(err);
      } else {
        console.log(Story);
      }
    }
  );

  res.redirect('/index');
});

//Show Route
app.get('/story/:id', (req, res ) => {
 Story.findById(req.params.id, (err, foundStory) => {
   if(err){
     console.log(err)
   } else {
      res.render('show', {story: foundStory})
   }
 })
})

const port = process.env.PORT || 8888;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`Blog app started on port ${port}`);
});
