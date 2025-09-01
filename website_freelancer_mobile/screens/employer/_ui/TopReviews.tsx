import { ResponseDetail } from '@/types/respones/detail';
import {
    faCalendarAlt,
    faMoneyBillWave,
    faStar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface TopReviewsProps {
    data: ResponseDetail.EmployerProfile;
}

export default function TopReviews({ data }: TopReviewsProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
    };

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

    const renderStars = (rating: number) => {
        return (
            <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                    <Text key={i} style={styles.star}>
                        {i < Math.floor(rating) ? '★' : '☆'}
                    </Text>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesomeIcon icon={faStar} size={20} color="#fbbf24" />
                <Text style={styles.title}>Đánh giá nổi bật</Text>
            </View>

            {!data.topReviews || data.topReviews.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Chưa có đánh giá</Text>
                    <Text style={styles.emptyMessage}>
                        Hoàn thành dự án đầu tiên để nhận đánh giá
                    </Text>
                </View>
            ) : (
                <View style={styles.reviewsContainer}>
                    {data.topReviews.slice(0, 3).map((review) => (
                        <View key={review.id} style={styles.reviewCard}>
                            {/* Freelancer Info */}
                            <View style={styles.freelancerInfo}>
                                <Image
                                    source={{ uri: review.freelancerAvatar }}
                                    style={styles.avatar}
                                />
                                <View style={styles.freelancerDetails}>
                                    <Text style={styles.freelancerName}>
                                        {review.freelancerName}
                                    </Text>
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>Freelancer</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Rating */}
                            {renderStars(review.rating)}

                            {/* Job Title */}
                            <Text style={styles.jobTitle}>{review.jobTitle}</Text>

                            {/* Review Content */}
                            <View style={styles.reviewContent}>
                                <Text style={styles.reviewText}>&ldquo;{review.content}&rdquo;</Text>
                            </View>

                            {/* Project Details */}
                            <View style={styles.projectDetails}>
                                <View style={styles.detailItem}>
                                    <FontAwesomeIcon icon={faCalendarAlt} size={12} color="#6b7280" />
                                    <Text style={styles.detailText}>
                                        {formatDate(review.jobCompletedAt)}
                                    </Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <FontAwesomeIcon icon={faMoneyBillWave} size={12} color="#059669" />
                                    <Text style={[styles.detailText, { color: '#059669' }]}>
                                        {formatCurrency(review.actualBudget)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    {/* Summary */}
                    {data.topReviews.length > 3 && (
                        <>
                            <View style={styles.divider} />
                            <View style={styles.summary}>
                                <Text style={styles.summaryText}>
                                    Hiển thị 3/{data.topReviews.length} đánh giá cao nhất
                                </Text>
                            </View>
                        </>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        backgroundColor: '#f8fafc',
    },
    title: {
        color: '#1f2937',
        fontSize: 16,
        fontWeight: '600',
    },
    emptyContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyTitle: {
        color: '#6b7280',
        fontSize: 14,
        marginBottom: 4,
        textAlign: 'center',
    },
    emptyMessage: {
        color: '#9ca3af',
        fontSize: 12,
        textAlign: 'center',
    },
    reviewsContainer: {
        padding: 16,
        gap: 16,
    },
    reviewCard: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    freelancerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#e5e7eb',
    },
    freelancerDetails: {
        flex: 1,
    },
    freelancerName: {
        color: '#1f2937',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    badge: {
        backgroundColor: '#e0e7ff',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#3730a3',
        fontSize: 11,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    star: {
        color: '#fbbf24',
        fontSize: 16,
        marginRight: 3,
    },
    jobTitle: {
        color: '#4f46e5',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 12,
    },
    reviewContent: {
        backgroundColor: '#f0f9ff',
        borderLeftWidth: 3,
        borderLeftColor: '#0ea5e9',
        borderRadius: 8,
        padding: 14,
        marginBottom: 12,
    },
    reviewText: {
        color: '#374151',
        fontSize: 14,
        fontStyle: 'italic',
        lineHeight: 22,
    },
    projectDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    detailText: {
        fontSize: 12,
        color: '#6b7280',
    },
    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 8,
    },
    summary: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    summaryText: {
        color: '#6b7280',
        fontSize: 13,
    },
});