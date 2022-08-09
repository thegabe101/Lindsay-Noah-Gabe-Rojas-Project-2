//GMS working on signup logic.
//GMS we just need to grab the form field and fill in the values. we will redirect to home after they are signed up- essentially like they just logged in.

//GMS grabbing entire form. need prevent default here to avoid refresh. WTH JavaScript? 
document.querySelector("#signup-page").addEventListener("submit", e => {
    e.preventDefault();
    const signupObj = {
        //GMS query selectors for the form field on signup page
        email: document.querySelector("#login-email-signup").value,
        username: document.querySelector("#login-username-signup").value,
        password: document.querySelector("#login-password-signup").value,
    }
    fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(signupObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log('hello')
        if (res.ok) {
            location.href = "/home"
        } else {
            alert("You are not logged in!")
        }
    })
});