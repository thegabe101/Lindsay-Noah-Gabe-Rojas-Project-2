document.querySelector("#catName").addEventListener("submit", e => {
    e.preventDefault();
    const catObj = {
        name: document.querySelector("#catName").value,
        genre_type: document.querySelector("#genre_type").value,
    }
    console.log(catObj)
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