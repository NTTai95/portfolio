// screens/create-job/_ui/Step.tsx
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useStep } from './ContextStep';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';

const { width } = Dimensions.get('window');

const StepJob = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'createJob'>>();
    const jobId = Number(route.params?.id);
    const { step, updateStep } = useStep();

    const steps = [
        { title: "Thông tin cơ bản", content: <Step1Form /> },
        { title: "Kỹ năng & Ngôn ngữ", content: <Step2Form /> },
        { title: "Ngân sách & thời gian", content: <Step3Form /> },
        { title: "Mô tả & đính kèm", content: <Step4Form /> },
    ];

    useEffect(() => {
        if (jobId) {
            updateStep();
        }
    }, [jobId]);

    return (
        <View style={styles.container}>
            {/* Progress Header */}
            <View style={styles.progressHeader}>
                <Text style={styles.stepCounter}>Bước {step + 1}/{steps.length}</Text>
                <Text style={styles.stepTitle}>{steps[step].title}</Text>

                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBar,
                            { width: `${(step + 1) * (100 / steps.length)}%` }
                        ]}
                    />
                </View>
            </View>

            {/* Step Content */}
            <View style={styles.contentContainer}>
                {steps[step].content}
            </View>

            {/* Step Indicators */}
            <View style={styles.stepsContainer}>
                {steps.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.stepIndicator,
                            step >= index && styles.activeStep,
                            step === index && styles.currentStep
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    progressHeader: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    stepCounter: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 4,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 16,
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#e9ecef',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#1890ff',
        borderRadius: 3,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    stepIndicator: {
        height: 6,
        flex: 1,
        backgroundColor: '#e9ecef',
        borderRadius: 3,
        marginHorizontal: 4,
    },
    activeStep: {
        backgroundColor: '#1890ff',
    },
    currentStep: {
        transform: [{ scaleY: 1.2 }],
    },
});

export default StepJob;