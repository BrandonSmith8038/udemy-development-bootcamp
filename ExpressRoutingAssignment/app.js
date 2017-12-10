const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hi there, welcome to my assignment!');
});

app.get('/speak/:animal', (req, res) => {
  const sounds = {
    pig: 'Oink',
    cow: 'Moo',
    dog: 'Woof Woof',
    cat: 'Meow',
    snake: 'ssssss'
  };

  const animal = req.params.animal.toLowerCase();

  res.send(`The ${animal} says '${sounds[animal]}'`);
});

app.get('/repeat/:word/:num', (req, res) => {
  let phrase = '';

  for (let i = 0; i < req.params.num; i++) {
    phrase += ` ${req.params.word}`;
  }
  res.send(`${phrase}`);
});

app.get('*', (req, res) => {
  res.send('Sorry, There is no page here. What are you doing with your life?');
});

const port = process.env.PORT || 3000;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`App started on port ${port}`);
});
