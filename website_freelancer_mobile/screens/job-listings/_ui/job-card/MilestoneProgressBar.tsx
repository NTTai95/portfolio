// screens/job-listings/_ui/job-card/MilestoneProgressBar.tsx
import { useAuthorization } from '@/hooks/useAuthorization';
import { Status } from '@/types/status';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface MilestoneProgressBarProps {
    total: number;
    statusCounts: Record<string, number>;
    compact?: boolean;
    jobId: string | number;
}

const MilestoneProgressBar = ({
    total,
    statusCounts,
    compact = false,
    jobId
}: MilestoneProgressBarProps) => {
    const { role } = useAuthorization();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const isFreelancer = role === 'ROLE_FREELANCER';
    const allDrafts = total > 0 && (statusCounts['DRAFT'] || 0) === total;

    if (isFreelancer && allDrafts) {
        return (
            <Text style={styles.italicText}>Nhà tuyển dụng đang chuẩn bị</Text>
        );
    }

    if (total === 0) {
        return <Text style={styles.italicText}>Chưa có giai đoạn nào</Text>;
    }

    const statusOrder = [
        'DISPUTE',
        'UNPAID',
        'REJECTED',
        'PENDING',
        'DOING',
        'REVIEWING',
        'DONE',
        'DRAFT'
    ];

    const segments = statusOrder
        .filter(status => statusCounts[status] > 0)
        .map(status => ({
            status,
            count: statusCounts[status],
            percent: Math.round((statusCounts[status] / total) * 100),
            color: Status.Meta[status].hex,
            label: Status.Meta[status].label
        }));

    const unknownStatuses = Object.keys(statusCounts)
        .filter(
            status => !statusOrder.includes(status) && statusCounts[status] > 0
        )
        .map(status => ({
            status,
            count: statusCounts[status],
            percent: Math.round((statusCounts[status] / total) * 100),
            color: '#9CA3AF',
            label: status
        }));

    const allSegments = [...segments, ...unknownStatuses];
    const donePercent =
        allSegments.find(s => s.status === 'DONE')?.percent || 0;

    return (
        <>
            <Pressable
                onPress={() =>
                    navigation.navigate('milestone', { id: jobId as string })
                }
                onLongPress={() => setModalVisible(true)}
                style={[styles.container, compact && styles.compactContainer]}
            >
                <View style={[styles.header, compact && styles.compactHeader]}>
                    <Text
                        style={[styles.title, compact && styles.compactTitle]}
                    >
                        Tiến trình giai đoạn
                    </Text>
                    <View style={styles.totalContainer}>
                        <Text
                            style={[styles.total, compact && styles.compactTotal]}
                        >
                            {total} giai đoạn
                        </Text>
                        {!compact && (
                            <Ionicons
                                name={'chevron-forward'}
                                size={compact ? 16 : 18}
                                color="#4B5563"
                            />
                        )}
                    </View>
                </View>

                <View
                    style={[
                        styles.progressBar,
                        compact && styles.compactProgressBar
                    ]}
                >
                    {allSegments.map((seg, index) => {
                        const startPercent = allSegments
                            .slice(0, index)
                            .reduce((acc, s) => acc + s.percent, 0);
                        return (
                            <View
                                key={`${seg.status}-${index}`}
                                style={[
                                    styles.progressSegment,
                                    {
                                        backgroundColor: seg.color,
                                        width: `${seg.percent}%`,
                                        left: `${startPercent}%`
                                    }
                                ]}
                            />
                        );
                    })}
                    <View style={styles.progressLabel}>
                        <Text
                            style={[
                                styles.progressText,
                                compact && styles.compactProgressText
                            ]}
                        >
                            {donePercent}% hoàn thành
                        </Text>
                    </View>
                </View>
            </Pressable>

            {/* Modal hiển thị chi tiết */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>
                            Chi tiết các giai đoạn
                        </Text>
                        <ScrollView style={{ maxHeight: 400 }}>
                            {allSegments.map(seg => (
                                <View
                                    key={seg.status}
                                    style={styles.detailRow}
                                >
                                    <View style={styles.statusIndicator}>
                                        <View
                                            style={[
                                                styles.colorBox,
                                                { backgroundColor: seg.color }
                                            ]}
                                        />
                                        <Text style={styles.statusLabel}>
                                            {seg.label}
                                        </Text>
                                    </View>
                                    <Text style={styles.statusCount}>
                                        {seg.count} ({seg.percent}%)
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 8 },
    compactContainer: { marginVertical: 0 },
    italicText: {
        fontStyle: 'italic',
        color: '#6B7280',
        fontSize: 12,
        paddingVertical: 4
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        width: '100%'
    },
    compactHeader: { marginBottom: 2 },
    title: { color: '#374151', fontSize: 14, fontWeight: '600' },
    compactTitle: { fontSize: 12 },
    totalContainer: { flexDirection: 'row', alignItems: 'center' },
    total: {
        color: '#4B5563',
        fontSize: 12,
        fontWeight: '500',
        marginRight: 4
    },
    compactTotal: { fontSize: 11, marginRight: 2 },
    progressBar: {
        height: 20,
        borderRadius: 10,
        backgroundColor: '#E5E7EB',
        overflow: 'hidden',
        position: 'relative',
    },
    compactProgressBar: { height: 16, borderRadius: 8 },
    progressSegment: { position: 'absolute', top: 0, height: '100%' },
    progressLabel: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressText: {
        fontSize: 10,
        fontWeight: '700',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1
    },
    compactProgressText: { fontSize: 9 },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        width: '90%'
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center'
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
    },
    statusIndicator: { flexDirection: 'row', alignItems: 'center' },
    colorBox: { width: 14, height: 14, borderRadius: 3, marginRight: 8 },
    statusLabel: { fontSize: 13, fontWeight: '500', color: '#1F2937' },
    statusCount: { fontSize: 13, color: '#4B5563', fontWeight: '500' },
    closeButton: {
        backgroundColor: '#3B82F6',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 16
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600'
    }
});

export default MilestoneProgressBar;
