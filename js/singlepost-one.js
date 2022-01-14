window.onload = function () {
    const id = location.search.split('=')[1];

    console.log(id)
    
    displayPost(id)

    // Displaying post
    function displayPost(id){
        db.ref("Blogs/").get().then((snapshot) => {

            let articles = snapshot.val()
            let article = document.getElementById("article")
            // console.log(articles)
            Object.values(articles).find((obj) => {
                if (obj.postId == id) {
                    let html = `
                                <h6 class="reference"><a href="./blog.html">Blog/</a><span class="inner">Post One</span></h6>
                                <h2 class="article-one-header">${obj.published}</h2>
                                <h1>${obj.post_title}</h1>
                                <img src="${obj.photoURL}" alt="">
                                <hr>
                                <p class="article-one-p">
                                    ${obj.post_body}
                                </p>`;
                    article.innerHTML += html
                }
            })
    
            // console.log(items)
        }).catch((error) => {
            console.error(error);
        })
    }
}
firebase.auth().onAuthStateChanged(user => {
    console.log("Status Changed", user.email);

    let commentSection = document.getElementById("comments_section")
    if (user) {

        let comment = `
            <form class="comment" id="comments" name="comments">
                <label for="comments"><b>Leave your comments below !</b></label>
                <textarea name="comments" id="comment_text" cols="100" rows="10"></textarea>
                <button type="submit">Comment</button>
            </form>

            <h2>Latest Comments</h2>
        `;
        commentSection.innerHTML += comment

        let form = document.getElementById("comments")

        displayComment()
        
        form.addEventListener('submit', e => {
            e.preventDefault();
            // console.log("Adding form", id)

            addComment();
        })

        // Adding Comments
        function addComment() {
            let commentText = document.getElementById("comment_text").value;
            console.log("Comment message",commentText)
            let commentId = Math.floor((Math.random() * 100) + 1);
    
            db.ref("comments/").push().set({ 
                commentId:commentId,
                // postId: id,
                commentMessage: commentText,
                commentator: user.email,
                published: firebase.database.ServerValue.TIMESTAMP
            }, function (error) {
                if (error) {
                    console.error(error)
                }
                else {
                    // console.log(commentText.value)
                    Toastify({
                        text: "Comment Added Successfully!",
                        className: "info",
                        style: {
                            background: "linear-gradient(to left, #00b09b, #96c93d)",
                        }
                    }).showToast();
    
                    form.reset();
                }
            })
        }
        function displayComment() {
            let commentSection = document.getElementById("comments_section");
    
            db.ref("comments/").limitToLast(10).once("value", function (snapshot) {
                snapshot.forEach(
                    function (childSnapshot) {
                        // console.log("id logging", id)
                        let comments = childSnapshot.val()
                        let commentsContent = `
                        <p class="commentClass">${comments.commentMessage}</p>
                        <h5 class="time-stamp">${comments.published}&nbsp;&nbsp;&nbsp;<span class="commantetor">By ${comments.commentator}</span></h5>`;
                            commentSection.innerHTML += commentsContent
                        // if (comments.postId == id) {
                        //     // console.log(comments)
                        //     commentSection.innerHTML += commentsContent
                        // }
                    }
                )
            })
        }
        
    }
})
