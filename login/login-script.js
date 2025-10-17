import { users, currentUser } from "/static/js/common-script.js";
let newUser;

document.getElementById('show-pw-icon').addEventListener('click', togglePasswordVisible);
document.getElementById('hide-pw-icon').addEventListener('click', togglePasswordVisible);
document.getElementById('login-forms').addEventListener('submit', authenLogin);

export function checkCurrentUser() {
    if (currentUser) {
        window.location.href = '../users/dashboard.html'; //redirect to Dashboard page
    }
}

function authenLogin(event) {
    event.preventDefault(); // stops the browser from reloading the page, allowing JavaScript to handle the submission.

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let checked = false;
    users.some(element => {
        if ((element.email === email) && (element.password === password)) {
            newUser = element;
            checked = true;
            return true; //stop the 'some' iteration
        }
        return false; //continue iteration
    });
    if (checked === true) {
        localStorage.setItem('currentUser', JSON.stringify(newUser));  
        alert('Login successful.'); //need to pop up this alert to delay for saving newUser into local storage, if not next command redirect to Dashboard page without saving newUser
        window.location.href = '../users/dashboard.html'; //redirect to Dashboard page
        // alert('Login successful.');
    }
    else {
        alert('Invalid username or password.');
    }
}

function togglePasswordVisible() {
    const pw = document.getElementById("password");
    if (pw.type === "password") {
        pw.type = "text";
        document.getElementById("show-pw-icon").style.display = "inline-block";
        document.getElementById("hide-pw-icon").style.display = "none";
    } else {
        pw.type = "password";
        document.getElementById("show-pw-icon").style.display = "none";
        document.getElementById("hide-pw-icon").style.display = "inline-block";
    }
}

