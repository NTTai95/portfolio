package com.freelancer.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.requests.RequestPage;
import com.freelancer.dto.responses.ResponseRecord;
import com.freelancer.service.ServicePage;
import com.freelancer.utils.EndPoint;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class ControllerPage {
    private final ServicePage servicePage;

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Skill.BASE)
    public ResponseEntity<Page<ResponseRecord.Skill>> pageSkill(
            @Valid @ModelAttribute RequestPage.Skill param) {
        return ResponseEntity.ok(servicePage.skillPage(param));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Major.BASE)
    public ResponseEntity<?> pageMajor(@Valid @ModelAttribute RequestPage.Major param) {
        return ResponseEntity.ok(servicePage.majorPage(param));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Language.BASE)
    public ResponseEntity<?> pageLanguage(@Valid @ModelAttribute RequestPage.Language param) {
        return ResponseEntity.ok(servicePage.languagePage(param));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Role.BASE)
    public ResponseEntity<?> pageRole(@Valid @ModelAttribute RequestPage.Role param) {
        return ResponseEntity.ok(servicePage.rolePage(param));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Client.BASE)
    public ResponseEntity<Page<ResponseRecord.Client>> pageClient(
            @Valid @ModelAttribute RequestPage.Cilent param) {
        return ResponseEntity.ok(servicePage.clientPage(param));
    }

    @PreAuthorize("hasRole('FREELANCER')")
    @GetMapping(EndPoint.Job.BASE)
    public ResponseEntity<Page<ResponseRecord.Job>> pageJob(
            @Valid @ModelAttribute RequestPage.Job param) {
        return ResponseEntity.ok(servicePage.jobPage(param));
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.Staff.BASE)
    public ResponseEntity<Page<ResponseRecord.Staff>> pageStaff(
            @Valid @ModelAttribute RequestPage.Cilent param) {
        return ResponseEntity.ok(servicePage.staffPage(param));
    }

    @PreAuthorize("hasRole('FREELANCER')")
    @GetMapping(EndPoint.Me.APPLIES)
    public ResponseEntity<Page<ResponseRecord.MeApplies>> mePageApplies(
            @Valid @ModelAttribute RequestPage.MeApplies param) {
        return ResponseEntity.ok(servicePage.meAppliesPage(param));
    }

    @PreAuthorize("hasAnyRole('FREELANCER', 'NHA_TUYEN_DUNG')")
    @GetMapping(EndPoint.Me.REVIEWS)
    public ResponseEntity<Page<ResponseRecord.MeReviews>> mePageReviews(
            @Valid @ModelAttribute RequestPage.MeReviews param) {
        return ResponseEntity.ok(servicePage.meReviewsPage(param));
    }

    @PreAuthorize("hasAnyRole('NHA_TUYEN_DUNG', 'FREELANCER')")
    @GetMapping(EndPoint.Me.JOBS_IN_PROGRESS)
    public ResponseEntity<Page<ResponseRecord.MeJobsInProgress>> mePageJobsInProgress(
            @Valid @ModelAttribute RequestPage.MeJobsInProgress param) {
        return ResponseEntity.ok(servicePage.meJobsInProgressPage(param));
    }
}
