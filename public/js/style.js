const express = require('express').Router();


// navbar action
const navBar = () => {
    let x = document.getElementsByClassName("navLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
};

document.querySelector(".goLogin").addEventListener("click",e=>{
    location.href = "/login"
})
