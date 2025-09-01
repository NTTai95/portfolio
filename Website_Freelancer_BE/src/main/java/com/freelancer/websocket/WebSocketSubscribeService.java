package com.freelancer.websocket;

import java.security.Principal;
import org.springframework.stereotype.Component;
import com.freelancer.mogodb.repository.RepositoryNotification;
import com.freelancer.utils.TypeWS;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketSubscribeService {
    private final RepositoryNotification repositoryNotification;
    private final ActiveUserStore activeUserStore;
    private final RealtimeWS ws;

    public void handleSubscribe(Principal user) {
        Integer userId = Integer.parseInt(user.getName());
        activeUserStore.add(userId);

        getAllNotifications(userId);
    }

    private void getAllNotifications(Integer userId) {
        var notifications = repositoryNotification.findByUserIdOrderByCreatedAtDesc(userId);
        ws.sendWS(userId, TypeWS.NOTIFICATIONS, notifications);
    }
}

