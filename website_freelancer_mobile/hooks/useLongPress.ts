import { useRef } from "react";

export const useLongPress = (
    onLongPress: () => void,
    delay: number = 500
) => {
    const timerRef = useRef<number | null>(null);

    const start = () => {
        timerRef.current = setTimeout(() => {
            onLongPress();
            timerRef.current = null;
        }, delay);
    };

    const stop = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    return {
        onResponderGrant: start,
        onResponderRelease: stop,
        onResponderTerminate: stop,
    };
};
