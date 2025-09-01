package com.freelancer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.requests.RequestForm;
import com.freelancer.dto.responses.ResponseDetail;
import com.freelancer.service.ServiceAuth;
import com.freelancer.utils.EndPoint;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class ControllerAuth {
    private final ServiceAuth serviceAuth;

    @PostMapping(EndPoint.Auth.LOGIN)
    public ResponseEntity<String> login(@Valid @RequestBody RequestForm.Login request) {
        return ResponseEntity.ok(serviceAuth.login(request));
    }

    @PostMapping(EndPoint.Auth.REGISTER)
    public ResponseEntity<String> register(@PathVariable String role,
            @Valid @RequestBody RequestForm.Register request) {
        return ResponseEntity.ok(serviceAuth.register(request, role));
    }

    @PreAuthorize("hasAnyRole('FREELANCER','NHA_TUYEN_DUNG')")
    @GetMapping(EndPoint.Me.BASE)
    public ResponseEntity<ResponseDetail.MeClient> meCilent() {
        return ResponseEntity.ok(serviceAuth.meClient());
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping(EndPoint.Admin.ME)
    public ResponseEntity<ResponseDetail.MeAdmin> meAdmin() {
        return ResponseEntity.ok(serviceAuth.meAdmin());
    }

}
