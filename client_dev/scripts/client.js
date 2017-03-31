$(document).ready(function() {
  getListings();
  eventListeners(true);
});

function eventListeners(value) {
  if (true) {
    $('#sellHome').on('submit', addListing);
  }else {

  }
}

function getListings() {
  console.log("jquery's running");
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
  for (var i = 0; i < response.length; i++) {
    $('.basket.container').append('<div class="row" id="property'+ i + '"></div>');
    var $el = $('#property'+i);
    // $('#propertyX')
    $el.append('<div class="col-md-4"><p>'+response[i].sqft+' square feet!</p></div>');
    $el.append('<div class="col-md-4"><p>Located in sunny '+response[i].city+'.</p></div>');
    if (response[i].cost) {
      $el.append('<div class="col-md-4"><p>Only $'+response[i].cost+' to own!</p></div>');
    }else if (response[i].rent) {
      $el.append('<div class="col-md-4"><p>Only $'+response[i].rent+' a month!</p></div>');
    }
    // response[i]
  }
}

function addListing() {
  event.preventDefault();
  console.log('button works!');
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
    url: "/newListing",
    data: newListing,
    success: function(response){
      getListings(response);
    }
  });
}
