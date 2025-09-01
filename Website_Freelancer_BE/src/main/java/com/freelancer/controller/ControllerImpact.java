package com.freelancer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.responses.ResponseImpact;
import com.freelancer.service.ServiceImpact;
import com.freelancer.utils.EndPoint;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerImpact {
    private final ServiceImpact serviceImpact;

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Skill.IMPACT)
    public ResponseEntity<ResponseImpact.Skill> impactSkill(@PathVariable Integer id) {
        return ResponseEntity.ok(serviceImpact.impactSkill(id));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Major.IMPACT)
    public ResponseEntity<ResponseImpact.Major> impactMajor(@PathVariable Integer id) {
        return ResponseEntity.ok(serviceImpact.impactMajor(id));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Language.IMPACT)
    public ResponseEntity<ResponseImpact.Language> impactLanguage(@PathVariable Integer id) {
        return ResponseEntity.ok(serviceImpact.impactLanguage(id));
    }
}
