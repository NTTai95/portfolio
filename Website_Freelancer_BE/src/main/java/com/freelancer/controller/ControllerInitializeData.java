package com.freelancer.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.service.ServiceInitializeData;
import com.freelancer.utils.DataInitializer;
import com.freelancer.mogodb.document.PushNotificationTemplate;
import com.freelancer.mogodb.repository.RepositoryPushNotification;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerInitializeData {
    private final ServiceInitializeData ServiceInitializeData;
    private final DataInitializer dataInitializer;
    private final RepositoryPushNotification repositoryPushNotification;

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping("/run-sql")
    public String runSql() {
        ServiceInitializeData.runSqlFile("data.sql");
        return "Đã chạy lệnh SQL.";
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping("/clear-all-tables")
    public String clearAllTables() {
        ServiceInitializeData.clearAllTables("website_freelancer");
        dataInitializer.createData();
        return "Đã xóa tất cả bảng trong cơ sở dữ liệu.";
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping("/init-mongodb")
    public String initMongodb() {
        // Xóa dữ liệu cũ (nếu có)
        repositoryPushNotification.deleteAll();
        
        // Tạo notification templates mẫu
        PushNotificationTemplate[] templates = {
            createTemplate("Ứng viên mới", "Bạn có một ứng viên mới apply vào job: {jobTitle}", "new_application"),
            createTemplate("Job được duyệt", "Job {jobTitle} của bạn đã được admin duyệt và đăng công khai", "job_approved"),
            createTemplate("Milestone hoàn thành", "Milestone {milestoneName} đã được freelancer hoàn thành và gửi sản phẩm", "milestone_completed"),
            createTemplate("Thanh toán thành công", "Bạn đã nhận được thanh toán {amount} VNĐ cho milestone {milestoneName}", "payment_received"),
            createTemplate("Job đã đóng", "Job {jobTitle} đã đóng do hết hạn apply", "job_closed"),
            createTemplate("Tài khoản được kích hoạt", "Chúc mừng! Tài khoản của bạn đã được kích hoạt", "account_activated"),
            createTemplate("Tranh chấp mới", "Có tranh chấp mới cho milestone {milestoneName} trong job {jobTitle}", "dispute_created"),
            createTemplate("Đánh giá mới", "Bạn nhận được đánh giá {rating} sao từ {reviewerName}", "new_review"),
            createTemplate("Job sắp hết hạn", "Job {jobTitle} sẽ đóng apply trong 24h tới", "job_deadline_reminder"),
            createTemplate("Chào mừng thành viên mới", "Chào mừng {userName} đến với Website Freelancer! Chúc bạn tìm được công việc ưng ý", "welcome")
        };
        
        // Lưu tất cả templates
        for (PushNotificationTemplate template : templates) {
            repositoryPushNotification.save(template);
        }
        
        return "Đã khởi tạo " + templates.length + " notification templates trong MongoDB.";
    }
    
    private PushNotificationTemplate createTemplate(String title, String message, String type) {
        PushNotificationTemplate template = new PushNotificationTemplate();
        template.setTitle(title);
        template.setMessage(message);
        template.setType(type);
        return template;
    }
}
