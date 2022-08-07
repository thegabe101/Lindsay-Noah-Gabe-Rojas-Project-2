// document.querySelector("#catalogs-button").addEventListener("submit", e => {
//     e.preventDefault();
//     console.log("i haveth beeneth clickethed");
//     const catObj = {
//         email: document.querySelector("#login-email").value,
//         password: document.querySelector("#login-password").value,
//     }
//     //may need to add users to route
//     fetch("/api/users/catalogs", {
//         method: "GET",
//         body: JSON.stringify(catObj),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }).then(res => {
//         if (res.ok) {
//             console.log("clicked");
//             location.href = "/catalogs"
//         } else {
//             alert("Something went wrong.")
//         }
//     })
// })