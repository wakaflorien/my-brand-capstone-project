const validateForm = document.getElementById("signupForm");
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


const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})");
const re_rePass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})");

if(validateForm){
    validateForm.addEventListener('submit', e => {
        e.preventDefault();
        // console.log("form")
        checkEmail();
    
        checkLoginPassword();
    
        checkPassword();
    
        checkNames();
        
    })
}

function checkEmail(){
    if(email.value==""){
        email_msg.innerHTML = "Email can't be empty";
        email_msg.style.color = "#FF0000";
        email.style.borderColor = "#FF0000";

        return false;
    } else if(reEmail.test(email.value) == false){
        email_msg.innerHTML = "Enter Correct email";
        email_msg.style.color = "#FF0000";
        email.style.borderColor = "#FF0000";
        return false;
    }
    else{
        email_msg.innerHTML = "";
        email.style.borderColor = "#0FA958";
        return true;
    }
}
function checkLoginPassword(){
    if(passwd.value == ""){
        passwd_msg.innerHTML = "Password can not be empty";
        passwd_msg.style.color = "#FF0000";
        passwd.style.borderColor = "FF0000";

        return false;
    } else if(rePass.test(passwd.value) == false){
        passwd_msg.innerHTML = "Enter Strong Password";
        passwd_msg.style.color = "#FF0000";
        passwd.style.borderColor = "FF0000";

        re_passwd_msg.innerHTML = "Enter Strong Password";
        re_passwd_msg.style.color = "#FF0000";
        re_passwd.style.borderColor = "#FF0000";


        return false;
    }
     else{
        passwd_msg.innerHTML = "";
        passwd.style.borderColor = "#0FA958";
    }
}
function checkPassword(){
    if(passwd.value == "" || re_passwd.value == ""){
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

    } else if(rePass.test(passwd.value) == false || re_rePass.test(re_passwd.value) == false){
        passwd_msg.innerHTML = "Enter Strong Password";
        passwd_msg.style.color = "#FF0000";
        passwd.style.borderColor = "FF0000";


        re_passwd.innerHTML = "Enter Strong Password";
        re_passwd_msg.style.color = "#FF0000";
        re_passwd.style.borderColor = "FF0000";


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

        lname_msg.innerHTML = "Fill in your Lastname";
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
