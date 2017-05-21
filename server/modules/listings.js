var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Create schema for houses and apartments
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

//create db collections & mongoose models for houses and apartments
var Houses = mongoose.model('House', HouseSchema, 'listings');
var Apartments = mongoose.model('Apartment', AptSchema, 'listings');

//retrieve all listings from db
router.get('/',function(req,res) {
  Apartments.find(function(err, allListings) {
    if (err) {
      console.log('error querying: ', err);
      res.sendStatus(500);
    }
    res.send(allListings);
  });
});

//add new listing to db
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
      console.log('error saving: ', err);
      res.sendStatus(500);
    }
    res.send(savedListing);
  });
});

//remove listing from db
router.delete('/',function(req,res) {
  var id = req.body.id;
  Apartments.findByIdAndRemove(id, function(err, deletedBuilding) {
    if (err) {
      console.log('error deleting: ', err);
      res.sendStatus(500);
    }
    res.send(deletedBuilding);
  });
});

module.exports = router;
