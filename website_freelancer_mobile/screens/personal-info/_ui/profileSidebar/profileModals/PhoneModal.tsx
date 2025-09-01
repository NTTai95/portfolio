// screens/personal-info/_ui/profileSidebar/profileModals/PhoneModal.tsx
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
import { handlePhoneUpdate } from '../profileApiHandlers';

interface PhoneModalProps {
    visible: boolean;
    onCancel: () => void;
    initialPhone: string;
    reloadData: () => void;
}

export default function PhoneModal({
    visible,
    onCancel,
    initialPhone,
    reloadData
}: PhoneModalProps) {
    const [phone, setPhone] = useState(initialPhone);
    const dispatch = useDispatch<AppDispatch>();
    const [phoneError, setPhoneError] = useState('');

    useEffect(() => {
        setPhone(initialPhone);
    }, [initialPhone]);

    const handleOk = async () => {
        setPhoneError('');

        const phoneRegex = /^(0[3|5|7|8|9][0-9]{8}|\+84[3|5|7|8|9][0-9]{8})$/;

        if (!phone && !phone?.trim()) {
            setPhoneError('Vui lòng nhập số điện thoại');
            return;
        }

        if (!phoneRegex.test(phone.trim())) {
            setPhoneError('Số điện thoại không hợp lệ');
            return;
        }

        const success = await handlePhoneUpdate(
            phone.trim(),
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
                            <Text style={styles.modalTitle}>Cập nhật số điện thoại</Text>

                            <TextInput
                                value={phone}
                                onChangeText={(text) => {
                                    setPhone(text);
                                    if (phoneError) setPhoneError(''); // xóa lỗi khi nhập lại
                                }}
                                style={styles.input}
                                placeholder="Nhập số điện thoại của bạn"
                                keyboardType="phone-pad"
                            />
                            {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

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
                                    disabled={!phone}
                                >
                                    <Text style={[
                                        styles.submitButtonText,
                                        !phone && styles.disabledButtonText
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
    errorText: {
        color: 'red',
        marginBottom: 10,
        fontSize: 14,
    },
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