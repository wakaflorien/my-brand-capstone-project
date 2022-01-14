const commentForm = document.getElementById("comments")
const commentText = document.getElementById("comment_text");
const commentMsg = document.getElementById("comment_msg");


commentForm.addEventListener('submit', e => {
    e.preventDefault();

    console.log("commenting");

    if(commentText.value ==""){
        commentMsg.innerHTML = "Add some comments please!";
        commentMsg.style.color = "#FF0000";
        commentText.style.borderColor = "#FF0000";
    }
    else{
        commentMsg.innerHTML = "";
        commentText.style.borderColor = "#0FA958";
    }
})
