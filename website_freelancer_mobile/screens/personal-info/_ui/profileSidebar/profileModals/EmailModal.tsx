// screens/personal-info/_ui/profileSidebar/profileModals/EmailModal.tsx
import { AppDispatch } from '@/store';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleEmailUpdate } from '../profileApiHandlers';

interface EmailModalProps {
    visible: boolean;
    onCancel: () => void;
    initialEmail: string;
    reloadData: () => void;
}

export default function EmailModal({
    visible,
    onCancel,
    initialEmail,
    reloadData
}: EmailModalProps) {
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    useEffect(() => {
        setEmail(initialEmail);
    }, [initialEmail]);

    const handleOk = async () => {
        let valid = true;
        setEmailError('');
        setPasswordError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailError('Vui lòng nhập email');
            valid = false;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError('Email không hợp lệ');
            valid = false;
        }

        if (!password.trim()) {
            setPasswordError('Vui lòng nhập mật khẩu');
            valid = false;
        }

        if (!valid) return;

        const success = await handleEmailUpdate(
            email.trim(),
            password.trim(),
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
            animationType="slide"
            onRequestClose={onCancel}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalOverlay}
                keyboardVerticalOffset={20}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Cập nhật email</Text>

                    <Text style={styles.label}>Email mới</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholder="Nhập email mới"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <Text style={styles.label}>Mật khẩu</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        placeholder="Nhập mật khẩu để xác nhận"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

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
    errorText: {
        color: 'red',
        marginBottom: 10,
        fontSize: 14,
    },
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
    label: {
        marginBottom: 8,
        fontWeight: '600',
        fontSize: 16,
        color: '#444',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
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