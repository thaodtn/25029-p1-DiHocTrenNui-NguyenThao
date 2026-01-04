import { originalUsers, accessControlList, originalStudents, originalSponsors, originalSchools, originalTransactionList } from "./mock-data.js";

export let users = '';
export let currentUser = '';
export let currentUserControlList = '';

export let allStudents = '';
export let relatedStudents = '';
// export let sponsors = '';
export let relatedSponsors = '';
export let relatedSchool = '';
export let relatedTransactions = '';

export function formatNumber(numberString) {
  const number = Number(numberString);
  return number.toLocaleString('it-IT'); 
}

export function initData() {
    //Kiểm tra xem dữ liệu trong localStorage đã có hay chưa
    if (!localStorage.getItem('users')) {
        //sao chép toàn bộ dữ liệu từ mock-data.js vào localStorage
        localStorage.setItem('users', JSON.stringify(originalUsers));
        //clear currentUser
        localStorage.setItem('currentUser', '');
    }
    else {
        //Bỏ qua bước sao chép và sử dụng luôn dữ liệu hiện tại trong localStorage
        users = JSON.parse(localStorage.getItem('users'));
        if (localStorage.getItem('currentUser')) {
            currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }
    //Students
    if (!localStorage.getItem('relatedStudents')) {
        relatedStudents = getRelatedStudentsByCurrentUser(originalStudents);
        if (relatedStudents) {
            localStorage.setItem('relatedStudents', JSON.stringify(relatedStudents));
        }
    }
    else {
        //Bỏ qua bước sao chép và sử dụng luôn dữ liệu hiện tại trong localStorage
        relatedStudents = JSON.parse(localStorage.getItem('relatedStudents'));
    }
    
    //Sponsors
    if (!localStorage.getItem('relatedSponsors')) {
        relatedSponsors = getRelatedSponsorsByCurrentUser(originalSponsors);
        if (relatedSponsors) {
            localStorage.setItem('relatedSponsors', JSON.stringify(relatedSponsors));
        }
    }
    else {
        //Bỏ qua bước sao chép và sử dụng luôn dữ liệu hiện tại trong localStorage
        relatedSponsors = JSON.parse(localStorage.getItem('relatedSponsors'));
    }

    //School
    if (!localStorage.getItem('relatedSchool')) {
        relatedSchool = getRelatedSchoolByCurrentUser(originalSchools);
        if (relatedSchool) {
            localStorage.setItem('relatedSchool', JSON.stringify(relatedSchool));
        }
    }
    else {
        //Bỏ qua bước sao chép và sử dụng luôn dữ liệu hiện tại trong localStorage
        relatedSchool = JSON.parse(localStorage.getItem('relatedSchool'));
    }

    //Transactions
    if (!localStorage.getItem('relatedTransactions')) {
        relatedTransactions = getRelatedTransactionByCurrentUser(originalTransactionList);
        if (relatedTransactions) {
            localStorage.setItem('relatedTransactions', JSON.stringify(relatedTransactions));
        }
    }
    else {
        //Bỏ qua bước sao chép và sử dụng luôn dữ liệu hiện tại trong localStorage
        relatedTransactions = JSON.parse(localStorage.getItem('relatedTransactions'));
    }
    console.log('Finish initData()');
}

export function updateUserById(selectedUser) {
    let index = users.findIndex(user => user.id === selectedUser.id);
    if (index >= 0) {
        users[index] = selectedUser;
        //sao chép toàn bộ dữ liệu mới của mảng users vào localStorage
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cập nhật thành công.');
    }
    else alert('Cập nhật thất bại. Vui lòng thử lại!');
}

export function updateUserByIndex(index, newUser) {
    if (index < users.length) {
        users[index] = newUser;
        //sao chép toàn bộ dữ liệu mới của mảng users vào localStorage
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cập nhật thành công.');
    }
    else alert('Cập nhật thất bại. Vui lòng thử lại!');
}

export function addNewUser(newUser) {
    //Kiểm tra email trùng lặp
    const index = users.findIndex(user => user.email === newUser.email);
    if (index !== -1) {
        alert('Email trùng lặp. Vui lòng đăng kí email mới');
        return;
    }
    users.push(newUser);
    //sao chép toàn bộ dữ liệu mới của mảng users vào localStorage
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cập nhật thành công.');
}

export function deactiveUser(selectedUser) {
    let index = users.findIndex(user => user.id === selectedUser.id);
    if (index >= 0) {
        users[index].status = 'inactive';
        //sao chép toàn bộ dữ liệu mới của mảng users vào localStorage
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cập nhật thành công.');
    }
    else alert('Cập nhật thất bại. Vui lòng thử lại!');
}

export function addNewStudent(newStudent) {
    relatedStudents.push(newStudent);
    //sao chép toàn bộ dữ liệu mới của mảng relatedStudents vào localStorage
    localStorage.setItem('relatedStudents', JSON.stringify(relatedStudents));
    alert('Cập nhật thành công.');
}

export function addNewSponsor(newSponsor) {
    relatedSponsors.push(newSponsor);
    //sao chép toàn bộ dữ liệu mới của mảng relatedSponsors vào localStorage
    localStorage.setItem('relatedSponsors', JSON.stringify(relatedSponsors));
    alert('Cập nhật thành công.');
}

export function addNewSchool(newSchool) {
    relatedSchool.push(newSchool);
    //sao chép toàn bộ dữ liệu mới của mảng relatedSchool vào localStorage
    localStorage.setItem('relatedSchool', JSON.stringify(relatedSchool));
    alert('Cập nhật thành công.');
}

export function addNewTransaction(newTransaction) {
    relatedTransactions.push(newTransaction);
    //sao chép toàn bộ dữ liệu mới của mảng relatedTransactions vào localStorage
    localStorage.setItem('relatedTransactions', JSON.stringify(relatedTransactions));
    // alert('Cập nhật thành công.');
}

export function updateStudentByIndex(index, newStudent) {
    if (index < relatedStudents.length) {
        relatedStudents[index] = newStudent;
        //sao chép toàn bộ dữ liệu mới của mảng users vào localStorage
        localStorage.setItem('relatedStudents', JSON.stringify(relatedStudents));
        alert('Cập nhật thành công.');
    }
    else alert('Cập nhật thất bại. Vui lòng thử lại!');
}

export function updateSponsorByIndex(index, newSponsor) {
    if (index < relatedSponsors.length) {
        relatedSponsors[index] = newSponsor;
        //sao chép toàn bộ dữ liệu mới của mảng users vào localStorage
        localStorage.setItem('relatedSponsors', JSON.stringify(relatedSponsors));
        alert('Cập nhật thành công.');
    }
    else alert('Cập nhật thất bại. Vui lòng thử lại!');
}

export function updateTransactionByIndex(index, newTransaction) {
    if (index < relatedTransactions.length) {
        relatedTransactions[index] = newTransaction;
        //sao chép toàn bộ dữ liệu mới của mảng users vào localStorage
        localStorage.setItem('relatedTransactions', JSON.stringify(relatedTransactions));
        alert('Cập nhật thành công.');
    }
    else alert('Cập nhật thất bại. Vui lòng thử lại!');
}

export function updateSchoolByIndex(index, newSchool) {
    if (index < relatedSchool.length) {
        relatedSchool[index] = newSchool;
        //sao chép toàn bộ dữ liệu mới của mảng users vào localStorage
        localStorage.setItem('relatedSchool', JSON.stringify(relatedSchool));
        alert('Cập nhật thành công.');
    }
    else alert('Cập nhật thất bại. Vui lòng thử lại!');
}

export function updateNewAmountForStudents(amount, newStudentId, oldStudentId) {
    let updateFlag = false;
    //nếu studentId là rỗng thì bỏ qua
    if (newStudentId) {
        let selectedNewStudentIndex = relatedStudents.findIndex(student => student.id === newStudentId);
        if (selectedNewStudentIndex === -1) {
            alert(`Mã học sinh ${newStudentId} không tồn tại. Vui lòng chọn lại`);
            return;
        }
        //cập nhật tiền tích lũy cho học sinh mới
        console.log('cập nhật tiền tích lũy cho học sinh mới...');
        relatedStudents[selectedNewStudentIndex].funds = (parseInt(relatedStudents[selectedNewStudentIndex].funds) + parseInt(amount)).toString();
        updateFlag = true;
    }
    if (oldStudentId) {
        let selectedOldStudentIndex = relatedStudents.findIndex(student => student.id === oldStudentId);
        if (selectedOldStudentIndex === -1) {
            alert(`Mã học sinh ${oldStudentId} không tồn tại. Vui lòng chọn lại`);
            return;
        }
        //trừ tiền tích lũy của học sinh cũ
        relatedStudents[selectedOldStudentIndex].funds = (parseInt(relatedStudents[selectedOldStudentIndex].funds) - parseInt(amount)).toString();
        updateFlag = true;
    }
    //nếu có update dữ liệu thì lưu vào local storage
    if (updateFlag) {
        //sao chép toàn bộ dữ liệu mới của mảng relatedStudents vào localStorage
        localStorage.setItem('relatedStudents', JSON.stringify(relatedStudents));
    }    
}

export function updateNewAmountForSponsors(amount, newSponsorId, oldSponsorId) {
    let updateFlag = false;
    //nếu sponsorId là rỗng thì bỏ qua
    if (newSponsorId) {
        let selectedNewSponsorIndex = relatedSponsors.findIndex(sponsor => sponsor.id === newSponsorId);
        if (selectedNewSponsorIndex === -1) {
            alert(`Mã người hỗ trợ ${newSponsorId} không tồn tại. Vui lòng chọn lại`);
            return;
        }
        //cập nhật tiền tích lũy cho người hỗ trợ mới
        relatedSponsors[selectedNewSponsorIndex].totalDeposit = (parseInt(relatedSponsors[selectedNewSponsorIndex].totalDeposit) + parseInt(amount)).toString();
        updateFlag = true;
    }
    if (oldSponsorId) {
        let selectedOldSponsorIndex = relatedSponsors.findIndex(sponsor => sponsor.id === oldSponsorId);
        if (selectedOldSponsorIndex === -1) {
            alert(`Mã người hỗ trợ ${oldSponsorId} không tồn tại. Vui lòng chọn lại`);
            return;
        }
        //trừ tiền tích lũy của người hỗ trợ cũ
        relatedSponsors[selectedOldSponsorIndex].totalDeposit = (parseInt(relatedSponsors[selectedOldSponsorIndex].totalDeposit) - parseInt(amount)).toString();
        updateFlag = true;
    }
    //nếu có update dữ liệu thì lưu vào local storage
    if (updateFlag) {
        //sao chép toàn bộ dữ liệu mới của mảng relatedSponsors vào localStorage
        localStorage.setItem('relatedSponsors', JSON.stringify(relatedSponsors));
    }
}

export async function loadMainHeaderContent(sourcePageURL, sourceElementId, destinationElementId) {
    await fetchAndInjectElementById(sourcePageURL, sourceElementId, destinationElementId);
    document.getElementById('nav-dropdown-btn').addEventListener('click', openMenuDropdown);
    document.getElementById('register-dropdown-btn').addEventListener('click', openRegisterDropdown);
    //check login status
    if (currentUser) {
        document.getElementById('login-button').innerHTML = 'Tài khoản của tôi';
        document.getElementById('login-nav-dropdown').innerHTML = 'Tài khoản của tôi';
    } else {
        document.getElementById('login-button').innerText = 'Đăng nhập';
        document.getElementById('login-nav-dropdown').innerText = 'Đăng nhập';
    }
}

// Use async/await for cleaner asynchronous code.
export async function fetchAndInjectElementById(sourcePageURL, sourceElementId, destinationElementId) {
    try {        
        // Get the container element where the fetched content will be placed.
        const container = document.getElementById(destinationElementId);

        // Step 1: Fetch the HTML as a plain text response.
        console.log('Starting fetchAndInjectElementById into',destinationElementId);
        const response = await fetch(sourcePageURL);

        // Ensure the request was successful.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the HTML content as a text string.            
        const htmlText = await response.text();

        // Step 2: Create a new DOMParser instance.
        const parser = new DOMParser();

        // Parse the HTML text into a Document object.
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Step 3: Get the element from the parsed document.
        const fetchedElement = doc.getElementById(sourceElementId);

        // To get the inner HTML *without* the <body> tags themselves,
        // use innerHTML. To get the <body> tags along with their content,
        // use outerHTML.
        const elementContent = fetchedElement.outerHTML;

        // Step 4: Insert the body's content into your container.
        container.innerHTML = elementContent;

        console.log('Successfully fetchAndInjectElementById.');

    } catch (error) {
        console.error('Failed to fetch and inject content:', error);
        container.innerHTML = '<p style="color: red;">Failed to load content.</p>';
    }
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function openMenuDropdown() {
    document.getElementById("nav-dropdown").classList.toggle("show");
}
function openRegisterDropdown() {
    document.getElementById("register-dropdown-list").classList.toggle("show");
}


// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches("#nav-dropdown-btn")) {
        let list = document.getElementsByClassName('nav-dropdown-list');
        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains('show')) {
                list[i].classList.remove('show');
            }
        }
    }
    if (!event.target.matches("#register-dropdown-btn")) {
        let list = document.getElementsByClassName('register-dropdown-list');
        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains('show')) {
                list[i].classList.remove('show');
            }
        }
    }
    
}

