package com.freelancer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.service.ServiceDelete;
import com.freelancer.utils.EndPoint;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerDelete {
    private final ServiceDelete serviceDelete;

    @PreAuthorize("hasRole('QUAN_TRI')")
    @DeleteMapping(EndPoint.Admin.Skill.ID)
    public ResponseEntity<?> deleteSkill(@PathVariable Integer id) {
        serviceDelete.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @DeleteMapping(EndPoint.Admin.Major.ID)
    public ResponseEntity<?> deleteMajor(@PathVariable Integer id) {
        serviceDelete.deleteMajor(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @DeleteMapping(EndPoint.Admin.Language.ID)
    public ResponseEntity<?> deleteLanguage(@PathVariable Integer id) {
        serviceDelete.deleteLanguage(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @DeleteMapping(EndPoint.Admin.Role.ID)
    public ResponseEntity<?> deleteRole(@PathVariable Integer id) {
        serviceDelete.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}
