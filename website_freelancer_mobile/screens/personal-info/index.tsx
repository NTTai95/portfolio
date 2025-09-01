// screens/personal-info/index.tsx
import { apiGet } from '@/api/baseApi';
import { AuthGuard } from '@/components/AuthGuard';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import CertificationsSection from './_ui/certification/CertificationsSection';
import EducationsSection from './_ui/education/EducationSection';
import LanguagesSection from './_ui/LanguagesSection';
import ProfileContext from './_ui/ProfileContext';
import ProfileSidebar from './_ui/profileSidebar/ProfileSidebar';
import SkillsSection from './_ui/SkillsSection';

export default function Profile() {
    const [data, setData] = useState<any>();

    const reloadData = () => {
        apiGet("/profile/my-info").then((res) => {
            console.log("reloading data");
            setData(res.data);
        })
    }

    useEffect(() => {
        reloadData();
    }, []);

    return (
        <ProfileContext.Provider value={{ reloadData }}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContent} nestedScrollEnabled={true}>
                    <View style={styles.container}>
                        <AuthGuard roles={["ROLE_FREELANCER"]}>
                            <View style={styles.profileContainer}>
                                <ProfileSidebar data={data} />
                                <View style={styles.sectionsContainer}>
                                    <SkillsSection skills={data?.skills || []} />
                                    <LanguagesSection languages={data?.languages || []} />
                                    <CertificationsSection certifications={data?.certifications || []} />
                                    <EducationsSection educations={data?.educations || []} />
                                </View>
                            </View>
                        </AuthGuard>

                        <AuthGuard roles={["ROLE_NHA_TUYEN_DUNG"]}>
                            <View style={styles.employerContainer}>
                                <ProfileSidebar data={data} />
                            </View>
                        </AuthGuard>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ProfileContext.Provider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    profileContainer: {
        flexDirection: 'column',
    },
    sectionsContainer: {
        marginTop: 16,
        gap: 16,
    },
    employerContainer: {
        alignItems: 'center',
        paddingVertical: 32,
    },
});