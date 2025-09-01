// File: app/(client)/jobs/[id]/accept-milestones/[milestoneId]/products/page.tsx
import { apiGet, apiPut } from '@/api/baseApi';
import { AuthGuard } from '@/components/AuthGuard';
import { addMessage } from '@/store/volatile/messageSlice';
import { Status } from '@/types/status';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Linking,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { getFileIcon, getFileName, getOriginalFileName, isViewableInBrowser } from './_ui/fileUtils';

// ==================== INTERFACES ====================
interface Product {
    id: number;
    content: string;
    description: string;
    createdAt: string;
    status: string;
}

interface FileCountHeaderProps {
    count: number;
    onBack: () => void;
}

interface ProductCardProps {
    product: Product;
}

interface EmptyEmployerProps {
    freelancerId: number;
}

interface RejectModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    enableReason: boolean;
    setEnableReason: (value: boolean) => void;
    reasonText: string;
    setReasonText: (value: string) => void;
}

// ==================== COMPONENTS ====================
const FileCountHeader: React.FC<FileCountHeaderProps> = ({ count, onBack }) => {
    return (
        <View style={styles.fileCountHeader}>
            <View style={styles.headerContent}>
                <View style={styles.headerCount}>
                    <View style={styles.headerIcon}>
                        <Icon name="filetext1" size={24} color="white" />
                    </View>
                    <View style={styles.countContainer}>
                        <Text style={styles.headerTitle}>Tổng số </Text>
                        <Text style={styles.countText}>{count}</Text>
                        <Text style={styles.fileText}> file</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Icon name="arrowleft" size={20} color="#2563eb" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const fileName = getFileName(product.content);
    const originalFileName = getOriginalFileName(fileName);
    const isViewable = isViewableInBrowser(fileName);
    const displayedName = originalFileName.length > 33
        ? `${originalFileName.substring(0, 30)}...`
        : originalFileName;

    return (
        <View style={styles.productCard}>
            <View style={[
                styles.badge,
                { backgroundColor: Status.Meta[product.status.toUpperCase()].color }
            ]}>
                <Text style={styles.badgeText}>
                    {Status.Meta[product.status.toUpperCase()].label}
                </Text>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.fileInfo}>
                    <Text style={styles.fileIcon}>
                        {getFileIcon(fileName)}
                    </Text>
                    <TouchableOpacity
                        onPress={() => isViewable && Linking.openURL(product.content)}
                        disabled={!isViewable}
                    >
                        <Text
                            style={[styles.fileName, isViewable && styles.viewableFile]}
                            numberOfLines={1}
                        >
                            {displayedName}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.createdAt}>{product.createdAt}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.descriptionContainer}>
                    {product.description && (
                        <Text style={styles.descriptionText}>
                            {product.description}
                        </Text>
                    )}
                </View>
            </View>

            <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => Linking.openURL(product.content)}
            >
                <Icon name="download" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const RejectModal: React.FC<RejectModalProps> = ({
    visible,
    onCancel,
    onConfirm,
    enableReason,
    setEnableReason,
    reasonText,
    setReasonText
}) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Từ chối sản phẩm</Text>

                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>Nhập lý do từ chối (tùy chọn)</Text>
                        <View style={styles.switchRow}>
                            <TouchableOpacity
                                style={[styles.switchButton, enableReason && styles.switchActive]}
                                onPress={() => setEnableReason(!enableReason)}
                            >
                                <Text>{enableReason ? 'Bật' : 'Tắt'}</Text>
                            </TouchableOpacity>
                            <Text style={styles.switchText}>Nhập lý do từ chối</Text>
                        </View>
                    </View>

                    {enableReason && (
                        <TextInput
                            style={styles.reasonInput}
                            multiline
                            numberOfLines={4}
                            value={reasonText}
                            onChangeText={setReasonText}
                            placeholder="Nhập lý do từ chối sản phẩm..."
                            placeholderTextColor="#9ca3af"
                        />
                    )}

                    <Text style={styles.modalNote}>
                        Lý do từ chối sẽ được gửi đến freelancer qua tin nhắn
                    </Text>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelButtonText}>Hủy bỏ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.confirmRejectButton}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmButtonText}>Xác nhận từ chối</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const EmptyFreelancer = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.emptyContainer}>
            <Icon name="inbox" size={64} color="#9ca3af" />
            <Text style={styles.emptyTitle}>Bạn chưa nộp sản phẩm nào</Text>
            <Text style={styles.emptyDescription}>
                Hãy nộp sản phẩm để nhà tuyển dụng có thể xem và đánh giá
            </Text>

            <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.emptyButtonText}>Quay lại</Text>
            </TouchableOpacity>
        </View>
    );
};

