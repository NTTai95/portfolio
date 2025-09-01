package com.freelancer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.requests.RequestForm;
import com.freelancer.service.ServiceCreate;
import com.freelancer.utils.EndPoint;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerCreate {
    private final ServiceCreate serviceCreate;

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PostMapping(EndPoint.Admin.Major.BASE)
    public ResponseEntity<?> createMajor(@Valid @RequestBody RequestForm.Major request) {
        serviceCreate.createMajor(request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PostMapping(EndPoint.Admin.Skill.BASE)
    public ResponseEntity<?> createSkill(@Valid @RequestBody RequestForm.Skill request) {
        serviceCreate.createSkill(request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PostMapping(EndPoint.Admin.Language.BASE)
    public ResponseEntity<?> createLanguage(@Valid @RequestBody RequestForm.Language request) {
        serviceCreate.createLanguage(request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PostMapping(EndPoint.Admin.Role.BASE)
    public ResponseEntity<?> createRole(@Valid @RequestBody RequestForm.Role request) {
        serviceCreate.createRole(request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PostMapping(EndPoint.Job.BASE)
    public ResponseEntity<Integer> createJob(@Valid @RequestBody RequestForm.JobStep1 request) {
        return ResponseEntity.ok(serviceCreate.createJob(request));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PostMapping(EndPoint.Admin.Staff.BASE)
    public ResponseEntity<?> createStaff(@Valid @RequestBody RequestForm.Staff request) {
        serviceCreate.createStaff(request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('FREELANCER')")
    @PostMapping(EndPoint.Job.APPLY)
    public ResponseEntity<?> applyJob(@PathVariable Integer id,
            @Valid @RequestBody RequestForm.Apply request) {
        serviceCreate.createApply(id, request);
        return ResponseEntity.noContent().build();
    }
}
