//GMS I know we haven't added a delete button yet. will finish this one later and comment out for now

// const delBtn = document.querySelectorAll('.delete-btn')

// delBtn.forEach(button=> {
//     button.addEventListener("click", e=>{
//         const delId = e.target.getAttribute("data-id");
//         fetch ('/api/')
//     })
// });

// async function trashCat() {

//     console.log("clickity clackity");

// const id = window.location.toString().split('/')[
//     window.location.toString().split('/').length - 1
// ];

//     const deadCat = await fetch('/api/catalogs/:id', {
//         method: 'DELETE',
//         body: JSON.stringify({
//             include: {
//                 model: Catalog,
//             },
//             where: {
//                 id: id,
//             },
//         };
//     )
//     if (deadCat.ok) {
//         document.location.replace('/catalogs');
//     } else {
//         alert(deadCat.statusText);
//     }
// }

async function trashCat(id) {
    console.log("clickity clackity");

    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    // ];

    const deadCat = await fetch(`/api/catalogs/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            where: {
                id: id,
            }
        })
    });
    if (deadCat.ok) {
        document.location.replace('/catalogs');
    } else {
        alert(deadCat.statusText);
    }
}

// document.querySelector("#trashCat").addEventListener("click", e => {
//     e.preventDefault();
//     console.log("been clickethed")
//     fetch("/api/catalogs/:id", ({
//         include: {
//             model: Catalog,
//         },
//         where: {
//             id: id,
//         }
//     })
//     );
// }).then(res => {
//     if (res.ok) {
//         location.reload();
//     } else {
//         alert("FAILURE");
//     }
// });