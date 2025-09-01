package com.freelancer.controller;

import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.requests.RequestPage;
import com.freelancer.utils.EndPoint;
import com.freelancer.utils.MetaFilter;
import com.freelancer.utils.MetaFilter.ItemFilter;

@RestController
public class ControllerFilter {

    @GetMapping(EndPoint.Admin.Skill.FILTER)
    public ResponseEntity<Map<String, List<ItemFilter>>> filterSkill() {
        return ResponseEntity.ok(MetaFilter.convert(RequestPage.Skill.class));
    }

    @GetMapping(EndPoint.Admin.Major.FILTER)
    public ResponseEntity<Map<String, List<ItemFilter>>> filterMajor() {
        return ResponseEntity.ok(MetaFilter.convert(RequestPage.Major.class));
    }

    @GetMapping(EndPoint.Admin.Language.FILTER)
    public ResponseEntity<Map<String, List<ItemFilter>>> filterLanguage() {
        return ResponseEntity.ok(MetaFilter.convert(RequestPage.Language.class));
    }

    @GetMapping(EndPoint.Admin.Role.FILTER)
    public ResponseEntity<Map<String, List<ItemFilter>>> filterRole() {
        return ResponseEntity.ok(MetaFilter.convert(RequestPage.Role.class));
    }

    @GetMapping(EndPoint.Job.FILTER)
    public ResponseEntity<Map<String, List<ItemFilter>>> filterJob() {
        return ResponseEntity.ok(MetaFilter.convert(RequestPage.Job.class));
    }

    @GetMapping(EndPoint.Admin.Client.FILTER)
    public ResponseEntity<Map<String, List<ItemFilter>>> filterUser() {
        return ResponseEntity.ok(MetaFilter.convert(RequestPage.Cilent.class));
    }

    @GetMapping(EndPoint.Admin.Staff.FILTER)
    public ResponseEntity<Map<String, List<ItemFilter>>> filterStaff() {
        return ResponseEntity.ok(MetaFilter.convert(RequestPage.Staff.class));
    }
}
