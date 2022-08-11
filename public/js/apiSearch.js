//GMS grab our form and define our output div that will render as a template literal upon book query

let searchBooksEl = document.querySelector('#exploreBooks');
const output0 = document.getElementById('output0');
const output1 = document.getElementById('output1');
const output2 = document.getElementById('output2');
// const bookImg = document.getElementById('imgReturn');

// function getParams() {
//   let searchParams = document.location.search.split('&');
//   //GMS to try to return the last element from our array of search perams, popping whatever the query is post =
//   let query = searchParams[0].split('=').pop();

//   //GMS format our query link if it is incomplete
//   // let format = searchParams[1].split('=').pop();

//   //GMS will accept two values- the query from the users search params and the first formatted value returned 
//   //GMS simplyifying- just call searchBooks, which is our fetch function
//   searchBooks(query);
// };


//<img src= '"http://covers.openlibrary.org/b/isbn/" + ${userFacingResponse.docs[i].isbn} + "-M.jpg"'></img>

// function printBooks(resultObj) {
//   console.log(resultObj);
//   console.log('print function triggered');
//   //GMS lets set a store card for our result content. This can be styled by tailwinds
//   let bookCard = document.createElement('div');
//   //GMS this is how we add styles to the appeneded card
//   //TODO: UNCOMMENT NEXT LINE LATER!
//   //bookCard.classList.add('')
//   output.appendChild(bookCard)
//   let bookCardBody = document.createElement('div');
//   //GMS to add styles to the card body
//   //TODO: UNCOMMENT NEXT LINE LATER!
//   //bookCardBody.classList.add('card-body');
//   //GMS append the body of the card to the card
//   bookCard.appendChild(bookCardBody);

//   //GMS now we need to start constructing these elements from the API's return. 
//   //GMS first will be title of the book

//   let titleEl = document.createElement('h3');
//   titleEl.textContent = resultObj.title;
//   bookCardBody.appendChild(titleEl)
//   let authorContentEl = document.createElement('h4');
//   authorContentEl.innerHTML = '<strong>Author: </strong> ' + resultObj.author; + '<br/>';

//   let isbnNumEl = document.createElement('p');
//   isbnNumEl.innerHTML = '<strong>ISBN: </strong> ' + resultObj.isbn; + '<br/>';

//   let bookButtonEl = document.createElement('button');
//   bookButtonEl.textContent = 'Add Book to Collection';
//   // bookButtonEl.setAttribute('href', resultObj.url);
//   // bookButtonEl.classList.add('btn', 'btn-dark');

//   //bookCardBody.append(titleEl, authorContentEl, isbnNumEl, bookButtonEl);

//   //bookContentEl.append(bookCard);
// }

//GMS for now will accept an argument but I don't think we will be using it
function searchBooks(query) {
  //GMS define openlibrary query url 
  let apiQueryUrl = "http://openlibrary.org/search.json?q=";

  // if (format) {
  //   apiQueryUrl = 'http://openlibrary.org/' + format + 'search.json?q=';
  // }

  //apiQueryUrl = query;

  //GMS fetch function routes to our URL + query value of the input in the bookGrab field 
  fetch(apiQueryUrl + document.getElementById("bookGrab").value)
    .then((res) => res.json())
    .then((userFacingResponse) => {
      console.log(userFacingResponse)
      //resultsTextEl.textContent = userFacingResponse.search.query;

      console.log(userFacingResponse);
      //GMS if the array length is <0, notify the user the book isn't found. 
      if (!userFacingResponse.docs.length) {
        console.log('No results found.');
        return;
        //resultsTextEl.innerHTML = '<h3>No results found in our database.</h3>';
      }
      //resultsTextEl.textContent = '';
      //GMS just gonna log our output field to make sure that it is existing as an open section
      console.log(output0)
      console.log(output1)
      console.log(output2)

      //GMS realizing the for loop isn't going to render into a template literal this way. 
      //GMS will have to figure this out tomorrow 
      let booksShown = 0;

      for (var i = 0; i < userFacingResponse.docs.length; i++) {
        if (booksShown < 3) {
          //printBooks(userFacingResponse.docs[i]);
          output0.innerHTML = `
        <div class="justify-center">
          <br>
          <button id="stupidButton${i}" class="bg-[#ff4797] px-2 py-1 border rounded-md text-white hover:bg-white hover:text-black hover:border-[#ff4797] hover:border-2">&#10133 to Catalog</button>
          <br>
          <h1 margin-top: 300px><br><strong>Title:</strong> ${userFacingResponse.docs[0].title}</h1>
          <br>
          <h2 margin-top: 300px><strong>Author:</strong> ${userFacingResponse.docs[0].author_name[0]}</h2>
          <br>
          <p margin-top: 300px><strong>ISBN Number:</strong> ${userFacingResponse.docs[0].isbn[0]}</p>
          <br>
          </div>
          <br>
          <br>
          <img src='http://covers.openlibrary.org/b/isbn/${userFacingResponse.docs[0].isbn[0]}-M.jpg' style="box-shadow: 10px 10px 10px black; height: 300px; width: 200px; margin-left: 10px; margin-top: 300px;"><br>
        `
          booksShown++
        }
        let stupidButtonCaller = document.getElementById("stupidButton" + i)
        stupidButtonCaller.addEventListener('click', addToCat(response.docs[i]));
      }

    }).catch(function (err) {
      if (err) {
        console.log(JSON.stringify(err));
      }
    });
};




