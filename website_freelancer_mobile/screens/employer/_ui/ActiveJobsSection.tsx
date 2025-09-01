import { apiGet } from '@/api/baseApi';
import { ResponseDetail } from '@/types/respones/detail';
import {
    faAward,
    faBriefcase,
    faCalendarAlt,
    faCalendarCheck,
    faClock,
    faMoneyBillWave,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ActiveJobsSectionProps {
    data: ResponseDetail.EmployerProfile;
}

export default function ActiveJobsSection({ data }: ActiveJobsSectionProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [applyStatus, setApplyStatus] = useState<Record<number, boolean>>({});

    // Chỉ gọi API khi danh sách job thay đổi
    useEffect(() => {
        if (!data.activeJobs || data.activeJobs.length === 0) return;

        const fetchApplyStatus = async () => {
            const statusMap: Record<number, boolean> = {};
            for (const job of data.activeJobs) {
                try {
                    const res = await apiGet(`/jobs/${job?.id}/is-apply`);
                    statusMap[job.id] = res.data as boolean;
                } catch (err) {
                    statusMap[job.id] = false;
                }
            }
            setApplyStatus(statusMap);
        };

        fetchApplyStatus();
    }, [data.activeJobs]);

    const formatBudget = (amount: number) =>
        new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';

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

    const getApplicationStatus = (count: number) => {
        if (count >= 10) return { label: 'Hot', color: '#ef4444', bg: '#fef2f2', textColor: '#991b1b' };
        if (count >= 5) return { label: 'Warm', color: '#f97316', bg: '#fff7ed', textColor: '#9a3412' };
        return { label: 'New', color: '#10b981', bg: '#f0fdf4', textColor: '#065f46' };
    };

    const isUrgent = (closedAt: string) => {
        if (!closedAt) return false;
        try {
            const datePart = closedAt.split(' ')[0];
            const [day, month, year] = datePart.split('/');
            const closeDate = new Date(`${year}-${month}-${day}`);
            const now = new Date();
            const diffDays = Math.ceil((closeDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
            return diffDays <= 7;
        } catch {
            return false;
        }
    };

    const handleJobPress = (jobId: number) => {
        navigation.navigate('jobDetail', { jobId });
    };

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <View style={styles.headerIcon}>
                    <FontAwesomeIcon icon={faBriefcase} size={20} color="white" />
                </View>
                <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>Dự án đang tuyển dụng</Text>
                    <Text style={styles.headerSubtitle}>Các dự án đang tuyển dụng freelancer</Text>
                </View>
                <View style={styles.jobCount}>
                    <Text style={styles.jobCountText}>{data.activeJobs?.length || 0} dự án</Text>
                </View>
            </View>

            {!data.activeJobs || data.activeJobs.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Chưa có dự án nào</Text>
                    <Text style={styles.emptyMessage}>
                        Nhà tuyển dụng này hiện chưa có dự án đang tuyển dụng
                    </Text>
                </View>
            ) : (
                <View style={styles.jobsContainer}>
                    {data.activeJobs.map((job) => {
                        const appStatus = getApplicationStatus(job.countApplies);
                        const urgent = isUrgent(job.closedAt);
                        const isApplied = applyStatus[job.id] ?? false;

                        return (
                            <TouchableOpacity
                                key={job.id}
                                style={[styles.jobCard, urgent && styles.urgentCard]}
                                onPress={() => handleJobPress(job.id)}
                                activeOpacity={0.8}
                            >
                                {urgent && (
                                    <View style={styles.urgentBanner}>
                                        <Text style={styles.urgentText}>⚡ GẤP - Hạn nộp sắp hết</Text>
                                    </View>
                                )}

                                {/* Job header */}
                                <View style={styles.jobHeader}>
                                    <View style={styles.jobTitleContainer}>
                                        <Text style={styles.jobTitle}>{job.title}</Text>
                                        <View style={styles.tagsContainer}>
                                            <View style={styles.majorTag}>
                                                <Text style={styles.majorText}>{job.majorName}</Text>
                                            </View>
                                            <View style={[styles.statusTag, { backgroundColor: appStatus.bg }]}>
                                                <FontAwesomeIcon icon={faUsers} size={12} color={appStatus.color} />
                                                <Text style={[styles.statusText, { color: appStatus.textColor }]}>
                                                    {job.countApplies} ứng viên • {appStatus.label}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.budgetContainer}>
                                        <FontAwesomeIcon icon={faMoneyBillWave} size={18} color="#fbbf24" />
                                        <Text style={styles.budgetLabel}>Ngân sách</Text>
                                        <Text style={styles.budgetValue}>{formatBudget(job.budget)}</Text>
                                    </View>
                                </View>

                                {/* Timeline */}
                                <View style={styles.timelineSection}>
                                    <View style={styles.sectionTitle}>
                                        <FontAwesomeIcon icon={faCalendarCheck} size={16} color="#2563eb" />
                                        <Text style={styles.sectionTitleText}>Thời gian dự án</Text>
                                    </View>
                                    <View style={styles.timeInfoContainer}>
                                        <View style={styles.timeInfoItem}>
                                            <FontAwesomeIcon icon={faClock} size={14} color="#6b7280" />
                                            <Text style={styles.timeInfoLabel}>Thời lượng</Text>
                                            <Text style={styles.timeInfoValue}>{job.durationHours}h</Text>
                                        </View>
                                        <View style={styles.timeInfoItem}>
                                            <FontAwesomeIcon icon={faCalendarAlt} size={14} color="#2563eb" />
                                            <Text style={[styles.timeInfoLabel, { color: '#2563eb' }]}>Đăng ngày</Text>
                                            <Text style={[styles.timeInfoValue, { color: '#1e40af' }]}>{formatDate(job.postedAt)}</Text>
                                        </View>
                                        <View style={[styles.timeInfoItem, urgent ? styles.urgentTimeItem : styles.normalTimeItem]}>
                                            <FontAwesomeIcon icon={faCalendarAlt} size={14} color={urgent ? '#ef4444' : '#f97316'} />
                                            <Text style={[styles.timeInfoLabel, { color: urgent ? '#ef4444' : '#f97316' }]}>
                                                Hạn nộp
                                            </Text>
                                            <Text style={[styles.timeInfoValue, { color: urgent ? '#dc2626' : '#ea580c' }]}>
                                                {formatDate(job.closedAt)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Skills */}
                                <View style={styles.skillsSection}>
                                    <View style={styles.sectionTitle}>
                                        <FontAwesomeIcon icon={faAward} size={16} color="#2563eb" />
                                        <Text style={styles.sectionTitleText}>
                                            Kỹ năng yêu cầu ({job.skills?.length || 0})
                                        </Text>
                                    </View>
                                    <View style={styles.skillsContainer}>
                                        {job.skills?.slice(0, 6).map((skill, skillIndex) => (
                                            <View key={skillIndex} style={styles.skillTag}>
                                                <Text style={styles.skillText}>{skill}</Text>
                                            </View>
                                        ))}
                                        {job.skills && job.skills.length > 6 && (
                                            <View style={styles.moreSkillsTag}>
                                                <Text style={styles.moreSkillsText}>+{job.skills.length - 6} kỹ năng</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>

                                {/* Apply button */}
                                {!isApplied ? (
                                    <TouchableOpacity
                                        style={styles.applyButton}
                                        onPress={() => navigation.navigate('apply', { id: job?.id })}
                                    >
                                        <Text style={styles.applyButtonText}>ỨNG TUYỂN</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <View style={styles.appliedContainer}>
                                        <Text style={styles.appliedText}>ĐÃ ỨNG TUYỂN</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e2e8f0',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    headerIcon: {
        backgroundColor: '#2563eb',
        borderRadius: 12,
        padding: 8,
        marginRight: 12,
    },
    headerText: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#6b7280',
    },
    jobCount: {
        backgroundColor: '#dbeafe',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    jobCountText: {
        color: '#2563eb',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        elevation: 1,
    },
    emptyTitle: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyMessage: {
        fontSize: 14,
        color: '#9ca3af',
        textAlign: 'center',
        lineHeight: 20,
    },
    jobsContainer: {
        gap: 20,
    },
    jobCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        elevation: 2,
    },
    urgentCard: {
        borderColor: '#fecaca',
    },
    urgentBanner: {
        backgroundColor: '#ef4444',
        padding: 8,
    },
    urgentText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    jobHeader: {
        backgroundColor: '#2563eb',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    jobTitleContainer: {
        flex: 1,
        marginRight: 16,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 12,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    majorTag: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    majorText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'white',
    },
    statusTag: {
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderWidth: 1,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
    },
    budgetContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        minWidth: 110,
    },
    budgetLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 11,
        marginTop: 4,
        marginBottom: 4,
    },
    budgetValue: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
    },
    timelineSection: {
        padding: 16,
    },
    sectionTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    sectionTitleText: {
        color: '#2563eb',
        fontSize: 14,
        fontWeight: '600',
    },
    timeInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    timeInfoItem: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    urgentTimeItem: {
        backgroundColor: '#fef2f2',
        borderColor: '#fecaca',
    },
    normalTimeItem: {
        backgroundColor: '#fef7ed',
        borderColor: '#fed7aa',
    },
    timeInfoLabel: {
        fontSize: 11,
        marginTop: 4,
        textAlign: 'center',
        marginBottom: 4,
    },
    timeInfoValue: {
        fontSize: 11,
        fontWeight: '700',
        textAlign: 'center',
    },
    skillsSection: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        padding: 12,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    skillTag: {
        backgroundColor: '#dbeafe',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#93c5fd',
    },
    skillText: {
        color: '#2563eb',
        fontSize: 12,
        fontWeight: '600',
    },
    moreSkillsTag: {
        backgroundColor: '#f3f4f6',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d5db',
    },
    moreSkillsText: {
        color: '#6b7280',
        fontSize: 12,
        fontWeight: '600',
    },
    applyButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 10,
        elevation: 2,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
    },
    appliedContainer: {
        backgroundColor: 'rgba(121, 251, 138, 0.8)',
        paddingVertical: 14,
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 10,
    },
    appliedText: {
        color: 'rgba(3, 126, 19, 0.9)',
        fontSize: 15,
        fontWeight: '700',
    },
});