export function checkUserControl(userId, action) {
    //get user's role
    let checkedUser = users.find(element => element.id === userId);
    if (checkedUser) {
        let userRole = checkedUser.role;
        //check action
        if (accessControlList[userRole][action] === true) return true;
        else return false;
    } else return false;
}

function getRelatedStudentsByCurrentUser(studentArray) {
    let studentList = '';
    if (currentUser) {
        const role = currentUser.role;
        switch (role) {
            case 'sponsor':
                studentList = studentArray.filter(element => element.currentSponsor === currentUser.id);
                break;
            case 'volunteer':
                studentList = studentArray.filter(element => element.currentVolunteer === currentUser.id);
                break;
            case 'teacher':
                studentList = studentArray.filter(element => element.currentTeacher === currentUser.id);
                break;
            case 'admin':
                studentList = studentArray; //show all
                break;
            default: //do not show anything
                break;
        }
        console.log(`danh sach hoc sinh cua ${currentUser.id}:`, studentList);
    }
    return studentList;
}

function getRelatedSponsorsByCurrentUser(sponsorArray) {
    let sponsorList = '';
    if (currentUser) {
        const role = currentUser.role;
        switch (role) {
            case 'volunteer':
                sponsorList = sponsorArray.filter(element => element.currentVolunteer === currentUser.id);
                break;
            case 'sponsor':
                sponsorList = sponsorArray.filter(element => element.id === currentUser.id);
                break;
            case 'admin':
                sponsorList = sponsorArray; //show all
                break;
            default: //do not show anything
                break;
        }
    }
    return sponsorList;
}

