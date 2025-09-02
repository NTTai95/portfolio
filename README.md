# Xây dựng Website xem phim tích hợp Framework Front-End

[![Video Demo](https://img.shields.io/badge/Xem_Demo_Đầy_Đủ-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/kZNC9iPoyG0)
[![GitHub](https://img.shields.io/badge/Xem_Mã_Nguồn-181717?style=for-the-badge&logo=github)](https://github.com/NTTai95/portfolio/tree/DAX-Movie-Website)

**Dự án Website xem phim tích hợp Framework Front-End là sản phẩm nhóm 4 thành viên, nhằm vận dụng kiến thức từ các môn học WEB101 và WEB203. Website được xây dựng bằng các công nghệ Front-End như HTML, CSS/SCSS, Bootstrap 5, Swiper.js, JavaScript, và quản lý code trên GitHub, chạy trực tiếp bằng Live Server.**

![Banner Dự án](./banner.png)

---

## 📋 Tổng quan Dự án

*   **Loại dự án:** Dự án xưởng thực hành
*   **Thời gian:** 09/2024 - 10/2024
*   **Mô tả:** Dự án tập trung xây dựng lại giao diện website xem phim dựa trên nền tảng của website xem phim quốc gia, với mục tiêu mang lại trải nghiệm hiện đại, trực quan và dễ sử dụng hơn cho người dùng. Sản phẩm giao diện được thiết kế để đáp ứng nhu cầu xem phim trực tuyến, giúp người dùng dễ dàng tìm kiếm, lựa chọn và thưởng thức nội dung giải trí một cách tiện lợi và thân thiện.
*   **Vai trò của tôi:**  
*   `Trưởng nhóm Front-end` - Tôi chịu trách nhiệm quản lý, phân công công việc trong nhóm và định hướng kỹ thuật cho toàn bộ phần giao diện.  
*   `Nhà thiết kế giao diện` - Trực tiếp thiết kế và phát triển các trang quan trọng như **Trang chủ, Trang Liên hoan Phim, Form Đăng nhập, Form Đăng ký**, đảm bảo tính hiện đại, trực quan và nhất quán trải nghiệm người dùng.  

---

## 🚀 Công nghệ & Kỹ thuật Nổi bật

Bảng dưới đây liệt kê những công nghệ chính được sử dụng và cách chúng được áp dụng trong dự án:

| Công nghệ / Nền tảng | Loại | Công dụng & Vai trò trong hệ thống |
|----------------------|------|-------------------------------------|
| [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML) | Front-End Markup | Xây dựng cấu trúc trang, nội dung cơ bản như tiêu đề, form, bố cục. |
| [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS) | Front-End Styling | Định kiểu giao diện, bố cục, màu sắc, font chữ, responsive. |
| [![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/) | CSS Preprocessor | Viết style hiệu quả hơn bằng biến, nested rules, mixins. |
| [![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/) | CSS Framework | Thiết kế layout nhanh, responsive, sử dụng grid system, component tiện ích. |
| [![Swiper.js](https://img.shields.io/badge/Swiper.js-007aff?style=for-the-badge&logo=swiper&logoColor=white)](https://swiperjs.com/) | JS Library | Tạo carousel, slider ảnh/ nội dung linh hoạt cho trang chủ, trang liên hoan phim. |
| [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript) | Front-End Scripting | Tạo tương tác động: xử lý sự kiện, validate form, điều khiển slider. |
| [![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/) | Code Editor | Viết mã, debug, định dạng file thuận tiện. |
| [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/) | VCS / Platform | Quản lý source code, version, hợp tác nhóm qua repo. |
| [![Live Server](https://img.shields.io/badge/Live%20Server-FF4081?style=for-the-badge&logo=visualstudiocode&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) | Development Tool | Chạy app thời gian thực trên trình duyệt, xem thay đổi ngay lập tức. |

---

## 🧩 Kiến trúc Hệ thống

Sơ đồ dưới đây mô tả cách các thành phần trong hệ thống tương tác với nhau.

![Sơ đồ Kiến trúc Hệ thống](./architecture-diagram.png)

---

## ✨ Tính năng Chính

| Tính năng | Mô tả |
| :--- | :--- |
| **Trang chủ** | Hiển thị tổng quan phim nổi bật, banner quảng cáo và điều hướng đến các trang khác. |
| **Form Đăng nhập** | Cho phép người dùng đăng nhập bằng tài khoản để sử dụng các chức năng cá nhân. |
| **Form Đăng ký** | Cung cấp biểu mẫu để người dùng tạo tài khoản mới. |
| **Trang lịch chiếu** | Hiển thị danh sách phim và thời gian chiếu theo rạp. |
| **Trang tin tức** | Cập nhật tin tức mới nhất liên quan đến điện ảnh và hoạt động của rạp. |
| **Trang khuyến mãi** | Giới thiệu các chương trình ưu đãi, giảm giá dành cho khách hàng. |
| **Trang giá vé** | Thông tin chi tiết về bảng giá vé theo loại ghế, suất chiếu. |
| **Trang liên hoan phim** | Giới thiệu sự kiện liên hoan phim, các phim tham gia và lịch trình. |
| **Trang giới thiệu** | Cung cấp thông tin tổng quan về hệ thống rạp phim và dịch vụ. |
| **Trang chi tiết lịch chiếu** | Hiển thị thông tin chi tiết về lịch chiếu của từng bộ phim. |
| **Trang chi tiết tin tức** | Trình bày nội dung đầy đủ của một tin tức cụ thể. |
| **Trang chi tiết khuyến mãi** | Thông tin chi tiết về từng chương trình khuyến mãi. |
| **Header** | Thanh điều hướng chung, xuất hiện trên toàn bộ trang website. |
| **Footer** | Chứa thông tin liên hệ, liên kết nhanh và xuất hiện trên toàn bộ website. |

---

## 🎥 Demo & Đánh giá

*   **Video Demo:** Toàn bộ luồng hoạt động của sản phẩm đã được ghi lại trong video này. **[Nhấn vào đây để xem!](https://youtu.be/kZNC9iPoyG0)**
*   **Đánh giá:** Dự án đã được **Thầy Phan Văn Tính - Giám đốc xưởng phần mềm - Trường cao đẳng fpt polytechnic cơ sở Cần Thơ** đánh giá và công nhận đạt kết quả **Xuất sắc**.
*   **Thành viên:** Dự án được thực hiện bởi:
    *   **Nguyễn Tấn Tài - Nhóm trưởng**
    *   Nguyễn Thị Ngọc Nghi
    *   Nguyễn Long Nhi
    *   Ngô Gia Huy
*   **Chứng nhận**
---
![Chứng nhận](./certification.jpg)