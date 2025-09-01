import { ResponseDetail } from '@/types/respones/detail';
import {
    faAward,
    faCalendarAlt,
    faEnvelope,
    faPhone,
    faTrophy,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';

interface PersonalInfoProps {
    data: ResponseDetail.EmployerProfile;
}

export default function PersonalInfo({ data }: PersonalInfoProps) {
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Chưa có thông tin';
        try {
            const [datePart] = dateString.split(' ');
            const [day, month, year] = datePart.split('/');
            return `${day}/${month}/${year}`;
        } catch {
            return 'Ngày không hợp lệ';
        }
    };

    const copyToClipboard = (text: string, type: string) => {
        ToastAndroid.show(`Đã sao chép ${type}`, ToastAndroid.SHORT);
    };

    const getSuccessRate = () => {
        if (data.totalJobs === 0) return 0;
        return Math.round((data.totalCompletedJobs / data.totalJobs) * 100);
    };

    return (
        <View style={styles.container}>
            {/* Bio */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>Giới thiệu</Text>
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.bioContainer}>
                        <Text style={styles.bioText}>&ldquo;{data.bio}&rdquo;</Text>
                    </View>
                </View>
            </View>

            {/* Contact Information */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <FontAwesomeIcon icon={faPhone} size={18} color="#2563eb" />
                    <Text style={styles.cardHeaderText}>Thông tin liên hệ</Text>
                </View>
                <View style={styles.cardBody}>
                    {/* Email */}
                    <Pressable
                        style={styles.contactItem}
                        onPress={() => copyToClipboard(data.email, 'email')}
                        android_ripple={{ color: '#e2e8f0' }}
                    >
                        <View style={styles.contactLabel}>
                            <FontAwesomeIcon icon={faEnvelope} size={14} color="#2563eb" />
                            <Text style={styles.contactLabelText}>EMAIL</Text>
                        </View>
                        <Text style={styles.contactValue}>{data.email}</Text>
                    </Pressable>

                    {/* Phone */}
                    <Pressable
                        style={styles.contactItem}
                        onPress={() => copyToClipboard(data.phone, 'số điện thoại')}
                        android_ripple={{ color: '#e2e8f0' }}
                    >
                        <View style={styles.contactLabel}>
                            <FontAwesomeIcon icon={faPhone} size={14} color="#10b981" />
                            <Text style={styles.contactLabelText}>ĐIỆN THOẠI</Text>
                        </View>
                        <Text style={[styles.contactValue, { color: '#10b981' }]}>{data.phone}</Text>
                    </Pressable>

                    <View style={styles.divider} />

                    {/* Personal Details */}
                    <View style={styles.detailItem}>
                        <View style={styles.detailLabel}>
                            <FontAwesomeIcon icon={faCalendarAlt} size={12} color="#6b7280" />
                            <Text style={styles.detailLabelText}>Sinh ngày</Text>
                        </View>
                        <Text style={styles.detailValue}>{formatDate(data.birthday)}</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <View style={styles.detailLabel}>
                            <FontAwesomeIcon icon={faUser} size={12} color="#6b7280" />
                            <Text style={styles.detailLabelText}>Giới tính</Text>
                        </View>
                        <Text style={styles.detailValue}>
                            {data.isMale ? 'Nam' : 'Nữ'} • {data.age} tuổi
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        <View style={styles.detailLabel}>
                            <FontAwesomeIcon icon={faCalendarAlt} size={12} color="#6b7280" />
                            <Text style={styles.detailLabelText}>Tham gia</Text>
                        </View>
                        <Text style={styles.detailValue}>{formatDate(data.joinedAt)}</Text>
                    </View>
                </View>
            </View>

            {/* Performance Metrics */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <FontAwesomeIcon icon={faAward} size={18} color="#f59e0b" />
                    <Text style={styles.cardHeaderText}>Hiệu suất làm việc</Text>
                </View>
                <View style={styles.cardBody}>
                    {/* Success Rate */}
                    <View style={styles.successRateContainer}>
                        <Text style={styles.successRateValue}>{getSuccessRate()}%</Text>
                        <Text style={styles.successRateLabel}>Tỷ lệ thành công</Text>
                    </View>

                    {/* Project Stats */}
                    <View style={styles.projectStats}>
                        <View style={styles.projectStatItem}>
                            <Text style={styles.projectStatValue}>{data.totalJobs}</Text>
                            <Text style={styles.projectStatLabel}>Dự án</Text>
                        </View>
                        <View style={styles.projectStatItem}>
                            <Text style={[styles.projectStatValue, { color: '#16a34a' }]}>
                                {data.totalCompletedJobs}
                            </Text>
                            <Text style={styles.projectStatLabel}>Hoàn thành</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Reputation & Reviews */}
                    <View style={styles.detailItem}>
                        <View style={styles.detailLabel}>
                            <FontAwesomeIcon icon={faTrophy} size={12} color="#6b7280" />
                            <Text style={styles.detailLabelText}>Uy tín</Text>
                        </View>
                        <Text style={styles.detailValue}>{data.reputation} điểm</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <View style={styles.detailLabel}>
                            <FontAwesomeIcon icon={faAward} size={12} color="#6b7280" />
                            <Text style={styles.detailLabelText}>Đánh giá</Text>
                        </View>
                        <Text style={styles.detailValue}>
                            {data.averageRating}/5 ⭐ ({data.totalReviews} đánh giá)
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginBottom: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
        elevation: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        backgroundColor: '#f8fafc',
    },
    cardHeaderText: {
        color: '#1f2937',
        fontSize: 16,
        fontWeight: '600',
    },
    cardBody: {
        padding: 16,
    },
    bioContainer: {
        backgroundColor: '#f0f9ff',
        borderLeftWidth: 3,
        borderLeftColor: '#0ea5e9',
        borderRadius: 8,
        padding: 14,
    },
    bioText: {
        color: '#374151',
        fontSize: 14,
        fontStyle: 'italic',
        lineHeight: 22,
    },
    contactItem: {
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 12,
        overflow: 'hidden',
    },
    contactLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    contactLabelText: {
        color: '#6b7280',
        fontSize: 12,
        fontWeight: '600',
    },
    contactValue: {
        color: '#2563eb',
        fontSize: 14,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 12,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    detailLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailLabelText: {
        color: '#6b7280',
        fontSize: 12,
    },
    detailValue: {
        color: '#1f2937',
        fontSize: 13,
        fontWeight: '600',
    },
    successRateContainer: {
        backgroundColor: '#f0fdf4',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#bbf7d0',
        alignItems: 'center',
        marginBottom: 16,
    },
    successRateValue: {
        color: '#16a34a',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 4,
    },
    successRateLabel: {
        color: '#15803d',
        fontSize: 12,
        fontWeight: '600',
    },
    projectStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 16,
    },
    projectStatItem: {
        flex: 1,
        backgroundColor: '#f0f9ff',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#bfdbfe',
        alignItems: 'center',
    },
    projectStatValue: {
        color: '#2563eb',
        fontSize: 18,
        fontWeight: '700',
    },
    projectStatLabel: {
        color: '#1e3a8a',
        fontSize: 11,
        fontWeight: '600',
    },
});