import { apiPost } from "@/api/baseApi";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useDispatch } from "react-redux";
import { useMilestones } from "../ContextMilestone";

dayjs.extend(customParseFormat);

interface SplitMilestoneModalProps {
    visible: boolean;
    onCancel: () => void;
    milestone: any;
    totalBudget: number;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
};

const SplitMilestoneModal: React.FC<SplitMilestoneModalProps> = ({
    visible,
    onCancel,
    milestone,
    totalBudget,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { fetchData } = useMilestones();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [startAt, setStartAt] = useState<Date | null>(null);
    const [endAt, setEndAt] = useState<Date | null>(null);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [newPercent, setNewPercent] = useState("1");
    const [files, setFiles] = useState<any[]>([]);
    const [minPercent, setMinPercent] = useState(1);
    const [canSplit, setCanSplit] = useState(true);
    const [currentPercent, setCurrentPercent] = useState(milestone?.percent || 0);

    useEffect(() => {
        if (visible && milestone && totalBudget > 0) {
            setContent(milestone.content);
            setStartAt(new Date(milestone.startAt));
            setEndAt(new Date(milestone.endAt));
            setFiles([]);
            setCurrentPercent(milestone.percent || 0);

            const calculatedMinPercent = Math.ceil((10000 * 100) / totalBudget);
            const minP = calculatedMinPercent > 0 ? calculatedMinPercent : 1;
            setMinPercent(minP);
            setNewPercent(minP.toString());

            const currentAmount = (milestone.percent * totalBudget) / 100;
            setCanSplit(currentAmount >= 20000);
        }
    }, [visible, milestone, totalBudget]);

    const handleSubmit = async () => {
        const percentValue = parseFloat(newPercent);

        if (!content || !startAt || !endAt || isNaN(percentValue)) {
            dispatch(
                addMessage({
                    key: "validation-error",
                    type: "error",
                    content: "Vui lòng điền đầy đủ thông tin",
                })
            );
            return;
        }

        if (startAt >= endAt) {
            dispatch(
                addMessage({
                    key: "date-error",
                    type: "error",
                    content: "Thời gian kết thúc phải sau thời gian bắt đầu",
                })
            );
            return;
        }

        const newAmount = (percentValue / 100) * totalBudget;
        const remainingAmount = ((currentPercent - percentValue) / 100) * totalBudget;

        if (newAmount < 10000 || remainingAmount < 10000) {
            dispatch(
                addMessage({
                    key: "amount-error",
                    type: "error",
                    content: "Mỗi giai đoạn phải có ít nhất 10,000 VND",
                })
            );
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("content", content);
            formData.append(
                "startAt",
                dayjs(startAt).format("DD/MM/YYYY HH:mm:ss")
            );
            formData.append("endAt", dayjs(endAt).format("DD/MM/YYYY HH:mm:ss"));
            formData.append("percent", newPercent);

            // Add files
            for (const file of files) {
                formData.append("files", {
                    uri: file.uri,
                    name: file.name,
                    type: file.mimeType,
                } as any);
            }

            // Call API
            await apiPost(`/milestones/${milestone.id}/split`, formData);

            dispatch(
                addMessage({
                    key: "split-success",
                    type: "success",
                    content: "Tách giai đoạn thành công!",
                })
            );
            fetchData();
            onCancel();
        } catch (error) {
            dispatch(
                addMessage({
                    key: "split-error",
                    type: "error",
                    content: "Tách giai đoạn thất bại!",
                })
            );
        } finally {
            setLoading(false);
        }
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                multiple: true,
            });

            if (!result.canceled) {
                const newFiles = result.assets.map((asset) => ({
                    name: asset.name || "file",
                    uri: asset.uri,
                    size: asset.size || 0,
                    mimeType: asset.mimeType || "application/octet-stream",
                }));
                setFiles([...files, ...newFiles]);
            }
        } catch (err) {
            console.error("Error picking document:", err);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const formatDate = (date: Date | null) => {
        return date ? dayjs(date).format("DD/MM/YYYY HH:mm:ss") : "";
    };

    const percentValue = parseFloat(newPercent) || 0;
    const newAmount = (percentValue / 100) * totalBudget;
    const remainingAmount = ((currentPercent - percentValue) / 100) * totalBudget;
    const remainingPercent = currentPercent - percentValue;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <MaterialIcons name="info" size={24} color="#3b82f6" />
                        <Text style={styles.modalTitle}>Tách Giai đoạn</Text>
                    </View>

                    {!canSplit && (
                        <View style={styles.alertContainer}>
                            <Text style={styles.alertText}>
                                Không thể tách giai đoạn vì tổng ngân sách của giai đoạn hiện tại (
                                {formatCurrency((milestone.percent * totalBudget) / 100)}) không đủ để tách
                                thành 2 giai đoạn (cần tối thiểu 20,000 VND). Mỗi giai đoạn sau khi tách
                                phải có ít nhất 10,000 VND.
                            </Text>
                        </View>
                    )}

                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Nội dung giai đoạn mới</Text>
                            <TextInput
                                style={styles.textArea}
                                multiline
                                numberOfLines={3}
                                placeholder="Mô tả công việc cho giai đoạn mới..."
                                value={content}
                                onChangeText={setContent}
                                editable={canSplit}
                            />
                        </View>

                        <View style={styles.dateGroup}>
                            <View style={styles.datePickerContainer}>
                                <Text style={styles.label}>Thời gian bắt đầu</Text>
                                <TouchableOpacity
                                    style={styles.dateInput}
                                    onPress={() => setShowStartPicker(true)}
                                    disabled={!canSplit}
                                >
                                    <Text>{formatDate(startAt)}</Text>
                                    <MaterialIcons name="calendar-today" size={20} color="#3b82f6" />
                                </TouchableOpacity>
                                {showStartPicker && (
                                    <DateTimePicker
                                        value={startAt || new Date()}
                                        mode="datetime"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowStartPicker(false);
                                            if (selectedDate) {
                                                setStartAt(selectedDate);
                                            }
                                        }}
                                        minimumDate={new Date(milestone.startAt)}
                                        maximumDate={new Date(milestone.endAt)}
                                    />
                                )}
                            </View>

                            <View style={styles.datePickerContainer}>
                                <Text style={styles.label}>Thời gian kết thúc</Text>
                                <TouchableOpacity
                                    style={styles.dateInput}
                                    onPress={() => setShowEndPicker(true)}
                                    disabled={!canSplit}
                                >
                                    <Text>{formatDate(endAt)}</Text>
                                    <MaterialIcons name="calendar-today" size={20} color="#3b82f6" />
                                </TouchableOpacity>
                                {showEndPicker && (
                                    <DateTimePicker
                                        value={endAt || new Date()}
                                        mode="datetime"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowEndPicker(false);
                                            if (selectedDate) {
                                                setEndAt(selectedDate);
                                            }
                                        }}
                                        minimumDate={startAt || new Date(milestone.startAt)}
                                        maximumDate={new Date(milestone.endAt)}
                                    />
                                )}
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>
                                Tỷ trọng mới (tối thiểu: {minPercent}%)
                            </Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                placeholder="Nhập tỷ trọng..."
                                value={newPercent}
                                onChangeText={setNewPercent}
                                editable={canSplit}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Tệp đính kèm</Text>
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={pickDocument}
                                disabled={!canSplit}
                            >
                                <AntDesign name="clouduploado" size={20} color="#3b82f6" />
                                <Text style={styles.uploadButtonText}>Chọn tệp</Text>
                            </TouchableOpacity>

                            {files.length > 0 && (
                                <View style={styles.fileList}>
                                    {files.map((file, index) => (
                                        <View key={index} style={styles.fileItem}>
                                            <MaterialIcons name="insert-drive-file" size={20} color="#4b5563" />
                                            <Text style={styles.fileName} numberOfLines={1}>
                                                {file.name}
                                            </Text>
                                            <TouchableOpacity onPress={() => removeFile(index)}>
                                                <AntDesign name="close" size={16} color="#ef4444" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>

                        {canSplit && (
                            <View style={styles.infoBox}>
                                <Text style={styles.infoTitle}>Phân bổ sau khi tách</Text>

                                <View style={styles.progressContainer}>
                                    <View style={styles.progressItem}>
                                        <Text style={styles.progressLabel}>Giai đoạn mới</Text>
                                        <Text style={styles.progressValue}>
                                            {percentValue}% / {currentPercent}%
                                        </Text>
                                        <Text style={styles.progressAmount}>
                                            {formatCurrency(newAmount)}
                                        </Text>
                                    </View>

                                    <View style={styles.progressItem}>
                                        <Text style={styles.progressLabel}>Giai đoạn hiện tại</Text>
                                        <Text style={styles.progressValue}>
                                            {remainingPercent}% / {currentPercent}%
                                        </Text>
                                        <Text style={styles.progressAmount}>
                                            {formatCurrency(remainingAmount)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.noteBox}>
                                    <Text style={styles.noteItem}>
                                        • Mỗi giai đoạn đảm bảo tối thiểu:{" "}
                                        <Text style={styles.bold}>{formatCurrency(10000)}</Text>
                                    </Text>
                                    <Text style={styles.noteItem}>
                                        • Tỷ trọng tối thiểu:{" "}
                                        <Text style={styles.bold}>{minPercent}%</Text> (
                                        {formatCurrency(10000)})
                                    </Text>
                                    <Text style={styles.noteItem}>
                                        • Phạm vi cho phép:{" "}
                                        <Text style={styles.bold}>
                                            {minPercent}% → {currentPercent - minPercent}%
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        )}
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                !canSplit && styles.disabledButton,
                            ]}
                            onPress={handleSubmit}
                            disabled={loading || !canSplit}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.submitButtonText}>Tách giai đoạn</Text>
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
        maxHeight: "90%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
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
        color: "#1f2937",
    },
    alertContainer: {
        backgroundColor: "#fee2e2",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    alertText: {
        color: "#ef4444",
        fontSize: 14,
    },
    scrollContainer: {
        paddingBottom: 10,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#4b5563",
        marginBottom: 8,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        textAlignVertical: "top",
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
    },
    dateGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    datePickerContainer: {
        flex: 1,
        marginRight: 8,
    },
    dateInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        padding: 12,
        height: 48,
    },
    uploadButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dbeafe",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#93c5fd",
        marginBottom: 8,
    },
    uploadButtonText: {
        color: "#3b82f6",
        fontWeight: "500",
        marginLeft: 8,
    },
    fileList: {
        marginTop: 8,
    },
    fileItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        backgroundColor: "#f3f4f6",
        borderRadius: 6,
        marginBottom: 4,
    },
    fileName: {
        flex: 1,
        marginLeft: 8,
        marginRight: 8,
        color: "#4b5563",
    },
    infoBox: {
        backgroundColor: "#dbeafe",
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#93c5fd",
        marginTop: 8,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1d4ed8",
        marginBottom: 12,
    },
    progressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    progressItem: {
        flex: 1,
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#93c5fd",
        marginRight: 8,
    },
    progressLabel: {
        fontSize: 14,
        color: "#1d4ed8",
        fontWeight: "600",
        marginBottom: 4,
    },
    progressValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1f2937",
    },
    progressAmount: {
        fontSize: 14,
        color: "#10b981",
        fontWeight: "600",
    },
    noteBox: {
        backgroundColor: "#bfdbfe",
        padding: 12,
        borderRadius: 6,
    },
    noteItem: {
        fontSize: 12,
        color: "#1d4ed8",
        marginBottom: 4,
    },
    bold: {
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16,
        gap: 12,
    },
    cancelButton: {
        backgroundColor: "#f3f4f6",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: "#4b5563",
        fontWeight: "600",
    },
    submitButton: {
        backgroundColor: "#3b82f6",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 150,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#9ca3af",
    },
    submitButtonText: {
        color: "white",
        fontWeight: "600",
    },
});

export default SplitMilestoneModal;