function addToCat(userFacingResponse) {
  console.log("match to isbn")


  const pleaseId = window.location.toString().split('/')
  const id = pleaseId[4];

  const bookObj = {
    //GMS the big question is how to fill this object. It needs to be filled currently with values from template literals but not sure how to do that.
    title: userFacingResponse.title,
    author: userFacingResponse.author_name[0],
    isbn_num: userFacingResponse.isbn[0],
    catalog_id: id,
  }
  console.log(bookObj);
  fetch(`/api/books/${id}`, {
    method: "POST",
    body: JSON.stringify(bookObj),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      console.log('its working!!!')
    } else {
      alert("FAILURE");
    }
  })
};

// function takeBookForm(e) {
//   e.preventDefault();

//   let bookGrabVal = document.querySelector('#bookGrab').value;

//   if (!bookGrabVal) {
//     console.error('No book title entered.');
//     return;
//   }

//   searchBooks(bookGrabVal);
// };

// searchBooksEl.addEventListener('click', function (e) {
//   e.preventDefault();

//   let bookGrabVal = document.querySelector('#bookGrab').value;

//   if (!bookGrabVal) {
//     console.error('No book title entered.');
//     return;
//   }

//   searchBooks(bookGrabVal);
// });


// console.log(window.location.toString().split('/'))






// function addToCat(isbn) {
//   console.log("match to isbn")
//   isbn = response.docs[i].isbn[0]
//   const bookObj = {
//     //GMS the big question is how to fill this object. It needs to be filled currently with values from template literals but not sure how to do that.
//     title: response.docs[i].title,
//     author: response.docs[i].author_name[0],
//     isbn_num: response.docs[i].isbn[0],
//   }
//   console.log(bookObj);
//   fetch("/api/catalogs", {
//     method: "POST",
//     body: JSON.stringify(bookObj),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   }).then(res => {
//     if (res.ok) {
//       location.replace('/singleBooklist');
//     } else {
//       alert("FAILURE");
//     }
//   })
// };


// function searchBooks() {
//   var getAuthor = document.getElementById('author').checked
//   document.getElementById('output').innerHTML = "";
//   fetch("http://openlibrary.org/search.json?q=" + document.getElementById("bookGrab").value)
//     .then(a => a.json())
//     .then(response => {
//       console.log(response);
//       let userInput = document.getElementById("bookGrab").value.toLowerCase()
//       let bookAmount = 0
//       for (var i = 0; i < response.docs.length; i++) {
//         if (bookAmount < 3) {
//           try {
//             if (getAuthor) {
//               let lowerCaseAuthor = response.docs[i].author_name.map(author => author.toLowerCase())
//               if (lowerCaseAuthor.indexOf(userInput) != -1) {
//                 //document.getElementById("output").innerHTML+="</h2>"+response.docs[i].author_name[0]+"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>";
//                 //GMS add to catalog button should display for each book rendered 
//                 document.getElementById("output").innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>" + `<button onClick='(${addToCat(response.docs[i].isbn)})'>&#10133 to Catalog</button>`;
//                 bookAmount++
//               }
//             } else {
//               let lowerCaseTitle = response.docs[i].title.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
//               console.log(lowerCaseTitle)
//               if (lowerCaseTitle.includes(userInput)) {
//                 //GMS add to catalog button should display for each book rendered 
//                 document.getElementById("output").innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>" + `<button onClick='(${addToCat(response.docs[i].isbn)}'>&#10133 to Catalog</button>`;
//                 bookAmount++
//               }
//             }
//           } catch (err) {
//             console.log(err);
//           }
//         } else {
//           break
//         }
//       }
//     })
// }



