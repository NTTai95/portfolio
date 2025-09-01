package com.freelancer.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.requests.RequestForm;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.utils.EndPoint;
import com.freelancer.utils.ModelBinder;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerForm {
    private final RepositoryJob repositoryJob;

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Skill.FORM)
    public ResponseEntity<?> skillForm(@PathVariable Integer id) {
        return ResponseEntity.ok(ModelBinder.bind(RequestForm.Skill.class, id));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Major.FORM)
    public ResponseEntity<?> majorForm(@PathVariable Integer id) {
        return ResponseEntity.ok(ModelBinder.bind(RequestForm.Major.class, id));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Language.FORM)
    public ResponseEntity<?> languageForm(@PathVariable Integer id) {
        return ResponseEntity.ok(ModelBinder.bind(RequestForm.Language.class, id));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Role.FORM)
    public ResponseEntity<?> roleForm(@PathVariable Integer id) {
        return ResponseEntity.ok(ModelBinder.bind(RequestForm.Role.class, id));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Staff.FORM)
    public ResponseEntity<?> staffForm(@PathVariable Integer id) {
        return ResponseEntity.ok(ModelBinder.bind(RequestForm.Staff.class, id));
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @GetMapping("/jobs-step1/{id}")
    public ResponseEntity<?> getJobStep1(@PathVariable Integer id) {
        return ResponseEntity.ok(ModelBinder.bind(RequestForm.JobStep1.class, id));
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @GetMapping("/jobs-step2/{id}")
    public ResponseEntity<?> getJobStep2(@PathVariable Integer id) {
        return ResponseEntity.ok(ModelBinder.bind(RequestForm.JobStep2.class, id));
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @GetMapping("/jobs-step3/{id}")
    public ResponseEntity<?> getJobStep3(@PathVariable Integer id) {
        return ResponseEntity.ok(ModelBinder.bind(RequestForm.JobStep3.class, id));
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @GetMapping("/jobs-step4/{id}")
    public ResponseEntity<?> getJobStep4(@PathVariable Integer id) {
        Job job = repositoryJob.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy job"));
        Map<String, Object> map = new HashMap<>();
        map.put("description", job.getDescription());
        map.put("document", job.getDocument());
        return ResponseEntity.ok(map);
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @GetMapping("/jobs/step/{id}")
    public ResponseEntity<Integer> getJobStep(@PathVariable Integer id) {
        return ResponseEntity.ok(repositoryJob.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy job")).getStep());
    }

}
