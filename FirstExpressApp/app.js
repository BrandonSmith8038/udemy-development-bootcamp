const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hi There');
});

app.get('/bye', (req, res) => {
  res.send('Goodbye!');
});

app.get('/dog', (req, res) => {
  console.log('Someone Made a Request to "/dog"');
  res.send('MEOW');
});

const port = process.env.PORT || 3000;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`App started on port ${port}`);
});
