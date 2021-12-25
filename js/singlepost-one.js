window.onload = function () {
    let id = location.search.split('=')[1];
    let article = document.getElementById("article")

    console.log(id)

    db.ref("Blogs/").once("value", (snapshot) => {
        // console.log(snapshot.val())

        let articles = snapshot.val()
        // console.log(articles)
        let items = Object.values(articles).find((obj) => {
            if (obj.postId == id) {
                let html = `
                            <h6 class="reference"><a href="blog.html">Blog/</a><span class="inner">Post One</span></h6>
                            <h2 class="article-one-header">${obj.published}</h2>
                            <h1>${obj.post_title}</h1>
                            <img src="${obj.photoURL}" alt="">
                            <hr>
                            <p class="article-one-p">
                                ${obj.post_body}
                            </p>`;

                // console.log(article)
                article.innerHTML += html
            }
        })

    })
    firebase.auth().onAuthStateChanged(user => {
        console.log("Status Changed", user);
        let commentSection = document.getElementById("comments_section")
        if (user) {
            let comment = `
                <form action="" class="comment" id="comments">
                    <label for="comments"><b>Leave your comments below !</b></label>
                    <textarea name="comments" id="comment_text" cols="100" rows="10"></textarea>
                    <button type="submit">Comment</button>
                </form>
            `;
            commentSection.innerHTML += comment
            // main.innerHTML += commentSection
            // console.log(main)
            // console.log(id)

            let form = document.getElementById("comments")
            displayComment()

            form.addEventListener('submit', e => {
                e.preventDefault();
                // console.log(id)
                addComment();
            })
            function addComment() {
                let commentText = document.getElementById("comment_text").value;
                let commentId = Math.floor((Math.random() * 100) + 1);

                db.ref("comments/").push().set({
                    commentId: commentId,
                    commentMessage: commentText,
                    commentator: user.email,
                    postId: id,
                    published: firebase.database.ServerValue.TIMESTAMP
                }, function (error) {
                    if (error) {
                        console.error(error.message)
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

                            // console.log(childSnapshot.val())
                            let comments = childSnapshot.val()
                            let commentsContent = `
                            <h2>Latest Comments</h2>
                            <p class="commentClass">${comments.commentMessage}</p>
                            <h5 class="time-stamp">${comments.published}&nbsp;&nbsp;&nbsp;<span class="commantetor">By ${comments.commentator}</span></h5>`;
                            if (comments.postId == id) {
                                // console.log(comments)
                                commentSection.innerHTML += commentsContent
                            }
                        }
                    )
                })
            }

            // displayComment();

        }
    })
}