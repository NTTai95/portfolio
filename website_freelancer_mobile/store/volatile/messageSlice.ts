import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MessageType = 'info' | 'warning' | 'success' | 'error' | 'loading';

export interface MessageState {
    key: string;
    type: MessageType;
    content: string;
    duration?: number;
    action: 'add' | 'remove' | 'clearAll';
    timestamp?: number;
}

const initialState: MessageState = {
    key: '',
    type: 'info',
    content: '',
    action: 'add',
};

type MessagePayload = Omit<MessageState, 'action'>;

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<MessagePayload>) => {
            Object.assign(state, { ...action.payload, action: 'add', timestamp: Date.now() });
        },
        removeMessage: (state, action: PayloadAction<{ key: string }>) => {
            Object.assign(state, {
                key: action.payload.key,
                action: 'remove',
            });
        },
        clearAllMessages: (state) => {
            Object.assign(state, {
                action: 'clearAll',
            });
        }
    },
});

export const { addMessage, removeMessage, clearAllMessages } = messageSlice.actions;
export default messageSlice.reducer;
