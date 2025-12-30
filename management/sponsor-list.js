import { sponsorStatusTranslated } from '/static/js/mock-data.js';
import {currentUser, relatedSponsors, checkUserControl, addNewSponsor } from '/static/js/common-script.js';

export function loadSponsorListEvent() {
    document.getElementById('open-form-add-sponsor-btn').addEventListener('click', () => {
        console.log('open-form-add-sponsor-btn clicked');
        document.getElementById('add-new-sponsor-modal-container').classList.toggle('show');
    });
    document.getElementById('close-add-sponsor-form-btn').addEventListener('click', () => {
        document.getElementById('add-new-sponsor-modal-container').classList.toggle('show');
    });
    document.getElementById('add-new-sponsor-btn').addEventListener('click', getNewSponsor);

    document.getElementById('sponsor-search-btn').addEventListener('click', searchSponsorByText);
    
}
export function loadDataToSponsorTable(displaySponsorList) {
    console.log(displaySponsorList);
    if (displaySponsorList) {
        const table = document.getElementById('sponsor-table-body');
        //clear table rows before loading new data
        table.innerHTML = '';
        let rowEditBtn = '';
        if (checkUserControl(currentUser.id, 'editSponsor') === false) {
            rowEditBtn = 'hidden-btn';
        }
        displaySponsorList.forEach(element => {
            let content = `
                <tr class="sponsor-row">
                    <td data-label="Mã Số" class="align-center"><div class="inner-cell">${element.id}</div></td>
                    <td data-label="Họ Tên" class="align-left"><div class="inner-cell">${element.name}</div></td>
                    <td data-label="Trạng Thái" class="${element.status} align-center"><div class="inner-cell"><span>${sponsorStatusTranslated[element.status]}</span></div></td>
                    <td data-label="Mã HS đang hỗ trợ" class="align-left"><div>${element.detailStudents}</div></td>
                    <td data-label="Đã ủng hộ" class="align-right"><div class="inner-cell">${element.totalDeposit}</div></td>
                    <td data-label="Số Dư" class="align-right"><div class="inner-cell">${element.balance}</div></td>
                    <td class="align-center"><button data-sponsor-id="${element.id}" class="row-detail-btn"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button></td>                
                    </tr>                
                    `;
                    
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('sponsor-row');
            table.appendChild(row);
        });

        //add event listener for each Detail button in row
        document.querySelectorAll('.row-detail-btn').forEach(element => {
            element.addEventListener('click', openSponsorDetail);
        });
    }
    else {
        console.log('displaySponsorList bị lỗi');
    }
}

function searchSponsorByText() {
    const searchText = document.getElementById('input-search-text').value;
    const selectedStatus = document.getElementById('search-sponsor-status').value;
    const filteredSponsors = relatedSponsors.filter(({id, name, detailStudents, status}) => {
        if (id.includes(searchText) || name.includes(searchText) || detailStudents.includes(searchText)) {
            if (selectedStatus !== 'all') {
                return (status === selectedStatus);
            }
            return true;
        }
        return false;
    })

    if (filteredSponsors) {
        loadDataToSponsorTable(filteredSponsors);
    }
}

function getNewSponsor() {
    let newSponsor = {};
        newSponsor.id = document.getElementById('sponsor-id').value;
        newSponsor.name = document.getElementById('sponsor-name').value;
        newSponsor.status = document.getElementById('sponsor-status').value;
        newSponsor.startDate = document.getElementById('sponsor-startDate').value;
        newSponsor.contact = document.getElementById('sponsor-contact').value;
    
        newSponsor.totalStudents = 0;
        newSponsor.detailStudents = '';
        newSponsor.endDate = '';
        newSponsor.currentVolunteer = '';
        newSponsor.totalDeposit = '0';
        newSponsor.balance = '0';
        newSponsor.remark = '';

    
        addNewSponsor(newSponsor);
        //reload table
        loadDataToSponsorTable(relatedSponsors);
        
}

function openSponsorDetail(event) {
    const sponsorId = event.target.closest('.row-detail-btn').dataset.sponsorId;
    const selectSponsorIndex = relatedSponsors.findIndex(sponsor => sponsor.id === sponsorId);
    if (selectSponsorIndex !== -1) {
        //save selectSponsorIndex to Local storage
        localStorage.setItem('selectSponsorIndex', JSON.stringify(selectSponsorIndex));
        window.location.href = '/management/sponsor-detail.html';
    }
}