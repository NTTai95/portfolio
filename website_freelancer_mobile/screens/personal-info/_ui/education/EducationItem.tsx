// app/(client)/profile/personal-info/_ui/education/EducationItem.tsx
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EducationItemProps } from './types';

const EducationItem = ({ edu, onEdit, onDelete }: EducationItemProps) => {
    const formatDate = (date: string | Date | null) => {
        if (!date) return '';
        return dayjs(date).format('DD/MM/YYYY');
    };

    const confirmDelete = () => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa chứng chỉ này?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: onDelete, style: 'destructive' },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="book-education" size={24} color="#3b82f6" />
                </View>

                <View style={styles.headerContent}>
                    <Text style={styles.degree}>
                        {edu.degree}
                        {edu.major && <Text style={styles.major}> • {edu.major}</Text>}
                    </Text>
                    <Text style={styles.school}>{edu.schoolName}</Text>
                </View>
            </View>

            <View style={styles.dateContainer}>
                <MaterialIcons name="date-range" size={16} color="#6b7280" />
                <Text style={styles.dateText}>
                    {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Hiện tại'}
                </Text>
            </View>

            {edu.gpa !== null && edu.gpa !== undefined && (
                <View style={styles.gpaContainer}>
                    <MaterialIcons name="star" size={16} color="#f59e0b" />
                    <Text style={styles.gpaText}>
                        GPA: <Text style={styles.gpaValue}>{edu.gpa}</Text>
                    </Text>
                </View>
            )}

            {edu.description && (
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLabel}>Mô tả: </Text>
                    <Text style={styles.descriptionText}>{edu.description}</Text>
                </View>
            )}

            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.editButton}>
                    <MaterialIcons name="edit" size={20} color="#3b82f6" />
                </TouchableOpacity>

                <TouchableOpacity onPress={confirmDelete} style={styles.deleteButton}>
                    <MaterialIcons name="delete" size={20} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    iconContainer: {
        backgroundColor: '#dbeafe',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    degree: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    major: {
        color: '#3b82f6',
    },
    school: {
        fontSize: 14,
        color: '#4b5563',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    dateText: {
        marginLeft: 6,
        fontSize: 13,
        color: '#6b7280',
    },
    gpaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    gpaText: {
        marginLeft: 6,
        fontSize: 13,
        color: '#6b7280',
    },
    gpaValue: {
        fontWeight: '500',
    },
    descriptionContainer: {
        flexDirection: 'row',
        marginTop: 4,
    },
    descriptionLabel: {
        fontWeight: '600',
        color: '#4b5563',
    },
    descriptionText: {
        flex: 1,
        color: '#4b5563',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    editButton: {
        padding: 6,
        marginRight: 12,
    },
    deleteButton: {
        padding: 6,
    },
});

export default EducationItem;