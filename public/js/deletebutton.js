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

//     // const id = window.location.toString().split('/')[
//     //     window.location.toString().split('/').length - 1
//     // ];

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

const { Catalog } = require("../../models")

async function trashCat() {
    console.log("clickity clackity");

    const deadCat = await fetch('/api/catalogs/:id', {
        method: 'DELETE',
        body: JSON.stringify({
            include: {
                model: Catalog,
            },
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