// function update_post(){
//     const newData = {
//         post_title: postTitle,
//         post_body: postText,
//         photoURL: downloadURL,
//         published: firebase.database.ServerValue.TIMESTAMP
//     }
//     db.ref("Blogs/" + id.value).update(newData);
// }



// ////////////////// Logout ///////////////////////

function logout(){
    let logout = document.getElementById("logout");

        firebase.auth().signOut().then(() => {
            
            console.log("Signed out");
    
              window.location.href = '../pages/blog.html';
              
          }).catch((error) => {
            console.log(error.message)
          });
}
firebase.auth().onAuthStateChanged( user => {
    // console.log("Status Changed", user);
    if(!user){
        location.href = '../index.html'
    }
})