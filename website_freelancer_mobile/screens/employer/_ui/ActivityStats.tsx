// screens/employer/_ui/ActivityStats.tsx
import {
    faBriefcase,
    faClipboardCheck,
    faMedal,
    faStar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ResponseDetail } from '@/types/respones/detail';

interface ActivityStatsProps {
    data: ResponseDetail.EmployerProfile;
}

export default function ActivityStats({ data }: ActivityStatsProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thống kê hoạt động</Text>

            <View style={styles.row}>
                {/* Tổng công việc */}
                <View style={[styles.statCard, styles.blueCard]}>
                    <FontAwesomeIcon icon={faBriefcase} size={20} color="#1e40af" />
                    <Text style={styles.statTitle}>Tổng công việc</Text>
                    <Text style={styles.statValue}>{data.totalJobs}</Text>
                </View>

                {/* Đang tuyển dụng */}
                <View style={[styles.statCard, styles.orangeCard]}>
                    <FontAwesomeIcon icon={faMedal} size={20} color="#ea580c" />
                    <Text style={styles.statTitle}>Đang tuyển dụng</Text>
                    <Text style={styles.statValue}>{data.totalActiveJobs}</Text>
                </View>
            </View>

            <View style={styles.row}>
                {/* Hoàn thành */}
                <View style={[styles.statCard, styles.greenCard]}>
                    <FontAwesomeIcon icon={faClipboardCheck} size={20} color="#16a34a" />
                    <Text style={styles.statTitle}>Hoàn thành</Text>
                    <Text style={styles.statValue}>{data.totalCompletedJobs}</Text>
                </View>

                {/* Đánh giá trung bình */}
                <View style={[styles.statCard, styles.purpleCard]}>
                    <FontAwesomeIcon icon={faStar} size={20} color="#7c3aed" />
                    <Text style={styles.statTitle}>Đánh giá trung bình</Text>
                    <Text style={styles.statValue}>
                        {data.averageRating.toFixed(1)}
                        <Text style={styles.statSuffix}>/5.0</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        color: '#1f2937',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    statCard: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    blueCard: {
        backgroundColor: '#e6f7ff',
        borderColor: '#91d5ff',
        borderWidth: 1,
    },
    orangeCard: {
        backgroundColor: '#fff7e6',
        borderColor: '#ffd591',
        borderWidth: 1,
    },
    greenCard: {
        backgroundColor: '#f6ffed',
        borderColor: '#b7eb8f',
        borderWidth: 1,
    },
    purpleCard: {
        backgroundColor: '#f9f0ff',
        borderColor: '#d3adf7',
        borderWidth: 1,
    },
    statTitle: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 8,
        marginBottom: 4,
        textAlign: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
    },
    statSuffix: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: 'normal',
    },
});