function getRelatedSchoolByCurrentUser(schoolArray) {
    let schoolList = '';
    if (currentUser) {
        const role = currentUser.role;
        switch (role) {
            case 'teacher':
                schoolList = schoolArray.filter(element => element.currentTeacher === currentUser.id);
                break;
            case 'volunteer':
            case 'admin':
                schoolList = schoolArray; //show all
                break;
            default: //do not show anything
                break;
        }
    }
    return schoolList;
}

function getRelatedTransactionByCurrentUser(transactionArray) {
    let transactionList = '';
    if (currentUser) {
        const role = currentUser.role;
        switch (role) {
            case 'sponsor':
                transactionList = transactionArray.filter(element => element.sponsorId === currentUser.id);
                break;
            case 'volunteer':
                //TNV xem được các giao dịch chưa xử lý hoặc giao dịch của NHT và HS đang phụ trách
                transactionList = transactionArray.filter(element => {
                    if (element.status === 'opened') return true;
                    if ((relatedStudents.findIndex(student => student.id === element.studentId) !== -1) && (relatedSponsors.findIndex(sponsor => sponsor.id === element.sponsorId) !== -1)) return true;
                    return false;
                })
                break;
            case 'admin':
                transactionList = transactionArray; //show all
                break;
            default:
                break; //do not show anything
        }
    }
    return transactionList;
}