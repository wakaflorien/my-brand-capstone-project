let fetchData = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Origin': 'http://127.0.0.1:5500'
    })
}
fetch('https://my-capstone-project-api.herokuapp.com/posts/', fetchData)
.then((response) =>{
    return response.json()
})
.then((data) => {   
    
    let posts = data.data.posts
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
                        <p id="p" class="p">${post.postBody}</p>
                        <button class="read-more" id="${post._id}" onClick="readMore(this.id)">Read More</button>
                    </section>
                </article>`;
                main.innerHTML += article
    })
}).catch((err) => {
    console.error(err)
})

const readMore = (id) => {
    location.href = `./singlepost-one.html?id=${id}`
}