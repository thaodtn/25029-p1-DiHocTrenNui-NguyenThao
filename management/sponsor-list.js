import { sponsorStatusTranslated } from '/static/js/mock-data.js';
import {currentUser, sponsors } from '/static/js/common-script.js';

export function loadSponsorListEvent() {
    
}
export function loadDataToSponsorTable(displaySponsorList) {
    console.log(displaySponsorList);
    if (displaySponsorList) {
        const table = document.getElementById('sponsor-table-body');
        displaySponsorList.forEach(element => {
            let content = `
                <tr class="sponsor-row">
                    <td data-label="Mã Số" class="align-center">${element.id}</td>
                    <td data-label="Họ Tên" class="align-left">${element.name}</td>
                    <td data-label="Trạng Thái" class="${sponsorStatusTranslated[element.status]} align-center"><span>${element.status}</span></td>                    
                    <td data-label="Thông tin liên hệ" class="align-left">${element.contact}</td>
                    <td data-label="Số học sinh đang hỗ trợ" class="align-center">${element.totalStudents}</td>
                    <td data-label="Mã học sinh đang hỗ trợ" class="align-left">${element.detailStudents}</td>
                    <td data-label="Ngày Bắt Đầu" class="align-right">${element.startDate}</td>
                    <td data-label="Ngày Kết Thúc" class="align-right">${element.endDate}</td>                    
                    <td data-label="Người Phụ Trách" class="align-left">${element.currentVolunteer}</td>
                    <td data-label="Số tiền đã ủng hộ" class="align-right">${element.totalDeposit}</td>
                    <td data-label="Số Dư" class="align-right">${element.balance}</td>
                    <td data-label="Ghi Chú" class="align-left">${element.remark}</td>
                    <td><button class="row-edit-btn"><i class="fa-solid fa-pen"></i></button></td>                    
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