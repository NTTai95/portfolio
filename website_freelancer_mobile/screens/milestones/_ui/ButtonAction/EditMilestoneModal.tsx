import { apiPut } from "@/api/baseApi";
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
    View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useMilestones } from "../ContextMilestone";

dayjs.extend(customParseFormat);

interface EditMilestoneModalProps {
    visible: boolean;
    onCancel: () => void;
    milestone: any;
}

const EditMilestoneModal: React.FC<EditMilestoneModalProps> = ({
    visible,
    onCancel,
    milestone,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: contextData, fetchData } = useMilestones();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [startAt, setStartAt] = useState<Date | null>(null);
    const [endAt, setEndAt] = useState<Date | null>(null);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [files, setFiles] = useState<any[]>([]);
    const [jobDeadline, setJobDeadline] = useState<Date | null>(null);

    const job = contextData?.job;

    useEffect(() => {
        if (visible && milestone && job) {
            setContent(milestone.content);
            setStartAt(new Date(milestone.startAt));
            setEndAt(new Date(milestone.endAt));
            setFiles([]);

            // Calculate job deadline
            if (job?.closedAt && job?.workingHours) {
                const closedAt = dayjs(job.closedAt, "DD/MM/YYYY HH:mm:ss");
                const deadline = closedAt.add(job.workingHours, "hour").toDate();
                setJobDeadline(deadline);
            }
        }
    }, [visible, milestone, job]);

    const handleSubmit = async () => {
        if (!content || !startAt || !endAt) {
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

        if (jobDeadline && endAt > jobDeadline) {
            dispatch(
                addMessage({
                    key: "deadline-error",
                    type: "error",
                    content: `Thời gian kết thúc không được vượt quá ${dayjs(
                        jobDeadline
                    ).format("DD/MM/YYYY HH:mm:ss")}`,
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

            // Add files
            for (const file of files) {
                formData.append("attachments", {
                    uri: file.uri,
                    name: file.name,
                    type: file.mimeType,
                } as any);
            }

            // Call API
            await apiPut(`/milestones/${milestone.id}`, formData);

            dispatch(
                addMessage({
                    key: "milestone-edit",
                    type: "success",
                    content: "Chỉnh sửa giai đoạn thành công!",
                })
            );
            fetchData();
            onCancel();
        } catch (error) {
            dispatch(
                addMessage({
                    key: "milestone-edit",
                    type: "error",
                    content: "Chỉnh sửa giai đoạn thất bại!",
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
                const newFiles = result.assets.map((asset: any) => ({
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

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Chỉnh sửa Giai đoạn</Text>

                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {/* Content */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Nội dung</Text>
                            <TextInput
                                style={styles.textArea}
                                multiline
                                numberOfLines={4}
                                placeholder="Mô tả công việc của giai đoạn này"
                                value={content}
                                onChangeText={setContent}
                            />
                        </View>

                        {/* Date Pickers */}
                        <View style={styles.dateGroup}>
                            <View style={styles.datePickerContainer}>
                                <Text style={styles.label}>Thời gian bắt đầu</Text>
                                <TouchableOpacity
                                    style={styles.dateInput}
                                    onPress={() => setShowStartPicker(true)}
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
                                        minimumDate={new Date()}
                                    />
                                )}
                            </View>

                            <View style={styles.datePickerContainer}>
                                <Text style={styles.label}>Thời gian kết thúc</Text>
                                <TouchableOpacity
                                    style={styles.dateInput}
                                    onPress={() => setShowEndPicker(true)}
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
                                        minimumDate={startAt || new Date()}
                                    />
                                )}
                            </View>
                        </View>

                        {/* File Upload */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Tệp đính kèm</Text>
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={pickDocument}
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
                            <Text style={styles.fileNote}>
                                *Nếu đã có tài liệu thì file mới tải lên sẽ ghi đè file hiện tại!
                            </Text>
                        </View>

                        {jobDeadline && (
                            <View style={styles.noteBox}>
                                <Text style={styles.noteText}>
                                    📌 Lưu ý: Thời hạn tối đa cho toàn bộ công việc là đến{" "}
                                    {dayjs(jobDeadline).format("DD/MM/YYYY HH:mm:ss")}
                                </Text>
                            </View>
                        )}
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.submitButtonText}>Cập nhật</Text>
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
        maxHeight: "80%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#1f2937",
        textAlign: "center",
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
    fileNote: {
        fontSize: 12,
        color: "#6b7280",
        fontStyle: "italic",
        marginTop: 4,
    },
    noteBox: {
        backgroundColor: "#dbeafe",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#93c5fd",
        marginTop: 8,
    },
    noteText: {
        color: "#1d4ed8",
        fontSize: 12,
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
        minWidth: 100,
        alignItems: "center",
    },
    submitButtonText: {
        color: "white",
        fontWeight: "600",
    },
});

export default EditMilestoneModal;