// components/ui/InputPassword.tsx
import { Ionicons } from "@expo/vector-icons";
import { forwardRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface InputPasswordProps {
    label?: string;
    placeholder?: string;
    onChangeText: (text: string) => void;
    value: string;
    error: string;
    containerStyle?: any;
    leftIcon?: React.ReactNode;
}

const InputPassword = forwardRef<TextInput, InputPasswordProps>(
    ({ label, placeholder, onChangeText, value, error, containerStyle, leftIcon }, ref) => {
        const [secure, setSecure] = useState(true);

        return (
            <View style={[containerStyle]}>
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
                        ref={ref}
                        placeholder={placeholder}
                        placeholderTextColor="#a0aec0"
                        onChangeText={onChangeText}
                        value={value}
                        secureTextEntry={secure}
                        style={styles.input}
                    />
                    <TouchableOpacity
                        onPress={() => setSecure(!secure)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={secure ? "eye-off" : "eye"}
                            size={20}
                            color={'#cbd5e0'}
                        />
                    </TouchableOpacity>
                </View>
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    });

export default InputPassword;

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
    eyeIcon: {
        padding: 14,
    },
    errorText: {
        color: '#e53e3e',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
        fontFamily: 'Inter-Regular',
    },
});