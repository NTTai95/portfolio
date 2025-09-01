// MenuScreen.tsx
import { AuthGuard } from '@/components/AuthGuard';
import { RootState } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

type MenuItem = {
    icon: string;
    label: string;
    screen: string;
    role: ('ROLE_FREELANCER' | 'ROLE_NHA_TUYEN_DUNG')[];
};

const MenuScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const user = useSelector((state: RootState) => state.persistent.auth.me);

    const menuItems: MenuItem[] = [
        { icon: "home-outline", label: "Bảng điều kiển", screen: "Dashboard", role: ['ROLE_FREELANCER', 'ROLE_NHA_TUYEN_DUNG'] },
        { icon: "person-outline", label: "Hồ sơ cá nhân", screen: "personalInfo", role: ['ROLE_FREELANCER', 'ROLE_NHA_TUYEN_DUNG'] },
        { icon: "add-circle-outline", label: "Tạo công việc", screen: "createJob", role: ['ROLE_NHA_TUYEN_DUNG'] },
        { icon: "document-text-outline", label: "Công việc của tôi", screen: "jobs", role: ['ROLE_FREELANCER', 'ROLE_NHA_TUYEN_DUNG'] },
        { icon: "notifications-outline", label: "Thông báo", screen: "notifications", role: ['ROLE_FREELANCER', 'ROLE_NHA_TUYEN_DUNG'] },
        { icon: "chatbubble-ellipses-outline", label: "Tin nhắn", screen: "conversations", role: ['ROLE_FREELANCER', 'ROLE_NHA_TUYEN_DUNG'] },
        { icon: "lock-closed-outline", label: "Đổi mật khẩu", screen: "ChangePassword", role: ['ROLE_FREELANCER', 'ROLE_NHA_TUYEN_DUNG'] },
        { icon: "log-out-outline", label: "Đăng xuất", screen: "login", role: ['ROLE_FREELANCER', 'ROLE_NHA_TUYEN_DUNG'] },
    ];

    return (
        <View style={styles.container}>
            {/* Header với thông tin người dùng */}
            <View style={styles.header}>
                <Image
                    source={{ uri: user.avatar }}
                    style={styles.profileAvatar}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.fullName}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                </View>
            </View>

            {/* Danh sách menu */}
            <View style={styles.menuList}>
                {menuItems.map((item, index) => (
                    <AuthGuard roles={item.role}>
                        <TouchableOpacity
                            key={(index + Date.now()).toString()}
                            style={styles.menuItem}
                            onPress={() => navigation.navigate(item.screen as any)}
                        >
                            <Ionicons name={item.icon as any} size={24} color="#555" />
                            <Text style={styles.menuText}>{item.label}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>
                    </AuthGuard>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profileAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    statsContainer: {
        flexDirection: 'row',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    statText: {
        marginLeft: 4,
        fontSize: 14,
    },
    menuList: {
        marginTop: 16,
        backgroundColor: '#fff',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 16,
    },
});

export default MenuScreen;