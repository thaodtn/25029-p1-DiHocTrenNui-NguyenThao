// document.addEventListener('DOMContentLoaded', function () {
//     // load header
//     console.log('load header');
//     fetch('../static/html/header.html')
//         .then(response => response.text())
//         .then(html => {
//             document.getElementById("header-placeholder").innerHTML = html;
//         });

//     // load footer
//     console.log('load footer');
//     fetch('../static/html/footer.html')
//         .then(response => response.text())
//         .then(html => {
//             document.getElementById("footer-placeholder").innerHTML = html;
//         });
// })



// Use async/await for cleaner asynchronous code.
async function fetchAndInjectElementById(sourcePageURL, sourceElementId, destinationElementId) {
    try {        
        // Get the container element where the fetched content will be placed.
        const container = document.getElementById(destinationElementId);

        // Step 1: Fetch the HTML as a plain text response.
        console.log('Fetch the HTML as a plain text response.');
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

        console.log('Successfully fetched and injected the body content.');

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
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches("#nav-dropdown-btn")) {
        console.log(event);
        let list = document.getElementsByClassName('nav-dropdown-list');
        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains('show')) {
                list[i].classList.remove('show');
            }
        }
    }
    if (!event.target.matches("#register-dropdown-btn")) {
        console.log(event);
        let list = document.getElementsByClassName('register-dropdown-list');
        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains('show')) {
                list[i].classList.remove('show');
            }
        }
    }
}