import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hi SSR!');
});

app.listen(3000, () => {
  console.log('App runs on PORT 3000');
});
