-- Majors
INSERT INTO majors (created_at, description, name, status) VALUES
('2023-09-01 10:00:00', 'Phát triển và xây dựng các ứng dụng web hiện đại, cả frontend và backend.', 'Web Development', 'ACTIVE'),
('2023-09-02 11:30:00', 'Thiết kế giao diện người dùng và trải nghiệm người dùng cho các sản phẩm số.', 'UI/UX Design', 'ACTIVE'),
('2023-09-03 14:15:00', 'Lập trình ứng dụng di động trên nền tảng Android và iOS.', 'Mobile Development', 'ACTIVE'),
('2023-09-04 09:20:00', 'Phát triển và triển khai mô hình học máy và trí tuệ nhân tạo.', 'AI/ML Engineering', 'ACTIVE'),
('2023-09-05 08:00:00', 'Viết và quản lý nội dung kỹ thuật cho sản phẩm phần mềm, blog và tài liệu hướng dẫn.', 'Technical Writing', 'ACTIVE'),
('2023-09-06 13:45:00', 'Kiểm thử phần mềm, viết test case và báo cáo lỗi.', 'Software Testing & QA', 'ACTIVE'),
('2023-09-07 15:30:00', 'Quản trị hệ thống máy chủ, DevOps, CI/CD và các dịch vụ cloud.', 'DevOps & SysAdmin', 'ACTIVE'),
('2023-09-08 16:10:00', 'Phân tích và trực quan hóa dữ liệu nhằm đưa ra quyết định kinh doanh.', 'Data Analysis', 'ACTIVE'),
('2023-09-09 17:00:00', 'Tư vấn và thực hiện các chiến dịch quảng bá sản phẩm trên nền tảng số.', 'Digital Marketing', 'ACTIVE'),
('2023-09-10 18:30:00', 'Thiết kế đồ họa phục vụ quảng cáo, website và sản phẩm kỹ thuật số.', 'Graphic Design', 'ACTIVE');

-- Skills
INSERT INTO `skills` (`created_at`, `description`, `name`, `status`, `major_id`) VALUES
('2023-10-01 09:00:00.000000', 'Kỹ năng xây dựng ứng dụng web bằng framework phổ biến và thân thiện với SEO.', 'ReactJS', 'ACTIVE', 1),
('2023-10-02 10:30:00.000000', 'Thành thạo xây dựng API RESTful và quản lý cơ sở dữ liệu.', 'Node.js', 'ACTIVE', 1),
('2023-10-03 14:00:00.000000', 'Thiết kế giao diện đẹp mắt và tối ưu trải nghiệm người dùng.', 'Figma', 'ACTIVE', 2),
('2023-10-04 11:15:00.000000', 'Hiểu rõ nguyên tắc UX, tạo ra wireframe và prototype hiệu quả.', 'UX Research', 'ACTIVE', 2),
('2023-10-05 13:45:00.000000', 'Phát triển ứng dụng di động native cho nền tảng iOS.', 'Swift', 'ACTIVE', 3),
('2023-10-06 15:00:00.000000', 'Phát triển ứng dụng Android sử dụng Android Studio và Kotlin.', 'Kotlin', 'ACTIVE', 3),
('2023-10-07 09:30:00.000000', 'Áp dụng thuật toán học sâu để xử lý ảnh và ngôn ngữ.', 'Deep Learning', 'ACTIVE', 4),
('2023-10-08 10:45:00.000000', 'Sử dụng thư viện scikit-learn, pandas và NumPy để huấn luyện mô hình.', 'Machine Learning', 'ACTIVE', 4),
('2023-10-09 12:00:00.000000', 'Kỹ năng viết tài liệu API và bài hướng dẫn sử dụng.', 'API Documentation', 'ACTIVE', 5),
('2023-10-10 14:30:00.000000', 'Viết blog kỹ thuật với nội dung chuyên sâu, dễ hiểu.', 'Technical Blogging', 'ACTIVE', 5),
('2023-10-11 16:00:00.000000', 'Thực hiện kiểm thử chức năng và hồi quy trên ứng dụng web.', 'Manual Testing', 'ACTIVE', 6),
('2023-10-12 17:15:00.000000', 'Viết test case tự động với Selenium và kiểm thử hiệu năng.', 'Automated Testing', 'ACTIVE', 6),
('2023-10-13 10:20:00.000000', 'Triển khai CI/CD pipeline sử dụng Jenkins, GitLab CI.', 'CI/CD', 'ACTIVE', 7),
('2023-10-14 11:35:00.000000', 'Quản trị hệ thống Linux và giám sát dịch vụ cloud.', 'Linux Administration', 'ACTIVE', 7),
('2023-10-15 13:50:00.000000', 'Trực quan hóa dữ liệu với Power BI và Tableau.', 'Data Visualization', 'ACTIVE', 8),
('2023-10-16 15:10:00.000000', 'Phân tích dữ liệu lớn và lập báo cáo tổng hợp.', 'Data Analytics', 'ACTIVE', 8),
('2023-10-17 09:25:00.000000', 'Tối ưu hóa nội dung và từ khóa cho website.', 'SEO Optimization', 'ACTIVE', 9),
('2023-10-18 10:40:00.000000', 'Chạy quảng cáo Facebook Ads và Google Ads hiệu quả.', 'PPC Advertising', 'ACTIVE', 9),
('2023-10-19 12:55:00.000000', 'Thiết kế banner quảng cáo, brochure và logo sáng tạo.', 'Adobe Illustrator', 'ACTIVE', 10),
('2023-10-20 14:10:00.000000', 'Chỉnh sửa hình ảnh và tạo layout website.', 'Adobe Photoshop', 'ACTIVE', 10);

--Languages
INSERT INTO `languages` (`created_at`, `iso`, `name`, `status`) VALUES
(NOW(), 'EN', 'English', 'ACTIVE'), (NOW(), 'VI', 'Vietnamese', 'ACTIVE'), (NOW(), 'FR', 'French', 'ACTIVE'), (NOW(), 'DE', 'German', 'ACTIVE'),
(NOW(), 'ES', 'Spanish', 'ACTIVE'), (NOW(), 'RU', 'Russian', 'ACTIVE'), (NOW(), 'JA', 'Japanese', 'ACTIVE'), (NOW(), 'KO', 'Korean', 'ACTIVE'),
(NOW(), 'ZH', 'Chinese', 'ACTIVE'), (NOW(), 'IT', 'Italian', 'ACTIVE'), (NOW(), 'NL', 'Dutch', 'ACTIVE'), (NOW(), 'TR', 'Turkish', 'ACTIVE'),
(NOW(), 'PT', 'Portuguese', 'ACTIVE'), (NOW(), 'PL', 'Polish', 'ACTIVE'), (NOW(), 'HI', 'Hindi', 'ACTIVE'), (NOW(), 'TH', 'Thai', 'ACTIVE'),
(NOW(), 'UK', 'Ukrainian', 'ACTIVE'), (NOW(), 'ID', 'Indonesian', 'ACTIVE'), (NOW(), 'MS', 'Malay', 'ACTIVE'), (NOW(), 'SV', 'Swedish', 'ACTIVE');


--Roles 
INSERT INTO `roles` (`description`, `name`,`code`) VALUES
('Quản lý vận hành toàn bộ hệ thống, bao gồm giám sát server, xử lý sự cố, đảm bảo hiệu suất và bảo mật', 'Quản lý vận hành','QUAN_LY_VAN_HANH'),
('Tiếp nhận, phân tích và phản hồi các báo cáo lỗi, phản hồi từ người dùng hoặc khách hàng', 'Phản hồi báo cáo','PHAN_HOI_BAO_CAO'),
('Quản lý tài khoản người dùng, phân quyền, xác thực và kiểm soát truy cập hệ thống', 'Quản lý người dùng','QUAN_LY_NGUOI_DUNG'),
('Theo dõi và điều phối toàn bộ tiến độ và hiệu quả các dự án freelancer trong hệ thống', 'Quản lý dự án', 'QUAN_LY_DU_AN'),
('Giám sát các giao dịch tài chính, xử lý thanh toán giữa freelancer và khách hàng', 'Quản lý tài chính', 'QUAN_LY_TAI_CHINH'),
('Kiểm duyệt và quản lý nội dung các bài đăng công việc, mô tả hồ sơ freelancer', 'Quản lý nội dung', 'QUAN_LY_NOI_DUNG'),
('Xử lý các tranh chấp, khiếu nại giữa người dùng, freelancer và khách hàng', 'Quản lý khiếu nại', 'QUAN_LY_KHIEU_NAI'),
('Thực hiện các chiến dịch truyền thông, email marketing và thông báo hệ thống', 'Quản lý truyền thông', 'QUAN_LY_TRUYEN_THONG');

-- Roles_Permissions
INSERT INTO permissions_roles (role_id, permission_id) VALUES
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10),
(4, 11), (4, 12), (5, 16), (5, 17), (5, 18), (5, 19), (6, 13), (6, 14), (6, 15);

--User Table 
INSERT INTO `users` (
  `role_type`, `birthday`, `email`, `full_name`, `joined_at`, `password`, `phone`, `status`, `bio`, `is_male`, `reputation`, `balance`, `role_id`
)
VALUES
-- FREELANCERS (role_id: 2)
('FREELANCER', '1997-08-21', 'hieu.nguyen.dev@gmail.com', 'Nguyễn Văn Hiếu', '2024-03-11 10:22:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', null, 'ACTIVE', 'Lập trình viên backend Java', 1, 120, 5000000, 2),
('FREELANCER', '1994-05-12', 'trang.design@gmail.com', 'Lê Thị Trang', '2023-11-05 09:15:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', null, 'ACTIVE',  'UI/UX Designer chuyên nghiệp', 0, 180, 12000000, 2),
('FREELANCER', '1990-12-20', 'nam.an.ai@gmail.com', 'Phạm Nam An', '2024-01-02 14:45:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0938123456', 'DISABLED',  'Chuyên gia AI - Python', 1, 220, 30000000, 2),
('FREELANCER', '1998-02-01', 'ngoc.quynh.it@gmail.com', 'Trần Ngọc Quỳnh', '2023-07-17 12:00:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0859123456', 'ACTIVE', 'Fullstack developer (React, NodeJS)', 0, 90, 8000000, 2),
('FREELANCER', '1995-03-19', 'anh.khoa.dev@gmail.com', 'Đỗ Anh Khoa', '2024-05-20 18:20:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0978234567', 'LOCKED', 'Chuyên lập trình mobile Flutter', 1, 60, 4500000, 2),
('FREELANCER', '1990-05-15', 'tranvanhuy@example.com', 'Trần Văn Huy', '2022-01-10 09:15:22.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0324567890', 'ACTIVE', 'Full-stack developer với 5 năm kinh nghiệm, chuyên về Java Spring Boot và React', 1, 850, 12000000, 2),
('FREELANCER', '1995-08-22', 'nguyenthimy@example.com', 'Nguyễn Thị Mỹ', '2022-02-15 14:30:45.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0567890123', 'ACTIVE', 'UI/UX Designer, tạo ra trải nghiệm người dùng tuyệt vời', 0, 720, 8000000, 2),
('FREELANCER', '1988-11-30', 'levanlong@example.com', 'Lê Văn Long', '2022-03-05 11:20:33.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0901234567', 'ACTIVE', 'Chuyên gia DevOps với chứng chỉ AWS và Docker', 1, 950, 15000000, 2),
('FREELANCER', '1993-04-18', 'phamthuha@example.com', 'Phạm Thu Hà', '2022-04-20 16:45:12.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0789012345', 'ACTIVE', 'Mobile developer chuyên về Flutter và React Native', 0, 680, 9000000, 2),
('FREELANCER', '1991-07-25', 'hoangminhtuan@example.com', 'Hoàng Minh Tuấn', '2022-05-12 10:10:10.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0890123456', 'LOCKED', 'Backend developer Python Django, bị khóa tài khoản do vi phạm', 1, 450, 5000000, 2),
('FREELANCER', '1994-09-08', 'nguyenquanghuy@example.com', 'Nguyễn Quang Huy', '2022-06-01 11:11:11.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0345678902', 'ACTIVE', 'Frontend developer chuyên về Vue.js và TypeScript', 1, 780, 11000000, 2),
('FREELANCER', '1996-12-24', 'tranthithuy@example.com', 'Trần Thị Thủy', '2022-07-15 15:45:30.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', null, 'ACTIVE', 'Data scientist với kinh nghiệm về machine learning', 0, 920, 18000000, 2),

-- EMPLOYERS (role_id: 3)
('EMPLOYER', '1986-09-15', 'minh.hoang@abcsoft.com', 'Hoàng Minh', '2023-04-12 08:00:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0967123456', 'ACTIVE',  'Giám đốc dự án tại ABCSoft', 1, 231, 100000000, 3),
('EMPLOYER', '1992-01-30', 'linh.nguyen@fastcorp.vn', 'Nguyễn Thị Linh', '2024-02-08 16:10:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0909123456', 'ACTIVE',  'HR Manager tại FastCorp', 0, 132, 35000000, 3),
('EMPLOYER', '1988-07-23', 'duy.tran@startit.io', 'Trần Văn Duy', '2023-10-01 10:45:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', null, 'DISABLED',  'CTO tại StartIT', 1, 64, 50000000, 3),
('EMPLOYER', '1991-06-11', 'quyen.le@hitechgroup.vn', 'Lê Thị Quyên', '2023-06-09 11:30:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', null, 'ACTIVE',  'Founder tại Hitech Group', 0, 853, 75000000, 3),
('EMPLOYER', '1985-11-29', 'tuan.nguyen@futuretech.com', 'Nguyễn Tuấn', '2024-01-15 09:20:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0937123456', 'LOCKED',  'Trưởng phòng IT - FutureTech', 1, 213, 42000000, 3),
('EMPLOYER', '1985-02-10', 'techsolutions@example.com', 'Công ty Tech Solutions', '2022-01-05 08:00:00.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', null, 'ACTIVE', 'Công ty phát triển phần mềm hàng đầu Việt Nam', 1, 342, 50000000, 3),
('EMPLOYER', '1980-09-15', 'digitalagency@example.com', 'Digital Agency Co', '2022-02-01 13:25:30.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0328901234', 'ACTIVE', 'Cung cấp dịch vụ marketing số và phát triển web', 1, 654, 30000000, 3),
('EMPLOYER', '1978-12-20', 'startupvn@example.com', 'Startup Việt Nam', '2022-03-15 10:45:55.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0987654329', 'ACTIVE', 'Vườn ươm khởi nghiệp công nghệ', 1, 321, 20000000, 3),
('EMPLOYER', '1990-06-30', 'ecommercesaigon@example.com', 'Ecommerce Sài Gòn', '2022-04-10 09:30:20.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0765432109', 'DISABLED', 'Sàn thương mại điện tử đã ngừng hoạt động', 1, 241, 0, 3),
('EMPLOYER', '1987-03-05', 'fintechcompany@example.com', 'Fintech Company Ltd', '2022-05-01 14:15:40.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0345678901', 'ACTIVE', 'Công ty công nghệ tài chính hàng đầu', 1, 239, 40000000, 3),
('EMPLOYER', '1983-05-17', 'blockchaincompany@example.com', 'Blockchain Company', '2022-06-10 10:00:00.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0890123457', 'ACTIVE', 'Công ty phát triển giải pháp blockchain', 1, 281, 35000000, 3),
('EMPLOYER', '1975-10-05', 'edtechvn@example.com', 'EdTech Việt Nam', '2022-07-01 09:15:00.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0567890124', 'ACTIVE', 'Cung cấp giải pháp giáo dục trực tuyến', 1, 164, 25000000, 3),

