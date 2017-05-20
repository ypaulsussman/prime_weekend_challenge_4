var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var HouseSchema = mongoose.Schema({
  cost: Number,
  sqft: Number,
  city: String
});

var AptSchema = mongoose.Schema({
  rent: Number,
  sqft: Number,
  city: String
});

var Houses = mongoose.model('House', HouseSchema, 'listings');
var Apartments = mongoose.model('Apartment', AptSchema, 'listings');

router.get('/',function(req,res) {
  Apartments.find(function(err, allListings) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(allListings);
  });
});

router.post('/',function(req,res) {
  var listing;
  if (req.body.cost) {
    listing = new Houses();
    listing.cost = req.body.cost;
  } else if (req.body.rent) {
    listing = new Apartments();
    listing.rent = req.body.rent;
  }
  listing.city = req.body.city;
  listing.sqft = req.body.sqft;
  listing.save(function(err, savedListing) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(savedListing);
  });
});

router.delete('/',function(req,res) {
  console.log(req.body);
  var id = req.body.id;
  Apartments.findByIdAndRemove(id, function(err, deletedBuilding) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(deletedBuilding);
  });
});

module.exports = router;
