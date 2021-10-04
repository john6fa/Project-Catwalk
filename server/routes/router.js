const router = require('express').Router();
const axios = require('axios');
const { authToken } = require('../../config');

// Test Endpoint
router.get('/yourWidgetHere', (req, res) => {
  res.end('hello world');
});

// OVERVIEW ENDPOINTS

router.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?count=25', {
    headers: { Authorization: authToken },
  })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

router.get('/products/:product_id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}`, {
    headers: { Authorization: authToken },
  })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

router.get('/products/styles/:product_id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}/styles`, {
    headers: { Authorization: authToken },
  })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

// RELATED PRODUCTS ENDPOINTS

router.get('/products/:product_id/related', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.params.product_id}/related`, {
    headers: { Authorization: authToken },
  })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

// QUESTION & ANSWER ENDPOINTS
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${req.params.question_id}&page=1&count=100
router.get('/qa/questions/:question_id', (req, res) => {
  axios.get(`http://localhost:3001/qa/questions/?product_id=${req.params.question_id}&page=1&count=100`, {
    headers: { Authorization: authToken },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.question_id}/answers/?count=10
router.get('/qa/questions/answers/:question_id', (req, res) => {
  axios.get(`http://localhost:3001/qa/questions/${req.params.question_id}/answers/?count=10`, {
    headers: { Authorization: authToken },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});



// POST QUESTIONS
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions
router.post('/qa/questions/add/:product_id', (req, res) => {
  const newQuestion = req.body;
  axios.post('http://localhost:3001/qa/questions', newQuestion, {
    headers: { Authorization: authToken },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

// POST ANSWERS
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.question_id}/answers
router.post('/qa/answers/add/:question_id', (req, res) => {
  const newAnswer = req.body;
  axios.post(`http://localhost:3001/qa/questions/${req.params.question_id}/answers`, newAnswer, {
    headers: { Authorization: authToken },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});


// PUT QUESTIONS HELPFUL
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.question_id}/helpful
router.put('/qa/questions/helpful/:question_id', (req, res) => {
  axios.patch(`http://localhost:3001/qa/questions/${req.params.question_id}/helpful`, {}, {
    headers: { Authorization: authToken },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});


// PUT ANSWERS HELPFUL
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.params.answer_id}/helpful
router.put('/qa/answers/helpful/:answer_id', (req, res) => {
  axios.patch(`http://localhost:3001/qa/answers/${req.params.answer_id}/helpful`, {}, {
    headers: { Authorization: authToken },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err)
    });
});

// PUT ANSWERS REPORT
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.params.answer_id}/report`
router.put('/qa/answers/report/:answer_id', (req, res) => {
  axios.patch(`http://localhost:3001/qa/answers/${req.params.answer_id}/report`, {}, {
    headers: { Authorization: authToken },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});







// RATINGS AND REVIEWS ENDPOINTS

router.get('/reviews/:product_id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?sort=newest&product_id=${req.params.product_id}&count=100`, {
    headers: { Authorization: authToken },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

router.post('/reviews', (req, res) => {
  const newReview = req.body;
  const headers = {
    Authorization: authToken,
    'Content-Type': 'application/json',
  };

  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', newReview, { headers })
    .then((result) => {
      console.log('successful review form post :) ');
      res.status(200);
      res.send(result.data);
    })
    .catch((err) => {
      res.status(400);
      res.end('Unable to complete post request for review form submission');
    });
});

router.get('/reviews/meta/:product_id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?sort=newest&product_id=${req.params.product_id}&count=100`, {
    headers: { Authorization: authToken },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

router.get('/product/rating/:id', (req, res) => {
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

module.exports = router;
