const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const expressSanitizer = require('express-sanitizer')
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(methodOverride("_method"))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSanitizer())
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
      req.body.story.body = req.sanitize(req.body.story.body),
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

//Edit Route
app.get('/story/:id/edit', (req, res) => {
  Story.findById(req.params.id, (err, foundStory) => {
    if(err){
      console.log(err)
    } else {
      res.render('edit', {story: foundStory})
    }
  }) 
})

//Update Route
app.put('/story/:id', (req, res) => {
  req.body.story.body = req.sanitize(req.body.story.body)
  Story.findByIdAndUpdate(req.params.id, req.body.story, (err, updateStory) => {
    if(err) {
      res.redirect('/index')
    } else {
      res.redirect(`/story/${req.params.id}`)
    }
  })
})


//Delete Route

app.delete("/story/:id", (req, res) => {
  Story.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      res.redirect('/index')
    } else {
      res.redirect('/index')
    }
  })
})

const port = process.env.PORT || 8888;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`Blog app started on port ${port}`);
});
