import { RootState } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthGuard } from '../AuthGuard';

type NavigationBarProps = {
    currentRoute?: keyof RootStackParamList;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ currentRoute }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const avatar = useSelector((state: RootState) => state.persistent.auth.me?.avatar) || '';
    const countNotification = useSelector((state: RootState) => state.volatile.ws.notifications).filter(n => !n.read).length;
    const countMessageUnread = useSelector((state: RootState) => state.volatile.ws.conversationList).filter(item => item.unreadCount > 0).map((conversation) => conversation.unreadCount).reduce((a, b) => a + b, 0);

    // Sử dụng currentRoute từ prop thay vì useNavigationState
    const activeRoute = currentRoute;

    // Kiểm tra xem route hiện tại có active không
    const isRouteActive = (routeName: keyof RootStackParamList) => {
        return activeRoute === routeName;
    };

    // Ẩn thanh điều hướng trên trang login
    if (activeRoute === 'login') {
        return null;
    }

    // Hiển thị badge nếu có thông báo/tin nhắn chưa đọc
    const renderWithBadge = (iconName: string, activeIconName: string, routeName: keyof RootStackParamList, count: number) => {
        const isActive = isRouteActive(routeName);
        const iconColor = isActive ? '#2563EB' : '#333';
        const iconToShow = isActive && activeIconName ? activeIconName : iconName;

        return (
            <View style={styles.iconContainer}>
                <Ionicons name={iconToShow as any} size={28} color={iconColor} />
                {count > 0 && (
                    <View style={[styles.badge, isActive && styles.activeBadge]}>
                        <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
                    </View>
                )}
            </View>
        );
    };

    // Render avatar với trạng thái active
    const renderAvatar = () => {
        const isActive = isRouteActive('menu');
        const borderStyle = isActive ? styles.activeAvatar : null;

        return (
            <View style={[styles.avatarContainer, borderStyle]}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                    <Ionicons
                        name={isActive ? "person" : "person-outline"}
                        size={28}
                        color={isActive ? '#2563EB' : '#333'}
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <AuthGuard roles={["ROLE_FREELANCER"]}>
                <TouchableOpacity onPress={() => navigation.navigate('findJob')}>
                    {renderWithBadge('search-outline', 'search', 'findJob', 0)}
                </TouchableOpacity>
            </AuthGuard>

            <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
                <TouchableOpacity onPress={() => navigation.navigate('freelancerSearch')}>
                    {renderWithBadge('people-outline', 'people', 'freelancerSearch', 0)}
                </TouchableOpacity>
            </AuthGuard>

            <TouchableOpacity onPress={() => navigation.navigate('conversations')}>
                {renderWithBadge('chatbox-outline', 'chatbox', 'conversations', countMessageUnread)}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('notifications')}>
                {renderWithBadge('notifications-outline', 'notifications', 'notifications', countNotification)}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('menu')}>
                {renderAvatar()}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: -80,
        left: 0,
        right: 0,
        paddingBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        elevation: 10,
        zIndex: 100,
    },
    avatarContainer: {
        borderRadius: 18,
        padding: 2,
    },
    activeAvatar: {
        borderWidth: 2,
        borderColor: '#2563EB',
        borderRadius: 20,
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    iconContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -8,
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    activeBadge: {
        backgroundColor: '#2563EB',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default NavigationBar;