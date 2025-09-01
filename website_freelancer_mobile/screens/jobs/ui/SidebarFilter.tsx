// screens/jobs/ui/SidebarFilter.tsx
import { apiFilterJob, FilterMap } from "@/api/filter";
import { RequestPage } from "@/types/requests/page";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

interface SidebarFilterProps {
    filters: RequestPage.Job & {
        skillIds?: number[];
        minBudget?: number;
        maxBudget?: number;
        maxDurationHours?: number;
    };
    onFilterChange: (newFilters: Partial<RequestPage.Job>) => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
    filters,
    onFilterChange
}) => {
    const [skillsList, setSkillsList] = useState<{ label: string; value: number }[]>([]);
    const [majorList, setMajorList] = useState<{ label: string; value: number }[]>([]);
    const [activeTab, setActiveTab] = useState('major');

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const res = await apiFilterJob();
                const filterData: FilterMap = res.data;

                // Sửa: Kiểm tra dữ liệu trước khi map
                setSkillsList(
                    filterData["skillIds"]?.map(s => ({
                        label: `${s.label} (${s.count})`,
                        value: Number(s.value),
                    })) || []
                );

                setMajorList(
                    filterData["majorId"]?.map(m => ({
                        label: `${m.label} (${m.count})`,
                        value: Number(m.value),
                    })) || []
                );
            } catch (error) {
                console.error("❌ Lỗi gọi API Filter Job:", error);
            }
        };

        fetchFilterData();
    }, []);

    const budgetPresets = [
        { label: "Tất cả", value: "all", range: [0, 100000000] },
        { label: "Dưới 5 triệu", value: "below5", range: [0, 5000000] },
        { label: "5 - 10 triệu", value: "5to10", range: [5000000, 10000000] },
        { label: "10 - 20 triệu", value: "10to20", range: [10000000, 20000000] },
        { label: "20 - 50 triệu", value: "20to50", range: [20000000, 50000000] },
        { label: "50 - 100 triệu", value: "50to100", range: [50000000, 100000000] },
    ];

    // Lấy giá trị hiện tại từ filters
    const selectedSkills = filters.skillIds || [];
    const selectedMajor = filters.majorId;
    const durationHours = filters.maxDurationHours || 8760;
    const minBudget = filters.minBudget || 0;
    const maxBudget = filters.maxBudget || 100000000;

    // Tìm preset budget hiện tại
    const findBudgetPreset = () => {
        for (const preset of budgetPresets) {
            if (minBudget >= preset.range[0] && maxBudget <= preset.range[1]) {
                return preset.value;
            }
        }
        return null;
    };
    const currentBudgetPreset = findBudgetPreset();

    // Hàm xử lý thay đổi filter
    const handleSkillChange = (skillId: number) => {
        const currentSkills = filters.skillIds || [];
        const newSkills = currentSkills.includes(skillId)
            ? currentSkills.filter(id => id !== skillId)
            : [...currentSkills, skillId];

        onFilterChange({ skillIds: newSkills });
    };

    const handleMajorChange = (value: number) => {
        onFilterChange({ majorId: value });
    };

    // Sửa: Hàm xử lý budget preset
    const handleBudgetPresetChange = (value: string) => {
        const preset = budgetPresets.find(p => p.value === value);
        if (preset) {
            onFilterChange({
                minBudget: preset.range[0],
                maxBudget: preset.range[1]
            });
        } else if (value === "all") {
            // Xử lý trường hợp "Tất cả"
            onFilterChange({
                minBudget: undefined,
                maxBudget: undefined
            });
        }
    };

    // Sửa: Xử lý nhập budget thủ công
    const handleBudgetInputChange = (index: 0 | 1, value: string) => {
        const numericValue = parseInt(value.replace(/\D/g, "")) || 0;

        // Sửa: Cập nhật cả min và max cùng lúc
        const newMin = index === 0 ? numericValue : minBudget;
        const newMax = index === 1 ? numericValue : maxBudget;

        onFilterChange({
            minBudget: newMin,
            maxBudget: newMax
        });
    };

    // Sửa: Format currency không hiển thị "đ" trong input
    const formatCurrencyInput = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleDurationChange = (value: string) => {
        const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
        const clampedValue = Math.min(Math.max(numericValue, 1), 8760);
        onFilterChange({ maxDurationHours: clampedValue });
    };

    // Render functions
    const renderMajorTab = () => (
        <View style={styles.tabContent}>
            <Text style={styles.title}>Chọn chuyên ngành</Text>
            <View style={styles.majorList}>
                {majorList.map(item => (
                    <TouchableOpacity
                        key={item.value}
                        style={[
                            styles.majorItem,
                            selectedMajor === item.value && styles.majorItemActive
                        ]}
                        onPress={() => handleMajorChange(item.value)}
                    >
                        <Text
                            style={[
                                styles.majorText,
                                selectedMajor === item.value && styles.majorTextActive
                            ]}
                        >
                            {item.label}
                        </Text>
                        {selectedMajor === item.value && (
                            <MaterialIcons
                                name="check"
                                size={20}
                                color="#1d4ed8"
                                style={styles.checkIcon}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderSkillsTab = () => (
        <View style={styles.tabContent}>
            <Text style={styles.title}>Chọn kỹ năng</Text>
            <View style={styles.skillsGrid}>
                {skillsList.map((item) => (
                    <TouchableOpacity
                        key={item.value}
                        style={[
                            styles.skillButton,
                            selectedSkills.includes(item.value) && styles.skillButtonActive
                        ]}
                        onPress={() => handleSkillChange(item.value)}
                    >
                        <Text
                            style={[
                                styles.skillButtonText,
                                selectedSkills.includes(item.value) && styles.skillButtonTextActive
                            ]}
                        >
                            {item.label}
                        </Text>
                        {selectedSkills.includes(item.value) && (
                            <View style={styles.checkBadge}>
                                <MaterialIcons name="check" size={14} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderTimeTab = () => (
        <View style={styles.tabContent}>
            <Text style={styles.title}>Thời gian làm việc tối đa (giờ)</Text>
            <TextInput
                style={styles.input}
                value={durationHours.toString()}
                onChangeText={handleDurationChange}
                keyboardType="numeric"
                placeholder="Nhập số giờ tối đa"
            />
            <Text style={styles.note}>
                Tối đa 8760 giờ (tương đương 1 năm làm việc)
            </Text>
        </View>
    );

    const renderBudgetTab = () => (
        <View style={styles.tabContent}>
            <Text style={styles.title}>Khoảng ngân sách</Text>
            <View style={styles.budgetPresets}>
                {budgetPresets.map((preset) => (
                    <TouchableOpacity
                        key={preset.value}
                        style={[
                            styles.presetButton,
                            currentBudgetPreset === preset.value && styles.presetButtonActive,
                        ]}
                        onPress={() => handleBudgetPresetChange(preset.value)}
                    >
                        <Text
                            style={[
                                styles.presetText,
                                currentBudgetPreset === preset.value && styles.presetTextActive,
                            ]}
                        >
                            {preset.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.subtitle}>Hoặc nhập khoảng giá:</Text>
            <View style={styles.budgetInputs}>
                <View style={styles.budgetInputItem}>
                    <Text style={styles.rangeLabel}>Từ:</Text>
                    <TextInput
                        style={styles.currencyInput}
                        value={formatCurrencyInput(minBudget)}
                        onChangeText={(val) => handleBudgetInputChange(0, val)}
                        keyboardType="numeric"
                        placeholder="0"
                    />
                </View>
                <View style={styles.budgetInputItem}>
                    <Text style={styles.rangeLabel}>Đến:</Text>
                    <TextInput
                        style={styles.currencyInput}
                        value={formatCurrencyInput(maxBudget)}
                        onChangeText={(val) => handleBudgetInputChange(1, val)}
                        keyboardType="numeric"
                        placeholder="100,000,000"
                    />
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'major' && styles.activeTab]}
                    onPress={() => setActiveTab('major')}
                >
                    <Text style={[styles.tabText, activeTab === 'major' && styles.activeTabText]}>
                        Chuyên ngành
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'skills' && styles.activeTab]}
                    onPress={() => setActiveTab('skills')}
                >
                    <Text style={[styles.tabText, activeTab === 'skills' && styles.activeTabText]}>
                        Kỹ năng
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'time' && styles.activeTab]}
                    onPress={() => setActiveTab('time')}
                >
                    <Text style={[styles.tabText, activeTab === 'time' && styles.activeTabText]}>
                        Thời gian
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'budget' && styles.activeTab]}
                    onPress={() => setActiveTab('budget')}
                >
                    <Text style={[styles.tabText, activeTab === 'budget' && styles.activeTabText]}>
                        Ngân sách
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Tab Content */}
            <ScrollView
                style={styles.contentContainer}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.filterSection}>
                    {activeTab === 'major' && renderMajorTab()}
                    {activeTab === 'skills' && renderSkillsTab()}
                    {activeTab === 'time' && renderTimeTab()}
                    {activeTab === 'budget' && renderBudgetTab()}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#3b82f6',
    },
    tabText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6b7280',
    },
    activeTabText: {
        color: '#3b82f6',
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    scrollContent: {
        paddingBottom: 32,
        paddingHorizontal: 8,
    },
    tabContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 16,
        color: "#1f2937"
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 12,
        color: '#4b5563',
    },
    note: {
        fontSize: 12,
        color: '#6b7280',
        fontStyle: 'italic',
        marginTop: 8,
    },
    majorList: {
        marginTop: 8,
    },
    majorItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    majorItemActive: {
        backgroundColor: '#eff6ff',
        borderLeftWidth: 3,
        borderLeftColor: '#3b82f6',
        borderRightWidth: 1,
        borderRightColor: '#dbeafe',
    },
    majorText: {
        fontSize: 15,
        color: '#4b5563',
    },
    majorTextActive: {
        color: '#1d4ed8',
        fontWeight: '600',
    },
    checkIcon: {},
    skillsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
    skillButton: {
        width: '48%',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: "#f3f4f6",
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#e5e7eb',
        position: 'relative',
    },
    skillButtonActive: {
        backgroundColor: "#3b82f6",
        borderColor: '#2563eb',
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    checkBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#10b981',
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skillButtonText: {
        fontSize: 14,
        color: "#4b5563",
        textAlign: 'center',
    },
    skillButtonTextActive: {
        color: "#ffffff",
        fontWeight: '600',
    },
    input: {
        height: 46,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingHorizontal: 14,
        marginBottom: 16,
        color: "#1f2937",
        fontSize: 15,
    },
    sliderLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },
    label: {
        fontSize: 12,
        color: "#6b7280"
    },
    budgetPresets: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    presetButton: {
        width: "48%",
        padding: 12,
        marginBottom: 12,
        backgroundColor: "#f3f4f6",
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    presetButtonActive: {
        backgroundColor: "#f59e0b",
        borderColor: "#d97706",
        shadowColor: '#f59e0b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    presetText: {
        fontSize: 14,
        color: "#4b5563"
    },
    presetTextActive: {
        color: "#ffffff",
        fontWeight: "600"
    },
    budgetInputs: {
        flexDirection: "column",
        gap: 8,
        marginBottom: 16,
    },
    rangeSeparator: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: "bold",
        color: "#f59e0b",
        minWidth: 40,
    },
    filterSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    separator: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 16,
    },
    budgetInputItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    rangeLabel: {
        width: 50,
        fontSize: 14,
        color: '#4b5563',
    },
    currencyInput: {
        flex: 1,
        height: 46,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingHorizontal: 14,
        color: "#1f2937",
        fontSize: 15,
    },
});

export default SidebarFilter;