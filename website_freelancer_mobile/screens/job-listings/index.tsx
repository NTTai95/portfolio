import { apiGet } from '@/api/baseApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { JobSearchBar } from './_ui/JobSearchBar';
import { JobCard } from './_ui/job-card/index';
import { JobListing } from './_ui/types';

const JobListingsPage = () => {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('PUBLIC');
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 5;

    // Dùng ref để theo dõi các giá trị hiện tại
    const currentStatusRef = useRef(statusFilter);
    const currentSearchTextRef = useRef(searchText);
    currentStatusRef.current = statusFilter;
    currentSearchTextRef.current = searchText;

    const fetchJobs = useCallback(async (reset: boolean) => {
        try {
            const currentStatus = currentStatusRef.current;
            const currentSearchText = currentSearchTextRef.current;

            if (reset) {
                setIsLoading(true);
                setJobs([]);
                setPage(1);
                setHasMore(true);
            } else {
                setIsLoadingMore(true);
            }

            const currentPage = reset ? 1 : page;
            const response: any = await apiGet(`/job-listings`, {
                params: {
                    page: currentPage,
                    size: pageSize,
                    keyword: currentSearchText,
                    status: currentStatus
                }
            });

            // Kiểm tra xem filter có thay đổi trong khi gọi API không
            if (currentStatus !== currentStatusRef.current ||
                currentSearchText !== currentSearchTextRef.current) {
                return; // Bỏ qua kết quả nếu filter đã thay đổi
            }

            const newJobs = response.data.jobs.map((job: any) => ({
                ...job,
                status: job.status.toUpperCase()
            }));

            if (reset) {
                setJobs(newJobs);
                setIsLoading(false);
            } else {
                setJobs(prev => [...prev, ...newJobs]);
                setIsLoadingMore(false);
            }

            setHasMore(newJobs.length === pageSize);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            if (reset) {
                setIsLoading(false);
            } else {
                setIsLoadingMore(false);
            }
        }
    }, [page]);

    // Gọi API khi statusFilter hoặc searchText thay đổi
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchJobs(true);
        }, 300); // Thêm debounce 300ms

        return () => clearTimeout(timer);
    }, [statusFilter, searchText]);

    // Gọi API khi page thay đổi
    useEffect(() => {
        if (page > 1) {
            fetchJobs(false);
        }
    }, [page]);

    // Hàm này giờ chỉ cần set currentPage = 1
    const handleSearch = useCallback(() => {
        setPage(1);
    }, []);

    const handleRefresh = useCallback(() => {
        fetchJobs(true);
    }, [fetchJobs]);

    const loadMoreJobs = useCallback(() => {
        if (hasMore && !isLoading && !isLoadingMore) {
            setPage(prev => prev + 1);
        }
    }, [hasMore, isLoading, isLoadingMore]);

    const renderFooter = () => {
        if (!isLoadingMore) return null;
        return (
            <View style={styles.loadingFooter}>
                <ActivityIndicator size="small" color="#3B82F6" />
                <Text style={styles.loadingText}>Đang tải thêm...</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <JobSearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                handleSearch={handleSearch}
            />

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3B82F6" />
                    <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
                </View>
            ) : (
                <FlatList
                    data={jobs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <JobCard
                            job={item}
                            onRefresh={handleRefresh}
                            keyword={searchText}
                        />
                    )}
                    contentContainerStyle={styles.scrollContainer}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                Không tìm thấy công việc nào phù hợp
                            </Text>
                        </View>
                    }
                    onEndReached={loadMoreJobs}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    loadingFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    loadingText: {
        marginLeft: 16,
        fontSize: 14,
        color: '#4b5563',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 24,
        marginVertical: 16,
    },
    emptyText: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
    },
});

export default JobListingsPage;