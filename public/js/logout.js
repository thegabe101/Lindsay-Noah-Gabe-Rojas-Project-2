// async function logout() {
//     const response = await fetch('/api/users/logout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//     });

//     if (response.ok) {
//         document.location.replace('/login');
//     } else {
//         alert(response.statusText);
//     }
// }

// document.querySelector('#logout-button').addEventListener('click', logout);



//GMS this will be our perpetual modal logout button shown by lindsays if/else on handlebars. this one needs to be a click, not a submit
//GMS SHOULD NOT SHOW IF LOGGED OUT!!!
if(document.querySelector("#logout-button")){


document.querySelector("#logout-button").addEventListener("click", e => {
    e.preventDefault();
    //GMSretrieve back destroy route
    fetch("/api/users/logout",
        {
            //GMS logout is, in fact, a post...
            method: "POST",
        }).then(res => {
            console.log("clicked");
            if (res.ok) {
                //GMS redirect to login upon successful post 
                location.href = "/login"
            } else {
                alert("Unsuccesful response.")
            }
        });
})
}