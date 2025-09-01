import { RootState } from "@/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from 'react-redux';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale("vi");

const timeDisplay = (iso: string, now?: string) => {
    if (!iso) return '';
    const parsedTime = dayjs(iso).tz("Asia/Ho_Chi_Minh");
    const nowTime = now
        ? dayjs(now, "DD/MM/YYYY HH:mm:ss", true).tz("Asia/Ho_Chi_Minh")
        : dayjs().tz("Asia/Ho_Chi_Minh");

    if (!parsedTime.isValid()) {
        return 'Ngày giờ không hợp lệ';
    }

    const diffDays = nowTime.diff(parsedTime, 'day');

    if (diffDays < 7 && diffDays >= 0) {
        return parsedTime.from(nowTime);
    } else {
        return parsedTime.format("DD/MM/YYYY HH:mm");
    }
};

const Conversations = () => {
    const conversationList = useSelector(
        (state: RootState) => state.volatile.ws.conversationList
    );

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const meId = useSelector((state: RootState) => state.persistent.auth.me?.id);

    const renderItem = ({ item }: { item: typeof conversationList[0] }) => {
        const hasUnread = item.unreadCount > 0;

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('chatbox', { receiverId: item.userId })}
                style={[
                    styles.conversationItem
                ]}
            >
                {/* Avatar Container */}
                <View style={styles.avatarContainer}>
                    {item.avatar ? (
                        <Image
                            source={{ uri: item.avatar }}
                            style={[
                                styles.avatar
                            ]}
                        />
                    ) : (
                        <View style={[styles.avatar, styles.emptyAvatar]}>
                            <Text style={styles.avatarText}>
                                {item.fullName.charAt(0)}
                            </Text>
                        </View>
                    )}

                    {item.unreadCount > 0 && (
                        <View style={[
                            styles.badge,
                            item.unreadCount > 9 ? styles.badgeLarge : {}
                        ]}>
                            <Text style={styles.badgeText}>
                                {item.unreadCount > 9 ? '9+' : item.unreadCount}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Conversation Info */}
                <View style={styles.infoContainer}>
                    <View style={styles.header}>
                        <Text
                            style={[
                                styles.name,
                                hasUnread && styles.unreadName
                            ]}
                            numberOfLines={1}
                        >
                            {item.fullName}
                        </Text>
                        <Text
                            style={[
                                styles.time,
                                hasUnread && styles.unreadTime
                            ]}
                        >
                            {timeDisplay(item.lastTime)}
                        </Text>
                    </View>

                    <Text
                        style={[
                            styles.message,
                            hasUnread && styles.unreadMessage
                        ]}
                        numberOfLines={1}
                    >
                        {meId === item.lastSenderId ? "Bạn: " : ""}
                        {item.lastIsRecall ? (
                            <Text style={styles.recalledMessage}>
                                Tin nhắn đã được thu hồi
                            </Text>
                        ) : (
                            item.lastMessage || "Bắt đầu cuộc trò chuyện..."
                        )}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={conversationList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 8,
    },
    listContent: {
        paddingBottom: 16,
    },
    conversationItem: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedConversation: {
        backgroundColor: '#e6f7ff',
        borderLeftWidth: 3,
        borderLeftColor: '#1890ff',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedAvatar: {
        borderColor: '#1890ff',
        borderWidth: 2,
    },
    emptyAvatar: {
        backgroundColor: '#87d068',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#f5222d',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeLarge: {
        minWidth: 24,
        height: 24,
        borderRadius: 12,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        color: '#595959',
        flex: 1,
        marginRight: 8,
    },
    unreadName: {
        fontWeight: 'bold',
        color: '#000',
    },
    selectedName: {
        color: '#1890ff',
        fontWeight: 'bold',
    },
    time: {
        fontSize: 12,
        color: '#bfbfbf',
    },
    unreadTime: {
        color: '#1890ff',
        fontWeight: '500',
    },
    message: {
        fontSize: 14,
        color: '#8c8c8c',
    },
    unreadMessage: {
        color: '#262626',
        fontWeight: '500',
    },
    recalledMessage: {
        fontStyle: 'italic',
        color: '#a0a0a0',
    },
});

export default Conversations;