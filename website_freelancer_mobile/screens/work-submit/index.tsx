import { apiPost } from '@/api/baseApi';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { DocumentPickerAsset } from 'expo-document-picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';


export default function WorkSubmissionPage() {
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<DocumentPickerAsset | null>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'workSubmit'>>();
    const dispatch = useDispatch<AppDispatch>();

    const id = route.params?.id;
    const milestoneId = route.params?.milestoneId;

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            if (!result.canceled && result.assets.length > 0) {
                setFile(result.assets[0]); // Lấy file đầu tiên
            }
        } catch (err) {
            console.error('Document picker error:', err);
        }
    };


    const handleSubmit = async () => {
        if (!file) {
            Alert.alert('Lỗi', 'Vui lòng chọn file');
            return;
        }

        dispatch(showSpin({
            size: 'large',
            preventLeave: true,
            percent: 'auto',
            sizeFile: file.size ? file.size / 1024 / 1024 : 0,
        }));

        try {
            setLoading(true);
            const now = new Date();
            const pad = (n: number) => n.toString().padStart(2, "0");
            const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

            const fileName = encodeURIComponent(`${timestamp}_${file.name}`);
            const { data: presignedUrl } = await apiPost<string>(`/api/files/presigned-upload`, { fileName });

            // ✅ Lấy blob từ file.uri
            const fileResponse = await fetch(file.uri);
            const blob = await fileResponse.blob();

            const uploadRes = await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": file.mimeType || "application/octet-stream",
                    "x-amz-acl": "public-read"
                },
                body: blob,
            });

            if (!uploadRes.ok) throw new Error("Upload thất bại");

            const fileUrl = presignedUrl.split("?")[0];
            await apiPost(`jobs/${id}/milestone/${milestoneId}/submit-product`, {
                fileUrl,
                description
            });

            dispatch(addMessage({
                key: "submit-product",
                content: "Nộp sản phẩm thành công!",
                type: "success",
            }));

            setFile(null);
            setDescription('');
        } catch (err) {
            console.error(err);
            dispatch(addMessage({
                key: "submit-product",
                content: "Nộp sản phẩm thất bại!",
                type: "error",
            }));
        } finally {
            setLoading(false);
            dispatch(hideSpin());
        }
    };

    if (loading) {
        return (
            <View style={styles.skeletonContainer}>
                <ActivityIndicator size="large" color="#3f51b5" />
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <Card style={styles.card}>
                <View style={styles.header}>
                    <MaterialIcons name="cloud-upload" size={40} color="#3f51b5" />
                    <Text style={styles.title}>Nộp sản phẩm cho giai đoạn hiện tại</Text>
                    <Text style={styles.subtitle}>Vui lòng kiểm tra kỹ thông tin trước khi nộp</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <MaterialIcons name="description" size={24} color="#3f51b5" />
                        <Text style={styles.sectionTitle}>Nội dung nộp</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Tải lên sản phẩm</Text>
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={pickDocument}
                            disabled={loading}
                        >
                            <MaterialIcons name="attach-file" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Chọn file</Text>
                        </TouchableOpacity>
                        {file && (
                            <Text style={styles.fileName} numberOfLines={1}>
                                {file.name}
                            </Text>
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Mô tả sản phẩm</Text>
                        <TextInput
                            style={styles.textArea}
                            multiline
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Mô tả chi tiết về sản phẩm của bạn..."
                        />
                    </View>
                </View>

                <View style={styles.alertBox}>
                    <Text style={styles.alertTitle}>Hướng dẫn nộp sản phẩm</Text>
                    <Text style={styles.alertText}>
                        Bạn có thể nộp sản phẩm nhiều lần, mỗi lần chỉ chọn một file duy nhất kèm mô tả.
                        Vui lòng kiểm tra kỹ nội dung trước khi gửi để đảm bảo thông tin chính xác và đầy đủ.
                        {"\n\n"}
                        <Text style={{ fontWeight: 'bold' }}>Lưu ý:</Text> Sản phẩm đã nộp sẽ được ghi nhận và không thể thu hồi hoặc chỉnh sửa.
                    </Text>
                </View>

                <View style={styles.buttonGroup}>
                    <Button
                        title="Nộp sản phẩm"
                        onPress={handleSubmit}
                        color="#3f51b5"
                        disabled={loading || !file}
                    />
                    <Button
                        title="Quay lại"
                        onPress={() => navigation.goBack()}
                        color="#757575"
                    />
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#e3f2fd',
        paddingBottom: 40
    },
    skeletonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderRadius: 8,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a237e',
        marginTop: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#546e7a',
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a237e',
        marginLeft: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#b0bec5',
        marginVertical: 8,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#37474f',
        marginBottom: 8,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3f51b5',
        padding: 12,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    fileName: {
        marginTop: 8,
        color: '#546e7a',
        fontStyle: 'italic',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#b0bec5',
        borderRadius: 4,
        padding: 12,
        textAlignVertical: 'top',
        minHeight: 100,
        backgroundColor: '#f5f5f5',
    },
    alertBox: {
        backgroundColor: '#e1f5fe',
        borderLeftWidth: 4,
        borderLeftColor: '#0288d1',
        padding: 16,
        marginBottom: 24,
        borderRadius: 4,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#01579b',
        marginBottom: 8,
    },
    alertText: {
        color: '#0277bd',
        lineHeight: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
});