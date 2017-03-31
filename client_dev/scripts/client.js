$(document).ready(function() {
  getListings();
});

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
