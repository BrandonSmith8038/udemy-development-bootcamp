const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const friends = ['Joe', 'Jess', 'Amber', 'Josh'];

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/friends', (req, res) => {
  res.render('friends', { friends: friends });
});

app.post('/addFriend', (req, res) => {
  const newFriend = req.body.newFriend;

  friends.push(newFriend);

  res.redirect('/friends');
});

const port = process.env.PORT || 3000;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`App started on port ${port}`);
});
