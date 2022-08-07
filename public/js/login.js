//GMS login form query selector

//GMS grab our login page form, add an event listener for its submit, and prevent default
document.querySelector("#login-page").addEventListener("submit", e => {
    e.preventDefault();
    //GMS click check
    console.log("i haveth beeneth clickethed");
    //GMS our userObj contains two values: the email and the password entered on the login page. grabs by id then checks value of field
    const userObj = {
        email: document.querySelector("#login-email").value,
        password: document.querySelector("#login-password").value,
    }
    //GMS may need to add users to route
    //GMS takes body object and stringifies it to post it as backend checks if its a successful login 
    fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            //GMS redirect to home once we are logged in, or ding an alert that something didnt check out
            console.log("clicked");
            location.href = "/home"
        } else {
            alert("You have entered an invalid email or password.")
        }
    })
});


//GMS this is just a simple function that connects to our login handlebars. connects to the checkbox i added- when checked will change the field grabbed by id to password(hidden) or text(shown) value.
function showPw() {
    var x = document.getElementById("login-password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

