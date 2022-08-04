const delBtn = document.querySelectorAll('.delete-btn')

delBtn.forEach(button=> {
    button.addEventListener("click", e=>{
        const delId = e.target.getAttribute("data-id");
        fetch ('/api/')
    })
});