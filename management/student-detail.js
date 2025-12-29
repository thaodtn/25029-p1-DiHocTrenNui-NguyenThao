import { relatedStudents, updateStudentByIndex, checkUserControl, currentUser } from "/static/js/common-script.js";
import { studentStatusTranslated, originalImages } from "/static/js/mock-data.js";
let selectStudentIndex = 0;
let selectStudent = {};
let imageList = [];

export function loadStudentDetailEvent() {
    document.getElementById('display-hidden-student-detail-btn').addEventListener('click', toggleViewAllDetails);
    document.getElementById('edit-student-detail-btn').addEventListener('click', editAllDetails);
    document.getElementById('save-student-detail-btn').addEventListener('click', saveAllDetails);
    document.getElementById('cancel-edit-student-detail-btn').addEventListener('click', restoreAllDetails);
    
}

export function loadStudentDetail() {
    selectStudentIndex = JSON.parse(localStorage.getItem('selectStudentIndex'));
    if (selectStudentIndex >= relatedStudents.length) {
        return;
    }
    selectStudent = relatedStudents[selectStudentIndex];

    if (checkUserControl(currentUser.id, 'editStudent') === false) {
        document.getElementById('edit-student-detail-btn').style.display = 'none';
    }

    // information to display   
    document.getElementById('student-id').value = selectStudent.id;
    document.getElementById('student-name').value = selectStudent.name;
    document.getElementById('student-birthday').value = selectStudent.birthday;
    document.getElementById('student-address').value = selectStudent.address;
    document.getElementById('student-sponsor').value = selectStudent.currentSponsor;
    document.getElementById('student-status').value = selectStudent.status;        
    document.getElementById('student-people').value = selectStudent.people;
    document.getElementById('student-situation').value = selectStudent.situation;
    document.getElementById('student-recommender').value = selectStudent.recommender;
    document.getElementById('student-startDate').value = selectStudent.startDate;
    document.getElementById('student-endDate').value = selectStudent.endDate;
    document.getElementById('student-balance').value = selectStudent.balance;
    document.getElementById('student-currentClass').value = selectStudent.currentClass;
    document.getElementById('student-currentSchool').value = selectStudent.currentSchool;
    document.getElementById('student-currentTeacher').value = selectStudent.currentTeacher;
    document.getElementById('student-currentVolunteer').value = selectStudent.currentVolunteer;
    document.getElementById('student-remark').value = selectStudent.remark;

    // load images
    imageList = originalImages.filter(img => img.studentId === selectStudent.id);
    console.log(imageList);

    const container = document.getElementById('images-container');
    imageList.forEach(img => {
        //check new image exist in local storage or not
        let storedImage = localStorage.getItem(`image_${img.studentId}_${img.month}`);
        if (!storedImage) {
            storedImage = img.imageSrc;
        }
        //create <form> of the month
        let newForm = document.createElement('form');
        const formContent = `
            <form>
                <h4>Tháng ${img.month}</h4>
                <input data-month="${img.month}" type="file" id=${img.month} hidden />
                <div class="image-inner-card"><img id="file-chosen-${img.month}" src=${storedImage} alt="Chưa có hình trao quà" ></div>
                <label for=${img.month} class="submit-button"><i class="fa-solid fa-cloud-arrow-up fa-lg"></i>  Cập nhật</label>
            </form>
        `;
        newForm.innerHTML = formContent;
        newForm.classList.add("image-card");
        container.appendChild(newForm);
        document.getElementById(img.month).addEventListener('change', getImageInput);
    })


    console.log('finish loadStudentDetail');

}

function toggleViewAllDetails() {
    const btn = document.getElementById('display-hidden-student-detail-btn');
    if (btn.innerText.includes('Xem thêm')) {
        btn.innerHTML = `<i class="fa fa-caret-square-o-up fa-lg"></i>  Ẩn chi tiết`;
        document.getElementById('student-detail-hidden-content').style.display = 'flex';
    } else {
        btn.innerHTML = `<i class="fa fa-caret-square-o-down fa-lg"></i>  Xem thêm`;
        document.getElementById('student-detail-hidden-content').style.display = 'none';
    }
}

function editAllDetails() {
    //show all details
    document.getElementById('student-detail-hidden-content').style.display = 'flex';
    const inputs = document.getElementById('student-detail-form-container').querySelectorAll('input');
    const selects = document.getElementById('student-detail-form-container').querySelectorAll('select');
    const textareas = document.getElementById('student-detail-form-container').querySelectorAll('textarea');

    inputs.forEach(input => (input.disabled = false));
    selects.forEach(select => (select.disabled = false));
    textareas.forEach(text => (text.disabled = false));

    document.getElementById('save-student-detail-btn').style.display = 'block';
    document.getElementById('cancel-edit-student-detail-btn').style.display = 'block';
    document.getElementById('edit-student-detail-btn').style.display = 'none';
    document.getElementById('display-hidden-student-detail-btn').style.display = 'none';

}

