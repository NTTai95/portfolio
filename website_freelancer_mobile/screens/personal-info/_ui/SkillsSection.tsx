import { apiPut } from '@/api/baseApi';
import { apiListSkill } from '@/api/list';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import ProfileContext from './ProfileContext';

export default function SkillsSection({ skills }: { skills: any[] }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [allSkills, setAllSkills] = useState<{ label: string; value: number; description: string }[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
    const [search, setSearch] = useState('');
    const { reloadData } = useContext(ProfileContext);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isModalVisible) {
            apiListSkill().then((res) => {
                const skillsList = res.data.map((skill: any) => ({
                    label: skill.name,
                    value: skill.id,
                    description: skill.description,
                }));
                setAllSkills(skillsList);
                setSelectedSkills(skills.map(skill => skill.id));
            });
        }
    }, [skills, isModalVisible]);

    const handleSave = async () => {
        try {
            await apiPut("profile/update/skills", { skills: selectedSkills });
            dispatch(addMessage({
                key: "update-skill",
                type: "success",
                content: "Cập nhật kỹ năng thành công!"
            }))
            reloadData();
            setIsModalVisible(false);
        } catch {
            dispatch(addMessage({
                key: "update-skill",
                type: "error",
                content: "Cập nhật kỹ năng thất bại!"
            }))
        }
    };

    const filteredSkills = allSkills.filter(skill =>
        skill.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>Kỹ năng</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsModalVisible(true)}
                >
                    <MaterialIcons name="edit" size={24} color="#3b82f6" />
                </TouchableOpacity>
            </View>

            {skills.length === 0 ? (
                <Text style={styles.emptyText}>Chưa thêm kỹ năng</Text>
            ) : (
                <View style={styles.skillsContainer}>
                    {skills.map((skill, index) => (
                        <View key={index} style={styles.skillTag}>
                            <MaterialIcons name="code" size={16} color="#fff" />
                            <Text style={styles.skillText}>{skill.name}</Text>
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
                        <Text style={styles.modalTitle}>Chỉnh sửa kỹ năng</Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.cancelButton}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSave}>
                                <Text style={styles.saveButton}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm kỹ năng"
                        value={search}
                        onChangeText={setSearch}
                    />

                    <FlatList
                        data={filteredSkills}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.skillItem,
                                    selectedSkills.includes(item.value) && styles.selectedSkillItem
                                ]}
                                onPress={() => {
                                    setSelectedSkills(prev =>
                                        prev.includes(item.value)
                                            ? prev.filter(id => id !== item.value)
                                            : [...prev, item.value]
                                    );
                                }}
                            >
                                <Text style={styles.skillItemText}>{item.label}</Text>
                                {selectedSkills.includes(item.value) && (
                                    <MaterialIcons name="check" size={20} color="#10b981" />
                                )}
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.skillList}
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
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    skillTag: {
        flexDirection: 'row',
        backgroundColor: '#3b82f6',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignItems: 'center',
        gap: 4,
    },
    skillText: {
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
    searchInput: {
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    skillList: {
        paddingBottom: 20,
    },
    skillItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    selectedSkillItem: {
        backgroundColor: '#f0f9ff',
    },
    skillItemText: {
        fontSize: 16,
        color: '#1f2937',
    },
});