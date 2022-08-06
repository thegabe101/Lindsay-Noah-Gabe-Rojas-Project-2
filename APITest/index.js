// var keyData = "0553283685";
// $.ajax({
//   url: "https://openlibrary.org/api/books?bibkeys=ISBN:" + keyData + "&jscmd=details&callback=mycallback",
//   dataType: "jsonp",
//   success: function(data) {
//     var getData = data["ISBN:" + keyData];
//     var title = getData.details.title,
//       author = getData.details.authors[0].name;
//     $('.title').text(title);
//     $('.author').text(author);
//   }
// });

// const { response } = require("express");

function getBooks(){
  document.getElementById('output').innerHTML="";
  fetch("http://openlibrary.org/search.json?q="+document.getElementById("input").value)
  .then(a=>a.json())
  .then(response => {
    for(var i=0; i<1;i++){
      document.getElementById("output").innerHTML+="<h2>"+response.docs[i].title+"</h2>"+response.docs[i].author_name[0]+"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>";
    }
  });
}
