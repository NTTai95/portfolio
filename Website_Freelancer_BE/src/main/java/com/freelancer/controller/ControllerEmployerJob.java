package com.freelancer.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Milestone;
import com.freelancer.mysql.model.User;
import com.freelancer.mysql.repository.RepositoryApply;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.service.ServiceNotification;
import com.freelancer.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerEmployerJob {
    private final RepositoryJob repositoryJob;
    private final SecurityUtil securityUtil;
    private final RepositoryApply repositoryApply;
    private final ServiceNotification serviceNotification;
    private final RepositoryFreelancer repositoryFreelancer;

    @GetMapping("/job-listings")
    public ResponseEntity<?> employerJob(@RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(required = false) Job.Status status) {

        User user = securityUtil.getCurrentUser();

        // Tính toán page index chính xác
        int pageIndex = page > 0 ? page - 1 : 0; // Đảm bảo pageIndex >= 0

        // Tạo page request với sắp xếp mới nhất đầu tiên
        Pageable pageable =
                PageRequest.of(pageIndex, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        // Gọi service để lấy dữ liệu
        Page<Job> jobs = null;
        if (user.getRole().getCode().equals("NHA_TUYEN_DUNG")) {
            jobs = repositoryJob.findByEmployerId(user.getId(), keyword, status, pageable);
        } else {
            jobs = repositoryJob.findJobsAppliedByFreelancer(user.getId(), keyword, status,
                    pageable);
        }

        // Chuẩn bị response
        Map<String, Object> response = new HashMap<>();
        response.put("currentPage", page); // Sử dụng page gốc từ request
        response.put("totalItems", jobs.getTotalElements());
        response.put("totalPages", jobs.getTotalPages());

        List<Map<String, Object>> jobList = new ArrayList<>();

        for (Job job : jobs.getContent()) {
            Map<String, Object> jobMap = new LinkedHashMap<>();
            jobMap.put("id", job.getId().toString());
            jobMap.put("title", job.getTitle());
            jobMap.put("description", job.getDescription());
            jobMap.put("status", job.getStatus().name().toLowerCase());
            jobMap.put("budget", job.getBudget());
            jobMap.put("createdAt", job.getCreatedAt());
            jobMap.put("postedAt", job.getPostedAt());
            jobMap.put("closedAt", job.getClosedAt());
            jobMap.put("durationHours", job.getDurationHours());
            jobMap.put("document", job.getDocument()); // Đường dẫn tài liệu
            if (job.getStatus().equals(Job.Status.PREPARING)
                    || job.getStatus().equals(Job.Status.IN_PROGRESS)) {
                jobMap.put("freelancerId", job.getApplies().stream()
                        .filter(a -> a.getStatus().equals(Apply.Status.ACCEPT)).findFirst()
                        .orElseThrow(() -> new DataConflictException("Không tìm thấy freelancer"))
                        .getFreelancer().getId());
            }

            if (user.getRole().getCode().equals("FREELANCER")) {
                jobMap.put("employerId", job.getEmployer().getId());
                jobMap.put("employerAvatar", job.getEmployer().getAvatar());
                jobMap.put("employerFullName", job.getEmployer().getFullName());
                jobMap.put("employerEmail", job.getEmployer().getEmail());
                Apply apply = job.getApplies().stream()
                        .filter(a -> a.getFreelancer().getId().equals(user.getId())).findFirst()
                        .orElseThrow(() -> new DataConflictException("Không tìm thấy apply"));
                jobMap.put("applyContent", apply.getContent());
                jobMap.put("applyStatus", apply.getStatus());
                jobMap.put("applyId", apply.getId());
                jobMap.put("applyCreatedAt", apply.getCreatedAt());
                jobMap.put("bidAmount", apply.getBidAmount());
                jobMap.put("estimatedHours", apply.getEstimatedHours());
            }

            List<Milestone> milestones = job.getMilestones();

            jobMap.put("countMilestones", milestones.size());

            Map<Milestone.Status, Long> countByStatus = milestones.stream()
                    .collect(Collectors.groupingBy(Milestone::getStatus, Collectors.counting()));

            Map<String, Long> statusCounts =
                    countByStatus.entrySet().stream().filter(e -> e.getValue() > 0)
                            .collect(Collectors.toMap(e -> e.getKey().name(), Map.Entry::getValue));

            jobMap.put("milestoneStatusCounts", statusCounts);
            jobMap.put("countApplicants", job.getApplies().size());

            if (user.getRole().getCode().equals("NHA_TUYEN_DUNG")) {
                Optional<Apply> applyOpt = repositoryApply.findByJobId(job.getId()).stream()
                        .filter(a -> a.getStatus().equals(Apply.Status.ACCEPT)).findFirst();
                if (applyOpt.isPresent()) {
                    Apply apply = applyOpt.get();
                    jobMap.put("bidAmount", apply.getBidAmount());
                    jobMap.put("estimatedHours", apply.getEstimatedHours());
                } else {
                    jobMap.put("bidAmount", null);
                    jobMap.put("estimatedHours", null);
                }
            }

            jobList.add(jobMap);
        }

        response.put("jobs", jobList);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/employer/{id}/job-listings/search")
    public ResponseEntity<?> searchEmployerJobs(@PathVariable("id") Integer employerId,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Job.Status status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Job> jobs = repositoryJob.searchJobsByEmployerIdAndKeywordAndStatus(employerId,
                keyword, status, pageable);

        List<Map<String, Object>> res = new ArrayList<>();
        for (Job job : jobs) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", job.getId());
            map.put("title", job.getTitle());
            map.put("status", job.getStatus());
            map.put("budget", job.getBudget());
            map.put("applies", job.getApplies().size());
            long totalMilestones = job.getMilestones().size();
            long doneMilestones = job.getMilestones().stream()
                    .filter(m -> m.getStatus() == Milestone.Status.DONE).count();
            map.put("milestone", doneMilestones + "/" + totalMilestones);
            map.put("postedAt", job.getPostedAt());
            res.add(map);
        }

        return ResponseEntity.ok(res);
    }

    @PutMapping("/jobs/{jobId}/publish")
    public ResponseEntity<String> publishJob(@PathVariable Integer jobId) {
        Job job = repositoryJob.findById(jobId)
                .orElseThrow(() -> new DataConflictException("Job not found with id: " + jobId));

        if (job.getTitle() == null || job.getTitle().isBlank()) {
            throw new DataConflictException("Công việc chưa có tiêu đề!");
        } else if (job.getMajor() == null) {
            throw new DataConflictException("Công việc chưa có ngành nghề!");
        } else if (job.getBudget() == null) {
            throw new DataConflictException("Công việc chưa có ngân sách!");
        } else if (job.getDurationHours() == null) {
            throw new DataConflictException("Công việc chưa có thời gian thực hiện!");
        } else if (job.getSkills().isEmpty()) {
            throw new DataConflictException("Công việc chưa có kỹ năng!");
        } else if (job.getLanguages().isEmpty()) {
            throw new DataConflictException("Công việc chưa có ngôn ngữ!");
        } else if (job.getClosedAt().isBefore(LocalDateTime.now().plusDays(3))) {
            throw new DataConflictException("Ngày đóng tuyển dụng phải sau 3 ngày nữa!");
        } else if (job.getDescription() == null || job.getDescription().isBlank()) {
            throw new DataConflictException("Công việc chưa có mô tả!");
        } else if (job.getStatus() != Job.Status.DRAFT) {
            throw new DataConflictException("Công việc đã được đăng tải!");
        }

        job.setStatus(Job.Status.PUBLIC);

        repositoryJob.save(job);
        return ResponseEntity.ok("Job published successfully");
    }

    @DeleteMapping("/jobs/{jobId}")
    public ResponseEntity<String> deleteJob(@PathVariable Integer jobId) {
        User user = securityUtil.getCurrentUser();
        Job job = repositoryJob.findById(jobId)
                .orElseThrow(() -> new DataConflictException("Job not found with id: " + jobId));
        if (!job.getStatus().equals(Job.Status.DRAFT)
                && job.getEmployer().getId().equals(user.getId())) {
            throw new DataConflictException("You can only delete draft jobs.");
        }
        repositoryJob.delete(job);
        return ResponseEntity.ok("Job deleted successfully");
    }

    @Transactional
    @PutMapping("/jobs/{jobId}/revoke")
    public ResponseEntity<String> revokeJob(@PathVariable Integer jobId) {
        Job job = repositoryJob.findById(jobId)
                .orElseThrow(() -> new DataConflictException("Job not found with id: " + jobId));
        if (!job.getStatus().equals(Job.Status.PUBLIC)) {
            throw new DataConflictException("Job is not published.");
        }

        // Dùng Iterator để tránh ConcurrentModificationException
        Iterator<Apply> iterator = job.getApplies().iterator();
        while (iterator.hasNext()) {
            Apply apply = iterator.next();

            serviceNotification.sendNoticationWithUserId(apply.getFreelancer().getId(),
                    "Công việc bị hủy", "Công việc '" + job.getTitle()
                            + "' bạn đã ứng tuyển.\n Đã bị hủy bởi nhà tuyển dụng.");

            repositoryApply.deleteById(apply.getId());
            iterator.remove(); // xoá khỏi danh sách trong Job
        }

        job.setStatus(Job.Status.DRAFT);
        repositoryJob.save(job);

        return ResponseEntity.ok("Job revoked successfully");
    }

    @Transactional
    @PutMapping("/jobs/{jobId}/applications/revoke")
    public ResponseEntity<String> revokeApplication(@PathVariable Integer jobId) {
        User user = securityUtil.getCurrentUser();
        Freelancer freelancer = repositoryFreelancer.findById(user.getId()).orElseThrow(
                () -> new DataConflictException("Freelancer not found with id: " + user.getId()));

        Apply apply =
                repositoryApply.findByJobIdAndFreelancerId(jobId, freelancer.getId()).orElseThrow(
                        () -> new DataConflictException("Apply not found with job id: " + jobId));

        if (apply.getStatus() != Apply.Status.PENDING) {
            throw new DataConflictException("Apply is not pending.");
        }

        repositoryApply.delete(apply);
        repositoryApply.flush();

        return ResponseEntity.ok("Apply revoked successfully");
    }

}
