import { originalUsers } from "./mock-data.js";
import { fetchProfileData, fetchPassword } from "/users/settings-script.js"

export let users = '';
export let currentUser = '';

export function initData() {
    //Kiểm tra xem dữ liệu trong localStorage đã có hay chưa
    if (!localStorage.getItem('users')) {
        //sao chép toàn bộ dữ liệu từ mock-data.js vào localStorage
        localStorage.setItem('users', JSON.stringify(originalUsers));
        //clear currentUser
        localStorage.setItem('currentUser', '');
    }
    else {
        //Bỏ qua bước sao chép và sử dụng luôn dữ liệu hiện tại trong localStorage
        users = JSON.parse(localStorage.getItem('users'));
        if (localStorage.getItem('currentUser')) {
            currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

    }
    console.log('Finish initData()');
}

export async function loadMainHeaderContent(sourcePageURL, sourceElementId, destinationElementId) {
    await fetchAndInjectElementById(sourcePageURL, sourceElementId, destinationElementId);
    document.getElementById('nav-dropdown-btn').addEventListener('click', openMenuDropdown);
    document.getElementById('register-dropdown-btn').addEventListener('click', openRegisterDropdown);
}

export async function loadUserHeaderContent(sourcePageURL, sourceElementId, destinationElementId) {
    await fetchAndInjectElementById(sourcePageURL, sourceElementId, destinationElementId);
    document.getElementById('account-settings-btn').addEventListener('click', openAccountSettingDropdown);
    document.getElementById('profile-settting-btn').addEventListener('click', enableProfileSetting);
    document.getElementById('password-settting-btn').addEventListener('click', enablePasswordSetting);
    document.getElementById('log-out-btn').addEventListener('click', logout);
}

// Use async/await for cleaner asynchronous code.
export async function fetchAndInjectElementById(sourcePageURL, sourceElementId, destinationElementId) {
    try {        
        // Get the container element where the fetched content will be placed.
        const container = document.getElementById(destinationElementId);

        // Step 1: Fetch the HTML as a plain text response.
        console.log('Starting fetchAndInjectElementById into',destinationElementId);
        const response = await fetch(sourcePageURL);

        // Ensure the request was successful.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the HTML content as a text string.            
        const htmlText = await response.text();

        // Step 2: Create a new DOMParser instance.
        const parser = new DOMParser();

        // Parse the HTML text into a Document object.
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Step 3: Get the element from the parsed document.
        const fetchedElement = doc.getElementById(sourceElementId);

        // To get the inner HTML *without* the <body> tags themselves,
        // use innerHTML. To get the <body> tags along with their content,
        // use outerHTML.
        const elementContent = fetchedElement.outerHTML;

        // Step 4: Insert the body's content into your container.
        container.innerHTML = elementContent;

        console.log('Successfully fetchAndInjectElementById.');

    } catch (error) {
        console.error('Failed to fetch and inject content:', error);
        container.innerHTML = '<p style="color: red;">Failed to load content.</p>';
    }
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function openMenuDropdown() {
    document.getElementById("nav-dropdown").classList.toggle("show");
}
function openRegisterDropdown() {
    document.getElementById("register-dropdown-list").classList.toggle("show");
}
function openAccountSettingDropdown() {
    document.getElementById("account-settings-nav").classList.toggle("show");
}

function enableProfileSetting() {
    const btn = document.getElementById('profile-settting-btn');
    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        document.getElementById('profile-settings-container').style.display = 'block';
    }
    document.getElementById('password-settting-btn').classList.remove('active');
    document.getElementById('password-settings-container').style.display = 'none';
    fetchProfileData();
}

function enablePasswordSetting() {
    const btn = document.getElementById('password-settting-btn');
    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        document.getElementById('password-settings-container').style.display = 'block';
    }
    document.getElementById('profile-settting-btn').classList.remove('active');
    document.getElementById('profile-settings-container').style.display = 'none';
    fetchPassword();
}

function logout() {
    //reset currentUser
    currentUser = '';
    localStorage.setItem('currentUser', currentUser);
    //window.location.href = '/index.html'; //dont know why it cannot redirect to Home page by this command
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches("#nav-dropdown-btn")) {
        let list = document.getElementsByClassName('nav-dropdown-list');
        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains('show')) {
                list[i].classList.remove('show');
            }
        }
    }
    if (!event.target.matches("#register-dropdown-btn")) {
        let list = document.getElementsByClassName('register-dropdown-list');
        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains('show')) {
                list[i].classList.remove('show');
            }
        }
    }
    if (!event.target.matches("#account-settings-avatar")) {
        let list = document.getElementsByClassName('account-settings-nav');
        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains('show')) {
                list[i].classList.remove('show');
            }
        }
    }
}

// document.addEventListener('DOMContentLoaded', function () {
//     // load header
//     console.log('load header');
//     fetch('/static/html/header.html')
//         .then(response => response.text())
//         .then(html => {
//             document.getElementById("header-placeholder").innerHTML = html;
//         });

//     // load footer
//     console.log('load footer');
//     fetch('/static/html/footer.html')
//         .then(response => response.text())
//         .then(html => {
//             document.getElementById("footer-placeholder").innerHTML = html;
//         });
// })