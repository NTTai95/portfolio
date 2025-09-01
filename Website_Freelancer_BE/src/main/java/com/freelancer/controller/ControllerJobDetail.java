package com.freelancer.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.repository.RepositoryJob;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class ControllerJobDetail {
    private final RepositoryJob repositoryJob;

    @GetMapping("jobs/{id}/public")
    public ResponseEntity<?> getMethodName(@PathVariable Integer id) {
        Job job = repositoryJob.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy job!"));
        if (!job.getStatus().equals(Job.Status.PUBLIC)) {
            throw new DataConflictException("Job chưa được phê duyệt!");
        }

        Map<String, Object> res = new HashMap<>();
        res.put("id", job.getId());
        res.put("title", job.getTitle());
        res.put("description", job.getDescription());
        res.put("skills", job.getSkills().stream().map(s -> s.getName()).toList());
        res.put("languages", job.getLanguages().stream().map(l -> l.getName()).toList());
        res.put("majorName", job.getMajor().getName());
        res.put("countApply", job.getApplies().size());
        res.put("closedAt", job.getClosedAt());
        res.put("duration", job.getDurationHours());
        res.put("budget", job.getBudget());
        res.put("employerId", job.getEmployer().getId());
        res.put("employerAvatar", job.getEmployer().getAvatar());
        res.put("employerFullName", job.getEmployer().getFullName());
        res.put("employerBirthday", job.getEmployer().getBirthday());
        res.put("employerReputation", job.getEmployer().getReputation());
        res.put("isMale", job.getEmployer().getIsMale());
        res.put("phone", job.getEmployer().getPhone());
        res.put("email", job.getEmployer().getEmail());

        return ResponseEntity.ok(res);
    }

}
