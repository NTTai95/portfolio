import type { RootState } from '@/store';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const toastConfig = {
    success: ({ text1 }: { text1?: string }) => (
        <View style={[styles.toast, styles.success]}>
            <AntDesign name="checkcircle" size={20} color="white" />
            <Text style={styles.toastText}>{text1}</Text>
        </View>
    ),
    error: ({ text1 }: { text1?: string }) => (
        <View style={[styles.toast, styles.error]}>
            <AntDesign name="closecircle" size={20} color="white" />
            <Text style={styles.toastText}>{text1}</Text>
        </View>
    ),
    info: ({ text1 }: { text1?: string }) => (
        <View style={[styles.toast, styles.info]}>
            <AntDesign name="infocirlce" size={20} color="white" />
            <Text style={styles.toastText}>{text1}</Text>
        </View>
    ),
    notification: ({ text1, text2 }: { text1?: string; text2?: string }) => (
        <View style={[styles.toast, styles.notification]}>
            <Text style={styles.notificationTitle}>{text1}</Text>
            {text2 && <Text style={styles.notificationDescription}>{text2}</Text>}
        </View>
    )
};

const GlobalNotification = () => {
    const ntf = useSelector((state: RootState) => state.volatile.notification);

    useEffect(() => {
        if (ntf.key === '') return;

        switch (ntf.action) {
            case 'clearAll':
            case 'remove':
                Toast.hide();
                break;
            default:
                Toast.show({
                    type: ntf.type,
                    text1: ntf.message,
                    text2: ntf.description,
                    visibilityTime: ntf.duration || 4000,
                    position: ntf.placement === 'top' ? 'top' : 'bottom',
                    autoHide: true,
                });
                break;
        }
    }, [ntf.key, ntf.timestamp]);

    return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        marginVertical: 5,
        width: '90%',
        ...Platform.select({
            android: {
                elevation: 4,
            },
        }),
    },
    toastText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 14,
        flexShrink: 1,
    },
    success: {
        backgroundColor: '#4CAF50',
    },
    error: {
        backgroundColor: '#F44336',
    },
    info: {
        backgroundColor: '#2196F3',
    },
    notification: {
        backgroundColor: 'white',
        borderLeftWidth: 5,
        borderLeftColor: '#4F86FF',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    notificationTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    notificationDescription: {
        fontSize: 14,
        color: '#666',
    },
});

export default GlobalNotification;
