// const localStorageKey = "myData";
// document.getElementById("user_input").value = getDataFromLocalStorage();
// document.getElementById('display').innerHTML = getDataFromLocalStorage();

// function showInput() {
//   var user_input = document.getElementById("user_input").value;
//   setDataToLocalStorage(user_input);
//   document.getElementById('display').innerHTML = user_input;
// }

// function setDataToLocalStorage(newData){
//    localStorage.setItem(localStorageKey, newData);
// }

// function getDataFromLocalStorage(){
//   return localStorage.getItem(localStorageKey) || "";
// }
var post= document.getElementById("post");
post.addEventListener("click", function(){
    var commentBoxValue= document.getElementById("comment-box").value;
 
    var li = document.createElement("li");
    var text = document.createTextNode(commentBoxValue);
    li.appendChild(text);
    document.getElementById("unordered").appendChild(li);
    console.log('helloooo');
});

// let commentBox = document.querySelector("#comment-box")

// commentBox.value = localStorage.getItem("commentBox")

// let cancel
// commentBox.addEventListener("keyup", event => {
//   if (cancel) clearTimeout(cancel)
//   cancel = setTimeout(() => {
//     localStorage.setItem("commentBox", event.target.value)
//   }, 1000)
// })

