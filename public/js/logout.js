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


document.querySelector("#logout-button").addEventListener("click", e => {
    e.preventDefault();
    fetch("/api/users/logout",
        {
            method: "POST",
        }).then(res => {
            console.log("clicked");
            if (res.ok) {
                location.href = "/login"
            } else {
                alert("Unsuccesful response.")
            }
        });
});