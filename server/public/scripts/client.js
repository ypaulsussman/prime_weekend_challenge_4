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
  }
});
}
