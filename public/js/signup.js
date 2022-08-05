document.querySelector("#signup-page").addEventListener("submit",e=>{
    e.preventDefault();
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