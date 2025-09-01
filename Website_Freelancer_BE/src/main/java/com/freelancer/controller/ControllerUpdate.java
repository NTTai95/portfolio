package com.freelancer.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.freelancer.dto.requests.RequestForm;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.service.ServiceUpdate;
import com.freelancer.utils.EndPoint;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerUpdate {
    private final ServiceUpdate serviceUpdate;
    private final RepositoryJob repositoryJob;

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PutMapping(EndPoint.Admin.Skill.ID)
    public ResponseEntity<?> updateSkill(@PathVariable Integer id,
            @Valid @RequestBody RequestForm.Skill request) {
        serviceUpdate.updateSkill(id, request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PutMapping(EndPoint.Admin.Major.ID)
    public ResponseEntity<?> updateMajor(@PathVariable Integer id,
            @Valid @RequestBody RequestForm.Major request) {
        serviceUpdate.updateMajor(id, request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PutMapping(EndPoint.Admin.Language.ID)
    public ResponseEntity<?> updateLanguage(@PathVariable Integer id,
            @Valid @RequestBody RequestForm.Language request) {
        serviceUpdate.updateLanguage(id, request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PutMapping(EndPoint.Admin.Role.ID)
    public ResponseEntity<?> updateRole(@PathVariable Integer id,
            @Valid @RequestBody RequestForm.Role request) {
        serviceUpdate.updateRole(id, request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PutMapping(EndPoint.Job.Step1.ID)
    public ResponseEntity<?> updateJobStep1(@PathVariable Integer id,
            @Valid @RequestBody RequestForm.JobStep1 request) {
        serviceUpdate.updateJobStep1(id, request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PutMapping(EndPoint.Job.Step2.ID)
    public ResponseEntity<?> updateJobStep2(@PathVariable Integer id,
            @Valid @RequestBody RequestForm.JobStep2 request) {
        serviceUpdate.updateJobStep2(id, request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PutMapping(EndPoint.Job.Step3.ID)
    public ResponseEntity<?> updateJobStep3(@PathVariable Integer id,
            @Valid @RequestBody RequestForm.JobStep3 request) {
        serviceUpdate.updateJobStep3(id, request);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PutMapping(value = EndPoint.Job.Step4.ID, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateJobStep4(@PathVariable Integer id,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile document,
            @RequestParam Boolean isPublic) {
        RequestForm.JobStep4 request = new RequestForm.JobStep4();
        request.setDescription(description);
        request.setDocument(document);
        serviceUpdate.updateJobStep4(id, request, isPublic);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PutMapping("/step/job/{id}")
    public ResponseEntity<?> updateJobStep(@PathVariable Integer id, @RequestBody Integer step) {
        Job job = repositoryJob.findById(id)
                .orElseThrow(() -> new DataConflictException("Job not found"));
        job.setStep(step);
        repositoryJob.save(job);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PutMapping(EndPoint.Admin.Staff.ID)
    public ResponseEntity<?> updateStaff(@PathVariable Integer id,
            @Valid @RequestBody RequestForm.Staff request) {
        serviceUpdate.updateStaff(id, request);
        return ResponseEntity.noContent().build();
    }
}
