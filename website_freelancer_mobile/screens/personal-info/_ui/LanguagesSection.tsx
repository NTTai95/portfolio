import { apiPut } from '@/api/baseApi';
import { apiListLanguage } from '@/api/list';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import ProfileContext from './ProfileContext';

export default function LanguagesSection({ languages }: { languages: any[] }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [allLanguages, setAllLanguages] = useState<{ label: string; value: number }[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
    const { reloadData } = useContext(ProfileContext);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isModalVisible) {
            apiListLanguage().then((res) => {
                const langs = res.data.map((lang: any) => ({
                    label: lang.name,
                    value: lang.id,
                }));
                setAllLanguages(langs);
                setSelectedLanguages(languages.map(lang => lang.id));
            });
        }
    }, [languages, isModalVisible]);

    const handleSave = async () => {
        try {
            await apiPut("profile/update/languages", { languages: selectedLanguages });
            dispatch(addMessage({
                key: "update-language",
                type: "success",
                content: "Cập nhật ngôn ngữ thành công!"
            }))
            reloadData();
            setIsModalVisible(false);
        } catch {
            dispatch(addMessage({
                key: "update-language",
                type: "error",
                content: "Cập nhật ngôn ngữ thất bại!"
            }))
        }
    };

    const toggleLanguage = (id: number) => {
        setSelectedLanguages(prev =>
            prev.includes(id)
                ? prev.filter(langId => langId !== id)
                : [...prev, id]
        );
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Ngôn ngữ</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsModalVisible(true)}
                >
                    <MaterialCommunityIcons name="pencil" size={24} color="#3b82f6" />
                </TouchableOpacity>
            </View>

            {languages.length === 0 ? (
                <Text style={styles.emptyText}>Chưa thêm ngôn ngữ</Text>
            ) : (
                <View style={styles.languagesContainer}>
                    {languages.map((lang, index) => (
                        <View key={index} style={styles.languageTag}>
                            <MaterialCommunityIcons name="earth" size={16} color="#fff" />
                            <Text style={styles.languageText}>{lang.name}</Text>
                        </View>
                    ))}
                </View>
            )}

            <Modal
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Chỉnh sửa ngôn ngữ</Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.cancelButton}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSave}>
                                <Text style={styles.saveButton}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        data={allLanguages}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.languageItem,
                                    selectedLanguages.includes(item.value) && styles.selectedLanguageItem
                                ]}
                                onPress={() => toggleLanguage(item.value)}
                            >
                                <Text style={styles.languageItemText}>{item.label}</Text>
                                {selectedLanguages.includes(item.value) && (
                                    <MaterialCommunityIcons name="check" size={20} color="#10b981" />
                                )}
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.languageList}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    editButton: {
        padding: 4,
    },
    languagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    languageTag: {
        flexDirection: 'row',
        backgroundColor: '#10b981',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignItems: 'center',
        gap: 4,
    },
    languageText: {
        color: '#fff',
        fontSize: 14,
    },
    emptyText: {
        color: '#9ca3af',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    modalActions: {
        flexDirection: 'row',
        gap: 20,
    },
    cancelButton: {
        fontSize: 16,
        color: '#6b7280',
    },
    saveButton: {
        fontSize: 16,
        color: '#3b82f6',
        fontWeight: 'bold',
    },
    languageList: {
        paddingBottom: 20,
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    selectedLanguageItem: {
        backgroundColor: '#f0fdf4',
    },
    languageItemText: {
        fontSize: 16,
        color: '#1f2937',
    },
});