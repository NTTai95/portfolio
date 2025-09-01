import { apiDelete, apiPost, apiPut } from '@/api/baseApi';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { hideSpin, showSpin } from '@/store/volatile/spinSlice';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ProfileContext from '../ProfileContext';
import CertificationModal from './CertificationModal';
import CertificationList from './CertificationsList';
import { Certification } from './types';

interface CertificationsSectionProps {
    certifications: Certification[];
}

const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCert, setEditingCert] = useState<Certification | null>(null);
    const [loading, setLoading] = useState(false);
    const [frontImage, setFrontImage] = useState<string | undefined>();
    const [backImage, setBackImage] = useState<string | undefined>();
    const { reloadData } = useContext(ProfileContext);
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        name: '',
        issueBy: '',
        issueDate: '',
        expiryDate: '',
        link: '',
    });

    const showAddModal = () => {
        setEditingCert(null);
        setFrontImage(undefined);
        setBackImage(undefined);
        setFormData({
            name: '',
            issueBy: '',
            issueDate: '',
            expiryDate: '',
            link: '',
        });
        setIsModalVisible(true);
    };

    const showEditModal = (cert: Certification) => {
        setEditingCert(cert);
        setFrontImage(cert.frontImage);
        setBackImage(cert.backImage);
        setFormData({
            name: cert.name,
            issueBy: cert.issueBy,
            issueDate: cert.issueDate ? dayjs(cert.issueDate, 'DD/MM/YYYY').format('DD/MM/YYYY') : '',
            expiryDate: cert.expiryDate ? dayjs(cert.expiryDate, 'DD/MM/YYYY').format('DD/MM/YYYY') : '',
            link: cert.link || '',
        });
        setIsModalVisible(true);
    };

    const handleImageChange = async (base64: string, isFront: boolean) => {
        if (isFront) {
            setFrontImage(base64);
        } else {
            setBackImage(base64);
        }
    };

    const handleRemoveImage = (isFront: boolean) => {
        if (isFront) {
            setFrontImage(undefined);
        } else {
            setBackImage(undefined);
        }
    };

    const handleSubmit = async () => {
        dispatch(showSpin());
        setLoading(true);
        const payload: any = {
            name: formData.name,
            issueBy: formData.issueBy,
            issueDate: formData.issueDate,
            expiryDate: formData.expiryDate || null,
            link: formData.link || null,
        };

        // Add base64 images to payload
        if (frontImage) payload.frontImage = frontImage;
        if (backImage) payload.backImage = backImage;

        // For editing, set image to null if removed
        if (editingCert) {
            if (frontImage === undefined) payload.frontImage = null;
            if (backImage === undefined) payload.backImage = null;
        }

        try {
            if (editingCert) {
                payload.id = editingCert.id;
                await apiPut(`profile/certification/${editingCert.id}`, payload);
                dispatch(addMessage({
                    content: 'Cập nhật chứng chỉ thành công',
                    type: 'success',
                    key: "certification-update"
                }));
            } else {
                await apiPost('profile/certification', payload);
                dispatch(addMessage({
                    content: 'Thêm chứng chỉ thành công',
                    type: 'success',
                    key: "certification-add"
                }));
            }

            setIsModalVisible(false);
            reloadData();
        } catch (error: any) {
            console.error('Error saving certification:', error);
            dispatch(addMessage({
                content: error?.data?.message || 'Đã xảy ra lỗi khi lưu chứng chỉ',
                type: 'error',
                key: "certification-add"
            }));
        } finally {
            setLoading(false);
            dispatch(hideSpin());
        }
    };

    const handleDelete = async (id: number) => {
        dispatch(showSpin());
        try {
            await apiDelete(`profile/certification/${id}`);
            dispatch(addMessage({ content: 'Xóa chứng chỉ thành công', type: 'success', key: "certification-delete" }));
            reloadData();
        } catch (error) {
            dispatch(addMessage({ content: 'Đã xảy ra lỗi khi xóa chứng chỉ', type: 'error', key: "certification-delete" }));
        } finally {
            dispatch(hideSpin());
        }
    };

    return (
        <View style={styles.container}>
            <CertificationList
                certifications={certifications}
                onAdd={showAddModal}
                onEdit={showEditModal}
                onDelete={handleDelete}
            />

            <CertificationModal
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
                loading={loading}
                editingCert={editingCert}
                frontImage={frontImage}
                backImage={backImage}
                onImageChange={handleImageChange}
                onRemoveImage={handleRemoveImage}
                formData={formData}
                setFormData={setFormData}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CertificationsSection;