// screens/job-listings/_ui/job-card/StatCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: React.ReactNode;
    color: string;
}

const colorConfigs = {
    blue: {
        container: '#DBEAFE',
        icon: '#3B82F6',
        title: '#1D4ED8',
        value: '#1E3A8A',
    },
    cyan: {
        container: '#CFFAFE',
        icon: '#0891B2',
        title: '#0E7490',
        value: '#164E63',
    },
    indigo: {
        container: '#E0E7FF',
        icon: '#4F46E5',
        title: '#4338CA',
        value: '#312E81',
    },
    violet: {
        container: '#EDE9FE',
        icon: '#7C3AED',
        title: '#6D28D9',
        value: '#4C1D95',
    },
    green: {
        container: '#DCFCE7',
        icon: '#16A34A',
        title: '#166534',
        value: '#14532D',
    },
    amber: {
        container: '#FEF3C7',
        icon: '#D97706',
        title: '#B45309',
        value: '#854D0E',
    },
    rose: {
        container: '#FFE4E6',
        icon: '#E11D48',
        title: '#BE123C',
        value: '#9F1239',
    },
    teal: {
        container: '#CCFBF1',
        icon: '#0D9488',
        title: '#0F766E',
        value: '#134E4A',
    },
};

const StatCard = ({ icon, title, value, color }: StatCardProps) => {
    const colors = colorConfigs[color as keyof typeof colorConfigs] || colorConfigs.blue;

    return (
        <View style={[styles.container, { backgroundColor: colors.container }]}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: `${colors.icon}20` }]}>
                    {icon}
                </View>
                <Text style={[styles.title, { color: colors.title }]}>{title}</Text>
            </View>

            <View style={styles.valueContainer}>
                {typeof value === 'string' ? (
                    <Text style={[styles.valueText, { color: colors.value }]}>{value}</Text>
                ) : (
                    <View style={styles.customValue}>{value}</View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 20,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12,
        flexShrink: 1,
    },
    valueContainer: {
        marginTop: 4,
    },
    valueText: {
        fontSize: 22,
        fontWeight: '700',
    },
    customValue: {
        alignItems: 'flex-start',
    },
});

export default StatCard;