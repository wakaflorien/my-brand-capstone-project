const signupForm = document.getElementById("signupForm");

signupForm.addEventListener('submit', e => {
    e.preventDefault();

    signup();
})

async function signup(){
    let fName = document.getElementById("fname").value
    let lName = document.getElementById("lname").value
    let email = document.getElementById("email").value
    let password = document.getElementById("passwd").value

    let data = {
        firstname:fName,
        lastname:lName,
        email:email,
        password: password
    }
    let fetchData = {
      method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            // 'Authorization': `Bearer ${user.token}`
        })
    }
    fetch(`https://my-capstone-project-api.herokuapp.com/register/`, fetchData)
    .then((response)=>{
      return response.json()
    }).then((data)=>{
      Toastify({
        text: "User created",
        className: "info",
        style: {
            background: "linear-gradient(to left, #00b09b, #96c93d)",
        }
    }).showToast();
    signupForm.reset();
    location.href = `./login.html`
    })
    .catch(()=>{

    })
}