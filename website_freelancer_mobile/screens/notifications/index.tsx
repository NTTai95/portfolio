import { apiDelete, apiPut } from '@/api/baseApi';
import { AppDispatch, RootState } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Modal,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const PAGE_SIZE = 10;

const NotificationPage = () => {
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState<'read' | 'unread' | null>(null);
    const [loading, setLoading] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null);
    const [showStatusFilter, setShowStatusFilter] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [visibleItems, setVisibleItems] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const notifications = useSelector((state: RootState) => state.volatile.ws.notifications);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<any>>();

    // Lọc và sắp xếp thông báo
    const filteredNotifications = useMemo(() => {
        let result = [...notifications];

        // Filter by status
        if (filterStatus !== null) {
            result = result.filter(noti =>
                filterStatus === 'read' ? noti.read : !noti.read
            );
        }

        // Search filter
        if (searchText) {
            const lowerCaseSearch = searchText.toLowerCase();
            result = result.filter(
                noti =>
                    noti.title.toLowerCase().includes(lowerCaseSearch) ||
                    (noti.content && noti.content.toLowerCase().includes(lowerCaseSearch))
            );
        }

        // Sorting
        if (sortOrder) {
            result.sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return sortOrder === 'ascend' ? dateA - dateB : dateB - dateA;
            });
        }

        return result;
    }, [notifications, searchText, filterStatus, sortOrder]);

    // Tải thêm dữ liệu khi cuộn
    const loadMoreItems = useCallback(() => {
        if (!hasMore || loading) return;

        const nextIndex = currentIndex + PAGE_SIZE;
        const nextItems = filteredNotifications.slice(0, nextIndex);

        setVisibleItems(nextItems);
        setCurrentIndex(nextIndex);
        setHasMore(nextIndex < filteredNotifications.length);
    }, [currentIndex, filteredNotifications, hasMore, loading]);

    // Làm mới dữ liệu
    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        // Thực hiện các thao tác làm mới dữ liệu ở đây
        // Sau khi hoàn thành:
        setTimeout(() => {
            setCurrentIndex(PAGE_SIZE);
            setVisibleItems(filteredNotifications.slice(0, PAGE_SIZE));
            setHasMore(PAGE_SIZE < filteredNotifications.length);
            setIsRefreshing(false);
        }, 1000);
    }, [filteredNotifications]);

    // Khởi tạo dữ liệu
    useEffect(() => {
        const initialItems = filteredNotifications.slice(0, PAGE_SIZE);
        setVisibleItems(initialItems);
        setCurrentIndex(PAGE_SIZE);
        setHasMore(PAGE_SIZE < filteredNotifications.length);
    }, [filteredNotifications]);

    const handleMarkAsRead = async (id: string) => {
        try {
            await apiPut(`/notifications/${id}/read`);
            dispatch(addMessage({
                key: "mark-read",
                content: "Đã đánh dấu là đã đọc",
                type: "success",
            }));
        } catch (error) {
            dispatch(addMessage({
                key: "mark-read-error",
                content: "Cập nhật thất bại",
                type: "error",
            }));
        }
    };

    const handleMarkAllAsRead = async () => {
        setLoading(true);
        try {
            await apiPut(`/notifications/read-all`);
            dispatch(addMessage({
                key: "read-all",
                content: "Đã đánh dấu tất cả thông báo là đã đọc!",
                type: "success",
            }));
        } catch (error) {
            dispatch(addMessage({
                key: "read-all-error",
                content: "Đánh dấu tất cả đã đọc thất bại!",
                type: "error",
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await apiDelete(`/notifications/${id}`);
            dispatch(addMessage({
                key: "delete",
                content: "Đã xóa thông báo",
                type: "success",
            }));
        } catch (error) {
            dispatch(addMessage({
                key: "delete-error",
                content: "Xóa thất bại",
                type: "error",
            }));
        }
    };

    const handleDeleteAll = async () => {
        setLoading(true);
        try {
            await apiDelete(`/notifications/delete-all`);
            dispatch(addMessage({
                key: "delete-all",
                content: "Đã xóa tất cả thông báo!",
                type: "success",
            }));
        } catch (error) {
            dispatch(addMessage({
                key: "delete-all-error",
                content: "Xóa tất cả thất bại!",
                type: "error",
            }));
        } finally {
            setLoading(false);
        }
    };

    const confirmDeleteAll = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn chắc chắn muốn xóa tất cả thông báo?",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Xóa", onPress: handleDeleteAll, style: "destructive" }
            ]
        );
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const toggleSortOrder = () => {
        setSortOrder(prev => {
            if (prev === null) return 'descend';
            if (prev === 'descend') return 'ascend';
            return null;
        });
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                <View style={styles.itemHeader}>
                    <View style={styles.itemHeaderLeft}>
                        {!item.read && <View style={styles.unreadIndicator} />}
                        <Text style={[styles.title, item.read && styles.readTitle]}>
                            {item.title}
                        </Text>
                    </View>
                    <AntDesign
                        name={expandedId === item.id ? "up" : "down"}
                        size={16}
                        color="#666"
                    />
                </View>
                <Text style={styles.dateText}>
                    {item.createdAt}
                </Text>
            </TouchableOpacity>

            {expandedId === item.id && (
                <View style={styles.expandedContent}>
                    <Text style={styles.contentText}>
                        {item.content}
                    </Text>

                    {item.link && (
                        <TouchableOpacity onPress={() => navigation.navigate(item.link)}>
                            <Text style={styles.linkText}>Xem chi tiết</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.actionButtons}>
                        {!item.read ? (
                            <TouchableOpacity
                                style={styles.readButton}
                                onPress={() => handleMarkAsRead(item.id)}
                            >
                                <AntDesign name="check" size={16} color="white" />
                                <Text style={styles.buttonText}>Đã đọc</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={[styles.readButton, styles.disabledButton]}>
                                <AntDesign name="check" size={16} color="white" />
                                <Text style={styles.buttonText}>Đã đọc</Text>
                            </View>
                        )}

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => Alert.alert(
                                "Xác nhận",
                                "Bạn chắc chắn muốn xóa?",
                                [
                                    { text: "Hủy", style: "cancel" },
                                    { text: "Xóa", onPress: () => handleDelete(item.id), style: "destructive" }
                                ]
                            )}
                        >
                            <AntDesign name="delete" size={16} color="white" />
                            <Text style={styles.buttonText}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );

    const renderFooter = () => {
        if (!hasMore) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Đã hiển thị tất cả thông báo</Text>
                </View>
            );
        }

        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size="small" color="#1890ff" />
                <Text style={styles.footerText}>Đang tải thêm...</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#1890ff" />
                </View>
            )}

            {/* Search and Filter Section */}
            <View style={styles.filterContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm thông báo"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <AntDesign name="search1" size={20} color="#666" style={styles.searchIcon} />
                </View>

                <View style={styles.filterRow}>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => setShowStatusFilter(true)}
                    >
                        <Text style={styles.filterButtonText}>
                            {filterStatus === 'read' ? 'Đã xem' :
                                filterStatus === 'unread' ? 'Chưa xem' : 'Trạng thái'}
                        </Text>
                        <AntDesign name="down" size={14} color="#666" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={() => {
                            setSearchText('');
                            setFilterStatus(null);
                            setSortOrder(null);
                        }}
                    >
                        <AntDesign name="reload1" size={18} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.bulkActions}>
                <TouchableOpacity
                    style={[styles.bulkButton, styles.markReadButton]}
                    onPress={handleMarkAllAsRead}
                >
                    <Text style={styles.bulkButtonText}>Đánh dấu tất cả đã đọc</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.bulkButton, styles.deleteAllButton]}
                    onPress={confirmDeleteAll}
                >
                    <Text style={styles.bulkButtonText}>Xóa tất cả</Text>
                </TouchableOpacity>
            </View>

            {/* Notifications List */}
            <FlatList
                data={visibleItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                onEndReached={loadMoreItems}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Không có thông báo</Text>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        colors={['#1890ff']}
                        tintColor="#1890ff"
                    />
                }
            />

            {/* Status Filter Modal */}
            <Modal
                visible={showStatusFilter}
                transparent
                animationType="slide"
                onRequestClose={() => setShowStatusFilter(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowStatusFilter(false)}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.filterOption}
                            onPress={() => {
                                setFilterStatus('read');
                                setShowStatusFilter(false);
                            }}
                        >
                            <Text style={styles.filterOptionText}>Đã xem</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.filterOption}
                            onPress={() => {
                                setFilterStatus('unread');
                                setShowStatusFilter(false);
                            }}
                        >
                            <Text style={styles.filterOptionText}>Chưa xem</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.filterOption}
                            onPress={() => {
                                setFilterStatus(null);
                                setShowStatusFilter(false);
                            }}
                        >
                            <Text style={styles.filterOptionText}>Tất cả</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    filterContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingLeft: 40,
    },
    searchIcon: {
        position: 'absolute',
        left: 12,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filterButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
    },
    filterButtonText: {
        color: '#333',
        fontSize: 14,
    },
    sortButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 8,
    },
    sortButtonText: {
        color: '#333',
        fontSize: 14,
    },
    resetButton: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    bulkActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    bulkButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
    },
    markReadButton: {
        backgroundColor: '#1890ff',
        marginRight: 8,
    },
    deleteAllButton: {
        backgroundColor: '#ff4d4f',
        marginLeft: 8,
    },
    bulkButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 16,
    },
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        padding: 16,
        elevation: 2,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    unreadIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#1890ff',
        marginRight: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    readTitle: {
        fontWeight: 'normal',
        color: '#888',
    },
    dateText: {
        marginTop: 4,
        fontSize: 12,
        color: '#888',
    },
    expandedContent: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    contentText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    linkText: {
        marginTop: 8,
        color: '#1890ff',
        textDecorationLine: 'underline',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    readButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1890ff',
        paddingVertical: 8,
        borderRadius: 6,
        marginRight: 8,
    },
    deleteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff4d4f',
        paddingVertical: 8,
        borderRadius: 6,
        marginLeft: 8,
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: 'white',
        marginLeft: 6,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
    footerContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#888',
        marginTop: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
    },
    filterOption: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    filterOptionText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default NotificationPage;