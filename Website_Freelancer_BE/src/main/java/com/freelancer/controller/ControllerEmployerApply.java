package com.freelancer.controller;

import java.util.*;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.repository.RepositoryApply;
import com.freelancer.mysql.repository.RepositoryJob;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
@RequestMapping("/employer/jobs")
public class ControllerEmployerApply {
    private final RepositoryApply repositoryApply;
    private final RepositoryJob repositoryJob;

    @GetMapping("/{jobId}/applies")
    public ResponseEntity<?> getApplies(@PathVariable Integer jobId, Authentication auth) {
        String email = auth.getName();
        Job job = repositoryJob.findById(jobId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy công việc với ID " + jobId));

        if (!job.getEmployer().getEmail().equals(email)) {
            throw new DataConflictException("Bạn không có quyền truy cập job này");
        }

        List<Apply> applies = job.getApplies();

        List<Map<String, Object>> res = new ArrayList<>();
        for (Apply a : applies) {
            Map<String, Object> map = new HashMap<>();
            map.put("applyId", a.getId());
            map.put("freelancerId", a.getFreelancer().getId());
            map.put("fullName", a.getFreelancer().getFullName());
            map.put("avatar", a.getFreelancer().getAvatar());
            map.put("content", a.getContent());
            map.put("bidAmount", a.getBidAmount());
            map.put("estimatedHours", a.getEstimatedHours());
            res.add(map);
        }

        return ResponseEntity.ok(res);
    }

    @PutMapping("/{jobId}/select-freelancer")
    public ResponseEntity<?> selectFreelancer(@PathVariable Integer jobId,
            @RequestBody Map<String, Object> request) {

        Integer applyId = Integer.valueOf(request.get("applyId").toString());

        Apply apply = repositoryApply.findById(applyId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy apply với ID " + applyId));

        Job job = repositoryJob.findById(jobId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy công việc với ID " + jobId));

        if (!apply.getJob().getId().equals(job.getId())) {
            return ResponseEntity.badRequest().body("Apply không thuộc job này.");
        }

        for (Apply a : job.getApplies()) {
            if (a.getId().equals(apply.getId())) {
                a.setStatus(Apply.Status.ACCEPT);
            } else {
                a.setStatus(Apply.Status.REJECTED);
            }
        }

        job.setStatus(Job.Status.IN_PROGRESS);

        repositoryJob.save(job);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Đã chọn freelancer thành công");
        res.put("freelancerId", apply.getFreelancer().getId());
        return ResponseEntity.ok(res);
    }

}
