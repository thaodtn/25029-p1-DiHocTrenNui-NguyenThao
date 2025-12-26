import {users, currentUser, addNewUser, updateUserByIndex } from '/static/js/common-script.js';

// let selectRowIndex = 0;
let selectUserIndex = 0;

export function loadUsersListEvent() {
    document.getElementById('open-form-add-user-btn').addEventListener('click', () => {
        document.getElementById('add-new-user-modal-container').classList.toggle('show');
    });
    document.getElementById('close-add-user-form-btn').addEventListener('click', () => {
        document.getElementById('add-new-user-modal-container').classList.toggle('show');
    });
    document.getElementById('add-new-user-btn').addEventListener('click', getNewUser);
    
    document.getElementById('save-edit-user-btn').addEventListener('click', saveEditedUser);
    document.getElementById('close-edit-user-form-btn').addEventListener('click', () => {
        document.getElementById('edit-user-modal-container').classList.toggle('show');
    });

    document.getElementById('userslist-search-btn').addEventListener('click', searchUserByText);
}

export function loadDataToUserTable(displayUsersList) {
    if (displayUsersList) {
        const table = document.getElementById('user-table-body');
        //clear table rows before loading new data
        table.innerHTML = '';
        displayUsersList.forEach(element => {
            let content = `
                <tr class="user-row">
                    <td data-label="Họ Tên" class="align-left"><div class="inner-cell">${element.name}</div></td>
                    <td data-label="Email" class="align-left"><div class="inner-cell">${element.email}</div></td>
                    <td data-label="Mã số" class="align-center"><div class="inner-cell">${element.id}</div></td>
                    <td data-label="Số Điện Thoại" class="align-right"><div class="inner-cell">${element.phone}</div></td>
                    <td data-label="Vai trò" class="align-left"><div class="inner-cell">${element.role}</div></td>
                    <td data-label="Trạng Thái" class="${element.status} align-center"><div class="inner-cell"><span>${element.status}</span></div></td>
                    <td><button data-user-id="${element.id}" class="row-edit-btn"><i class="fa-solid fa-pen"></i></button></td>
                </tr>
            `;
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('user-row');
            table.appendChild(row);
        });

        //add event listener for each button in row
        document.querySelectorAll('.row-edit-btn').forEach(element => {
            element.addEventListener('click', editSelectedUser);
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
    const userId = event.target.closest('.row-edit-btn').dataset.userId;
    selectUserIndex = users.findIndex(user => user.id === userId);

    if (selectUserIndex === -1) {
        return; //do nothing
    }

    //display Form
    document.getElementById('edit-user-modal-container').classList.toggle('show');
    //load current data into form
    document.getElementById('edit-user-id').value = users[selectUserIndex].id;
    document.getElementById('edit-user-name').value = users[selectUserIndex].name;
    document.getElementById('edit-user-email').value = users[selectUserIndex].email;
    document.getElementById('edit-user-password').value = users[selectUserIndex].password;
    document.getElementById('edit-user-phone').value = users[selectUserIndex].phone;
    document.getElementById('edit-user-role').value = users[selectUserIndex].role;
    document.getElementById('edit-user-status').value = users[selectUserIndex].status;
}

function saveEditedUser() {
    console.log('saveEditedUser - selectUserIndex:', selectUserIndex);
    let editUser = users[selectUserIndex];
    editUser.id = document.getElementById('edit-user-id').value;
    editUser.name = document.getElementById('edit-user-name').value;
    editUser.email = document.getElementById('edit-user-email').value;
    editUser.password = document.getElementById('edit-user-password').value;
    editUser.phone = document.getElementById('edit-user-phone').value;
    editUser.role = document.getElementById('edit-user-role').value;
    editUser.status = document.getElementById('edit-user-status').value;
    updateUserByIndex(selectUserIndex, editUser);
    //reload table
    loadDataToUserTable(users);
}

function searchUserByText() {
    const searchText = document.getElementById('input-search-text').value;
    const selectedRole = document.getElementById('search-user-role').value;
    const filteredUsers = users.filter(({id, name, email, phone, status, role}) => {
        if (id.includes(searchText) || name.includes(searchText) || email.includes(searchText) || phone.includes(searchText) || status.includes(searchText)) {
            if (selectedRole !== 'all') {
                return (role === selectedRole);
            }
            return true;
        }
        return false;
    })

    if (filteredUsers) {
        loadDataToUserTable(filteredUsers);
    }
}