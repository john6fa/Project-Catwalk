const express = require('express');
const path = require('path');
const axios = require('axios');
const { authToken } = require('../config');

// Test Demo Router
// const router = require('./routes/example');
const router = require('./routes/router');

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);


app.get('/product/rating/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?sort=newest&product_id=${req.params.id}&count=100`, {
    headers: { Authorization: authToken },
  })
    .then((response) => {
      res.send(JSON.stringify(response.data.results
        .map((review) => review.rating)
        .reduce((previous, current) => previous + current, 0) / response.data.results.length));
    })
    .catch((err) => res.send(err));
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
