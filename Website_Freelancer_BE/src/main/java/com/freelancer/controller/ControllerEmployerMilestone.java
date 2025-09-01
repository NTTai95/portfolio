package com.freelancer.controller;

import java.beans.Transient;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Milestone;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.mysql.repository.RepositoryMilestone;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/employer/jobs")
public class ControllerEmployerMilestone {
    private final RepositoryJob repositoryJob;
    private final RepositoryMilestone repositoryMilestone;
    private final RepositoryFreelancer repositoryFreelancer;
    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Transient
    @PostMapping("/{jobId}/milestones/{freelancerId}")
    public ResponseEntity<?> createMilestones(@PathVariable Integer jobId,
            @PathVariable Integer freelancerId, Authentication auth,
            @RequestBody Map<String, Object> request) {
        String email = auth.getName();
        Job job = repositoryJob.findWithEmployerById(jobId).orElseThrow(
                () -> new DataConflictException("Không tìm thấy job với ID: " + jobId));
        Freelancer freelancer = repositoryFreelancer.findById(freelancerId)
                .orElseThrow(() -> new DataConflictException(
                        "Không tìm thấy freelancer với ID: " + freelancerId));

        if (!freelancer.getApplies().stream()
                .anyMatch(a -> a.getStatus().equals(Apply.Status.ACCEPT)
                        && a.getJob().getId().equals(jobId))) {
            throw new DataConflictException("Bạn không có quyền tạo milestone với freelancer này");
        }

        if (!job.getEmployer().getEmail().equals(email)) {
            throw new DataConflictException("Bạn không có quyền thêm milestone cho job này");
        }

        try {
            Integer percentInput = (Integer) request.get("percent");
            if (percentInput == null || percentInput < 1 || percentInput > 100) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Phần trăm phải từ 1 đến 100"));
            }

            Milestone m = new Milestone();

            m.setContent((String) request.get("content"));
            m.setStartAt(LocalDateTime.parse((String) request.get("startAt"), FORMATTER));
            m.setEndAt(LocalDateTime.parse((String) request.get("endAt"), FORMATTER));
            m.setPercent(percentInput.byteValue());
            m.setDocument((String) request.get("document"));

            m.setJob(job);
            m.setEmployer(job.getEmployer());
            m.setFreelancer(freelancer);

            m.setStatus(Milestone.Status.PENDING);
            m.setDisputed(false);
            m.setIsOverdue(false);

            repositoryMilestone.save(m);

            return ResponseEntity
                    .ok(Map.of("message", "Tạo milestone thành công", "milestoneId", m.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Dữ liệu không hợp lệ: " + e.getMessage()));
        }
    }

    @GetMapping("/{jobId}/milestones")
    public ResponseEntity<?> getMilestones(@PathVariable Integer jobId, Authentication auth) {
        String email = auth.getName();

        Job job = repositoryJob.findWithEmployerById(jobId).orElseThrow(
                () -> new DataConflictException("Không tìm thấy job với ID: " + jobId));

        if (!job.getEmployer().getEmail().equals(email)) {
            throw new DataConflictException("Bạn không có quyền xem milestone của job này");
        }

        List<Milestone> milestones = repositoryMilestone.findByJobId(jobId);
        List<Map<String, Object>> res = new ArrayList<>();
        for (Milestone m : milestones) {
            Map<String, Object> map = new HashMap<>();
            map.put("milestoneId", m.getId());
            map.put("content", m.getContent());
            map.put("status", m.getStatus());
            map.put("percent", m.getPercent());
            map.put("startAt", m.getStartAt());
            map.put("endAt", m.getEndAt());
            map.put("fundedAt", m.getFundedAt());
            map.put("disburseAt", m.getDisburseAt());
            map.put("createdAt", m.getCreatedAt());
            map.put("document", m.getDocument());
            map.put("isOverdue", m.getIsOverdue());
            map.put("disputed", m.getDisputed());
            res.add(map);
        }

        return ResponseEntity.ok(res);
    }

    @PutMapping("/milestones/{milestoneId}")
    public ResponseEntity<?> updateMilestone(@PathVariable Integer milestoneId, Authentication auth,
            @RequestBody Map<String, Object> request) {
        String email = auth.getName();

        Milestone milestone = repositoryMilestone.findById(milestoneId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy milestone"));

        if (!milestone.getEmployer().getEmail().equals(email)) {
            throw new DataConflictException("Bạn không có quyền chỉnh sửa milestone này");
        }

        if (milestone.getStatus() != Milestone.Status.PENDING) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Chỉ được sửa milestone khi đang ở trạng thái PENDING"));
        }

        try {
            milestone.setContent((String) request.get("content"));
            milestone.setStartAt(LocalDateTime.parse((String) request.get("startAt"), FORMATTER));
            milestone.setEndAt(LocalDateTime.parse((String) request.get("endAt"), FORMATTER));
            milestone.setDocument((String) request.get("document"));

            Number percentNumber = (Number) request.get("percent");
            milestone.setPercent(percentNumber.byteValue());

            repositoryMilestone.save(milestone);

            return ResponseEntity.ok(Map.of("message", "Cập nhật milestone thành công"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Dữ liệu không hợp lệ: " + e.getMessage()));
        }
    }

    @DeleteMapping("/milestones/{milestoneId}")
    public ResponseEntity<?> deleteMilestone(@PathVariable Integer milestoneId,
            Authentication auth) {
        String email = auth.getName();

        Milestone milestone = repositoryMilestone.findById(milestoneId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy milestone"));

        if (!milestone.getEmployer().getEmail().equals(email)) {
            throw new DataConflictException("Bạn không có quyền xóa milestone này");
        }

        if (milestone.getStatus() != Milestone.Status.PENDING) {
            return ResponseEntity.badRequest()
                    .body("Chỉ được xóa milestone khi đang ở trạng thái PENDING");
        }

        repositoryMilestone.delete(milestone);

        return ResponseEntity.ok(Map.of("message", "Xóa milestone thành công"));
    }

}