const EmptyEmployer: React.FC<EmptyEmployerProps> = ({ freelancerId }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.emptyContainer}>
            <Icon name="inbox" size={64} color="#9ca3af" />
            <Text style={styles.emptyTitle}>Freelancer chưa nộp sản phẩm</Text>
            <Text style={styles.emptyDescription}>
                Vui lòng đợi thêm hoặc nhắn tin với freelancer
            </Text>

            <View style={styles.emptyButtons}>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrowleft" size={16} color="#2563eb" style={styles.buttonIcon} />
                    <Text style={styles.secondaryButtonText}>Quay lại</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('chatbox', { receiverId: freelancerId })}
                >
                    <Icon name="message1" size={16} color="white" style={styles.buttonIcon} />
                    <Text style={styles.primaryButtonText}>Nhắn tin</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// ==================== MAIN COMPONENT ====================
const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [freelancerId, setFreelancerId] = useState<number>(0);
    const [endAt, setEndAt] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [enableReason, setEnableReason] = useState(false);
    const [reasonText, setReasonText] = useState('');
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('1');
    const [acceptLoading, setAcceptLoading] = useState(false);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'products'>>();
    const milestoneId = route.params.milestoneId;

    const fetchProducts = () => {
        setLoading(true);
        apiGet(`/milestones/${milestoneId}/products`)
            .then((res: any) => {
                setProducts(res.data.products);
                setFreelancerId(res.data.freelancerId);
                setEndAt(res.data.milestoneEndAt);
            })
            .catch(err => setError(err.message || 'Đã xảy ra lỗi'))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchProducts();
    }, [milestoneId]);

    const handleAcceptClick = () => {
        const currentDate = new Date();
        const endDate = dayjs(endAt, "DD/MM/YYYY HH:mm:ss").toDate();

        if (currentDate > endDate) {
            Alert.alert(
                'Giai đoạn đã trễ hạn',
                'Bạn có muốn đánh dấu giai đoạn này là trễ hạn không?',
                [
                    {
                        text: 'Không',
                        onPress: () => callAcceptProduct(false),
                        style: 'cancel'
                    },
                    {
                        text: 'Có',
                        onPress: () => callAcceptProduct(true),
                    }
                ]
            );
        } else {
            callAcceptProduct(false);
        }
    };

    const callAcceptProduct = (isOverdue: boolean) => {
        setAcceptLoading(true);
        apiPut(`/milestones/${milestoneId}/product-accept`, isOverdue)
            .then(() => {
                dispatch(addMessage({
                    key: 'success',
                    content: 'Chấp nhận thành công',
                    type: 'success',
                }));
                fetchProducts();
            })
            .catch(err => {
                dispatch(addMessage({
                    key: 'error',
                    content: err.message || 'Đã xảy ra lỗi',
                    type: 'error',
                }));
            })
            .finally(() => {
                setAcceptLoading(false);
            });
    };

    const handleRejectClick = () => {
        setModalVisible(true);
    };

    const handleConfirmReject = () => {
        setModalVisible(false);
        apiPut(`/milestones/${milestoneId}/product-reject`, { reason: enableReason ? reasonText : '' })
            .then(() => {
                dispatch(addMessage({
                    key: 'success',
                    content: 'Từ chối thành công',
                    type: 'success',
                }));
                fetchProducts();
            })
            .catch(err => {
                dispatch(addMessage({
                    key: 'error',
                    content: err.message || 'Đã có lỗi xảy ra',
                    type: 'error',
                }));
            })
            .finally(() => {
                setEnableReason(false);
                setReasonText('');
            });
    };

    const handleCancelReject = () => {
        setModalVisible(false);
        setEnableReason(false);
        setReasonText('');
    };

    // Lọc sản phẩm theo trạng thái
    const pendingAndAcceptProducts = products.filter(p =>
        p.status === 'PENDING' || p.status === 'ACCEPT'
    );

    const rejectedProducts = products.filter(p =>
        p.status === 'REJECTED'
    );

    if (loading) return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
        </View>
    );

    if (error) return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={fetchProducts} style={styles.retryButton}>
                <Text style={styles.retryText}>Thử lại</Text>
            </TouchableOpacity>
        </View>
    );

    // Hiển thị empty state khi không có sản phẩm nào
    if (products.length === 0) {
        return (
            <AuthGuard roles={['ROLE_NHA_TUYEN_DUNG']} fallback={<EmptyFreelancer />}>
                <EmptyEmployer freelancerId={freelancerId} />
            </AuthGuard>
        );
    }

    const renderProductList = (productList: Product[]) => (
        <FlatList
            data={productList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard product={item} />}
            contentContainerStyle={styles.listContainer}
        />
    );

    return (
        <View style={styles.container}>
            <FileCountHeader
                count={products.length}
                onBack={() => navigation.goBack()}
            />

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === '1' && styles.activeTab]}
                    onPress={() => setActiveTab('1')}
                >
                    <Text style={[styles.tabText, activeTab === '1' && styles.activeTabText]}>
                        Sản phẩm ({pendingAndAcceptProducts.length})
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === '2' && styles.activeTab]}
                    onPress={() => setActiveTab('2')}
                >
                    <Text style={[styles.tabText, activeTab === '2' && styles.activeTabText]}>
                        Từ chối ({rejectedProducts.length})
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {activeTab === '1' ? (
                    <>
                        {pendingAndAcceptProducts.length === 0 ? (
                            <View style={styles.emptyTab}>
                                <Text>Không có sản phẩm đang chờ xử lý</Text>
                            </View>
                        ) : (
                            renderProductList(pendingAndAcceptProducts)
                        )}

                        {(pendingAndAcceptProducts.length > 0 &&
                            pendingAndAcceptProducts.some(p => p.status === "PENDING")) && (
                                <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
                                    <View style={styles.actionButtons}>
                                        <TouchableOpacity
                                            style={[styles.actionButton, styles.rejectButton]}
                                            onPress={handleRejectClick}
                                        >
                                            <Text style={styles.actionButtonText}>Yêu cầu sửa</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.actionButton, styles.acceptButton]}
                                            onPress={handleAcceptClick}
                                            disabled={acceptLoading}
                                        >
                                            {acceptLoading ? (
                                                <ActivityIndicator color="white" />
                                            ) : (
                                                <Text style={styles.actionButtonText}>Chấp nhận</Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </AuthGuard>
                            )}
                    </>
                ) : (
                    rejectedProducts.length === 0 ? (
                        <View style={styles.emptyTab}>
                            <Text>Không có sản phẩm bị từ chối</Text>
                        </View>
                    ) : (
                        renderProductList(rejectedProducts)
                    )
                )}
            </View>

            <RejectModal
                visible={modalVisible}
                onCancel={handleCancelReject}
                onConfirm={handleConfirmReject}
                enableReason={enableReason}
                setEnableReason={setEnableReason}
                reasonText={reasonText}
                setReasonText={setReasonText}
            />
        </View>
    );
};

