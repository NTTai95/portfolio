import { apiGet } from '@/api/baseApi';
import { EndPoint } from '@/api/endpoint';
import { apiUpdateJobStep2 } from '@/api/update';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { RequestForm } from '@/types/requests/form';
import { Ionicons } from '@expo/vector-icons';
import { useKeyboard } from '@react-native-community/hooks';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useStep } from './ContextStep';

const Step2Form = () => {
    const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
    const [skills, setSkills] = useState<any[]>([]);
    const [languages, setLanguages] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState<'skills' | 'languages' | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef<ScrollView>(null);

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'createJob'>>();
    const jobId = Number(route.params?.id);
    const { updateStep, prev } = useStep();
    const keyboard = useKeyboard();

    useEffect(() => {
        apiGet(EndPoint.List.SKILL).then((res) => setSkills(res.data as any[]));
        apiGet(EndPoint.List.LANGUAGE).then((res) => setLanguages(res.data as any[]));

        if (jobId) {
            apiGet(`/jobs-step2/${jobId}`).then((res) => {
                const data = res.data as any;
                setSelectedSkills(data.skillIds || []);
                setSelectedLanguages(data.languageIds || []);
            });
        } else {
            navigation.goBack();
        }
    }, [jobId]);

    const toggleSkill = (id: number) => {
        if (selectedSkills.includes(id)) {
            setSelectedSkills(selectedSkills.filter(skillId => skillId !== id));
        } else {
            if (selectedSkills.length < 10) {
                setSelectedSkills([...selectedSkills, id]);
            } else {
                Alert.alert('Thông báo', 'Chỉ được chọn tối đa 10 kỹ năng');
            }
        }
    };

    const toggleLanguage = (id: number) => {
        if (selectedLanguages.includes(id)) {
            setSelectedLanguages(selectedLanguages.filter(langId => langId !== id));
        } else {
            if (selectedLanguages.length < 5) {
                setSelectedLanguages([...selectedLanguages, id]);
            } else {
                Alert.alert('Thông báo', 'Chỉ được chọn tối đa 5 ngôn ngữ');
            }
        }
    };

    const removeSkill = (id: number) => {
        setSelectedSkills(selectedSkills.filter(skillId => skillId !== id));
    };

    const removeLanguage = (id: number) => {
        setSelectedLanguages(selectedLanguages.filter(langId => langId !== id));
    };

    const openModal = (type: 'skills' | 'languages') => {
        setModalVisible(type);
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
        ]).start(() => setModalVisible(null));
    };

    const onFinish = async () => {
        if (selectedSkills.length === 0 || selectedLanguages.length === 0) {
            Alert.alert('Lỗi', 'Vui lòng chọn ít nhất một kỹ năng và một ngôn ngữ');
            return;
        }

        dispatch(showSpin());
        const values: RequestForm.JobStep2 = {
            skillIds: selectedSkills,
            languageIds: selectedLanguages
        };

        try {
            await apiUpdateJobStep2({ id: jobId, data: values });
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

    const isButtonDisabled = selectedSkills.length === 0 || selectedLanguages.length === 0;
    const selectedSkillItems = skills.filter(s => selectedSkills.includes(s.id));
    const selectedLanguageItems = languages.filter(l => selectedLanguages.includes(l.id));

    const renderModalContent = () => {
        if (modalVisible === 'skills') {
            return (
                <>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Chọn kỹ năng</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <Ionicons name="close" size={24} color="#7f8c8d" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.modalSubtitle}>Chọn tối đa 10 kỹ năng</Text>
                    <View style={styles.modalCounter}>
                        <Text style={styles.counterText}>
                            {selectedSkills.length}/10 kỹ năng đã chọn
                        </Text>
                    </View>
                    <ScrollView style={styles.modalScroll}>
                        {skills.map(skill => (
                            <Pressable
                                key={skill.id}
                                style={({ pressed }: { pressed: boolean }) => [
                                    styles.modalItem,
                                    selectedSkills.includes(skill.id) && styles.selectedModalItem,
                                    pressed && styles.itemPressed
                                ]}
                                onPress={() => toggleSkill(skill.id)}
                            >
                                <Text
                                    style={[
                                        styles.modalItemText,
                                        selectedSkills.includes(skill.id) && styles.selectedModalItemText
                                    ]}
                                >
                                    {skill.name}
                                </Text>
                                {selectedSkills.includes(skill.id) && (
                                    <Ionicons
                                        name="checkmark"
                                        size={20}
                                        color="#3498db"
                                        style={styles.checkIcon}
                                    />
                                )}
                            </Pressable>
                        ))}
                    </ScrollView>
                </>
            );
        } else if (modalVisible === 'languages') {
            return (
                <>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Chọn ngôn ngữ</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <Ionicons name="close" size={24} color="#7f8c8d" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.modalSubtitle}>Chọn tối đa 5 ngôn ngữ</Text>
                    <View style={styles.modalCounter}>
                        <Text style={styles.counterText}>
                            {selectedLanguages.length}/5 ngôn ngữ đã chọn
                        </Text>
                    </View>
                    <ScrollView style={styles.modalScroll}>
                        {languages.map(language => (
                            <Pressable
                                key={language.id}
                                style={({ pressed }: { pressed: boolean }) => [
                                    styles.modalItem,
                                    selectedLanguages.includes(language.id) && styles.selectedModalItem,
                                    pressed && styles.itemPressed
                                ]}
                                onPress={() => toggleLanguage(language.id)}
                            >
                                <Text
                                    style={[
                                        styles.modalItemText,
                                        selectedLanguages.includes(language.id) && styles.selectedModalItemText
                                    ]}
                                >
                                    {language.name}
                                </Text>
                                {selectedLanguages.includes(language.id) && (
                                    <Ionicons
                                        name="checkmark"
                                        size={20}
                                        color="#3498db"
                                        style={styles.checkIcon}
                                    />
                                )}
                            </Pressable>
                        ))}
                    </ScrollView>
                </>
            );
        }
        return null;
    };

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
                    keyboard.keyboardShown && { paddingBottom: 120 }
                ]}
                keyboardShouldPersistTaps="handled"
                onContentSizeChange={() => scrollRef.current?.scrollTo({ y: 0 })}
            >
                {/* Kỹ năng Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>Kỹ năng yêu cầu</Text>
                    <Text style={styles.subLabel}>Chọn tối đa 10 kỹ năng</Text>

                    <TouchableOpacity
                        style={styles.selectorButton}
                        onPress={() => openModal('skills')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.selectorButtonText}>Chọn kỹ năng</Text>
                        <Ionicons name="chevron-down" size={20} color="#7f8c8d" />
                    </TouchableOpacity>

                    {selectedSkillItems.length > 0 && (
                        <View style={styles.selectedTagsContainer}>
                            {selectedSkillItems.map(skill => (
                                <View key={skill.id} style={styles.selectedTag}>
                                    <Text style={styles.selectedTagText}>{skill.name}</Text>
                                    <TouchableOpacity
                                        style={styles.removeTagButton}
                                        onPress={() => removeSkill(skill.id)}
                                    >
                                        <Ionicons name="close" size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Ngôn ngữ Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>Ngôn ngữ</Text>
                    <Text style={styles.subLabel}>Chọn tối đa 5 ngôn ngữ</Text>

                    <TouchableOpacity
                        style={styles.selectorButton}
                        onPress={() => openModal('languages')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.selectorButtonText}>Chọn ngôn ngữ</Text>
                        <Ionicons name="chevron-down" size={20} color="#7f8c8d" />
                    </TouchableOpacity>

                    {selectedLanguageItems.length > 0 && (
                        <View style={styles.selectedTagsContainer}>
                            {selectedLanguageItems.map(language => (
                                <View key={language.id} style={styles.selectedTag}>
                                    <Text style={styles.selectedTagText}>{language.name}</Text>
                                    <TouchableOpacity
                                        style={styles.removeTagButton}
                                        onPress={() => removeLanguage(language.id)}
                                    >
                                        <Ionicons name="close" size={16} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Footer với nút điều hướng */}
            <Animated.View style={[
                styles.footer,
                keyboard.keyboardShown && styles.footerKeyboardVisible
            ]}>
                <Pressable
                    style={({ pressed }: { pressed: boolean }) => [
                        styles.button,
                        styles.backButton,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={prev}
                >
                    <Ionicons name="arrow-back" size={20} color="#3498db" />
                </Pressable>

                <Pressable
                    style={({ pressed }: { pressed: boolean }) => [
                        styles.button,
                        styles.nextButton,
                        isButtonDisabled && styles.buttonDisabled,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={onFinish}
                    disabled={isButtonDisabled}
                >
                    <Text style={styles.nextButtonText}>Tiếp tục</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </Pressable>
            </Animated.View>

            {/* Modal chọn kỹ năng/ngôn ngữ */}
            <Modal
                visible={modalVisible !== null}
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
                                                outputRange: [500, 0]
                                            })
                                        }]
                                    }
                                ]}
                            >
                                {renderModalContent()}
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    scrollContainer: {
        paddingBottom: 40,
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
    section: {
        marginBottom: 24,
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#2c3e50',
        marginBottom: 6,
    },
    subLabel: {
        fontSize: 13,
        color: '#7f8c8d',
        marginBottom: 12,
    },
    selectorButton: {
        height: 50,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: 12,
    },
    selectorButtonText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    selectedTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    selectedTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3498db',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    selectedTagText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    removeTagButton: {
        marginLeft: 8,
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
    footerKeyboardVisible: {
        paddingBottom: 30,
    },
    button: {
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    buttonPressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
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
    },
    buttonDisabled: {
        backgroundColor: '#bdc3c7',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
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
        maxHeight: '85%',
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
    modalSubtitle: {
        fontSize: 14,
        color: '#7f8c8d',
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    modalCounter: {
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    counterText: {
        fontSize: 13,
        color: '#7f8c8d',
        textAlign: 'right',
    },
    modalScroll: {
        paddingHorizontal: 16,
    },
    modalItem: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemPressed: {
        backgroundColor: '#f0f0f0',
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
});

export default Step2Form;