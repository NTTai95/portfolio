// screens/apply/_ui/JobHeader.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const JobHeaderCard = ({ job }: { job: any }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{job?.title}</Text>
            <Text style={styles.description}>
                {job?.description}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 22,
    },
});

export default JobHeaderCard;