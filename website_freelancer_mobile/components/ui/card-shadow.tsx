// src/components/ui/card-shadow.tsx
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type CardShadowProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    styleBody?: StyleProp<ViewStyle>;
};

const CardShadow = ({
    children,
    style,
    styleBody,
}: CardShadowProps) => {
    return (
        <View style={[styles.cardContainer, style]}>
            <View style={[styles.cardBody, styleBody]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    cardBody: {
        padding: 16,
    },
});

export default CardShadow;