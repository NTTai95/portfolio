// app/(client)/profile/personal-info/_ui/certification/CertificationsList.tsx
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CertificationItem from './CertificationItem';
import { CertificationListProps } from './types';

const CertificationList = ({ certifications, onAdd, onEdit, onDelete }: CertificationListProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Chứng chỉ</Text>
                <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                    <AntDesign name="edit" size={24} style={styles.addIcon} />
                    <Text style={styles.addText}>Thêm chứng chỉ</Text>
                </TouchableOpacity>
            </View>

            {certifications.length === 0 ? (
                <Text style={styles.emptyText}>Chưa có chứng chỉ nào</Text>
            ) : (
                certifications.map((item) => (
                    <CertificationItem
                        key={item.id.toString()}
                        cert={item}
                        onEdit={() => onEdit(item)}
                        onDelete={() => onDelete(item.id)}
                    />
                ))
            )}
        </View>

    );
};

const styles = StyleSheet.create({
    emptyText: {
        fontStyle: 'italic',
        color: '#888',
        textAlign: 'center',
        paddingVertical: 12,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
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
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1890ff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    addIcon: {
        color: '#fff',
        marginRight: 4,
    },
    addText: {
        color: '#fff',
        fontWeight: '500',
    },
});

export default CertificationList;