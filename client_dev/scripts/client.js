$(document).ready(function() {
  //ensures db call is made only on "listings" and "admin" pages
  if(window.location.pathname ==='/' || '/admin'){
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
    $('#rent').off('keypress', hideCost);
    $('#cost').off('keypress', hideRent);
    $('#resetSell').off('click', reload);
  }
}//end eventListeners

function getListings() {
  console.log("getting listings");
  $.ajax({
  type: "GET",
  url: "/listings",
  success: function(response) {
    console.log("successful call");
    console.log(response);
    if(window.location.pathname ==='/'){
      appendListings(response);
    } else if (window.location.pathname ==='/admin') {
      adminAppend(response);
    }//end elseif
  }//end success-function
});//end ajax
}//end getListings

//generates random adjective to prefix building location
var adjArray = ["pretty", "alluring", "lovely", "charming", "delightful", "appealing", "engaging", "winsome", "ravishing", "gorgeous", "stunning", "arresting", "glamorous", "bewitching", "beguiling", "graceful", "elegant", "exquisite", "aesthetic", "artistic", "decorative", "magnificent", "divine", "gorgeous", "beauteous", "comely", "fair"];
var adjective;
var index;
function getRandomAdjIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function appendListings(response) {
  //refreshes container
  $('.basket.container').empty();
  var $row;
  for (var i = 0; i < 24; i++) {
    //creates one row for each two listings
    if (i%2===1) {
      $('.basket.container').append('<div class="row" id="row'+ i + '"></div>');
      $row = $('#row'+i);
      $row.append('<div class="col-md-4 col-md-offset-1" id="property'+ i + '"></div>');
    } else if (i%2===0) {
      $row = $('#row'+(i-1));
      $row.append('<div class="col-md-4 col-md-offset-2" id="property'+ i + '"></div>');
    }
    //adds house or "list/kind-of-apartment-if-you-look-at-it-right" glyphicon to listing
    var $el = $('#property'+i);
    if (response[i].cost) {
      $el.append('<div class="col-md-2 glyph-holder"><span class="glyphicon glyphicon-home"></span></div>');
    }else if (response[i].rent) {
      $el.append('<div class="col-md-2 glyph-holder"><span class="glyphicon glyphicon-list-alt"></span></div>');
    }
    //adds location text
    index = getRandomAdjIndex(0, adjArray.length);
    adjective = adjArray[index];
    $el.append('<div class="col-md-7 location"><p>Located in '+ adjective +' '+response[i].city+'!</p></div>');
    //adds popover button for size & price
    var size = response[i].sqft+' square feet!';
    if (response[i].cost) {
      var cost = 'Only $'+response[i].cost+' to own!';
      $el.append('<button type="button" class="btn btn-sm btn-info cost col-md-3" data-toggle="popover" data-trigger="focus" title="'+ size + '" data-content="'+cost+'">Learn More!</button>');
    }else if (response[i].rent) {
      var rent = 'Only $'+response[i].rent+' a month!';
      $el.append('<button type="button" class="btn btn-sm btn-info rent col-md-3" data-toggle="popover" data-trigger="focus" title="'+ size + '" data-content="'+rent+'">Learn More!</button>');
    }
  }
  //adds button to display more listings
  $(function () {
    $('[data-toggle="popover"]').popover();
    $row.append('<div class="col-md-4 col-md-offset-2"><button type="submit" class="btn btn-primary" id="nextPageButton"><span id="npbText">More Super Deals!</span></button></div>');
    //stretch goal: get button to do anything beside sending an alert
  });
}//end appendListings


function addListing() {
  event.preventDefault();
  console.log('submit button works!');
  //validates all fields filled
  if ($('#location').val() && $('#squareFeet').val() && $('#rent').val() || $('#location').val() && $('#squareFeet').val() && $('#cost').val()) {
    //creates object for ajax call
    var newListing = {
      city : $('#location').val(),
      sqft : $('#squareFeet').val(),
    };
    if ($('#rent').val()) {
      newListing.rent = $('#rent').val();
    } else if ($('#cost').val()) {
      newListing.cost = $('#cost').val();
    }
    //ajax call
    $.ajax({
      type: "POST",
      url: "/listings",
      data: newListing,
      success: function(){
        //resets form fields
        $('#rent').val('');
        $('#cost').val('');
        $('#location').val('');
        $('#squareFeet').val('');
        alertify.alert("Sussman Homes and Gardens says:","Thanks for submitting your home!", function() {
          alertify.success('Listing added!');
        });//end alertify
      }//end success-function
    });//end ajax
  } else {
    alertify.alert("Sussman Homes and Gardens says:","Please complete all fields.", function() {
      alertify.error('Listing not added');
    });//end alertify
  }//end else
}//end addListing

//removes "cost" or "rent" field -- for when opposite field is activated
function hideCost() {
  $('.cost-form, #or-tag').remove();
}
function hideRent() {
  $('.rent-form, #or-tag').remove();
}

//refreshes page -- for when "reset form" is hit on sell page
function reload() {
  window.location.reload(true);
}

//stub for "click for more offers" button on listings page
function nextPage() {
  window.alert("Over one weekend? On Week FOUR?! Nah man... sorry...");
}

function adminAppend(response) {
  console.log("adminAppend is working");
  for (var i = 0; i < response.length; i++) {
      $('.admin-container.container').append('<div class="row" id="propAdminView' + i + '"></div>');
      var $el = $('#propAdminView' + i);
      $el.append('<div class="col-md-3 admin-div"><p>' + response[i].sqft + ' square feet</p></div>');
      $el.append('<div class="col-md-3 admin-div"><p>Located in ' + response[i].city + '</p></div>');
      if (response[i].cost) {
          $el.append('<div class="col-md-3 admin-div"><p>Cost to own: $' + response[i].cost + '</p></div>');
      } else if (response[i].rent) {
          $el.append('<div class="col-md-3 admin-div"><p>Monthly rent: $' + response[i].rent + '</p></div>');}
      $el.append('<div class="col-md-3 admin-div"><button class="delete btn btn-sm btn-warning" data-buildingid="'+ response[i]._id+'">Delete</button></div>');
   }//end for-loop
 }//end adminAppend
