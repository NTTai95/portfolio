// screens/personal-info/_ui/profileSidebar/profileModals/BioModal.tsx
import { AppDispatch } from '@/store';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleBioUpdate } from '../profileApiHandlers';

interface BioModalProps {
    visible: boolean;
    onCancel: () => void;
    initialBio: string;
    reloadData: () => void;
}

export default function BioModal({
    visible,
    onCancel,
    initialBio,
    reloadData
}: BioModalProps) {
    const [bio, setBio] = useState(initialBio);
    const dispatch = useDispatch<AppDispatch>();

    // Thêm useEffect để cập nhật giá trị khi initialBio thay đổi
    useEffect(() => {
        setBio(initialBio);
    }, [initialBio]);

    const handleOk = async () => {
        if (!bio.trim()) {
            return;
        }

        const success = await handleBioUpdate(bio, dispatch, reloadData);
        if (success) {
            onCancel();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onCancel}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalOverlay}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Cập nhật giới thiệu</Text>

                    <TextInput
                        value={bio}
                        onChangeText={setBio}
                        style={styles.textInput}
                        multiline
                        numberOfLines={6}
                        placeholder="Giới thiệu về bản thân"
                        placeholderTextColor="#999"
                    />

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleOk} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalContent: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        color: '#333',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        minHeight: 150,
        marginBottom: 24,
        textAlignVertical: 'top',
        fontSize: 16,
        backgroundColor: '#fafafa',
        lineHeight: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    cancelButton: {
        flex: 1,
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666',
        fontWeight: '600',
        fontSize: 16,
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#1890ff',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#1890ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});