// ==================== STYLES ====================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    fileCountHeader: {
        backgroundColor: '#3b82f6',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerCount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
        borderRadius: 50,
        marginRight: 12,
    },
    countContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    headerTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    countText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 4,
    },
    fileText: {
        color: '#dbeafe',
        fontSize: 16,
    },
    backButton: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        padding: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginBottom: 8,
    },
    badgeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 12,
    },
    cardContent: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    fileInfo: {
        flex: 1,
    },
    fileIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    fileName: {
        fontWeight: '500',
        color: '#374151',
        marginBottom: 4,
    },
    viewableFile: {
        color: '#2563eb',
        textDecorationLine: 'underline',
    },
    createdAt: {
        color: '#6b7280',
        fontSize: 12,
    },
    divider: {
        width: 1,
        backgroundColor: '#e5e7eb',
        marginHorizontal: 16,
    },
    descriptionContainer: {
        flex: 2,
    },
    descriptionText: {
        color: '#4b5563',
        fontSize: 14,
    },
    downloadButton: {
        backgroundColor: '#2563eb',
        padding: 10,
        borderRadius: 6,
        alignSelf: 'flex-end',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f5f5f5',
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#374151',
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyDescription: {
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    emptyButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    emptyButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    emptyButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    primaryButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e5e7eb',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    secondaryButtonText: {
        color: '#2563eb',
        fontWeight: '500',
    },
    buttonIcon: {
        marginRight: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        width: '100%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1f2937',
    },
    switchContainer: {
        marginBottom: 16,
    },
    switchLabel: {
        marginBottom: 8,
        color: '#4b5563',
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchButton: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 16,
        padding: 4,
        width: 50,
        marginRight: 8,
        alignItems: 'center',
    },
    switchActive: {
        backgroundColor: '#dbeafe',
        borderColor: '#3b82f6',
    },
    switchText: {
        color: '#4b5563',
    },
    reasonInput: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        textAlignVertical: 'top',
        minHeight: 100,
        color: '#1f2937',
    },
    modalNote: {
        color: '#6b7280',
        fontSize: 12,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cancelButtonText: {
        color: '#4b5563',
        fontWeight: '500',
    },
    confirmRejectButton: {
        backgroundColor: '#ef4444',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f5f5f5',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    retryText: {
        color: 'white',
        fontWeight: '500',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#2563eb',
    },
    tabText: {
        color: '#9ca3af',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#2563eb',
        fontWeight: '600',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    listContainer: {
        paddingBottom: 16,
    },
    emptyTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acceptButton: {
        backgroundColor: '#10b981',
    },
    rejectButton: {
        backgroundColor: '#ef4444',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
    },
});

export default ProductList;