import { users, currentUser } from "/static/js/common-script.js";
let newUser;

export function loadLoginPageEvents() {
    document.getElementById('show-pw-icon').addEventListener('click', togglePasswordVisible);
    document.getElementById('hide-pw-icon').addEventListener('click', togglePasswordVisible);
    document.getElementById('login-forms').addEventListener('submit', authenLogin);
}


export function checkCurrentUser() {
    if (currentUser) {
        window.location.href = '../users/dashboard.html'; //redirect to Dashboard page
    }
}

function authenLogin(event) {
    event.preventDefault(); // stops the browser from reloading the page, allowing JavaScript to handle the submission.

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let checked = users.some(element => {
        if ((element.status === 'active') && (element.email === email) && (element.password === password)) {
            newUser = element;
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

/* backup in-case localStorage.setItem hadn't finished while window.location.href redirect to new page
saveUserToLocalStorage(newUser).then(() => {
  window.location.href = '../users/dashboard.html';
});

function saveUserToLocalStorage(user) {
  return new Promise((resolve) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    resolve();
  });
}
*/