-- STAFFS (role_id: 4, 5, 6)
('STAFF', '1987-10-10', 'hien.vo@adminsys.com', 'Võ Thị Hiền', '2022-12-05 08:00:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0971123456', 'ACTIVE', 'Quản trị hệ thống', 0, 0, 0, 4),
('STAFF', '1990-02-22', 'khanh.pham@adminsys.com', 'Phạm Khánh', '2023-03-14 10:00:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0903123456', 'ACTIVE','Xử lý sự cố hệ thống', 1, 0, 0, 4),
('STAFF', '1989-09-09', 'my.dang@support.com', 'Đặng Thị Mỹ', '2023-07-19 14:50:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0911123456', 'DISABLED', 'Tiếp nhận phản hồi', 0, 0, 0, 5),
('STAFF', '1993-04-04', 'kien.nguyen@security.com', 'Nguyễn Văn Kiên', '2023-09-01 13:00:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0986123456', 'ACTIVE', 'Bảo mật hệ thống', 1, 0, 0, 6),
('STAFF', '1996-12-31', 'thu.tran@accounts.com', 'Trần Thị Thu', '2024-04-22 16:45:00', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', '0939123456', 'ACTIVE', 'Quản lý người dùng', 0, 0, 0, 6),
('STAFF', '1989-01-28', 'securityadmin@example.com', 'Vũ An Ninh', '2021-12-20 00:00:00.000000', '$2a$10$4tId9SibVXSdB56tbOAJ9eoFtTxp0PXJuPmb8/BZUy4NXPmKJY4Gu', null, 'ACTIVE', 'Quản trị bảo mật hệ thống', 1, 0, 0, 6);

-- Certificates
INSERT INTO certifications (back_image, expiry_date, front_image, issue_by, issue_date, link, name, status, freelancer_id) VALUES
(NULL, '2026-05-15', NULL, 'Google', '2024-05-15', NULL, 'Google Associate Cloud Engineer', 'ACTIVE', 2),
(NULL, '2025-11-10', NULL, 'Adobe', '2023-11-10', NULL, 'Adobe Certified Expert - XD', 'ACTIVE', 3),
(NULL, '2024-12-01', NULL, 'Microsoft', '2021-12-01', NULL, 'Microsoft Certified: Azure Fundamentals', 'EXPIRED', 4),
(NULL, '2027-07-20', NULL, 'Meta', '2024-07-20', NULL, 'Meta Front-End Developer Certificate', 'ACTIVE', 5),
(NULL, '2025-03-30', NULL, 'Google', '2023-03-30', NULL, 'Google Android Developer Certification', 'ACTIVE', 6),
(NULL, '2025-06-01', NULL, 'Oracle', '2023-06-01', NULL, 'Oracle Certified Java Developer', 'ACTIVE', 7),
(NULL, '2026-01-25', NULL, 'Interaction Design Foundation', '2024-01-25', NULL, 'UX Design Certification', 'ACTIVE', 8),
(NULL, '2026-03-01', NULL, 'AWS', '2024-03-01', NULL, 'AWS Certified DevOps Engineer', 'ACTIVE', 9),
(NULL, '2024-04-20', NULL, 'Coursera - Google', '2022-04-20', NULL, 'Flutter Development Bootcamp', 'EXPIRED', 10),
(NULL, '2025-08-15', NULL, 'HarvardX', '2023-08-15', NULL, 'CS50: Introduction to Computer Science', 'ACTIVE', 11),
(NULL, '2027-01-10', NULL, 'Udacity', '2025-01-10', NULL, 'Data Engineering Nanodegree', 'ACTIVE', 12),
(NULL, '2025-09-01', NULL, 'Udemy', '2023-09-01', NULL, 'TypeScript Masterclass', 'ACTIVE', 12),
(NULL, '2026-11-11', NULL, 'DeepLearning.AI', '2024-11-11', NULL, 'Machine Learning Specialization', 'ACTIVE', 13),
(NULL, '2023-05-01', NULL, 'HackerRank', '2021-05-01', NULL, 'HackerRank Java Certificate', 'EXPIRED', 2),
(NULL, '2026-12-12', NULL, 'AWS', '2024-12-12', NULL, 'AWS Certified Solutions Architect', 'ACTIVE', 9),
(NULL, '2025-10-10', NULL, 'Coursera - Meta', '2023-10-10', NULL, 'Meta React Developer', 'ACTIVE', 5),
(NULL, '2024-11-20', NULL, 'LinkedIn Learning', '2022-11-20', NULL, 'Agile Project Management', 'EXPIRED', 7),
(NULL, '2026-06-30', NULL, 'Google', '2024-06-30', NULL, 'Google UX Design Certificate', 'ACTIVE', 3),
(NULL, '2025-07-15', NULL, 'IBM', '2023-07-15', NULL, 'IBM AI Engineering Professional Certificate', 'ACTIVE', 13),
(NULL, '2024-01-01', NULL, 'Coursera - Stanford', '2021-01-01', NULL, 'Machine Learning by Andrew Ng', 'EXPIRED', 4),
(NULL, '2025-02-28', NULL, 'Udemy', '2023-02-28', NULL, 'Docker & Kubernetes Mastery', 'ACTIVE', 9);

--Educations
INSERT INTO `educations` (`degree`, `description`, `end_date`, `gpa`, `major`, `school_name`, `start_date`, `freelancer_id`) VALUES
('Cử nhân Công nghệ thông tin', 'Tập trung vào phát triển phần mềm và hệ thống Java.', '2019-06-15', 8.20, 'Công nghệ phần mềm', 'Đại học Bách Khoa Hà Nội', '2015-09-01', 2),
('Thạc sĩ Khoa học Máy tính', 'Nghiên cứu chuyên sâu về trí tuệ nhân tạo.', '2021-06-30', 9.00, 'Trí tuệ nhân tạo', 'Đại học Khoa học Tự nhiên TP.HCM', '2019-09-01', 4),
('Cử nhân Thiết kế Đồ họa', 'Thiết kế UX/UI và nguyên lý thị giác.', '2016-06-10', 8.70, 'Thiết kế Đồ họa', 'Đại học Mỹ thuật Công nghiệp', '2012-09-01', 3),
('Chứng chỉ UX nâng cao', 'Khóa học chuyên sâu về UX tại nước ngoài.', '2018-08-01', 9.50, 'UX Design', 'General Assembly Singapore', '2017-01-15', 3),
('Cử nhân Kỹ thuật phần mềm', 'Tập trung về phát triển ứng dụng web.', '2020-07-01', 8.80, 'Kỹ thuật phần mềm', 'Đại học Công nghệ Thông tin TP.HCM', '2016-09-01', 5),
('Chứng chỉ React.js', 'Học chuyên sâu về thư viện React và Redux.', '2021-03-15', 9.00, 'Web Frontend', 'freeCodeCamp', '2020-12-01', 5),
('Cử nhân Khoa học Máy tính', 'Chuyên ngành AI và học máy.', '2012-06-01', 8.90, 'Khoa học Máy tính', 'Đại học Quốc gia Hà Nội', '2008-09-01', 4),
('Thạc sĩ Machine Learning', 'Nghiên cứu và phát triển mô hình AI.', '2015-06-30', 9.20, 'Machine Learning', 'Đại học Stanford', '2013-09-01', 4),
('Cử nhân Công nghệ phần mềm', 'Phát triển phần mềm đa nền tảng.', '2017-06-01', 8.50, 'Công nghệ phần mềm', 'Đại học FPT', '2013-09-01', 6),
('Chứng chỉ Flutter', 'Phát triển ứng dụng mobile đa nền tảng.', '2020-11-10', 9.00, 'Mobile Dev', 'Udemy', '2020-06-01', 6),
('Cử nhân Công nghệ thông tin', 'Lập trình ứng dụng web và bảo mật.', '2015-06-30', 7.80, 'Hệ thống thông tin', 'Đại học Bách Khoa TP.HCM', '2011-09-01', 7),
('Chứng chỉ Spring Boot', 'Khóa học Spring Boot toàn diện.', '2018-03-01', 8.70, 'Java Backend', 'Coursera', '2017-07-01', 7),
('Cử nhân Mỹ thuật đa phương tiện', 'Thiết kế giao diện người dùng.', '2019-05-20', 8.60, 'Mỹ thuật số', 'Arena Multimedia', '2015-09-01', 8),
('Chứng chỉ Adobe XD', 'Khóa học Adobe XD nâng cao.', '2021-09-30', 9.10, 'UI Design', 'LinkedIn Learning', '2021-01-15', 8),
('Cử nhân Kỹ thuật Mạng', 'Chuyên ngành bảo mật và hệ thống.', '2010-06-10', 8.70, 'Hệ thống mạng', 'Đại học Giao thông Vận tải', '2006-09-01', 9),
('Chứng chỉ AWS Architect', 'Khóa học AWS và DevOps.', '2020-12-01', 9.00, 'DevOps', 'AWS Training Center', '2020-05-01', 9),
('Cử nhân Khoa học Máy tính', 'Phát triển ứng dụng di động.', '2014-06-15', 8.10, 'Mobile Development', 'Đại học Công nghệ Sài Gòn', '2010-09-01', 10),
('Chứng chỉ React Native', 'Khóa học lập trình React Native.', '2021-04-30', 9.00, 'React Native', 'Coursera', '2020-11-01', 10),
('Cử nhân Khoa học Máy tính', 'Lập trình viên backend Django.', '2013-06-30', 7.90, 'Khoa học Máy tính', 'Đại học Quốc tế RMIT', '2009-09-01', 11),
('Cử nhân Toán - Tin', 'Phân tích dữ liệu và mô hình học máy.', '2018-07-01', 8.60, 'Khoa học Dữ liệu', 'Đại học Khoa học Tự nhiên TP.HCM', '2014-09-01', 13);

--Skill Freelancer
-- Freelancer 2: Nguyễn Văn Hiếu - Lập trình viên backend Java
INSERT INTO skills_freelancers (skill_id, freelancer_id) VALUES 
(2, 2), (9, 2), (10, 2), (3, 3), (4, 3), (10, 3), (7, 4), (8, 4), (10, 4), (9, 4), (1, 5), (2, 5), (9, 5), (6, 6), (5, 6), (1, 7),
(2, 7), (9, 7), (10, 7), (3, 8), (4, 8), (9, 9), (10, 9), (2, 9), (5, 10), (6, 10), (1, 10), (2, 11), (9, 11), (1, 12), (10, 12),
(7, 13), (8, 13), (9, 13), (10, 13), (4, 5), (1, 11), (4, 10), (7, 8), (2, 10); 

-- Contacts
INSERT INTO `contacts` (`content`, `created_at`, `status`, `title`, `user_id`) VALUES
('Tôi muốn hệ thống thêm chuyên ngành Blockchain để tôi có thể tìm kiếm việc phù hợp hơn.', '2025-06-10 10:15:30.000000', 'PENDING', 'Thêm chuyên ngành Blockchain', 2),
('Đề xuất thêm kỹ năng “Kubernetes” để dễ dàng tìm việc DevOps.', '2025-06-09 08:45:00.000000', 'PENDING', 'Thêm kỹ năng Kubernetes', 9),
('Tôi thấy thiếu tag “Figma” cho các job thiết kế. Mong admin cập nhật.', '2025-06-08 14:23:12.000000', 'PENDING', 'Thiếu kỹ năng Figma', 3),
('Phần tìm kiếm nâng cao nên có bộ lọc theo mức độ kinh nghiệm.', '2025-06-07 11:12:05.000000', 'REJECTED', 'Cải thiện bộ lọc tìm kiếm', 7),
('Mong muốn thêm chuyên ngành “Game Development” để mở rộng cơ hội freelancer.', '2025-06-06 15:45:33.000000', 'ACCEPT', 'Thêm ngành Game Development', 6),
('Phần mô tả dự án cần cho phép đính kèm nhiều hình ảnh hơn.', '2025-06-05 16:30:00.000000', 'ACCEPT', 'Cho phép upload nhiều ảnh', 8),
('Tôi muốn có chức năng chat nhóm giữa freelancer và employer.', '2025-06-04 18:40:27.000000', 'PENDING', 'Tạo nhóm chat dự án', 12),
('Hệ thống nên gửi thông báo khi có job mới theo kỹ năng đã chọn.', '2025-06-03 07:22:14.000000', 'PENDING', 'Thông báo job theo kỹ năng', 4),
('Chức năng lọc theo mức lương tối thiểu chưa hoạt động đúng.', '2025-06-02 09:18:00.000000', 'RECALL', 'Bug lọc mức lương', 5),
('Đề xuất bổ sung chuyên ngành “Cybersecurity” vào danh sách chuyên môn.', '2025-06-01 13:00:00.000000', 'PENDING', 'Thêm ngành Cybersecurity', 11),
('Cần thêm kỹ năng “Adobe XD” trong mục UI/UX để phù hợp thực tế.', '2025-05-30 10:10:10.000000', 'ACCEPT', 'Thiếu kỹ năng Adobe XD', 8),
('Cho phép freelancer phản hồi đánh giá từ nhà tuyển dụng.', '2025-05-29 11:45:00.000000', 'RECALL', 'Tính năng phản hồi đánh giá', 2),
('Tôi cần thêm ngôn ngữ “Tiếng Nhật” để tìm job outsource từ Nhật Bản.', '2025-05-28 17:33:00.000000', 'PENDING', 'Thêm ngôn ngữ Tiếng Nhật', 10),
('Cần có chức năng xuất báo cáo thu nhập theo tháng.', '2025-05-27 12:12:12.000000', 'PENDING', 'Báo cáo thu nhập theo tháng', 13),
('Mong admin thêm kỹ năng về “CI/CD Pipeline” trong hồ sơ.', '2025-05-26 15:10:30.000000', 'PENDING', 'Bổ sung kỹ năng CI/CD', 9),
('Giao diện trên điện thoại bị lỗi không hiển thị nút Apply Job.', '2025-05-25 08:08:08.000000', 'REJECTED', 'Lỗi giao diện di động', 6),
('Tôi muốn admin thêm kỹ năng Machine Learning nâng cao.', '2025-05-24 09:30:00.000000', 'ACCEPT', 'Thêm ML nâng cao', 13),
('Chức năng gợi ý việc làm hiện tại hoạt động chưa tối ưu.', '2025-05-23 14:22:45.000000', 'RECALL', 'Cải thiện gợi ý việc làm', 5),
('Đề xuất thêm chức năng “lưu job yêu thích”.', '2025-05-22 16:00:00.000000', 'PENDING', 'Chức năng lưu job', 7),
('Tôi thấy thiếu kỹ năng “TypeScript” khi cập nhật hồ sơ.', '2025-05-21 11:11:11.000000', 'PENDING', 'Thêm kỹ năng TypeScript', 12);

-- Reports
INSERT INTO `reports` (`content`, `created_at`, `feedback`, `object_report_id`, `resolved_at`, `status`, `title`, `type`, `reporter_id`, `solver_id`)
VALUES
('Người dùng sử dụng hình ảnh giả mạo để tạo tài khoản.', '2024-07-01 10:00:00', 'Tài khoản đã bị khóa.', 3, '2024-07-02 14:00:00', 'ACCEPT', 'Báo cáo tài khoản giả mạo', 'USER', 2, 14),
('Công việc không đúng mô tả, yêu cầu khác hoàn toàn.', '2024-07-05 12:30:00', 'Đã yêu cầu chỉnh sửa nội dung job.', 1, '2024-07-06 09:00:00', 'RECALL', 'Job sai mô tả', 'JOB', 3, 14),
('Ứng viên spam apply nhiều lần vào cùng một job.', '2024-07-06 16:00:00', NULL, 2, NULL, 'PENDING', 'Spam apply', 'APLLY', 4, 15),
('Tài khoản này liên tục nhận việc rồi huỷ giữa chừng.', '2024-07-03 11:45:00', 'Chúng tôi đã cảnh cáo tài khoản.', 4, '2024-07-04 13:00:00', 'ACCEPT', 'Freelancer bỏ job', 'USER', 5, 14),
('Stage không hợp lệ, khách hàng yêu cầu không thực tế.', '2024-07-07 08:30:00', NULL, 5, NULL, 'PENDING', 'Stage không khả thi', 'STAGE', 6, 14),
('Sản phẩm bàn giao không đúng yêu cầu.', '2024-07-02 18:45:00', 'Đã yêu cầu chỉnh sửa sản phẩm.', 6, '2024-07-03 10:15:00', 'RECALL', 'Sai sản phẩm', 'PRODUCT', 7, 15),
('Ứng viên dùng thông tin giả trong hồ sơ.', '2024-07-08 09:10:00', 'Đã từ chối ứng viên.', 7, '2024-07-08 17:45:00', 'ACCEPT', 'Hồ sơ giả mạo', 'APLLY', 8, 14),
('Công việc này yêu cầu ngoài phạm vi hệ thống.', '2024-07-01 14:00:00', 'Đã xoá job khỏi hệ thống.', 8, '2024-07-02 11:00:00', 'ACCEPT', 'Job vi phạm chính sách', 'JOB', 9, 14),
('Người dùng đánh giá tiêu cực không có căn cứ.', '2024-07-03 15:20:00', NULL, 9, NULL, 'PENDING', 'Đánh giá sai lệch', 'EVALUATION', 10, 14),
('Người dùng cố tình spam nhiều đánh giá giả.', '2024-07-04 17:00:00', 'Đã xoá các đánh giá sai.', 10, '2024-07-05 10:00:00', 'ACCEPT', 'Spam đánh giá', 'EVALUATION', 11, 14),
('Job yêu cầu vượt quá thời hạn hệ thống cho phép.', '2024-07-06 11:30:00', NULL, 2, NULL, 'PENDING', 'Job quá thời hạn', 'JOB', 12, 15),
('Stage bị bỏ trống và không có nội dung mô tả.', '2024-07-06 12:00:00', 'Chúng tôi đã yêu cầu cập nhật.', 3, '2024-07-07 09:00:00', 'RECALL', 'Stage trống nội dung', 'STAGE', 13, 14),
('Người dùng lạm dụng report để gây khó dễ.', '2024-07-07 13:00:00', NULL, 4, NULL, 'PENDING', 'Lạm dụng báo cáo', 'USER', 2, 14),
('Sản phẩm vi phạm bản quyền, sử dụng template có sẵn.', '2024-07-05 10:15:00', 'Chúng tôi đang kiểm tra kỹ hơn.', 5, NULL, 'PENDING', 'Vi phạm bản quyền', 'PRODUCT', 3, 14),
('Freelancer không phản hồi yêu cầu chỉnh sửa sản phẩm.', '2024-07-03 16:30:00', 'Đã cảnh báo freelancer.', 6, '2024-07-04 08:30:00', 'ACCEPT', 'Không phản hồi chỉnh sửa', 'USER', 4, 15),
('Khách hàng đánh giá freelancer sai sự thật.', '2024-07-04 09:00:00', 'Đã xoá đánh giá.', 7, '2024-07-05 11:00:00', 'ACCEPT', 'Đánh giá không đúng', 'EVALUATION', 5, 14),
('Job bị sửa nhiều lần sau khi đã đăng tuyển.', '2024-07-08 14:30:00', 'Đã giới hạn số lần sửa.', 8, '2024-07-09 10:00:00', 'RECALL', 'Job chỉnh sửa liên tục', 'JOB', 6, 14),
('Stage không cập nhật tiến độ trong thời gian dài.', '2024-07-09 12:00:00', NULL, 9, NULL, 'PENDING', 'Stage không cập nhật', 'STAGE', 7, 15),
('Sản phẩm có mã độc và script không rõ nguồn gốc.', '2024-07-10 09:30:00', 'Đã yêu cầu kiểm tra mã.', 10, '2024-07-11 10:00:00', 'RECALL', 'Nghi vấn mã độc', 'PRODUCT', 8, 14),
('Freelancer gửi sản phẩm không liên quan job.', '2024-07-11 11:45:00', 'Đã cảnh báo và yêu cầu nộp lại.', 1, '2024-07-12 12:00:00', 'ACCEPT', 'Sai nội dung sản phẩm', 'PRODUCT', 9, 14);

-- history_banlaces
INSERT INTO history_banlaces (change_amount, created_at, freelancer_id) VALUES
(1500000, '2023-11-01 09:15:00.000000', 2), (-200000, '2023-11-10 13:45:00.000000', 2), (500000, '2023-12-05 17:30:00.000000', 2),
(-100000, '2024-01-08 10:10:00.000000', 2), (1000000, '2024-03-15 14:00:00.000000', 3), (-150000, '2024-03-18 09:40:00.000000', 3),
(2000000, '2024-05-20 08:00:00.000000', 3), (-500000, '2024-06-01 16:25:00.000000', 3), (1000000, '2023-12-01 11:11:11.000000', 4),
(-300000, '2024-01-20 13:45:00.000000', 4), (2500000, '2024-02-18 10:10:00.000000', 4), (-200000, '2024-03-01 15:30:00.000000', 4),
(1200000, '2023-08-25 09:00:00.000000', 5), (-150000, '2023-09-05 13:00:00.000000', 5), (1800000, '2024-02-11 08:30:00.000000', 5),
(-300000, '2024-03-10 11:11:00.000000', 5), (950000, '2023-10-10 15:15:15.000000', 6), (-100000, '2023-11-01 12:00:00.000000', 6),
(1350000, '2024-04-09 10:00:00.000000', 6), (-250000, '2024-04-18 14:45:00.000000', 6), (2500000, '2022-12-12 11:00:00.000000', 7),
(-500000, '2023-01-05 09:45:00.000000', 7), (1700000, '2023-07-07 10:10:10.000000', 7), (-200000, '2023-08-22 08:00:00.000000', 7),
(1200000, '2022-05-15 12:20:00.000000', 8), (-250000, '2022-06-20 14:30:00.000000', 8), (1900000, '2023-03-14 16:00:00.000000', 8),
(-180000, '2023-04-01 09:00:00.000000', 8), (3200000, '2023-02-10 17:15:00.000000', 9), (-1000000, '2023-03-22 11:45:00.000000', 9),
(1800000, '2023-05-30 10:20:00.000000', 9), (-250000, '2023-07-01 13:33:00.000000', 9), (1400000, '2022-08-20 09:10:00.000000', 10),
(-100000, '2022-09-01 10:10:00.000000', 10), (2000000, '2023-04-04 14:14:14.000000', 10), (-300000, '2023-05-05 12:00:00.000000', 10),
(1000000, '2022-06-12 08:08:00.000000', 11), (-150000, '2022-07-01 11:11:00.000000', 11), (1800000, '2023-01-01 09:00:00.000000', 11),
(-200000, '2023-03-03 10:10:00.000000', 11), (2400000, '2023-02-15 10:00:00.000000', 12), (-600000, '2023-03-20 12:20:00.000000', 12),
(1500000, '2024-01-10 15:00:00.000000', 12), (-300000, '2024-02-25 09:30:00.000000', 12), (1800000, '2023-03-01 14:00:00.000000', 13),
(-200000, '2023-03-12 16:45:00.000000', 13), (2200000, '2023-08-08 11:20:00.000000', 13), (-250000, '2023-09-22 12:30:00.000000', 13),
(1300000, '2023-10-30 08:00:00.000000', 2), (-100000, '2023-11-15 10:10:00.000000', 2), (1700000, '2024-01-01 09:30:00.000000', 3),
(-250000, '2024-02-10 11:11:00.000000', 3);

-- Requests_Payments
INSERT INTO `request_payments` 
(`account_holder_name`, `amount`, `bank_account_number`, `bank_name`, `created_at`, `status`, `freelancer_id`)
VALUES
('Nguyễn Văn Hiếu', 2500000, '9704221234567890', 'MB Bank', '2024-06-01 10:20:00.000000', 'PENDING', 2),
('Nguyễn Văn Hiếu', 1500000, '9704221234567890', 'MB Bank', '2024-04-15 08:40:00.000000', 'ACCEPT', 2),
('Nguyễn Văn Hiếu', 500000, '9704221234567890', 'MB Bank', '2024-03-20 11:15:00.000000', 'REJECTED', 2),
('Lê Thị Trang', 3000000, '9704369876543210', 'Vietcombank', '2024-06-05 09:35:00.000000', 'ACCEPT', 3),
('Lê Thị Trang', 2000000, '9704369876543210', 'Vietcombank', '2024-05-10 13:50:00.000000', 'PENDING', 3),
('Lê Thị Trang', 1000000, '9704369876543210', 'Vietcombank', '2024-03-01 15:00:00.000000', 'REJECTED', 3),
('Lê Thị Trang', 4000000, '9704369876543210', 'Vietcombank', '2024-02-18 10:10:00.000000', 'ACCEPT', 3),
('Phạm Nam An', 10000000, '9704091234567890', 'Techcombank', '2023-12-20 09:00:00.000000', 'ACCEPT', 4),
('Phạm Nam An', 5000000, '9704091234567890', 'Techcombank', '2024-01-01 14:10:00.000000', 'PENDING', 4),
('Phạm Nam An', 3000000, '9704091234567890', 'Techcombank', '2024-02-12 12:12:00.000000', 'REJECTED', 4),
('Trần Ngọc Quỳnh', 1500000, '9704221111222233', 'BIDV', '2024-06-10 16:20:00.000000', 'PENDING', 5),
('Trần Ngọc Quỳnh', 2000000, '9704221111222233', 'BIDV', '2024-05-05 10:30:00.000000', 'ACCEPT', 5),
('Trần Ngọc Quỳnh', 500000, '9704221111222233', 'BIDV', '2024-04-01 14:00:00.000000', 'REJECTED', 5),
('Đỗ Anh Khoa', 1000000, '9704328765432100', 'ACB', '2024-05-18 17:40:00.000000', 'PENDING', 6),
('Đỗ Anh Khoa', 800000, '9704328765432100', 'ACB', '2024-04-25 11:10:00.000000', 'ACCEPT', 6),
('Đỗ Anh Khoa', 600000, '9704328765432100', 'ACB', '2024-03-13 08:00:00.000000', 'REJECTED', 6),
('Trần Văn Huy', 10000000, '9704441122334455', 'Agribank', '2024-05-21 09:00:00.000000', 'ACCEPT', 7),
('Trần Văn Huy', 2000000, '9704441122334455', 'Agribank', '2024-04-14 10:30:00.000000', 'PENDING', 7),
('Trần Văn Huy', 3000000, '9704441122334455', 'Agribank', '2024-03-03 15:00:00.000000', 'ACCEPT', 7),
('Trần Văn Huy', 1000000, '9704441122334455', 'Agribank', '2024-02-01 14:45:00.000000', 'REJECTED', 7),
('Nguyễn Thị Mỹ', 1200000, '9704334455667788', 'Sacombank', '2024-06-09 11:30:00.000000', 'PENDING', 8),
('Nguyễn Thị Mỹ', 1000000, '9704334455667788', 'Sacombank', '2024-05-19 10:45:00.000000', 'ACCEPT', 8),
('Nguyễn Thị Mỹ', 800000, '9704334455667788', 'Sacombank', '2024-04-08 12:00:00.000000', 'REJECTED', 8),
('Nguyễn Thị Mỹ', 2000000, '9704334455667788', 'Sacombank', '2024-03-06 13:10:00.000000', 'ACCEPT', 8),
('Lê Văn Long', 5000000, '9704889988776655', 'Vietinbank', '2024-05-15 16:00:00.000000', 'ACCEPT', 9),
('Lê Văn Long', 2000000, '9704889988776655', 'Vietinbank', '2024-04-22 17:20:00.000000', 'PENDING', 9),
('Lê Văn Long', 1500000, '9704889988776655', 'Vietinbank', '2024-03-18 14:00:00.000000', 'REJECTED', 9),
('Phạm Thu Hà', 1200000, '9704991122443355', 'TPBank', '2024-06-03 09:00:00.000000', 'PENDING', 10),
('Phạm Thu Hà', 3000000, '9704991122443355', 'TPBank', '2024-05-10 11:11:00.000000', 'ACCEPT', 10),
('Phạm Thu Hà', 2000000, '9704991122443355', 'TPBank', '2024-04-04 13:30:00.000000', 'REJECTED', 10),
('Hoàng Minh Tuấn', 1000000, '9704112345678999', 'BIDV', '2024-05-12 10:10:10.000000', 'REJECTED', 11),
('Hoàng Minh Tuấn', 700000, '9704112345678999', 'BIDV', '2024-04-18 08:45:00.000000', 'PENDING', 11),
('Hoàng Minh Tuấn', 900000, '9704112345678999', 'BIDV', '2024-03-30 09:55:00.000000', 'ACCEPT', 11),
('Nguyễn Quang Huy', 4000000, '9704556677889900', 'MSB', '2024-05-22 12:12:00.000000', 'ACCEPT', 12),
('Nguyễn Quang Huy', 2500000, '9704556677889900', 'MSB', '2024-04-11 14:00:00.000000', 'PENDING', 12),
('Trần Thị Thủy', 6000000, '9704229999888777', 'OCB', '2024-05-30 15:45:00.000000', 'PENDING', 13),
('Trần Thị Thủy', 5000000, '9704229999888777', 'OCB', '2024-04-20 16:30:00.000000', 'ACCEPT', 13);

-- Reviews
INSERT INTO `reviews` (`created_at`, `employer_content`, `employer_rated`, `employer_rating`, `freelancer_content`, `freelancer_rated`, `freelancer_rating`, `employer_id`, `freelancer_id`) VALUES
('2024-01-15 14:30:22.000000', 'Freelancer làm việc rất chuyên nghiệp, code sạch sẽ và đúng hẹn. Sẽ tiếp tục hợp tác trong các dự án tới.', 1, 5, 'Employer rất nhiệt tình, yêu cầu rõ ràng và thanh toán đúng hạn.', 1, 5, 14, 2),
('2024-02-20 09:15:33.000000', 'Thiết kế UI/UX tốt nhưng cần cải thiện tốc độ hoàn thành công việc', 1, 4, 'Yêu cầu dự án thay đổi liên tục nhưng employer vẫn kiên nhẫn hỗ trợ', 1, 4, 15, 3),
('2024-03-05 16:45:12.000000', 'Chuyên môn AI rất tốt nhưng giao tiếp còn hạn chế, đôi khi phản hồi chậm', 1, 3, 'Dự án phức tạp nhưng employer không cung cấp đủ tài liệu đặc tả', 1, 3, 16, 4),
('2023-08-10 11:20:45.000000', 'Fullstack developer xuất sắc, giải quyết được mọi vấn đề phát sinh', 1, 5, 'Môi trường làm việc linh hoạt, được tự chủ trong công việc', 1, 5, 17, 5),
('2024-06-01 13:10:28.000000', 'App Flutter chạy tốt nhưng cần fix một số bug nhỏ sau khi bàn giao', 1, 4, 'Thanh toán chậm hơn thỏa thuận ban đầu', 1, 3, 18, 6),
('2022-02-15 10:30:00.000000', 'Kinh nghiệm Java Spring Boot tốt, hoàn thành dự án trước deadline', 1, 5, 'Yêu cầu rõ ràng, thanh toán đúng hạn', 1, 5, 19, 7),
('2022-03-20 14:20:00.000000', 'Thiết kế UI/UX đẹp nhưng cần bổ sung nhiều phiên bản responsive hơn', 1, 4, 'Feedback thiết kế đôi khi không rõ ràng', 1, 4, 20, 8),
('2022-04-25 16:45:00.000000', 'Triển khai CI/CD rất chuyên nghiệp, giúp tối ưu quy trình phát triển', 1, 5, 'Có áp lực thời gian cao nhưng đổi lại được trả lương xứng đáng', 1, 4, 21, 9),
('2022-05-30 09:15:00.000000', 'App mobile chạy ổn định nhưng cần tối ưu hiệu năng tốt hơn', 1, 4, 'Thay đổi yêu cầu liên tục mà không gia hạn thêm thời gian', 1, 3, 22, 10),
('2022-06-10 11:30:00.000000', 'Code Python chất lượng nhưng thái độ làm việc không tốt', 1, 2, 'Yêu cầu không rõ ràng ngay từ đầu dẫn đến phải làm lại nhiều lần', 1, 2, 23, 11),
('2022-07-15 13:45:00.000000', 'Frontend Vue.js rất tốt, giao diện mượt mà và tương thích nhiều trình duyệt', 1, 5, 'Làm việc rất thoải mái, sẵn sàng trả thêm cho các yêu cầu phát sinh', 1, 5, 24, 12),
('2022-08-20 15:00:00.000000', 'Mô hình AI chính xác cao, giải thích thuật toán rõ ràng', 1, 5, 'Được tham gia vào dự án thú vị với dữ liệu chất lượng cao', 1, 5, 25, 13),
('2023-05-10 10:15:00.000000', 'Backend Java xử lý tốt lượng request lớn, hệ thống ổn định', 1, 5, 'Quy trình làm việc chuyên nghiệp, có PM hỗ trợ xuyên suốt', 1, 5, 14, 7),
('2023-06-12 14:30:00.000000', 'Thiết kế logo và branding đẹp nhưng cần chỉnh sửa nhiều lần', 1, 3, 'Không cung cấp đủ tài nguyên brand guideline ban đầu', 1, 3, 15, 8),
('2023-07-18 16:45:00.000000', 'Tự động hóa deployment giúp tiết kiệm 30% thời gian triển khai', 1, 5, 'Có cơ hội làm việc với công nghệ mới nhất', 1, 5, 16, 9),
('2023-08-22 09:00:00.000000', 'App React Native có một số lỗi trên iOS cần khắc phục', 1, 3, 'Chậm phê duyệt các bản cập nhật quan trọng', 1, 3, 17, 10),
('2023-09-25 11:15:00.000000', 'API Django hoạt động tốt nhưng documentation còn sơ sài', 1, 4, 'Yêu cầu thêm nhiều tính năng ngoài phạm vi ban đầu', 1, 3, 18, 11),
('2023-10-30 13:30:00.000000', 'Giao diện Vue.js mượt mà, tối ưu tốt cho SEO', 1, 5, 'Làm việc từ xa rất thuận tiện, communication tốt', 1, 5, 19, 12),
('2023-11-05 15:45:00.000000', 'Mô hình dự đoán chính xác đến 95%, vượt mong đợi', 1, 5, 'Được tiếp cận dataset chất lượng cao cho bài toán thực tế', 1, 5, 20, 13),
('2024-04-01 10:00:00.000000', 'Code Java clean, tuân thủ SOLID principles nhưng tốc độ hơi chậm', 1, 4, 'Có sự hỗ trợ tốt từ team nội bộ khi cần', 1, 4, 21, 2),
('2024-05-05 14:15:00.000000', 'Thiết kế UX cải thiện đáng kể tỉ lệ conversion', 1, 5, 'Có sự tin tưởng và trao quyền cho designer', 1, 5, 22, 3),
('2024-06-10 16:30:00.000000', 'Tích hợp AWS thành công nhưng chi phí cloud cao hơn dự kiến', 1, 4, 'Được tự do lựa chọn công nghệ phù hợp', 1, 4, 23, 4),
('2023-12-12 09:45:00.000000', 'Ứng dụng Flutter đáp ứng đúng yêu cầu nhưng có một số crash trên Android', 1, 4, 'Thanh toán đúng hạn nhưng quy trình phức tạp', 1, 4, 24, 6),
('2024-01-18 12:00:00.000000', 'Python script chạy ổn định nhưng thiếu xử lý edge cases', 1, 3, 'Yêu cầu thay đổi liên tục mà không điều chỉnh timeline', 1, 2, 25, 11),
('2024-02-22 14:15:00.000000', 'Frontend tương thích tốt với nhiều trình duyệt, load time nhanh', 1, 5, 'Có product owner hỗ trợ giải đáp mọi thắc mắc', 1, 5, 14, 12),
('2024-03-28 16:30:00.000000', 'Mô hình machine learning độ chính xác cao, giải thích rõ ràng', 1, 5, 'Được làm việc với bài toán thực tế có ý nghĩa', 1, 5, 15, 13),
('2023-04-15 10:45:00.000000', 'Xử lý được bài toán phức tạp nhưng code khó bảo trì', 1, 3, 'Áp lực deadline cao nhưng được trả thêm overtime', 1, 4, 16, 2),
('2023-05-20 13:00:00.000000', 'Thiết kế sáng tạo nhưng đôi khi không đúng với brand identity', 1, 3, 'Feedback không cụ thể, phải đoán ý nhiều', 1, 2, 17, 3),
('2023-06-25 15:15:00.000000', 'Tự động hóa testing giúp tiết kiệm 40% thời gian QA', 1, 5, 'Được đề xuất các giải pháp công nghệ mới mẻ', 1, 5, 18, 4),
('2023-07-30 17:30:00.000000', 'App mobile ổn định nhưng UI cần cải thiện trải nghiệm người dùng', 1, 4, 'Làm việc với team năng động và trẻ trung', 1, 4, 19, 5),
('2023-09-04 09:45:00.000000', 'Backend xử lý tốt lượng truy cập lớn nhưng API design chưa tối ưu', 1, 4, 'Có sự hỗ trợ kỹ thuật khi gặp khó khăn', 1, 4, 20, 7),
('2023-10-09 12:00:00.000000', 'Giao diện đẹp nhưng không responsive trên mobile', 1, 3, 'Thay đổi yêu cầu ở phút cuối nhiều lần', 1, 2, 21, 8),
('2023-11-14 14:15:00.000000', 'Triển khai Kubernetes thành công, hệ thống scale tốt', 1, 5, 'Được làm việc với hệ thống hiện đại, học hỏi nhiều', 1, 5, 22, 9),
('2023-12-19 16:30:00.000000', 'Ứng dụng có một số lỗi nhỏ nhưng fix nhanh và nhiệt tình', 1, 4, 'Communication tốt, luôn có mặt khi cần', 1, 5, 23, 10),
('2024-01-24 10:45:00.000000', 'Django API đầy đủ tính năng nhưng performance chưa tốt', 1, 3, 'Yêu cầu không rõ ràng ngay từ đầu', 1, 2, 24, 11),
('2024-02-29 13:00:00.000000', 'Vue.js app mượt mà, tối ưu tốt cho SEO', 1, 5, 'Quy trình làm việc chuyên nghiệp, rõ ràng', 1, 5, 25, 12),
('2024-04-05 15:15:00.000000', 'Mô hình AI chính xác, giải thích rõ cách hoạt động', 1, 5, 'Được cung cấp đầy đủ dữ liệu training chất lượng', 1, 5, 14, 13),
('2022-09-10 17:30:00.000000', 'Java code chất lượng cao, dễ bảo trì và mở rộng', 1, 5, 'Môi trường làm việc chuyên nghiệp, có mentor hỗ trợ', 1, 5, 15, 7),
('2022-10-15 09:45:00.000000', 'Thiết kế sáng tạo nhưng cần tuân thủ guideline nhiều hơn', 1, 4, 'Được tự do sáng tạo trong khuôn khổ dự án', 1, 4, 16, 8),
('2022-11-20 12:00:00.000000', 'CI/CD pipeline giúp giảm 50% thời gian release', 1, 5, 'Được tiếp cận với quy trình DevOps chuẩn mực', 1, 5, 17, 9),
('2022-12-25 14:15:00.000000', 'App chạy ổn định nhưng tiêu tốn nhiều tài nguyên', 1, 3, 'Có sự hỗ trợ kỹ thuật khi gặp vấn đề về performance', 1, 4, 18, 10),
('2023-01-30 16:30:00.000000', 'API Django hoạt động tốt nhưng thiếu unit test', 1, 3, 'Yêu cầu thay đổi liên tục mà không điều chỉnh deadline', 1, 2, 19, 11),
('2023-03-07 10:45:00.000000', 'Giao diện đẹp, tương tác mượt mà, tăng trải nghiệm người dùng', 1, 5, 'Feedback thiết kế rõ ràng, cụ thể', 1, 5, 20, 12),
('2023-04-12 13:00:00.000000', 'Mô hình dự đoán chính xác, giải pháp sáng tạo', 1, 5, 'Được làm việc với bài toán thực tế có impact cao', 1, 5, 21, 13),
('2024-05-15 15:15:00.000000', 'Xử lý nghiệp vụ phức tạp tốt nhưng code khó đọc', 1, 3, 'Áp lực công việc cao nhưng được đền bù xứng đáng', 1, 4, 22, 2),
('2024-06-20 17:30:00.000000', 'Thiết kế đồ họa ấn tượng nhưng đôi khi không phù hợp mục đích', 1, 3, 'Hướng dẫn không rõ ràng về mục tiêu thiết kế', 1, 2, 23, 3),
('2023-08-10 09:45:00.000000', 'Tự động hóa giúp tiết kiệm hàng trăm giờ làm việc thủ công', 1, 5, 'Được đề xuất và triển khai các giải pháp sáng tạo', 1, 5, 24, 4),
('2023-09-15 12:00:00.000000', 'Ứng dụng có một số lỗi nhỏ nhưng được fix nhanh chóng', 1, 4, 'Làm việc với team trẻ trung, năng động', 1, 4, 25, 5),
('2023-10-20 14:15:00.000000', 'Backend xử lý tốt traffic lớn, uptime 99.99%', 1, 5, 'Có cơ hội làm việc với hệ thống quy mô lớn', 1, 5, 14, 7),
('2023-11-25 16:30:00.000000', 'UI đẹp nhưng trải nghiệm người dùng chưa thực sự mượt mà', 1, 3, 'Yêu cầu thay đổi thường xuyên mà không gia hạn thời gian', 1, 2, 15, 8),
('2024-01-05 10:45:00.000000', 'Kubernetes cluster hoạt động ổn định, auto-scaling hiệu quả', 1, 5, 'Được học hỏi nhiều về cloud native architecture', 1, 5, 16, 9),
('2024-02-10 13:00:00.000000', 'React Native app có một số vấn đề về memory leak', 1, 3, 'Có sự hỗ trợ kỹ thuật khi gặp vấn đề phức tạp', 1, 4, 17, 10),
('2024-03-15 15:15:00.000000', 'Django API đầy đủ tính năng nhưng documentation còn sơ sài', 1, 3, 'Yêu cầu không được mô tả đầy đủ ngay từ đầu', 1, 2, 18, 11),
('2024-04-20 17:30:00.000000', 'Vue.js SPA performance cao, SEO tốt', 1, 5, 'Quy trình làm việc rõ ràng, minh bạch', 1, 5, 19, 12),
('2024-05-25 09:45:00.000000', 'Machine learning model độ chính xác cao, giải thích rõ ràng', 1, 5, 'Được tiếp cận dataset chất lượng với bài toán thực tế', 1, 5, 20, 13),
('2023-12-05 12:00:00.000000', 'Java microservices hoạt động ổn định, dễ scale', 1, 5, 'Môi trường làm việc chuyên nghiệp, có nhiều cơ hội học hỏi', 1, 5, 21, 2),
('2024-01-10 14:15:00.000000', 'Thiết kế UI/UX cải thiện đáng kể tỉ lệ giữ chân người dùng', 1, 5, 'Được đánh giá cao và tôn trọng ý kiến chuyên môn', 1, 5, 22, 3),
('2024-02-15 16:30:00.000000', 'AWS infrastructure tối ưu chi phí, bảo mật tốt', 1, 5, 'Được tự do lựa chọn công nghệ phù hợp nhất', 1, 5, 23, 4),
('2024-03-20 10:45:00.000000', 'Flutter app chạy mượt trên cả iOS và Android', 1, 5, 'Làm việc với product owner am hiểu kỹ thuật', 1, 5, 24, 6),
('2024-04-25 13:00:00.000000', 'Python script chạy ổn định nhưng thiếu xử lý ngoại lệ', 1, 3, 'Yêu cầu thay đổi liên tục gây khó khăn trong triển khai', 1, 2, 25, 11),
('2024-05-30 15:15:00.000000', 'Frontend tương thích tốt với các trình duyệt cũ', 1, 5, 'Có sự hỗ trợ tốt từ QA team', 1, 5, 14, 12),
('2024-06-05 17:30:00.000000', 'Data pipeline xử lý tốt lượng dữ liệu lớn', 1, 5, 'Được làm việc với big data thực tế', 1, 5, 15, 13),
('2023-01-05 09:45:00.000000', 'Giải pháp Java hiệu quả nhưng cần cải thiện performance', 1, 4, 'Áp lực deadline cao nhưng được trả thêm overtime', 1, 4, 16, 2),
('2023-02-10 12:00:00.000000', 'Thiết kế sáng tạo nhưng chưa đáp ứng đúng yêu cầu ban đầu', 1, 3, 'Brief không rõ ràng ngay từ đầu', 1, 2, 17, 3),
('2023-03-15 14:15:00.000000', 'Tự động hóa testing giúp phát hiện sớm các vấn đề', 1, 5, 'Được đề xuất các công cụ testing hiện đại', 1, 5, 18, 4),
('2023-04-20 16:30:00.000000', 'Mobile app ổn định nhưng UI cần cải thiện', 1, 4, 'Làm việc với team trẻ trung, sáng tạo', 1, 4, 19, 5),
('2023-05-25 10:45:00.000000', 'Backend xử lý tốt traffic cao điểm', 1, 5, 'Có cơ hội tối ưu hệ thống quy mô lớn', 1, 5, 20, 7),
('2023-06-30 13:00:00.000000', 'Giao diện đẹp nhưng chưa thực sự thân thiện mobile', 1, 3, 'Thay đổi yêu cầu ở phút cuối nhiều lần', 1, 2, 21, 8),
('2023-08-05 15:15:00.000000', 'Kubernetes giúp hệ thống scale linh hoạt theo nhu cầu', 1, 5, 'Được làm việc với công nghệ container hàng đầu', 1, 5, 22, 9),
('2023-09-10 17:30:00.000000', 'Ứng dụng có một số bug nhỏ nhưng được fix nhanh', 1, 4, 'Communication tốt qua nhiều kênh khác nhau', 1, 5, 23, 10),
('2023-10-15 09:45:00.000000', 'API đầy đủ tính năng nhưng response time chưa tốt', 1, 3, 'Yêu cầu ban đầu không được mô tả đầy đủ', 1, 2, 24, 11),
('2023-11-20 12:00:00.000000', 'Single page app performance cao, UX mượt mà', 1, 5, 'Quy trình làm việc rõ ràng từng bước', 1, 5, 25, 12),
('2023-12-25 14:15:00.000000', 'Mô hình AI độ chính xác cao, triển khai nhanh chóng', 1, 5, 'Được cung cấp đầy đủ dữ liệu training chất lượng', 1, 5, 14, 13),
('2024-01-30 16:30:00.000000', 'Java code chất lượng, tuân thủ best practices', 1, 5, 'Môi trường làm việc chuyên nghiệp, mentor nhiệt tình', 1, 5, 15, 7),
('2024-03-05 10:45:00.000000', 'Thiết kế sáng tạo, phá cách nhưng cần thực tế hơn', 1, 4, 'Được tự do thể hiện ý tưởng trong khuôn khổ dự án', 1, 4, 16, 8),
('2024-04-10 13:00:00.000000', 'CI/CD pipeline giúp release nhanh chóng và an toàn', 1, 5, 'Được học hỏi quy trình DevOps tiên tiến', 1, 5, 17, 9),
('2024-05-15 15:15:00.000000', 'App tiêu tốn nhiều tài nguyên nhưng ổn định', 1, 3, 'Có sự hỗ trợ khi tối ưu hiệu năng ứng dụng', 1, 4, 18, 10),
('2024-06-20 17:30:00.000000', 'API đầy đủ tính năng nhưng thiếu unit test', 1, 3, 'Yêu cầu thay đổi liên tục gây khó khăn', 1, 2, 19, 11),
('2023-07-25 09:45:00.000000', 'Giao diện đẹp, tương tác tự nhiên, tăng engagement', 1, 5, 'Feedback thiết kế chi tiết và mang tính xây dựng', 1, 5, 20, 12),
('2023-08-30 12:00:00.000000', 'Mô hình dự đoán chính xác, giải pháp sáng tạo', 1, 5, 'Được tham gia vào dự án có tác động lớn', 1, 5, 21, 13);

-- Jobs
INSERT INTO `jobs` (`budget`, `closed_at`, `created_at`, `description`, `document`, `duration_hours`, `posted_at`, `status`, `step`, `title`, `employer_id`, `major_id`, `review_id`) VALUES
(15000000, '2024-02-18 23:59:59', '2024-01-10 09:15:22.000000', 
'Dự án cần phát triển nền tảng thương mại điện tử hoàn chỉnh sử dụng React cho front-end và NodeJS cho back-end. 

Yêu cầu chính:
- Triển khai hệ thống đăng nhập đa vai trò (admin/user) với xác thực JWT
- Quản lý giỏ hàng thời gian thực + tính năng thanh toán qua VNPay/MoMo
- Module quản trị: Theo dõi đơn hàng, quản lý sản phẩm và phân tích doanh thu
- Tích dụng công cụ đánh giá sản phẩm và đề xuất cá nhân hóa

Kỹ năng cần có:
- 2+ năm kinh nghiệm với MERN Stack
- Hiểu biết về microservices và RESTful API
- Ưu tiên ứng viên có portfolio dự án tương tự

Cam kết:
- Môi trường làm việc linh hoạt
- Hỗ trợ tài nguyên cloud và DevOps
- Bảo hành sản phẩm 3 tháng sau launch', 
NULL, 120, '2024-01-15 08:00:00', 'COMPLETED', 4, 'Phát triển website thương mại điện tử', 14, 1, 1),

(8000000, '2024-03-22 23:59:59', '2024-02-05 14:30:45.000000', 
'Thiết kế trải nghiệm người dùng cho ứng dụng giáo dục trên nền tảng di động (iOS/Android). 

Phạm vi công việc:
- Xây dựng wireframe cho 10 màn hình chính + 5 màn hình phụ
- Thiết kế UI kit đầy đủ: màu sắc, typography, icon system
- Tạo prototype tương tác với animations trong Figma
- Đảm bảo tuân thủ Material Design và Human Interface Guidelines

Yêu cầu chất lượng:
- Giao diện tối giản, tập trung vào trải nghiệm học tập
- Thiết kế responsive cho nhiều kích thước màn hình
- Xuất file design system đầy đủ cho đội phát triển

Quyền lợi:
- Được tham gia vào sản phẩm giáo dục ý nghĩa
- Cơ hội làm việc với đội ngũ kỹ sư giàu kinh nghiệm
- Nhận gói thưởng khi đạt KPI thiết kế', 
NULL, 80, '2024-02-19 10:30:00', 'COMPLETED', 4, 'Thiết kế UI/UX ứng dụng giáo dục', 15, 2, 2),

(25000000, '2024-04-08 23:59:59', '2024-02-20 11:20:33.000000', 
'Xây dựng hệ thống AI nhận diện sản phẩm tự động trong môi trường siêu thị. 

Nhiệm vụ cụ thể:
- Phát triển mô hình CNN nhận diện 500+ SKU hàng hóa
- Xử lý ảnh thực tế: ánh sáng yếu, góc chụp đa dạng, vật che khuất
- Tích hợp giải pháp tối ưu hóa inferencing time
- Đạt độ chính xác >92% trên tập kiểm thử

Công nghệ yêu cầu:
- Framework: TensorFlow 2.x hoặc PyTorch
- Ngôn ngữ: Python 3.8+
- Triển khai: Docker + TensorRT

Tài nguyên cung cấp:
- Dataset 50,000+ ảnh được gán nhãn
- Hệ thống GPU server đào tạo mô hình
- Đội ngũ hỗ trợ dán nhãn dữ liệu bổ sung', 
NULL, 200, '2024-03-05 09:15:00', 'COMPLETED', 4, 'Phát triển mô hình AI nhận diện sản phẩm', 16, 4, 3),

(12000000, '2023-09-13 23:59:59', '2023-07-25 16:45:12.000000', 
'Xây dựng bộ tài liệu kỹ thuật toàn diện cho API hệ thống quản lý kho. 

Tài liệu bao gồm:
1. Tổng quan hệ thống: kiến trúc, luồng dữ liệu
2. Hướng dẫn tích hợp: authentication, rate limiting
3. Danh mục 50+ endpoint với đặc tả chi tiết:
   - Method, URI, parameters
   - Request/response samples (JSON)
   - Status codes và error handling
4. Postman collection đầy đủ
5. SDK samples cho Python, Java, JavaScript

Chuẩn mực tài liệu:
- Sử dụng OpenAPI 3.0 specification
- Viết bằng tiếng Anh chuyên ngành
- Cấu trúc rõ ràng, dễ tra cứu
- Có ví dụ use-case thực tế cho từng module', 
NULL, 60, '2023-08-10 14:00:00', 'COMPLETED', 4, 'Viết tài liệu kỹ thuật API', 17, 5, 4),

(6000000, '2024-07-04 23:59:59', '2024-05-20 10:10:10.000000', 
'Phát triển ứng dụng quản lý công việc đa nền tảng sử dụng Flutter. 

Tính năng chính:
✓ Tạo & phân loại task theo project/tag
✓ Nhắc nhở thông minh (theo địa điểm/thời gian)
✓ Thống kê năng suất: biểu đồ Burn-down, Pomodoro
✓ Đồng bộ đám mây qua Firebase
✓ Export báo cáo PDF/CSV

Yêu cầu kỹ thuật:
- State management: Bloc hoặc Riverpod
- Local database: Hive/SQLite
- Push notification FCM
- Hỗ trợ dark mode và đa ngôn ngữ

Quy trình làm việc:
1. Thiết kế database schema
2. Triển khai core modules
3. Xây dựng UI theo bản thiết kế
4. Kiểm thử tự động (unit & widget test)
5. Triển khai lên App Store & Google Play', 
NULL, 100, '2024-06-01 11:30:00', 'IN_PROGRESS', 3, 'Lập trình ứng dụng Flutter quản lý công việc', 18, 3, 5),

(18000000, '2022-03-18 23:59:59', '2022-01-20 10:30:00.000000', 
'Phát triển hệ thống backend cho nền tảng ngân hàng số sử dụng Spring Boot. 

Yêu cầu chính:
- Xây dựng kiến trúc microservices với Spring Cloud
- Triển khai bảo mật đa lớp: OAuth2, JWT, và mã hóa dữ liệu nhạy cảm
- Tích hợp với các hệ thống ngân hàng lõi (Core Banking) qua API
- Phát triển module quản lý tài khoản, giao dịch và thanh toán liên ngân hàng
- Triển khai cơ chế xử lý giao dịch real-time với Kafka

Tiêu chuẩn kỹ thuật:
- Độ trễ hệ thống < 500ms cho 95% request
- Khả năng chịu tải 1000+ TPS
- Logging tập trung và giám sát hiệu năng với ELK/Prometheus
- Tuân thủ tiêu chuẩn PCI DSS

Quy trình làm việc:
- Phát triển theo mô hình Agile
- Code review hàng tuần
- Kiểm thử bảo mật định kỳ', 
NULL, 300, '2022-02-15 09:00:00', 'COMPLETED', 4, 'Phát triển backend hệ thống ngân hàng', 19, 1, 6),

(9000000, '2022-04-23 23:59:59', '2022-02-25 14:20:00.000000', 
'Thiết kế giao diện người dùng cho trang tin tức chuyên nghiệp. 

Phạm vi thiết kế:
- 5 layout chính: Trang chủ, Danh mục, Bài viết, Tác giả, Tìm kiếm
- Hệ thống component: Thẻ bài viết, thanh điều hướng, widget tin nổi bật
- Thiết kế dark/light mode với khả năng tuỳ biến cao
- Tối ưu trải nghiệm đọc: typography rõ ràng, khoảng cách hợp lý

Yêu cầu kỹ thuật:
- Responsive cho mọi thiết bị (mobile/tablet/desktop)
- Thiết kế atomic design system đầy đủ
- Tương thích WCAG 2.1 AA
- Tốc độ tải trang < 2s trên 3G

Giao nộp:
- File thiết kế Figma/Adobe XD
- Style guide chi tiết
- Bộ icon và assets xuất nhiều định dạng
- Prototype tương tác', 
NULL, 50, '2022-03-20 13:15:00', 'COMPLETED', 4, 'Thiết kế giao diện website tin tức', 20, 2, 7),

(20000000, '2022-05-28 23:59:59', '2022-03-30 16:45:00.000000', 
'Triển khai hệ thống CI/CD hoàn chỉnh cho dự án phần mềm. 

Công việc bao gồm:
1. Cấu hình Jenkins pipeline cho các môi trường:
   - Development → Staging → Production
2. Tự động hóa quy trình:
   - Kiểm thử đơn vị và tích hợp
   - Quét bảo mật (SAST/DAST)
   - Build Docker image và push lên ECR
   - Deploy lên AWS ECS/EKS
3. Tích hợp với GitHub Actions
4. Cài đặt monitoring và alerting

Công nghệ sử dụng:
- Cơ sở hạ tầng dạng IaC (Terraform)
- Containerization: Docker + Kubernetes
- Cloud: AWS (ECR, ECS, S3, CloudWatch)
- Toolchain: SonarQube, Trivy, Slack

Kết quả mong đợi:
- Rút ngắn 80% thời gian release
- Tự động hóa 95% quy trình vận hành
- Báo cáo chất lượng code sau mỗi build', 
NULL, 80, '2022-04-25 15:30:00', 'COMPLETED', 4, 'Triển khai CI/CD pipeline', 21, 7, 8),

(10000000, '2022-07-02 23:59:59', '2022-05-05 09:15:00.000000', 
'Tối ưu hiệu năng ứng dụng React Native hiện hữu. 

Vấn đề cần giải quyết:
- Thời gian khởi động > 8s trên thiết bị tầm trung
- Memory leak gây crash ứng dụng sau 30 phút sử dụng
- Scroll lag trên màn hình danh sách phức tạp
- Tiêu thụ pin quá mức

Giải pháp kỹ thuật:
- Phân tích hiệu năng với React DevTools và Flipper
- Tối ưu bundle size qua code splitting
- Triển khai lazy loading và virtualization
- Refactor state management sử dụng React Query
- Tối ưu hình ảnh và tài nguyên tĩnh
- Giảm re-render không cần thiết

Mục tiêu cải thiện:
- FPS ổn định ở mức 60fps
- Giảm 50% memory usage
- Cắt giảm 60% thời gian khởi động
- Tăng 40% thời lượng pin', 
NULL, 120, '2022-05-30 10:45:00', 'COMPLETED', 4, 'Tối ưu ứng dụng React Native', 22, 3, 9),

(5000000, '2022-07-13 23:59:59', '2022-05-25 11:30:00.000000', 
'Phát triển hệ thống thu thập dữ liệu web (web scraping) tự động. 

Yêu cầu kỹ thuật:
- Thu thập dữ liệu từ 10+ nguồn tin tức hàng đầu
- Xử lý các cơ chế chống scraping: CAPTCHA, rate limiting
- Trích xuất thông tin: Tiêu đề, nội dung, tác giả, ngày đăng
- Làm sạch và chuẩn hóa dữ liệu (text normalization)
- Lưu trữ dạng CSV/JSON có cấu trúc

Công nghệ sử dụng:
- Ngôn ngữ: Python 3.9+
- Thư viện: BeautifulSoup4, Scrapy, Selenium
- Xử lý bất đồng bộ: Asyncio/AIOHTTP
- Quản lý proxy: Rotation proxy pool

Đầu ra cần có:
- Script chạy tự động hàng ngày
- Bộ dữ liệu hoàn chỉnh (>50k bài viết)
- Báo cáo chất lượng dữ liệu
- Tài liệu hướng dẫn vận hành', 
NULL, 40, '2022-06-10 14:00:00', 'COMPLETED', 4, 'Thu thập dữ liệu web bằng Python', 23, 4, 10),

(15000000, '2022-08-18 23:59:59', '2022-06-20 13:45:00.000000', 
'Phát triển ứng dụng quản lý dự án toàn diện sử dụng Vue.js. 

Tính năng chính:
✓ Quản lý task: Tạo task, gán thành viên, theo dõi tiến độ
✓ Quản lý nhóm: Phân quyền admin/user, thống kê hiệu suất
✓ Timeline dự án: Gantt chart trực quan, cảnh báo trễ deadline
✓ Báo cáo: Tổng quan hiệu suất, phân bổ nguồn lực

Kiến trúc hệ thống:
- Frontend: Vue 3 + Composition API + Vuetify
- State management: Pinia
- Backend: Firebase Realtime Database
- Authentication: Firebase Auth với RBAC

Giao diện:
- Dashboard tùy biến cho từng vai trò
- Kéo thả task linh hoạt (drag & drop)
- Dark mode và đa ngôn ngữ
- Responsive trên mọi thiết bị

Tiêu chí nghiệm thu:
- Cover 85% code bằng unit test
- Tài liệu hướng dẫn sử dụng đầy đủ
- Triển khai lên Vercel/Netlify', 
NULL, 150, '2022-07-15 11:20:00', 'COMPLETED', 4, 'Xây dựng ứng dụng quản lý dự án với Vue.js', 24, 1, 11),

(30000000, '2022-09-23 23:59:59', '2022-07-25 15:00:00.000000', 
'Xây dựng mô hình dự báo giá cổ phiếu sử dụng mạng LSTM. 

Yêu cầu kỹ thuật:
- Xử lý dữ liệu lịch sử 5 năm từ 10+ mã chứng khoán
- Kết hợp đa nguồn: giá, volume, tin tức tài chính
- Xây dựng pipeline tiền xử lý: normalization, feature engineering
- Triển khai mô hình sequence-to-sequence với cơ chế attention

Công nghệ:
- Framework: TensorFlow 2.x/Keras
- Thư viện: Pandas, NumPy, Ta-Lib
- Môi trường: Google Colab Pro/GPU server

Báo cáo kết quả:
1. Giải thích kiến trúc mô hình
2. Đánh giá độ chính xác: MAPE < 5%, RMSE < 1.5%
3. Phân tích feature importance
4. Visualize kết quả dự báo vs thực tế
5. Tài liệu kỹ thuật đầy đủ

Cam kết:
- Hỗ trợ backtesting chiến lược giao dịch
- Bảo hành mô hình 3 tháng
- Cung cấp API dự báo real-time', 
NULL, 250, '2022-08-20 16:45:00', 'COMPLETED', 4, 'Mô hình dự đoán giá cổ phiếu bằng AI', 25, 4, 12),

(12000000, '2023-06-13 23:59:59', '2023-04-15 10:15:00.000000', 
'Phát triển RESTful API cho hệ thống đặt phòng khách sạn. 

Tính năng chính:
- Quản lý đa khách sạn: thông tin phòng, giá cả, khuyến mãi
- Đặt phòng linh hoạt: theo ngày, đặt trước, hủy đặt
- Thanh toán: Tích hợp VNPay/MoMo
- Quản trị: Dashboard thống kê doanh thu

Kiến trúc:
- Framework: Spring Boot 2.7+
- Database: MySQL 8.0 (RDS)
- Caching: Redis cho high-traffic endpoints
- Bảo mật: JWT + Spring Security
- Triển khai: Docker trên AWS ECS

Tài liệu API:
- OpenAPI 3.0 Specification
- Postman Collection đầy đủ
- SDK mẫu cho Java/Python
- Hướng dẫn tích hợp chi tiết

Yêu cầu hiệu năng:
- Xử lý 500+ request/giây
- Thời gian phản hồi < 300ms
- Rate limiting và circuit breaker', 
NULL, 180, '2023-05-10 09:30:00', 'COMPLETED', 4, 'Xây dựng API hệ thống đặt phòng', 14, 1, 13),

(7000000, '2023-07-15 23:59:59', '2023-05-17 14:30:00.000000', 
'Thiết kế bộ nhận diện thương hiệu cho startup edtech. 

Phạm vi thiết kế:
1. Logo chính + biến thể (3 concept)
2. Hệ thống màu sắc: Primary/secondary palette
3. Typography: 2 font chính (display & text)
4. Bộ quy tắc ứng dụng thương hiệu
5. Tài liệu brand guidelines

Yêu cầu sáng tạo:
- Thể hiện tinh thần giáo dục đổi mới
- Màu sắc trẻ trung nhưng chuyên nghiệp
- Dễ nhận diện và ghi nhớ
- Ứng dụng linh hoạt trên đa nền tảng

Giao nộp:
- File vector (AI/EPS)
- File thiết kế (Figma/PSD)
- Bộ mockup ứng dụng thực tế:
  • Website • Mobile app • Card visit • Banner
- Sổ tay hướng dẫn sử dụng thương hiệu', 
NULL, 60, '2023-06-12 13:45:00', 'COMPLETED', 4, 'Thiết kế bộ nhận diện thương hiệu', 15, 2, 14),

(18000000, '2023-08-21 23:59:59', '2023-06-23 16:45:00.000000', 
'Tự động hóa quy trình triển khai ứng dụng lên Kubernetes. 

Giải pháp bao gồm:
1. Cơ sở hạ tầng dạng IaC:
   - Viết module Terraform cho EKS cluster
   - Cấu hình VPC, IAM roles, security groups
2. Đóng gói ứng dụng:
   - Tạo Dockerfile tối ưu
   - Viết Helm chart với values môi trường
3. CI/CD pipeline:
   - Tích hợp GitLab CI/Jenkins
   - Tự động build, scan, deploy
   - Blue/Green deployment strategy
4. Giám sát:
   - Cài đặt Prometheus/Grafana
   - Alerting qua Slack/Email

Công nghệ chính:
- Kubernetes: v1.24+
- AWS: EKS, RDS, ELB
- Terraform: v1.3+
- Helm: v3.10+

Kết quả:
- Triển khai 1-click cho mọi môi trường
- Thời gian deploy giảm 90%
- Hệ thống tự phục hồi (self-healing)
- Tài liệu vận hành chi tiết', 
NULL, 100, '2023-07-18 15:00:00', 'COMPLETED', 4, 'Tự động hóa triển khai Kubernetes', 16, 7, 15),

(9000000, '2023-09-25 23:59:59', '2023-07-27 09:00:00.000000', 
'Khắc phục sự cố và tối ưu ứng dụng React Native hiện hữu, tập trung vào nền tảng iOS. 

Vấn đề chính cần giải quyết:
- Ứng dụng crash trên iOS 16+ do xung đột thư viện
- Lỗi hiển thị giao diện trên iPhone màn hình động (Dynamic Island)
- Memory leak trong module xử lý video
- Hiện tượng "white screen" khi chuyển màn hình
- Tương thích với các dependency phiên bản mới

Quy trình làm việc:
1. Phân tích crash report và performance profile
2. Cập nhật React Native lên phiên bản 0.70+
3. Tối ưu native modules (Objective-C/Swift)
4. Sửa lỗi layout với Flexbox và Responsive Design
5. Triển khai error boundary và global error handling

Yêu cầu kỹ thuật:
- Sử dụng Xcode 14+ và CocoaPods
- Kiểm thử trên thiết bị thật (iPhone 14 Pro Max trở lên)
- Triển khai giải pháp Hermes Engine
- Đảm bảo tương thích ngược với iOS 15', 
NULL, 80, '2023-08-22 10:30:00', 'COMPLETED', 4, 'Sửa lỗi ứng dụng React Native', 17, 3, 16),

(5000000, '2023-10-28 23:59:59', '2023-08-30 11:15:00.000000', 
'Phát triển bộ kiểm thử toàn diện cho hệ thống API Django. 

Phạm vi công việc:
- Unit test: Kiểm thử từng function/model riêng lẻ
- Integration test: Kiểm thử tương tác giữa các component
- API test: Xác thực endpoint (GET/POST/PUT/DELETE)
- Security test: Kiểm tra lỗ hổng bảo mật phổ biến
- Hiệu năng: Kiểm tra khả năng chịu tải

Chỉ tiêu chất lượng:
- Đạt coverage >85% (đo bằng Coverage.py)
- Tốc độ thực thi test suite < 5 phút
- Phát hiện 100% critical bug trước deployment

Công nghệ sử dụng:
- Framework: pytest + pytest-django
- Mock: unittest.mock và pytest-mock
- API testing: DRF APIClient và pytest-factoryboy
- Continuous testing tích hợp với GitHub Actions

Giao nộp:
- Bộ test cases hoàn chỉnh
- Báo cáo coverage chi tiết
- Tài liệu hướng dẫn chạy test', 
NULL, 50, '2023-09-25 14:15:00', 'COMPLETED', 4, 'Viết test cho API Django', 18, 6, 17),

(15000000, '2023-12-03 23:59:59', '2023-10-05 13:30:00.000000', 
'Tối ưu hóa SEO toàn diện cho ứng dụng Vue.js hiện hữu. 

Công việc bao gồm:
✓ Triển khai SSR với Nuxt.js
✓ Tối ưu meta tags động cho 200+ trang
✓ Xây dựng sitemap.xml và robots.txt
✓ Cải thiện Core Web Vitals:
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1
✓ Tích hợp schema.org structured data
✓ Tối ưu hình ảnh (WebP/lazy loading)

Giải pháp kỹ thuật:
- Chuyển đổi SPA thành SSG/ISR
- Triển khai dynamic routing cho SEO
- Sử dụng vue-meta để quản lý meta tags
- Tích hợp Google Analytics 4
- Nén tài nguyên với Brotli compression
- Triển khai CDN cho static assets

Kết quả mong đợi:
- Top 3 từ khóa mục tiêu trong 60 ngày
- Tăng 40% organic traffic
- Cải thiện 50+ điểm PageSpeed', 
NULL, 120, '2023-10-30 16:00:00', 'COMPLETED', 4, 'Tối ưu SEO cho website Vue.js', 19, 1, 18),

(25000000, '2024-01-08 23:59:59', '2023-11-10 15:45:00.000000', 
'Phát triển mô hình NLP phân loại tự động bài báo tiếng Việt. 

Yêu cầu kỹ thuật:
- Phân loại 15+ chuyên mục (thời sự, kinh doanh, thể thao...)
- Xử lý đặc thù ngôn ngữ: từ địa phương, từ lóng, viết tắt
- Độ chính xác >88% trên tập kiểm thử
- Thời gian dự đoán < 100ms/bài

Quy trình thực hiện:
1. Tiền xử lý dữ liệu (tokenization, word segmentation)
2. Trích xuất đặc trưng: TF-IDF, word embedding
3. Xây dựng mô hình:
   - Baseline: SVM, Naive Bayes
   - Deep learning: PhoBERT, BERTology
4. Đánh giá: precision/recall/F1-score

Tài nguyên cung cấp:
- Dataset 50,000+ bài báo được gán nhãn
- Server GPU NVIDIA V100 32GB
- Bộ từ điển tiếng Việt chuyên ngành

Bàn giao:
- Mô hình được đóng gói (Docker)
- API inference với FastAPI
- Báo cáo đánh giá mô hình', 
NULL, 200, '2023-11-05 11:45:00', 'COMPLETED', 4, 'Xây dựng mô hình phân loại văn bản tiếng Việt', 20, 4, 19),

(10000000, '2024-05-04 23:59:59', '2024-03-06 10:00:00.000000', 
'Tái cấu trúc codebase Java theo nguyên tắc SOLID. 

Mục tiêu chính:
- Giảm 40% độ phức tạp cyclomatic
- Tăng khả năng bảo trì (maintainability index >80)
- Loại bỏ code smell và anti-patterns
- Chuẩn hóa kiến trúc lớp (layered architecture)

Phạm vi refactor:
✓ Áp dụng Dependency Inversion (DIP)
✓ Tách lớp theo Single Responsibility (SRP)
✓ Triển khai Factory/Strategy pattern
✓ Chuẩn hóa exception handling
✓ Tối ưu hóa inheritance hierarchy

Công cụ sử dụng:
- Phân tích code: SonarQube, Checkstyle
- Refactoring: IntelliJ IDEA
- Version control: Git Flow
- CI/CD: Jenkins + JUnit

Quy trình làm việc:
1. Đánh giá hiện trạng codebase
2. Thiết kế lại kiến trúc
3. Refactor từng module
4. Kiểm thử hồi quy
5. Đo lường chỉ số cải thiện', 
NULL, 150, '2024-04-01 09:15:00', 'IN_PROGRESS', 3, 'Refactor code Java theo SOLID', 21, 1, 20),

(12000000, '2025-07-10 23:59:59', '2024-04-10 14:15:00.000000', 
'Thực hiện tối ưu hóa trải nghiệm người dùng (UX) cho ứng dụng web hiện tại nhằm tăng tỉ lệ chuyển đổi. 

Quy trình thực hiện:
1. Phân tích hành vi người dùng hiện tại:
   - Theo dõi user flow bằng công cụ Hotjar/Mixpanel
   - Xác định điểm bỏ cuộc (drop-off points)
   - Phỏng vấn người dùng trực tiếp
2. Đề xuất cải tiến:
   - Tái cấu trúc luồng chuyển đổi chính
   - Đơn giản hóa quy trình nhập liệu
   - Tối ưu CTAs và visual hierarchy
3. Triển khai & đo lường:
   - A/B testing các giải pháp UX
   - Theo dõi KPI: Tỷ lệ chuyển đổi, Bounce rate
   - Điều chỉnh dựa trên dữ liệu

Kết quả mong đợi:
- Tăng 25% tỉ lệ chuyển đổi
- Giảm 30% tỉ lệ bỏ cuộc
- Cải thiện điểm NPS ít nhất 15 điểm', 
NULL, 80, '2025-06-01 13:30:00', 'PUBLIC', 2, 'Cải thiện UX ứng dụng web', 22, 2, 21),

(15000000, '2025-09-13 23:59:59', '2024-05-15 16:30:00.000000', 
'Di chuyển toàn bộ hệ thống từ hạ tầng on-premise lên nền tảng AWS. 

Công việc bao gồm:
✓ Thiết lập VPC với cấu trúc mạng bảo mật:
   - Public/Private subnets
   - Security groups & NACLs
✓ Triển khai dịch vụ cốt lõi:
   - EC2 instances (tối ưu instance type)
   - RDS với Multi-AZ deployment
   - S3 bucket với versioning và lifecycle policy
✓ Cấu hình bảo mật:
   - IAM roles và policies
   - AWS Shield Advanced
   - AWS Config & CloudTrail
✓ Tối ưu chi phí:
   - Reserved Instances
   - S3 Intelligent-Tiering
   - CloudWatch monitoring

Yêu cầu chuyên môn:
- Chứng chỉ AWS Solutions Architect Associate
- Kinh nghiệm làm việc với Terraform/CloudFormation
- Quen thuộc với mô hình Well-Architected Framework', 
NULL, 120, '2024-06-10 15:45:00', 'PUBLIC', 2, 'Migration hệ thống lên AWS', 23, 7, 22),

(8000000, '2024-02-15 23:59:59', '2023-12-05 09:45:00.000000', 
'Khắc phục các lỗi nghiêm trọng gây crash trên ứng dụng Flutter khi chạy trên nền tảng Android. 

Các vấn đề cần giải quyết:
- Crash khi chuyển đổi màn hình trên Android 12+
- Memory leak trong xử lý video
- Lỗi tương thích với các chipset MediaTek
- ANR (Application Not Responding) khi xử lý dữ liệu lớn

Phương pháp tiếp cận:
1. Sử dụng Flutter DevTools để phân tích crash logs
2. Tái hiện lỗi trên thiết bị thật (Samsung, Xiaomi, Oppo)
3. Triển khai giải pháp:
   - Tối ưu state management
   - Sử dụng Isolate cho xử lý nặng
   - Cập nhật native dependencies
4. Kiểm thử hồi quy toàn diện

Yêu cầu kỹ thuật:
- Thành thạo Dart/Flutter debugging
- Hiểu biết sâu về Android native layer
- Kinh nghiệm xử lý memory leaks trong Flutter', 
NULL, 60, '2023-12-12 11:00:00', 'COMPLETED', 4, 'Sửa lỗi ứng dụng Flutter trên Android', 24, 3, 23),

(5000000, '2024-03-21 23:59:59', '2024-01-10 12:00:00.000000', 
'Xây dựng hệ thống xử lý dữ liệu Excel quy mô lớn (100k+ dòng) bằng Python. 

Chức năng chính:
- Nhập/xuất file XLSX/XLSM
- Làm sạch dữ liệu:
   • Xử lý missing values
   • Chuẩn hóa định dạng
   • Phát hiện outliers
- Tính toán chỉ số:
   • Thống kê mô tả (mean, median, mode)
   • Phân tích tương quan
   • Dự báo đơn giản (linear regression)
- Xuất báo cáo tự động:
   • Data visualization cơ bản
   • Summary report dạng PDF

Công nghệ sử dụng:
- Thư viện: Pandas, NumPy, Openpyxl
- Xử lý bất đồng bộ cho file lớn
- Tối ưu bộ nhớ với chunk processing

Đầu ra mong đợi:
- Thời gian xử lý < 5 phút cho file 100k dòng
- Báo cáo tự động với các chỉ số KPIs
- Logging chi tiết quá trình xử lý', 
NULL, 40, '2024-01-18 14:15:00', 'COMPLETED', 4, 'Xử lý dữ liệu Excel bằng Python', 25, 8, 24),

(10000000, '2024-04-25 23:59:59', '2024-02-15 14:15:00.000000', 
'Phát triển giao diện quản trị (admin dashboard) sử dụng Vue 3 Composition API và TypeScript. 

Tính năng chính:
- Quản lý người dùng và phân quyền RBAC
- Trực quan hóa dữ liệu với Chart.js
- CRUD operations cho các entities
- Audit log và activity tracking
- Responsive design cho mọi thiết bị

Quy trình tích hợp:
1. Kết nối RESTful API qua Axios
2. Xử lý authentication với JWT
3. Quản lý state với Pinia
4. Triển khai validation với Zod
5. Unit testing với Vitest

Chất lượng mã nguồn:
- Tuân thủ Vue style guide
- Sử dụng TypeScript type strict
- Áp dụng composition API
- Đạt độ phủ test >80%
- Tài liệu code JSDoc đầy đủ', 
NULL, 100, '2024-02-22 16:30:00', 'COMPLETED', 4, 'Lập trình dashboard admin với Vue.js', 14, 1, 25),

(20000000, '2024-05-31 23:59:59', '2024-03-20 16:30:00.000000', 
'Triển khai hệ thống xử lý dữ liệu lớn end-to-end cho doanh nghiệp. 

Yêu cầu chính:
- Xây dựng pipeline thu thập dữ liệu từ đa nguồn: CSDL quan hệ, API, file log, stream
- Xử lý ETL: Làm sạch, chuẩn hóa và chuyển đổi dữ liệu
- Thiết kế cơ chế xử lý batch và real-time
- Tích hợp với hệ thống data warehouse hiện có

Công nghệ áp dụng:
- Framework: Apache Spark (PySpark) hoặc Dask
- Cloud: AWS Glue/EMR hoặc Google DataProc
- Orchestration: Apache Airflow hoặc Prefect
- Lưu trữ: Parquet/ORC trên S3/HDFS

Tiêu chí chất lượng:
- Xử lý 1TB+ dữ liệu/ngày
- Độ trễ dưới 15 phút cho pipeline batch
- Khả năng mở rộng theo nhu cầu
- Giám sát bằng Grafana/Prometheus', 
NULL, 180, '2024-03-28 10:45:00', 'IN_PROGRESS', 3, 'Xây dựng data pipeline xử lý big data', 15, 8, 26),

(12000000, '2023-05-18 23:59:59', '2023-03-20 10:45:00.000000', 
'Tối ưu hóa toàn diện ứng dụng Java Enterprise. 

Vấn đề cần giải quyết:
- API response time > 2s ở tải trung bình
- Truy vấn database phức tạp gây quá tải
- Memory leak dẫn đến restart thường xuyên
- CPU spike khi xử lý batch

Giải pháp kỹ thuật:
1. Phân tích hiệu năng:
   - Profiling với JProfiler/VisualVM
   - Đánh giá query plan với Explain Analyze
2. Tối ưu database:
   - Chỉ mục hóa cột truy vấn thường xuyên
   - Query optimization và phân trang
   - Triển khai caching Redis
3. Tối ưu code:
   - Xử lý bất đồng bộ với CompletableFuture
   - Connection pooling với HikariCP
   - JVM tuning và GC optimization

Mục tiêu cải thiện:
- Giảm 70% thời gian response API
- Tăng 300% throughput hệ thống
- Giảm 80% lỗi timeout', 
NULL, 150, '2023-04-15 09:00:00', 'COMPLETED', 4, 'Tối ưu hiệu năng ứng dụng Java', 16, 1, 27),

(6000000, '2023-06-23 23:59:59', '2023-04-25 13:00:00.000000', 
'Thiết kế bộ banner quảng cáo đa nền tảng cho sản phẩm mới. 

Yêu cầu thiết kế:
- 3 concept khác nhau: Minimalist, Vibrant, Futuristic
- Kích thước đa dạng:
  ✓ Facebook: 1200x628, 1080x1080
  ✓ Google Ads: 300x250, 728x90, 160x600
  ✓ Instagram Story: 1080x1920
- Định dạng: PNG/JPG/GIF animation

Quy trình làm việc:
1. Nghiên cứu thị trường và đối thủ
2. Phác thảo concept
3. Thiết kế bản nháp
4. Chỉnh sửa theo feedback
5. Xuất file final đa độ phân giải

Tiêu chí chất lượng:
- Thống nhất nhận diện thương hiệu
- Call-to-action rõ ràng
- Tối ưu cho mobile-first
- File nhẹ (<500KB) không giảm chất lượng', 
NULL, 30, '2023-05-20 11:15:00', 'COMPLETED', 4, 'Thiết kế banner quảng cáo', 17, 10, 28),

(15000000, '2023-07-28 23:59:59', '2023-05-30 15:15:00.000000', 
'Xây dựng hệ thống kiểm thử tự động toàn diện cho ứng dụng web. 

Phạm vi kiểm thử:
- Chức năng đăng nhập/đăng ký
- Luồng mua hàng và thanh toán
- Quản trị nội dung (CRUD operations)
- API và integration tests

Công nghệ sử dụng:
- Framework: Cypress (ưu tiên) hoặc Selenium
- Ngôn ngữ: JavaScript/TypeScript
- CI/CD: Tích hợp Jenkins/GitHub Actions
- Báo cáo: Allure Report hoặc Cucumber

Quy trình thực hiện:
1. Phân tích test case hiện có
2. Viết script cho critical path (80+ test cases)
3. Tích hợp vào pipeline CI/CD
4. Cấu hình parallel execution
5. Triển khai test trên cloud (BrowserStack)

Kết quả mong đợi:
- Cover 85% nghiệp vụ chính
- Giảm 90% thời gian regression test
- Phát hiện sớm lỗi trước production
- Tạo báo cáo tự động sau mỗi run', 
NULL, 100, '2023-06-25 14:30:00', 'COMPLETED', 4, 'Tự động hóa testing ứng dụng web', 18, 6, 29),

(9000000, '2023-09-02 23:59:59', '2023-07-05 17:30:00.000000', 
'Nâng cấp trải nghiệm người dùng cho ứng dụng mobile hiện hữu. 

Lĩnh vực cải thiện:
🎯 UI/UX:
- Tối ưu luồng điều hướng
- Cập nhật design system mới
- Cải thiện animation chuyển cảnh
⚡ Hiệu năng:
- Giảm FPS drop khi scroll
- Tối ưu thời gian tải màn hình
- Fix lỗi hiển thị trên thiết bị cũ

Quy trình làm việc:
1. Phân tích heuristic đánh giá hiện trạng
2. Triển khai A/B testing cho giải pháp
3. Redesign các màn hình chính
4. Tối ưu code và tài nguyên
5. Kiểm thử khả năng tiếp cận (accessibility)

Kết quả đạt được:
✅ Tăng 40% điểm đánh giá UX
✅ Giảm 50% tỷ lệ từ bỏ ứng dụng
✅ Cải thiện 35% tốc độ tương tác
✅ Đạt chuẩn WCAG 2.1', 
NULL, 80, '2023-07-30 16:45:00', 'COMPLETED', 4, 'Cải thiện UI ứng dụng mobile', 19, 3, 30),

(18000000, '2023-10-07 23:59:59', '2023-08-09 09:45:00.000000', 
'Phát triển hệ thống xử lý đơn hàng quy mô lớn bằng Java Spring Boot. 

Yêu cầu chính:
- Xử lý ổn định 1000+ request/giây với độ trễ dưới 500ms
- Kiến trúc microservices sử dụng Spring Cloud
- Xử lý giao dịch phân tán (Distributed Transactions)
- Tích hợp message queue (Kafka/RabbitMQ) cho xử lý bất đồng bộ
- Triển khai caching layer với Redis
- Cơ chế auto-scaling trên Kubernetes

Bảo mật:
- Xác thực đa yếu tố (MFA)
- Mã hóa dữ liệu nhạy cảm ở rest và transit
- Kiểm tra bảo mật định kỳ với OWASP ZAP

Cam kết:
- Hỗ trợ cluster Kubernetes cho môi trường production
- Tài liệu thiết kế hệ thống đầy đủ
- Bảo hành 3 tháng sau triển khai', 
NULL, 200, '2023-09-04 08:30:00', 'COMPLETED', 4, 'Phát triển hệ thống xử lý đơn hàng', 20, 1, 31),

(7000000, '2023-11-12 23:59:59', '2023-09-14 12:00:00.000000', 
'Tối ưu hóa trải nghiệm mobile cho website hiện hữu. 

Mục tiêu:
- Giảm tỉ lệ thoát trên mobile từ 65% xuống <25%
- Đạt điểm Lighthouse >90 cho mobile
- Cải thiện tỉ lệ chuyển đổi (CRO) 30%

Công việc bao gồm:
- Phân tích hành vi người dùng (Google Analytics)
- Thiết kế mobile-first cho 5 layout chính
- Tối ưu hiệu năng:
  ✓ Giảm kích thước ảnh với WebP
  ✓ Triển khai lazy loading
  ✓ Tối giản CSS/JS
- Cải thiện UX:
  ✓ Navigation thân thiện mobile
  ✓ Form input tối ưu cho touch
  ✓ Tốc độ tải trang <3s trên 3G

Giao nộp:
- Bản thiết kế Figma responsive
- Code HTML/CSS/JS tối ưu
- Báo cáo A/B testing trước/sau
- Hướng dẫn bảo trì', 
NULL, 50, '2023-10-09 10:45:00', 'COMPLETED', 4, 'Thiết kế responsive website', 21, 2, 32),

(22000000, '2024-01-17 23:59:59', '2023-11-19 14:15:00.000000', 
'Triển khai giải pháp giám sát toàn diện cho Kubernetes cluster. 

Phạm vi công việc:
1. Cài đặt và cấu hình:
   - Prometheus + Grafana stack
   - Alertmanager với rules tùy chỉnh
   - Node exporters và kube-state-metrics
2. Tích hợp:
   - Cảnh báo qua Slack/Email/PagerDuty
   - Long-term storage với Thanos
   - Log aggregation với Loki
3. Dashboard quan trọng:
   - Cluster health (CPU, memory, network)
   - Pod resource utilization
   - Application metrics (latency, error rate)
   - Cost monitoring

Yêu cầu kỹ thuật:
- Hỗ trợ multi-cluster monitoring
- Tự động phát hiện service
- RBAC cho đội ngũ khác nhau
- Khả năng mở rộng lên 500+ nodes

Kết quả:
- Thời gian phát hiện sự cố giảm 80%
- Báo cáo hiệu năng hàng tuần tự động
- Dự báo tài nguyên chính xác', 
NULL, 120, '2023-11-14 13:00:00', 'COMPLETED', 4, 'Triển khai hệ thống monitoring Kubernetes', 22, 7, 33),

(10000000, '2024-02-22 23:59:59', '2023-12-24 16:30:00.000000', 
'Khắc phục vấn đề hiệu năng và bộ nhớ trên ứng dụng React Native. 

Vấn đề hiện tại:
- Memory leak khi điều hướng giữa các màn hình
- Janky animation (FPS < 30)
- Tải chậm trên thiết bị cấu hình thấp
- Tiêu thụ pin quá mức

Giải pháp kỹ thuật:
- Sử dụng React.memo và useMemo để giảm re-render
- Chuyển sang FlashList cho danh sách lớn
- Tối ưu hình ảnh với react-native-fast-image
- Xử lý memory leak trong useEffect
- Tách code với React Native Reanimated 3
- Tối ưu khởi động với Hermes engine

Quy trình làm việc:
1. Profiling với Flipper và React DevTools
2. Tối ưu critical paths
3. Kiểm thử tải với 1000+ items
4. Đo lường trước/sau:
   - Memory usage
   - FPS
   - Thời gian khởi động
   - Thời lượng pin', 
NULL, 80, '2023-12-19 15:15:00', 'COMPLETED', 4, 'Sửa lỗi performance ứng dụng React Native', 23, 3, 34),

(5000000, '2024-03-27 23:59:59', '2024-01-29 10:45:00.000000', 
'Xây dựng tài liệu kỹ thuật cho RESTful API viết bằng Django REST Framework. 

Nội dung tài liệu:
1. Tổng quan hệ thống:
   - Kiến trúc API
   - Cơ chế xác thực (JWT/OAuth)
2. Hướng dẫn tích hợp:
   - Lấy access token
   - Rate limiting
   - Error handling
3. Chi tiết endpoint:
   - 50+ endpoints với method, params
   - Request/response examples (JSON)
   - Status codes và error messages
4. Tài nguyên bổ sung:
   - Postman collection
   - OpenAPI Specification
   - SDK samples (Python, JavaScript)

Chất lượng yêu cầu:
- Định dạng OpenAPI 3.0
- Tự động cập nhật qua CI/CD
- Mẫu test case cho từng endpoint
- Chú thích versioning rõ ràng
- Hướng dẫn cho deprecated fields', 
NULL, 40, '2024-01-24 09:30:00', 'COMPLETED', 4, 'Viết tài liệu API Django', 24, 5, 35),

(12000000, '2024-05-02 23:59:59', '2024-03-04 13:00:00.000000', 
'Tối ưu hóa hiệu năng cho ứng dụng Vue.js SPA hiện hữu. 

Giải pháp triển khai:
- Phân tích hiện trạng với Vue DevTools và Lighthouse
- Áp dụng lazy loading cho routes/components
- Chia nhỏ bundle với code splitting dynamic import
- Tối ưu hình ảnh: chuyển sang WebP, responsive sizing
- Triển khai caching hiệu quả với service workers

Mục tiêu cải thiện:
✓ Tăng 50+ điểm Lighthouse Performance
✓ Giảm 60% kích thước bundle JavaScript
✓ Đạt FPS ổn định 60fps trên thiết bị tầm trung
✓ Thời gian tải trang dưới 2s trên 3G

Công nghệ sử dụng:
- Vue CLI cho build optimization
- Webpack phân tích bundle
- Vue Lazy Hydration
- Workbox cho PWA caching', 
NULL, 100, '2024-02-29 11:45:00', 'COMPLETED', 4, 'Tối ưu tốc độ Vue.js SPA', 25, 1, 36),

(25000000, '2024-06-08 23:59:59', '2024-04-10 15:15:00.000000', 
'Phát triển hệ thống nhận diện giọng nói tiếng Việt sử dụng AI. 

Yêu cầu kỹ thuật:
- Kiến trúc mô hình end-to-end (Wave2Vec 2.0/DeepSpeech)
- Xử lý đa dạng giọng địa phương và nhiễu môi trường
- Tích hợp cơ chế language model để cải thiện độ chính xác
- Đạt WER < 15% trên tập test

Quy trình thực hiện:
1. Tiền xử lý dataset 500+ giờ âm thanh
2. Huấn luyện mô hình trên GPU cluster
3. Tối ưu hóa inferencing với TensorRT
4. Triển khai API inference dưới dạng Docker

Tài nguyên cung cấp:
- Dataset ghi âm chất lượng cao
- Hệ thống NVIDIA A100 cho training
- Bộ từ điển phiên âm tiếng Việt', 
NULL, 200, '2024-04-05 14:00:00', 'IN_PROGRESS', 3, 'Xây dựng mô hình nhận diện giọng nói tiếng Việt', 14, 4, 37),

(15000000, '2022-10-13 23:59:59', '2022-08-15 17:30:00.000000', 
'Xây dựng hệ thống quản lý kho dựa trên kiến trúc microservices. 

Kiến trúc hệ thống:
- 7 dịch vụ độc lập: Inventory, Order, Auth, Payment, etc.
- Event-driven architecture sử dụng Kafka
- API Gateway quản lý request routing
- Database per service pattern

Công nghệ chính:
- Spring Boot 2.7 + Spring Cloud
- Kafka Streams cho xử lý real-time
- PostgreSQL cho dữ liệu transaction
- Redis cho caching
- Prometheus/Grafana giám sát

Tính năng nổi bật:
- Quản lý tồn kho thời gian thực
- Tự động đặt hàng khi hết stock
- Cập nhật inventory qua event sourcing
- Hệ thống báo cáo trực quan', 
NULL, 180, '2022-09-10 16:15:00', 'COMPLETED', 4, 'Xây dựng hệ thống microservices', 15, 1, 38),

(8000000, '2022-11-18 23:59:59', '2022-09-20 09:45:00.000000', 
'Thiết kế giao diện ứng dụng quản lý tài chính cá nhân trên di động. 

Phạm vi thiết kế:
- 10 màn hình core: Dashboard, Giao dịch, Ngân sách, Báo cáo
- Hệ thống component: Biểu đồ tương tác, Thẻ thống kê
- Thiết kế theo nguyên tắc Financial UX
- Dark mode với palette màu chuyên nghiệp

Yêu cầu chất lượng:
- Trực quan hóa dữ liệu tài chính rõ ràng
- Navigation đơn giản dưới 3 click
- Hỗ trợ local hóa cho thị trường Việt Nam
- Thiết kế atomic design system

Giao nộp:
- File Figma đầy đủ layers
- Design system documentation
- Prototype tương tác với animations
- Bộ icon vector chất lượng cao', 
NULL, 60, '2022-10-15 08:30:00', 'COMPLETED', 4, 'Thiết kế UI ứng dụng quản lý tài chính', 16, 2, 39),

(20000000, '2022-12-23 23:59:59', '2022-10-25 12:00:00.000000', 
'Triển khai hệ thống CI/CD cho ứng dụng Node.js. 

Quy trình tự động hóa:
├─ On push to main: trigger pipeline
├─ Build: Kiểm tra code quality (ESLint)
├─ Test: Chạy unit/integration tests (Jest)
├─ Security: Quét lỗ hổng (Snyk)
├─ Build Docker image và push lên ECR
└─ Deploy lên Heroku staging/prod

Cấu hình hạ tầng:
- Sử dụng GitHub Actions workflows
- Quản lý secrets qua GitHub Secrets
- Tích tích monitoring với New Relic
- Cấu hình auto-rollback khi failed

Kết quả mong đợi:
✓ Giảm 90% thời gian deploy
✓ Tự động hóa kiểm thử
✓ Theo dõi hiệu năng sau deploy
✓ Thông báo real-time qua Slack', 
NULL, 80, '2022-11-20 10:45:00', 'COMPLETED', 4, 'Triển khai CI/CD cho dự án Node.js', 17, 7, 40),

(10000000, '2023-01-27 23:59:59', '2022-11-30 14:15:00.000000', 
'Tối ưu hiệu năng ứng dụng React Native cho thiết bị cấu hình thấp. 

Vấn đề cần giải quyết:
▼ Memory leak trong component lifecycle
▼ Janky animation khi scroll danh sách phức tạp
▼ Thời gian khởi động > 10s
▼ Tiêu thụ pin quá mức

Giải pháp kỹ thuật:
- Sử dụng Hermes engine thay thế
- Tái cấu trúc state management với Recoil
- VirtualizedList cho danh sách lớn
- Chuyển sang FlashList cho hiệu năng cao
- Optimize image loading với react-native-fast-image
- Reduce re-renders bằng React.memo

Mục tiêu cải thiện:
↑ FPS ổn định 60fps trên thiết bị cũ
↑ Giảm 65% memory usage
↑ Thời gian khởi động < 4s
↑ Tăng 2x thời lượng pin', 
NULL, 100, '2022-12-25 13:00:00', 'COMPLETED', 4, 'Tối ưu hiệu năng React Native', 18, 3, 41),

(5000000, '2023-03-03 23:59:59', '2023-01-05 16:30:00.000000', 
'Triển khai unit testing toàn diện cho API Django. 

Phạm vi kiểm thử:
- 100% coverage cho core business logic
- Test models, views, serializers
- Kiểm thử edge cases và error handling
- Integration tests cho API endpoints

Công cụ sử dụng:
- Pytest + pytest-django
- Factory Boy tạo test data
- Mocking external services
- Coverage.py đo độ phủ

Quy trình thực hiện:
1. Thiết lập test environment
2. Viết test cases cho module hiện có
3. Tích hợp với CI pipeline
4. Tạo báo cáo coverage tự động

Kết quả đầu ra:
- Test suite chạy dưới 5 phút
- Báo cáo coverage chi tiết
- Phát hiện critical bugs
- Tài liệu test strategy', 
NULL, 50, '2023-01-30 15:15:00', 'COMPLETED', 4, 'Viết unit test cho API Django', 19, 6, 42),

(12000000, '2023-04-10 23:59:59', '2023-02-10 10:45:00.000000', 
'Thiết kế lại giao diện website thương mại điện tử tập trung vào chuyển đổi. 

Cải tiến chính:
◉ Tái cấu trúc luồng mua hàng (checkout optimization)
◉ Thiết kế product page hiệu quả cao
◉ Hệ thống recommendation nổi bật
◉ Personalization dựa trên hành vi

Nguyên tắc thiết kế:
- Tăng trust signals (đánh giá, chứng nhận)
- Visual hierarchy rõ ràng
- CTAs chiến lược
- Mobile-first responsive

Chỉ số mục tiêu:
▲ Tăng 35% tỉ lệ chuyển đổi
▲ Giảm 50% bounce rate
▲ Tăng 25% average order value
▲ Cải thiện 40+ điểm Lighthouse

Giao nộp:
- Bản thiết kế đầy đủ Figma
- Prototype tương tác
- Style guide hệ thống
- Tài liệu design rationale', 
NULL, 80, '2023-03-07 09:30:00', 'COMPLETED', 4, 'Redesign giao diện website TMĐT', 20, 2, 43),

(22000000, '2023-05-15 23:59:59', '2023-03-17 13:00:00.000000', 
'Xây dựng hệ thống đề xuất sản phẩm AI cho TMĐT. 

Kiến trúc mô hình:
- Collaborative filtering + content-based
- Xử lý dữ liệu lịch sử 100k+ giao dịch
- Real-time inference với latency < 100ms
- Cập nhật mô hình online

Công nghệ triển khai:
- Framework: TensorFlow Recommenders
- Xử lý dữ liệu: Apache Spark
- Feature store: Feast
- Triển khai: TF Serving + Docker

Quy trình:
1. Phân tích và làm sạch dữ liệu
2. Feature engineering
3. Huấn luyện và tinh chỉnh mô hình
4. A/B testing hiệu quả

Chỉ số đánh giá:
✓ Precision@10 > 0.45
✓ Coverage > 80%
✓ CTR cải thiện 30%+
✓ Diversity score > 0.7', 
NULL, 180, '2023-04-12 11:45:00', 'COMPLETED', 4, 'Mô hình AI đề xuất sản phẩm', 21, 4, 44),

(10000000, '2025-08-11 23:59:59', '2024-04-20 15:15:00.000000', 
'Cải tiến chất lượng codebase Java theo chuẩn Clean Code. 

Phạm vi công việc:
- Refactor 50+ classes chính
- Áp dụng SOLID principles
- Tái cấu trúc legacy code
- Chuẩn hóa design patterns

Tiêu chí đánh giá:
◉ Giảm 70% code duplication
◉ Tăng 50% khả năng bảo trì
◉ Đạt điểm SonarQube > 90%
◉ Code coverage > 85%

Công cụ sử dụng:
- SonarQube phân tích chất lượng
- Checkstyle/PMD kiểm tra chuẩn
- JUnit 5 + Mockito cho tests
- JaCoCo đo coverage

Quy trình:
1. Phân tích code smell hiện tại
2. Thiết lập coding conventions
3. Refactor từng module
4. Viết unit tests bổ sung
5. Đảm bảo backward compatibility', 
NULL, 120, '2024-05-15 14:00:00', 'PUBLIC', 2, 'Refactor code Java theo clean code', 22, 1, 45),

(6000000, '2025-08-23 23:59:59', '2024-05-25 17:30:00.000000', 
'Thiết kế bộ infographic chuyên nghiệp trình bày dữ liệu thống kê ngành công nghệ Việt Nam. 

Yêu cầu chi tiết:
- Tạo 3 phiên bản với phong cách thiết kế khác nhau:
  1. Phong cách tối giản (minimalist)
  2. Phong cách dữ liệu (data-driven)
  3. Phong cách sáng tạo (creative)
- Trực quan hóa các chỉ số:
  • Tăng trưởng thị trường công nghệ 5 năm
  • Phân bổ nhân lực IT theo khu vực
  • Xu hướng công nghệ nổi bật 2024
- Đảm bảo tính thẩm mỹ và khả năng truyền tải thông tin rõ ràng
- Sử dụng bảng màu chuyên nghiệp và typography phù hợp

Tài nguyên cung cấp:
- Dataset đầy đủ định dạng CSV/Excel
- Brand guideline của công ty
- Tài liệu tham khảo thiết kế

Giao nộp:
- File thiết kế gốc (AI/PSD)
- File PDF chất lượng cao
- Bản trình bày PowerPoint (3 slide)', 
NULL, 40, '2024-06-20 16:15:00', 'PUBLIC', 2, 'Thiết kế infographic công nghệ', 23, 10, 46),

(15000000, '2025-09-23 23:59:59', '2023-07-15 09:45:00.000000', 
'Triển khai hệ thống tự động hóa quy trình build và deploy ứng dụng Android lên Google Play Store. 

Giải pháp kỹ thuật:
- Sử dụng Fastlane để tự động hóa toàn bộ workflow
- Tích hợp với CI/CD hiện có (Jenkins/GitHub Actions)
- Quy trình tự động:
  1. Build APK/AAB với các biến thể (flavors)
  2. Chạy unit test và UI test tự động
  3. Tải bản build lên Firebase App Distribution
  4. Deploy lên Production Channel trên Play Store
  5. Tạo release note tự động từ commit history
- Xử lý signing key an toàn với mã hóa

Kết quả mong đợi:
- Giảm 90% thời gian deploy thủ công
- Chuẩn hóa quy trình phát hành ứng dụng
- Hỗ trợ multiple environment (dev/staging/prod)
- Gửi thông báo Slack/Email khi deploy thành công
- Tài liệu hướng dẫn vận hành chi tiết', 
NULL, 80, '2023-08-10 08:30:00', 'COMPLETED', 4, 'Tự động hóa deploy ứng dụng Android', 24, 7, 47),

(8000000, '2023-10-18 23:59:59', '2023-08-20 12:00:00.000000', 
'Phát triển tính năng mới cho ứng dụng quản lý nhà hàng hiện có:

1. Hệ thống đặt bàn online:
   - Hiển thị lịch đặt bàn trực quan
   - Thông báo real-time cho nhân viên
   - Xác nhận đặt bàn qua SMS/Email
2. Thanh toán QR code:
   - Tích hợp cổng thanh toán VNPay/MoMo
   - Tạo mã QR động cho mỗi hóa đơn
   - Lịch sử thanh toán chi tiết

Yêu cầu kỹ thuật:
- Phát triển bằng React Native (phiên bản 0.68+)
- Sử dụng state management: Redux Toolkit
- Tích hợp Firebase Realtime Database
- Bảo mật thông tin giao dịch theo PCI DSS

Cam kết:
- Bàn giao source code đầy đủ
- Tài liệu kỹ thuật chi tiết
- Hỗ trợ 30 ngày sau triển khai', 
NULL, 60, '2023-09-15 10:45:00', 'COMPLETED', 4, 'Phát triển tính năng mới cho ứng dụng nhà hàng', 25, 3, 48),

(18000000, '2023-11-23 23:59:59', '2023-09-25 14:15:00.000000', 
'Xây dựng hệ thống backend chịu tải cao bằng Java Spring Boot cho dịch vụ truyền phát video. 

Kiến trúc hệ thống:
- Microservices với Spring Cloud Gateway
- Horizontal scaling tự động
- Bộ nhớ đệm phân tán Redis Cluster
- Cơ sở dữ liệu NoSQL (MongoDB sharding)

Tối ưu hiệu năng:
- Xử lý 10,000+ request/giây
- Độ trễ dưới 100ms cho 99% request
- Cân bằng tải động với Kubernetes
- Giám sát real-time qua Prometheus/Grafana

Nhiệm vụ cụ thể:
- Thiết kế API cho service streaming
- Triển khai cơ chế rate limiting
- Tích hợp CDN cho static assets
- Xây dựng hệ thống logging tập trung
- Tối ưu truy vấn database

Kỹ năng yêu cầu:
- Kinh nghiệm với hệ thống high-traffic
- Hiểu biết sâu về JVM tuning
- Quen thuộc với AWS/GCP cloud', 
NULL, 150, '2023-10-20 13:00:00', 'COMPLETED', 4, 'Phát triển backend chịu tải cao', 14, 1, 49),

(7000000, '2023-12-28 23:59:59', '2023-10-30 16:30:00.000000', 
'Thiết kế lại giao diện ứng dụng di động để cải thiện trải nghiệm người dùng. 

Phân tích hiện trạng:
- Điểm đánh giá: 3.2/5 (1000+ reviews)
- Vấn đề chính: Navigation phức tạp, hiệu suất thấp, UI lỗi thời

Mục tiêu thiết kế:
- Tăng rating lên 4.5+ 
- Giảm 50% thao tác người dùng
- Cải thiện tốc độ tải màn hình

Công việc bao gồm:
- Khảo sát người dùng & phân tích competitor
- Thiết kế user flow mới
- Xây dựng wireframe cho 15 màn hình chính
- Phát triển UI kit thống nhất (Design System)
- Tạo prototype tương tác với animations

Yêu cầu giao nộp:
- File Figma/Adobe XD đầy đủ layers
- Style guide chi tiết
- Bản đồ trải nghiệm người dùng
- Tài liệu đặc tả thiết kế', 
NULL, 50, '2023-11-25 15:15:00', 'COMPLETED', 4, 'Redesign giao diện mobile app', 15, 2, 50),

(20000000, '2024-02-08 23:59:59', '2023-12-10 10:45:00.000000', 
'Triển khai hệ thống Kubernetes cho kiến trúc microservices gồm 12 service. 

Quy trình thực hiện:
1. Container hóa ứng dụng với Docker
2. Cấu hình Kubernetes cluster trên AWS EKS
3. Thiết lập các thành phần:
   - Ingress controller (Nginx)
   - Service mesh (Istio)
   - Auto-scaling (HPA/VPA)
   - Monitoring (Prometheus + Grafana)
   - Logging (EFK stack)
4. Triển khai GitOps với ArgoCD
5. Cài đặt cơ chế bảo mật: Network Policies, RBAC

Kết quả mong đợi:
- Zero-downtime deployment
- Tự động mở rộng theo tải
- Giám sát toàn diện
- Khôi phục sự cố trong 5 phút

Tài liệu bàn giao:
- Infrastructure as code (Terraform)
- Runbook vận hành
- Báo cáo kiểm thử hiệu năng', 
NULL, 120, '2024-01-05 09:30:00', 'COMPLETED', 4, 'Triển khai Kubernetes cho microservices', 16, 7, 51),

(10000000, '2024-03-13 23:59:59', '2024-01-15 13:00:00.000000', 
'Chẩn đoán và khắc phục vấn đề memory leak trong ứng dụng React Native phiên bản 0.72. 

Phương pháp tiếp cận:
- Sử dụng công cụ: React DevTools, Flipper, Chrome DevTools
- Phân tích heap snapshot và memory profile
- Kiểm tra component lifecycle và state management
- Đánh giá thư viện bên thứ 3

Vấn đề cụ thể cần giải quyết:
- Memory tăng đột biến khi duyệt danh sách hình ảnh
- Rò rỉ bộ nhớ sau khi chuyển màn hình
- Crash ứng dụng trên iOS sau 15 phút sử dụng

Giải pháp đề xuất:
- Tối ưu hóa việc sử dụng FlatList
- Fix lỗi trong custom hooks
- Cập nhật thư viện có lỗ hổng bộ nhớ
- Triển khai memory management best practices

Cam kết kết quả:
- Ổn định memory usage trong 24h test
- Loại bỏ 100% crash do memory
- Cải thiện 40% hiệu suất trên thiết bị cũ', 
NULL, 80, '2024-02-10 11:45:00', 'COMPLETED', 4, 'Sửa lỗi memory leak React Native', 17, 3, 52),

(5000000, '2024-04-18 23:59:59', '2024-02-20 15:15:00.000000', 
'Xây dựng bộ tài liệu kỹ thuật cho RESTful API hệ thống. 

Nội dung chi tiết:
1. Tổng quan hệ thống:
   - Kiến trúc tổng thể
   - Luồng dữ liệu chính
2. Hướng dẫn tích hợp:
   - Authentication (OAuth2)
   - Error handling
   - Rate limiting
3. Danh mục API (70+ endpoints):
   - Mô tả chức năng
   - HTTP method, URL
   - Request/response samples
   - Status codes
4. Postman collection
5. OpenAPI 3.0 specification

Tiêu chuẩn chất lượng:
- Đầy đủ các use-case
- Ví dụ minh họa cho 5 ngôn ngữ (Java, Python, JS, PHP, C#)
- Cập nhật tự động từ code comments (Swagger)
- Tài liệu đa ngôn ngữ (Anh/Việt)', 
NULL, 40, '2024-03-15 14:00:00', 'COMPLETED', 4, 'Viết tài liệu kỹ thuật API', 18, 5, 53),

(12000000, '2024-05-23 23:59:59', '2024-03-25 17:30:00.000000', 
'Tối ưu hóa tốc độ tải cho ứng dụng Vue.js SPA (phiên bản 3). 

Các vấn đề hiện tại:
- FCP (First Contentful Paint): >5s
- Tải bundle JS chính: 2.5MB+
- Render blocking resources
- Thiếu caching hiệu quả

Giải pháp kỹ thuật:
- Áp dụng code splitting và lazy loading
- Tối ưu hình ảnh với WebP format
- Triển khai prefetching/preloading
- Giảm kích thước bundle qua tree-shaking
- Cấu hình server-side rendering (SSR)
- Tối ưu hiệu năng Vue component

Công cụ sử dụng:
- Vue DevTools
- Webpack Bundle Analyzer
- Lighthouse
- Chrome User Experience Report

Mục tiêu:
- Đạt điểm Lighthouse >90
- Giảm 60% thời gian tải trang
- Tốc độ FCP < 1.5s
- TTI (Time to Interactive) < 3s', 
NULL, 100, '2024-04-20 16:15:00', 'IN_PROGRESS', 3, 'Tối ưu tốc độ Vue.js SPA', 19, 1, 54),

(25000000, '2024-06-28 23:59:59', '2024-04-30 09:45:00.000000', 
'Phát triển mô hình deep learning phân tích cảm xúc (sentiment analysis) cho văn bản tiếng Việt. 

Yêu cầu kỹ thuật:
- Xử lý đặc thù ngôn ngữ: từ địa phương, teencode, sai chính tả
- Hỗ trợ đa domain: sản phẩm, tin tức, mạng xã hội
- Độ chính xác >85% trên tập kiểm thử
- Thời gian dự đoán < 100ms/câu

Quy trình thực hiện:
1. Thu thập và làm sạch dataset (50k+ mẫu)
2. Tiền xử lý văn bản: tách từ, chuẩn hóa
3. Thử nghiệm kiến trúc:
   - Transformer-based (PhoBERT, viBERT)
   - Hybrid CNN-BiLSTM
4. Tinh chỉnh mô hình (fine-tuning)
5. Đánh giá trên tập kiểm định độc lập

Công nghệ sử dụng:
- Python 3.10+
- Thư viện: PyTorch, HuggingFace Transformers
- Triển khai: FastAPI + Docker

Giao nộp:
- Mô hình đã huấn luyện
- Báo cáo đánh giá chi tiết
- REST API demo
- Tài liệu kỹ thuật đầy đủ', 
NULL, 180, '2024-05-25 08:30:00', 'PUBLIC', 2, 'Mô hình AI phân tích sentiment tiếng Việt', 20, 4, 55),

(15000000, '2025-09-08 23:59:59', '2023-10-10 12:00:00.000000', 
'Triển khai hệ thống microservices sử dụng Java Spring Cloud. 

Yêu cầu chính:
- Triển khai service discovery với Netflix Eureka
- Xây dựng API Gateway định tuyến request
- Cài đặt circuit breaker (Resilience4j) cho xử lý lỗi
- Cấu hình centralized configuration
- Triển khai distributed tracing với Zipkin

Kiến trúc hệ thống:
- Mô hình domain-driven design (DDD)
- Container hóa bằng Docker
- Orchestration với Kubernetes
- Message queue (RabbitMQ/Kafka) cho giao tiếp dịch vụ

Cam kết chất lượng:
- Tài liệu thiết kế chi tiết
- Unit test coverage > 80%
- CI/CD pipeline hoàn chỉnh
- Bảo mật API với OAuth2/JWT', 
NULL, 200, '2023-12-05 10:45:00', 'COMPLETED', 4, 'Xây dựng hệ thống microservices với Spring Cloud', 21, 1, 56),

(8000000, '2024-01-13 23:59:59', '2023-11-15 14:15:00.000000', 
'Thiết kế trải nghiệm người dùng cho ứng dụng đặt lịch hẹn đa ngành (y tế, làm đẹp, tư vấn). 

Phạm vi thiết kế:
- 8 màn hình chính: Trang chủ, Tìm kiếm, Chi tiết dịch vụ, Chọn giờ, Thanh toán, Lịch sử, Hồ sơ, Thông báo
- User flow đặt lịch tối ưu trong 4 bước
- Thiết kế dark mode/light mode
- Hệ thống component tái sử dụng

Yêu cầu kỹ thuật:
- Thiết kế theo nguyên tắc mobile-first
- Đảm bảo accessibility (WCAG 2.1)
- Tích hợp animation cho trải nghiệm mượt mà
- Tương thích đa nền tảng (iOS/Android)

Giao nộp:
- File Figma/Adobe XD đầy đủ
- Design system document
- Prototype tương tác
- Style guide chi tiết', 
NULL, 60, '2024-01-10 13:00:00', 'COMPLETED', 4, 'Thiết kế UI/UX ứng dụng đặt lịch hẹn', 22, 2, 57),

(18000000, '2024-02-18 23:59:59', '2023-12-20 16:30:00.000000', 
'Di chuyển toàn bộ hệ thống từ AWS sang Google Cloud Platform (GCP). 

Công việc bao gồm:
1. Thiết lập cơ sở hạ tầng GCP:
   - VPC network và subnets
   - Firewall rules và security policies
2. Migration services:
   - EC2 → Compute Engine
   - RDS → Cloud SQL (PostgreSQL)
   - S3 → Cloud Storage
   - Lambda → Cloud Functions
3. Cấu hình bảo mật:
   - IAM roles và service accounts
   - KMS encryption
   - Audit logging
4. Tối ưu chi phí và hiệu năng

Yêu cầu:
- Thời gian downtime tối thiểu
- Đảm bảo tính toàn vẹn dữ liệu
- Kiểm thử kỹ sau migration
- Tài liệu hạ tầng chi tiết', 
NULL, 120, '2024-02-15 15:15:00', 'COMPLETED', 4, 'Migration hệ thống sang Google Cloud', 23, 7, 58),

(10000000, '2024-03-23 23:59:59', '2024-01-25 10:45:00.000000', 
'Phát triển ứng dụng quản lý công việc đa nền tảng sử dụng Flutter. 

Tính năng chính:
✓ Tạo và phân loại task theo project/tag
✓ Nhắc nhở thông minh (thời gian & địa điểm)
✓ Thống kê năng suất: biểu đồ Burn-down
✓ Đồng bộ đám mây qua Firebase
✓ Export báo cáo PDF/CSV

Kỹ thuật sử dụng:
- State management: Bloc hoặc Riverpod
- Local database: Hive/SQLite
- Push notification: Firebase Cloud Messaging
- Authentication: Firebase Auth
- Kiến trúc: Clean Architecture

Yêu cầu chất lượng:
- Code được kiểm thử (unit test, widget test)
- Hiệu năng mượt trên iOS/Android
- Tài liệu kỹ thuật đầy đủ
- Hỗ trợ dark mode', 
NULL, 100, '2024-03-20 09:30:00', 'COMPLETED', 4, 'Lập trình ứng dụng Flutter quản lý công việc', 24, 3, 59),

(5000000, '2024-04-28 23:59:59', '2024-02-29 13:00:00.000000', 
'Phân tích dữ liệu log hệ thống từ nhiều nguồn (server, ứng dụng, network). 

Nhiệm vụ:
- Thu thập và tổng hợp log từ các nguồn khác nhau
- Phát hiện patterns bất thường (anomaly detection)
- Trực quan hóa dữ liệu qua dashboard
- Xuất báo cáo định kỳ dạng PDF/HTML

Công cụ sử dụng:
- Python libraries: Pandas, Matplotlib, Seaborn
- Xử lý log: ELK Stack (tùy chọn)
- Visualization: Grafana hoặc Tableau
- Thống kê: NumPy, SciPy

Đầu ra:
- Script xử lý dữ liệu tự động
- Dashboard giám sát thời gian thực
- Báo cáo phân tích hàng tuần
- Cảnh báo tự động cho sự kiện quan trọng', 
NULL, 50, '2024-04-25 11:45:00', 'PUBLIC', 2, 'Phân tích log hệ thống bằng Python', 25, 8, 60),

(12000000, '2026-01-10 23:59:59', '2024-04-05 15:15:00.000000', 
'Phát triển giao diện quản trị nội dung (CMS) sử dụng Vue.js. 

Tính năng chính:
- Quản lý bài viết, danh mục, người dùng
- Phân quyền chi tiết (RBAC)
- Tích hợp trình soạn thảo WYSIWYG
- Xuất/nhập dữ liệu dạng Excel
- Tìm kiếm và lọc nâng cao

Yêu cầu kỹ thuật:
- Vue 3 (Composition API)
- State management: Pinia
- UI Framework: Vuetify hoặc Quasar
- Responsive trên mọi thiết bị
- Tích hợp RESTful API
- Hiệu năng tải trang < 2s

Giao nộp:
- Source code đầy đủ
- Tài liệu hướng dẫn triển khai
- Unit test (coverage >70%)
- Docker container', 
NULL, 120, '2024-05-30 14:00:00', 'PUBLIC', 2, 'Xây dựng CMS frontend với Vue.js', 14, 1, 61),

(20000000, '2025-10-08 23:59:59', '2024-05-10 17:30:00.000000', 
'Xây dựng pipeline xử lý dữ liệu lớn từ đa nguồn (database, API, file). 

Quy trình xử lý:
1. Thu thập dữ liệu (batch/stream)
2. Làm sạch và chuẩn hóa
3. Biến đổi và enrich dữ liệu
4. Lưu trữ vào data warehouse
5. Phân tích và báo cáo

Công nghệ:
- Engine: Apache Spark (PySpark)
- Cloud: AWS EMR hoặc Databricks
- Lưu trữ: Parquet/ORC trên S3
- Orchestration: Airflow

Yêu cầu:
- Xử lý dataset 100GB+
- Tự động hóa toàn bộ pipeline
- Ghi log đầy đủ và xử lý lỗi
- Tài liệu thiết kế hệ thống
- Giám sát hiệu năng', 
NULL, 180, '2024-06-05 16:15:00', 'PUBLIC', 2, 'Xây dựng data pipeline xử lý big data', 15, 8, 62),

(10000000, '2025-11-21 23:59:59', '2022-12-10 09:45:00.000000', 
'Tối ưu hóa hiệu năng ứng dụng Java Spring Boot. 

Các vấn đề cần giải quyết:
- Thời gian phản hồi API cao (>1s)
- Truy vấn database chậm và thiếu index
- Memory leak gây crash định kỳ
- Tải CPU cao khi xử lý batch

Giải pháp:
- Phân tích hiệu năng với JProfiler/VisualVM
- Tối ưu truy vấn SQL và index database
- Triển khai caching (Redis) cho dữ liệu tĩnh
- Tuning JVM parameters
- Tái cấu trúc code hotspot

Mục tiêu:
- Giảm 70% thời gian phản hồi API
- Giảm 50% tải CPU trung bình
- Loại bỏ memory leak
- Tăng 3x throughput hệ thống', 
NULL, 120, '2023-01-05 08:30:00', 'COMPLETED', 4, 'Tối ưu hiệu năng ứng dụng Java', 16, 1, 63),

(6000000, '2023-03-13 23:59:59', '2023-01-15 12:00:00.000000', 
'Thiết kế banner quảng cáo cho thiết bị IoT mới. 

Yêu cầu thiết kế:
- 3 concept khác nhau (minimalist, futuristic, vibrant)
- Kích thước đa dạng: 970x250, 300x600, 728x90
- Nội dung rõ ràng: Tên SP, tính năng nổi bật, CTA
- Đồng bộ nhận diện thương hiệu

Tài nguyên cung cấp:
- Bộ nhận diện thương hiệu (logo, màu sắc, font)
- Thông tin sản phẩm chi tiết
- Hình ảnh sản phẩm độ phân giải cao

Giao nộp:
- File thiết kế PSD/AI
- Ảnh xuất web (PNG, JPG)
- Vector (SVG) khi cần
- Bản trình bày concept', 
NULL, 30, '2023-02-10 10:45:00', 'COMPLETED', 4, 'Thiết kế banner quảng cáo công nghệ', 17, 10, 64),

(15000000, '2023-04-18 23:59:59', '2023-02-20 14:15:00.000000', 
'Tự động hóa kiểm thử cho ứng dụng web với Selenium. 

Phạm vi kiểm thử:
- 50+ test case chức năng chính
- Regression test suite
- Cross-browser testing (Chrome, Firefox, Edge)
- Cross-platform testing (Windows, macOS)

Công việc:
- Viết script Selenium WebDriver (Java/Python)
- Tích hợp với TestNG/JUnit
- Xây dựng framework Page Object Model
- Tích hợp CI/CD pipeline
- Tạo báo cáo tự động (Allure Report)

Yêu cầu:
- Test coverage > 80% tính năng chính
- Thời gian chạy test < 30 phút
- Xử lý được dynamic elements
- Hỗ trợ chạy song song', 
NULL, 80, '2023-03-15 13:00:00', 'COMPLETED', 4, 'Tự động hóa testing ứng dụng web', 18, 6, 65),

(9000000, '2023-05-23 23:59:59', '2023-03-25 16:30:00.000000', 
'Nâng cấp toàn diện giao diện người dùng cho ứng dụng di động hiện có, tập trung vào:
• Tối ưu hóa trải nghiệm người dùng (UX) dựa trên phân tích heatmap và user journey
• Cải thiện tốc độ tương tác: giảm 40% thời gian phản hồi
• Thiết kế lại 8 màn hình chính với nguyên tắc mobile-first
• Áp dụng micro-interactions và animations tự nhiên
• Đảm bảo tuân thủ nguyên tắc accessibility (WCAG 2.1)
• Tích hợp user feedback mechanism

Kết quả kỳ vọng:
- Tăng 25% user retention rate
- Cải thiện 30 điểm NPS
- Đạt rating 4.7+ trên App Store/Google Play', 
NULL, 60, '2023-04-20 15:15:00', 'COMPLETED', 4, 'Cải thiện UI ứng dụng mobile', 19, 3, 66),

(18000000, '2023-06-28 23:59:59', '2023-04-30 10:45:00.000000', 
'Phát triển hệ thống backend xử lý đơn hàng quy mô enterprise với khả năng:
✓ Xử lý 1000+ đơn hàng/giây (peak 5000 TPS)
✓ Kiến trúc microservices sử dụng Spring Boot + Kafka
✓ Database: Cassandra cho scaling ngang
✓ Redis caching layer cho truy vấn thường xuyên
✓ Tích hợp real-time inventory management
✓ Hệ thống logging tập trung với ELK stack

Yêu cầu kỹ thuật:
- Độ trễ trung bình < 150ms
- Khả dụng 99.99% (SLA)
- Auto-scaling theo tải
- Bảo mật PCI DSS Level 1
- Disaster recovery multi-zone

Triển khai trên AWS với EKS và RDS', 
NULL, 150, '2023-05-25 09:30:00', 'COMPLETED', 4, 'Phát triển hệ thống xử lý đơn hàng', 20, 1, 67),

(7000000, '2023-08-02 23:59:59', '2023-06-05 13:00:00.000000', 
'Thiết kế responsive toàn diện cho website hiện tại, tập trung giảm tỉ lệ thoát trên mobile:

Phạm vi công việc:
• Phân tích Google Analytics hiện tại
• Thiết kế 12 breakpoints cho thiết bị từ 320px đến 1920px
• Tái cấu trúc CSS với Flexbox/Grid
• Tối ưu hiệu năng: Lighthouse score > 90
• Cải thiện Core Web Vitals:
  - CLS < 0.1
  - LCP < 2.5s
  - FID < 100ms
• Triển khai responsive images với srcset

Kết quả mục tiêu:
- Giảm 55% bounce rate mobile
- Tăng 35% thời gian onsite
- Cải thiện 20 vị trí xếp hạng SEO', 
NULL, 50, '2023-06-30 11:45:00', 'COMPLETED', 4, 'Thiết kế responsive website', 21, 2, 68),

(22000000, '2023-09-08 23:59:59', '2023-07-10 15:15:00.000000', 
'Triển khai hệ thống giám sát toàn diện cho Kubernetes cluster quy mô production:

Cấu hình bao gồm:
1. Prometheus + Thanos cho long-term metrics storage
2. Grafana với 30+ dashboard chuẩn production
3. Alertmanager cấu hình 50+ cảnh báo qua Slack/PagerDuty
4. EFK stack (Elasticsearch-Fluentd-Kibana) cho logging
5. Jaeger cho distributed tracing

Tích hợp giám sát:
✓ Cluster health: node, pod, deployment
✓ Ứng dụng: JVM, .NET Core, Node.js metrics
✓ Network performance
✓ Custom business metrics

Kết quả:
- Giảm 75% MTTR (Mean Time To Repair)
- Proactive phát hiện 95% sự cố
- Báo cáo capacity planning hàng tuần', 
NULL, 100, '2023-08-05 14:00:00', 'COMPLETED', 4, 'Triển khai hệ thống monitoring Kubernetes', 22, 7, 69),

(10000000, '2023-10-13 23:59:59', '2023-08-15 17:30:00.000000', 
'Khắc phục vấn đề hiệu năng nghiêm trọng trên ứng dụng React Native:

Vấn đề cần giải quyết:
• Memory leak gây crash sau 45 phút sử dụng
• Scroll jank trên danh sách 1000+ items
• Thời gian khởi động > 10s trên thiết bị mid-range
• Tiêu thụ pin quá mức (30%/giờ)

Giải pháp kỹ thuật:
- Sử dụng Hermes engine
- Triển khai memoization và PureComponent
- VirtualizedList cho danh sách lớn
- Code splitting và lazy loading
- Tối ưu hình ảnh với WebP format
- Fix memory leak trong native modules

Mục tiêu cải thiện:
- Memory usage giảm 60%
- FPS ổn định 60fps
- Thời gian khởi động < 4s
- Pin tiêu thụ < 10%/giờ', 
NULL, 80, '2023-09-10 16:15:00', 'COMPLETED', 4, 'Sửa lỗi performance React Native', 23, 3, 70),

(5000000, '2023-11-18 23:59:59', '2023-09-20 09:45:00.000000', 
'Xây dựng bộ tài liệu API chuyên nghiệp gồm:
• Tổng quan kiến trúc hệ thống
• Authentication flow (OAuth 2.0)
• 120+ endpoints với đặc tả chi tiết:
  - HTTP method và path
  - Request parameters
  - Response schema (JSON)
  - Status codes
  - Error messages
• Postman collection đầy đủ
• SDK samples (Python, JavaScript, Java)

Chuẩn hóa:
- OpenAPI Specification 3.0
- Host trên Swagger UI/Redoc
- Versioning qua Git
- Tích hợp vào CI/CD pipeline', 
NULL, 40, '2023-10-15 08:30:00', 'COMPLETED', 4, 'Viết tài liệu API', 24, 5, 71),

(12000000, '2023-12-23 23:59:59', '2023-10-25 12:00:00.000000', 
'Tối ưu tốc độ tải cho SPA Vue.js đạt hiệu suất cao:

Kế hoạch thực hiện:
1. Audit hiệu năng với Lighthouse và WebPageTest
2. Triển khai:
   • Route-based code splitting
   • Lazy loading components
   • Tree shaking và module concatenation
   • Critical CSS inlining
   • Image optimization (WebP, AVIF)
3. Cấu hình caching:
   • Service Workers
   • HTTP/2 Server Push
   • CDN configuration
4. SSR với Nuxt.js

Mục tiêu:
- Lighthouse score > 95
- FCP < 1.0s
- TTI < 2.5s
- CLS < 0.05
- Bundle size giảm 65%', 
NULL, 100, '2023-11-20 10:45:00', 'COMPLETED', 4, 'Tối ưu tốc độ Vue.js SPA', 25, 1, 72),

(25000000, '2024-01-28 23:59:59', '2023-11-30 14:15:00.000000', 
'Phát triển mô hình AI nhận diện giọng nói tiếng Việt đa phương ngữ:

Dữ liệu và công nghệ:
• Dataset 1000+ giờ âm thanh (3 vùng miền)
• Kiến trúc mô hình: Wav2Vec 2.0/XLS-R
• Framework: PyTorch Lightning
• Tối ưu với NVIDIA TensorRT
• Triển khai inference server Triton

Quy trình:
- Tiền xử lý âm thanh: noise reduction, VAD
- Huấn luyện trên 4x A100 GPUs
- Đánh giá: WER < 15%
- Tối ưu cho thiết bị edge

Đầu ra:
- REST API endpoint nhận diện thời gian thực
- SDK mobile (Android/iOS)
- Tài liệu kỹ thuật đầy đủ
- Bộ dữ liệu kiểm thử', 
NULL, 180, '2023-12-25 13:00:00', 'COMPLETED', 4, 'Xây dựng mô hình nhận diện giọng nói', 14, 4, 73),

(15000000, '2024-03-02 23:59:59', '2024-01-05 16:30:00.000000', 
'Phát triển hệ thống microservices cho quản lý kho hàng:

Kiến trúc:
• 8 microservices độc lập
• Spring Boot + Spring Cloud
• API Gateway: Spring Cloud Gateway
• Service discovery: Consul
• Event-driven architecture với Kafka
• Database: PostgreSQL (mỗi service)

Các service chính:
1. Product Catalog
2. Inventory Management
3. Order Processing
4. Shipping Service
5. Notification Service

Yêu cầu:
- Khả năng xử lý 500+ TPS
- Triển khai trên Kubernetes
- Distributed tracing với Jaeger
- Bảo mật: OAuth2 + JWT
- Tài liệu OpenAPI cho mỗi service', 
NULL, 150, '2024-01-30 15:15:00', 'COMPLETED', 4, 'Xây dựng hệ thống microservices', 15, 1, 74),

(8000000, '2024-04-07 23:59:59', '2024-02-10 10:45:00.000000', 
'Thiết kế UI cho ứng dụng quản lý tài chính cá nhân:

Phạm vi thiết kế:
• 10 màn hình chính: Dashboard, Budgeting, Reports, v.v.
• Hệ thống design tokens đầy đủ
• Component library với 50+ components
• Interactive prototype
• Dark/Light mode

Nguyên tắc:
- Phong cách minimalistic
- Trực quan hóa dữ liệu tài chính rõ ràng
- Navigation đơn giản, dễ sử dụng
- Độ tương phản màu sắc AA+ compliant
- Responsive cho tablet và mobile

Giao nộp:
- Figma file đầy đủ
- Design system documentation
- Assets export đa định dạng
- Style guide chi tiết', 
NULL, 60, '2024-03-05 09:30:00', 'COMPLETED', 4, 'Thiết kế UI ứng dụng quản lý tài chính', 16, 2, 75),

(20000000, '2024-05-13 23:59:59', '2024-03-15 13:00:00.000000', 
'Triển khai CI/CD pipeline cho dự án Node.js:

Quy trình tự động hóa:
1. Trigger: Git push/merge vào main
2. Build:
   • Install dependencies
   • Linting (ESLint)
   • Security scanning (Snyk)
3. Test:
   • Unit tests (Jest)
   • Integration tests
   • E2E tests (Cypress)
4. Deploy:
   • Build Docker image
   • Push lên AWS ECR
   • Deploy lên ECS Fargate
5. Monitoring:
   • Health checks
   • Rollback tự động

Công cụ:
- GitHub Actions
- Docker
- AWS ECR/ECS
- Slack notifications', 
NULL, 80, '2024-04-10 11:45:00', 'COMPLETED', 4, 'Triển khai CI/CD cho dự án Node.js', 17, 7, 76),

(10000000, '2024-06-18 23:59:59', '2024-04-20 15:15:00.000000', 
'Tối ưu hiệu năng ứng dụng React Native cho thiết bị cũ:

Mục tiêu cải thiện:
• Giảm 50% memory usage
• Tăng FPS > 55 trên thiết bị low-end
• Giảm 60% thời gian khởi động
• Tăng 40% thời lượng pin

Kỹ thuật áp dụng:
- Sử dụng Hermes engine
- Native module cho tính toán nặng
- Optimize re-renders với React.memo
- Virtualized lists
- Image caching
- Code splitting
- Reduce bridge calls

Đo lường:
- React Native Debugger
- Flipper performance tools
- Memory profiling
- Device lab testing', 
NULL, 100, '2024-05-15 14:00:00', 'PUBLIC', 2, 'Tối ưu hiệu năng React Native', 18, 3, 77),

(5000000, '2025-12-07 23:59:59', '2024-05-25 17:30:00.000000', 
'Phát triển bộ unit tests toàn diện cho API:

Yêu cầu:
• Test coverage > 80%
• 300+ test cases
• Mock database và external services
• Test cả happy path và edge cases
• Tích hợp với CI pipeline

Công nghệ:
- Pytest framework
- Factory Boy cho test data
- Coverage.py
- Mock services với unittest.mock
- CI: GitHub Actions

Giao nộp:
- Toàn bộ test code
- Coverage report
- Tài liệu hướng dẫn chạy test
- Integration với SonarQube', 
NULL, 50, '2024-06-20 16:15:00', 'PUBLIC', 2, 'Viết unit test cho API', 19, 6, 78),

(12000000, '2025-11-28 23:59:59', '2023-06-30 09:45:00.000000', 
'Thiết kế lại giao diện website thương mại điện tử:

Trọng tâm cải tiến:
• Quy trình mua hàng 1-click
• Personalization dựa trên user behavior
• Cải thiện product discovery
• Tối ưu mobile shopping experience
• Tăng tỉ lệ chuyển đổi (CRO)

Thay đổi chính:
- Navigation thông minh
- Product recommendations
- Checkout process tối giản
- UGC integration (reviews, Q&A)
- Visual search capability

Kết quả kỳ vọng:
- Tăng 30% conversion rate
- Giảm 40% cart abandonment
- Tăng 25% average order value', 
NULL, 80, '2023-07-25 08:30:00', 'COMPLETED', 4, 'Redesign giao diện website TMĐT', 20, 2, 79),

(22000000, '2023-10-03 23:59:59', '2023-08-05 12:00:00.000000', 
'Xây dựng hệ thống AI đề xuất sản phẩm:

Dữ liệu đầu vào:
• 5M+ lịch sử mua hàng
• 10M+ user interactions
• Product metadata

Kiến trúc mô hình:
• Hybrid recommendation system:
  - Collaborative filtering (Matrix Factorization)
  - Content-based filtering
  - Context-aware features
• Xử lý dữ liệu: Spark/PySpark
• Huấn luyện: TensorFlow Extended (TFX)
• Deployment: Kubernetes + TF Serving

Chỉ số đánh giá:
• Precision@10: > 45%
• Recall@20: > 60%
• Coverage: > 80%

Đầu ra:
- Real-time recommendation API
- Batch processing pipeline
- Monitoring dashboard
- A/B testing framework', 
NULL, 150, '2023-08-30 10:45:00', 'COMPLETED', 4, 'Mô hình AI đề xuất sản phẩm', 21, 4, 80);

-- Applies
INSERT INTO `applies` (`bid_amount`, `content`, `created_at`, `estimated_hours`, `status`, `freelancer_id`, `job_id`) VALUES
(14000000, 'Tôi có 5 năm kinh nghiệm phát triển web với React và NodeJS. Đã thực hiện 3 dự án TMĐT tương tự với đăng nhập, giỏ hàng và thanh toán tích hợp VNPay. Đề xuất sử dụng MongoDB để tối ưu hiệu năng. Cam kết hoàn thành đúng tiến độ.', '2024-01-15 09:30:00.000000', 110, 'ACCEPT', 2, 1),
(14500000, 'Tôi là full-stack developer với kinh nghiệm React, NodeJS và AWS. Đã hoàn thành 2 dự án TMĐT, có thể tích hợp thêm tính năng đề xuất sản phẩm. Đề xuất dùng PostgreSQL và Redis để caching.', '2024-01-15 10:15:00.000000', 115, 'PENDING', 3, 1),
(13800000, 'Có kinh nghiệm 4 năm với React và NodeJS, từng làm dự án TMĐT với giao diện responsive. Đề xuất thêm tính năng đa ngôn ngữ và đảm bảo bảo mật cao.', '2024-01-15 11:00:00.000000', 100, 'REJECTED', 4, 1),
(15000000, 'Tôi đã làm các dự án TMĐT với React, NodeJS và MongoDB. Cam kết giao diện mượt mà, tích hợp thanh toán Stripe và VNPay. Sẵn sàng hỗ trợ bảo trì sau bàn giao.', '2024-01-16 08:45:00.000000', 120, 'PENDING', 5, 1),
(7500000, 'Tôi là UI/UX designer với 3 năm kinh nghiệm, từng thiết kế 5 ứng dụng giáo dục. Đề xuất dùng Figma, đảm bảo giao diện hiện đại, thân thiện, hỗ trợ tối ưu mobile.', '2024-02-19 11:00:00.000000', 75, 'ACCEPT', 3, 2),
(7800000, 'Chuyên gia UI/UX với kinh nghiệm Adobe XD và Figma. Đã thiết kế 4 app giáo dục, tập trung vào trải nghiệm học sinh. Cam kết giao file đúng định dạng.', '2024-02-19 12:30:00.000000', 80, 'PENDING', 4, 2),
(7200000, 'Tôi có kinh nghiệm thiết kế UI/UX cho ứng dụng mobile, đảm bảo phong cách hiện đại và dễ sử dụng. Sẽ cung cấp 2 concept để lựa chọn.', '2024-02-19 14:00:00.000000', 70, 'REJECTED', 5, 2),
(24000000, 'Tôi có 6 năm kinh nghiệm với TensorFlow và PyTorch, từng xây dựng mô hình nhận diện hình ảnh đạt độ chính xác 92%. Đề xuất tối ưu model với transfer learning.', '2024-03-05 10:00:00.000000', 190, 'ACCEPT', 4, 3),
(24500000, 'Chuyên gia AI với kinh nghiệm phát triển mô hình nhận diện sản phẩm. Đã làm việc với dataset siêu thị, đảm bảo độ chính xác >90% với PyTorch.', '2024-03-05 11:15:00.000000', 200, 'PENDING', 6, 3),
(23500000, 'Kinh nghiệm 5 năm với AI, từng xây dựng mô hình nhận diện hình ảnh. Đề xuất dùng TensorFlow và fine-tune trên dataset cung cấp.', '2024-03-05 12:45:00.000000', 180, 'REJECTED', 7, 3),
(11500000, 'Tôi có 4 năm kinh nghiệm viết tài liệu kỹ thuật tiếng Anh. Đã thực hiện tài liệu API cho 3 dự án, đảm bảo chi tiết và dễ hiểu.', '2023-08-10 15:00:00.000000', 55, 'ACCEPT', 5, 4),
(12000000, 'Chuyên gia technical writer, từng viết tài liệu API với ví dụ code rõ ràng. Đảm bảo tài liệu dễ tích hợp và đúng chuẩn REST.', '2023-08-10 16:30:00.000000', 60, 'PENDING', 8, 4),
(11000000, 'Kinh nghiệm viết tài liệu kỹ thuật bằng tiếng Anh, đảm bảo rõ ràng và đầy đủ endpoint. Có thể cung cấp thêm Postman collection.', '2023-08-11 09:15:00.000000', 50, 'REJECTED', 9, 4),
(5800000, 'Tôi có kinh nghiệm 3 năm với Flutter, từng phát triển 2 ứng dụng quản lý công việc. Đảm bảo chạy tốt trên cả iOS và Android.', '2024-06-01 12:00:00.000000', 95, 'ACCEPT', 6, 5),
(6000000, 'Chuyên gia Flutter với kinh nghiệm phát triển ứng dụng cross-platform. Đề xuất tích hợp Firebase để quản lý task và nhắc nhở.', '2024-06-01 13:30:00.000000', 100, 'PENDING', 10, 5),
(17000000, 'Tôi có 6 năm kinh nghiệm với Java Spring Boot, từng xây dựng backend ngân hàng với bảo mật cao. Đề xuất dùng JWT và OAuth2.', '2022-02-15 10:00:00.000000', 280, 'ACCEPT', 7, 6),
(17500000, 'Chuyên gia Java Spring Boot, đã làm hệ thống ngân hàng với tích hợp API bên thứ ba. Đảm bảo uptime 99.9%.', '2022-02-15 11:30:00.000000', 290, 'PENDING', 11, 6),
(16500000, 'Kinh nghiệm 5 năm với Java, từng làm backend tài chính. Đề xuất tích hợp với Keycloak để quản lý authentication.', '2022-02-15 13:00:00.000000', 270, 'REJECTED', 12, 6),
(8800000, 'Tôi là UI/UX designer, từng thiết kế website tin tức với giao diện responsive. Đảm bảo 5 layout đúng yêu cầu.', '2022-03-20 14:00:00.000000', 45, 'ACCEPT', 8, 7),
(9000000, 'Chuyên gia thiết kế giao diện web, có kinh nghiệm với website tin tức. Đề xuất dùng Tailwind CSS để tối ưu responsive.', '2022-03-20 15:30:00.000000', 50, 'PENDING', 13, 7),
(19000000, 'Tôi có kinh nghiệm triển khai CI/CD với Jenkins và Docker, từng làm việc với AWS. Đảm bảo pipeline ổn định và tự động.', '2022-04-25 16:00:00.000000', 75, 'PENDING', 9, 8),
(19500000, 'Chuyên gia DevOps với kinh nghiệm Jenkins, Docker và AWS. Đề xuất tích hợp GitHub Actions để đơn giản hóa quy trình.', '2022-04-25 17:30:00.000000', 80, 'PENDING', 2, 8),
(9500000, 'Tôi có kinh nghiệm tối ưu React Native, từng cải thiện FPS cho 2 dự án. Đề xuất dùng Hermes để giảm memory usage.', '2022-05-30 11:00:00.000000', 110, 'ACCEPT', 10, 9),
(9800000, 'Chuyên gia React Native, đã tối ưu hiệu năng cho hannh cho 3 ứng dụng. Đảm bảo giảm thời gian load và fix memory leak.', '2022-05-30 12:30:00.000000', 115, 'PENDING', 3, 9),
(4800000, 'Tôi có kinh nghiệm viết script Python để thu thập dữ liệu web. Đã làm việc với BeautifulSoup và Scrapy, đảm bảo dữ liệu sạch.', '2022-06-10 15:00:00.000000', 35, 'ACCEPT', 11, 10),
(5000000, 'Chuyên gia Python, từng làm dự án web scraping với xuất file CSV/JSON. Đề xuất dùng Pandas để xử lý dữ liệu.', '2022-06-10 16:30:00.000000', 40, 'PENDING', 4, 10),
(14000000, 'Tôi có kinh nghiệm 4 năm với Vue.js, từng làm ứng dụng quản lý dự án. Đảm bảo giao diện responsive và tích hợp API mượt mà.', '2022-07-15 12:00:00.000000', 140, 'ACCEPT', 12, 11),
(14500000, 'Chuyên gia Vue.js, đã phát triển 3 ứng dụng quản lý. Đề xuất dùng Vuex để quản lý state hiệu quả.', '2022-07-15 13:30:00.000000', 145, 'PENDING', 5, 11),
(29000000, 'Tôi có 5 năm kinh nghiệm với LSTM và dự đoán giá cổ phiếu. Đảm bảo mô hình chính xác và giải thích rõ ràng.', '2022-08-20 17:00:00.000000', 240, 'ACCEPT', 13, 12),
(29500000, 'Chuyên gia AI với kinh nghiệm LSTM, từng làm mô hình dự đoán tài chính. Đề xuất dùng Keras và TensorFlow.', '2022-08-20 18:30:00.000000', 245, 'PENDING', 6, 12),
(11500000, 'Tôi có kinh nghiệm phát triển REST API với Java Spring Boot, tích hợp MySQL và Redis. Đảm bảo hiệu năng cao.', '2023-05-10 10:00:00.000000', 170, 'ACCEPT', 7, 13),
(12000000, 'Chuyên gia Java, từng làm API đặt phòng với caching Redis. Đề xuất dùng Spring Security để bảo mật.', '2023-05-10 11:30:00.000000', 175, 'PENDING', 8, 13),
(6800000, 'Tôi là designer với kinh nghiệm branding cho startup. Đề xuất 3 concept hiện đại, phù hợp với giáo dục.', '2023-06-12 14:00:00.000000', 55, 'ACCEPT', 8, 14),
(7000000, 'Chuyên gia thiết kế nhận diện thương hiệu, từng làm cho 2 startup giáo dục. Đảm bảo 3 concept sáng tạo.', '2023-06-12 15:30:00.000000', 60, 'PENDING', 9, 14),
(17000000, 'Tôi có kinh nghiệm triển khai Kubernetes trên AWS, từng làm việc với Terraform và Helm. Đảm bảo auto-scaling ổn định.', '2023-07-18 16:00:00.000000', 95, 'ACCEPT', 9, 15),
(17500000, 'Chuyên gia DevOps, đã triển khai Kubernetes cluster với monitoring. Đề xuất dùng Prometheus và Grafana.', '2023-07-18 17:30:00.000000', 100, 'PENDING', 10, 15),
(8800000, 'Tôi có kinh nghiệm debug React Native, từng fix lỗi iOS cho 2 dự án. Đảm bảo ứng dụng chạy ổn định.', '2023-08-22 10:00:00.000000', 75, 'ACCEPT', 10, 16),
(9000000, 'Chuyên gia React Native, đã fix crash trên iOS. Đề xuất tối ưu với Hermes và kiểm tra trên Xcode.', '2023-08-22 11:30:00.000000', 80, 'PENDING', 11, 16),
(4800000, 'Tôi có kinh nghiệm viết unit test cho Django, đạt coverage 85%. Đề xuất dùng pytest và factory_boy.', '2023-09-25 15:00:00.000000', 45, 'ACCEPT', 11, 17),
(5000000, 'Chuyên gia Python, từng viết test cho API Django. Đảm bảo coverage >80% và tài liệu chi tiết.', '2023-09-25 16:30:00.000000', 50, 'PENDING', 12, 17),
(14000000, 'Tôi có kinh nghiệm tối ưu SEO cho Vue.js, từng làm việc với SSR và sitemap. Đảm bảo tốc độ load nhanh.', '2023-10-30 17:00:00.000000', 110, 'ACCEPT', 12, 18),
(14500000, 'Chuyên gia frontend, đã tối ưu SEO cho 2 website Vue.js. Đề xuất dùng Nuxt.js để cải thiện SEO.', '2023-10-30 18:30:00.000000', 115, 'PENDING', 13, 18),
(24000000, 'Tôi có kinh nghiệm phát triển mô hình NLP tiếng Việt với độ chính xác 88%. Đề xuất dùng BERT và fine-tune.', '2023-11-05 12:00:00.000000', 190, 'ACCEPT', 13, 19),
(24500000, 'Chuyên gia NLP, từng làm phân loại văn bản tiếng Việt. Đảm bảo độ chính xác >85% với dataset cung cấp.', '2023-11-05 13:30:00.000000', 195, 'PENDING', 2, 19),
(9500000, 'Tôi có kinh nghiệm refactor code Java, áp dụng SOLID principles. Đảm bảo code sạch và dễ bảo trì.', '2024-04-01 10:30:00.000000', 140, 'PENDING', 2, 20),
(9800000, 'Chuyên gia Java, từng refactor codebase lớn. Đề xuất dùng SonarQube để kiểm tra chất lượng code.', '2024-04-01 12:00:00.000000', 145, 'PENDING', 3, 20),
(11500000, 'Tôi là UX designer, từng cải thiện conversion rate cho 2 website. Đề xuất phân tích user flow với Hotjar.', '2024-05-05 14:00:00.000000', 75, 'ACCEPT', 3, 21),
(12000000, 'Chuyên gia UX, có kinh nghiệm thiết kế lại website TMĐT. Đảm bảo tăng tỉ lệ chuyển đổi 20%.', '2024-05-05 15:30:00.000000', 80, 'PENDING', 4, 21),
(14000000, 'Tôi có kinh nghiệm migration hệ thống lên AWS, từng thiết lập VPC và RDS. Đề xuất dùng CloudFormation.', '2024-06-10 16:00:00.000000', 110, 'ACCEPT', 4, 22),
(14500000, 'Chuyên gia DevOps, đã migration 3 hệ thống lên AWS. Đảm bảo bảo mật cao và chi phí tối ưu.', '2024-06-10 17:30:00.000000', 115, 'PENDING', 5, 22),
(7800000, 'Tôi có kinh nghiệm debug Flutter trên Android, từng fix crash cho 2 ứng dụng. Đảm bảo ứng dụng ổn định.', '2023-12-12 12:00:00.000000', 55, 'ACCEPT', 6, 23),
(8000000, 'Chuyên gia Flutter, đã fix lỗi trên Android. Đề xuất dùng Dart analyzer để kiểm tra code.', '2023-12-12 13:30:00.000000', 60, 'PENDING', 7, 23),
(4800000, 'Tôi có kinh nghiệm xử lý dữ liệu Excel lớn với Python, dùng Pandas và Openpyxl. Đảm bảo xử lý nhanh.', '2024-01-18 15:00:00.000000', 35, 'ACCEPT', 11, 24),
(5000000, 'Chuyên gia Python, từng xử lý file Excel 100k+ dòng. Đề xuất xuất báo cáo trực quan với Matplotlib.', '2024-01-18 16:30:00.000000', 40, 'PENDING', 8, 24),
(9500000, 'Tôi có kinh nghiệm phát triển frontend Vue.js với TypeScript. Đảm bảo tích hợp API mượt mà và responsive.', '2024-02-22 17:00:00.000000', 95, 'PENDING', 12, 25),
(9800000, 'Chuyên gia Vue.js, từng làm dashboard admin. Đề xuất dùng Vue3 và Tailwind CSS để tối ưu giao diện.', '2024-02-22 18:30:00.000000', 100, 'PENDING', 9, 25),
(19000000, 'Tôi có kinh nghiệm xử lý big data với Spark, từng làm pipeline dữ liệu lớn. Đảm bảo dữ liệu sạch và chuẩn hóa.', '2024-03-28 11:00:00.000000', 170, 'ACCEPT', 13, 26),
(19500000, 'Chuyên gia big data, đã làm việc với Dask và Spark. Đề xuất dùng Apache Airflow để quản lý pipeline.', '2024-03-28 12:30:00.000000', 175, 'PENDING', 10, 26),
(11500000, 'Tôi có kinh nghiệm tối ưu ứng dụng Java, từng giảm response time 30%. Đề xuất dùng Hibernate và caching.', '2023-04-15 11:00:00.000000', 140, 'ACCEPT', 2, 27),
(12000000, 'Chuyên gia Java, đã tối ưu API cho 2 dự án. Đảm bảo hiệu năng cao và truy vấn tối ưu.', '2023-04-15 12:30:00.000000', 145, 'PENDING', 11, 27),
(5800000, 'Tôi là designer, từng làm banner quảng cáo cho sản phẩm công nghệ. Đảm bảo 3 concept đúng chuẩn.', '2023-05-20 12:00:00.000000', 25, 'ACCEPT', 3, 28),
(6000000, 'Chuyên gia thiết kế đồ họa, có kinh nghiệm với banner quảng cáo. Đề xuất dùng Canva và Photoshop.', '2023-05-20 13:30:00.000000', 30, 'PENDING', 12, 28),
(14000000, 'Tôi có kinh nghiệm tự động hóa testing với Selenium, từng cover 90% test case. Đảm bảo chất lượng cao.', '2023-06-25 16:00:00.000000', 95, 'ACCEPT', 4, 29),
(14500000, 'Chuyên gia QA, đã viết script testing với Cypress. Đề xuất tích hợp CI/CD để tự động hóa.', '2023-06-25 17:30:00.000000', 100, 'PENDING', 13, 29),
(8800000, 'Tôi có kinh nghiệm cải thiện UI mobile, từng làm 3 ứng dụng. Đảm bảo UX mượt mà và tốc độ cao.', '2023-07-30 17:00:00.000000', 75, 'ACCEPT', 5, 30),
(9000000, 'Chuyên gia UI/UX, đã cải thiện giao diện cho 2 app mobile. Đề xuất dùng Figma để thiết kế.', '2023-07-30 18:30:00.000000', 80, 'PENDING', 2, 30),
(17000000, 'Tôi có kinh nghiệm Java Spring Boot, từng làm hệ thống xử lý đơn hàng lớn. Đề xuất dùng Redis để caching.', '2023-09-04 10:00:00.000000', 140, 'ACCEPT', 7, 31),
(17500000, 'Chuyên gia backend, đã làm hệ thống chịu tải cao. Đảm bảo uptime 99.99% và scaling tốt.', '2023-09-04 11:30:00.000000', 145, 'PENDING', 3, 31),
(6800000, 'Tôi là designer, từng thiết kế giao diện website responsive. Đảm bảo tối ưu cho mobile.', '2023-10-09 11:00:00.000000', 45, 'ACCEPT', 8, 32),
(7000000, 'Chuyên gia UI/UX, có kinh nghiệm thiết kế responsive. Đề xuất dùng Bootstrap để tối ưu.', '2023-10-09 12:30:00.000000', 50, 'PENDING', 4, 32),
(21000000, 'Tôi có kinh nghiệm triển khai Kubernetes với Prometheus và Grafana. Đảm bảo hệ thống monitoring hiệu quả.', '2023-11-14 15:00:00.000000', 110, 'ACCEPT', 9, 33),
(21500000, 'Chuyên gia DevOps, từng triển khai monitoring cho Kubernetes. Đề xuất tích hợp Slack để cảnh báo.', '2023-11-14 16:30:00.000000', 115, 'PENDING', 5, 33),
(9500000, 'Tôi có kinh nghiệm debug React Native, từng fix memory leak cho 2 ứng dụng. Đảm bảo hiệu năng cao.', '2023-12-19 17:00:00.000000', 75, 'ACCEPT', 10, 34),
(9800000, 'Chuyên gia React Native, đã tối ưu performance. Đề xuất dùng React Native Debugger để kiểm tra.', '2023-12-19 18:30:00.000000', 80, 'PENDING', 6, 34),
(4800000, 'Tôi có kinh nghiệm viết tài liệu API, từng làm cho Django và Spring. Đảm bảo tài liệu chi tiết.', '2024-01-24 11:00:00.000000', 35, 'ACCEPT', 11, 35),
(5000000, 'Chuyên gia technical writer, đã viết tài liệu API REST. Đề xuất dùng Swagger để minh họa.', '2024-01-24 12:30:00.000000', 40, 'PENDING', 7, 35),
(11500000, 'Tôi có kinh nghiệm tối ưu SPA Vue.js, từng giảm load time 40%. Đề xuất dùng code splitting.', '2024-02-29 14:00:00.000000', 95, 'ACCEPT', 12, 36),
(12000000, 'Chuyên gia Vue.js, đã tối ưu tốc độ SPA. Đảm bảo tích hợp lazy loading và prefetching.', '2024-02-29 15:30:00.000000', 100, 'PENDING', 8, 36),
(24000000, 'Tôi có kinh nghiệm phát triển AI nhận diện giọng nói tiếng Việt, đạt độ chính xác 87%. Đề xuất dùng DeepSpeech.', '2024-04-05 15:00:00.000000', 170, 'ACCEPT', 13, 37),
(24500000, 'Chuyên gia AI, từng làm mô hình nhận diện giọng nói. Đảm bảo độ chính xác >85% với dataset cung cấp.', '2024-04-05 16:30:00.000000', 175, 'PENDING', 9, 37),
(14000000, 'Tôi có kinh nghiệm Java Spring Boot, từng làm microservices với Kafka. Đảm bảo hệ thống ổn định.', '2022-09-10 17:00:00.000000', 170, 'ACCEPT', 7, 38),
(14500000, 'Chuyên gia backend, đã làm microservices với Spring Cloud. Đề xuất dùng Eureka cho service discovery.', '2022-09-10 18:30:00.000000', 175, 'PENDING', 10, 38),
(7800000, 'Tôi là UI/UX designer, từng thiết kế ứng dụng tài chính. Đảm bảo 10 màn hình minimal và dễ dùng.', '2022-10-15 10:00:00.000000', 55, 'ACCEPT', 8, 39),
(8000000, 'Chuyên gia thiết kế, có kinh nghiệm với ứng dụng tài chính. Đề xuất dùng Figma để prototype.', '2022-10-15 11:30:00.000000', 60, 'PENDING', 11, 39),
(19000000, 'Tôi có kinh nghiệm triển khai CI/CD với GitHub Actions, từng deploy lên Heroku. Đảm bảo pipeline mượt mà.', '2022-11-20 11:00:00.000000', 75, 'ACCEPT', 9, 40),
(19500000, 'Chuyên gia DevOps, đã làm CI/CD cho Node.js. Đề xuất tích hợp testing tự động với Jest.', '2022-11-20 12:30:00.000000', 80, 'PENDING', 12, 40),
(9500000, 'Tôi có kinh nghiệm tối ưu React Native, từng cải thiện FPS cho 3 ứng dụng. Đảm bảo chạy mượt trên device cũ.', '2022-12-25 14:00:00.000000', 95, 'ACCEPT', 10, 41),
(9800000, 'Chuyên gia React Native, đã tối ưu memory usage. Đề xuất dùng React Native Performance Monitor.', '2022-12-25 15:30:00.000000', 100, 'PENDING', 13, 41),
(4800000, 'Tôi có kinh nghiệm viết unit test cho Django, đạt coverage 90%. Đề xuất dùng pytest-django.', '2023-01-30 17:00:00.000000', 45, 'ACCEPT', 11, 42),
(5000000, 'Chuyên gia Python, từng viết test cho API Django. Đảm bảo coverage >80% và tài liệu rõ ràng.', '2023-01-30 18:30:00.000000', 50, 'PENDING', 2, 42),
(11500000, 'Tôi là UI/UX designer, từng thiết kế lại website TMĐT. Đảm bảo tăng trải nghiệm mua hàng.', '2023-03-07 11:00:00.000000', 75, 'ACCEPT', 12, 43),
(12000000, 'Chuyên gia thiết kế, đã làm giao diện TMĐT. Đề xuất dùng A/B testing để tối ưu conversion.', '2023-03-07 12:30:00.000000', 80, 'PENDING', 3, 43),
(21000000, 'Tôi có kinh nghiệm AI, từng làm mô hình đề xuất sản phẩm. Đảm bảo độ chính xác cao với dataset cung cấp.', '2023-04-12 14:00:00.000000', 170, 'ACCEPT', 13, 44),
(21500000, 'Chuyên gia machine learning, đã làm hệ thống đề xuất. Đề xuất dùng collaborative filtering.', '2023-04-12 15:30:00.000000', 175, 'PENDING', 4, 44),
(9500000, 'Tôi có kinh nghiệm refactor Java, áp dụng clean code principles. Đảm bảo codebase dễ bảo trì.', '2024-05-15 16:00:00.000000', 110, 'ACCEPT', 2, 45),
(9800000, 'Chuyên gia Java, từng refactor code lớn. Đề xuất dùng IntelliJ để kiểm tra code quality.', '2024-05-15 17:30:00.000000', 115, 'PENDING', 5, 45),
(5800000, 'Tôi là designer, từng làm infographic cho công nghệ. Đảm bảo 3 phiên bản sáng tạo.', '2024-06-20 17:00:00.000000', 35, 'ACCEPT', 3, 46),
(6000000, 'Chuyên gia thiết kế đồ họa, có kinh nghiệm infographic. Đề xuất dùng Adobe Illustrator.', '2024-06-20 18:30:00.000000', 40, 'PENDING', 6, 46),
(14000000, 'Tôi có kinh nghiệm tự động hóa deploy Android với Fastlane. Đảm bảo quy trình mượt mà.', '2023-08-10 10:00:00.000000', 75, 'ACCEPT', 4, 47),
(14500000, 'Chuyên gia DevOps, đã dùng Fastlane cho 2 dự án Android. Đề xuất tích hợp CI/CD.', '2023-08-10 11:30:00.000000', 80, 'PENDING', 7, 47),
(7800000, 'Tôi có kinh nghiệm phát triển ứng dụng nhà hàng, từng làm tính năng đặt bàn. Đảm bảo tích hợp QR code.', '2023-09-15 11:00:00.000000', 55, 'ACCEPT', 5, 48),
(8000000, 'Chuyên gia mobile dev, đã làm ứng dụng nhà hàng. Đề xuất dùng Firebase để thanh toán QR.', '2023-09-15 12:30:00.000000', 60, 'PENDING', 8, 48),
(17000000, 'Tôi có kinh nghiệm Java Spring Boot, từng làm backend chịu tải cao. Đảm bảo scaling hiệu quả.', '2023-10-20 14:00:00.000000', 140, 'ACCEPT', 7, 49),
(17500000, 'Chuyên gia backend, đã làm hệ thống lớn với Spring. Đề xuất dùng Kubernetes để scale.', '2023-10-20 15:30:00.000000', 145, 'PENDING', 9, 49),
(6800000, 'Tôi là UI/UX designer, từng cải thiện giao diện mobile app. Đảm bảo UX thân thiện.', '2023-11-25 17:00:00.000000', 45, 'ACCEPT', 8, 50),
(7000000, 'Chuyên gia thiết kế, đã làm UI cho mobile app. Đề xuất dùng Figma để prototype.', '2023-11-25 18:30:00.000000', 50, 'PENDING', 10, 50),
(19000000, 'Tôi có kinh nghiệm Kubernetes, từng triển khai microservices với auto-scaling. Đảm bảo hệ thống ổn định.', '2024-01-05 11:00:00.000000', 110, 'ACCEPT', 9, 51),
(19500000, 'Chuyên gia DevOps, đã làm Kubernetes cluster. Đề xuất dùng Prometheus để monitoring.', '2024-01-05 12:30:00.000000', 115, 'PENDING', 11, 51),
(9500000, 'Tôi có kinh nghiệm debug React Native, từng fix memory leak. Đảm bảo hiệu năng cao.', '2024-02-10 14:00:00.000000', 75, 'ACCEPT', 10, 52),
(9800000, 'Chuyên gia React Native, đã tối ưu performance. Đề xuất dùng React Native Debugger.', '2024-02-10 15:30:00.000000', 80, 'PENDING', 12, 52),
(4800000, 'Tôi có kinh nghiệm viết tài liệu API, từng làm cho Django. Đảm bảo tài liệu chi tiết và dễ hiểu.', '2024-03-15 16:00:00.000000', 35, 'ACCEPT', 11, 53),
(5000000, 'Chuyên gia technical writer, đã viết tài liệu REST API. Đề xuất dùng Swagger.', '2024-03-15 17:30:00.000000', 40, 'PENDING', 13, 53),
(11500000, 'Tôi có kinh nghiệm tối ưu Vue.js SPA, từng giảm load time 30%. Đề xuất dùng lazy loading.', '2024-04-20 18:00:00.000000', 95, 'ACCEPT', 12, 54),
(12000000, 'Chuyên gia Vue.js, đã tối ưu SPA. Đảm bảo tích hợp code splitting và prefetching.', '2024-04-20 19:30:00.000000', 100, 'PENDING', 2, 54),
(24000000, 'Tôi có kinh nghiệm AI, từng làm phân tích sentiment tiếng Việt. Đảm bảo độ chính xác >85%.', '2024-05-25 10:00:00.000000', 170, 'ACCEPT', 13, 55),
(24500000, 'Chuyên gia NLP, đã làm phân tích sentiment. Đề xuất dùng BERT và fine-tune dataset.', '2024-05-25 11:30:00.000000', 175, 'PENDING', 3, 55),
(14000000, 'Tôi có kinh nghiệm Java Spring Cloud, từng làm microservices. Đảm bảo tích hợp Kafka mượt mà.', '2023-12-05 13:00:00.000000', 190, 'ACCEPT', 2, 56),
(14500000, 'Chuyên gia backend, đã làm microservices với Spring Cloud. Đề xuất dùng API Gateway.', '2023-12-05 14:30:00.000000', 195, 'PENDING', 4, 56),
(7800000, 'Tôi là UI/UX designer, từng làm ứng dụng đặt lịch. Đảm bảo flow trực quan và dễ dùng.', '2024-01-10 15:00:00.000000', 55, 'ACCEPT', 3, 57),
(8000000, 'Chuyên gia thiết kế, đã làm UI cho ứng dụng đặt lịch. Đề xuất dùng Figma để prototype.', '2024-01-10 16:30:00.000000', 60, 'PENDING', 5, 57),
(17000000, 'Tôi có kinh nghiệm migration sang Google Cloud, từng thiết lập VPC và Cloud SQL. Đảm bảo bảo mật cao.', '2024-02-15 17:00:00.000000', 110, 'ACCEPT', 4, 58),
(17500000, 'Chuyên gia DevOps, đã migration 2 hệ thống sang GCP. Đề xuất dùng Terraform.', '2024-02-15 18:30:00.000000', 115, 'PENDING', 6, 58),
(9500000, 'Tôi có kinh nghiệm Flutter, từng làm ứng dụng quản lý công việc. Đảm bảo chạy mượt trên cả iOS và Android.', '2024-03-20 11:00:00.000000', 95, 'ACCEPT', 6, 59),
(9800000, 'Chuyên gia Flutter, đã làm 3 ứng dụng quản lý. Đề xuất dùng Firebase để nhắc nhở.', '2024-03-20 12:30:00.000000', 100, 'PENDING', 7, 59),
(4800000, 'Tôi có kinh nghiệm phân tích log với Python, dùng Pandas và Matplotlib. Đảm bảo báo cáo trực quan.', '2024-04-25 14:00:00.000000', 45, 'ACCEPT', 11, 60),
(5000000, 'Chuyên gia Python, từng phân tích log hệ thống. Đề xuất dùng ELK Stack để visualize.', '2024-04-25 15:30:00.000000', 50, 'PENDING', 8, 60),
(11500000, 'Tôi có kinh nghiệm Vue.js, từng làm CMS frontend. Đảm bảo responsive và tích hợp API tốt.', '2024-05-30 16:00:00.000000', 110, 'ACCEPT', 12, 61),
(12000000, 'Chuyên gia Vue.js, đã làm dashboard CMS. Đề xuất dùng Vue3 và TypeScript.', '2024-05-30 17:30:00.000000', 115, 'PENDING', 9, 61),
(19000000, 'Tôi có kinh nghiệm big data với Spark, từng làm pipeline dữ liệu lớn. Đảm bảo dữ liệu sạch.', '2024-06-05 18:00:00.000000', 170, 'ACCEPT', 13, 62),
(19500000, 'Chuyên gia big data, đã làm pipeline với Dask. Đề xuất dùng Airflow để quản lý.', '2024-06-05 19:30:00.000000', 175, 'PENDING', 10, 62),
(9500000, 'Tôi có kinh nghiệm tối ưu Java, từng giảm response time 25%. Đề xuất dùng caching và indexing.', '2023-01-05 10:00:00.000000', 110, 'ACCEPT', 2, 63),
(9800000, 'Chuyên gia Java, đã tối ưu API hiệu năng cao. Đảm bảo truy vấn database tối ưu.', '2023-01-05 11:30:00.000000', 115, 'PENDING', 11, 63),
(5800000, 'Tôi là designer, từng làm banner công nghệ. Đảm bảo 3 concept sáng tạo và đúng chuẩn.', '2023-02-10 13:00:00.000000', 25, 'ACCEPT', 3, 64),
(6000000, 'Chuyên gia thiết kế đồ họa, có kinh nghiệm banner quảng cáo. Đề xuất dùng Photoshop.', '2023-02-10 14:30:00.000000', 30, 'PENDING', 12, 64),
(14000000, 'Tôi có kinh nghiệm tự động hóa testing với Selenium, từng cover 85% test case. Đảm bảo chất lượng.', '2023-03-15 15:00:00.000000', 75, 'ACCEPT', 4, 65),
(14500000, 'Chuyên gia QA, đã viết script testing với Cypress. Đề xuất tích hợp CI/CD.', '2023-03-15 16:30:00.000000', 80, 'PENDING', 13, 65),
(8800000, 'Tôi có kinh nghiệm cải thiện UI mobile, từng làm 2 ứng dụng. Đảm bảo UX thân thiện.', '2023-04-20 17:00:00.000000', 55, 'ACCEPT', 5, 66),
(9000000, 'Chuyên gia UI/UX, đã cải thiện giao diện mobile app. Đề xuất dùng Figma.', '2023-04-20 18:30:00.000000', 60, 'PENDING', 2, 66),
(17000000, 'Tôi có kinh nghiệm Java Spring Boot, từng làm hệ thống đơn hàng lớn. Đề xuất dùng Redis.', '2023-05-25 11:00:00.000000', 140, 'ACCEPT', 7, 67),
(17500000, 'Chuyên gia backend, đã làm hệ thống chịu tải cao. Đảm bảo uptime 99.99%.', '2023-05-25 12:30:00.000000', 145, 'PENDING', 3, 67),
(6800000, 'Tôi là designer, từng thiết kế website responsive. Đảm bảo tối ưu cho mobile.', '2023-06-30 14:00:00.000000', 45, 'ACCEPT', 8, 68),
(7000000, 'Chuyên gia UI/UX, có kinh nghiệm responsive design. Đề xuất dùng Tailwind CSS.', '2023-06-30 15:30:00.000000', 50, 'PENDING', 4, 68),
(21000000, 'Tôi có kinh nghiệm Kubernetes, từng triển khai monitoring với Prometheus. Đảm bảo hệ thống scale tốt.', '2023-08-05 16:00:00.000000', 95, 'ACCEPT', 9, 69),
(21500000, 'Chuyên gia DevOps, đã làm monitoring cho Kubernetes. Đề xuất dùng Grafana.', '2023-08-05 17:30:00.000000', 100, 'PENDING', 5, 69),
(9500000, 'Tôi có kinh nghiệm debug React Native, từng fix performance. Đảm bảo hiệu năng cao.', '2023-09-10 18:00:00.000000', 75, 'ACCEPT', 10, 70),
(9800000, 'Chuyên gia React Native, đã tối ưu memory leak. Đề xuất dùng React Native Debugger.', '2023-09-10 19:30:00.000000', 80, 'PENDING', 6, 70),
(4800000, 'Tôi có kinh nghiệm viết tài liệu API, từng làm cho Django. Đảm bảo tài liệu chi tiết.', '2023-10-15 10:00:00.000000', 35, 'ACCEPT', 11, 71),
(5000000, 'Chuyên gia technical writer, đã viết tài liệu REST API. Đề xuất dùng Swagger.', '2023-10-15 11:30:00.000000', 40, 'PENDING', 7, 71),
(11500000, 'Tôi có kinh nghiệm tối ưu Vue.js SPA, từng giảm load time 35%. Đề xuất dùng lazy loading.', '2023-11-20 13:00:00.000000', 95, 'ACCEPT', 12, 72),
(12000000, 'Chuyên gia Vue.js, đã tối ưu SPA. Đảm bảo tích hợp code splitting.', '2023-11-20 14:30:00.000000', 100, 'PENDING', 8, 72),
(24000000, 'Tôi có kinh nghiệm AI, từng làm nhận diện giọng nói tiếng Việt. Đảm bảo độ chính xác >85%.', '2023-12-25 15:00:00.000000', 170, 'ACCEPT', 13, 73),
(24500000, 'Chuyên gia AI, đã làm mô hình nhận diện giọng nói. Đề xuất dùng DeepSpeech.', '2023-12-25 16:30:00.000000', 175, 'PENDING', 9, 73),
(14000000, 'Tôi có kinh nghiệm Java Spring Boot, từng làm microservices với Kafka. Đảm bảo hệ thống ổn định.', '2024-01-30 17:00:00.000000', 140, 'ACCEPT', 7, 74),
(14500000, 'Chuyên gia backend, đã làm microservices với Spring Cloud. Đề xuất dùng Eureka.', '2024-01-30 18:30:00.000000', 145, 'PENDING', 10, 74),
(7800000, 'Tôi là UI/UX designer, từng làm ứng dụng tài chính. Đảm bảo 10 màn hình minimal.', '2024-03-05 11:00:00.000000', 55, 'ACCEPT', 8, 75),
(8000000, 'Chuyên gia thiết kế, có kinh nghiệm ứng dụng tài chính. Đề xuất dùng Figma.', '2024-03-05 12:30:00.000000', 60, 'PENDING', 11, 75),
(19000000, 'Tôi có kinh nghiệm CI/CD với GitHub Actions, từng deploy lên Heroku. Đảm bảo pipeline mượt mà.', '2024-04-10 14:00:00.000000', 75, 'ACCEPT', 9, 76),
(19500000, 'Chuyên gia DevOps, đã làm CI/CD cho Node.js. Đề xuất tích hợp Jest.', '2024-04-10 15:30:00.000000', 80, 'PENDING', 12, 76),
(9500000, 'Tôi có kinh nghiệm tối ưu React Native, từng cải thiện FPS. Đảm bảo chạy mượt trên device cũ.', '2024-05-15 16:00:00.000000', 95, 'ACCEPT', 10, 77),
(9800000, 'Chuyên gia React Native, đã tối ưu performance. Đề xuất dùng Hermes.', '2024-05-15 17:30:00.000000', 100, 'PENDING', 13, 77),
(4800000, 'Tôi có kinh nghiệm viết unit test cho API, đạt coverage 85%. Đề xuất dùng pytest.', '2024-06-20 18:00:00.000000', 45, 'ACCEPT', 11, 78),
(5000000, 'Chuyên gia Python, từng viết test cho API Django. Đảm bảo coverage >80%.', '2024-06-20 19:30:00.000000', 50, 'PENDING', 2, 78),
(11500000, 'Tôi là UI/UX designer, từng thiết kế website TMĐT. Đảm bảo tăng trải nghiệm mua hàng.', '2023-07-25 10:00:00.000000', 75, 'ACCEPT', 12, 79),
(12000000, 'Chuyên gia thiết kế, đã làm giao diện TMĐT. Đề xuất dùng A/B testing.', '2023-07-25 11:30:00.000000', 80, 'PENDING', 3, 79),
(21000000, 'Tôi có kinh nghiệm AI, từng làm hệ thống đề xuất sản phẩm. Đảm bảo độ chính xác cao.', '2023-08-30 13:00:00.000000', 140, 'ACCEPT', 13, 80),
(21500000, 'Chuyên gia machine learning, đã làm hệ thống đề xuất. Đề xuất dùng collaborative filtering.', '2023-08-30 14:30:00.000000', 145, 'PENDING', 4, 80);

-- Milestone
INSERT INTO `milestones` (`content`, `created_at`, `disburse_at`, `disputed`, `document`, `end_at`, `funded_at`, `is_overdue`, `percent`, `start_at`, `status`, `employer_id`, `freelancer_id`, `job_id`) VALUES
-- Job 1: Phát triển website thương mại điện tử (4 milestones, COMPLETED, total percent = 100%)
('Thiết kế giao diện người dùng cho website', '2024-01-15 09:00:00.000000', NULL, 0, NULL, '2024-01-25 23:59:59', '2024-01-15 10:00:00', 0, 25, '2024-01-16 08:00:00', 'DONE', 14, 2, 1),
('Phát triển backend và tích hợp API thanh toán', '2024-01-20 09:00:00.000000', NULL, 0, NULL, '2024-02-05 23:59:59', '2024-01-20 10:00:00', 0, 30, '2024-01-21 08:00:00', 'DONE', 14, 2, 1),
('Kiểm thử và tối ưu hiệu năng website', '2024-02-01 09:00:00.000000', NULL, 0, NULL, '2024-02-15 23:59:59', '2024-02-01 10:00:00', 0, 25, '2024-02-02 08:00:00', 'DONE', 14, 2, 1),
('Triển khai website lên server', '2024-02-10 09:00:00.000000', NULL, 0, NULL, '2024-02-18 23:59:59', '2024-02-10 10:00:00', 0, 20, '2024-02-11 08:00:00', 'DONE', 14, 2, 1),

-- Job 2: Thiết kế UI/UX ứng dụng giáo dục (3 milestones, COMPLETED, total percent = 100%)
('Phân tích yêu cầu và tạo wireframe', '2024-02-19 11:00:00.000000', NULL, 0, NULL, '2024-02-25 23:59:59', '2024-02-19 12:00:00', 0, 30, '2024-02-20 08:00:00', 'DONE', 15, 3, 2),
('Thiết kế giao diện chính bằng Figma', '2024-02-26 09:00:00.000000', NULL, 0, NULL, '2024-03-10 23:59:59', '2024-02-26 10:00:00', 0, 40, '2024-02-27 08:00:00', 'DONE', 15, 3, 2),
('Kiểm tra và chỉnh sửa giao diện theo feedback', '2024-03-11 09:00:00.000000', NULL, 0, NULL, '2024-03-22 23:59:59', '2024-03-11 10:00:00', 0, 30, '2024-03-12 08:00:00', 'DONE', 15, 3, 2),

-- Job 3: Phát triển mô hình AI nhận diện sản phẩm (5 milestones, COMPLETED, total percent = 100%)
('Chuẩn bị và tiền xử lý dataset', '2024-03-05 10:00:00.000000', NULL, 0, NULL, '2024-03-15 23:59:59', '2024-03-05 11:00:00', 0, 20, '2024-03-06 08:00:00', 'DONE', 16, 4, 3),
('Xây dựng mô hình AI ban đầu', '2024-03-16 09:00:00.000000', NULL, 0, NULL, '2024-03-25 23:59:59', '2024-03-16 10:00:00', 0, 25, '2024-03-17 08:00:00', 'DONE', 16, 4, 3),
('Tối ưu hóa mô hình với transfer learning', '2024-03-26 09:00:00.000000', NULL, 0, NULL, '2024-04-01 23:59:59', '2024-03-26 10:00:00', 0, 25, '2024-03-27 08:00:00', 'DONE', 16, 4, 3),
('Kiểm thử độ chính xác mô hình', '2024-04-02 09:00:00.000000', NULL, 0, NULL, '2024-04-07 23:59:59', '2024-04-02 10:00:00', 0, 20, '2024-04-03 08:00:00', 'DONE', 16, 4, 3),
('Tích hợp mô hình vào hệ thống', '2024-04-03 09:00:00.000000', '2024-04-05 10:00:00', 1, NULL, '2024-04-08 23:59:59', '2024-04-03 10:00:00', 0, 30, '2024-04-04 08:00:00', 'DISPUTE', 16, 4, 3),

-- Job 4: Viết tài liệu kỹ thuật API (2 milestones, COMPLETED, total percent = 100%)
('Viết hướng dẫn tích hợp và danh sách endpoint', '2023-08-10 15:00:00.000000', NULL, 0, NULL, '2023-08-20 23:59:59', '2023-08-10 16:00:00', 0, 60, '2023-08-11 08:00:00', 'DONE', 17, 5, 4),
('Cung cấp ví dụ code và kiểm tra tài liệu', '2023-08-21 09:00:00.000000', NULL, 0, NULL, '2023-09-13 23:59:59', '2023-08-21 10:00:00', 0, 40, '2023-08-22 08:00:00', 'DONE', 17, 5, 4),

-- Job 5: Lập trình ứng dụng Flutter quản lý công việc (3 milestones, IN_PROGRESS)
('Thiết kế giao diện ứng dụng', '2024-06-01 12:00:00.000000', NULL, 0, NULL, '2024-06-15 23:59:59', '2024-06-01 13:00:00', 0, 30, '2024-06-02 08:00:00', 'DOING', 18, 6, 5),
('Phát triển tính năng tạo task và nhắc nhở', '2024-06-16 09:00:00.000000', NULL, 0, NULL, '2024-06-30 23:59:59', '2024-06-16 10:00:00', 0, 40, '2024-06-17 08:00:00', 'PENDING', 18, 6, 5),
('Tích hợp và kiểm thử đa nền tảng', '2024-07-01 09:00:00.000000', NULL, 0, NULL, '2024-07-04 23:59:59', NULL, 0, 30, '2024-07-02 08:00:00', 'PENDING', 18, 6, 5),

-- Job 6: Phát triển backend hệ thống ngân hàng (4 milestones, COMPLETED, total percent = 100%)
('Thiết kế kiến trúc backend', '2022-02-15 10:00:00.000000', NULL, 0, NULL, '2022-02-25 23:59:59', '2022-02-15 11:00:00', 0, 20, '2022-02-16 08:00:00', 'DONE', 19, 7, 6),
('Phát triển API và tích hợp bảo mật', '2022-02-26 09:00:00.000000', NULL, 0, NULL, '2022-03-10 23:59:59', '2022-02-26 10:00:00', 0, 30, '2022-02-27 08:00:00', 'DONE', 19, 7, 6),
('Kiểm thử tải và bảo mật', '2022-03-11 09:00:00.000000', NULL, 0, NULL, '2022-03-25 23:59:59', '2022-03-11 10:00:00', 0, 30, '2022-03-12 08:00:00', 'DONE', 19, 7, 6),
('Triển khai lên server', '2022-03-26 09:00:00.000000', NULL, 0, NULL, '2022-03-18 23:59:59', '2022-03-26 10:00:00', 0, 20, '2022-03-27 08:00:00', 'DONE', 19, 7, 6),

-- Job 7: Thiết kế giao diện website tin tức (3 milestones, COMPLETED, total percent = 100%)
('Thiết kế wireframe và layout', '2022-03-20 14:00:00.000000', NULL, 0, NULL, '2022-03-30 23:59:59', '2022-03-20 15:00:00', 0, 30, '2022-03-21 08:00:00', 'DONE', 20, 8, 7),
('Thiết kế giao diện responsive', '2022-03-31 09:00:00.000000', NULL, 0, NULL, '2022-04-15 23:59:59', '2022-03-31 10:00:00', 0, 40, '2022-04-01 08:00:00', 'DONE', 20, 8, 7),
('Kiểm tra và chỉnh sửa giao diện', '2022-04-16 09:00:00.000000', NULL, 0, NULL, '2022-04-23 23:59:59', '2022-04-16 10:00:00', 0, 30, '2022-04-17 08:00:00', 'DONE', 20, 8, 7),

-- Job 8: Triển khai CI/CD pipeline (3 milestones, COMPLETED, total percent = 100%)
('Cấu hình Jenkins và Docker', '2022-04-25 16:00:00.000000', NULL, 0, NULL, '2022-05-05 23:59:59', '2022-04-25 17:00:00', 0, 30, '2022-04-26 08:00:00', 'DONE', 21, 9, 8),
('Tích hợp GitHub và AWS', '2022-05-06 09:00:00.000000', NULL, 0, NULL, '2022-05-20 23:59:59', '2022-05-06 10:00:00', 0, 40, '2022-05-07 08:00:00', 'DONE', 21, 9, 8),
('Kiểm thử và triển khai pipeline', '2022-05-21 09:00:00.000000', NULL, 0, NULL, '2022-05-28 23:59:59', '2022-05-21 10:00:00', 0, 30, '2022-05-22 08:00:00', 'DONE', 21, 9, 8),

-- Job 9: Tối ưu ứng dụng React Native (4 milestones, COMPLETED, total percent = 100%)
('Phân tích hiệu năng ứng dụng', '2022-05-30 11:00:00.000000', NULL, 0, NULL, '2022-06-10 23:59:59', '2022-05-30 12:00:00', 0, 20, '2022-05-31 08:00:00', 'DONE', 22, 10, 9),
('Tối ưu thời gian load', '2022-06-11 09:00:00.000000', NULL, 0, NULL, '2022-06-20 23:59:59', '2022-06-11 10:00:00', 0, 30, '2022-06-12 08:00:00', 'DONE', 22, 10, 9),
('Fix memory leak', '2022-06-21 09:00:00.000000', '2022-06-25 10:00:00', 1, NULL, '2022-06-30 23:59:59', '2022-06-21 10:00:00', 0, 30, '2022-06-22 08:00:00', 'DISPUTE', 22, 10, 9),
('Kiểm thử và triển khai bản cập nhật', '2022-07-01 09:00:00.000000', NULL, 0, NULL, '2022-07-02 23:59:59', '2022-07-01 10:00:00', 0, 20, '2022-07-02 08:00:00', 'DONE', 22, 10, 9),

-- Job 10: Thu thập dữ liệu web bằng Python (2 milestones, COMPLETED, total percent = 100%)
('Viết script thu thập dữ liệu', '2022-06-10 15:00:00.000000', NULL, 0, NULL, '2022-06-20 23:59:59', '2022-06-10 16:00:00', 0, 60, '2022-06-11 08:00:00', 'DONE', 23, 11, 10),
('Làm sạch và lưu dữ liệu vào CSV/JSON', '2022-06-21 09:00:00.000000', NULL, 0, NULL, '2022-07-13 23:59:59', '2022-06-21 10:00:00', 0, 40, '2022-06-22 08:00:00', 'DONE', 23, 11, 10),

-- Job 11: Xây dựng ứng dụng quản lý dự án với Vue.js (4 milestones, COMPLETED, total percent = 100%)
('Thiết kế giao diện admin', '2022-07-15 12:00:00.000000', NULL, 0, NULL, '2022-07-25 23:59:59', '2022-07-15 13:00:00', 0, 25, '2022-07-16 08:00:00', 'DONE', 24, 12, 11),
('Phát triển tính năng quản lý task', '2022-07-26 09:00:00.000000', NULL, 0, NULL, '2022-08-05 23:59:59', '2022-07-26 10:00:00', 0, 30, '2022-07-27 08:00:00', 'DONE', 24, 12, 11),
('Phát triển tính năng quản lý team', '2022-08-06 09:00:00.000000', NULL, 0, NULL, '2022-08-15 23:59:59', '2022-08-06 10:00:00', 0, 25, '2022-08-07 08:00:00', 'DONE', 24, 12, 11),
('Kiểm thử và triển khai ứng dụng', '2022-08-16 09:00:00.000000', NULL, 0, NULL, '2022-08-18 23:59:59', '2022-08-16 10:00:00', 0, 20, '2022-08-17 08:00:00', 'DONE', 24, 12, 11),

-- Job 12: Mô hình dự đoán giá cổ phiếu bằng AI (5 milestones, COMPLETED, total percent = 100%)
('Chuẩn bị dữ liệu lịch sử', '2022-08-20 17:00:00.000000', NULL, 0, NULL, '2022-08-30 23:59:59', '2022-08-20 18:00:00', 0, 20, '2022-08-21 08:00:00', 'DONE', 25, 13, 12),
('Xây dựng mô hình LSTM', '2022-08-31 09:00:00.000000', NULL, 0, NULL, '2022-09-10 23:59:59', '2022-08-31 10:00:00', 0, 25, '2022-09-01 08:00:00', 'DONE', 25, 13, 12),
('Tối ưu hóa mô hình', '2022-09-11 09:00:00.000000', NULL, 0, NULL, '2022-09-15 23:59:59', '2022-09-11 10:00:00', 0, 25, '2022-09-12 08:00:00', 'DONE', 25, 13, 12),
('Kiểm thử và đánh giá mô hình', '2022-09-16 09:00:00.000000', NULL, 0, NULL, '2022-09-20 23:59:59', '2022-09-16 10:00:00', 0, 20, '2022-09-17 08:00:00', 'DONE', 25, 13, 12),
('Viết báo cáo giải thích mô hình', '2022-09-21 09:00:00.000000', NULL, 0, NULL, '2022-09-23 23:59:59', '2022-09-21 10:00:00', 0, 10, '2022-09-22 08:00:00', 'DONE', 25, 13, 12),

-- Job 13: Xây dựng API hệ thống đặt phòng (3 milestones, COMPLETED, total percent = 100%)
('Thiết kế REST API', '2023-05-10 10:00:00.000000', NULL, 0, NULL, '2023-05-20 23:59:59', '2023-05-10 11:00:00', 0, 30, '2023-05-11 08:00:00', 'DONE', 14, 7, 13),
('Tích hợp MySQL và Redis', '2023-05-21 09:00:00.000000', NULL, 0, NULL, '2023-06-05 23:59:59', '2023-05-21 10:00:00', 0, 40, '2023-05-22 08:00:00', 'DONE', 14, 7, 13),
('Kiểm thử và triển khai API', '2023-06-06 09:00:00.000000', NULL, 0, NULL, '2023-06-13 23:59:59', '2023-06-06 10:00:00', 0, 30, '2023-06-07 08:00:00', 'DONE', 14, 7, 13),

-- Job 14: Thiết kế bộ nhận diện thương hiệu (2 milestones, COMPLETED, total percent = 100%)
('Thiết kế 3 concept logo', '2023-06-12 14:00:00.000000', NULL, 0, NULL, '2023-06-20 23:59:59', '2023-06-12 15:00:00', 0, 60, '2023-06-13 08:00:00', 'DONE', 15, 8, 14),
('Hoàn thiện bộ nhận diện thương hiệu', '2023-06-21 09:00:00.000000', NULL, 0, NULL, '2023-07-15 23:59:59', '2023-06-21 10:00:00', 0, 40, '2023-06-22 08:00:00', 'DONE', 15, 8, 14),

-- Job 15: Tự động hóa triển khai Kubernetes (3 milestones, COMPLETED, total percent = 100%)
('Viết script Terraform', '2023-07-18 16:00:00.000000', NULL, 0, NULL, '2023-07-25 23:59:59', '2023-07-18 17:00:00', 0, 30, '2023-07-19 08:00:00', 'DONE', 16, 9, 15),
('Cấu hình Helm chart', '2023-07-26 09:00:00.000000', NULL, 0, NULL, '2023-08-10 23:59:59', '2023-07-26 10:00:00', 0, 40, '2023-07-27 08:00:00', 'DONE', 16, 9, 15),
('Kiểm thử và triển khai', '2023-08-11 09:00:00.000000', NULL, 0, NULL, '2023-08-21 23:59:59', '2023-08-11 10:00:00', 0, 30, '2023-08-12 08:00:00', 'DONE', 16, 9, 15),

-- Job 16: Sửa lỗi ứng dụng React Native (3 milestones, COMPLETED, total percent = 100%)
('Phân tích lỗi iOS', '2023-08-22 10:00:00.000000', NULL, 0, NULL, '2023-08-30 23:59:59', '2023-08-22 11:00:00', 0, 30, '2023-08-23 08:00:00', 'DONE', 17, 10, 16),
('Fix lỗi hiển thị và crash', '2023-08-31 09:00:00.000000', NULL, 0, NULL, '2023-09-15 23:59:59', '2023-08-31 10:00:00', 0, 40, '2023-09-01 08:00:00', 'DONE', 17, 10, 16),
('Kiểm thử trên iOS version mới', '2023-09-16 09:00:00.000000', NULL, 0, NULL, '2023-09-25 23:59:59', '2023-09-16 10:00:00', 0, 30, '2023-09-17 08:00:00', 'DONE', 17, 10, 16),

-- Job 17: Viết test cho API Django (2 milestones, COMPLETED, total percent = 100%)
('Viết unit test với pytest', '2023-09-25 15:00:00.000000', NULL, 0, NULL, '2023-10-05 23:59:59', '2023-09-25 16:00:00', 0, 60, '2023-09-26 08:00:00', 'DONE', 18, 11, 17),
('Viết integration test và báo cáo coverage', '2023-10-06 09:00:00.000000', NULL, 0, NULL, '2023-10-28 23:59:59', '2023-10-06 10:00:00', 0, 40, '2023-10-07 08:00:00', 'DONE', 18, 11, 17),

-- Job 18: Tối ưu SEO cho website Vue.js (3 milestones, COMPLETED, total percent = 100%)
('Tối ưu SSR và meta tags', '2023-10-30 17:00:00.000000', NULL, 0, NULL, '2023-11-10 23:59:59', '2023-10-30 18:00:00', 0, 30, '2023-10-31 08:00:00', 'DONE', 19, 12, 18),
('Tạo sitemap và cải thiện tốc độ load', '2023-11-11 09:00:00.000000', NULL, 0, NULL, '2023-11-25 23:59:59', '2023-11-11 10:00:00', 0, 40, '2023-11-12 08:00:00', 'DONE', 19, 12, 18),
('Kiểm tra SEO và báo cáo', '2023-11-26 09:00:00.000000', NULL, 0, NULL, '2023-12-03 23:59:59', '2023-11-26 10:00:00', 0, 30, '2023-11-27 08:00:00', 'DONE', 19, 12, 18),

-- Job 19: Xây dựng mô hình phân loại văn bản tiếng Việt (5 milestones, COMPLETED, total percent = 100%)
('Chuẩn bị dataset tiếng Việt', '2023-11-05 12:00:00.000000', NULL, 0, NULL, '2023-11-15 23:59:59', '2023-11-05 13:00:00', 0, 20, '2023-11-06 08:00:00', 'DONE', 20, 13, 19),
('Xây dựng mô hình NLP với BERT', '2023-11-16 09:00:00.000000', NULL, 0, NULL, '2023-11-25 23:59:59', '2023-11-16 10:00:00', 0, 25, '2023-11-17 08:00:00', 'DONE', 20, 13, 19),
('Fine-tune mô hình', '2023-11-26 09:00:00.000000', NULL, 0, NULL, '2023-12-05 23:59:59', '2023-11-26 10:00:00', 0, 25, '2023-11-27 08:00:00', 'DONE', 20, 13, 19),
('Kiểm thử độ chính xác', '2023-12-06 09:00:00.000000', NULL, 0, NULL, '2023-12-15 23:59:59', '2023-12-06 10:00:00', 0, 20, '2023-12-07 08:00:00', 'DONE', 20, 13, 19),
('Tích hợp mô hình vào hệ thống', '2023-12-16 09:00:00.000000', NULL, 0, NULL, '2024-01-08 23:59:59', '2023-12-16 10:00:00', 0, 10, '2023-12-17 08:00:00', 'DONE', 20, 13, 19),

-- Job 20: Refactor code Java theo SOLID (3 milestones, IN_PROGRESS)
('Phân tích codebase hiện tại', '2024-04-01 10:30:00.000000', NULL, 0, NULL, '2024-04-10 23:59:59', '2024-04-01 11:30:00', 0, 30, '2024-04-02 08:00:00', 'DOING', 21, 2, 20),
('Refactor theo SOLID principles', '2024-04-11 09:00:00.000000', NULL, 0, NULL, '2024-04-25 23:59:59', '2024-04-11 10:00:00', 0, 40, '2024-04-12 08:00:00', 'PENDING', 21, 2, 20),
('Kiểm thử và tối ưu code', '2024-04-26 09:00:00.000000', NULL, 0, NULL, '2024-05-04 23:59:59', NULL, 0, 30, '2024-04-27 08:00:00', 'PENDING', 21, 2, 20),

-- Job 23: Sửa lỗi ứng dụng Flutter trên Android (2 milestones, COMPLETED, total percent = 100%)
('Phân tích lỗi crash trên Android', '2023-12-12 12:00:00.000000', NULL, 0, NULL, '2023-12-20 23:59:59', '2023-12-12 13:00:00', 0, 60, '2023-12-13 08:00:00', 'DONE', 24, 6, 23),
('Fix lỗi và kiểm thử', '2023-12-21 09:00:00.000000', NULL, 0, NULL, '2024-02-15 23:59:59', '2023-12-21 10:00:00', 0, 40, '2023-12-22 08:00:00', 'DONE', 24, 6, 23),

-- Job 24: Xử lý dữ liệu Excel bằng Python (2 milestones, COMPLETED, total percent = 100%)
('Viết script xử lý Excel', '2024-01-18 15:00:00.000000', NULL, 0, NULL, '2024-01-25 23:59:59', '2024-01-18 16:00:00', 0, 60, '2024-01-19 08:00:00', 'DONE', 25, 11, 24),
('Kiểm thử và tối ưu hiệu năng', '2024-01-26 09:00:00.000000', NULL, 0, NULL, '2024-03-21 23:59:59', '2024-01-26 10:00:00', 0, 40, '2024-01-27 08:00:00', 'DONE', 25, 11, 24),

-- Job 25: Lập trình dashboard admin với Vue.js (3 milestones, COMPLETED, total percent = 100%)
('Thiết kế giao diện dashboard', '2024-02-22 17:00:00.000000', NULL, 0, NULL, '2024-03-05 23:59:59', '2024-02-22 18:00:00', 0, 30, '2024-02-23 08:00:00', 'DONE', 14, 12, 25),
('Tích hợp API và TypeScript', '2024-03-06 09:00:00.000000', NULL, 0, NULL, '2024-03-20 23:59:59', '2024-03-06 10:00:00', 0, 40, '2024-03-07 08:00:00', 'DONE', 14, 12, 25),
('Kiểm thử và triển khai', '2024-03-21 09:00:00.000000', NULL, 0, NULL, '2024-04-25 23:59:59', '2024-03-21 10:00:00', 0, 30, '2024-03-22 08:00:00', 'DONE', 14, 12, 25),

-- Job 26: Xây dựng data pipeline xử lý big data (4 milestones, IN_PROGRESS)
('Phân tích yêu cầu pipeline', '2024-03-28 11:00:00.000000', NULL, 0, NULL, '2024-04-05 23:59:59', '2024-03-28 12:00:00', 0, 25, '2024-03-29 08:00:00', 'DOING', 15, 13, 26),
('Xây dựng pipeline với Spark', '2024-04-06 09:00:00.000000', NULL, 0, NULL, '2024-04-20 23:59:59', '2024-04-06 10:00:00', 0, 30, '2024-04-07 08:00:00', 'PENDING', 15, 13, 26),
('Làm sạch và chuẩn hóa dữ liệu', '2024-04-21 09:00:00.000000', NULL, 0, NULL, '2024-05-05 23:59:59', NULL, 0, 25, '2024-04-22 08:00:00', 'PENDING', 15, 13, 26),
('Kiểm thử pipeline', '2024-05-06 09:00:00.000000', NULL, 0, NULL, '2024-05-31 23:59:59', NULL, 0, 20, '2024-05-07 08:00:00', 'PENDING', 15, 13, 26),

-- Job 27: Tối ưu hiệu năng ứng dụng Java (3 milestones, COMPLETED, total percent = 100%)
('Phân tích hiệu năng ứng dụng', '2023-04-15 11:00:00.000000', NULL, 0, NULL, '2023-04-25 23:59:59', '2023-04-15 12:00:00', 0, 30, '2023-04-16 08:00:00', 'DONE', 16, 2, 27),
('Tối ưu truy vấn database', '2023-04-26 09:00:00.000000', NULL, 0, NULL, '2023-05-10 23:59:59', '2023-04-26 10:00:00', 0, 40, '2023-04-27 08:00:00', 'DONE', 16, 2, 27),
('Kiểm thử và triển khai', '2023-05-11 09:00:00.000000', NULL, 0, NULL, '2023-05-18 23:59:59', '2023-05-11 10:00:00', 0, 30, '2023-05-12 08:00:00', 'DONE', 16, 2, 27),

-- Job 28: Thiết kế banner quảng cáo (2 milestones, COMPLETED, total percent = 100%)
('Thiết kế 3 concept banner', '2023-05-20 12:00:00.000000', NULL, 0, NULL, '2023-05-25 23:59:59', '2023-05-20 13:00:00', 0, 60, '2023-05-21 08:00:00', 'DONE', 17, 3, 28),
('Chỉnh sửa và hoàn thiện banner', '2023-05-26 09:00:00.000000', NULL, 0, NULL, '2023-06-23 23:59:59', '2023-05-26 10:00:00', 0, 40, '2023-05-27 08:00:00', 'DONE', 17, 3, 28),

-- Job 29: Tự động hóa testing ứng dụng web (3 milestones, COMPLETED, total percent = 100%)
('Viết script Selenium', '2023-06-25 16:00:00.000000', NULL, 0, NULL, '2023-07-05 23:59:59', '2023-06-25 17:00:00', 0, 30, '2023-06-26 08:00:00', 'DONE', 18, 4, 29),
('Tích hợp test case chính', '2023-07-06 09:00:00.000000', NULL, 0, NULL, '2023-07-20 23:59:59', '2023-07-06 10:00:00', 0, 40, '2023-07-07 08:00:00', 'DONE', 18, 4, 29),
('Kiểm thử và báo cáo', '2023-07-21 09:00:00.000000', NULL, 0, NULL, '2023-07-28 23:59:59', '2023-07-21 10:00:00', 0, 30, '2023-07-22 08:00:00', 'DONE', 18, 4, 29),

-- Job 30: Cải thiện UI ứng dụng mobile (3 milestones, COMPLETED, total percent = 100%)
('Phân tích UX hiện tại', '2023-07-30 17:00:00.000000', NULL, 0, NULL, '2023-08-05 23:59:59', '2023-07-30 18:00:00', 0, 30, '2023-07-31 08:00:00', 'DONE', 19, 5, 30),
('Thiết kế UI mới', '2023-08-06 09:00:00.000000', NULL, 0, NULL, '2023-08-20 23:59:59', '2023-08-06 10:00:00', 0, 40, '2023-08-07 08:00:00', 'DONE', 19, 5, 30),
('Kiểm thử và triển khai UI', '2023-08-21 09:00:00.000000', NULL, 0, NULL, '2023-09-02 23:59:59', '2023-08-21 10:00:00', 0, 30, '2023-08-22 08:00:00', 'DONE', 19, 5, 30),

-- Job 31: Phát triển hệ thống xử lý đơn hàng (4 milestones, COMPLETED, total percent = 100%)
('Thiết kế kiến trúc hệ thống', '2023-09-04 10:00:00.000000', NULL, 0, NULL, '2023-09-15 23:59:59', '2023-09-04 11:00:00', 0, 25, '2023-09-05 08:00:00', 'DONE', 20, 7, 31),
('Phát triển backend chịu tải', '2023-09-16 09:00:00.000000', NULL, 0, NULL, '2023-09-30 23:59:59', '2023-09-16 10:00:00', 0, 30, '2023-09-17 08:00:00', 'DONE', 20, 7, 31),
('Tích hợp Redis caching', '2023-10-01 09:00:00.000000', NULL, 0, NULL, '2023-10-15 23:59:59', '2023-10-01 10:00:00', 0, 25, '2023-10-02 08:00:00', 'DONE', 20, 7, 31),
('Kiểm thử tải và triển khai', '2023-10-16 09:00:00.000000', NULL, 0, NULL, '2023-10-07 23:59:59', '2023-10-16 10:00:00', 0, 20, '2023-10-17 08:00:00', 'DONE', 20, 7, 31),

-- Job 32: Thiết kế responsive website (2 milestones, COMPLETED, total percent = 100%)
('Thiết kế giao diện mobile', '2023-10-09 11:00:00.000000', NULL, 0, NULL, '2023-10-20 23:59:59', '2023-10-09 12:00:00', 0, 60, '2023-10-10 08:00:00', 'DONE', 21, 8, 32),
('Kiểm thử và tối ưu responsive', '2023-10-21 09:00:00.000000', NULL, 0, NULL, '2023-11-12 23:59:59', '2023-10-21 10:00:00', 0, 40, '2023-10-22 08:00:00', 'DONE', 21, 8, 32),

-- Job 33: Triển khai hệ thống monitoring Kubernetes (3 milestones, COMPLETED, total percent = 100%)
('Cấu hình Prometheus', '2023-11-14 15:00:00.000000', NULL, 0, NULL, '2023-11-25 23:59:59', '2023-11-14 16:00:00', 0, 30, '2023-11-15 08:00:00', 'DONE', 22, 9, 33),
('Cấu hình Grafana và cảnh báo', '2023-11-26 09:00:00.000000', NULL, 0, NULL, '2023-12-10 23:59:59', '2023-11-26 10:00:00', 0, 40, '2023-11-27 08:00:00', 'DONE', 22, 9, 33),
('Kiểm thử và triển khai hệ thống', '2023-12-11 09:00:00.000000', NULL, 0, NULL, '2024-01-17 23:59:59', '2023-12-11 10:00:00', 0, 30, '2023-12-12 08:00:00', 'DONE', 22, 9, 33),

-- Job 34: Sửa lỗi performance ứng dụng React Native (3 milestones, COMPLETED, total percent = 100%)
('Phân tích performance', '2023-12-19 17:00:00.000000', NULL, 0, NULL, '2023-12-25 23:59:59', '2023-12-19 18:00:00', 0, 30, '2023-12-20 08:00:00', 'DONE', 23, 10, 34),
('Fix memory leak', '2023-12-26 09:00:00.000000', NULL, 0, NULL, '2024-01-10 23:59:59', '2023-12-26 10:00:00', 0, 40, '2023-12-27 08:00:00', 'DONE', 23, 10, 34),
('Kiểm thử và triển khai', '2024-01-11 09:00:00.000000', NULL, 0, NULL, '2024-02-22 23:59:59', '2024-01-11 10:00:00', 0, 30, '2024-01-12 08:00:00', 'DONE', 23, 10, 34),

-- Job 35: Viết tài liệu API Django (2 milestones, COMPLETED, total percent = 100%)
('Viết danh sách endpoint', '2024-01-24 11:00:00.000000', NULL, 0, NULL, '2024-02-05 23:59:59', '2024-01-24 12:00:00', 0, 60, '2024-01-25 08:00:00', 'DONE', 24, 11, 35),
('Viết ví dụ request/response', '2024-02-06 09:00:00.000000', NULL, 0, NULL, '2024-03-27 23:59:59', '2024-02-06 10:00:00', 0, 40, '2024-02-07 08:00:00', 'DONE', 24, 11, 35),

-- Job 36: Tối ưu tốc độ Vue.js SPA (3 milestones, COMPLETED, total percent = 100%)
('Tối ưu lazy loading', '2024-02-29 14:00:00.000000', NULL, 0, NULL, '2024-03-10 23:59:59', '2024-02-29 15:00:00', 0, 30, '2024-03-01 08:00:00', 'DONE', 25, 12, 36),
('Áp dụng code splitting', '2024-03-11 09:00:00.000000', NULL, 0, NULL, '2024-03-25 23:59:59', '2024-03-11 10:00:00', 0, 40, '2024-03-12 08:00:00', 'DONE', 25, 12, 36),
('Kiểm thử và tối ưu hình ảnh', '2024-03-26 09:00:00.000000', NULL, 0, NULL, '2024-05-02 23:59:59', '2024-03-26 10:00:00', 0, 30, '2024-03-27 08:00:00', 'DONE', 25, 12, 36),

-- Job 37: Xây dựng mô hình nhận diện giọng nói tiếng Việt (4 milestones, IN_PROGRESS)
('Chuẩn bị dataset', '2024-04-05 15:00:00.000000', NULL, 0, NULL, '2024-04-15 23:59:59', '2024-04-05 16:00:00', 0, 25, '2024-04-06 08:00:00', 'DOING', 14, 13, 37),
('Xây dựng mô hình DeepSpeech', '2024-04-16 09:00:00.000000', NULL, 0, NULL, '2024-04-30 23:59:59', '2024-04-16 10:00:00', 0, 30, '2024-04-17 08:00:00', 'PENDING', 14, 13, 37),
('Kiểm thử độ chính xác', '2024-05-01 09:00:00.000000', NULL, 0, NULL, '2024-05-15 23:59:59', NULL, 0, 25, '2024-05-02 08:00:00', 'PENDING', 14, 13, 37),
('Tích hợp mô hình', '2024-05-16 09:00:00.000000', NULL, 0, NULL, '2024-06-08 23:59:59', NULL, 0, 20, '2024-05-17 08:00:00', 'PENDING', 14, 13, 37),

-- Job 38: Xây dựng hệ thống microservices (4 milestones, COMPLETED, total percent = 100%)
('Thiết kế microservices', '2022-09-10 17:00:00.000000', NULL, 0, NULL, '2022-09-20 23:59:59', '2022-09-10 18:00:00', 0, 25, '2022-09-11 08:00:00', 'DONE', 15, 7, 38),
('Tích hợp Kafka', '2022-09-21 09:00:00.000000', NULL, 0, NULL, '2022-10-05 23:59:59', '2022-09-21 10:00:00', 0, 30, '2022-09-22 08:00:00', 'DONE', 15, 7, 38),
('Kiểm thử microservices', '2022-10-06 09:00:00.000000', NULL, 0, NULL, '2022-10-20 23:59:59', '2022-10-06 10:00:00', 0, 25, '2022-10-07 08:00:00', 'DONE', 15, 7, 38),
('Triển khai hệ thống', '2022-10-21 09:00:00.000000', NULL, 0, NULL, '2022-10-13 23:59:59', '2022-10-21 10:00:00', 0, 20, '2022-10-22 08:00:00', 'DONE', 15, 7, 38),

-- Job 39: Thiết kế UI ứng dụng quản lý tài chính (3 milestones, COMPLETED, total percent = 100%)
('Thiết kế wireframe', '2022-10-15 10:00:00.000000', NULL, 0, NULL, '2022-10-25 23:59:59', '2022-10-15 11:00:00', 0, 30, '2022-10-16 08:00:00', 'DONE', 16, 8, 39),
('Thiết kế 10 màn hình chính', '2022-10-26 09:00:00.000000', NULL, 0, NULL, '2022-11-10 23:59:59', '2022-10-26 10:00:00', 0, 40, '2022-10-27 08:00:00', 'DONE', 16, 8, 39),
('Kiểm thử và chỉnh sửa UI', '2022-11-11 09:00:00.000000', NULL, 0, NULL, '2022-11-18 23:59:59', '2022-11-11 10:00:00', 0, 30, '2022-11-12 08:00:00', 'DONE', 16, 8, 39),

-- Job 40: Triển khai CI/CD cho dự án Node.js (3 milestones, COMPLETED, total percent = 100%)
('Cấu hình GitHub Actions', '2022-11-20 11:00:00.000000', NULL, 0, NULL, '2022-12-01 23:59:59', '2022-11-20 12:00:00', 0, 30, '2022-11-21 08:00:00', 'DONE', 17, 9, 40),
('Tự động build và test', '2022-12-02 09:00:00.000000', NULL, 0, NULL, '2022-12-15 23:59:59', '2022-12-02 10:00:00', 0, 40, '2022-12-03 08:00:00', 'DONE', 17, 9, 40),
('Triển khai lên Heroku', '2022-12-16 09:00:00.000000', NULL, 0, NULL, '2022-12-23 23:59:59', '2022-12-16 10:00:00', 0, 30, '2022-12-17 08:00:00', 'DONE', 17, 9, 40),

-- Job 41: Tối ưu hiệu năng React Native (3 milestones, COMPLETED, total percent = 100%)
('Phân tích memory usage', '2022-12-25 14:00:00.000000', NULL, 0, NULL, '2023-01-05 23:59:59', '2022-12-25 15:00:00', 0, 30, '2022-12-26 08:00:00', 'DONE', 18, 10, 41),
('Tối ưu FPS', '2023-01-06 09:00:00.000000', NULL, 0, NULL, '2023-01-20 23:59:59', '2023-01-06 10:00:00', 0, 40, '2023-01-07 08:00:00', 'DONE', 18, 10, 41),
('Kiểm thử trên device cũ', '2023-01-21 09:00:00.000000', NULL, 0, NULL, '2023-01-27 23:59:59', '2023-01-21 10:00:00', 0, 30, '2023-01-22 08:00:00', 'DONE', 18, 10, 41),

-- Job 42: Viết unit test cho API Django (2 milestones, COMPLETED, total percent = 100%)
('Viết unit test', '2023-01-30 17:00:00.000000', NULL, 0, NULL, '2023-02-10 23:59:59', '2023-01-30 18:00:00', 0, 60, '2023-01-31 08:00:00', 'DONE', 19, 11, 42),
('Báo cáo coverage', '2023-02-11 09:00:00.000000', NULL, 0, NULL, '2023-03-03 23:59:59', '2023-02-11 10:00:00', 0, 40, '2023-02-12 08:00:00', 'DONE', 19, 11, 42),

-- Job 43: Redesign giao diện website TMĐT (3 milestones, COMPLETED, total percent = 100%)
('Phân tích giao diện hiện tại', '2023-03-07 11:00:00.000000', NULL, 0, NULL, '2023-03-15 23:59:59', '2023-03-07 12:00:00', 0, 30, '2023-03-08 08:00:00', 'DONE', 20, 12, 43),
('Thiết kế giao diện mới', '2023-03-16 09:00:00.000000', NULL, 0, NULL, '2023-03-30 23:59:59', '2023-03-16 10:00:00', 0, 40, '2023-03-17 08:00:00', 'DONE', 20, 12, 43),
('Kiểm thử và triển khai', '2023-03-31 09:00:00.000000', NULL, 0, NULL, '2023-04-10 23:59:59', '2023-03-31 10:00:00', 0, 30, '2023-04-01 08:00:00', 'DONE', 20, 12, 43),

-- Job 44: Mô hình AI đề xuất sản phẩm (4 milestones, COMPLETED, total percent = 100%)
('Chuẩn bị dữ liệu mua hàng', '2023-04-12 14:00:00.000000', NULL, 0, NULL, '2023-04-20 23:59:59', '2023-04-12 15:00:00', 0, 25, '2023-04-13 08:00:00', 'DONE', 21, 13, 44),
('Xây dựng mô hình AI', '2023-04-21 09:00:00.000000', NULL, 0, NULL, '2023-04-30 23:59:59', '2023-04-21 10:00:00', 0, 30, '2023-04-22 08:00:00', 'DONE', 21, 13, 44),
('Kiểm thử độ chính xác', '2023-05-01 09:00:00.000000', NULL, 0, NULL, '2023-05-10 23:59:59', '2023-05-01 10:00:00', 0, 25, '2023-05-02 08:00:00', 'DONE', 21, 13, 44),
('Tích hợp vào website TMĐT', '2023-05-11 09:00:00.000000', NULL, 0, NULL, '2023-05-15 23:59:59', '2023-05-11 10:00:00', 0, 20, '2023-05-12 08:00:00', 'DONE', 21, 13, 44),

-- Job 47: Tự động hóa deploy ứng dụng Android (3 milestones, COMPLETED, total percent = 100%)
('Cấu hình Fastlane', '2023-08-10 10:00:00.000000', NULL, 0, NULL, '2023-08-20 23:59:59', '2023-08-10 11:00:00', 0, 30, '2023-08-11 08:00:00', 'DONE', 24, 4, 47),
('Viết script deploy', '2023-08-21 09:00:00.000000', NULL, 0, NULL, '2023-09-05 23:59:59', '2023-08-21 10:00:00', 0, 40, '2023-08-22 08:00:00', 'DONE', 24, 4, 47),
('Kiểm thử và triển khai', '2023-09-06 09:00:00.000000', NULL, 0, NULL, '2023-09-13 23:59:59', '2023-09-06 10:00:00', 0, 30, '2023-09-07 08:00:00', 'DONE', 24, 4, 47),

-- Job 48: Phát triển tính năng mới cho ứng dụng nhà hàng (3 milestones, COMPLETED, total percent = 100%)
('Phát triển tính năng đặt bàn online', '2023-09-15 11:00:00.000000', NULL, 0, NULL, '2023-09-25 23:59:59', '2023-09-15 12:00:00', 0, 30, '2023-09-16 08:00:00', 'DONE', 25, 5, 48),
('Tích hợp thanh toán QR code', '2023-09-26 09:00:00.000000', NULL, 0, NULL, '2023-10-10 23:59:59', '2023-09-26 10:00:00', 0, 40, '2023-09-27 08:00:00', 'DONE', 25, 5, 48),
('Kiểm thử và triển khai', '2023-10-11 09:00:00.000000', NULL, 0, NULL, '2023-10-18 23:59:59', '2023-10-11 10:00:00', 0, 30, '2023-10-12 08:00:00', 'DONE', 25, 5, 48),

-- Job 49: Phát triển backend chịu tải cao (4 milestones, COMPLETED, total percent = 100%)
('Thiết kế kiến trúc backend', '2023-10-20 14:00:00.000000', NULL, 0, NULL, '2023-10-30 23:59:59', '2023-10-20 15:00:00', 0, 25, '2023-10-21 08:00:00', 'DONE', 14, 7, 49),
('Phát triển backend với Spring Boot', '2023-10-31 09:00:00.000000', NULL, 0, NULL, '2023-11-10 23:59:59', '2023-10-31 10:00:00', 0, 30, '2023-11-01 08:00:00', 'DONE', 14, 7, 49),
('Tích hợp horizontal scaling', '2023-11-11 09:00:00.000000', NULL, 0, NULL, '2023-11-20 23:59:59', '2023-11-11 10:00:00', 0, 25, '2023-11-12 08:00:00', 'DONE', 14, 7, 49),
('Kiểm thử và triển khai', '2023-11-21 09:00:00.000000', NULL, 0, NULL, '2023-11-23 23:59:59', '2023-11-21 10:00:00', 0, 20, '2023-11-22 08:00:00', 'DONE', 14, 7, 49),

-- Job 50: Redesign giao diện mobile app (2 milestones, COMPLETED, total percent = 100%)
('Thiết kế giao diện mới', '2023-11-25 17:00:00.000000', NULL, 0, NULL, '2023-12-05 23:59:59', '2023-11-25 18:00:00', 0, 60, '2023-11-26 08:00:00', 'DONE', 15, 8, 50),
('Kiểm thử và triển khai UI', '2023-12-06 09:00:00.000000', NULL, 0, NULL, '2023-12-28 23:59:59', '2023-12-06 10:00:00', 0, 40, '2023-12-07 08:00:00', 'DONE', 15, 8, 50),

-- Job 51: Triển khai Kubernetes cho microservices (3 milestones, COMPLETED, total percent = 100%)
('Cấu hình Kubernetes cluster', '2024-01-05 11:00:00.000000', NULL, 0, NULL, '2024-01-15 23:59:59', '2024-01-05 12:00:00', 0, 30, '2024-01-06 08:00:00', 'DONE', 16, 9, 51),
('Thiết lập auto-scaling', '2024-01-16 09:00:00.000000', NULL, 0, NULL, '2024-01-30 23:59:59', '2024-01-16 10:00:00', 0, 40, '2024-01-17 08:00:00', 'DONE', 16, 9, 51),
('Cấu hình monitoring và logging', '2024-01-31 09:00:00.000000', NULL, 0, NULL, '2024-02-08 23:59:59', '2024-01-31 10:00:00', 0, 30, '2024-02-01 08:00:00', 'DONE', 16, 9, 51),

-- Job 52: Sửa lỗi memory leak React Native (3 milestones, COMPLETED, total percent = 100%)
('Phân tích memory leak', '2024-02-10 14:00:00.000000', NULL, 0, NULL, '2024-02-20 23:59:59', '2024-02-10 15:00:00', 0, 30, '2024-02-11 08:00:00', 'DONE', 17, 10, 52),
('Fix memory leak', '2024-02-21 09:00:00.000000', NULL, 0, NULL, '2024-03-05 23:59:59', '2024-02-21 10:00:00', 0, 40, '2024-02-22 08:00:00', 'DONE', 17, 10, 52),
('Kiểm thử và triển khai', '2024-03-06 09:00:00.000000', NULL, 0, NULL, '2024-03-13 23:59:59', '2024-03-06 10:00:00', 0, 30, '2024-03-07 08:00:00', 'DONE', 17, 10, 52),

-- Job 53: Viết tài liệu kỹ thuật API (2 milestones, COMPLETED, total percent = 100%)
('Viết hướng dẫn tích hợp', '2024-03-15 16:00:00.000000', NULL, 0, NULL, '2024-03-25 23:59:59', '2024-03-15 17:00:00', 0, 60, '2024-03-16 08:00:00', 'DONE', 18, 11, 53),
('Viết danh sách lỗi thường gặp', '2024-03-26 09:00:00.000000', NULL, 0, NULL, '2024-04-18 23:59:59', '2024-03-26 10:00:00', 0, 40, '2024-03-27 08:00:00', 'DONE', 18, 11, 53),

-- Job 54: Tối ưu tốc độ Vue.js SPA (3 milestones, IN_PROGRESS)
('Tối ưu lazy loading', '2024-04-20 18:00:00.000000', NULL, 0, NULL, '2024-04-30 23:59:59', '2024-04-20 19:00:00', 0, 30, '2024-04-21 08:00:00', 'DOING', 19, 12, 54),
('Áp dụng prefetching', '2024-05-01 09:00:00.000000', NULL, 0, NULL, '2024-05-15 23:59:59', '2024-05-01 10:00:00', 0, 40, '2024-05-02 08:00:00', 'PENDING', 19, 12, 54),
('Kiểm thử và tối ưu asset', '2024-05-16 09:00:00.000000', NULL, 0, NULL, '2024-05-23 23:59:59', NULL, 0, 30, '2024-05-17 08:00:00', 'PENDING', 19, 12, 54),

-- Job 56: Xây dựng hệ thống microservices với Spring Cloud (4 milestones, COMPLETED, total percent = 100%)
('Thiết kế service discovery', '2023-12-05 13:00:00.000000', NULL, 0, NULL, '2023-12-15 23:59:59', '2023-12-05 14:00:00', 0, 25, '2023-12-06 08:00:00', 'DONE', 21, 2, 56),
('Tích hợp API gateway', '2023-12-16 09:00:00.000000', NULL, 0, NULL, '2023-12-25 23:59:59', '2023-12-16 10:00:00', 0, 30, '2023-12-17 08:00:00', 'DONE', 21, 2, 56),
('Tích hợp circuit breaker', '2023-12-26 09:00:00.000000', NULL, 0, NULL, '2024-01-05 23:59:59', '2023-12-26 10:00:00', 0, 25, '2023-12-27 08:00:00', 'DONE', 21, 2, 56),
('Kiểm thử và triển khai', '2024-01-06 09:00:00.000000', NULL, 0, NULL, '2023-12-08 23:59:59', '2024-01-06 10:00:00', 0, 20, '2024-01-07 08:00:00', 'DONE', 21, 2, 56),

-- Job 57: Thiết kế UI/UX ứng dụng đặt lịch hẹn (3 milestones, COMPLETED, total percent = 100%) (tiếp tục)
('Thiết kế giao diện chính bằng Figma', '2024-01-21 09:00:00.000000', NULL, 0, NULL, '2024-02-05 23:59:59', '2024-01-21 10:00:00', 0, 40, '2024-01-22 08:00:00', 'DONE', 22, 3, 57),
('Kiểm thử UX và chỉnh sửa', '2024-02-06 09:00:00.000000', NULL, 0, NULL, '2024-02-15 23:59:59', '2024-02-06 10:00:00', 0, 30, '2024-02-07 08:00:00', 'DONE', 22, 3, 57),

-- Job 58: Phát triển chatbot AI (4 milestones, COMPLETED, total percent = 100%)
('Thiết kế luồng hội thoại', '2024-02-17 10:00:00.000000', NULL, 0, NULL, '2024-02-25 23:59:59', '2024-02-17 11:00:00', 0, 25, '2024-02-18 08:00:00', 'DONE', 23, 4, 58),
('Xây dựng mô hình NLP', '2024-02-26 09:00:00.000000', NULL, 0, NULL, '2024-03-10 23:59:59', '2024-02-26 10:00:00', 0, 30, '2024-02-27 08:00:00', 'DONE', 23, 4, 58),
('Tích hợp chatbot vào website', '2024-03-11 09:00:00.000000', NULL, 0, NULL, '2024-03-20 23:59:59', '2024-03-11 10:00:00', 0, 25, '2024-03-12 08:00:00', 'DONE', 23, 4, 58),
('Kiểm thử và tối ưu chatbot', '2024-03-21 09:00:00.000000', NULL, 0, NULL, '2024-03-25 23:59:59', '2024-03-21 10:00:00', 0, 20, '2024-03-22 08:00:00', 'DONE', 23, 4, 58),

-- Job 59: Tối ưu SEO cho website WordPress (3 milestones, COMPLETED, total percent = 100%)
('Tối ưu meta tags và content', '2024-03-27 12:00:00.000000', NULL, 0, NULL, '2024-04-05 23:59:59', '2024-03-27 13:00:00', 0, 30, '2024-03-28 08:00:00', 'DONE', 24, 5, 59),
('Cải thiện tốc độ tải trang', '2024-04-06 09:00:00.000000', NULL, 0, NULL, '2024-04-15 23:59:59', '2024-04-06 10:00:00', 0, 40, '2024-04-07 08:00:00', 'DONE', 24, 5, 59),
('Tạo sitemap và báo cáo SEO', '2024-04-16 09:00:00.000000', NULL, 0, NULL, '2024-04-20 23:59:59', '2024-04-16 10:00:00', 0, 30, '2024-04-17 08:00:00', 'DONE', 24, 5, 59),

-- Job 60: Phát triển ứng dụng quản lý kho với Flutter (4 milestones, IN_PROGRESS)
('Thiết kế giao diện kho', '2024-04-22 11:00:00.000000', NULL, 0, NULL, '2024-05-01 23:59:59', '2024-04-22 12:00:00', 0, 25, '2024-04-23 08:00:00', 'DOING', 25, 6, 60),
('Phát triển tính năng nhập/xuất kho', '2024-05-02 09:00:00.000000', NULL, 0, NULL, '2024-05-15 23:59:59', '2024-05-02 10:00:00', 0, 30, '2024-05-03 08:00:00', 'PENDING', 25, 6, 60),
('Tích hợp barcode scanner', '2024-05-16 09:00:00.000000', NULL, 0, NULL, '2024-05-30 23:59:59', NULL, 0, 25, '2024-05-17 08:00:00', 'PENDING', 25, 6, 60),
('Kiểm thử và triển khai', '2024-05-31 09:00:00.000000', NULL, 0, NULL, '2024-06-05 23:59:59', NULL, 0, 20, '2024-06-01 08:00:00', 'PENDING', 25, 6, 60),

-- Job 61: Xây dựng API với Node.js (3 milestones, COMPLETED, total percent = 100%)
('Thiết kế REST API', '2024-05-07 14:00:00.000000', NULL, 0, NULL, '2024-05-15 23:59:59', '2024-05-07 15:00:00', 0, 30, '2024-05-08 08:00:00', 'DONE', 14, 7, 61),
('Tích hợp MongoDB', '2024-05-16 09:00:00.000000', NULL, 0, NULL, '2024-05-25 23:59:59', '2024-05-16 10:00:00', 0, 40, '2024-05-17 08:00:00', 'DONE', 14, 7, 61),
('Kiểm thử và triển khai', '2024-05-26 09:00:00.000000', NULL, 0, NULL, '2024-05-30 23:59:59', '2024-05-26 10:00:00', 0, 30, '2024-05-27 08:00:00', 'DONE', 14, 7, 61),

-- Job 62: Thiết kế logo và banner quảng cáo (2 milestones, COMPLETED, total percent = 100%)
('Thiết kế 3 concept logo', '2024-06-01 16:00:00.000000', NULL, 0, NULL, '2024-06-10 23:59:59', '2024-06-01 17:00:00', 0, 60, '2024-06-02 08:00:00', 'DONE', 15, 8, 62),
('Hoàn thiện logo và banner', '2024-06-11 09:00:00.000000', NULL, 0, NULL, '2024-06-15 23:59:59', '2024-06-11 10:00:00', 0, 40, '2024-06-12 08:00:00', 'DONE', 15, 8, 62),

-- Job 63: Tự động hóa kiểm thử API với Postman (3 milestones, COMPLETED, total percent = 100%)
('Viết script kiểm thử tự động', '2024-06-17 10:00:00.000000', NULL, 0, NULL, '2024-06-25 23:59:59', '2024-06-17 11:00:00', 0, 30, '2024-06-18 08:00:00', 'DONE', 16, 9, 63),
('Tích hợp vào pipeline CI/CD', '2024-06-26 09:00:00.000000', NULL, 0, NULL, '2024-07-05 23:59:59', '2024-06-26 10:00:00', 0, 40, '2024-06-27 08:00:00', 'DONE', 16, 9, 63),
('Kiểm thử và báo cáo coverage', '2024-07-06 09:00:00.000000', NULL, 0, NULL, '2024-07-10 23:59:59', '2024-07-06 10:00:00', 0, 30, '2024-07-07 08:00:00', 'DONE', 16, 9, 63),

-- Job 64: Phát triển tính năng livestream cho app (4 milestones, IN_PROGRESS)
('Thiết kế giao diện livestream', '2024-07-12 12:00:00.000000', NULL, 0, NULL, '2024-07-20 23:59:59', '2024-07-12 13:00:00', 0, 25, '2024-07-13 08:00:00', 'DOING', 17, 10, 64),
('Tích hợp WebRTC', '2024-07-21 09:00:00.000000', NULL, 0, NULL, '2024-08-05 23:59:59', '2024-07-21 10:00:00', 0, 30, '2024-07-22 08:00:00', 'PENDING', 17, 10, 64),
('Kiểm thử độ trễ video', '2024-08-06 09:00:00.000000', NULL, 0, NULL, '2024-08-20 23:59:59', NULL, 0, 25, '2024-08-07 08:00:00', 'PENDING', 17, 10, 64),
('Triển khai tính năng livestream', '2024-08-21 09:00:00.000000', NULL, 0, NULL, '2024-08-25 23:59:59', NULL, 0, 20, '2024-08-22 08:00:00', 'PENDING', 17, 10, 64),

-- Job 65: Tối ưu hiệu năng backend Go (3 milestones, COMPLETED, total percent = 100%)
('Phân tích hiệu năng hiện tại', '2024-08-27 14:00:00.000000', NULL, 0, NULL, '2024-09-05 23:59:59', '2024-08-27 15:00:00', 0, 30, '2024-08-28 08:00:00', 'DONE', 18, 11, 65),
('Tối ưu truy vấn database', '2024-09-06 09:00:00.000000', NULL, 0, NULL, '2024-09-15 23:59:59', '2024-09-06 10:00:00', 0, 40, '2024-09-07 08:00:00', 'DONE', 18, 11, 65),
('Kiểm thử tải và triển khai', '2024-09-16 09:00:00.000000', NULL, 0, NULL, '2024-09-20 23:59:59', '2024-09-16 10:00:00', 0, 30, '2024-09-17 08:00:00', 'DONE', 18, 11, 65),

-- Job 66: Thiết kế giao diện ứng dụng quản lý học tập (2 milestones, COMPLETED, total percent = 100%)
('Thiết kế giao diện học viên', '2024-09-22 16:00:00.000000', NULL, 0, NULL, '2024-09-30 23:59:59', '2024-09-22 17:00:00', 0, 60, '2024-09-23 08:00:00', 'DONE', 19, 12, 66),
('Kiểm thử UX và chỉnh sửa', '2024-10-01 09:00:00.000000', NULL, 0, NULL, '2024-10-05 23:59:59', '2024-10-01 10:00:00', 0, 40, '2024-10-02 08:00:00', 'DONE', 19, 12, 66),

-- Job 67: Phát triển mô hình AI nhận diện khuôn mặt (5 milestones, COMPLETED, total percent = 100%)
('Chuẩn bị dataset khuôn mặt', '2024-10-07 10:00:00.000000', NULL, 0, NULL, '2024-10-15 23:59:59', '2024-10-07 11:00:00', 0, 20, '2024-10-08 08:00:00', 'DONE', 20, 13, 67),
('Xây dựng mô hình AI', '2024-10-16 09:00:00.000000', NULL, 0, NULL, '2024-10-25 23:59:59', '2024-10-16 10:00:00', 0, 25, '2024-10-17 08:00:00', 'DONE', 20, 13, 67),
('Tối ưu độ chính xác', '2024-10-26 09:00:00.000000', NULL, 0, NULL, '2024-11-05 23:59:59', '2024-10-26 10:00:00', 0, 25, '2024-10-27 08:00:00', 'DONE', 20, 13, 67),
('Kiểm thử mô hình', '2024-11-06 09:00:00.000000', NULL, 0, NULL, '2024-11-15 23:59:59', '2024-11-06 10:00:00', 0, 20, '2024-11-07 08:00:00', 'DONE', 20, 13, 67),
('Tích hợp vào hệ thống', '2024-11-16 09:00:00.000000', '2024-11-20 10:00:00', 1, NULL, '2024-11-20 23:59:59', '2024-11-16 10:00:00', 0, 10, '2024-11-17 08:00:00', 'DISPUTE', 20, 13, 67),

-- Job 68: Viết tài liệu kỹ thuật microservices (2 milestones, COMPLETED, total percent = 100%)
('Viết tài liệu kiến trúc', '2024-11-22 12:00:00.000000', NULL, 0, NULL, '2024-11-30 23:59:59', '2024-11-22 13:00:00', 0, 60, '2024-11-23 08:00:00', 'DONE', 21, 2, 68),
('Viết hướng dẫn triển khai', '2024-12-01 09:00:00.000000', NULL, 0, NULL, '2024-12-05 23:59:59', '2024-12-01 10:00:00', 0, 40, '2024-12-02 08:00:00', 'DONE', 21, 2, 68),

-- Job 69: Tối ưu hiệu năng ứng dụng React (3 milestones, COMPLETED, total percent = 100%)
('Phân tích hiệu năng', '2024-12-07 14:00:00.000000', NULL, 0, NULL, '2024-12-15 23:59:59', '2024-12-07 15:00:00', 0, 30, '2024-12-08 08:00:00', 'DONE', 22, 3, 69),
('Tối ưu render component', '2024-12-16 09:00:00.000000', NULL, 0, NULL, '2024-12-25 23:59:59', '2024-12-16 10:00:00', 0, 40, '2024-12-17 08:00:00', 'DONE', 22, 3, 69),
('Kiểm thử và triển khai', '2024-12-26 09:00:00.000000', NULL, 0, NULL, '2024-12-30 23:59:59', '2024-12-26 10:00:00', 0, 30, '2024-12-27 08:00:00', 'DONE', 22, 3, 69),

-- Job 70: Phát triển tính năng chat cho website (4 milestones, IN_PROGRESS)
('Thiết kế giao diện chat', '2025-01-01 16:00:00.000000', NULL, 0, NULL, '2025-01-10 23:59:59', '2025-01-01 17:00:00', 0, 25, '2025-01-02 08:00:00', 'DOING', 23, 4, 70),
('Tích hợp WebSocket', '2025-01-11 09:00:00.000000', NULL, 0, NULL, '2025-01-20 23:59:59', '2025-01-11 10:00:00', 0, 30, '2025-01-12 08:00:00', 'PENDING', 23, 4, 70),
('Kiểm thử tin nhắn real-time', '2025-01-21 09:00:00.000000', NULL, 0, NULL, '2025-02-05 23:59:59', NULL, 0, 25, '2025-01-22 08:00:00', 'PENDING', 23, 4, 70),
('Triển khai tính năng chat', '2025-02-06 09:00:00.000000', NULL, 0, NULL, '2025-02-10 23:59:59', NULL, 0, 20, '2025-02-07 08:00:00', 'PENDING', 23, 4, 70),

-- Job 71: Thiết kế bộ nhận diện thương hiệu (2 milestones, COMPLETED, total percent = 100%)
('Thiết kế logo và màu sắc', '2025-02-12 10:00:00.000000', NULL, 0, NULL, '2025-02-20 23:59:59', '2025-02-12 11:00:00', 0, 60, '2025-02-13 08:00:00', 'DONE', 24, 5, 71),
('Hoàn thiện bộ nhận diện', '2025-02-21 09:00:00.000000', NULL, 0, NULL, '2025-02-25 23:59:59', '2025-02-21 10:00:00', 0, 40, '2025-02-22 08:00:00', 'DONE', 24, 5, 71),

-- Job 72: Tự động hóa kiểm thử giao diện với Cypress (3 milestones, COMPLETED, total percent = 100%)
('Viết test case giao diện', '2025-02-27 12:00:00.000000', NULL, 0, NULL, '2025-03-05 23:59:59', '2025-02-27 13:00:00', 0, 30, '2025-02-28 08:00:00', 'DONE', 25, 6, 72),
('Tích hợp vào CI/CD', '2025-03-06 09:00:00.000000', NULL, 0, NULL, '2025-03-15 23:59:59', '2025-03-06 10:00:00', 0, 40, '2025-03-07 08:00:00', 'DONE', 25, 6, 72),
('Kiểm thử và báo cáo', '2025-03-16 09:00:00.000000', NULL, 0, NULL, '2025-03-20 23:59:59', '2025-03-16 10:00:00', 0, 30, '2025-03-17 08:00:00', 'DONE', 25, 6, 72),

-- Job 73: Phát triển tính năng thanh toán cho app (4 milestones, COMPLETED, total percent = 100%)
('Tích hợp Stripe API', '2025-03-22 14:00:00.000000', NULL, 0, NULL, '2025-03-30 23:59:59', '2025-03-22 15:00:00', 0, 25, '2025-03-23 08:00:00', 'DONE', 14, 7, 73),
('Tích hợp VNPay', '2025-03-31 09:00:00.000000', NULL, 0, NULL, '2025-04-10 23:59:59', '2025-03-31 10:00:00', 0, 30, '2025-04-01 08:00:00', 'DONE', 14, 7, 73),
('Kiểm thử thanh toán', '2025-04-11 09:00:00.000000', NULL, 0, NULL, '2025-04-20 23:59:59', '2025-04-11 10:00:00', 0, 25, '2025-04-12 08:00:00', 'DONE', 14, 7, 73),
('Triển khai tính năng thanh toán', '2025-04-21 09:00:00.000000', '2025-04-25 10:00:00', 1, NULL, '2025-04-25 23:59:59', '2025-04-21 10:00:00', 0, 20, '2025-04-22 08:00:00', 'DISPUTE', 14, 7, 73),

-- Job 74: Tối ưu SEO cho website React (3 milestones, COMPLETED, total percent = 100%)
('Tối ưu SSR và meta tags', '2025-04-27 16:00:00.000000', NULL, 0, NULL, '2025-05-05 23:59:59', '2025-04-27 17:00:00', 0, 30, '2025-04-28 08:00:00', 'DONE', 15, 8, 74),
('Cải thiện tốc độ tải trang', '2025-05-06 09:00:00.000000', NULL, 0, NULL, '2025-05-15 23:59:59', '2025-05-06 10:00:00', 0, 40, '2025-05-07 08:00:00', 'DONE', 15, 8, 74),
('Tạo sitemap và báo cáo', '2025-05-16 09:00:00.000000', NULL, 0, NULL, '2025-05-20 23:59:59', '2025-05-16 10:00:00', 0, 30, '2025-05-17 08:00:00', 'DONE', 15, 8, 74),

-- Job 75: Phát triển mô hình AI dự đoán thời tiết (5 milestones, IN_PROGRESS)
('Chuẩn bị dataset thời tiết', '2025-05-22 10:00:00.000000', NULL, 0, NULL, '2025-05-30 23:59:59', '2025-05-22 11:00:00', 0, 20, '2025-05-23 08:00:00', 'DOING', 16, 9, 75),
('Xây dựng mô hình dự đoán', '2025-05-31 09:00:00.000000', NULL, 0, NULL, '2025-06-10 23:59:59', '2025-05-31 10:00:00', 0, 25, '2025-06-01 08:00:00', 'PENDING', 16, 9, 75),
('Tối ưu mô hình', '2025-06-11 09:00:00.000000', NULL, 0, NULL, '2025-06-20 23:59:59', NULL, 0, 25, '2025-06-12 08:00:00', 'PENDING', 16, 9, 75),
('Kiểm thử độ chính xác', '2025-06-21 09:00:00.000000', NULL, 0, NULL, '2025-06-30 23:59:59', NULL, 0, 20, '2025-06-22 08:00:00', 'PENDING', 16, 9, 75),
('Tích hợp vào hệ thống', '2025-07-01 09:00:00.000000', NULL, 0, NULL, '2025-07-05 23:59:59', NULL, 0, 10, '2025-07-02 08:00:00', 'PENDING', 16, 9, 75);

-- disputes
INSERT INTO `disputes` (`created_at`, `employer_sues`, `reason`, `resolution`, `resolved_at`, `status`, `milestone_id`, `solver_id`) VALUES
('2024-04-06 09:00:00.000000', 1, 'Mô hình AI tích hợp không đạt độ chính xác như yêu cầu trong hợp đồng', NULL, NULL, 'OPEN', 12, 26),
('2024-04-07 10:00:00.000000', 0, 'Employer yêu cầu bổ sung tính năng không có trong mô tả milestone', 'Yêu cầu bổ sung tính năng không hợp lệ, freelancer không chịu trách nhiệm', '2024-04-10 15:00:00', 'RESOLVED', 12, 27),
('2022-06-26 08:00:00.000000', 1, 'Fix memory leak không hoàn toàn khắc phục được sự cố, ứng dụng vẫn crash', NULL, NULL, 'PROCESSING', 30, 29),
('2022-06-27 09:00:00.000000', 0, 'Employer từ chối phê duyệt milestone dù đã hoàn thành đúng yêu cầu', 'Milestone được xem xét lại, employer phải phê duyệt theo hợp đồng', '2022-07-01 14:00:00', 'RESOLVED', 30, 30),
('2024-11-21 10:00:00.000000', 1, 'Tích hợp mô hình nhận diện khuôn mặt không hoạt động trên một số thiết bị', NULL, NULL, 'OPEN', 193, 1),
('2024-11-22 11:00:00.000000', 0, 'Employer yêu cầu thay đổi giao diện sau khi đã đồng ý với thiết kế ban đầu', 'Yêu cầu thay đổi không nằm trong phạm vi milestone, freelancer không chịu trách nhiệm', '2024-11-25 16:00:00', 'REJECTED', 193, 31),
('2025-04-26 09:00:00.000000', 1, 'Tính năng thanh toán VNPay không hoạt động ổn định trên Android', NULL, NULL, 'PROCESSING', 211, 26),
('2025-04-27 10:00:00.000000', 0, 'Employer chậm phản hồi kiểm thử, gây trì hoãn tiến độ milestone', NULL, NULL, 'CANCELLED', 211, 27),
('2024-04-08 14:00:00.000000', 1, 'Kết quả tích hợp mô hình AI không tương thích với hệ thống hiện tại', 'Freelancer phải điều chỉnh mô hình để tương thích, hoàn thành trong 7 ngày', '2024-04-15 12:00:00', 'RESOLVED', 12, 29),
('2022-06-28 15:00:00.000000', 0, 'Employer yêu cầu thêm kiểm thử trên thiết bị không được nêu trong hợp đồng', 'Yêu cầu bổ sung không hợp lý, freelancer hoàn thành đúng phạm vi công việc', '2022-07-05 10:00:00', 'REJECTED', 30, 30);

-- Products
INSERT INTO `products` (`id`, `content`, `created_at`, `description`, `status`, `milestone_id`) VALUES
(1, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-04 10:00:00.000000', 'Mô hình AI tích hợp vào hệ thống', 'REJECTED', 12),
(2, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-05 12:00:00.000000', 'Mô hình AI sửa lỗi tương thích', 'PENDING', 12),
(3, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-06-22 15:00:00.000000', 'Patch fix memory leak', 'REJECTED', 30),
(4, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-06-24 09:00:00.000000', 'Phiên bản tối ưu memory', 'PENDING', 30),
(5, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-11-17 14:00:00.000000', 'Mô hình nhận diện khuôn mặt', 'REJECTED', 193),
(6, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-11-19 10:00:00.000000', 'Mô hình sửa lỗi thiết bị', 'PENDING', 193),
(7, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2025-04-22 11:00:00.000000', 'Tính năng thanh toán VNPay', 'REJECTED', 211),
(8, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2025-04-24 09:00:00.000000', 'Tính năng thanh toán sửa lỗi', 'PENDING', 211),
(9, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-05 09:00:00.000000', 'Mô hình AI tích hợp', 'PENDING', 12),
(10, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-06-23 11:00:00.000000', 'Patch memory leak lần 2', 'REJECTED', 30),
(11, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-06-03 09:00:00.000000', 'Giao diện ứng dụng Figma', 'PENDING', 15),
(12, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-06-10 14:00:00.000000', 'Giao diện chỉnh sửa theo feedback', 'REJECTED', 15),
(13, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-03 10:00:00.000000', 'Báo cáo phân tích codebase', 'PENDING', 64),
(14, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-08 11:00:00.000000', 'Báo cáo codebase sửa đổi', 'REJECTED', 64),
(15, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-03-30 09:00:00.000000', 'Phân tích pipeline CI/CD', 'PENDING', 74),
(16, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-03 12:00:00.000000', 'Phân tích pipeline chỉnh sửa', 'REJECTED', 74),
(17, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-07 10:00:00.000000', 'Dataset chuẩn bị', 'PENDING', 106),
(18, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-12 15:00:00.000000', 'Dataset sửa lỗi', 'REJECTED', 106),
(19, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-22 09:00:00.000000', 'Giao diện lazy loading', 'PENDING', 152),
(20, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-28 11:00:00.000000', 'Lazy loading chỉnh sửa', 'REJECTED', 152),
(21, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-24 10:00:00.000000', 'Giao diện kho hàng', 'PENDING', 168),
(22, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-30 09:00:00.000000', 'Giao diện kho chỉnh sửa', 'REJECTED', 168),
(23, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-07-14 12:00:00.000000', 'Giao diện livestream', 'PENDING', 180),
(24, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-07-18 10:00:00.000000', 'Giao diện livestream sửa đổi', 'REJECTED', 180),
(25, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2025-01-03 11:00:00.000000', 'Giao diện chat real-time', 'PENDING', 199),
(26, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2025-01-08 14:00:00.000000', 'Giao diện chat chỉnh sửa', 'REJECTED', 199),
(27, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2025-05-24 09:00:00.000000', 'Dataset thời tiết', 'PENDING', 215),
(28, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2025-05-28 10:00:00.000000', 'Dataset thời tiết sửa lỗi', 'REJECTED', 215),
(29, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-01-17 10:00:00.000000', 'Giao diện website hoàn chỉnh', 'ACCEPT', 1),
(30, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-01-30 09:00:00.000000', 'Backend API thanh toán', 'ACCEPT', 2),
(31, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-02-10 12:00:00.000000', 'Báo cáo tối ưu hiệu năng', 'ACCEPT', 3),
(32, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-02-15 11:00:00.000000', 'Website triển khai server', 'ACCEPT', 4),
(33, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-02-22 09:00:00.000000', 'Wireframe ứng dụng', 'ACCEPT', 5),
(34, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-03-05 10:00:00.000000', 'Giao diện Figma', 'ACCEPT', 6),
(35, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-03-20 09:00:00.000000', 'Giao diện chỉnh sửa cuối', 'ACCEPT', 7),
(36, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-03-10 11:00:00.000000', 'Dataset đã xử lý', 'ACCEPT', 8),
(37, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-03-20 09:00:00.000000', 'Mô hình AI ban đầu', 'ACCEPT', 9),
(38, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-03-30 10:00:00.000000', 'Mô hình AI tối ưu', 'ACCEPT', 10),
(39, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-05 09:00:00.000000', 'Báo cáo kiểm thử AI', 'ACCEPT', 11),
(40, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-08-15 12:00:00.000000', 'Tài liệu endpoint', 'ACCEPT', 13),
(41, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-09-01 10:00:00.000000', 'Code mẫu endpoint', 'ACCEPT', 14),
(42, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-02-20 09:00:00.000000', 'Kiến trúc backend', 'ACCEPT', 18),
(43, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-03-05 11:00:00.000000', 'API bảo mật', 'ACCEPT', 19),
(44, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-03-20 09:00:00.000000', 'Báo cáo kiểm thử tải', 'ACCEPT', 20),
(45, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-03-27 10:00:00.000000', 'Server triển khai', 'ACCEPT', 21),
(46, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-03-25 09:00:00.000000', 'Wireframe giao diện', 'ACCEPT', 22),
(47, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-04-10 12:00:00.000000', 'Giao diện responsive', 'ACCEPT', 23),
(48, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-04-20 09:00:00.000000', 'Giao diện chỉnh sửa', 'ACCEPT', 24),
(49, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-05-01 10:00:00.000000', 'Cấu hình Jenkins', 'ACCEPT', 25),
(50, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-05-15 09:00:00.000000', 'Tích hợp GitHub AWS', 'ACCEPT', 26),
(51, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-05-25 11:00:00.000000', 'Pipeline triển khai', 'ACCEPT', 27),
(52, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-06-05 09:00', 'Báo cáo hiệu năng', 'ACCEPT', 28),
(53, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-06-15 10:00:00.000000', 'Tối ưu thời gian load', 'ACCEPT', 29),
(54, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-07-01 09:00:00', 'Bản cập nhật', 'ACCEPT', 31),
(55, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-06-15 12:00:00.000000', 'Script thu thập dữ liệu', 'ACCEPT', 32),
(56, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-07-01 10:00:00', 'Dữ liệu CSV/JSON', 'ACCEPT', 33),
(57, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-07-20 09:00:00.000000', 'Giao diện admin', 'ACCEPT', 34),
(58, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-08-01 11:00:00.000000', 'Tính năng quản lý task', 'ACCEPT', 35),
(59, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-08-10 09:00:00', 'Tính năng quản lý team', 'ACCEPT', 36),
(60, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-08-17 10:00:00.000000', 'Ứng dụng triển khai', 'ACCEPT', 37),
(61, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-08-25 09:00:00.000000', 'Dữ liệu lịch sử', 'ACCEPT', 38),
(62, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-09-05 12:00:00.000000', 'Mô hình LSTM', 'ACCEPT', 39),
(63, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-09-13 09:00:00.000000', 'Mô hình tối ưu', 'ACCEPT', 40),
(64, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-09-18 10:00:00.000000', 'Báo cáo đánh giá mô hình', 'ACCEPT', 41),
(65, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2022-09-22 09:00:00.000000', 'Báo cáo giải thích', 'ACCEPT', 42),
(66, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-05-15 11:00:00.000000', 'REST API thiết kế', 'ACCEPT', 43),
(67, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-05-30 09:00:00.000000', 'Tích hợp MySQL và Redis', 'ACCEPT', 44),
(68, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-06-10 10:00:00.000000', 'API triển khai', 'ACCEPT', 45),
(69, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-06-15 09:00:00.000000', 'Concept logo', 'ACCEPT', 46),
(70, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-07-01 12:00:00.000000', 'Bộ nhận diện thương hiệu', 'ACCEPT', 47),
(71, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-07-20 09:00:00.000000', 'Script Terraform', 'ACCEPT', 48),
(72, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-08-05 10:00:00.000000', 'Helm chart', 'ACCEPT', 49),
(73, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-08-15 09:00:00.000000', 'Hệ thống triển khai', 'ACCEPT', 50),
(74, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-08-25 11:00:00.000000', 'Báo cáo lỗi iOS', 'ACCEPT', 51),
(75, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-09-10 09:00:00.000000', 'Fix lỗi iOS', 'ACCEPT', 52),
(76, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-09-20 10:00:00.000000', 'Kiểm thử iOS mới', 'ACCEPT', 53),
(77, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-10-01 09:00:00.000000', 'Unit test pytest', 'ACCEPT', 54),
(78, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-10-15 12:00:00.000000', 'Báo cáo integration test', 'ACCEPT', 55),
(79, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-11-05 09:00:00.000000', 'Tối ưu SSR', 'ACCEPT', 56),
(80, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-11-20 10:00:00.000000', 'Sitemap SEO', 'ACCEPT', 57),
(81, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-12-01 09:00:00.000000', 'Báo cáo SEO', 'ACCEPT', 58),
(82, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-11-10 11:00:00.000000', 'Dataset tiếng Việt', 'ACCEPT', 59),
(83, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-11-20 09:00:00.000000', 'Mô hình NLP BERT', 'ACCEPT', 60),
(84, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-12-01 10:00:00.000000', 'Mô hình fine-tune', 'ACCEPT', 61),
(85, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-12-10 09:00:00.000000', 'Báo cáo kiểm thử NLP', 'ACCEPT', 62),
(86, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-12-20 12:00:00.000000', 'Mô hình tích hợp', 'ACCEPT', 63),
(87, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-12-15 09:00:00.000000', 'Báo cáo lỗi Android', 'ACCEPT', 67),
(88, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-12-30 10:00:00.000000', 'Fix lỗi Android', 'ACCEPT', 68),
(89, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-01-20 09:00:00.000000', 'Script xử lý Excel', 'ACCEPT', 69),
(90, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-02-01 11:00:00.000000', 'Báo cáo tối ưu Excel', 'ACCEPT', 70),
(91, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-02-25 09:00:00.000000', 'Giao diện dashboard', 'ACCEPT', 71),
(92, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-03-15 10:00:00.000000', 'API TypeScript', 'ACCEPT', 72),
(93, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2024-04-01 09:00:00.000000', 'Báo cáo kiểm thử', 'ACCEPT', 73),
(94, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-04-20 12:00:00.000000', 'Báo cáo hiệu năng', 'ACCEPT', 78),
(95, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-05-05 09:00:00.000000', 'Truy vấn tối ưu', 'ACCEPT', 79),
(96, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-05-15 10:00:00.000000', 'Hệ thống triển khai', 'ACCEPT', 80),
(97, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-05-22 09:00:00.000000', 'Concept banner', 'ACCEPT', 81),
(98, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-06-01 11:00:00.000000', 'Banner hoàn thiện', 'ACCEPT', 82),
(99, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-07-01 09:00:00.000000', 'Script Selenium', 'ACCEPT', 83),
(100, 'https://docs.google.com/document/d/1F1_2lV7yT_k2a4kF5S_QjRZz1o48C5hvfS54yoli9u0/edit?usp=sharing', '2023-07-15 10:00:00.000000', 'Test case tích hợp', 'ACCEPT', 84);

-- Languages_Jobs
INSERT INTO `languages_jobs` (`language_id`, `job_id`) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10), (11, 11), (12, 12), (13, 13), (14, 14), (15, 15),
(16, 16), (1, 17), (2, 17), (3, 18), (4, 18), (5, 19), (6, 19), (7, 20), (8, 20), (9, 21), (10, 21), (11, 22), (12, 22), (13, 23),
(14, 23), (15, 24), (16, 24), (17, 25), (18, 25), (19, 26), (20, 26), (1, 27), (3, 27), (2, 28), (4, 28), (5, 29), (6, 29), (7, 30),
(8, 30), (9, 31), (10, 31), (11, 32), (12, 32), (1, 33), (2, 33), (3, 33), (4, 34), (5, 34), (6, 34), (7, 35), (8, 35), (9, 35), (10, 36),
(11, 36), (12, 36), (13, 37), (14, 37), (15, 37), (16, 38), (17, 38), (18, 38), (19, 39), (20, 39), (1, 39), (2, 40), (3, 40), (4, 40),
(5, 41), (6, 41), (7, 41), (8, 42), (9, 42), (10, 42), (11, 43), (12, 43), (13, 43), (14, 44), (15, 44), (16, 44), (17, 45), (18, 45),
(19, 45), (20, 46), (1, 46), (2, 46), (3, 47), (4, 47), (5, 47), (6, 48), (7, 48), (8, 48), (1, 49), (2, 49), (3, 49), (4, 49), (5, 50),
(6, 50), (7, 50), (8, 50), (9, 51), (10, 51), (11, 51), (12, 51), (13, 52), (14, 52), (15, 52), (16, 52), (17, 53), (18, 53), (19, 53),
(20, 53), (1, 54), (2, 54), (3, 54), (4, 54), (5, 55), (6, 55), (7, 55), (8, 55), (9, 56), (10, 56), (11, 56), (12, 56), (13, 57), (14, 57),
(15, 57), (16, 57), (17, 58), (18, 58), (19, 58), (20, 58), (1, 59), (2, 59), (3, 59), (4, 59), (5, 60), (6, 60), (7, 60), (8, 60), (9, 61),
(10, 61), (11, 61), (12, 61), (13, 62), (14, 62), (15, 62), (16, 62), (17, 63), (18, 63), (19, 63), (20, 63), (1, 64), (2, 64), (3, 64), 
(4, 64), (1, 65), (2, 65), (3, 65), (4, 65), (5, 65), (6, 66), (7, 66), (8, 66), (9, 66), (10, 66), (11, 67), (12, 67), (13, 67), (14, 67),
(15, 67), (16, 68), (17, 68), (18, 68), (19, 68), (20, 68), (1, 69), (2, 69), (3, 69), (4, 69), (5, 69), (6, 70), (7, 70), (8, 70), (9, 70),
(10, 70), (11, 71), (12, 71), (13, 71), (14, 71), (15, 71), (16, 72), (17, 72), (18, 72), (19, 72), (20, 72), (1, 73), (2, 73), (3, 73), (4, 73), (5, 73), (6, 74), (7, 74), (8, 74), (9, 74), (10, 74), (11, 75), (12, 75), (13, 75), (14, 75), (15, 75), (16, 76), (17, 76), (18, 76), (19, 76),
(20, 76), (1, 77), (2, 77), (3, 77), (4, 77), (5, 77), (6, 78), (7, 78), (8, 78), (9, 78), (10, 78), (11, 79), (12, 79), (13, 79), (14, 79),
(15, 79), (16, 80), (17, 80), (18, 80), (19, 80), (20, 80);

-- Languages_Users
INSERT INTO `languages_users` (`language_id`, `user_id`) VALUES
(1, 2), (2, 3), (3, 4), (4, 4), (5, 5), (6, 5), (1, 6), (8, 6), (9, 6), (10, 7), (11, 7), (12, 7), (13, 8), (14, 8), (15, 8), (16, 8), (17, 9),
(18, 9), (19, 9), (20, 9), (1, 10), (2, 10), (3, 10), (4, 10), (5, 10), (6, 11), (7, 11), (8, 11), (9, 11), (10, 11), (11, 12), (12, 12),
(13, 12), (14, 12), (15, 12), (16, 13), (17, 13), (18, 13), (19, 13), (20, 13), (1, 4), (2, 4), (3, 5), (4, 5), (7, 6), (6, 6), (9, 7), (8, 7),
(9, 8), (10, 8), (11, 9), (12, 9), (13, 10), (14, 10), (13, 11), (16, 11), (17, 12), (18, 12), (19, 2), (20, 2), (4, 3), (3, 3), (4, 6), (5, 6),
(6, 7), (7, 7), (8, 8), (11, 8), (10, 9), (13, 9),(12, 10), (9, 10), (14, 11), (15, 11), (16, 12), (10, 12), (18, 2), (7, 2), (20, 3), (1, 3),
(2, 5), (7, 5), (4, 7), (5, 7);

-- skills_jobs
INSERT INTO `skills_jobs` (`skill_id`, `job_id`) VALUES
(1, 1), (2, 1), (17, 1), (3, 2), (4, 2), (7, 3), (8, 3), (16, 3), (9, 4), (5, 5), (6, 5), (2, 6), (13, 6), (14, 6), (12, 6), (3, 7), (20, 7),
(13, 8), (14, 8), (2, 8), (1, 9), (5, 9), (6, 9), (16, 10), (1, 11), (17, 11), (3, 11), (4, 11), (7, 12), (8, 12), (15, 12), (16, 12), (12, 12),
(2, 13), (14, 13), (9, 13), (19, 14), (20, 14), (13, 15), (14, 15), (12, 15), (2, 15), (1, 16), (5, 16), (6, 16), (12, 17), (11, 17),
(17, 18), (1, 18), (3, 18), (4, 18), (7, 19), (8, 19), (16, 19), (15, 19), (12, 19), (2, 20), (9, 20), (14, 20), (4, 21), (3, 21), (17, 21),
(14, 22), (13, 22), (2, 22), (12, 22), (5, 23), (6, 23), (16, 24), (1, 25), (2, 25), (3, 25), (15, 26), (16, 26), (8, 26), (7, 26), (12, 26),
(2, 27), (14, 27), (9, 27), (12, 27), (19, 28), (12, 29), (11, 29), (14, 29), (3, 30), (4, 30), (20, 30), (2, 31), (14, 31), (13, 31), (12, 31),
(9, 31), (3, 32), (20, 32), (14, 33), (13, 33), (12, 33), (1, 34), (5, 34), (6, 34), (9, 35), (1, 36), (17, 36), (3, 36), (4, 36),
(7, 37), (8, 37), (16, 37), (15, 37), (12, 37), (2, 38), (13, 38), (14, 38), (12, 38), (3, 39), (4, 39), (13, 40), (2, 40), (14, 40),
(1, 41), (5, 41), (6, 41), (12, 41), (12, 42), (11, 42), (3, 43), (4, 43), (20, 43), (7, 44), (8, 44), (16, 44), (15, 44), (12, 44),
(2, 45), (9, 45), (14, 45), (19, 46), (20, 46), (13, 47), (14, 47), (6, 47), (5, 48), (6, 48), (3, 48), (2, 49), (13, 49), (14, 49), (12, 49),
(3, 50), (4, 50), (14, 51), (13, 51), (12, 51), (2, 51), (1, 52), (5, 52), (6, 52), (9, 53), (1, 54), (17, 54), (3, 54), (4, 54),
(7, 55), (8, 55), (16, 55), (15, 55), (12, 55), (2, 56), (13, 56), (14, 56), (12, 56), (3, 57), (4, 57), (14, 58), (13, 58), (2, 58), (12, 58),
(5, 59), (6, 59), (3, 59), (16, 60), (15, 60), (1, 61), (3, 61), (17, 61), (15, 62), (16, 62), (8, 62), (7, 62), (12, 62), (2, 63), (14, 63),
(9, 63), (12, 63), (19, 64), (12, 65), (11, 65), (14, 65), (3, 66), (4, 66), (20, 66), (2, 67), (14, 67), (13, 67), (12, 67), (9, 67), (3, 68),
(20, 68), (14, 69), (13, 69), (12, 69), (1, 70), (5, 70), (6, 70), (9, 71), (1, 72), (17, 72), (3, 72), (4, 72), (7, 73), (8, 73), (16, 73),
(15, 73), (12, 73), (2, 74), (13, 74), (14, 74), (12, 74), (3, 75), (4, 75), (13, 76), (2, 76), (14, 76), (1, 77), (5, 77), (6, 77), (12, 77),
(12, 78), (11, 78), (3, 79), (4, 79), (20, 79), (7, 80), (8, 80), (16, 80), (15, 80), (12, 80);