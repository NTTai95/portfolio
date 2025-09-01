// screens/jobs/ui/JobCard.tsx
import { apiGet } from "@/api/baseApi";
import { ResponseRecord } from "@/types/respones/record";
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    job: ResponseRecord.Job;
    highlightSkill?: number[];
    search?: string;
    index?: number;
}

export default function JobCard({ job, highlightSkill, search }: Props) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isApply, setIsApply] = useState(false);

    useEffect(() => {
        apiGet(`/jobs/${job?.id}/is-apply`).then((res) => {
            setIsApply(res.data as boolean);
        })
    }, [])

    const navigateToDetail = () => {
        navigation.navigate('jobDetail', { jobId: job.id });
    };

    const navigateToEmployer = () => {
        navigation.navigate('employer', { id: job.employerId });
    };

    const navigateToApply = () => {
        navigation.navigate('apply', { id: job.id });
    };

    const getHighlightedText = (text: string, highlight: string) => {
        if (!highlight.trim()) return text;

        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <Text key={i} style={styles.highlightText}>{part}</Text>
            ) : (
                part
            )
        );
    };

    // Sửa lỗi định dạng ngày
    const formatDate = (dateString: string) => {
        // Kiểm tra nếu dateString không hợp lệ
        if (!dateString || dateString.includes('NaN')) {
            return 'Đang cập nhật';
        }

        // Định dạng: DD/MM/YYYY HH:mm:ss
        const parts = dateString.split(' ');
        if (parts.length < 1) return dateString;

        const datePart = parts[0];
        return datePart; // Chỉ trả về phần ngày
    };

    // Format ngày đăng
    const formatPostedDate = (dateString: string) => {
        if (!dateString) return 'Đang cập nhật';

        // Định dạng: DD/MM/YYYY HH:mm:ss
        const parts = dateString.split(' ');
        if (parts.length < 1) return dateString;

        const datePart = parts[0];
        const [day, month, year] = datePart.split('/');
        return `Đăng ngày: ${day}/${month}/${year}`;
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={navigateToDetail}
            activeOpacity={0.9}
        >
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.statusIndicator} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={navigateToEmployer}>
                        <Image
                            source={{ uri: job.employerAvatar || 'https://via.placeholder.com/50' }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>

                    <View style={styles.headerText}>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                            {getHighlightedText(job.title, search || '')}
                        </Text>

                        <View style={styles.employerRow}>
                            <TouchableOpacity onPress={navigateToEmployer}>
                                <Text style={styles.employer} numberOfLines={1} ellipsizeMode="tail">
                                    {job.employerFullName}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.postedDate}>
                                {formatPostedDate(job.postedAt)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Job Info Highlights - Tách thành 2 dòng */}
            <View style={styles.highlightsRow}>
                <View style={styles.highlightItem}>
                    <AntDesign name="creditcard" size={16} color="#3b82f6" />
                    <Text style={styles.highlightTextValue} numberOfLines={1}>
                        {job.budget.toLocaleString()} đ
                    </Text>
                </View>

                <View style={styles.highlightItem}>
                    <AntDesign name="clockcircle" size={16} color="#3b82f6" />
                    <Text style={styles.highlightTextValue} numberOfLines={1}>
                        {job.durationHours} giờ
                    </Text>
                </View>
            </View>

            <View style={styles.highlightsRow}>
                <View style={styles.highlightItem}>
                    <AntDesign name="calendar" size={16} color="#3b82f6" />
                    <Text style={styles.highlightTextValue} numberOfLines={1}>
                        {formatDate(job.closedAt)}
                    </Text>
                </View>

                <View style={styles.highlightItem}>
                    <AntDesign name="team" size={16} color="#3b82f6" />
                    <Text style={styles.highlightTextValue} numberOfLines={1}>
                        {job.countApplies} ứng viên
                    </Text>
                </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
                <Text
                    style={styles.description}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                >
                    {job.description}
                </Text>
            </View>

            {/* Tags Section - Hiển thị major */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Yêu cầu công việc</Text>
            </View>
            <View style={styles.tagsContainer}>
                {job.major && (
                    <View style={[styles.tag, styles.tagMajor]}>
                        <Text style={[styles.tagText, styles.textMajor]}>{job.major.name}</Text>
                    </View>
                )}

                {job.skills.map(skill => (
                    <View
                        key={`skill-${skill.id}`}
                        style={[
                            styles.tag,
                            highlightSkill?.includes(skill.id) && styles.highlightTag
                        ]}
                    >
                        <Text style={styles.tagText}>{skill.name}</Text>
                    </View>
                ))}
            </View>

            {/* Apply Button */}
            <TouchableOpacity
                style={[
                    styles.applyButton,
                    isApply && styles.appliedButton
                ]}
                onPress={isApply ? undefined : navigateToApply}
                disabled={isApply}
            >
                {isApply ? (
                    <View style={styles.buttonContent}>
                        <AntDesign name="checkcircle" size={16} color="#10B981" />
                        <Text style={[styles.applyButtonText, styles.appliedButtonText]}>Đã ứng tuyển</Text>
                    </View>
                ) : (
                    <Text style={styles.applyButtonText}>Ứng tuyển ngay</Text>
                )}
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    statusIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: 4,
        backgroundColor: '#3b82f6',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    headerContainer: {
        position: 'relative',
        paddingLeft: 8,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 12,
        marginRight: 12,
        backgroundColor: '#F1F5F9',
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
        lineHeight: 24,
    },
    employerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    employer: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3B82F6',
        marginRight: 8,
    },
    postedDate: {
        fontSize: 13,
        color: '#64748B',
    },
    highlightsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    highlightItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFC',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flex: 1,
        marginHorizontal: 4,
        maxWidth: '48%',
    },
    highlightTextValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
        marginLeft: 6,
        flexShrink: 1,
    },
    descriptionContainer: {
        marginVertical: 16,
    },
    description: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 22,
    },
    sectionHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 8,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    tag: {
        backgroundColor: '#3b82f630',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    tagMajor: {
        backgroundColor: '#3b82f6',
    },
    textMajor: {
        color: '#FFFFFF',
    },
    highlightTag: {
        backgroundColor: '#FEF3C7',
        borderWidth: 1,
        borderColor: '#F59E0B',
    },
    tagText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#3b89f9',
    },
    highlightText: {
        backgroundColor: '#FEF08A',
        color: '#000',
        fontWeight: '700',
    },
    applyButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appliedButton: {
        backgroundColor: '#ECFDF5',
        borderWidth: 1,
        borderColor: '#10B981',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
    appliedButtonText: {
        color: '#10B981',
        marginLeft: 8,
        fontWeight: '600',
    },
});