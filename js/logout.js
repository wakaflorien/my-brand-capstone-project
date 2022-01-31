const logoutUser = document.getElementById('logout')

logoutUser.addEventListener('click', (e) => {
    e.preventDefault()
    window.localStorage.removeItem('user')
    location.href = `./login.html`
})