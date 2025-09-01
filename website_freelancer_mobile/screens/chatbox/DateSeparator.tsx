// components/chat/DateSeparator.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatDateDisplay } from "./utils";

interface DateSeparatorProps {
    date: Date;
}

const DateSeparator = ({ date }: DateSeparatorProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {formatDateDisplay(date)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 16,
    },
    text: {
        color: '#666',
        fontSize: 12,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
});

export default DateSeparator;