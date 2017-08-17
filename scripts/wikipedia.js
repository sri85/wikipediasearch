$('document').ready(function() {

  function getSearchText() {
    return $("#searchterm").val();
  }

  //Searching on Enter
  $("#searchterm").keydown(key => {
    cont ENTER_KEYCODE = 13;
    if (key.which === ENTER_KEYCODE) {
      $("#search").click();
    }
  });

  $('#search').click(() => {
    let searchTerm = getSearchText();
    if (searchTerm !== "") {
      $("#searchresults").empty();
      $("#searchresults").show();
      getWikiArticles(searchTerm);
    }

  });

  function getWikiArticles(searchTerm) {
    const wikiApiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=" + searchTerm + "&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=10"
    $.ajax({
      url: wikiApiUrl,
      success: (wikiArticles) => {

        let wikiArticleIds = Object.keys(wikiArticles["query"]["pages"]);

        for (let i = 0; i < wikiArticleIds.length; i++) {
          let wikiArticleId = wikiArticleIds[i];
          let wikiArticleTitle =  wikiArticles["query"]["pages"][wikiArticleId]["title"];
          let wikiArticleSummary = wikiArticles["query"]["pages"][wikiArticleId]["extract"];

          $("#searchresults").append('<a href=https://en.wikipedia.org/?curid=' +wikiArticleId+ ' class="list-group-item" target="_blank">' +
            '<h4 class="list-group-item-heading">' + wikiArticleTitle + '</h4>' +
            '<p class="list-group-item-text">' + wikiArticleSummary + '</p>' +
            '</a>')

        }
      },
      error: function(err) {
        console.log("Something went wrong with search results ",err);
      },
      dataType: "jsonp"
    });
  }

});
