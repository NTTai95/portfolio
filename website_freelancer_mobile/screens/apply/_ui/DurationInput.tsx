// screens/apply/_ui/DurationInput.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const MAX_HOURS = 365 * 24; // Giới hạn tối đa trong 1 năm

interface DurationInputProps {
    estimatedHours: string;
    setEstimatedHours: (value: string) => void;
}

const DurationInput: React.FC<DurationInputProps> = ({
    estimatedHours,
    setEstimatedHours
}) => {
    const [weeks, setWeeks] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);

    // Cập nhật giá trị từ tổng giờ
    useEffect(() => {
        const total: number = Math.min(parseFloat(estimatedHours) || 0, MAX_HOURS);
        const w = Math.floor(total / (7 * 24));
        const rem = total % (7 * 24);
        const d = Math.floor(rem / 24);
        const h = rem % 24;

        setWeeks(w);
        setDays(d);
        setHours(h);
    }, [estimatedHours]);

    // Cập nhật tổng giờ khi các giá trị thay đổi
    useEffect(() => {
        let h = hours;
        let d = days;
        let w = weeks;

        // Xử lý tràn giờ -> ngày
        if (h >= 24) {
            d += Math.floor(h / 24);
            h = h % 24;
        }

        // Xử lý tràn ngày -> tuần
        if (d >= 7) {
            w += Math.floor(d / 7);
            d = d % 7;
        }

        let total = w * 7 * 24 + d * 24 + h;

        // Xử lý vượt quá giới hạn
        if (total > MAX_HOURS) {
            total = MAX_HOURS;
            const nw = Math.floor(total / (7 * 24));
            const rem = total % (7 * 24);
            const nd = Math.floor(rem / 24);
            const nh = rem % 24;

            if (nw !== weeks) setWeeks(nw);
            if (nd !== days) setDays(nd);
            if (nh !== hours) setHours(nh);
        } else {
            if (h !== hours) setHours(h);
            if (d !== days) setDays(d);
            if (w !== weeks) setWeeks(w);
        }

        setEstimatedHours(String(total));
    }, [weeks, days, hours]);

    const handleChange = (unit: 'weeks' | 'days' | 'hours', value: string) => {
        const numValue = parseInt(value) || 0;
        switch (unit) {
            case 'weeks':
                setWeeks(numValue);
                break;
            case 'days':
                setDays(numValue);
                break;
            case 'hours':
                setHours(numValue);
                break;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Thời gian thực hiện</Text>
            </View>

            <View style={styles.row}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Tuần</Text>
                    <TextInput
                        value={String(weeks)}
                        onChangeText={(text) => handleChange('weeks', text)}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ngày</Text>
                    <TextInput
                        value={String(days)}
                        onChangeText={(text) => handleChange('days', text)}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Giờ</Text>
                    <TextInput
                        value={String(hours)}
                        onChangeText={(text) => handleChange('hours', text)}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>
            </View>

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                    Tổng: <Text style={styles.bold}>
                        {(weeks * 7 * 24 + days * 24 + hours).toLocaleString()}
                    </Text> giờ
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2563eb',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    inputGroup: {
        flex: 1,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    label: {
        color: '#475569',
        fontWeight: '600',
        marginBottom: 12,
        fontSize: 14,
    },
    input: {
        height: 50,
        borderColor: '#cbd5e1',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        textAlign: 'center',
        fontWeight: '600',
        color: '#1e293b',
        backgroundColor: '#fff',
        fontSize: 16,
    },
    totalContainer: {
        marginTop: 16,
        backgroundColor: '#dbeafe',
        borderRadius: 8,
        padding: 16,
    },
    totalText: {
        color: '#1e40af',
        textAlign: 'center',
        fontWeight: '500',
    },
    bold: {
        fontWeight: '700',
    },
});

export default DurationInput;