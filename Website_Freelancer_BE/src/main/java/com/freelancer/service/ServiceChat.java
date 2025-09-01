package com.freelancer.service;

import java.util.Map;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.freelancer.dto.responses.ResponseDetail;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mogodb.document.Message;
import com.freelancer.mogodb.repository.RepositoryMessage;
import com.freelancer.mysql.model.Client;
import com.freelancer.mysql.repository.RepositoryClient;
import com.freelancer.utils.TypeWS;
import com.freelancer.websocket.ChatStore;
import com.freelancer.websocket.RealtimeWS;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceChat {
        private final RepositoryMessage repositoryMessage;
        private final RepositoryClient repositoryClient;
        private final SimpMessagingTemplate template;
        private final RealtimeWS realtimeWS;
        private final ChatStore chatStore;

        public Message sendMessage(Integer senderId, Integer receiverId, String content) {
                boolean isChated = chatStore.isChated(senderId, receiverId);

                Message message = new Message();
                message.setSenderId(senderId);
                message.setReceiverId(receiverId);
                message.setContent(content);
                message.setTimestamp(System.currentTimeMillis());
                message.setRead(isChated);

                message = repositoryMessage.save(message);

                if (isChated) {
                        // Gửi tin nhắn cho receiver
                        template.convertAndSendToUser(receiverId.toString(),
                                        "/queue/chat/" + senderId, Map.of("message", message));

                        realtimeWS.sendWS(receiverId, TypeWS.UPDATE_REALTIME_CONVERSATION,
                                        Map.of("id", senderId, "lastMessage", message.getContent(),
                                                        "lastTime", message.getTimestamp(),
                                                        "lastSenderId", message.getSenderId()));
                } else {
                        // chưa từng chat → tạo conversation mới
                        Client sender = repositoryClient.findById(senderId)
                                        .orElseThrow(() -> new DataConflictException(
                                                        "Người dùng không tồn tại: " + senderId));
                        Client receiver = repositoryClient.findById(receiverId)
                                        .orElseThrow(() -> new DataConflictException(
                                                        "Người dùng không tồn tại: " + receiverId));

                        ResponseDetail.Conversation c = new ResponseDetail.Conversation();
                        c.setAvatar(sender.getAvatar());
                        c.setFullName(sender.getFullName());
                        c.setUserId(sender.getId());
                        c.setId(message.getId());
                        c.setLastMessage(message.getContent());
                        c.setLastTime(message.getTimestamp());
                        c.setLastSenderId(message.getSenderId());

                        realtimeWS.sendWS(receiverId, TypeWS.UPDATE_CONVERSATIONS, c);

                        c.setAvatar(receiver.getAvatar());
                        c.setFullName(receiver.getFullName());
                        c.setUserId(receiver.getId());
                        realtimeWS.sendWS(senderId, TypeWS.UPDATE_CONVERSATION_ME, c);
                }

                // Gửi lại cho sender
                template.convertAndSendToUser(senderId.toString(), "/queue/chat/" + receiverId,
                                Map.of("message", message));

                realtimeWS.sendWS(senderId, TypeWS.UPDATE_REALTIME_CONVERSATION,
                                Map.of("id", receiverId, "lastMessage", message.getContent(),
                                                "lastTime", message.getTimestamp(), "lastSenderId",
                                                message.getSenderId()));

                return message;
        }
}
