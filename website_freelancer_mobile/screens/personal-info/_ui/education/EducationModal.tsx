import { MaterialIcons } from '@expo/vector-icons';
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
import { Education } from './types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface EducationModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    loading: boolean;
    editingEdu: Education | null;
    formData: Education;
    setFormData: React.Dispatch<React.SetStateAction<Education>>;
}

const EducationModal = ({
    visible,
    onOk,
    onCancel,
    loading,
    editingEdu,
    formData,
    setFormData
}: EducationModalProps) => {
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const containerRef = useRef<View>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const inputRefs = useRef<{ [key: string]: TextInput | null }>({});

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
        const today = dayjs();

        if (!formData.degree) newErrors.degree = 'Vui lòng nhập bằng cấp';
        if (!formData.schoolName) newErrors.schoolName = 'Vui lòng nhập tên trường';
        if (!formData.major) newErrors.major = 'Vui lòng nhập chuyên ngành';

        if (!formData.startDate) {
            newErrors.startDate = 'Vui lòng chọn ngày bắt đầu';
        } else {
            const startDate = dayjs(formData.startDate);
            if (startDate.isAfter(today)) {
                newErrors.startDate = 'Ngày bắt đầu không thể ở tương lai';
            }
        }

        if (formData.endDate) {
            const endDate = dayjs(formData.endDate);
            const startDate = dayjs(formData.startDate);

            if (endDate.isBefore(startDate)) {
                newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onOk();
        }
    };

    const handleChange = (field: keyof Education, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'Chưa tốt nghiệp';
        return dayjs(dateString).format('DD/MM/YYYY');
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
        const availableHeight = SCREEN_HEIGHT - keyboardHeight;

        return {
            height: Math.min(availableHeight, SCREEN_HEIGHT * 0.85),
            maxHeight: Math.min(availableHeight, SCREEN_HEIGHT * 0.85),
        };
    };

    // Tự động cuộn khi trường được focus (cách mới)
    const handleInputFocus = (field: string) => {
        setTimeout(() => {
            inputRefs.current[field]?.measureLayout(
                containerRef.current as any,
                (x, y) => {
                    scrollViewRef.current?.scrollTo({ y: y - 100, animated: true });
                },
                () => { } // error callback
            );
        }, 300);
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
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {editingEdu ? "Chỉnh sửa học vấn" : "Thêm học vấn"}
                            </Text>
                        </View>

                        <ScrollView
                            ref={scrollViewRef}
                            style={styles.modalBody}
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Bằng cấp *</Text>
                                <TextInput
                                    ref={ref => { inputRefs.current.degree = ref }}
                                    style={[styles.input, errors.degree && styles.inputError]}
                                    placeholder="Ví dụ: Cử nhân Khoa học Máy tính"
                                    value={formData.degree}
                                    onChangeText={(text) => handleChange('degree', text)}
                                    onFocus={() => handleInputFocus('degree')}
                                />
                                {errors.degree && <Text style={styles.errorText}>{errors.degree}</Text>}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Trường/Đại học *</Text>
                                <TextInput
                                    ref={ref => { inputRefs.current.schoolName = ref }}
                                    style={[styles.input, errors.schoolName && styles.inputError]}
                                    placeholder="Ví dụ: Đại học Bách Khoa Hà Nội"
                                    value={formData.schoolName}
                                    onChangeText={(text) => handleChange('schoolName', text)}
                                    onFocus={() => handleInputFocus('schoolName')}
                                />
                                {errors.schoolName && <Text style={styles.errorText}>{errors.schoolName}</Text>}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Chuyên ngành *</Text>
                                <TextInput
                                    ref={ref => { inputRefs.current.major = ref }}
                                    style={[styles.input, errors.major && styles.inputError]}
                                    placeholder="Ví dụ: Công nghệ thông tin"
                                    value={formData.major}
                                    onChangeText={(text) => handleChange('major', text)}
                                    onFocus={() => handleInputFocus('major')}
                                />
                                {errors.major && <Text style={styles.errorText}>{errors.major}</Text>}
                            </View>

                            <View style={styles.dateRow}>
                                <View style={styles.dateColumn}>
                                    <Text style={styles.label}>Ngày bắt đầu *</Text>
                                    <TouchableOpacity
                                        style={[styles.dateInput, errors.startDate && styles.inputError]}
                                        onPress={() => {
                                            Keyboard.dismiss();
                                            setShowStartDatePicker(true);
                                        }}
                                    >
                                        <Text style={styles.dateText}>
                                            {formData.startDate ? formatDate(formData.startDate) : 'Chọn ngày'}
                                        </Text>
                                        <MaterialIcons name="edit" size={18} color="#4B5563" />
                                    </TouchableOpacity>
                                    {errors.startDate && <Text style={styles.errorText}>{errors.startDate}</Text>}
                                </View>

                                <View style={styles.dateColumn}>
                                    <Text style={styles.label}>Ngày kết thúc</Text>
                                    <TouchableOpacity
                                        style={[styles.dateInput, errors.endDate && styles.inputError]}
                                        onPress={() => {
                                            Keyboard.dismiss();
                                            setShowEndDatePicker(true);
                                        }}
                                    >
                                        <Text style={styles.dateText}>
                                            {formatDate(formData.endDate)}
                                        </Text>
                                        <MaterialIcons name="edit" size={18} color="#4B5563" />
                                    </TouchableOpacity>
                                    {errors.endDate && <Text style={styles.errorText}>{errors.endDate}</Text>}
                                </View>
                            </View>

                            {showStartDatePicker && (
                                <DateTimePicker
                                    value={formData.startDate ? new Date(formData.startDate) : new Date()}
                                    mode="date"
                                    display="spinner"
                                    onChange={(event, date) => {
                                        setShowStartDatePicker(false);
                                        if (date) {
                                            handleChange('startDate', date.toISOString());
                                        }
                                    }}
                                />
                            )}

                            {showEndDatePicker && (
                                <DateTimePicker
                                    value={formData.endDate ? new Date(formData.endDate) : new Date()}
                                    mode="date"
                                    display="spinner"
                                    onChange={(event, date) => {
                                        setShowEndDatePicker(false);
                                        if (date) {
                                            handleChange('endDate', date.toISOString());
                                        } else {
                                            handleChange('endDate', null);
                                        }
                                    }}
                                />
                            )}

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Điểm trung bình (GPA)</Text>
                                <TextInput
                                    ref={ref => { inputRefs.current.gpa = ref }}
                                    style={styles.input}
                                    placeholder="0.00 - 10.00"
                                    keyboardType="numeric"
                                    value={formData.gpa?.toString() || ''}
                                    onChangeText={(text) => {
                                        const value = parseFloat(text);
                                        handleChange('gpa', isNaN(value) ? undefined : value);
                                    }}
                                    onFocus={() => handleInputFocus('gpa')}
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Mô tả chi tiết</Text>
                                <TextInput
                                    ref={ref => { inputRefs.current.description = ref }}
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Mô tả thành tích, dự án, nghiên cứu liên quan..."
                                    multiline
                                    numberOfLines={4}
                                    value={formData.description}
                                    onChangeText={(text) => handleChange('description', text)}
                                    onFocus={() => handleInputFocus('description')}
                                />
                            </View>
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
                                style={[styles.button, styles.submitButton]}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.submitButtonText}>
                                        {editingEdu ? "Cập nhật" : "Thêm"}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
    inputError: {
        borderColor: '#ef4444',
    },
    errorText: {
        color: '#ef4444',
        marginTop: 6,
        fontSize: 12,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dateColumn: {
        width: '48%',
    },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 14,
        backgroundColor: '#fff',
    },
    dateText: {
        color: '#1f2937',
        fontSize: 16,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
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

export default EducationModal;