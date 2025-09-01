package com.freelancer.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Milestone;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryMilestone;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/freelancer/milestones")
public class ControllerFreelancerMilestone {
    private final RepositoryMilestone repositoryMilestone;
    private final RepositoryFreelancer repositoryFreelancer;

    @PutMapping("/{milestoneId}/response")
    public ResponseEntity<?> respondToMilestone(
            @PathVariable Integer milestoneId,
            @RequestBody Map<String, Object> request,
            Authentication auth) {

        String email = auth.getName();

        Milestone milestone = repositoryMilestone.findById(milestoneId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy milestone với ID: " + milestoneId));

        Freelancer freelancer = repositoryFreelancer.findByEmail(email)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy freelancer"));

        if (!milestone.getFreelancer().getId().equals(freelancer.getId())) {
            throw new DataConflictException("Bạn không có quyền phản hồi milestone này");
        }

        if (milestone.getStatus() != Milestone.Status.PENDING) {
            throw new DataConflictException("Chỉ được phản hồi milestone đang chờ");
        }

        Boolean accepted = (Boolean) request.get("accepted");

        if (accepted != null && accepted) {
            milestone.setStatus(Milestone.Status.DOING);
            milestone.setStartAt(LocalDateTime.now());
        } else {
            milestone.setStatus(Milestone.Status.REJECTED);
        }

        repositoryMilestone.save(milestone);

        return ResponseEntity.ok(Map.of("message", "Phản hồi milestone thành công"));
    }

    @GetMapping
    public ResponseEntity<?> getMyMilestones(Authentication auth) {
        String email = auth.getName();

        Freelancer freelancer = repositoryFreelancer.findByEmail(email)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy freelancer"));

        List<Milestone> milestones = repositoryMilestone.findByFreelancerId(freelancer.getId());

        milestones.sort(Comparator.comparing(Milestone::getCreatedAt));

        Map<Integer, Map<String, Object>> jobMap = new LinkedHashMap<>();

        for (Milestone m : milestones) {
            Integer jobId = m.getJob().getId();

            jobMap.putIfAbsent(jobId, new HashMap<>(Map.of(
                    "jobId", jobId,
                    "jobTitle", m.getJob().getTitle(),
                    "milestones", new ArrayList<Map<String, Object>>())));

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> milestoneList = (List<Map<String, Object>>) jobMap.get(jobId).get("milestones");

            Map<String, Object> milestoneMap = mapMilestone(m, milestoneList.size() + 1);

            milestoneList.add(milestoneMap);
        }

        return ResponseEntity.ok(new ArrayList<>(jobMap.values()));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getMilestonesByJob(@PathVariable Integer jobId, Authentication auth) {
        String email = auth.getName();

        Freelancer freelancer = repositoryFreelancer.findByEmail(email)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy freelancer"));

        List<Milestone> milestones = repositoryMilestone.findByFreelancerIdAndJobId(freelancer.getId(), jobId);

        milestones.sort(Comparator.comparing(Milestone::getCreatedAt));

        List<Map<String, Object>> milestoneList = new ArrayList<>();

        for (int i = 0; i < milestones.size(); i++) {
            Milestone m = milestones.get(i);
            Map<String, Object> milestoneMap = mapMilestone(m, i + 1);
            milestoneMap.put("jobTitle", m.getJob().getTitle());
            milestoneList.add(milestoneMap);
        }

        // ✅ Bọc thêm jobTitle + jobId vào response
        Map<String, Object> response = new HashMap<>();
        response.put("jobId", jobId);
        response.put("jobTitle", milestones.isEmpty() ? "" : milestones.get(0).getJob().getTitle());
        response.put("milestones", milestoneList);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{milestoneId}")
    public ResponseEntity<?> getMilestoneDetail(@PathVariable Integer milestoneId, Authentication auth) {
        String email = auth.getName();

        Freelancer freelancer = repositoryFreelancer.findByEmail(email)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy freelancer"));

        Milestone milestone = repositoryMilestone.findById(milestoneId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy milestone"));

        if (!milestone.getFreelancer().getId().equals(freelancer.getId())) {
            throw new DataConflictException("Bạn không có quyền xem milestone này");
        }

        Map<String, Object> milestoneMap = new LinkedHashMap<>();
        milestoneMap.put("milestoneId", milestone.getId());
        milestoneMap.put("content", milestone.getContent());
        milestoneMap.put("status", milestone.getStatus());
        milestoneMap.put("percent", milestone.getPercent());
        milestoneMap.put("startAt", milestone.getStartAt());
        milestoneMap.put("endAt", milestone.getEndAt());
        milestoneMap.put("fundedAt", milestone.getFundedAt());
        milestoneMap.put("disburseAt", milestone.getDisburseAt());
        milestoneMap.put("createdAt", milestone.getCreatedAt());
        milestoneMap.put("document", milestone.getDocument());
        milestoneMap.put("isOverdue", milestone.getIsOverdue());
        milestoneMap.put("disputed", milestone.getDisputed());

        Map<String, Object> jobMap = new HashMap<>();
        jobMap.put("jobId", milestone.getJob().getId());
        jobMap.put("jobTitle", milestone.getJob().getTitle());

        milestoneMap.put("job", jobMap);

        return ResponseEntity.ok(milestoneMap);
    }

    private Map<String, Object> mapMilestone(Milestone m, int stageNumber) {
        Map<String, Object> milestoneMap = new LinkedHashMap<>();

        milestoneMap.put("stageNumber", stageNumber);
        milestoneMap.put("milestoneId", m.getId());
        milestoneMap.put("title", m.getContent());
        milestoneMap.put("startAt", m.getStartAt());
        milestoneMap.put("endAt", m.getEndAt());
        milestoneMap.put("percent", m.getPercent());
        milestoneMap.put("document", m.getDocument());

        if (m.getStatus() == Milestone.Status.PENDING) {
            milestoneMap.put("mode", "actionable");
        } else {
            String statusLabel;
            switch (m.getStatus()) {
                case DONE:
                    statusLabel = "Đã hoàn thành";
                    break;
                case REJECTED:
                    statusLabel = "Đã từ chối";
                    break;
                case UNPAID:
                    statusLabel = "Chưa thanh toán";
                    break;
                case DOING:
                    statusLabel = "Đang làm";
                    break;
                default:
                    statusLabel = "Trạng thái không xác định";
            }
            milestoneMap.put("mode", "readonly");
            milestoneMap.put("statusLabel", statusLabel);
        }

        return milestoneMap;
    }
}
