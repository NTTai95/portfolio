import { useLongPress } from '@/hooks/useLongPress';
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode, useState } from 'react';
import {
    Clipboard,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MessageContent from './MessageContent';
import { formatTimeDisplay } from './utils';

interface MessageItemProps {
    msg: {
        id: number;
        senderId: number;
        content: string;
        date: Date;
        showTime: boolean;
        isLastOfSender: boolean;
        read?: boolean;
        recall?: boolean;
    };
    isReceiver: boolean;
    receiverAvatar?: string;
    onRecall?: (messageId: number) => void;
}

const MessageItem = ({ msg, isReceiver, receiverAvatar, onRecall }: MessageItemProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const isOwnMessage = !isReceiver;
    const isRecalled = msg.recall;
    const longPressHandlers = useLongPress(() => {
        setIsModalVisible(true);
    }, 300);

    return (
        <View
            style={[
                styles.container,
                isReceiver ? styles.receiverContainer : styles.senderContainer,
            ]}
            {...longPressHandlers}
            onStartShouldSetResponder={() => true}
        >
            {isReceiver && msg.isLastOfSender && (
                receiverAvatar ? (
                    <Image source={{ uri: receiverAvatar }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.defaultAvatar]}>
                        <Text style={styles.avatarText}>{msg.senderId.toString().charAt(0)}</Text>
                    </View>
                )
            )}

            <View>
                <MessageContent msg={msg} isReceiver={isReceiver} />
            </View>

            {isReceiver && !msg.isLastOfSender && <View style={styles.placeholder} />}

            {/* Modal hiển thị chi tiết tin nhắn */}
            <Modal
                transparent
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsModalVisible(false)}
                >
                    <View style={[
                        styles.modalContainer,
                        isReceiver ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }
                    ]}
                    >
                        <View style={styles.modalContent}>
                            <Text style={[styles.modalText, isRecalled && styles.recalledText, !isReceiver && { textAlign: 'right' }]}>
                                {isRecalled ? 'Tin nhắn đã được thu hồi' : msg.content}
                            </Text>
                            <View style={styles.metadata}>
                                <Text style={styles.value}>{formatTimeDisplay(msg.date)}</Text>
                                {isOwnMessage && (
                                    <View style={styles.metadata}>
                                        <Text style={[styles.value, { color: msg.read ? 'green' : 'black' }]}>
                                            {msg.read ? 'Đã xem' : 'Đã nhận'}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>

                    {!isRecalled && (
                        <View style={[
                            styles.actions,
                            isReceiver ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }
                        ]}>
                            <ButtonAction
                                label='Sao chép'
                                textColor='#2986cc'
                                icon={<Ionicons name="copy-outline" size={20} color="#2986cc" />}
                                onPress={() => {
                                    Clipboard.setString(msg.content);
                                    setIsModalVisible(false);
                                }}
                            />
                            {isOwnMessage && (
                                <ButtonAction
                                    label='Thu hồi'
                                    textColor='#f44336'
                                    icon={<Ionicons name="reload" size={20} color="#f44336" />}
                                    onPress={() => {
                                        onRecall && onRecall(msg.id);
                                        setIsModalVisible(false);
                                    }}
                                />
                            )}
                        </View>
                    )}
                </TouchableOpacity>
            </Modal>
        </View >
    );
};

const ButtonAction = ({ label, icon, textColor = '#000', onPress }: { label: string, icon: ReactNode, textColor?: string, onPress: () => void }) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', gap: 5 }} onPress={onPress}>
            {icon}
            <Text style={[{ fontSize: 12, color: textColor }]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    modalContentWrapper: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 8,
        maxWidth: '80%',
        alignSelf: 'flex-start',
    },
    receiverContainer: {
        alignSelf: 'flex-start',
    },
    senderContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    defaultAvatar: {
        backgroundColor: '#87d068',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 12,
    },
    placeholder: {
        width: 24,
        marginRight: 8,
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 15,
        maxWidth: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 99
    },
    modalContent: {
        width: '100%',
    },
    modalText: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 5,
        maxHeight: 300
    },
    recalledText: {
        fontStyle: 'italic',
        color: '#888888',
    },
    metadata: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
    },
    label: {
        fontWeight: 'bold',
        color: '#333333',
    },
    value: {
        opacity: 0.8,
        fontSize: 11
    },
    actions: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 10,
        gap: 20
    },
});

export default MessageItem;