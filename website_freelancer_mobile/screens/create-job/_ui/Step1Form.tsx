import { apiGet } from '@/api/baseApi';
import { apiCreateJob } from '@/api/create';
import { apiListMajor } from '@/api/list';
import { apiUpdateJobStep1 } from '@/api/update';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { RequestForm } from '@/types/requests/form';
import { Ionicons } from '@expo/vector-icons';
import { useKeyboard } from '@react-native-community/hooks';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useStep } from './ContextStep';

const Step1Form = () => {
    const [title, setTitle] = useState('');
    const [majorId, setMajorId] = useState<number | null>(null);
    const [majors, setMajors] = useState<{ id: number; name: string }[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef<ScrollView>(null);

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'createJob'>>();
    const jobId = Number(route.params?.id);
    const { updateStep } = useStep();
    const keyboard = useKeyboard();

    useEffect(() => {
        if (jobId) {
            apiGet(`/jobs-step1/${jobId}`).then((res) => {
                const data = res.data as any;
                setTitle(data.title || '');
                setMajorId(data.majorId || null);
            });
        }

        apiListMajor().then((res) => {
            setMajors(res.data);
        });
    }, [jobId]);

    const onFinish = async () => {
        if (!title || !majorId) {
            Alert.alert('Thông tin còn thiếu', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        dispatch(showSpin());
        const values: RequestForm.JobStep1 = { title, majorId };

        try {
            if (jobId) {
                await apiUpdateJobStep1({ id: jobId, data: values });
                dispatch(addMessage({
                    key: "update-job",
                    content: "Lưu thành công",
                    type: "success",
                }));
                updateStep(true);
            } else {
                const res = await apiCreateJob(values);
                dispatch(addMessage({
                    key: "create-job",
                    content: "Tạo công việc thành công",
                    type: "success",
                }));
                navigation.navigate('createJob', { id: res.data });
            }
        } catch (error) {
            dispatch(addMessage({
                key: jobId ? "update-job" : "create-job",
                content: "Đã xảy ra lỗi, vui lòng thử lại",
                type: "error",
            }));
        } finally {
            dispatch(hideSpin());
        }
    };

    const isTitleValid = title.length >= 10 && title.length <= 200;
    const isButtonDisabled = !title || !majorId || !isTitleValid;

    const openModal = () => {
        setModalVisible(true);
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    const closeModal = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => setModalVisible(false));
    };

    const handleMajorSelect = (id: number) => {
        setMajorId(id);
        closeModal();
    };

    const selectedMajor = majors.find(m => m.id === majorId);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.select({ ios: 100, android: 90 })}
        >
            <ScrollView
                ref={scrollRef}
                contentContainerStyle={[
                    styles.scrollContainer,
                    keyboard.keyboardShown && { paddingBottom: 100 }
                ]}
                keyboardShouldPersistTaps="handled"
                onContentSizeChange={() => scrollRef.current?.scrollTo({ y: 0 })}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tiêu đề công việc</Text>
                    <View style={[
                        styles.inputWrapper,
                        isFocused && styles.inputFocused,
                        !isTitleValid && title.length > 0 && styles.inputError
                    ]}>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Nhập tiêu đề công việc"
                            placeholderTextColor="#a0a0a0"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            multiline
                            maxLength={200}
                        />
                        <View style={styles.charCounter}>
                            <Text style={[
                                styles.charCounterText,
                                !isTitleValid && title.length > 0 && { color: '#ff4d4f' }
                            ]}>
                                {title.length}/200
                            </Text>
                        </View>
                    </View>
                    {!isTitleValid && title.length > 0 && (
                        <Text style={styles.errorText}>
                            {title.length < 10
                                ? "Tiêu đề quá ngắn (tối thiểu 10 ký tự)"
                                : "Tiêu đề quá dài (tối đa 200 ký tự)"}
                        </Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Chuyên ngành</Text>
                    <TouchableOpacity
                        style={styles.dropdownSelector}
                        onPress={openModal}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.dropdownText,
                                !selectedMajor && styles.placeholderText
                            ]}
                            numberOfLines={1}
                        >
                            {selectedMajor ? selectedMajor.name : 'Chọn chuyên ngành'}
                        </Text>
                        <Ionicons
                            name="chevron-down"
                            size={20}
                            color="#7f8c8d"
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                        <TouchableWithoutFeedback>
                            <Animated.View
                                style={[
                                    styles.modalContent,
                                    {
                                        transform: [{
                                            translateY: slideAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [300, 0]
                                            })
                                        }]
                                    }
                                ]}
                            >
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Chọn chuyên ngành</Text>
                                    <TouchableOpacity onPress={closeModal}>
                                        <Ionicons name="close" size={24} color="#7f8c8d" />
                                    </TouchableOpacity>
                                </View>
                                <ScrollView style={styles.modalScroll}>
                                    {majors.map(major => (
                                        <TouchableOpacity
                                            key={major.id}
                                            style={[
                                                styles.modalItem,
                                                majorId === major.id && styles.selectedModalItem
                                            ]}
                                            onPress={() => handleMajorSelect(major.id)}
                                        >
                                            <Text
                                                style={[
                                                    styles.modalItemText,
                                                    majorId === major.id && styles.selectedModalItemText
                                                ]}
                                            >
                                                {major.name}
                                            </Text>
                                            {majorId === major.id && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={20}
                                                    color="#3498db"
                                                    style={styles.checkIcon}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>

            <Animated.View style={[
                styles.footer,
                keyboard.keyboardShown && styles.footerKeyboardVisible
            ]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        isButtonDisabled && styles.buttonDisabled,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={onFinish}
                    disabled={isButtonDisabled}
                >
                    <Text style={styles.buttonText}>Tiếp tục</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </Pressable>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#2c3e50',
        marginBottom: 10,
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    inputFocused: {
        borderColor: '#3498db',
        borderWidth: 1.5,
    },
    inputError: {
        borderColor: '#ff4d4f',
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#2c3e50',
        textAlignVertical: 'top',
    },
    charCounter: {
        position: 'absolute',
        bottom: -15,
        right: 5
    },
    charCounterText: {
        fontSize: 11,
        color: '#7f8c8d',
    },
    errorText: {
        color: '#ff4d4f',
        fontSize: 13,
        marginTop: 15,
        marginLeft: 4,
    },
    dropdownSelector: {
        height: 50,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    dropdownText: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        marginRight: 10,
    },
    placeholderText: {
        color: '#a0a0a0',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
        paddingBottom: 24,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
    },
    modalScroll: {
        paddingHorizontal: 16,
    },
    modalItem: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedModalItem: {
        backgroundColor: '#f8f9fa',
    },
    modalItemText: {
        fontSize: 16,
        color: '#2c3e50',
        flex: 1,
    },
    selectedModalItemText: {
        color: '#3498db',
        fontWeight: '500',
    },
    checkIcon: {
        marginLeft: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 2,
        borderTopColor: '#ecf0f1',
        padding: 10,
    },
    footerKeyboardVisible: {
        paddingBottom: 30,
    },
    button: {
        height: 52,
        backgroundColor: '#3498db',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonPressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
    },
    buttonDisabled: {
        backgroundColor: '#bdc3c7',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
});

export default Step1Form;