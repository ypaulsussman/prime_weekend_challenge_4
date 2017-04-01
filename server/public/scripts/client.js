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
  for (var i = 0; i < response.length; i++) {
    $('.basket.container').append('<div class="row" id="property'+ i + '"></div>');
    var $el = $('#property'+i);
    $el.append('<div class="col-md-4"><p>'+response[i].sqft+' square feet!</p></div>');
    $el.append('<div class="col-md-4"><p>Located in sunny '+response[i].city+'!</p></div>');
    if (response[i].cost) {
      $el.append('<div class="col-md-4"><p>Only $'+response[i].cost+' to own!</p></div>');
    }else if (response[i].rent) {
      $el.append('<div class="col-md-4"><p>Only $'+response[i].rent+' a month!</p></div>');
    }

    // $el.append('<div class="col-md-4"><p>'+response[i].sqft+' square feet!</p></div>');
    // $el.append('<div class="col-md-4"><p>Located in sunny '+response[i].city+'!</p></div>');
    // if (response[i].cost) {
    //   $el.append('<div class="col-md-4"><p>Only $'+response[i].cost+' to own!</p></div>');
    // }else if (response[i].rent) {
    //   $el.append('<div class="col-md-4"><p>Only $'+response[i].rent+' a month!</p></div>');
    // }
  }
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
