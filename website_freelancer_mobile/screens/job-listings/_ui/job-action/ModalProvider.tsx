import React, { createContext, useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ModalContextType {
    showConfirmModal: (config: ConfirmModalConfig) => void;
}

interface ConfirmModalConfig {
    title?: string;
    content?: string;
    onOk?: () => void;
    onCancel?: () => void;
    okText?: string;
    cancelText?: string;
}

const ModalContext = createContext<ModalContextType>({
    showConfirmModal: () => { },
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfig, setModalConfig] = useState<ConfirmModalConfig | null>(null);

    const showConfirmModal = (config: ConfirmModalConfig) => {
        setModalConfig(config);
        setModalVisible(true);
    };

    const handleOk = () => {
        modalConfig?.onOk?.();
        setModalVisible(false);
    };

    const handleCancel = () => {
        modalConfig?.onCancel?.();
        setModalVisible(false);
    };

    return (
        <ModalContext.Provider value={{ showConfirmModal }}>
            {children}

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(false);
                }}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {modalConfig?.title && (
                            <Text style={styles.modalTitle}>{modalConfig.title}</Text>
                        )}

                        {modalConfig?.content && (
                            <Text style={styles.modalContent}>{modalConfig.content}</Text>
                        )}

                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={handleCancel}>
                                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                                    {modalConfig?.cancelText || 'Cancel'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.okButton]}
                                onPress={handleOk}>
                                <Text style={[styles.buttonText, styles.okButtonText]}>
                                    {modalConfig?.okText || 'OK'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1f2937',
        textAlign: 'center',
    },
    modalContent: {
        fontSize: 16,
        marginBottom: 24,
        color: '#4b5563',
        textAlign: 'center',
        lineHeight: 22,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    okButton: {
        backgroundColor: '#2563eb',
    },
    cancelButton: {
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    okButtonText: {
        color: 'white',
    },
    cancelButtonText: {
        color: '#4b5563',
    },
});