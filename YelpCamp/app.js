const express = require('express');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/campgrounds', (req, res) => {
  const campgrounds = [
    {
      name: 'Salmon Creek',
      image: 'https://farm6.staticflickr.com/5334/9925256586_c06d949b3e.jpg'
    },
    {
      name: 'Granite Hill',
      image: 'https://farm5.staticflickr.com/4514/36822417253_1d7f340b3a.jpg'
    },
    {
      name: "Mountian Goat's Rest",
      image: 'https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg'
    }
  ];

  res.render('campgrounds', { campgrounds: campgrounds });
});

const port = process.env.PORT || 3000;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`App started on port ${port}`);
});
