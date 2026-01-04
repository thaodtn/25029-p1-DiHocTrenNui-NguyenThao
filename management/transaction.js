import { originalTransactionList } from '/static/js/mock-data.js';
import { currentUser, relatedStudents, relatedSponsors, relatedTransactions } from '/static/js/common-script.js';
import { checkUserControl, updateTransactionByIndex, updateNewAmountForStudents, updateNewAmountForSponsors, addNewTransaction, formatNumber } from '/static/js/common-script.js';

let selectTransactionIndex = 0;

export function loadTransactionListEvent() {
    document.getElementById('open-form-add-transaction-record-btn').addEventListener('click', () => {
        document.getElementById('add-new-transaction-modal-container').classList.toggle('show');
    });
    document.getElementById('close-add-transaction-form-btn').addEventListener('click', () => {
        document.getElementById('add-new-transaction-modal-container').classList.toggle('show');
    });
    document.getElementById('add-new-transaction-btn').addEventListener('click', getNewTransaction);

    document.getElementById('transaction-search-btn').addEventListener('click', searchTransactionByText);

    //Hàm xử lý file CSV
    document.getElementById('csvFileInput').addEventListener('change', loadCSVfile);
}

export function loadDataToTransactionTable(displayTransactionList) {
    if (displayTransactionList) {
        const table = document.getElementById('transaction-table-body');
        //clear table rows before loading new data
        table.innerHTML = '';
        let rowEditBtn = '';
        if (checkUserControl(currentUser.id, 'editTransactionRecord') === false) {
            rowEditBtn = 'hidden-btn';
        }
        const studentSelectorValue = relatedStudents.map(student => student.id);
        const sponsorSelectorValue = relatedSponsors.map(sponsor => sponsor.id);
        studentSelectorValue.push(''); //blank value
        sponsorSelectorValue.push(''); //blank value

        
        displayTransactionList.forEach(element => {
            let content = `
                <tr class="transaction-row">
                    <td data-label="Thời gian" class="align-center"><div class="inner-cell">${element.date}</div></td>
                    <td data-label="Mã giao dịch" class="align-center"><div class="inner-cell">${element.code}</div></td>
                    <td data-label="Số tiền" class="align-right"><div class="inner-cell">${formatNumber(element.amount)}</div></td>                    
                    <td data-label="Nội dung" class="align-left"><div class="inner-cell"><span>${element.content}</span></div></td>
                    <td data-label="Người gửi" class="align-center">
                        <div class="inner-cell">
                            <select name="sponsor" disabled>
                            </select>
                        </div>
                    </td>
                    <td data-label="Học sinh nhận" class="align-center">
                        <div class="inner-cell">
                            <select name="student" disabled>
                            </select>
                        </div>
                    </td>
                    <td data-label="Trạng thái" class="align-center">
                        <div class="inner-cell">
                            <select name="status" disabled>
                                <option value="opened">Chưa xử lý</option>
                                <option value="approved">Đã nhập</option>
                                <option value="cancel">Hủy</option>
                            </select>
                        </div>
                    </td>
                    <td class="align-center">
                        <button data-transaction-code="${element.code}" class="row-edit-btn ${rowEditBtn}"><i class="fa-solid fa-pen fa-lg"></i></button>
                        <button data-transaction-code="${element.code}" class="row-save-btn ${rowEditBtn}"><i class="fa-regular fa-floppy-disk fa-lg"></i></button>
                        <button data-transaction-code="${element.code}" class="row-cancel-btn ${rowEditBtn}"><i class="fa-solid fa-square-xmark fa-lg"></i></button>
                    </td>                    
                </tr>
            `;
            
            let row = document.createElement('tr');
            row.innerHTML = content;

            //add status value
            row.querySelector('select[name="status"]').value = element.status;

            //add sponsor list and value
            sponsorSelectorValue.forEach(sponsor => {
                const option = document.createElement('option');
                option.value = sponsor;
                option.textContent = sponsor;
                row.querySelector('select[name="sponsor"]').appendChild(option);
            })
            row.querySelector('select[name="sponsor"]').value = element.sponsorId;

            //add student list and value
            studentSelectorValue.forEach(student => {
                const option = document.createElement('option');
                option.value = student;
                option.textContent = student;
                row.querySelector('select[name="student"]').appendChild(option);
            })
            row.querySelector('select[name="student"]').value = element.studentId;

            row.querySelector(".row-save-btn").style.display = "none";
            row.querySelector(".row-cancel-btn").style.display = "none";

            row.classList.add('transaction-row');
            //assign id
            row.id = element.code;
            table.appendChild(row);
        });

        //add event listener for each Edit button in row
        document.querySelectorAll('.row-edit-btn').forEach(element => {
            element.addEventListener('click', editTransaction);
        });
        //add event listener for each Edit button in row
        document.querySelectorAll('.row-save-btn').forEach(element => {
            element.addEventListener('click', saveTransaction);
        });
        //add event listener for each Edit button in row
        document.querySelectorAll('.row-cancel-btn').forEach(element => {
            element.addEventListener('click', cancelTransaction);
        });

    }
}

