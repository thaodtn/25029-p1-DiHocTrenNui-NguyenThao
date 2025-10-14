import { users, currentUser } from '../static/js/mock-data.js';

document.getElementById('show-pw-icon').addEventListener('click', togglePasswordVisible);
document.getElementById('hide-pw-icon').addEventListener('click', togglePasswordVisible);


document.getElementById('login-forms').addEventListener('submit', function (event) {
    event.preventDefault(); // stops the browser from reloading the page, allowing JavaScript to handle the submission.

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    let checked = false;
    
    users.some(element => {
        if ((element.email === email) && (element.password === password)) {
            checked = true;
            return true; //stop the 'some' iteration
        }
        return false; //continue iteration
    });
    console.log(currentUser);
    if (checked === true) {
        message.textContent = 'Login successful.';
        // currentUser = element;
        window.location.href = '../users/dashboard.html'; //redirect to Dashboard page
    }
    else {
        message.textContent = 'Invalid username or password.';
    }
});

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