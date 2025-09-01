// screens/freelancer/_ui/PersonalInfo.tsx
import { apiPost } from '@/api/baseApi';
import { addMessage } from '@/store/volatile/messageSlice';
import { ResponseDetail } from '@/types/respones/detail';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Clipboard, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface PersonalInfoProps {
    data: ResponseDetail.Freelancer;
}

const reportOptions = [
    'Hành vi gian lận hoặc lừa đảo',
    'Ngôn từ không phù hợp hoặc xúc phạm',
    'Thông tin cá nhân giả mạo',
    'Spam hoặc quảng cáo không mong muốn',
    'Đăng tải nội dung không phù hợp',
    'Yêu cầu thanh toán ngoài hệ thống',
    'Vi phạm điều khoản dịch vụ',
    'Quấy rối hoặc đe dọa',
    'Cung cấp thông tin sai lệch',
    'Khác (tự nhập tiêu đề)',
];

export default function PersonalInfo({ data }: PersonalInfoProps) {
    const personalData = data;
    const dispatch = useDispatch();
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportContent, setReportContent] = useState("");
    const [reportTitle, setReportTitle] = useState("");
    const [customTitle, setCustomTitle] = useState("");

    const calculateAge = (birthday: string) => {
        const today = new Date();
        const birthDate = new Date(birthday.split('/').reverse().join('-'));
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    const getReputationLevel = (reputation: number) => {
        if (reputation >= 800) return { text: 'Uy tín cao', color: '#FFD700' };
        if (reputation >= 500) return { text: 'Uy tín tốt', color: '#27ae60' };
        return { text: 'Uy tín thấp', color: '#FF7043' };
    };

    const copyToClipboard = (text: string, type: string) => {
        Clipboard.setString(text);
        dispatch(addMessage({ content: `Đã sao chép ${type}!`, type: 'success', key: 'copy-to-clipboard' }));
    };

    const handleReportSubmit = async () => {
        const finalTitle = reportTitle === 'Khác (tự nhập tiêu đề)' ? customTitle.trim() : reportTitle;

        if (!finalTitle || !reportContent.trim()) {
            dispatch(addMessage({
                key: "report-error",
                content: "Vui lòng chọn hoặc nhập tiêu đề và nội dung báo cáo!",
                type: "error"
            }));
            return;
        }

        try {
            await apiPost(`/report/client/${data.id}`, {
                title: finalTitle,
                content: reportContent
            });

            dispatch(addMessage({ content: "Báo cáo đã được gửi thành công!", type: "success", key: "report-success" }));
            setReportModalVisible(false);
            setReportContent("");
            setReportTitle("");
            setCustomTitle("");
        } catch (error) {
            dispatch(addMessage({ content: "Có lỗi xảy ra khi gửi báo cáo!", type: "error", key: "report-error" }));
        }
    };

    const reputationLevel = getReputationLevel(personalData.reputation);

    return (
        <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    {personalData.avatar ? (
                        <Image
                            source={{ uri: personalData.avatar }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>{personalData.fullName.charAt(0)}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.headerInfo}>
                    <Text style={styles.name}>{personalData.fullName}</Text>

                    <View style={[styles.reputationTag, { backgroundColor: reputationLevel.color }]}>
                        <Text style={styles.reputationText}>
                            {reputationLevel.text} • {personalData.reputation} điểm
                        </Text>
                    </View>
                </View>

                {/* Report Button */}
                <TouchableOpacity
                    style={styles.reportButton}
                    onPress={() => setReportModalVisible(true)}
                >
                    <Ionicons name="warning" size={24} color="#e74c3c" />
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Bio Section */}
            <View style={styles.bioContainer}>
                <Text style={styles.bioText}>{personalData.bio}</Text>
            </View>

            <View style={styles.divider} />

            {/* Personal Info Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="person-circle-outline" size={20} color="#3498db" />
                    <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
                </View>

                <InfoRow
                    icon="calendar"
                    label="Tuổi"
                    value={`${calculateAge(personalData.birthday)} tuổi`}
                />

                <InfoRow
                    icon={personalData.isMale ? "male" : "female"}
                    label="Giới tính"
                    value={personalData.isMale ? "Nam" : "Nữ"}
                    valueColor={personalData.isMale ? '#3498db' : '#e84393'}
                />

                <InfoRow
                    icon="time"
                    label="Tham gia"
                    value={personalData.joinedAt.substring(0, 10)}
                />
            </View>

            <View style={styles.divider} />

            {/* Contact Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="call-outline" size={20} color="#3498db" />
                    <Text style={styles.sectionTitle}>Liên hệ</Text>
                </View>

                <TouchableOpacity
                    style={styles.contactItem}
                    onPress={() => copyToClipboard(personalData.email, 'email')}
                    activeOpacity={0.7}
                >
                    <Ionicons name="mail-outline" size={24} color="#1e88e5" />
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Email</Text>
                        <Text style={styles.contactValue}>{personalData.email}</Text>
                    </View>
                    <Ionicons name="copy-outline" size={20} color="#7f8c8d" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.contactItem}
                    onPress={() => copyToClipboard(personalData.phone, 'số điện thoại')}
                    activeOpacity={0.7}
                >
                    <Ionicons name="phone-portrait-outline" size={24} color="#1e88e5" />
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Điện thoại</Text>
                        <Text style={styles.contactValue}>{personalData.phone}</Text>
                    </View>
                    <Ionicons name="copy-outline" size={20} color="#7f8c8d" />
                </TouchableOpacity>
            </View>

            {/* Report Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={reportModalVisible}
                onRequestClose={() => setReportModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Báo cáo người dùng</Text>

                        <Text style={styles.modalLabel}>Tiêu đề báo cáo</Text>
                        <Picker
                            selectedValue={reportTitle}
                            onValueChange={(itemValue) => setReportTitle(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Chọn tiêu đề..." value="" />
                            {reportOptions.map((option, index) => (
                                <Picker.Item key={index} label={option} value={option} />
                            ))}
                        </Picker>

                        {reportTitle === 'Khác (tự nhập tiêu đề)' && (
                            <>
                                <Text style={styles.modalLabel}>Tiêu đề tùy chỉnh</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={customTitle}
                                    onChangeText={setCustomTitle}
                                    placeholder="Nhập tiêu đề báo cáo"
                                />
                            </>
                        )}

                        <Text style={styles.modalLabel}>Nội dung báo cáo</Text>
                        <TextInput
                            style={[styles.textInput, styles.multilineInput]}
                            multiline
                            numberOfLines={4}
                            value={reportContent}
                            onChangeText={setReportContent}
                            placeholder="Mô tả chi tiết lý do bạn báo cáo..."
                        />

                        <Text style={styles.modalNote}>
                            Chúng tôi sẽ xem xét báo cáo của bạn trong thời gian sớm nhất
                        </Text>

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setReportModalVisible(false);
                                    setReportTitle("");
                                    setCustomTitle("");
                                }}
                            >
                                <Text style={styles.buttonText}>Huỷ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.submitButton]}
                                onPress={handleReportSubmit}
                            >
                                <Text style={styles.buttonText}>Gửi báo cáo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// Helper component for info rows
const InfoRow = ({ icon, label, value, valueColor = '#2c3e50' }: any) => (
    <View style={styles.infoRow}>
        <Ionicons name={icon} size={20} color="#7f8c8d" />
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, { color: valueColor }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        position: 'relative',
    },
    avatarContainer: {
        marginRight: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#e3f2fd',
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#bbdefb',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#e3f2fd',
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1e88e5',
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 8,
    },
    reputationTag: {
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    reputationText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    reportButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 16,
    },
    bioContainer: {
        backgroundColor: '#f8fdff',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#1e88e5',
    },
    bioText: {
        color: '#37474f',
        lineHeight: 22,
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#2c3e50',
        marginLeft: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    infoLabel: {
        flex: 1,
        color: '#7f8c8d',
        fontWeight: '500',
        marginLeft: 12,
        fontSize: 15,
    },
    infoValue: {
        fontWeight: '500',
        fontSize: 15,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    contactInfo: {
        flex: 1,
        marginLeft: 16,
    },
    contactLabel: {
        color: '#7f8c8d',
        fontSize: 14,
        marginBottom: 4,
    },
    contactValue: {
        color: '#1565c0',
        fontWeight: '500',
        fontSize: 15,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2c3e50',
    },
    modalLabel: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 8,
        color: '#2c3e50',
    },
    picker: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 16,
    },
    textInput: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        fontSize: 15,
    },
    multilineInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    modalNote: {
        fontSize: 13,
        color: '#7f8c8d',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        minWidth: '45%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#e0e0e0',
    },
    submitButton: {
        backgroundColor: '#e74c3c',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});