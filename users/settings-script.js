import { currentUser } from "/static/js/common-script.js";

export function fetchProfileData() {
    // document.getElementById('avatar-img');    
    document.getElementById('user-name').value = currentUser.name;
    document.getElementById('user-email').value = currentUser.email;
    document.getElementById('user-phone-number').value = currentUser.phone;
    document.getElementById('user-id').value = currentUser.id;
    document.getElementById('user-role').value = currentUser.role;
}
export function fetchPassword() {
    //document.getElementById('current-pw').value = currentUser.password;
}