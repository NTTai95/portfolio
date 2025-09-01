// screens/freelancer-search/ui/FilterPanel.tsx
import { apiGet } from '@/api/baseApi';
import { EndPoint } from '@/api/endpoint';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Thay đổi interface FilterPanelProps
interface FilterPanelProps {
    filters: {
        keyword: string;
        skillIds: number[];
        languageIds: number[];
        isMale?: boolean | null; // Cho phép cả boolean | null
        status: string;
        page: number;
        size: number;
        sortBy: string;
        sortDir: string;
    };
    onFilterChange: (filters: FilterPanelProps['filters']) => void;
    visible: boolean;
    onClose: () => void;
}

interface Skill {
    id: number;
    name: string;
}

interface Language {
    id: number;
    name: string;
}

export default function FilterPanel({
    filters,
    onFilterChange,
    visible,
    onClose
}: FilterPanelProps) {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
    const [gender, setGender] = useState<boolean | undefined>(undefined);
    const [expandedSections, setExpandedSections] = useState({
        skills: false,
        languages: false,
        gender: false
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    useEffect(() => {
        const fetchFilterData = async () => {
            setLoading(true);
            try {
                const skillsResponse = await apiGet<Skill[]>(EndPoint.List.SKILL);
                setSkills(skillsResponse.data);

                const languagesResponse = await apiGet<Language[]>(EndPoint.List.LANGUAGE);
                setLanguages(languagesResponse.data);
            } catch (error) {
                console.error('Error fetching filter data:', error);
                setSkills([]);
                setLanguages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFilterData();
    }, []);

    // Sửa useEffect khởi tạo giá trị
    useEffect(() => {
        if (visible) {
            setSelectedSkills(filters.skillIds);
            setSelectedLanguages(filters.languageIds);
            // Chuyển đổi null → undefined
            setGender(filters.isMale === null ? undefined : filters.isMale);
        }
    }, [visible, filters.skillIds, filters.languageIds, filters.isMale]);

    const handleSkillChange = (id: number) => {
        setSelectedSkills(prev =>
            prev.includes(id)
                ? prev.filter(skillId => skillId !== id)
                : [...prev, id]
        );
    };

    const handleLanguageChange = (id: number) => {
        setSelectedLanguages(prev =>
            prev.includes(id)
                ? prev.filter(langId => langId !== id)
                : [...prev, id]
        );
    };

    const handleGenderChange = (value: boolean | undefined) => {
        setGender(prev => prev === value ? undefined : value);
    };

    const handleClearFilters = () => {
        setSelectedSkills([]);
        setSelectedLanguages([]);
        setGender(undefined);
    };

    const handleApply = () => {
        onFilterChange({
            ...filters,
            skillIds: selectedSkills,
            languageIds: selectedLanguages,
            isMale: gender,
            page: 0
        });
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <Icon name="filter" size={20} color="white" />
                        </View>
                        <Text style={styles.title}>Bộ lọc nâng cao</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Icon name="close" size={24} color="#6b7280" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollContainer}>
                        {/* Skills Filter */}
                        <View style={styles.section}>
                            <TouchableOpacity
                                style={styles.sectionHeader}
                                onPress={() => toggleSection('skills')}
                            >
                                <Icon
                                    name={expandedSections.skills ? "chevron-down" : "chevron-right"}
                                    size={20}
                                    color="#355a8e"
                                />
                                <Icon name="account" size={20} color="#355a8e" style={styles.sectionIcon} />
                                <Text style={styles.sectionTitle}>Kỹ năng</Text>
                            </TouchableOpacity>

                            {expandedSections.skills && (
                                loading ? (
                                    <ActivityIndicator size="small" color="#355a8e" style={styles.loading} />
                                ) : (
                                    <View style={styles.tagsContainer}>
                                        {skills.map(skill => (
                                            <TouchableOpacity
                                                key={skill.id}
                                                style={[
                                                    styles.tag,
                                                    selectedSkills.includes(skill.id) && styles.selectedTag
                                                ]}
                                                onPress={() => handleSkillChange(skill.id)}
                                            >
                                                <Text style={[
                                                    styles.tagText,
                                                    selectedSkills.includes(skill.id) && styles.selectedTagText
                                                ]}>
                                                    {skill.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )
                            )}
                        </View>

                        {/* Languages Filter */}
                        <View style={styles.section}>
                            <TouchableOpacity
                                style={styles.sectionHeader}
                                onPress={() => toggleSection('languages')}
                            >
                                <Icon
                                    name={expandedSections.languages ? "chevron-down" : "chevron-right"}
                                    size={20}
                                    color="#355a8e"
                                />
                                <Icon name="translate" size={20} color="#355a8e" style={styles.sectionIcon} />
                                <Text style={styles.sectionTitle}>Ngôn ngữ</Text>
                            </TouchableOpacity>

                            {expandedSections.languages && (
                                loading ? (
                                    <ActivityIndicator size="small" color="#355a8e" style={styles.loading} />
                                ) : (
                                    <View style={styles.tagsContainer}>
                                        {languages.map(language => (
                                            <TouchableOpacity
                                                key={language.id}
                                                style={[
                                                    styles.languageTag,
                                                    selectedLanguages.includes(language.id) && styles.selectedLanguageTag
                                                ]}
                                                onPress={() => handleLanguageChange(language.id)}
                                            >
                                                <Text style={[
                                                    styles.languageTagText,
                                                    selectedLanguages.includes(language.id) && styles.selectedLanguageTagText
                                                ]}>
                                                    {language.name}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )
                            )}
                        </View>

                        {/* Gender Filter */}
                        <View style={styles.section}>
                            <TouchableOpacity
                                style={styles.sectionHeader}
                                onPress={() => toggleSection('gender')}
                            >
                                <Icon
                                    name={expandedSections.gender ? "chevron-down" : "chevron-right"}
                                    size={20}
                                    color="#355a8e"
                                />
                                <Icon name="gender-male-female" size={20} color="#355a8e" style={styles.sectionIcon} />
                                <Text style={styles.sectionTitle}>Giới tính</Text>
                            </TouchableOpacity>

                            {expandedSections.gender && (
                                <View style={styles.genderContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.genderOption,
                                            gender === true && styles.selectedGender
                                        ]}
                                        onPress={() => handleGenderChange(true)}
                                    >
                                        <Text style={[
                                            styles.genderText,
                                            gender === true && styles.selectedGenderText
                                        ]}>
                                            Nam
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.genderOption,
                                            gender === false && styles.selectedGender
                                        ]}
                                        onPress={() => handleGenderChange(false)}
                                    >
                                        <Text style={[
                                            styles.genderText,
                                            gender === false && styles.selectedGenderText
                                        ]}>
                                            Nữ
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    {/* Footer Buttons */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={handleClearFilters}
                        >
                            <Icon name="refresh" size={20} color="#6b7280" />
                            <Text style={styles.clearButtonText}>Xóa bộ lọc</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={handleApply}
                        >
                            <Text style={styles.applyButtonText}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const { width, height } = Dimensions.get('window');
const modalHeight = height * 0.85;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        height: modalHeight,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 16,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginVertical: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        right: 16,
        top: 16,
        padding: 8,
    },
    iconContainer: {
        backgroundColor: '#355a8e',
        borderRadius: 8,
        padding: 8,
        marginRight: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    scrollContainer: {
        paddingHorizontal: 16,
        maxHeight: modalHeight - 150,
    },
    section: {
        marginVertical: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: 8,
    },
    sectionIcon: {
        marginLeft: 8,
    },
    sectionTitle: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    loading: {
        paddingVertical: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    selectedTag: {
        backgroundColor: '#355a8e15',
        borderColor: '#355a8e30',
    },
    tagText: {
        fontSize: 14,
        color: '#4b5563',
    },
    selectedTagText: {
        color: '#355a8e',
        fontWeight: '500',
    },
    languageTag: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    selectedLanguageTag: {
        backgroundColor: '#10b98115',
        borderColor: '#10b98130',
    },
    languageTagText: {
        fontSize: 14,
        color: '#4b5563',
    },
    selectedLanguageTagText: {
        color: '#059669',
        fontWeight: '500',
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    genderOption: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    selectedGender: {
        backgroundColor: '#355a8e15',
        borderColor: '#355a8e30',
    },
    genderText: {
        fontSize: 15,
        color: '#4b5563',
    },
    selectedGenderText: {
        color: '#355a8e',
        fontWeight: '500',
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        flex: 1,
        marginRight: 12,
    },
    clearButtonText: {
        marginLeft: 8,
        color: '#6b7280',
        fontWeight: '500',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    applyButton: {
        backgroundColor: '#355a8e',
        borderRadius: 12,
        padding: 16,
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});