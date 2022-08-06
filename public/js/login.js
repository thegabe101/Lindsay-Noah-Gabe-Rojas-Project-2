//login form query selector

document.querySelector("#login-page").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        email: document.querySelector("#login-email").value,
        password: document.querySelector("#login-password").value,
    }
    //may need to add users to route 
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
          location.href = "/"
        } else {
            alert("You have entered an invalid email or password.")
        }
    })
})

