// Ditched due to inability to get reliable consistent ISBN upon user input of title name.

// var keyData = "0553283685";
//$.ajax({
 // url: "https://openlibrary.org/api/books?bibkeys=ISBN:" + keyData + "&jscmd=details&callback=mycallback",
 //// dataType: "jsonp",
  //success: function(data) {
    //var getData = data["ISBN:" + keyData];
    //var title = getData.details.title,
     // author = getData.details.authors[0].name;
   // $('.title').text(title);
   // $('.author').text(author);
  //}
//});

//{
  //"ISBN:0451526538": {
   // "bib_key": "ISBN:0451526538",
   // "preview": "noview",
   // "thumbnail_url": "https://covers.openlibrary.org/b/id/295577-S.jpg",
   // "preview_url": "https://openlibrary.org/books/OL1017798M/The_adventures_of_Tom_Sawyer",
    //"info_url": "https://openlibrary.org/books/OL1017798M/The_adventures_of_Tom_Sawyer"
  ///}
//}

//let query = await arg('Search for a book title:')

//let response = await get(`http://openlibrary.org/search.json?q=${query}`)

//let transform = ({title, author_name}) =>
  //`* "${title}" - ${author_name?.length && author_name[0]}`

//let markdown = response.data.docs.map(transform).join('\n')

//inspect(markdown, 'md') 

function getBooks(){
  document.getElementById('output').innerHTML="";
  fetch("http://openlibrary.org/search.json?q="+document.getElementById("input").value)
  .then(a=>a.json())
  .then(response => {
    for(var i=0; i<5;i++){
      document.getElementById("output").innerHTML+="</h2>"+response.docs[i].author_name[0]+"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>";
    }
  });
}