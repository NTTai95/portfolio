// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

// Import reducers
import authSlice from './persistent/auth';
import { persistConfig } from './persistent/persistConfig';
import messageReducer from './volatile/messageSlice';
import notificationReducer from './volatile/notificationSlice';
import spinReducer from './volatile/spinSlice';
import wsReducer from './volatile/wsSlice';

// Combine persistent reducers
const persistentReducers = combineReducers({
    auth: authSlice,
});

// Apply persistence
const persistedReducer = persistReducer(persistConfig, persistentReducers);

// Combine all reducers
const rootReducer = combineReducers({
    persistent: persistedReducer,
    volatile: combineReducers({
        spin: spinReducer,
        message: messageReducer,
        notification: notificationReducer,
        ws: wsReducer,
    }),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;