// Get your own Articles

window.onload = function (){
    firebase.auth().onAuthStateChanged( user => {
        console.log("Status Changed", user);
    
        if(user){
            console.log(user.uid)
            console.log(user.email)
        }
    })

    this.getArticles(user.uid);
}

let main = document.getElementById("dash1");

if (main){
    function table(doc){
        let key = doc.key
        let tbody = document.getElementById("tbody")
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        let td5 = document.createElement("td")

        td1.innerHTML = doc.val().post_title;
        td2.innerHTML = doc.val().post_body;
        td3.innerHTML = doc.val().published;
        td4.innerHTML = "<button class='delete' id= '"+ key +"' onclick='delete_post(this.id)'>Delete</button>"
        td5.innerHTML = "<button class='delete' id= '"+ key +"' onclick='update_post(this.id)'> Update</button>"

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        
        tbody.appendChild(tr)
        
        console.log(tbody)
    }
    
    function getArticles(uid){
        db.ref("Blogs/" + uid).limitToLast(10).once("value", function (snapshot){
            
            snapshot.forEach(
                function (childSnapshot){
    
                    let key = childSnapshot.key
                    console.log(childSnapshot.val())
                    // table(childSnapshot, key);
                }
            )
        })
    }
}

function delete_post(key) {
    db.ref("Blogs/" + key).remove();

    Toastify({
        text: "Post Successfully Deleted!",
        className: "info",
        style: {
          background: "linear-gradient(to center, #0FA958, #0FA958)",
        }
      }).showToast();

      getArticles();
  }