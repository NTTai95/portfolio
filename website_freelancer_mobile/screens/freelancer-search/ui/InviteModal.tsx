// app/(client)/freelancers/search/_ui/InviteModal.tsx
import { apiGetRecruitingJobs, apiInviteFreelancer } from '@/api/create';
import { ResponseDetail } from '@/types/respones/detail';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InviteModalProps {
    onCancel: () => void;
    onSuccess: () => void;
    freelancer: ResponseDetail.FreelancerSearchResponse['freelancers'][0];
}

interface RecruitingJob {
    id: number;
    title: string;
    description: string;
    budget: number;
    durationHours: number;
    postedAt: string;
    closedAt: string;
    step: string;
    major: { id: number; name: string };
    skills: string[];
    languages: string[];
    totalApplies: number;
    pendingApplies: number;
}

export default function InviteModal({
    onCancel,
    onSuccess,
    freelancer
}: InviteModalProps) {
    const [loading, setLoading] = useState(false);
    const [jobsLoading, setJobsLoading] = useState(false);
    const [recruitingJobs, setRecruitingJobs] = useState<RecruitingJob[]>([]);
    const [selectedJob, setSelectedJob] = useState<RecruitingJob | null>(null);
    const [messageText, setMessageText] = useState('');
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [messageError, setMessageError] = useState<string | null>(null);

    useEffect(() => {
        fetchRecruitingJobs();
    }, []);

    const fetchRecruitingJobs = async () => {
        try {
            setJobsLoading(true);
            const response = await apiGetRecruitingJobs();
            setRecruitingJobs(response.data.jobs || []);
        } catch (error) {
            console.error('Error fetching recruiting jobs:', error);
        } finally {
            setJobsLoading(false);
        }
    };

    const handleJobSelect = (jobId: number) => {
        const job = recruitingJobs.find(j => j.id === jobId);
        setSelectedJob(job || null);
        setSelectedJobId(jobId);
    };

    const handleSubmit = async () => {
        if (!selectedJobId) {
            // Nếu chưa chọn job, focus vào picker (không cần thông báo vì UI đã rõ)
            return;
        }

        if (!messageText.trim()) {
            setMessageError('Vui lòng nhập lời nhắn');
            return;
        }


        try {
            setLoading(true);
            await apiInviteFreelancer(freelancer.id, {
                jobId: selectedJobId,
                message: messageText
            });
            setMessageText('');
            setSelectedJob(null);
            setSelectedJobId(null);
            onSuccess();
        } catch (error: unknown) {
            console.error('Error inviting freelancer:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatBudget = (budget: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(budget);
    };

    return (
        <Modal
            transparent
            animationType="slide"
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={onCancel}
                />

                <View style={styles.modalContent}>
                    {/* Header with close button */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Mời freelancer</Text>
                        <TouchableOpacity onPress={onCancel}>
                            <Icon name="close" size={24} color="#4b5563" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.scrollContainer}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Freelancer Info */}
                        <View style={styles.freelancerCard}>
                            <Image
                                source={{ uri: freelancer.avatar }}
                                style={styles.avatar}
                            />
                            <View style={styles.freelancerDetails}>
                                <Text style={styles.freelancerName}>{freelancer.fullName}</Text>
                                <View style={styles.metaContainer}>
                                    <View style={styles.reputationContainer}>
                                        <Icon name="star" size={14} color="#f59e0b" />
                                        <Text style={styles.reputationText}>
                                            {freelancer.reputation}
                                        </Text>
                                    </View>
                                    <Text style={styles.skillsText} numberOfLines={1}>
                                        {freelancer.skills.slice(0, 3).join(', ')}
                                        {freelancer.skills.length > 3 && '...'}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Job Selection */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Chọn dự án</Text>

                            {jobsLoading ? (
                                <ActivityIndicator size="small" color="#355a8e" style={styles.loader} />
                            ) : (
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={selectedJobId || undefined}
                                        onValueChange={handleJobSelect}
                                        dropdownIconColor="#6b7280"
                                    >
                                        <Picker.Item label="Chọn dự án" value={null} />
                                        {recruitingJobs.map(job => (
                                            <Picker.Item
                                                key={job.id}
                                                label={job.title}
                                                value={job.id}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            )}
                        </View>

                        {/* Selected Job Details */}
                        {selectedJob && (
                            <View style={styles.jobCard}>
                                <Text style={styles.jobCardTitle}>{selectedJob.title}</Text>

                                <View style={styles.jobMeta}>
                                    <View style={styles.metaItem}>
                                        <Icon name="cash" size={16} color="#10b981" />
                                        <Text style={styles.jobBudget}>
                                            {formatBudget(selectedJob.budget)}
                                        </Text>
                                    </View>

                                    <View style={styles.metaItem}>
                                        <Icon name="clock-outline" size={16} color="#6b7280" />
                                        <Text>{selectedJob.durationHours} giờ</Text>
                                    </View>
                                </View>

                                <Text style={styles.subSectionTitle}>Kỹ năng yêu cầu</Text>
                                <View style={styles.tagsContainer}>
                                    {selectedJob.skills.map((skill, index) => (
                                        <Text key={index} style={styles.tag}>{skill}</Text>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Message - Updated label and added error */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Lời nhắn (*)</Text>
                            <TextInput
                                style={[
                                    styles.textArea,
                                    messageError && styles.inputError // Thêm style lỗi
                                ]}
                                multiline
                                placeholder="Viết lời nhắn..."
                                placeholderTextColor="#9ca3af"
                                maxLength={500}
                                value={messageText}
                                onChangeText={(text) => {
                                    setMessageText(text);
                                    // Clear error khi người dùng bắt đầu nhập
                                    if (messageError) setMessageError(null);
                                }}
                            />
                            {messageError && (
                                <Text style={styles.errorText}>{messageError}</Text>
                            )}
                            <Text style={styles.charCount}>
                                {messageText.length}/500
                            </Text>
                        </View>
                    </ScrollView>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                (!selectedJobId || loading) && styles.disabledButton
                            ]}
                            onPress={handleSubmit}
                            disabled={loading || !selectedJobId}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" size="small" />
                            ) : (
                                <Text style={styles.submitButtonText}>Gửi lời mời</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputError: {
        borderColor: '#ef4444',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: '90%',
    },
    scrollContainer: {
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingBottom: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    freelancerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    freelancerDetails: {
        flex: 1,
    },
    freelancerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reputationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fef3c7',
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginRight: 8,
    },
    reputationText: {
        fontWeight: '500',
        color: '#92400e',
        marginLeft: 2,
        fontSize: 12,
    },
    skillsText: {
        color: '#6b7280',
        fontSize: 12,
        flexShrink: 1,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    loader: {
        marginVertical: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        overflow: 'hidden',
    },
    jobCard: {
        backgroundColor: '#f9fafb',
        borderRadius: 8,
        padding: 16,
        marginTop: 8,
    },
    jobCardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 8,
    },
    jobMeta: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    jobBudget: {
        fontWeight: '600',
        color: '#10b981',
    },
    subSectionTitle: {
        fontWeight: '500',
        color: '#6b7280',
        marginBottom: 8,
        fontSize: 13,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    tag: {
        backgroundColor: '#f3f4f6',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontSize: 12,
        color: '#4b5563',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        textAlignVertical: 'top',
        fontSize: 14,
        backgroundColor: 'white',
    },
    charCount: {
        textAlign: 'right',
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        padding: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d5db',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#4b5563',
        fontWeight: '500',
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#355a8e',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#9ca3af',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});