function editTransaction(event) {
    const transactionCode = event.target.closest('.row-edit-btn').dataset.transactionCode;
    selectTransactionIndex = relatedTransactions.findIndex(element => element.code === transactionCode);
    if (selectTransactionIndex !== -1) {
        const selectedRow = document.getElementById(relatedTransactions[selectTransactionIndex].code);
        
        selectedRow.querySelector('select[name="sponsor"]').disabled = false;
        selectedRow.querySelector('select[name="student"]').disabled = false;
        selectedRow.querySelector('select[name="status"]').disabled = false;
        selectedRow.querySelector(".row-edit-btn").style.display = "none";
        selectedRow.querySelector(".row-save-btn").style.display = "inline-block";
        selectedRow.querySelector(".row-cancel-btn").style.display = "inline-block";

    }
}

function saveTransaction(event) {
    let updateFlag = false;
    const transactionCode = event.target.closest('.row-save-btn').dataset.transactionCode;
    selectTransactionIndex = relatedTransactions.findIndex(element => element.code === transactionCode);
    if (selectTransactionIndex !== -1) {
        const selectedRow = document.getElementById(relatedTransactions[selectTransactionIndex].code);
        const oldTransaction = {...relatedTransactions[selectTransactionIndex]};
        let newTransaction = {...relatedTransactions[selectTransactionIndex]};
        //lấy giá trị từ bảng
        newTransaction.studentId = selectedRow.querySelector('select[name="student"]').value;
        newTransaction.sponsorId = selectedRow.querySelector('select[name="sponsor"]').value;
        newTransaction.status = selectedRow.querySelector('select[name="status"]').value;

        //nếu status là "Đã nhập" nhưng Học sinh hoặc Người hỗ trợ không có thì báo lỗi
        if ((newTransaction.status === "approved") && ((!newTransaction.studentId) || (!newTransaction.sponsorId)))
        {
            alert('Vui lòng chọn mã Học sinh và mã Người hỗ trợ cho sao kê có trạng thái "Đã nhập"');
            return;
        }
        //nếu status là "Hủy" thì phải để trống Mã học sinh và người hỗ trợ
        if ((newTransaction.status === "cancel") && ((newTransaction.studentId) || (newTransaction.sponsorId)))
        {
            alert('Vui lòng xóa mã Học sinh và mã Người hỗ trợ cho sao kê có trạng thái "Hủy"');
            return;
        }
        //status là "Chưa xử lý" hợp lệ khi thiếu mã Học sinh, hoặc thiếu mã Người hỗ trợ, hoặc thiếu cả hai mã
        if ((newTransaction.status === "opened") && (newTransaction.studentId) && (newTransaction.sponsorId)) {
            alert('Vui lòng đổi sang trạng thái "Đã nhập"');
            return;
        }

        //nếu có thay đổi student thì update, nếu không thay đổi thì bỏ qua
        if (oldTransaction.studentId !== newTransaction.studentId) {
            updateNewAmountForStudents(newTransaction.amount, newTransaction.studentId, oldTransaction.studentId);
            updateFlag = true;
        }

        //nếu có thay đổi sponsor thì update, nếu không thay đổi thì bỏ qua
        if (oldTransaction.sponsorId !== newTransaction.sponsorId) {
            updateNewAmountForSponsors(newTransaction.amount, newTransaction.sponsorId, oldTransaction.sponsorId);
            updateFlag = true;
        }

        if (updateFlag === true) {
            //update new data to relatedTransactions and store into Local Storage
            updateTransactionByIndex(selectTransactionIndex, newTransaction);
        }

        //visible button Edit, hide button Save and Cancel
        selectedRow.querySelector('select[name="sponsor"]').disabled = true;
        selectedRow.querySelector('select[name="student"]').disabled = true;
        selectedRow.querySelector('select[name="status"]').disabled = true;
        selectedRow.querySelector(".row-edit-btn").style.display = "inline-block";
        selectedRow.querySelector(".row-save-btn").style.display = "none";
        selectedRow.querySelector(".row-cancel-btn").style.display = "none";
    }
}

