// JobActionsDropdown.tsx
import { useAuthorization } from '@/hooks/useAuthorization';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { JobListing } from '../types';
import { getActionItems } from './ActionItems';
import { useModal } from './ModalProvider';
import { useJobActions } from './useJobActions';

interface JobActionsDropdownProps {
    job: JobListing;
    onRefresh: () => void;
}

export const JobActionsDropdown = ({ job, onRefresh }: JobActionsDropdownProps) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { role } = useAuthorization();
    const { showConfirmModal } = useModal();
    const jobActions = useJobActions();

    if (!role) return null;

    const items = getActionItems(
        job,
        role,
        onRefresh,
        showConfirmModal,
        jobActions
    );

    if (items.length === 0) return null;

    const handleActionPress = (item: any) => {
        setMenuVisible(false);
        item.onPress();
    };

    return (
        <>
            <TouchableOpacity
                style={[styles.button, menuVisible && styles.buttonActive]}
                activeOpacity={0.7}
                onPress={() => setMenuVisible(true)}
            >
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>⋯</Text>
                </View>
            </TouchableOpacity>

            {menuVisible && (
                <View style={styles.menuBackdrop} onTouchEnd={() => setMenuVisible(false)}>
                    <View style={styles.menuContainer}>
                        {items.map((item: any) => (
                            <TouchableOpacity
                                key={item.key}
                                style={[styles.menuItem, item.isDanger && styles.dangerItem]}
                                onPress={() => handleActionPress(item)}
                            >
                                <Text style={[styles.menuItemText, item.isDanger && styles.dangerText]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: '#bae6fd',
    },
    iconContainer: {
        transform: [{ rotate: '90deg' }],
    },
    icon: {
        fontSize: 24,
        color: '#3b82f6',
        marginTop: -4,
    },
    menuBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 99,
    },
    menuContainer: {
        position: 'absolute',
        top: 45,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        minWidth: 180,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        zIndex: 100,
    },
    menuItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    menuItemText: {
        fontSize: 16,
        color: '#1e293b',
    },
    dangerItem: {
        backgroundColor: '#fff1f2',
    },
    dangerText: {
        color: '#e11d48',
    },
});