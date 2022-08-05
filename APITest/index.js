var keyData = "0553283685";
$.ajax({
  url: "https://openlibrary.org/api/books?bibkeys=ISBN:" + keyData + "&jscmd=details&callback=mycallback",
  dataType: "jsonp",
  success: function(data) {
    var getData = data["ISBN:" + keyData];
    var title = getData.details.title,
      author = getData.details.authors[0].name;
    $('.title').text(title);
    $('.author').text(author);
  }
});