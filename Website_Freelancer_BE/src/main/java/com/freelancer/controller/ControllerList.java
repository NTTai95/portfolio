package com.freelancer.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.responses.ResponseList;
import com.freelancer.service.ServiceList;
import com.freelancer.utils.EndPoint;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerList {
    private final ServiceList serviceList;

    @GetMapping(EndPoint.List.LANGUAGE)
    public ResponseEntity<List<ResponseList.Language>> listLanguage() {
        return ResponseEntity.ok(serviceList.listLanguage());
    }

    @GetMapping(EndPoint.List.SKILL)
    public ResponseEntity<List<ResponseList.Skill>> listSkill() {
        return ResponseEntity.ok(serviceList.listSkill());
    }

    @GetMapping(EndPoint.List.MAJOR)
    public ResponseEntity<List<ResponseList.Major>> listMajor() {
        return ResponseEntity.ok(serviceList.listMajor());
    }

    @GetMapping(EndPoint.List.ROLE)
    public ResponseEntity<List<ResponseList.Role>> listRole() {
        return ResponseEntity.ok(serviceList.listRole());
    }

    @GetMapping(EndPoint.List.PERMISSION)
    public ResponseEntity<List<ResponseList.Permission>> listPermission() {
        return ResponseEntity.ok(serviceList.listPermission());
    }
}
