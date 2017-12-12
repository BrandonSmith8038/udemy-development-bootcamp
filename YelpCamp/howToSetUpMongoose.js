//Set Up Database

//Map global promie - get rid of the warning

mongoose.Promise = global.Promise;

//Connect to mongoose

mongoose
  .connect(
    'mongodb://<USERNAME>:<PASSWORD>@ds135876.mlab.com:35876/reddirt-yelp-camp',
    {
      useMongoClient: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

const Cat = mongoose.model('Cat', catSchema);

const george = new Cat({
  name: 'Mrs. Norris',
  age: 7,
  temperament: 'Evil'
});

george.save((err, cat) => {
  if (err) {
    console.log('Something went wrong');
  } else {
    console.log('We Just save a cat to the database');
    console.log(cat);
  }
});

Cat.create(
  {
    name: 'Garfield',
    age: 17,
    temperament: 'Hungry'
  },
  (err, cat) => {
    if (err) {
      console.log(err);
    } else {
      console.log(cat);
    }
  }
);

Cat.findOne({}, (err, cats) => {
  if (err) {
    console.log('OH NO, ERROR!');
    console.log('err');
  } else {
    console.log('All The Cats....');
    console.log(cats);
  }
});
