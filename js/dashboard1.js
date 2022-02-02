window.onload = function (){
    const user = JSON.parse(window.localStorage.getItem('user'))
    if(user){
        allQueries(user)
    }
    else{
        location.href = `../pages/login.html`
    }
    
}
let table = document.getElementById("table-container")
const url = 'https://my-capstone-project-api.herokuapp.com/contact/'

async function allQueries(user){
    let fetchData = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`
        })
    }
    await fetch(url, fetchData)
    .then((response) =>{
        return response.json()
    })
    .then((data) => { 
        let queries = data.data.queries
        
        queries.map((query)=> {
            let allQuery = `  
            <tr>
            <td>${query.name}</td>
            <td>${query.query}</td>
            <td>${query.email}</td>
            <td>
            <button class="delete" id="${query._id}" onClick="delete_query(this.id)"><i class="fas fa-trash"></i>Delete</button>
            </td>
            </tr>
            `;
            table.innerHTML += allQuery
        })
    })
    .catch((err) => {
        console.error(err)
    })
}
const delete_query = (id) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    let fetchData = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${user.token}`
        })
    }
    
    fetch(`https://my-capstone-project-api.herokuapp.com/contact/${id}`, fetchData)
    .then((response) => {
        return response.json()
    }).then((data) => {
        Toastify({
            text: `${data.message}`,
            className: "info",
            style: {
                background: "linear-gradient(to left, #00b09b, #96c93d)",
            }
        }).showToast();

    }).catch((err) => {
        console.error(err)
    })
    }