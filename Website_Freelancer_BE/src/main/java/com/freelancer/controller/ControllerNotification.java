package com.freelancer.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mogodb.document.Notification;
import com.freelancer.mogodb.repository.RepositoryNotification;
import com.freelancer.mysql.model.User;
import com.freelancer.service.ServiceNotification;
import com.freelancer.utils.SecurityUtil;
import com.freelancer.utils.TypeWS;
import com.freelancer.websocket.RealtimeWS;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class ControllerNotification {
    private final ServiceNotification service;
    private final RepositoryNotification repository;
    private final SecurityUtil securityUtil;
    private final RealtimeWS ws;

    @PostMapping
    @PreAuthorize("hasRole('QUAN_TRI')")
    public String createNotification(@RequestBody Notification request) {
        service.sendNoticationWithUserId(request.getUserId(), request.getTitle(),
                request.getContent());
        return "✅ Notification sent to " + request.getUserId();
    }

    @PutMapping("{id}/read")
    @PreAuthorize("hasAnyRole('FREELANCER','NHA_TUYEN_DUNG')")
    public ResponseEntity<?> readNotification(@PathVariable String id) {
        Notification n = repository.findById(id)
                .orElseThrow(() -> new DataConflictException("Notification not found"));

        n.setRead(true);
        repository.save(n);
        ws.sendWS(n.getUserId(), TypeWS.READ_NOTIFICATION, id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/read-all")
    @PreAuthorize("hasAnyRole('FREELANCER','NHA_TUYEN_DUNG')")
    public ResponseEntity<?> readAllNotification() {
        User user = securityUtil.getCurrentUser();
        List<Notification> ns =
                repository.findByUserIdAndIsReadFalse(user.getId()).stream().map(n -> {
                    n.setRead(true);
                    return n;
                }).toList();
        repository.saveAll(ns);
        ws.sendWS(user.getId(), TypeWS.READ_ALL_NOTIFICATION);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAnyRole('FREELANCER','NHA_TUYEN_DUNG')")
    public ResponseEntity<?> deleteNotification(@PathVariable String id) {
        Notification n = repository.findById(id)
                .orElseThrow(() -> new DataConflictException("Notification not found"));
        repository.delete(n);

        ws.sendWS(n.getUserId(), TypeWS.REMOVE_NOTIFICATION, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-all")
    @PreAuthorize("hasAnyRole('FREELANCER','NHA_TUYEN_DUNG')")
    public ResponseEntity<?> deleteAllNotification() {
        User user = securityUtil.getCurrentUser();
        repository.deleteAllByUserId(user.getId());
        ws.sendWS(user.getId(), TypeWS.REMOVE_ALL_NOTIFICATION);
        return ResponseEntity.noContent().build();
    }
}


