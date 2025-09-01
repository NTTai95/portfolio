package com.freelancer.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mogodb.repository.RepositorySystemConfig;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Milestone;
import com.freelancer.mysql.model.Product;
import com.freelancer.mysql.model.User;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.mysql.repository.RepositoryMilestone;
import com.freelancer.mysql.repository.RepositoryProduct;
import com.freelancer.service.ServiceChat;
import com.freelancer.service.ServiceNotification;
import com.freelancer.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
public class ControllerProduct {
    private final RepositoryMilestone repositoryMilestone;
    private final RepositoryProduct repositoryProduct;
    private final SecurityUtil securityUtil;
    private final ServiceNotification serviceNotification;
    private final ServiceChat serviceChat;
    private final RepositoryFreelancer repositoryFreelancer;
    private final RepositorySystemConfig repositorySystemConfig;
    private final RepositoryJob repositoryJob;

    @PostMapping("jobs/{id}/milestone/{milestoneId}/submit-product")
    public ResponseEntity<?> createProduct(@PathVariable Integer id,
            @PathVariable Integer milestoneId, @RequestBody Map<String, Object> req) {
        User user = securityUtil.getCurrentUser();

        Milestone milestone = repositoryMilestone.findById(milestoneId)
                .orElseThrow(() -> new DataConflictException("Milestone không tồn tại"));

        if (!milestone.getJob().getId().equals(id)) {
            throw new DataConflictException("Milestone không thuộc job này");
        }

        Integer freelancerId = milestone.getFreelancer().getId();
        if (!freelancerId.equals(user.getId())) {
            throw new DataConflictException("Bạn không thể nộp sản phẩm");
        }

        Product product = new Product();
        product.setContent((String) req.get("fileUrl"));
        product.setDescription((String) req.get("description"));
        product.setMilestone(milestone);

        repositoryProduct.save(product);

        return ResponseEntity.ok("Tải sản phẩm thành công");
    }

    @GetMapping("/milestones/{id}/products")
    public ResponseEntity<?> getProducts(@PathVariable Integer id) {
        User user = securityUtil.getCurrentUser();
        Milestone milestone = repositoryMilestone.findById(id)
                .orElseThrow(() -> new DataConflictException("Milestone không tồn tại"));
        if (!milestone.getFreelancer().getId().equals(user.getId())
                && !milestone.getEmployer().getId().equals(user.getId())) {
            throw new DataConflictException("Bạn không thể xem sản phẩm của milestone này");
        }

        Map<String, Object> res = new HashMap<>();
        res.put("freelancerId", milestone.getFreelancer().getId());
        res.put("milestoneEndAt", milestone.getEndAt());

        List<Map<String, Object>> products = new ArrayList<>();
        milestone.getProducts().stream().forEach(p -> {
            Map<String, Object> product = new HashMap<>();
            product.put("id", p.getId());
            product.put("content", p.getContent());
            product.put("description", p.getDescription());
            product.put("createdAt", p.getCreatedAt());
            product.put("status", p.getStatus());
            products.add(product);
        });

        res.put("products", products);

        return ResponseEntity.ok(res);
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PutMapping("/milestones/{id}/product-reject")
    public ResponseEntity<?> putRejectProduct(@PathVariable Integer id,
            @RequestBody(required = false) Map<String, Object> req) {
        User user = securityUtil.getCurrentUser();
        Milestone milestone = repositoryMilestone.findById(id)
                .orElseThrow(() -> new DataConflictException("Milestone không tồn tại"));
        if (!milestone.getEmployer().getId().equals(user.getId())) {
            throw new DataConflictException("Bạn không thể từ chối sản phẩm");
        }

        milestone.getProducts().stream().forEach(p -> {
            p.setStatus(Product.Status.REJECTED);
            repositoryProduct.save(p);
        });

        serviceNotification.sendNoticationWithUserId(milestone.getFreelancer().getId(),
                "Từ chối sản phẩm",
                milestone.getEmployer().getFullName() + " đã từ chối sản phẩm của bạn.");

        String reason = (String) req.get("reason");
        if (reason != null) {
            serviceChat.sendMessage(user.getId(), milestone.getFreelancer().getId(), reason);
        }

        return ResponseEntity.ok("Từ chối sản phẩm thành công");
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PutMapping("/milestones/{id}/product-accept")
    public ResponseEntity<?> putAcceptProduct(@PathVariable Integer id,
            @RequestBody boolean isOverdue) {
        User user = securityUtil.getCurrentUser();
        Milestone milestone = repositoryMilestone.findById(id)
                .orElseThrow(() -> new DataConflictException("Milestone không tồn tại"));

        if (!milestone.getEmployer().getId().equals(user.getId())) {
            throw new DataConflictException("Bạn không thể chấp nhận sản phẩm");
        }

        // Kiểm tra và cập nhật trạng thái trễ hạn
        milestone.setIsOverdue(isOverdue);
        milestone.setStatus(Milestone.Status.DONE);
        milestone = repositoryMilestone.save(milestone);

        milestone.getProducts().stream().filter(p -> p.getStatus().equals(Product.Status.PENDING))
                .peek(p -> p.setStatus(Product.Status.ACCEPT)).forEach(repositoryProduct::save);

        // Thêm thông báo về trễ hạn nếu có
        String message = " đã chấp nhận sản phẩm của bạn.";
        if (isOverdue) {
            message += " (Đã đánh dấu là trễ hạn)";
        }

        serviceNotification.sendNoticationWithUserId(milestone.getFreelancer().getId(),
                "Chấp nhận sản phẩm", milestone.getEmployer().getFullName() + message);

        Freelancer freelancer = milestone.getFreelancer();

        float serviceFee = repositorySystemConfig.findById("system_config")
                .orElseThrow(() -> new DataConflictException("System config not found"))
                .getServiceFee();

        freelancer.setBalance(Math
                .round(freelancer.getBalance() + (milestone.getBidAmount() * (serviceFee / 100))));
        repositoryFreelancer.save(freelancer);

        milestone.getProducts().stream().filter(p -> p.getStatus() == Product.Status.PENDING)
                .peek(p -> p.setStatus(Product.Status.ACCEPT)).forEach(repositoryProduct::save);

        // nếu tất cả milestone của job đều DONE → cập nhật job
        Job job = milestone.getJob();
        boolean allMilestonesDone =
                job.getMilestones().stream().allMatch(m -> m.getStatus() == Milestone.Status.DONE);

        if (allMilestonesDone) {
            job.setStatus(Job.Status.COMPLETED);
            repositoryJob.save(job);
        }

        return ResponseEntity.ok("Chấp nhận sản phẩm thành công");
    }

}
