// screens/freelancer/_ui/ActivityStats.tsx
import { ResponseDetail } from '@/types/respones/detail';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ActivityStatsProps {
    data: ResponseDetail.Freelancer;
}

export default function ActivityStats({ data }: ActivityStatsProps) {
    const formatEarnings = (amount: number) => {
        if (amount >= 1000000) {
            return `${(amount / 1000000).toFixed(1)}tr`;
        }
        return amount.toLocaleString('vi-VN');
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Thống kê hoạt động</Text>

            <View style={styles.statsContainer}>
                <View style={styles.row}>
                    <StatCard
                        title="Dự án HT"
                        value={data.completedJobs.toString()}
                        icon="done-all"
                        color="#10b981"
                    />
                    <StatCard
                        title="Đánh giá TB"
                        value={data.scoreReview.toFixed(1)}
                        suffix="/5"
                        icon="star-rate"
                        color="#f59e0b"
                    />
                </View>

                <View style={styles.row}>
                    <StatCard
                        title="Thu nhập"
                        value={formatEarnings(data.totalEarnings)}
                        suffix="VNĐ"
                        icon="attach-money"
                        color="#8b5cf6"
                        isLongValue={true}
                    />
                    <StatCard
                        title="Tỷ lệ TL"
                        value={data.successRate.toString()}
                        suffix="%"
                        icon="emoji-events"
                        color="#ef4444"
                    />
                </View>
            </View>
        </View>
    );
}

const StatCard = ({
    title,
    value,
    suffix,
    icon,
    color,
    isLongValue = false
}: {
    title: string;
    value: string;
    suffix?: string;
    icon: "done-all" | "attach-money" | "emoji-events" | "star-rate";
    color: string;
    isLongValue?: boolean;
}) => (
    <View style={[
        styles.statCard,
        { borderLeftColor: color },
        isLongValue && styles.longValueCard
    ]}>
        <MaterialIcons name={icon} size={24} color={color} />

        <View style={styles.textContainer}>
            <Text 
                style={styles.statValue}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.75}
            >
                {value}
                {suffix && !isLongValue && (
                    <Text style={styles.statSuffix}> {suffix}</Text>
                )}
            </Text>
            
            {suffix && isLongValue && (
                <Text style={styles.statSuffix}>{suffix}</Text>
            )}
            
            <Text 
                style={styles.statTitle} 
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
            >
                {title}
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    statsContainer: {
        flexDirection: 'column',
        gap: 12,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    statCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 12,
        borderLeftWidth: 4,
        minHeight: 70,
    },
    longValueCard: {
        flex: 1.35,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 2,
    },
    statSuffix: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6b7280',
    },
    statTitle: {
        fontSize: 12.5,
        color: '#6b7280',
        fontWeight: '500',
        marginTop: 2,
    },
});