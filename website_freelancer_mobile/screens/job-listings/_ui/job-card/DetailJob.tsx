// screens/job-listings/_ui/job-card/DetailJob.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DetailJob = ({ job, keyword }: { job: any, keyword: any }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleOpenDocument = () => {
        if (job.document) {
            Linking.openURL(job.document);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={toggleExpand}
                style={styles.header}
                activeOpacity={0.9}
            >
                <Text style={styles.headerText}>Chi tiết công việc</Text>
                <Ionicons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="white"
                />
            </TouchableOpacity>

            {expanded && (
                <View style={styles.content}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.description}>
                            {job?.description || "Chưa có mô tả"}
                        </Text>
                    </ScrollView>

                    {job.document && (
                        <TouchableOpacity
                            style={styles.documentContainer}
                            onPress={handleOpenDocument}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="document-attach-outline" size={22} color="#3B82F6" />
                            <Text style={styles.documentLink}>Tài liệu đính kèm</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginTop: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#3B82F6',
    },
    headerText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    content: {
        backgroundColor: '#F9FAFB',
        padding: 16,
    },
    scrollView: {
        maxHeight: 200,
    },
    description: {
        color: '#4B5563',
        lineHeight: 22,
        fontSize: 15,
    },
    documentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DBEAFE',
        marginTop: 16,
    },
    documentLink: {
        color: '#3B82F6',
        fontWeight: '600',
        marginLeft: 12,
        fontSize: 15,
    },
});

export default DetailJob;