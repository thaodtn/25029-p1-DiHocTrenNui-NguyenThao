import { currentUser, initData } from "/static/js/common-script.js";


export function loadSettingsPageEvents() {
    document.getElementById('save-profile-changes-btn').addEventListener('click', saveProfileChanges);
    document.getElementById('save-password-changes-btn').addEventListener('click', savePasswordChanges);
    fetchProfileData();
}

export function enableProfileSetting() {
    const btn = document.getElementById('profile-settting-btn');
    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        document.getElementById('profile-settings-container').style.display = 'block';
    }
    document.getElementById('password-settting-btn').classList.remove('active');
    document.getElementById('password-settings-container').style.display = 'none';
}

export function enablePasswordSetting() {
    const btn = document.getElementById('password-settting-btn');
    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        document.getElementById('password-settings-container').style.display = 'block';
    }
    document.getElementById('profile-settting-btn').classList.remove('active');
    document.getElementById('profile-settings-container').style.display = 'none';
}

export function fetchProfileData() {
    // document.getElementById('avatar-img');    
    document.getElementById('user-name').value = currentUser.name;
    document.getElementById('user-email').value = currentUser.email;
    document.getElementById('user-phone-number').value = currentUser.phone;
    document.getElementById('user-id').value = currentUser.id;
    document.getElementById('user-role').value = currentUser.role;
    console.log('finish fetchProfileData');
}

function saveProfileChanges(event) {
    event.preventDefault(); // stops the browser from reloading the page, allowing JavaScript to handle the submission.
    let updateUser = currentUser;
    updateUser.name = document.getElementById('user-name').value;
    updateUser.phone = document.getElementById('user-phone-number').value;
    //save into localStorage
    localStorage.setItem('currentUser', JSON.stringify(updateUser));
    initData();
    console.log('finish saveProfileChanges');
}

function savePasswordChanges(event) {
    event.preventDefault(); // stops the browser from reloading the page, allowing JavaScript to handle the submission.
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
    document.getElementById('password-settings-form').reset();
}