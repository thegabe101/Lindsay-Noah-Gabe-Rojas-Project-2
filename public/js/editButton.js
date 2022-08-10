const { Router } = require("express");
const Catalog = require("../../models")

//async function editCat() {
    //let newCat = await fetch('/api/catalogs/:id', {
       // method: 'EDIT',
       // body: JSON.stringify({
           /// include: {
               // model: Catalog,
           // },
            //where: {
            //    id: id,
           // },
        //})
    //})
//}
async function updateCato (model, where, newItem) {
    // First try to find the record
   const foundItem = await Catalog.findOne({where});
   if (!foundItem) {
        // Item not found, create a new one
        const item = await Catalog.create(newItem)
        return  {item, created: true};
    }
    // Found an item, update it
    const item = await Catalog.update(newItem, {where});
    return {item, created: false};
}