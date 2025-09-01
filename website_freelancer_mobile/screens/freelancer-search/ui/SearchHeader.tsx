// SearchHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchHeaderProps {
    onSearch: (filters: any) => void;
    filters: any;
}

const SearchHeader = ({ onSearch, filters }: SearchHeaderProps) => {
    const [keyword, setKeyword] = useState(filters.keyword);

    const handleKeywordSearch = () => {
        Keyboard.dismiss();
        onSearch({ ...filters, keyword, page: 0 });
    };

    return (
        <View style={{ flexGrow: 1 }}>
            <TextInput
                style={styles.input}
                placeholder="Tìm kiếm..."
                placeholderTextColor="#94a3b8"
                value={keyword}
                onChangeText={setKeyword}
                onSubmitEditing={handleKeywordSearch}
                returnKeyType="search"
            />
            <TouchableOpacity
                style={styles.searchButton}
                onPress={handleKeywordSearch}
            >
                <MaterialIcons name="search" size={24} color="#355a8e" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f1f5f9',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        fontSize: 15,
        color: '#334155',
    },
    searchButton: {
        position: 'absolute',
        right: 12,
        top: 10,
        zIndex: 1,
    },
    searchButtonText: {
        fontSize: 20,
        color: '#355a8e',
    },
});

export default SearchHeader;