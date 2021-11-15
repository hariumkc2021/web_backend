const express = require('express');
const router = new express.Router();

const app = require('../services/app.js');


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