package com.freelancer.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.service.ServiceFileStorage;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerFile {
    private final ServiceFileStorage fileStorage;

    @PostMapping("/api/files/presigned-upload")
    public ResponseEntity<String> getPresignedUrl(@RequestBody Map<String, Object> req) {
        try {
            String url = fileStorage.generatePresignedUploadUrl(((String) req.get("fileName")), 15);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Error generating presigned URL: " + e.getMessage());
        }
    }
}