//this is the working model
// function searchBooks() {
//   var getAuthor = document.getElementById('author').checked
//   document.getElementById('output0').innerHTML = "";
//   document.getElementById('output1').innerHTML = "";
//   document.getElementById('output2').innerHTML = "";
//   fetch("http://openlibrary.org/search.json?q=" + document.getElementById("bookGrab").value)
//     .then(a => a.json())
//     .then(response => {
//       console.log(response);
//       let userInput = document.getElementById("bookGrab").value.toLowerCase()
//       let bookAmount = 0;
//       for (var i = 0; i < 3; i++) {
//         if (bookAmount < 3) {
//           try {
//             if (getAuthor) {
//               let lowerCaseAuthor = response.docs[i].author_name.map(author => author.toLowerCase())
//               if (lowerCaseAuthor.indexOf(userInput)) {
//                 //document.getElementById("output").innerHTML+="</h2>"+response.docs[i].author_name[0]+"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>";
//                 //GMS add to catalog button should display for each book rendered 
//                 document.getElementById("output" + i).innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>" + `<button id="stupidButton${i}">&#10133 to Catalog</button>`;
//                 bookAmount++
//               }
//             } else {
//               let lowerCaseTitle = response.docs[i].title.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
//               console.log(lowerCaseTitle)
//               if (lowerCaseTitle.includes(userInput)) {
//                 //GMS add to catalog button should display for each book rendered 
//                 document.getElementById("output" + i).innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>" + `<button id="stupidButton${i}">&#10133 to Catalog</button>`;
//                 bookAmount++
//               }
//             }
//             let stupidButtonCaller = document.getElementById("stupidButton" + i)
//             stupidButtonCaller.addEventListener('click', addToCat(response.docs[i]));
//           } catch (err) {
//             console.log(err);
//           }
//         } else {
//           break
//         }
//       }
//     })
// };


// function addToCat(response) {
//   console.log("match to isbn")


//   const pleaseId = window.location.toString().split('/')
//   const id = pleaseId[4];

//   const bookObj = {
//     //GMS the big question is how to fill this object. It needs to be filled currently with values from template literals but not sure how to do that.
//     title: response.title,
//     author: response.author_name[0],
//     isbn_num: response.isbn[0],
//     catalog_id: id,
//   }
//   console.log(bookObj);
//   fetch(`/api/books/${id}`, {
//     method: "POST",
//     body: JSON.stringify(bookObj),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   }).then(res => {
//     if (res.ok) {
//       console.log('its working!!!')
//     } else {
//       alert("FAILURE");
//     }
//   })
// };

//GMS CLICK CATALOG AND URL AT TOP CHANGES TO CATALOG/:ID
//WHEN USER CLICKS ADD IT WILL ADD TO THAT CATALOG that has been selected


function takeBookForm(e) {
  e.preventDefault();

  let bookGrabVal = document.querySelector('#bookGrab').value;

  if (!bookGrabVal) {
    console.error('No book title entered.');
    return;
  }

  searchBooks(bookGrabVal);
};

searchBooksEl.addEventListener('click', function (e) {
  e.preventDefault();

  let bookGrabVal = document.querySelector('#bookGrab').value;

  if (!bookGrabVal) {
    console.error('No book title entered.');
    return;
  }

  searchBooks(bookGrabVal);
});


console.log(window.location.toString().split('/'))





//getParams();



























































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

//GMS please ignore my tinkering with the search function here

