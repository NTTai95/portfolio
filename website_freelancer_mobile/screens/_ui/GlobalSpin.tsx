// app_ui/GlobalSpin.tsx
import type { RootState } from '@/store';
import { hideSpin } from '@/store/volatile/spinSlice';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    BackHandler,
    Easing,
    Modal,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Tính toán kích thước spinner
const getSize = (size: 'small' | 'default' | 'large' | number | undefined): number => {
    if (typeof size === 'number') return size;
    switch (size) {
        case 'small': return 24;
        case 'large': return 64;
        default: return 48;
    }
};

const GlobalSpin = () => {
    const spin = useSelector((state: RootState) => state.volatile.spin);
    const dispatch = useDispatch();
    const [simulatedPercent, setSimulatedPercent] = useState(0);
    const intervalRef: React.RefObject<number | null> = useRef(null);
    const startTimeRef = useRef<number | null>(null);
    const targetTimeRef = useRef<number>(0);
    const rotation = useRef(new Animated.Value(0)).current;

    // Hiệu ứng xoay spinner
    useEffect(() => {
        if (spin.spinning) {
            Animated.loop(
                Animated.timing(rotation, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true
                })
            ).start();
        } else {
            rotation.setValue(0);
        }
    }, [spin.spinning]);

    // Xử lý nút back trên Android
    useEffect(() => {
        if (spin.preventLeave) {
            const backAction = () => true;
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );
            return () => backHandler.remove();
        }
    }, [spin.preventLeave]);

    // Xử lý timeout tự động ẩn spinner
    useEffect(() => {
        let timeoutId: number | null = null;
        if (spin.time && spin.spinning) {
            timeoutId = setTimeout(() => {
                dispatch(hideSpin());
            }, spin.time);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [spin.time, spin.spinning, dispatch]);

    // Tính toán thời gian load
    const calculateLoadTime = (sizeMB: number = 0): number => {
        const baseTime = 2000;
        const baseSize = 100;
        return Math.max(2000, (sizeMB / baseSize) * baseTime);
    };

    // Giả lập tiến trình upload
    useEffect(() => {
        if (spin.spinning && spin.percent === 'auto' && spin.preventLeave) {
            targetTimeRef.current = calculateLoadTime(spin.sizeFile);
            startTimeRef.current = Date.now();

            const updateProgress = () => {
                if (!startTimeRef.current) return;

                const elapsed = Date.now() - startTimeRef.current;
                const progress = Math.min(90, (elapsed / targetTimeRef.current) * 90);
                setSimulatedPercent(Math.round(progress));

                if (progress < 90) {
                    intervalRef.current = setTimeout(updateProgress, 100);
                }
            };

            intervalRef.current = setTimeout(updateProgress, 100);
        } else {
            setSimulatedPercent(0);
            startTimeRef.current = null;
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
        };
    }, [spin.spinning, spin.percent, spin.preventLeave, spin.sizeFile]);

    // Tính toán phần trăm hiển thị
    const displayPercent = spin.percent === 'auto' ? simulatedPercent : spin.percent;
    const spinSize = getSize(spin.size);

    // Tạo hiệu ứng xoay
    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <Modal
            visible={spin.spinning}
            transparent={true}
            animationType="fade"
            onRequestClose={() => !spin.preventLeave && dispatch(hideSpin())}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Spinner/Progress */}
                    {spin.preventLeave || displayPercent !== undefined ? (
                        <View style={styles.uploadContainer}>
                            <Animated.View style={{ transform: [{ rotate }] }}>
                                <AntDesign
                                    name="clouduploado"
                                    size={spinSize * 0.5}
                                    color="#3069DE"
                                />
                            </Animated.View>

                            <Text style={styles.percentText}>
                                {displayPercent !== undefined
                                    ? `Đang tải lên: ${displayPercent}%`
                                    : 'Đang xử lý...'}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.spinnerContainer}>
                            <ActivityIndicator size="large" color="#3069DE" />
                        </View>
                    )}

                    {/* Cảnh báo không thoát trình duyệt */}
                    {spin.preventLeave && (
                        <View style={styles.warningContainer}>
                            <AntDesign name="warning" size={16} color="#E67C00" />
                            <Text style={styles.warningText}>
                                Vui lòng không thoát trình duyệt trong khi upload
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(230, 240, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 200,
        ...Platform.select({
            android: {
                elevation: 5,
            },
        }),
    },
    spinnerContainer: {
        padding: 20,
    },
    uploadContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    percentText: {
        marginTop: 16,
        fontSize: 16,
        color: '#3069DE',
        fontWeight: '500',
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF4E5',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    warningText: {
        marginLeft: 8,
        color: '#E67C00',
        fontSize: 14,
    },
});

export default GlobalSpin;