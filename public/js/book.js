const axios = require('axios').default;

//GMS how to grab this button from the template literal...
document.querySelector("#addCatBook").addEventListener("submit", e => {
    e.preventDefault();
    console.log("seeking book obj")
    const bookObj = {
        //GMS the big question is how to fill this object. It needs to be filled currently with values from template literals but not sure how to do that.
    }
    console.log(catObj)

    function getUserAccount() {
        return axios.get('/api/users');
    }

    function getUserCatalogs() {
        return axios.get('/api/catalogs');
    }

    Promise.all([getUserAccount(), getUserCatalogs()])
        .then(function (results) {
            const acct = results[0];
            const cats = results[0];
        });

    //GMS fetch backend route that will post to catalog backed books
    fetch("/api/books", {
        method: "POST",
        body: JSON.stringify(bookObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.replace('/singleBooklist');
        } else {
            alert("FAILURE");
        }
    })
});