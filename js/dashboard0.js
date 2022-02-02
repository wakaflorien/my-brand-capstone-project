window.onload = function (){
    const user = JSON.parse(window.localStorage.getItem('user'))

    if(user){
        allArticles()
    }
    else{
        location.href = `../pages/login.html`
    }
    
}
let table = document.getElementById("table-container")
const url = 'https://my-capstone-project-api.herokuapp.com/posts/'

async function allArticles(){
    await fetch(url)
    .then((response) =>{
        return response.json()
    })
    .then((data) => {  
        let posts = data.data.posts
        // console.log(posts)
        posts.map((post)=> {
            let article = `  
            <tr>
            <td>${post.title}</td>
            <td>${post.subTitle}</td>
            <td>${post.dateCreated}</td>
            <td>
            <button class="delete" id="${post._id}" onClick="delete_post(this.id)"><i class="fas fa-trash"></i>Delete</button>
            </td>
            <td>
            <button class="update" id="${post._id}" onClick="openFormModal(this.id)"><i class="fas fa-edit"></i>

            Update</button>
            </td>
            </tr>
            `;
    
                    // console.log(post._id)
                    table.innerHTML += article
        })
    })
    .catch((err) => {
        console.error(err)
    })
}

// Get the Form modal
let formModal = document.getElementById("form-container");

    // Get the button that opens the Form modal
function openFormModal(key){
    formModal.style.display = "block";
    console.log(key)
    async function updatePost(){
        let form = document.getElementById("postForm");
        let postTitle = document.getElementById("post_title").value
        let subTitle = document.getElementById("subtitle").value
        let postText = document.getElementById("post_text").value
        let postImage = document.getElementById("img").files[0];

        let photoName = postImage.name;
    const storageRef =  app.storage().ref("images/" + photoName)
    let uploadTask = storageRef.put(postImage);
    
    uploadTask.on("state_changed", snapshot => {
        let progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log ("Upload is " + progess + " Done!")
    }, error => {
        console.log(error.message)
    }, () =>{
        uploadTask.snapshot.ref.getDownloadURL().then( downloadURL => {
            const user = JSON.parse(window.localStorage.getItem('user'))
            let data = {
                title: postTitle,
                subTitle: subTitle,
                postBody: postText,
                imageUrl: downloadURL
            }
            let fetchData = {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${user.token}`
                })
            }
            fetch(`https://my-capstone-project-api.herokuapp.com/posts/${key}`, fetchData)
            .then((response) => {
                return response.json()
            }).then((data) => {
                Toastify({
                    text: `${data.message}`,
                    className: "info",
                    style: {
                        background: "linear-gradient(to left, #00b09b, #96c93d)",
                    }
                }).showToast();
                form.reset();

            }).catch((err) => {
                console.error(err)
            })
        })
    })
    }
    let updateButton = document.getElementById("update");

    updateButton.addEventListener('click', (e)=>{
        e.preventDefault()
        updatePost()
    })
}

let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
formModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == formModal) {
    formModal.style.display = "none";
}
}

const delete_post = (key) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    let fetchData = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`
        })
    }
    
    fetch(`https://my-capstone-project-api.herokuapp.com/posts/${key}`, fetchData)
    .then((response) => {
        return response.json()
    }).then((data) => {
        
        Toastify({
            text: `${data.message}`,
            className: "info",
            style: {
                background: "linear-gradient(to left, #00b09b, #96c93d)",
            }
        }).showToast();

    }).catch((err) => {
        console.error(err)
    })
    }