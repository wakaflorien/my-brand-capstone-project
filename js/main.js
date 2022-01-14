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