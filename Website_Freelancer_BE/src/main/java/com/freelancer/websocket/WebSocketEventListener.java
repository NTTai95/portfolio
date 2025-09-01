package com.freelancer.websocket;

import java.security.Principal;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import com.freelancer.service.ServiceMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {
    private final ServiceMessage serviceMessage;
    private final WebSocketDisconnectService disconnectService;
    private final WebSocketSubscribeService subscribeService;
    private final ChatStore chatStore;

    @EventListener
    public void handleSubscribeEvent(SessionSubscribeEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        String des = sha.getDestination();
        Principal user = sha.getUser();

        if (des == null || user == null)
            return;
        if (des.endsWith("/queue/data")) {
            serviceMessage.getConversations(Integer.parseInt(user.getName()));
            subscribeService.handleSubscribe(user);
        } else if (des.contains("/queue/chat")) {
            chatStore.add(sha.getSessionId(),
                    Integer.parseInt(des.substring(des.lastIndexOf("/") + 1)),
                    Integer.parseInt(user.getName()));
        }
    }

    @EventListener
    public void handleDisconnectEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        if (!chatStore.remove(sha.getSessionId())) {
            disconnectService.handleDisconnect(event);
        }
    }
}
