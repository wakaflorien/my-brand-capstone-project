// Get your own Articles

window.onload = function (){
    firebase.auth().onAuthStateChanged( user => {
        console.log("Status Changed", user);
    
        if(user){
            console.log(user.uid)
            console.log(user.email)
        }

    this.getArticles(user);
    })
    updateForm()
}

let main = document.getElementById("dash1");
let grid = document.getElementById("grid-container")
    
    function getArticles(user){
        db.ref("Blogs/").limitToLast(10).once("value", function (snapshot){
            
            snapshot.forEach(
                function (childSnapshot){
    
                    let key = childSnapshot.key
                    let articles = childSnapshot.val()
                    console.log(key);
                    let tableBody = `  
                        <div>${articles.post_title}</div>
                        <div>${articles.post_body}</div>
                        <div>${articles.published}</div>
                        <div>
                        <button class="delete" id="${key}" onClick="delete_post(this.id)">Delete</button>
                        <button class="update" id="${key}" onClick="openFormModal(this.id)">Update</button></div>`;
                        
                    console.log(tableBody)
                    grid.innerHTML += tableBody
                }
            )
        })
    }

const delete_post = (key) => {
    db.ref("Blogs/" + key).remove();

    Toastify({
        text: "Post Successfully Deleted!",
        className: "info",
        style: {
          background: "linear-gradient(to center, #0FA958, #0FA958)",
        }
      }).showToast();
  }
    // Get the Form modal
    let formModal = document.getElementById("form-container");
    let form = document.getElementById("postForm");
    let postTitle = document.getElementById("post_title")
    let postText = document.getElementById("post_text")
    let postImage = document.getElementById("img")
    let updateButton = document.getElementById("update");
    // Get the button that opens the Form modal
    const openFormModal = (key) =>{

    formModal.style.display = "block";
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
    function updateForm(){
        db.ref("Blogs/" + key).limitToLast(10).once("value", function (snapshot){
            
            snapshot.forEach(
                function (childSnapshot){
    
                    let key = childSnapshot.key
                    let articles = childSnapshot.val()
                    postTitle.value = articles.post_title
                    postText.value = articles.post_body
                    postImage.src = articles.photoURL
                }
            )
        })
    }
  const update_post = (key) => {
      let postTitle 
    const newData = {
        post_title: postTitle,
        post_body: postText,
        photoURL: downloadURL,
        published: firebase.database.ServerValue.TIMESTAMP
    }
    db.ref("Blogs/" + key).update(newData);
  }