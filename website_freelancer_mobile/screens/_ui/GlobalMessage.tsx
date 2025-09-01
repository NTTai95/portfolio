// app_ui/GlobalMessage.tsx
import type { RootState } from '@/store';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const toastConfig = {
    success: ({ text1 }: { text1?: string }) => (
        <View style={[styles.toastContainer, styles.successContainer]}>
            <Text style={styles.toastText}>{text1}</Text>
        </View>
    ),
    error: ({ text1 }: { text1?: string }) => (
        <View style={[styles.toastContainer, styles.errorContainer]}>
            <Text style={styles.toastText}>{text1}</Text>
        </View>
    ),
    info: ({ text1 }: { text1?: string }) => (
        <View style={[styles.toastContainer, styles.infoContainer]}>
            <Text style={styles.toastText}>{text1}</Text>
        </View>
    ),
    loading: ({ text1 }: { text1?: string }) => (
        <View style={[styles.toastContainer, styles.loadingContainer]}>
            <ActivityIndicator size="small" color="#0000ff" />
            <Text style={styles.loadingText}>{text1}</Text>
        </View>
    )
};

const GlobalMessage = () => {
    const msg = useSelector((state: RootState) => state.volatile.message);

    useEffect(() => {
        if (msg.key === '') return;

        switch (msg.action) {
            case 'clearAll':
                Toast.hide();
                break;
            case 'remove':
                Toast.hide();
                break;
            default:
                Toast.show({
                    type: msg.type,
                    text1: msg.content,
                    visibilityTime: msg.type === 'loading' ? 0 : (msg.duration ?? 3) * 1000,
                    autoHide: msg.type !== 'loading'
                });
                break;
        }
    }, [msg.key, msg.timestamp]);


    return <Toast config={toastConfig} position="top" />;
};

const styles = StyleSheet.create({
    toastContainer: {
        width: '80%',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    successContainer: {
        backgroundColor: '#4CAF50',
    },
    errorContainer: {
        backgroundColor: '#F44336',
    },
    infoContainer: {
        backgroundColor: '#2196F3',
    },
    loadingContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    toastText: {
        color: 'white',
        fontSize: 14,
        flex: 1,
    },
    loadingText: {
        color: '#333',
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
    }
});

export default GlobalMessage;