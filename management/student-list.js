import { studentStatusTranslated } from '/static/js/mock-data.js';
import {currentUser, students } from '/static/js/common-script.js';

export function loadStudentListEvent() {
    
}

export function loadDataToStudentTable(displayStudentList) {
    if (displayStudentList) {
        const table = document.getElementById('student-table-body');
        displayStudentList.forEach(element => {
            let content = `
                <tr class="student-row">
                    <td data-label="Mã Số" class="align-center">${element.id}</td>
                    <td data-label="Họ Tên" class="align-left">${element.name}</td>
                    <td data-label="Trạng Thái" class="${studentStatusTranslated[element.status]} align-center"><span>${element.status}</span></td>
                    <td data-label="Ngày Sinh" class="align-right">${element.birthday}</td>
                    <td data-label="Địa Chỉ" class="align-left">${element.address}</td>
                    <td data-label="Dân Tộc" class="align-left">${element.people}</td>
                    <td data-label="Hoàn Cảnh" class="align-left">${element.situation}</td>
                    <td data-label="Trường" class="align-left">${element.currentSchool}</td>
                    <td data-label="Lớp" class="align-center">${element.currentClass}</td>
                    <td data-label="Giáo Viên Phụ Trách" class="align-left">${element.currentTeacher}</td>
                    <td data-label="Giáo Viên Giới Thiệu" class="align-left">${element.recommender}</td>
                    <td data-label="Ngày Bắt Đầu" class="align-right">${element.startDate}</td>
                    <td data-label="Ngày Kết Thúc" class="align-right">${element.endDate}</td>
                    <td data-label="Người Hỗ Trợ" class="align-left">${element.currentSponsor}</td>
                    <td data-label="Người Phụ Trách" class="align-left">${element.currentVolunteer}</td>
                    <td data-label="Học Bổng Lũy Kế" class="align-right">${element.funds}</td>
                    <td data-label="Số Dư" class="align-right">${element.balance}</td>
                    <td data-label="Ghi Chú" class="align-left">${element.remark}</td>
                    <td><button class="row-edit-btn"><i class="fa-solid fa-pen"></i></button></td>                    
                </tr>                
            `;
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('student-row');
            table.appendChild(row);
        });
    }
}

        
