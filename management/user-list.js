import {users, currentUser } from '/static/js/common-script.js';

export function loadDataToUserTable() {
    if (users) {
        const table = document.getElementById('user-table-body');
        users.forEach(element => {
            let content = `
                <tr class="user-row">
                    <td data-label="Họ Tên">${element.name}</td>
                    <td data-label="Email">${element.email}</td>
                    <td data-label="Số Điện Thoại">${element.phone}</td>
                    <td data-label="Mã số">${element.id}</td>
                    <td data-label="Vai trò">${element.role}</td>
                    <td><button class="edit-user-btn">Sửa</button></td>
                </tr>
            `;
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('user-row');
            table.appendChild(row);
        });
    }
}