import { accessControlList, originalImages } from '/static/js/mock-data.js';
import { currentUser, relatedStudents, relatedSponsors, formatNumber } from '/static/js/common-script.js';

export function loadDataToReportTable() {
    //only admin and volunteer can be view reports
    // if ((currentUser.role !== 'admin') && (currentUser.role !== 'volunteer')) {
    //     document.getElementById('report-container').style.display = 'none';
    //     return;
    // }

    //Bảng Tổng thu
    if (accessControlList[currentUser.role].viewSponsor) {
        const totalDepositTable = document.getElementById('total-deposit-body');
        let totalDeposit = 0;
        let totalBalance = 0;
        //clear table rows before loading new data
        totalDepositTable.innerHTML = '';
        relatedSponsors.forEach(sponsor => {
            let content = `
                <tr>
                    <td data-label="Người hỗ trợ" class="align-center"><div class="inner-cell">${sponsor.name}</div></td>
                    <td data-label="Số tiền đã gửi" class="align-right"><div class="inner-cell">${formatNumber(sponsor.totalDeposit)}</div></td>
                    <td data-label="Số tiền còn lại" class="align-right"><div class="inner-cell">${formatNumber(sponsor.balance)}</div></td>
                </tr>                
            `;
            totalDeposit += parseInt(sponsor.totalDeposit);
            totalBalance += parseInt(sponsor.balance);
            let row = document.createElement('tr');
            row.innerHTML = content;            
            totalDepositTable.appendChild(row);
        });
        let totalRowContent = `
            <tr>
                <td data-label="Tổng cộng" class="align-center"><div class="inner-cell"><b>TỔNG CỘNG</b></div></td>
                <td class="align-right"><div class="inner-cell"><b>${formatNumber(totalDeposit)}</b></div></td>
                <td class="align-right"><div class="inner-cell"><b>${formatNumber(totalBalance)}</b></div></td>
            </tr>                
        `;
        let rowTotal = document.createElement('tr');
        rowTotal.innerHTML = totalRowContent;
        totalDepositTable.appendChild(rowTotal);
    } else {
        document.getElementById('total-deposit-table').style.display = 'none';
    }

    //Bảng tổng chi
    const totalFundsTable = document.getElementById('total-funds-body');
    let totalFunds = 0;
    let totalStudentBalance = 0;
    //clear table rows before loading new data
    totalFundsTable.innerHTML = '';
    relatedStudents.forEach(student => {
        let content = `
            <tr>
                <td data-label="Học sinh" class="align-center"><div class="inner-cell">${student.name}</div></td>
                <td data-label="Số tiền đã nhận" class="align-right"><div class="inner-cell">${formatNumber(student.funds)}</div></td>
                <td data-label="Số tiền còn lại" class="align-right"><div class="inner-cell">${formatNumber(student.balance)}</div></td>
            </tr>                
        `;
        totalFunds += parseInt(student.funds);
        totalStudentBalance += parseInt(student.balance);
        let row = document.createElement('tr');
        row.innerHTML = content;            
        totalFundsTable.appendChild(row);
    });
    let totalStudentRowContent = `
        <tr>
            <td data-label="Tổng cộng" class="align-center"><div class="inner-cell"><b>TỔNG CỘNG</b></div></td>
            <td class="align-right"><div class="inner-cell"><b>${formatNumber(totalFunds)}</b></div></td>
            <td class="align-right"><div class="inner-cell"><b>${formatNumber(totalStudentBalance)}</b></div></td>
        </tr>                
    `;
    let rowStudentTotal = document.createElement('tr');
    rowStudentTotal.innerHTML = totalStudentRowContent;
    totalFundsTable.appendChild(rowStudentTotal);

    //Bảng hình ảnh trao quà
    const studentImageTable = document.getElementById('student-image-table-body');
    //clear table rows before loading new data
    studentImageTable.innerHTML = '';
    const relatedImages = originalImages.filter(image => {
        if (relatedStudents.findIndex(student => student.id === image.studentId) !== -1) return true;
        return false;
    });
    relatedImages.forEach(image => {
        const studentName = relatedStudents.find(student => student.id === image.studentId).name;
        const status = image.imageSrc ? "Đã nhập" : "Thiếu";
        let content = `
            <tr>
                <td data-label="Học sinh" class="align-center"><div class="inner-cell">${studentName}</div></td>
                <td data-label="Tháng" class="align-center"><div class="inner-cell">${image.month}</div></td>
                <td data-label="Trạng thái" class="align-center"><div class="inner-cell">${status}</div></td>
            </tr>                
        `;
        let row = document.createElement('tr');
        row.innerHTML = content;            
        studentImageTable.appendChild(row);
    })
}