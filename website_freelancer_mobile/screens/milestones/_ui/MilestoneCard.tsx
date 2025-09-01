// src/app/accept-milestones/[id]/_ui/MilestoneCard.tsx
import { AuthGuard } from "@/components/AuthGuard";
import { AppDispatch } from "@/store";
import { addMessage } from "@/store/volatile/messageSlice";
import { Status } from "@/types/status";
import { AntDesign, Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as FileSystem from 'expo-file-system';
import React, { useState } from "react";
import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useDispatch } from "react-redux";
import ActionEmployer from "./ButtonAction/ActionEmployer";
import ActionFreelancer from "./ButtonAction/ActionFreelancer";
import DeleteMilestoneModal from "./ButtonAction/DeleteMilestoneModal";
import EditMilestoneModal from "./ButtonAction/EditMilestoneModal";
import SplitMilestoneModal from "./ButtonAction/SplitMilestoneModal";

interface MilestoneCardProps {
    milestone: any;
    index: number;
    totalProjectBudget: number;
    canCombined: boolean;
    jobMilestones: any[];
    jobId: number | string;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
    milestone,
    index,
    totalProjectBudget,
    canCombined,
    jobMilestones,
    jobId
}) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isSplitModalVisible, setIsSplitModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const statusMeta = Status.Meta[milestone?.status] || { color: "#6b7280", label: "Unknown" };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const handleProductPress = () => {
        navigation.navigate("products", { milestoneId: milestone.id });
    };

    const handleDocumentPress = async () => {
        if (!milestone?.document) return;

        const url = milestone.document;

        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                Linking.openURL(url);
            } else {
                console.log(`Thiết bị không hỗ trợ mở: ${url}`);
                await downloadFile(url);
            }
        } catch (err) {
            console.error('Lỗi khi xử lý file:', err);
            dispatch(addMessage({
                key: "open-document",
                content: "Không thể mở tài liệu",
                type: "error",
            }))
        }
    };

    const downloadFile = async (url: string) => {
        try {
            const fileName = url.split('/').pop() || `downloaded_${Date.now()}`;
            const path =
                FileSystem.documentDirectory + fileName;

            const downloadResumable = FileSystem.createDownloadResumable(
                url,
                path
            );

            const result = await downloadResumable.downloadAsync();

            if (result?.uri) {
                dispatch(addMessage({
                    key: "download-document",
                    content: "Tải tài liệu thành công",
                    type: "success",
                }))
                console.log('File saved at:', result.uri);
            } else {
                dispatch(addMessage({
                    key: "download-document",
                    content: "Không thể tải tài liệu",
                    type: "error",
                }))
            }
        } catch (err) {
            console.error('Lỗi khi tải file:', err);
            dispatch(addMessage({
                key: "download-document",
                content: "Không thể tải tài liệu",
                type: "error",
            }))
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.indexCircle}>
                        <Text style={styles.indexText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.title}>Giai đoạn {index + 1}</Text>

                    <View style={styles.tagContainer}>
                        {milestone?.isOverdue && (
                            <View style={[styles.tag, styles.overdueTag]}>
                                <Text style={styles.tagText}>Quá hạn</Text>
                            </View>
                        )}

                        {milestone?.disputed && (
                            <View style={[styles.tag, styles.disputedTag]}>
                                <Text style={styles.tagText}>Tranh chấp: {milestone?.totalDisputes}</Text>
                            </View>
                        )}

                        <View style={[styles.tag, { backgroundColor: statusMeta.color }]}>
                            <Text style={styles.tagText}>{statusMeta.label}</Text>
                        </View>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Nội dung</Text>
                        <View style={styles.contentBox}>
                            <Text style={styles.contentText}>{milestone?.content || "Không có mô tả"}</Text>
                        </View>
                    </View>

                    <View style={styles.progressSection}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.sectionTitle}>Tỷ trọng công việc</Text>
                            <Text style={styles.percentText}>{milestone?.percent}%</Text>
                        </View>

                        <View style={styles.progressBarBackground}>
                            <View
                                style={[
                                    styles.progressBarFill,
                                    { width: `${milestone?.percent}%` }
                                ]}
                            />
                        </View>

                        <View style={styles.progressFooter}>
                            <Text style={styles.amountText}>{formatCurrency(milestone?.bidAmount)}</Text>
                            <Text style={styles.totalBudgetText}>Tổng: {formatCurrency(totalProjectBudget)}</Text>
                        </View>
                    </View>

                    <View style={styles.timelineSection}>
                        <Text style={styles.sectionTitle}>Thời gian</Text>
                        <View style={styles.timelineBox}>
                            <Text style={styles.timelineText}>{milestone?.startAt}</Text>
                            <AntDesign name="arrowright" size={16} color="#6B7280" />
                            <Text style={[
                                styles.timelineText,
                                milestone?.isOverdue && styles.overdueText
                            ]}>
                                {milestone?.endAt}
                            </Text>
                        </View>
                    </View>

                    {/* Info Boxes */}
                    <View style={styles.infoBoxContainer}>
                        {milestone?.fundedAt && (
                            <TouchableOpacity
                                style={[styles.infoBox, styles.fundedBox]}
                                activeOpacity={0.8}
                            >
                                <View style={styles.infoBoxContent}>
                                    <View style={styles.iconContainer}>
                                        <Feather name="calendar" size={20} color="#3B82F6" />
                                    </View>
                                    <Text style={styles.infoBoxTitle}>NGÀY THANH TOÁN</Text>
                                    <Text style={styles.infoBoxValue}>{milestone.fundedAt}</Text>
                                </View>
                                <AntDesign name="checkcircle" size={24} color="#3B82F6" />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[styles.infoBox, styles.productBox]}
                            activeOpacity={0.8}
                            onPress={handleProductPress}
                        >
                            <View style={styles.infoBoxContent}>
                                <View style={styles.iconContainer}>
                                    <MaterialIcons name="description" size={20} color="#8B5CF6" />
                                </View>
                                <Text style={styles.infoBoxTitle}>SẢN PHẨM</Text>
                                <Text style={styles.infoBoxValue}>{milestone?.totalProduct || 0} sản phẩm</Text>
                                <Text style={styles.infoBoxLink}>
                                    Xem chi tiết <AntDesign name="arrowright" size={12} color="#8B5CF6" />
                                </Text>
                            </View>
                            <AntDesign name="checkcircle" size={24} color="#8B5CF6" />
                        </TouchableOpacity>

                        {milestone?.document && (
                            <TouchableOpacity
                                style={[styles.infoBox, styles.documentBox]}
                                activeOpacity={0.8}
                                onPress={handleDocumentPress}
                            >
                                <View style={styles.infoBoxContent}>
                                    <View style={styles.iconContainer}>
                                        <FontAwesome name="file-text-o" size={20} color="#0EA5E9" />
                                    </View>
                                    <Text style={styles.infoBoxTitle}>TÀI LIỆU</Text>
                                    <Text style={styles.infoBoxValue}>Tài liệu đính kèm</Text>
                                    <Text style={styles.infoBoxLink}>
                                        Mở tài liệu <AntDesign name="arrowright" size={12} color="#0EA5E9" />
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.downloadButton}
                                    onPress={handleDocumentPress}
                                >
                                    <AntDesign name="download" size={20} color="#0EA5E9" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actionsContainer}>
                    <AuthGuard roles={["ROLE_FREELANCER"]} fallback={
                        (milestone?.status === "DRAFT" || milestone?.status === "REJECTED" ||
                            milestone?.status === "UNPAID" || milestone?.status === "DOING") && (
                            <ActionEmployer
                                onDeleteClick={() => setIsDeleteModalVisible(true)}
                                onSplitClick={() => setIsSplitModalVisible(true)}
                                onEditClick={() => setIsEditModalVisible(true)}
                                canCombined={canCombined}
                                milestone={milestone}
                            />
                        )
                    }>
                        <ActionFreelancer milestone={milestone} jobId={jobId} />
                    </AuthGuard>
                </View>
            </View>

            {/* Modals */}
            <EditMilestoneModal
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                milestone={milestone}
            />

            <SplitMilestoneModal
                visible={isSplitModalVisible}
                onCancel={() => setIsSplitModalVisible(false)}
                milestone={milestone}
                totalBudget={totalProjectBudget}
            />

            <DeleteMilestoneModal
                visible={isDeleteModalVisible}
                onCancel={() => setIsDeleteModalVisible(false)}
                milestone={milestone}
                jobMilestones={jobMilestones}
                index={index}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        padding: 16,
        backgroundColor: '#f8fafc',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    indexCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#4f46e5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    indexText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        marginTop: 8,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        gap: 8,
    },
    tag: {
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    tagText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
    },
    overdueTag: {
        backgroundColor: '#ef4444',
    },
    disputedTag: {
        backgroundColor: '#f59e0b',
    },
    contentContainer: {
        padding: 16,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#475569',
        fontWeight: '600',
        marginBottom: 8,
        fontSize: 14,
    },
    contentBox: {
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        padding: 12,
    },
    contentText: {
        color: '#334155',
        fontSize: 14,
        lineHeight: 20,
    },
    progressSection: {
        marginBottom: 16,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    percentText: {
        color: '#1e293b',
        fontWeight: 'bold',
        fontSize: 14,
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: '#e2e8f0',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#4f46e5',
        borderRadius: 5,
    },
    progressFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountText: {
        color: '#1e293b',
        fontWeight: '600',
        fontSize: 14,
    },
    totalBudgetText: {
        color: '#64748b',
        fontSize: 12,
    },
    timelineSection: {
        marginBottom: 16,
    },
    timelineBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        padding: 12,
    },
    timelineText: {
        color: '#334155',
        fontWeight: '500',
        fontSize: 12,
    },
    overdueText: {
        color: '#ef4444',
        fontWeight: '600',
    },
    infoBoxContainer: {
        gap: 12,
    },
    infoBox: {
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fundedBox: {
        backgroundColor: '#dbeafe',
    },
    productBox: {
        backgroundColor: '#ede9fe',
    },
    documentBox: {
        backgroundColor: '#e0f2fe',
    },
    infoBoxContent: {
        flex: 1,
    },
    iconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 8,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoBoxTitle: {
        color: '#475569',
        fontWeight: '600',
        fontSize: 12,
        marginBottom: 2,
    },
    infoBoxValue: {
        color: '#1e293b',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 4,
    },
    infoBoxLink: {
        color: '#3b82f6',
        fontSize: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    downloadButton: {
        backgroundColor: '#ffffff',
        padding: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
});

export default MilestoneCard;