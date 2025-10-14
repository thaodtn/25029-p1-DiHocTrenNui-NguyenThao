function enableProfileSetting() {
    const btn = document.getElementById('profile-settting-btn');
    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        document.getElementById('profile-settings-container').style.display = 'block';
    }
    document.getElementById('password-settting-btn').classList.remove('active');
    document.getElementById('password-settings-container').style.display = 'none';
}

function enablePasswordSetting() {
    const btn = document.getElementById('password-settting-btn');
    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        document.getElementById('password-settings-container').style.display = 'block';
    }
    document.getElementById('profile-settting-btn').classList.remove('active');
    document.getElementById('profile-settings-container').style.display = 'none';
}