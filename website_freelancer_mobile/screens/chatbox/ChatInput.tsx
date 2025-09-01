// components/chat/ChatInput.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface ChatInputProps {
    inputText: string;
    setInputText: (text: string) => void;
    handleSendMessage: () => void;
    showNewMsgBtn: boolean;
    scrollMessagesToBottom: (offset?: number) => void;
}

const ChatInput = ({
    inputText,
    setInputText,
    handleSendMessage,
    showNewMsgBtn,
    scrollMessagesToBottom,
}: ChatInputProps) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                setKeyboardVisible(true);
                setKeyboardHeight(e.endCoordinates.height);
            }
        );
        const hideSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
                setKeyboardHeight(0);
            }
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <View
            style={[
                styles.container,
                { paddingBottom: keyboardHeight > 0 ? keyboardHeight - 15 : 25 }
            ]}
        >
            {showNewMsgBtn && (
                <TouchableOpacity
                    style={[
                        styles.newMessageButton,
                        {
                            bottom: keyboardVisible
                                ? keyboardHeight + 10
                                : 50
                        }
                    ]}
                    onPress={() => scrollMessagesToBottom(0)}
                >
                    <Ionicons name="arrow-down" size={18} color="white" />
                    <Text style={styles.newMessageText}>Tin nhắn mới</Text>
                </TouchableOpacity>
            )}

            <View style={styles.inputContainer}>
                <TextInput
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Nhập tin nhắn..."
                    style={styles.input}
                    multiline
                    returnKeyType="default"
                    onFocus={() => scrollMessagesToBottom(100)}
                />

                <TouchableOpacity
                    onPress={handleSendMessage}
                    disabled={!inputText.trim()}
                    style={styles.sendButton}
                >
                    <Ionicons
                        name="send"
                        size={24}
                        color={inputText.trim() ? '#0084FF' : '#CCCCCC'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD',
        padding: 12,
        backgroundColor: 'white',
    },
    newMessageButton: {
        position: 'absolute',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0084FF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        zIndex: 10,
    },
    newMessageText: {
        color: 'white',
        fontSize: 14,
        marginLeft: 8,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 24,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        maxHeight: 100,
        paddingVertical: 12,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 8,
        padding: 8,
    },
});

export default ChatInput;