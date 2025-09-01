import { ResponseDetail } from '@/types/respones/detail';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SkillsSectionProps {
    data: ResponseDetail.Freelancer;
}

export default function SkillsSection({ data }: SkillsSectionProps) {
    const [showAllLanguages, setShowAllLanguages] = useState(false);
    const [rotation] = useState(new Animated.Value(0));

    const skillsData = {
        skills: data.skills,
        languages: data.languages
    };

    const toggleLanguages = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowAllLanguages(!showAllLanguages);

        Animated.timing(rotation, {
            toValue: showAllLanguages ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const rotateIcon = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const getSkillColor = (id: number) => {
        const colors = [
            '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
            '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#FFC107',
            '#FF9800', '#FF5722'
        ];
        return colors[id % colors.length];
    };

    const getLanguageFlag = (iso: string) => {
        const flags: Record<string, string> = {
            'DE': '🇩🇪', 'ES': '🇪🇸', 'FR': '🇫🇷', 'IT': '🇮🇹',
            'PT': '🇵🇹', 'RU': '🇷🇺', 'CN': '🇨🇳', 'JP': '🇯🇵',
            'KR': '🇰🇷', 'VN': '🇻🇳', 'US': '🇺🇸', 'GB': '🇬🇧',
            'CA': '🇨🇦', 'AU': '🇦🇺', 'IN': '🇮🇳', 'BR': '🇧🇷',
        };
        return flags[iso.toUpperCase()] || '🌐';
    };

    const displayedLanguages = showAllLanguages
        ? skillsData.languages
        : skillsData.languages.slice(0, 5);

    return (
        <View style={styles.card}>
            {/* Skills Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="build" size={24} color="#3F51B5" />
                    <Text style={styles.sectionTitle}>
                        Kỹ năng ({skillsData.skills.length})
                    </Text>
                </View>

                <View style={styles.skillsContainer}>
                    {skillsData.skills.map((skill) => (
                        <TouchableOpacity
                            key={skill.id}
                            style={[styles.skillTag, { backgroundColor: getSkillColor(skill.id) }]}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.skillText}>{skill.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.divider} />

            {/* Languages Section */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="language" size={24} color="#2196F3" />
                    <Text style={styles.sectionTitle}>
                        Ngôn ngữ ({skillsData.languages.length})
                    </Text>
                </View>

                <View style={styles.languagesContainer}>
                    {displayedLanguages.map((language) => (
                        <View key={language.id} style={styles.languageItem}>
                            <Text style={styles.languageFlag}>{getLanguageFlag(language.iso)}</Text>
                            <Text style={styles.languageName}>{language.name}</Text>
                            <View style={styles.languageCode}>
                                <Text style={styles.codeText}>{language.iso.toUpperCase()}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {skillsData.languages.length > 5 && (
                    <TouchableOpacity
                        style={styles.showMoreButton}
                        onPress={toggleLanguages}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.showMoreText}>
                            {showAllLanguages ? 'Thu gọn' : `Xem thêm ${skillsData.languages.length - 5} ngôn ngữ`}
                        </Text>
                        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={24}
                                color="#2196F3"
                            />
                        </Animated.View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    section: {
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginLeft: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 12,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    skillTag: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    skillText: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 14,
    },
    languagesContainer: {
        gap: 12,
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    languageFlag: {
        fontSize: 24,
        marginRight: 12,
    },
    languageName: {
        flex: 1,
        fontWeight: '500',
        color: '#333333',
        fontSize: 16,
    },
    languageCode: {
        backgroundColor: '#E3F2FD',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    codeText: {
        color: '#2196F3',
        fontWeight: '500',
        fontSize: 14,
    },
    showMoreButton: {
        marginTop: 8,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    showMoreText: {
        color: '#2196F3',
        fontWeight: '500',
        fontSize: 16,
        marginRight: 4,
    },
});