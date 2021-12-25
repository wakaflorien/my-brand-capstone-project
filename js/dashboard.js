const form = document.getElementById("postForm");

form.addEventListener('submit', e => {
    e.preventDefault();

    addBlog();
})

function addBlog(){
    let photo = document.getElementById("img").files[0];
    // alert(CKEDITOR.instances.post_text.getData());
    let postText = CKEDITOR.instances.post_text.getData()
    let postTitle = document.getElementById("post_title").value;
    let postId = Math.floor((Math.random() * 1000) + 1);
    

    let photoName = photo.name;
    const storageRef =  app.storage().ref("images/" + photoName);
    let uploadTask = storageRef.put(photo);

    uploadTask.on("state_changed", snapshot => {
        let progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log ("Upload is " + progess + " Done!")
    }, error => {
        console.log(error.message)
    }, () =>{
        uploadTask.snapshot.ref.getDownloadURL().then( downloadURL => {
            db.ref("Blogs").push().set({
                postId: postId,
                post_title: postTitle,
                post_body: postText,
                photoURL: downloadURL,
                published: firebase.database.ServerValue.TIMESTAMP
            }, function(error){
                if(error){
                    console.error(error.message)
                } else {
                    // alert("Successfully uploaded")
                    Toastify({
                        text: "Post Created Successfully!",
                        className: "info",
                        style: {
                          background: "linear-gradient(to left, #00b09b, #96c93d)",
                        }
                      }).showToast();
                      
                    form.reset();
                }
            })
        })
    })
}