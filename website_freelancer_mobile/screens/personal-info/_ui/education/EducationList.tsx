import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EducationItem from './EducationItem';
import { EducationListProps } from './types';

const EducationList = ({ educations, onAdd, onEdit, onDelete }: EducationListProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Học vấn</Text>
                <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                    <MaterialIcons name="add" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Thêm học vấn</Text>
                </TouchableOpacity>
            </View>

            {educations.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Chưa có thông tin học vấn</Text>
                </View>
            ) : (
                educations.map((item, index) => (
                    <View key={item.id.toString()} style={{ marginBottom: index !== educations.length - 1 ? 12 : 0 }}>
                        <EducationItem
                            edu={item}
                            onEdit={() => onEdit(item)}
                            onDelete={() => onDelete(item.id)}
                        />
                    </View>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3b82f6',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        marginLeft: 6,
        fontWeight: '500',
    },
    emptyContainer: {
        padding: 16,
        alignItems: 'center',
    },
    emptyText: {
        color: '#9ca3af',
        fontStyle: 'italic',
    },
});

export default EducationList;
