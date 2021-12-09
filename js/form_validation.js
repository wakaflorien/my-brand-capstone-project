const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("passwd");
const email_msg = document.getElementById("email-msg");
const passwd = document.getElementById("passwd");
const passwd_msg = document.getElementById("passwd-msg");
const re_passwd = document.getElementById("re-passwd");
const re_passwd_msg = document.getElementById("re-passwd-msg");
const fname = document.getElementById("fname");
const fname_msg = document.getElementById("fname-msg");
const lname = document.getElementById("lname");
const lname_msg = document.getElementById("lname-msg");

form.addEventListener('submit', e => {
    e.preventDefault();

    checkEmail();
    checkPassword();

    checkNames();
    
})

function checkEmail(){
    if(email.value==""){
        email_msg.innerHTML = "Email can't be empty";
        email_msg.style.color = "#FF0000";
        email.style.borderColor = "#FF0000";
        return false;
    } else{
        email_msg.innerHTML = "";
        email.style.borderColor = "#0FA958";
        return true;
    }
}
function checkPassword(){
    if(passwd.value == "" || re_passwd == ""){
        passwd_msg.innerHTML = "Password can't be empty";
        passwd_msg.style.color = "#FF0000";
        passwd.style.borderColor = "#FF0000";

        re_passwd_msg.innerHTML = "Password can't be empty";
        re_passwd_msg.style.color = "#FF0000";
        re_passwd.style.borderColor = "#FF0000";
        return false;
    } 
    else if(passwd.value !== re_passwd.value){
        passwd_msg.innerHTML = "Passwords must match";
        re_passwd_msg.innerHTML = "Passwords must match";
        return false;
    }
    else{
        passwd_msg.innerHTML = "";
        re_passwd_msg.innerHTML = "";
        passwd.style.borderColor = "#0FA958";
        re_passwd.style.borderColor = "#0FA958";
        return true;
}
}
function checkNames(){
    if (fname.value == "" || lname.value == ""){
        fname_msg.innerHTML = "Fill in your Firstname";
        fname_msg.style.color = "#FF0000";
        fname.style.borderColor = "#FF0000";

        lname_msg.innerHTML = "Fill in your Firstname";
        lname_msg.style.color = "#FF0000";
        lname.style.borderColor = "#FF0000";

        return false; 
    } else{
        fname_msg.innerHTML = "";
        lname_msg.innerHTML = "";
        fname.style.borderColor = "#0FA958";
        lname.style.borderColor = "#0FA958";
        return true;
    }
}
