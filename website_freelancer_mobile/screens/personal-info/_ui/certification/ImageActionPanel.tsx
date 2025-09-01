import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface ImageActionProps {
    imageUrl?: string;
    onRemove: () => void;
    onChange: (file: any) => void;
    label: string;
}

const ImageActionPanel = ({ imageUrl, onRemove, onChange, label }: ImageActionProps) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleImageChange = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            dispatch(addMessage({
                content: 'Cần quyền truy cập thư viện ảnh',
                type: 'error',
                key: 'image-permission'
            }));
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (result.canceled) {
            return;
        }

        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            setLoading(true);
            try {
                const base64 = await FileSystem.readAsStringAsync(asset.uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                const mimeType = asset.type || 'image/jpeg';
                const dataUrl = `data:${mimeType};base64,${base64}`;
                onChange(dataUrl);
            } catch (error) {
                console.error('Error reading image file:', error);
                dispatch(addMessage({
                    content: 'Đã xảy ra lỗi khi xử lý ảnh',
                    type: 'error',
                    key: 'image-conversion-error'
                }));
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.imageContainer}>
                {imageUrl ? (
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.changeButton]}
                                onPress={handleImageChange}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <>
                                        <MaterialIcons name="edit" size={20} color="#fff" />
                                        <Text style={styles.buttonText}>Thay đổi</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.removeButton]}
                                onPress={onRemove}
                                disabled={loading}
                            >
                                <MaterialIcons name="delete" size={20} color="#fff" />
                                <Text style={styles.buttonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.uploadArea}
                        onPress={handleImageChange}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#3b82f6" />
                        ) : (
                            <>
                                <View style={styles.uploadIconContainer}>
                                    <AntDesign name="plus" size={24} color="#3b82f6" />
                                </View>
                                <Text style={styles.uploadText}>Tải lên ảnh</Text>
                            </>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    label: {
        fontWeight: '500',
        marginBottom: 12,
        fontSize: 14,
        color: '#374151',
    },
    imageContainer: {
        height: 180,
        borderRadius: 12,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
    },
    imageWrapper: {
        flex: 1,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingVertical: 8,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    changeButton: {
        borderRightWidth: 1,
        borderRightColor: 'rgba(255,255,255,0.3)',
    },
    removeButton: {},
    buttonText: {
        color: '#fff',
        marginLeft: 6,
        fontWeight: '500',
    },
    uploadArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#eff6ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    uploadText: {
        color: '#3b82f6',
        fontWeight: '500',
    },
});

export default ImageActionPanel;