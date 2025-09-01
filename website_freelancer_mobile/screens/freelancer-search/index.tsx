// screens/freelancer-search/index.tsx
import { apiSearchFreelancers } from '@/api/detail';
import { AuthGuard } from '@/components/AuthGuard';
import { ResponseDetail } from '@/types/respones/detail';
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FilterPanel from './ui/FilterPanel';
import FreelancerCard from './ui/FreelancerCard';
import InviteModal from './ui/InviteModal';
import SearchHeader from './ui/SearchHeader';

// Sửa interface SearchFilters:
interface SearchFilters {
    keyword: string; // Thay ?: thành :
    skillIds: number[];
    languageIds: number[];
    isMale: boolean | null;
    status: string;
    page: number;
    size: number;
    sortBy: string;
    sortDir: string;
}

export default function SearchFreelancersPage() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    // Cập nhật giá trị khởi tạo:
    const [filters, setFilters] = useState<SearchFilters>({
        keyword: '',
        skillIds: [],
        languageIds: [],
        isMale: null,
        status: 'ACTIVE',
        page: 0,
        size: 5,
        sortBy: 'reputation',
        sortDir: 'desc',
    });

    // State quản lý dữ liệu và trạng thái tìm kiếm
    const [data, setData] = useState<ResponseDetail.FreelancerSearchResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [allFreelancers, setAllFreelancers] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loadMoreError, setLoadMoreError] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [inviteModalVisible, setInviteModalVisible] = useState(false);
    const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null);

    const searchFreelancers = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const apiFilters = {
                ...filters,
                isMale: filters.isMale ?? undefined,
            };

            const result = await apiSearchFreelancers(apiFilters);
            setData(result);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tìm kiếm');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    // Xử lý khi filters thay đổi
    useEffect(() => {
        const fetchData = async () => {
            const result = await searchFreelancers();
            if (result) {
                setLoadMoreError(false);
                if (filters.page === 0) {
                    setAllFreelancers(result.freelancers || []);
                } else {
                    setAllFreelancers((prev) => [...prev, ...(result.freelancers || [])]);
                }
                setTotalPages(result.totalPages || 0);
            }
            setIsLoadingMore(false);
        };

        fetchData();
    }, [filters, searchFreelancers]);

    // Cập nhật handleSearch
    const handleSearch = (newFilters: Partial<SearchFilters>) => {
        const updatedFilters = {
            ...filters,
            ...newFilters,
            keyword: newFilters.keyword ?? '',
            isMale: newFilters.isMale ?? null,
            page: 0
        };
        setFilters(updatedFilters);
        setAllFreelancers([]);
    };

    const loadMore = () => {
        if (
            !isLoadingMore &&
            !isLoading &&
            !loadMoreError &&
            filters.page + 1 < totalPages
        ) {
            setIsLoadingMore(true);
            setFilters(prev => ({
                ...prev,
                page: prev.page + 1
            }));
        }
    };

    const handleViewDetail = (freelancerId: number) => {
        navigation.navigate('freelancer', { id: freelancerId });
    };

    const handleInviteToProject = (freelancerId: number) => {
        const freelancer = allFreelancers.find((f) => f.id === freelancerId);
        if (freelancer) {
            setSelectedFreelancer(freelancer);
            setInviteModalVisible(true);
        }
    };

    const handleInviteModalClose = () => {
        setInviteModalVisible(false);
        setSelectedFreelancer(null);
    };

    const handleInviteSuccess = () => {
        setInviteModalVisible(false);
        setSelectedFreelancer(null);
        setAllFreelancers([]);
        setFilters(prev => ({ ...prev, page: 0 }));
    };

    const handleRetryLoadMore = () => {
        setLoadMoreError(false);
        searchFreelancers();
    };

    if (filters.page === 0 && isLoading && allFreelancers.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#355a8e" />
            </View>
        );
    }

    if (filters.page === 0 && error) {
        return (
            <View style={styles.errorContainer}>
                <View style={styles.errorCard}>
                    <Text style={styles.errorTitle}>Không thể tải dữ liệu</Text>
                    <Text style={styles.errorMessage}>
                        Có lỗi xảy ra khi tải danh sách freelancer. Vui lòng thử lại.
                    </Text>
                    <TouchableOpacity style={styles.retryButton} onPress={searchFreelancers}>
                        <Text style={styles.retryButtonText}>Thử lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.stickyHeader}>
                <View style={styles.searchContainer}>
                    <SearchHeader onSearch={handleSearch} filters={filters} />
                    <AuthGuard roles={['ROLE_NHA_TUYEN_DUNG']}>
                        <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => setFilterModalVisible(true)}
                        >
                            <AntDesign name="filter" size={20} color="#355a8e" />
                        </TouchableOpacity>
                    </AuthGuard>
                </View>
            </View>

            <FlatList
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                data={allFreelancers}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                    <FreelancerCard
                        freelancer={item}
                        onViewDetail={handleViewDetail}
                        onInviteToProject={handleInviteToProject}
                    />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => {
                    if (filters.page >= totalPages) return null;

                    if (isLoadingMore) {
                        return (
                            <ActivityIndicator
                                size="large"
                                color="#355a8e"
                                style={styles.footerLoader}
                            />
                        );
                    }

                    if (loadMoreError) {
                        return (
                            <TouchableOpacity
                                style={styles.retryFooter}
                                onPress={handleRetryLoadMore}
                            >
                                <Text style={styles.retryFooterText}>
                                    Không thể tải thêm. Nhấn để thử lại.
                                </Text>
                            </TouchableOpacity>
                        );
                    }

                    return null;
                }}
                ListEmptyComponent={
                    !isLoading ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyTitle}>Không tìm thấy freelancer phù hợp</Text>
                            <Text style={styles.emptyText}>
                                Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                            </Text>
                        </View>
                    ) : null
                }
            />

            <FilterPanel
                filters={filters}
                onFilterChange={handleSearch}
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
            />

            {inviteModalVisible && (
                <InviteModal
                    onCancel={handleInviteModalClose}
                    onSuccess={handleInviteSuccess}
                    freelancer={selectedFreelancer}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        justifyContent: 'center',
        gap: 12
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    container: {
        flex: 1,
        backgroundColor: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    },
    contentContainer: {
        padding: 16,
        paddingTop: 95, // Adjusted to account for sticky header height
    },
    stickyHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#f8fafc',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        justifyContent: 'center',
    },
    filterButtonText: {
        marginLeft: 8,
        color: '#355a8e',
        fontWeight: '500',
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400,
        backgroundColor: '#f8fafc',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f8fafc',
    },
    errorCard: {
        backgroundColor: 'white',
        padding: 32,
        borderRadius: 20,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#dc2626',
        marginBottom: 16,
    },
    errorMessage: {
        color: '#6b7280',
        marginBottom: 24,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#355a8e',
        borderRadius: 12,
        height: 44,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    retryButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    emptyContainer: {
        padding: 48,
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#355a8e',
        marginBottom: 16,
    },
    emptyText: {
        color: '#6b7280',
        textAlign: 'center',
    },
    footerLoader: {
        padding: 20,
        alignSelf: 'center',
    },
    retryFooter: {
        padding: 20,
        alignItems: 'center',
    },
    retryFooterText: {
        color: '#dc2626',
        fontSize: 14,
    },
});