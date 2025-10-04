/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function openMenuDropdown () {
    document.getElementById("nav-dropdown").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches("#nav-dropdown-btn"))
    {
        console.log(event);
        let list = document.getElementsByClassName('nav-dropdown-list');
        for (let i = 0; i < list.length; i++)
        {
            if (list[i].classList.contains('show'))
            {
                list[i].classList.remove('show');
            }
        }
    }
}