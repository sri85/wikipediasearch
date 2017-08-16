$('document').ready(function(){

  //Searching on Enter
  $("#searchterm").keydown(e =>{
    if(e.which === 13){
       $("#search").click();
    }
});

  $('#search').click(()=>{
    let searchTerm = ($("#searchterm").val());
    if (searchTerm !== ""){
      $("#searchresults").empty();
      $("#searchresults").show();
      getWikiArticles(searchTerm);

    }

  });

  function getWikiArticles(searchTerm) {
    let wikiApi = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch="+searchTerm+"&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=10"
    $.ajax({url: wikiApi,
    success: (articles) => {

      let keys =(Object.keys(articles["query"]["pages"]));

        for(let i =0; i<keys.length; i++){
          let key = keys[i];

            $("#searchresults").append('<a href=https://en.wikipedia.org/?curid='+[key]+' class="list-group-item" target="_blank">'
              +'<h4 class="list-group-item-heading">'+articles["query"]["pages"][key]["title"]+'</h4>'+
              '<p class="list-group-item-text">'+articles["query"]["pages"][key]["extract"]+'</p>'
            +'</a>')

        }


  },error: function(err){

  },dataType: "jsonp"});
}
return false;

});
