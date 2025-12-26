import { studentStatusTranslated } from '/static/js/mock-data.js';
import {currentUser, addNewStudent, updateStudentByIndex, relatedStudents, checkUserControl } from '/static/js/common-script.js';

// let selectRowIndex = 0;
let selectStudentIndex = 0;

export function loadStudentListEvent() {
    document.getElementById('open-form-add-student-btn').addEventListener('click', () => {
        document.getElementById('add-new-student-modal-container').classList.toggle('show');
    });
    document.getElementById('close-add-student-form-btn').addEventListener('click', () => {
        document.getElementById('add-new-student-modal-container').classList.toggle('show');
    });
    document.getElementById('add-new-student-btn').addEventListener('click', getNewStudent);

    //add event listener for each button in row
    // document.querySelectorAll('.row-edit-btn').forEach(element => {
    //     element.addEventListener('click', editSelectedStudent);
    // });

    document.getElementById('save-edit-student-btn').addEventListener('click', saveEditedStudent);
    document.getElementById('close-edit-student-form-btn').addEventListener('click', () => {
        document.getElementById('edit-student-modal-container').classList.toggle('show');
    });

    document.getElementById('student-search-btn').addEventListener('click', searchStudentByText);
    
}

export function loadDataToStudentTable(displayStudentList) {
    if (displayStudentList) {
        const table = document.getElementById('student-table-body');
        //clear table rows before loading new data
        table.innerHTML = '';
        let rowEditBtn = '';
        if (checkUserControl(currentUser.id, 'editStudent') === false) {
            rowEditBtn = 'hidden-btn';
        }
        displayStudentList.forEach(element => {
            let content = `
                <tr class="student-row">
                    <td class="align-center"><button data-student-id="${element.id}" class="row-detail-btn"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button></td>                    
                    <td data-label="Mã Số" class="align-center"><div class="inner-cell">${element.id}</div></td>
                    <td data-label="Họ Tên" class="align-left"><div class="inner-cell">${element.name}</div></td>                    
                    <td data-label="Trạng Thái" class="${element.status} align-center"><div class="inner-cell"><span>${studentStatusTranslated[element.status]}</span></div></td>
                    <td data-label="Ngày Sinh" class="align-right"><div class="inner-cell">${element.birthday}</div></td>
                    <td data-label="Địa Chỉ" class="align-left"><div class="inner-cell">${element.address}</div></td>
                    <td data-label="Người Hỗ Trợ" class="align-left"><div class="inner-cell">${element.currentSponsor}</div></td>
                    <td data-label="Số Dư" class="align-right"><div class="inner-cell">${element.balance}</div></td>
                    <td><button data-student-id="${element.id}" class="row-edit-btn ${rowEditBtn}"><i class="fa-solid fa-pen"></i></button></td>
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
                    //<td data-label="Trạng Thái" class="${studentStatusTranslated[element.status]} align-center"><div class="inner-cell"><span>${element.status}</span></div></td>
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('student-row');
            table.appendChild(row);
        });

        //add event listener for each Edit button in row
        document.querySelectorAll('.row-edit-btn').forEach(element => {
            element.addEventListener('click', editSelectedStudent);
        });

        //add event listener for each Detail button in row
        document.querySelectorAll('.row-detail-btn').forEach(element => {
            element.addEventListener('click', openStudentDetail);
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
    // selectRowIndex = event.target.closest('tr').rowIndex;
    console.log(event.target.closest('.row-edit-btn'));
    console.log("event.target.dataset.studentId:", event.target.closest('.row-edit-btn').dataset.studentId);

    const studentId = event.target.closest('.row-edit-btn').dataset.studentId;
    selectStudentIndex = relatedStudents.findIndex(student => student.id === studentId);

    if (selectStudentIndex === -1) {
        return; //do nothing
    }

    console.log("selectStudentIndex:",selectStudentIndex);

    //display Form
    document.getElementById('edit-student-modal-container').classList.toggle('show');
    //load current data into form
    document.getElementById('edit-student-id').value = relatedStudents[selectStudentIndex].id;
    document.getElementById('edit-student-name').value = relatedStudents[selectStudentIndex].name;
    document.getElementById('edit-student-birthday').value = relatedStudents[selectStudentIndex].birthday;
    document.getElementById('edit-student-address').value = relatedStudents[selectStudentIndex].address;
    document.getElementById('edit-student-sponsor').value = relatedStudents[selectStudentIndex].currentSponsor;
    document.getElementById('edit-student-status').value = relatedStudents[selectStudentIndex].status;        
    document.getElementById('edit-student-people').value = relatedStudents[selectStudentIndex].people;
    document.getElementById('edit-student-situation').value = relatedStudents[selectStudentIndex].situation;
    document.getElementById('edit-student-recommender').value = relatedStudents[selectStudentIndex].recommender;
    document.getElementById('edit-student-startDate').value = relatedStudents[selectStudentIndex].startDate;
    document.getElementById('edit-student-endDate').value = relatedStudents[selectStudentIndex].endDate;
    document.getElementById('edit-student-balance').value = relatedStudents[selectStudentIndex].balance;
    document.getElementById('edit-student-currentClass').value = relatedStudents[selectStudentIndex].currentClass;
    document.getElementById('edit-student-currentSchool').value = relatedStudents[selectStudentIndex].currentSchool;
    document.getElementById('edit-student-currentTeacher').value = relatedStudents[selectStudentIndex].currentTeacher;
    document.getElementById('edit-student-currentVolunteer').value = relatedStudents[selectStudentIndex].currentVolunteer;
    document.getElementById('edit-student-remark').value = relatedStudents[selectStudentIndex].remark;

}

function saveEditedStudent() {
    let editStudent = relatedStudents[selectStudentIndex];

    editStudent.id = document.getElementById('edit-student-id').value;
    editStudent.name = document.getElementById('edit-student-name').value;
    editStudent.birthday = document.getElementById('edit-student-birthday').value;
    editStudent.address = document.getElementById('edit-student-address').value;
    editStudent.currentSponsor = document.getElementById('edit-student-sponsor').value;
    editStudent.status = document.getElementById('edit-student-status').value;
    
    editStudent.people = document.getElementById('edit-student-people').value;
    editStudent.situation = document.getElementById('edit-student-situation').value;
    editStudent.recommender = document.getElementById('edit-student-recommender').value;
    editStudent.startDate = document.getElementById('edit-student-startDate').value;
    editStudent.endDate = document.getElementById('edit-student-endDate').value;
    editStudent.funds = document.getElementById('edit-student-funds').value;
    editStudent.balance = document.getElementById('edit-student-balance').value;
    editStudent.remark = document.getElementById('edit-student-remark').value;
    editStudent.currentClass = document.getElementById('edit-student-currentClass').value;
    editStudent.currentSchool = document.getElementById('edit-student-currentSchool').value;
    editStudent.currentVolunteer = document.getElementById('edit-student-currentVolunteer').value;
    editStudent.currentTeacher = document.getElementById('edit-student-currentTeacher').value;

    updateStudentByIndex(selectStudentIndex, editStudent);
    //reload table
    loadDataToStudentTable(relatedStudents);
    
}


function searchStudentByText() {
    const searchText = document.getElementById('student-input-search-text').value;
    const selectedStatus = document.getElementById('search-student-status').value;
    const filteredStudents = relatedStudents.filter(({id, name, address, currentSponsor, status}) => {
        if (id.includes(searchText) || name.includes(searchText) || address.includes(searchText) || currentSponsor.includes(searchText)) {
            if (selectedStatus !== 'all') {
                return (status === selectedStatus);
            }
            return true;
        }
        return false;
    })

    if (filteredStudents) {
        loadDataToStudentTable(filteredStudents);
    }
}

function openStudentDetail(event) {
    const studentId = event.target.closest('.row-detail-btn').dataset.studentId;
    selectStudentIndex = relatedStudents.findIndex(student => student.id === studentId);
    if (selectStudentIndex !== -1) {
        //save selectStudentIndex to Local storage
        localStorage.setItem('selectStudentIndex', JSON.stringify(selectStudentIndex));
        window.location.href = '/management/student-detail.html';
    }
}