import { useFreelancerProfile } from '@/hooks/useFreelancerProfile';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ActivityStats from './_ui/ActivityStats';
import CertificationsSection from './_ui/CertificationsSection';
import EducationSection from './_ui/EducationSection';
import PersonalInfo from './_ui/PersonalInfo';
import SkillsSection from './_ui/SkillsSection';
import TopReviews from './_ui/TopReviews';

export default function FreelancerPage() {
    const route = useRoute<RouteProp<RootStackParamList, 'freelancer'>>();
    const id = route.params?.id;

    const { data, loading, error } = useFreelancerProfile({ id: Number(id) });

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1e88e5" />
            </View>
        );
    }

    if (error || !data) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                    {error || 'Không thể tải thông tin freelancer'}
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <View style={styles.content}>
                <PersonalInfo data={data} />

                <View style={styles.statsRow}>
                    <ActivityStats data={data} />
                </View>

                <SkillsSection data={data} />
                <CertificationsSection data={data} />
                <EducationSection data={data} />
                <TopReviews data={data} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        paddingBottom: 24,
    },
    content: {
        padding: 16,
    },
    statsRow: {
        marginVertical: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    errorText: {
        fontSize: 16,
        color: '#ff3b30',
        textAlign: 'center',
    },
});