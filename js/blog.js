console.log("Running")

window.onload = function () {
    let main = document.getElementById("main");

    db.ref("Blogs/").limitToLast(10).once("value", function (snapshot) {

        snapshot.forEach(
            function (childSnapshot) {

                // console.log(childSnapshot.val())
                let articles = childSnapshot.val()
                let article = `
                <article class="post-one">
                    <figure class="img-one">
                        <p class="link"></p>
                        <h1 class="title" id="title">${articles.post_title}</h1>
                        <img src="${articles.photoURL}" alt="First img" class="pic-one">
                        <p class="date">${articles.published}</p>
                    </figure>
                    <section class="post-one-p">
                        <p id="p" class="p">${articles.post_body}</p>
                        <button class="read-more" onClick="readMore(${articles.postId})" id="${articles.postId}">Read More</button>
                    </section>
                </article>`;

                // console.log(article)
                main.innerHTML += article
            }
        )
    })
}

const readMore = (id) => {
    location.href = `./singlepost-one.html?id=${id}`
}