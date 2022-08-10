async function clickCat(id) {
    console.log("clickity cackity");

    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    // ];

    const livingCat = await fetch(`/api/catalogs/${id}`, {
        method: 'GET',
        where: {
            id: id,
        }
    });
    if (livingCat.ok) {
        window.location.replace(`/catalogs/${id}`);
    } else {
        alert(livingCat.statusText);
    }
}