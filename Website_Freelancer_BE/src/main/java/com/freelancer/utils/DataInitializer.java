package com.freelancer.utils;

import java.time.LocalDate;
import java.util.List;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.freelancer.mysql.model.Permission;
import com.freelancer.mysql.model.Role;
import com.freelancer.mysql.model.Staff;
import com.freelancer.mysql.repository.RepositoryPermission;
import com.freelancer.mysql.repository.RepositoryRole;
import com.freelancer.mysql.repository.RepositoryStaff;

@Component
public class DataInitializer implements ApplicationRunner {

    private final RepositoryRole repositoryRole;
    private final RepositoryStaff repositoryStaff;
    private final RepositoryPermission repositoryPermission;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RepositoryRole roleRepository, RepositoryStaff repositoryStaff,
            RepositoryPermission repositoryPermission, PasswordEncoder passwordEncoder) {
        this.repositoryRole = roleRepository;
        this.repositoryStaff = repositoryStaff;
        this.repositoryPermission = repositoryPermission;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        createData();
    }

    public void createData() {
        createRoleIfNotExists(1, "Quản trị", "admin có quyền cao nhất trong hệ thống");
        createRoleIfNotExists(2, "Freelancer", "người dùng là freelancer");
        createRoleIfNotExists(3, "Nhà tuyển dụng", "người dùng là employer");
        createStaffIfNotExists("admin@gmail.com", "admin123");

        createPermissionIfNotExists("Xem kỹ năng", "skill.read", "Cho phép xem thông tin kỹ năng");
        createPermissionIfNotExists("Thêm kỹ năng", "skill.create", "Cho phép thêm kỹ năng mới");
        createPermissionIfNotExists("Sửa kỹ năng", "skill.update", "Cho phép sửa kỹ năng");
        createPermissionIfNotExists("Xóa kỹ năng", "skill.delete", "Cho phép xóa kỹ năng");

        createPermissionIfNotExists("Xem ngôn ngữ", "language.read",
                "Cho phép xem thông tin ngôn ngữ");
        createPermissionIfNotExists("Thêm ngôn ngữ", "language.create",
                "Cho phép thêm ngôn ngữ mới");
        createPermissionIfNotExists("Sửa ngôn ngữ", "language.update", "Cho phép sửa ngôn ngữ");
        createPermissionIfNotExists("Xóa ngôn ngữ", "language.delete", "Cho phép xóa ngôn ngữ");

        createPermissionIfNotExists("Xem chuyên ngành", "major.read",
                "Cho phép xem thông tin chuyên ngành");
        createPermissionIfNotExists("Thêm chuyên ngành", "major.create",
                "Cho phép thêm chuyên ngành mới");
        createPermissionIfNotExists("Sửa chuyên ngành", "major.update",
                "Cho phép sửa chuyên ngành");
        createPermissionIfNotExists("Xóa chuyên ngành", "major.delete",
                "Cho phép xóa chuyên ngành");
        createPermissionIfNotExists("Xem người dùng", "user.read",
                "Cho phép xem thông tin người dùng");
        createPermissionIfNotExists("Vô hiệu hóa người dùng", "user.disable",
                "Cho phép vô hiệu hóa người dùng");
        createPermissionIfNotExists("Kích hoạt người dùng", "user.active",
                "Cho phép kích hoạt người dùng");
        createPermissionIfNotExists("Xem báo cáo", "report.read", "Cho phép xem báo cáo");
        createPermissionIfNotExists("Xử lý báo cáo", "report.handle", "Cho phép xử lý báo cáo");
        createPermissionIfNotExists("Xem phản hồi", "contact.read", "Cho phép xem phản hồi");
        createPermissionIfNotExists("Xử lý phản hồi", "contact.handle", "Cho phép xử lý phản hồi");
    }

    private void createRoleIfNotExists(Integer id, String name, String description) {
        if (!repositoryRole.existsByName(name)) {
            Role role = new Role();
            role.setName(name);
            role.setCode(Formater.nameToCode(name));
            role.setDescription(description);
            repositoryRole.save(role);
        }
    }

    private void createStaffIfNotExists(String email, String password) {
        List<Staff> staffs = repositoryStaff.findByRole_Name("QUAN_TRI");
        if (staffs.size() > 1) {
            for (Staff staff : staffs) {
                repositoryStaff.delete(staff);
            }
        }

        if (repositoryStaff.count() == 0) {
            Staff staff = new Staff();
            staff.setEmail(email);
            staff.setPassword(passwordEncoder.encode(password));
            staff.setRole(repositoryRole.findByCode("QUAN_TRI").get());
            staff.setFullName("Admin");
            staff.setPhone("0987654321");
            staff.setBirthday(LocalDate.of(2000, 1, 1));
            repositoryStaff.save(staff);
            System.out.println(">> Created Admin -> (Email: admin@gmail.com, Password: admin123)");
        }
    }

    private void createPermissionIfNotExists(String name, String code, String description) {
        if (!repositoryPermission.existsByName(name)) {
            Permission permission = new Permission();
            permission.setName(name);
            permission.setCode(code);
            permission.setDescription(description);
            repositoryPermission.save(permission);
        }
    }
}
