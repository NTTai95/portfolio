package com.freelancer.controller;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mogodb.document.Message;
import com.freelancer.mogodb.repository.RepositoryMessage;
import com.freelancer.mysql.model.Client;
import com.freelancer.mysql.repository.RepositoryClient;
import com.freelancer.service.ServiceChat;
import com.freelancer.utils.TypeWS;
import com.freelancer.websocket.ChatStore;
import com.freelancer.websocket.RealtimeWS;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ControllerChat {
        private final RepositoryMessage repositoryMessage;
        private final RepositoryClient repositoryClient;
        private final SimpMessagingTemplate template;
        private final ChatStore chatStore;
        private final RealtimeWS realtimeWS;
        private final MongoTemplate mongoTemplate;
        private final ServiceChat serviceChat;

        /**
         * Lấy lịch sử chat
         */
        @MessageMapping("/chat/history")
        public void getChatHistory(Principal principal, ChatHistoryRequest request) {
                Integer userId = Integer.parseInt(principal.getName());
                Integer receiverId = request.getReceiverId();
                long timestamp = request.getIso();

                Client client = repositoryClient.findById(receiverId).orElseThrow(
                                () -> new DataConflictException("Người dùng không tồn tại"));
                Map<String, Object> receiver = Map.of("id", client.getId(), "avatar",
                                client.getAvatar(), "fullName", client.getFullName());

                // Thực hiện truy vấn
                List<Message> historys = repositoryMessage.findHistory(userId, receiverId,
                                timestamp,
                                PageRequest.of(0, 15, Sort.by("timestamp").descending()));
                Collections.reverse(historys);

                Query query = new Query(Criteria.where("senderId").is(receiverId).and("receiverId")
                                .is(userId).and("isRead").is(false));

                Update update = new Update().set("isRead", true);

                mongoTemplate.updateMulti(query, update, Message.class);

                realtimeWS.sendWS(userId, TypeWS.READ_CONVERSATION_USER_ID, receiverId);

                template.convertAndSendToUser(userId.toString(), "/queue/chat/" + receiverId,
                                Map.of("messages", historys, "receiver", receiver));

                if (chatStore.isChated(receiverId, userId)) {
                        template.convertAndSendToUser(receiverId.toString(),
                                        "/queue/chat/" + userId, Map.of("senderIsRead", true));
                }
        }

        /**
         * Gửi tin nhắn mới
         */
        @MessageMapping("/chat/send")
        public void sendChatMessage(Principal principal, ChatSendRequest request) {
                Integer senderId;
                try {
                        senderId = Integer.parseInt(principal.getName());
                } catch (NumberFormatException e) {
                        throw new IllegalArgumentException(
                                        "Invalid principal name: " + principal.getName());
                }

                serviceChat.sendMessage(senderId, request.getReceiverId(), request.getContent());
        }

        @MessageMapping("/chat/recall/{messageId}")
        public void recallChatMessage(Principal principal, @DestinationVariable String messageId) {
                Message message = repositoryMessage.findById(messageId).orElseThrow(
                                () -> new DataConflictException("Tin nhắn không tồn tại"));

                message.setRecall(true);
                repositoryMessage.save(message);

                boolean isChated =
                                chatStore.isChated(message.getSenderId(), message.getReceiverId());

                if (isChated) {
                        template.convertAndSendToUser(message.getReceiverId().toString(),
                                        "/queue/chat/" + message.getSenderId(),
                                        Map.of("recall", message.getId()));

                        realtimeWS.sendWS(message.getReceiverId(),
                                        TypeWS.UPDATE_REALTIME_CONVERSATION_RECALL,
                                        message.getId());
                } else {
                        realtimeWS.sendWS(message.getReceiverId(),
                                        TypeWS.UPDATE_CONVERSATION_RECALL, message.getId());
                }
                template.convertAndSendToUser(message.getSenderId().toString(),
                                "/queue/chat/" + message.getReceiverId(),
                                Map.of("recall", message.getId()));
        }

        /**
         * DTO yêu cầu lấy lịch sử
         */
        @Getter
        @Setter
        public static class ChatHistoryRequest {
                private Integer receiverId;
                private long iso;
        }

        /**
         * DTO gửi tin nhắn
         */
        @Getter
        @Setter
        public static class ChatSendRequest {
                private Integer receiverId;
                private String content;
        }
}
