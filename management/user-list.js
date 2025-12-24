import {users, currentUser, addNewUser, updateUserByIndex } from '/static/js/common-script.js';

let selectRowIndex = 0;

export function loadUsersListEvent() {
    document.getElementById('open-form-add-user-btn').addEventListener('click', () => {
        document.getElementById('add-new-user-modal-container').classList.toggle('show');
    });
    document.getElementById('close-add-user-form-btn').addEventListener('click', () => {
        document.getElementById('add-new-user-modal-container').classList.toggle('show');
    });
    document.getElementById('add-new-user-btn').addEventListener('click', getNewUser);
    //add event listener for each button in row
    document.querySelectorAll('.row-edit-btn').forEach(element => {
        element.addEventListener('click', editSelectedUser);
    });
    document.getElementById('save-edit-user-btn').addEventListener('click', saveEditedUser);
    document.getElementById('close-edit-user-form-btn').addEventListener('click', () => {
        document.getElementById('edit-user-modal-container').classList.toggle('show');
    });
}

export function loadDataToUserTable(displayUsersList) {
    if (displayUsersList) {
        const table = document.getElementById('user-table-body');
        displayUsersList.forEach(element => {
            let content = `
                <tr class="user-row">
                    <td data-label="Họ Tên" class="align-left"><div class="inner-cell">${element.name}</div></td>
                    <td data-label="Email" class="align-left"><div class="inner-cell">${element.email}</div></td>
                    <td data-label="Mã số" class="align-center"><div class="inner-cell">${element.id}</div></td>
                    <td data-label="Số Điện Thoại" class="align-right"><div class="inner-cell">${element.phone}</div></td>
                    <td data-label="Vai trò" class="align-left"><div class="inner-cell">${element.role}</div></td>
                    <td data-label="Trạng Thái" class="${element.status} align-center"><div class="inner-cell"><span>${element.status}</span></div></td>
                    <td><button class="row-edit-btn"><i class="fa-solid fa-pen"></i></button></td>
                </tr>
            `;
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('user-row');
            table.appendChild(row);
        });
    }
}

function getNewUser() {
    let newUser = {};
    newUser.id = document.getElementById('user-id').value;
    newUser.name = document.getElementById('user-name').value;
    newUser.email = document.getElementById('user-email').value;
    newUser.password = document.getElementById('user-password').value;
    newUser.phone = document.getElementById('user-phone').value;
    newUser.role = document.getElementById('user-role').value;
    newUser.status = document.getElementById('user-status').value;
    addNewUser(newUser);
    loadDataToUserTable(users);
}

function editSelectedUser(event) {
    // Find the closest parent <tr> element and get the index
    selectRowIndex = event.target.closest('tr').rowIndex;
    console.log(selectRowIndex);
    if (selectRowIndex > 0) //index of row starts from 1
    {        
        //display Form
        document.getElementById('edit-user-modal-container').classList.toggle('show');
        //load current data into form
        document.getElementById('edit-user-id').value = users[selectRowIndex - 1].id;
        document.getElementById('edit-user-name').value = users[selectRowIndex - 1].name;
        document.getElementById('edit-user-email').value = users[selectRowIndex - 1].email;
        document.getElementById('edit-user-password').value = users[selectRowIndex - 1].password;
        document.getElementById('edit-user-phone').value = users[selectRowIndex - 1].phone;
        document.getElementById('edit-user-role').value = users[selectRowIndex - 1].role;
        document.getElementById('edit-user-status').value = users[selectRowIndex - 1].status;        
    }
}

function saveEditedUser() {
    console.log('saveEditedUser - selectRowIndex:', selectRowIndex);
    if (selectRowIndex > 0) {
        let editUser = users[selectRowIndex - 1];
        editUser.id = document.getElementById('edit-user-id').value;
        editUser.name = document.getElementById('edit-user-name').value;
        editUser.email = document.getElementById('edit-user-email').value;
        editUser.password = document.getElementById('edit-user-password').value;
        editUser.phone = document.getElementById('edit-user-phone').value;
        editUser.role = document.getElementById('edit-user-role').value;
        editUser.status = document.getElementById('edit-user-status').value;
        updateUserByIndex(selectRowIndex - 1, editUser);
        //reload table
        loadDataToUserTable(users);
    }
}