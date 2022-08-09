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


//GMS test non final API search. rendering books in combo with test html but have not gone to printing to cats yet
// function searchBook(name) {
//   const searchQuery = document.querySelector('#search-book').value;
//   var startTime = performance.now();
//   console.log("Started Searching");
//   axios
//     .get(`http://openlibrary.org/search.json?title=${searchQuery}&limit=10`)
//     .then((response) => {
//       console.log(response.data);
//       var endTime = performance.now();
//       console.log(`Took ${endTime - startTime} milliseconds`);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

function getBooks() {
  //GMS we check to see whether the user is going to search by checkbox value author or book by declaring a variable that constitutes the auth id beginning fulfilled
  var getAuthor = document.getElementById('author').checked
  //GMS start inner html as empty string- will write over it later
  document.getElementById('output').innerHTML = "";
  //GMS our query url searches openlibrary by json and the following q which will be the text value of the bookGrab input field
  fetch("http://openlibrary.org/search.json?q=" + document.getElementById("bookGrab").value)
    //GMS parameter can be set as a and will be converted to JSON
    .then(a => a.json())
    .then(response => {
      console.log(response);
      let userInput = document.getElementById("bookGrab").value.toLowerCase()
      let bookAmount = 0
      //GMS run a loop to print at least three books but probably no more than that. otherwise we are getting too many. IF there are books returned, then we get the author from the response body and check for lower casing in case thats an issue 
      for (var i = 0; i < response.docs.length; i++) {
        if (bookAmount < 3) {
          try {
            //all of this only happens if the getAuthor was fulfilled; otherwise we can ignore that check and search by title, which we do in our else statment 
            if (getAuthor) {
              let lowerCaseAuthor = response.docs[i].author_name.map(author => author.toLowerCase())
              if (lowerCaseAuthor.indexOf(userInput) != -1) {
                //document.getElementById("output").innerHTML+="</h2>"+response.docs[i].author_name[0]+"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>";
                document.getElementById("output").innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
                bookAmount++
              }
            } else {
              let lowerCaseTitle = response.docs[i].title.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
              console.log(lowerCaseTitle)
              if (lowerCaseTitle.includes(userInput)) {
                document.getElementById("output").innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
                bookAmount++
              }
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          break
        };
      };
    });
};

// document.querySelector("#bookGrab").addEventListener("submit", e => {
//   e.preventDefault();
//   console.log("CLICKY CLICKY");
//   getBooks();
// });

// Button to post comment
var post= document.getElementById("post");
post.addEventListener("click", function(){
    var commentBoxValue= document.getElementById("comment-box").value;
 
    var li = document.createElement("li");
    var text = document.createTextNode(commentBoxValue);
    li.appendChild(text);
    document.getElementById("unordered").appendChild(li);
    console.log('helloooo');
});

// let commentBox = document.querySelector("#comment-box")

// commentBox.value = localStorage.getItem("commentBox")

// let cancel
// commentBox.addEventListener("keyup", event => {
//   if (cancel) clearTimeout(cancel)
//   cancel = setTimeout(() => {
//     localStorage.setItem("commentBox", event.target.value)
//   }, 1000)
// })

// module.exports = getBooks();
//GMS moving onto new API search method

// module.exports = searchBook();