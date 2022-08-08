//GMS this will be our field selector for the add categories on lindsays front end. for now we will assume they are only declaring a name of cat and genre type
document.querySelector("#catName").addEventListener("submit", e => {
    e.preventDefault();
    console.log("been clickethed")
    const catObj = {
        name: document.querySelector("#name-input").value,
        genre_type: document.querySelector("#genre_type-input").value,
    }
    console.log(catObj)
    //GMS fetch backend route that will post to user object possessed catalogs
    fetch("/api/catalogs", {
        method: "POST",
        body: JSON.stringify(catObj),
        headers: {
            "Content-Type": "application/json"
        }
        // }).then(res => {
        //     if (res.ok) {
        //         location.reload()
        //         const newCatalog = document.createElement("li");
        //         newCatalog.appendChild(catObj);
        //         const fullLibrary = document.getElementById("newCatalogEntered");
        //         document.body.insertBefore(newCatalog, fullLibrary);
        //     } else {
        //         alert("no response")
        //     }
    }).then(res => {
        if (res.ok) {
            location.reload();
        } else {
            alert("FAILURE");
        }
    })
});


//GMS testing some appension
// document.querySelector("#catsCats").addEventListener("submit", e => {
//     e.preventDefault();
//     let newLibraryCat = document.createElement('p');
//     const fullLibrary = document.getElementById("newCatalogEntered");
//     newLibraryCat.innerHTML = "Can we append here";
//     document.body.appendChild(newLibraryCat, fullLibrary);
// });

