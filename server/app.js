//node requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//mongo requires
var listings = require('./modules/listings.js');
var mongoose = require('mongoose');
var mongoURI = "mongodb://" + process.env.MLAB + "@ds161175.mlab.com:61175/weekend_challenge_4";
var mongoDB = mongoose.connect(mongoURI).connection;


//server setup
app.set("port", (process.env.PORT || 7000));

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res) {
  res.sendFile(path.resolve('server/public/views/index.html'));
});

app.get('/sell', function(req, res) {
  res.sendFile(path.resolve('server/public/views/sell.html'));
});

app.post('/admin', function(req, res) {
  res.sendFile(path.resolve('server/public/views/admin.html'));
});

app.listen(app.get("port"), function() {
  console.log('Now listening on port: ', app.get("port"));
});

//MongoDB connection
app.use("/listings", listings);

mongoDB.on("error", function(err) {
  console.log("mongo connection error: ", err);
});

mongoDB.once("open", function() {
  console.log("connected to mongo!!!");
});
