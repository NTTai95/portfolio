// screens/apply/_ui/PricingInfo.tsx
import { apiGet } from '@/api/baseApi';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
    bidAmount: string;
    setBidAmount: (value: string) => void;
}

const PricingInfo = ({ bidAmount, setBidAmount }: Props) => {
    const [serviceFee, setServiceFee] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        apiGet("/service-fee")
            .then((res) => {
                const feeValue = Number(res?.data);
                if (!isNaN(feeValue)) {
                    setServiceFee(feeValue);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch service fee:", err);
            });
    }, []);

    const formatCurrency = (value: string): string => {
        // Xóa tất cả ký tự không phải số
        const cleaned = value.replace(/[^\d]/g, '');
        // Giới hạn độ dài tối đa (9 chữ số cho 100 triệu)
        const limited = cleaned.slice(0, 9);

        // Định dạng thành số có dấu phân cách
        return limited.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleAmountChange = (text: string) => {
        const formatted = formatCurrency(text);
        setBidAmount(formatted);
        validateAmount(formatted);
    };

    const validateAmount = (value: string) => {
        const numericValue = parseInt(value.replace(/,/g, '')) || 0;

        if (numericValue < 10000) {
            setError('Giá tối thiểu là 10,000 VNĐ');
        } else if (numericValue > 100000000) {
            setError('Giá tối đa là 100,000,000 VNĐ');
        } else {
            setError('');
        }
    };

    const handleFocus = () => {
        // Khi focus, hiển thị giá trị số không định dạng
        if (bidAmount) {
            setBidAmount(bidAmount.replace(/,/g, ''));
        }
    };

    const handleBlur = () => {
        // Khi blur, định dạng lại giá trị
        if (bidAmount) {
            setBidAmount(formatCurrency(bidAmount));
        }
    };

    const initialAmount = parseInt(bidAmount.replace(/,/g, '')) || 0;
    const finalAmount = initialAmount * (1 - serviceFee / 100);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông tin giá thầu</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Giá đề xuất (VNĐ)</Text>

                <View style={styles.currencyInput}>
                    <Text style={styles.currencySymbol}>₫</Text>
                    <TextInput
                        ref={inputRef}
                        value={bidAmount}
                        onChangeText={handleAmountChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        keyboardType="numeric"
                        style={[styles.input, error ? styles.inputError : null]}
                        placeholder="0"
                    />
                </View>

                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : (
                    <Text style={styles.formattedAmount}>
                        {initialAmount.toLocaleString()} VNĐ
                    </Text>
                )}
            </View>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Phí dịch vụ</Text>
                    <Text style={styles.summaryValue}>{serviceFee.toFixed(1)}%</Text>
                </View>

                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Thực nhận</Text>
                    <Text style={styles.finalAmount}>
                        {Math.round(finalAmount).toLocaleString()} VNĐ
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 10,
        fontWeight: '500',
    },
    currencyInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 16,
    },
    currencySymbol: {
        fontSize: 18,
        fontWeight: '600',
        color: '#475569',
        marginRight: 8,
    },
    input: {
        height: 56,
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
        paddingVertical: 0,
    },
    inputError: {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 8,
    },
    formattedAmount: {
        marginTop: 8,
        fontSize: 13,
        color: '#94a3b8',
        textAlign: 'right',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        padding: 16,
    },
    summaryItem: {
        alignItems: 'flex-start',
    },
    summaryLabel: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 6,
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#475569',
    },
    finalAmount: {
        fontSize: 17,
        fontWeight: '700',
        color: '#2563eb',
    },
});

export default PricingInfo;