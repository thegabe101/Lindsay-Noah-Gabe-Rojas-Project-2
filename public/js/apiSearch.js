// var keyData = "0553283685";
// $.ajax({
//   url: "https://openlibrary.org/api/books?bibkeys=ISBN:" + keyData + "&jscmd=details&callback=mycallback",
//   dataType: "jsonp",
//   success: function (data) {
//     var getData = data["ISBN:" + keyData];
//     var title = getData.details.title;
//     var author = getData.details.authors[0].name;
//     $('.title').text(title);
//     $('.author').text(author);
//   }
// });

function searchBook(name) {
  const searchQuery = document.querySelector('#search-book').value;
  var startTime = performance.now();
  console.log("Started Searching");
  axios
    .get(`http://openlibrary.org/search.json?title=${searchQuery}&limit=10`)
    .then((response) => {
      console.log(response.data);
      var endTime = performance.now();
      console.log(`Took ${endTime - startTime} milliseconds`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// module.exports = searchBook();