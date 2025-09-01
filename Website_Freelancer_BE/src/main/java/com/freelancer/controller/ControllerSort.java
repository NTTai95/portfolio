package com.freelancer.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.requests.RequestPage;
import com.freelancer.utils.EndPoint;
import com.freelancer.utils.MetaSort;

@RestController
public class ControllerSort {

    @GetMapping(EndPoint.Admin.Skill.SORT)
    public ResponseEntity<List<String>> sortSkill() {
        return ResponseEntity.ok(MetaSort.convert(RequestPage.Skill.class));
    }

    @GetMapping(EndPoint.Admin.Major.SORT)
    public ResponseEntity<List<String>> sortMajor() {
        return ResponseEntity.ok(MetaSort.convert(RequestPage.Major.class));
    }

    @GetMapping(EndPoint.Admin.Language.SORT)
    public ResponseEntity<List<String>> sortLanguage() {
        return ResponseEntity.ok(MetaSort.convert(RequestPage.Language.class));
    }

    @GetMapping(EndPoint.Admin.Role.SORT)
    public ResponseEntity<List<String>> sortRole() {
        return ResponseEntity.ok(MetaSort.convert(RequestPage.Role.class));
    }

    @GetMapping(EndPoint.Job.SORT)
    public ResponseEntity<List<String>> sortJob() {
        return ResponseEntity.ok(MetaSort.convert(RequestPage.Job.class));
    }

    @GetMapping(EndPoint.Admin.Client.SORT)
    public ResponseEntity<List<String>> sortClient() {
        return ResponseEntity.ok(MetaSort.convert(RequestPage.Cilent.class));
    }

    @GetMapping(EndPoint.Admin.Staff.SORT)
    public ResponseEntity<List<String>> sortStaff() {
        return ResponseEntity.ok(MetaSort.convert(RequestPage.Staff.class));
    }
}
