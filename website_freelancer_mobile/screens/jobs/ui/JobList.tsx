// screens/jobs/ui/JobList.tsx
import { apiPageJob } from "@/api/page";
import { RequestPage } from "@/types/requests/page";
import { ResponseRecord } from "@/types/respones/record";
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import JobCard from "./JobCard";

interface Props {
    filters: RequestPage.Job;
    search: string;
    onTotalChange: (total: number) => void;
    navigation: NavigationProp<any>;
}

export default function JobList({
    filters,
    search,
    onTotalChange,
    navigation
}: Props) {
    const [jobs, setJobs] = useState<ResponseRecord.Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchJobs = async (pageNum: number, isInitial: boolean = false) => {
        try {
            const params: RequestPage.Job = {
                page: pageNum,
                size: 5,
                ...filters,
                keyword: search,
            };

            // Clean undefined values
            Object.keys(params).forEach(key => {
                if (params[key as keyof RequestPage.Job] === undefined) {
                    delete params[key as keyof RequestPage.Job];
                }
            });

            console.log(params)

            const res = await apiPageJob(params);
            const data = res.data;

            if (isInitial) {
                setJobs(data.content || []);
            } else {
                // Nối danh sách mới vào danh sách hiện có
                setJobs(prev => [...prev, ...(data.content || [])]);
            }

            onTotalChange(data.totalElements || 0);
            setNoResults(!data.content || data.content.length === 0);
            setHasMore(!data.last); // Kiểm tra còn trang tiếp theo không
        } catch (err) {
            console.error("Lỗi khi gọi API jobs:", err);
            setNoResults(true);
        } finally {
            if (isInitial) {
                setLoading(false);
            } else {
                setLoadingMore(false);
            }
        }
    };

    // Tải dữ liệu ban đầu
    useEffect(() => {
        const fetchInitialJobs = async () => {
            setLoading(true);
            setNoResults(false);
            // Reset về trang đầu khi filter hoặc search thay đổi
            setPage(1);
            setHasMore(true);
            await fetchJobs(1, true);
        };
        fetchInitialJobs();
    }, [filters, search]);

    // Tải thêm khi cuộn đến cuối
    const loadMoreJobs = useCallback(async () => {
        // Chỉ tải nếu còn dữ liệu và không đang tải
        if (!hasMore || loading || loadingMore) return;

        setLoadingMore(true);
        const nextPage = page + 1;
        await fetchJobs(nextPage);
        setPage(nextPage);
    }, [page, hasMore, loading, loadingMore]);

    const renderItem = ({ item, index }: { item: ResponseRecord.Job, index: number }) => (
        <JobCard
            job={item}
            highlightSkill={filters.skillIds}
            search={search}
            index={index}
        />
    );

    // Footer cho loading khi tải thêm
    const renderFooter = () => {
        if (!loadingMore) return null;
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size="small" color="#1890ff" />
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1890ff" />
            </View>
        );
    }

    if (noResults) {
        return (
            <View style={styles.noResultsContainer}>
                {search ? (
                    <View style={styles.emptyContainer}>
                        <AntDesign name="search1" size={48} color="#888" />
                        <Text style={styles.emptyTitle}>Không tìm thấy công việc phù hợp</Text>
                        <Text style={styles.emptyText}>
                            Không có công việc nào phù hợp với từ khóa "{search}" và bộ lọc hiện tại.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <AntDesign name="frowno" size={48} color="#888" />
                        <Text style={styles.emptyTitle}>Hiện chưa có công việc nào</Text>
                        <Text style={styles.emptyText}>
                            Hiện không có công việc nào phù hợp với bộ lọc của bạn.
                        </Text>
                    </View>
                )}
            </View>
        );
    }

    return (
        <FlatList
            data={jobs}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReached={loadMoreJobs}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    listContainer: {
        paddingVertical: 16,
    },
    separator: {
        height: 16,
    },
    footerContainer: {
        padding: 20,
        alignItems: 'center',
    },
});