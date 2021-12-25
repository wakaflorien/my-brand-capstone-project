const loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    login();
})

function login(){
    let email = document.getElementById("email").value
    let password = document.getElementById("passwd").value

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then( (currentUser) => {
        let user = currentUser.user 

        const   userData = {
            last_login: Date.now()
        }
        db.ref().child("Users/" + user.uid).update(userData);

        // console.log("User Logged in")
          window.location.href = '../pages/dashboard.html';
    })
    .catch( (error) => {
        console.error(error)
    })
}