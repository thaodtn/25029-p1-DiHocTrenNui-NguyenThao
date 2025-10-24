import { accessControlList } from '/static/js/mock-data.js';
import { users, currentUser, fetchAndInjectElementById, checkUserControl } from '/static/js/common-script.js';

const UserFunctionalitiesDisplay = [
    'Quản lý người dùng',
    'Xem danh sách học sinh'
]

export async function loadUserHeaderContent(sourcePageURL, sourceElementId, destinationElementId) {
    await fetchAndInjectElementById(sourcePageURL, sourceElementId, destinationElementId);
    loadUserHeaderEvents();
}

export function loadUserHeaderEvents() {
    document.getElementById('account-settings-btn').addEventListener('click', openAccountSettingDropdown);
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('side-bar-menu-btn').addEventListener('click', openLeftSidePanel);
}
export async function loadLeftSideBarContent(destinationElementId) {
    await fetchAndInjectElementById('/users/dashboard.html', 'left-side-panel', destinationElementId);
    loadLeftSideBarEvents();
}
export function loadLeftSideBarEvents() {
    document.getElementById('close-left-side-panel-btn').addEventListener('click', closeLeftSidePanel);
}

function openAccountSettingDropdown() {
    document.getElementById("account-settings-nav").classList.toggle("show");
}

function openLeftSidePanel() {
    //check user's role to display the corresponding functions
    const currentUserControlList = accessControlList[currentUser.role];
    let functionContainer = document.getElementById('left-side-panel');
    console.log(currentUserControlList);
    //Quản lý người dùng
    if (!currentUserControlList.configUser) document.getElementById('config-user-btn').style.display = 'none';
    //Xem danh sách học sinh
    if (!currentUserControlList.viewStudent) document.getElementById('view-student-btn').style.display = 'none';
    //Xem danh sách người hỗ trợ
    if (!currentUserControlList.viewSponsor) document.getElementById('view-sponsor-btn').style.display = 'none';
    //Xem danh sách trường học
    if (!currentUserControlList.viewSchool) document.getElementById('view-school-btn').style.display = 'none';
    //Xem danh sách sao kê
    if (!currentUserControlList.viewTransactionRecord) document.getElementById('view-transaction-record-btn').style.display = 'none';
    //display Side Panel
    document.getElementById('left-side-panel').classList.toggle("show");
}

function closeLeftSidePanel() {
    document.getElementById('left-side-panel').classList.toggle("show");
    console.log('toggleLeftSidePanel');
}

function logout() {
    //reset currentUser    
    localStorage.clear('currentUser');
    window.location.href = '/index.html';
}


// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches("#account-settings-avatar")) {
        let list = document.getElementsByClassName('account-settings-nav');
        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains('show')) {
                list[i].classList.remove('show');
            }
        }
    }
}