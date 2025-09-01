// screens/create-job/_ui/Step3Form.tsx
import { apiGet } from '@/api/baseApi';
import { apiUpdateJobStep3 } from '@/api/update';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { RequestForm } from '@/types/requests/form';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useKeyboard } from '@react-native-community/hooks';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useStep } from './ContextStep';

const Step3Form = () => {
    const [budget, setBudget] = useState('');
    const [durationHours, setDurationHours] = useState('');
    const [closedAt, setClosedAt] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempDate, setTempDate] = useState<Date | null>(null);
    const [errors, setErrors] = useState({
        budget: '',
        durationHours: '',
        closedAt: ''
    });

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'createJob'>>();
    const jobId = Number(route.params?.id);
    const { updateStep, prev } = useStep();

    useEffect(() => {
        if (jobId) {
            apiGet(`/jobs-step3/${jobId}`).then((res) => {
                const data = res.data as any;
                console.log(data);
                setBudget(data.budget ? formatCurrency(data.budget.toString()) : '');
                setDurationHours(data.durationHours ? data.durationHours.toString() : '');
                setClosedAt(data.closedAt ? parseCustomDate(data.closedAt) : null);
            });
        } else {
            navigation.goBack();
        }
    }, [jobId]);

    const parseCustomDate = (dateStr: string): Date => {
        const [datePart, timePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hour, min, sec] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hour, min, sec);
    };

    const formatCurrency = (value: string) => {
        const num = parseInt(value.replace(/\D/g, ''), 10);
        return isNaN(num) ? '' : num.toLocaleString('vi-VN');
    };

    const handleBudgetChange = (text: string) => {
        const formatted = formatCurrency(text);
        setBudget(formatted);
        validateField('budget', formatted);
    };

    const validateField = (field: string, value: string | Date | null) => {
        let newErrors = { ...errors };

        switch (field) {
            case 'budget':
                const budgetValue = parseInt(value?.toString().replace(/\D/g, '') || '0', 10);
                if (!budgetValue) {
                    newErrors.budget = 'Vui lòng nhập ngân sách';
                } else if (budgetValue < 10000 || budgetValue > 100000000) {
                    newErrors.budget = 'Ngân sách từ 10,000 đến 100,000,000 VNĐ';
                } else {
                    newErrors.budget = '';
                }
                break;

            case 'durationHours':
                const durationValue = parseInt(value?.toString() || '0', 10);
                if (!durationValue) {
                    newErrors.durationHours = 'Vui lòng nhập thời gian';
                } else if (durationValue < 1 || durationValue > 8760) {
                    newErrors.durationHours = 'Thời gian từ 1 đến 8760 giờ';
                } else {
                    newErrors.durationHours = '';
                }
                break;

            case 'closedAt':
                if (!value) {
                    newErrors.closedAt = 'Vui lòng chọn ngày đóng';
                } else {
                    const minDate = new Date();
                    minDate.setDate(minDate.getDate() + 3);
                    if (new Date(value) < minDate) {
                        newErrors.closedAt = 'Ngày đóng phải sau ít nhất 3 ngày';
                    } else {
                        newErrors.closedAt = '';
                    }
                }
                break;
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(e => e === '');
    };

    const onFinish = async () => {
        Keyboard.dismiss();

        const budgetValue = budget.replace(/\D/g, '');
        const isValidBudget = validateField('budget', budgetValue);
        const isValidDuration = validateField('durationHours', durationHours);
        const isValidDate = validateField('closedAt', closedAt);

        if (!isValidBudget || !isValidDuration || !isValidDate) {
            return;
        }

        dispatch(showSpin());
        const values: RequestForm.JobStep3 = {
            budget: parseInt(budgetValue, 10),
            durationHours: parseInt(durationHours, 10),
            closedAt: (closedAt as Date).toISOString()
        };

        try {
            await apiUpdateJobStep3({ id: jobId, data: values });
            dispatch(addMessage({
                key: "update-job",
                content: "Lưu thành công",
                type: "success",
            }));
            updateStep(true);
        } catch (error) {
            dispatch(addMessage({
                key: "update-job",
                content: "Lưu thất bại",
                type: "error",
            }));
        } finally {
            dispatch(hideSpin());
        }
    };

    // Hàm xử lý picker cho Android: Mở date trước, sau đó time, chain trực tiếp mà không dùng state
    const openAndroidPicker = () => {
        const initialDate = closedAt || new Date();
        const minDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

        DateTimePickerAndroid.open({
            value: initialDate,
            mode: 'date',
            minimumDate: minDate,
            onChange: (event, selectedDate) => {
                DateTimePickerAndroid.dismiss('date');
                if (event.type === 'set' && selectedDate) {
                    DateTimePickerAndroid.open({
                        value: selectedDate,
                        mode: 'time',
                        is24Hour: true,
                        onChange: (event2, selectedTime) => {
                            DateTimePickerAndroid.dismiss('time');
                            if (event2.type === 'set' && selectedTime) {
                                setClosedAt(selectedTime);
                                validateField('closedAt', selectedTime);
                            }
                        },
                    });
                }
            },
        });
    };

    // Hàm xử lý chung cho cả 2 nền tảng
    const handleOpenPicker = () => {
        if (Platform.OS === 'android') {
            openAndroidPicker();
        } else {
            setShowDatePicker(true);
            setTempDate(closedAt || new Date());
        }
    };

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            setTempDate(date);
        }
    };

    const confirmDateSelection = () => {
        if (tempDate) {
            setClosedAt(tempDate);
            validateField('closedAt', tempDate);
        }
        setShowDatePicker(false);
    };

    const cancelDateSelection = () => {
        setShowDatePicker(false);
        setTempDate(null);
    };

    const keyboard = useKeyboard();

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
                {/* Budget Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ngân sách (VNĐ)</Text>
                    <View style={[styles.inputContainer, errors.budget ? styles.inputError : null]}>
                        <MaterialIcons name="attach-money" size={24} color="#3498db" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            value={budget}
                            onChangeText={handleBudgetChange}
                            placeholder="0"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            returnKeyType="done"
                        />
                        <Text style={styles.currencySymbol}>₫</Text>
                    </View>
                    {errors.budget ? <Text style={styles.errorText}>{errors.budget}</Text> : null}
                </View>

                {/* Duration Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Thời gian làm việc (giờ)</Text>
                    <View style={[styles.inputContainer, errors.durationHours ? styles.inputError : null]}>
                        <MaterialIcons name="access-time" size={24} color="#3498db" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            value={durationHours}
                            onChangeText={(text) => {
                                setDurationHours(text);
                                validateField('durationHours', text);
                            }}
                            placeholder="Số giờ"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            returnKeyType="done"
                        />
                    </View>
                    {errors.durationHours ? <Text style={styles.errorText}>{errors.durationHours}</Text> : null}
                </View>

                {/* Date Picker */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ngày đóng</Text>
                    <TouchableOpacity
                        style={[styles.dateContainer, errors.closedAt ? styles.inputError : null]}
                        onPress={handleOpenPicker}
                        activeOpacity={0.8}
                    >
                        <MaterialIcons name="event" size={24} color="#3498db" style={styles.icon} />
                        <Text style={closedAt ? styles.dateText : styles.placeholderText}>
                            {closedAt
                                ? closedAt.toLocaleDateString('vi-VN') + ' ' + closedAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                                : 'Chọn ngày đóng'}
                        </Text>
                    </TouchableOpacity>
                    {errors.closedAt ? <Text style={styles.errorText}>{errors.closedAt}</Text> : null}
                </View>

                {/* Chỉ hiển thị DateTimePicker cho iOS */}
                {showDatePicker && Platform.OS === 'ios' && (
                    <View>
                        <DateTimePicker
                            value={tempDate || closedAt || new Date()}
                            mode="datetime"
                            display="spinner"
                            minimumDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
                            onChange={handleDateChange}
                            accentColor="#3498db"
                        />

                        <View style={styles.iosDatePickerFooter}>
                            <TouchableOpacity
                                style={styles.iosCancelButton}
                                onPress={cancelDateSelection}
                            >
                                <Text style={styles.iosButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iosConfirmButton}
                                onPress={confirmDateSelection}
                            >
                                <Text style={styles.iosButtonText}>Xong</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Footer */}
            <Animated.View style={[styles.footer, { paddingBottom: keyboard.keyboardShown ? 30 : 16 }]}>
                <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={prev}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={20} color="#3498db" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.nextButton]}
                    onPress={onFinish}
                    activeOpacity={0.7}
                >
                    <Text style={styles.nextButtonText}>Tiếp tục</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 24,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#34495e',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    icon: {
        marginHorizontal: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        paddingVertical: 0,
        height: '100%',
    },
    currencySymbol: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3498db',
        marginHorizontal: 16,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    dateText: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
    },
    placeholderText: {
        flex: 1,
        fontSize: 16,
        color: '#95a5a6',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 13,
        marginTop: 6,
        marginLeft: 4,
    },
    inputError: {
        borderColor: '#e74c3c',
        borderWidth: 1.5,
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
        gap: 32
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
    },
    backButtonText: {
        color: '#3498db',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    nextButton: {
        backgroundColor: '#3498db',
        flex: 1,
        maxWidth: '70%',
        marginLeft: 16,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    iosDatePickerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    iosCancelButton: {
        padding: 10,
    },
    iosConfirmButton: {
        padding: 10,
    },
    iosButtonText: {
        color: '#3498db',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default Step3Form;