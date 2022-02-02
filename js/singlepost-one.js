const id = location.search.split('=')[1]
window.onload = function (){
    displayPost()
}
// Displaying post
async function displayPost(){
let article = document.getElementById("article")
let fetchData = {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json; charset=UTF-8'
    }
}
await fetch(`https://my-capstone-project-api.herokuapp.com/posts/${id}`, fetchData)
.then( (response) => {
    return response.json()
})
.then( (data) => {
    const post = data.data.post
    let html = `
        <h6 class="reference"><a href="./blog.html">Blog/</a><span class="inner">Post One</span></h6>
        <h1 class="article-one-header">${post.title}</h1>
        <h2>${post.subTitle}</h2>
        <img src="${post.imageUrl}" alt="">
        <hr>
        <p class="article-one-p">
            ${post.postBody}
        </p>`;
    article.innerHTML += html
    }). catch( error => {
        console.error(error)
    })
}
let commentSection = document.getElementById("comments_section")
    let comment = `
        <form class="comment" id="comments" name="comments">
            <label for="comments"><b>Leave your comments below !</b></label>
            <textarea name="comments" id="comment_text" cols="100" rows="10"></textarea>
            <button type="submit">Comment</button>
        </form>
        <h2>Latest Comments</h2>`;
    commentSection.innerHTML += comment

async function displayComment() {
    console.log(id)
    let commentSection = document.getElementById("comments_section");
    let fetchData = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
    await fetch(`https://my-capstone-project-api.herokuapp.com/comments/`, fetchData)
    .then( (response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data.data.comments)
        const comments = data.data.comments
        comments.map(comment => {

        let commentsContent = `
        <p class="commentClass">${comment.message}</p>
        <h5 class="time-stamp">${comment.dateCreated}&nbsp;&nbsp;&nbsp;<span class="commantetor">By ${comment.commentator}</span></h5>`;
        commentSection.innerHTML += commentsContent
        })
    })
    .catch((error) => {
        console.log(error)
    })
}
displayComment()
let add = document.getElementById("comments")
async function addComment() {
    console.log(id)
    let commentText = document.getElementById("comment_text").value;
    let data = {
    message: commentText,
    commentator: 'user',
    postId: id
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
    await fetch(`https://my-capstone-project-api.herokuapp.com/comments/`, fetchData)
    .then( (response) => {
        return response.json()
    })
    .then((data) => {
        Toastify({
            text: "Comment Added",
            className: "info",
            style: {
                background: "linear-gradient(to left, #00b09b, #96c93d)",
            }
        }).showToast();

        form.reset();
    })
    .catch((error) => {
        console.log(error)
    })
}
add.addEventListener('submit', (e)=> {
    e.preventDefault()
    addComment()
})