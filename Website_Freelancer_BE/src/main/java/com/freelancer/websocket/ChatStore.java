package com.freelancer.websocket;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Component
public class ChatStore {
    @Getter
    @Setter
    @AllArgsConstructor
    static class Chat {
        private Integer senderId;
        private Integer receiverId;
    }

    private final Map<String, Chat> chats = new HashMap<>();

    public void add(String sessionId, Integer senderId, Integer receiverId) {
        chats.put(sessionId, new Chat(senderId, receiverId));
    }

    public boolean remove(String sessionId) {
        return chats.remove(sessionId) != null;
    }

    public boolean isChated(Integer senderId, Integer receiverId) {
        return chats.values().stream().anyMatch(
                c -> c.getSenderId().equals(senderId) && c.getReceiverId().equals(receiverId));
    }
}
