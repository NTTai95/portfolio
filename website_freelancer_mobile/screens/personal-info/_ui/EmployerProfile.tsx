import { apiGet } from '@/api/baseApi';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';

export default function EmployerProfile() {
    const [data, setData] = useState<any>({});
    const [activeTab, setActiveTab] = useState<'personal' | 'jobs' | 'reviews'>('personal');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiGet("/profile/my-info");
                setData(res.data);
            } catch (error) {
                dispatch(addMessage({
                    key: "get-info",
                    type: "error",
                    content: "Lỗi khi tải thông tin"
                }))
            }
        };

        fetchData();
    }, []);

    const personalInfo = [
        { label: 'Họ và tên', value: data.fullName || 'Chưa cập nhật' },
        { label: 'Email', value: data.email || 'Chưa cập nhật' },
        { label: 'Số điện thoại', value: data.phone || 'Chưa cập nhật' },
        { label: 'Ngày sinh', value: data.birthday ? new Date(data.birthday).toLocaleDateString() : 'Chưa cập nhật' },
        { label: 'Giới tính', value: data.isMale === true ? 'Nam' : data.isMale === false ? 'Nữ' : 'Chưa cập nhật' },
        { label: 'Ngày tham gia', value: data.joinedAt ? new Date(data.joinedAt).toLocaleDateString() : 'Chưa cập nhật' },
        { label: 'Trạng thái', value: data.status || 'Chưa cập nhật' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return (
                    <View style={styles.infoSection}>
                        {personalInfo.map((item, index) => (
                            <View key={index} style={styles.infoRow}>
                                <Text style={styles.infoLabel}>{item.label}</Text>
                                <Text style={styles.infoValue}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                );

            case 'jobs':
                return (
                    <FlatList
                        data={data.jobs || []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.jobItem}>
                                <MaterialCommunityIcons name="briefcase" size={24} color="#3b82f6" />
                                <View style={styles.jobInfo}>
                                    <Text style={styles.jobTitle}>{item.title || 'Không có tiêu đề'}</Text>
                                    <Text style={styles.jobDate}>
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Không có ngày'} - {item.status || 'Không có trạng thái'}
                                    </Text>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>Chưa có công việc nào</Text>
                        }
                    />
                );

            case 'reviews':
                return (
                    <FlatList
                        data={data.reviews || []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.reviewItem}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewTitle}>
                                        {item.rating || 0} sao từ {item.reviewerName || 'Người ẩn danh'}
                                    </Text>
                                </View>
                                <Text style={styles.reviewText}>{item.comment || 'Không có nhận xét'}</Text>
                            </View>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>Chưa có đánh giá nào</Text>
                        }
                    />
                );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                {/* Avatar Section */}
                <View style={styles.avatarContainer}>
                    {data.avatar ? (
                        <Image
                            source={{ uri: data.avatar }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <MaterialCommunityIcons name="account" size={64} color="#9ca3af" />
                        </View>
                    )}

                    <Text style={styles.name}>{data.fullName || 'Chưa có tên'}</Text>
                    <Text style={styles.role}>Nhà tuyển dụng</Text>
                </View>

                {/* Reputation Section */}
                <View style={styles.reputationContainer}>
                    <View style={styles.reputationRow}>
                        <Text style={styles.reputationLabel}>Uy tín</Text>
                        <Text style={styles.reputationValue}>{data.reputation || 0}%</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${data.reputation || 0}%` }
                            ]}
                        />
                    </View>
                </View>

                {/* Bio Section */}
                <View style={styles.bioContainer}>
                    <Text style={styles.bioLabel}>Giới thiệu</Text>
                    <Text style={styles.bioText}>
                        {data.bio || 'Chưa có giới thiệu'}
                    </Text>
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'personal' && styles.activeTab
                        ]}
                        onPress={() => setActiveTab('personal')}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === 'personal' && styles.activeTabText
                        ]}>
                            Thông tin cá nhân
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'jobs' && styles.activeTab
                        ]}
                        onPress={() => setActiveTab('jobs')}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === 'jobs' && styles.activeTabText
                        ]}>
                            Công việc đã đăng
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            activeTab === 'reviews' && styles.activeTab
                        ]}
                        onPress={() => setActiveTab('reviews')}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === 'reviews' && styles.activeTabText
                        ]}>
                            Đánh giá
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Tab Content */}
                <View style={styles.tabContent}>
                    {renderTabContent()}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 12,
    },
    avatarPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
    },
    role: {
        color: '#6b7280',
        fontSize: 16,
        textAlign: 'center',
    },
    reputationContainer: {
        marginBottom: 20,
    },
    reputationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    reputationLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4b5563',
    },
    reputationValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4b5563',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#3b82f6',
    },
    bioContainer: {
        marginBottom: 20,
    },
    bioLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1f2937',
    },
    bioText: {
        color: '#6b7280',
        fontSize: 14,
        lineHeight: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        marginBottom: 16,
    },
    tabButton: {
        paddingBottom: 12,
        flex: 1,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#3b82f6',
    },
    tabText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },
    activeTabText: {
        color: '#3b82f6',
        fontWeight: 'bold',
    },
    tabContent: {
        minHeight: 200,
    },
    infoSection: {
        paddingVertical: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    infoLabel: {
        fontSize: 14,
        color: '#6b7280',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1f2937',
    },
    jobItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    jobInfo: {
        marginLeft: 16,
        flex: 1,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    jobDate: {
        fontSize: 14,
        color: '#6b7280',
    },
    reviewItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    reviewTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    reviewText: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
    },
    emptyText: {
        textAlign: 'center',
        paddingVertical: 24,
        color: '#9ca3af',
    },
});