const express = require('express');
const router = new express.Router();

const app = require('../services/app.js');
const Razorpay = require('razorpay')
const razorpay = new Razorpay({
    key_id: 'rzp_test_kjMNJwg5AL3w2f',
    key_secret: 'zX8OMkvvILQbXHxEUdcoeKX0'
})

router.post('/orders', async (req, res) => {
   console.log("req.body",req.body)
  const options = {
      amount: req.body.amount*100,
      currency: 'INR',
      receipt: "testing", //any unique id
      payment_capture : 1 //optional
  }
  try {
      const response = await razorpay.orders.create(options)
      res.json({
          order_id: response.id,
          currency: response.currency,
          amount: response.amount
      })
  } catch (error) {
      console.log(error);
      res.status(400).send('Unable to create order');
  }
})




router.post('/login', async function (req, res, next) {
    let options = {};
    options.mDbClient = req.mDbClient;
    options.body = req.body;
    console.log("options",options)
      app.login(options).then((result) => {
        res.status(result.status).send(result.response)
      }).catch((result) =>
        res.status(result.status).send(result.response)
      )
  });

  router.post('/signUp', async function (req, res, next) {
    let options = {};
    options.mDbClient = req.mDbClient;
    options.body = req.body;
    console.log("options",options)
      app.signUp(options).then((result) => {
        res.status(result.status).send(result.response)
      }).catch((result) =>
        res.status(result.status).send(result.response)
      )
  });

  router.get('/programs', async function (req, res, next) {
      let options = {};
      options.mDbClient = req.mDbClient;
      options.body = req.body;
        app.getAllPrograms(options).then((result) => {
          res.status(result.status).send(result.response)
        }).catch((result) =>
          res.status(result.status).send(result.response)
        )
    });
    router.get('/enrollments', async function (req, res, next) {
      let options = {};
      options.mDbClient = req.mDbClient;
      options.userName = req.query.userName,
      options.body = req.body;
        app.getAllEnrollments(options).then((result) => {
          res.status(result.status).send(result.response)
        }).catch((result) =>
          res.status(result.status).send(result.response)
        )
    });


    router.put('/enrollments', async function (req, res, next) {
      let options = {};
      options.mDbClient = req.mDbClient;
      options.userName = req.query.userName,
      options.body = req.body;
        app.putEnrollments(options).then((result) => {
          res.status(result.status).send(result.response)
        }).catch((result) =>
          res.status(result.status).send(result.response)
        )
    });



module.exports = router;