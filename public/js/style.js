// const source = document.querySelector(".goLogin").innerHTML;
// const template = Handlebars.compile(source);
// document.body.innerHTML = template()
import express, { application } from "express"
import path from "path"
import exphbs from "express-handlebars"

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static("images"));



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


