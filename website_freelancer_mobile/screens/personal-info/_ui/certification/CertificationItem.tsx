// screens/personal-info/_ui/certification/CertificationItem.tsx
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { CertificationItemProps } from './types';

const CertificationItem = ({ cert, onEdit, onDelete }: CertificationItemProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openPreview = (imageUrl?: string) => {
        if (!imageUrl) return;
        setPreviewImage(imageUrl);
        setModalVisible(true);
    };

    const closePreview = () => {
        setModalVisible(false);
        setPreviewImage(null);
    };

    // Chuẩn bị dữ liệu cho ImageViewer
    const images = previewImage ? [{ url: previewImage }] : [];

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <Text style={styles.certName}>{cert.name}</Text>
                <Text style={styles.issuer}>{cert.issueBy}</Text>
                <Text style={styles.date}>Ngày cấp: {cert.issueDate}</Text>
                {cert.expiryDate && <Text style={styles.date}>Hết hạn: {cert.expiryDate}</Text>}

                {/* Hiển thị thumbnail ảnh */}
                <View style={styles.imagesContainer}>
                    {cert.frontImage && (
                        <TouchableOpacity onPress={() => openPreview(cert.frontImage)}>
                            <Image
                                source={{ uri: cert.frontImage }}
                                style={styles.thumbnail}
                            />
                            <Text style={styles.imageLabel}>Mặt trước</Text>
                        </TouchableOpacity>
                    )}

                    {cert.backImage && (
                        <TouchableOpacity onPress={() => openPreview(cert.backImage)}>
                            <Image
                                source={{ uri: cert.backImage }}
                                style={styles.thumbnail}
                            />
                            <Text style={styles.imageLabel}>Mặt sau</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
                    <AntDesign name="edit" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
                    <AntDesign name="delete" size={24} />
                </TouchableOpacity>
            </View>

            {/* Modal xem ảnh full màn hình với zoom */}
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={closePreview}
            >
                <ImageViewer
                    imageUrls={images}
                    enableSwipeDown
                    onSwipeDown={closePreview}
                    onCancel={closePreview}
                    enableImageZoom={true}
                    renderHeader={() => (
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closePreview}
                        >
                            <AntDesign name="close" size={28} color="white" />
                        </TouchableOpacity>
                    )}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemContent: {
        flex: 1,
    },
    certName: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 4,
    },
    issuer: {
        color: '#666',
        marginBottom: 4,
    },
    date: {
        color: '#888',
        fontSize: 12,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        marginLeft: 16,
        padding: 8,
    },
    imagesContainer: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 15,
    },
    thumbnail: {
        width: 70,
        height: 50,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    imageLabel: {
        fontSize: 10,
        color: '#888',
        textAlign: 'center',
        marginTop: 4,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 8,
    },
});

export default CertificationItem;