function saveAllDetails() {
    let editStudent = relatedStudents[selectStudentIndex];

    editStudent.id = document.getElementById('student-id').value;
    editStudent.name = document.getElementById('student-name').value;
    editStudent.birthday = document.getElementById('student-birthday').value;
    editStudent.address = document.getElementById('student-address').value;
    editStudent.currentSponsor = document.getElementById('student-sponsor').value;
    editStudent.status = document.getElementById('student-status').value;
    
    editStudent.people = document.getElementById('student-people').value;
    editStudent.situation = document.getElementById('student-situation').value;
    editStudent.recommender = document.getElementById('student-recommender').value;
    editStudent.startDate = document.getElementById('student-startDate').value;
    editStudent.endDate = document.getElementById('student-endDate').value;
    editStudent.funds = document.getElementById('student-funds').value;
    editStudent.balance = document.getElementById('student-balance').value;
    editStudent.remark = document.getElementById('student-remark').value;
    editStudent.currentClass = document.getElementById('student-currentClass').value;
    editStudent.currentSchool = document.getElementById('student-currentSchool').value;
    editStudent.currentVolunteer = document.getElementById('student-currentVolunteer').value;
    editStudent.currentTeacher = document.getElementById('student-currentTeacher').value;

    updateStudentByIndex(selectStudentIndex, editStudent);

    //hide details
    document.getElementById('student-detail-hidden-content').style.display = 'none';
    const inputs = document.getElementById('student-detail-form-container').querySelectorAll('input');
    const selects = document.getElementById('student-detail-form-container').querySelectorAll('select');
    const textareas = document.getElementById('student-detail-form-container').querySelectorAll('textarea');

    inputs.forEach(input => (input.disabled = true));
    selects.forEach(select => (select.disabled = true));
    textareas.forEach(text => (text.disabled = true));


    document.getElementById('save-student-detail-btn').style.display = 'none';
    document.getElementById('cancel-edit-student-detail-btn').style.display = 'none';
    document.getElementById('edit-student-detail-btn').style.display = 'block';
    document.getElementById('display-hidden-student-detail-btn').style.display = 'block';
}

function restoreAllDetails() {
    //reload detail
    document.getElementById('student-id').value = selectStudent.id;
    document.getElementById('student-name').value = selectStudent.name;
    document.getElementById('student-birthday').value = selectStudent.birthday;
    document.getElementById('student-address').value = selectStudent.address;
    document.getElementById('student-sponsor').value = selectStudent.currentSponsor;
    document.getElementById('student-status').value = selectStudent.status;        
    document.getElementById('student-people').value = selectStudent.people;
    document.getElementById('student-situation').value = selectStudent.situation;
    document.getElementById('student-recommender').value = selectStudent.recommender;
    document.getElementById('student-startDate').value = selectStudent.startDate;
    document.getElementById('student-endDate').value = selectStudent.endDate;
    document.getElementById('student-balance').value = selectStudent.balance;
    document.getElementById('student-currentClass').value = selectStudent.currentClass;
    document.getElementById('student-currentSchool').value = selectStudent.currentSchool;
    document.getElementById('student-currentTeacher').value = selectStudent.currentTeacher;
    document.getElementById('student-currentVolunteer').value = selectStudent.currentVolunteer;
    document.getElementById('student-remark').value = selectStudent.remark;

    //hide details
    document.getElementById('student-detail-hidden-content').style.display = 'none';
    const inputs = document.getElementById('student-detail-form-container').querySelectorAll('input');
    const selects = document.getElementById('student-detail-form-container').querySelectorAll('select');
    const textareas = document.getElementById('student-detail-form-container').querySelectorAll('textarea');

    inputs.forEach(input => (input.disabled = true));
    selects.forEach(select => (select.disabled = true));
    textareas.forEach(text => (text.disabled = true));


    document.getElementById('save-student-detail-btn').style.display = 'none';
    document.getElementById('cancel-edit-student-detail-btn').style.display = 'none';
    document.getElementById('edit-student-detail-btn').style.display = 'block';
    document.getElementById('display-hidden-student-detail-btn').style.display = 'block';
}

function getImageInput(event) {
    const file = event.target.files[0];
    if (!file) return; //kiểm tra nếu người dùng bấm cancel

    const selectedMonth = event.target.dataset.month;
    const reader = new FileReader();
    reader.onloadend = () => {
        const fullBase64String = reader.result;
        //store into Local Storage with name: studentId + month
        localStorage.setItem(`image_${selectStudent.id}_${selectedMonth}`, fullBase64String);
        
        //display new image
        document.getElementById('file-chosen-' + selectedMonth).src = fullBase64String;
        console.log('Đã lưu và hiển thị ảnh thành công');
    }
    reader.readAsDataURL(file);
}