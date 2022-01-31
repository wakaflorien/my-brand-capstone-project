const url = 'https://my-capstone-project-api.herokuapp.com/posts/'
const form = document.getElementById("postForm");

window.onload = () => {
    const user = window.localStorage.getItem('user')
}

form.addEventListener('submit', e => {
    e.preventDefault();

    addBlog();
})

function addBlog(){
    let photo = document.getElementById("img").files[0];
    let postText = CKEDITOR.instances.post_text.getData()
    let subTitle = document.getElementById("subtitle").value
    let postTitle = document.getElementById("post_title").value
    

    let photoName = photo.name;
    const storageRef =  app.storage().ref("images/" + photoName)
    let uploadTask = storageRef.put(photo);
    
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
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${user.token}`
                })
            }
            
            fetch(url, fetchData)
            .then((response) => {
                return response.json()
            }).then((data) => {
                Toastify({
                    text: `${data.success + " " +data.message}`,
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