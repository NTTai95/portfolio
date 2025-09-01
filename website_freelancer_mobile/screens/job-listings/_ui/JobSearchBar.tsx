import { useAuthorization } from '@/hooks/useAuthorization';
import { Status } from '@/types/status';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface JobSearchBarProps {
    searchText: string;
    setSearchText: (text: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    handleSearch: () => void;
}

export const JobSearchBar = ({
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    handleSearch
}: JobSearchBarProps) => {
    const auth = useAuthorization();
    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardPadding, setKeyboardPadding] = useState(0);

    const STATUSES = [
        'PUBLIC',
        auth.hasRole(["ROLE_NHA_TUYEN_DUNG"]) ? 'DRAFT' : null,
        'PREPARING',
        'PRIVATE',
        'IN_PROGRESS',
        'COMPLETED',
    ].filter(Boolean) as string[];

    // Xử lý hiển thị bàn phím
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardPadding(e.endCoordinates.height / 2);
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardPadding(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleStatusSelect = (value: string) => {
        // Hiển thị loading ngay khi chọn trạng thái mới
        setStatusFilter(value);
        setModalVisible(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ marginBottom: keyboardPadding }}
        >
            <View style={styles.container}>
                {/* Search Input */}
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Tìm kiếm theo tiêu đề hoặc mô tả"
                        placeholderTextColor="#94a3b8"
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.input}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                    <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                        <Icon name="search1" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Status Filter */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.filterButtonText}>
                            {Status.Meta[statusFilter.toUpperCase()]?.label || statusFilter}
                        </Text>
                        <Icon
                            name="filter"
                            size={18}
                            color="#3B82F6"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Status Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chọn trạng thái</Text>
                        <ScrollView
                            style={styles.modalScroll}
                            contentContainerStyle={styles.scrollContent}
                        >
                            {STATUSES.map(status => (
                                <Pressable
                                    key={status}
                                    style={({ pressed }) => [
                                        styles.optionItem,
                                        pressed && styles.optionItemPressed,
                                        statusFilter === status && styles.selectedOption
                                    ]}
                                    onPress={() => handleStatusSelect(status)}
                                >
                                    <Text style={styles.optionText}>
                                        {Status.Meta[status.toUpperCase()]?.label || status}
                                    </Text>
                                    {statusFilter === status && (
                                        <Icon name="check" size={18} color="#3B82F6" />
                                    )}
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f8fafc',
        fontSize: 16,
        marginRight: 12,
        color: '#334155',
        includeFontPadding: false,
    },
    searchButton: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B82F6',
        elevation: 2,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterButton: {
        height: 50,
        borderWidth: 1,
        borderColor: '#c7d2fe',
        borderRadius: 12,
        backgroundColor: '#eef2ff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        width: '100%',
    },
    filterButtonText: {
        fontSize: 16,
        color: '#3B82F6',
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        maxHeight: Dimensions.get('window').height * 0.6,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalScroll: {
        flexGrow: 0,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    optionItemPressed: {
        backgroundColor: '#f8fafc',
    },
    selectedOption: {
        backgroundColor: '#eef2ff',
    },
    optionText: {
        fontSize: 16,
        color: '#334155',
    },
});