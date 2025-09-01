package com.freelancer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.service.ServiceChangeState;
import com.freelancer.utils.EndPoint;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerChangeState {
    private final ServiceChangeState serviceChangeState;

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PatchMapping(EndPoint.Admin.Skill.ACTIVE)
    public ResponseEntity<?> activeSkill(@PathVariable Integer id) {
        serviceChangeState.activeSkill(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PatchMapping(EndPoint.Admin.Major.ACTIVE)
    public ResponseEntity<?> activeMajor(@PathVariable Integer id) {
        serviceChangeState.activeMajor(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PatchMapping(EndPoint.Admin.Language.ACTIVE)
    public ResponseEntity<?> activeLanguage(@PathVariable Integer id) {
        serviceChangeState.activeLanguage(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PatchMapping(EndPoint.Admin.Staff.ACTIVE)
    public ResponseEntity<?> activeStaff(@PathVariable Integer id) {
        serviceChangeState.activeStaff(id);
        return ResponseEntity.noContent().build();
    }

    // -------------------- NHA_TUYEN_DUNG --------------------
    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PatchMapping(EndPoint.Job.POST_PUBLIC)
    public ResponseEntity<?> postPublicJob(@PathVariable Integer id) {
        serviceChangeState.postPublicJob(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PatchMapping(EndPoint.Job.POST_PRIVATE)
    public ResponseEntity<?> postPrivateJob(@PathVariable Integer id) {
        serviceChangeState.postPrivateJob(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PatchMapping(EndPoint.Admin.Skill.INVALID)
    public ResponseEntity<?> invalidSkill(@PathVariable Integer id) {
        serviceChangeState.invalidSkill(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PatchMapping(EndPoint.Admin.Major.INVALID)
    public ResponseEntity<?> invalidMajor(@PathVariable Integer id) {
        serviceChangeState.invalidMajor(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PatchMapping(EndPoint.Admin.Language.INVALID)
    public ResponseEntity<?> invalidLanguage(@PathVariable Integer id) {
        serviceChangeState.invalidLanguage(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @PatchMapping(EndPoint.Admin.Staff.INVALID)
    public ResponseEntity<?> invalidStaff(@PathVariable Integer id) {
        serviceChangeState.invalidStaff(id);
        return ResponseEntity.noContent().build();
    }
}
