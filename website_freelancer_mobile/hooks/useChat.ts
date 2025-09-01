import { Client, StompSubscription } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client"; // ✅ không dùng /dist/sockjs
import { RootState } from "../store";
import { useAuthorization } from "./useAuthorization";

export default function useChatWebSocket(
    receiverId: number,
    setIsLoadingHistory: (isLoading: boolean) => void
) {
    const token = useSelector((state: RootState) => state.persistent.auth.accessToken);
    const isAuthenticated = useAuthorization();

    const [messages, setMessages] = useState<any[]>([]);
    const [receiver, setReceiver] = useState<any>(null);
    const [iso, setIso] = useState<number>(Date.now());
    const clientRef = useRef<Client | null>(null);
    const subscriptionRef = useRef<StompSubscription | null>(null);

    useEffect(() => {
        if (!isAuthenticated || !token) return;

        if (clientRef.current) {
            console.log("⚠️ Client already exists, skip init");
            return;
        }

        const WS_URL = "https://api.bugfreezonefreelancer.id.vn/ws";
        const socket = new SockJS(`${WS_URL}?token=${token}`);

        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });

        client.onConnect = () => {
            console.log("✅ Connected to WS");
        };

        client.onStompError = (frame) => {
            console.error("🛑 Broker error:", frame.headers["message"]);
        };

        client.activate();
        clientRef.current = client;

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
                subscriptionRef.current = null;
            }
            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!clientRef.current || !receiverId) return;

        const client = clientRef.current;

        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
            subscriptionRef.current = null;
        }

        const subscribeAndFetch = () => {
            subscriptionRef.current = client.subscribe(
                `/user/queue/chat/${receiverId}`,
                (msg) => {
                    try {
                        const data = JSON.parse(msg.body);

                        if (data.receiver) {
                            setReceiver(data.receiver);
                        }

                        if (data.isLatestQuery && data?.messages && data.messages.length > 0) {
                            setMessages(data.messages);
                            setIso(data.messages[0].timestamp);
                            return;
                        }

                        if (data?.messages && data?.messages?.length > 0) {
                            setMessages((prev) => [...data.messages, ...prev]);
                            setIso(data.messages[0].timestamp);
                        } else {
                            setIsLoadingHistory(false);
                        }

                        if (data?.message) {
                            setMessages((prev) => [...prev, data.message]);
                        }

                        if (data?.senderIsRead) {
                            setMessages((prev) =>
                                prev.map((m) => ({
                                    ...m,
                                    read: true,
                                }))
                            );
                        }

                        if (data?.recall) {
                            setMessages((prev) =>
                                prev.map((m) =>
                                    m.id === data.recall ? { ...m, recall: true } : m
                                )
                            );
                        }
                    } catch (err) {
                        console.error("❌ Failed to parse WS message", err);
                    }
                }
            );

            client.publish({
                destination: "/app/chat/history",
                body: JSON.stringify({
                    receiverId,
                    iso: Date.now(),
                }),
            });
        };

        if (client.connected) {
            console.log("-- Connected, subscribe and fetch");
            setIso(Date.now());
            setMessages([]);
            subscribeAndFetch();
        } else {
            const originalOnConnect = client.onConnect;
            client.onConnect = (frame) => {
                console.log("✅ Connected to WS (from receiver effect)");
                originalOnConnect?.(frame);
                subscribeAndFetch();
            };
        }

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
                subscriptionRef.current = null;
            }
        };
    }, [receiverId]);

    const sendMessage = (content: string) => {
        if (!clientRef.current || !clientRef.current?.connected) {
            console.error("🚫 Cannot send message. Not connected.");
            return;
        }

        const messagePayload = { receiverId, content };

        clientRef.current.publish({
            destination: "/app/chat/send",
            body: JSON.stringify(messagePayload),
        });
    };

    const moreHistory = () => {
        console.log("Loading more messages...");
        if (!clientRef.current || !clientRef.current.connected) {
            console.error("🚫 Cannot load more message. Not connected.");
            return;
        }

        clientRef.current.publish({
            destination: "/app/chat/history",
            body: JSON.stringify({
                receiverId,
                iso,
            }),
        });
    };

    const handleRecall = (messageId: number) => {
        if (!clientRef.current || !clientRef.current.connected) {
            console.error("🚫 Cannot recall message. Not connected.");
            return;
        }

        clientRef.current.publish({
            destination: `/app/chat/recall/${messageId}`,
        });
    };

    return { receiver, messages, sendMessage, moreHistory, handleRecall };
}
