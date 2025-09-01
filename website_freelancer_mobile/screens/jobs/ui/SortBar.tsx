import { apiSortJob } from '@/api/sort';
import type { RequestPage } from '@/types/requests/page';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const fieldLabel: Record<string, string> = {
    budget: 'Ngân sách',
    durationHours: 'Thời gian',
    postedAt: 'Ngày đăng',
    closedAt: 'Hạn nộp',
    id: 'Mới nhất',
};

type SortField = keyof typeof fieldLabel;

type Props = {
    onChange: (sort: RequestPage.Job) => void;
};

const SortBar: React.FC<Props> = ({ onChange }) => {
    const [fields, setFields] = useState<SortField[]>([]);
    const [sortField, setSortField] = useState<SortField>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>('desc');

    useEffect(() => {
        apiSortJob().then(res => {
            const allowed: SortField[] = ['budget', 'durationHours', 'postedAt', 'closedAt', 'id'];
            // Sửa: Kiểm tra kiểu dữ liệu API trả về
            const apiFields = res.data || [];
            const filtered = apiFields
                .filter((f: string) => allowed.includes(f as SortField))
                .map(f => f as SortField);

            setFields(filtered);

        }).catch(err => {
            console.error('Failed to fetch sort fields', err);
        });
    }, []);

    // Sửa: Xử lý sort logic
    const handleClick = (field: SortField) => {
        let newOrder: 'asc' | 'desc' | undefined = 'asc';

        // Nếu đang sort cùng field thì đảo chiều
        if (sortField === field) {
            if (sortOrder === 'asc') {
                newOrder = 'desc';
            } else if (sortOrder === 'desc') {
                newOrder = undefined; // Tắt sort
            }
        }

        // Cập nhật state
        setSortField(field);
        setSortOrder(newOrder);

        // Gửi thay đổi ra ngoài
        onChange({
            sortField: newOrder ? field as "id" | "budget" | "durationHours" | "postedAt" | "closedAt" : undefined,
            sortType: newOrder
        });

    };

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return 'unfold-more';
        if (sortOrder === 'asc') return 'arrow-upward';
        if (sortOrder === 'desc') return 'arrow-downward';
        return 'unfold-more';
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {fields.map(field => {
                    const isActive = sortField === field && !!sortOrder;

                    return (
                        <TouchableOpacity
                            key={field}
                            style={[
                                styles.button,
                                isActive ? styles.buttonActive : null,
                            ]}
                            onPress={() => handleClick(field)}
                        >
                            <MaterialIcons
                                name={getSortIcon(field)}
                                size={16}
                                color={isActive ? '#3b82f6' : '#9ca3af'}
                                style={styles.sortIcon}
                            />
                            <Text style={[
                                styles.label,
                                isActive ? styles.labelActive : styles.labelInactive,
                            ]}>
                                {fieldLabel[field]}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
    },
    scrollContent: {
        paddingHorizontal: 12,
    },
    buttonActive: {
        backgroundColor: '#eff6ff',
        borderColor: '#3b82f6',
    },
    label: {
        fontSize: 14,
        marginLeft: 6,
    },
    labelActive: {
        color: '#2563eb',
        fontWeight: '600',
    },
    labelInactive: {
        color: '#4b5563',
    },
    sortIcon: {
        marginRight: 4,
    },
});

export default SortBar;