function cancelTransaction(event) {
    const transactionCode = event.target.closest('.row-cancel-btn').dataset.transactionCode;
    selectTransactionIndex = relatedTransactions.findIndex(element => element.code === transactionCode);
    if (selectTransactionIndex !== -1) {
        const selectedRow = document.getElementById(relatedTransactions[selectTransactionIndex].code);
        //reload old data
        selectedRow.querySelector('select[name="sponsor"]').value = relatedTransactions[selectTransactionIndex].sponsorId;
        selectedRow.querySelector('select[name="student"]').value = relatedTransactions[selectTransactionIndex].studentId;
        selectedRow.querySelector('select[name="status"]').value = relatedTransactions[selectTransactionIndex].status;

        //visible button Edit, hide button Save and Cancel
        selectedRow.querySelector('select[name="sponsor"]').disabled = true;
        selectedRow.querySelector('select[name="student"]').disabled = true;
        selectedRow.querySelector('select[name="status"]').disabled = true;
        selectedRow.querySelector(".row-edit-btn").style.display = "inline-block";
        selectedRow.querySelector(".row-save-btn").style.display = "none";
        selectedRow.querySelector(".row-cancel-btn").style.display = "none";
    }
}

function searchTransactionByText() {
    const searchText = document.getElementById('transaction-input-search-text').value;
        const selectedStatus = document.getElementById('search-transaction-status').value;
        const filteredTransactions = relatedTransactions.filter(({ date, code, amount, content, sponsorId, studentId, status }) => {
            if (date.includes(searchText) || code.includes(searchText) || amount.includes(searchText) || content.includes(searchText) || sponsorId.includes(searchText) || studentId.includes(searchText)) {
                if (selectedStatus !== 'all') {
                    return (status === selectedStatus);
                }
                return true;
            }
            return false;
        })
    
        if (filteredTransactions) {
            loadDataToTransactionTable(filteredTransactions);
        }
}

function getNewTransaction() {
    let newTransaction = {};
    newTransaction.date = document.getElementById('transaction-date').value;
    newTransaction.code = document.getElementById('transaction-code').value;
    newTransaction.amount = document.getElementById('transaction-amount').value.replaceAll('.','');
    newTransaction.content = document.getElementById('transaction-content').value;

    newTransaction.sponsorId = '';
    newTransaction.studentId = '';
    newTransaction.status = 'opened';


    addNewTransaction(newTransaction);
    //reload table
    loadDataToTransactionTable(relatedTransactions);
    alert('Cập nhật thành công.');
}

function loadCSVfile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        // Tách nội dung thành các dòng
        const lines = content.split(/\r?\n/);
        const tableBody = document.querySelector('#transaction-table-body');

        // Duyệt từ dòng thứ 2 (i=1) để bỏ qua tiêu đề của file CSV
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === "") continue; // Bỏ qua dòng trống

            // Tách các cột bằng dấu phẩy
            const columns = lines[i].split(',');

            if (columns.length >= 4) {
                const row = document.createElement('tr');

                // Làm sạch dữ liệu (xóa khoảng trắng hoặc dấu ngoặc kép thừa)
                const time = columns[0].trim();
                const code = columns[1].trim();
                const amount = columns[2].trim();
                const content = columns[3].trim();
                console.log('amount:', amount);
                //kiểm tra nếu không trùng mã giao dịch đã có thì thêm mới, nếu đã có thì bỏ qua
                if (relatedTransactions.findIndex(record => record.code === code) === -1) {
                    let newTransaction = {};
                    newTransaction.date = time;
                    newTransaction.code = code;
                    newTransaction.amount = amount;
                    newTransaction.content = content;
    
                    newTransaction.sponsorId = '';
                    newTransaction.studentId = '';
                    newTransaction.status = 'opened';
    
                    addNewTransaction(newTransaction);
                }
            }
        }

        //reload table
        loadDataToTransactionTable(relatedTransactions);

        // Xóa input để có thể chọn lại
        document.getElementById('csvFileInput').value = "";
        alert("Đã thêm dữ liệu từ file CSV thành công!");
    };

    // Đọc file dưới dạng văn bản (UTF-8)
    reader.readAsText(file, 'UTF-8');
}