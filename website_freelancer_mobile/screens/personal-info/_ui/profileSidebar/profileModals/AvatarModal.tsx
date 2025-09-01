// app/(client)/profile/personal-info/_ui/profileSidebar/profileModals/AvatarModal.tsx
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Linking,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import ProfileContext from '../../ProfileContext';
import { handleAvatarUpdate } from '../profileApiHandlers';

interface AvatarModalProps {
    visible: boolean;
    onCancel: () => void;
    reloadData: () => void;
    currentAvatar?: string | null;
}

export default function AvatarModal({
    visible,
    onCancel,
    reloadData,
    currentAvatar
}: AvatarModalProps) {
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [permissionInfo, setPermissionInfo] = useState<ImagePicker.PermissionStatus | null>(null);
    const { reloadData: contextReloadData } = useContext(ProfileContext);
    const dispatch = useDispatch<AppDispatch>();

    // Kiểm tra quyền khi component mount
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
            setPermissionInfo(status);
        })();
    }, []);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setPermissionInfo(status);
        return status === 'granted';
    };

    const pickImage = async () => {
        try {
            setIsLoading(true);

            // Kiểm tra và yêu cầu quyền nếu cần
            if (permissionInfo !== 'granted') {
                const granted = await requestPermission();
                if (!granted) {
                    Alert.alert(
                        'Quyền bị từ chối',
                        'Bạn cần cấp quyền truy cập thư viện ảnh để chọn ảnh đại diện',
                        [
                            { text: 'Hủy', style: 'cancel' },
                            { text: 'Mở cài đặt', onPress: () => Linking.openSettings() }
                        ]
                    );
                    setIsLoading(false);
                    return;
                }
            }

            // Mở thư viện ảnh
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                allowsMultipleSelection: false,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Lỗi khi chọn ảnh:', error);
            dispatch(addMessage({
                key: "avatarModal",
                type: 'error',
                content: 'Lỗi khi chọn ảnh đại diện',
            }))
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setImage(null);
        onCancel();
    };

    const handleUpload = async () => {
        if (!image) return;

        setIsLoading(true);

        try {
            // Tạo đối tượng file từ URI ảnh
            const file = {
                uri: image,
                name: 'avatar.jpg',
                type: 'image/jpeg',
            };

            const success = await handleAvatarUpdate(
                file,
                dispatch,
                reloadData || contextReloadData
            );

            if (success) {
                dispatch(addMessage({
                    key: "avatarModal",
                    type: 'success',
                    content: 'Cập nhật ảnh đại diện thành công',
                }))
                handleCancel();
            } else {
                dispatch(addMessage({
                    key: "avatarModal",
                    type: 'error',
                    content: 'Cập nhật ảnh đại diện thất bại 1',
                }))
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật ảnh đại diện:', error);
            dispatch(addMessage({
                key: "avatarModal",
                type: 'error',
                content: 'Cập nhật ảnh đại diện thất bại 2',
            }))
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Cập nhật ảnh đại diện</Text>

                    {(image || currentAvatar) && (
                        <Image
                            source={{ uri: image || currentAvatar || undefined }}
                            style={styles.avatarPreview}
                            resizeMode="cover"
                        />
                    )}

                    {isLoading ? (
                        <ActivityIndicator size="large" color="#1890ff" style={styles.loading} />
                    ) : (
                        <TouchableOpacity
                            onPress={pickImage}
                            style={styles.button}
                            disabled={isLoading}
                        >
                            <Text style={styles.buttonText}>Chọn Ảnh</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={handleCancel}
                            style={styles.cancelButton}
                            disabled={isLoading}
                        >
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleUpload}
                            style={[styles.submitButton, (!image || isLoading) && styles.disabledButton]}
                            disabled={!image || isLoading}
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
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalContent: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 24,
        color: '#333',
        textAlign: 'center',
    },
    avatarPreview: {
        width: 180,
        height: 180,
        borderRadius: 90,
        marginBottom: 24,
        borderWidth: 2,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#1890ff',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 4,
        minWidth: 200,
        shadowColor: '#1890ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 8,
        gap: 16,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
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
        paddingVertical: 12,
        borderRadius: 10,
        elevation: 3,
        alignItems: 'center',
        shadowColor: '#1890ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    disabledButton: {
        backgroundColor: '#a0a0a0',
        shadowColor: 'transparent',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    loading: {
        marginBottom: 24,
        height: 54,
        justifyContent: 'center',
    },
});