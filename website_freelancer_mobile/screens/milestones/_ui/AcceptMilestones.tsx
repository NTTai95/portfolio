import { apiPut } from "@/api/baseApi";
import { AuthGuard } from "@/components/AuthGuard";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
import { hideSpin, showSpin } from "@/store/volatile/spinSlice";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useMilestones } from "./ContextMilestone";
import MilestoneCard from "./MilestoneCard";

export default function AcceptMilestones() {
    const route = useRoute<RouteProp<RootStackParamList, 'milestone'>>();
    const id = route.params.id;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { data, fetchData } = useMilestones();
    const dispatch = useDispatch<AppDispatch>();
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [sendReason, setSendReason] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            fetchData().finally(() => setIsLoading(false));
        }, [id])
    );

    const handleSendFreelancer = () => {
        dispatch(showSpin());
        apiPut(`/jobs/${id}/send-freelancer`)
            .then(() => {
                dispatch(
                    addMessage({
                        key: "send-freelancer",
                        content: "Gửi danh sách thành công!",
                        type: "success",
                    })
                );
                fetchData();
            })
            .catch(() => {
                dispatch(
                    addMessage({
                        key: "send-freelancer",
                        content: "Gửi danh sách thất bại!",
                        type: "error",
                    })
                );
            })
            .finally(() => {
                dispatch(hideSpin());
            });
    };

    const handleAcceptMilestones = () => {
        dispatch(showSpin());
        apiPut(`/jobs/${id}/accept-milestone`)
            .then(() => {
                dispatch(
                    addMessage({
                        key: "accept-milestones",
                        content: "Chấp nhận thành công!",
                        type: "success",
                    })
                );
                fetchData();
            })
            .catch(() => {
                dispatch(
                    addMessage({
                        key: "accept-milestones",
                        content: "Chấp nhận thất bại!",
                        type: "error",
                    })
                );
            })
            .finally(() => {
                dispatch(hideSpin());
            });
    };

    const handleOpenRejectModal = () => {
        setIsRejectModalOpen(true);
    };

    const handleRejectMilestones = () => {
        if (sendReason && !rejectReason) {
            return;
        }

        dispatch(showSpin());

        const payload = sendReason && rejectReason ? { reason: rejectReason } : {};

        apiPut(`/jobs/${id}/reject-milestone`, payload)
            .then(() => {
                dispatch(
                    addMessage({
                        key: "reject-milestones",
                        content: "Từ chối thành công!",
                        type: "success",
                    })
                );
                fetchData();
            })
            .catch(() => {
                dispatch(
                    addMessage({
                        key: "reject-milestones",
                        content: "Từ chối thất bại!",
                        type: "error",
                    })
                );
            })
            .finally(() => {
                dispatch(hideSpin());
                setIsRejectModalOpen(false);
                setRejectReason("");
                setSendReason(true);
            });
    };

    const goBack = () => {
        navigation.goBack();
    };

    const goToChat = () => {
        navigation.navigate("chatbox", { receiverId: data?.employerId });
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    const allDraft = data?.milestones?.every(
        (milestone: any) => milestone.status === "DRAFT"
    );

    const allPending = data?.milestones?.every(
        (milestone: any) => milestone.status === "PENDING"
    );

    const allRejected = data?.milestones?.every(
        (milestone: any) => milestone.status === "REJECTED"
    );

    // Xác định xem có cần hiển thị nút hành động không
    const showActionButtons = data?.milestones && data.milestones.length > 0;

    return (
        <View style={styles.flexContainer}>
            <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.folderIcon}>
                            <FontAwesome name="folder-open" size={24} color="#3b82f6" />
                        </View>
                        <View>
                            <Text style={styles.projectLabel}>DỰ ÁN ĐANG XEM</Text>
                            <Text style={styles.projectTitle} numberOfLines={1}>
                                {data?.job?.title || "Đang tải..."}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={goBack} style={styles.backButton}>
                        <AntDesign name="arrowleft" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Milestones List */}
                {data?.milestones?.map((ms: any, index: number) => (
                    <MilestoneCard
                        key={ms.id}
                        milestone={ms}
                        canCombined={data?.milestones?.length > 1}
                        index={index}
                        totalProjectBudget={data?.job?.totalProjectBudget || data?.job?.budget}
                        jobMilestones={data?.milestones}
                        jobId={id}
                    />
                ))}

                {/* Empty State */}
                {(!data?.milestones || data?.milestones.length === 0) && (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIcon}>
                            <MaterialIcons name="search-off" size={50} color="#6a67fe" />
                        </View>
                        <Text style={styles.emptyTitle}>
                            Chưa có giai đoạn nào được thiết lập
                        </Text>
                        <Text style={styles.emptySubtitle}>
                            Các giai đoạn đang được nhà tuyển dụng chuẩn bị
                        </Text>
                        <Text style={styles.emptySubtitle}>
                            Vui lòng liên hệ hoặc đợi thêm thông tin
                        </Text>

                        <TouchableOpacity style={styles.chatButton} onPress={goToChat}>
                            <MaterialIcons name="message" size={20} color="white" />
                            <Text style={styles.chatButtonText}>
                                Nhắn tin cho nhà tuyển dụng
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.infoRow}>
                            <AntDesign name="clockcircleo" size={16} color="#9ca3af" />
                            <Text style={styles.infoText}>Thông tin sẽ được cập nhật sớm</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Action Buttons - FIXED */}
            {showActionButtons && (
                <View style={styles.fixedButtonContainer}>
                    <AuthGuard
                        roles={["ROLE_FREELANCER"]}
                        fallback={
                            (allDraft || allRejected) && (
                                <TouchableOpacity
                                    style={styles.sendButton}
                                    onPress={handleSendFreelancer}
                                >
                                    <Text style={styles.buttonText}>
                                        Gửi danh sách giai đoạn đến freelancer
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    >
                        {allPending && (
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.acceptButton]}
                                    onPress={handleAcceptMilestones}
                                >
                                    <Text style={styles.actionButtonText}>
                                        Chấp nhận
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.rejectButton]}
                                    onPress={handleOpenRejectModal}
                                >
                                    <Text style={[styles.actionButtonText, styles.rejectButtonText]}>
                                        Từ chối
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </AuthGuard>
                </View>
            )}

            {/* Reject Modal */}
            <Modal
                visible={isRejectModalOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsRejectModalOpen(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <AntDesign name="exclamationcircle" size={24} color="#f59e0b" />
                            <Text style={styles.modalTitle}>Từ chối giai đoạn</Text>
                        </View>

                        <Text style={styles.modalLabel}>
                            Lý do từ chối (không bắt buộc)
                        </Text>
                        <TextInput
                            style={[
                                styles.textArea,
                                !sendReason && styles.disabledInput,
                            ]}
                            multiline
                            numberOfLines={4}
                            placeholder="Nhập lý do từ chối..."
                            value={rejectReason}
                            onChangeText={setRejectReason}
                            editable={sendReason}
                        />

                        <View style={styles.switchContainer}>
                            <Switch
                                value={sendReason}
                                onValueChange={setSendReason}
                                trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
                                thumbColor="#fff"
                            />
                            <Text style={styles.switchLabel}>Gửi lý do cho nhà tuyển dụng</Text>
                        </View>
                        <Text style={styles.modalNote}>
                            Lưu ý: Lý do sẽ được gửi qua tin nhắn cho nhà tuyển dụng
                        </Text>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setIsRejectModalOpen(false)}
                            >
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleRejectMilestones}
                            >
                                <Text style={styles.confirmButtonText}>Xác nhận từ chối</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    container: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fafc",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        padding: 16,
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 16,
    },
    folderIcon: {
        backgroundColor: "#dbeafe",
        padding: 12,
        borderRadius: 50,
        marginRight: 12,
    },
    projectLabel: {
        fontSize: 12,
        color: "#6b7280",
    },
    projectTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1f2937",
        maxWidth: 200,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
    },
    backText: {
        marginLeft: 4,
        color: "#374151",
    },
    emptyContainer: {
        alignItems: "center",
        padding: 24,
        backgroundColor: "white",
        borderRadius: 12,
        marginTop: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    emptyIcon: {
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 8,
        textAlign: "center",
    },
    emptySubtitle: {
        fontSize: 14,
        color: "#6b7280",
        textAlign: "center",
        marginBottom: 4,
    },
    chatButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6a67fe",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 16,
    },
    chatButtonText: {
        color: "white",
        fontWeight: "600",
        marginLeft: 8,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
    },
    infoText: {
        marginLeft: 8,
        color: "#9ca3af",
        fontSize: 12,
    },
    sendButton: {
        backgroundColor: "#4f46e5",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#4f46e5",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
    },
    actionButton: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
    },
    acceptButton: {
        backgroundColor: "#4f46e5",
        borderColor: "#4f46e5",
    },
    rejectButton: {
        backgroundColor: "white",
        borderColor: "#ef4444",
    },
    actionButtonText: {
        fontWeight: "bold",
        fontSize: 14,
        color: '#fff'
    },
    rejectButtonText: {
        color: "#ef4444",
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
        borderRadius: 16,
        padding: 24,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
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
        minHeight: 100,
        marginBottom: 16,
        textAlignVertical: "top",
    },
    disabledInput: {
        backgroundColor: "#f3f4f6",
        color: "#9ca3af",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    switchLabel: {
        marginLeft: 8,
        color: "#4b5563",
    },
    modalNote: {
        fontSize: 12,
        color: "#9ca3af",
        fontStyle: "italic",
        marginBottom: 16,
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
    // NEW STYLES FOR FIXED BUTTONS
    fixedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
});