// store/auth.ts
import { apiMeAdmin, apiMeClient } from '@/api/auth';
import { AppDispatch, RootState } from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    sub: string;
    authorities: string[];
    iat: number;
    exp: number;
}
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    email: string | null;
    role: string | null;
    me: any | null;
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    email: null,
    role: null,
    me: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(
            state,
            action: PayloadAction<{ accessToken: string; refreshToken: string }>
        ) {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;

            try {
                const decoded = jwtDecode<JwtPayload>(accessToken);
                state.email = decoded.sub;
                state.role = decoded.authorities?.[0] || null;

                // Lưu token vào AsyncStorage
                AsyncStorage.setItem('accessToken', accessToken);
                AsyncStorage.setItem('refreshToken', refreshToken);
            } catch (err) {
                console.error('Invalid token', err);
                AsyncStorage.removeItem('accessToken');
                AsyncStorage.removeItem('refreshToken');
                Object.assign(state, initialState);
            }
        },

        setMe(state, action: PayloadAction<Partial<AuthState['me']>>) {
            state.me = {
                ...state.me,
                ...action.payload,
            };
        },

        clearAll(state) {
            // Xóa token trong AsyncStorage
            AsyncStorage.removeItem('accessToken');
            AsyncStorage.removeItem('refreshToken');

            // Reset toàn bộ redux
            Object.assign(state, initialState);

            // Xóa dữ liệu persist redux nếu dùng redux-persist
            AsyncStorage.removeItem('persist:root');
        },
    },
});

interface JwtPayload {
    sub: string;
    authorities: string[];
    iat: number;
    exp: number;
}

export const handleLoginWithToken = (
    { accessToken, refreshToken }: { accessToken: string; refreshToken: string }
) => async (dispatch: AppDispatch, getState: () => RootState): Promise<string | undefined> => {
    // Lưu cả accessToken và refreshToken vào Redux
    dispatch(setToken({
        accessToken,
        refreshToken
    }));

    try {
        // Giải mã accessToken để lấy quyền
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const authorities = decoded.authorities || [];
        const role = authorities[0] || '';

        // Gọi API tương ứng theo quyền
        if (role === 'ROLE_FREELANCER' || role === 'ROLE_NHA_TUYEN_DUNG') {
            apiMeClient().then((res) => {
                dispatch(setMe(res.data));
            });
        } else {
            apiMeAdmin().then((res) => {
                dispatch(setMe(res.data));
            });
        }
        return role;
    } catch (err) {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
    }
};

export const { setToken, setMe, clearAll } = authSlice.actions;
export default authSlice.reducer;