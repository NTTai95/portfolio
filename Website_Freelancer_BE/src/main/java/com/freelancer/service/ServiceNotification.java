package com.freelancer.service;

import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import com.freelancer.mogodb.document.Notification;
import com.freelancer.mogodb.repository.RepositoryNotification;
import com.freelancer.utils.TypeWS;
import com.freelancer.websocket.RealtimeWS;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceNotification {
    private final RepositoryNotification repositoryNotification;
    private final RealtimeWS ws;

    public void sendNoticationWithUserId(Integer userId, String title, String content) {
        sendNoticationWithUserId(userId, title, content, null);
    }

    public void sendNoticationWithUserId(Integer userId, String title, String content,
            String link) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setTitle(title);
        if (link != null) {
            notification.setLink(link);
        }
        notification.setContent(content);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        Notification n = repositoryNotification.save(notification);

        ws.sendWS(userId, TypeWS.ADD_NOTIFICATION, n);
    }
}
