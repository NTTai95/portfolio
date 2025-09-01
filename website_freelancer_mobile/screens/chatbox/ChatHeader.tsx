// components/chat/ChatHeader.tsx
import { RootState } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useSelector } from "react-redux";

interface ChatHeaderProps {
    receiverId: number | string | undefined;
    receiver?: {
        avatar?: string;
        fullName?: string;
    };
}

const ChatHeader = ({ receiverId, receiver }: ChatHeaderProps) => {
    const isOnline = useSelector((state: RootState) =>
        receiverId ? state.volatile.ws.activeUsers.includes(receiverId as number) : false
    );

    useEffect(() => {
        if (receiver) return;
        console.log(receiverId);
    }, [receiver]);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#fff"
                    style={{ marginRight: 20 }}
                    onPress={() => navigation.goBack()}
                />
                {receiver?.avatar ? (
                    <Image
                        source={{ uri: receiver.avatar }}
                        style={styles.avatar}
                    />
                ) : (
                    <View style={[styles.avatar, styles.defaultAvatar]}>
                        <Text style={styles.avatarText}>
                            {receiver?.fullName?.charAt(0) || 'U'}
                        </Text>
                    </View>
                )}

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>
                        {receiver?.fullName || "Người dùng"}
                    </Text>
                    <View style={styles.statusContainer}>
                        <View
                            style={[
                                styles.statusDot,
                                isOnline ? styles.onlineDot : styles.offlineDot
                            ]}
                        />
                        <Text style={styles.statusText}>
                            {isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#1890ff',
        borderBottomWidth: 1,
        borderBottomColor: '#0050b3',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
    },
    defaultAvatar: {
        backgroundColor: '#87d068',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    infoContainer: {
        marginLeft: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    onlineDot: {
        backgroundColor: '#52c41a',
    },
    offlineDot: {
        backgroundColor: '#bfbfbf',
    },
    statusText: {
        fontSize: 12,
        color: '#e6f7ff',
    },
});

export default ChatHeader;