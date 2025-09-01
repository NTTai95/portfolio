package com.freelancer.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.service.ServiceSystemConfig;
import com.freelancer.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerApply {
    private final ServiceSystemConfig serviceSystemConfig;
    private final RepositoryJob repositoryJob;
    private final RepositoryFreelancer repositoryFreelancer;
    private final SecurityUtil securityUtil;

    @GetMapping("/jobs/{id}/is-apply")
    public Boolean isApply(@PathVariable Integer id) {
        Freelancer freelancer = repositoryFreelancer.findById(securityUtil.getCurrentUser().getId())
                .orElseThrow(() -> new DataConflictException("Không tìm thấy freelancer!"));
        Job job = repositoryJob.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy job!"));

        return freelancer.getApplies().stream()
                .anyMatch(apply -> apply.getJob().getId().equals(job.getId()));
    }

    @GetMapping("/service-fee")
    public Float getServiceFee() {
        return serviceSystemConfig.getConfig().getServiceFee();
    }

    @GetMapping("/meta/job/{jobId}/apply/ai")
    public Map<String, Object> getMethodName(@PathVariable Integer jobId) {

        Freelancer freelancer = repositoryFreelancer.findById(securityUtil.getCurrentUser().getId())
                .orElseThrow(() -> new DataConflictException("Không tìm thấy freelancer!"));

        Job job = repositoryJob.findById(jobId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy job!"));

        Map<String, Object> res = new HashMap<>();
        res.put("jobTitle", job.getTitle());
        res.put("jobDescription", job.getDescription());
        res.put("jobLanguages", job.getLanguages().stream().map(l -> l.getName()));
        res.put("jobSkills", job.getSkills().stream().map(s -> s.getName()));
        res.put("jobDurationHours", job.getDurationHours());
        res.put("jobBudget", job.getBudget());
        res.put("employerFullName", job.getEmployer().getFullName());
        res.put("employerIsMale", job.getEmployer().getIsMale());
        res.put("employerBirthday", job.getEmployer().getBirthday());
        res.put("freelancerFullName", freelancer.getFullName());
        res.put("freelancerBirthday", freelancer.getBirthday());
        res.put("freelancerSkills", freelancer.getSkills().stream().map(s -> s.getName()));
        res.put("freelancerLanguages", freelancer.getLanguages().stream().map(l -> l.getName()));
        res.put("freelancerIsMale", freelancer.getIsMale());
        return res;
    }

}
