##
## Note chung:

### Màu chủ đạo: 
+ Xanh lá cây đậm #1a685b rgba(26, 104, 91, 1)
+ màu vàng #ffac00
#2a692a (green board)

### Kích thước chung:
- Homepage Header: height = 6rem
- User page Header: height = 4rem
- Copyright: height =6rem

### Font tham khảo:
#### Google font:
font-family: 'Dancing Script', cursive;
#### Other fonts:
font-family: "Poppins";

### Naming rule:
```css
Các class dùng chung:
/* sections (có 's'): các section chứa từng phần nội dung trên trang chủ */
.sections {
    margin: 2rem 15vw;
}
.small-icons {
    height: 2rem;
    width: 2rem;
    border: none;
}
.large-icons {
    height: 3rem;
    width: 3rem;
    border: none;
}

```
##
## Structure:
```
home (A.1)
    home-style.css

login (A.3)
    login.html
    login-style.css
    login-script.js

register
    register-student.html
    register-sponsor.html
    register-style.css
    register-script.js

users
    dashboard.html
    dashboard-style.css
    dashboard-script.js
    settings.html (A.4)
    settings-style.css
    settings-script.js

management
    user-list.html (A.2)
    user-list-style.css
    user-list-script.js


static
    html
        header.html
        footer.html
    css
        common-style.css
        header-style.css
        footer-style.css
        banner-slider.css
    js
        common-script.js
        mock-data.js
        banner-slider.js
    image
        icons
        background
        slides
        ...

```


## Data:
### Role list:
- admin
- volunteer
- sponsor
- teacher
### Status:
- active: account đang hoạt động, chức năng được cấp theo vai trờ.
- inactive: account đã bị khóa, không đăng nhập được nữa, vẫn giữ lại để tra cứu lịch sử chứ không xóa.

# Tasks tracking:
## Week 1:
- [x] Home page (A.1)  
- [x] Register pages of:   
    - sponsors (A.1.1).  
    - students (A.1.2).  

## Week 2:
- [x] Login page (A.3)  
- [x] Form quản lý tài khoản (A.4)  

## Week 3:
- [ ] Trang quản lý và tạo tài khoản mới (A.2)   
- [ ] Trang xem chi tiết (các chức năng từ Dashboard theo user role tương ứng)  

## Comments / Feedback:
- [x] chỉnh lại giao diện trang Profile và đổi mật khẩu (căn nội dung vào giữa, bóp 2 bên).
- [x] đưa left-side-bar sang phần main của dashboard và hiển thị 100% height
- [ ] chỉnh lại giao diện trang user's list: các button và ô input thẳng hàng ngang với màn hình lớn / thẳng hàng dọc với màn hình mobile
