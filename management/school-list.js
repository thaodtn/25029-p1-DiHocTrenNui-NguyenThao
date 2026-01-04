import { sponsorStatusTranslated } from '/static/js/mock-data.js';
import {currentUser, relatedSchool, checkUserControl, addNewSchool, updateSchoolByIndex } from '/static/js/common-script.js';

let selectSchoolIndex = 0;

export function loadSchoolListEvent() {
    document.getElementById('open-form-add-school-btn').addEventListener('click', () => {
        document.getElementById('add-new-school-modal-container').classList.toggle('show');
    });
    document.getElementById('close-add-school-form-btn').addEventListener('click', () => {
        document.getElementById('add-new-school-modal-container').classList.toggle('show');
    });
    document.getElementById('add-new-school-btn').addEventListener('click', getNewSchool);
    document.getElementById('school-search-btn').addEventListener('click', searchSchoolByText);

    document.getElementById('save-edit-school-btn').addEventListener('click', saveEditedSchool);
    document.getElementById('close-edit-school-form-btn').addEventListener('click', () => {
        document.getElementById('edit-school-modal-container').classList.toggle('show');
    });
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
                    <td class="align-center"><button data-school-id="${element.id}" class="row-edit-btn ${rowEditBtn}"><i class="fa-solid fa-pen"></i></button></td>                        
                </tr>                
            `;
            //<td class="align-center"><button data-school-id="${element.id}" class="row-detail-btn"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button></td>
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('school-row');
            table.appendChild(row);
        });
        //add event listener for each button in row
        document.querySelectorAll('.row-edit-btn').forEach(element => {
            element.addEventListener('click', editSelectedSchool);
        });
    }
    else {
        console.log('displaySchoolList bị lỗi');
    }
}

export function getNewSchool() {
    let newSchool = {};
    newSchool.id = document.getElementById('school-id').value;
    newSchool.name = document.getElementById('school-name').value;
    newSchool.address = document.getElementById('school-address').value;
    newSchool.currentTeacher = document.getElementById('school-currentTeacher').value;
    
    newSchool.totalStudents = '0';
    console.log(newSchool);
    addNewSchool(newSchool);
    //reload table
    loadDataToSchoolTable(relatedSchool);
}

function searchSchoolByText() {
    const searchText = document.getElementById('school-input-search-text').value;
    // const selectedStatus = document.getElementById('search-school-status').value;
    const filteredSchool = relatedSchool.filter(({ id, name, address, currentTeacher }) => {
        if (id.includes(searchText) || name.includes(searchText) || address.includes(searchText) || currentTeacher.includes(searchText)) {
            // if (selectedStatus !== 'all') {
            //     return (status === selectedStatus);
            // }
            return true;
        }
        return false;
    })

    if (filteredSchool) {
        loadDataToSchoolTable(filteredSchool);
    }
}

function editSelectedSchool(event) {
    // Find the closest parent <tr> element and get the index
    const schoolId = event.target.closest('.row-edit-btn').dataset.schoolId;
    selectSchoolIndex = relatedSchool.findIndex(school => school.id === schoolId);
    console.log(schoolId);

    if (selectSchoolIndex === -1) {
        return; //do nothing
    }

    //display Form
    document.getElementById('edit-school-modal-container').classList.toggle('show');
    //load current data into form
    document.getElementById('edit-school-id').value = relatedSchool[selectSchoolIndex].id;
    document.getElementById('edit-school-name').value = relatedSchool[selectSchoolIndex].name;
    document.getElementById('edit-school-address').value = relatedSchool[selectSchoolIndex].address;
    document.getElementById('edit-school-currentTeacher').value = relatedSchool[selectSchoolIndex].currentTeacher;
}

function saveEditedSchool() {
    let editSchool = {...relatedSchool[selectSchoolIndex]};
    editSchool.id = document.getElementById('edit-school-id').value;
    editSchool.name = document.getElementById('edit-school-name').value;
    editSchool.address = document.getElementById('edit-school-address').value;
    editSchool.currentTeacher = document.getElementById('edit-school-currentTeacher').value;
    
    updateSchoolByIndex(selectSchoolIndex, editSchool);
    //reload table
    loadDataToSchoolTable(relatedSchool);
}