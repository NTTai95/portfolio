import { apiPost } from "@/api/baseApi";
import { addMessage } from "@/store/volatile/messageSlice";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch } from "react-redux";

interface ActionFreelancerProps {
    milestone: any;
    jobId: number | string;
}

const ActionFreelancer: React.FC<ActionFreelancerProps> = ({ milestone, jobId }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();
    const [disputeModalVisible, setDisputeModalVisible] = useState(false);
    const [disputeReason, setDisputeReason] = useState("");
    const [disputeLoading, setDisputeLoading] = useState(false);

    const handleDisputeClick = () => {
        setDisputeModalVisible(true);
    };

    const handleDisputeConfirm = () => {
        if (!disputeReason.trim()) {
            dispatch(
                addMessage({
                    key: "error",
                    type: "error",
                    content: "Vui lòng nhập lý do tranh chấp",
                })
            );
            return;
        }

        setDisputeLoading(true);
        apiPost(`/milestone/${milestone.id}/dispute`, { reason: disputeReason })
            .then(() => {
                dispatch(
                    addMessage({
                        key: "success",
                        type: "success",
                        content: "Gửi yêu cầu tranh chấp thành công",
                    })
                );
                setDisputeModalVisible(false);
                setDisputeReason("");
            })
            .catch(() => {
                dispatch(
                    addMessage({
                        key: "error",
                        type: "error",
                        content: "Đã có lỗi xảy ra",
                    })
                );
            })
            .finally(() => {
                setDisputeLoading(false);
            });
    };

    const handleSubmitProducts = () => {
        navigation.navigate("workSubmit", { id: jobId, milestoneId: milestone.id });
    };

    return (
        <View style={styles.container}>
            {milestone?.canDispute && milestone?.status !== "DISPUTE" && (
                <>
                    <TouchableOpacity
                        style={styles.disputeButton}
                        onPress={handleDisputeClick}
                    >
                        <Text style={styles.disputeButtonText}>Mở tranh chấp</Text>
                    </TouchableOpacity>

                    {/* Dispute Modal */}
                    <Modal
                        visible={disputeModalVisible}
                        transparent
                        animationType="slide"
                        onRequestClose={() => setDisputeModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Mở tranh chấp</Text>

                                <Text style={styles.modalLabel}>
                                    Nhập lý do tranh chấp (tối đa 500 ký tự)
                                </Text>
                                <TextInput
                                    style={styles.textArea}
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Nhập lý do tranh chấp..."
                                    value={disputeReason}
                                    onChangeText={setDisputeReason}
                                    maxLength={500}
                                />
                                <Text style={styles.charCount}>
                                    {disputeReason.length}/500
                                </Text>

                                <Text style={styles.modalNote}>
                                    Lý do tranh chấp sẽ được gửi đến admin và nhà tuyển dụng để giải quyết
                                </Text>

                                <View style={styles.modalFooter}>
                                    <TouchableOpacity
                                        style={[styles.modalButton, styles.cancelButton]}
                                        onPress={() => setDisputeModalVisible(false)}
                                    >
                                        <Text style={styles.cancelButtonText}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalButton, styles.confirmButton]}
                                        onPress={handleDisputeConfirm}
                                        disabled={disputeLoading}
                                    >
                                        {disputeLoading ? (
                                            <ActivityIndicator color="white" />
                                        ) : (
                                            <Text style={styles.confirmButtonText}>
                                                Xác nhận mở tranh chấp
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </>
            )}

            {milestone?.status === "DOING" && (
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmitProducts}
                >
                    <AntDesign name="upload" size={16} color="white" />
                    <Text style={styles.submitButtonText}>Nộp sản phẩm</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 12,
        flexWrap: "wrap",
    },
    disputeButton: {
        backgroundColor: "#ef4444",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    disputeButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    submitButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#10b981",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
        shadowColor: "#10b981",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    submitButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "#1f2937",
    },
    modalLabel: {
        fontSize: 14,
        color: "#4b5563",
        marginBottom: 8,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        padding: 12,
        minHeight: 120,
        textAlignVertical: "top",
        fontSize: 14,
        marginBottom: 4,
    },
    charCount: {
        fontSize: 12,
        color: "#9ca3af",
        textAlign: "right",
        marginBottom: 12,
    },
    modalNote: {
        fontSize: 12,
        color: "#6b7280",
        marginBottom: 16,
        fontStyle: "italic",
    },
    modalFooter: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: "#f3f4f6",
    },
    cancelButtonText: {
        color: "#4b5563",
        fontWeight: "600",
    },
    confirmButton: {
        backgroundColor: "#ef4444",
    },
    confirmButtonText: {
        color: "white",
        fontWeight: "600",
    },
});

export default ActionFreelancer;