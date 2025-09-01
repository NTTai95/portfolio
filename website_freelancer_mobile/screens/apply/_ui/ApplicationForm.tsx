// screens/apply/_ui/ApplicationForm.tsx
import Button from '@/components/ui/Button';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const ApplicationForm = ({
    content,
    setContent,
    handleFillApply,
    handleSubmit
}: {
    content: string;
    setContent: (text: string) => void;
    handleFillApply: () => void;
    handleSubmit: () => void;
}) => {
    const [submitted, setSubmitted] = React.useState(false); // Thêm state theo dõi trạng thái submit
    const error = content.length < 100; // Kiểm tra lỗi validation

    // Hàm xử lý submit mới kiểm tra validation
    const handleSubmitWithValidation = () => {
        setSubmitted(true);
        if (!error) {
            handleSubmit();
        }
    };

    return (
        <View>
            <View style={styles.header}>
                <AntDesign name="infocirlceo" size={20} color="#2563eb" />
                <Text style={styles.title}>Nội dung ứng tuyển</Text>
            </View>

            <View style={styles.alertBox}>
                <Text style={styles.alertText}>
                    Hãy mô tả chi tiết về cách bạn sẽ thực hiện dự án này, kinh nghiệm liên quan và lý do bạn phù hợp.
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    value={content}
                    onChangeText={(text) => {
                        setSubmitted(false);
                        setContent(text);
                    }}
                    multiline
                    numberOfLines={8}
                    style={[
                        styles.textArea,
                        submitted && error && styles.inputError
                    ]}
                    placeholder="Viết nội dung ứng tuyển tại đây..."
                    placeholderTextColor="#94a3b8"
                />
                <View style={styles.progressContainer}>
                    <View style={[
                        styles.progressBar,
                        { width: `${Math.min(100, content.length / 100)}%` }
                    ]} />
                </View>
            </View>

            <View style={styles.validationContainer}>
                {submitted && error && (
                    <Text style={styles.errorText}>Nội dung phải có ít nhất 100 ký tự</Text>
                )}
                <Text style={[
                    styles.charCount,
                    content.length < 100 ? styles.charCountError : null
                ]}>
                    {content.length}/10000
                </Text>
            </View>

            <View style={styles.buttonGroup}>
                <Button
                    title="Hỗ trợ AI"
                    onPress={handleFillApply}
                    icon={<AntDesign name="rocket1" size={18} color="#2563eb" />}
                    style={styles.aiButton}
                    textStyle={styles.aiButtonText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: '700',
        color: '#2563eb',
    },
    alertBox: {
        backgroundColor: '#dbeafe',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    alertText: {
        color: '#1e40af',
        fontSize: 14,
        lineHeight: 20,
    },
    inputContainer: {
        marginBottom: 8,
    },
    textArea: {
        height: 180,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        padding: 16,
        textAlignVertical: 'top',
        backgroundColor: '#f8fafc',
        fontSize: 16,
        lineHeight: 24,
    },
    inputError: {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
    },
    progressContainer: {
        height: 4,
        backgroundColor: '#e2e8f0',
        borderRadius: 2,
        marginTop: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#2563eb',
    },
    validationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    charCount: {
        fontSize: 12,
        color: '#64748b',
    },
    charCountError: {
        color: '#ef4444',
        fontWeight: '600',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        fontWeight: '500',
    },
    buttonGroup: {
        marginTop: 24,
    },
    aiButton: {
        backgroundColor: '#dbeafe',
        borderRadius: 8,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aiButtonText: {
        color: '#2563eb',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    submitButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#1e88e5',
        borderRadius: 8,
        paddingVertical: 14,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default ApplicationForm;