// function getBooks(resultObj) {
//   console.log("GETTING BOOKS!!!!!!!!!!!!");
//   //GMS we check to see whether the user is going to search by checkbox value author or book by declaring a variable that constitutes the auth id beginning fulfilled
//   var getAuthor = document.getElementById('author').checked;
//   //GMS start inner html as empty string- will write over it later
//   document.getElementById('output').innerHTML = "";
//   //GMS our query url searches openlibrary by json and the following q which will be the text value of the bookGrab input field
//   fetch("http://openlibrary.org/search.json?q=" + document.getElementById("bookGrab").value)
//     //GMS parameter can be set as a and will be converted to JSON
//     .then(a => a.json())
//     .then(response => {
//       console.log(response);
//       let userInput = document.getElementById("bookGrab").value.toLowerCase()
//       let bookAmount = 0
//       //GMS run a loop to print at least three books but probably no more than that. otherwise we are getting too many. IF there are books returned, then we get the author from the response body and check for lower casing in case thats an issue
//       for (var i = 0; i < response.docs.length; i++) {
//         if (bookAmount < 3) {
//           try {
//             //all of this only happens if the getAuthor was fulfilled; otherwise we can ignore that check and search by title, which we do in our else statment
//             if (getAuthor) {
//               let authorBookCard = document.createElement('div');
//               let authorBookCardBody = document.createElement('div');
//               authorBookCardBody.classList.add('card-body');
//               authorBookCard.append(authorBookCardBody);
//               let lowerCaseAuthor = response.docs[i].author_name.map(author => author.toLowerCase())
//               if (lowerCaseAuthor.indexOf(userInput) != -1) {
//                 //document.getElementById("output").innerHTML+="</h2>"+response.docs[i].author_name[0]+"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>";
//                 //GMS initial button attempt IGNORE pls dont delete
//                 // const addButt = document.createElement("button");
//                 // addButt.innerHTML = "+ Book to Catalog";
//                 document.getElementById("output").innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
//                 let titleEl = document.createElement('h3');
//                 titleEl.textContent = response.docs[i].title;
//                 var bodyContentEl = document.createElement('p');
//                 bodyContentEl.innerHTML += '<h3>' + '<strong>Author name:</strong> ' + response.docs[i].author.name[0] + '<strong>ISBN Number:</strong> ' + response.docs[i].isbn[0] + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + '<br/>';
//                 bookAmount++
//                 var linkButtonEl = document.createElement('a');
//                 linkButtonEl.textContent = 'Read More';
//                 linkButtonEl.setAttribute('href', resultObj.url);
//                 linkButtonEl.classList.add('btn', 'btn-dark');

//                 authorBookCardBody.append(titleEl, bodyContentEl, linkButtonEl);

//                 resultContentEl.append(authorBookCard);
//               }
//             } else {
//               let titleBookCard = document.createElement('div');
//               let titleBookCardBody = document.createElement('div');
//               titleBookCardBody.classList.add('card-body');
//               titleBookCard.append(titleBookCardBody);
//               let lowerCaseTitle = response.docs[i].title.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
//               console.log(lowerCaseTitle)
//               if (lowerCaseTitle.includes(userInput)) {
//                 //GMS initial button attempt IGNORE pls dont delete
//                 // const addButt = document.createElement("button");
//                 // addButt.innerHTML = "+ Book to Catalog";
//                 document.getElementById("output").innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
//                 let titleEl = document.createElement('h3');
//                 titleEl.textContent = response.docs[i].title;
//                 let bodyContentEl = document.createElement('p');
//                 bodyContentEl.innerHTML += '<h3>' + '<strong>Author name:</strong> ' + response.docs[i].author.name[0] + '<strong>ISBN Number:</strong> ' + response.docs[i].isbn[0] + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + '<br/>';
//                 bookAmount++
//                 var linkButtonEl = document.createElement('a');
//                 linkButtonEl.textContent = 'Read More';
//                 linkButtonEl.setAttribute('href', resultObj.url);
//                 linkButtonEl.classList.add('btn', 'btn-dark');

//                 titleBookCardBody.append(titleEl, bodyContentEl, linkButtonEl);

