import { handleWS } from "@/store/volatile/wsSlice";
import { Client } from "@stomp/stompjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useAuthorization } from "./useAuthorization";

// 👇 Quan trọng: import SockJS từ sockjs-client
import SockJS from 'sockjs-client';

export default function useWebSocket() {
    const token = useSelector((state: RootState) => state.persistent.auth.accessToken);
    const isAuthenticated = useAuthorization();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated || !token) return;

        const WS_URL = "https://api.bugfreezonefreelancer.id.vn/ws";

        // 👇 Tạo SockJS connection (cần /ws không có ?token, thêm token thủ công)
        const socket = new SockJS(`${WS_URL}?token=${token}`);

        const client = new Client({
            webSocketFactory: () => socket as any, // RN không cần origin
            reconnectDelay: 5000,
        });

        client.onConnect = () => {

            client.subscribe("/user/queue/data", (msg) => {
                try {
                    dispatch(handleWS(JSON.parse(msg.body)));
                } catch (e) {
                    console.error("❌ Failed to parse /user/queue/data", e);
                }
            });

            client.subscribe("/topic/broadcast", (msg) => {
                try {
                    dispatch(handleWS(JSON.parse(msg.body)));
                } catch (e) {
                    console.error("❌ Failed to parse /topic/broadcast", e);
                }
            });

            client.publish({ destination: "/app/ready" });
        };

        client.onStompError = (frame) => {
            console.error("❌ Broker error:", frame.headers["message"]);
        };

        client.onWebSocketClose = (evt) => {
            console.warn("🔄 WebSocket closed", evt);
        };

        client.onDisconnect = () => {
            console.warn("🚪 Disconnected from WS");
        };

        client.activate();

        return () => {
            console.log("👋 Cleaning up WS connection");
            client.deactivate();
        };
    }, [token, dispatch, isAuthenticated]);
}
