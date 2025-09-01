// screens/freelancer/_ui/EducationSection.tsx
import { ResponseDetail } from '@/types/respones/detail';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EducationSectionProps {
    data: ResponseDetail.Freelancer;
}

export default function EducationSection({ data }: EducationSectionProps) {
    const educations = data.educations;

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Hiện tại';
        return new Date(dateString.split('/').reverse().join('-')).toLocaleDateString('vi-VN', {
            month: 'short',
            year: 'numeric'
        });
    };

    const getGpaColor = (gpa: number): string => {
        if (gpa >= 8.5) return '#4CAF50';
        if (gpa >= 7.0) return '#2196F3';
        if (gpa >= 6.0) return '#FFC107';
        return '#F44336';
    };

    const getGpaLabel = (gpa: number) => {
        if (gpa >= 8.5) return 'Xuất sắc';
        if (gpa >= 7.0) return 'Khá';
        if (gpa >= 6.0) return 'Trung bình';
        return 'Yếu';
    };

    const getDegreeColor = (degree: string) => {
        if (degree.includes('Cử nhân') || degree.includes('Bachelor')) return '#2196F3';
        if (degree.includes('Thạc sĩ') || degree.includes('Master')) return '#9C27B0';
        if (degree.includes('Tiến sĩ') || degree.includes('PhD')) return '#FF9800';
        if (degree.includes('Chứng chỉ') || degree.includes('Certificate')) return '#4CAF50';
        return '#607D8B';
    };

    const calculateDuration = (startDate: string, endDate: string) => {
        if (!startDate) return 'Không xác định';

        const start = new Date(startDate.split('/').reverse().join('-'));
        const end = endDate ? new Date(endDate.split('/').reverse().join('-')) : new Date();

        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years > 0 && remainingMonths > 0) {
            return `${years} năm ${remainingMonths} tháng`;
        } else if (years > 0) {
            return `${years} năm`;
        } else {
            return `${remainingMonths} tháng`;
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <MaterialIcons name="school" size={20} color="#4A90E2" />
                <Text style={styles.headerText}>Học vấn ({educations.length})</Text>
            </View>

            {educations.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <MaterialIcons name="info-outline" size={24} color="#9E9E9E" />
                    <Text style={styles.emptyText}>Chưa có thông tin học vấn</Text>
                </View>
            ) : (
                <View style={styles.timeline}>
                    {educations.map((edu, index) => (
                        <View key={index} style={styles.eduItem}>
                            <View style={styles.eduHeader}>
                                <View style={styles.dot} />
                                <Text style={styles.schoolName}>{edu.schoolName}</Text>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateText}>
                                        {edu.startDate} - {edu.endDate}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.eduDetails}>
                                <View style={styles.degreeRow}>
                                    <View style={[styles.degreeBadge, { backgroundColor: getDegreeColor(edu.degree) }]}>
                                        <Text style={styles.degreeText}>{edu.degree}</Text>
                                    </View>
                                    <Text style={styles.majorText}>{edu.major}</Text>
                                </View>

                                {edu.gpa > 0 && (
                                    <View style={styles.gpaContainer}>
                                        <Text style={styles.gpaLabel}>GPA:</Text>
                                        <Text style={[styles.gpaValue, { color: getGpaColor(edu.gpa) }]}>
                                            {edu.gpa.toFixed(2)}
                                        </Text>
                                        <Text style={styles.gpaScale}>/10.0</Text>
                                        <View style={[styles.gpaBadge, { backgroundColor: getGpaColor(edu.gpa) }]}>
                                            <Text style={styles.gpaBadgeText}>{getGpaLabel(edu.gpa)}</Text>
                                        </View>
                                    </View>
                                )}

                                {edu.description && (
                                    <View style={styles.descriptionContainer}>
                                        <Text style={styles.descriptionText}>{edu.description}</Text>
                                    </View>
                                )}

                                <View style={styles.durationContainer}>
                                    <MaterialIcons name="access-time" size={14} color="#757575" />
                                    <Text style={styles.durationText}>
                                        {calculateDuration(edu.startDate, edu.endDate)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginLeft: 10,
    },
    timeline: {
        marginLeft: 10,
        paddingLeft: 16,
        borderLeftWidth: 2,
        borderLeftColor: '#E0E0E0',
    },
    eduItem: {
        marginBottom: 20,
        position: 'relative',
    },
    eduHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    dot: {
        position: 'absolute',
        left: -26,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4A90E2',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    schoolName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    dateContainer: {
        backgroundColor: '#F0F7FF',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    dateText: {
        color: '#4A90E2',
        fontSize: 12,
        fontWeight: '500',
    },
    eduDetails: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        padding: 12,
    },
    degreeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    degreeBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 6,
    },
    degreeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500',
    },
    majorText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    gpaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    gpaLabel: {
        fontWeight: '500',
        color: '#757575',
        marginRight: 6,
    },
    gpaValue: {
        fontWeight: '700',
        fontSize: 15,
        marginRight: 4,
    },
    gpaScale: {
        color: '#9E9E9E',
        marginRight: 10,
    },
    gpaBadge: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 20,
    },
    gpaBadgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500',
    },
    descriptionContainer: {
        marginBottom: 12,
    },
    descriptionText: {
        color: '#555',
        lineHeight: 20,
        fontSize: 14,
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationText: {
        color: '#757575',
        fontSize: 13,
        marginLeft: 6,
    },
    emptyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
    },
    emptyText: {
        color: '#9E9E9E',
        marginLeft: 8,
    },
});