import { relatedSponsors, checkUserControl, currentUser, updateSponsorByIndex } from "/static/js/common-script.js";
import { } from "/static/js/mock-data.js";
let selectSponsorIndex = 0;
let selectSponsor = {};

export function loadSponsorDetailEvent() {
    document.getElementById('edit-sponsor-detail-btn').addEventListener('click', editAllDetails);
    document.getElementById('save-sponsor-detail-btn').addEventListener('click', saveAllDetails);
    document.getElementById('cancel-edit-sponsor-detail-btn').addEventListener('click', restoreAllDetails);
    
}

export function loadSponsorDetail() {
    selectSponsorIndex = JSON.parse(localStorage.getItem('selectSponsorIndex'));
    if (selectSponsorIndex >= relatedSponsors.length) {
        return;
    }
    selectSponsor = relatedSponsors[selectSponsorIndex];

    if (checkUserControl(currentUser.id, 'editSponsor') === false) {
        document.getElementById('edit-sponsor-detail-btn').style.display = 'none';
    }

    // information to display   
    document.getElementById('sponsor-id').value = selectSponsor.id;
    document.getElementById('sponsor-name').value = selectSponsor.name;
    document.getElementById('sponsor-contact').value = selectSponsor.contact;
    document.getElementById('sponsor-status').value = selectSponsor.status;
    document.getElementById('sponsor-totalStudents').value = selectSponsor.totalStudents;
    document.getElementById('sponsor-detailStudents').value = selectSponsor.detailStudents;
    document.getElementById('sponsor-startDate').value = selectSponsor.startDate;
    document.getElementById('sponsor-endDate').value = selectSponsor.endDate;
    document.getElementById('sponsor-currentVolunteer').value = selectSponsor.currentVolunteer;
    document.getElementById('sponsor-totalDeposit').value = selectSponsor.totalDeposit;
    document.getElementById('sponsor-balance').value = selectSponsor.balance;
    document.getElementById('sponsor-remark').value = selectSponsor.remark;

    console.log('finish loadSponsorDetail');

}

function editAllDetails() {
    //show all details
    const inputs = document.getElementById('sponsor-detail-form-container').querySelectorAll('input');
    const selects = document.getElementById('sponsor-detail-form-container').querySelectorAll('select');

    inputs.forEach(input => (input.disabled = false));
    selects.forEach(select => (select.disabled = false));

    document.getElementById('save-sponsor-detail-btn').style.display = 'block';
    document.getElementById('cancel-edit-sponsor-detail-btn').style.display = 'block';
    document.getElementById('edit-sponsor-detail-btn').style.display = 'none';
}

function saveAllDetails() {
    let editSponsor = relatedSponsors[selectSponsorIndex];
    
    editSponsor.id = document.getElementById('sponsor-id').value;
    editSponsor.name = document.getElementById('sponsor-name').value;
    editSponsor.contact = document.getElementById('sponsor-contact').value;
    editSponsor.status = document.getElementById('sponsor-status').value;
    editSponsor.totalStudents = document.getElementById('sponsor-totalStudents').value;
    editSponsor.detailStudents = document.getElementById('sponsor-detailStudents').value;
    editSponsor.startDate = document.getElementById('sponsor-startDate').value;
    editSponsor.endDate = document.getElementById('sponsor-endDate').value;
    editSponsor.currentVolunteer = document.getElementById('sponsor-currentVolunteer').value;
    editSponsor.totalDeposit = document.getElementById('sponsor-totalDeposit').value;
    editSponsor.balance = document.getElementById('sponsor-balance').value;
    editSponsor.remark = document.getElementById('sponsor-remark').value;

    updateSponsorByIndex(selectSponsorIndex, editSponsor);

    const inputs = document.getElementById('sponsor-detail-form-container').querySelectorAll('input');
    const selects = document.getElementById('sponsor-detail-form-container').querySelectorAll('select');

    inputs.forEach(input => (input.disabled = true));
    selects.forEach(select => (select.disabled = true));


    document.getElementById('save-sponsor-detail-btn').style.display = 'none';
    document.getElementById('cancel-edit-sponsor-detail-btn').style.display = 'none';
    document.getElementById('edit-sponsor-detail-btn').style.display = 'block';
}

function restoreAllDetails() {
    //reload detail
    document.getElementById('sponsor-id').value = selectSponsor.id;
    document.getElementById('sponsor-name').value = selectSponsor.name;
    document.getElementById('sponsor-contact').value = selectSponsor.contact;
    document.getElementById('sponsor-status').value = selectSponsor.status;
    document.getElementById('sponsor-totalStudents').value = selectSponsor.totalStudents;
    document.getElementById('sponsor-detailStudents').value = selectSponsor.detailStudents;
    document.getElementById('sponsor-startDate').value = selectSponsor.startDate;
    document.getElementById('sponsor-endDate').value = selectSponsor.endDate;
    document.getElementById('sponsor-currentVolunteer').value = selectSponsor.currentVolunteer;
    document.getElementById('sponsor-totalDeposit').value = selectSponsor.totalDeposit;
    document.getElementById('sponsor-balance').value = selectSponsor.balance;
    document.getElementById('sponsor-remark').value = selectSponsor.remark;

    const inputs = document.getElementById('sponsor-detail-form-container').querySelectorAll('input');
    const selects = document.getElementById('sponsor-detail-form-container').querySelectorAll('select');

    inputs.forEach(input => (input.disabled = true));
    selects.forEach(select => (select.disabled = true));


    document.getElementById('save-sponsor-detail-btn').style.display = 'none';
    document.getElementById('cancel-edit-sponsor-detail-btn').style.display = 'none';
    document.getElementById('edit-sponsor-detail-btn').style.display = 'block';
}