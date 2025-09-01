// screens/job-listings/_ui/job-card/JobCard.tsx
import { AuthGuard } from '@/components/AuthGuard';
import { Status } from '@/types/status';
import { formatDate } from '@/utils/date';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatCurrency } from '../format';
import { JobActionsDropdownWithProvider } from '../job-action/JobActionsDropdownWithProvider';
import { JobListing } from '../types';
import ApplyDetail from './ApplyDetail';
import DetailJob from './DetailJob';
import InfoEmployer from './InfoEmployer';
import MilestoneProgressBar from './MilestoneProgressBar';

interface JobCardProps {
    job: JobListing;
    onRefresh: () => void;
    keyword: string;
}

const JobCard = ({ job, onRefresh, keyword }: JobCardProps) => {
    const statusMeta = Status.Meta[job.status.toUpperCase()];

    return (
        <ScrollView
            style={styles.card}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.header}>
                <View style={[styles.badge, { backgroundColor: statusMeta.hex }]}>
                    <Text style={styles.badgeText}>{statusMeta.label}</Text>
                </View>

                {(job?.status.toUpperCase() != 'COMPLETED' && job?.status.toUpperCase() != 'CANCELED') && (
                    <JobActionsDropdownWithProvider job={job} onRefresh={onRefresh} />
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>
                    {job.title || "Chưa có tiêu đề"}
                </Text>

                <AuthGuard roles={['ROLE_NHA_TUYEN_DUNG']} fallback={<InfoEmployer job={job} />}>
                    <DateItem
                        color="#3B82F6"
                        label="Tạo lúc"
                        value={job.createdAt}
                    />
                </AuthGuard>

                {job?.postedAt && (
                    <DateItem
                        color="#10B981"
                        label="Đăng lúc"
                        value={job.postedAt}
                    />
                )}

                {job?.closedAt && (
                    <DateItem
                        color="#EF4444"
                        label="Đóng lúc"
                        value={job.closedAt}
                    />
                )}

                <DetailJob job={job} keyword={keyword} />

                <AuthGuard roles={["ROLE_FREELANCER"]}>
                    <ApplyDetail job={job} />
                </AuthGuard>

                <View style={styles.statsContainer}>
                    <View style={styles.topStats}>
                        <StatCard
                            icon={<FontAwesome6 name="money-bill-wave" size={14} color="#3B82F6" />}
                            title="Tài chính"
                        >
                            <Text style={styles.mainValue}>{formatCurrency(job.budget)}</Text>
                            <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
                                <Text style={[styles.secondaryValue, { color: '#0891B2' }]}>
                                    {job.bidAmount ? formatCurrency(job.bidAmount) : 'Chưa có giá chốt'}
                                </Text>
                            </AuthGuard>
                        </StatCard>

                        <StatCard
                            icon={<Ionicons name="time-outline" size={14} color="#6366F1" />}
                            title="Thời gian"
                        >
                            <Text style={styles.mainValue}>{job.durationHours} giờ</Text>
                            <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
                                <Text style={[styles.secondaryValue, { color: '#7C3AED' }]}>
                                    {job.estimatedHours ? `${job.estimatedHours} giờ` : 'Chưa có thực tế'}
                                </Text>
                            </AuthGuard>
                        </StatCard>

                        <StatCard
                            icon={<Ionicons name="people-outline" size={14} color="#22C55E" />}
                            title="Ứng viên"
                        >
                            <Text style={styles.mainValue}>
                                {job.countApplicants} freelancer
                            </Text>
                        </StatCard>
                    </View>

                    <StatCard
                        icon={<Ionicons name="flag-outline" size={14} color="#F59E0B" />}
                        title="Giai đoạn"
                        fullWidth
                    >
                        <MilestoneProgressBar
                            total={job.countMilestones}
                            statusCounts={job.milestoneStatusCounts}
                            jobId={job.id}
                            compact
                        />
                    </StatCard>
                </View>
            </View>
        </ScrollView>
    );
};

// Helper Components
const DateItem = ({ color, label, value }: { color: string; label: string; value: string }) => (
    <View style={styles.dateItem}>
        <Ionicons name="calendar-outline" size={14} color={color} />
        <Text style={styles.dateLabel}>{label}:</Text>
        <Text style={styles.dateValue}>{formatDate(value, true)}</Text>
    </View>
);

const StatCard = ({
    icon,
    title,
    children,
    fullWidth = false
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    fullWidth?: boolean;
}) => (
    <View style={[styles.statCard, fullWidth && styles.fullWidthCard]}>
        <View style={styles.statHeader}>
            {icon}
            <Text style={styles.statTitle}>{title}</Text>
        </View>
        <View style={styles.statContent}>
            {children}
        </View>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    badge: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    badgeText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12,
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 10,
    },
    dateItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    dateLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginLeft: 6,
        marginRight: 6,
    },
    dateValue: {
        fontSize: 12,
        fontWeight: '500',
        color: '#1F2937',
    },
    statsContainer: {
        marginTop: 10,
    },
    topStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    statCard: {
        width: '32%',
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
    },
    fullWidthCard: {
        width: '100%',
        marginTop: 8,
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    statTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
        marginLeft: 6,
    },
    statContent: {
        alignItems: 'center',
    },
    mainValue: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1F2937',
        marginTop: 4,
        textAlign: 'center',
    },
    secondaryValue: {
        fontSize: 11,
        fontWeight: '500',
        marginTop: 2,
        textAlign: 'center',
    },
});

export default JobCard;