import { apiGet } from '@/api/baseApi';
import { ResponseDetail } from '@/types/respones/detail';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface ReviewItem {
    jobTitle: string | null;
    employerFullName: string | null;
    employerAvatar: string | null;
    employerId: number | null;
    employerContent: string;
    employerRating: number;
}

interface ReviewsResponse {
    reviews: {
        content: ReviewItem[];
        totalElements: number;
        totalPages: number;
        number: number;
        size: number;
        empty: boolean;
    };
    ratingCounts: Record<number, number>;
}

interface TopReviewsProps {
    data: ResponseDetail.Freelancer;
}

export default function TopReviews({ data }: TopReviewsProps) {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [selectedRating, setSelectedRating] = useState<number>(5);
    const [reviewData, setReviewData] = useState<ReviewsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [allReviews, setAllReviews] = useState<ReviewItem[]>([]);

    // Tải dữ liệu đánh giá
    const fetchReviews = async (page: number = 0, isRefresh: boolean = false) => {
        if (page === 0) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }

        try {
            const res: any = await apiGet(`/freelancer/${data.id}/reviews`, {
                params: { page, size: 5, rating: selectedRating }
            });

            const responseData = res.data as ReviewsResponse;

            if (isRefresh) {
                setReviewData(responseData);
                setAllReviews(responseData.reviews.content);
            } else if (page === 0) {
                setReviewData(responseData);
                setAllReviews(responseData.reviews.content);
            } else {
                setReviewData(responseData);
                setAllReviews(prev => [...prev, ...responseData.reviews.content]);
            }

        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
        }
    };

    // Khởi tạo dữ liệu
    useEffect(() => {
        fetchReviews();
    }, [data.id]);

    // Xử lý khi thay đổi bộ lọc
    const handleRatingFilter = (rating: number) => {
        setSelectedRating(rating);
        setCurrentPage(0);
        fetchReviews(0, true);
    };

    // Tải thêm dữ liệu
    const handleLoadMore = () => {
        if (!reviewData || currentPage + 1 >= reviewData.reviews.totalPages) return;

        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchReviews(nextPage);
    };

    // Làm mới dữ liệu
    const handleRefresh = () => {
        setRefreshing(true);
        setCurrentPage(0);
        fetchReviews(0, true);
    };

    // Render sao đánh giá
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <MaterialIcons
                key={index}
                name={index < Math.floor(rating) ? 'star' : 'star-border'}
                size={18}
                color={index < rating ? '#FFC107' : '#BDBDBD'}
                style={styles.starIcon}
            />
        ));
    };

    // Tính tổng số đánh giá
    const totalReviews = reviewData?.ratingCounts
        ? Object.values(reviewData.ratingCounts).reduce((sum, count) => sum + count, 0)
        : 0;

    // Kiểm tra xem còn dữ liệu để tải thêm không
    const hasMore = reviewData && currentPage < reviewData.reviews.totalPages - 1;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <MaterialIcons name="stars" size={24} color="#FFC107" />
                <Text style={styles.headerText}>Đánh giá từ nhà tuyển dụng</Text>
            </View>

            {/* Bộ lọc đánh giá */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterContainer}
            >
                {[5, 4, 3, 2, 1].map(rating => (
                    <TouchableOpacity
                        key={rating}
                        style={[
                            styles.filterButton,
                            selectedRating === rating && styles.filterButtonActive
                        ]}
                        onPress={() => handleRatingFilter(rating)}
                        disabled={loading || refreshing}
                    >
                        <Text style={styles.filterButtonText}>{rating} ★</Text>
                        <Text style={styles.filterCountText}>
                            {reviewData?.ratingCounts?.[rating] || 0}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Nội dung chính */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2196F3" />
                    <Text style={styles.loadingText}>Đang tải đánh giá...</Text>
                </View>
            ) : !reviewData ? (
                <View style={styles.emptyContainer}>
                    <MaterialIcons name="error-outline" size={48} color="#E0E0E0" />
                    <Text style={styles.emptyText}>Không thể tải dữ liệu đánh giá</Text>
                </View>
            ) : reviewData.reviews.empty ? (
                <View style={styles.emptyContainer}>
                    <MaterialIcons name="rate-review" size={48} color="#E0E0E0" />
                    <Text style={styles.emptyText}>Chưa có đánh giá nào</Text>
                    <Text style={styles.emptyHint}>
                        {selectedRating !== 5
                            ? `Không có đánh giá ${selectedRating} sao`
                            : 'Hãy hoàn thành dự án đầu tiên để nhận đánh giá!'}
                    </Text>
                </View>
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={['#2196F3']}
                            tintColor="#2196F3"
                        />
                    }
                >
                    {/* Danh sách đánh giá */}
                    {allReviews.map((review, index) => (
                        <View
                            key={`${review.employerId}-${index}`}
                            style={styles.reviewItem}
                        >
                            <View style={styles.reviewHeader}>
                                {review.employerAvatar ? (
                                    <Image
                                        source={{ uri: review.employerAvatar }}
                                        style={styles.avatar}
                                    />
                                ) : (
                                    <View style={styles.avatarPlaceholder}>
                                        <Text style={styles.avatarText}>
                                            {review.employerFullName?.[0] || 'A'}
                                        </Text>
                                    </View>
                                )}

                                <View style={styles.reviewInfo}>
                                    <Text style={styles.employerName}>
                                        {review.employerFullName || 'Ẩn danh'}
                                    </Text>
                                    <Text style={styles.jobTitle}>
                                        {review.jobTitle || 'Không có tiêu đề'}
                                    </Text>
                                </View>

                                <View style={styles.ratingContainer}>
                                    {renderStars(review.employerRating)}
                                </View>
                            </View>

                            <Text style={styles.reviewContent}>
                                {review.employerContent}
                            </Text>

                            {index < allReviews.length - 1 && (
                                <View style={styles.divider} />
                            )}
                        </View>
                    ))}

                    {/* Nút tải thêm */}
                    {hasMore && (
                        <TouchableOpacity
                            style={styles.loadMoreButton}
                            onPress={handleLoadMore}
                            disabled={loadingMore}
                        >
                            {loadingMore ? (
                                <ActivityIndicator color="#2196F3" />
                            ) : (
                                <Text style={styles.loadMoreText}>Tải thêm đánh giá</Text>
                            )}
                        </TouchableOpacity>
                    )}

                    {/* Hiển thị khi đã tải hết dữ liệu */}
                    {!hasMore && allReviews.length > 0 && (
                        <View style={styles.endOfList}>
                            <Text style={styles.endOfListText}>Bạn đã xem hết tất cả đánh giá</Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginLeft: 10,
    },
    filterContainer: {
        paddingVertical: 8,
        marginBottom: 16,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    filterButtonActive: {
        backgroundColor: '#EFF6FF',
        borderColor: '#3B82F6',
    },
    filterButtonText: {
        color: '#4B5563',
        fontWeight: '500',
        marginRight: 4,
    },
    filterCountText: {
        backgroundColor: '#D1D5DB',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        fontSize: 12,
        fontWeight: '500',
        color: '#374151',
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    loadingText: {
        marginTop: 12,
        color: '#6B7280',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    emptyText: {
        color: '#757575',
        fontSize: 16,
        marginTop: 12,
        marginBottom: 4,
        textAlign: 'center',
    },
    emptyHint: {
        color: '#9E9E9E',
        fontSize: 14,
        textAlign: 'center',
    },
    reviewItem: {
        paddingVertical: 16,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0C4A6E',
    },
    reviewInfo: {
        flex: 1,
        marginRight: 8,
    },
    employerName: {
        fontWeight: '600',
        color: '#1F2937',
        fontSize: 16,
        marginBottom: 4,
    },
    jobTitle: {
        color: '#3B82F6',
        fontSize: 14,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginRight: 2,
    },
    reviewContent: {
        color: '#4B5563',
        fontSize: 15,
        lineHeight: 22,
        paddingLeft: 60,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 16,
    },
    loadMoreButton: {
        padding: 12,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    loadMoreText: {
        color: '#3B82F6',
        fontWeight: '500',
    },
    endOfList: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    endOfListText: {
        color: '#9CA3AF',
        fontSize: 14,
        fontStyle: 'italic',
    },
});