package com.freelancer.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Milestone;
import com.freelancer.mysql.repository.RepositoryApply;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.mysql.repository.RepositoryMilestone;
import com.freelancer.service.ServiceNotification;
import com.freelancer.utils.EndPoint;
import com.freelancer.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerSelectFreelancer {
    private final RepositoryApply repositoryApply;
    private final RepositoryJob repositoryJob;
    private final SecurityUtil securityUtil;
    private final ServiceNotification serviceNotification;
    private final RepositoryMilestone repositoryMilestone;

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PatchMapping(EndPoint.Job.SELECT_FREELANCER)
    @Transactional
    public ResponseEntity<?> selectFreelancer(@PathVariable Integer id,
            @PathVariable Integer applyId) {
        Integer currentEmployerId = securityUtil.getCurrentUser().getId();

        // Tìm Apply và validate
        Apply selectedApply = repositoryApply.findById(applyId).orElseThrow(
                () -> new DataConflictException("Không tìm thấy đơn ứng tuyển với ID: " + applyId));

        Job job = selectedApply.getJob();

        // Kiểm tra job ID trong URL khớp với job của apply
        if (!job.getId().equals(id)) {
            throw new DataConflictException("ID công việc không khớp với đơn ứng tuyển!");
        }

        // Validate job có thể chọn freelancer không
        validateJobForFreelancerSelection(job, currentEmployerId);

        // Kiểm tra apply đang ở trạng thái PENDING
        if (selectedApply.getStatus() != Apply.Status.PENDING) {
            throw new DataConflictException("Đơn ứng tuyển này đã được xử lý!");
        }

        String link = "http://localhost:3000/profile/job-listings?status=IN_PROGRESS&select="
                + job.getId();

        // Accept apply được chọn
        selectedApply.setStatus(Apply.Status.ACCEPT);
        repositoryApply.save(selectedApply);
        serviceNotification.sendNoticationWithUserId(selectedApply.getFreelancer().getId(),
                "Ứng tuyển thành công", "Bạn đã được chọn cho công việc '" + job.getTitle() + "'",
                link);

        Milestone milestone = new Milestone();
        milestone.setContent("Hoàn thành các công việc được giao!");
        milestone.setEmployer(job.getEmployer());
        milestone.setJob(job);
        milestone.setPercent(Byte.valueOf("100"));
        milestone.setBidAmount(selectedApply.getBidAmount());
        milestone.setStartAt(job.getClosedAt());
        milestone.setEndAt(job.getClosedAt().plusHours(job.getDurationHours()));
        milestone.setFreelancer(selectedApply.getFreelancer());
        milestone.setStatus(Milestone.Status.DRAFT);

        repositoryMilestone.save(milestone);

        // Tự động reject tất cả apply khác của job này
        int rejectedCount = autoRejectOtherApplies(job, applyId);

        // Chuyển job sang trạng thái IN_PROGRESS
        job.setStatus(Job.Status.PREPARING);
        repositoryJob.save(job);

        // Trả về thông tin chi tiết về việc chọn freelancer
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Đã chọn freelancer thành công!");
        response.put("selectedFreelancer", Map.of("id", selectedApply.getFreelancer().getId(),
                "fullName", selectedApply.getFreelancer().getFullName(), "email",
                selectedApply.getFreelancer().getEmail(), "bidAmount", selectedApply.getBidAmount(),
                "estimatedHours", selectedApply.getEstimatedHours()));
        response.put("jobStatus", job.getStatus());
        response.put("autoRejectedCount", rejectedCount);
        response.put("timestamp", LocalDateTime.now());

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @GetMapping(EndPoint.Job.APPLIES)
    @Transactional
    public ResponseEntity<?> getJobApplies(@PathVariable Integer id) {
        Integer currentEmployerId = securityUtil.getCurrentUser().getId();

        // Tìm Job và validate
        Job job = repositoryJob.findById(id).orElseThrow(
                () -> new DataConflictException("Không tìm thấy công việc với ID: " + id));

        // Kiểm tra job thuộc về employer hiện tại
        if (!job.getEmployer().getId().equals(currentEmployerId)) {
            throw new DataConflictException("Bạn không có quyền xem ứng tuyển của công việc này!");
        }

        // 🔥 AUTO REJECT: Tự động reject các apply PENDING nếu job đã có freelancer được chấp nhận
        int autoRejectedCount = performAutoRejectOnPageLoad(job);

        // Lấy danh sách apply và map thông tin cần thiết (sau khi đã auto reject)
        List<Map<String, Object>> appliesData = job.getApplies().stream().map(apply -> {
            Map<String, Object> applyData = new HashMap<>();
            applyData.put("id", apply.getId());
            applyData.put("content", apply.getContent());
            applyData.put("bidAmount", apply.getBidAmount());
            applyData.put("estimatedHours", apply.getEstimatedHours());
            applyData.put("status", apply.getStatus());
            applyData.put("createdAt", apply.getCreatedAt());

            // Thông tin freelancer
            Map<String, Object> freelancerData = new HashMap<>();
            freelancerData.put("id", apply.getFreelancer().getId());
            freelancerData.put("fullName", apply.getFreelancer().getFullName());
            freelancerData.put("avatar", apply.getFreelancer().getAvatar());
            freelancerData.put("reputation", apply.getFreelancer().getReputation());
            freelancerData.put("email", apply.getFreelancer().getEmail());
            applyData.put("freelancer", freelancerData);

            return applyData;
        }).collect(Collectors.toList());

        // Thông tin đầy đủ công việc
        Map<String, Object> jobData = new HashMap<>();
        jobData.put("id", job.getId());
        jobData.put("title", job.getTitle());
        jobData.put("description", job.getDescription());
        jobData.put("budget", job.getBudget());
        jobData.put("durationHours", job.getDurationHours());
        jobData.put("status", job.getStatus());
        jobData.put("step", job.getStep());
        jobData.put("createdAt", job.getCreatedAt());
        jobData.put("postedAt", job.getPostedAt());
        jobData.put("closedAt", job.getClosedAt());
        jobData.put("document", job.getDocument());

        // Thông tin major
        jobData.put("major",
                Map.of("id", job.getMajor().getId(), "name", job.getMajor().getName()));

        // Danh sách skills
        jobData.put("skills",
                job.getSkills().stream()
                        .map(skill -> Map.of("id", skill.getId(), "name", skill.getName()))
                        .collect(Collectors.toList()));

        // Danh sách languages
        jobData.put("languages",
                job.getLanguages().stream().map(language -> Map.of("id", language.getId(), "name",
                        language.getName(), "iso", language.getIso()))
                        .collect(Collectors.toList()));

        Map<String, Object> response = new HashMap<>();
        response.put("job", jobData);
        response.put("totalApplies", appliesData.size());
        response.put("pendingApplies", appliesData.stream()
                .mapToLong(apply -> "PENDING"
                        .equals(((Map<String, Object>) apply).get("status").toString()) ? 1 : 0)
                .sum());
        response.put("acceptedApplies", appliesData.stream()
                .mapToLong(apply -> "ACCEPT"
                        .equals(((Map<String, Object>) apply).get("status").toString()) ? 1 : 0)
                .sum());
        response.put("rejectedApplies", appliesData.stream()
                .mapToLong(apply -> "REJECTED"
                        .equals(((Map<String, Object>) apply).get("status").toString()) ? 1 : 0)
                .sum());
        response.put("applies", appliesData);

        // Thông báo về auto reject nếu có
        if (autoRejectedCount > 0) {
            response.put("autoRejectedOnLoad", true);
            response.put("autoRejectedCount", autoRejectedCount);
            response.put("autoRejectMessage", "Đã tự động từ chối " + autoRejectedCount
                    + " ứng tuyển do dự án đã chọn freelancer.");
        }

        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PatchMapping(EndPoint.Job.REJECT_APPLY)
    @Transactional
    public ResponseEntity<?> rejectApply(@PathVariable Integer id, @PathVariable Integer applyId) {
        Integer currentEmployerId = securityUtil.getCurrentUser().getId();

        // Tìm Apply và validate
        Apply applyToReject = repositoryApply.findById(applyId).orElseThrow(
                () -> new DataConflictException("Không tìm thấy đơn ứng tuyển với ID: " + applyId));

        Job job = applyToReject.getJob();

        // Kiểm tra job thuộc về employer hiện tại
        if (!job.getEmployer().getId().equals(currentEmployerId)) {
            throw new DataConflictException("Bạn không có quyền thao tác với công việc này!");
        }

        // Kiểm tra job ID trong URL khớp với job của apply
        if (!job.getId().equals(id)) {
            throw new DataConflictException("ID công việc không khớp với đơn ứng tuyển!");
        }

        // Kiểm tra apply đang ở trạng thái PENDING
        if (applyToReject.getStatus() != Apply.Status.PENDING) {
            throw new DataConflictException("Chỉ có thể từ chối đơn ứng tuyển đang chờ xử lý!");
        }

        // Reject apply
        applyToReject.setStatus(Apply.Status.REJECTED);
        repositoryApply.save(applyToReject);

        return ResponseEntity.noContent().build();
    }

    /**
     * Helper method để kiểm tra job có thể chọn freelancer không
     */
    private void validateJobForFreelancerSelection(Job job, Integer currentEmployerId) {
        // Kiểm tra job thuộc về employer hiện tại
        if (!job.getEmployer().getId().equals(currentEmployerId)) {
            throw new DataConflictException("Bạn không có quyền thao tác với công việc này!");
        }

        // Kiểm tra job đang ở trạng thái PUBLIC
        if (job.getStatus() != Job.Status.PUBLIC) {
            throw new DataConflictException(
                    "Chỉ có thể chọn freelancer cho công việc đang công khai!");
        }

        // Kiểm tra xem job đã có freelancer được chấp nhận chưa
        boolean hasAcceptedFreelancer = job.getApplies().stream()
                .anyMatch(apply -> apply.getStatus() == Apply.Status.ACCEPT);

        if (hasAcceptedFreelancer) {
            throw new DataConflictException("Công việc này đã có freelancer được chấp nhận!");
        }
    }

    /**
     * Helper method để tự động reject tất cả apply khác và trả về số lượng reject
     */
    private int autoRejectOtherApplies(Job job, Integer selectedApplyId) {
        List<Apply> pendingApplies =
                job.getApplies().stream().filter(apply -> !apply.getId().equals(selectedApplyId)
                        && apply.getStatus() == Apply.Status.PENDING).toList();

        if (pendingApplies.isEmpty()) {
            return 0;
        }

        // Batch reject tất cả apply còn lại
        pendingApplies.forEach(apply -> {
            apply.setStatus(Apply.Status.REJECTED);
            repositoryApply.save(apply);
            serviceNotification.sendNoticationWithUserId(apply.getFreelancer().getId(),
                    "Từ chối ứng tuyển",
                    "Ứng tuyển của bạn cho công việc '" + job.getTitle() + "' Đã bị từ chối.");
        });

        return pendingApplies.size();
    }

    /**
     * Tự động reject các apply PENDING khi load trang nếu job đã có freelancer được chấp nhận Dùng
     * cho việc xử lý dữ liệu mẫu không đồng bộ
     */
    private int performAutoRejectOnPageLoad(Job job) {
        // Kiểm tra job đã có freelancer được chấp nhận chưa
        boolean hasAcceptedFreelancer = job.getApplies().stream()
                .anyMatch(apply -> apply.getStatus() == Apply.Status.ACCEPT);

        if (!hasAcceptedFreelancer) {
            return 0; // Không có freelancer được chọn, không cần auto reject
        }

        // Tìm các apply PENDING cần tự động reject
        List<Apply> pendingApplies = job.getApplies().stream()
                .filter(apply -> apply.getStatus() == Apply.Status.PENDING).toList();

        if (pendingApplies.isEmpty()) {
            return 0; // Không có apply PENDING nào cần reject
        }

        // Tự động reject tất cả apply PENDING (do job đã có freelancer)
        pendingApplies.forEach(apply -> {
            apply.setStatus(Apply.Status.REJECTED);
            repositoryApply.save(apply);
        });

        return pendingApplies.size();
    }
}
