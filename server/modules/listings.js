var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ListingSchema = mongoose.Schema({
  sqft: Number,
  city: String
});

var Listings = mongoose.model("listings", ListingSchema);

router.get('/',function(req,res) {
  Listings.find(function(err, allListings) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(allListings);
  });
});








module.exports = router;
