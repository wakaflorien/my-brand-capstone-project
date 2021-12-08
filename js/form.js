function validateForm(){
    let x = document.forms["form"]["email"].name;
    if (x==""){
        alert("Name must be filled first!");
        return false;
    }
}