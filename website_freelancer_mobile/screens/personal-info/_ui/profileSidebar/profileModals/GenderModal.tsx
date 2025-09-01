// screens/personal-info/_ui/profileSidebar/profileModals/GenderModal.tsx
import { AppDispatch } from '@/store';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleGenderUpdate } from '../profileApiHandlers';

interface GenderModalProps {
    visible: boolean;
    onCancel: () => void;
    initialGender: boolean;
    reloadData: () => void;
}

export default function GenderModal({
    visible,
    onCancel,
    initialGender,
    reloadData
}: GenderModalProps) {
    const [gender, setGender] = useState(initialGender);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setGender(initialGender);
    }, [initialGender]);

    const handleOk = async () => {
        const success = await handleGenderUpdate(
            gender,
            dispatch,
            reloadData
        );

        if (success) {
            onCancel();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Cập nhật giới tính</Text>

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue) => setGender(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Nam" value={true} />
                            <Picker.Item label="Nữ" value={false} />
                        </Picker>
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={onCancel}
                            style={[styles.button, styles.cancelButton]}
                        >
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleOk}
                            style={[styles.button, styles.submitButton]}
                        >
                            <Text style={styles.submitButtonText}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        marginBottom: 24,
        overflow: 'hidden',
    },
    picker: {
        width: '100%',
    },
    selectedValueContainer: {
        backgroundColor: '#f0f9ff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e0f2fe',
    },
    selectedValueText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#0369a1',
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 6,
    },
    cancelButton: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    cancelButtonText: {
        color: '#64748b',
        fontWeight: '600',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#0ea5e9',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});