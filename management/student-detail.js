import { relatedStudents } from "/static/js/common-script.js";
import { studentStatusTranslated } from "/static/js/mock-data.js";
let selectStudentIndex = 0;

export function loadStudentDetail() {
    selectStudentIndex = JSON.parse(localStorage.getItem('selectStudentIndex'));
    if (selectStudentIndex >= relatedStudents.length) {
        return;
    }
    const selectStudent = relatedStudents[selectStudentIndex];
    console.log('selectStudent:', selectStudent);

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

    console.log('finish loadStudentDetail');

}
