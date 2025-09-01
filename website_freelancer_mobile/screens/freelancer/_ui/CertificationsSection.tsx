// screens/freelancer/_ui/CertificationsSection.tsx
import { ResponseDetail } from '@/types/respones/detail';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CertificationsSectionProps {
    data: ResponseDetail.Freelancer;
}

export default function CertificationsSection({ data }: CertificationsSectionProps) {
    const certifications = data.certifications;

    const formatDate = (dateString: string) => {
        return dateString ? new Date(dateString.split('/').reverse().join('-')).toLocaleDateString('vi-VN') : 'Không xác định';
    };

    const isExpired = (expiryDate: string) => {
        if (!expiryDate) return false;
        const today = new Date();
        const expiry = new Date(expiryDate.split('/').reverse().join('-'));
        return today > expiry;
    };

    const handleOpenLink = (url: string) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) Linking.openURL(url);
        });
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="school" size={22} color="#4361EE" />
                </View>
                <Text style={styles.headerText}>Chứng chỉ ({certifications.length})</Text>
            </View>

            {certifications.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <MaterialIcons name="folder-off" size={28} color="#95a5a6" />
                    <Text style={styles.emptyText}>Chưa có chứng chỉ nào</Text>
                </View>
            ) : (
                <View style={styles.certContainer}>
                    {certifications.map((cert, index) => (
                        <View key={index} style={styles.certItem}>
                            <View style={styles.certHeader}>
                                <Text style={styles.certName} numberOfLines={2}>{cert.name}</Text>
                                <View style={[
                                    styles.statusBadge,
                                    cert.status === 'ACTIVE' ? styles.activeBadge : styles.expiredBadge
                                ]}>
                                    <Text style={styles.statusText}>
                                        {cert.status === 'ACTIVE' ? 'Còn hiệu lực' : 'Đã hết hạn'}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.certDetails}>
                                <DetailRow
                                    icon="business"
                                    label="Tổ chức cấp:"
                                    value={cert.issueBy || 'Không xác định'}
                                />

                                <DetailRow
                                    icon="event-available"
                                    label="Ngày cấp:"
                                    value={formatDate(cert.issueDate)}
                                />

                                <DetailRow
                                    icon="event-busy"
                                    label="Ngày hết hạn:"
                                    value={formatDate(cert.expiryDate)}
                                    isError={isExpired(cert.expiryDate)}
                                />
                            </View>

                            {cert.link && (
                                <TouchableOpacity
                                    style={styles.linkContainer}
                                    onPress={() => handleOpenLink(cert.link)}
                                    activeOpacity={0.7}
                                >
                                    <MaterialIcons name="link" size={20} color="#3498db" />
                                    <Text style={styles.linkText}>Xem chứng chỉ online</Text>
                                </TouchableOpacity>
                            )}

                            {(cert.frontImage || cert.backImage) && (
                                <View style={styles.certImages}>
                                    <Text style={styles.imagesTitle}>Hình ảnh chứng chỉ:</Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.imagesContainer}
                                    >
                                        {cert.frontImage && (
                                            <Image
                                                source={{ uri: cert.frontImage }}
                                                style={styles.certImage}
                                                resizeMode="cover"
                                            />
                                        )}
                                        {cert.backImage && (
                                            <Image
                                                source={{ uri: cert.backImage }}
                                                style={styles.certImage}
                                                resizeMode="cover"
                                            />
                                        )}
                                    </ScrollView>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const DetailRow = ({ icon, label, value, isError = false }: any) => (
    <View style={styles.detailRow}>
        <MaterialIcons name={icon} size={18} color="#7f8c8d" style={styles.detailIcon} />
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[styles.detailValue, isError && styles.errorText]} numberOfLines={1}>
            {value}
            {isError && <Text style={styles.expiredTag}> (Hết hạn)</Text>}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EBF0FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
    },
    certContainer: {
        marginTop: 8,
    },
    certItem: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    certHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    certName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginRight: 10,
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    activeBadge: {
        backgroundColor: '#27ae60',
    },
    expiredBadge: {
        backgroundColor: '#e74c3c',
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    certDetails: {
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailIcon: {
        width: 24,
    },
    detailLabel: {
        width: 100,
        fontWeight: '500',
        color: '#555',
        marginRight: 8,
    },
    detailValue: {
        flex: 1,
        color: '#333',
    },
    errorText: {
        color: '#e74c3c',
    },
    expiredTag: {
        fontSize: 12,
        fontWeight: '500',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
        marginBottom: 12,
    },
    linkText: {
        color: '#2980b9',
        fontWeight: '500',
        marginLeft: 8,
    },
    certImages: {
        marginTop: 4,
    },
    imagesTitle: {
        fontWeight: '500',
        marginBottom: 8,
        color: '#555',
    },
    imagesContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    certImage: {
        width: 140,
        height: 100,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    emptyText: {
        textAlign: 'center',
        color: '#95a5a6',
        marginTop: 8,
        fontSize: 15,
    },
});