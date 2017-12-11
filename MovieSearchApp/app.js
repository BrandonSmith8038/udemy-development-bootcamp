const express = require('express');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/search', (req, res) => {
  res.render('search');
});

app.get('/results', (req, res) => {
  //Get the query string of whatever you named it in the form
  const title = req.query.search;

  request(
    `http://www.omdbapi.com/?s=${title}&apiKey=thewdb`,
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        res.render('results', { data: data });
      }
    }
  );
});

const port = process.env.PORT || 3000;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`App started on port ${port}`);
});
