import { studentStatusTranslated } from '/static/js/mock-data.js';
import {currentUser, addNewStudent, relatedStudents, checkUserControl } from '/static/js/common-script.js';

let selectRowIndex = 0;

export function loadStudentListEvent() {
    document.getElementById('open-form-add-student-btn').addEventListener('click', () => {
        document.getElementById('add-new-student-modal-container').classList.toggle('show');
    });
    document.getElementById('close-add-student-form-btn').addEventListener('click', () => {
        document.getElementById('add-new-student-modal-container').classList.toggle('show');
    });
    document.getElementById('add-new-student-btn').addEventListener('click', getNewStudent);
    //add event listener for each button in row
    document.querySelectorAll('.row-edit-btn').forEach(element => {
        element.addEventListener('click', editSelectedStudent);
    });
    document.getElementById('save-edit-student-btn').addEventListener('click', saveEditedStudent);
    document.getElementById('close-edit-student-form-btn').addEventListener('click', () => {
        document.getElementById('edit-student-modal-container').classList.toggle('show');
    });
    
}

export function loadDataToStudentTable(displayStudentList) {
    if (displayStudentList) {
        const table = document.getElementById('student-table-body');
        let rowEditBtn = '';
        if (checkUserControl(currentUser.id, 'editStudent') === false) {
            rowEditBtn = 'hidden-btn';
        }
        displayStudentList.forEach(element => {
            let content = `
                <tr class="student-row">
                    <td class="align-center"><button class="row-edit-btn ${rowEditBtn}"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button></td>                    
                    <td data-label="Mã Số" class="align-center"><div class="inner-cell">${element.id}</div></td>
                    <td data-label="Họ Tên" class="align-left"><div class="inner-cell">${element.name}</div></td>
                    <td data-label="Trạng Thái" class="${studentStatusTranslated[element.status]} align-center"><div class="inner-cell"><span>${element.status}</span></div></td>
                    <td data-label="Ngày Sinh" class="align-right"><div class="inner-cell">${element.birthday}</div></td>
                    <td data-label="Địa Chỉ" class="align-left"><div class="inner-cell">${element.address}</div></td>
                    <td data-label="Người Hỗ Trợ" class="align-left"><div class="inner-cell">${element.currentSponsor}</div></td>
                    <td data-label="Số Dư" class="align-right"><div class="inner-cell">${element.balance}</div></td>
                    <td><button class="row-edit-btn"><i class="fa-solid fa-pen"></i></button></td>
                </tr>                
                `;
                    // <td data-label="Dân Tộc" class="align-left"><div class="inner-cell">${element.people}</div></td>
                    // <td data-label="Hoàn Cảnh" class="align-left"><div class="inner-cell">${element.situation}</div></td>
                    // <td data-label="Trường" class="align-left"><div class="inner-cell">${element.currentSchool}</div></td>
                    // <td data-label="Lớp" class="align-center"><div class="inner-cell">${element.currentClass}</div></td>
                    // <td data-label="Giáo Viên Phụ Trách" class="align-left"><div class="inner-cell">${element.currentTeacher}</div></td>
                    // <td data-label="Giáo Viên Giới Thiệu" class="align-left"><div class="inner-cell">${element.recommender}</div></td>
                    // <td data-label="Người Phụ Trách" class="align-left"><div class="inner-cell">${element.currentVolunteer}</div></td>
                    // <td data-label="Học Bổng Lũy Kế" class="align-right"><div class="inner-cell">${element.funds}</div></td>
                    // <td data-label="Ngày Bắt Đầu" class="align-right"><div class="inner-cell">${element.startDate}</div></td>
                    // <td data-label="Ngày Kết Thúc" class="align-right"><div class="inner-cell">${element.endDate}</div></td>
                    // <td data-label="Ghi Chú" class="align-left"><div class="inner-cell">${element.remark}</div></td>
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('student-row');
            table.appendChild(row);
        });
    }
}

        

function getNewStudent() {
    let newStudent = {};
    newStudent.id = document.getElementById('student-id').value;
    newStudent.name = document.getElementById('student-name').value;
    newStudent.birthday = document.getElementById('student-birthday').value;
    newStudent.address = document.getElementById('student-address').value;
    newStudent.currentSponsor = document.getElementById('student-sponsor').value;
    newStudent.status = document.getElementById('student-status').value;
    
    newStudent.people = '';
    newStudent.situation = '';
    newStudent.recommender = '';
    newStudent.startDate = '';
    newStudent.endDate = '';
    newStudent.funds = '0';
    newStudent.balance = '0';
    newStudent.remark = '';
    newStudent.currentClass = '';
    newStudent.currentSchool = '';
    newStudent.currentVolunteer = '';
    newStudent.currentTeacher = '';

    addNewStudent(newStudent);
    //reload table
    loadDataToStudentTable(relatedStudents);
}

function editSelectedStudent(event) {
    // Find the closest parent <tr> element and get the index
    selectRowIndex = event.target.closest('tr').rowIndex;
    console.log(selectRowIndex);
    if (selectRowIndex > 0) //index of row starts from 1
    {        
        //display Form
        document.getElementById('edit-student-modal-container').classList.toggle('show');
        //load current data into form
        document.getElementById('edit-student-id').value = relatedStudents[selectRowIndex - 1].id;
        document.getElementById('edit-student-name').value = relatedStudents[selectRowIndex - 1].name;
        document.getElementById('edit-student-birthday').value = relatedStudents[selectRowIndex - 1].birthday;
        document.getElementById('edit-student-address').value = relatedStudents[selectRowIndex - 1].address;
        document.getElementById('edit-student-sponsor').value = relatedStudents[selectRowIndex - 1].currentSponsor;
        document.getElementById('edit-student-status').value = relatedStudents[selectRowIndex - 1].status;        
        document.getElementById('edit-student-people').value = relatedStudents[selectRowIndex - 1].people;
        document.getElementById('edit-student-situation').value = relatedStudents[selectRowIndex - 1].situation;
        document.getElementById('edit-student-recommender').value = relatedStudents[selectRowIndex - 1].recommender;
        document.getElementById('edit-student-startDate').value = relatedStudents[selectRowIndex - 1].startDate;
        document.getElementById('edit-student-endDate').value = relatedStudents[selectRowIndex - 1].endDate;
        document.getElementById('edit-student-balance').value = relatedStudents[selectRowIndex - 1].balance;
        document.getElementById('edit-student-currentClass').value = relatedStudents[selectRowIndex - 1].currentClass;
        document.getElementById('edit-student-currentSchool').value = relatedStudents[selectRowIndex - 1].currentSchool;
        document.getElementById('edit-student-currentTeacher').value = relatedStudents[selectRowIndex - 1].currentTeacher;
        document.getElementById('edit-student-currentVolunteer').value = relatedStudents[selectRowIndex - 1].currentVolunteer;
        document.getElementById('edit-student-remark').value = relatedStudents[selectRowIndex - 1].remark;
    }
}

function saveEditedStudent() {
    
}