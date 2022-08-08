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
    }).then(res => {
        if (res.ok) {
            location.reload()
        } else {
            alert("no response")
        }
    })
})

// document.body.onload = addElement;

// const addElement = () => {
//     const newLi = document.createElement("li");
//     newLi.appendChild(catObj);
//     const currentLi = document.querySelector(".wishList");
//     document.body.insertBefore(newLi, currentLi)
// };