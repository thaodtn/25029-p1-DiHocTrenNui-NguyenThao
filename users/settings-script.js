import { currentUser, initData, updateUserById } from "/static/js/common-script.js";


export function loadSettingsPageEvents() {
    document.getElementById('open-edit-form-btn').addEventListener('click', () => {
        document.getElementById('update-profile-modal-container').classList.toggle('show');
    });
    document.getElementById('open-change-pw-btn').addEventListener('click', () => {
        document.getElementById('update-pw-modal-container').classList.toggle('show');
    });
    document.getElementById('close-profile-form-btn').addEventListener('click', () => {
        document.getElementById('update-profile-modal-container').classList.toggle('show');
    });
    document.getElementById('close-pw-form-btn').addEventListener('click', () => {
        document.getElementById('update-pw-modal-container').classList.toggle('show');
    });
    document.getElementById('update-profile-btn').addEventListener('click', saveProfileChanges);
    document.getElementById('update-pw-btn').addEventListener('click', savePasswordChanges);

    fetchProfileData();
}

function fetchProfileData() {
    // information to display
    // document.getElementById('avatar-img');    
    document.getElementById('current-user-name').textContent = currentUser.name;
    document.getElementById('current-user-phone').textContent = currentUser.phone;
    document.getElementById('current-user-id').textContent = currentUser.id;
    document.getElementById('current-user-email').textContent = currentUser.email;
    document.getElementById('current-user-role').textContent = currentUser.role;
    //information of form
    document.getElementById('new-user-name').value = currentUser.name;
    document.getElementById('new-user-phone').value = currentUser.phone;
    console.log('finish fetchProfileData');
}

function saveProfileChanges(event) {
    // stops the browser from reloading the page, allowing JavaScript to handle the submission.
    // event.preventDefault(); 
    let updateUser = currentUser;
    updateUser.name = document.getElementById('new-user-name').value;
    updateUser.phone = document.getElementById('new-user-phone').value;
    //save into localStorage
    localStorage.setItem('currentUser', JSON.stringify(updateUser));
    updateUserById(updateUser);
    initData();
    console.log('finish saveProfileChanges');
}

function savePasswordChanges(event) {
    // stops the browser from reloading the page, allowing JavaScript to handle the submission.
    // event.preventDefault(); 
    let updateUser = currentUser;
    //check current password
    if (document.getElementById('current-pw').value === currentUser.password) {
        if (document.getElementById('new-pw').value === document.getElementById('confirmed-pw').value) {
            updateUser.password = document.getElementById('new-pw').value;
            //save into localStorage
            localStorage.setItem('currentUser', JSON.stringify(updateUser));
            initData();
            console.log('finish savePasswordChanges');
            alert('Changed password successfully.');
        } else {
            alert('The new passwords do not match. Please try again!');
        }
    } else {
        alert('Current password is incorrect. You can not change password. Please try again.');
    }
}

