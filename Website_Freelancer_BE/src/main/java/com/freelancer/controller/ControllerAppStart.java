package com.freelancer.controller;

import java.security.Principal;
import java.util.Set;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.utils.TypeWS;
import com.freelancer.websocket.ActiveUserStore;
import com.freelancer.websocket.RealtimeWS;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerAppStart {
    private final ActiveUserStore activeUserStore;
    private final RealtimeWS ws;

    @MessageMapping("/ready")
    public void onReady(Principal user) {
        Set<Integer> activeUsers = activeUserStore.getAll();
        ws.sendWSAll(TypeWS.ACTIVE_USERS, activeUsers);
    }
}
