package com.freelancer.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Milestone;
import com.freelancer.mysql.repository.RepositoryApply;
import com.freelancer.mysql.repository.RepositoryMilestone;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerPhaseFreelancer {
    private final RepositoryMilestone repositoryMilestone;
    private final RepositoryApply repositoryApply;

    @GetMapping("/freelancer/{freelancerId}/job/{jobId}/phases")
    public ResponseEntity<?> getFreelancerPhases(
            @PathVariable Integer jobId,
            @PathVariable Integer freelancerId) {
        List<Milestone> phases = repositoryMilestone.findByFreelancerIdAndJobId(freelancerId, jobId);
        List<Map<String, Object>> res = new ArrayList<>();
        for (Milestone phase : phases) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", phase.getId());
            map.put("status", phase.getStatus());
            map.put("percent", phase.getPercent());
            map.put("content", phase.getContent());
            map.put("startAt", phase.getStartAt());
            map.put("endAt", phase.getEndAt());
            res.add(map);
        }
        return ResponseEntity.ok(res);
    }

    @GetMapping("/freelancer/{freelancerId}/applies")
    public ResponseEntity<?> getFreelancerApplies(@PathVariable Integer freelancerId) {
        List<Apply> applies = repositoryApply.findByFreelancer_Id(freelancerId);
        List<Map<String, Object>> res = new ArrayList<>();
        for (Apply apply : applies) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", apply.getId());
            map.put("JobName", apply.getJob().getTitle());
            map.put("jobDescription", apply.getJob().getDescription());
            map.put("createdAt", apply.getCreatedAt());
            map.put("status", apply.getStatus());
            map.put("bidAmount", apply.getBidAmount());
            map.put("estimatedHours", apply.getEstimatedHours());
            res.add(map);
        }
        return ResponseEntity.ok(res);
    }
}
