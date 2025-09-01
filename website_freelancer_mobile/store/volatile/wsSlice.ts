import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Conversation = {
    id: string;
    lastMessage: string;
    lastTime: string;
    fullName: string;
    avatar: string;
    userId: number;
    unreadCount: number;
    lastIsRecall: boolean;
    lastSenderId: number;
};

type WsMessage = {
    type: "NOTIFICATIONS" | "ADD_NOTIFICATION" | "REMOVE_NOTIFICATION" |
    "READ_NOTIFICATION" | "READ_ALL_NOTIFICATION" | "REMOVE_ALL_NOTIFICATION" |
    "ADD_ACTIVE_USERS" | "REMOVE_ACTIVE_USERS" | "CONVERSATIONS" | "UPDATE_CONVERSATIONS" |
    "READ_CONVERSATION_USER_ID" | "ACTIVE_USERS" | "UPDATE_REALTIME_CONVERSATION" |
    "UPDATE_REALTIME_CONVERSATION_RECALL" | "UPDATE_CONVERSATION_RECALL" | "UPDATE_CONVERSATION_ME"
    payload: any;
};

interface WsState {
    notifications: any[];
    conversationList: Conversation[];
    activeUsers: number[];
}

const initialState: WsState = {
    notifications: [],
    conversationList: [],
    activeUsers: []
};

const wsSlice = createSlice({
    name: "ws",
    initialState,
    reducers: {
        handleWS(state, action: PayloadAction<WsMessage>) {
            const { type, payload } = action.payload;

            if (
                (type === 'NOTIFICATIONS' || type === 'ADD_NOTIFICATION') &&
                payload?.link
            ) {
                payload.link = normalizeLink(payload.link);
            }

            switch (type) {
                case "NOTIFICATIONS":
                    state.notifications = payload;
                    break;
                case "ADD_NOTIFICATION":
                    state.notifications.push(payload);
                    state.notifications.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    break;
                case "REMOVE_NOTIFICATION":
                    state.notifications = state.notifications.filter((notif: any) => notif.id !== payload);
                    break;
                case "READ_NOTIFICATION":
                    const notification = state.notifications.find((notif: any) => notif.id === payload);
                    if (notification) {
                        notification.read = true;
                    }
                    break;
                case "READ_ALL_NOTIFICATION":
                    state.notifications.forEach((notif: any) => {
                        notif.read = true;
                    });
                    break;
                case "REMOVE_ALL_NOTIFICATION":
                    state.notifications = [];
                    break;
                case "ACTIVE_USERS":
                    state.activeUsers = payload;
                    break;
                case "ADD_ACTIVE_USERS":
                    state.activeUsers.push(payload);
                    break;
                case "REMOVE_ACTIVE_USERS":
                    state.activeUsers = state.activeUsers.filter((user) => user !== payload);
                    break;
                case "CONVERSATIONS":
                    state.conversationList = payload;
                    break;
                case "UPDATE_CONVERSATIONS":
                    {
                        if (Array.isArray(payload)) {
                            payload.forEach((updated) => {
                                const index = state.conversationList.findIndex(c => c.id === updated.id);
                                let ucTemp = 0;
                                if (index !== -1) {
                                    ucTemp = state.conversationList[index].unreadCount;
                                    state.conversationList.splice(index, 1);
                                }
                                state.conversationList.push({ ...updated, unreadCount: ucTemp + 1 });
                            });
                        } else {
                            const index = state.conversationList.findIndex(c => c.userId === payload.userId);
                            let ucTemp = 0;
                            if (index !== -1) {
                                ucTemp = state.conversationList[index].unreadCount;
                                state.conversationList.splice(index, 1);
                            }
                            state.conversationList.push({ ...payload, unreadCount: ucTemp + 1 });
                        }
                        break;
                    }
                case "UPDATE_CONVERSATION_ME":
                    {
                        const index = state.conversationList.findIndex(c => c.userId === payload.userId);
                        if (index !== -1) {
                            state.conversationList.splice(index, 1);
                        }
                        state.conversationList.push({ ...payload });
                        break;
                    }
                case "READ_CONVERSATION_USER_ID":
                    {
                        const conversation = state.conversationList.find(c => c.userId === payload);
                        if (conversation) {
                            conversation.unreadCount = 0;
                        }
                    }
                    break;
                case "UPDATE_REALTIME_CONVERSATION":
                    {
                        const index = state.conversationList.findIndex(c => c.userId === payload.id);
                        if (index !== -1) {
                            state.conversationList[index] = { ...state.conversationList[index], lastMessage: payload.lastMessage, lastTime: payload.lastTime, lastSenderId: payload.lastSenderId };
                        }
                    }
                    break;
                case "UPDATE_CONVERSATION_RECALL":
                    {
                        const index = state.conversationList.findIndex(c => c.id === payload);
                        if (index !== -1) {
                            state.conversationList[index] = { ...state.conversationList[index], lastIsRecall: true };
                        }
                    }
                    break;
                case "UPDATE_REALTIME_CONVERSATION_RECALL":
                    {
                        const index = state.conversationList.findIndex(c => c.id === payload);
                        if (index !== -1) {
                            state.conversationList[index] = { ...state.conversationList[index], lastIsRecall: true };
                        }
                    }
                    break;
                default:
                    console.warn("Unhandled WS type:", type);
            }
        },
        resetWsState() {
            return initialState;
        },
    },
});

function normalizeLink(link: string): string {
    // Bỏ qua xử lý domain trong React Native
    return link;
}


export const { handleWS, resetWsState } = wsSlice.actions;
export default wsSlice.reducer;
