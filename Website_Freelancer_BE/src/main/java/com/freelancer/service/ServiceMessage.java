package com.freelancer.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.freelancer.dto.responses.ResponseDetail;
import com.freelancer.dto.responses.ResponseDetail.Conversation;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mogodb.repository.RepositoryMessage;
import com.freelancer.mysql.model.Client;
import com.freelancer.mysql.repository.RepositoryClient;
import com.freelancer.utils.TypeWS;
import com.freelancer.websocket.RealtimeWS;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceMessage {
    private final RepositoryMessage repositoryMessage;
    private final RepositoryClient repositoryClient;
    private final RealtimeWS realtimeWS;

    public void getConversations(Integer userId) {
        List<ResponseDetail.Conversation> conversations = new ArrayList<>();
        var temp = repositoryMessage.findConversations(userId);
        temp.forEach((doc) -> {
            conversations.add(fromAggregation(doc));
        });

        realtimeWS.sendWS(userId, TypeWS.CONVERSATIONS, conversations);
    }

    private Conversation fromAggregation(Map<String, Object> doc) {
        Conversation c = new Conversation();
        Client client = repositoryClient.findById((Integer) doc.get("_id"))
                .orElseThrow(() -> new DataConflictException("Không tìm thấy người dùng"));
        c.setUserId(client.getId());
        c.setAvatar(client.getAvatar());
        c.setFullName(client.getFullName());
        c.setId(doc.get("messageId").toString());
        c.setLastMessage((String) doc.get("lastMessage"));
        c.setLastTime((long) doc.get("lastTime"));
        c.setUnreadCount(((Number) doc.get("unreadCount")).longValue());
        c.setLastIsRecall((Boolean) doc.get("lastIsRecall"));
        c.setLastSenderId(((Number) doc.get("lastSenderId")).intValue());
        return c;
    }
}
