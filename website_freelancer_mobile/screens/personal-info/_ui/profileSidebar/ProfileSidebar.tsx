// screens/personal-info/_ui/profileSidebar/ProfileSidebar.tsx
import CardShadow from '@/components/ui/card-shadow';
import {
    AntDesign,
    Feather,
    FontAwesome,
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ProfileContext from '../ProfileContext';
import AvatarModal from './profileModals/AvatarModal';
import BioModal from './profileModals/BioModal';
import BirthdayPickerModal from './profileModals/BirthdayModal';
import EmailModal from './profileModals/EmailModal';
import FullNameModal from './profileModals/FullNameModal';
import GenderModal from './profileModals/GenderModal';
import PhoneModal from './profileModals/PhoneModal';

export default function ProfileSidebar({ data }: { data: Record<string, any> }) {
    const { reloadData } = useContext(ProfileContext);

    // Modal visibility states
    const [avatarModalVisible, setAvatarModalVisible] = useState(false);
    const [fullNameModalVisible, setFullNameModalVisible] = useState(false);
    const [bioModalVisible, setBioModalVisible] = useState(false);
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [birthdayModalVisible, setBirthdayModalVisible] = useState(false);

    return (
        <CardShadow style={styles.card}>
            <View style={styles.container}>
                {/* Avatar Section */}
                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={() => setAvatarModalVisible(true)}
                >
                    {data?.avatar ? (
                        <Image
                            source={{ uri: data.avatar }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={[styles.avatar, styles.avatarPlaceholder]}>
                            <AntDesign name="user" size={64} color="#ccc" />
                        </View>
                    )}
                </TouchableOpacity>

                <AvatarModal
                    visible={avatarModalVisible}
                    onCancel={() => setAvatarModalVisible(false)}
                    reloadData={reloadData}
                    currentAvatar={data?.avatar}
                />

                {/* Name Section */}
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{data?.fullName || 'Chưa có tên'}</Text>
                    <TouchableOpacity
                        onPress={() => setFullNameModalVisible(true)}
                        style={styles.editButton}
                    >
                        <Feather name="edit" size={20} color="#3b82f6" />
                    </TouchableOpacity>
                </View>

                <FullNameModal
                    visible={fullNameModalVisible}
                    onCancel={() => setFullNameModalVisible(false)}
                    initialValue={data?.fullName}
                    reloadData={reloadData}
                />

                {/* Role Section */}
                <Text style={styles.role}>
                    {data?.role === 'freelancer' ? 'Freelancer' : 'Nhà tuyển dụng'}
                </Text>

                {/* Reputation Section */}
                <View style={styles.reputationContainer}>
                    <View style={styles.reputationRow}>
                        <Text style={styles.reputationLabel}>Điểm uy tín</Text>
                        <Text style={styles.reputationValue}>{data?.reputation || 0}</Text>
                    </View>
                    <View style={styles.divider} />
                </View>

                {/* Basic Info Section */}
                <View style={styles.infoContainer}>
                    {/* Email Field */}
                    <View style={styles.infoField}>
                        <View style={styles.infoHeader}>
                            <View style={styles.infoTitle}>
                                <MaterialIcons name="email" size={18} color="#4b5563" />
                                <Text style={styles.infoLabel}>Email</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setEmailModalVisible(true)}
                                style={styles.editButton}
                            >
                                <Feather name="edit" size={18} color="#3b82f6" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.infoValue}>
                            {data?.email || 'Chưa có'}
                        </Text>
                    </View>

                    <EmailModal
                        visible={emailModalVisible}
                        onCancel={() => setEmailModalVisible(false)}
                        initialEmail={data?.email}
                        reloadData={reloadData}
                    />

                    {/* Phone Field */}
                    <View style={styles.infoField}>
                        <View style={styles.infoHeader}>
                            <View style={styles.infoTitle}>
                                <Feather name="phone" size={18} color="#4b5563" />
                                <Text style={styles.infoLabel}>Điện thoại</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setPhoneModalVisible(true)}
                                style={styles.editButton}
                            >
                                <Feather name="edit" size={18} color="#3b82f6" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.infoValue}>
                            {data?.phone || 'Chưa có'}
                        </Text>
                    </View>

                    <PhoneModal
                        visible={phoneModalVisible}
                        onCancel={() => setPhoneModalVisible(false)}
                        initialPhone={data?.phone}
                        reloadData={reloadData}
                    />

                    {/* Gender Field */}
                    <View style={styles.infoField}>
                        <View style={styles.infoHeader}>
                            <View style={styles.infoTitle}>
                                {data?.isMale ? (
                                    <FontAwesome name="male" size={20} color="#4b5563" />
                                ) : (
                                    <FontAwesome name="female" size={20} color="#4b5563" />
                                )}
                                <Text style={styles.infoLabel}>Giới tính</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setGenderModalVisible(true)}
                                style={styles.editButton}
                            >
                                <Feather name="edit" size={18} color="#3b82f6" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.infoValue}>
                            {data?.isMale ? 'Nam' : 'Nữ'}
                        </Text>
                    </View>

                    <GenderModal
                        visible={genderModalVisible}
                        onCancel={() => setGenderModalVisible(false)}
                        initialGender={data?.isMale}
                        reloadData={reloadData}
                    />

                    {/* Birthday Field */}
                    <View style={styles.infoField}>
                        <View style={styles.infoHeader}>
                            <View style={styles.infoTitle}>
                                <MaterialCommunityIcons name="cake-variant" size={18} color="#4b5563" />
                                <Text style={styles.infoLabel}>Ngày sinh</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setBirthdayModalVisible(true)}
                                style={styles.editButton}
                            >
                                <Feather name="edit" size={18} color="#3b82f6" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.infoValue}>
                            {data?.birthday ? dayjs(data.birthday, 'DD/MM/YYYY').format('DD/MM/YYYY') : 'Chưa có'}
                        </Text>
                    </View>

                    <BirthdayPickerModal
                        visible={birthdayModalVisible}
                        onCancel={() => setBirthdayModalVisible(false)}
                        initialBirthday={data?.birthday || ''}
                        reloadData={reloadData}
                    />

                    {/* Bio Section */}
                    <View style={styles.infoField}>
                        <View style={styles.infoHeader}>
                            <Text style={[styles.infoLabel, styles.bioLabel]}>Giới thiệu</Text>
                            <TouchableOpacity
                                onPress={() => setBioModalVisible(true)}
                                style={styles.editButton}
                            >
                                <Feather name="edit" size={18} color="#3b82f6" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.bioText}>
                            {data?.bio || 'Chưa có giới thiệu'}
                        </Text>
                    </View>

                    <BioModal
                        visible={bioModalVisible}
                        onCancel={() => setBioModalVisible(false)}
                        initialBio={data?.bio}
                        reloadData={reloadData}
                    />
                </View>
            </View>
        </CardShadow>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 16,
        marginBottom: 16,
        marginHorizontal: 'auto'
    },
    container: {
        alignItems: 'center',
        width: '100%',
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    avatarPlaceholder: {
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 8,
    },
    editButton: {
        padding: 4,
    },
    role: {
        color: '#6b7280',
        marginBottom: 16,
        fontSize: 16,
    },
    reputationContainer: {
        width: '100%',
        marginBottom: 16,
    },
    reputationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    reputationLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4b5563',
    },
    reputationValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4b5563',
    },
    divider: {
        height: 4,
        backgroundColor: '#1e3a8a',
        borderRadius: 2,
        marginTop: 4,
    },
    infoContainer: {
        width: '100%',
    },
    infoField: {
        marginBottom: 20,
    },
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    infoTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#374151',
        marginLeft: 8,
    },
    bioLabel: {
        marginLeft: 0,
    },
    infoValue: {
        color: '#374151',
        fontSize: 16,
        marginTop: 2,
    },
    bioText: {
        color: '#6b7280',
        fontSize: 14,
        marginTop: 4,
        lineHeight: 20,
    },
});