const url = 'https://my-capstone-project-api.herokuapp.com/auth/'

let loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', e=> {
    e.preventDefault()
    
    login()
})
const login = () => {

    let email = document.getElementById('email').value
    let password = document.getElementById('passwd').value

    let data = {
        email: email,
        password: password
    }
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    
    fetch(url, fetchData)
    .then((response) => {
        return response.json()
    }).then((data) => {
        let user = {
            message: data.status,
            token: data.data.accessToken
        }
        window.localStorage.setItem('user', JSON.stringify(user))
        location.href = '../pages/dashboard.html'
    }).catch((err) => {
        console.error(err)
    })
}