//                 resultContentEl.append(titleBookCard);
//               }
//             }
//           } catch (err) {
//             console.log(err);
//           }
//         } else {
//           break
//         };
//       };
//     });
// };

// function getBooks() {
//   var getAuthor = document.getElementById('author').checked
//   document.getElementById('output').innerHTML = "";
//   fetch("http://openlibrary.org/search.json?q=" + document.getElementById("bookGrab").value)
//     .then(a => a.json())
//     .then(response => {
//       console.log(response);
//       let userInput = document.getElementById("bookGrab").value.toLowerCase()
//       let bookAmount = 0
//       for (var i = 0; i < response.docs.length; i++) {
//         if (bookAmount < 3) {
//           try {
//             if (getAuthor) {
//               let lowerCaseAuthor = response.docs[i].author_name.map(author => author.toLowerCase())
//               if (lowerCaseAuthor.indexOf(userInput) != -1) {
//                 //document.getElementById("output").innerHTML+="</h2>"+response.docs[i].author_name[0]+"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>";
//                 document.getElementById("output").innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
//                 var resultBody = document.createElement('div');
//                 // resultBody.classList.add('card-body');
//                 bookAmount++
//                 var linkButtonEl = document.createElement('a');
//                 linkButtonEl.textContent = '+ to catalog';
//                 // linkButtonEl.setAttribute('href', resultObj.url);
//                 // linkButtonEl.classList.add('btn', 'btn-dark');

//                 resultBody.append(linkButtonEl);
//               }
//             } else {
//               let lowerCaseTitle = response.docs[i].title.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
//               console.log(lowerCaseTitle)
//               if (lowerCaseTitle.includes(userInput)) {
//                 document.getElementById("output").innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
//                 var resultBody = document.createElement('div');
//                 // resultBody.classList.add('card-body');
//                 bookAmount++
//                 var linkButtonEl = document.createElement('a');
//                 linkButtonEl.textContent = '+ to catalog';
//                 // linkButtonEl.setAttribute('href', resultObj.url);
//                 // linkButtonEl.classList.add('btn', 'btn-dark');

//                 resultBody.append(linkButtonEl);
//               }
//             }
//           } catch (err) {
//             console.log(err);
//           }
//         } else {
//           break
//         }
//       }
//     })
// }

// function getBooks() {
//   //GMS we check to see whether the user is going to search by checkbox value author or book by declaring a variable that constitutes the auth id beginning fulfilled
//   var getAuthor = document.getElementById('author').checked
//   document.getElementById('output').innerHTML = "";
//   fetch("http://openlibrary.org/search.json?q=" + document.getElementById("bookGrab").value)
//     .then(a => a.json())
//     .then(response => {
//       console.log(response);
//       let userInput = document.getElementById("bookGrab").value.toLowerCase()
//       let bookAmount = 0
//       for (var i = 0; i < response.docs.length; i++) {
//         if (bookAmount < 5) {
//           try {
//             if (getAuthor) {
//               let lowerCaseAuthor = response.docs[i].author_name.map(author => author.toLowerCase())
//               if (lowerCaseAuthor.indexOf(userInput) != -1) {
//                 //document.getElementById("output").innerHTML+="</h2>"+response.docs[i].author_name[0]+"<br><img src='http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg'><br>";
//                 document.getElementById("output").innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
//                 bookAmount++
//               }
//             } else {
//               let lowerCaseTitle = response.docs[i].title.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
//               console.log(lowerCaseTitle)
//               if (lowerCaseTitle.includes(userInput)) {
//                 document.getElementById("output").innerHTML += "<h3>" + response.docs[i].author_name[0] + "</h3><h5>" + response.docs[i].title + "</h5><br><img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
//                 bookAmount++
//               }
//             }
//           } catch (err) {
//             console.log(err);
//           }
//         } else {
//           break
//         }
//       }
//     })
// }


//GMS one more stab at this API search in a different methodology






// document.querySelector("#bookGrab").addEventListener("submit", e => {
//   e.preventDefault();
//   console.log("CLICKY CLICKY");
//   getBooks();
// });


// module.exports = getBooks();
//GMS moving onto new API search method

// module.exports = searchBook();