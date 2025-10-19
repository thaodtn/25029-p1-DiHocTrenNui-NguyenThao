import {users, currentUser } from '/static/js/common-script.js';

export function loadDataToUserTable() {
    if (users) {
        const table = document.getElementById('user-table');
        users.forEach(element => {
            let content = `
                <tr class="user-row">
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.phone}</td>
                    <td>${element.id}</td>
                    <td>${element.role}</td>
                    <button class="edit-user-btn">Edit</button>
                </tr>
            `;
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('user-row');
            table.appendChild(row);
        });
    }
}