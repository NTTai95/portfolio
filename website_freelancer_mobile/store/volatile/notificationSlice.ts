// src/store/notificationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
    key: string;
    message: string;
    description: string;
    type: 'success' | 'info' | 'warning' | 'error';
    duration?: number;
    showProgress?: boolean;
    pauseOnHover?: boolean;
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'top' | 'bottom';
    action: 'add' | 'remove' | 'clearAll';
    timestamp?: number;
}

const initialState: NotificationState = {
    key: '',
    message: '',
    description: '',
    type: 'info',
    action: 'add',

};

type NotificationPayload = {
    key: string;
    message: string;
    description: string;
    type: 'success' | 'info' | 'warning' | 'error';
    duration?: number;
    showProgress?: boolean;
    pauseOnHover?: boolean;
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'top' | 'bottom';
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<NotificationPayload>) => {
            Object.assign(state, { ...action.payload, action: 'add', timestamp: Date.now() });
        },

        removeNotification: (state, action: PayloadAction<{ key: string }>) => {
            Object.assign(state, {
                key: action.payload.key,
                action: 'remove',
            });
        },

        clearAllNotifications: (state) => {
            Object.assign(state, {
                action: 'clearAll',
            });
        }
    },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
