var adjArray = ["pretty", "alluring", "lovely", "charming", "delightful", "appealing", "engaging", "winsome", "ravishing", "gorgeous", "stunning", "arresting", "glamorous", "bewitching", "beguiling", "graceful", "elegant", "exquisite", "aesthetic", "artistic", "decorative", "magnificent", "divine", "gorgeous", "beauteous", "comely", "fair"];
var adjective;
var index;
function getRandomAdjIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

$(document).ready(function() {
  if(window.location.pathname ==='/'){
    getListings();
  }
  eventListeners(true);
});

function eventListeners(value) {
  if (true) {
    $('#sellHome').on('submit', addListing);
    $('#rent').on('keypress', hideCost);
    $('#cost').on('keypress', hideRent);
    $('#resetSell').on('click', reload);
    $('.basket.container').on('click','#nextPageButton', nextPage);
  }else {
    $('#sellHome').off('submit', addListing);
    $('#rent').on('keypress', hideCost);
    $('#cost').on('keypress', hideRent);
    $('#resetSell').on('click', reload);
  }
}

function getListings() {
  console.log("getting listings");
  $.ajax({
  type: "GET",
  url: "/listings",
  success: function(response) {
    console.log("successful call");
    console.log(response);
    appendListings(response);
  }
});
}

function appendListings(response) {
  $('.basket.container').empty();
  var $row;
  for (var i = 0; i < 24; i++) {
    if (i%2===1) {
      $('.basket.container').append('<div class="row" id="row'+ i + '"></div>');
      $row = $('#row'+i);
      $row.append('<div class="col-md-4 col-md-offset-1" id="property'+ i + '"></div>');
    } else if (i%2===0) {
      $row = $('#row'+(i-1));
      $row.append('<div class="col-md-4 col-md-offset-2" id="property'+ i + '"></div>');
    }
    var $el = $('#property'+i);
    if (response[i].cost) {
      $el.append('<div class="col-md-2 glyph-holder"><span class="glyphicon glyphicon-home"></span></div>');
    }else if (response[i].rent) {
      $el.append('<div class="col-md-2 glyph-holder"><span class="glyphicon glyphicon-list-alt"></span></div>');
    }
    index = getRandomAdjIndex(0, adjArray.length);
    adjective = adjArray[index];
    $el.append('<div class="col-md-7 location"><p>Located in '+ adjective +' '+response[i].city+'!</p></div>');
    var size = response[i].sqft+' square feet!';
    if (response[i].cost) {
      var cost = 'Only $'+response[i].cost+' to own!';
      $el.append('<button type="button" class="btn btn-sm btn-success cost col-md-3" data-toggle="popover" data-trigger="focus" title="'+ size + '" data-content="'+cost+'">Learn More!</button>');
    }else if (response[i].rent) {
      var rent = 'Only $'+response[i].rent+' a month!';
      $el.append('<button type="button" class="btn btn-sm btn-success rent col-md-3" data-toggle="popover" data-trigger="focus" title="'+ size + '" data-content="'+rent+'">Learn More!</button>');
    }
  }
  $(function () {
    $('[data-toggle="popover"]').popover();
    $row.append('<div class="col-md-4 col-md-offset-2"><button type="submit" class="btn btn-primary" id="nextPageButton"><span id="npbText">More Super Deals!</span></button></div>');
    //stretch goal: get button to do anything beside sending an alert
  });
}

function addListing() {
  event.preventDefault();
  console.log('submit button works!');
  var newListing = {
    city : $('#location').val(),
    sqft : $('#squareFeet').val(),
  };
  if ($('#rent').val()) {
    newListing.rent = $('#rent').val();
  } else if ($('#cost').val()) {
    newListing.cost = $('#cost').val();
  }
  $.ajax({
    type: "POST",
    url: "/listings",
    data: newListing,
    success: function(){
      $('#rent').val('');
      $('#cost').val('');
      $('#location').val('');
      $('#squareFeet').val('');
      //stretch goal: include "thanks for submitting! now go get a newer, bigger home" modal
    }
  });
}

function hideCost() {
  $('.cost-form, #or-tag').remove();
}

function hideRent() {
  $('.rent-form, #or-tag').remove();
}

function reload() {
  window.location.reload(true);
}

function nextPage() {
  window.alert("Over one weekend? On Week FOUR?! Nah man... sorry...");
}
