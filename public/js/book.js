// const { User } = require('../../models');

// const axios = require('axios').default;

//GMS how to grab this button from the template literal...
const pleaseId = window.location.toString().split('/')
const id = pleaseId[4];


fetch(`/api/catalogs/${id}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then(res => {
    if (res.ok) {
        console.log("nothing for now");
        res.json().then(response => {
            console.log(response);
        });
    } else {
        alert("FAILURE");
    }
});

// document.querySelector("#addCatBook").addEventListener("submit", e => {
//     e.preventDefault();
//     console.log("seeking book obj")
//     const bookObj = {
//         //GMS the big question is how to fill this object. It needs to be filled currently with values from template literals but not sure how to do that.
//         title: response.docs[i].title,
//         author: response.docs[i].author_name[0],
//         isbn_num: response.docs[i].isbn[0],
//         catalog_id: id,
//     }
//     console.log(bookObj)

//     // function getUserAccount() {
//     //     return axios.get('/api/users');
//     // }

//     // function getUserCatalogs() {
//     //     return axios.get('/api/catalogs');
//     // }

//     // Promise.all([getUserAccount(), getUserCatalogs()])
//     //     .then(function (results) {
//     //         const acct = results[0];
//     //         const cats = results[0];
//     //     });

//     //GMS fetch backend route that will post to catalog backed books
//     fetch("/api/books", {
//         method: "POST",
//         body: JSON.stringify(bookObj),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }).then(res => {
//         if (res.ok) {
//             location.replace('/singleBooklist');
//         } else {
//             alert("FAILURE");
//         }
//     })
// });