fetch('https://my-capstone-project-api.herokuapp.com/posts/')
.then((response) =>{
    return response.json()
})
.then((data) => {   
    let posts = data.posts
    console.log(posts)
    posts.map((post)=> {
        let main = document.getElementById("main")
        let article = `
                <article class="post-one">
                    <figure class="img-one">
                        <p class="link"></p>
                        <h1 class="title" id="title">${post.title}</h1>
                        <h4>${post.subTitle}</h4>
                        <p class="date">${post.dateCreated}</p>
                        <img src="${post.imageUrl}" alt="First img" class="pic-one">
                    </figure>
                    <section class="post-one-p">
                        <p id="p" class="p">${post.postBody+post._id}</p>
                        <button class="read-more" onClick="readMore(1)" id="${post._id}">Read More</button>
                    </section>
                </article>`;

                // console.log(post._id)
                main.innerHTML += article
    })
})
.catch((err) => {
    console.error(err)
})

const readMore = (id) => {
    console.log(id)
    location.href = `./singlepost-one.html?id=${id}`
}