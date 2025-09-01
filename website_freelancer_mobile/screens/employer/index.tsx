import { apiPost } from '@/api/baseApi';
import { useEmployerProfile } from '@/hooks/useEmployerProfile';
import {
    faArrowLeft,
    faBriefcase,
    faEnvelopeOpen,
    faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ActiveJobsSection from './_ui/ActiveJobsSection';
import PersonalInfo from './_ui/PersonalInfo';
import TopReviews from './_ui/TopReviews';

const EmployerPage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'employer'>>();
    const id = route.params.id;

    const { data, loading, error } = useEmployerProfile({ id: Number(id) });

    // State cho modal báo cáo
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportContent, setReportContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    // Hàm định dạng ngày tháng
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

    // Hàm xử lý gửi báo cáo
    const handleReportSubmit = async () => {
        if (!reportContent.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập nội dung báo cáo!');
            return;
        }

        setIsSubmitting(true);
        try {
            await apiPost(`/report/client/${id}`, { content: reportContent });
            Alert.alert('Thành công', 'Báo cáo đã được gửi thành công!');
            setReportModalVisible(false);
            setReportContent('');
        } catch (err: any) {
            Alert.alert('Lỗi', err.message || 'Có lỗi xảy ra khi gửi báo cáo');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    if (error || !data) {
        return (
            <View style={styles.errorContainer}>
                <View style={styles.errorCard}>
                    <Text style={styles.errorTitle}>Không thể tải dữ liệu</Text>
                    <Text style={styles.errorMessage}>
                        Có lỗi xảy ra khi tải thông tin nhà tuyển dụng. Vui lòng thử lại.
                    </Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={() => window.location.reload()}>
                        <Text style={styles.retryButtonText}>Thử lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            {/* Header with Back Button */}
            <View style={styles.header}>
                <Pressable
                    onPress={handleBack}
                    style={styles.backButton}
                    android_ripple={{ color: '#dbeafe', borderless: true }}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#2563eb" />
                </Pressable>
                <Text style={styles.headerTitle}>Hồ sơ nhà tuyển dụng</Text>
            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: data.avatar }}
                        style={styles.avatar}
                    />
                </View>

                <Text style={styles.name}>{data.fullName}</Text>

                <View style={styles.tagContainer}>
                    <View style={styles.tag}>
                        <FontAwesomeIcon icon={faBriefcase} size={16} color="#fff" />
                        <Text style={styles.tagText}>Nhà tuyển dụng</Text>
                    </View>
                </View>

                <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                        <Text key={i} style={styles.star}>
                            {i < Math.floor(data.averageRating) ? '★' : '☆'}
                        </Text>
                    ))}
                    <Text style={styles.ratingText}>
                        {data.averageRating.toFixed(1)} ({formatNumber(data.totalReviews)} đánh giá)
                    </Text>
                </View>

                {/* Container cho các nút hành động */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.contactButton}
                        activeOpacity={0.8}
                    >
                        <FontAwesomeIcon icon={faEnvelopeOpen} size={20} color="#2563eb" />
                        <Text style={styles.contactButtonText}>Liên hệ</Text>
                    </TouchableOpacity>

                    {/* Nút báo cáo */}
                    <TouchableOpacity
                        style={styles.reportButton}
                        onPress={() => setReportModalVisible(true)}
                        activeOpacity={0.8}
                    >
                        <FontAwesomeIcon icon={faTriangleExclamation} size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.memberSince}>
                    <Text style={styles.memberSinceLabel}>Thành viên từ</Text>
                    <Text style={styles.memberSinceValue}>{formatDate(data.joinedAt)}</Text>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <PersonalInfo data={data} />
                <ActiveJobsSection data={data} />
                <TopReviews data={data} />
            </View>

            {/* Modal báo cáo */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={reportModalVisible}
                onRequestClose={() => setReportModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Báo cáo người dùng</Text>

                        <TextInput
                            style={styles.reportInput}
                            multiline
                            numberOfLines={4}
                            placeholder="Mô tả chi tiết lý do bạn báo cáo người dùng này..."
                            placeholderTextColor="#94a3b8"
                            value={reportContent}
                            onChangeText={setReportContent}
                        />

                        <Text style={styles.modalNote}>
                            Chúng tôi sẽ xem xét báo cáo của bạn trong thời gian sớm nhất
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setReportModalVisible(false);
                                    setReportContent('');
                                }}
                                disabled={isSubmitting}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.cancelButtonText}>Huỷ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.submitButton]}
                                onPress={handleReportSubmit}
                                disabled={isSubmitting}
                                activeOpacity={0.7}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.submitButtonText}>Gửi báo cáo</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    contentContainer: {
        paddingBottom: 30,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f8fafc',
    },
    errorCard: {
        backgroundColor: 'white',
        padding: 32,
        borderRadius: 20,
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
        elevation: 4,
    },
    errorTitle: {
        color: '#dc2626',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    errorMessage: {
        color: '#6b7280',
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 22,
    },
    retryButton: {
        backgroundColor: '#2563eb',
        borderRadius: 12,
        height: 44,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    retryButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        elevation: 2,
    },
    backButton: {
        padding: 8,
        marginRight: 16,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    profileSection: {
        backgroundColor: '#2563eb',
        padding: 20,
        alignItems: 'center',
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        textAlign: 'center',
    },
    tagContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        alignItems: 'center',
    },
    tagText: {
        color: 'white',
        fontSize: 14,
        marginLeft: 6,
        fontWeight: '500',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    star: {
        color: '#fbbf24',
        fontSize: 18,
        marginHorizontal: 2,
    },
    ratingText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 15,
        marginLeft: 8,
        fontWeight: '500',
    },
    // Container cho các nút hành động
    actionsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    contactButton: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
    },
    contactButtonText: {
        color: '#2563eb',
        fontWeight: '600',
        marginLeft: 8,
        fontSize: 15,
    },
    reportButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
    },
    memberSince: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    memberSinceLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 13,
        marginBottom: 4,
    },
    memberSinceValue: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    content: {
        padding: 16,
    },
    // Style cho modal báo cáo
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        width: '90%',
        maxWidth: 400,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#1e293b',
    },
    reportInput: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 14,
        padding: 16,
        minHeight: 140,
        textAlignVertical: 'top',
        marginBottom: 12,
        backgroundColor: '#f8fafc',
        fontSize: 15,
        lineHeight: 22,
    },
    modalNote: {
        color: '#64748b',
        fontSize: 13,
        marginBottom: 20,
        textAlign: 'center',
        lineHeight: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    cancelButton: {
        backgroundColor: '#f1f5f9',
    },
    submitButton: {
        backgroundColor: '#dc2626',
    },
    cancelButtonText: {
        color: '#334155',
        fontWeight: '600',
        fontSize: 16,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default EmployerPage;