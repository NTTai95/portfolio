import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useMilestones } from "../ContextMilestone";
import { apiPost } from "@/api/baseApi";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/volatile/messageSlice";

interface ActionEmployerProps {
    milestone: any;
    canCombined: boolean;
    onEditClick: () => void;
    onSplitClick: () => void;
    onDeleteClick: () => void;
}

const ActionEmployer: React.FC<ActionEmployerProps> = ({
    milestone,
    canCombined,
    onEditClick,
    onSplitClick,
    onDeleteClick,
}) => {
    const { fetchData, data } = useMilestones();
    const dispatch = useDispatch();
    const [disputeModalVisible, setDisputeModalVisible] = useState(false);
    const [disputeReason, setDisputeReason] = useState("");
    const [disputeLoading, setDisputeLoading] = useState(false);

    const handlePayment = () => {
        // Implement payment logic for mobile
        dispatch(
            addMessage({
                key: "payment-info",
                type: "info",
                content: "Chức năng thanh toán đang được phát triển",
            })
        );
    };

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
                if (fetchData) fetchData(); // Refresh data
            })
            .catch((err) => {
                dispatch(
                    addMessage({
                        key: "error",
                        type: "error",
                        content: err.message || "Đã xảy ra lỗi",
                    })
                );
            })
            .finally(() => {
                setDisputeLoading(false);
            });
    };

    if (data?.job?.status === "PREPARING") {
        return (
            <View style={styles.buttonGroup}>
                {/* Edit Button */}
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={onEditClick}
                >
                    <AntDesign name="edit" size={16} color="#3b82f6" />
                    <Text style={[styles.buttonText, styles.editText]}>Chỉnh sửa</Text>
                </TouchableOpacity>

                {/* Split Button */}
                <TouchableOpacity
                    style={[styles.button, styles.splitButton]}
                    onPress={onSplitClick}
                >
                    <MaterialIcons name="content-cut" size={16} color="#10b981" />
                    <Text style={[styles.buttonText, styles.splitText]}>Tách giai đoạn</Text>
                </TouchableOpacity>

                {/* Delete Button */}
                {canCombined && (
                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={onDeleteClick}
                    >
                        <AntDesign name="delete" size={16} color="#ef4444" />
                        <Text style={[styles.buttonText, styles.deleteText]}>Xóa giai đoạn</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    if (data?.job?.status === "IN_PROGRESS") {
        if (milestone?.status === "UNPAID") {
            return (
                <TouchableOpacity
                    style={styles.paymentButton}
                    onPress={handlePayment}
                >
                    <AntDesign name="creditcard" size={16} color="white" />
                    <Text style={styles.paymentButtonText}>Thanh toán</Text>
                </TouchableOpacity>
            );
        }

        if (milestone?.canDispute === true) {
            return (
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
                                    Lý do tranh chấp sẽ được gửi đến admin và bên kia để giải quyết
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
            );
        }
    }

    return null;
};

const styles = StyleSheet.create({
    buttonGroup: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 8,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        gap: 6,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
    },
    editButton: {
        borderColor: "#3b82f6",
        backgroundColor: "#dbeafe",
    },
    editText: {
        color: "#3b82f6",
    },
    splitButton: {
        borderColor: "#10b981",
        backgroundColor: "#d1fae5",
    },
    splitText: {
        color: "#10b981",
    },
    deleteButton: {
        borderColor: "#ef4444",
        backgroundColor: "#fee2e2",
    },
    deleteText: {
        color: "#ef4444",
    },
    paymentButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4f46e5",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
        shadowColor: "#4f46e5",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    paymentButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
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

export default ActionEmployer;