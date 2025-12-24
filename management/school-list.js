import { sponsorStatusTranslated } from '/static/js/mock-data.js';
import {currentUser, relatedSchool, checkUserControl } from '/static/js/common-script.js';

export function loadSchoolListEvent() {
    
}
export function loadDataToSchoolTable(displaySchoolList) {
    console.log(displaySchoolList);
    if (displaySchoolList) {
        const table = document.getElementById('school-table-body');
        let rowEditBtn = '';
        if (checkUserControl(currentUser.id, 'editSchool') === false) {
            rowEditBtn = 'hidden-btn';
        }
        displaySchoolList.forEach(element => {
            let content = `
                <tr class="school-row">
                    <td data-label="Mã Số" class="align-center"><div class="inner-cell">${element.id}</div></td>
                    <td data-label="Tên Trường" class="align-left"><div class="inner-cell">${element.name}</div></td>
                    <td data-label="Địa Chỉ" class="align-left"><div class="inner-cell">${element.address}</div></td>
                    <td data-label="Số HS đang hỗ trợ" class="align-center"><div class="inner-cell">${element.totalStudents}</div></td>                    
                    <td data-label="GV Phụ Trách" class="align-left"><div class="inner-cell">${element.currentTeacher}</div></td>
                    <td data-label="Trạng Thái" class="${sponsorStatusTranslated[element.status]} align-center"><div class="inner-cell"><span>${element.status}</span></div></td>                    
                    <td data-label="Ghi Chú" class="align-left"><div class="inner-cell">${element.remark}</div></td>
                    <td><button class="row-edit-btn ${rowEditBtn}"><i class="fa-solid fa-pen"></i></button></td>                    
                </tr>                
            `;
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('school-row');
            table.appendChild(row);
        });
    }
    else {
        console.log('displaySchoolList bị lỗi');
    }
}