// screens/create-job/_ui/Step4Form.tsx
import { apiGet } from '@/api/baseApi';
import { apiUpdateJobStep4 } from '@/api/update';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useKeyboard } from '@react-native-community/hooks';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useStep } from './ContextStep';

interface PickedFile {
    name: string;
    uri: string;
    type: string;
    size: number;
}

const Step4Form = () => {
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<PickedFile | null>(null);
    const [currentDocument, setCurrentDocument] = useState<{ url: string } | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'createJob'>>();
    const jobId = Number(route.params?.id);
    const { updateStep, prev } = useStep();
    const keyboard = useKeyboard();

    useEffect(() => {
        if (jobId) {
            apiGet(`/jobs-step4/${jobId}`).then((res) => {
                const data = res.data as any;
                setDescription(data.description || '');
                if (data.document) {
                    setCurrentDocument({ url: data.document });
                }
            });
        } else {
            navigation.goBack();
        }
    }, [jobId]);

    const pickDocument = async () => {
        try {
            const res: any = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true
            });

            if (res.type === 'cancel' || res.canceled) {
                return;
            }

            // Lấy file data từ assets nếu có
            const fileData = res.assets ? res.assets[0] : res;

            if (!fileData?.uri) {
                Alert.alert('Lỗi', 'Không thể lấy đường dẫn file');
                return;
            }

            if (fileData.size && fileData.size > 10 * 1024 * 1024) {
                Alert.alert('Lỗi', 'File phải nhỏ hơn 10MB');
                return;
            }

            setFile({
                name: fileData.name || '',
                uri: fileData.uri,
                type: fileData.mimeType || 'application/pdf',
                size: fileData.size || 0
            });
            setCurrentDocument(null);
        } catch (err) {
            console.log('DocumentPicker error:', err);
        }
    };

    const removeFile = () => {
        setFile(null);
        setCurrentDocument(null);
    };

    const onFinish = async (isPublic: boolean) => {
        Keyboard.dismiss();

        if (description.length < 100) {
            Alert.alert('Lỗi', 'Mô tả phải có ít nhất 100 ký tự');
            return;
        }

        dispatch(showSpin());

        try {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('isPublic', isPublic.toString());

            if (file) {
                formData.append('document', {
                    uri: file.uri,
                    name: file.name,
                    type: file.type
                } as any);
            }

            await apiUpdateJobStep4({ id: jobId, data: formData });

            dispatch(addMessage({
                key: "update-job",
                content: isPublic ? "Đăng thành công" : "Lưu thành công",
                type: "success",
            }));

            if (isPublic) {
                navigation.navigate('jobs');
            } else {
                updateStep(true);
            }
        } catch (error) {
            console.log("ERROR: ", error);
            dispatch(addMessage({
                key: "update-job",
                content: "Lưu thất bại",
                type: "error",
            }));
        } finally {
            dispatch(hideSpin());
        }
    };

    const extractFileName = (url: string) => {
        return url.substring(url.lastIndexOf('/') + 1);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 70}
        >
            <ScrollView
                contentContainerStyle={[{ paddingBottom: keyboard.keyboardShown ? 150 : 100 }]}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.label}>Mô tả công việc</Text>
                <TextInput
                    style={styles.descriptionInput}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Mô tả chi tiết công việc, yêu cầu, kỳ vọng..."
                    multiline
                    numberOfLines={8}
                />
                {description.length > 0 && description.length < 100 && (
                    <Text style={styles.errorText}>Tối thiểu 100 ký tự</Text>
                )}

                <Text style={[styles.label, { marginTop: 24 }]}>Tài liệu mô tả</Text>
                <Text style={styles.subLabel}>Hỗ trợ file PDF, kích thước tối đa 10MB</Text>

                <View style={styles.fileContainer}>
                    {file || currentDocument ? (
                        <View style={styles.fileCard}>
                            <MaterialIcons name="picture-as-pdf" size={36} color="#e74c3c" />
                            <View style={styles.fileInfo}>
                                <Text style={styles.fileName} numberOfLines={1}>
                                    {file ? file.name : extractFileName(currentDocument?.url || '')}
                                </Text>
                                {file && (
                                    <Text style={styles.fileSize}>
                                        {file.size
                                            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                                            : 'PDF File'}
                                    </Text>
                                )}
                            </View>
                            <TouchableOpacity onPress={removeFile} style={styles.deleteButton}>
                                <MaterialIcons name="delete" size={24} color="#e74c3c" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
                            <MaterialIcons name="cloud-upload" size={36} color="#1890ff" />
                            <Text style={styles.uploadText}>Chọn file PDF</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>

            {/* Fixed Footer */}
            <Animated.View style={[styles.footer, { paddingBottom: keyboard.keyboardShown ? 30 : 16 }]}>
                <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={prev}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={20} color="#3498db" />
                </TouchableOpacity>

                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={() => onFinish(false)}
                        disabled={description.length < 100}
                    >
                        <Text style={styles.saveButtonText}>Lưu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.postButton]}
                        onPress={() => onFinish(true)}
                        disabled={description.length < 100}
                    >
                        <Text style={styles.postButtonText}>Đăng</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#34495e',
        marginBottom: 10,
    },
    subLabel: {
        fontSize: 13,
        color: '#7f8c8d',
        marginBottom: 10,
    },
    descriptionInput: {
        minHeight: 150,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#2c3e50',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 13,
        marginTop: 6,
        marginLeft: 4,
    },
    fileContainer: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    uploadButton: {
        alignItems: 'center',
        padding: 20,
    },
    uploadText: {
        marginTop: 8,
        color: '#1890ff',
        fontSize: 16,
        fontWeight: '500',
    },
    fileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    fileInfo: {
        flex: 1,
        marginLeft: 12,
    },
    fileName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    fileSize: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    deleteButton: {
        padding: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 2,
        borderTopColor: '#ecf0f1',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16
    },
    button: {
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 24,
    },
    backButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#3498db',
        minWidth: 52,
    },
    actionButtons: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        gap: 16,
    },
    saveButton: {
        backgroundColor: '#e6f7ff',
        borderWidth: 1,
        borderColor: '#91d5ff',
        minWidth: 100,
    },
    saveButtonText: {
        color: '#1890ff',
        fontSize: 16,
        fontWeight: '600',
    },
    postButton: {
        backgroundColor: '#1890ff',
        minWidth: 100,
    },
    postButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Step4Form;