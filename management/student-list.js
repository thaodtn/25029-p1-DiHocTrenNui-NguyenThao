import { studentStatusTranslated } from '/static/js/mock-data.js';
import { currentUser, addNewStudent, updateStudentByIndex, relatedStudents, checkUserControl, formatNumber } from '/static/js/common-script.js';

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
                    <td data-label="Mã Số" class="align-center"><div class="inner-cell">${element.id}</div></td>
                    <td data-label="Họ Tên" class="align-left"><div class="inner-cell">${element.name}</div></td>                    
                    <td data-label="Trạng Thái" class="${element.status} align-center"><div class="inner-cell"><span>${studentStatusTranslated[element.status]}</span></div></td>
                    <td data-label="Ngày Sinh" class="align-right"><div class="inner-cell">${element.birthday}</div></td>
                    <td data-label="Địa Chỉ" class="align-left"><div class="inner-cell">${element.address}</div></td>
                    <td data-label="Người Hỗ Trợ" class="align-left"><div class="inner-cell">${element.currentSponsor}</div></td>
                    <td data-label="Số Dư" class="align-right"><div class="inner-cell">${formatNumber(element.balance)}</div></td>
                    <td class="align-center"><button data-student-id="${element.id}" class="row-detail-btn"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button></td>                    
                </tr>                
            `;
            
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('student-row');
            table.appendChild(row);
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


function searchStudentByText() {
    const searchText = document.getElementById('student-input-search-text').value;
    const selectedStatus = document.getElementById('search-student-status').value;
    const filteredStudents = relatedStudents.filter(({ id, name, address, currentSponsor, status }) => {
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