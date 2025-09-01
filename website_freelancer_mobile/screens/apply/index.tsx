// screens/apply/index.tsx
import { apiGet, apiPost } from '@/api/baseApi';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import { applyWithAI } from '@/utils/applyWithAI';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ApplicationForm from './_ui/ApplicationForm';
import DurationInput from './_ui/DurationInput';
import JobHeader from './_ui/JobHeader';
import PricingInfo from './_ui/PricingInfo';

const JobApplicationPage = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'apply'>>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();

    const id = route.params?.id;
    const [job, setJob] = useState<any>();
    const [bidAmount, setBidAmount] = useState('');
    const [estimatedHours, setEstimatedHours] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const checkApply = async () => {
            try {
                const res = await apiGet(`/jobs/${id}/is-apply`);
                if (res.data) {
                    navigation.navigate('findJob');
                }
            } catch (error) {
                console.error('Check apply error:', error);
            }
        };

        const fetchJob = async () => {
            try {
                const res: any = await apiGet(`/jobs/${id}/public`);
                setJob(res.data);
                setBidAmount(String(res.data?.budget || ''));
                setEstimatedHours(String(res.data?.duration || ''));
            } catch (error) {
                console.error('Fetch job error:', error);
                navigation.navigate('findJob');
            }
        };

        checkApply();
        fetchJob();
    }, [id, navigation]);

    const handleSubmit = async () => {
        if (!bidAmount || !estimatedHours || !content || content.length < 100) {
            dispatch(addMessage({
                key: 'applyFail',
                content: 'Vui lòng điền đầy đủ thông tin',
                type: 'error'
            }))
            return;
        }
        dispatch(showSpin());

        const values = {
            bidAmount: bidAmount,
            estimatedHours: estimatedHours,
            content
        };

        apiPost(`jobs/${id}/apply`, values).then(() => {
            dispatch(addMessage({
                key: 'applySuccess',
                content: 'Ứng tuyển thành công',
                type: 'success'
            }));
            navigation.navigate('findJob');
        }).catch((err: any) => {
            console.error('Apply error:', err);
            dispatch(addMessage({
                key: 'applyFail',
                content: 'Ứng tuyển thất bại',
                type: 'error'
            }))
        }).finally(() => {
            dispatch(hideSpin());
        })
    };

    const handleFillApply = async () => {
        dispatch(showSpin());
        try {
            const aiContent = await applyWithAI({
                id: String(id),
                applyBudget: parseFloat(bidAmount),
                applyDurationHours: parseFloat(estimatedHours),
                applyContent: content
            });
            setContent(aiContent);
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể tạo nội dung với AI');
        } finally {
            dispatch(hideSpin());
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                <JobHeader job={job} />

                <View style={styles.formContainer}>
                    <PricingInfo
                        bidAmount={bidAmount}
                        setBidAmount={setBidAmount}
                    />
                    <View style={styles.divider} />

                    <DurationInput
                        estimatedHours={estimatedHours}
                        setEstimatedHours={setEstimatedHours}
                    />
                    <View style={styles.divider} />

                    <ApplicationForm
                        content={content}
                        setContent={setContent}
                        handleFillApply={handleFillApply}
                        handleSubmit={handleSubmit}
                    />
                </View>
            </ScrollView>

            {/* Floating Submit Button */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={handleSubmit}>
                <Text style={styles.floatingButtonText}>Nộp ứng tuyển</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc', // Lighter background
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 80, // Space for floating button
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0', // Softer divider
        marginVertical: 20,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#2563eb',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    floatingButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});


export default JobApplicationPage;