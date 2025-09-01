// src/store/volatile/spinSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpinState {
    size?: 'small' | 'default' | 'large',
    styleIndicator?: object;
    delay?: number;
    spinning?: boolean;
    percent?: number | 'auto';
    time?: number;
    indicator?: number;
    preventLeave?: boolean;
    sizeFile?: number;
}

const initialState: SpinState = {
    delay: undefined,
    spinning: false,
    percent: undefined,
    time: undefined,
};

type SpinPayload = Omit<Partial<SpinState>, 'spinning'>;

const spinSlice = createSlice({
    name: 'spin',
    initialState,
    reducers: {
        showSpin(state, action: PayloadAction<SpinPayload | undefined>) {
            Object.assign(state, {
                ...action.payload,
                spinning: true,
            });
        },

        hideSpin(state) {
            Object.assign(state, initialState);
        },
    },
});

export const { showSpin, hideSpin } = spinSlice.actions;
export default spinSlice.reducer;
