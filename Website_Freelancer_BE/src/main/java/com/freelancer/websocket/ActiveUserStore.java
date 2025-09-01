package com.freelancer.websocket;

import java.util.HashSet;
import java.util.Set;
import org.springframework.stereotype.Component;
import com.freelancer.utils.TypeWS;

@Component
public class ActiveUserStore {
    private final RealtimeWS ws;

    private static final Set<Integer> activeUsers = new HashSet<>();

    public ActiveUserStore(RealtimeWS ws) {
        this.ws = ws;
    }

    public void add(Integer userId) {
        activeUsers.add(userId);

        ws.sendWSAll(TypeWS.ADD_ACTIVE_USERS, userId);
    }

    public void remove(Integer userId) {
        activeUsers.remove(userId);

        ws.sendWSAll(TypeWS.REMOVE_ACTIVE_USERS, userId);
    }

    public boolean isLoggedIn(Integer userId) {
        return activeUsers.contains(userId);
    }

    public Set<Integer> getAll() {
        return activeUsers;
    }
}
