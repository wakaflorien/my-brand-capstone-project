const signupForm = document.getElementById("signupForm");

signupForm.addEventListener('submit', e => {
    e.preventDefault();

    signup();
})

function signup(){
    let fName = document.getElementById("fname").value
    let lName = document.getElementById("lname").value
    let email = document.getElementById("email").value
    let password = document.getElementById("passwd").value

    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((currentUser) => {
    let user = currentUser.user

    const userData = {
        firstname:fName,
        lastname:lName,
        email:email,
        type: "guest",
        last_login: Date.now()
    }
    db.ref().child("Users/" + user.uid).push().set(userData);

    console.log("Successfully created new user")
      signupForm.reset();
      window.location.href = '../pages/login.html';
  })
  .catch((error) => {
    console.error(error)
  });
}