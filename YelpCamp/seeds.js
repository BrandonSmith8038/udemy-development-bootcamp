const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Clouds Rest',
    image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'Desert Mesa',
    image: 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'Canyon Floor',
    image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];
const seedDB = () => {
  // Remove All Campgrounds

  Campground.remove({}, err => {
    /*if (err) {
      console.log(err);
    }
    console.log('Removed Camgrounds');
    data.forEach(seed => {
      //Add a few campgrounds
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Campground Added');
          //Creat A Comment
          Comment.create(
            {
              text: 'This place is great, but I wish there was internet',
              author: 'Homer'
            },
            {
              text: 'The Bathroom smells horrible',
              author: 'Bart'
            },
            {
              text: 'The Bears ate my picnic',
              author: 'Marge'
            },
            (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('Created New Comment');
              }
            }
          );
        }
      });
    });*/
  });
};

module.exports = seedDB;
