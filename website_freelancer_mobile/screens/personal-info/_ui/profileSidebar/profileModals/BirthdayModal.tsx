// screens/personal-info/_ui/profileSidebar/profileModals/BirthdayModal.tsx
import { AppDispatch } from '@/store';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleBirthdayUpdate } from '../profileApiHandlers';

interface BirthdayModalProps {
    visible: boolean;
    onCancel: () => void;
    initialBirthday: string;
    reloadData: () => void;
}

export default function BirthdayModal({
    visible,
    onCancel,
    initialBirthday,
    reloadData
}: BirthdayModalProps) {
    const parseDate = (dateStr: string) => {
        if (!dateStr) return new Date();
        if (dateStr.includes('/')) {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}`);
        }
        return new Date(dateStr);
    };

    const [date, setDate] = useState(parseDate(initialBirthday));
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setDate(parseDate(initialBirthday));
    }, [initialBirthday]);

    const validateAge = (selected: Date) => {
        const age = dayjs().diff(dayjs(selected), 'year');
        return age >= 18;
    };

    const handleDateChange = async (_: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            if (selectedDate) {
                if (!validateAge(selectedDate)) {
                    Alert.alert('Lỗi', 'Tuổi phải lớn hơn hoặc bằng 18');
                    return;
                }
                const success = await handleBirthdayUpdate(
                    dayjs(selectedDate).format('YYYY-MM-DD'),
                    dispatch,
                    reloadData
                );
                if (success) onCancel();
            } else {
                onCancel();
            }
        } else {
            if (selectedDate) setDate(selectedDate);
        }
    };

    return (
        visible && (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.pickerWrapper}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                        onChange={handleDateChange}
                        themeVariant="light"
                        maximumDate={new Date()}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    pickerWrapper: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 5,
    },
});
