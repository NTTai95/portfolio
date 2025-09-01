// screens/personal-info/_ui/profileSidebar/profileModals/FullNameModal.tsx
import { AppDispatch } from '@/store';
import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { handleFullNameUpdate } from '../profileApiHandlers';

interface FullNameModalProps {
    visible: boolean;
    onCancel: () => void;
    initialValue: string;
    reloadData: () => void;
}

export default function FullNameModal({
    visible,
    onCancel,
    initialValue,
    reloadData
}: FullNameModalProps) {
    const [fullName, setFullName] = useState<string>(initialValue);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setFullName(initialValue);
    }, [initialValue]);

    const handleOk = async () => {
        if (!fullName && !fullName?.trim()) {
            return;
        }

        const success = await handleFullNameUpdate(
            fullName,
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Cập nhật họ tên</Text>

                            <TextInput
                                value={fullName}
                                onChangeText={setFullName}
                                style={styles.input}
                                placeholder="Nhập họ tên đầy đủ..."
                                placeholderTextColor="#94a3b8"
                                autoFocus={true}
                            />

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
                                    disabled={!fullName}
                                >
                                    <Text style={[
                                        styles.submitButtonText,
                                        !fullName && styles.disabledButtonText
                                    ]}>
                                        Cập nhật
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        padding: 16,
        marginBottom: 24,
        fontSize: 16,
        backgroundColor: '#f8fafc',
        color: '#334155',
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
    disabledButtonText: {
        opacity: 0.6,
    },
});