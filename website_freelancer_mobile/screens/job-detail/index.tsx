// screens/job-detail/index.tsx
import { apiGet, apiPost } from '@/api/baseApi';
import {
    faCalendarCheck,
    faCalendarDay,
    faChevronLeft,
    faClock,
    faCoins,
    faEnvelope,
    faExclamationTriangle,
    faMedal,
    faPhone,
    faVenusMars
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const JobDetail = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'jobDetail'>>();
    const id = route.params?.jobId;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [job, setJob] = useState<any>(null);
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportContent, setReportContent] = useState('');
    const [reporting, setReporting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobRes = await apiGet(`/jobs/${id}/public`);
                setJob(jobRes.data);

                const applyRes = await apiGet(`/jobs/${id}/is-apply`);
                setIsApplied(applyRes.data as boolean);
            } catch (err) {
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, navigation]);

    const handleReportSubmit = async () => {
        if (!reportContent.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập nội dung báo cáo!');
            return;
        }

        setReporting(true);
        try {
            await apiPost(`/report/jobs/${id}`, {
                content: reportContent,
            });

            Alert.alert('Thành công', 'Báo cáo đã được gửi thành công!');
            setReportModalVisible(false);
            setReportContent('');
        } catch (err: any) {
            Alert.alert('Lỗi', err.message || 'Có lỗi xảy ra khi gửi báo cáo');
        } finally {
            setReporting(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1e88e5" />
                <Text style={styles.loadingText}>Đang tải thông tin công việc...</Text>
            </View>
        );
    }

    if (!job) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Không tìm thấy công việc</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>Quay lại danh sách</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const InfoItem = ({ icon, value }: { icon: React.ReactNode; value: string }) => (
        <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>{icon}</View>
            <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">{value}</Text>
        </View>
    );

    const EmployerCard = () => (
        <View style={styles.employerCard}>
            <View style={styles.avatarContainer}>
                <TouchableOpacity>
                    {job?.employerAvatar ? (
                        <Image
                            source={{ uri: job?.employerAvatar }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>U</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.nameContainer}>
                <Text style={styles.name}>{job?.employerFullName}</Text>
            </TouchableOpacity>

            <View style={styles.reputationContainer}>
                <FontAwesomeIcon icon={faMedal} style={styles.medalIcon} />
                <Text style={styles.reputationText}>
                    {new Intl.NumberFormat('vi-VN').format(job?.employerReputation || 0)}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoContainer}>
                <InfoItem
                    icon={<FontAwesomeIcon icon={faCalendarDay} style={styles.infoIcon} />}
                    value={job?.employerBirthday || 'Chưa cập nhật'}
                />

                <InfoItem
                    icon={<FontAwesomeIcon icon={faVenusMars} style={styles.infoIcon} />}
                    value={job?.isMale ? "Nam" : "Nữ"}
                />

                <InfoItem
                    icon={<FontAwesomeIcon icon={faPhone} style={styles.infoIcon} />}
                    value={job?.phone || "Chưa cập nhật"}
                />

                <InfoItem
                    icon={<FontAwesomeIcon icon={faEnvelope} style={styles.infoIcon} />}
                    value={job?.email || "Chưa cập nhật"}
                />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <FontAwesomeIcon icon={faChevronLeft} size={24} color="#1e88e5" />
                </TouchableOpacity>

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
            </View>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Main Job Card */}
                <View style={styles.card}>
                    <View style={styles.jobHeader}>
                        <Text style={styles.categoryTag}>{job?.majorName}</Text>
                        <TouchableOpacity
                            onPress={() => setReportModalVisible(true)}
                            style={styles.reportButton}
                        >
                            <FontAwesomeIcon
                                icon={faExclamationTriangle}
                                size={20}
                                color="#ff6b6b"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.jobTitle}>{job?.title}</Text>

                    <View style={styles.budgetContainer}>
                        <Text style={styles.budgetText}>
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            }).format(job?.budget || 0)}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Job Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Mô tả công việc</Text>
                        <ScrollView
                            style={styles.descriptionScroll}
                            nestedScrollEnabled
                        >
                            <Text style={styles.descriptionText}>
                                {job?.description}
                            </Text>
                        </ScrollView>
                    </View>

                    {/* Skills */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.bulletPoint} />
                            <Text style={styles.sectionTitle}>Kỹ năng yêu cầu</Text>
                        </View>
                        <View style={styles.skillsContainer}>
                            {job?.skills?.map((skill: string, idx: number) => (
                                <Text key={idx} style={styles.skillTag}>
                                    {skill}
                                </Text>
                            ))}
                        </View>
                    </View>

                    {/* Languages */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.bulletPoint} />
                            <Text style={styles.sectionTitle}>Ngôn ngữ yêu cầu</Text>
                        </View>
                        <View style={styles.skillsContainer}>
                            {job?.languages?.map((lang: string, idx: number) => (
                                <Text key={idx} style={[styles.skillTag, styles.languageTag]}>
                                    {lang}
                                </Text>
                            ))}
                        </View>
                    </View>

                    {/* Applicants */}
                    <View style={styles.applicantsContainer}>
                        <View style={styles.applicantsIcon}>
                            <FontAwesomeIcon icon={faCalendarCheck} size={20} color="#1e88e5" />
                        </View>
                        <View>
                            <Text style={styles.applicantsLabel}>Số lượng ứng tuyển</Text>
                            <Text style={styles.applicantsCount}>
                                {job?.countApply} ứng viên
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Job Details */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Chi tiết công việc</Text>
                        <View style={styles.detailsContainer}>
                            <DetailCard
                                icon={faCalendarCheck}
                                title="Ngày đóng tuyển"
                                value={job?.closedAt}
                                color="blue"
                            />

                            <DetailCard
                                icon={faClock}
                                title="Thời lượng"
                                value={`${job?.duration} giờ`}
                                color="indigo"
                            />

                            <DetailCard
                                icon={faCoins}
                                title="Ngân sách"
                                value={new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(job?.budget || 0)}
                                color="green"
                            />
                        </View>
                    </View>
                </View>

                {/* Employer Card */}
                <EmployerCard />
            </ScrollView>

            {/* Modal báo cáo */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={reportModalVisible}
                onRequestClose={() => setReportModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Báo cáo bài đăng</Text>

                        <TextInput
                            style={styles.reportInput}
                            multiline
                            numberOfLines={5}
                            placeholder="Mô tả chi tiết lý do bạn báo cáo bài đăng này..."
                            placeholderTextColor="#999"
                            value={reportContent}
                            onChangeText={setReportContent}
                            textAlignVertical="top"
                        />

                        <Text style={styles.modalNote}>
                            Chúng tôi sẽ xem xét báo cáo của bạn trong thời gian sớm nhất
                        </Text>

                        <View style={styles.modalButtonGroup}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setReportModalVisible(false);
                                    setReportContent('');
                                }}
                                disabled={reporting}
                            >
                                <Text style={styles.cancelButtonText}>HUỶ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.submitButton]}
                                onPress={handleReportSubmit}
                                disabled={reporting}
                            >
                                {reporting ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.submitButtonText}>GỬI BÁO CÁO</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const DetailCard = ({ icon, title, value, color }: {
    icon: any;
    title: string;
    value: string;
    color: 'blue' | 'indigo' | 'green';
}) => {
    const colorStyles = {
        blue: { bg: '#e3f2fd', icon: '#1e88e5' },
        indigo: { bg: '#e8eaf6', icon: '#3949ab' },
        green: { bg: '#e8f5e9', icon: '#43a047' },
    };

    return (
        <View style={[styles.detailCard, { backgroundColor: colorStyles[color].bg }]}>
            <View style={styles.detailIcon}>
                <FontAwesomeIcon
                    icon={icon}
                    size={20}
                    color={colorStyles[color].icon}
                />
            </View>
            <View style={styles.detailTextContainer}>
                <Text style={styles.detailTitle}>{title}</Text>
                <Text style={styles.detailValue}>{value}</Text>
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
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        elevation: 2,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryTag: {
        backgroundColor: '#e3f2fd',
        color: '#1e88e5',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        fontWeight: '600',
        fontSize: 14,
        maxWidth: '80%',
    },
    jobTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 12,
        lineHeight: 28,
    },
    budgetContainer: {
        backgroundColor: '#e3f2fd',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bbdefb',
    },
    budgetText: {
        fontWeight: '700',
        color: '#1e88e5',
        fontSize: 18,
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 18,
    },
    section: {
        marginBottom: 22,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    bulletPoint: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#1e88e5',
        marginRight: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
    },
    descriptionScroll: {
        maxHeight: 200,
        marginTop: 8,
    },
    descriptionText: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        textAlign: 'justify',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    skillTag: {
        backgroundColor: '#e3f2fd',
        color: '#1e88e5',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
        fontWeight: '600',
        fontSize: 15,
    },
    languageTag: {
        backgroundColor: '#e8eaf6',
        color: '#3949ab',
    },
    applicantsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e3f2fd',
        borderRadius: 12,
        padding: 18,
        marginTop: 18,
    },
    applicantsIcon: {
        backgroundColor: '#bbdefb',
        borderRadius: 10,
        padding: 14,
        marginRight: 14,
    },
    applicantsLabel: {
        color: '#555',
        fontSize: 15,
    },
    applicantsCount: {
        fontWeight: '700',
        color: '#1e88e5',
        fontSize: 17,
        marginTop: 4,
    },
    detailsContainer: {
        marginTop: 14,
    },
    detailCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    detailIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 12,
        marginRight: 14,
    },
    detailTextContainer: {
        flex: 1,
    },
    detailTitle: {
        color: '#666',
        fontSize: 15,
        marginBottom: 4,
    },
    detailValue: {
        fontWeight: '700',
        color: '#333',
        fontSize: 16,
    },
    backButton: {
        padding: 10,
    },
    applyButton: {
        backgroundColor: '#1e88e5',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        minWidth: 120,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
    },
    appliedContainer: {
        backgroundColor: 'rgba(121, 251, 138, 0.8)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(3, 126, 19, 0.8)',
        minWidth: 120,
    },
    appliedText: {
        color: 'rgba(3, 126, 19, 0.9)',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        marginTop: 20,
        color: '#555',
        fontSize: 17,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    errorText: {
        fontSize: 19,
        color: '#555',
        marginBottom: 24,
        fontWeight: '600',
    },
    employerCard: {
        backgroundColor: '#e3f2fd',
        borderRadius: 16,
        padding: 20,
        marginTop: 24,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -50,
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#bbdefb',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    avatarText: {
        fontSize: 40,
        fontWeight: '700',
        color: '#1e88e5',
    },
    nameContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e88e5',
        textAlign: 'center',
    },
    reputationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e88e5',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: 16,
    },
    medalIcon: {
        color: '#ffd600',
        marginRight: 10,
    },
    reputationText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    infoContainer: {
        marginTop: 10,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#bbdefb',
    },
    infoIconContainer: {
        backgroundColor: '#e3f2fd',
        borderRadius: 10,
        padding: 10,
        marginRight: 14,
    },
    infoIcon: {
        color: '#1e88e5',
    },
    infoText: {
        fontWeight: '500',
        color: '#333',
        fontSize: 16,
        flex: 1,
    },
    reportButton: {
        padding: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 18,
        textAlign: 'center',
        color: '#2c3e50',
    },
    reportInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 16,
        marginBottom: 18,
        minHeight: 150,
        textAlignVertical: 'top',
        fontSize: 16,
        backgroundColor: '#f8f9fa',
    },
    modalNote: {
        fontSize: 15,
        color: '#666',
        marginBottom: 22,
        textAlign: 'center',
    },
    modalButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    modalButton: {
        borderRadius: 12,
        paddingVertical: 14,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    submitButton: {
        backgroundColor: '#ff5252',
    },
    cancelButtonText: {
        color: '#555',
        fontWeight: '700',
        fontSize: 16,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default JobDetail;