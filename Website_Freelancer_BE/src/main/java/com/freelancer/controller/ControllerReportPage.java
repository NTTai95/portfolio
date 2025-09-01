package com.freelancer.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Report;
import com.freelancer.mysql.repository.RepositoryReport;
import com.freelancer.mysql.repository.RepositoryJob;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerReportPage {

    private final RepositoryReport repositoryReport;
    private final RepositoryJob jobRepository;

    @GetMapping("/job-report")
    public ResponseEntity<?> jobReport(
            @RequestParam(required = false) Report.Status status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {

        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, size);
        Page<Report> reportPage = repositoryReport.findByTypeJobAndStatus( status, pageable);
        List<Map<String, Object>> reportList = new ArrayList<>();

        for(Report report : reportPage) {
            Map<String, Object> reportData = new LinkedHashMap<>();
            reportData.put("id", report.getId());
            reportData.put("createdAt", report.getCreatedAt());
            Job job = jobRepository.findById(report.getObjectReportId())
                    .orElseThrow(() -> new RuntimeException("Job not found"));
            reportData.put("jobTitle",job.getTitle());
            reportData.put("jobContent", job.getDescription());
            reportData.put("employerName", job.getEmployer().getFullName());
            reportData.put("jobCreatedAt",job.getCreatedAt());
            reportData.put("reporter", report.getReporter().getFullName());
            reportData.put("content", report.getContent());
            reportData.put("createdAt", report.getCreatedAt());
            reportData.put("solver", report.getSolver().getFullName());
            reportData.put("status", report.getStatus().name());
            reportList.add(reportData);
        }
        return ResponseEntity.ok(reportList);

    }

}
