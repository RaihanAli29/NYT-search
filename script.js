$(document).ready(function() {
    // Hide div top articles and top articles header when the document loads
    $(".top-articles, .top-articles-header").hide();
  
    // When search button is clicked
    $("#search-button").on("click", function(event) {
      // Clear the results
      $(".results").empty();
      
      // Show top articles and top articles header
      $(".top-articles, .top-articles-header").show();
      
      // Prevent default form submission
      event.preventDefault();
  
      // Get search inputs
      var searchVar = $("#search").val();
      console.log(searchVar);
  
      var numberOfVar = $("#numberOf").val();
      console.log(numberOfVar);
  
      var beginVar = $("#begin_date").val();
      console.log(beginVar);
  
      var endVar = $("#end_date").val();
      console.log(endVar);
  
      // Clear the form control values
      $(".form-control").val("");
  
      // API Call
      var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      url += '?' + $.param({
        'api-key': "cPsZ5tApcgbWYhoGiKeIqAFiV0m7n049",
        'q': searchVar,
      });
  
      // Make the AJAX request
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        console.log(result);
  
        // Append search results to the results div
        for (var i = 0; i < numberOfVar; i++) {
          $("<span>").addClass("glyphicon glyphicon-chevron-right").appendTo(".results");
          $("<a>").addClass("headline-title").html(result.response.docs[i].headline.main || result.response.docs[i].headline.print_headline).attr({ href: result.response.docs[i].web_url, target: "_blank" }).appendTo(".results");
          $("<p>").addClass("headline-body").html(result.response.docs[i].snippet).appendTo(".results");
          $("<hr>").appendTo(".results");
        }
  
      }).fail(function(err) {
        // Throw an error if an error is found
        throw err;
      });
  
    });
  
    // If Clear button is clicked
    $("#clear-button").on("click", function() {
      // Clear form control values, hide top articles and top articles header, and empty the results
      $(".form-control").val("");
      $(".top-articles, .top-articles-header").hide();
      $(".results").empty();
    });
  });
  