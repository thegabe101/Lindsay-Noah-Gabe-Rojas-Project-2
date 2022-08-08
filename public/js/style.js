// const source = document.querySelector(".goLogin").innerHTML;
// const template = Handlebars.compile(source);
// document.body.innerHTML = template()

// navbar action
const navBar = () => {
    let x = document.querySelector(".navLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
};

// book list default image if no cover image is pulled
const img = document.querySelector(".coverImg")
img.addEventListener("error", function(event) {
    event.target.src = "../assets/images/cover-default.jpg"
    event.onerror = null
});

// liking a book

// upload avatar
// const uploadImage = () => {
//     const data = new profileData 
// }
