// screens/jobs/index.tsx
import { RequestPage } from '@/types/requests/page';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import JobList from './ui/JobList';
import SidebarFilter from './ui/SidebarFilter';
import SortBar from './ui/SortBar';

type RootStackParamList = {
    JobDetail: { jobId: number };
};

type JobFilters = RequestPage.Job & {
    skillIds?: number[];
    minBudget?: number;
    maxBudget?: number;
    maxDurationHours?: number;
};

export default function JobPostScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [filters, setFilters] = useState<JobFilters>({ "sortField": "id", "sortType": "desc" });
    const [searchTerm, setSearchTerm] = useState("");
    const [total, setTotal] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        // Triggered automatically when filters/search change
    };

    const handleFilterChange = (newFilters: Partial<JobFilters>) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
        }));
    };

    const handleResetFilters = () => {
        setFilters({});
    };

    return (
        <View style={styles.container}>
            {/* Search Bar - Thiết kế lại */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm công việc..."
                        placeholderTextColor="#9ca3af"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                </View>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setShowFilters(true)}
                >
                    <Ionicons name="filter" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Sort Bar - Thiết kế lại */}
            <View style={styles.sortContainer}>
                <SortBar
                    onChange={(sort) => handleFilterChange(sort)}
                />
            </View>

            {/* Job List */}
            <JobList
                filters={filters}
                search={searchTerm}
                onTotalChange={setTotal}
                navigation={navigation}
            />

            {/* Filter Modal - Thiết kế lại */}
            {showFilters && (
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => setShowFilters(false)}
                    />
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Bộ lọc</Text>
                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    onPress={handleResetFilters}
                                    style={styles.resetButton}
                                >
                                    <Text style={styles.resetText}>Đặt lại</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setShowFilters(false)}
                                    style={styles.closeButton}
                                >
                                    <Ionicons name="close" size={24} color="#ef4444" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView
                            style={styles.filterScroll}
                            keyboardShouldPersistTaps="handled"
                        >
                            <SidebarFilter
                                filters={filters}
                                onFilterChange={handleFilterChange}
                            />
                        </ScrollView>

                        <View style={styles.footerButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setShowFilters(false)}
                            >
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={() => {
                                    setShowFilters(false);
                                    Keyboard.dismiss();
                                }}
                            >
                                <Text style={styles.applyButtonText}>Áp dụng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

// Cập nhật styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f5ff',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginRight: 10,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 46,
        fontSize: 16,
        color: '#1f2937',
    },
    filterButton: {
        width: 46,
        height: 46,
        backgroundColor: '#3b82f6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sortContainer: {
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    modalContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        height: '85%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1f2937',
    },
    modalActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    resetButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
    },
    resetText: {
        color: '#3b82f6',
        fontWeight: '600',
    },
    closeButton: {
        padding: 4,
    },
    filterScroll: {
        flex: 1,
        paddingVertical: 8,
    },
    footerButtons: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f1f5f9',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    cancelButtonText: {
        color: '#64748b',
        fontWeight: '600',
        fontSize: 16,
    },
    applyButton: {
        flex: 1,
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    applyButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});