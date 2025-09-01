package com.freelancer.websocket;

import java.util.HashMap;
import java.util.Map;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import com.freelancer.utils.TypeWS;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RealtimeWS {
    private final SimpMessagingTemplate template;

    public void sendWS(Integer userId, TypeWS type, Object Data) {
        String destination = "/queue/data";
        Map<String, Object> payload = new HashMap<>();
        payload.put("type", type);
        payload.put("payload", Data);
        template.convertAndSendToUser(userId.toString(), destination, payload);
    }

    public void sendWS(Integer userId, TypeWS type) {
        sendWS(userId, type, null);
    }

    public void sendWSAll(TypeWS type, Object Data) {
        String destination = "/topic/broadcast";
        Map<String, Object> payload = new HashMap<>();
        payload.put("type", type);
        payload.put("payload", Data);
        template.convertAndSend(destination, payload);
    }

    @Data
    @AllArgsConstructor
    static class NotificationMessage {
        private String content;
    }
}
