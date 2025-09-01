// screens/freelancer-search/ui/FreelancerCard.tsx
import { AuthGuard } from '@/components/AuthGuard';
import { ResponseDetail } from '@/types/respones/detail';
import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width * 0.92, 400); // Responsive width with max cap

interface FreelancerCardProps {
    freelancer: ResponseDetail.FreelancerSearchResponse['freelancers'][0];
    onViewDetail: (id: number) => void;
    onInviteToProject: (id: number) => void;
}

export default function FreelancerCard({
    freelancer,
    onViewDetail,
    onInviteToProject
}: FreelancerCardProps) {
    return (
        <View style={styles.card}>
            {/* Header */}
            <TouchableOpacity onPress={() => onViewDetail(freelancer.id)}>
                <View style={styles.cardHeader}>
                    <Image
                        source={{ uri: freelancer.avatar }}
                        style={styles.avatar}
                    />
                    <View style={styles.headerInfo}>
                        <Text style={styles.name} numberOfLines={1}>
                            {freelancer.fullName}
                        </Text>
                        <View style={styles.reputationContainer}>
                            <View style={[
                                styles.reputationBadge,
                            ]}>
                                <Icon
                                    name="star"
                                    size={12}
                                />
                                <Text style={[
                                    styles.reputationScore,
                                ]}>
                                    Uy tín {freelancer.reputation}
                                </Text>
                            </View>
                            <Text style={styles.reputationText}>
                            </Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Icon name="calendar" size={12} color="#6b7280" />
                            <Text style={styles.dateText} numberOfLines={1}>
                                Tham gia: {freelancer?.joinedAt.substring(0, 10)}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Content */}
            <View style={styles.cardBody}>
                <Text style={styles.bio} numberOfLines={2}>
                    {freelancer.bio || 'Chưa có mô tả'}
                </Text>

                {freelancer.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Kỹ năng chính</Text>
                        <View style={styles.tagsContainer}>
                            {freelancer.skills.slice(0, 3).map((skill, index) => (
                                <View key={index} style={styles.skillTag}>
                                    <Text style={styles.skillTagText} numberOfLines={1}>
                                        {skill}
                                    </Text>
                                </View>
                            ))}
                            {freelancer.skills.length > 3 && (
                                <View style={styles.moreTag}>
                                    <Text style={styles.moreTagText}>
                                        +{freelancer.skills.length - 3}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                )}

                {freelancer.languages.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ngôn ngữ</Text>
                        <View style={styles.tagsContainer}>
                            {freelancer.languages.slice(0, 3).map((language, index) => (
                                <View key={index} style={styles.languageTag}>
                                    <Text style={styles.languageTagText} numberOfLines={1}>
                                        {language}
                                    </Text>
                                </View>
                            ))}
                            {freelancer.languages.length > 3 && (
                                <View style={styles.moreTag}>
                                    <Text style={styles.moreTagText}>
                                        +{freelancer.languages.length - 3}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                )}

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{freelancer.totalCompletedJobs}</Text>
                        <Text style={styles.statLabel}>Dự án</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{freelancer.totalReviews}</Text>
                        <Text style={styles.statLabel}>Đánh giá</Text>
                    </View>
                </View>
            </View>

            {/* Actions */}
            <View style={styles.cardFooter}>
                <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => onViewDetail(freelancer.id)}
                >
                    <Icon name="eye-outline" size={16} color="#355a8e" />
                    <Text style={styles.detailButtonText}>Xem chi tiết</Text>
                </TouchableOpacity>
                <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
                    <TouchableOpacity
                        style={styles.inviteButton}
                        onPress={() => onInviteToProject(freelancer.id)}
                    >
                        <Icon name="email-outline" size={16} color="white" />
                        <Text style={styles.inviteButtonText}>Mời dự án</Text>
                    </TouchableOpacity>
                </AuthGuard>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginVertical: 8,
        alignSelf: 'center',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        backgroundColor: '#f8fafc',
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    reputationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    reputationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 6,
        marginRight: 6,
    },
    reputationScore: {
        fontSize: 11,
        fontWeight: '600',
        marginLeft: 4,
    },
    reputationText: {
        fontSize: 11,
        color: '#6b7280',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 11,
        color: '#6b7280',
        marginLeft: 4,
        flex: 1,
    },
    cardBody: {
        padding: 12,
    },
    bio: {
        fontSize: 13,
        color: '#374151',
        marginBottom: 12,
        lineHeight: 18,
    },
    section: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6b7280',
        marginBottom: 6,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillTag: {
        backgroundColor: '#355a8e15',
        borderWidth: 1,
        borderColor: '#355a8e30',
        borderRadius: 6,
        paddingVertical: 3,
        paddingHorizontal: 8,
        maxWidth: 90,
    },
    skillTagText: {
        fontSize: 10,
        color: '#355a8e',
        fontWeight: '500',
    },
    languageTag: {
        backgroundColor: '#10b98115',
        borderWidth: 1,
        borderColor: '#10b98130',
        borderRadius: 6,
        paddingVertical: 3,
        paddingHorizontal: 8,
        maxWidth: 90,
    },
    languageTagText: {
        fontSize: 10,
        color: '#059669',
        fontWeight: '500',
    },
    moreTag: {
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 6,
        paddingVertical: 3,
        paddingHorizontal: 8,
    },
    moreTagText: {
        fontSize: 10,
        color: '#6b7280',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f9fafb',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 8,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#355a8e',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 10,
        color: '#6b7280',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#d1d5db',
        marginHorizontal: 6,
    },
    cardFooter: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    detailButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRightWidth: 1,
        borderRightColor: '#e2e8f0',
    },
    detailButtonText: {
        marginLeft: 6,
        color: '#355a8e',
        fontWeight: '500',
        fontSize: 13,
    },
    inviteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#355a8e',
    },
    inviteButtonText: {
        marginLeft: 6,
        color: 'white',
        fontWeight: '600',
        fontSize: 13,
    },
});