//login form query selector

document.querySelector("#login-page").addEventListener("submit",e=>{
    e.preventDefault();
    console.log("i've been clicked");
    const userObj = {
        email: document.querySelector("#login-email").value,
        password: document.querySelector("#login-password").value,
    }
    //may need to add users to route 
    fetch("/api/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
          location.href = ""
        } else {
            alert("You are not logged in!")
        }
    })
})

document.querySelector("#signup-page").addEventListener("submit",e=>{
    e.preventDefault();
    console.log("i've been clicked");
    const signupObj = {
        email: document.querySelector("#login-email-signup").value,
        username: document.querySelector("#login-username-signup").value,
        password: document.querySelector("#login-password-signup").value,
    }
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(signupObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
          location.href = "/users"
        } else {
            alert("You are not logged in!")
        }
    })
});