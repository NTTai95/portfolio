import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatTimeDisplay } from './utils';

interface MessageContentProps {
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
}

const MessageContent = ({ msg, isReceiver }: MessageContentProps) => {
    return (
        <View
            style={[
                styles.bubble,
                isReceiver ? styles.receiverBubble : styles.senderBubble,
                msg.recall && styles.recalledBubble,
                !msg.isLastOfSender && styles.lastOfSenderBubble,
            ]}
        >
            {msg.recall ? (
                <Text style={styles.recalledText}>Tin nhắn đã được thu hồi</Text>
            ) : (
                <>
                    <Text style={isReceiver ? styles.receiverText : styles.senderText}>{msg.content}</Text>
                    {msg.showTime && (
                        <View
                            style={[styles.timeContainer, isReceiver ? styles.receiverTime : styles.senderTime]}
                        >
                            <Text
                                style={isReceiver ? styles.receiverTimeText : styles.senderTimeText}
                            >
                                {formatTimeDisplay(msg.date)}
                            </Text>
                            {!isReceiver && msg.read && <Text style={styles.readIcon}>✓✓</Text>}
                        </View>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    lastOfSenderBubble: {
        marginLeft: 30,
    },
    bubble: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 18,
    },
    receiverBubble: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 4,
        alignItems:'flex-start'
    },
    senderBubble: {
        backgroundColor: '#0084FF',
        borderTopRightRadius: 4,
        alignItems:'flex-end'
    },
    recalledBubble: {
        backgroundColor: '#ddddddff',
    },
    receiverText: {
        color: '#000000ff',
        fontSize: 16,
    },
    senderText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    recalledText: {
        color: '#767676ff',
        fontStyle: 'italic',
        fontSize: 14,
    },
    timeContainer: {
        flexDirection: 'row',
        marginTop: 4,
    },
    receiverTime: {
        justifyContent: 'flex-start',
    },
    senderTime: {
        justifyContent: 'flex-end',
    },
    receiverTimeText: {
        color: '#666666',
        fontSize: 12,
    },
    senderTimeText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    readIcon: {
        marginLeft: 4,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
});

export default MessageContent;