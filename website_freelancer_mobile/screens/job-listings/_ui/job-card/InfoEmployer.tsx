// screens/job-listings/_ui/job-card/InfoEmployer.tsx
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const InfoEmployer = ({ job }: { job: any }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handlePress = () => {
        navigation.navigate('employer', { id: job.employerId });
    };

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={handlePress}
        >
            <View style={styles.avatarContainer}>
                {job.employerAvatar ? (
                    <Image
                        source={{ uri: job.employerAvatar }}
                        style={styles.avatar}
                    />
                ) : (
                    <View style={[styles.avatar, styles.placeholderAvatar]}>
                        <Text style={styles.placeholderText}>
                            {job.employerFullName?.charAt(0) || '?'}
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                    {job.employerFullName || 'Không xác định'}
                </Text>
                <View style={styles.emailContainer}>
                    <Ionicons name="mail-outline" size={16} color="#6B7280" />
                    <Text style={styles.email} numberOfLines={1}>
                        {job.employerEmail || 'Chưa có email'}
                    </Text>
                </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        elevation: 1,
    },
    avatarContainer: {
        marginRight: 16,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    placeholderAvatar: {
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    placeholderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6B7280',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        color: '#1F2937',
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 6,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    email: {
        color: '#6B7280',
        fontSize: 14,
        marginLeft: 8,
    },
});

export default InfoEmployer;