import useChatWebSocket from "@/hooks/useChat";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import DateSeparator from "./DateSeparator";
import MessageItem from "./MessageItem";
import { parseDate } from "./utils";

const ChatContent = () => {
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const route = useRoute<RouteProp<RootStackParamList, 'chatbox'>>();
    const receiverId = route.params.receiverId;
    const { receiver, messages, sendMessage, moreHistory, handleRecall } = useChatWebSocket(receiverId as number, setIsLoadingHistory);
    const [inputText, setInputText] = useState("");
    const [isInitialScrollDone, setIsInitialScrollDone] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showNewMsgBtn, setShowNewMsgBtn] = useState(false);
    const [isMoreHistory, setIsMoreHistory] = useState(false);
    const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
    const [previousContentHeight, setPreviousContentHeight] = useState(0);

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        setIsInitialScrollDone(false);
    }, [receiver]);

    const messagesWithMeta = useMemo(() => {
        if (!messages || messages.length === 0) return [];

        let prevDate: Date | null = null;
        let prevSenderId: number | null = null;

        return messages.map((msg, index) => {
            const currentDate = parseDate(msg.timestamp);
            const isFirstOfDay = !prevDate ||
                prevDate.getDate() !== currentDate.getDate() ||
                prevDate.getMonth() !== currentDate.getMonth() ||
                prevDate.getFullYear() !== currentDate.getFullYear();

            let minutesDiff = 0;
            if (prevDate) {
                minutesDiff = (currentDate.getTime() - prevDate.getTime()) / (1000 * 60);
            }

            const isLastOfSender = index === messages.length - 1 ||
                messages[index + 1].senderId !== msg.senderId;

            const showTime = isLastOfSender || minutesDiff > 10;

            prevDate = currentDate;
            prevSenderId = msg.senderId;

            return {
                ...msg,
                date: currentDate,
                showDate: isFirstOfDay,
                showTime,
                isLastOfSender,
            };
        });
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        sendMessage(inputText.trim());
        setInputText("");
    };

    const scrollToBottom = (animated = true) => {
        scrollViewRef.current?.scrollToEnd({ animated });
    };

    useEffect(() => {
        const shouldScrollToBottom =
            (!isInitialScrollDone && messages.length > 0) ||
            (isAtBottom && messages.length > 0);

        if (shouldScrollToBottom) {
            setTimeout(() => {
                scrollToBottom();
            }, 100);

            setTimeout(() => {
                setIsInitialScrollDone(true)
            }, 1000);
            setShowNewMsgBtn(false);
            console.log("scroll to bottom");
        } else if (!isAtBottom && !isMoreHistory) {
            setShowNewMsgBtn(true);
        } else {
            setIsMoreHistory(false);
        }
    }, [messages]);

    useEffect(() => {
        setIsLoadingHistory(false);
    }, [messages]);

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;

        const distance = contentHeight - offsetY - layoutHeight;
        const atBottom = distance < 20;
        setIsAtBottom(atBottom);
        if (atBottom) setShowNewMsgBtn(false);

        const nearTop = offsetY <= 100;
        if (nearTop && !isLoadingHistory && moreHistory && isInitialScrollDone) {
            setPreviousScrollPosition(offsetY);
            setPreviousContentHeight(contentHeight);
            setIsLoadingHistory(true);
            setIsMoreHistory(true);
            moreHistory();
        }
    };

    const onContentSizeChange = (width: number, height: number) => {
        if (isLoadingHistory) {
            const addedHeight = height - previousContentHeight;
            scrollViewRef.current?.scrollTo({ y: previousScrollPosition + addedHeight, animated: false });
        }
    };

    return (
        <View style={styles.container}>
            <ChatHeader receiverId={receiverId} receiver={receiver} />

            <View style={styles.messagesContainer}>
                <ScrollView
                    ref={scrollViewRef}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollContent}
                    onContentSizeChange={onContentSizeChange}
                >
                    {isLoadingHistory && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#999" />
                            <Text style={styles.loadingText}>Đang tải tin nhắn cũ...</Text>
                        </View>
                    )}

                    {messagesWithMeta.map((msg) => {
                        const isReceiver = msg.senderId === receiverId;
                        return (
                            <View key={msg.id.toString()}>
                                {msg.showDate && <DateSeparator date={msg.date} />}
                                <MessageItem
                                    msg={msg}
                                    isReceiver={isReceiver}
                                    receiverAvatar={receiver?.avatar}
                                    onRecall={handleRecall}
                                />
                            </View>
                        );
                    })}
                </ScrollView>
            </View>

            <ChatInput
                inputText={inputText}
                setInputText={setInputText}
                handleSendMessage={handleSendMessage}
                showNewMsgBtn={showNewMsgBtn}
                scrollMessagesToBottom={() => scrollToBottom(true)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    messagesContainer: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollContent: {
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    loadingText: {
        marginLeft: 8,
        color: '#666',
        fontSize: 14,
    },
});

export default ChatContent;