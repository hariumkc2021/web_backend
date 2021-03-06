'use strict';
const express = require('express')
const PORT = process.env.PORT || 5001
const app = express();
const MongoClient = require('mongodb').MongoClient;
const dbName = "appointmentSystem"
const url = process.env.mongodburl || `mongodb+srv://hari0117:Qwerty@1@cluster0.xkdmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mDbClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const bodyParser = require('body-parser');
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
app.listen(PORT, () => console.log("listening", PORT));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.mDbClient = mDbClient;
  next();
})

app.use('/', require('./routes/app'))
//exports.mbClient = mbClient
module.exports = app


