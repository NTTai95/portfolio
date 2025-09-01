// components/ui/InputCustom.tsx
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputCustomProps {
    label?: string;
    placeholder?: string;
    onChangeText: (text: string) => void;
    value: string;
    error: string;
    containerStyle?: any;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    returnKeyType?: 'done' | 'next' | 'go' | 'search';
    onSubmitEditing?: () => void;
    onFocus?: () => void;
    leftIcon?: React.ReactNode;
}

const InputCustom = ({
    label,
    placeholder,
    onChangeText,
    value,
    error,
    containerStyle,
    autoCapitalize = 'none',
    keyboardType = 'default',
    returnKeyType = 'next',
    onSubmitEditing,
    leftIcon
}: InputCustomProps) => {
    return (
        <View style={containerStyle}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                error ? styles.inputError : {}
            ]}>
                {leftIcon && (
                    <View style={styles.iconContainer}>
                        {leftIcon}
                    </View>
                )}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#a0aec0"
                    onChangeText={onChangeText}
                    value={value}
                    style={styles.input}
                    autoCapitalize={autoCapitalize}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default InputCustom;

const styles = StyleSheet.create({
    label: {
        marginBottom: 8,
        fontWeight: '500',
        color: '#2d3748',
        fontSize: 14,
        fontFamily: 'Inter-Medium',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 12,
        backgroundColor: '#f8fafc',
        height: 52,
    },
    inputFocused: {
        borderColor: '#6e3bff',
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#6e3bff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    inputError: {
        borderColor: '#e53e3e',
    },
    iconContainer: {
        paddingLeft: 16,
        paddingRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        paddingRight: 16,
        fontSize: 15,
        color: '#2d3748',
        fontFamily: 'Inter-Regular',
    },
    errorText: {
        color: '#e53e3e',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
        fontFamily: 'Inter-Regular',
    },
});