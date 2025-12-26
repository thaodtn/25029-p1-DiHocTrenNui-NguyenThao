import { sponsorStatusTranslated } from '/static/js/mock-data.js';
import {currentUser, relatedSponsors, checkUserControl } from '/static/js/common-script.js';

export function loadSponsorListEvent() {
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
                    <td data-label="Liên hệ" class="align-left"><div class="inner-cell">${element.contact}</div></td>
                    <td data-label="Số HS đang hỗ trợ" class="align-center"><div class="inner-cell">${element.totalStudents}</div></td>
                    <td data-label="Mã HS đang hỗ trợ" class="align-left"><div class="inner-cell">${element.detailStudents}</div></td>
                    <td data-label="Bắt Đầu" class="align-right"><div class="inner-cell">${element.startDate}</div></td>
                    <td data-label="Kết Thúc" class="align-right"><div class="inner-cell">${element.endDate}</div></td>                    
                    <td data-label="TNV Phụ Trách" class="align-left"><div class="inner-cell">${element.currentVolunteer}</div></td>
                    <td data-label="Đã ủng hộ" class="align-right"><div class="inner-cell">${element.totalDeposit}</div></td>
                    <td data-label="Số Dư" class="align-right"><div class="inner-cell">${element.balance}</div></td>
                    <td data-label="Ghi Chú" class="align-left"><div class="inner-cell">${element.remark}</div></td>
                    <td><button class="row-edit-btn ${rowEditBtn}"><i class="fa-solid fa-pen"></i></button></td>                    
                </tr>                
            `;
            let row = document.createElement('tr');
            row.innerHTML = content;
            row.classList.add('sponsor-row');
            table.appendChild(row);
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