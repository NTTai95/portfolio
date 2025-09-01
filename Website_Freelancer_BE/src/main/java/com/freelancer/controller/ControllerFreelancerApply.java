    package com.freelancer.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.repository.RepositoryApply;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryJob;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/freelancer/applies")
public class ControllerFreelancerApply {
    private final RepositoryApply repositoryApply;
    private final RepositoryFreelancer repositoryFreelancer;
    private final RepositoryJob repositoryJob;

    @PostMapping("/{jobId}")
    public ResponseEntity<?> applyJob(@PathVariable Integer jobId, @RequestBody Map<String, Object> request,
            Authentication auth) {
        String email = auth.getName();
        Freelancer freelancer = repositoryFreelancer.findByEmail(email)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy ID freelancer"));

        Job job = repositoryJob.findById(jobId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy job với ID: " + jobId));

        if (repositoryApply.existsByFreelancer_IdAndJob_Id(freelancer.getId(), jobId)) {
            throw new DataConflictException("Bạn đã applies");
        }

        Apply apply = new Apply();

        Object contentObj = request.get("content");
        if (contentObj == null)
            throw new DataConflictException("Thiếu nội dung ứng tuyển");
        apply.setContent(contentObj.toString());

        Object bidAmountObj = request.get("bidAmount");
        if (bidAmountObj == null)
            throw new DataConflictException("Thiếu bidAmount");
        int bidAmount;
        if (bidAmountObj instanceof Number) {
            bidAmount = ((Number) bidAmountObj).intValue();
        } else {
            try {
                bidAmount = Integer.parseInt(bidAmountObj.toString());
            } catch (NumberFormatException e) {
                throw new DataConflictException("Giá trị bidAmount không hợp lệ");
            }
        }
        apply.setBidAmount(bidAmount);

        Object estimatedHoursObj = request.get("estimatedHours");
        if (estimatedHoursObj == null)
            throw new DataConflictException("Thiếu estimatedHours");
        int estimatedHours;
        if (estimatedHoursObj instanceof Number) {
            estimatedHours = ((Number) estimatedHoursObj).intValue();
        } else {
            try {
                estimatedHours = Integer.parseInt(estimatedHoursObj.toString());
            } catch (NumberFormatException e) {
                throw new DataConflictException("Giá trị estimatedHours không hợp lệ");
            }
        }
        apply.setEstimatedHours(estimatedHours);

        apply.setFreelancer(freelancer);
        apply.setJob(job);
        apply.setStatus(Apply.Status.PENDING);

        repositoryApply.save(apply);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Ứng tuyển thành công");
        res.put("applyId", apply.getId());

        return ResponseEntity.ok(res);

    }

    @GetMapping
    public ResponseEntity<?> getMyApplies(Authentication auth) {
        String email = auth.getName();
        Freelancer freelancer = repositoryFreelancer.findByEmail(email)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy freelancer"));

        List<Apply> applies = repositoryApply.findByFreelancer_Id(freelancer.getId());

        List<Map<String, Object>> res = applies.stream().map(apply -> {
            Map<String, Object> map = new HashMap<>();
            map.put("applyId", apply.getId());
            map.put("jobTitle", apply.getJob().getTitle());
            map.put("bidAmount", apply.getBidAmount());
            map.put("estimatedHours", apply.getEstimatedHours());
            map.put("status", apply.getStatus());
            map.put("createdAt", apply.getCreatedAt());
            return map;
        }).toList();

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{applyId}")
    public ResponseEntity<?> getApplyDetail(@PathVariable Integer applyId, Authentication auth) {
        String email = auth.getName();
        Freelancer freelancer = repositoryFreelancer.findByEmail(email)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy freelancer"));

        Apply apply = repositoryApply.findById(applyId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy đơn ứng tuyển"));

        if (!apply.getFreelancer().getId().equals(freelancer.getId())) {
            throw new DataConflictException("Bạn không có quyền xem đơn này");
        }

        Map<String, Object> res = new HashMap<>();
        res.put("applyId", apply.getId());
        res.put("jobTitle", apply.getJob().getTitle());
        res.put("content", apply.getContent());
        res.put("bidAmount", apply.getBidAmount());
        res.put("estimatedHours", apply.getEstimatedHours());
        res.put("status", apply.getStatus());
        res.put("createdAt", apply.getCreatedAt());

        return ResponseEntity.ok(res);
    }

    @PatchMapping("/{applyId}")
    public ResponseEntity<?> cancelApply(@PathVariable Integer applyId, Authentication auth) {
        String email = auth.getName();
        Freelancer freelancer = repositoryFreelancer.findByEmail(email)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy freelancer"));

        Apply apply = repositoryApply.findById(applyId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy đơn ứng tuyển"));

        if (!apply.getFreelancer().getId().equals(freelancer.getId())) {
            throw new DataConflictException("Bạn không có quyền huỷ đơn này");
        }

        if (apply.getStatus().equals(Apply.Status.PENDING)) {
            throw new DataConflictException("Chỉ được huỷ đơn khi còn PENDING");
        }

        apply.setStatus(Apply.Status.WITHDRAWN);
        repositoryApply.save(apply);

        return ResponseEntity.ok(Map.of("message", "Huỷ đơn ứng tuyển thành công"));
    }

}
