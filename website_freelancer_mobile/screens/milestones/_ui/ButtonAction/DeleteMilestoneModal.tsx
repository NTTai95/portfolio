import { apiDelete } from "@/api/baseApi";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useDispatch } from "react-redux";
import { useMilestones } from "../ContextMilestone";

interface DeleteMilestoneModalProps {
    visible: boolean;
    onCancel: () => void;
    milestone: any;
    jobMilestones: any[];
    index: number;
}

const DeleteMilestoneModal: React.FC<DeleteMilestoneModalProps> = ({
    visible,
    onCancel,
    milestone,
    jobMilestones,
    index,
}) => {
    const [loading, setLoading] = useState(false);
    const { fetchData } = useMilestones();
    const [availableMilestones, setAvailableMilestones] = useState<any[]>([]);
    const [selectedTransferId, setSelectedTransferId] = useState<string | undefined>(undefined);
    const [newPercent, setNewPercent] = useState(0);
    const [targetOrder, setTargetOrder] = useState("...");
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (visible && milestone) {
            const otherMilestones = jobMilestones.filter(
                (m) => m.id !== milestone.id
            );
            setAvailableMilestones(otherMilestones);

            if (otherMilestones.length > 0) {
                const defaultTransferId = otherMilestones[0].id;
                setSelectedTransferId(defaultTransferId);
                calculateNewPercent(defaultTransferId);
            } else {
                setSelectedTransferId(undefined);
            }
        }
    }, [visible, milestone, jobMilestones]);

    const calculateNewPercent = (targetId: string) => {
        const targetMilestone = availableMilestones.find((m) => m.id === targetId);
        if (targetMilestone) {
            setTargetOrder(targetMilestone.order);
            setNewPercent(
                Number(targetMilestone.percent) + Number(milestone.percent)
            );
        }
    };

    const handleSubmit = async () => {
        if (!selectedTransferId) return;

        setLoading(true);
        apiDelete(
            `/milestones/${milestone.id}/transfer-to-milestone/${selectedTransferId}`
        )
            .then(() => {
                dispatch(
                    addMessage({
                        key: "deleteMilestone",
                        type: "success",
                        content: "Xóa giai đoạn thành công",
                    })
                );
                fetchData();
                onCancel();
            })
            .catch(() => {
                dispatch(
                    addMessage({
                        key: "deleteMilestone",
                        type: "error",
                        content: "Xóa giai đoạn thất bại",
                    })
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleTransferChange = (value: string) => {
        setSelectedTransferId(value);
        calculateNewPercent(value);
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Xóa Giai đoạn</Text>

                    <View style={styles.warningBox}>
                        <AntDesign name="warning" size={20} color="#ef4444" />
                        <Text style={styles.warningText}>
                            <Text style={styles.bold}>Cảnh báo:</Text> Bạn sắp xóa giai đoạn này.
                            Tỷ trọng <Text style={styles.bold}>{milestone.percent}%</Text> sẽ
                            được chuyển sang giai đoạn khác.
                        </Text>
                    </View>

                    <Text style={styles.label}>Chọn giai đoạn để chuyển tỷ trọng</Text>

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedTransferId}
                            onValueChange={handleTransferChange}
                        >
                            {availableMilestones.map((m) => (
                                <Picker.Item
                                    key={m.id}
                                    label={`Giai đoạn ${m.order} (hiện tại: ${m.percent}%)`}
                                    value={m.id}
                                />
                            ))}
                        </Picker>
                    </View>

                    {availableMilestones.length > 0 && (
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>Sau khi xóa:</Text>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoDot}>•</Text>
                                <Text style={styles.infoText}>
                                    <Text style={styles.bold}>Giai đoạn {milestone.order}</Text> sẽ bị xóa
                                </Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoDot}>•</Text>
                                <Text style={styles.infoText}>
                                    <Text style={styles.bold}>Giai đoạn {targetOrder}</Text> sẽ có tỷ trọng mới:{" "}
                                    <Text style={styles.bold}>{newPercent}%</Text>
                                </Text>
                            </View>
                        </View>
                    )}

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                            disabled={loading}
                        >
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={handleSubmit}
                            disabled={loading || availableMilestones.length === 0}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.deleteButtonText}>Xóa</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
        maxHeight: "80%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#1f2937",
        textAlign: "center",
    },
    warningBox: {
        flexDirection: "row",
        backgroundColor: "#fee2e2",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        gap: 8,
    },
    warningText: {
        color: "#ef4444",
        flex: 1,
        fontSize: 14,
    },
    bold: {
        fontWeight: "bold",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 8,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        marginBottom: 16,
    },
    infoBox: {
        backgroundColor: "#dbeafe",
        padding: 16,
        borderRadius: 8,
    },
    infoTitle: {
        color: "#1d4ed8",
        fontWeight: "600",
        marginBottom: 8,
    },
    infoItem: {
        flexDirection: "row",
        marginBottom: 4,
    },
    infoDot: {
        marginRight: 8,
        color: "#1d4ed8",
    },
    infoText: {
        color: "#1e40af",
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 24,
        gap: 12,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        minWidth: 100,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#f3f4f6",
    },
    cancelButtonText: {
        color: "#4b5563",
        fontWeight: "600",
    },
    deleteButton: {
        backgroundColor: "#ef4444",
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "600",
    },
});

export default DeleteMilestoneModal;