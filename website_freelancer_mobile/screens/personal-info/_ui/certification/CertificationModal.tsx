import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Keyboard,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import ImageActionPanel from './ImageActionPanel';
import { Certification } from './types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CertificationModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    loading: boolean;
    editingCert: Certification | null;
    frontImage?: string;
    backImage?: string;
    onImageChange: (file: any, isFront: boolean) => void;
    onRemoveImage: (isFront: boolean) => void;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const CertificationModal = ({
    visible,
    onOk,
    onCancel,
    loading,
    editingCert,
    frontImage,
    backImage,
    onImageChange,
    onRemoveImage,
    formData,
    setFormData,
}: CertificationModalProps) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showDatePicker, setShowDatePicker] = useState<'issueDate' | 'expiryDate' | null>(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const containerRef = useRef<View>(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name) newErrors.name = 'Vui lòng nhập tên chứng chỉ';
        if (!formData.issueBy) newErrors.issueBy = 'Vui lòng nhập tổ chức cấp';
        if (!formData.issueDate) newErrors.issueDate = 'Vui lòng nhập ngày cấp';

        const formatValid = (dateStr: string) =>
            dayjs(dateStr, 'DD/MM/YYYY', true).isValid();

        if (formData.issueDate && !formatValid(formData.issueDate)) {
            newErrors.issueDate = 'Ngày cấp không hợp lệ';
        }
        if (formData.expiryDate && !formatValid(formData.expiryDate)) {
            newErrors.expiryDate = 'Ngày hết hạn không hợp lệ';
        }

        if (
            formatValid(formData.issueDate) &&
            formatValid(formData.expiryDate) &&
            dayjs(formData.expiryDate, 'DD/MM/YYYY').isBefore(dayjs(formData.issueDate, 'DD/MM/YYYY'))
        ) {
            newErrors.expiryDate = 'Ngày hết hạn phải sau ngày cấp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onOk();
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(null);
        if (selectedDate && showDatePicker) {
            const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY');
            handleChange(showDatePicker, formattedDate);
        }
    };

    const openDatePicker = (field: 'issueDate' | 'expiryDate') => {
        Keyboard.dismiss();
        setShowDatePicker(field);
    };

    const handleLayout = () => {
        containerRef.current?.measure((x, y, width, height) => {
            setContainerHeight(height);
        });
    };

    // Tính toán chiều cao cho container
    const getContainerStyle = () => {
        if (keyboardHeight === 0) {
            return {
                height: SCREEN_HEIGHT * 0.85,
                maxHeight: SCREEN_HEIGHT * 0.85,
            };
        }

        // Tính toán không gian còn lại sau khi trừ bàn phím
        const availableHeight = SCREEN_HEIGHT - keyboardHeight - 50;

        return {
            height: Math.min(availableHeight, SCREEN_HEIGHT * 0.85),
            maxHeight: Math.min(availableHeight, SCREEN_HEIGHT * 0.85),
        };
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalOverlay}>
                    <View
                        ref={containerRef}
                        style={[
                            styles.modalContainer,
                            getContainerStyle()
                        ]}
                        onLayout={handleLayout}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {editingCert ? 'Chỉnh sửa chứng chỉ' : 'Thêm chứng chỉ'}
                            </Text>
                        </View>

                        <ScrollView
                            style={styles.modalBody}
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Tên chứng chỉ</Text>
                                <TextInput
                                    style={[styles.input, errors.name && styles.inputError]}
                                    value={formData.name}
                                    onChangeText={v => handleChange('name', v)}
                                    placeholder="Nhập tên chứng chỉ"
                                    placeholderTextColor="#9ca3af"
                                    returnKeyType="next"
                                />
                                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Tổ chức cấp</Text>
                                <TextInput
                                    style={[styles.input, errors.issueBy && styles.inputError]}
                                    value={formData.issueBy}
                                    onChangeText={v => handleChange('issueBy', v)}
                                    placeholder="Nhập tổ chức cấp"
                                    placeholderTextColor="#9ca3af"
                                    returnKeyType="next"
                                />
                                {errors.issueBy && <Text style={styles.errorText}>{errors.issueBy}</Text>}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Ngày cấp</Text>
                                <TouchableOpacity
                                    style={[styles.input, styles.dateInput, errors.issueDate && styles.inputError]}
                                    onPress={() => openDatePicker('issueDate')}
                                >
                                    <Text style={formData.issueDate ? styles.dateText : styles.placeholderText}>
                                        {formData.issueDate || 'DD/MM/YYYY'}
                                    </Text>
                                </TouchableOpacity>
                                {errors.issueDate && <Text style={styles.errorText}>{errors.issueDate}</Text>}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Ngày hết hạn (nếu có)</Text>
                                <TouchableOpacity
                                    style={[styles.input, styles.dateInput, errors.expiryDate && styles.inputError]}
                                    onPress={() => openDatePicker('expiryDate')}
                                >
                                    <Text style={formData.expiryDate ? styles.dateText : styles.placeholderText}>
                                        {formData.expiryDate || 'DD/MM/YYYY'}
                                    </Text>
                                </TouchableOpacity>
                                {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Liên kết (nếu có)</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.link}
                                    onChangeText={v => handleChange('link', v)}
                                    placeholder="https://..."
                                    placeholderTextColor="#9ca3af"
                                    keyboardType="url"
                                    returnKeyType="done"
                                />
                            </View>

                            <ImageActionPanel
                                label="Mặt trước chứng chỉ"
                                imageUrl={frontImage}
                                onChange={(file) => onImageChange(file, true)}
                                onRemove={() => onRemoveImage(true)}
                            />

                            <ImageActionPanel
                                label="Mặt sau chứng chỉ"
                                imageUrl={backImage}
                                onChange={(file) => onImageChange(file, false)}
                                onRemove={() => onRemoveImage(false)}
                            />
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={onCancel}
                                disabled={loading}
                            >
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.submitButton, loading && styles.disabledButton]}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.submitButtonText}>
                                        {editingCert ? "Cập nhật" : "Thêm"}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            {showDatePicker && (
                <DateTimePicker
                    value={formData[showDatePicker] ? dayjs(formData[showDatePicker], 'DD/MM/YYYY').toDate() : new Date()}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                />
            )}
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 5,
    },
    modalHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    modalBody: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        backgroundColor: '#fff',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
        fontWeight: '500',
        color: '#374151',
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#1f2937',
    },
    dateInput: {
        justifyContent: 'center',
    },
    dateText: {
        color: '#1f2937',
        fontSize: 16,
    },
    placeholderText: {
        color: '#9ca3af',
        fontSize: 16,
    },
    inputError: {
        borderColor: '#ef4444',
    },
    errorText: {
        color: '#ef4444',
        marginTop: 6,
        fontSize: 12,
    },
    button: {
        flex: 1,
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    cancelButton: {
        backgroundColor: '#f9fafb',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    submitButton: {
        backgroundColor: '#3b82f6',
        marginLeft: 12,
    },
    disabledButton: {
        backgroundColor: '#93c5fd',
    },
    cancelButtonText: {
        color: '#4b5563',
        fontWeight: '600',
        fontSize: 16,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default CertificationModal;