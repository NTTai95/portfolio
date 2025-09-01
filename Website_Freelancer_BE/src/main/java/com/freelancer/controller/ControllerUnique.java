package com.freelancer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.service.ServiceUnique;
import com.freelancer.utils.EndPoint;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerUnique {
    private final ServiceUnique serviceUnique;

    @GetMapping(EndPoint.Unique.User.EMAIL)
    public ResponseEntity<Boolean> uniqueEmail(@RequestParam String value) {
        return ResponseEntity.ok(serviceUnique.uniqueEmail(value));
    }

    @GetMapping(EndPoint.Unique.User.PHONE)
    public ResponseEntity<Boolean> uniquePhone(@RequestParam String value) {
        return ResponseEntity.ok(serviceUnique.uniquePhone(value));
    }

    @GetMapping(EndPoint.Unique.Skill.NAME)
    public ResponseEntity<Boolean> uniqueSkillName(@RequestParam String value) {
        return ResponseEntity.ok(serviceUnique.uniqueSkillName(value));
    }

    @GetMapping(EndPoint.Unique.Major.NAME)
    public ResponseEntity<Boolean> uniqueMajorName(@RequestParam String value) {
        return ResponseEntity.ok(serviceUnique.uniqueMajorName(value));
    }

    @GetMapping(EndPoint.Unique.Language.NAME)
    public ResponseEntity<Boolean> uniqueLanguageName(@RequestParam String value) {
        return ResponseEntity.ok(serviceUnique.uniqueLanguageName(value));
    }

    @GetMapping(EndPoint.Unique.Language.ISO)
    public ResponseEntity<Boolean> uniqueLanguageIso(@RequestParam String value) {
        return ResponseEntity.ok(serviceUnique.uniqueLanguageIso(value));
    }

    @GetMapping(EndPoint.Unique.Role.NAME)
    public ResponseEntity<Boolean> uniqueRoleName(@RequestParam String value) {
        return ResponseEntity.ok(serviceUnique.uniqueRoleName(value));
    }
}
